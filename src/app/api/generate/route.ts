import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, industry, audience, goal, platform, competitor } = body;

    if (!product || !industry) {
      return NextResponse.json(
        { error: "请填写产品名称和行业" },
        { status: 400 }
      );
    }

    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_BASE_URL || "https://token-plan-sgp.xiaomimimo.com/v1";
    const model = process.env.AI_MODEL || "mimo-v2.5-pro";

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI 服务未配置" },
        { status: 500 }
      );
    }

    const systemPrompt = `你是一个专业的小红书/抖音内容策划专家。你深度了解平台算法、用户心理和爆款规律。

你的任务是根据用户提供的产品信息，生成专业的内容策划方案。

## 你的专业能力：
1. 熟悉小红书/抖音的推荐算法和流量机制
2. 了解各行业的热门话题和内容趋势
3. 掌握爆款标题的写法（数字、悬念、对比、痛点）
4. 熟知平台违禁词和限流规则
5. 擅长根据不同行业调整文案风格

## 输出要求：
请严格按照以下 JSON 格式输出，不要输出任何其他内容，只输出纯 JSON：

{
  "topics": [
    {
      "title": "选题标题（要吸引眼球）",
      "hook": "这个选题的吸引力在哪里（一句话说明）",
      "angle": "切入角度（从什么视角写）"
    }
  ],
  "copywriting": [
    {
      "style": "文案风格（如：种草型、教程型、测评型）",
      "content": "完整的文案内容（包含emoji、分段、口语化表达）",
      "cta": "结尾引导语（引导点赞/收藏/评论）"
    }
  ],
  "cover": {
    "layout": "封面构图建议",
    "colors": "配色方案建议",
    "text": "封面上应该写什么文字",
    "style": "整体视觉风格"
  },
  "tags": {
    "hot": ["热门标签1", "热门标签2"],
    "niche": ["精准标签1", "精准标签2"],
    "longtail": ["长尾标签1", "长尾标签2"]
  },
  "compliance": {
    "warnings": ["需要注意的合规风险"],
    "suggestions": ["优化建议"]
  }
}

## 重要规则：
1. 生成 5 个选题，每个选题角度不同
2. 生成 3 种风格的文案（种草型、教程型、测评型）
3. 文案要口语化、有温度，不能有"AI味"
4. 标签要分三层：热门（流量大）、精准（转化高）、长尾（竞争小）
5. 合规检测要检查违禁词、极限词、敏感内容
6. 所有内容都要符合${platform || "小红书"}的平台调性
7. 只输出 JSON，不要输出任何其他文字`;

    const userPrompt = `请为以下产品生成内容策划方案：

产品/品牌：${product}
所属行业：${industry}
目标人群：${audience || "通用人群"}
推广目标：${goal || "种草带货"}
发布平台：${platform || "小红书"}
${competitor ? `竞品参考：${competitor}` : ""}

请按照要求的 JSON 格式输出完整的内容策划方案。只输出 JSON，不要有其他内容。`;

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("AI API error:", err);
      return NextResponse.json(
        { error: "AI 服务请求失败，请稍后重试" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "AI 返回内容为空" },
        { status: 502 }
      );
    }

    // 提取 JSON（兼容 markdown code block 包裹的情况）
    let jsonStr = content.trim();
    const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }
    // 如果以 { 开头尝试直接解析
    if (!jsonStr.startsWith("{")) {
      const braceMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (braceMatch) {
        jsonStr = braceMatch[0];
      }
    }

    const parsed = JSON.parse(jsonStr);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "服务器错误，请稍后重试" },
      { status: 500 }
    );
  }
}
