import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, ArrowLeft, Wand2, Zap, Database, TrendingUp, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentGenerator } from "@/components/ContentGenerator";

export const metadata: Metadata = {
  title: "AI 内容策划工具",
  description:
    "输入产品信息，AI 自动生成小红书选题、爆款文案、封面策略和标签推荐。支持深度分析模式，基于真实数据生成。",
  alternates: { canonical: "https://contentpilot.ai/tool" },
};

export default function ToolPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="bg-background/60 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl">
            <div className="size-8 gradient-bg rounded-lg flex items-center justify-center">
              <Rocket className="size-4 text-white" />
            </div>
            <span className="font-heading text-xl tracking-tight">ContentPilot</span>
          </Link>
          <Button variant="ghost" size="sm" render={<Link href="/" />} nativeButton={false}>
            <ArrowLeft className="size-3.5" data-icon="inline-start" />
            返回首页
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 font-heading">
            <span className="gradient-text">AI 内容策划工具</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            输入产品信息，一键生成小红书/抖音爆款内容
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="border-border/20 bg-card/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="size-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Zap className="size-4 text-amber-400" />
                </div>
                <div>
                  <div className="font-semibold text-sm">快速模式</div>
                  <div className="text-xs text-muted-foreground">10 秒出稿</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                AI 基于行业知识直接生成，速度快，适合日常内容创作
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Database className="size-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">深度分析模式</div>
                  <div className="text-xs text-muted-foreground">1-2 分钟</div>
                </div>
                <Badge variant="outline" className="ml-auto text-[10px] border-primary/30 text-primary">推荐</Badge>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                {[
                  { icon: Search, text: "搜索引擎抓取同行业真实内容" },
                  { icon: TrendingUp, text: "聚合当前热门话题和关键词" },
                  { icon: Sparkles, text: "AI 提炼爆款因子，融合生成" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <item.icon className="size-3 text-primary" />
                    {item.text}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Generator */}
        <ContentGenerator />

        {/* Tips */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground/60">
            深度分析模式需要配置 Brave Search API Key 才能获取真实搜索数据 ·
            <Link href="/" className="text-primary/60 hover:text-primary ml-1">了解更多</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
