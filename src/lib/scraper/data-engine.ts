/**
 * ContentPilot — 多源数据引擎
 * 
 * 不依赖登录态，通过多种公开数据源获取真实内容数据：
 * 1. 搜索引擎：抓取小红书/抖音在搜索引擎中的索引内容
 * 2. 公开笔记页：直接访问不需要登录的笔记详情页
 * 3. 热点趋势：从多个平台聚合热门话题
 */

// ─── 类型定义 ──────────────────────────────────────────────────────
export interface ContentData {
  title: string;
  content: string;
  likes: number;
  author: string;
  url: string;
  source: "search" | "direct" | "trending";
  platform: "xiaohongshu" | "douyin" | "general";
}

export interface TrendData {
  keyword: string;
  heat: number;          // 热度指数 0-100
  trend: "rising" | "stable" | "declining";
  source: string;
}

export interface IndustryData {
  hotTopics: TrendData[];
  competitorNotes: ContentData[];
  popularTags: string[];
  contentPatterns: {
    avgTitleLength: number;
    commonWords: string[];
    emojiFrequency: Record<string, number>;
  };
}

// ─── 通过搜索引擎获取小红书内容 ────────────────────────────────────
async function searchViaWeb(keyword: string, maxResults: number = 10): Promise<ContentData[]> {
  // 使用多个搜索策略
  const queries = [
    `site:xiaohongshu.com ${keyword}`,
    `小红书 ${keyword} 爆款`,
    `小红书 ${keyword} 推荐`,
  ];

  const allResults: ContentData[] = [];

  for (const query of queries) {
    try {
      // 使用 Brave Search API（如果配置了）
      const braveKey = process.env.BRAVE_SEARCH_API_KEY;
      if (braveKey) {
        const res = await fetch(
          `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${maxResults}&country=cn&search_lang=zh-hans`,
          {
            headers: {
              "Accept": "application/json",
              "X-Subscription-Token": braveKey,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          const results = (data.web?.results || []).map((r: any, i: number) => ({
            title: r.title?.replace(/ - 小红书$/, "") || "",
            content: r.description || "",
            likes: 0,
            author: "",
            url: r.url || "",
            source: "search" as const,
            platform: "xiaohongshu" as const,
          }));
          allResults.push(...results);
        }
      }
    } catch (e) {
      console.log(`[DataEngine] 搜索失败: ${query}`, e);
    }
  }

  // 去重
  const seen = new Set<string>();
  return allResults.filter((r) => {
    if (seen.has(r.url) || !r.title) return false;
    seen.add(r.url);
    return true;
  }).slice(0, maxResults);
}

// ─── 直接抓取公开笔记页 ────────────────────────────────────────────
async function fetchPublicNote(url: string): Promise<ContentData | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "zh-CN,zh;q=0.9",
      },
      redirect: "follow",
    });

    if (!res.ok) return null;

    const html = await res.text();

    // 从 HTML 中提取结构化数据（小红书页面通常包含 JSON-LD 或 meta 标签）
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
    const ogDescMatch = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i);

    // 尝试从页面 JSON 中提取
    const jsonMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*({[\s\S]*?})\s*<\/script>/);
    let noteData: any = {};
    if (jsonMatch) {
      try {
        noteData = JSON.parse(jsonMatch[1]);
      } catch {}
    }

    const title = titleMatch?.[1]?.replace(/ - 小红书$/, "").trim() || "";
    const content = ogDescMatch?.[1] || descMatch?.[1] || "";

    return {
      title,
      content: content.slice(0, 1000),
      likes: noteData?.note?.likes || 0,
      author: noteData?.note?.author?.nickname || "",
      url,
      source: "direct",
      platform: "xiaohongshu",
    };
  } catch (e) {
    console.log(`[DataEngine] 笔记抓取失败: ${url}`, e);
    return null;
  }
}

// ─── 热点话题聚合 ──────────────────────────────────────────────────
async function fetchTrendingTopics(industry: string): Promise<TrendData[]> {
  const topics: TrendData[] = [];

  // 从搜索引擎获取当前热门话题
  try {
    const braveKey = process.env.BRAVE_SEARCH_API_KEY;
    if (braveKey) {
      const queries = [
        `${industry} 小红书 热门话题 2026`,
        `${industry} 小红书 爆款关键词`,
        `${industry} 抖音 热门选题`,
      ];

      for (const query of queries) {
        const res = await fetch(
          `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=5&country=cn`,
          { headers: { "Accept": "application/json", "X-Subscription-Token": braveKey } }
        );
        if (res.ok) {
          const data = await res.json();
          const results = data.web?.results || [];
          for (const r of results) {
            // 从标题和描述中提取关键词
            const text = `${r.title} ${r.description}`;
            const keywords = extractKeywords(text, industry);
            for (const kw of keywords) {
              topics.push({
                keyword: kw,
                heat: Math.floor(Math.random() * 40) + 60, // 后续用真实数据替代
                trend: "rising",
                source: "search",
              });
            }
          }
        }
      }
    }
  } catch (e) {
    console.log("[DataEngine] 热点获取失败:", e);
  }

  // 去重
  const seen = new Set<string>();
  return topics.filter((t) => {
    if (seen.has(t.keyword)) return false;
    seen.add(t.keyword);
    return true;
  }).slice(0, 20);
}

// ─── 关键词提取 ────────────────────────────────────────────────────
function extractKeywords(text: string, industry: string): string[] {
  const keywords: string[] = [];

  // 行业相关词库
  const industryKeywords: Record<string, string[]> = {
    "美妆护肤": ["防晒", "美白", "保湿", "抗老", "祛痘", "粉底", "口红", "面膜", "精华", "水乳"],
    "服装穿搭": ["OOTD", "穿搭", "显瘦", "搭配", "平价", "通勤", "约会", "秋冬", "春夏", "微胖"],
    "美食探店": ["探店", "美食", "食谱", "减脂", "早餐", "甜品", "火锅", "咖啡", "烘焙", "外卖"],
    "家居好物": ["收纳", "装修", "好物", "改造", "租房", "智能家居", "清洁", "软装", "断舍离", "小户型"],
    "母婴育儿": ["育儿", "辅食", "早教", "好物", "宝宝", "孕期", "产后", "玩具", "绘本", "带娃"],
    "数码科技": ["测评", "开箱", "手机", "耳机", "平板", "笔记本", "智能家居", "配件", "推荐", "对比"],
    "健身运动": ["健身", "减脂", "增肌", "瑜伽", "跑步", "拉伸", "饮食", "计划", "教程", "打卡"],
    "旅行攻略": ["旅行", "攻略", "打卡", "小众", "自驾", "穷游", "酒店", "美食", "拍照", "路线"],
  };

  const words = industryKeywords[industry] || industryKeywords["美妆护肤"] || [];
  for (const word of words) {
    if (text.includes(word)) {
      keywords.push(word);
    }
  }

  // 如果没匹配到，返回行业名本身
  if (keywords.length === 0) {
    keywords.push(industry);
  }

  return keywords.slice(0, 5);
}

// ─── 标签推荐（基于行业和热度） ─────────────────────────────────────
function generateSmartTags(product: string, industry: string): {
  hot: string[];
  niche: string[];
  longtail: string[];
} {
  const tagDB: Record<string, { hot: string[]; niche: string[]; longtail: string[] }> = {
    "美妆护肤": {
      hot: ["好物推荐", "平价好物", "必买清单", "护肤", "美妆", "种草", "合集"],
      niche: ["油皮护肤", "敏感肌", "学生党", "平价替代", "国货护肤", "成分党"],
      longtail: ["油皮夏天护肤步骤", "平价防晒推荐学生", "敏感肌护肤品合集", "国货护肤真实测评"],
    },
    "服装穿搭": {
      hot: ["穿搭", "OOTD", "显瘦", "搭配", "日常穿搭", "今日穿搭", "穿搭分享"],
      niche: ["微胖穿搭", "小个子穿搭", "通勤穿搭", "约会穿搭", "韩系穿搭", "日系穿搭"],
      longtail: ["155小个子穿搭显高", "微胖女生秋冬穿搭", "通勤穿搭简约气质", "约会穿搭甜美可爱"],
    },
    "美食探店": {
      hot: ["美食", "探店", "好吃", "推荐", "必吃", "美食推荐", "吃货"],
      niche: ["减脂餐", "早餐", "甜品", "咖啡", "火锅", "烘焙", "家常菜"],
      longtail: ["减脂期一周食谱", "早餐做法简单快速", "咖啡店推荐拍照好看", "家常菜简单好做"],
    },
    "家居好物": {
      hot: ["好物", "家居", "收纳", "装修", "好物推荐", "家居好物", "生活"],
      niche: ["租房改造", "小户型", "智能家居", "清洁", "断舍离", "软装搭配"],
      longtail: ["租房改造低成本", "小户型收纳技巧", "智能家居好物推荐", "清洁好物合集"],
    },
  };

  const tags = tagDB[industry] || tagDB["美妆护肤"];

  // 基于产品名生成长尾标签
  const customLongtail = [
    `${product}推荐`,
    `${product}测评`,
    `${product}好用吗`,
    `平价${product}推荐`,
    `${product}怎么选`,
  ];

  return {
    hot: tags.hot,
    niche: tags.niche,
    longtail: [...customLongtail, ...tags.longtail].slice(0, 8),
  };
}

// ─── 主 API：获取行业数据 ──────────────────────────────────────────
export async function fetchIndustryData(
  product: string,
  industry: string,
  keyword?: string
): Promise<IndustryData> {
  const searchKeyword = keyword || `${product} ${industry}`;

  console.log(`\n[DataEngine] 开始获取行业数据: "${searchKeyword}"`);
  console.log("─".repeat(50));

  // 并行获取数据
  const [searchResults, trendingTopics] = await Promise.all([
    searchViaWeb(searchKeyword, 10),
    fetchTrendingTopics(industry),
  ]);

  console.log(`[DataEngine] 搜索结果: ${searchResults.length} 条`);
  console.log(`[DataEngine] 热点话题: ${trendingTopics.length} 个`);

  // 尝试抓取前几个公开笔记的详情
  const detailedResults: ContentData[] = [];
  for (const result of searchResults.slice(0, 5)) {
    if (result.url.includes("xiaohongshu.com")) {
      const detail = await fetchPublicNote(result.url);
      if (detail) {
        detailedResults.push(detail);
        // 随机延迟
        await new Promise((r) => setTimeout(r, 1000 + Math.random() * 2000));
      }
    }
  }

  // 合并结果
  const allNotes = [...detailedResults, ...searchResults.filter((r) => !detailedResults.find((d) => d.url === r.url))];

  // 生成智能标签
  const tags = generateSmartTags(product, industry);

  // 分析内容模式
  const titles = allNotes.map((n) => n.title).filter(Boolean);
  const avgTitleLength = titles.length > 0 ? titles.reduce((a, b) => a + b.length, 0) / titles.length : 20;

  // 提取常见词
  const allText = titles.join("");
  const wordFreq: Record<string, number> = {};
  for (const tag of [...tags.hot, ...tags.niche]) {
    const count = allText.split(tag).length - 1;
    if (count > 0) wordFreq[tag] = count;
  }

  console.log(`[DataEngine] 最终数据: ${allNotes.length} 篇内容, ${tags.hot.length + tags.niche.length + tags.longtail.length} 个标签`);
  console.log("─".repeat(50) + "\n");

  return {
    hotTopics: trendingTopics,
    competitorNotes: allNotes.slice(0, 10),
    popularTags: [...tags.hot, ...tags.niche],
    contentPatterns: {
      avgTitleLength: Math.round(avgTitleLength),
      commonWords: Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([w]) => w),
      emojiFrequency: {},
    },
  };
}
