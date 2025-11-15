'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Shield, 
  Zap, 
  Moon,
  Activity,
  Download,
  Share,
  Star
} from 'lucide-react';

interface FloatingElement {
  id: string;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  duration: number;
}

export default function HeroPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Show CTA after hero animation
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, 2000);

    // Generate floating elements
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: `float-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 0.5,
      opacity: 0.3 + Math.random() * 0.4,
      duration: 20 + Math.random() * 10
    }));
    setFloatingElements(elements);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Heart,
      title: 'Predictive Health',
      description: 'AI-powered insights that adapt to your unique patterns'
    },
    {
      icon: Shield,
      title: 'Clinical Privacy',
      description: 'Hospital-grade security with zero data sharing'
    },
    {
      icon: Zap,
      title: 'Real-time Learning',
      description: 'Continuous adaptation without manual input'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      title: 'Cardiologist, UCSF',
      quote: 'Aurora represents the future of preventive healthcare.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      title: 'Tech Executive',
      quote: 'Finally, health tech that actually understands me.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      title: 'Wellness Coach',
      quote: 'The most intuitive health app I\'ve ever used.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 relative overflow-hidden">
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              opacity: element.opacity,
              scale: element.scale
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [element.opacity, element.opacity * 0.5, element.opacity]
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Aurora Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="mb-8"
            >
              <motion.div
                className="w-32 h-32 mx-auto mb-8 relative"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-full shadow-2xl">
                  <motion.div
                    className="absolute inset-2 bg-gradient-to-br from-white/20 to-white/5 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                className="text-7xl md:text-8xl font-light text-white mb-4 tracking-tight"
              >
                Aurora
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                className="text-2xl md:text-3xl text-neutral-300 font-light"
              >
                Predictive wellness that learns you
              </motion.p>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
              transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.2, duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Section */}
            <AnimatePresence>
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                    Start Your Free Year
                  </h2>
                  
                  <div className="bg-gradient-to-r from-primary-500 to-primary-400 rounded-2xl p-1 inline-block">
                    <div className="bg-neutral-900 rounded-xl px-6 py-3">
                      <span className="text-primary-300 font-mono text-lg">
                        Code: JUNCTION2025
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <motion.button
                      onClick={() => router.push('/setup')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-primary-500 to-primary-400 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 flex items-center space-x-3"
                    >
                      <Download className="w-6 h-6" />
                      <span>Download Aurora</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 text-white px-8 py-4 rounded-2xl font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
                    >
                      <Share className="w-5 h-5" />
                      <span>Share with Friends</span>
                    </motion.button>
                  </div>

                  <p className="text-neutral-400 text-sm mt-6">
                    No credit card required • Cancel anytime • Privacy guaranteed
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: showCTA ? 1 : 0, y: showCTA ? 0 : 40 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="border-t border-white/10 bg-white/5 backdrop-blur-sm py-12"
        >
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-center text-white text-xl font-semibold mb-8">
              Trusted by healthcare professionals worldwide
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.2, duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-white mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="text-neutral-300">
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm">{testimonial.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: showCTA ? 1 : 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center py-8 px-6 border-t border-white/10"
        >
          <p className="text-neutral-400 text-sm">
            © 2024 Aurora Health. Made with ❤️ for JUNCTION 2025
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
