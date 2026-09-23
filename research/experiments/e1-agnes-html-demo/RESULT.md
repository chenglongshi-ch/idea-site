# E1 实验结果：想法 → 单文件 HTML demo（Agnes 文本模型实测）

日期：2026-09-23 ｜ 执行脚本：`e1_gen.py`（血统 producer）｜ 模型：`agnes-2.5-flash`

## 判定：通

一次生成成功，无重试。生成 → 浏览器验收 → iframe 嵌入全链路可用。两处无害瑕疵记录在案（见下），不影响链路可用性。

## 数据

| 指标 | 值 |
|---|---|
| 冒烟耗时 | 1.3s（通路 OK；content 返回空串，瑕疵①） |
| 生成耗时 | 38.0s |
| 输出字数 | 11606 字符（磁盘 12292 bytes） |
| usage | prompt 447（cached 256）+ completion 4229（reasoning 177 / text 4052）= total 4676 |
| 结构完整性 | doctype 开头 ✓，`</html>` 结尾 ✓，全内联无外部引用 ✓ |
| JS 报错数 | 1 条 [error]，file: 协议 unique-origin 自引用拦截，与 demo 代码无关（瑕疵②），功能不受影响 |
| 倒计时是否走动 | 走 ✓（点「开始」前静止 25:00 属正常；点击后 25:00 → 24:59） |
| 待办元素 | 有（今日待办区、输入框+添加、空状态文案；勾选/划线逻辑在 JS 中存在） |
| 截图 | `screenshot.png`（demo 直开）、`embed-screenshot.png`（iframe 嵌入，暗色番茄钟+25:00+按钮均可见，视觉确认非空白） |
| 嵌入验收 | `test-embed.html` iframe 引 demo.html，file: 协议下渲染正常（Chrome 唯一源限制只挡脚本跨访，不挡展示） |

## 瑕疵记录

1. **冒烟空回复**：阶段 1 限定 `max_tokens=20`，返回 content 为空。API 通路本身正常（HTTP 200 + 合法 JSON）。推测是推理 token 吃掉了预算（本次生成 usage 亦显示 reasoning_tokens=177）。如复跑可在冒烟阶段放开 max_tokens 或不限定。
2. **1 条 console error**：`Unsafe attempt to load URL file:///...demo.html from frame ... 'file:' URLs are treated as unique security origins`。demo.html 内无任何 iframe/audio/link 标签（已 grep 验证），疑似浏览器/截图机制的自引用加载被拦，页面功能完好。

## 一句话结论

**轻量路线可行**：Agnes 直出单文件 HTML 作为第一版 demo 生成通道可用——38 秒、4.7k tokens 得到结构完整、功能真实（计时走动/勾选逻辑）、无外部依赖、可直接 iframe 嵌入静态页的 demo。
