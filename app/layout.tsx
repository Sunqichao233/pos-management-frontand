import type { Metadata } from "next"
import { DashboardLayout } from "./DashboardLayout"
import "./globals.css"

export const metadata: Metadata = {
  title: "POS 管理系统",
  description: "餐厅管理系统 - App Router + Tailwind + shadcn/ui",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="h-screen bg-background font-sans antialiased overflow-hidden">
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  )
}
