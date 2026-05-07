import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "2026 小红书文案写作完整指南",
  description: "手把手教你写小红书爆款文案，包含选题技巧、标题公式、正文结构、标签策略。",
  alternates: { canonical: "https://contentpilot.ai/blog/xiaohongshu-writing-guide" },
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

      <article className="max-w-3xl mx-auto px-6 py-12">
        <Button variant="ghost" size="sm" render={<Link href="/blog" />} nativeButton={false} className="mb-6">
          <ArrowLeft className="size-3.5" data-icon="inline-start" />
          返回博客
        </Button>

        <Badge variant="outline" className="mb-4 border-border/30">小红书运营</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight font-heading">
          2026 小红书文案写作完整指南：从选题到爆款的全流程
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
          <span className="flex items-center gap-1"><Calendar className="size-3.5" /> 2026-05-01</span>
          <span className="flex items-center gap-1"><Clock className="size-3.5" /> 阅读约 8 分钟</span>
        </div>

        <div className="flex flex-col gap-6 text-foreground/85 leading-relaxed">
          <p className="text-lg">
            小红书已经成为品牌营销和自媒体变现的核心平台之一。但很多创作者发现，辛辛苦苦写的内容只有几十个阅读。问题出在哪？
          </p>

          <h2 className="text-2xl font-bold mt-4 font-heading text-foreground">一、选题：爆款笔记的起点</h2>
          <p>选题决定了你的内容天花板。一个好的选题，即使文案写得一般，也能获得不错的流量。</p>
          <ul className="flex flex-col gap-2 ml-4">
            <li><strong>痛点选题</strong>：用户遇到的问题就是最好的选题。'油皮夏天怎么办''平价替代推荐'都是天然的爆款选题。</li>
            <li><strong>热点选题</strong>：结合当前热门话题，但要找到独特的切入角度。</li>
            <li><strong>反常识选题</strong>：'千万别再这样做了''90%的人都不知道'——反常识的内容天然吸引注意力。</li>
          </ul>

          <h2 className="text-2xl font-bold mt-4 font-heading text-foreground">二、标题：决定用户是否点击</h2>
          <p>小红书的标题只有 20 个字的展示空间，这 20 个字决定了用户是否会点进来看。</p>
          <ul className="flex flex-col gap-2 ml-4">
            <li><strong>数字型</strong>：'这 5 个防晒误区你中了几个？'</li>
            <li><strong>对比型</strong>：'用了这个方法，阅读量从 100 到 10000'</li>
            <li><strong>痛点型</strong>：'油皮亲妈！这个平价防晒我回购了 3 次'</li>
            <li><strong>悬念型</strong>：'后悔没早点知道的 XX 个技巧'</li>
          </ul>

          <h2 className="text-2xl font-bold mt-4 font-heading text-foreground">三、正文：让用户读完并行动</h2>
          <ol className="flex flex-col gap-2 ml-4 list-decimal">
            <li><strong>开头（前 3 秒）</strong>：直击痛点，让用户觉得'这说的就是我'</li>
            <li><strong>中间（核心内容）</strong>：分点说明，每点配 emoji，易于阅读</li>
            <li><strong>结尾（CTA）</strong>：引导互动，'你们觉得呢？评论区聊聊'</li>
          </ol>

          <h2 className="text-2xl font-bold mt-4 font-heading text-foreground">四、标签：被发现的关键</h2>
          <p>标签是小红书 SEO 的核心。建议使用 5-10 个标签，分三层：</p>
          <ul className="flex flex-col gap-2 ml-4">
            <li><strong>热门标签（2-3 个）</strong>：获取基础曝光，如 #好物推荐 #平价好物</li>
            <li><strong>精准标签（2-3 个）</strong>：触达目标用户，如 #油皮防晒 #学生党护肤</li>
            <li><strong>长尾标签（2-3 个）</strong>：降低竞争，如 #军训防晒攻略 #平价防晒测评</li>
          </ul>

          <Card className="border-primary/20 bg-primary/5 mt-4">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2 font-heading text-foreground">用 AI 加速创作</h3>
              <p className="text-sm text-muted-foreground mb-4">
                以上每一步，ContentPilot 都能帮你自动完成。输入产品信息，10 秒生成完整的选题、文案和标签方案。
              </p>
              <Button className="gradient-bg" render={<Link href="/tool" />} nativeButton={false}>
                免费试试 AI 写文案
              </Button>
            </CardContent>
          </Card>
        </div>
      </article>

      <footer className="py-8 border-t border-border/30 text-center text-sm text-muted-foreground">
        © 2026 ContentPilot · <Link href="/" className="hover:text-foreground transition-colors">首页</Link>
      </footer>
    </main>
  );
}
