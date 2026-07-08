
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Star, Camera, Clock, Award } from "lucide-react";

const About = () => {
  const steps = [
    {
      number: "01",
      title: "Choose your shoot type",
      description: "Select from wedding, portrait, event, product, real estate, or fashion photography",
      icon: Camera,
    },
    {
      number: "02",
      title: "Browse photographers",
      description: "View portfolios, ratings, and packages from verified professional photographers",
      icon: Star,
    },
    {
      number: "03",
      title: "Select a package",
      description: "Choose from Basic, Premium, or Gold packages that fit your needs and budget",
      icon: CheckCircle,
    },
    {
      number: "04",
      title: "Book and Pay securely",
      description: "Schedule your session and pay safely through our secure payment platform",
      icon: Shield,
    },
  ];

  const whyChoose = [
    {
      title: "Verified Professionals",
      description: "All photographers are thoroughly vetted and verified to ensure quality and reliability",
      icon: Award,
    },
    {
      title: "Transparent Pricing",
      description: "No hidden fees. See exact pricing upfront with detailed package information",
      icon: CheckCircle,
    },
    {
      title: "Portfolio Previews",
      description: "Browse actual work samples before booking to ensure the style matches your vision",
      icon: Camera,
    },
    {
      title: "Secure Payment System",
      description: "Safe and secure payment processing with industry-standard encryption",
      icon: Shield,
    },
    {
      title: "Quick Turnaround",
      description: "Fast delivery of edited photos and videos based on your chosen package",
      icon: Clock,
    },
    {
      title: "Quality Guarantee",
      description: "Satisfaction guaranteed with our rating system and customer support",
      icon: Star,
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            About <span className="gradient-text">BookMySnap</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We connect you with professional photographers who capture your most important moments. 
            From weddings to product shoots, find the perfect photographer for any occasion.
          </p>
        </div>

        {/* How It Works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-gray-300">Simple steps to book your perfect photographer</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={step.number} className="text-center glass-effect hover-scale border-0 shadow-2xl backdrop-blur-md transition-all duration-300" style={{ animationDelay: `${index * 0.1}s`, background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)' }}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-navy-500/20 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(30, 58, 138, 0.2)'}}>
                    <step.icon className="h-8 w-8 text-gray-300" />
                  </div>
                  <div className="text-3xl font-bold text-gray-300 mb-2">{step.number}</div>
                  <h3 className="font-semibold mb-3 text-white">{step.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Why Choose BookMySnap</h2>
            <p className="text-gray-300">The benefits that set us apart</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((feature, index) => (
              <Card key={feature.title} className="glass-effect hover-scale border-0 shadow-2xl backdrop-blur-md transition-all duration-300" style={{ animationDelay: `${index * 0.1}s`, background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)' }}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-navy-500/20 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(30, 58, 138, 0.2)'}}>
                    <feature.icon className="h-6 w-6 text-gray-300" />
                  </div>
                  <h3 className="font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="glass-effect rounded-lg p-8 lg:p-12 text-center animate-fade-in border-0 shadow-2xl backdrop-blur-md" style={{background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)'}}>
          <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
            At BookMySnap, we believe every moment deserves to be captured beautifully. Our mission is to make 
            professional photography accessible to everyone by connecting clients with talented photographers 
            who understand the importance of preserving life's precious memories. We're committed to providing 
            a seamless, secure, and satisfying experience for both photographers and clients.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
