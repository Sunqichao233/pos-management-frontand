'use client'

import { useState } from "react"
import { Search, DollarSign, TrendingUp, FileText, Users, ShoppingBag, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type TimeRange = 'today' | 'week' | 'month'

interface RestaurantDashboardProps {
  restaurantId: string
  onNavigate?: (page: string) => void
}

export function RestaurantDashboard({ restaurantId, onNavigate }: RestaurantDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeRange, setTimeRange] = useState<TimeRange>('today')

  // Get data based on selected time range
  const getDataByTimeRange = (range: TimeRange) => {
    const data = {
      today: {
        totalRevenue: 8420,
        netProfit: 3890,
        transactions: 147,
        avgProfitPerTransaction: 26.46,
        totalCustomers: 132,
        avgSpendingPerCustomer: 63.79
      },
      week: {
        totalRevenue: 52840,
        netProfit: 24580,
        transactions: 892,
        avgProfitPerTransaction: 27.55,
        totalCustomers: 784,
        avgSpendingPerCustomer: 67.40
      },
      month: {
        totalRevenue: 245000,
        netProfit: 114200,
        transactions: 4128,
        avgProfitPerTransaction: 27.67,
        totalCustomers: 3542,
        avgSpendingPerCustomer: 69.16
      }
    }
    return data[range]
  }

  const currentData = getDataByTimeRange(timeRange)

  // Top 5 Rankings Data
  const topRestaurantsByRevenue = [
    { rank: 1, name: 'Downtown Bistro', revenue: 89340, change: '+12.5%' },
    { rank: 2, name: 'Mountain View Cafe', revenue: 76820, change: '+8.9%' },
    { rank: 3, name: 'Seaside Restaurant', revenue: 54230, change: '+15.2%' },
    { rank: 4, name: 'Urban Kitchen', revenue: 43650, change: '-3.1%' },
    { rank: 5, name: 'Garden Terrace', revenue: 38920, change: '+5.7%' }
  ]

  const topProductsBySales = [
    { rank: 1, name: 'Margherita Pizza', quantity: 1847, category: 'Pizza' },
    { rank: 2, name: 'Craft Beer', quantity: 2341, category: 'Beverages' },
    { rank: 3, name: 'Caesar Salad', quantity: 1432, category: 'Salads' },
    { rank: 4, name: 'Chocolate Brownie', quantity: 1256, category: 'Desserts' },
    { rank: 5, name: 'Grilled Salmon', quantity: 987, category: 'Seafood' }
  ]

  const topProductsByRevenue = [
    { rank: 1, name: 'Margherita Pizza', revenue: 36940, sales: 1847 },
    { rank: 2, name: 'Grilled Salmon', revenue: 29610, sales: 987 },
    { rank: 3, name: 'Caesar Salad', revenue: 21480, sales: 1432 },
    { rank: 4, name: 'Craft Beer', revenue: 14046, sales: 2341 },
    { rank: 5, name: 'Chocolate Brownie', revenue: 8792, sales: 1256 }
  ]

  const DataCard = ({ title, value, subtitle, icon: Icon }: {
    title: string
    value: string | number
    subtitle: string
    icon: React.ComponentType<{ className?: string }>
  }) => (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div>
          <p className="text-2xl mb-1">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-muted-foreground">
            Monitor operations, performance, and business metrics for your restaurant
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders, customers, menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Data Type:</span>
        <div className="flex gap-2">
          <Button
            variant={timeRange === 'today' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('today')}
          >
            Today
          </Button>
          <Button
            variant={timeRange === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            This Week
          </Button>
          <Button
            variant={timeRange === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            This Month
          </Button>
        </div>
      </div>

      {/* Sales Data Section - 6 KPI Cards */}
      <div>
        <h2 className="mb-4">Sales Data (Daily Based)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DataCard
            title="Total Revenue"
            value={`${currentData.totalRevenue.toLocaleString()}`}
            subtitle="Excluding tips"
            icon={DollarSign}
          />
          <DataCard
            title="Net Profit"
            value={`${currentData.netProfit.toLocaleString()}`}
            subtitle="After refunds and taxes"
            icon={TrendingUp}
          />
          <DataCard
            title="Transactions"
            value={currentData.transactions}
            subtitle="Total orders"
            icon={FileText}
          />
          <DataCard
            title="Avg Profit/Transaction"
            value={`${currentData.avgProfitPerTransaction.toFixed(2)}`}
            subtitle="Per order"
            icon={TrendingUp}
          />
          <DataCard
            title="Total Customers"
            value={currentData.totalCustomers}
            subtitle="Unique customers"
            icon={Users}
          />
          <DataCard
            title="Avg Spending/Customer"
            value={`${currentData.avgSpendingPerCustomer.toFixed(2)}`}
            subtitle="Per person"
            icon={ShoppingBag}
          />
        </div>
      </div>

      {/* Top 5 Rankings Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Restaurants by Revenue */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Restaurant Revenue Ranking
            </CardTitle>
            <CardDescription>Top 5 by sales revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Restaurant</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topRestaurantsByRevenue.map((restaurant) => (
                  <TableRow key={restaurant.rank}>
                    <TableCell>
                      <Badge variant={restaurant.rank === 1 ? 'default' : 'secondary'}>
                        #{restaurant.rank}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{restaurant.name}</TableCell>
                    <TableCell className="text-right">
                      <div>${restaurant.revenue.toLocaleString()}</div>
                      <div className={`text-xs ${restaurant.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {restaurant.change}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Products by Sales Volume */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Product Sales Ranking
            </CardTitle>
            <CardDescription>Top 5 by quantity sold</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProductsBySales.map((product) => (
                  <TableRow key={product.rank}>
                    <TableCell>
                      <Badge variant={product.rank === 1 ? 'default' : 'secondary'}>
                        #{product.rank}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.category}</div>
                    </TableCell>
                    <TableCell className="text-right">{product.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Products by Revenue */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Product Revenue Ranking
            </CardTitle>
            <CardDescription>Top 5 by sales revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProductsByRevenue.map((product) => (
                  <TableRow key={product.rank}>
                    <TableCell>
                      <Badge variant={product.rank === 1 ? 'default' : 'secondary'}>
                        #{product.rank}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right">
                      <div>${product.revenue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{product.sales} sold</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}