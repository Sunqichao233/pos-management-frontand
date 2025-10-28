import { useState } from "react"
import { Plus, Search, Eye, Edit, Mail, Phone, User, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Staff {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: 'Owner' | 'Manager' | 'Cashier' | 'Server'
  pin: string
  createdAt: string
}

const mockStaff: Staff[] = [
  {
    id: "1",
    firstName: "张",
    lastName: "小明",
    email: "zhang.xiaoming@restaurant.com",
    phone: "+86 138 0000 1234",
    role: "Manager",
    pin: "1234",
    createdAt: "2024-01-15 10:30:00"
  },
  {
    id: "2",
    firstName: "李",
    lastName: "红",
    email: "li.hong@restaurant.com",
    phone: "+86 139 0000 5678",
    role: "Cashier",
    pin: "5678",
    createdAt: "2024-01-10 14:20:00"
  },
  {
    id: "3",
    firstName: "王",
    lastName: "强",
    email: "wang.qiang@restaurant.com",
    phone: "+86 137 0000 9012",
    role: "Server",
    pin: "9012",
    createdAt: "2024-01-08 09:15:00"
  }
]

const roleColors = {
  Owner: "bg-purple-100 text-purple-800 border-purple-200",
  Manager: "bg-blue-100 text-blue-800 border-blue-200",
  Cashier: "bg-green-100 text-green-800 border-green-200",
  Server: "bg-orange-100 text-orange-800 border-orange-200"
}

export function StaffList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [staffList, setStaffList] = useState<Staff[]>(mockStaff)
  
  // Add Staff Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newStaff, setNewStaff] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "" as Staff['role'] | ""
  })
  const [showPinModal, setShowPinModal] = useState(false)
  const [generatedPin, setGeneratedPin] = useState("")
  const [generatedStaffName, setGeneratedStaffName] = useState("")
  
  // Edit Staff Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedStaffForEdit, setSelectedStaffForEdit] = useState<Staff | null>(null)
  const [editStaff, setEditStaff] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "" as Staff['role'] | ""
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showFinalDeleteConfirm, setShowFinalDeleteConfirm] = useState(false)
  
  // View PIN Modal
  const [showViewPinModal, setShowViewPinModal] = useState(false)
  const [viewingStaff, setViewingStaff] = useState<Staff | null>(null)

  const filteredStaff = staffList.filter(staff => {
    const fullName = `${staff.firstName}${staff.lastName}`
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.phone.includes(searchTerm)
    return matchesSearch
  })

  // Generate a 4-digit PIN
  const generatePin = () => {
    return Math.floor(1000 + Math.random() * 9000).toString()
  }

  const validateAddForm = () => {
    if (!newStaff.firstName.trim()) {
      return false
    }
    if (!newStaff.lastName.trim()) {
      return false
    }
    if (!newStaff.email.trim()) {
      return false
    }
    if (!newStaff.phone.trim()) {
      return false
    }
    if (!newStaff.role) {
      return false
    }
    return true
  }

  const handleAddStaff = () => {
    if (!validateAddForm()) return

    const pin = generatePin()
    const staffName = `${newStaff.firstName}${newStaff.lastName}`
    
    const staff: Staff = {
      id: Date.now().toString(),
      firstName: newStaff.firstName,
      lastName: newStaff.lastName,
      email: newStaff.email,
      phone: newStaff.phone,
      role: newStaff.role as Staff['role'],
      pin: pin,
      createdAt: new Date().toLocaleString('zh-CN')
    }
    
    setStaffList([...staffList, staff])
    setGeneratedPin(pin)
    setGeneratedStaffName(staffName)
    setIsAddModalOpen(false)
    setShowPinModal(true)
  }

  const resetAddModal = () => {
    setIsAddModalOpen(false)
    setNewStaff({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: ""
    })
  }

  const handleClosePinModal = () => {
    setShowPinModal(false)
    setGeneratedPin("")
    setGeneratedStaffName("")
    resetAddModal()
  }

  const handleEditStaff = (staff: Staff) => {
    setSelectedStaffForEdit(staff)
    setEditStaff({
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      phone: staff.phone,
      role: staff.role
    })
    setIsEditModalOpen(true)
  }

  const validateEditForm = () => {
    if (!editStaff.firstName.trim()) {
      return false
    }
    if (!editStaff.lastName.trim()) {
      return false
    }
    if (!editStaff.email.trim()) {
      return false
    }
    if (!editStaff.phone.trim()) {
      return false
    }
    if (!editStaff.role) {
      return false
    }
    return true
  }

  const handleSaveEdit = () => {
    if (!validateEditForm()) return

    if (selectedStaffForEdit) {
      setStaffList(staffList.map(s => 
        s.id === selectedStaffForEdit.id 
          ? {
              ...s,
              firstName: editStaff.firstName,
              lastName: editStaff.lastName,
              email: editStaff.email,
              phone: editStaff.phone,
              role: editStaff.role as Staff['role']
            }
          : s
      ))
      resetEditModal()
    }
  }

  const handleDeleteStaff = () => {
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = () => {
    setShowDeleteConfirm(false)
    setShowFinalDeleteConfirm(true)
  }

  const handleFinalDelete = () => {
    if (selectedStaffForEdit) {
      setStaffList(staffList.filter(s => s.id !== selectedStaffForEdit.id))
      resetEditModal()
    }
  }

  const resetEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedStaffForEdit(null)
    setEditStaff({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: ""
    })
    setShowDeleteConfirm(false)
    setShowFinalDeleteConfirm(false)
  }

  const handleViewPin = (staff: Staff) => {
    setViewingStaff(staff)
    setShowViewPinModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="搜索员工姓名、邮箱或电话..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          添加员工
        </Button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((staff) => (
          <Card key={staff.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header with Role Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{staff.firstName}{staff.lastName}</h3>
                      <Badge variant="outline" className={`${roleColors[staff.role]} mt-1`}>
                        {staff.role}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{staff.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{staff.phone}</span>
                  </div>
                </div>

                {/* PIN and Edit Buttons */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleViewPin(staff)}
                  >
                    <Eye className="h-4 w-4" />
                    查看PIN码
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleEditStaff(staff)}
                  >
                    <Edit className="h-4 w-4" />
                    编辑
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">未找到员工</p>
          </CardContent>
        </Card>
      )}

      {/* Add Staff Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={(open) => !open && resetAddModal()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>添加员工</DialogTitle>
            <DialogDescription>
              填写员工信息以创建新账户
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">名字 <span className="text-red-500">*</span></Label>
                <Input
                  id="first-name"
                  placeholder="例如：小明"
                  value={newStaff.firstName}
                  onChange={(e) => setNewStaff({...newStaff, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">姓氏 <span className="text-red-500">*</span></Label>
                <Input
                  id="last-name"
                  placeholder="例如：张"
                  value={newStaff.lastName}
                  onChange={(e) => setNewStaff({...newStaff, lastName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">邮箱 <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                type="email"
                placeholder="employee@restaurant.com"
                value={newStaff.email}
                onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">电话 <span className="text-red-500">*</span></Label>
              <Input
                id="phone"
                placeholder="+86 138 0000 0000"
                value={newStaff.phone}
                onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">角色 <span className="text-red-500">*</span></Label>
              <Select value={newStaff.role} onValueChange={(value) => setNewStaff({...newStaff, role: value as Staff['role']})}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Cashier">Cashier</SelectItem>
                  <SelectItem value="Server">Server</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetAddModal}>
              返回
            </Button>
            <Button onClick={handleAddStaff}>
              确认添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Show PIN Modal */}
      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>员工PIN码</DialogTitle>
            <DialogDescription>
              请记录以下PIN码并妥善保管
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Staff Info */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">员工姓名</p>
              <p className="text-lg font-medium">{generatedStaffName}</p>
            </div>

            {/* PIN Display */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-3">PIN码</p>
              <p className="text-5xl font-bold tracking-wider font-mono text-blue-600">
                {generatedPin}
              </p>
            </div>

            {/* Important Notice */}
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg space-y-2">
              <h4 className="font-medium text-orange-900 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                重要提示
              </h4>
              <ul className="text-sm text-orange-700 space-y-1 list-disc list-inside">
                <li>此PIN码用于员工登录POS系统</li>
                <li>请务必将PIN码安全地告知员工</li>
                <li>不要与其他人分享PIN码</li>
                <li>如需重置PIN码，请联系管理员</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleClosePinModal} className="w-full">
              我已记录PIN码
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View PIN Modal */}
      <Dialog open={showViewPinModal} onOpenChange={setShowViewPinModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>查看PIN码</DialogTitle>
            <DialogDescription>
              {viewingStaff?.firstName}{viewingStaff?.lastName} 的PIN码
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* PIN Display */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-3">PIN码</p>
              <p className="text-5xl font-bold tracking-wider font-mono text-blue-600">
                {viewingStaff?.pin}
              </p>
            </div>

            {/* Security Notice */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-900">
                <strong>安全提醒：</strong>请确保在安全的环境下查看PIN码，不要让其他无关人员看到。
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowViewPinModal(false)} className="w-full">
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Modal */}
      <Dialog open={isEditModalOpen && !showDeleteConfirm && !showFinalDeleteConfirm} onOpenChange={(open) => !open && resetEditModal()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>编辑员工</DialogTitle>
            <DialogDescription>
              修改员工信息
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-first-name">名字 <span className="text-red-500">*</span></Label>
                <Input
                  id="edit-first-name"
                  value={editStaff.firstName}
                  onChange={(e) => setEditStaff({...editStaff, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-last-name">姓氏 <span className="text-red-500">*</span></Label>
                <Input
                  id="edit-last-name"
                  value={editStaff.lastName}
                  onChange={(e) => setEditStaff({...editStaff, lastName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">邮箱 <span className="text-red-500">*</span></Label>
              <Input
                id="edit-email"
                type="email"
                value={editStaff.email}
                onChange={(e) => setEditStaff({...editStaff, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">电话 <span className="text-red-500">*</span></Label>
              <Input
                id="edit-phone"
                value={editStaff.phone}
                onChange={(e) => setEditStaff({...editStaff, phone: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-role">角色 <span className="text-red-500">*</span></Label>
              <Select value={editStaff.role} onValueChange={(value) => setEditStaff({...editStaff, role: value as Staff['role']})}>
                <SelectTrigger id="edit-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Cashier">Cashier</SelectItem>
                  <SelectItem value="Server">Server</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Delete Section */}
            <div className="pt-4 border-t">
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleDeleteStaff}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                删除员工
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetEditModal}>
              返回
            </Button>
            <Button onClick={handleSaveEdit}>
              保存更改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation - First Step */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除员工</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除员工 <strong>{selectedStaffForEdit?.firstName}{selectedStaffForEdit?.lastName}</strong> 吗？
              <br /><br />
              此操作将导致：
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>员工立即失去系统访问权限</li>
                <li>员工的PIN码将被撤销</li>
                <li>员工的历史记录将被保留但标记为已删除</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteConfirm(false)}>
              返回
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              继续删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation - Final Step */}
      <AlertDialog open={showFinalDeleteConfirm} onOpenChange={setShowFinalDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>最终确认</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p className="font-medium text-destructive">
                这是最后一次确认机会！
              </p>
              <p>
                删除员工 <strong>{selectedStaffForEdit?.firstName}{selectedStaffForEdit?.lastName}</strong> 后无法撤销。
              </p>
              <p>
                如果您确定要删除此员工，请点击下方的"确认删除"按钮。
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowFinalDeleteConfirm(false)}>
              返回
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleFinalDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
