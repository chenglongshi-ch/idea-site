"""E1b 对称实验：想法 → 单文件 HTML demo（商汤 SenseNova glm-5.2 实测）。

以 E1（e1-agnes-html-demo/e1_gen.py）为底本，仅改三处：BASE/MODEL/key 来源。
IDEA 与 PROMPT 逐字保留 E1 原文（对比实验控制变量）。
producer = 本文件；输出 demo.html + lineage.json 到本目录。
用法：先 export SENSENOVA_API_KEY（及可选 SENSENOVA_BASE_URL、SENSENOVA_KEY_LABEL），再运行本脚本。
"""
import json
import os
import time
import urllib.request

ENV_FILE = "d:/project/site/.env"


def _from_env(name):
    """先取进程环境变量，缺则回退解析 .env（只回值，绝不打印）。"""
    val = os.environ.get(name)
    if val and val.strip():
        return val.strip()
    try:
        with open(ENV_FILE, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith(name + "="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    except OSError:
        pass
    return None


BASE_URL = _from_env("SENSENOVA_BASE_URL") or "https://token.sensenova.cn/v1"
BASE = BASE_URL.rstrip("/") + "/chat/completions"
MODEL = "sensenova-6.8-flash-lite"  # 改令：目标换商汤自研系列（glm-5.2 数据另存 *-glm52* 作参考）
KEY = _from_env("SENSENOVA_API_KEY")
if not KEY:
    raise SystemExit("missing SENSENOVA_API_KEY in env or .env")
KEY_LABEL = os.environ.get("SENSENOVA_KEY_LABEL", "SENSENOVA_API_KEY(默认)")
HERE = os.path.dirname(os.path.abspath(__file__))


def chat(messages, max_tokens, extra=None):
    body = json.dumps({"model": MODEL, "messages": messages, "max_tokens": max_tokens, **(extra or {})}).encode()
    req = urllib.request.Request(BASE, data=body, headers={
        "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"})
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=540) as r:  # glm-5.2 教训：300s 读超时不够，放宽
        data = json.loads(r.read())
    return data, time.time() - t0


# 阶段 1：文本对话冒烟（max_tokens=200，E1 教训：20 会被思考过程吃掉）
smoke, smoke_s = chat([{"role": "user", "content": "只回复两个字：收到"}], 200)
smoke_msg = smoke["choices"][0]["message"]
smoke_text = smoke_msg.get("content") or ""
smoke_reasoning = smoke_msg.get("reasoning_content") or ""
smoke_keys = sorted(smoke_msg.keys())
print(f"[smoke] content={smoke_text!r} reasoning_len={len(smoke_reasoning)} msg_fields={smoke_keys} ({smoke_s:.1f}s)")

# 阶段 2：想法 → 单文件 HTML（PROMPT 逐字同 E1）
IDEA = "番茄钟 + 今日待办清单 二合一小工具：25 分钟倒计时、可暂停重置、到点提醒；旁边一张待办列表可勾选、勾完自动划线。整体暗色主题。"
PROMPT = f"""你是一个前端工程师。下面是一个产品想法，请把它变成一个可以直接在浏览器打开的单文件 HTML demo。

想法：{IDEA}

硬性要求：
1. 只输出一个完整 HTML 文件，从 <!DOCTYPE html> 开始到 </html> 结束，不要任何解释文字，不要用 Markdown 代码块包裹。
2. 所有 CSS 和 JavaScript 全部内联在这一个文件里，不引用任何外部资源（不用 CDN、不用图片、不用字体）。
3. 功能要真的能用（计时走动、勾选生效），界面尽量好看。
"""
# 重试②：sensenova-6.8-flash-lite 首跑 content=0（reasoning_tokens 吃光 32768，见 lineage-glm52.json 同目录存档逻辑）。
# 探针（probe_thinking_param.py）证实 {"thinking":{"type":"disabled"}} 可把 reasoning 压到 0，故生成时带上。
gen, gen_s = chat([{"role": "user", "content": PROMPT}], 32768, extra={"thinking": {"type": "disabled"}})
gen_msg = gen["choices"][0]["message"]
content = (gen_msg.get("content") or "").strip()
gen_reasoning = gen_msg.get("reasoning") or gen_msg.get("reasoning_content") or ""
gen_reasoning_len = len(gen_reasoning)
if not content:
    raise SystemExit(f"gen content empty (reasoning_len={gen_reasoning_len}, finish={gen['choices'][0].get('finish_reason')}); demo.html 未覆盖")
# 剥掉模型可能仍然加的 ```html 包裹
if content.startswith("```"):
    content = content.split("\n", 1)[1] if "\n" in content else content
    content = content.rsplit("```", 1)[0]

with open(os.path.join(HERE, "demo.html"), "w", encoding="utf-8") as f:
    f.write(content)

lineage = {
    "producer": os.path.abspath(__file__),
    "date": time.strftime("%Y-%m-%d"),
    "model": MODEL,
    "provider": "sensenova",
    "key_label": KEY_LABEL,
    "idea": IDEA,
    "smoke_seconds": round(smoke_s, 1),
    "smoke_content": smoke_text,
    "smoke_reasoning_len": len(smoke_reasoning),
    "smoke_msg_fields": smoke_keys,
    "gen_seconds": round(gen_s, 1),
    "gen_request_extra": {"thinking": {"type": "disabled"}},
    "gen_reasoning_len": gen_reasoning_len,
    "usage": gen.get("usage", {}),
    "output": "demo.html",
    "output_chars": len(content),
    "starts_with_doctype": content.lstrip().lower().startswith("<!doctype html"),
    "ends_with_html": content.rstrip().lower().endswith("</html>"),
}
with open(os.path.join(HERE, "lineage.json"), "w", encoding="utf-8") as f:
    json.dump(lineage, f, ensure_ascii=False, indent=2)
print(f"[gen] {len(content)} chars, {gen_s:.1f}s, doctype={lineage['starts_with_doctype']}, ends_html={lineage['ends_with_html']}")
