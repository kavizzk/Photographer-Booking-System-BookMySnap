
import { Link } from "react-router-dom";
import { Camera, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-slate-600" />
              <span className="text-xl font-bold gradient-text">BookMySnap</span>
            </Link>
            <p className="text-slate-400 text-sm">
              Connect with professional photographers for all your special moments. 
              Quality, reliability, and creativity in every shot.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-slate-400 hover:text-slate-300 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-slate-300 transition-colors">About</Link></li>
              <li><Link to="/gallery" className="text-slate-400 hover:text-slate-300 transition-colors">Gallery</Link></li>
              <li><Link to="/photographers" className="text-slate-400 hover:text-slate-300 transition-colors">Photographers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Wedding Photography</li>
              <li>Portrait Photography</li>
              <li>Event Photography</li>
              <li>Product Photography</li>
              <li>Real Estate Photography</li>
              <li>Fashion Photography</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Connect With Us</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <p>kavitha.s09bvn@gmail.com</p>
              <p>74183 17751</p>
              <p>BHAVANI, ERODE, INDIA</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <Facebook className="h-5 w-5 text-slate-400 hover:text-slate-300 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-slate-400 hover:text-slate-300 cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-slate-400 hover:text-slate-300 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; 2025 BookMySnap. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
            <Link to="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
