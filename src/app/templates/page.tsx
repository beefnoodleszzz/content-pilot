import type { Metadata } from "next";
import Link from "next/link";
import {
  Rocket, Sparkles, Shirt, UtensilsCrossed, Home, Baby,
  Smartphone, Dumbbell, Plane, Briefcase, Cat, BookOpen,
  Heart, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "内容模板库 - 各行业小红书/抖音文案模板",
  description: "精选各行业小红书文案模板和抖音内容模板。美妆、服装、美食、家居、母婴等行业模板，直接套用，快速出稿。",
  keywords: ["小红书模板", "抖音模板", "文案模板", "小红书文案模板", "内容创作模板"],
  alternates: { canonical: "https://contentpilot.ai/templates" },
};

const TEMPLATES = [
  { icon: Sparkles, name: "美妆护肤", desc: "种草、测评、教程文案模板", count: 12 },
  { icon: Shirt, name: "服装穿搭", desc: "OOTD、搭配推荐模板", count: 10 },
  { icon: UtensilsCrossed, name: "美食探店", desc: "探店打卡、食谱分享模板", count: 8 },
  { icon: Home, name: "家居好物", desc: "好物推荐、家居改造模板", count: 8 },
  { icon: Baby, name: "母婴育儿", desc: "育儿经验、好物分享模板", count: 6 },
  { icon: Smartphone, name: "数码科技", desc: "产品测评、开箱体验模板", count: 6 },
  { icon: Dumbbell, name: "健身运动", desc: "健身教程、饮食计划模板", count: 6 },
  { icon: Plane, name: "旅行攻略", desc: "旅行日记、攻略分享模板", count: 6 },
  { icon: Briefcase, name: "职场成长", desc: "职场经验、技能分享模板", count: 6 },
  { icon: Cat, name: "宠物用品", desc: "萌宠日常、好物推荐模板", count: 6 },
  { icon: BookOpen, name: "教育培训", desc: "学习方法、课程推荐模板", count: 4 },
  { icon: Heart, name: "健康养生", desc: "养生知识、产品推荐模板", count: 4 },
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-border/30 text-muted-foreground">模板库</Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-heading">内容模板库</h1>
            <p className="text-muted-foreground mt-2">各行业小红书/抖音文案模板，直接套用，快速出稿</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {TEMPLATES.map((t, i) => (
              <Card key={i} className="border-border/20 bg-card/50 hover:border-primary/20 transition-colors group">
                <CardContent className="p-5 text-center">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <t.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-1 font-heading">{t.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{t.desc}</p>
                  <span className="text-xs text-primary">{t.count} 个模板</span>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">需要更多模板？AI 可以为任何行业生成定制模板</p>
            <Button className="gradient-bg" render={<Link href="/tool" />} nativeButton={false}>
              用 AI 生成定制模板
              <ArrowRight className="size-4" data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border/30 text-center text-sm text-muted-foreground">
        © 2026 ContentPilot · <Link href="/" className="hover:text-foreground transition-colors">首页</Link>
      </footer>
    </main>
  );
}
