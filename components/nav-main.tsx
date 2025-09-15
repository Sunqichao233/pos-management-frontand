"use client"

import { ChevronRight, ArrowLeft, type LucideIcon } from "lucide-react"
import { useState } from "react"
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {

  type Items = {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      items?: {
        title: string
        url: string
      }[] | null
    }[]
  }

  const router = useRouter();
  const pathname = usePathname(); // 获取当前URL路径（如 /dashboard/home）
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [currentOpenItem, setCurrentOpenItem] = useState<Items | null>(null);
  // 记录每个子项的展开状态（用 title 作为唯一标识）
  const [subOpenStates, setSubOpenStates] = useState<Record<string, boolean>>({});

  // console.log('组件渲染时的 isItemOpen:', isItemOpen);
  console.log('当前路径:', pathname);

  // 外部点击主项时触发
  const openItem = (item: Items) => {
    const url = item.url;
    if (url === '/dashboard/home' || url === '/dashboard/bank') {
      router.push(url);
      return;
    }
    setIsItemOpen(true);
    setCurrentOpenItem(item);
    console.log('Item clicked:', item);
    console.log('Is item open:', isItemOpen);
  }

  const changeItem = (item: any, item2: any) => {
    if (item2.items != null) {
      return;
    }
    router.push(item.url + item2.url);
  }

  const changeItemInter = (item: any, item2: any, item3: any) => {
    router.push(item.url + item2.url + item3.url);
  }

  // 返回并清空状态
  const goBack = () => {
    setIsItemOpen(false);
    setCurrentOpenItem(null);
  }

  // 切换子项展开/收起状态
  const toggleSubItem = (title: string) => {
    setSubOpenStates(prev => ({
      ...prev,
      [title]: !prev[title] // 取反当前状态
    }));
  };

  return (
    <>
      {
        isItemOpen ?
          (
            <>
              <SidebarGroup>
                <div className="flex items-center">
                  <Button variant="ghost" onClick={goBack} size="icon"><ArrowLeft /></Button>
                  {/* 让中间的字居中 字体小一点 */}
                  <span className="flex-1 text-center text-sm font-semibold">{currentOpenItem?.title}</span>
                </div>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarMenu>
                  {currentOpenItem?.items?.map((item) => (
                    <Collapsible
                      key={item.title}
                      asChild
                      open={subOpenStates[item.title] || false}
                    >
                      {/* 外层容器仅负责点击事件，不设置背景样式 */}
                      <SidebarMenuItem
                        key={item.title}
                        onClick={() => toggleSubItem(item.title)}
                        className="cursor-pointer "
                      >
                        {/* 仅包裹当前行内容（文字+箭头），集中管理hover样式 */}
                        <div className={pathname === currentOpenItem?.url + item.url ?
                          "flex items-center justify-between w-full rounded-md bg-gray-200 transition-all duration-200 "
                          :
                          "flex items-center justify-between w-full  rounded-md hover:bg-gray-100 transition-all duration-200 "}>
                          <SidebarMenuButton asChild tooltip={item.title}>
                            <button onClick={() => changeItem(currentOpenItem, item)}>
                              <span>{item.title}</span>
                            </button>
                          </SidebarMenuButton>

                          {item.items?.length ? (
                            <CollapsibleTrigger asChild>
                              <SidebarMenuAction className="data-[state=open]:rotate-90">
                                <ChevronRight />
                                <span className="sr-only">Toggle</span>
                              </SidebarMenuAction>
                            </CollapsibleTrigger>
                          ) : null}
                        </div>
                        {/* 子菜单内容：与当前行样式分离 */}
                        {item.items?.length && (
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items?.map((subItem) => (
                                <SidebarMenuSubItem
                                  key={subItem.title}
                                  className={pathname === currentOpenItem.url + item.url + subItem.url
                                    ?
                                    "cursor-pointer rounded-md bg-gray-200 transition-all duration-200"
                                    :
                                    "cursor-pointer rounded-md hover:bg-gray-100 transition-all duration-200"}
                                >
                                  <SidebarMenuSubButton asChild>
                                    <button onClick={(e) => {
                                      e.stopPropagation(); // 阻止事件冒泡，避免触发父级 Collapsible 的切换
                                      changeItemInter(currentOpenItem, item, subItem);
                                    }} className="w-full text-left">
                                      <span>{subItem.title}</span>
                                    </button>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        )}
                      </SidebarMenuItem>
                    </Collapsible>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </>
          )
          :
          (
            <SidebarGroup>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <button onClick={() => openItem(item)} className={pathname === item.url ? 'text-blue-600 font-medium bg-gray-200' : ''}>
                        <item.icon />
                        <span>{item.title}</span>
                      </button>

                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )
      }
    </>

  )
}
