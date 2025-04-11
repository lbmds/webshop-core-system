
import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  // Mock cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop",
      quantity: 1
    },
    {
      id: 3,
      name: "Professional DSLR Camera",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1470&auto=format&fit=crop",
      quantity: 1
    }
  ]);
  
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items =>
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };
  
  const applyCoupon = () => {
    setIsApplyingCoupon(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplyingCoupon(false);
      if (couponCode.toLowerCase() === "discount20") {
        toast.success("Coupon applied successfully!");
      } else {
        toast.error("Invalid coupon code");
      }
      setCouponCode("");
    }, 1000);
  };
  
  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="lg:w-2/3">
            <div className="border rounded-md overflow-hidden">
              <div className="bg-secondary p-4 font-medium grid grid-cols-12 gap-4 hidden md:grid">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              {cartItems.map(item => (
                <div key={item.id} className="p-4 border-t first:border-t-0">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-12 md:col-span-6">
                      <div className="flex items-center">
                        <div className="w-16 h-16 flex-shrink-0 mr-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <Link 
                            to={`/product/${item.id}`}
                            className="font-medium hover:text-primary hover:underline"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4 md:col-span-2 md:text-center">
                      <div className="md:hidden text-sm text-muted-foreground mb-1">Price:</div>
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="col-span-4 md:col-span-2 md:text-center">
                      <div className="md:hidden text-sm text-muted-foreground mb-1">Quantity:</div>
                      <div className="flex items-center border rounded-md inline-flex">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-3 md:col-span-2 md:text-right">
                      <div className="md:hidden text-sm text-muted-foreground mb-1">Total:</div>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="col-span-1 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Continue shopping */}
              <div className="p-4 border-t bg-secondary">
                <Link
                  to="/products"
                  className="text-primary hover:underline inline-flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:w-1/3">
            <div className="border rounded-md p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              {/* Coupon code */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    onClick={applyCoupon} 
                    disabled={!couponCode || isApplyingCoupon}
                  >
                    Apply
                  </Button>
                </div>
                <div className="text-xs mt-2 text-muted-foreground">
                  Try "DISCOUNT20" for a demo discount
                </div>
              </div>
              
              <Button className="w-full" size="lg" asChild>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              
              <div className="mt-6 text-center text-xs text-muted-foreground">
                <p className="mb-2">We accept the following payment methods:</p>
                <div className="flex justify-center space-x-2">
                  <span className="px-2 py-1 bg-secondary rounded-md">Visa</span>
                  <span className="px-2 py-1 bg-secondary rounded-md">Mastercard</span>
                  <span className="px-2 py-1 bg-secondary rounded-md">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
