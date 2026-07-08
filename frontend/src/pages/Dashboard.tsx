import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Camera, User, LogOut, Trash2, Edit2, Save, X, Calendar, Clock, MapPin, DollarSign } from "lucide-react";

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface Booking {
  _id: string;
  photographerName: string;
  date: string;
  time: string;
  location: string;
  packageType: string;
  duration: number;
  totalCost: number;
  status: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditBookingDialogOpen, setIsEditBookingDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editBookingForm, setEditBookingForm] = useState({
    date: "",
    time: "",
    location: "",
    packageType: "",
    duration: "",
  });
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('userToken');
      console.log('User Token:', token); // Debug log
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        console.log('Fetched Data:', data); // Debug log
        setUserData(data);
        setEditForm({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: "",
        });
      } catch (error) {
        toast.error('Failed to load profile');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBookings = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/bookings/my-bookings', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to load bookings');
      }
    };

    fetchUserProfile();
    fetchBookings();
  }, [navigate]);

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      phone: "",
      password: "",
    };
    let isValid = true;

    if (!editForm.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!editForm.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(editForm.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!editForm.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(editForm.phone.replace(/\D/g, ''))) {
      errors.phone = "Invalid phone number format";
      isValid = false;
    }

    if (editForm.password && editForm.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    toast.success('Logged out successfully');
    navigate('/login');
    window.location.reload();
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem('userToken');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update profile');
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('userToken');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete account');
      }

      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      toast.success('Account deleted successfully');
      navigate('/signup');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete account');
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    const token = localStorage.getItem('userToken');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }

      setBookings(bookings.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      ));
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditBookingForm({
      date: new Date(booking.date).toISOString().split('T')[0],
      time: booking.time,
      location: booking.location,
      packageType: booking.packageType,
      duration: booking.duration.toString(),
    });
    setIsEditBookingDialogOpen(true);
  };

  const handleUpdateBooking = async () => {
    if (!selectedBooking) return;

    const token = localStorage.getItem('userToken');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${selectedBooking._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: new Date(editBookingForm.date).toISOString(),
          time: editBookingForm.time,
          location: editBookingForm.location,
          packageType: editBookingForm.packageType,
          duration: parseInt(editBookingForm.duration),
          totalCost: selectedBooking.totalCost // Keep the same cost for now
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update booking');
      }

      const updatedBooking = await response.json();
      setBookings(bookings.map(booking => 
        booking._id === selectedBooking._id 
          ? { ...booking, ...updatedBooking }
          : booking
      ));
      toast.success('Booking updated successfully');
      setIsEditBookingDialogOpen(false);
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Profile Section */}
          <Card className="glass-effect border-0 shadow-2xl backdrop-blur-md" style={{background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)'}}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="h-6 w-6 text-white" />
                <CardTitle className="text-2xl font-bold text-white">Profile Dashboard</CardTitle>
              </div>
              {!isEditing && (
                <Button
                  onClick={() => {
                    setIsEditing(true);
                    if (userData) {
                      setEditForm({
                        name: userData.name,
                        email: userData.email,
                        phone: userData.phone,
                        password: "", // Password should not be pre-filled for security
                      });
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleEditSubmit} className="space-y-6">
                  {/* console.log('Edit Form Data at Render:', editForm) */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400">Full Name</label>
                      <Input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className={`mt-1 bg-navy-800/50 border-navy-600 ${
                          formErrors.name ? 'border-red-500' : ''
                        }`}
                        style={{ color: 'black' }}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-400">Email</label>
                      <Input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className={`mt-1 bg-navy-800/50 border-navy-600 ${
                          formErrors.email ? 'border-red-500' : ''
                        }`}
                        style={{ color: 'black' }}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-400">Phone</label>
                      <Input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className={`mt-1 bg-navy-800/50 border-navy-600 ${
                          formErrors.phone ? 'border-red-500' : ''
                        }`}
                        style={{ color: 'black' }}
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-400">New Password (optional)</label>
                      <Input
                        type="password"
                        value={editForm.password}
                        onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                        className={`mt-1 bg-navy-800/50 border-navy-600 ${
                          formErrors.password ? 'border-red-500' : ''
                        }`}
                        style={{ color: 'black' }}
                      />
                      {formErrors.password && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      disabled={loading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormErrors({
                          name: "",
                          email: "",
                          phone: "",
                          password: "",
                        });
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white"
                      disabled={loading}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-lg bg-navy-700/30 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-gray-400">Full Name</label>
                          <p className="text-white text-lg">{userData?.name}</p>
                        </div>
                        <div>
                          <label className="text-gray-400">Email</label>
                          <p className="text-white text-lg">{userData?.email}</p>
                        </div>
                        <div>
                          <label className="text-gray-400">Phone</label>
                          <p className="text-white text-lg">{userData?.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 rounded-lg bg-navy-700/30 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold text-white mb-4">Account Actions</h3>
                      <div className="space-y-4">
                        <Button 
                          onClick={() => navigate('/Photographers')}
                          className="w-full bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white"
                        >
                          Make a Booking
                        </Button>
                        <Button 
                          onClick={handleLogout}
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                        <Button 
                          onClick={() => setIsDeleteDialogOpen(true)}
                          className="w-full bg-red-800 hover:bg-red-900 text-white"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking History Section */}
          <Card className="glass-effect border-0 shadow-2xl backdrop-blur-md" style={{background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)'}}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Booking History</CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No bookings found</p>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div 
                      key={booking._id}
                      className="bg-navy-700/30 rounded-lg p-4 border border-navy-600/30"
                      style={{backgroundColor: 'rgba(30, 58, 138, 0.3)', borderColor: 'rgba(30, 58, 138, 0.3)'}}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{booking.photographerName}</h3>
                          <div className="mt-2 space-y-1">
                            <p className="text-gray-300 flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(booking.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-300 flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {booking.time}
                            </p>
                            <p className="text-gray-300 flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {booking.location}
                            </p>
                            <p className="text-gray-300 flex items-center">
                              <DollarSign className="w-4 h-4 mr-2" />
                              ₹{booking.totalCost}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : booking.status === 'cancelled'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                          {booking.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-400 border-blue-400/30 hover:bg-blue-400/20"
                                onClick={() => handleEditBooking(booking)}
                              >
                                <Edit2 className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-400 border-red-400/30 hover:bg-red-400/20"
                                onClick={() => handleCancelBooking(booking._id)}
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Booking Dialog */}
      <Dialog open={isEditBookingDialogOpen} onOpenChange={setIsEditBookingDialogOpen}>
        <DialogContent className="bg-white border-navy-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Edit Booking</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <Input
                  type="date"
                  value={editBookingForm.date}
                  onChange={(e) => setEditBookingForm(prev => ({ ...prev, date: e.target.value }))}
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <Input
                  type="time"
                  value={editBookingForm.time}
                  onChange={(e) => setEditBookingForm(prev => ({ ...prev, time: e.target.value }))}
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <Input
                type="text"
                value={editBookingForm.location}
                onChange={(e) => setEditBookingForm(prev => ({ ...prev, location: e.target.value }))}
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package Type</label>
              <Input
                type="text"
                value={editBookingForm.packageType}
                onChange={(e) => setEditBookingForm(prev => ({ ...prev, packageType: e.target.value }))}
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
              <Input
                type="number"
                value={editBookingForm.duration}
                onChange={(e) => setEditBookingForm(prev => ({ ...prev, duration: e.target.value }))}
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditBookingDialogOpen(false)}
              className="text-gray-700 border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateBooking}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-navy-900 text-white border-navy-700">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">
            Are you sure you want to delete your account? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard; 