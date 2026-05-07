import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, Sparkles, Shield, Tag, PenTool, Zap, ArrowRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "小红书文案生成器 - 免费AI自动生成爆款文案",
  description:
    "免费的小红书文案生成器，输入产品信息一键生成种草文案、教程文案、测评文案。比ChatGPT更懂小红书，自动检测违禁词，智能推荐标签。",
  keywords: ["小红书文案生成器", "小红书文案", "AI写小红书", "小红书爆款文案", "小红书种草文案", "免费文案生成器"],
  alternates: { canonical: "https://contentpilot.ai/xiaohongshu-wen-an-sheng-cheng-qi" },
};

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

      <section className="pt-20 pb-24 px-6 relative overflow-hidden mesh-gradient">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge variant="outline" className="mb-6 gap-2 border-primary/30 text-primary bg-primary/5">
            <Zap className="size-3.5" />
            免费在线工具
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tighter font-heading">
            小红书文案生成器
            <br />
            <span className="gradient-text">AI 一键生成爆款文案</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            不会写小红书文案？输入产品信息，AI 自动生成种草型、教程型、测评型三种风格的爆款文案。自动检测违禁词，智能推荐高流量标签。
          </p>
          <Button size="lg" className="gradient-bg text-base h-12 px-8 glow-primary-sm" render={<Link href="/tool" />} nativeButton={false}>
            <PenTool className="size-4" data-icon="inline-start" />
            免费生成小红书文案
          </Button>
          <p className="text-xs text-muted-foreground/60 mt-4">无需注册 · 完全免费 · 10 秒出稿</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-heading">为什么选择 ContentPilot？</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Target, title: "专为小红书优化", desc: "深度学习爆款笔记风格，生成的文案自然有温度", accent: "from-blue-500/20 to-cyan-500/20" },
              { icon: Shield, title: "自动检测违禁词", desc: "内置违禁词库，自动检测限流词，避免被限流", accent: "from-emerald-500/20 to-green-500/20" },
              { icon: Tag, title: "智能标签推荐", desc: "三层标签策略：热门获取流量，精准提升转化，长尾降低竞争", accent: "from-purple-500/20 to-violet-500/20" },
            ].map((item, i) => (
              <Card key={i} className="border-border/20 bg-card/50 hover:border-primary/20 transition-colors">
                <CardContent className="pt-6">
                  <div className={`size-11 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center mb-4`}>
                    <item.icon className="size-5 text-foreground/80" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 font-heading">小红书文案写作技巧</h2>
          <div className="flex flex-col gap-6 text-foreground/80">
            {[
              { title: "1. 标题要有数字或对比", desc: "'这 5 个防晒误区你中了几个？'比'防晒知识分享'吸引人 10 倍。" },
              { title: "2. 开头要直击痛点", desc: "前 3 秒决定用户是否继续看。用痛点开头：'油皮夏天真的太难了...'" },
              { title: "3. 文案要口语化", desc: "小红书是'种草'平台，用户想看朋友推荐，不是广告。" },
              { title: "4. 结尾要有 CTA", desc: "引导用户互动：'你们觉得呢？评论区聊聊''收藏起来慢慢看'。" },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-muted/20 border border-border/20">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button className="gradient-bg" render={<Link href="/tool" />} nativeButton={false}>
              试试 AI 帮你写
              <ArrowRight className="size-4" data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border/30 text-center text-sm text-muted-foreground">
        © 2026 ContentPilot · <Link href="/" className="hover:text-foreground transition-colors">首页</Link> · <Link href="/tool" className="hover:text-foreground transition-colors">AI 工具</Link>
      </footer>
    </main>
  );
}
