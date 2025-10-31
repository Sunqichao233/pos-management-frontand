import { useState, useEffect } from "react"
import {
  Store,
  Users,
  Layout,
  Menu,
  Receipt,
  BarChart3,
  Package,
  CreditCard,
  Monitor,
  MessageSquare,
  ShoppingBag,
  User,
  Globe,
  Moon,
  Code,
  HelpCircle,
  Home,
  ChevronDown,
  Check,
  Building2,
  ChefHat,
  Utensils,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "./LanguageContext"
import { useGlobalData } from "./GlobalDataContext"

// Restaurant-focused navigation items
const getRestaurantNavigationItems = (t: (key: string) => string) => [
  {
    title: t("roles_staff"),
    icon: Users,
    url: "#",
    id: "staff",
  },
  {
    title: t("devices"),
    icon: Monitor,
    url: "#",
    id: "devices",
  },
  {
    title: t("layouts_design"),
    icon: Layout,
    url: "#",
    id: "layouts",
  },
  {
    title: t("item_design"),
    icon: ChefHat,
    url: "#",
    id: "item-design",
  },
  {
    title: t("menu_design"),
    icon: Utensils,
    url: "#",
    id: "menu-design",
  },
  {
    title: t("receipts_printing"),
    icon: Receipt,
    url: "#",
    id: "receipts",
  },
  {
    title: t("crm"),
    icon: MessageSquare,
    url: "#",
    id: "crm",
    badge: t("coming_soon"),
  },
  {
    title: t("inventory"),
    icon: Package,
    url: "#",
    id: "inventory",
    badge: t("coming_soon"),
  },
]

// Menu navigation group
// Profile/Account-focused navigation items
const getProfileNavigationItems = (t: (key: string) => string) => [
  {
    title: t("my_restaurants"),
    icon: Store,
    url: "#",
    id: "restaurants",
  },
  {
    title: t("account_setting"),
    icon: User,
    url: "#",
    id: "account-setting",
  },
  {
    title: t("financial_banking"),
    icon: CreditCard,
    url: "#",
    id: "financial",
  },
  {
    title: t("data_reports"),
    icon: BarChart3,
    url: "#",
    id: "reports",
  },
  {
    title: t("shop_title"),
    icon: ShoppingBag,
    url: "#",
    id: "shop",
  },
  {
    title: t("help_support_title"),
    icon: HelpCircle,
    url: "#",
    id: "help",
  },
  {
    title: t("developer"),
    icon: Code,
    url: "#",
    id: "developer",
    badge: t("coming_soon"),
  },
]

interface DashboardSidebarProps {
  currentPage?: string
  onPageChange?: (page: string) => void
  onRestaurantChange?: (restaurantId: string) => void
}

export function DashboardSidebar({ 
  currentPage = "dashboard", 
  onPageChange,
  onRestaurantChange
}: DashboardSidebarProps) {
  const {
    contextScope,
    currentRestaurantId,
    restaurants,
    organization,
    getRestaurantData,
    getScopeTitle,
    setCurrentRestaurant
  } = useGlobalData()
  const { t } = useLanguage()
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false)
  
  // Get translated navigation items
  const restaurantNavigationItems = getRestaurantNavigationItems(t)
  const profileNavigationItems = getProfileNavigationItems(t)
  
  // Check if current page is an account management page
  const accountManagementPages = ['restaurants', 'reports', 'financial', 'account-setting', 'shop', 'developer', 'help']
  const isProfileMode = contextScope === 'account'
  
  const selectedRestaurant = currentRestaurantId ? getRestaurantData(currentRestaurantId) : null
  
  const handleRestaurantSelect = (restaurant: { id: string }) => {
    setCurrentRestaurant(restaurant.id)
    onRestaurantChange?.(restaurant.id)
    setIsRestaurantModalOpen(false)
  }

  const handleProfileModeToggle = () => {
    setCurrentRestaurant(null)
    onPageChange?.('restaurants') // Navigate to My Restaurant page
    setIsRestaurantModalOpen(false)
  }

  const handleAccountManagementClick = () => {
    setIsRestaurantModalOpen(true)
  }

  // Get current navigation items based on mode
  const currentNavigationItems = isProfileMode ? profileNavigationItems : restaurantNavigationItems

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'maintenance': 
        return 'bg-yellow-500'
      case 'closed':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return t('active')
      case 'maintenance':
        return 'Maintenance'
      case 'closed':
        return t('closed')
      default:
        return 'Unknown'
    }
  }
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        {isProfileMode ? (
          <div 
            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-sidebar-accent transition-colors bg-sidebar-accent"
            onClick={handleAccountManagementClick}
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                <Building2 className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium truncate">{organization.name}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        ) : (
          <div 
            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
            onClick={() => setIsRestaurantModalOpen(true)}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={selectedRestaurant?.avatar} />
              <AvatarFallback>
                {selectedRestaurant?.name?.slice(0, 2).toUpperCase() || "R"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">
                  {selectedRestaurant?.name || t("restaurant")}
                </span>
                {selectedRestaurant && (
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedRestaurant.status)}`} />
                )}
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground px-3 mb-2">
            {isProfileMode ? t('account') : t('restaurant')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {currentNavigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={currentPage === item.id}
                    onClick={() => item.id && onPageChange?.(item.id)}
                    className={item.id ? "cursor-pointer" : ""}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {(item as any).badge && (
                      <Badge variant="secondary" className="ml-auto text-xs bg-orange-100 text-orange-800">
                        {(item as any).badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button 
          variant="default"
          size="lg"
          className={`
            w-full justify-center gap-3 h-14
            font-bold text-base
            shadow-lg hover:shadow-xl
            transition-all duration-200
            hover:scale-[1.02]
            ${isProfileMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-orange-600 hover:bg-orange-700'
            }
          `}
          onClick={() => {
            // Navigate to appropriate home page based on context
            if (isProfileMode) {
              onPageChange?.("account-home")
            } else {
              onPageChange?.("dashboard")
            }
          }}
        >
          <Home className="h-5 w-5" />
          Home
        </Button>
      </SidebarFooter>

      {/* Restaurant Selection Modal */}
      <Dialog open={isRestaurantModalOpen} onOpenChange={setIsRestaurantModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("switch_to")}</DialogTitle>
            <DialogDescription>
              {t("manage_restaurants")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* My Profile Button */}
            <div 
              className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors bg-primary/5 border border-primary/20 hover:bg-primary/10"
              onClick={() => {
                handleProfileModeToggle()
                onPageChange?.('account-home')
              }}
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  <Building2 className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{organization.name}</span>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                    Account
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Account settings and management
                </p>
              </div>
              
              <User className="h-5 w-5 text-primary" />
            </div>

            <Separator />

            {/* Restaurant List */}
            <div className="space-y-3">
              <div className="px-1">
                <span className="text-xs font-medium text-muted-foreground">Your Restaurants</span>
              </div>
              
            </div>
            
            {restaurants.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Store className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No restaurants available</p>
                <p className="text-sm">Contact your administrator to add restaurants.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Sidebar>
  )
}