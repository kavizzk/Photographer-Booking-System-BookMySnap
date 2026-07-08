import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, User, LogOut, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const userToken = localStorage.getItem('userToken');
      const userData = localStorage.getItem('userData');

      setIsLoggedIn(!!userToken); // isLoggedIn is true if userToken exists
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      } else {
        setCurrentUser(null);
      }
    };

    // Initial check
    checkLoginStatus();

    // Listen for changes in localStorage
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const getUserDisplayName = () => {
    if (currentUser && currentUser.name) { // Assuming 'name' field in userData
      return currentUser.name;
    }
    return "Profile"; // Default display name
  };

  return (
    <header className="bg-navy-900/95 backdrop-blur-md border-b border-navy-700 sticky top-0 z-50 shadow-xl" style={{backgroundColor: 'rgba(15, 23, 42, 0.95)', borderColor: 'rgba(30, 58, 138, 0.7)'}}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-r from-navy-600 to-navy-800 p-2 rounded-lg" style={{background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(30, 64, 175))'}}>
              <Camera className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">BookMySnap</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors font-medium">
              About
            </Link>
            <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors font-medium">
              Gallery
            </Link>
            <Link to="/photographers" className="text-gray-300 hover:text-white transition-colors font-medium">
              Photographers
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons / Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <Button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="bg-gray-700/50 hover:bg-gray-600/50 text-white border border-gray-600 px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300"
                >
                  <User className="w-4 h-4 mr-2" />
                  {getUserDisplayName()}
                </Button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-navy-800/95 backdrop-blur-md border border-navy-700 rounded-lg shadow-xl z-50" style={{backgroundColor: 'rgba(30, 58, 138, 0.95)', borderColor: 'rgba(30, 58, 138, 0.7)'}}>
                    <Link
                      to="/dashboard" // Changed from /profile to /dashboard
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-navy-700/50 transition-colors border-b border-navy-700"
                      onClick={() => setShowUserMenu(false)}
                      style={{borderColor: 'rgba(30, 58, 138, 0.7)'}}
                    >
                      <User className="w-4 h-4 inline mr-2" />
                      View Profile
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button className="bg-gray-700/50 hover:bg-gray-600/50 text-white border border-gray-600 backdrop-blur-sm transition-all duration-300">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="btn-primary text-white transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-navy-700 bg-navy-900/95 backdrop-blur-md" style={{borderColor: 'rgba(30, 58, 138, 0.7)', backgroundColor: 'rgba(15, 23, 42, 0.95)'}}>
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/gallery"
                className="text-gray-300 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/photographers"
                className="text-gray-300 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Photographers
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {isLoggedIn ? (
                <div className="pt-4 border-t border-navy-700 space-y-2" style={{borderColor: 'rgba(30, 58, 138, 0.7)'}}>
                  <div className="text-gray-400 font-medium">Welcome, {getUserDisplayName()}</div>
                  <Link
                    to="/dashboard" // Changed from /profile to /dashboard
                    className="block text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View Profile
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t border-navy-700 space-y-2" style={{borderColor: 'rgba(30, 58, 138, 0.7)'}}>
                  <Link
                    to="/login"
                    className="block text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
