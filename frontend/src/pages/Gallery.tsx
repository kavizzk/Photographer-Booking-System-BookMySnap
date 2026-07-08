
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Wedding", "Fashion", "Portrait", "Event", "Real Estate", "Product"];

  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1733759414886-6b3a5423ceb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdlZGRpbmclMjAlMjBwaG90b2dyYXBofGVufDB8fDB8fHww",
      category: "Wedding",
      photographer: "Sarah Johnson",
      title: "Elegant Wedding Ceremony"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1725610147377-173e2adee56e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Fashion",
      photographer: "Mike Chen",
      title: "Urban Fashion Shoot"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1581977325979-80749e97b0c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsJTIwcG9ydHJhaXRwb3J0Zm9saW98ZW58MHx8MHx8fDA%3D",
      category: "Portrait",
      photographer: "Emily Rodriguez",
      title: "Professional Portrait"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1562046030-101e60ae2c75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljJTIwZXZlbnQlMjAlMjBwb3J0Zm9saW98ZW58MHx8MHx8fDA%3D",
      category: "Event",
      photographer: "David Kim",
      title: "Corporate Event"
    },
    {
      id: 5,
      url: "https://media.istockphoto.com/id/1159873271/photo/residential-area-in-the-city-modern-apartment-buildings.webp?a=1&b=1&s=612x612&w=0&k=20&c=UPGYUizgpn2HOy61jZzw2XqjrJ3CsOzsgFHNhZJBnKA=",
      category: "Real Estate",
      photographer: "Alex Thompson",
      title: "Modern Architecture"
    },
    {
      id: 6,
      url: "https://plus.unsplash.com/premium_photo-1670338554174-f2735df74188?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3QlMjAlMjBwaG90b2dyYXBofGVufDB8fDB8fHww",
      category: "Product",
      photographer: "Lisa Wang",
      title: "Product Photography"
    },
    {
      id: 7,
      url: "https://i.pinimg.com/736x/e5/fc/5c/e5fc5c681f7a191f26f8f9babd6c1caa.jpg",
      category: "Wedding",
      photographer: "Sarah Johnson",
      title: "Romantic Couple Shot"
    },
    {
      id: 8,
      url: "https://plus.unsplash.com/premium_photo-1675851211519-fc13d860e103?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlZGRpbmclMjAlMjBwaG90b2dyYXBofGVufDB8fDB8fHww",
      category: "Fashion",
      photographer: "Mike Chen",
      title: "High Fashion Editorial"
    },
    {
      id: 9,
      url: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXQlMjBwaG90b2dyYXBofGVufDB8fDB8fHww",
      category: "Portrait",
      photographer: "Emily Rodriguez",
      title: "Creative Portrait"
    }
  ];

  const filteredImages = activeFilter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Photography Gallery
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore stunning photography work from our talented photographers across various categories
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-navy-600 to-navy-800 text-white shadow-lg"
                  : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 backdrop-blur-sm border border-slate-600"
              }`}
              style={activeFilter === filter ? {background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(30, 64, 175))'} : {}}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-2xl hover-scale card-hover"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-navy-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block" style={{backgroundColor: 'rgb(30, 58, 138)'}}>
                    {image.category}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                  <p className="text-gray-300 text-sm">by {image.photographer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto border-0 shadow-2xl backdrop-blur-md" style={{background: 'rgba(30, 58, 138, 0.15)', border: '1px solid rgba(30, 58, 138, 0.3)'}}>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Book Your Session?
            </h2>
            <p className="text-gray-300 mb-6">
              Connect with our professional photographers and create amazing memories
            </p>
            <Button 
              onClick={() => window.location.href = "/photographers"}
              className="bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 px-8 py-3 text-lg font-semibold rounded-lg text-white"
              style={{background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(30, 64, 175))'}}
            >
              Book a Photographer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
