import React from 'react';
import { Users, MessageCircle, Calendar, Send, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      icon: Users,
      title: 'Lead Capture with CRM Integration',
      description: 'Automatically capture, qualify, and organize leads from multiple channels. Seamlessly integrate with your existing CRM system for streamlined workflow.',
      features: ['Multi-channel lead capture', 'Intelligent lead scoring', 'CRM synchronization', 'Real-time notifications'],
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Customer Support Ticketing',
      description: 'Transform customer inquiries into organized tickets with AI-powered categorization, priority assignment, and automated responses.',
      features: ['Smart ticket routing', 'AI-powered responses', 'Priority classification', 'Performance analytics'],
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: Calendar,
      title: 'Appointment Setting',
      description: 'Eliminate scheduling conflicts with intelligent appointment booking that considers availability, preferences, and business rules.',
      features: ['Smart scheduling', 'Calendar integration', 'Automated confirmations', 'Rescheduling management'],
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Send,
      title: 'Outreach Automation',
      description: 'Scale your outreach efforts with personalized, AI-driven campaigns that adapt based on recipient behavior and preferences.',
      features: ['Personalized messaging', 'Multi-channel outreach', 'Response tracking', 'Campaign optimization'],
      gradient: 'from-pink-500 to-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-black to-blue-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Our AI Services
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Comprehensive automation solutions designed to transform your business operations and accelerate growth
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-3xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 backdrop-blur-sm hover:scale-[1.02] relative overflow-hidden"
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-black" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <button
                    onClick={() => onNavigate('contact')}
                    className="flex items-center text-cyan-400 hover:text-cyan-300 font-medium group/btn"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-blue-900/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how our AI automation services can accelerate your growth
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}