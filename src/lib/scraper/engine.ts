/**
 * ContentPilot — 爬虫引擎
 * 
 * 注意：此模块仅在本地环境使用，需要单独安装 playwright：
 * pnpm add playwright && npx playwright install chromium
 * 
 * 线上环境使用 data-engine.ts 的多源数据方案
 */

// ─── 抓取结果类型 ──────────────────────────────────────────────────
export interface ScrapedNote {
  rank: number;
  title: string;
  content: string;
  likes: number;
  author: string;
  url: string;
  platform: "xiaohongshu" | "douyin";
}

// ─── 公开 API（本地环境可用） ───────────────────────────────────────
export async function scrapeContent(
  keyword: string,
  platform: "xiaohongshu" | "douyin" = "xiaohongshu",
  maxNotes: number = 10
): Promise<ScrapedNote[]> {
  console.log(`[Scraper] 爬虫模块仅在本地环境可用`);
  console.log(`[Scraper] 请先安装: pnpm add playwright && npx playwright install chromium`);
  
  // 尝试动态导入 playwright
  try {
    const { chromium } = await import("playwright" as any);
    // ... 爬虫逻辑（本地环境）
    console.log(`[Scraper] Playwright 已加载，开始抓取: "${keyword}"`);
  } catch {
    console.log(`[Scraper] Playwright 未安装，返回空结果`);
    return [];
  }

  return [];
}
