import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Camera } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { firstName, lastName, email, phone, serviceType, message } = formData;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          phone,
          serviceType,
          message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        serviceType: "",
        message: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
      console.error('Contact form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Number",
      details: "+91 98765 43210",
      description: "Mon-Sat, 9:00 AM - 8:00 PM",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: "contact@bookmysnap.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Physical Address",
      details: "123 Photography Street, Bandra West",
      description: "Mumbai, Maharashtra 400050",
    },
  ];

  const serviceTypes = [
    "Wedding Photography",
    "Portrait Photography",
    "Event Photography",
    "Product Photography",
    "Real Estate Photography",
    "Fashion Photography",
    "General Inquiry",
  ];

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions or need help finding the perfect photographer? We're here to help you every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in">
            <Card className="glass-effect border-0 shadow-2xl backdrop-blur-md" style={{background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)'}}>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-gray-300">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        className="w-full p-3 rounded-md bg-navy-700/50 border border-navy-600 text-white focus:outline-none focus:ring-2 focus:ring-navy-400 transition-all"
                        style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-gray-300">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        className="w-full p-3 rounded-md bg-navy-700/50 border border-navy-600 text-white focus:outline-none focus:ring-2 focus:ring-navy-400 transition-all"
                        style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full p-3 rounded-md bg-navy-700/50 border border-navy-600 text-white focus:outline-none focus:ring-2 focus:ring-navy-400 transition-all"
                      style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-3 rounded-md bg-navy-700/50 border border-navy-600 text-white focus:outline-none focus:ring-2 focus:ring-navy-400 transition-all"
                      style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium mb-2 text-gray-300">
                      Service Type
                    </label>
                    <select
                      id="serviceType"
                      className="w-full p-3 rounded-md bg-navy-700/50 border border-navy-600 text-white focus:outline-none focus:ring-2 focus:ring-navy-400 transition-all"
                      style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      className="w-full p-3 rounded-md bg-navy-700/50 border border-navy-600 text-white focus:outline-none focus:ring-2 focus:ring-navy-400 transition-all resize-none"
                      style={{backgroundColor: 'rgba(30, 58, 138, 0.5)', borderColor: 'rgba(30, 58, 138, 0.6)'}}
                      placeholder="Tell us about your photography needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 hover-scale text-white" style={{background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(30, 64, 175))'}} disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                    <Mail className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Get in Touch</h2>
              <p className="text-gray-300 mb-8">
                We'd love to hear from you. Choose the best way to get in touch with our team.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={info.title} className="glass-effect hover-scale border-0 shadow-2xl backdrop-blur-md transition-all duration-300" style={{ animationDelay: `${0.1 + index * 0.05}s`, background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)' }}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-navy-500/20 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(30, 58, 138, 0.2)'}}>
                        <info.icon className="h-6 w-6 text-gray-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-white">{info.title}</h3>
                        <p className="text-gray-300 font-medium mb-1">{info.details}</p>
                        <p className="text-sm text-gray-300">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Section */}
            <Card className="glass-effect border-0 shadow-2xl backdrop-blur-md" style={{background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)'}}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-white">Frequently Asked Questions</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium mb-1 text-white">How far in advance should I book?</p>
                    <p className="text-gray-300">We recommend booking at least 2-4 weeks in advance, especially for weddings and events.</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-white">What's included in the packages?</p>
                    <p className="text-gray-300">Each package includes professional editing, online gallery access, and high-resolution downloads. Details vary by photographer.</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-white">Can I request specific editing styles?</p>
                    <p className="text-gray-300">Yes! Discuss your preferences with your photographer before the shoot to ensure your vision is captured.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
