"""E1 实验：想法 → 单文件 HTML demo（Agnes agnes-2.5-flash 文本模型实测）。

producer = 本文件；输出 demo.html + lineage.json 到本目录。
用法：先 export AGNES_API_KEY，再运行本脚本。
"""
import json
import os
import time
import urllib.request

BASE = "https://apihub.agnes-ai.com/v1/chat/completions"
MODEL = "agnes-2.5-flash"
KEY = os.environ["AGNES_API_KEY"]
HERE = os.path.dirname(os.path.abspath(__file__))


def chat(messages, max_tokens):
    body = json.dumps({"model": MODEL, "messages": messages, "max_tokens": max_tokens}).encode()
    req = urllib.request.Request(BASE, data=body, headers={
        "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"})
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=300) as r:
        data = json.loads(r.read())
    return data, time.time() - t0


# 阶段 1：文本对话冒烟（vedio 从未调过 chat 接口，先证明通路）
smoke, smoke_s = chat([{"role": "user", "content": "只回复两个字：收到"}], 20)
smoke_text = smoke["choices"][0]["message"]["content"]
print(f"[smoke] {smoke_text!r} ({smoke_s:.1f}s)")

# 阶段 2：想法 → 单文件 HTML
IDEA = "番茄钟 + 今日待办清单 二合一小工具：25 分钟倒计时、可暂停重置、到点提醒；旁边一张待办列表可勾选、勾完自动划线。整体暗色主题。"
PROMPT = f"""你是一个前端工程师。下面是一个产品想法，请把它变成一个可以直接在浏览器打开的单文件 HTML demo。

想法：{IDEA}

硬性要求：
1. 只输出一个完整 HTML 文件，从 <!DOCTYPE html> 开始到 </html> 结束，不要任何解释文字，不要用 Markdown 代码块包裹。
2. 所有 CSS 和 JavaScript 全部内联在这一个文件里，不引用任何外部资源（不用 CDN、不用图片、不用字体）。
3. 功能要真的能用（计时走动、勾选生效），界面尽量好看。
"""
gen, gen_s = chat([{"role": "user", "content": PROMPT}], 16000)
content = gen["choices"][0]["message"]["content"].strip()
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
    "provider": "agnes",
    "idea": IDEA,
    "smoke_seconds": round(smoke_s, 1),
    "gen_seconds": round(gen_s, 1),
    "usage": gen.get("usage", {}),
    "output": "demo.html",
    "output_chars": len(content),
    "starts_with_doctype": content.lstrip().lower().startswith("<!doctype html"),
    "ends_with_html": content.rstrip().lower().endswith("</html>"),
}
with open(os.path.join(HERE, "lineage.json"), "w", encoding="utf-8") as f:
    json.dump(lineage, f, ensure_ascii=False, indent=2)
print(f"[gen] {len(content)} chars, {gen_s:.1f}s, doctype={lineage['starts_with_doctype']}, ends_html={lineage['ends_with_html']}")
