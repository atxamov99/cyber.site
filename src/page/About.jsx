import React from 'react';
import { Smartphone, Monitor, Headphones, Watch, Camera, Gamepad2, Award, Users, Zap, Shield } from 'lucide-react';

function About() {
  const categories = [
    { icon: Smartphone, name: 'Phones', count: '150+' },
    { icon: Monitor, name: 'Computers', count: '80+' },
    { icon: Headphones, name: 'Audio', count: '120+' },
    { icon: Watch, name: 'Wearables', count: '60+' },
    { icon: Camera, name: 'Cameras', count: '45+' },
    { icon: Gamepad2, name: 'Gaming', count: '90+' },
  ];

  const values = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We curate only the finest tech products from world-renowned brands'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our team consists of tech enthusiasts with deep industry knowledge'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'Always bringing you the latest and most innovative technology'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your satisfaction and security are our top priorities'
    }
  ];

  const products = [
    {
      name: 'iPhone 14 Pro',
      category: 'Smartphones',
      image: 'https://images.pexels.com/photos/18525574/pexels-photo-18525574.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Latest flagship with Pro camera system'
    },
    {
      name: 'MacBook Air M2',
      category: 'Laptops',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300',
      description: 'Ultra-thin design with M2 chip power'
    },
    {
      name: 'PlayStation 5',
      category: 'Gaming',
      image: 'https://images.pexels.com/photos/9072316/pexels-photo-9072316.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Next-gen gaming experience'
    },
    {
      name: 'AirPods Pro',
      category: 'Audio',
      image: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Active noise cancellation'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white py-20 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">TechStore</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Pioneering the future of technology retail since 2018. We bring you the world's most innovative gadgets and electronics.
              </p>
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">50K+</div>
                  <div className="text-sm text-gray-400">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">500+</div>
                  <div className="text-sm text-gray-400">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-violet-400">6</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
              <img 
                src="https://images.pexels.com/photos/18525574/pexels-photo-18525574.jpeg?auto=compress&cs=tinysrgb&w=500" 
                alt="Latest iPhone" 
                className="relative rounded-3xl shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2018 by a team of technology enthusiasts, TechStore emerged from a simple vision: to make cutting-edge technology accessible to everyone. What started as a small online retailer has grown into one of the most trusted names in consumer electronics.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We began with just 50 products and a passion for innovation. Today, we offer over 500 premium tech products from the world's leading brands, serving customers across the globe with the same dedication to quality and service.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Authorized Retailer</h3>
                    <p className="text-gray-600">Official partner of Apple, Samsung, Sony and more</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Warranty & Support</h3>
                    <p className="text-gray-600">Full manufacturer warranty and 24/7 support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300" 
                alt="MacBook" 
                className="rounded-2xl shadow-lg"
              />
              <img 
                src="https://images.pexels.com/photos/9072316/pexels-photo-9072316.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Gaming Console" 
                className="rounded-2xl shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories We Serve */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Categories We Serve</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From smartphones to gaming consoles, we cover every aspect of modern technology
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} products</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at TechStore
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Preview */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Popular Products</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover some of our best-selling tech products
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden group hover:scale-105 transition-transform">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-400 mb-2">{product.category}</div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-2xl text-gray-700 leading-relaxed mb-8">
            "To democratize access to cutting-edge technology and empower people to enhance their lives through innovation."
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We believe that great technology should be accessible to everyone. That's why we work tirelessly to source the best products, negotiate fair prices, and provide exceptional service that makes your tech journey seamless and enjoyable.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;