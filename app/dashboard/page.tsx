import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Wallet, Edit, PlusCircle, CalendarIcon, ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';

// 假数据
const performanceData = [
  { title: 'Net Sales', value: '$0.00' },
  { title: 'Total Sales', value: '$0.00' },
  { title: 'Transaction', value: '0' },
  { title: 'Average Net Sales', value: '$0.00' },
  { title: 'Returns and Refunds', value: '$0.00' },
  { title: 'Average Sales per Ticket', value: '$0.00' },
];

const customerData = [
  { label: 'Total Customers', value: '0' },
  { label: 'Returning Customers', value: '0' },
  { label: 'Average number of visits per customer', value: '0' },
  { label: 'Average sales per visit', value: '$0' },
  { label: 'Feedback', value: 'Positive: 0, Negative: 0' },
];

const paymentMethodData = {
  total: '0.00',
  breakdown: [
    { type: 'card', value: '$0.00', color: 'bg-blue-600' },
    { type: 'cash', value: '$0.00', color: 'bg-gray-400' },
    { type: 'others', value: '$0.00', color: 'bg-gray-200' },
  ],
};

// 辅助组件：卡片内容渲染函数
const renderCardContent = (data: { title: string; value: string }[]) => {
  return data.map((item, index) => (
    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
      <span className="text-sm text-gray-600">{item.title}</span>
      <span className="font-semibold text-sm">{item.value}</span>
    </div>
  ));
};

export default function DashboardPage() {
  return (
    <div className="flex-1 p-8">
      {/* 顶部导航和操作按钮 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Square Dashboard</h1>
        <div className="space-x-2">
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            <ArrowRight className="h-4 w-4 mr-2" />
            Go to Bank
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            <Wallet className="h-4 w-4 mr-2" />
            Accepting payments
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
            <Edit className="h-4 w-4 mr-2" />
            Edit Menu
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add a product
          </Button>
        </div>
      </div>

      {/* 仪表盘内容区域 */}
      <div className="space-y-6">
        {/* Performance 卡片 */}
        <Card className="p-6">
          <CardHeader className="flex flex-row justify-between items-center p-0 mb-4">
            <CardTitle className="text-2xl font-semibold">performance</CardTitle>
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <span className="text-gray-500">September 19, 2025</span>
              <CalendarIcon className="h-4 w-4" />
              <Button variant="ghost" className="p-0 h-auto">
                All time <ChevronDownIcon className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <h3 className="text-lg font-medium mb-4">Key Indicators</h3>
            <div className="grid grid-cols-3 gap-4">
              {performanceData.map((item, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                  <p className="text-xs text-gray-400 mt-1">Not applicable</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 下排卡片 */}
        <div className="grid grid-cols-3 gap-6">
          {/* Customers 卡片 */}
          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-semibold">Customers</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              {customerData.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Method 卡片 */}
          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-semibold">payment method</CardTitle>
              <CardDescription className="p-0 text-sm text-gray-500">
                By transaction amount
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex items-center space-x-1 mb-4">
                {paymentMethodData.breakdown.map((item, index) => (
                  <div
                    key={index}
                    className={`h-4 rounded-md ${item.color}`}
                    style={{ flex: item.value.replace('$', '') }}
                  />
                ))}
              </div>
              <div className="space-y-2">
                {paymentMethodData.breakdown.map((item, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.color} mr-2`} />
                    <span className="capitalize">{item.type}</span>
                    <span className="ml-auto font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Merchandise 卡片 */}
          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-semibold">merchandise</CardTitle>
              <CardDescription className="p-0 text-sm text-gray-500">
                By Gross Sales
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              <p className="text-sm text-gray-600">Lowest</p>
              <p className="text-sm text-gray-600">Highest</p>
              <div className="mt-4 text-center text-gray-500">
                <p>There are no sales during this period.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category 卡片 */}
        <Card className="p-6 w-1/3">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl font-semibold">category</CardTitle>
            <CardDescription className="p-0 text-sm text-gray-500">
              By Gross Sales
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            <p className="text-sm text-gray-600">Lowest</p>
            <p className="text-sm text-gray-600">Highest</p>
            <div className="mt-4 text-center text-gray-500">
              <p>There are no sales during this period.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}