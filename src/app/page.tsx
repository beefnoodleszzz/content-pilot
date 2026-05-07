import Link from "next/link";
import {
  Rocket, Sparkles, Flame, PenTool, Shield, BarChart3,
  ChevronDown, FileText, Wand2, Copy, Check,
  Zap, ArrowRight, Star, Quote, Hash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/60 backdrop-blur-xl z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl">
            <div className="size-8 gradient-bg rounded-lg flex items-center justify-center glow-primary-sm">
              <Rocket className="size-4 text-white" />
            </div>
            <span className="font-heading text-xl tracking-tight">ContentPilot</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/tool", label: "AI 工具" },
              { href: "/templates", label: "模板库" },
              { href: "/blog", label: "博客" },
              { href: "/free", label: "免费工具" },
            ].map((item) => (
              <Button key={item.href} variant="ghost" size="sm" render={<Link href={item.href} />} nativeButton={false}>
                {item.label}
              </Button>
            ))}
            <Button size="sm" className="ml-3" render={<Link href="/tool" />} nativeButton={false}>
              开始创作
              <ArrowRight className="size-3.5" data-icon="inline-end" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden mesh-gradient">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 gap-2 border-primary/30 text-primary bg-primary/5">
              <Sparkles className="size-3.5" />
              AI 驱动的内容策划引擎
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95] tracking-tighter font-heading">
              <span className="text-foreground/90">别再猜了</span>
              <br />
              <span className="gradient-text">让 AI 帮你写爆款</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              输入产品信息，10 秒生成小红书选题 + 爆款文案 + 标签组合。
              <br className="hidden md:block" />
              比 ChatGPT 更懂平台规则，比你自己写更高效。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Button size="lg" className="gradient-bg text-base h-12 px-8 glow-primary-sm" render={<Link href="/tool" />} nativeButton={false}>
                <Zap className="size-4" data-icon="inline-start" />
                免费体验，无需注册
              </Button>
              <Button size="lg" variant="outline" className="text-base h-12 px-8 border-border/50" render={<a href="#demo" />} nativeButton={false}>
                看看效果
                <ChevronDown className="size-4" data-icon="inline-end" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground/60">每日 3 次免费生成 · 不需要信用卡</p>
          </div>

          {/* Product Demo - Floating UI */}
          <div id="demo" className="relative max-w-5xl mx-auto animate-fade-in-up">
            <div className="absolute -inset-4 bg-gradient-to-b from-primary/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />
            <Card className="relative border-border/30 bg-card/80 backdrop-blur-xl glow-primary overflow-hidden">
              <CardContent className="p-0">
                {/* Mock toolbar */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-border/30 bg-card/50">
                  <div className="size-2.5 rounded-full bg-red-500/80" />
                  <div className="size-2.5 rounded-full bg-yellow-500/80" />
                  <div className="size-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-muted-foreground">ContentPilot — AI 内容策划</span>
                </div>

                <div className="grid md:grid-cols-[280px_1fr] min-h-[420px]">
                  {/* Sidebar */}
                  <div className="border-r border-border/30 p-5 flex flex-col gap-4 bg-card/30">
                    <div className="flex flex-col gap-1.5">
                      <div className="text-xs text-muted-foreground font-medium">产品名称</div>
                      <div className="h-9 rounded-md bg-muted/50 border border-border/30 px-3 flex items-center text-sm">轻透防晒霜 SPF50+</div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-xs text-muted-foreground font-medium">行业</div>
                      <div className="h-9 rounded-md bg-muted/50 border border-border/30 px-3 flex items-center text-sm">美妆护肤</div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-xs text-muted-foreground font-medium">目标人群</div>
                      <div className="h-9 rounded-md bg-muted/50 border border-border/30 px-3 flex items-center text-sm">18-30 岁女性</div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-xs text-muted-foreground font-medium">平台</div>
                      <div className="flex gap-1.5">
                        <div className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">小红书</div>
                        <div className="px-3 py-1.5 rounded-md bg-muted/50 border border-border/30 text-xs text-muted-foreground">抖音</div>
                      </div>
                    </div>
                    <Button className="w-full gradient-bg mt-auto" size="sm">
                      <Wand2 className="size-3.5" data-icon="inline-start" />
                      生成内容方案
                    </Button>
                  </div>

                  {/* Output */}
                  <div className="p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                      <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                      AI 已生成 5 个选题
                    </div>

                    {[
                      { n: "01", title: "夏天不防晒，秋天徒伤悲｜这款防晒我回购了 3 次", tag: "种草型" },
                      { n: "02", title: "油皮亲测！SPF50+ 不搓泥不假白的平价防晒", tag: "测评型" },
                      { n: "03", title: "军训防晒攻略｜过来人的血泪经验都在这了", tag: "教程型" },
                    ].map((item) => (
                      <div key={item.n} className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/30 border border-border/20 hover:border-primary/20 transition-colors group">
                        <span className="text-xs text-muted-foreground font-mono mt-0.5">{item.n}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium mb-1.5 leading-snug">{item.title}</div>
                          <div className="flex gap-1.5">
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-border/30">
                              <PenTool className="size-2.5" data-icon="inline-start" />
                              {item.tag}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-border/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                              <Copy className="size-2.5" data-icon="inline-start" />
                              复制
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center gap-2 pt-2">
                      <div className="text-xs text-muted-foreground">推荐标签</div>
                      <div className="flex gap-1.5 flex-1 flex-wrap">
                        {["#防晒推荐", "#平价好物", "#油皮护肤", "#夏日必备", "#回购清单"].map((t) => (
                          <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16">
            {[
              { value: "10s", label: "平均生成时间" },
              { value: "10x", label: "效率提升" },
              { value: "3", label: "每日免费次数" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text font-heading">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 border-y border-border/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-40">
            {["小红书", "抖音", "B站", "公众号", "知乎"].map((name) => (
              <span key={name} className="text-lg font-medium tracking-wider font-heading">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pain → Solution */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-border/50 text-muted-foreground">为什么需要 ContentPilot</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-heading">
              用 ChatGPT 写内容？
              <br />
              <span className="text-muted-foreground">你遇到过这些问题</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Problems */}
            <div className="flex flex-col gap-4">
              <div className="text-sm font-medium text-red-400 mb-2 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-red-400" />
                没有 ContentPilot
              </div>
              {[
                "不知道写什么选题，对着编辑框发呆",
                "AI 生成的文案一看就是机器写的",
                "发了没流量，不知道为什么被限流",
                "标签靠猜，封面靠蒙",
                "一篇内容从构思到发布要 3 小时",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                  <span className="text-red-400 mt-0.5 text-sm">✕</span>
                  <span className="text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>

            {/* Solutions */}
            <div className="flex flex-col gap-4">
              <div className="text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                用 ContentPilot
              </div>
              {[
                "热点驱动选题，AI 基于实时数据推荐",
                "平台专属文案风格，自然看不出 AI 痕迹",
                "自动检测违禁词，避免被限流",
                "三层标签策略 + 封面设计建议",
                "10 秒出稿，一键复制直接发布",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <Check className="size-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-border/50 text-muted-foreground">核心能力</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-heading">
              不只是文案生成器
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              从选题到发布，覆盖内容创作全流程
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Flame,
                title: "热点选题引擎",
                desc: "实时追踪小红书/抖音热门话题，基于行业特征智能推荐选题方向",
                accent: "from-orange-500/20 to-red-500/20",
              },
              {
                icon: PenTool,
                title: "平台专属文案",
                desc: "深度学习爆款笔记风格，种草型/教程型/测评型一键切换",
                accent: "from-blue-500/20 to-cyan-500/20",
              },
              {
                icon: Shield,
                title: "合规检测",
                desc: "内置违禁词库，自动检测限流词、敏感内容，发布前排雷",
                accent: "from-emerald-500/20 to-green-500/20",
              },
              {
                icon: BarChart3,
                title: "批量生成",
                desc: "10 个选题 × 3 种风格 × 多版本文案，一次生成一周的量",
                accent: "from-purple-500/20 to-violet-500/20",
              },
              {
                icon: Hash,
                title: "智能标签",
                desc: "三层标签策略：热门获取曝光、精准提升转化、长尾降低竞争",
                accent: "from-pink-500/20 to-rose-500/20",
              },
              {
                icon: Star,
                title: "封面策略",
                desc: "基于爆款数据分析，给出构图、配色、文字排版建议",
                accent: "from-amber-500/20 to-yellow-500/20",
              },
            ].map((item, i) => (
              <Card key={i} className="border-border/20 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all group">
                <CardContent className="p-6">
                  <div className={`size-11 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="size-5 text-foreground/80" />
                  </div>
                  <h3 className="font-semibold text-base mb-2 font-heading">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-y border-border/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-heading">
              3 步出稿
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "输入", desc: "产品名称、行业、目标人群", icon: FileText },
              { step: "02", title: "生成", desc: "AI 分析热点，批量产出", icon: Wand2 },
              { step: "03", title: "发布", desc: "一键复制，直接发布", icon: Copy },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="text-7xl font-black text-foreground/[0.03] font-heading absolute -top-8 left-1/2 -translate-x-1/2 select-none">
                  {item.step}
                </div>
                <div className="relative">
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 border border-primary/10">
                    <item.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 font-heading">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-border/50 text-muted-foreground">用户反馈</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-heading">
              他们已经在用了
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                quote: "以前一篇笔记要磨半天，现在 10 分钟出 3 篇，质量还更好。",
                name: "小鱼",
                role: "美妆博主 · 2w 粉",
                stars: 5,
              },
              {
                quote: "标签推荐太准了，用了之后笔记平均阅读量翻了 3 倍。",
                name: "阿杰",
                role: "电商运营",
                stars: 5,
              },
              {
                quote: "违禁词检测救了我好几次，再也不用担心被限流了。",
                name: "圆圆",
                role: "生活方式博主 · 5w 粉",
                stars: 5,
              },
            ].map((item, i) => (
              <Card key={i} className="border-border/20 bg-card/50">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: item.stars }).map((_, j) => (
                      <Star key={j} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="size-5 text-muted-foreground/30 mb-2" />
                  <p className="text-sm leading-relaxed mb-4 text-foreground/80">{item.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center text-xs font-bold">
                      {item.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 font-heading">
            <span className="gradient-text">开始创作你的第一篇爆款</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            免费体验，无需注册，10 秒出稿
          </p>
          <Button size="lg" className="gradient-bg text-base h-14 px-10 glow-primary" render={<Link href="/tool" />} nativeButton={false}>
            <Rocket className="size-4" data-icon="inline-start" />
            免费开始创作
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2.5 font-bold text-lg mb-3">
                <div className="size-7 gradient-bg rounded-md flex items-center justify-center">
                  <Rocket className="size-3.5 text-white" />
                </div>
                <span className="font-heading">ContentPilot</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI 驱动的内容策划引擎
              </p>
            </div>
            {[
              {
                title: "产品",
                links: [
                  { href: "/tool", label: "AI 工具" },
                  { href: "/templates", label: "模板库" },
                  { href: "/free", label: "免费工具" },
                ],
              },
              {
                title: "资源",
                links: [
                  { href: "/blog", label: "博客" },
                  { href: "/blog/xiaohongshu-writing-guide", label: "写作指南" },
                  { href: "/blog/douyin-content-strategy", label: "抖音策略" },
                ],
              },
              {
                title: "工具",
                links: [
                  { href: "/xiaohongshu-wen-an-sheng-cheng-qi", label: "文案生成器" },
                  { href: "/douyin-xuan-ti-gong-ju", label: "选题工具" },
                  { href: "/xiaohongshu-biao-qian-tui-jian", label: "标签推荐" },
                ],
              },
            ].map((group) => (
              <div key={group.title}>
                <h4 className="font-semibold mb-3 text-sm text-foreground/60">{group.title}</h4>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8 bg-border/30" />
          <p className="text-center text-sm text-muted-foreground/60">
            © 2026 ContentPilot
          </p>
        </div>
      </footer>
    </main>
  );
}
