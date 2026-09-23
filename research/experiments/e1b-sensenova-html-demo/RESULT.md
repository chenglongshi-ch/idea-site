# E1b 对称实验结果：想法 → 单文件 HTML demo（商汤 SenseNova 实测）

日期：2026-09-23 ｜ 执行脚本：`e1b_gen.py`（血统 producer）｜ 主列模型：`sensenova-6.8-flash-lite`（商汤自研）｜ 参考：`glm-5.2`（商汤托管）

## 判定：半通

API 通路通、生成出完整文件（31.7s / 13972 字符 / 4964 tokens）、浏览器渲染无 console 报错、待办全链路（添加/勾选/划线/计数）真实可用；**但生成的 demo 有一个真 bug：倒计时数字不动**——同一作用域里声明了两个同名 `render()` 函数（计时器版第 272 行被待办版第 354 行覆盖），`tick()` 每秒实际执行的是重建待办列表，`#time` 永远停在 25:00。不满足 E1 验收项「计时走动」，故判半通。

## 商汤 SenseNova 可用模型清单（/models 实测，共 9 个）

- **自研系列（本实验目标）**：`sensenova-6.8-flash-lite`（本次选用，256K ctx）、`sensenova-u1-fast`、`sensenova-u1.5-lite`（列表中无更大自研旗舰）
- 托管系列：`glm-5.2`、`deepseek-v4-flash` / `deepseek-v4-pro` / `deepseek-v4.1-flash` / `deepseek-flash`、`kimi-k3`

## 数据（sensenova-6.8-flash-lite，第 2 次生成尝试成功）

| 指标 | 值 |
|---|---|
| 冒烟耗时 | 首跑 1.5s（content='收到'）；成功跑 1.9s（**响应无 content 字段**，msg_fields=`['reasoning','role']`，结构差异记录在案，通路以 HTTP 200+合法 JSON 为准） |
| 生成耗时 | 31.7s |
| 输出字数 | 13972 字符（磁盘 14336 bytes） |
| usage | prompt 219 + completion 4745（reasoning 0）= total 4964；请求带 `{"thinking":{"type":"disabled"}}` |
| 结构完整性 | doctype 开头 ✓，`</html>` 结尾 ✓，单 script 块内联 ✓，JS 语法检查通过（node `new Function`） |
| console 报错 | 0 条（headless 实测，连 file: unique-origin 那条都没有） |
| 倒计时 | **显示冻结 ✗**（内部 interval 在走：2.6s 内待办 DOM 被重建证明 tick 每 1s 执行；stage 状态机正常：准备就绪→专注中…→已暂停） |
| 待办元素 | 全链路 ✓：输入+添加+回车、勾选→`li.done`+`line-through` 划线、计数「1 / 1 完成」、删除/清除逻辑在 |
| 截图 | `screenshot.png`（1280×900，添加任务并勾选后状态） |
| 用的 key | `SENSENOVA_API_KEY`（默认号，未换备用） |

## 尝试过程（预算内 2 次生成 + 小成本探针）

1. **glm-5.2 跑①**：203.9s 出 19995 字符即截断——`completion_tokens=16000` 撞 max_tokens 上限，其中 reasoning_tokens=9532（思考吃掉 6 成预算）。产物存档 `demo-glm52-truncated.html`（静态 HTML+CSS 完整，JS 断在第 733 行后，无 `</script>`）。
2. **glm-5.2 跑②**（max_tokens 提 32768）：读超时 >300s（脚本内 urlopen timeout=300），无响应。按预算停，glm-5.2 判不通（对本任务：又慢又贵又截断）。
3. **flash-lite 跑①**（glm 同款脚本，max_tokens=32768）：230.8s 后 **content=0 字符**——`completion_tokens=32768` 全部是 reasoning_tokens（思考到预算耗尽，正文一字未出）。
4. **探针**（`probe_thinking_param.py`，每发 ≤1200 tokens 不占生成预算）：baseline 复现「思考吃光」；`{"thinking":{"type":"disabled"}}` 与 `"reasoning_effort":"none"` 均把 reasoning 压到 0（HTTP 200 均接受）。
5. **flash-lite 跑②**（带 thinking:disabled）：31.7s 一次出全 → 即上表数据。

### 工艺发现（对后续用商汤接口的沉淀）

- 自研 flash-lite **默认开思考且对大任务不收敛**（会把整个 max_tokens 烧在思考上）；生成代码类任务必须带 `{"thinking":{"type":"disabled"}}`（或 `reasoning_effort:"none"`）。
- 思考字段名不统一：glm-5.2 回 `reasoning_content`，flash-lite 回 `reasoning`；判空要两个都查。
- E1 冒烟 max_tokens=20 的教训在商汤上加重：思考模型连生成都要给足 max_tokens 或先关思考。

## 浏览器验收方式变更（记录）

chrome-devtools MCP 在 reload 时报 profile 锁死（旧实例占用，内有用户开着的 E1 demo 页，不能杀），验收改走：headless chrome CLI（独立临时 profile，`--screenshot` + `--dump-dom`）+ puppeteer-core（活体交互：点击/等待/读计算样式）。功能结论均来自 puppeteer 实测。MCP 里我开的后台页（番茄钟·今日待办）因工具不可用未能关闭，需人工关掉。

## 与 E1 对比表

| 维度 | E1：Agnes `agnes-2.5-flash` | E1b：商汤自研 `sensenova-6.8-flash-lite` | 参考：托管 `glm-5.2` |
|---|---|---|---|
| 生成耗时 | 38.0s | 31.7s（不含第①次 230.8s 失败） | 203.9s（截断）/ >300s 超时 |
| 输出字数 | 11606 | 13972 | 19995（截断，非完整） |
| token 总耗 | 4676（reasoning 177） | 4964（reasoning 0，须关思考） | ≥16173（reasoning 9532 起步） |
| 功能完整性 | 计时走动 ✓ 勾选 ✓ 全项过 | 勾选 ✓；计时内部走但**显示冻结 ✗**（同名 render 覆盖 bug） | JS 截断，仅静态渲染 |
| 观感一句话 | 暗色番茄钟，功能完整直出可用 | 暗色+珊瑚红强调+SVG 圆环进度，更精致但有硬 bug | 静态部分最华丽（READY 状态/模式切换），可惜是半成品 |
| 判定 | **通** | **半通** | 不通（对本任务） |

## 结论：生成主力选谁

**主力维持 Agnes（E1 结论不变）**：同为一次成功，Agnes 的产出功能零缺陷，flash-lite 产出带同名函数覆盖这类结构性 bug，直出可用率差一档。

分工建议：商汤自研 `sensenova-6.8-flash-lite` 可作**备用/成本对冲通道**——速度（31.7s）与 token（4.9k）与 Agnes 相当、价格可能更低，但两个前置条件：① 请求必须带 `thinking:disabled`；② 产出必须过浏览器功能验收（本次正是验收抓住了显示冻结 bug）。`glm-5.2` 不适合做单发大 HTML 生成（思考吞噬预算、5 倍耗时、截断/超时风险），如要用仅建议小片段场景。

## 文件清单

- `e1b_gen.py`：producer（PROMPT 与 E1 逐字相同；含 thinking:disabled 与空内容守卫）
- `demo.html`：flash-lite 成功产物（半通，bug 见上）
- `lineage.json`：血统（model=sensenova-6.8-flash-lite，含 gen_request_extra）
- `screenshot.png`：成功版截图；`*-glm52-truncated.*`：glm-5.2 截断版存档（html/lineage/截图）
- `probe_thinking_param.py`：思考参数探针
