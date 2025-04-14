
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutFailure from "./pages/CheckoutFailure";
import CheckoutPending from "./pages/CheckoutPending";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminCategories from "./pages/admin/Categories";
import AdminOrders from "./pages/admin/Orders";
import AdminReports from "./pages/admin/Reports";
import AdminPromotions from "./pages/admin/Promotions";
import AdminShipping from "./pages/admin/Shipping";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="promotions" element={<AdminPromotions />} />
              <Route path="shipping" element={<AdminShipping />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Index />
                </main>
                <Footer />
              </>
            } />
            <Route path="/products" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Products />
                </main>
                <Footer />
              </>
            } />
            <Route path="/product/:id" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <ProductDetail />
                </main>
                <Footer />
              </>
            } />
            <Route path="/cart" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Cart />
                </main>
                <Footer />
              </>
            } />
            <Route path="/checkout" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Checkout />
                </main>
                <Footer />
              </>
            } />
            <Route path="/checkout/success" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <CheckoutSuccess />
                </main>
                <Footer />
              </>
            } />
            <Route path="/checkout/failure" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <CheckoutFailure />
                </main>
                <Footer />
              </>
            } />
            <Route path="/checkout/pending" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <CheckoutPending />
                </main>
                <Footer />
              </>
            } />
            <Route path="/auth" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Auth />
                </main>
                <Footer />
              </>
            } />
            <Route path="/profile" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </main>
                <Footer />
              </>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <NotFound />
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
