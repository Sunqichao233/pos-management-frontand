import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CartItem } from "../Shop"

interface ShoppingCartProps {
  cartItems: CartItem[]
  onUpdateQuantity: (index: number, quantity: number) => void
  onRemoveItem: (index: number) => void
  onContinueShopping: () => void
  onCheckout: () => void
}

export function ShoppingCartComponent({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onCheckout
}: ShoppingCartProps) {
  const getItemPrice = (item: CartItem) => {
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
    
    return itemPrice
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (getItemPrice(item) * item.quantity), 0)
  }

  const getShippingCost = () => {
    const subtotal = getSubtotal()
    const hasShippingItem = cartItems.some(item => !item.product.shipping.freeShipping)
    
    if (subtotal >= 50 || !hasShippingItem) {
      return 0
    }
    return 9.99
  }

  const getTax = () => {
    return getSubtotal() * 0.08 // 8% tax
  }

  const getTotal = () => {
    return getSubtotal() + getShippingCost() + getTax()
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex-1 overflow-hidden bg-background">
        <div className="border-b border-border bg-background">
          <div className="px-8 py-4">
            <Button variant="ghost" onClick={onContinueShopping} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
            <div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-4">
                Add some POS hardware to get started
              </p>
              <Button onClick={onContinueShopping}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-hidden bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onContinueShopping} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Button>
            <div>
              <h1 className="text-xl font-medium">Shopping Cart</h1>
              <p className="text-sm text-muted-foreground">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <Card key={`${item.product.id}-${JSON.stringify(item.selectedVariants)}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                     
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.product.category}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveItem(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {/* Selected Variants */}
                        {item.selectedVariants && (
                          <div className="flex gap-2">
                            {item.selectedVariants.color && (
                              <Badge variant="secondary" className="text-xs">
                                Color: {item.selectedVariants.color}
                              </Badge>
                            )}
                            {item.selectedVariants.size && (
                              <Badge variant="secondary" className="text-xs">
                                Size: {item.selectedVariants.size}
                              </Badge>
                            )}
                            {item.selectedVariants.connectivity && (
                              <Badge variant="secondary" className="text-xs">
                                {item.selectedVariants.connectivity}
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-medium">
                              ${(getItemPrice(item) * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ${getItemPrice(item).toFixed(2)} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {getShippingCost() === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${getShippingCost().toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${getTax().toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                  
                  <Button className="w-full" size="lg" onClick={onCheckout}>
                    Proceed to Checkout
                  </Button>
                  
                  {getShippingCost() > 0 && getSubtotal() < 50 && (
                    <div className="text-center text-sm text-muted-foreground">
                      Add ${(50 - getSubtotal()).toFixed(2)} more for free shipping
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Security Features */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>1-year warranty included</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}