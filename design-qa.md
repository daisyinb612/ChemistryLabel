# Label Studio风格网页检查

final result: passed

## 视觉依据与范围

用户截图：
- `/var/folders/1r/7spjqr996_75pp21x449jpfm0000gn/T/TemporaryItems/NSIRD_screencaptureui_T0cUPc/Screenshot 2026-11-15 at 21.03.20.png`：整体布局，3548×2004px，包含浏览器工具栏。
- `/var/folders/1r/7spjqr996_75pp21x449jpfm0000gn/T/TemporaryItems/NSIRD_screencaptureui_L29vO5/Screenshot 2026-11-15 at 21.02.50.png`：单轨时间轴。
- `/var/folders/1r/7spjqr996_75pp21x449jpfm0000gn/T/TemporaryItems/NSIRD_screencaptureui_oWkRmx/Screenshot 2026-11-15 at 21.03.03.png`：Regions。

实现：`output/playwright/studio-desktop.png`，CSS视口1600×1000，截图1600×1000px，DPR=1。
移动适配：`output/playwright/studio-mobile.png`，CSS视口390×844，全页截图。

参考截图为高像素桌面截图，不能假定其浏览器DPR；按整体宽度约0.45倍观察布局比例，排除浏览器工具栏，不作像素误差结论。参考是物理项目，本实现按用户要求换成化学项目、只标Phase、增加URL导入与标注员创建。功能状态为测试视频已载入、teacher1两段Phase、teacher2独立评分；参考的实验内容与时长不同。该差异不作为视觉缺陷。

## 同屏对比结果

通过同一工具输入同时打开参考整页与实现截图。检查了顶部面包屑与标注员标签、左侧任务列、中央视频与标签、右侧评分与Regions。时间轴进一步对照用户专门提供的时间轴图：顶部时间刻度、贯穿轨道高度的半透明区间、彩色边界、底部水平滚动和播放控制均呈现。Regions对应色彩索引、时间排序、可见性控制与详情编辑。没有旧版记录表，也没有多层时间轴。

## 五项视觉检查

- 字体：Arial及系统中文字体；标题23px、正文14px、密集表单11—12px，保持参考的应用界面密度与标题层级。
- 间距与布局：任务／工作区／Regions三列，工作区再分视频与评分；独立滚动，工具栏和标注员标签固定在布局顶部。边框与低圆角对应参考。
- 色彩：白色工作区、米灰侧栏、浅紫选中任务与标注员顶边、紫蓝绿Phase色块；评分采用紫色单选。
- 图像与图标：视频是真实video元素；自动测试视频为纯色12秒测试素材，不表示真实实验。图标来自Chromium DevTools实际SVG资源，没有生成示意图或用文字拼绘图标。
- 文案：化学实验、9个Phase和18分评分均匹配任务；没有把源截图的物理项目内容带入产品。

## 迭代记录

1. 初版1600×1000截图中视频框过高，时间轴播放控件需要滚动。按P2处理。
2. 修正：桌面视频高度随视口变化，时间轴轨道统一为190px。
3. 重新截图`studio-desktop.png`并验证播放控制底边在960px以上。当前视口可同时看到视频、Phase选择、时间轴与控制条。无剩余P0／P1／P2。

## 实际交互验证

使用经用户授权的Playwright独立浏览器（内置浏览器连续两次超时）：
- URL导入与浏览器播放成功。
- 拖拽创建两段Phase、拖动右边界、精确编辑、撤销与重做。
- 新建teacher2后区间和评分为空；回teacher1恢复原记录。
- 刷新后按视频和标注员恢复原记录。
- 全标注员CSV下载，检查字段对齐、Phase分段、标注员归属和空值／0分区别。
- JSON完整备份下载。
- 390px视口无页面横向溢出。
- 主流程pageerror为0。

## 可选后续优化

本地标注身份不是服务器账号；跨设备协作和同步未在此版本实现。远程视频能否播放仍取决于视频直链可访问性与浏览器编码支持。参考中的Comments／History／Relations不属于用户本次核心需求，未复制空壳按钮。


## 2026-11-15 行为序列增量检查

final result: passed

- 新参考：`/var/folders/1r/7spjqr996_75pp21x449jpfm0000gn/T/TemporaryItems/NSIRD_screencaptureui_K4YTMF/Screenshot 2026-11-15 at 21.30.57.png`（2054×202px）。
- 实现截图：`output/playwright/phase-sequence.png`（798×114px，1600×1000 CSS视口中的局部截图，DPR=1）；移动截图`output/playwright/phase-sequence-mobile.png`（346×113px，390×844 CSS视口，DPR=1）。
- 同一比较输入同时打开参考与两份实现截图。范围仅为新增序列区域，保留当前页面的Arial／系统中文字体和Phase紫色语义；对应参考的浅色独立边框面板、左上标题、右上编码数量、下方编码块与箭头。参考为EF→O→EV2三段，实现测试数据为Q→PD两段，代码名称和数量差异来自实验词典与数据。
- 字体、标题与编码层级清晰；间距、换行、背景与边框符合现有Label Studio风格；编码使用真实Phase文本，箭头是文本连接符，无新增图像资源。没有其他布局修改，无P0／P1／P2问题。
- 浏览器测试：按时间排序、修改时间自动重排、删除数量更新、撤销恢复、切换标注员清空／恢复、点击编码定位、隐藏不移除序列、刷新后恢复、390px无横向溢出。pageerror为0。
- 行为序列只读取当前Phase区间派生，不另存第二份数据，不合并重复阶段。


## 2026-11-15 Phase / Action与自适应增量验收

final result: passed

- 参考：用户`Screenshot 2026-11-15 at 21.51.24.png`，路径`/var/folders/1r/7spjqr996_75pp21x449jpfm0000gn/T/TemporaryItems/NSIRD_screencaptureui_4akuZM/Screenshot 2026-11-15 at 21.51.24.png`（978×216px）。这是筛选区域的局部参考，不包含整个页面。
- 实现：`output/playwright/phase-action-filter.png`（筛选区局部，872×230px）；`output/playwright/phase-action-desktop.png`（1600×1100px，CSS视口1600×1100，DPR1）；`output/playwright/phase-action-mobile.png`（390px CSS视口全页）。将参考与最终筛选截图及整页截图放入同一比较输入审查。
- 筛选层级按参考适配：第一行选阶段，第二行Phase／Action单选，Action模式下方仅显示对应阶段的动作标签；标签与时间轴使用同一阶段色。
- 字体：筛选标签14px，类型单选16px；行为序列20—22px，满足放大要求；正文保持Arial／系统中文字体。
- 布局：移除永久占位的独立Regions列，右侧评分与Regions共享检查面板。页面所有列自适应占满可用宽度。
- 配色、边框与标签风格延续参考与现有实现；没有新增图片资源，词典与化学实验内容保持一致。
- 第一轮发现teacher1改为普通容器后文字纵向堆叠被裁切（P2）；为标注员卡片补充flex布局，重新截图并用边界检查确认名称完整位于标签内。最终无P0／P1／P2。
- 390、768、1024、1280、1600、1920、2560px浏览器视口均无横向溢出，右侧面板右边界等于文档可用宽度；768和390下15px为浏览器垂直滚动条，不是空栏。
- 测试通过：仅显示teacher1、没有新建标注员按钮、Q／PD Action筛选、Phase与Action时间可重叠、各类型数据独立保存、Action不进入Phase序列、Action编辑刷新持久化、Regions／评分切换、备份验证兼容旧Phase及新Action。
- CSV实测包含2条Phase、1条A2 Action与评分，teacher1归属正确，21列对齐，动作代码与修改后终点正确。主流程pageerror=0。
