import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase, type ContactSubmission } from '../lib/supabase';
import emailjs from 'emailjs-com';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Bot protection states
  const [honeypot, setHoneypot] = useState('');
  const [formStartTime, setFormStartTime] = useState<number | null>(null);
  const [mathAnswer, setMathAnswer] = useState('');
  const [mathQuestion, setMathQuestion] = useState({ question: '', answer: 0 });

  // Generate random math question on component mount
  React.useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setMathQuestion({
      question: `What is ${num1} + ${num2}?`,
      answer: num1 + num2
    });
  }, []);

  // Track when user first interacts with form
  const handleFirstInteraction = () => {
    if (!formStartTime) {
      setFormStartTime(Date.now());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Bot protection checks
    
    // 1. Honeypot check - if filled, it's likely a bot
    if (honeypot.trim() !== '') {
      console.log('Bot detected: honeypot filled');
      setIsSubmitting(false);
      return; // Silently reject
    }

    // 2. Time-based check - too fast submission indicates bot
    if (formStartTime && (Date.now() - formStartTime) < 3000) {
      setError('Please take a moment to review your message before submitting.');
      setIsSubmitting(false);
      return;
    }

    // 3. Math CAPTCHA check
    if (parseInt(mathAnswer) !== mathQuestion.answer) {
      setError('Please solve the math question correctly.');
      setIsSubmitting(false);
      return;
    }

    // 4. Basic content validation
    if (formData.message.length < 10) {
      setError('Please provide a more detailed message (at least 10 characters).');
      setIsSubmitting(false);
      return;
    }

    // 5. Check for suspicious patterns
    const suspiciousPatterns = [
      /https?:\/\//gi, // URLs in message
      /\b(viagra|casino|loan|crypto|bitcoin)\b/gi, // Common spam words
      /(.)\1{4,}/gi, // Repeated characters (aaaaa)
    ];

    const messageContent = `${formData.name} ${formData.email} ${formData.message}`.toLowerCase();
    const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(messageContent));

    if (hasSuspiciousContent) {
      setError('Your message contains content that appears to be spam. Please revise and try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Save to Supabase database
      const submission: ContactSubmission = {
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        service: formData.service || '',
        message: formData.message
      };

      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([submission]);

      if (submitError) {
        throw submitError;
      }

      // Send email notification using EmailJS
      const emailParams = {
        to_email: 'andrew@ogmmedia.com',
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not specified',
        service: formData.service || 'Not specified',
        message: formData.message,
        reply_to: formData.email
      };

      // Send email (replace with your EmailJS credentials)
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Replace with your EmailJS service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Replace with your EmailJS template ID
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // Replace with your EmailJS public key
      );

      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });
      setMathAnswer('');
      setFormStartTime(null);
      
      // Generate new math question
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setMathQuestion({
        question: `What is ${num1} + ${num2}?`,
        answer: num1 + num2
      });
      
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);

    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    handleFirstInteraction();
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const services = [
    'Lead Capture with CRM Integration',
    'Customer Support Ticketing',
    'Appointment Setting',
    'Outreach Automation',
    'Custom Solution'
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-black to-blue-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to revolutionize your business with AI automation? Let's start the conversation.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Let's Build Something Amazing</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Whether you're looking to streamline operations, boost productivity, or scale your business, 
                  our AI automation experts are here to help you achieve your goals.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: 'Email Us',
                    content: 'andrew@ogmmedia.com',
                    gradient: 'from-cyan-400 to-blue-500'
                  },
                  {
                    icon: Phone,
                    title: 'Call Us',
                    content: '+1 (678) 718-7143',
                    gradient: 'from-blue-500 to-purple-500'
                  },
                  {
                    icon: MapPin,
                    title: 'Visit Us',
                    content: 'Atlanta, GA',
                    gradient: 'from-purple-500 to-cyan-500'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center`}>
                      <item.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      <p className="text-gray-400">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-12 p-6 bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4">What to Expect</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    Free consultation within 24 hours
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    Custom automation strategy
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    Transparent pricing and timeline
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-3xl p-8 border border-cyan-500/20 backdrop-blur-sm">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users */}
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                        <p className="text-red-400">{error}</p>
                      </div>
                    )}
                   <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                        Service of Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Tell us about your automation needs..."
                      />
                    </div>

                    {/* Math CAPTCHA */}
                    <div>
                      <label htmlFor="mathAnswer" className="block text-sm font-medium text-gray-300 mb-2">
                        Security Question: {mathQuestion.question} *
                      </label>
                      <input
                        type="number"
                        id="mathAnswer"
                        name="mathAnswer"
                        required
                        value={mathAnswer}
                        onChange={(e) => {
                          handleFirstInteraction();
                          setMathAnswer(e.target.value);
                        }}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Enter the answer"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}