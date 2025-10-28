import { useState } from "react"
import { Users, Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StaffList } from "./components/StaffList"
import { RolesOverview } from "./components/RolesOverview"

export function StaffManagement() {
  const [activeTab, setActiveTab] = useState("staff")

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="mb-2">Roles & Staff</h1>
            <p className="text-muted-foreground">
              管理员工账户和角色权限
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              员工管理
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              权限简介
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="staff" className="space-y-6">
            <StaffList />
          </TabsContent>
          
          <TabsContent value="roles" className="space-y-6">
            <RolesOverview />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
