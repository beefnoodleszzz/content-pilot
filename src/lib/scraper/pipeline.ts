/**
 * ContentPilot — 融合生成 Pipeline v2
 * 
 * 多源数据驱动的内容生成：
 * 
 * ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
 * │  用户输入    │────▶│  数据采集    │────▶│  因子分析    │────▶│  融合生成    │
 * │  产品+行业   │     │  多源聚合    │     │  AI 提炼     │     │  对标输出    │
 * └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
 *        │                    │                   │                   │
 *        ▼                    ▼                   ▼                   ▼
 *   关键词构建          搜索引擎结果         爆款因子提取         高质量文案
 *   需求明确            公开笔记详情         标题/痛点/情绪       选题+文案+标签
 *                      热点话题聚合         内容结构模式         合规检测
 */

import { fetchIndustryData, type IndustryData, type ContentData } from "./data-engine";
import { buildAnalysisPrompt, parseAnalysisResult, type ViralFactors } from "./analysis-prompt";

// ─── 用户输入类型 ──────────────────────────────────────────────────
export interface UserInput {
  product: string;
  industry: string;
  audience?: string;
  goal?: string;
  platform?: "xiaohongshu" | "douyin";
  competitor?: string;
}

// ─── 生成结果类型 ──────────────────────────────────────────────────
export interface GeneratedContent {
  dataSource: {
    searchResults: number;
    detailedNotes: number;
    trendingTopics: number;
    tagsUsed: number;
  };
  viralFactors: ViralFactors;
  referenceNotes: { title: string; likes: number; source: string }[];
  topics: { title: string; hook: string; angle: string }[];
  copywriting: { style: string; content: string; cta: string }[];
  cover: { layout: string; colors: string; text: string; style: string };
  tags: { hot: string[]; niche: string[]; longtail: string[] };
  compliance: { warnings: string[]; suggestions: string[] };
}

// ─── 融合生成 Prompt ──────────────────────────────────────────────
function buildGenerationPrompt(
  input: UserInput,
  factors: ViralFactors,
  industryData: IndustryData
): string {
  const notesRef = industryData.competitorNotes
    .slice(0, 5)
    .map((n) => `- "${n.title}" (来源: ${n.source}${n.likes ? `, ${n.likes}赞` : ""})`)
    .join("\n");

  const topicsRef = industryData.hotTopics
    .slice(0, 10)
    .map((t) => `- ${t.keyword} (热度: ${t.heat}, 趋势: ${t.trend})`)
    .join("\n");

  return `你是一个小红书/抖音内容策划专家。现在你要基于【真实数据】为用户生成高质量内容方案。

## 用户需求
- 产品/品牌：${input.product}
- 所属行业：${input.industry}
- 目标人群：${input.audience || "通用人群"}
- 推广目标：${input.goal || "种草带货"}
- 发布平台：${input.platform || "小红书"}

## 真实数据来源

### 搜索引擎抓取的内容（${industryData.competitorNotes.length} 篇）
${notesRef || "暂无数据"}

### 当前热门话题（${industryData.hotTopics.length} 个）
${topicsRef || "暂无数据"}

### 行业标签库（${industryData.popularTags.length} 个）
${industryData.popularTags.join(", ")}

### 内容模式分析
- 平均标题长度：${industryData.contentPatterns.avgTitleLength} 字
- 高频关键词：${industryData.contentPatterns.commonWords.join(", ")}

## 爆款因子分析

**核心痛点：**
${factors.corePainPoints.map((p) => `- ${p}`).join("\n")}

**标题公式：**
${factors.titleFormulas.map((f) => `- ${f}`).join("\n")}

**情绪锚点：**
${factors.emotionAnchors.map((a) => `- ${a}`).join("\n")}

**内容结构：**
- 开头类型：${factors.contentStructure.hookType}
- 正文结构：${factors.contentStructure.bodyPattern}
- CTA 风格：${factors.contentStructure.ctaStyle}

**文案调性：** ${factors.writingTone}

**已知违禁词：** ${factors.forbiddenWords.join(", ") || "无"}

## 生成要求

基于以上真实数据，生成内容方案。严格按 JSON 格式输出：

\`\`\`json
{
  "topics": [
    { "title": "选题标题", "hook": "吸引力说明", "angle": "切入角度" }
  ],
  "copywriting": [
    { "style": "风格", "content": "完整文案", "cta": "CTA" }
  ],
  "cover": { "layout": "构图", "colors": "配色", "text": "文字", "style": "风格" },
  "tags": { "hot": [], "niche": [], "longtail": [] },
  "compliance": { "warnings": [], "suggestions": [] }
}
\`\`\`

## 核心规则

1. **数据驱动**：标题必须参考爆款公式，文案必须融入情绪锚点
2. **标签复用**：优先使用行业标签库中的标签，再补充新标签
3. **避开违禁词**：不使用已知的违禁词/限流词
4. **真实感**：口语化、有温度，不能有 AI 味
5. **生成 5 个选题、3 种风格文案**
6. 只输出 JSON`;
}

// ─── 主流程 ────────────────────────────────────────────────────────
export async function runPipeline(
  input: UserInput,
  aiCall: (prompt: string) => Promise<string>
): Promise<GeneratedContent> {
  console.log("\n" + "═".repeat(60));
  console.log("[Pipeline v2] 多源数据驱动 Pipeline 启动");
  console.log("═".repeat(60));

  // Step 1: 数据采集
  console.log("\n[Pipeline] Step 1/4: 多源数据采集...");
  const industryData = await fetchIndustryData(input.product, input.industry);
  console.log(`  搜索结果: ${industryData.competitorNotes.length} 篇`);
  console.log(`  热点话题: ${industryData.hotTopics.length} 个`);
  console.log(`  行业标签: ${industryData.popularTags.length} 个`);

  if (industryData.competitorNotes.length === 0) {
    console.log("[Pipeline] 警告: 未获取到搜索结果，将使用纯 AI 生成");
  }

  // Step 2: 爆款因子分析
  console.log("\n[Pipeline] Step 2/4: 分析爆款因子...");
  let factors: ViralFactors;

  if (industryData.competitorNotes.length > 0) {
    const analysisPrompt = buildAnalysisPrompt(
      industryData.competitorNotes.map((n) => ({
        title: n.title,
        content: n.content,
        likes: n.likes,
      }))
    );
    const analysisResult = await aiCall(analysisPrompt);
    factors = parseAnalysisResult(analysisResult);
  } else {
    // 兜底：无数据时使用默认因子
    factors = {
      corePainPoints: [`${input.product}效果怎么样`, `平价${input.product}推荐`, `${input.product}怎么选`],
      titleFormulas: ["[数字] + [痛点] + [方案]", "[身份] + [产品] + [效果]", "[场景] + [产品] + [推荐]"],
      emotionAnchors: ["真的绝了", "后悔没早知道", "亲测有效", "回购N次"],
      contentStructure: {
        hookType: "痛点型",
        bodyPattern: "清单型",
        ctaStyle: "引导收藏",
      },
      hotTags: input.industry === "美妆护肤" ? ["好物推荐", "平价好物", "护肤"] : ["推荐", "好物", "合集"],
      writingTone: "口语化种草",
      forbiddenWords: [],
    };
  }

  console.log(`  核心痛点: ${factors.corePainPoints.length} 个`);
  console.log(`  标题公式: ${factors.titleFormulas.length} 个`);

  // Step 3: 融合生成
  console.log("\n[Pipeline] Step 3/4: 融合生成内容方案...");
  const genPrompt = buildGenerationPrompt(input, factors, industryData);
  const genResult = await aiCall(genPrompt);

  // 解析结果
  let jsonStr = genResult.trim();
  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) jsonStr = jsonMatch[1].trim();
  if (!jsonStr.startsWith("{")) {
    const braceMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (braceMatch) jsonStr = braceMatch[0];
  }

  let generated: any;
  try {
    generated = JSON.parse(jsonStr);
  } catch {
    console.log("[Pipeline] JSON 解析失败，使用默认结构");
    generated = {
      topics: [],
      copywriting: [],
      cover: { layout: "", colors: "", text: "", style: "" },
      tags: { hot: [], niche: [], longtail: [] },
      compliance: { warnings: [], suggestions: [] },
    };
  }

  // Step 4: 组装结果
  console.log("\n[Pipeline] Step 4/4: 组装最终结果...");

  // 合并标签：AI 生成 + 行业数据
  const mergedTags = {
    hot: [...new Set([...(generated.tags?.hot || []), ...industryData.popularTags.slice(0, 5)])].slice(0, 8),
    niche: [...new Set([...(generated.tags?.niche || []), ...industryData.popularTags.slice(5, 10)])].slice(0, 8),
    longtail: [...new Set([...(generated.tags?.longtail || [])])].slice(0, 8),
  };

  console.log("\n" + "═".repeat(60));
  console.log("[Pipeline v2] 完成！");
  console.log("═".repeat(60) + "\n");

  return {
    dataSource: {
      searchResults: industryData.competitorNotes.length,
      detailedNotes: industryData.competitorNotes.filter((n) => n.source === "direct").length,
      trendingTopics: industryData.hotTopics.length,
      tagsUsed: mergedTags.hot.length + mergedTags.niche.length + mergedTags.longtail.length,
    },
    viralFactors: factors,
    referenceNotes: industryData.competitorNotes.slice(0, 5).map((n) => ({
      title: n.title,
      likes: n.likes,
      source: n.source,
    })),
    topics: generated.topics || [],
    copywriting: generated.copywriting || [],
    cover: generated.cover || { layout: "", colors: "", text: "", style: "" },
    tags: mergedTags,
    compliance: generated.compliance || { warnings: [], suggestions: [] },
  };
}
