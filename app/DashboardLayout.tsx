'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { DashboardSidebar } from './DashboardSidebar'
import { LanguageProvider } from './LanguageContext'
import { GlobalDataProvider } from './GlobalDataContext'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [currentRestaurantId, setCurrentRestaurantId] = useState<string | null>(null)

  // 在登录相关页面隐藏侧边栏，仅渲染内容
  const isAuthRoute = pathname?.startsWith('/login')

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
    
    // 根据页面导航到对应路由
    switch (page) {
      case 'restaurants':
        router.push('/restaurants')
        break
      case 'dashboard':
        router.push('/dashboard')
        break
      case 'shop':
        router.push('/hardwareshop')
        break
      case 'account-home':
        break
      // 添加更多路由映射
      default:
        console.log(`导航到: ${page}`)
    }
  }

  const handleRestaurantChange = (restaurantId: string) => {
    setCurrentRestaurantId(restaurantId)
    router.push(`/restaurants/${restaurantId}`)
  }

  return (
    <LanguageProvider>
      <GlobalDataProvider>
        {/* 登录页不显示侧边栏，其它页面保持原布局 */}
        {isAuthRoute ? (
          <>
            {children}
            <Toaster />
          </>
        ) : (
          <SidebarProvider>
            <div className="flex h-screen w-full">
              <DashboardSidebar
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRestaurantChange={handleRestaurantChange}
              />
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
            <Toaster />
          </SidebarProvider>
        )}
      </GlobalDataProvider>
    </LanguageProvider>
  )
}