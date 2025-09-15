'use client'
import {
    SidebarInset,
} from "@/components/ui/sidebar";
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, ChevronDownIcon } from 'lucide-react';

// 定义日期范围类型
type DateRange = {
    from: Date | undefined
    to: Date | undefined
}
const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
        month: 'long', // 月份全称（如 September）
        day: 'numeric', // 日期数字（如 7）
        year: 'numeric' // 四位年份（如 2025）
    });
};

export default function Page() {
    // 初始化日期范围状态（可设置默认范围）
    const [dateRange, setDateRange] = useState<DateRange>({
        from: undefined,
        to: undefined
    })
    const [dataBegin, setDataBegin] = useState<String>()
    const [dataEnd, setDataEnd] = useState<String>()
    const [type, setType] = useState<string>("Adjustment Type All")
    const [cost, setCost] = useState<string>("All costs")
    const [client, setClient] = useState<string>("No clients")
    const [action, setAction] = useState<string>("action")
    // 日期选择框的开启状态
    const [dataOpen, setDataOpen] = useState(false)
    // 进入页面时，设置日期范围
    useEffect(() => {
        // 获取今天的日期（00:00:00）
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        // 计算一周前的日期（00:00:00）
        const oneWeekAgo = new Date(today)
        oneWeekAgo.setDate(today.getDate() - 7) // 减去7天

        // 设置初始范围
        setDateRange({
            from: oneWeekAgo,
            to: today
        })
    }, [])

    // 当日期范围变化时，更新日期显示
    useEffect(() => {
        if (dateRange.from) setDataBegin(formatDate(dateRange.from));
        if (dateRange.to) setDataEnd(formatDate(dateRange.to));
    }, [dateRange, formatDate]);

    // 切换到上一周的逻辑
    const handlePrevWeek = () => {
        if (!dateRange.from || !dateRange.to) return;
        const newFrom = new Date(dateRange.from);
        const newTo = new Date(dateRange.to);
        newFrom.setDate(newFrom.getDate() - 7);
        newTo.setDate(newTo.getDate() - 7);
        setDateRange({ from: newFrom, to: newTo });
    };

    // 切换到下一周的逻辑
    const handleNextWeek = () => {
        if (!dateRange.from || !dateRange.to) return;
        const newFrom = new Date(dateRange.from);
        const newTo = new Date(dateRange.to);
        newFrom.setDate(newFrom.getDate() + 7);
        newTo.setDate(newTo.getDate() + 7);
        setDateRange({ from: newFrom, to: newTo });
    };

    return (

        <SidebarInset>
            <div className="flex min-w-0 flex-1 flex-col p-4 md:p-8">
                <h1 className="mb-4 text-xl font-semibold">history</h1>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="secondary" onClick={handlePrevWeek} className="w-8 p-1">
                        <ChevronLeft className="text-gray-600" />
                    </Button>
                    <Popover open={dataOpen} onOpenChange={setDataOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="secondary"
                                id="date"
                                className="justify-between font-normal"
                            >
                                <span className="text-gray-600">
                                    {dataBegin} to {dataEnd}
                                </span>

                                <ChevronDownIcon className="text-gray-600" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-2" align="start">
                            <Calendar
                                mode="range"
                                defaultMonth={dateRange.from || new Date()}
                                numberOfMonths={2}
                                selected={dateRange}
                                onSelect={(range) => {
                                    setDateRange(range as DateRange)
                                    setDataOpen(false)
                                }}
                                className="w-[600px] rounded-lg border shadow-sm"
                            />
                        </PopoverContent>
                    </Popover>
                    <Button variant="secondary" onClick={handleNextWeek} className="w-8 p-1">
                        <ChevronRight className="text-gray-600" />
                    </Button>
                    {/* 下拉框 */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary">
                                <span className="text-gray-600">
                                    {type}
                                </span>
                                <ChevronDownIcon className="text-gray-600" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuRadioGroup value={type} onValueChange={setType}>
                                <DropdownMenuRadioItem value="Adjustment Type All">Adjustment Type All</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Adjustment Type All1">Adjustment Type All1</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Adjustment Type All2">Adjustment Type All2</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* 下拉框 */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary">
                                <span className="text-gray-600">
                                    {cost}
                                </span>
                                <ChevronDownIcon className="text-gray-600" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuRadioGroup value={cost} onValueChange={setCost}>
                                <DropdownMenuRadioItem value="All costs">All costs</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="All costs1">All costs1</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="All costs2">All costs2</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* 下拉框 */}
                    <DropdownMenu>
                        {/* <DropdownMenuTrigger asChild> */}
                        <Button variant="secondary">
                            <span className="text-gray-400">
                                {client}
                            </span>
                            <ChevronDownIcon className="text-gray-400" />
                        </Button>
                        {/* </DropdownMenuTrigger> */}
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuRadioGroup value={client} onValueChange={setClient}>
                                <DropdownMenuRadioItem value="No clients">No clients</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="No clients1">No clients1</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="No clients2">No clients2</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* 下拉框 */}
                    <div className="ml-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary">
                                    <span className="text-blue-600">
                                        {action}
                                    </span>
                                    <ChevronDownIcon className="text-blue-600" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuRadioGroup value={action} onValueChange={setAction}>
                                    <DropdownMenuRadioItem value="action">action</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="action1">action1</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="action2">action2</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                {/* 搜索框 */}
                <div className="mt-3">
                    <Input placeholder="Filter by product, SKU, or GTIN" className="h-10" />
                </div>
                {/* 表格 */}
                <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
                    {/* 引用 public/svg 下的 SVG */}
                    <img
                        src="/svg/undraw_empty-street_3ogh.svg"
                        alt="No inventory activity"
                        className="mb-6 h-40 w-56 object-contain" // 保持 SVG 比例且不溢出
                    />
                    <div className="text-base font-semibold">No inventory activity found</div>
                    <div className="mt-1 max-w-none text-sm text-muted-foreground">
                        There were no stock transactions during the selected time frame. Select new dates to search again.
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}