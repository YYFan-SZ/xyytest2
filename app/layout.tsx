import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next" // 暂时注释掉以避免部署问题
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SRI 性压抑指数评估 - 心理测评平台",
  description: "专业的性压抑指数（SRI）心理评估工具，帮助您了解自己在性相关话题、态度和行为方面的开放程度",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`font-sans antialiased`}>
        {children}
        {/* 仅在Vercel环境中启用Analytics */}
        </body>
    </html>
  )
}
