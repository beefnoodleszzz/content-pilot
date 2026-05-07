import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, Tag, Flame, Target, TrendingUp, Hash, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "小红书标签推荐 - 智能推荐高流量标签",
  description: "免费的小红书标签推荐工具，基于实时数据智能推荐热门标签、精准标签和长尾标签。",
  keywords: ["小红书标签推荐", "小红书标签", "小红书热门标签", "小红书标签怎么选", "小红书标签工具"],
  alternates: { canonical: "https://contentpilot.ai/xiaohongshu-biao-qian-tui-jian" },
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
            <Tag className="size-3.5" />
            标签优化神器
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tighter font-heading">
            小红书标签推荐
            <br />
            <span className="gradient-text">智能推荐高流量标签组合</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            标签选得好，流量少不了。三层标签组合：热门获取曝光、精准提升转化、长尾降低竞争。
          </p>
          <Button size="lg" className="gradient-bg text-base h-12 px-8 glow-primary-sm" render={<Link href="/tool" />} nativeButton={false}>
            <Tag className="size-4" data-icon="inline-start" />
            免费获取标签推荐
          </Button>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-heading">小红书标签策略</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Flame, title: "热门标签", desc: "搜索量大，竞争激烈，用于获取基础曝光", tags: ["#好物推荐", "#平价好物", "#必买清单"], accent: "from-orange-500/20 to-red-500/20" },
              { icon: Target, title: "精准标签", desc: "搜索量适中，竞争较小，精准触达目标用户", tags: ["#油皮防晒", "#学生党护肤", "#夏日必备"], accent: "from-blue-500/20 to-cyan-500/20" },
              { icon: TrendingUp, title: "长尾标签", desc: "搜索量小但精准，竞争极低，容易获得排名", tags: ["#军训防晒攻略", "#平价防晒测评", "#油皮亲妈防晒"], accent: "from-emerald-500/20 to-green-500/20" },
            ].map((item, i) => (
              <Card key={i} className="border-border/20 bg-card/50">
                <CardContent className="p-6">
                  <div className={`size-11 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center mb-4`}>
                    <item.icon className="size-5 text-foreground/80" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 font-heading">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-border/30 text-center">
        <h2 className="text-2xl font-bold mb-3 font-heading">不知道怎么选标签？</h2>
        <p className="text-muted-foreground mb-8">让 AI 帮你智能推荐，一键复制全部标签</p>
        <Button className="gradient-bg" render={<Link href="/tool" />} nativeButton={false}>
          试试 AI 标签推荐
          <ArrowRight className="size-4" data-icon="inline-end" />
        </Button>
      </section>

      <footer className="py-8 border-t border-border/30 text-center text-sm text-muted-foreground">
        © 2026 ContentPilot · <Link href="/" className="hover:text-foreground transition-colors">首页</Link> · <Link href="/tool" className="hover:text-foreground transition-colors">AI 工具</Link>
      </footer>
    </main>
  );
}
