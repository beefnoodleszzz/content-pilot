import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, Video, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "抖音选题工具 - AI智能推荐热门选题",
  description: "免费的抖音选题工具，基于实时热点和行业数据，AI智能推荐高流量选题方向。告别灵感枯竭，每天都有新选题。",
  keywords: ["抖音选题工具", "抖音选题", "抖音热门选题", "抖音内容策划", "抖音爆款选题", "AI选题工具"],
  alternates: { canonical: "https://contentpilot.ai/douyin-xuan-ti-gong-ju" },
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
            <Video className="size-3.5" />
            抖音创作者必备
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tighter font-heading">
            抖音选题工具
            <br />
            <span className="gradient-text">AI 智能推荐热门选题</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            每天不知道拍什么？ContentPilot 基于实时热点和行业数据，为你智能推荐高流量选题方向。
          </p>
          <Button size="lg" className="gradient-bg text-base h-12 px-8 glow-primary-sm" render={<Link href="/tool" />} nativeButton={false}>
            <Video className="size-4" data-icon="inline-start" />
            免费获取抖音选题
          </Button>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-heading">抖音选题的 3 个黄金法则</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { num: "01", title: "蹭热点但不跟风", desc: "结合行业热点，找到独特的切入角度。" },
              { num: "02", title: "痛点即选题", desc: "用户遇到的问题就是最好的选题。" },
              { num: "03", title: "反常识制造冲突", desc: "反常识的内容天然吸引注意力，完播率更高。" },
            ].map((item, i) => (
              <Card key={i} className="border-border/20 bg-card/50">
                <CardContent className="p-6">
                  <div className="text-5xl font-black text-foreground/[0.04] font-heading mb-3">{item.num}</div>
                  <h3 className="font-semibold text-lg mb-2 font-heading">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-border/30 text-center">
        <h2 className="text-2xl font-bold mb-3 font-heading">还在手动想选题？</h2>
        <p className="text-muted-foreground mb-8">让 AI 帮你批量生成选题，10 秒搞定一周的内容规划</p>
        <Button className="gradient-bg" render={<Link href="/tool" />} nativeButton={false}>
          <Zap className="size-4" data-icon="inline-start" />
          立即体验
        </Button>
      </section>

      <footer className="py-8 border-t border-border/30 text-center text-sm text-muted-foreground">
        © 2026 ContentPilot · <Link href="/" className="hover:text-foreground transition-colors">首页</Link> · <Link href="/tool" className="hover:text-foreground transition-colors">AI 工具</Link>
      </footer>
    </main>
  );
}
