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
    ClockIcon,
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
    const [expanded, setExpanded] = useState<Set<string>>(new Set());
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
            icon: ShoppingCart,
            children: [
                { id: 'merchandise-all', label: 'All items' },
                { id: 'merchandise-categories', label: 'Categories' },
                { id: 'merchandise-tags', label: 'Tags' },
            ]
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
            icon: Package,
            children: [
                { id: 'inventory-history', label: 'history', href: '/dashboard/inventory/history' },
                { id: 'inventory-partners', label: 'Business Partners' },
                { id: 'inventory-alerts', label: 'Low stock alerts' },
            ]
        },
        {
            id: 'gift-cards',
            label: 'Gift cards',
            icon: Gift,
            children: [
                { id: 'gift-issue', label: 'Issue card' },
                { id: 'gift-transactions', label: 'Transactions' },
                { id: 'gift-settings', label: 'Settings' },
            ]
        },
        {
            id: 'subscription',
            label: 'Subscription Plans',
            icon: CardIcon
        }
    ];

    const reportSubMenu: MenuItem[] = [
        { id: 'sales-summary', label: 'Sales Summary', icon: BarChart, href: '/dashboard/reports/sales-summary' },
        { id: 'sales-by-product', label: 'Sales by product', icon: FileText, href: '/dashboard/reports/sales-by-product' },
        { id: 'sales-trends', label: 'Sales Trends', icon: BarChart, href: '/dashboard/reports/sales-trends' },
        { id: 'sales-by-category', label: 'Sales by category', icon: Package, href: '/dashboard/reports/sales-by-category' },
        { id: 'sales-by-staff', label: 'Sales by staff', icon: User, href: '/dashboard/reports/sales-by-staff' },
        { id: 'customized-sales', label: 'Customized Sales', icon: Settings, href: '/dashboard/reports/customized-sales' },
        { id: 'gift-cards-report', label: 'Gift cards', icon: Gift, href: '/dashboard/reports/gift-cards' },
        { id: 'sales-by-section', label: 'Sales by section', icon: Clipboard, href: '/dashboard/reports/sales-by-section' },
        { id: 'sales-to-partners', label: 'Sales to business partners', icon: Building, href: '/dashboard/reports/sales-to-partners' },
    ]
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
    const renderProductsSubMenu = () => {
        const isExpanded = (id: string) => expanded.has(id);
        const toggleExpanded = (id: string) =>
            setExpanded((prev) => {
                const next = new Set(prev);
                if (next.has(id)) next.delete(id);
                else next.add(id);
                return next;
            });

        return (
            <div className="space-y-1">
                <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                    <ChevronLeft
                        className="h-4 w-4 mr-2 cursor-pointer hover:text-gray-900"
                        onClick={() => setCurrentMenu('main')}
                    />
                    Products and Services
                </div>
                {productsSubMenu.map((item) => {
                    const hasChildren = !!item.children && item.children.length > 0;
                    if (hasChildren) {
                        const open = isExpanded(item.id);
                        return (
                            <div key={item.id}>
                                <Button
                                    variant="ghost"
                                    className={cn("w-full justify-start")}
                                    onClick={() => toggleExpanded(item.id)}
                                >
                                    {item.icon && <item.icon className="h-4 w-4 mr-3" />}
                                    <span className="flex-1 text-left">{item.label}</span>
                                    <ChevronRight
                                        className={cn(
                                            "h-4 w-4 text-gray-500 transition-transform",
                                            open && "rotate-90"
                                        )}
                                    />
                                </Button>
                                {open && (
                                    <div className="mt-1 space-y-1">
                                        {item.children!.map((child) => (
                                            <Button
                                                key={child.id}
                                                asChild={!!child.href}
                                                variant="ghost"
                                                className="w-full justify-start pl-8 text-gray-700 hover:text-gray-900"
                                            >
                                                {child.href ? (
                                                    <Link href={child.href as any}>
                                                        {child.icon && <child.icon className="h-4 w-4 mr-3" />}
                                                        {child.label}
                                                    </Link>
                                                ) : (
                                                    <>
                                                        {child.icon && <child.icon className="h-4 w-4 mr-3" />}
                                                        {child.label}
                                                    </>
                                                )}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
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
                    );
                })}
            </div>
        );
    };
    const renderReportSubMenu = () => {
        const isExpanded = (id: string) => expanded.has(id);
        const toggleExpanded = (id: string) =>
            setExpanded((prev) => {
                const next = new Set(prev);
                if (next.has(id)) next.delete(id);
                else next.add(id);
                return next;
            });

        return (
            <div className="space-y-1">
                <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                    <ChevronLeft
                        className="h-4 w-4 mr-2 cursor-pointer hover:text-gray-900"
                        onClick={() => setCurrentMenu('main')}
                    />
                    Report
                </div>
                {reportSubMenu.map((item) => {
                    const hasChildren = !!item.children && item.children.length > 0;
                    if (hasChildren) {
                        const open = isExpanded(item.id);
                        return (
                            <div key={item.id}>
                                <Button
                                    variant="ghost"
                                    className={cn("w-full justify-start")}
                                    onClick={() => toggleExpanded(item.id)}
                                >
                                    {item.icon && <item.icon className="h-4 w-4 mr-3" />}
                                    <span className="flex-1 text-left">{item.label}</span>
                                    <ChevronRight
                                        className={cn(
                                            "h-4 w-4 text-gray-500 transition-transform",
                                            open && "rotate-90"
                                        )}
                                    />
                                </Button>
                                {open && (
                                    <div className="mt-1 space-y-1">
                                        {item.children!.map((child) => (
                                            <Button
                                                key={child.id}
                                                asChild={!!child.href}
                                                variant="ghost"
                                                className="w-full justify-start pl-8 text-gray-700 hover:text-gray-900"
                                            >
                                                {child.href ? (
                                                    <Link href={child.href as any}>
                                                        {child.icon && <child.icon className="h-4 w-4 mr-3" />}
                                                        {child.label}
                                                    </Link>
                                                ) : (
                                                    <>
                                                        {child.icon && <child.icon className="h-4 w-4 mr-3" />}
                                                        {child.label}
                                                    </>
                                                )}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
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
                    );
                })}
            </div>
        );
    }
    // 渲染当前菜单内容
    const renderCurrentMenu = () => {
        switch (currentMenu) {
            case 'products':
                return renderProductsSubMenu();
            case 'reports':
                return renderReportSubMenu();
            default:
                return renderMainMenu();
        }
    };

    return (
        <SidebarProvider className="w-80">
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