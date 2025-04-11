
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Mock product data
  const product = {
    id: parseInt(id || "1"),
    name: "Premium Wireless Headphones",
    price: 199.99,
    description: "Experience superior sound quality with our premium wireless headphones. Features advanced noise cancellation, long battery life, and comfortable over-ear design for extended listening sessions.",
    longDescription: "These premium wireless headphones deliver exceptional audio clarity and deep, rich bass that brings your music to life. The advanced active noise cancellation technology blocks out ambient noise, allowing you to focus on your audio without distractions. With up to 30 hours of battery life on a single charge, these headphones will keep your music playing throughout the day. The memory foam ear cushions and adjustable headband provide maximum comfort for extended wearing periods. Connect easily to your devices via Bluetooth 5.0 for stable, high-quality wireless audio transmission.",
    specifications: [
      { name: "Brand", value: "AudioTech" },
      { name: "Model", value: "AT-500" },
      { name: "Type", value: "Over-ear" },
      { name: "Battery Life", value: "30 hours" },
      { name: "Connectivity", value: "Bluetooth 5.0" },
      { name: "Noise Cancellation", value: "Active" },
      { name: "Weight", value: "270g" },
      { name: "Color Options", value: "Black, Silver, Blue" }
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1465&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1468&auto=format&fit=crop"
    ],
    category: "Electronics",
    brand: "AudioTech",
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    features: [
      "Active Noise Cancellation",
      "30 Hour Battery Life",
      "Memory Foam Ear Cushions",
      "Voice Assistant Compatible",
      "Foldable Design"
    ]
  };
  
  // Mock related products
  const relatedProducts = [
    {
      id: 2,
      name: "Wireless Earbuds",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1378&auto=format&fit=crop",
      category: "Electronics",
      rating: 4.3
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      price: 129.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1374&auto=format&fit=crop",
      category: "Electronics",
      rating: 4.4,
      isOnSale: true
    },
    {
      id: 4,
      name: "Audio Amplifier",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?q=80&w=1376&auto=format&fit=crop",
      category: "Electronics",
      rating: 4.7
    },
    {
      id: 5,
      name: "Studio Microphone",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1374&auto=format&fit=crop",
      category: "Electronics",
      rating: 4.6
    }
  ];
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Product images */}
        <div className="md:w-1/2 space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product info */}
        <div className="md:w-1/2">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {product.isNew && <span className="category-badge">New Arrival</span>}
            <span className="category-badge bg-secondary text-secondary-foreground">
              {product.category}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : i < product.rating
                      ? "fill-yellow-400/50 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          </div>
          
          {/* Description */}
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          {/* Features */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          {/* Stock status */}
          <div className="mb-6">
            <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          {/* Quantity selector */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button className="flex-1 sm:flex-none" size="lg">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Additional info */}
          <div className="text-sm text-muted-foreground">
            <p>SKU: {product.brand}-{product.id}</p>
            <p>Brand: {product.brand}</p>
          </div>
        </div>
      </div>
      
      {/* Tabs for additional info */}
      <div className="mb-16">
        <Tabs defaultValue="description">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-muted-foreground">
            <p className="mb-4">{product.longDescription}</p>
            <p>
              These headphones are ideal for music enthusiasts, frequent travelers, and anyone who appreciates premium audio quality. Their versatile design makes them suitable for use at home, in the office, or while commuting.
            </p>
          </TabsContent>
          <TabsContent value="specifications">
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-secondary/50' : ''}>
                      <td className="py-2 px-4 font-medium">{spec.name}</td>
                      <td className="py-2 px-4">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl font-bold">{product.rating}</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : i < product.rating
                            ? "fill-yellow-400/50 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">Based on {product.reviewCount} reviews</div>
                </div>
                
                <div className="flex-grow max-w-xs">
                  {/* Rating breakdown */}
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center text-sm mb-1">
                      <span className="w-8">{rating} ★</span>
                      <div className="h-2 flex-grow bg-gray-200 rounded-full overflow-hidden mx-2">
                        <div
                          className="h-full bg-yellow-400"
                          style={{
                            width: `${
                              rating === 5 ? 70 :
                              rating === 4 ? 20 :
                              rating === 3 ? 5 :
                              rating === 2 ? 3 :
                              2
                            }%`
                          }}
                        />
                      </div>
                      <span className="w-8 text-right text-muted-foreground">
                        {
                          rating === 5 ? "70%" :
                          rating === 4 ? "20%" :
                          rating === 3 ? "5%" :
                          rating === 2 ? "3%" :
                          "2%"
                        }
                      </span>
                    </div>
                  ))}
                </div>
                
                <div>
                  <Button>Write a Review</Button>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
                
                {/* Sample reviews */}
                {[
                  {
                    author: "Alex Johnson",
                    date: "March 15, 2025",
                    rating: 5,
                    content: "These are the best headphones I've ever owned! The sound quality is incredible, and the noise cancellation works perfectly on my commute. Battery life is as advertised - easily lasts for days of regular use."
                  },
                  {
                    author: "Sarah Miller",
                    date: "February 28, 2025",
                    rating: 4,
                    content: "Great headphones overall. The sound is crystal clear and balanced. Took off one star because they're a bit tight on my head after several hours of use, but that might improve as they break in."
                  }
                ].map((review, index) => (
                  <div key={index} className="mb-6 pb-6 border-b last:border-0">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.author}</div>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">You may also like</h2>
        <div className="product-grid">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
