import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    const newErrors = { ...errors };
    
    if (field === "email" && value && !validateEmail(value)) {
      newErrors.email = "Please enter a valid email address";
    } else {
      delete newErrors[field];
    }
    
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        // Store the token and user data
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data));
        
        toast.success("Login successful!");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Login failed');
      }
    }
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto px-4 max-w-md">
        <Card className="border-0 shadow-2xl glass-effect backdrop-blur-md" style={{background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)'}}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold gradient-text">Welcome Back</CardTitle>
            <p className="text-gray-300 mt-2">Sign in to your BookMySnap account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 border-0 bg-navy-700/50 text-white border-b-2 border-navy-500/50 focus:border-navy-400 rounded-lg backdrop-blur-sm"
                    style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.5)'}}
                    autoComplete="new-email"
                  />
                </div>
                {errors.email && <p className="text-xs mt-1 text-red-400">{errors.email}</p>}
              </div>
              
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 border-0 bg-navy-700/50 text-white border-b-2 border-navy-500/50 focus:border-navy-400 rounded-lg backdrop-blur-sm"
                    style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.5)'}}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 hover:opacity-70 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs mt-1 text-red-400">{errors.password}</p>}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                style={{background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(30, 64, 175))'}}
              >
                Sign In
              </Button>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-300">
                Don't have an account?{" "}
                <Link to="/signup" className="text-navy-400 hover:text-navy-300 hover:underline font-medium" style={{color: 'rgb(147, 197, 253)'}}>
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
