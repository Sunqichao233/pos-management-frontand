"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    Home,
    Package,
    CreditCard,
    Cloud,
    Users,
    BarChart,
    User,
    Banknote,
    Settings,
    MoreHorizontal,
    Plus,
    ChevronRight,
    ChevronLeft,
    Search,
    Bell,
    MessageCircle,
    Clipboard,
    Clock,
    Star,
    Building,
    FileText,
    ShoppingCart,
    Gift,
    CreditCard as CardIcon,
} from "lucide-react";
import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// 定义菜单项类型
interface MenuItem {
    id: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    href?: string;
    children?: MenuItem[];
}

// 定义菜单状态类型
type MenuState = 'main' | 'products' | 'customers' | 'billing' | 'online-business' | 'reports' | 'staff' | 'bank' | 'settings';

export function SidebarPOS() {
    const pathname = usePathname();
    const [currentMenu, setCurrentMenu] = useState<MenuState>('main');

    const isActive = (href: string) => pathname === href;

    // 主菜单项
    const mainMenuItems: MenuItem[] = [
        {
            id: 'home',
            label: 'Home',
            icon: Home,
            href: '/dashboard'
        },
        {
            id: 'products',
            label: 'Products and Services',
            icon: Package
        },
        {
            id: 'billing',
            label: 'Billing and Payments',
            icon: CreditCard
        },
        {
            id: 'online-business',
            label: 'Online Business',
            icon: Cloud
        },
        {
            id: 'customers',
            label: 'Customers',
            icon: Users
        },
        {
            id: 'reports',
            label: 'Report',
            icon: BarChart
        },
        {
            id: 'staff',
            label: 'Staff',
            icon: User
        },
        {
            id: 'bank',
            label: 'Bank',
            icon: Banknote
        },
        {
            id: 'settings',
            label: 'Setting',
            icon: Settings
        },
        {
            id: 'add-more',
            label: 'Add more',
            icon: Plus
        }
    ];

    // 产品和服务的子菜单
    const productsSubMenu: MenuItem[] = [
        {
            id: 'merchandise',
            label: 'merchandise',
            icon: ShoppingCart
        },
        {
            id: 'menu',
            label: 'menu',
            icon: FileText,
            href: '/dashboard/menus'
        },
        {
            id: 'inventory',
            label: 'Inventory management',
            icon: Package
        },
        {
            id: 'gift-cards',
            label: 'Gift cards',
            icon: Gift
        },
        {
            id: 'subscription',
            label: 'Subscription Plans',
            icon: CardIcon
        }
    ];

    // 渲染主菜单
    const renderMainMenu = () => (
        <div className="space-y-1">
            {mainMenuItems.map((item) => (
                <Button
                    key={item.id}
                    asChild={!!item.href}
                    variant="ghost"
                    className={cn(
                        "w-full justify-start",
                        item.href && isActive(item.href) && "bg-blue-100 text-blue-900 rounded-lg font-semibold",
                        !item.href && "text-gray-500 hover:text-gray-900"
                    )}
                    onClick={!item.href ? () => setCurrentMenu(item.id as MenuState) : undefined}
                >
                    {item.href ? (
                        <Link href={item.href as any}>
                            {item.icon && <item.icon className="h-4 w-4 mr-3" />}
                            {item.label}
                        </Link>
                    ) : (
                        <>
                            {item.icon && <item.icon className="h-4 w-4 mr-3" />}
                            {item.label}
                        </>
                    )}
                </Button>
            ))}
        </div>
    );

    // 渲染产品和服务的子菜单
    const renderProductsSubMenu = () => (
        <div className="space-y-1">
            <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                <ChevronLeft
                    className="h-4 w-4 mr-2 cursor-pointer hover:text-gray-900"
                    onClick={() => setCurrentMenu('main')}
                />
                Products and Services
            </div>
            {productsSubMenu.map((item) => (
                <Button
                    key={item.id}
                    asChild={!!item.href}
                    variant="ghost"
                    className={cn(
                        "w-full justify-start",
                        item.href && isActive(item.href) && "bg-gray-100 text-gray-900 rounded-lg font-semibold"
                    )}
                >
                    {item.href ? (
                        <Link href={item.href as any}>
                            {item.icon && <item.icon className="h-4 w-4 mr-3" />}
                            {item.label}
                        </Link>
                    ) : (
                        <>
                            {item.icon && <item.icon className="h-4 w-4 mr-3" />}
                            {item.label}
                        </>
                    )}
                </Button>
            ))}
        </div>
    );

    // 渲染当前菜单内容
    const renderCurrentMenu = () => {
        switch (currentMenu) {
            case 'products':
                return renderProductsSubMenu();
            default:
                return renderMainMenu();
        }
    };

    return (
        <SidebarProvider>
            <Sidebar className="w-72 bg-gray-50">
                <SidebarHeader className="border-b border-gray-200">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center space-x-2">
                            <Building className="h-5 w-5 text-gray-600" />
                            <span className="font-semibold text-gray-900">HCLM Group LLC</span>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                    <div className="px-4 pb-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="search"
                                className="pl-10 bg-white border-gray-200"
                            />
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent className="px-4 py-4">
                    {renderCurrentMenu()}
                </SidebarContent>

                <SidebarFooter className="border-t border-gray-200 p-4">
                    <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 justify-start">
                        <CreditCard className="h-4 w-4 mr-3" />
                        Accept payments
                    </Button>
                    <div className="flex justify-center space-x-4 mt-4">
                        <Bell className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                        <MessageCircle className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                        <Clipboard className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                        <Clock className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                        <Star className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </div>
                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    );
}