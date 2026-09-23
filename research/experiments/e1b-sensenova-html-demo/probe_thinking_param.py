"""探针：找出 sensenova-6.8-flash-lite 关思考的请求参数（小成本，非生成尝试）。
候选依次试，报告 HTTP 状态 / content 长度 / reasoning 长度 / usage。绝不打印 key。
"""
import json
import os
import urllib.error
import urllib.request

ENV_FILE = "d:/project/site/.env"


def from_env(name):
    val = os.environ.get(name)
    if val and val.strip():
        return val.strip()
    with open(ENV_FILE, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith(name + "="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None


BASE = (from_env("SENSENOVA_BASE_URL") or "https://token.sensenova.cn/v1").rstrip("/") + "/chat/completions"
KEY = from_env("SENSENOVA_API_KEY")

PROMPT = "9.11 和 9.9 哪个大？先想清楚再回答，一句话。"  # 会诱发推理的小题
CANDIDATES = [
    ("baseline(无参数)", {}),
    ("enable_thinking:false", {"enable_thinking": False}),
    ("thinking:disabled", {"thinking": {"type": "disabled"}}),
    ("reasoning_effort:none", {"reasoning_effort": "none"}),
    ("chat_template_kwargs", {"chat_template_kwargs": {"enable_thinking": False}}),
]

for label, extra in CANDIDATES:
    body = json.dumps({"model": "sensenova-6.8-flash-lite",
                       "messages": [{"role": "user", "content": PROMPT}],
                       "max_tokens": 1200, **extra}).encode()
    req = urllib.request.Request(BASE, data=body, headers={
        "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            data = json.loads(r.read())
        msg = data["choices"][0]["message"]
        content = msg.get("content") or ""
        reasoning = msg.get("reasoning") or msg.get("reasoning_content") or ""
        usage = data.get("usage", {})
        rt = usage.get("completion_tokens_details", {}).get("reasoning_tokens")
        print(f"[{label}] HTTP 200 content_len={len(content)} reasoning_len={len(reasoning)} "
              f"completion={usage.get('completion_tokens')} reasoning_tokens={rt} finish={data['choices'][0].get('finish_reason')}")
    except urllib.error.HTTPError as e:
        print(f"[{label}] HTTP {e.code}")
    except Exception as e:
        print(f"[{label}] FAIL {type(e).__name__}")
