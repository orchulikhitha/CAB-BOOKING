import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Heart, Award, Globe, Shield, Zap, TrendingUp, Car } from 'lucide-react';
import { Button, Card } from '../../components/common';

export const AboutPage = () => {
  const teamMembers = [
    { name: 'Arjun Mehta', role: 'CEO & Founder', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Sneha Kapoor', role: 'CTO', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Vikram Singh', role: 'Head of Operations', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Ananya Rao', role: 'Head of Marketing', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ];

  const milestones = [
    { year: '2018', title: 'UCAB Founded', desc: 'Started with 10 cabs in one city' },
    { year: '2019', title: 'Expanded to 10 Cities', desc: 'Crossed 1 million rides milestone' },
    { year: '2020', title: 'Launched App', desc: 'Mobile app with 5 million downloads' },
    { year: '2021', title: '100 Cities', desc: 'Pan-India presence established' },
    { year: '2022', title: '10 Million Riders', desc: 'Became the largest ride platform' },
    { year: '2023', title: 'Going Global', desc: 'Expanded to international markets' },
  ];

  const values = [
    { icon: Shield, title: 'Safety First', desc: 'Your safety is our top priority. Every driver is verified and every ride is insured.' },
    { icon: Heart, title: 'Customer Care', desc: 'We care about your experience. Our support team is available 24/7 to help you.' },
    { icon: Target, title: 'Reliability', desc: 'On-time pickups and reliable service. We value your time as much as you do.' },
    { icon: Globe, title: 'Sustainability', desc: 'Committed to reducing carbon emissions with our electric vehicle fleet.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-400 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 animate-fade-in">About UCAB</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We're on a mission to revolutionize urban transportation. Making rides safe, reliable, and accessible for everyone.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-dark-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Founded in 2018, UCAB started with a simple idea: make transportation accessible, reliable, and safe for everyone. What began with just 10 cabs in a single city has now grown into India's largest cab booking platform.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our founders, having experienced the challenges of urban mobility firsthand, set out to build a solution that puts riders first. Today, we serve millions of riders across 100+ cities.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                At UCAB, we believe every ride matters. Whether it's your daily commute, an airport transfer, or a special occasion, we're committed to making your journey memorable.
              </p>
            </div>
            <div className="relative">
              <img src="https://images.pexels.com/photos/1799356/pexels-photo-1799356.jpeg?auto=compress&cs=tinysrgb&w=800" alt="UCAB Story" className="rounded-2xl shadow-elevated" />
              <div className="absolute -bottom-8 -right-8 bg-white dark:bg-dark-200 rounded-2xl shadow-elevated p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">10M+</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Happy Riders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-dark-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">The principles that guide everything we do at UCAB.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <Card key={title} hover className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-dark-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Journey</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">From a small startup to a national platform.</p>
          </div>
          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <div key={milestone.year} className={`flex items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'} hidden lg:block`}>
                  <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold">{milestone.year}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{milestone.desc}</p>
                </div>
                <div className="hidden lg:flex w-12 h-12 rounded-full bg-primary-600 text-white items-center justify-center z-10">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="flex-1 lg:hidden">
                  <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold">{milestone.year}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{milestone.desc}</p>
                </div>
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">The passionate people behind UCAB's success.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover shadow-lg" />
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Join the UCAB Family</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Whether you're a rider looking for reliable transportation or a driver seeking opportunities, UCAB welcomes you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">Sign Up as Rider</Button>
            </Link>
            <Link to="/driver/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Become a Driver</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
