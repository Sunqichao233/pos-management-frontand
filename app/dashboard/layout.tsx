import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* 关键：用 flex 容器包裹侧边栏和主内容，实现左右并排 */}
      <div className="flex min-h-screen w-full">
        {/* 侧边栏：固定宽度 */}
        <div className="flex w-60 flex-shrink-0 border-r bg-gray-50 ">
          <AppSidebar  />
        </div>
              
          {/* 页面具体内容 */}
          <main className="flex-1 overflow-auto h-full">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full overflow-auto">{children}</div>
          </main>
        </div>
    </SidebarProvider>
  )
}