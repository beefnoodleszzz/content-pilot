/**
 * POST /api/scrape-generate
 * 
 * 多源数据驱动的融合生成 API
 * 
 * Body: { product, industry, audience?, goal?, platform?, competitor? }
 */

import { NextRequest, NextResponse } from "next/server";
import { runPipeline } from "@/lib/scraper/pipeline";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, industry, audience, goal, platform, competitor } = body;

    if (!product || !industry) {
      return NextResponse.json({ error: "请填写产品名称和行业" }, { status: 400 });
    }

    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_BASE_URL || "https://token-plan-sgp.xiaomimimo.com/v1";
    const model = process.env.AI_MODEL || "mimo-v2.5-pro";

    if (!apiKey) {
      return NextResponse.json({ error: "AI 服务未配置" }, { status: 500 });
    }

    // AI 调用函数
    const aiCall = async (prompt: string): Promise<string> => {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: "你是小红书/抖音内容策划专家。只输出 JSON，不要有其他内容。" },
            { role: "user", content: prompt },
          ],
          temperature: 0.8,
          max_tokens: 6000,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("AI API error:", errText);
        throw new Error(`AI 服务请求失败: ${response.status}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "";
    };

    // 执行 Pipeline
    const result = await runPipeline(
      { product, industry, audience, goal, platform: platform || "xiaohongshu", competitor },
      aiCall
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[API] scrape-generate error:", error);
    return NextResponse.json(
      { error: error.message || "服务器错误，请稍后重试" },
      { status: 500 }
    );
  }
}
