import { Crown, Briefcase, DollarSign, Utensils, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Permission {
  name: string
  granted: boolean
}

interface Role {
  id: string
  name: string
  icon: any
  color: string
  bgColor: string
  borderColor: string
  description: string
  permissions: Permission[]
}

export function RolesOverview() {
  const roles: Role[] = [
    {
      id: "owner",
      name: "Owner",
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      description: "餐厅所有者，拥有完整的系统访问权限",
      permissions: [
        { name: "查看所有数据报表", granted: true },
        { name: "管理员工和角色", granted: true },
        { name: "设置税率和费用", granted: true },
        { name: "访问More功能", granted: true },
        { name: "处理Transaction", granted: true },
        { name: "清除本地Data", granted: true },
        { name: "调整Data同步", granted: true },
        { name: "管理餐厅设置", granted: true },
        { name: "管理菜单和价格", granted: true },
        { name: "查看财务数据", granted: true }
      ]
    },
    {
      id: "manager",
      name: "Manager",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "餐厅管理者，负责日常运营管理",
      permissions: [
        { name: "查看所有数据报表", granted: true },
        { name: "管理员工和角色", granted: true },
        { name: "设置税率和费用", granted: false },
        { name: "访问More功能", granted: true },
        { name: "处理Transaction", granted: true },
        { name: "清除本地Data", granted: false },
        { name: "调整Data同步", granted: false },
        { name: "管理餐厅设置", granted: true },
        { name: "管理菜单和价格", granted: true },
        { name: "查看财务数据", granted: true }
      ]
    },
    {
      id: "cashier",
      name: "Cashier",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "收银员，负责处理支付和结账",
      permissions: [
        { name: "查看所有数据报表", granted: true },
        { name: "管理员工和角色", granted: false },
        { name: "设置税率和费用", granted: false },
        { name: "访问More功能", granted: false },
        { name: "处理Transaction", granted: true },
        { name: "清除本地Data", granted: false },
        { name: "调整Data同步", granted: false },
        { name: "管理餐厅设置", granted: false },
        { name: "管理菜单和价格", granted: false },
        { name: "查看财务数据", granted: false }
      ]
    },
    {
      id: "server",
      name: "Server",
      icon: Utensils,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      description: "服务员，负责接单和服务顾客",
      permissions: [
        { name: "查看所有数据报表", granted: false },
        { name: "管理员工和角色", granted: false },
        { name: "设置税率和费用", granted: false },
        { name: "访问More功能", granted: false },
        { name: "处理Transaction", granted: false },
        { name: "清除本地Data", granted: false },
        { name: "调整Data同步", granted: false },
        { name: "管理餐厅设置", granted: false },
        { name: "管理菜单和价格", granted: false },
        { name: "查看财务数据", granted: false }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800/50">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-3">角色权限说明</h2>
          <p className="text-sm text-muted-foreground">
            系统预设了四种角色，每种角色拥有不同的权限级别。您可以在添加员工时为其分配合适的角色。
            角色权限决定了员工在系统中可以执行的操作和访问的功能。
          </p>
        </CardContent>
      </Card>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => {
          const Icon = role.icon
          // Define dark mode colors
          const darkBorderColor = role.id === 'owner' ? 'dark:border-purple-700/50' :
                                  role.id === 'manager' ? 'dark:border-blue-700/50' :
                                  role.id === 'cashier' ? 'dark:border-green-700/50' : 'dark:border-orange-700/50'
          
          const darkBgColor = role.id === 'owner' ? 'dark:bg-purple-950/20' :
                             role.id === 'manager' ? 'dark:bg-blue-950/20' :
                             role.id === 'cashier' ? 'dark:bg-green-950/20' : 'dark:bg-orange-950/20'
          
          const darkIconBg = role.id === 'owner' ? 'dark:bg-purple-900/30' :
                            role.id === 'manager' ? 'dark:bg-blue-900/30' :
                            role.id === 'cashier' ? 'dark:bg-green-900/30' : 'dark:bg-orange-900/30'
          
          const darkTextColor = role.id === 'owner' ? 'dark:text-purple-400' :
                               role.id === 'manager' ? 'dark:text-blue-400' :
                               role.id === 'cashier' ? 'dark:text-green-400' : 'dark:text-orange-400'
          
          return (
            <Card key={role.id} className={`border-2 ${role.borderColor} ${darkBorderColor}`}>
              <CardHeader className={`${role.bgColor} ${darkBgColor} border-b`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg ${role.bgColor} ${darkIconBg} border ${role.borderColor} ${darkBorderColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${role.color} ${darkTextColor}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{role.name}</h3>
                      <Badge variant="outline" className={`${role.bgColor} ${darkBgColor} ${role.color} ${darkTextColor} ${role.borderColor} ${darkBorderColor} mt-1`}>
                        {role.id === 'owner' ? '最高权限' : 
                         role.id === 'manager' ? '管理权限' :
                         role.id === 'cashier' ? '收银权限' : '基础权限'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-6">
                  {role.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">权限列表</h4>
                  <div className="space-y-2">
                    {role.permissions.map((permission, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-3 p-2 rounded-lg ${
                          permission.granted 
                            ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/50' 
                            : 'bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50'
                        }`}
                      >
                        {permission.granted ? (
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${
                          permission.granted 
                            ? 'text-green-900 dark:text-green-300' 
                            : 'text-red-900 dark:text-red-300 line-through'
                        }`}>
                          {permission.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Permission Details */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">权限详细说明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2">设置税率</h4>
                <p className="text-sm text-muted-foreground">
                  修改餐厅的税率设置，影响订单计算和财务报表
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Data处理权限</h4>
                <p className="text-sm text-muted-foreground">
                  包括清除本地数据和调整数据同步设置，需谨慎使用
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">More功能</h4>
                <p className="text-sm text-muted-foreground">
                  访问高级功能和系统设置，包括集成、插件等
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Transaction处理</h4>
                <p className="text-sm text-muted-foreground">
                  处理支付交易、退款和订单结算等财务操作
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">数据报表</h4>
                <p className="text-sm text-muted-foreground">
                  查看销售数据、员工表现和业务分析报表
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">员工管理</h4>
                <p className="text-sm text-muted-foreground">
                  添加、编辑和删除员工账户，管理角色权限
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50">
        <CardContent className="p-6">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Crown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            最佳实践建议
          </h3>
          <ul className="space-y-2 text-sm text-blue-900 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span><strong>Owner角色</strong>应该只分配给餐厅所有者或最高管理层</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span><strong>Manager角色</strong>适合店长或值班经理，可以处理日常运营</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span><strong>Cashier角色</strong>专为收银员设计，只能处理支付相关操作</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span><strong>Server角色</strong>是最基础的角色，适合服务员和新员工</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>定期审查员工权限，确保角色分配符合实际工作需要</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>员工离职或调岗时，及时更新或删除其账户</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
