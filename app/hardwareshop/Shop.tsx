import { useState } from "react"
import { ShoppingCart, Filter, Search, Star, Truck, CreditCard, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductDetail } from "./shop/ProductDetail"
import { ShoppingCartComponent } from "./shop/ShoppingCartComponent"
import { CheckoutFlow } from "./shop/CheckoutFlow"

export interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  description: string
  features: string[]
  compatibility: string[]
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
  variants?: {
    colors?: { name: string; value: string; price?: number }[]
    sizes?: { name: string; price?: number }[]
    connectivity?: { name: string; price?: number }[]
  }
  specifications: { [key: string]: string }
  shipping: {
    freeShipping: boolean
    estimatedDays: string
  }
}

export interface CartItem {
  product: Product
  quantity: number
  selectedVariants?: {
    color?: string
    size?: string
    connectivity?: string
  }
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Square Terminal",
    category: "Card Readers",
    price: 299,
    image: "https://images.unsplash.com/photo-1742238896849-303d74d8a8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3MlMjBzeXN0ZW0lMjBjYXJkJTIwcmVhZGVyfGVufDF8fHx8MTc1ODE0MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviewCount: 1247,
    description: "All-in-one card reader with built-in receipt printer and customer display",
    features: ["Built-in receipt printer", "Customer-facing display", "Contactless payments", "EMV chip cards"],
    compatibility: ["Square POS", "Square for Restaurants", "Square for Retail"],
    inStock: true,
    isBestSeller: true,
    specifications: {
      "Connectivity": "Wi-Fi, Ethernet, 4G LTE",
      "Payment Types": "Chip, contactless, magstripe",
      "Screen": "7-inch touchscreen",
      "Printer": "Thermal receipt printer"
    },
    shipping: {
      freeShipping: true,
      estimatedDays: "1-3 business days"
    }
  },
  {
    id: "2",
    name: "Square Reader for contactless and chip",
    category: "Card Readers",
    price: 49,
    originalPrice: 59,
    image: "https://images.unsplash.com/photo-1742238896849-303d74d8a8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwb3MlMjBzeXN0ZW0lMjBjYXJkJTIwcmVhZGVyfGVufDF8fHx8MTc1ODE0MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviewCount: 892,
    description: "Compact card reader for contactless and chip payments",
    features: ["Contactless payments", "EMV chip cards", "Portable design", "Long battery life"],
    compatibility: ["Square POS", "Square for Restaurants"],
    inStock: true,
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" }
      ]
    },
    specifications: {
      "Connectivity": "Bluetooth",
      "Payment Types": "Chip, contactless",
      "Battery": "Up to 500 transactions",
      "Dimensions": "2.6 x 2.6 x 0.6 inches"
    },
    shipping: {
      freeShipping: false,
      estimatedDays: "2-4 business days"
    }
  },
  {
    id: "3",
    name: "Square Stand for iPad",
    category: "Stands",
    price: 169,
    image: "https://images.unsplash.com/photo-1489925461942-d8f490a04588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBzdGFuZCUyMHBvc3xlbnwxfHx8fDE3NTgxNDA4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviewCount: 654,
    description: "Secure iPad stand with card reader dock and customer display",
    features: ["360° swivel", "Card reader dock", "Cable management", "Theft protection"],
    compatibility: ["iPad (6th gen and later)", "iPad Air", "iPad Pro"],
    inStock: true,
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" }
      ]
    },
    specifications: {
      "Compatibility": "iPad models 6th gen+",
      "Material": "Aluminum and steel",
      "Swivel": "360° rotation",
      "Dimensions": "9.1 x 6.9 x 7.1 inches"
    },
    shipping: {
      freeShipping: true,
      estimatedDays: "1-3 business days"
    }
  },
  {
    id: "4",
    name: "Star TSP143IIIU Receipt Printer",
    category: "Printers",
    price: 229,
    image: "https://images.unsplash.com/photo-1739826294194-9e0ceaea136f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNlaXB0JTIwcHJpbnRlciUyMHBvc3xlbnwxfHx8fDE3NTgxNDA4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviewCount: 423,
    description: "Fast thermal receipt printer with USB connectivity",
    features: ["High-speed printing", "Auto-cutter", "Compact design", "Energy efficient"],
    compatibility: ["Square POS", "Most POS systems"],
    inStock: true,
    variants: {
      connectivity: [
        { name: "USB", price: 0 },
        { name: "Ethernet", price: 50 },
        { name: "Bluetooth", price: 80 }
      ]
    },
    specifications: {
      "Print Speed": "250mm/second",
      "Print Width": "80mm",
      "Connectivity": "USB, Ethernet, or Bluetooth",
      "Auto-cutter": "Yes"
    },
    shipping: {
      freeShipping: true,
      estimatedDays: "2-5 business days"
    }
  },
  {
    id: "5",
    name: "Thermal Receipt Paper Rolls",
    category: "Paper",
    price: 29,
    image: "https://images.unsplash.com/photo-1739826294194-9e0ceaea136f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNlaXB0JTIwcHJpbnRlciUyMHBvc3xlbnwxfHx8fDE3NTgxNDA4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.4,
    reviewCount: 1156,
    description: "High-quality thermal paper rolls for receipt printers",
    features: ["BPA-free", "Long-lasting prints", "Jam-resistant", "50 rolls per case"],
    compatibility: ["80mm thermal printers", "Star printers", "Epson printers"],
    inStock: true,
    isNew: true,
    variants: {
      sizes: [
        { name: "80mm x 80mm (50 rolls)", price: 0 },
        { name: "80mm x 80mm (100 rolls)", price: 25 },
        { name: "57mm x 50mm (50 rolls)", price: -10 }
      ]
    },
    specifications: {
      "Paper Type": "Thermal",
      "Width": "80mm",
      "Length": "80mm",
      "Quantity": "50 rolls per case"
    },
    shipping: {
      freeShipping: false,
      estimatedDays: "3-7 business days"
    }
  },
  {
    id: "6",
    name: "Square Register",
    category: "All-in-One",
    price: 799,
    image: "https://images.unsplash.com/photo-1489925461942-d8f490a04588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBzdGFuZCUyMHBvc3xlbnwxfHx8fDE3NTgxNDA4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviewCount: 234,
    description: "Complete point of sale system with built-in payments, receipt printer, and cash drawer",
    features: ["All-in-one design", "Built-in payments", "Receipt printer", "Cash drawer", "Customer display"],
    compatibility: ["Square POS", "Square for Restaurants", "Square for Retail"],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    specifications: {
      "Screen": "13.3-inch touchscreen",
      "Printer": "Built-in thermal printer",
      "Cash Drawer": "Included",
      "Connectivity": "Wi-Fi, Ethernet"
    },
    shipping: {
      freeShipping: true,
      estimatedDays: "1-3 business days"
    }
  }
]

const categories = ["All", "Card Readers", "Stands", "Printers", "Paper", "All-in-One"]

type ShopView = 'browse' | 'product' | 'cart' | 'checkout'

export function Shop() {
  const [currentView, setCurrentView] = useState<ShopView>('browse')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [cart, setCart] = useState<CartItem[]>([])

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "popular":
      default:
        return b.reviewCount - a.reviewCount
    }
  })

  const addToCart = (product: Product, quantity: number = 1, variants?: CartItem['selectedVariants']) => {
    setCart(prev => {
      const existingItem = prev.find(item => 
        item.product.id === product.id && 
        JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
      )
      
      if (existingItem) {
        return prev.map(item =>
          item === existingItem 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prev, { product, quantity, selectedVariants: variants }]
      }
    })
  }

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter((_, i) => i !== index))
    } else {
      setCart(prev => prev.map((item, i) => 
        i === index ? { ...item, quantity } : item
      ))
    }
  }

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      let itemPrice = item.product.price
      
      // Add variant pricing
      if (item.selectedVariants) {
        const variants = item.product.variants
        if (variants?.colors) {
          const colorVariant = variants.colors.find(c => c.name === item.selectedVariants?.color)
          itemPrice += colorVariant?.price || 0
        }
        if (variants?.sizes) {
          const sizeVariant = variants.sizes.find(s => s.name === item.selectedVariants?.size)
          itemPrice += sizeVariant?.price || 0
        }
        if (variants?.connectivity) {
          const connectivityVariant = variants.connectivity.find(c => c.name === item.selectedVariants?.connectivity)
          itemPrice += connectivityVariant?.price || 0
        }
      }
      
      return total + (itemPrice * item.quantity)
    }, 0)
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setCurrentView('product')
  }

  const handleBackToBrowse = () => {
    setCurrentView('browse')
    setSelectedProduct(null)
  }

  const handleViewCart = () => {
    setCurrentView('cart')
  }

  const handleCheckout = () => {
    setCurrentView('checkout')
  }

  const handleOrderComplete = () => {
    setCart([])
    setCurrentView('browse')
  }

  if (currentView === 'product' && selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={handleBackToBrowse}
        onAddToCart={addToCart}
        cartItemCount={getTotalItems()}
        onViewCart={handleViewCart}
      />
    )
  }

  if (currentView === 'cart') {
    return (
      <ShoppingCartComponent
        cartItems={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onContinueShopping={handleBackToBrowse}
        onCheckout={handleCheckout}
      />
    )
  }

  if (currentView === 'checkout') {
    return (
      <CheckoutFlow
        cartItems={cart}
        onBack={() => setCurrentView('cart')}
        onOrderComplete={handleOrderComplete}
      />
    )
  }

  return (
    <div className="flex-1 overflow-hidden bg-background">
      {/* Header */}
      <div className="bg-background">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-foreground">Hardware Shop</h1>
              <p className="text-muted-foreground mt-1">Professional POS hardware and accessories</p>
            </div>
            <Button 
              variant="outline" 
              className="relative"
              onClick={handleViewCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({getTotalItems()})
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-muted/30">
        <div className="px-8 py-4">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Free shipping on orders $50+</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>1-year warranty included</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-background">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-[24px] py-[10px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    
                    <div className="absolute top-3 left-3 flex gap-1">
                      {product.isNew && (
                        <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
                      )}
                      {product.isBestSeller && (
                        <Badge className="bg-orange-500 hover:bg-orange-600">Best Seller</Badge>
                      )}
                      {product.originalPrice && (
                        <Badge variant="destructive">Sale</Badge>
                      )}
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                        <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.name}</h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.shipping.freeShipping && (
                        <Badge variant="secondary" className="text-xs">Free Shipping</Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 truncate min-w-0"
                        onClick={() => handleViewProduct(product)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 truncate min-w-0"
                        disabled={!product.inStock}
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                <p>No products found matching your criteria.</p>
                <Button variant="link" onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}>
                  Clear filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}