/**
 * ContentPilot — 爬虫引擎
 * 
 * 支持小红书搜索页抓取，提取高赞笔记的标题、正文、点赞数。
 * 内置防封禁策略：随机 UA、随机延迟、视口模拟、Cookie 持久化。
 */

import { chromium, type Browser, type Page } from "playwright";

// ─── 随机 User-Agent 池 ───────────────────────────────────────────
const USER_AGENTS = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
];

// ─── 随机延迟 ─────────────────────────────────────────────────────
function randomDelay(min: number, max: number): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomUA(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

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

// ─── 小红书搜索抓取 ────────────────────────────────────────────────
async function scrapeXiaohongshu(
  keyword: string,
  maxNotes: number = 10
): Promise<ScrapedNote[]> {
  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--disable-features=IsolateOrigins,site-per-process",
        "--no-sandbox",
      ],
    });

    const context = await browser.newContext({
      userAgent: randomUA(),
      viewport: { width: 1440, height: 900 },
      locale: "zh-CN",
      timezoneId: "Asia/Shanghai",
      // 模拟真实设备特征
      deviceScaleFactor: 2,
      hasTouch: false,
      isMobile: false,
    });

    // 注入反检测脚本
    await context.addInitScript(() => {
      // 隐藏 webdriver 标志
      Object.defineProperty(navigator, "webdriver", { get: () => false });
      // 隐藏 Playwright 特征
      delete (window as any).__playwright;
      delete (window as any).__pw_manual;
      // 模拟 Chrome 特征
      (window as any).chrome = { runtime: {} };
      // 模拟 plugins
      Object.defineProperty(navigator, "plugins", {
        get: () => [1, 2, 3, 4, 5],
      });
      // 模拟 languages
      Object.defineProperty(navigator, "languages", {
        get: () => ["zh-CN", "zh", "en"],
      });
    });

    const page: Page = await context.newPage();

    // 先访问首页，获取 Cookie
    console.log("[Scraper] 访问小红书首页...");
    await page.goto("https://www.xiaohongshu.com", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await randomDelay(2000, 4000);

    // 搜索关键词
    const searchUrl = `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(keyword)}&source=web_search_result_notes&type=51&sort=general`;
    console.log(`[Scraper] 搜索: ${keyword}`);
    await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await randomDelay(3000, 5000);

    // 等待内容加载
    try {
      await page.waitForSelector('section.note-item, [data-note-id], .note-item, a[href*="/explore/"]', { timeout: 10000 });
    } catch {
      console.log("[Scraper] 未找到标准选择器，尝试备用方案...");
    }

    // 滚动加载更多内容
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.8));
      await randomDelay(1500, 3000);
    }

    // 提取笔记数据
    const notes: ScrapedNote[] = await page.evaluate((max) => {
      const results: any[] = [];

      // 多种选择器策略
      const selectors = [
        'section.note-item',
        '[data-note-id]',
        '.note-item',
        'a[href*="/explore/"]',
        'a[href*="/search_result/"]',
        '.feeds-container section',
        'div[class*="note"]',
      ];

      let elements: Element[] = [];
      for (const sel of selectors) {
        elements = Array.from(document.querySelectorAll(sel));
        if (elements.length > 0) break;
      }

      // 如果标准选择器都不 work，尝试通过结构特征找
      if (elements.length === 0) {
        // 找所有包含图片和文字的卡片
        const allLinks = Array.from(document.querySelectorAll('a[href]'));
        elements = allLinks.filter((a) => {
          const href = a.getAttribute("href") || "";
          return (href.includes("/explore/") || href.includes("/discovery/item/")) && a.querySelector("img");
        });
      }

      elements.slice(0, max).forEach((el, i) => {
        const titleEl = el.querySelector('[class*="title"], .title, span, h3, h2');
        const authorEl = el.querySelector('[class*="author"], [class*="name"], .author');
        const likeEl = el.querySelector('[class*="like"], [class*="count"], .like-count');
        const linkEl = el.tagName === "A" ? el : el.querySelector("a[href]");

        const title = titleEl?.textContent?.trim() || "";
        const author = authorEl?.textContent?.trim() || "";
        const likesText = likeEl?.textContent?.trim() || "0";
        const likes = parseInt(likesText.replace(/[^\d]/g, "")) || 0;
        const href = linkEl?.getAttribute("href") || "";
        const url = href.startsWith("http") ? href : `https://www.xiaohongshu.com${href}`;

        if (title) {
          results.push({
            rank: i + 1,
            title,
            content: "", // 搜索页通常没有正文，需要进入详情页
            likes,
            author,
            url,
            platform: "xiaohongshu",
          });
        }
      });

      return results;
    }, maxNotes);

    console.log(`[Scraper] 搜索页提取到 ${notes.length} 篇笔记`);

    // 进入详情页抓取正文（限制并发，避免封禁）
    for (let i = 0; i < Math.min(notes.length, maxNotes); i++) {
      try {
        console.log(`[Scraper] 抓取详情 ${i + 1}/${notes.length}: ${notes[i].title.slice(0, 20)}...`);
        await page.goto(notes[i].url, { waitUntil: "domcontentloaded", timeout: 20000 });
        await randomDelay(2000, 4000);

        const content = await page.evaluate(() => {
          // 尝试多种正文选择器
          const selectors = [
            '[class*="content"] .note-text',
            '[class*="desc"]',
            '[class*="content"]',
            '.note-content',
            '#detail-desc',
            '[class*="note-text"]',
            'article',
          ];

          for (const sel of selectors) {
            const el = document.querySelector(sel);
            if (el && el.textContent && el.textContent.trim().length > 20) {
              return el.textContent.trim();
            }
          }

          // 兜底：找最长的文本块
          const allText = Array.from(document.querySelectorAll("p, span, div"))
            .map((el) => ({ el, text: el.textContent?.trim() || "" }))
            .filter((item) => item.text.length > 30 && item.text.length < 2000)
            .sort((a, b) => b.text.length - a.text.length);

          return allText[0]?.text || "";
        });

        notes[i].content = content;

        // 更新点赞数（详情页通常更准确）
        const likes = await page.evaluate(() => {
          const likeSelectors = [
            '[class*="like"] [class*="count"]',
            '[class*="like-count"]',
            'span[class*="like"]',
          ];
          for (const sel of likeSelectors) {
            const el = document.querySelector(sel);
            if (el) {
              const text = el.textContent?.trim() || "0";
              return parseInt(text.replace(/[^\d]/g, "")) || 0;
            }
          }
          return 0;
        });
        if (likes > 0) notes[i].likes = likes;

        await randomDelay(1500, 3000);
      } catch (err) {
        console.log(`[Scraper] 详情页抓取失败: ${err}`);
      }
    }

    // 按点赞数排序
    notes.sort((a, b) => b.likes - a.likes);

    return notes.slice(0, maxNotes);
  } finally {
    if (browser) await browser.close();
  }
}

// ─── 公开 API ──────────────────────────────────────────────────────
export async function scrapeContent(
  keyword: string,
  platform: "xiaohongshu" | "douyin" = "xiaohongshu",
  maxNotes: number = 10
): Promise<ScrapedNote[]> {
  console.log(`\n${"═".repeat(50)}`);
  console.log(`[Scraper] 开始抓取: "${keyword}" @ ${platform}`);
  console.log(`${"═".repeat(50)}\n`);

  const startTime = Date.now();

  let notes: ScrapedNote[];
  if (platform === "xiaohongshu") {
    notes = await scrapeXiaohongshu(keyword, maxNotes);
  } else {
    // 抖音暂时用同样的结构，后续扩展
    throw new Error("抖音抓取暂未实现，请使用小红书");
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n[Scraper] 完成！共 ${notes.length} 篇，耗时 ${elapsed}s`);
  console.log(`[Scraper] Top 3:`);
  notes.slice(0, 3).forEach((n, i) => {
    console.log(`  ${i + 1}. [${n.likes}赞] ${n.title.slice(0, 40)}...`);
  });

  return notes;
}
