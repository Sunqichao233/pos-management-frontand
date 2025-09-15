"use client"
import { useState, useEffect } from "react"
import {
    SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,

} from "@/components/ui/chart"
import {
    Download,
    Printer,
    ChevronUp,
} from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Bar, BarChart, } from "recharts"

const lineData = [
    { time: "1:00", today: 3, yesterday: 0 },
    { time: "3:00", today: 4, yesterday: 0 },
    { time: "5:00", today: 0, yesterday: 0 },
    { time: "7:00", today: 0, yesterday: 0 },
    { time: "9:00", today: 10, yesterday: 8 },
    { time: "11:00", today: 0, yesterday: 0 },
    { time: "13:00", today: 6, yesterday: 12 },
    { time: "15:00", today: 0, yesterday: 3 },
    { time: "17:00", today: 8, yesterday: 10 },
    { time: "19:00", today: 0, yesterday: 0 },
    { time: "21:00", today: 8, yesterday: 0 },
    { time: "23:00", today: 0, yesterday: 0 },
]

const barData = [
    { time: "last 7 days", sales: 30 },
    { time: "7 days ago", sales: 25 },
]

const barConfig = {
    sales: {
        label: "Sales",
        color: "#0ea5e9",
    },
} satisfies ChartConfig

const lineConfig = {
    today: {
        label: "today",
        color: "#0ea5e9",
    },
    yesterday: {
        label: "yesterday",
        color: "#bae6fd",
    },
} satisfies ChartConfig

const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
        month: 'long', // 月份全称（如 September）
        day: 'numeric', // 日期数字（如 7）
        year: 'numeric' // 四位年份（如 2025）
    });
};

export default function Page() {

    const [today, setToday] = useState<String>()
    const [yesterday, setYesterday] = useState<String>()
    console.log(today)
    console.log(yesterday)

    useEffect(() => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        setToday(formatDate(today));
        setYesterday(formatDate(yesterday))
    }, [])

    return (

        <SidebarInset>
            <div className="flex min-w-0 flex-1 flex-col p-4 md:p-8">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                    <Button variant="outline" className="gap-2">
                        <span className="text-gray-500">Store</span>
                        <span>1</span>
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <Separator className="w-full mt-2" />
                {/* Title */}
                <h1 className="mt-4 text-xl font-semibold">Total Sales</h1>
                {/* Filter chips */}
                <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">today</Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <span className="text-gray-500">Comparison</span>
                        <span>yesterday</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <span className="text-gray-500">1 type of indicator</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <span className="text-gray-500">Display</span>
                        <span>line graph</span>
                    </Button>
                </div>
                <Separator className="w-full mt-2" />
                <h3 className="mt-4 ">TOTAL SALES</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                    <span
                        className="h-4 w-4 rounded-full mt-1"
                        style={{ backgroundColor: "#0ea5e9" }}
                    />
                    <span className="">{today}</span>
                    <span className="font-semibold">$39.00</span>
                    <span
                        className="h-4 w-4 rounded-full mt-1"
                        style={{ backgroundColor: "#bae6fd" }}
                    />
                    <span className="">{yesterday}</span>
                    <span className="font-semibold">$33.00</span>
                    <div className="ml-auto flex items-center gap-1">

                        <Badge variant="secondary">
                            <ChevronUp className="text-gray-500 h-4 w-4" />
                            <span className="text-sm text-gray-500">9%</span>
                        </Badge>
                    </div>
                    <br />
                </div>
                {/* line chart */}
                <Card className="mt-4 border-0 shadow-none">
                    <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                            <ChartContainer config={lineConfig}>
                                <LineChart
                                    accessibilityLayer
                                    data={lineData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid />
                                    <YAxis
                                        tickCount={5} // 刻度数量（按需调整）
                                        domain={[0, 0.04]} // Y轴值域（匹配数据最大值）
                                        tickFormatter={(value) => `$${value.toFixed(2)}`} // 刻度格式化为美元
                                    />
                                    <XAxis
                                        dataKey="time"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}

                                    />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                    <Line
                                        dataKey="today"
                                        type="monotone"
                                        stroke="#0ea5e9"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        dataKey="yesterday"
                                        type="monotone"
                                        stroke="#bae6fd"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ChartContainer>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Separator className="w-full mt-2" />
                {/* Title */}
                <h1 className="mt-4 text-xl font-semibold">Total Sales</h1>
                {/* Filter chips */}
                <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">last 7 days</Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <span className="text-gray-500">Comparison</span>
                        <span>7 days ago</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <span className="text-gray-500">1 type of indicator</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <span className="text-gray-500">Display</span>
                        <span>bar graph</span>
                    </Button>
                </div>
                <Separator className="w-full mt-2" />
                {/* 7day ago */}
                <h3 className="mt-4 ">TOTAL SALES</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                    
                    <span className="">last 7 day</span>
                    <span className="font-semibold">$30.00</span>
                    
                    <span className="">7 day ago</span>
                    <span className="font-semibold">$25.00</span>
                    <div className="ml-auto flex items-center gap-1">

                        <Badge variant="secondary">
                            <ChevronUp className="text-gray-500 h-4 w-4" />
                            <span className="text-sm text-gray-500">20%</span>
                        </Badge>
                    </div>
                    <br />
                </div>
                {/* bar charts */}
                <Card className="mt-4 border-0 shadow-none">
                    <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                        <ChartContainer config={barConfig}>
                            <BarChart accessibilityLayer data={barData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="time"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="sales" fill="#0ea5e9" radius={8} />
                            </BarChart>
                        </ChartContainer>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </SidebarInset>
    )
}