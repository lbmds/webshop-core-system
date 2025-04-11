
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ShopSmart</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for quality products at the best prices. We're committed to providing an exceptional shopping experience.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm hover:text-primary">All Products</Link></li>
              <li><Link to="/categories" className="text-sm hover:text-primary">Categories</Link></li>
              <li><Link to="/deals" className="text-sm hover:text-primary">Deals & Discounts</Link></li>
              <li><Link to="/new" className="text-sm hover:text-primary">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm hover:text-primary">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-sm hover:text-primary">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-sm hover:text-primary">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Twitter size={20} />
              </a>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 border rounded-l-md w-full text-sm"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-r-md text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShopSmart. All rights reserved.</p>
          <div className="flex justify-center mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
