import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { MenuItem, initialMenuItems, MenuCategory, MenuSection, Menu, defaultMenus, menuCategories } from './menuData'

// Types for our global context
export type ContextScope = 'account' | 'restaurant'

export interface KPIData {
  todaysSales: number
  todaysOrders: number
  rating: number
  activeStaff: number
  monthlyRevenue?: number
  totalCustomers?: number
  avgOrderValue?: number
}

export interface RestaurantData {
  id: string
  name: string
  location: string
  address: string
  city: string
  businessHours: string
  manager: string
  storeType: 'full_service' | 'cafe' | 'fast_casual'
  status: 'active' | 'inactive' | 'maintenance'
  avatar: string
  kpis: KPIData
}

export interface Organization {
  id: string
  name: string
  legalName: string
  ein: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  role: string
  joinDate: string
  lastLogin: string
}

export interface AccountData {
  id: string
  name: string
  totalRestaurants: number
  aggregatedKpis: KPIData
  restaurants: RestaurantData[]
}

export interface StaffMember {
  id: string
  name: string
  role: string
  status: 'active' | 'inactive' | 'suspended' | 'revoked'
  restaurantId?: string
  email: string
  phone: string
}

export interface Task {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'completed'
  dueDate: string
  restaurantId?: string
  assignedTo?: string
}

// ItemDesign interface (for Item Design page)
export interface ItemData {
  id: string
  image: string
  name1: string // Primary name
  name2: string // Secondary name
  description: string
  price: number
  addOns: Array<{ id: string; name: string; extraCharge: boolean; price: number }>
  removables: Array<{ id: string; name: string }>
  printerTypes: string[] // Multi-select: Kitchen, Bar, Dessert, etc.
  isCombo: boolean
  comboRequiredGroups?: Array<{
    id: string
    name: string
    options: Array<{ id: string; name: string; extraCharge: boolean; price: number }>
  }>
}

export interface GlobalDataContextType {
  // Current scope
  contextScope: ContextScope
  currentAccountId: string | null
  currentRestaurantId: string | null
  
  // Data based on current scope
  currentData: AccountData | RestaurantData
  currentKpis: KPIData
  currentStaff: StaffMember[]
  currentTasks: Task[]
  currentMenuItems: MenuItem[]
  currentItemDesigns: ItemData[]
  
  // All data
  accountData: AccountData
  restaurants: RestaurantData[]
  
  // Actions
  setContextScope: (scope: ContextScope) => void
  setCurrentRestaurant: (restaurantId: string | null) => void
  addRestaurant: (restaurant: Omit<RestaurantData, 'id'>) => void
  updateRestaurant: (restaurant: RestaurantData) => void
  deleteRestaurant: (restaurantId: string) => void
  toggleRestaurantStatus: (restaurantId: string) => void
  
  // Menu item management
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void
  updateMenuItem: (item: MenuItem) => void
  deleteMenuItem: (itemId: string) => void
  getRestaurantMenuItems: (restaurantId: string) => MenuItem[]
  syncMenuItemsToRestaurants: (targetRestaurantIds: string[], sourceItems: MenuItem[], mode: 'merge' | 'replace') => void
  
  // Menu structure sync
  syncMenuStructureToRestaurants: (targetRestaurantIds: string[], syncScope: {
    structure: boolean
    itemBindings: boolean  
    prices: boolean
    availability: boolean
  }, mode: 'merge' | 'replace') => void
  
  // Menu category management
  currentMenuCategories: MenuCategory[]
  getCurrentMenuCategories: () => MenuCategory[]
  getRestaurantMenuCategories: (restaurantId: string) => MenuCategory[]
  addMenuCategory: (category: Omit<MenuCategory, 'id'>) => MenuCategory | undefined
  updateMenuCategories: (categories: MenuCategory[]) => void
  
  // Menu section management  
  currentMenuSections: MenuSection[]
  getCurrentMenuSections: () => MenuSection[]
  getRestaurantMenuSections: (restaurantId: string) => MenuSection[]
  addMenuSection: (section: Omit<MenuSection, 'id'>) => MenuSection | undefined
  updateMenuSections: (sections: MenuSection[]) => void
  updateMenuSectionsForMenu: (menuId: string, sections: MenuSection[]) => void
  
  // Multi-menu management
  currentMenuId: string | null
  currentMenus: Menu[]
  getCurrentMenus: () => Menu[]
  getRestaurantMenus: (restaurantId: string) => Menu[]
  getCurrentMenu: () => Menu | null
  setCurrentMenu: (menuId: string | null) => void
  addMenu: (menu: Omit<Menu, 'id' | 'createdAt' | 'updatedAt'>) => Menu | undefined
  updateMenu: (menu: Menu) => void
  deleteMenu: (menuId: string) => void
  duplicateMenu: (menuId: string, newName?: string) => Menu | undefined
  syncMenuToRestaurants: (menuId: string, targetRestaurantIds: string[], mode: 'merge' | 'replace') => void
  
  // Organization and profile management
  organization: Organization
  userProfile: UserProfile
  updateOrganization: (org: Organization) => void
  updateUserProfile: (profile: UserProfile) => void
  
  // Utility functions
  getAggregatedKpis: () => KPIData
  getRestaurantData: (restaurantId: string) => RestaurantData | null
  getScopeTitle: () => string
  
  // Item Design management
  getRestaurantItemDesigns: (restaurantId: string) => ItemData[]
  addItemDesign: (item: Omit<ItemData, 'id'>) => void
  updateItemDesign: (item: ItemData) => void
  deleteItemDesign: (itemId: string) => void
}

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined)

// Mock data
const initialRestaurants: RestaurantData[] = [
  {
    id: "1",
    name: "Restaurant 1",
    location: "123 Main St, Downtown",
    address: "123 Main Street, Downtown",
    city: "New York",
    businessHours: "8:00 AM - 10:00 PM",
    manager: "Sarah Martinez",
    storeType: "full_service",
    status: "active",
    avatar: "/restaurant-1.jpg",
    kpis: {
      todaysSales: 8420,
      todaysOrders: 147,
      rating: 4.8,
      activeStaff: 12,
      monthlyRevenue: 245000,
      totalCustomers: 1250,
      avgOrderValue: 57.3
    }
  },
  {
    id: "2", 
    name: "Restaurant 2",
    location: "456 Ocean Ave, Waterfront",
    address: "456 River Road, Midtown",
    city: "New York",
    businessHours: "6:00 AM - 9:00 PM",
    manager: "Michael Chen",
    storeType: "cafe",
    status: "active",
    avatar: "/restaurant-2.jpg",
    kpis: {
      todaysSales: 3250,
      todaysOrders: 89,
      rating: 4.6,
      activeStaff: 8,
      monthlyRevenue: 89000,
      totalCustomers: 850,
      avgOrderValue: 36.5
    }
  }
]

const initialStaff: StaffMember[] = []

const initialTasks: Task[] = [
  { id: "1", title: "Review daily sales report", priority: "high", status: "pending", dueDate: "2024-01-15", restaurantId: "1", assignedTo: "Alice Johnson" },
  { id: "2", title: "Update menu prices", priority: "medium", status: "pending", dueDate: "2024-01-16", restaurantId: "1", assignedTo: "Bob Smith" },
  { id: "3", title: "Staff training session", priority: "high", status: "completed", dueDate: "2024-01-14", restaurantId: "2", assignedTo: "David Wilson" },
  { id: "5", title: "Account reconciliation", priority: "high", status: "pending", dueDate: "2024-01-15" }, // Account-level task
  { id: "6", title: "Quarterly review preparation", priority: "medium", status: "pending", dueDate: "2024-01-20" } // Account-level task
]

const initialOrganization: Organization = {
  id: "org_001",
  name: "Company Name",
  legalName: "Company Name LLC",
  ein: "12-3456789",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "United States"
}

const initialUserProfile: UserProfile = {
  id: "user_123",
  firstName: "Sarah",
  lastName: "Martinez",
  email: "sarah.martinez@email.com",
  phone: "+1 (555) 123-4567",
  avatar: "/avatars/sarah.jpg",
  role: "Restaurant Owner",
  joinDate: "2023-03-15",
  lastLogin: "2024-01-16T10:30:00Z"
}

// Initial Item Design data for Restaurant 1
const initialItemDesigns: Record<string, ItemData[]> = {
  "1": [ // Restaurant 1
    // Appetizers
    {
      id: "item-1-001",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400",
      name1: "春卷",
      name2: "Spring Rolls",
      description: "传统脆皮春卷，配甜辣酱",
      price: 8.99,
      addOns: [
        { id: "addon-1", name: "额外酱汁", extraCharge: true, price: 1.50 },
        { id: "addon-2", name: "辣椒油", extraCharge: false, price: 0 }
      ],
      removables: [],
      printerTypes: ["Main Kitchen", "Wok Station"],
      isCombo: false
    },
    {
      id: "item-1-002",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
      name1: "酸辣汤",
      name2: "Hot & Sour Soup",
      description: "开胃酸辣汤，配豆腐和木耳",
      price: 6.99,
      addOns: [
        { id: "addon-3", name: "额外豆腐", extraCharge: true, price: 2.00 },
        { id: "addon-4", name: "鸡蛋花", extraCharge: true, price: 1.00 }
      ],
      removables: [
        { id: "rem-1", name: "木耳" },
        { id: "rem-2", name: "香菜" }
      ],
      printerTypes: ["Main Kitchen"],
      isCombo: false
    },
    {
      id: "item-1-003",
      image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400",
      name1: "蒜蓉虾",
      name2: "Garlic Shrimp",
      description: "新鲜虾仁炒香蒜，香味浓郁",
      price: 14.99,
      addOns: [
        { id: "addon-5", name: "额外虾", extraCharge: true, price: 5.00 }
      ],
      removables: [
        { id: "rem-3", name: "蒜" }
      ],
      printerTypes: ["Main Kitchen", "Wok Station"],
      isCombo: false
    },
    
    // Main Dishes
    {
      id: "item-1-004",
      image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400",
      name1: "黑椒牛排",
      name2: "Black Pepper Steak",
      description: "优质牛排配黑椒酱和时令蔬菜",
      price: 28.99,
      addOns: [
        { id: "addon-6", name: "蘑菇酱", extraCharge: true, price: 3.00 },
        { id: "addon-7", name: "薯条", extraCharge: true, price: 4.00 },
        { id: "addon-8", name: "烤蔬菜", extraCharge: true, price: 5.00 }
      ],
      removables: [
        { id: "rem-4", name: "黑椒" },
        { id: "rem-5", name: "洋葱" }
      ],
      printerTypes: ["Main Kitchen", "Braise Station"],
      isCombo: false
    },
    {
      id: "item-1-005",
      image: "https://images.unsplash.com/photo-1625943815283-017561cce677?w=400",
      name1: "北京烤鸭",
      name2: "Peking Duck",
      description: "经典北京烤鸭，配薄饼和甜面酱",
      price: 45.99,
      addOns: [
        { id: "addon-9", name: "额外薄饼", extraCharge: true, price: 3.00 },
        { id: "addon-10", name: "额外酱料", extraCharge: true, price: 2.00 }
      ],
      removables: [],
      printerTypes: ["Main Kitchen"],
      isCombo: false
    },
    {
      id: "item-1-006",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
      name1: "海鲜炒饭",
      name2: "Seafood Fried Rice",
      description: "新鲜海鲜配香炒米饭",
      price: 16.99,
      addOns: [
        { id: "addon-11", name: "荷包蛋", extraCharge: true, price: 2.00 },
        { id: "addon-12", name: "额外虾", extraCharge: true, price: 5.00 }
      ],
      removables: [
        { id: "rem-6", name: "葱花" },
        { id: "rem-7", name: "鸡蛋" }
      ],
      printerTypes: ["Wok Station"],
      isCombo: false
    },
    {
      id: "item-1-007",
      image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400",
      name1: "担担面",
      name2: "Dan Dan Noodles",
      description: "四川风味麻辣面条",
      price: 12.99,
      addOns: [
        { id: "addon-13", name: "额外辣椒油", extraCharge: false, price: 0 },
        { id: "addon-14", name: "溏心蛋", extraCharge: true, price: 2.00 },
        { id: "addon-15", name: "额外肉末", extraCharge: true, price: 3.00 }
      ],
      removables: [
        { id: "rem-8", name: "花生碎" },
        { id: "rem-9", name: "香菜" }
      ],
      printerTypes: ["Main Kitchen"],
      isCombo: false
    },
    
    // Desserts
    {
      id: "item-1-008",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
      name1: "芒果班戟",
      name2: "Mango Pancake",
      description: "新鲜芒果配奶油千层",
      price: 7.99,
      addOns: [
        { id: "addon-16", name: "额外奶油", extraCharge: true, price: 1.50 },
        { id: "addon-17", name: "冰淇淋球", extraCharge: true, price: 3.00 }
      ],
      removables: [],
      printerTypes: ["Dessert Station"],
      isCombo: false
    },
    {
      id: "item-1-009",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
      name1: "提拉米苏",
      name2: "Tiramisu",
      description: "经典意式咖啡甜点",
      price: 8.99,
      addOns: [
        { id: "addon-18", name: "浓缩咖啡", extraCharge: true, price: 2.50 }
      ],
      removables: [],
      printerTypes: ["Dessert Station"],
      isCombo: false
    },
    {
      id: "item-1-010",
      image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400",
      name1: "香草冰淇淋",
      name2: "Vanilla Ice Cream",
      description: "手工制作香草冰淇淋",
      price: 5.99,
      addOns: [
        { id: "addon-19", name: "巧克力酱", extraCharge: true, price: 1.00 },
        { id: "addon-20", name: "水果配料", extraCharge: true, price: 2.50 },
        { id: "addon-21", name: "坚果碎", extraCharge: true, price: 1.50 }
      ],
      removables: [],
      printerTypes: ["Dessert Station"],
      isCombo: false
    },
    
    // Beverages
    {
      id: "item-1-011",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
      name1: "拿铁咖啡",
      name2: "Latte",
      description: "经典意式拿铁咖啡",
      price: 5.50,
      addOns: [
        { id: "addon-22", name: "额外浓缩", extraCharge: true, price: 1.50 },
        { id: "addon-23", name: "焦糖糖浆", extraCharge: true, price: 1.00 },
        { id: "addon-24", name: "豆奶", extraCharge: true, price: 1.00 }
      ],
      removables: [],
      printerTypes: ["Beverage Station"],
      isCombo: false
    },
    {
      id: "item-1-012",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
      name1: "珍珠奶茶",
      name2: "Bubble Tea",
      description: "台湾风味珍珠奶茶",
      price: 6.50,
      addOns: [
        { id: "addon-25", name: "额外珍珠", extraCharge: true, price: 1.50 },
        { id: "addon-26", name: "椰果", extraCharge: true, price: 1.00 },
        { id: "addon-27", name: "布丁", extraCharge: true, price: 1.50 }
      ],
      removables: [
        { id: "rem-10", name: "珍珠" },
        { id: "rem-11", name: "糖" }
      ],
      printerTypes: ["Beverage Station"],
      isCombo: false
    },
    {
      id: "item-1-013",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400",
      name1: "鲜榨橙汁",
      name2: "Fresh Orange Juice",
      description: "100%鲜榨橙汁",
      price: 4.99,
      addOns: [],
      removables: [
        { id: "rem-12", name: "冰块" }
      ],
      printerTypes: ["Beverage Station"],
      isCombo: false
    },
    
    // Combo Meals
    {
      id: "combo-1-001",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      name1: "工作日午餐套餐",
      name2: "Weekday Lunch Combo",
      description: "适合工作日快速午餐的经济套餐",
      price: 18.99,
      addOns: [
        { id: "addon-28", name: "升级饮料", extraCharge: true, price: 2.00 }
      ],
      removables: [],
      printerTypes: ["Main Kitchen", "Beverage Station"],
      isCombo: true,
      comboRequiredGroups: [
        {
          id: "group-1",
          name: "选择主菜",
          options: [
            { id: "opt-1", name: "海鲜炒饭", extraCharge: false, price: 0 },
            { id: "opt-2", name: "担担面", extraCharge: false, price: 0 },
            { id: "opt-3", name: "黑椒牛排", extraCharge: true, price: 5.00 }
          ]
        },
        {
          id: "group-2",
          name: "选择汤品",
          options: [
            { id: "opt-4", name: "酸辣汤", extraCharge: false, price: 0 },
            { id: "opt-5", name: "玉米浓汤", extraCharge: false, price: 0 }
          ]
        },
        {
          id: "group-3",
          name: "选择饮料",
          options: [
            { id: "opt-6", name: "可乐", extraCharge: false, price: 0 },
            { id: "opt-7", name: "雪碧", extraCharge: false, price: 0 },
            { id: "opt-8", name: "橙汁", extraCharge: true, price: 1.00 },
            { id: "opt-9", name: "拿铁", extraCharge: true, price: 2.00 }
          ]
        }
      ]
    },
    {
      id: "combo-1-002",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
      name1: "双人套餐",
      name2: "Couple's Combo",
      description: "浪漫双人晚餐套餐",
      price: 65.99,
      addOns: [
        { id: "addon-29", name: "红酒配对", extraCharge: true, price: 15.00 },
        { id: "addon-30", name: "甜品升级", extraCharge: true, price: 5.00 }
      ],
      removables: [],
      printerTypes: ["Main Kitchen", "Dessert Station", "Beverage Station"],
      isCombo: true,
      comboRequiredGroups: [
        {
          id: "group-4",
          name: "选择开胃菜",
          options: [
            { id: "opt-10", name: "春卷 (2份)", extraCharge: false, price: 0 },
            { id: "opt-11", name: "蒜蓉虾", extraCharge: true, price: 3.00 }
          ]
        },
        {
          id: "group-5",
          name: "选择主菜 (2选2)",
          options: [
            { id: "opt-12", name: "黑椒牛排", extraCharge: false, price: 0 },
            { id: "opt-13", name: "北京烤鸭", extraCharge: true, price: 8.00 },
            { id: "opt-14", name: "海鲜炒饭", extraCharge: false, price: 0 },
            { id: "opt-15", name: "担担面", extraCharge: false, price: 0 }
          ]
        },
        {
          id: "group-6",
          name: "选择甜品",
          options: [
            { id: "opt-16", name: "芒果班戟", extraCharge: false, price: 0 },
            { id: "opt-17", name: "提拉米苏", extraCharge: false, price: 0 },
            { id: "opt-18", name: "香草冰淇淋", extraCharge: false, price: 0 }
          ]
        },
        {
          id: "group-7",
          name: "选择饮料 (2选2)",
          options: [
            { id: "opt-19", name: "珍珠奶茶", extraCharge: false, price: 0 },
            { id: "opt-20", name: "拿铁咖啡", extraCharge: false, price: 0 },
            { id: "opt-21", name: "鲜榨橙汁", extraCharge: false, price: 0 }
          ]
        }
      ]
    },
    {
      id: "combo-1-003",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400",
      name1: "家庭套餐",
      name2: "Family Combo",
      description: "4-6人份家庭聚餐套餐",
      price: 128.99,
      addOns: [
        { id: "addon-31", name: "额外主菜", extraCharge: true, price: 20.00 },
        { id: "addon-32", name: "饮料套装", extraCharge: true, price: 12.00 }
      ],
      removables: [],
      printerTypes: ["Main Kitchen", "Wok Station", "Dessert Station"],
      isCombo: true,
      comboRequiredGroups: [
        {
          id: "group-8",
          name: "选择开胃菜 (2选2)",
          options: [
            { id: "opt-22", name: "春卷 (4份)", extraCharge: false, price: 0 },
            { id: "opt-23", name: "酸辣汤 (大)", extraCharge: false, price: 0 },
            { id: "opt-24", name: "蒜蓉虾 (双份)", extraCharge: true, price: 8.00 }
          ]
        },
        {
          id: "group-9",
          name: "选择主菜 (3选3)",
          options: [
            { id: "opt-25", name: "北京烤鸭", extraCharge: false, price: 0 },
            { id: "opt-26", name: "黑椒牛排 (双份)", extraCharge: false, price: 0 },
            { id: "opt-27", name: "海鲜炒饭 (大)", extraCharge: false, price: 0 },
            { id: "opt-28", name: "担担面 (4份)", extraCharge: false, price: 0 }
          ]
        },
        {
          id: "group-10",
          name: "选择甜品",
          options: [
            { id: "opt-29", name: "芒果班戟 (4份)", extraCharge: false, price: 0 },
            { id: "opt-30", name: "提拉米苏 (4份)", extraCharge: false, price: 0 },
            { id: "opt-31", name: "混合甜品拼盘", extraCharge: true, price: 5.00 }
          ]
        }
      ]
    }
  ],
  "2": [], // Restaurant 2 - empty for now
  "3": [], // Restaurant 3 - empty for now
  "4": []  // Restaurant 4 - empty for now
}


export function GlobalDataProvider({ children }: { children: ReactNode }) {
  const [contextScope, setContextScope] = useState<ContextScope>('account')
  const [currentAccountId] = useState<string>('acc_001') // Fixed account ID for now
  const [currentRestaurantId, setCurrentRestaurantId] = useState<string | null>(null)
  const [restaurants, setRestaurants] = useState<RestaurantData[]>(initialRestaurants)
  const [staff] = useState<StaffMember[]>(initialStaff)
  const [tasks] = useState<Task[]>(initialTasks)
  const [organization, setOrganization] = useState<Organization>(initialOrganization)
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile)
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Restaurant-specific menu categories  
  const [restaurantMenuCategories, setRestaurantMenuCategories] = useState<Record<string, MenuCategory[]>>(() => {
    // Initialize each restaurant with empty categories
    const initialCategoryData: Record<string, MenuCategory[]> = {}
    
    initialRestaurants.forEach((restaurant) => {
      initialCategoryData[restaurant.id] = []
    })
    
    return initialCategoryData
  })

  // Restaurant-specific menu sections
  const [restaurantMenuSections, setRestaurantMenuSections] = useState<Record<string, MenuSection[]>>(() => {
    const initialSectionData: Record<string, MenuSection[]> = {}
    
    initialRestaurants.forEach((restaurant) => {
      initialSectionData[restaurant.id] = []
    })
    
    return initialSectionData
  })

  // Restaurant-specific menu items - Initialize lazily to avoid blocking
  const [restaurantMenuItems, setRestaurantMenuItems] = useState<Record<string, MenuItem[]>>({})
  
  // Restaurant-specific item designs
  const [restaurantItemDesigns, setRestaurantItemDesigns] = useState<Record<string, ItemData[]>>(initialItemDesigns)
  
  // Multiple menu support
  const [currentMenuId, setCurrentMenuId] = useState<string | null>(null)
  

  // Initialize menu items lazily
  useEffect(() => {
    if (!isInitialized) {
      const initializeMenuItems = () => {
        const initialMenuData: Record<string, MenuItem[]> = {}
        
        initialRestaurants.forEach((restaurant) => {
          // Initialize each restaurant with empty menu items
          initialMenuData[restaurant.id] = []
        })
        
        setRestaurantMenuItems(initialMenuData)
        setIsInitialized(true)
      }

      // Use setTimeout to prevent blocking the main thread
      setTimeout(initializeMenuItems, 0)
    }
  }, [isInitialized])

  // Calculate aggregated KPIs from all active restaurants
  const getAggregatedKpis = (): KPIData => {
    const activeRestaurants = restaurants.filter(r => r.status === 'active')
    
    return activeRestaurants.reduce((acc, restaurant) => ({
      todaysSales: acc.todaysSales + restaurant.kpis.todaysSales,
      todaysOrders: acc.todaysOrders + restaurant.kpis.todaysOrders,
      rating: acc.rating + restaurant.kpis.rating,
      activeStaff: acc.activeStaff + restaurant.kpis.activeStaff,
      monthlyRevenue: (acc.monthlyRevenue || 0) + (restaurant.kpis.monthlyRevenue || 0),
      totalCustomers: (acc.totalCustomers || 0) + (restaurant.kpis.totalCustomers || 0),
      avgOrderValue: (acc.avgOrderValue || 0) + (restaurant.kpis.avgOrderValue || 0)
    }), {
      todaysSales: 0,
      todaysOrders: 0,
      rating: 0,
      activeStaff: 0,
      monthlyRevenue: 0,
      totalCustomers: 0,
      avgOrderValue: 0
    })
  }

  const accountData: AccountData = {
    id: currentAccountId!,
    name: "Restaurant Group Management",
    totalRestaurants: restaurants.length,
    aggregatedKpis: getAggregatedKpis(),
    restaurants: restaurants
  }

  const getRestaurantData = (restaurantId: string): RestaurantData | null => {
    return restaurants.find(r => r.id === restaurantId) || null
  }

  // Get current data based on scope
  const getCurrentData = (): AccountData | RestaurantData => {
    if (contextScope === 'account') {
      return accountData
    } else if (currentRestaurantId) {
      return getRestaurantData(currentRestaurantId) || accountData
    }
    return accountData
  }

  // Get current KPIs based on scope
  const getCurrentKpis = (): KPIData => {
    if (contextScope === 'account') {
      const aggregated = getAggregatedKpis()
      const activeCount = restaurants.filter(r => r.status === 'active').length
      // Calculate averages for rating and avgOrderValue
      return {
        ...aggregated,
        rating: activeCount > 0 ? aggregated.rating / activeCount : 0,
        avgOrderValue: activeCount > 0 && aggregated.avgOrderValue != null ? aggregated.avgOrderValue / activeCount : 0
      }
    } else if (currentRestaurantId) {
      const restaurant = getRestaurantData(currentRestaurantId)
      return restaurant?.kpis || getAggregatedKpis()
    }
    return getAggregatedKpis()
  }

  // Get current staff based on scope
  const getCurrentStaff = (): StaffMember[] => {
    if (contextScope === 'account') {
      return staff // All staff across all restaurants
    } else if (currentRestaurantId) {
      return staff.filter(s => s.restaurantId === currentRestaurantId)
    }
    return staff
  }

  // Get current tasks based on scope
  const getCurrentTasks = (): Task[] => {
    if (contextScope === 'account') {
      return tasks // All tasks including account-level tasks
    } else if (currentRestaurantId) {
      return tasks.filter(t => t.restaurantId === currentRestaurantId)
    }
    return tasks
  }

  // Get current menu items based on scope
  const getCurrentMenuItems = (): MenuItem[] => {
    if (contextScope === 'restaurant' && currentRestaurantId) {
      return restaurantMenuItems[currentRestaurantId] || []
    }
    return []
  }

  // Get menu items for a specific restaurant
  const getRestaurantMenuItems = (restaurantId: string): MenuItem[] => {
    return restaurantMenuItems[restaurantId] || []
  }

  // Menu item management functions
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    if (!currentRestaurantId) return
    
    const timestamp = Date.now()
    const randomSuffix = Math.random().toString(36).substr(2, 9)
    const newItem: MenuItem = {
      ...item,
      id: `rest-${currentRestaurantId}-new-${timestamp}-${randomSuffix}`,
    }
    
    setRestaurantMenuItems(prev => ({
      ...prev,
      [currentRestaurantId]: [...(prev[currentRestaurantId] || []), newItem]
    }))
  }

  const updateMenuItem = (updatedItem: MenuItem) => {
    if (!currentRestaurantId) return
    
    setRestaurantMenuItems(prev => ({
      ...prev,
      [currentRestaurantId]: (prev[currentRestaurantId] || []).map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    }))
  }

  const deleteMenuItem = (itemId: string) => {
    if (!currentRestaurantId) return
    
    setRestaurantMenuItems(prev => ({
      ...prev,
      [currentRestaurantId]: (prev[currentRestaurantId] || []).filter(item => item.id !== itemId)
    }))
  }

  // Sync menu items to other restaurants
  const syncMenuItemsToRestaurants = (targetRestaurantIds: string[], sourceItems: MenuItem[], mode: 'merge' | 'replace') => {
    setRestaurantMenuItems(prev => {
      const newMenuItems = { ...prev }
      
      targetRestaurantIds.forEach(restaurantId => {
        const targetItems = sourceItems.map((item, index) => {
          // Generate a unique ID for the target restaurant
          const baseId = item.id.includes('-') ? item.id.split('-').slice(1).join('-') : item.id
          const newId = `${restaurantId}-sync-${Date.now()}-${index}-${baseId}`
          
          return {
            ...item,
            id: newId
          }
        })
        
        if (mode === 'replace') {
          newMenuItems[restaurantId] = targetItems
        } else { // merge mode
          const existingItems = newMenuItems[restaurantId] || []
          const mergedItems = [...existingItems]
          
          targetItems.forEach(newItem => {
            const existingIndex = mergedItems.findIndex(item => 
              item.name === newItem.name && item.nameEn === newItem.nameEn
            )
            if (existingIndex >= 0) {
              mergedItems[existingIndex] = newItem // Update existing
            } else {
              mergedItems.push(newItem) // Add new
            }
          })
          
          newMenuItems[restaurantId] = mergedItems
        }
      })
      
      return newMenuItems
    })
  }

  // Menu category management functions
  const getCurrentMenuCategories = (): MenuCategory[] => {
    if (contextScope === 'restaurant' && currentRestaurantId) {
      return restaurantMenuCategories[currentRestaurantId] || []
    }
    return []
  }

  const getRestaurantMenuCategories = (restaurantId: string): MenuCategory[] => {
    return restaurantMenuCategories[restaurantId] || []
  }

  const addMenuCategory = (category: Omit<MenuCategory, 'id'>) => {
    if (!currentRestaurantId) return

    const newCategory: MenuCategory = {
      ...category,
      id: `${currentRestaurantId}-cat-${Date.now()}`,
    }

    setRestaurantMenuCategories(prev => ({
      ...prev,
      [currentRestaurantId]: [...(prev[currentRestaurantId] || []), newCategory]
    }))

    return newCategory
  }

  const updateMenuCategories = (categories: MenuCategory[]) => {
    if (!currentRestaurantId) return

    setRestaurantMenuCategories(prev => ({
      ...prev,
      [currentRestaurantId]: categories
    }))
  }

  // Menu section management functions
  const getCurrentMenuSections = (): MenuSection[] => {
    if (contextScope === 'restaurant' && currentRestaurantId) {
      return restaurantMenuSections[currentRestaurantId] || []
    }
    return []
  }

  const getRestaurantMenuSections = (restaurantId: string): MenuSection[] => {
    return restaurantMenuSections[restaurantId] || []
  }

  const addMenuSection = (section: Omit<MenuSection, 'id'>) => {
    if (!currentRestaurantId) return

    const newSection: MenuSection = {
      ...section,
      id: `${currentRestaurantId}-sec-${Date.now()}`,
    }

    setRestaurantMenuSections(prev => ({
      ...prev,
      [currentRestaurantId]: [...(prev[currentRestaurantId] || []), newSection]
    }))

    return newSection
  }

  const updateMenuSections = (sections: MenuSection[]) => {
    if (!currentRestaurantId) return

    setRestaurantMenuSections(prev => ({
      ...prev,
      [currentRestaurantId]: sections
    }))
  }

  // Sync menu structure (categories, sections, and optionally items) to other restaurants
  const syncMenuStructureToRestaurants = (
    targetRestaurantIds: string[], 
    syncScope: {
      structure: boolean
      itemBindings: boolean  
      prices: boolean
      availability: boolean
    }, 
    mode: 'merge' | 'replace'
  ) => {
    if (!currentRestaurantId) return

    const sourceCategories = getCurrentMenuCategories()
    const sourceSections = getCurrentMenuSections()
    const sourceItems = getCurrentMenuItems()

    // Track category mapping for sections
    const categoryMapping: Record<string, Record<string, string>> = {} // restaurantId -> oldId -> newId

    // Sync structure (categories and sections)
    if (syncScope.structure) {
      // First sync categories and build mapping
      setRestaurantMenuCategories(prev => {
        const newCategories = { ...prev }
        
        targetRestaurantIds.forEach(restaurantId => {
          categoryMapping[restaurantId] = {}
          
          const targetCategories = sourceCategories.map((category, index) => {
            const newId = `${restaurantId}-cat-${Date.now()}-${index}`
            categoryMapping[restaurantId][category.id] = newId
            
            return {
              ...category,
              id: newId
            }
          })
          
          if (mode === 'replace') {
            newCategories[restaurantId] = targetCategories
          } else { // merge mode
            const existingCategories = newCategories[restaurantId] || []
            const mergedCategories = [...existingCategories]
            
            targetCategories.forEach(newCategory => {
              const existingIndex = mergedCategories.findIndex(cat => 
                cat.nameEn === newCategory.nameEn || cat.name === newCategory.name
              )
              if (existingIndex >= 0) {
                // Update mapping to existing category
                const originalId = Object.keys(categoryMapping[restaurantId]).find(
                  oldId => categoryMapping[restaurantId][oldId] === newCategory.id
                )
                if (originalId) {
                  categoryMapping[restaurantId][originalId] = mergedCategories[existingIndex].id
                }
                mergedCategories[existingIndex] = { 
                  ...mergedCategories[existingIndex], 
                  ...newCategory, 
                  id: mergedCategories[existingIndex].id 
                }
              } else {
                mergedCategories.push(newCategory)
              }
            })
            
            newCategories[restaurantId] = mergedCategories
          }
        })
        
        return newCategories
      })

      // Then sync sections with correct category mapping
      setRestaurantMenuSections(prev => {
        const newSections = { ...prev }
        
        targetRestaurantIds.forEach(restaurantId => {
          const targetSections = sourceSections.map((section, index) => ({
            ...section,
            id: `${restaurantId}-sec-${Date.now()}-${index}`,
            categoryId: categoryMapping[restaurantId][section.categoryId] || section.categoryId,
            items: [] // Will be populated if itemBindings is enabled
          }))
          
          if (mode === 'replace') {
            newSections[restaurantId] = targetSections
          } else { // merge mode
            const existingSections = newSections[restaurantId] || []
            const mergedSections = [...existingSections]
            
            targetSections.forEach(newSection => {
              const existingIndex = mergedSections.findIndex(sec => 
                sec.nameEn === newSection.nameEn && sec.categoryId === newSection.categoryId
              )
              if (existingIndex >= 0) {
                mergedSections[existingIndex] = { 
                  ...mergedSections[existingIndex], 
                  ...newSection,
                  items: syncScope.itemBindings ? newSection.items : mergedSections[existingIndex].items
                }
              } else {
                mergedSections.push(newSection)
              }
            })
            
            newSections[restaurantId] = mergedSections
          }
        })
        
        return newSections
      })
    }

    // Sync item bindings if enabled
    if (syncScope.itemBindings) {
      // Use existing sync function for items
      syncMenuItemsToRestaurants(targetRestaurantIds, sourceItems, mode)
      
      // Then update sections to include the synced items immediately
      setRestaurantMenuSections(prev => {
        const newSections = { ...prev }
        
        targetRestaurantIds.forEach(restaurantId => {
          const targetRestaurantSections = newSections[restaurantId] || []
          const targetRestaurantItems = restaurantMenuItems[restaurantId] || []
          
          // Map source section items to target restaurant items
          const updatedSections = targetRestaurantSections.map(targetSection => {
            const correspondingSourceSection = sourceSections.find(sourceSection => 
              sourceSection.nameEn === targetSection.nameEn
            )
            
            if (correspondingSourceSection) {
              // Find matching items in target restaurant based on name/nameEn
              const matchingItems = correspondingSourceSection.items.map((sourceItem: MenuItem) => {

                const matchingTargetItem = targetRestaurantItems.find(targetItem => 
                  targetItem.nameEn === sourceItem.nameEn || targetItem.name === sourceItem.name
                )
                return matchingTargetItem || sourceItem // Use target item if found, otherwise use source
              }).filter(Boolean)
              
              return {
                ...targetSection,
                items: matchingItems
              }
            }
            
            return targetSection
          })
          
          newSections[restaurantId] = updatedSections
        })
        
        return newSections
      })
    }
  }

  const getScopeTitle = (): string => {
    if (contextScope === 'account') {
      return "Account Management"
    } else if (currentRestaurantId) {
      const restaurant = getRestaurantData(currentRestaurantId)
      return restaurant?.name || "Restaurant Management"
    }
    return "Restaurant Management"
  }

  const setCurrentRestaurant = (restaurantId: string | null) => {
    setCurrentRestaurantId(restaurantId)
    if (restaurantId) {
      setContextScope('restaurant')
    } else {
      setContextScope('account')
    }
  }

  const addRestaurant = (restaurantData: Omit<RestaurantData, 'id'>) => {
    const newRestaurant: RestaurantData = {
      ...restaurantData,
      id: `rest_${Date.now()}`,
    }
    setRestaurants(prev => [...prev, newRestaurant])
  }

  const updateRestaurant = (updatedRestaurant: RestaurantData) => {
    setRestaurants(prev => 
      prev.map(restaurant => 
        restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
      )
    )
  }

  const deleteRestaurant = (restaurantId: string) => {
    setRestaurants(prev => prev.filter(restaurant => restaurant.id !== restaurantId))
    
    // If the deleted restaurant was selected, switch to account scope
    if (currentRestaurantId === restaurantId) {
      setCurrentRestaurant(null)
    }
  }

  const toggleRestaurantStatus = (restaurantId: string) => {
    setRestaurants(prev => 
      prev.map(restaurant => {
        if (restaurant.id === restaurantId) {
          const newStatus = restaurant.status === 'active' ? 'inactive' : 'active'
          return { ...restaurant, status: newStatus }
        }
        return restaurant
      })
    )
  }

  // Organization and user profile management functions
  const updateOrganization = (org: Organization) => {
    setOrganization(org)
  }

  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile)
  }

  // Item Design management functions
  const getCurrentItemDesigns = (): ItemData[] => {
    if (contextScope === 'restaurant' && currentRestaurantId) {
      return restaurantItemDesigns[currentRestaurantId] || []
    }
    return []
  }

  const getRestaurantItemDesigns = (restaurantId: string): ItemData[] => {
    return restaurantItemDesigns[restaurantId] || []
  }

  const addItemDesign = (item: Omit<ItemData, 'id'>) => {
    if (!currentRestaurantId) return

    const newItem: ItemData = {
      ...item,
      id: `item-${currentRestaurantId}-${Date.now()}`,
    }

    setRestaurantItemDesigns(prev => ({
      ...prev,
      [currentRestaurantId]: [...(prev[currentRestaurantId] || []), newItem]
    }))
  }

  const updateItemDesign = (updatedItem: ItemData) => {
    if (!currentRestaurantId) return

    setRestaurantItemDesigns(prev => ({
      ...prev,
      [currentRestaurantId]: (prev[currentRestaurantId] || []).map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    }))
  }

  const deleteItemDesign = (itemId: string) => {
    if (!currentRestaurantId) return

    setRestaurantItemDesigns(prev => ({
      ...prev,
      [currentRestaurantId]: (prev[currentRestaurantId] || []).filter(item => item.id !== itemId)
    }))
  }

  
  const setCurrentMenu = useCallback((menuId: string | null) => {
    setCurrentMenuId(menuId)
  }, [])

  // Create the context value object
  const contextValue: GlobalDataContextType = {
    contextScope,
    currentAccountId,
    currentRestaurantId,
    currentData: contextScope === 'account' ? accountData : (getRestaurantData(currentRestaurantId!) || accountData),
    currentKpis: contextScope === 'account' ? getAggregatedKpis() : (getRestaurantData(currentRestaurantId!)?.kpis || getAggregatedKpis()),
    currentStaff: getCurrentStaff(),
    currentTasks: getCurrentTasks(),
    currentMenuItems: getCurrentMenuItems(),
    currentItemDesigns: getCurrentItemDesigns(),
    accountData,
    restaurants,
    setContextScope,
    setCurrentRestaurant,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    toggleRestaurantStatus,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getRestaurantMenuItems,
    syncMenuItemsToRestaurants,
    syncMenuStructureToRestaurants,
    currentMenuCategories: getCurrentMenuCategories(),
    getCurrentMenuCategories,
    getRestaurantMenuCategories,
    addMenuCategory,
    updateMenuCategories,
    currentMenuSections: getCurrentMenuSections(),
    getCurrentMenuSections,
    getRestaurantMenuSections,
    addMenuSection,
    updateMenuSections,
    updateMenuSectionsForMenu: (menuId: string, sections: MenuSection[]) => {},
    currentMenuId,
    currentMenus: [],
    getCurrentMenus: () => [],
    getRestaurantMenus: (restaurantId: string) => [],
    getCurrentMenu: () => null,
    setCurrentMenu,
    addMenu: (menu: Omit<Menu, 'id' | 'createdAt' | 'updatedAt'>) => undefined,
    updateMenu: (menu: Menu) => {},
    deleteMenu: (menuId: string) => {},
    duplicateMenu: (menuId: string, newName?: string) => undefined,
    syncMenuToRestaurants: (menuId: string, targetRestaurantIds: string[], mode: 'merge' | 'replace') => {},
    organization,
    userProfile,
    updateOrganization,
    updateUserProfile,
    getAggregatedKpis,
    getRestaurantData,
    getScopeTitle,
    getRestaurantItemDesigns,
    addItemDesign,
    updateItemDesign,
    deleteItemDesign
  }

  return (
    <GlobalDataContext.Provider value={contextValue}>
      {children}
    </GlobalDataContext.Provider>
  )
}

export function useGlobalData() {
  const context = useContext(GlobalDataContext)
  if (context === undefined) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider')
  }
  return context
}