import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, Shield, Tag, BarChart3, PenTool, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "免费小红书运营工具 - 违禁词检测、标签推荐、标题打分",
  description: "免费的小红书运营工具集合：违禁词检测、标签推荐、标题打分、文案润色。",
  keywords: ["免费小红书工具", "小红书违禁词检测", "小红书标签推荐", "小红书标题打分", "免费运营工具"],
  alternates: { canonical: "https://contentpilot.ai/free" },
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

      <section className="pt-16 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-border/30 text-muted-foreground">免费工具</Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-heading">免费运营工具</h1>
            <p className="text-muted-foreground mt-2">帮你提升小红书/抖音内容质量和流量</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Shield, title: "违禁词检测", desc: "粘贴文案，自动检测违禁词和限流词，避免被限流", href: "/tool", accent: "from-red-500/20 to-orange-500/20" },
              { icon: Tag, title: "标签推荐器", desc: "输入关键词，智能推荐热门、精准和长尾标签组合", href: "/xiaohongshu-biao-qian-tui-jian", accent: "from-blue-500/20 to-cyan-500/20" },
              { icon: BarChart3, title: "标题打分器", desc: "输入标题，AI 从吸引力、关键词等维度打分并优化", href: "/tool", accent: "from-purple-500/20 to-violet-500/20" },
              { icon: PenTool, title: "文案润色器", desc: "粘贴文案，AI 帮你润色优化，让文案更有温度", href: "/tool", accent: "from-emerald-500/20 to-green-500/20" },
            ].map((tool, i) => (
              <Card key={i} className="border-border/20 bg-card/50 hover:border-primary/20 transition-colors group">
                <CardContent className="p-6">
                  <div className={`size-11 rounded-xl bg-gradient-to-br ${tool.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tool.icon className="size-5 text-foreground/80" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 font-heading">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tool.desc}</p>
                  <Link href={tool.href} className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                    免费使用 <ArrowRight className="size-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 gradient-bg border-0 text-center">
            <CardContent className="py-12 px-8">
              <h2 className="text-2xl font-bold mb-3 font-heading">一站式内容策划</h2>
              <p className="opacity-90 mb-6 max-w-md mx-auto">
                不想一个个工具分开用？ContentPilot AI 一次性搞定选题、文案、标签、封面
              </p>
              <Button size="lg" variant="secondary" render={<Link href="/tool" />} nativeButton={false}>
                <Zap className="size-4" data-icon="inline-start" />
                体验完整版 AI 工具
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 border-t border-border/30 text-center text-sm text-muted-foreground">
        © 2026 ContentPilot · <Link href="/" className="hover:text-foreground transition-colors">首页</Link>
      </footer>
    </main>
  );
}
