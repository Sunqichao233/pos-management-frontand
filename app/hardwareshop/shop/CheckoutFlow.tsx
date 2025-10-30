import { useState } from "react"
import { ArrowLeft, CreditCard, Truck, MapPin, Check, Lock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CartItem } from "../Shop"

interface CheckoutFlowProps {
  cartItems: CartItem[]
  onBack: () => void
  onOrderComplete: () => void
}

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'complete'

interface ShippingAddress {
  firstName: string
  lastName: string
  company?: string
  address: string
  address2?: string
  city: string
  state: string
  zipCode: string
  phone: string
}

interface PaymentMethod {
  type: 'card' | 'paypal'
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  nameOnCard?: string
}

const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
]

const shippingOptions = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 0,
    estimatedDays: '5-7 business days',
    description: 'Free shipping on orders over $50'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 15.99,
    estimatedDays: '2-3 business days',
    description: 'Faster delivery for urgent orders'
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    price: 29.99,
    estimatedDays: '1 business day',
    description: 'Next day delivery by 6 PM'
  }
]

export function CheckoutFlow({ cartItems, onBack, onOrderComplete }: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping')
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'card'
  })
  const [selectedShipping, setSelectedShipping] = useState('standard')
  const [billingAddressSame, setBillingAddressSame] = useState(true)
  const [orderProcessing, setOrderProcessing] = useState(false)

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
    const selectedOption = shippingOptions.find(option => option.id === selectedShipping)
    
    if (selectedShipping === 'standard' && subtotal >= 50) {
      return 0
    }
    
    return selectedOption?.price || 0
  }

  const getTax = () => {
    return getSubtotal() * 0.08 // 8% tax
  }

  const getTotal = () => {
    return getSubtotal() + getShippingCost() + getTax()
  }

  const handleSubmitShipping = () => {
    // Validate shipping form
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'phone']
    const isValid = requiredFields.every(field => shippingAddress[field as keyof ShippingAddress])
    
    if (isValid) {
      setCurrentStep('payment')
    }
  }

  const handleSubmitPayment = () => {
    // Validate payment form
    if (paymentMethod.type === 'card') {
      const isValid = paymentMethod.cardNumber && paymentMethod.expiryDate && 
                     paymentMethod.cvv && paymentMethod.nameOnCard
      if (isValid) {
        setCurrentStep('review')
      }
    } else {
      setCurrentStep('review')
    }
  }

  const handlePlaceOrder = async () => {
    setOrderProcessing(true)
    
    // Simulate order processing
    setTimeout(() => {
      setOrderProcessing(false)
      setCurrentStep('complete')
    }, 3000)
  }

  const handleOrderCompleteConfirm = () => {
    onOrderComplete()
  }

  const updateShippingAddress = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }))
  }

  const updatePaymentMethod = (field: keyof PaymentMethod, value: string) => {
    setPaymentMethod(prev => ({ ...prev, [field]: value }))
  }

  if (currentStep === 'complete') {
    return (
      <div className="flex-1 overflow-hidden bg-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-medium mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-4">
                Thank you for your purchase. Your order has been confirmed and will be processed shortly.
              </p>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <div className="text-sm font-medium mb-1">Order Number</div>
                <div className="font-mono text-lg">#POS-{Date.now().toString().slice(-6)}</div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• You will receive an email confirmation shortly</p>
                <p>• Your items will ship within 1-2 business days</p>
                <p>• Tracking information will be provided via email</p>
              </div>
            </div>
            <Button onClick={handleOrderCompleteConfirm} className="w-full">
              Continue Shopping
            </Button>
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
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Button>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${currentStep === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                  currentStep === 'shipping' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
                }`}>
                  1
                </div>
                <span className="text-sm">Shipping</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <div className={`flex items-center gap-2 ${currentStep === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                  currentStep === 'payment' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
                }`}>
                  2
                </div>
                <span className="text-sm">Payment</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <div className={`flex items-center gap-2 ${currentStep === 'review' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                  currentStep === 'review' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
                }`}>
                  3
                </div>
                <span className="text-sm">Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 'shipping' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={shippingAddress.firstName}
                          onChange={(e) => updateShippingAddress('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={shippingAddress.lastName}
                          onChange={(e) => updateShippingAddress('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        value={shippingAddress.company}
                        onChange={(e) => updateShippingAddress('company', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={shippingAddress.address}
                        onChange={(e) => updateShippingAddress('address', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address2">Apartment, suite, etc. (Optional)</Label>
                      <Input
                        id="address2"
                        value={shippingAddress.address2}
                        onChange={(e) => updateShippingAddress('address2', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={shippingAddress.city}
                          onChange={(e) => updateShippingAddress('city', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select value={shippingAddress.state} onValueChange={(value) => updateShippingAddress('state', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={shippingAddress.zipCode}
                          onChange={(e) => updateShippingAddress('zipCode', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => updateShippingAddress('phone', e.target.value)}
                        required
                      />
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-base font-medium">Shipping Method</Label>
                      <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping} className="mt-3">
                        {shippingOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <label htmlFor={option.id} className="flex-1 cursor-pointer">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">{option.name}</div>
                                  <div className="text-sm text-muted-foreground">{option.description}</div>
                                  <div className="text-sm text-muted-foreground">{option.estimatedDays}</div>
                                </div>
                                <div className="text-right">
                                  {option.price === 0 && selectedShipping === 'standard' && getSubtotal() >= 50 ? (
                                    <Badge className="bg-green-500">Free</Badge>
                                  ) : option.price === 0 ? (
                                    <span className="text-sm">${option.price.toFixed(2)}</span>
                                  ) : (
                                    <span className="text-sm">${option.price.toFixed(2)}</span>
                                  )}
                                </div>
                              </div>
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <Button onClick={handleSubmitShipping} className="w-full">
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {currentStep === 'payment' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod.type} onValueChange={(value) => setPaymentMethod(prev => ({ ...prev, type: value as 'card' | 'paypal' }))}>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="font-medium">Credit or Debit Card</div>
                          <div className="text-sm text-muted-foreground">Visa, Mastercard, American Express</div>
                        </label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <label htmlFor="paypal" className="flex-1 cursor-pointer">
                          <div className="font-medium">PayPal</div>
                          <div className="text-sm text-muted-foreground">Pay with your PayPal account</div>
                        </label>
                      </div>
                    </RadioGroup>

                    {paymentMethod.type === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="nameOnCard">Name on Card *</Label>
                          <Input
                            id="nameOnCard"
                            value={paymentMethod.nameOnCard || ''}
                            onChange={(e) => updatePaymentMethod('nameOnCard', e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentMethod.cardNumber || ''}
                            onChange={(e) => updatePaymentMethod('cardNumber', e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={paymentMethod.expiryDate || ''}
                              onChange={(e) => updatePaymentMethod('expiryDate', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={paymentMethod.cvv || ''}
                              onChange={(e) => updatePaymentMethod('cvv', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-4">
                      <Label className="text-base font-medium">Billing Address</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="billingAddressSame"
                          checked={billingAddressSame}

                        />
                        <label htmlFor="billingAddressSame" className="text-sm">
                          Same as shipping address
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Lock className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Your payment information is encrypted and secure</span>
                    </div>

                    <Button onClick={handleSubmitPayment} className="w-full">
                      Review Order
                    </Button>
                  </CardContent>
                </Card>
              )}

              {currentStep === 'review' && (
                <div className="space-y-6">
                  {/* Order Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Items</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex gap-4 py-3 border-b last:border-b-0">
                          
                          <div className="flex-1">
                            <h4 className="font-medium">{item.product.name}</h4>
                            <div className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </div>
                            {item.selectedVariants && (
                              <div className="flex gap-1 mt-1">
                                {Object.entries(item.selectedVariants).map(([key, value]) => (
                                  value && (
                                    <Badge key={key} variant="secondary" className="text-xs">
                                      {key}: {value}
                                    </Badge>
                                  )
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              ${(getItemPrice(item) * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Shipping Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-1">
                        <div>{shippingAddress.firstName} {shippingAddress.lastName}</div>
                        {shippingAddress.company && <div>{shippingAddress.company}</div>}
                        <div>{shippingAddress.address}</div>
                        {shippingAddress.address2 && <div>{shippingAddress.address2}</div>}
                        <div>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</div>
                        <div>{shippingAddress.phone}</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Method */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {paymentMethod.type === 'card' ? (
                        <div className="text-sm">
                          <div>Credit Card ending in {paymentMethod.cardNumber?.slice(-4)}</div>
                          <div className="text-muted-foreground">{paymentMethod.nameOnCard}</div>
                        </div>
                      ) : (
                        <div className="text-sm">PayPal</div>
                      )}
                    </CardContent>
                  </Card>

                  <Button 
                    onClick={handlePlaceOrder} 
                    className="w-full" 
                    size="lg"
                    disabled={orderProcessing}
                  >
                    {orderProcessing ? 'Processing Order...' : `Place Order - $${getTotal().toFixed(2)}`}
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="truncate pr-2">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span>${(getItemPrice(item) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}