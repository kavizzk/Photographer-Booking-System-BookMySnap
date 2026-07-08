
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Edit2, Trash2, Shield } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinDate: string;
}

interface BookingData {
  id: string;
  userId: string;
  userName: string;
  photographerName: string;
  date: string;
  shootType: string;
  duration: string;
  location: string;
  status: string;
  amount: number;
}

const Admin = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [bookings, setBookings] = useState<BookingData[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      
      // Check if user is admin
      if (user.role !== 'admin') {
        window.location.href = "/login";
        return;
      }
    } else {
      window.location.href = "/login";
      return;
    }

    // Mock data for admin dashboard
    setUsers([
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "9876543210",
        role: "user",
        joinDate: "2024-01-15"
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9876543211",
        role: "user",
        joinDate: "2024-02-20"
      },
      {
        id: "3",
        name: "Admin User",
        email: "admin@bookmysnap.com",
        phone: "9876543212",
        role: "admin",
        joinDate: "2023-12-01"
      }
    ]);

    setBookings([
      {
        id: "1",
        userId: "1",
        userName: "John Doe",
        photographerName: "Arjun Mehta",
        date: "2024-06-15",
        shootType: "Wedding",
        duration: "8 hours",
        location: "Mumbai",
        status: "Confirmed",
        amount: 25000
      },
      {
        id: "2",
        userId: "2",
        userName: "Jane Smith",
        photographerName: "Priya Sharma",
        date: "2024-07-20",
        shootType: "Fashion",
        duration: "4 hours",
        location: "Delhi",
        status: "Pending",
        amount: 15000
      }
    ]);
  }, []);

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    }
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return <div>Access denied. Redirecting...</div>;
  }

  return (
    <div className="min-h-screen py-16" style={{ backgroundColor: '#121212' }}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8" style={{ color: '#ff5722' }} />
            <h1 className="text-3xl font-bold" style={{ color: '#ffffff' }}>
              Admin Dashboard
            </h1>
          </div>
          <p style={{ color: '#cfd8dc' }}>
            Manage users and bookings across the platform
          </p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList 
            className="grid w-full grid-cols-2 border-0"
            style={{ backgroundColor: '#1f1f1f' }}
          >
            <TabsTrigger 
              value="users"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Users Management
            </TabsTrigger>
            <TabsTrigger 
              value="bookings"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Bookings Management
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="border-0" style={{ backgroundColor: '#1f1f1f' }}>
              <CardHeader>
                <CardTitle style={{ color: '#ffffff' }}>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <Card key={user.id} className="border border-opacity-20" style={{ backgroundColor: '#121212', borderColor: '#3f51b5' }}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                            <div>
                              <p className="font-medium" style={{ color: '#ffffff' }}>{user.name}</p>
                              <p className="text-sm" style={{ color: '#cfd8dc' }}>{user.email}</p>
                            </div>
                            <div>
                              <p className="text-sm" style={{ color: '#cfd8dc' }}>Phone: {user.phone}</p>
                              <p className="text-sm" style={{ color: '#cfd8dc' }}>Joined: {user.joinDate}</p>
                            </div>
                            <div>
                              <Badge 
                                variant={user.role === "admin" ? "default" : "secondary"}
                                style={{ 
                                  backgroundColor: user.role === "admin" ? '#ff5722' : '#2196f3',
                                  color: '#ffffff'
                                }}
                              >
                                {user.role}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-0"
                                style={{ backgroundColor: '#2196f3', color: '#ffffff' }}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                                className="border-0"
                                style={{ backgroundColor: '#ff5252', color: '#ffffff' }}
                                disabled={user.role === 'admin'}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="border-0" style={{ backgroundColor: '#1f1f1f' }}>
              <CardHeader>
                <CardTitle style={{ color: '#ffffff' }}>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="border border-opacity-20" style={{ backgroundColor: '#121212', borderColor: '#3f51b5' }}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-1">
                            <div>
                              <p className="font-medium" style={{ color: '#ffffff' }}>{booking.userName}</p>
                              <p className="text-sm" style={{ color: '#cfd8dc' }}>{booking.photographerName}</p>
                            </div>
                            <div>
                              <p className="text-sm" style={{ color: '#cfd8dc' }}>Date: {booking.date}</p>
                              <p className="text-sm" style={{ color: '#cfd8dc' }}>Duration: {booking.duration}</p>
                            </div>
                            <div>
                              <p className="text-sm" style={{ color: '#cfd8dc' }}>Type: {booking.shootType}</p>
                              <p className="text-sm" style={{ color: '#cfd8dc' }}>Location: {booking.location}</p>
                            </div>
                            <div>
                              <Badge 
                                variant={booking.status === "Confirmed" ? "default" : "secondary"}
                                style={{ 
                                  backgroundColor: booking.status === "Confirmed" ? '#4caf50' : '#ff9800',
                                  color: '#ffffff'
                                }}
                              >
                                {booking.status}
                              </Badge>
                              <p className="font-bold mt-1" style={{ color: '#2196f3' }}>₹{booking.amount.toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-0"
                                style={{ backgroundColor: '#2196f3', color: '#ffffff' }}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="border-0"
                                style={{ backgroundColor: '#ff5252', color: '#ffffff' }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
