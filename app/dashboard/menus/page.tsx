'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Plus, SearchIcon, RowsIcon, GridIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// 假数据
const menuItems = [
    {
        id: '1',
        name: "Harry's beer mune",
        location: "Harry's",
        status: 'New',
    },
    // 您可以添加更多菜单项来测试列表
    {
        id: '2',
        name: "Summer Specials",
        location: "Main Street Cafe",
        status: 'Published',
    },
    {
        id: '3',
        name: "Winter Warmers",
        location: "Downtown Coffee",
        status: 'Published',
    },
];

export default function MenusPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // 筛选菜单项
    const filteredMenus = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 p-8">
            {/* 顶部标题和按钮 */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    {/* 使用 Link 组件返回上一级路由 */}
                    <Link href="/dashboard">
                        <Button variant="ghost" className="p-2 mr-2 text-gray-600 hover:bg-gray-100">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Menus</h1>
                        <p className="mt-1 text-sm text-gray-500 max-w-lg">
                            Use menus to sell your items on kiosks, delivery apps, online ordering sites, and
                            any restaurant POS modes.
                        </p>
                    </div>
                </div>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create a menu
                </Button>
            </div>

            {/* 工具栏 */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <div className="relative w-64">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search"
                            className="pl-9 pr-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        {/* 假设 locations 是一个下拉框或按钮 */}
                        <Button variant="outline" className="text-gray-700 hover:bg-gray-100 border-gray-300">
                            Locations: Harry's
                        </Button>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {/* 布局切换按钮 */}
                    <Button variant="outline" className="p-2 border-gray-300 bg-gray-100">
                        <RowsIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" className="p-2 border-gray-200">
                        <GridIcon className="h-5 w-5 text-gray-400" />
                    </Button>
                </div>
            </div>

            {/* 菜单列表 */}
            <div className="space-y-4">
                {filteredMenus.length > 0 ? (
                    filteredMenus.map((menu) => (
                        <Card key={menu.id} className="p-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 bg-gray-200 rounded-md"></div> {/* 占位符 */}
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">{menu.name}</h3>
                                    <p className="text-sm text-gray-500">{menu.location}</p>
                                </div>
                                {menu.status === 'New' && (
                                    <span className="text-xs font-medium text-blue-600 bg-blue-50 py-1 px-2 rounded-full">
                                        New
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" className="p-2 text-gray-600 hover:bg-gray-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                        />
                                    </svg>
                                </Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="text-center text-gray-500 mt-10">No menus found.</div>
                )}
            </div>
        </div>
    );
}