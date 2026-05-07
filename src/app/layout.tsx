import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://contentpilot.ai"),
  title: {
    default: "ContentPilot — AI 内容策划助手",
    template: "%s | ContentPilot",
  },
  description:
    "输入产品信息，AI 自动生成小红书选题、爆款文案、封面策略和标签推荐。比 ChatGPT 更懂小红书的内容策划工具。",
  keywords: [
    "小红书文案生成器",
    "抖音选题工具",
    "小红书标签推荐",
    "AI内容策划",
    "小红书爆款文案",
    "抖音文案生成",
    "小红书运营工具",
    "内容营销工具",
    "AI写作助手",
    "小红书SEO",
  ],
  authors: [{ name: "ContentPilot" }],
  creator: "ContentPilot",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://contentpilot.ai",
    siteName: "ContentPilot",
    title: "ContentPilot — AI 内容策划助手",
    description:
      "输入产品信息，AI 自动生成小红书选题、爆款文案、封面策略和标签推荐。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ContentPilot — AI 内容策划助手",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ContentPilot — AI 内容策划助手",
    description:
      "输入产品信息，AI 自动生成小红书选题、爆款文案、封面策略和标签推荐。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://contentpilot.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSansSC.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "ContentPilot",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "AI 驱动的小红书/抖音内容策划助手，自动生成选题、文案、封面策略和标签推荐。",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "CNY",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
