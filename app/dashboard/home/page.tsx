'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ellipsis, Triangle } from 'lucide-react';

// 格式化日期为 "September 10th" 形式
const formatDate = (date: Date): string => {
    // 月份名称数组
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();

    // 处理日期序数词（1st, 2nd, 3rd, 4th...）
    const getOrdinal = (num: number): string => {
        if (num > 3 && num < 21) return "th";
        switch (num % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${month} ${day}${getOrdinal(day)}`;
};

export default function Page() {

    const router = useRouter();

    const [currentDate, setCurrentDate] = useState("");

    // 组件加载时获取当前日期
    useEffect(() => {
        const today = new Date();
        setCurrentDate(formatDate(today));
    }, []);

    return (
        <SidebarInset>
            <header className="flex h-24 shrink-0 flex-col items-start justify-center gap-2 px-4 pt-10">
                {/* 标题平铺显示 */}
                <h1 className="text-2xl font-bold">Welcome to Square Dashboard</h1>
                <div className="flex flex-wrap gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-600" onClick={() => router.push('/dashboard/bank')}>Go to Bank</Button>
                    <Button variant="secondary" className="text-primary">Accepting payments</Button>
                    <Button variant="secondary" className="text-primary" onClick={() => router.push('/dashboard/products-and-services/menu')}>Edit Menu</Button>
                    <Button variant="secondary" className="text-primary">Add a product</Button>
                    <Button variant="secondary" className="text-primary"><Ellipsis /></Button>
                </div>
                {/* 分割线在标题下方，宽度铺满 */}
                <Separator className="w-full mt-2" />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full overflow-auto pt-9">
                <div className="bg-muted/50 flex-1 rounded-xl " >
                    <h2 className="p-4 py-2 text-lg font-semibold">performance</h2>
                    <div className="px-4 pb-4 flex flex-wrap gap-2">
                        <Badge variant="outline">
                            <span className="text-gray-500">Data:{'\u00A0'}</span>
                            {currentDate}
                        </Badge>
                        <Badge variant="outline">
                            <span className="text-gray-500">slip{'\u00A0'}</span>
                            Accounted
                        </Badge>
                    </div>
                    {/* 关键指标 + 卡片网格区域 */}
                    <div className="px-4 pb-4">
                        {/* 1. Key Indicators 卡片 */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-lg">Key indicators</CardTitle>
                                <p className="text-xs text-gray-500">vs. Past Wednesday</p>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex flex-col">
                                    <p className="text-xs text-gray-500">Net Sales</p>
                                    <div className="flex justify-between items-start mt-1">
                                        <p className="font-semibold text-base">$0.00</p>
                                        <Badge variant="outline" className="text-xs flex items-center px-2 py-0.5 bg-gray-100 text-gray-400 border-gray-200">
                                            <Triangle size={10} className="mr-1 " />
                                            Not applicable
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xs text-gray-500">Total Sales</p>
                                    <div className="flex justify-between items-start mt-1">
                                        <p className="font-semibold text-base">$0.00</p>
                                        <Badge variant="outline" className="text-xs flex items-center px-2 py-0.5 bg-gray-100 text-gray-400 border-gray-200">
                                            <Triangle size={10} className="mr-1 " />
                                            Not applicable
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xs text-gray-500">transaction</p>
                                    <div className="flex justify-between items-start mt-1">
                                        <p className="font-semibold text-base">0</p>
                                        <Badge variant="outline" className="text-xs flex items-center px-2 py-0.5 bg-gray-100 text-gray-400 border-gray-200">
                                            <Triangle size={10} className="mr-1 " />
                                            Not applicable
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xs text-gray-500">Average Net Sales</p>
                                    <div className="flex justify-between items-start mt-1">
                                        <p className="font-semibold text-base">$0.00</p>
                                        <Badge variant="outline" className="text-xs flex items-center px-2 py-0.5 bg-gray-100 text-gray-400 border-gray-200">
                                            <Triangle size={10} className="mr-1 " />
                                            Not applicable
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xs text-gray-500">Returns and Refunds</p>
                                    <div className="flex justify-between items-start mt-1">
                                        <p className="font-semibold text-base">$0.00</p>
                                        <Badge variant="outline" className="text-xs flex items-center px-2 py-0.5 bg-gray-100 text-gray-400 border-gray-200">
                                            <Triangle size={10} className="mr-1 " />
                                            Not applicable
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 2. 多卡片网格布局 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Customers 卡片 */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Customers</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-xs ">Total Customers</span>
                                            <span className="text-sm">0</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs ">Returning customers</span>
                                            <span className="text-sm">0</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs ">Average number of visits per customer</span>
                                            <span className="text-sm">0</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs ">Average sales per visit</span>
                                            <span className="text-sm">$0.00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs ">feedback</span>
                                            <span className="text-sm">Positive: 0, Negative: 0</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Method 卡片 */}
                            {/* todo 实现具体的条件渲染 */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">payment method</CardTitle>
                                    <p className="text-xs text-gray-500">By transaction amount</p>
                                </CardHeader>
                                <CardContent>
                                    {/* 上方分段条形图（用三个 div 模拟分段） */}
                                    <div className="flex mb-4">
                                        <div className="h-8 bg-blue-600 w-1/3"></div>
                                        <div className="h-8 bg-blue-200 w-1/3"></div>
                                        <div className="h-8 bg-blue-50 w-1/3"></div>
                                    </div>

                                    {/* 下方支付方式明细列表 */}
                                    <div className="space-y-2">
                                        {/* card 条目 */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-blue-600"></div>
                                                <span className="text-sm">card</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm">$0.00</span>
                                                <span className="text-sm text-gray-500">0%</span>
                                            </div>
                                        </div>

                                        {/* cash 条目 */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-blue-200"></div>
                                                <span className="text-sm">cash</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm">$0.00</span>
                                                <span className="text-sm text-gray-500">0%</span>
                                            </div>
                                        </div>

                                        {/* others 条目 */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-blue-50"></div>
                                                <span className="text-sm">others</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm">$0.00</span>
                                                <span className="text-sm text-gray-500">0%</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Merchandise 卡片 */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">merchandise</CardTitle>
                                    <p className="text-xs text-gray-500">by Gross sales</p>
                                </CardHeader>
                                <CardContent className="py-6">
                                    <div className="flex flex-col items-center justify-center h-full">
                                        {/* Lowest & Highest 左右对齐 */}
                                        <div className="w-full max-w-md flex justify-between mb-2">
                                            <span className="text-xs text-gray-500">Lowest</span>
                                            <span className="text-xs text-gray-500">Highest</span>
                                        </div>
                                        
                                    </div>
                                    <p className="text-xs text-gray-400 mt-4 items-left justify-center">There are no sales during this period</p>
                                </CardContent>
                            </Card>

                            {/* Category 卡片 */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">category</CardTitle>
                                    <p className="text-xs text-gray-500">by Gross sales</p>
                                </CardHeader>
                                <CardContent className="py-6">
                                    <div className="flex flex-col items-center justify-center h-full">
                                        {/* Lowest & Highest 左右对齐 */}
                                        <div className="w-full max-w-md flex justify-between mb-2">
                                            <span className="text-xs text-gray-500">Lowest</span>
                                            <span className="text-xs text-gray-500">Highest</span>
                                        </div>
                                        
                                    </div>
                                    <p className="text-xs text-gray-400 mt-4 items-left justify-center">There are no sales during this period</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarInset>

    )
}