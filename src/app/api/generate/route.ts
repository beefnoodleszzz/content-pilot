import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, industry, audience, goal, platform } = body;

    if (!product || !industry) {
      return new Response(JSON.stringify({ error: "请填写产品名称和行业" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_BASE_URL || "https://token-plan-sgp.xiaomimimo.com/v1";
    const model = process.env.AI_MODEL || "mimo-v2.5-pro";

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI 服务未配置" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `你是小红书/抖音内容策划专家。根据用户的产品信息生成内容方案。

输出格式：先输出一个 JSON 代码块，包含 topics、copywriting、cover、tags、compliance 字段。

规则：
1. 生成 5 个选题，角度不同（痛点型/种草型/测评型/教程型/热点型）
2. 生成 3 种文案（种草型/教程型/测评型），每种 200-300 字
3. 文案要口语化、有温度，像真实用户写的，不能有 AI 味
4. 用"姐妹们""真的绝了""回购 N 次"这类小红书常用表达
5. 标签分热门/精准/长尾三层
6. 检测违禁词

\`\`\`json
{
  "topics": [
    {"title": "标题", "hook": "吸引力", "angle": "切入角度"}
  ],
  "copywriting": [
    {"style": "种草型", "content": "文案内容", "cta": "引导语"}
  ],
  "cover": {"layout": "构图", "colors": "配色", "text": "文字", "style": "风格"},
  "tags": {"hot": [], "niche": [], "longtail": []},
  "compliance": {"warnings": [], "suggestions": []}
}
\`\`\``;

    const userPrompt = `产品：${product}
行业：${industry}
人群：${audience || "通用"}
目标：${goal || "种草带货"}
平台：${platform || "小红书"}

生成内容方案。`;

    // 调用 MiMo API（流式）
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
        stream: true,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("AI API error:", err);
      return new Response(JSON.stringify({ error: "AI 服务请求失败" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 流式转发给前端
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        let buffer = "";
        let fullContent = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // 处理 SSE 数据
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") continue;

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || "";
                  if (content) {
                    fullContent += content;
                    // 发送增量内容
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ type: "delta", content })}\n\n`)
                    );
                  }
                } catch {}
              }
            }
          }

          // 解析最终结果
          let jsonStr = fullContent.trim();
          const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
          if (jsonMatch) jsonStr = jsonMatch[1].trim();
          if (!jsonStr.startsWith("{")) {
            const braceMatch = jsonStr.match(/\{[\s\S]*\}/);
            if (braceMatch) jsonStr = braceMatch[0];
          }

          try {
            const result = JSON.parse(jsonStr);
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "complete", result })}\n\n`)
            );
          } catch {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "error", message: "解析失败" })}\n\n`)
            );
          }
        } catch (e) {
          console.error("Stream error:", e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Generate error:", error);
    return new Response(JSON.stringify({ error: "服务器错误" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
