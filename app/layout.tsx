import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Next + shadcn/ui Starter",
  description: "App Router + Tailwind + shadcn/ui",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="h-screen bg-background font-sans antialiased overflow-hidden">
        <div className="h-full w-full">
          {children}
        </div>
      </body>
    </html>
  )
}
