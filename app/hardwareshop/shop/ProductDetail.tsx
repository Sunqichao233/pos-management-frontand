import { useState } from "react"
import { ArrowLeft, Star, ShoppingCart, Truck, Shield, RotateCcw, Check, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Product, CartItem } from "../Shop"

interface ProductDetailProps {
  product: Product
  onBack: () => void
  onAddToCart: (product: Product, quantity: number, variants?: CartItem['selectedVariants']) => void
  cartItemCount: number
  onViewCart: () => void
}

export function ProductDetail({ product, onBack, onAddToCart, cartItemCount, onViewCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariants, setSelectedVariants] = useState<CartItem['selectedVariants']>({})
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleVariantChange = (type: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const getVariantPrice = () => {
    let additionalPrice = 0
    
    
    return product.price + additionalPrice
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariants)
  }

  const images = [product.image, product.image, product.image] // Mock multiple images

  return (
    <div className="flex-1 overflow-hidden bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Button>
            <Button variant="outline" onClick={onViewCart} className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({cartItemCount})
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
               
              </div>
              <div className="flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded border-2 overflow-hidden ${
                      selectedImageIndex === index ? 'border-primary' : 'border-border'
                    }`}
                  >
   
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {product.isNew && (
                    <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
                  )}
                  {product.isBestSeller && (
                    <Badge className="bg-orange-500 hover:bg-orange-600">Best Seller</Badge>
                  )}
                  {!product.inStock && (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
                
                <h1 className="text-2xl font-medium mb-2">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-medium">${getVariantPrice()}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <Badge variant="destructive">
                      Save ${product.originalPrice - product.price}
                    </Badge>
                  )}
                </div>

                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Variants */}
              {product.variants && (
                <div className="space-y-4">
                  {product.variants.colors && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Color</label>
                      <div className="flex gap-2">
                        {product.variants.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => handleVariantChange('color', color.name)}
                          
                            
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          />
                        ))}
                      </div>
                     
                    </div>
                  )}

                  {product.variants.sizes && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Size</label>
                      <div className="flex gap-2">
                        {product.variants.sizes.map((size) => (
                          <Button
                            key={size.name}
                           
                            size="sm"
                            onClick={() => handleVariantChange('size', size.name)}
                          >
                            {size.name}
                            {size.price && size.price > 0 && ` (+$${size.price})`}
                            {size.price && size.price < 0 && ` ($${Math.abs(size.price)})`}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.variants.connectivity && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Connectivity</label>
                      <div className="flex gap-2">
                        {product.variants.connectivity.map((conn) => (
                          <Button
                            key={conn.name}
                           
                            size="sm"
                            onClick={() => handleVariantChange('connectivity', conn.name)}
                          >
                            {conn.name}
                            {conn.price && conn.price > 0 && ` (+$${conn.price})`}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Total: ${(getVariantPrice() * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart - ${(getVariantPrice() * quantity).toFixed(2)}
                </Button>
              </div>

              {/* Shipping and Benefits */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-sm">
                        {product.shipping.freeShipping ? 'Free Shipping' : 'Standard Shipping'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Estimated delivery: {product.shipping.estimatedDays}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">1-Year Warranty</div>
                      <div className="text-xs text-muted-foreground">
                        Full coverage for defects and malfunctions
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-sm">30-Day Returns</div>
                      <div className="text-xs text-muted-foreground">
                        Free returns within 30 days of purchase
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">Technical Specifications</h3>
                    <div className="space-y-3">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b last:border-b-0">
                          <span className="font-medium">{key}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="compatibility" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">Compatible Systems</h3>
                    <ul className="space-y-2">
                      {product.compatibility.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">Customer Reviews</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-medium">{product.rating}</div>
                        <div>
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Based on {product.reviewCount} reviews
                          </div>
                        </div>
                      </div>
                      
                      {/* Mock reviews */}
                      <div className="space-y-4 pt-4 border-t">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm font-medium">Sarah M.</span>
                            <span className="text-xs text-muted-foreground">Verified Purchase</span>
                          </div>
                          <p className="text-sm">"Excellent build quality and very easy to set up. Works perfectly with our Square POS system."</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                              <Star className="h-3 w-3 text-gray-300" />
                            </div>
                            <span className="text-sm font-medium">Mike T.</span>
                            <span className="text-xs text-muted-foreground">Verified Purchase</span>
                          </div>
                          <p className="text-sm">"Great device, fast shipping. The customer support was helpful during setup."</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}