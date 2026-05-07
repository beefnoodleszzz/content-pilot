import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "小红书运营博客 - 内容营销干货分享",
  description: "分享小红书运营技巧、抖音内容策略、AI内容营销干货。",
  alternates: { canonical: "https://contentpilot.ai/blog" },
};

const POSTS = [
  { slug: "xiaohongshu-writing-guide", title: "2026 小红书文案写作完整指南：从选题到爆款的全流程", excerpt: "手把手教你写小红书爆款文案，包含选题技巧、标题公式、正文结构、标签策略。", date: "2026-05-01", tag: "小红书运营" },
  { slug: "douyin-content-strategy", title: "抖音内容策略：如何用 AI 批量产出高质量短视频脚本", excerpt: "介绍如何利用 AI 工具高效产出抖音内容，从选题到脚本到发布的完整工作流。", date: "2026-04-28", tag: "抖音运营" },
  { slug: "ai-content-marketing", title: "AI 内容营销实战：10 分钟完成以前 3 小时的工作", excerpt: "展示如何用 AI 工具将内容创作效率提升 10 倍，同时保持内容质量。", date: "2026-04-25", tag: "AI 工具" },
  { slug: "xiaohongshu-seo-guide", title: "小红书 SEO 完全指南：让你的笔记被更多人看到", excerpt: "深入解析小红书搜索算法，教你通过标签优化、关键词布局提升笔记曝光。", date: "2026-04-20", tag: "小红书运营" },
  { slug: "forbidden-words-guide", title: "小红书违禁词大全：2026 最新限流词列表", excerpt: "整理了小红书最新的违禁词和限流词，帮你避免内容被限流。", date: "2026-04-15", tag: "运营避坑" },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="bg-background/60 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl">
            <div className="size-8 gradient-bg rounded-lg flex items-center justify-center">
              <Rocket className="size-4 text-white" />
            </div>
            <span className="font-heading text-xl tracking-tight">ContentPilot</span>
          </Link>
        </div>
      </header>

      <section className="pt-16 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="size-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading">运营干货博客</h1>
              <p className="text-muted-foreground text-sm">小红书运营、抖音内容策略、AI 内容营销实战技巧</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {POSTS.map((post) => (
              <Card key={post.slug} className="border-border/20 bg-card/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs border-border/30">{post.tag}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="size-3" />
                      {post.date}
                    </span>
                  </div>
                  <h2 className="font-bold text-lg mb-1.5">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border/30 text-center text-sm text-muted-foreground">
        © 2026 ContentPilot · <Link href="/" className="hover:text-foreground transition-colors">首页</Link>
      </footer>
    </main>
  );
}
