import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import { toast } from "sonner";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    phoneNumber: "",
    userPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    const newErrors = { ...errors };
    
    switch (field) {
      case "userEmail":
        if (value && !validateEmail(value)) {
          newErrors.userEmail = "Please enter a valid email address";
        } else {
          delete newErrors.userEmail;
        }
        break;
      case "userPassword":
        if (value && !validatePassword(value)) {
          newErrors.userPassword = "Password must be at least 6 characters";
        } else {
          delete newErrors.userPassword;
        }
        break;
      case "confirmPassword":
        if (value && value !== formData.userPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          newErrors[field] = "This field is required";
        } else {
          delete newErrors[field];
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.userEmail.trim()) newErrors.userEmail = "Email is required";
    else if (!validateEmail(formData.userEmail)) newErrors.userEmail = "Please enter a valid email";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.userPassword) newErrors.userPassword = "Password is required";
    else if (!validatePassword(formData.userPassword)) newErrors.userPassword = "Password must be at least 6 characters";
    if (formData.userPassword !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.userEmail,
            password: formData.userPassword,
            phone: formData.phoneNumber
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        // Store the token and user data
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data));
        
        toast.success("Signup successful! Please log in.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto px-4 max-w-md">
        <Card className="border-0 shadow-2xl glass-effect backdrop-blur-md" style={{background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)'}}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold gradient-text">Create Account</CardTitle>
            <p className="text-gray-300 mt-2">Join BookMySnap today</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="pl-10 border-0 bg-navy-700/50 text-white border-b-2 border-navy-500/50 focus:border-navy-400 rounded-lg backdrop-blur-sm"
                      style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.5)'}}
                      autoComplete="new-password"
                    />
                  </div>
                  {errors.firstName && <p className="text-xs mt-1 text-red-400">{errors.firstName}</p>}
                </div>
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="pl-10 border-0 bg-navy-700/50 text-white border-b-2 border-navy-500/50 focus:border-navy-400 rounded-lg backdrop-blur-sm"
                      style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.5)'}}
                      autoComplete="new-password"
                    />
                  </div>
                  {errors.lastName && <p className="text-xs mt-1 text-red-400">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    name="userEmail"
                    placeholder="Email Address"
                    value={formData.userEmail}
                    onChange={(e) => handleInputChange("userEmail", e.target.value)}
                    className="pl-10 border-0 bg-navy-700/50 text-white border-b-2 border-navy-500/50 focus:border-navy-400 rounded-lg backdrop-blur-sm"
                    style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.5)'}}
                    autoComplete="new-email"
                  />
                </div>
                {errors.userEmail && <p className="text-xs mt-1 text-red-400">{errors.userEmail}</p>}
              </div>
              
              <div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="pl-10 border-0 bg-navy-700/50 text-white border-b-2 border-navy-500/50 focus:border-navy-400 rounded-lg backdrop-blur-sm"
                    style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.5)'}}
                    autoComplete="new-password"
                  />
                </div>
                {errors.phoneNumber && <p className="text-xs mt-1 text-red-400">{errors.phoneNumber}</p>}
              </div>
              
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="userPassword"
                    placeholder="Password"
                    value={formData.userPassword}
                    onChange={(e) => handleInputChange("userPassword", e.target.value)}
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
                {errors.userPassword && <p className="text-xs mt-1 text-red-400">{errors.userPassword}</p>}
              </div>
              
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 pr-10 border-0 bg-navy-700/50 text-white border-b-2 border-navy-500/50 focus:border-navy-400 rounded-lg backdrop-blur-sm"
                    style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.5)'}}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 h-4 w-4 hover:opacity-70 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs mt-1 text-red-400">{errors.confirmPassword}</p>}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                style={{background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(30, 64, 175))'}}
              >
                Sign Up
              </Button>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="text-navy-400 hover:text-navy-300 hover:underline font-medium" style={{color: 'rgb(147, 197, 253)'}}>
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
