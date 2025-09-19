// app/dashboard/reports/sales-trends/page.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function SalesTrendsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Total Sales</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">print</Button>
          <Button variant="outline">export</Button>
        </div>
      </div>

      <Card className="p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="secondary">today</Button>
          <Button size="sm" variant="outline">Comparison</Button>
          <Button size="sm" variant="outline">yesterday</Button>
          <Select>
            <SelectTrigger className="h-8 w-40">
              <SelectValue placeholder="1 type of indicator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="orders">Orders</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline">Display line graph</Button>
          <div className="ml-auto flex items-center gap-2">
            <Input className="h-8 w-52" placeholder="September 10, 2025 - September 9, 2025" />
            <Button size="sm" variant="outline">▲ 0%</Button>
          </div>
        </div>

        <div className="h-64 rounded-md bg-gradient-to-b from-gray-50 to-white border border-gray-200 flex items-center justify-center text-gray-400">
          Line chart placeholder
        </div>
      </Card>

      <div>
        <h2 className="text-base font-semibold mb-3">Total Sales</h2>
        <Card className="p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="secondary">Last 7 days</Button>
            <Button size="sm" variant="outline">Compare 7 days ago</Button>
            <Select>
              <SelectTrigger className="h-8 w-40">
                <SelectValue placeholder="1 type of indicator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline">Display bar graph</Button>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-sm text-gray-500">Today</div>
              <div className="text-2xl font-semibold">$0.00</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-500">Yesterday</div>
              <div className="text-2xl font-semibold">$0.00</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-500">Change</div>
              <div className="text-2xl font-semibold">0%</div>
            </Card>
          </div>

          <div className="h-64 rounded-md bg-gradient-to-b from-gray-50 to-white border border-gray-200 flex items-center justify-center text-gray-400">
            Bar chart placeholder
          </div>
        </Card>
      </div>
    </div>
  );
}
