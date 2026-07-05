import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Car, Shield, Clock, Star, MapPin, ArrowRight,
  Phone, Mail, Users, Award, Zap, HeadphonesIcon
} from 'lucide-react';
import { Button, Card } from '../../components/common';
import { useAuth } from '../../context';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const services = [
    { title: 'City Rides', desc: 'Quick and affordable rides within your city', icon: Car },
    { title: 'Airport Transfer', desc: 'Reliable airport pickup and drop services', icon: MapPin },
    { title: 'Premium', desc: 'Luxury rides for special occasions', icon: Award },
    { title: 'Outstation', desc: 'Long-distance travel comfort', icon: Clock },
  ];

  const cabCategories = [
    { name: 'Mini', price: 49, capacity: 4, image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Affordable & compact' },
    { name: 'Sedan', price: 79, capacity: 4, image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Comfort & style' },
    { name: 'SUV', price: 99, capacity: 6, image: 'https://images.pexels.com/photos/1149843/pexels-photo-1149843.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Spacious & premium' },
    { name: 'Luxury', price: 199, capacity: 4, image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Exquisite experience' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', role: 'Business Professional', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100', text: 'UCAB has transformed my daily commute. The service is reliable, drivers are professional, and the app is so easy to use!' },
    { name: 'Rahul Kumar', role: 'Startup Founder', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100', text: 'As someone who travels frequently for meetings, UCAB has been a game-changer. The real-time tracking feature is amazing!' },
    { name: 'Ananya Patel', role: 'Medical Professional', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100', text: 'Safe, punctual, and clean vehicles. UCAB understands customer needs perfectly. Highly recommended for families too.' },
  ];

  const howItWorks = [
    { step: '01', title: 'Enter Location', desc: 'Enter your pickup and drop location in the app' },
    { step: '02', title: 'Choose Your Ride', desc: 'Select from our range of cab options' },
    { step: '03', title: 'Confirm Booking', desc: 'Confirm your ride and get driver details' },
    { step: '04', title: 'Enjoy the Journey', desc: 'Track your ride in real-time and enjoy' },
  ];

  const stats = [
    { value: '10M+', label: 'Happy Riders', icon: Users },
    { value: '500K', label: 'Completed Trips', icon: Car },
    { value: '4.8', label: 'Average Rating', icon: Star },
    { value: '100+', label: 'Cities Covered', icon: MapPin },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-dark-400 dark:via-dark-300 dark:to-dark-400">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6 animate-fade-in">
                <Zap className="w-4 h-4" />
                #1 Cab Booking Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 animate-slide-up">
                Your Journey,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-primary">
                  Our Priority
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up animate-delay-200">
                Safe, reliable, and affordable cab services at your fingertips.
                Book your ride in seconds and travel in comfort.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animate-delay-300">
                <Link to="/book">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Book a Ride Now
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg">
                    Explore Services
                  </Button>
                </Link>
              </div>
              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-in animate-delay-500">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                      {value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative animate-slide-left">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/153345/car-vehicle-road-drive.jpg?auto=compress&cs=tinysrgb&w=1200"
                  alt="UCAB Hero"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Floating Cards */}
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-dark-200 rounded-2xl shadow-elevated p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Safe Rides</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Verified Drivers</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white dark:bg-dark-200 rounded-2xl shadow-elevated p-4 animate-float animate-delay-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">24/7 Service</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Always Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-dark-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From daily commute to airport pickup, we've got you covered with our range of premium services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ title, desc, icon: Icon }, index) => (
              <Card key={title} hover className={`group cursor-pointer ${activeServiceIndex === index ? 'ring-2 ring-primary-500' : ''}`}>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                    <Icon className={`w-8 h-8 ${activeServiceIndex === index ? 'text-white' : 'text-primary-600 dark:text-primary-400'}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cab Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Ride</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From budget-friendly to luxury, we have the perfect ride for every occasion.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cabCategories.map((cab) => (
              <Card key={cab.name} padding="none" hover className="overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img src={cab.image} alt={cab.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-3xl font-bold">₹{cab.price}</p>
                    <p className="text-sm opacity-80">Starting price</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cab.name}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{cab.capacity} seats</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{cab.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-dark-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Book your ride in 4 simple steps. It's that easy!</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary-500 to-primary-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white dark:from-dark-400 dark:to-dark-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Riders Say</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join millions of satisfied riders who trust UCAB for their daily commute.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative">
                <div className="absolute -top-4 left-6 text-6xl text-primary-200 dark:text-primary-800">"</div>
                <div className="p-6 pt-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-6 relative z-10">{testimonial.text}</p>
                  <div className="flex items-center gap-3">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">Download the app or book online. Your first ride is just a tap away.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="ghost" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">Sign Up Now</Button>
            </Link>
            <Link to="/book">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" icon={<ArrowRight className="w-5 h-5" />}>Book a Ride</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white dark:bg-dark-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <HeadphonesIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Our support team is available round the clock to assist you.</p>
              <a href="tel:1800-222-233" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">1800-222-233</a>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Have a query? Drop us an email and we'll get back to you.</p>
              <a href="mailto:support@ucab.com" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">support@ucab.com</a>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Visit Us</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Our headquarters are located in the heart of the city.</p>
              <p className="text-gray-600 dark:text-gray-400">123 Transport Street, New Delhi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
