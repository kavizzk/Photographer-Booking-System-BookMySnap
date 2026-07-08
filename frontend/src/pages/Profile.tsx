import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Camera, Mail, Phone, MapPin, User, Lock, LogOut } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUser');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-effect border-0 shadow-2xl backdrop-blur-md" style={{background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)'}}>
            <CardHeader className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-navy-500/30" style={{borderColor: 'rgba(30, 58, 138, 0.3)'}}>
                  {userData.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-navy-700/50 flex items-center justify-center" style={{backgroundColor: 'rgba(30, 58, 138, 0.5)'}}>
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 bg-navy-600 hover:bg-navy-700 rounded-full p-2"
                  style={{backgroundColor: 'rgb(30, 58, 138)'}}
                >
                  <Camera className="w-5 h-5 text-white" />
                </Button>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-300 to-slate-400 bg-clip-text text-transparent">
                {userData.firstName} {userData.lastName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">First Name</label>
                    <Input
                      type="text"
                      value={userData.firstName}
                      onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="bg-navy-700/50 border-navy-600 text-white focus:border-navy-400"
                      style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Last Name</label>
                    <Input
                      type="text"
                      value={userData.lastName}
                      onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="bg-navy-700/50 border-navy-600 text-white focus:border-navy-400"
                      style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-navy-700/50 border-navy-600 text-white focus:border-navy-400 pl-10"
                        style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-navy-700/50 border-navy-600 text-white focus:border-navy-400 pl-10"
                        style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        value={userData.address}
                        onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
                        className="bg-navy-700/50 border-navy-600 text-white focus:border-navy-400 pl-10"
                        style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-navy-600" style={{borderColor: 'rgba(30, 58, 138, 0.6)'}}>
                  <Button
                    type="button"
                    onClick={() => navigate('/change-password')}
                    className="bg-navy-700/50 hover:bg-navy-600/50 text-white border border-navy-600"
                    style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white"
                      style={{background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(30, 64, 175))'}}
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleLogout}
                      className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
