'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  SearchIcon,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';

export default function InventoryHistoryPage() {
  const isDataFound = false; // 控制是否显示数据列表或“无数据”状态

  return (
    <div className="flex-1 p-8">
      {/* 顶部标题和返回按钮 */}
      <div className="flex items-center mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="p-2 mr-2 text-gray-600 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">history</h1>
      </div>

      {/* 筛选和搜索工具栏 */}
      <div className="flex items-center justify-between space-x-4 mb-8">
        <div className="flex items-center space-x-2">
          {/* 日期筛选器 */}
          <div className="flex items-center border rounded-md p-2 text-sm text-gray-700 space-x-1">
            <ChevronLeft className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-900" />
            <span className="font-medium">September 7, 2025 to September 13, 2025</span>
            <ChevronRight className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-900" />
          </div>

          {/* 下拉菜单筛选器 */}
          <Button variant="outline" className="text-gray-700 hover:bg-gray-100 space-x-1">
            <span>Adjustment Type All</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="text-gray-700 hover:bg-gray-100 space-x-1">
            <span>All costs</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="text-gray-700 hover:bg-gray-100 space-x-1">
            <span>No clients</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="text-gray-700 hover:bg-gray-100">
            Action
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* 搜索框 */}
      <div className="w-1/3 mb-12">
        <Input type="text" placeholder="Filter by product, SKU, or GTIN" className="bg-gray-100 border-gray-300" />
      </div>

      {/* 数据列表或无数据状态 */}
      {!isDataFound ? (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <img
            src="/assets/no-inventory-activity.png" // 假设图片资源路径
            alt="No inventory activity found"
            className="w-96 h-auto mb-8"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No inventory activity found</h2>
          <p className="text-gray-500 max-w-sm">
            There were no stock transactions during the selected time frame. Select new dates to search again.
          </p>
        </div>
      ) : (
        // TODO: 渲染库存历史记录表格或列表
        <div>
          {/* 这里可以放置表格或列表组件 */}
          <h2>Inventory History Table</h2>
        </div>
      )}
    </div>
  );
}