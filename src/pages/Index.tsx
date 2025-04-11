
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  // Mock data for categories
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1001&auto=format&fit=crop",
      productCount: 128
    },
    {
      id: 2,
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1470&auto=format&fit=crop",
      productCount: 243
    },
    {
      id: 3,
      name: "Home & Kitchen",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=987&auto=format&fit=crop",
      productCount: 195
    },
    {
      id: 4,
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1480&auto=format&fit=crop",
      productCount: 87
    },
    {
      id: 5,
      name: "Sports",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1470&auto=format&fit=crop",
      productCount: 112
    },
    {
      id: 6,
      name: "Books",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1470&auto=format&fit=crop",
      productCount: 76
    }
  ];
  
  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop",
      category: "Electronics",
      rating: 4.5,
      isNew: true
    },
    {
      id: 2,
      name: "Ultra HD Smart TV 55\"",
      price: 699.99,
      originalPrice: 899.99,
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1prolifteroduct5.x=0&y=0&ixlib=rb-4.0.3&crop=entropy&cs=tinysrgb",
      category: "Electronics",
      rating: 4.8,
      isOnSale: true
    },
    {
      id: 3,
      name: "Professional DSLR Camera",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1470&auto=format&fit=crop",
      category: "Electronics",
      rating: 4.7
    },
    {
      id: 4,
      name: "Smartwatch Series 5",
      price: 349.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1472&auto=format&fit=crop",
      category: "Electronics",
      rating: 4.6,
      isOnSale: true
    }
  ];
  
  // Mock data for new arrivals
  const newArrivals = [
    {
      id: 5,
      name: "Casual Denim Jacket",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036&auto=format&fit=crop",
      category: "Clothing",
      rating: 4.3,
      isNew: true
    },
    {
      id: 6,
      name: "Natural Bamboo Side Table",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1374&auto=format&fit=crop",
      category: "Home & Kitchen",
      rating: 4.2,
      isNew: true
    },
    {
      id: 7,
      name: "Organic Face Serum",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=987&auto=format&fit=crop",
      category: "Beauty",
      rating: 4.5,
      isNew: true
    },
    {
      id: 8,
      name: "Fitness Smart Band",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=1035&auto=format&fit=crop",
      category: "Sports",
      rating: 4.1,
      isNew: true
    }
  ];
  
  // Benefits section data
  const benefits = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "On all orders over $50"
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      description: "30 day return policy"
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "Safe & encrypted checkout"
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "We're here to help"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      {/* Benefits */}
      <section className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-3xl mb-2">{benefit.icon}</div>
                <h3 className="font-medium text-sm md:text-base">{benefit.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <FeaturedCategories categories={categories} />
      
      <FeaturedProducts
        title="Featured Products"
        products={featuredProducts}
        viewAllLink="/products"
      />
      
      <FeaturedProducts
        title="New Arrivals"
        products={newArrivals}
        viewAllLink="/new"
      />
      
      {/* Newsletter */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-white/80 max-w-lg mx-auto mb-8">
            Subscribe to get special offers, free giveaways, and product announcements.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-md"
            />
            <Button className="bg-white text-primary hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
