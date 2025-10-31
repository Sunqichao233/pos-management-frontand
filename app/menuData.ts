// Menu data types and initial data

export interface MenuItem {
  id: string
  name: string
  nameEn?: string
  description: string
  price: number
  image?: string
  category: string
  allergens?: string[]
  isPopular?: boolean
  preparationTime?: number
  visible?: boolean
  status?: 'active' | 'inactive' | 'draft'
  tags?: string[]
  printerRoute?: string
}

export interface MenuCategory {
  id: string
  name: string
  nameEn?: string
  description?: string
  visible: boolean
  sortOrder: number
}

export interface MenuSection {
  id: string
  name: string
  nameEn?: string
  categoryId: string
  items: MenuItem[]
  sortOrder: number
}

export interface Menu {
  id: string
  name: string
  nameEn?: string
  type: 'dine_in' | 'takeout' | 'delivery' | 'all'
  isDefault: boolean
  categories: MenuCategory[]
  sections: MenuSection[]
  createdAt: string
  updatedAt: string
}

// Initial empty data (will be populated by GlobalDataContext)
export const initialMenuItems: MenuItem[] = []
export const menuCategories: MenuCategory[] = []
export const defaultMenus: Menu[] = []
