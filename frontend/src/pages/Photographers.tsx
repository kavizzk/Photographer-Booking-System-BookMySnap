import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Camera, MapPin, Clock, Users, Award } from "lucide-react";
import { toast } from "sonner";
import { photographers } from "@/data/photographers";
import { useNavigate } from "react-router-dom";

const Photographers = () => {
  const navigate = useNavigate();
  const [bookingForm, setBookingForm] = useState<{
    photographerId: string | null;
    date: string;
    time: string;
    location: string;
    duration: string;
    eventType: string;
    description: string;
  }>({
    photographerId: null,
    date: "",
    time: "",
    location: "",
    duration: "",
    eventType: "",
    description: "",
  });

  const [showBookingForm, setShowBookingForm] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingForm.photographerId || !bookingForm.date || !bookingForm.time || !bookingForm.location || !bookingForm.eventType) {
      toast.error("Please fill in all required fields");
      return;
    }

    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.error('You need to be logged in to make a booking.');
      navigate('/login');
      return;
    }

    // Get current user data
    const userData = localStorage.getItem('userData');
    if (!userData) {
      toast.error('User data not found. Please log in again.');
      navigate('/login');
      return;
    }

    const currentUser = JSON.parse(userData);
    const userName = currentUser.name; // Use the name directly from userData

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: new Date(bookingForm.date).toISOString(),
          time: bookingForm.time,
          packageType: bookingForm.eventType,
          location: bookingForm.location,
          specialRequirements: bookingForm.description,
          photographerId: bookingForm.photographerId,
          photographerName: photographers.find(p => p.id === bookingForm.photographerId)?.name,
          userName: userName,
          userId: currentUser._id,
          duration: parseInt(bookingForm.duration),
          totalCost: photographers.find(p => p.id === bookingForm.photographerId)?.hourlyRate * parseInt(bookingForm.duration)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking');
      }

      toast.success(`Booking confirmed!`);
      
      // Reset form and hide it
      setBookingForm({
        photographerId: null,
        date: "",
        time: "",
        location: "",
        duration: "",
        eventType: "",
        description: "",
      });
      setShowBookingForm(null);

    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create booking');
      console.error('Booking submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPackage = (photographerId: string) => {
    setBookingForm(prev => ({ ...prev, photographerId }));
    setShowBookingForm(photographerId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-300 to-slate-400 bg-clip-text text-transparent mb-4">
            Professional Photographers
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose from our talented team of professional photographers for your special moments
          </p>
        </div>

        <div className="grid gap-12">
          {photographers.map((photographer) => (
            <Card key={photographer.id} className="glass-effect border-0 shadow-2xl backdrop-blur-md overflow-hidden card-hover" style={{background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)'}}>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Photographer Info */}
                  <div>
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <CardTitle className="text-3xl font-bold text-white">{photographer.name}</CardTitle>
                        <div className="flex items-center bg-navy-500/20 px-3 py-1 rounded-full" style={{backgroundColor: 'rgba(30, 58, 138, 0.2)'}}>
                          <Star className="w-4 h-4 text-gray-300 mr-1 fill-current" />
                          <span className="text-gray-300 font-semibold">{photographer.rating}</span>
                          <span className="text-gray-300 ml-1">({photographer.reviewCount})</span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-lg">{photographer.email}</p>
                    </CardHeader>

                    <div className="space-y-6">
                      {/* Specialties */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Specialties</h3>
                        <div className="flex flex-wrap gap-2">
                          {photographer.shootTypes.map((specialty, index) => (
                            <Badge key={index} className="bg-navy-500/20 text-navy-300 border-navy-500/30 px-3 py-1" style={{backgroundColor: 'rgba(30, 58, 138, 0.2)', color: 'rgb(147, 197, 253)', borderColor: 'rgba(30, 58, 138, 0.3)'}}>
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-navy-700/30 rounded-lg p-4 text-center" style={{backgroundColor: 'rgba(30, 58, 138, 0.3)'}}>
                          <div className="flex items-center justify-center mb-2">
                            <Clock className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="text-gray-300 font-semibold">₹{photographer.hourlyRate}/hour</span>
                          </div>
                        </div>
                        <div className="bg-navy-700/30 rounded-lg p-4 text-center" style={{backgroundColor: 'rgba(30, 58, 138, 0.3)'}}>
                          <div className="flex items-center justify-center mb-2">
                            <Award className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="text-gray-300 font-semibold">{photographer.experience}</span>
                          </div>
                        </div>
                        <div className="bg-navy-700/30 rounded-lg p-4 text-center" style={{backgroundColor: 'rgba(30, 58, 138, 0.3)'}}>
                          <div className="flex items-center justify-center mb-2">
                            <Camera className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="text-gray-300 font-semibold text-sm">{photographer.camera}</span>
                          </div>
                        </div>
                        <div className="bg-navy-700/30 rounded-lg p-4 text-center" style={{backgroundColor: 'rgba(30, 58, 138, 0.3)'}}>
                          <div className="flex items-center justify-center mb-2">
                            <Users className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="text-gray-300 font-semibold">{photographer.sessionsCompleted}+ sessions</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                        <p className="text-gray-300">{photographer.description}</p>
                      </div>

                      <Button
                        onClick={() => handleSelectPackage(photographer.id)}
                        className="w-full bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white text-lg font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                        style={{background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(30, 64, 175))'}}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>

                  {/* Portfolio */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">Portfolio</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {photographer.portfolios.slice(0, 4).map((image, index) => (
                        <div key={index} className="aspect-[3/2] rounded-lg overflow-hidden hover-scale">
                          <img
                            src={`https://images.unsplash.com/${image}?w=250&h=167&fit=crop`}
                            alt={`Portfolio ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                {showBookingForm === photographer.id && (
                  <div className="mt-8 pt-8 border-t border-navy-600" style={{borderColor: 'rgba(30, 58, 138, 0.6)'}}>
                    <h3 className="text-2xl font-bold text-white mb-6">Book Your Session</h3>
                    <form onSubmit={handleBookingSubmit} className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 mb-2">Date *</label>
                        <Input
                          type="date"
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                          className="bg-navy-700/50 border-navy-600 text-white focus:border-navy-400"
                          style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Time *</label>
                        <Input
                          type="time"
                          value={bookingForm.time}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, time: e.target.value }))}
                          className="bg-navy-700/50 border-navy-600 text-white focus:border-navy-400"
                          style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Location *</label>
                        <Input
                          type="text"
                          placeholder="Enter shoot location"
                          value={bookingForm.location}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, location: e.target.value }))}
                          className="bg-navy-700/50 border-navy-600 text-white focus:border-navy-400"
                          style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Duration (hours) *</label>
                        <Input
                          type="number"
                          min="1"
                          max="12"
                          placeholder="Number of hours"
                          value={bookingForm.duration}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, duration: e.target.value }))}
                          className="bg-navy-700/50 border-navy-600 text-white focus:border-navy-400"
                          style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Event Type *</label>
                        <Input
                          type="text"
                          placeholder="e.g., Wedding, Portrait, Fashion"
                          value={bookingForm.eventType}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, eventType: e.target.value }))}
                          className="bg-navy-700/50 border-navy-600 text-white focus:border-navy-400"
                          style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Total Cost</label>
                        <div className="bg-navy-700/50 border border-navy-600 rounded-md px-3 py-2 text-gray-300 font-semibold" style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}>
                          ₹{bookingForm.duration ? photographer.hourlyRate * parseInt(bookingForm.duration) : 0}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 mb-2">Event Description</label>
                        <textarea
                          placeholder="Describe your event and any special requirements..."
                          value={bookingForm.description}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full min-h-[100px] bg-navy-700/50 border border-navy-600 rounded-md px-3 py-2 text-white focus:border-navy-400 focus:outline-none resize-none"
                          style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Button type="submit" className="w-full bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white text-lg font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105" style={{background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(30, 64, 175))'}} disabled={loading}>
                          {loading ? 'Booking...' : 'Book Now'}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Photographers;
