import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Zap, 
  Globe, 
  Users, 
  Award, 
  Briefcase,
  Star,
  ChevronDown,
  ChevronUp,
  Code
} from "lucide-react";
import Modal from "../components/ui/Modal";

// Parallax Card Component
const ParallaxCard = ({ children, bgImage, overlay = false }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl group h-full"
    >
      <div 
        className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {overlay ? (
         <div className="absolute inset-0 bg-gray-900/80 z-10" /> 
      ) : (
         <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/95 z-10" />
      )}
      
      <div className="relative z-20 p-8 h-full flex flex-col motion-reduce:transform-none">
        {children}
      </div>
    </motion.div>
  );
};

const Landing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Existing images as per requirements
  const images = [
    "../../images/hero_1.jpg",
    "../../images/hero_2.png",
    "../../images/hero_4.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Testimonials Data
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CTO at TechFlow",
      text: "DevHire transformed our hiring process. We found 3 senior engineers in under a week, and the quality of talent is unmatched.",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=0D8ABC&color=fff"
    },
    {
      name: "Michael Chang",
      role: "Founder, StartUp Inc",
      text: "The AI matching is incredibly accurate. It felt like the candidates were hand-picked for our specific tech stack and culture.",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chang&background=random"
    },
    {
      name: "Elena Rodriguez",
      role: "VP of Engineering",
      text: "Verified skills meant we skipped the initial screening entirely. We went straight to culture fit interviews. Huge time saver!",
      avatar: "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=random"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "AI-Powered Matching",
      description: "Our advanced algorithms connect you with the perfect candidates in record time, saving you hours of manual screening.",
      image: "../../images/undraw_online_articles_79ff.svg" 
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: "Verified Skills",
      description: "Every developer passes rigorous coding challenges and technical assessments before they reach your dashboard.",
      image: "../../images/undraw_publish_article_icso.svg"
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: "Global Talent Pool",
      description: "Access a diverse network of top-tier developers from around the world, ready to join your team remotely or on-site.",
      image: "../../images/world.svg"
    }
  ];

  const services = [
    {
      title: "For Companies",
      icon: <Briefcase className="w-8 h-8 text-white" />,
      items: ["Post Jobs for Free", "AI Candidate Matching", "Technical Assessment Tools", "Payroll & Compliance"],
      cta: "Hire Talent",
      link: "/register",
      bg: "../../images/hero_4.png" // Office vibe
    },
    {
      title: "For Developers",
      icon: <Code className="w-8 h-8 text-white" />,
      items: ["Build Your Profile", "Take Skill Tests", "Get Matched with Top Jobs", "Career Mentorship"],
      cta: "Find a Job",
      link: "/register",
      bg: "../../images/hero_1.jpg" // Coding vibe
    }
  ];

  const faqs = [
    {
      question: "How does the vetting process work?",
      answer: "We put every candidate through a 4-step process: Profile screening, English proficiency test, technical coding challenges, and a final video interview with a senior engineer."
    },
    {
      question: "What is the cost to hire?",
      answer: "Posting a job is free. You only pay a success fee when you make a hire. We also offer subscription plans for high-volume hiring needs."
    },
    {
      question: "How long does it take to find a candidate?",
      answer: "Most companies receive their first batch of qualified matches within 24 hours. The average time-to-hire is 14 days."
    },
    {
      question: "Can I hire remotely?",
      answer: "Absolutely! We specialize in remote talent. We handle compliance, contracts, and payments for developers in over 150 countries."
    }
  ];

  const stats = [
    { value: "10k+", label: "Developers Hired", icon: <Users className="w-5 h-5" /> },
    { value: "500+", label: "Happy Companies", icon: <Briefcase className="w-5 h-5" /> },
    { value: "98%", label: "Retention Rate", icon: <Award className="w-5 h-5" /> },
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 🌟 Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url('../../images/hero_1.jpg')`,
        }}
      >
        {/* Complex Gradient Overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.4) 0%, transparent 60%), linear-gradient(135deg, rgba(238,242,255,0.95) 0%, rgba(255,255,255,0.9) 50%, rgba(219,234,254,0.95) 100%)'
          }}
        />

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center py-20">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left pt-10 md:pt-0"
          >
            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full tracking-wide backdrop-blur-sm">
              🚀 Hiring Reimagined
            </div>
            {/* Fluid Typography using clamp() with Gradient Text */}
            <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-extrabold leading-[1.1] mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Hire the Top 1% Tech Talent
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              DevHire connects innovative companies with world-class developers. 
              Fast, reliable, and powered by intelligent matching.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/register" 
                className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform active:scale-95"
              >
                Get Started
              </Link>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="px-8 py-4 bg-white/80 backdrop-blur-md text-gray-900 font-bold border border-gray-200 rounded-xl shadow-sm hover:border-gray-300 hover:bg-white transition-all duration-300"
              >
                Contact Sales
              </button>
            </div>

            {/* Mini Trust Indicators */}
            <div className="mt-10 flex items-center justify-center md:justify-start gap-6 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" /> No Credit Card
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" /> 14-Day Free Trial
              </div>
            </div>
          </motion.div>

          {/* Right Image/Carousel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-100 bg-gray-100 transform preserve-3d">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt="DevHire Interface"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectFit: 'cover' }}
                />
              </AnimatePresence>
              
              {/* Carousel Controls */}
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white transition-all z-10 hover:scale-110 active:scale-90">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white transition-all z-10 hover:scale-110 active:scale-90">
                <ChevronRight size={24} />
              </button>

              {/* Glass Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-xl rounded-xl border border-white/50 shadow-lg flex items-center justify-between z-10">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Active Talent</p>
                  <p className="text-gray-900 font-bold text-lg">2,450+ Developers</p>
                </div>
                <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-green-500/30 shadow-lg animate-pulse">
                   <Zap size={20} fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Decorative Floating Elements behind */}
            <div className="absolute -z-10 top-10 -right-10 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-40 animate-pulse motion-reduce:animate-none" />
            <div className="absolute -z-10 -bottom-5 -left-5 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-30" />
          </motion.div>
        </div>
      </section>

      {/* 🏢 Trusted By */}
      <section className="py-10 border-y border-gray-100 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <span className="text-xl font-bold font-serif text-gray-800">Acme Corp</span>
             <span className="text-xl font-bold font-mono text-gray-800">GlobalTech</span>
             <span className="text-xl font-black tracking-tighter text-gray-800">NEXUS</span>
             <span className="text-xl font-bold text-gray-800">Starlight</span>
             <span className="text-xl font-semibold italic text-gray-800">Venture</span>
          </div>
        </div>
      </section>

      {/* ✨ Features Section (With Parallax Cards) */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40" 
             style={{ 
               backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
               backgroundSize: '32px 32px' 
             }} 
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Why Companies Choose DevHire</h2>
            <p className="text-gray-600 text-lg">We simplify the complex process of technical hiring, letting you focus on building great products.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <ParallaxCard key={idx} bgImage={feature.image}>
                <div className="w-14 h-14 bg-gray-50/80 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </section>

      {/* 🛠️ Services Overview (Enhanced Cards with Backgrounds) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Tailored Solutions for Everyone</h2>
            <p className="text-gray-600">Whether you're hiring or looking for work, we've got you covered.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {services.map((service, idx) => (
              <ParallaxCard key={idx} bgImage={service.bg} overlay={true}>
                <div className="relative z-10 h-full flex flex-col items-start text-white">
                  <div className="mb-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-sm inline-block border border-white/20">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-200">
                        <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to={service.link}
                    className="inline-flex items-center px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 group-hover:translate-x-2"
                  >
                    {service.cta} <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </section>

      {/* 💬 Testimonials (Fixed Background Parallax) */}
      <section 
        className="py-24 bg-fixed bg-center bg-cover relative overflow-hidden text-white"
        style={{
           backgroundImage: 'url(../../images/hero_2.png)'
        }}
      >
        <div className="absolute inset-0 bg-indigo-900/90 backdrop-blur-[2px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">Loved by Tech Leaders</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={currentTestimonialIndex}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                   className="text-center"
                 >
                   <div className="flex justify-center mb-6">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                     ))}
                   </div>
                   <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                     "{testimonials[currentTestimonialIndex].text}"
                   </blockquote>
                   <div className="flex items-center justify-center gap-4">
                     <img 
                       src={testimonials[currentTestimonialIndex].avatar} 
                       alt={testimonials[currentTestimonialIndex].name}
                       className="w-12 h-12 rounded-full border-2 border-indigo-400 object-cover" 
                     />
                     <div className="text-left">
                       <div className="font-bold">{testimonials[currentTestimonialIndex].name}</div>
                       <div className="text-indigo-200 text-sm">{testimonials[currentTestimonialIndex].role}</div>
                     </div>
                   </div>
                 </motion.div>
               </AnimatePresence>

               {/* Controls */}
               <div className="flex justify-center gap-4 mt-8">
                 <button onClick={prevTestimonial} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
                   <ChevronLeft size={20} />
                 </button>
                 <button onClick={nextTestimonial} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
                   <ChevronRight size={20} />
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 Stats Section */}
      <section className="py-20 bg-gray-900 text-white border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-8 text-center hover:bg-gray-800/50 transition-colors rounded-xl group cursor-default">
                <div className="flex justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ❓ FAQ Accordion */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about the product and billing.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
         <div className="container mx-auto px-6 relative z-10 text-center">
           <div className="max-w-3xl mx-auto">
             <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ready to Build Your Dream Team?</h2>
             <p className="text-xl text-gray-600 mb-10">Join thousands of fast-growing companies and start hiring the best developers today.</p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/register"
                  className="inline-block px-10 py-5 bg-blue-600 text-white text-lg font-bold rounded-full shadow-xl hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
                >
                  Start Your Free Trial
                </Link>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="inline-block px-10 py-5 bg-white text-gray-900 border border-gray-200 text-lg font-bold rounded-full shadow-md hover:bg-gray-50 hover:scale-105 transition-transform duration-300"
                >
                  Contact Sales
                </button>
             </div>
             <p className="mt-6 text-sm text-gray-500">No credit card required. Cancel anytime.</p>
           </div>
         </div>
      </section>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Contact Sales Team"
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="john@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
              <option>1-10 employees</option>
              <option>11-50 employees</option>
              <option>51-200 employees</option>
              <option>200+ employees</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-24"
              placeholder="Tell us about your hiring needs..."
            ></textarea>
          </div>
          <button 
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg mt-2"
          >
            Send Message
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default Landing;