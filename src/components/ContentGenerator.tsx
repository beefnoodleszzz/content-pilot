"use client";

import { useState } from "react";
import {
  Flame, PenTool, Palette, Tag, AlertTriangle,
  Copy, ChevronRight, Loader2, Wand2, FileText,
  Target, TrendingUp, Hash, Lightbulb, Check, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

interface ContentResult {
  // Pipeline v2 数据源信息
  dataSource?: {
    searchResults: number;
    detailedNotes: number;
    trendingTopics: number;
    tagsUsed: number;
  };
  referenceNotes?: { title: string; likes: number; source: string }[];
  viralFactors?: {
    corePainPoints: string[];
    titleFormulas: string[];
    emotionAnchors: string[];
    contentStructure: { hookType: string; bodyPattern: string; ctaStyle: string };
    writingTone: string;
  };
  // 通用内容
  topics: { title: string; hook: string; angle: string }[];
  copywriting: { style: string; content: string; cta: string }[];
  cover: { layout: string; colors: string; text: string; style: string };
  tags: { hot: string[]; niche: string[]; longtail: string[] };
  compliance: { warnings: string[]; suggestions: string[] };
}

const INDUSTRIES = [
  "美妆护肤", "服装穿搭", "美食探店", "家居好物", "母婴育儿",
  "数码科技", "健身运动", "旅行攻略", "职场成长", "宠物用品",
  "教育培训", "健康养生", "汽车", "理财投资", "其他",
];

export function ContentGenerator() {
  const [form, setForm] = useState({
    product: "",
    industry: "",
    audience: "",
    goal: "",
    platform: "小红书",
    competitor: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ContentResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [deepMode, setDeepMode] = useState(false);
  const [progress, setProgress] = useState("");

  const handleSubmit = async () => {
    if (!form.product || !form.industry) {
      setError("请填写产品名称和行业");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const apiEndpoint = deepMode ? "/api/scrape-generate" : "/api/generate";
      if (deepMode) setProgress("正在抓取真实爆款数据...");

      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "生成失败，请稍后重试");
      }
      const data = await res.json();
      setResult(data);
      setProgress("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "生成失败");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Form */}
      <Card className="border-border/30 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="size-5 text-primary" />
            输入产品信息
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="product">
                产品/品牌名称 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="product"
                placeholder="例：XX防晒霜"
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="industry">
                所属行业 <span className="text-destructive">*</span>
              </Label>
              <select
                id="industry"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
              >
                <option value="">选择行业z</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="audience">目标人群</Label>
              <Input
                id="audience"
                placeholder="例：18-30岁女性、大学生、宝妈"
                value={form.audience}
                onChange={(e) => setForm({ ...form, audience: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="goal">推广目标</Label>
              <Input
                id="goal"
                placeholder="例：种草带货、品牌曝光、引流到店"
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>发布平台</Label>
            <div className="flex gap-2">
              {["小红书", "抖音", "两者都要"].map((p) => (
                <Button
                  key={p}
                  variant={form.platform === p ? "default" : "outline"}
                  size="sm"
                  onClick={() => setForm({ ...form, platform: p })}
                  className={form.platform === p ? "" : "border-border/50"}
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="competitor">竞品账号（可选）</Label>
            <Input
              id="competitor"
              placeholder="输入竞品的小红书/抖音账号名"
              value={form.competitor}
              onChange={(e) => setForm({ ...form, competitor: e.target.value })}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center gap-3">
            <Button
              variant={deepMode ? "default" : "outline"}
              size="sm"
              onClick={() => setDeepMode(!deepMode)}
              className={deepMode ? "gradient-bg" : "border-border/50"}
            >
              {deepMode ? "🔬 深度分析模式" : "⚡ 快速模式"}
            </Button>
            {deepMode && (
              <span className="text-xs text-muted-foreground">
                基于真实爆款数据生成，质量更高
              </span>
            )}
          </div>

          <Button
            size="lg"
            className="w-full h-12 text-base gradient-bg glow-primary-sm"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
                {progress || "AI 正在生成中..."}
              </>
            ) : (
              <>
                <Wand2 className="size-4" data-icon="inline-start" />
                {deepMode ? "深度分析并生成" : "一键生成内容方案"}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <>
          {/* Data Source Info (深度分析模式) */}
          {result.dataSource && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-primary mb-3">
                  <BarChart3 className="size-4" />
                  数据来源
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "搜索结果", value: result.dataSource.searchResults, unit: "篇" },
                    { label: "详情抓取", value: result.dataSource.detailedNotes, unit: "篇" },
                    { label: "热点话题", value: result.dataSource.trendingTopics, unit: "个" },
                    { label: "标签使用", value: result.dataSource.tagsUsed, unit: "个" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-primary">{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>
                {result.referenceNotes && result.referenceNotes.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-primary/10">
                    <div className="text-xs text-muted-foreground mb-2">参考笔记：</div>
                    <div className="flex flex-col gap-1">
                      {result.referenceNotes.slice(0, 3).map((n, i) => (
                        <div key={i} className="text-xs text-foreground/70 flex items-center gap-2">
                          <span className="text-muted-foreground">{i + 1}.</span>
                          <span className="truncate">{n.title}</span>
                          {n.likes > 0 && <Badge variant="outline" className="text-[10px] px-1 py-0">{n.likes}赞</Badge>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <Tabs defaultValue="topics">
              <TabsList className="w-full justify-start rounded-none border-b border-border/30 bg-transparent h-auto p-0">
                {[
                  { value: "topics", label: "选题推荐", icon: Flame, count: result.topics.length },
                  { value: "copy", label: "文案生成", icon: PenTool, count: result.copywriting.length },
                  { value: "cover", label: "封面策略", icon: Palette },
                  { value: "tags", label: "标签推荐", icon: Tag },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary flex items-center gap-1.5 px-5 py-3"
                  >
                    <tab.icon className="size-4" />
                    {tab.label}
                    {tab.count && (
                      <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0">
                        {tab.count}
                      </Badge>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Topics */}
              <TabsContent value="topics" className="p-6 flex flex-col gap-3">
                {result.topics.map((topic, i) => (
                  <Card key={i} className="border-border/20 bg-muted/20 hover:border-primary/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <Badge variant="outline" className="mb-2 text-xs gap-1 border-border/30">
                            <Target className="size-3" />
                            选题 {i + 1}
                          </Badge>
                          <h3 className="font-bold text-base mb-1.5">{topic.title}</h3>
                          <p className="text-sm text-muted-foreground flex items-start gap-1.5">
                            <Lightbulb className="size-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                            {topic.hook}
                          </p>
                          <p className="text-xs text-muted-foreground/60 mt-1 flex items-start gap-1.5">
                            <ChevronRight className="size-3.5 flex-shrink-0 mt-0.5" />
                            {topic.angle}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs flex-shrink-0"
                          onClick={() => copyToClipboard(topic.title, `topic-${i}`)}
                        >
                          {copied === `topic-${i}` ? (
                            <><Check className="size-3" /> 已复制</>
                          ) : (
                            <><Copy className="size-3" /> 复制</>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Copywriting */}
              <TabsContent value="copy" className="p-6 flex flex-col gap-4">
                {result.copywriting.map((copy, i) => (
                  <Card key={i} className="border-border/20 bg-muted/20">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="gap-1 border-border/30">
                          <PenTool className="size-3" />
                          {copy.style}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => copyToClipboard(copy.content + "\n\n" + copy.cta, `copy-${i}`)}
                        >
                          {copied === `copy-${i}` ? (
                            <><Check className="size-3" /> 已复制</>
                          ) : (
                            <><Copy className="size-3" /> 复制全文</>
                          )}
                        </Button>
                      </div>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
                        {copy.content}
                      </div>
                      <Separator className="my-3 bg-border/30" />
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">CTA</div>
                        <div className="text-sm font-medium text-primary">{copy.cta}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Cover */}
              <TabsContent value="cover" className="p-6">
                {result.cover && (
                  <Card className="border-border/20 bg-muted/20">
                    <CardContent className="p-5">
                      <h3 className="font-bold flex items-center gap-2 mb-5">
                        <Palette className="size-5 text-primary" />
                        封面设计建议
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { label: "构图布局", value: result.cover.layout },
                          { label: "配色方案", value: result.cover.colors },
                          { label: "封面文字", value: result.cover.text },
                          { label: "整体风格", value: result.cover.style },
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
                            <p className="text-sm">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Tags */}
              <TabsContent value="tags" className="p-6 flex flex-col gap-4">
                {[
                  { label: "热门标签", icon: Flame, tags: result.tags.hot },
                  { label: "精准标签", icon: Target, tags: result.tags.niche },
                  { label: "长尾标签", icon: TrendingUp, tags: result.tags.longtail },
                ].map((group, gi) => (
                  <Card key={gi} className="border-border/20 bg-muted/20">
                    <CardContent className="p-4">
                      <h3 className="font-bold text-sm flex items-center gap-2 mb-3">
                        <group.icon className="size-4 text-primary" />
                        {group.label}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {group.tags.map((tag, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-colors gap-0.5 border-border/30"
                            onClick={() => copyToClipboard(`#${tag}`, `tag-${gi}-${i}`)}
                          >
                            <Hash className="size-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-border/30"
                  onClick={() => {
                    const all = [...result.tags.hot, ...result.tags.niche, ...result.tags.longtail]
                      .map((t) => `#${t}`)
                      .join(" ");
                    copyToClipboard(all, "all-tags");
                  }}
                >
                  {copied === "all-tags" ? (
                    <><Check className="size-4" /> 已复制全部标签</>
                  ) : (
                    <><Copy className="size-4" /> 一键复制全部标签</>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>

          {/* Compliance */}
          {result.compliance && result.compliance.warnings.length > 0 && (
            <div className="px-6 pb-6">
              <Alert>
                <AlertTriangle className="size-4" />
                <AlertDescription>
                  <div className="font-medium mb-1">合规提醒</div>
                  <ul className="flex flex-col gap-0.5">
                    {result.compliance.warnings.map((w, i) => (
                      <li key={i} className="text-sm">{w}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </Card>
        </>
      )}
    </div>
  );
}
