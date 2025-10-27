import { useState } from "react"
import { Plus, MapPin, Clock, User, TrendingUp, ShoppingBag, Star, MoreVertical, Copy, Edit, Trash2, Power, Upload, Store, ExternalLink, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Toast } from "@/components/ui/toast"
import { useLanguage } from "../LanguageContext"

export interface DaySchedule {
  isOpen: boolean
  openTime: string
  closeTime: string
}

export interface BusinessHours {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

export interface Restaurant {
  id: string
  name: string
  status: 'active' | 'inactive' | 'maintenance'
  address: string
  city: string
  businessHours: BusinessHours | string // Support both new and legacy format
  manager: string
  storeType: 'full_service' | 'quick_service' | 'cafe' | 'food_truck'
  kpis: {
    todaysSales: number
    todaysOrders: number
    rating: number
    activeStaff: number
  }
  image?: string
  location?: string
  avatar?: string
}

interface MyRestaurantsProps {
  restaurants: Restaurant[]
  onAddRestaurant: (restaurant: Restaurant) => void
  onUpdateRestaurant: (restaurant: Restaurant) => void
  onDeleteRestaurant: (restaurantId: string) => void
  onToggleStatus: (restaurantId: string) => void
  onNavigateToAddRestaurant?: () => void
  onEnterRestaurant?: (restaurantId: string) => void
}

export function MyRestaurants({ restaurants, onAddRestaurant, onUpdateRestaurant, onDeleteRestaurant, onToggleStatus, onNavigateToAddRestaurant, onEnterRestaurant }: MyRestaurantsProps) {
  const { t } = useLanguage()
  const [showNewStoreDialog, setShowNewStoreDialog] = useState(false)
  const [showEditStoreDialog, setShowEditStoreDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [showCopyTemplateDialog, setShowCopyTemplateDialog] = useState(false)
  const [selectedTemplateStore, setSelectedTemplateStore] = useState<Restaurant | null>(null)
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null)
  const [deletingRestaurant, setDeletingRestaurant] = useState<Restaurant | null>(null)
  
  // Form state for new restaurant
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    address: '',
    city: '',
    storeType: '' as Restaurant['storeType'] | '',
    manager: '',
    businessHours: ''
  })

  // Form state for editing restaurant
  const [editRestaurant, setEditRestaurant] = useState({
    name: '',
    address: '',
    city: '',
    storeType: '' as Restaurant['storeType'] | '',
    manager: '',
    businessHours: ''
  })

  // Form state for copy template restaurant
  const [copyTemplateRestaurant, setCopyTemplateRestaurant] = useState({
    name: '',
    address: '',
    city: '',
    storeType: '' as Restaurant['storeType'] | '',
    manager: '',
    businessHours: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteRestaurantDialog, setShowDeleteRestaurantDialog] = useState(false)
  const [deleteConfirmChecked, setDeleteConfirmChecked] = useState(false)

  const getStatusBadgeVariant = (status: Restaurant['status']) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'inactive':
        return 'secondary'
      case 'maintenance':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getStoreTypeLabel = (type: Restaurant['storeType']) => {
    const labels = {
      'full_service': 'Full Service',
      'quick_service': 'Quick Service',
      'cafe': 'Cafe',
      'food_truck': 'Food Truck'
    }
    return labels[type]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const handleCreateStore = async () => {
    // Validate form
    if (!newRestaurant.name || !newRestaurant.address || !newRestaurant.city || 
        !newRestaurant.storeType || !newRestaurant.manager || !newRestaurant.businessHours) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create new restaurant object
      const restaurant: Restaurant = {
        id: Date.now().toString(),
        name: newRestaurant.name,
        address: newRestaurant.address,
        city: newRestaurant.city,
        storeType: newRestaurant.storeType as Restaurant['storeType'],
        manager: newRestaurant.manager,
        businessHours: newRestaurant.businessHours,
        status: 'active',
        location: `${newRestaurant.address}, ${newRestaurant.city}`,
        avatar: `/restaurant-${restaurants.length + 1}.jpg`,
        kpis: {
          todaysSales: 0,
          todaysOrders: 0,
          rating: 0,
          activeStaff: 0
        }
      }

      // Add to restaurants list
      onAddRestaurant(restaurant)

      // Reset form
      setNewRestaurant({
        name: '',
        address: '',
        city: '',
        storeType: '',
        manager: '',
        businessHours: ''
      })

      // Close dialog
      setShowNewStoreDialog(false)

      // Show success message
    } catch (error) {
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setNewRestaurant({
      name: '',
      address: '',
      city: '',
      storeType: '',
      manager: '',
      businessHours: ''
    })
  }

  const resetEditForm = () => {
    setEditRestaurant({
      name: '',
      address: '',
      city: '',
      storeType: '',
      manager: '',
      businessHours: ''
    })
  }

  const resetCopyTemplateForm = () => {
    setCopyTemplateRestaurant({
      name: '',
      address: '',
      city: '',
      storeType: '',
      manager: '',
      businessHours: ''
    })
  }

  const handleEditStore = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant)
    setEditRestaurant({
      name: restaurant.name,
      address: restaurant.address,
      city: restaurant.city,
      storeType: restaurant.storeType,
      manager: restaurant.manager,
      businessHours: typeof restaurant.businessHours === 'string' 
        ? restaurant.businessHours 
        : 'Mon-Sun: 9:00 AM - 10:00 PM'
    })
    setShowEditStoreDialog(true)
  }

  const handleUpdateStore = async () => {
    if (!editingRestaurant) return

    // Validate form
    if (!editRestaurant.name || !editRestaurant.address || !editRestaurant.city || 
        !editRestaurant.storeType || !editRestaurant.manager) {
      return
    }

    setIsSubmitting(true)

    try {
      const updatedRestaurant: Restaurant = {
        ...editingRestaurant,
        name: editRestaurant.name,
        address: editRestaurant.address,
        city: editRestaurant.city,
        storeType: editRestaurant.storeType as Restaurant['storeType'],
        manager: editRestaurant.manager,
        location: `${editRestaurant.address}, ${editRestaurant.city}`
      }

      onUpdateRestaurant(updatedRestaurant)

      // Reset form and close dialog
      resetEditForm()
      setEditingRestaurant(null)
      setShowEditStoreDialog(false)
    } catch (error) {
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteStore = (restaurant: Restaurant) => {
    setDeletingRestaurant(restaurant)
    setShowDeleteDialog(true)
  }

  const confirmDeleteStore = () => {
    if (deletingRestaurant) {
      onDeleteRestaurant(deletingRestaurant.id)
      setDeletingRestaurant(null)
      setShowDeleteDialog(false)
    }
  }

  const handleToggleStatus = (restaurant: Restaurant) => {
    onToggleStatus(restaurant.id)
    const newStatus = restaurant.status === 'active' ? 'inactive' : 'active'
  }

  const handleDeleteRestaurantFromEdit = () => {
    if (!editingRestaurant || !deleteConfirmChecked) {
      if (!deleteConfirmChecked) {
      }
      return
    }

    // Delete the restaurant
    onDeleteRestaurant(editingRestaurant.id)
    
    // Close all dialogs and reset state
    setShowDeleteRestaurantDialog(false)
    setShowEditStoreDialog(false)
    setDeleteConfirmChecked(false)
    resetEditForm()
    setEditingRestaurant(null)

  }

  const handleCopyAsTemplate = (restaurant: Restaurant) => {
    setSelectedTemplateStore(restaurant)
    // Pre-fill form with template data but clear name to force user to set a new name
    setCopyTemplateRestaurant({
      name: '',
      address: restaurant.address,
      city: restaurant.city,
      storeType: restaurant.storeType,
      manager: restaurant.manager,
      businessHours: typeof restaurant.businessHours === 'string' 
        ? restaurant.businessHours 
        : 'Mon-Sun: 9:00 AM - 10:00 PM'
    })
    setShowCopyTemplateDialog(true)
  }

  const handleCreateFromTemplate = async () => {
    if (!selectedTemplateStore) return

    // Validate form
    if (!copyTemplateRestaurant.name || !copyTemplateRestaurant.address || !copyTemplateRestaurant.city || 
        !copyTemplateRestaurant.storeType || !copyTemplateRestaurant.manager || !copyTemplateRestaurant.businessHours) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create new restaurant object based on template
      const restaurant: Restaurant = {
        id: Date.now().toString(),
        name: copyTemplateRestaurant.name,
        address: copyTemplateRestaurant.address,
        city: copyTemplateRestaurant.city,
        storeType: copyTemplateRestaurant.storeType as Restaurant['storeType'],
        manager: copyTemplateRestaurant.manager,
        businessHours: copyTemplateRestaurant.businessHours,
        status: 'active',
        location: `${copyTemplateRestaurant.address}, ${copyTemplateRestaurant.city}`,
        avatar: `/restaurant-${restaurants.length + 1}.jpg`,
        kpis: {
          todaysSales: 0,
          todaysOrders: 0,
          rating: 0,
          activeStaff: 0
        }
      }

      // Add to restaurants list
      onAddRestaurant(restaurant)

      // Reset form and close dialog
      resetCopyTemplateForm()
      setSelectedTemplateStore(null)
      setShowCopyTemplateDialog(false)

      // Show success message
    } catch (error) {
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">My Restaurants</h1>
            <p className="text-muted-foreground">
              你的所有餐厅
            </p>
          </div>
          <Button 
            onClick={onNavigateToAddRestaurant}
            className="rounded-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Restaurant
          </Button>
        </div>
      </div>

      {/* Restaurant Cards Grid */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="hover:shadow-md transition-shadow group relative">
              <CardHeader className="pb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">
                    {getStoreTypeLabel(restaurant.storeType)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Restaurant Info */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{restaurant.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{restaurant.manager}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onEnterRestaurant?.(restaurant.id)}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    进入餐厅主页
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditStore(restaurant)}
                  >
                    <Edit className="h-3 w-3 mr-2" />
                    编辑资料
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {restaurants.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Store className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">当前没有已注册的门店</h3>
            <p className="text-muted-foreground mb-4">
              请点击下方按钮创建您的第一家餐厅
            </p>
            <Button 
              onClick={onNavigateToAddRestaurant || (() => setShowNewStoreDialog(true))}
            >
              <Plus className="h-4 w-4 mr-2" />
              新增餐厅
            </Button>
          </div>
        )}
      </div>



      {/* New Store Dialog */}
      <Dialog open={showNewStoreDialog} onOpenChange={setShowNewStoreDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Store</DialogTitle>
            <DialogDescription>
              Add a new restaurant location to your management system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm">Store Name *</label>
              <Input 
                placeholder="Enter store name..." 
                value={newRestaurant.name}
                onChange={(e) => setNewRestaurant(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Address *</label>
              <Input 
                placeholder="Enter full address..." 
                value={newRestaurant.address}
                onChange={(e) => setNewRestaurant(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm">City *</label>
                <Input 
                  placeholder="City" 
                  value={newRestaurant.city}
                  onChange={(e) => setNewRestaurant(prev => ({ ...prev, city: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Store Type *</label>
                <Select 
                  value={newRestaurant.storeType} 
                  onValueChange={(value) => setNewRestaurant(prev => ({ ...prev, storeType: value as Restaurant['storeType'] }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_service">Full Service</SelectItem>
                    <SelectItem value="quick_service">Quick Service</SelectItem>
                    <SelectItem value="cafe">Cafe</SelectItem>
                    <SelectItem value="food_truck">Food Truck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Store Manager *</label>
              <Input 
                placeholder="Manager name..." 
                value={newRestaurant.manager}
                onChange={(e) => setNewRestaurant(prev => ({ ...prev, manager: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Business Hours *</label>
              <Input 
                placeholder="e.g., 8:00 AM - 10:00 PM" 
                value={newRestaurant.businessHours}
                onChange={(e) => setNewRestaurant(prev => ({ ...prev, businessHours: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowNewStoreDialog(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateStore}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Store"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Store Dialog */}
      <Dialog open={showEditStoreDialog} onOpenChange={setShowEditStoreDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Store</DialogTitle>
            <DialogDescription>
              Update the restaurant information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm">Store Name *</label>
              <Input 
                placeholder="Enter store name..." 
                value={editRestaurant.name}
                onChange={(e) => setEditRestaurant(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Address *</label>
              <Input 
                placeholder="Enter full address..." 
                value={editRestaurant.address}
                onChange={(e) => setEditRestaurant(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm">City *</label>
                <Input 
                  placeholder="City" 
                  value={editRestaurant.city}
                  onChange={(e) => setEditRestaurant(prev => ({ ...prev, city: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Store Type *</label>
                <Select 
                  value={editRestaurant.storeType} 
                  onValueChange={(value) => setEditRestaurant(prev => ({ ...prev, storeType: value as Restaurant['storeType'] }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_service">Full Service</SelectItem>
                    <SelectItem value="quick_service">Quick Service</SelectItem>
                    <SelectItem value="cafe">Cafe</SelectItem>
                    <SelectItem value="food_truck">Food Truck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Store Manager *</label>
              <Input 
                placeholder="Manager name..." 
                value={editRestaurant.manager}
                onChange={(e) => setEditRestaurant(prev => ({ ...prev, manager: e.target.value }))}
              />
            </div>
          </div>

          <Separator className="my-4" />

          {/* Delete Restaurant Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <h4 className="font-medium">危险区域</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              删除餐厅将永久删除所有相关数据，此操作无法撤销。
            </p>
            <Button 
              variant="destructive" 
              onClick={() => setShowDeleteRestaurantDialog(true)}
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              删除餐厅
            </Button>
          </div>

          <DialogFooter className="mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowEditStoreDialog(false)
                resetEditForm()
                setEditingRestaurant(null)
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateStore}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Store"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Restaurant</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingRestaurant?.name}"? This action cannot be undone and will permanently remove all data associated with this restaurant.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteStore}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Restaurant
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Restaurant from Edit Dialog - with Confirmation */}
      <AlertDialog open={showDeleteRestaurantDialog} onOpenChange={(open: boolean) => {
        setShowDeleteRestaurantDialog(open)
        if (!open) {
          setDeleteConfirmChecked(false)
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              删除餐厅警告
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>您即将删除 <strong>"{editingRestaurant?.name}"</strong>。</p>
              
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 space-y-2">
                <p className="font-medium text-destructive-foreground">此操作将永久删除以下数据：</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>餐厅基本信息</li>
                  <li>所有菜单和菜品数据</li>
                  <li>员工账户和权限</li>
                  <li>历史订单记录</li>
                  <li>财务和报表数据</li>
                  <li>所有相关设置</li>
                </ul>
              </div>

              <p className="text-destructive font-medium">
                ⚠️ 此操作无法撤销！
              </p>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox 
                  id="delete-confirm"
                  checked={deleteConfirmChecked}
                  onCheckedChange={(checked) => setDeleteConfirmChecked(checked === true)}
                />
                <label 
                  htmlFor="delete-confirm" 
                  className="text-sm cursor-pointer select-none"
                >
                  我理解此操作的后果，确认删除此餐厅及其所有数据
                </label>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowDeleteRestaurantDialog(false)
              setDeleteConfirmChecked(false)
            }}>
              取消
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteRestaurantFromEdit}
              disabled={!deleteConfirmChecked}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Copy Template Dialog */}
      <Dialog open={showCopyTemplateDialog} onOpenChange={setShowCopyTemplateDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create Store from Template</DialogTitle>
            <DialogDescription>
              Create a new restaurant using "{selectedTemplateStore?.name}" as a template.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm">Store Name *</label>
              <Input 
                placeholder="Enter new store name..." 
                value={copyTemplateRestaurant.name}
                onChange={(e) => setCopyTemplateRestaurant(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Address *</label>
              <Input 
                placeholder="Enter full address..." 
                value={copyTemplateRestaurant.address}
                onChange={(e) => setCopyTemplateRestaurant(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm">City *</label>
                <Input 
                  placeholder="City" 
                  value={copyTemplateRestaurant.city}
                  onChange={(e) => setCopyTemplateRestaurant(prev => ({ ...prev, city: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Store Type *</label>
                <Select 
                  value={copyTemplateRestaurant.storeType} 
                  onValueChange={(value) => setCopyTemplateRestaurant(prev => ({ ...prev, storeType: value as Restaurant['storeType'] }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_service">Full Service</SelectItem>
                    <SelectItem value="quick_service">Quick Service</SelectItem>
                    <SelectItem value="cafe">Cafe</SelectItem>
                    <SelectItem value="food_truck">Food Truck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Store Manager *</label>
              <Input 
                placeholder="Manager name..." 
                value={copyTemplateRestaurant.manager}
                onChange={(e) => setCopyTemplateRestaurant(prev => ({ ...prev, manager: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Business Hours *</label>
              <Input 
                placeholder="e.g., 8:00 AM - 10:00 PM" 
                value={copyTemplateRestaurant.businessHours}
                onChange={(e) => setCopyTemplateRestaurant(prev => ({ ...prev, businessHours: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowCopyTemplateDialog(false)
                resetCopyTemplateForm()
                setSelectedTemplateStore(null)
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateFromTemplate}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create from Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}