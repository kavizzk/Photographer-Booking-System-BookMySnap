
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Heart, Star, Users, Award, CheckCircle } from "lucide-react";
import { photographers } from "@/data/photographers";

const Index = () => {
  const services = [
    { name: "Real Estate", icon: "🏠", description: "Professional property photography" },
    { name: "Wedding", icon: "💒", description: "Capturing your special day" },
    { name: "Fashion", icon: "👗", description: "Style and glamour shoots" },
    { name: "Portrait", icon: "👨‍👩‍👧‍👦", description: "Personal and family portraits" },
    { name: "Event", icon: "🎉", description: "Corporate and private events" },
    { name: "Product", icon: "📦", description: "E-commerce and catalog shots" },
  ];

  const stats = [
    { label: "Happy Clients", value: "1200+", icon: Heart },
    { label: "Professional Photographers", value: "80+", icon: Camera },
    { label: "Successful Bookings", value: "3000+", icon: CheckCircle },
    { label: "Average Rating", value: "4.8/5", icon: Star },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Amazing service! Our wedding photographer captured every moment perfectly. Highly recommended!",
      rating: 5,
    },
    {
      name: "Raj Patel",
      text: "Professional product photography that boosted our online sales significantly. Great value!",
      rating: 5,
    },
    {
      name: "Emily Chen",
      text: "The portrait session was fantastic. The photographer made us feel comfortable and the results were stunning.",
      rating: 5,
    },
  ];

  const featuredPhotographers = photographers.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Book Professional{" "}
              <span className="gradient-text">Photographers</span>{" "}
              for Any Occasion
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with verified photographers, browse portfolios, and book sessions 
              for weddings, events, portraits, and more. Quality guaranteed.
            </p>
            <Link to="/photographers">
              <Button size="lg" className="bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white font-semibold px-8 py-6 text-lg hover-scale" style={{background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(30, 64, 175))'}}>
                Find a Photographer
                <Camera className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Photography Services</h2>
            <p className="text-gray-300">Professional photography for every occasion</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, index) => (
              <Card key={service.name} className="text-center hover-scale glass-effect border-0 shadow-2xl backdrop-blur-md transition-all duration-300" style={{ animationDelay: `${index * 0.1}s`, background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)' }}>
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="font-semibold mb-2 text-white">{service.name}</h3>
                  <p className="text-sm text-gray-300">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Photographers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Photographers</h2>
            <p className="text-gray-300">Meet our top-rated professionals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPhotographers.map((photographer, index) => (
              <Card key={photographer.id} className="glass-effect hover-scale border-0 shadow-2xl backdrop-blur-md transition-all duration-300" style={{ animationDelay: `${index * 0.1}s`, background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)' }}>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-navy-500/20 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: 'rgba(30, 58, 138, 0.2)'}}>
                      <Camera className="h-8 w-8 text-gray-300" />
                    </div>
                    <h3 className="font-semibold text-lg text-white">{photographer.name}</h3>
                    <p className="text-sm text-gray-300">{photographer.shootTypes.join(", ")}</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Experience:</span>
                      <span className="text-white">{photographer.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-white">{photographer.rating} ({photographer.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Sessions:</span>
                      <span className="text-white">{photographer.sessionsCompleted}+</span>
                    </div>
                  </div>
                  <Link to="/photographers">
                    <Button className="w-full mt-4 bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white" style={{background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(30, 64, 175))'}}>
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-navy-500/20 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(30, 58, 138, 0.2)'}}>
                  <stat.icon className="h-8 w-8 text-gray-300" />
                </div>
                <div className="text-3xl font-bold text-gray-300 mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Client Reviews</h2>
            <p className="text-gray-300">What our customers say about us</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="glass-effect hover-scale border-0 shadow-2xl backdrop-blur-md" style={{ animationDelay: `${index * 0.1}s`, background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)' }}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
