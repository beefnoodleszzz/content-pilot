/**
 * ContentPilot — 爆款因子分析 Prompt
 * 
 * 将抓取到的非结构化内容，提炼为结构化的【爆款因子分析】。
 * 用于后续融合生成逻辑，产出对标爆款的高质量文案。
 */

export interface ViralFactors {
  corePainPoints: string[];      // 核心痛点：用户最关心什么
  titleFormulas: string[];       // 标题公式：爆款标题的结构模式
  emotionAnchors: string[];      // 情绪锚点：触发用户情绪的关键词/句式
  contentStructure: {
    hookType: string;            // 开头类型：痛点/悬念/反常识/数据
    bodyPattern: string;         // 正文结构：清单/故事/对比/教程
    ctaStyle: string;            // CTA 风格：引导互动/引导收藏/引导购买
  };
  hotTags: string[];             // 高频标签
  writingTone: string;           // 文案调性：口语化/专业/种草/测评
  forbiddenWords: string[];      // 发现的违禁词/限流词
}

export function buildAnalysisPrompt(notes: { title: string; content: string; likes: number }[]): string {
  const notesText = notes
    .map(
      (n, i) =>
        `【笔记 ${i + 1}】点赞: ${n.likes}\n标题: ${n.title}\n正文: ${n.content.slice(0, 500)}${n.content.length > 500 ? "..." : ""}\n`
    )
    .join("\n---\n\n");

  return `你是一个小红书/抖音内容数据分析专家。你的任务是分析一批高赞笔记，提炼出【爆款因子】。

## 待分析的高赞笔记

${notesText}

## 分析要求

请从以上笔记中提炼出以下爆款因子，严格按 JSON 格式输出：

\`\`\`json
{
  "corePainPoints": [
    "核心痛点1：用户最关心/最焦虑的问题",
    "核心痛点2：...",
    "核心痛点3：..."
  ],
  "titleFormulas": [
    "公式1：[数字] + [痛点] + [解决方案]，例如：'5个xxx误区，你中了几个？'",
    "公式2：...",
    "公式3：..."
  ],
  "emotionAnchors": [
    "情绪锚点1：能触发用户情绪的关键词或句式",
    "情绪锚点2：...",
    "情绪锚点3：..."
  ],
  "contentStructure": {
    "hookType": "开头类型分析（痛点型/悬念型/反常识型/数据型）",
    "bodyPattern": "正文结构分析（清单型/故事型/对比型/教程型）",
    "ctaStyle": "CTA风格分析（引导互动/引导收藏/引导购买）"
  },
  "hotTags": ["高频标签1", "高频标签2", "高频标签3", "高频标签4", "高频标签5"],
  "writingTone": "文案整体调性分析",
  "forbiddenWords": ["发现的违禁词或限流词（如有）"]
}
\`\`\`

## 分析规则

1. **核心痛点**：从标题和正文中提炼用户最关心的 3-5 个痛点，要具体、可感知
2. **标题公式**：总结 3-5 个标题结构公式，每个都要给出模板和真实案例
3. **情绪锚点**：找出能触发用户情绪（焦虑、好奇、共鸣、惊喜）的关键词和句式
4. **内容结构**：分析开头、正文、CTA 的通用模式
5. **高频标签**：提取出现频率最高的 5 个标签
6. **文案调性**：总结整体的语言风格（口语化/专业/种草/测评等）
7. **违禁词**：如果发现可能被平台限流的词，列出来

只输出 JSON，不要有其他内容。`;
}

export function parseAnalysisResult(content: string): ViralFactors {
  // 提取 JSON（兼容 markdown code block）
  let jsonStr = content.trim();
  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }
  if (!jsonStr.startsWith("{")) {
    const braceMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (braceMatch) jsonStr = braceMatch[0];
  }

  return JSON.parse(jsonStr) as ViralFactors;
}
