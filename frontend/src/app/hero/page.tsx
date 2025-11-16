'use client';

import { useState, useEffect, useRef } from 'react';
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
  Star,
  ChevronDown
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
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Show CTA after hero animation
    const timer = setTimeout(() => {
      setShowCTA(true);
      
      // Auto-scroll to CTA after showing it (pitch deck style)
      setTimeout(() => {
        if (ctaRef.current) {
          ctaRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
        
        // Show scroll hint after auto-scroll
        setTimeout(() => {
          setShowScrollHint(true);
        }, 1000);
      }, 800);
    }, 2500);

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
                  ref={ctaRef}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="space-y-6 relative"
                >
                  {/* Attention-grabbing header with animated gradient */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative"
                  >
                    {/* Scroll hint animation */}
                    <AnimatePresence>
                      {showScrollHint && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-center"
                        >
                          <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="flex flex-col items-center text-primary-300"
                          >
                            <ChevronDown className="w-6 h-6" />
                            <span className="text-xs mt-1 font-medium">Your journey starts here</span>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.h2
                      className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 to-white mb-4"
                      animate={{
                        backgroundImage: [
                          'linear-gradient(90deg, #ffffff 0%, #bfdbfe 50%, #ffffff 100%)',
                          'linear-gradient(90deg, #bfdbfe 0%, #ffffff 50%, #bfdbfe 100%)',
                          'linear-gradient(90deg, #ffffff 0%, #bfdbfe 50%, #ffffff 100%)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      Start Your Free Year
                    </motion.h2>
                  </motion.div>
                  
                  {/* Promotional code with sparkle effect */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="relative"
                  >
                    <div className="bg-gradient-to-r from-primary-500 to-primary-400 rounded-2xl p-1 inline-block relative overflow-hidden">
                      {/* Sparkle effect overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      <div className="bg-neutral-900 rounded-xl px-6 py-3 relative z-10">
                        <span className="text-primary-300 font-mono text-lg font-bold">
                          Code: JUNCTION2025
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Ultra vibrant download button */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <div className="relative group">
                      {/* Outer glow ring */}
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-3xl blur-lg pointer-events-none"
                        animate={{
                          opacity: [0.7, 1, 0.7],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      {/* Main button */}
                      <motion.button
                        onClick={() => router.push('/setup')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 flex items-center space-x-3 overflow-hidden border-2 border-primary-300/50"
                        animate={{
                          boxShadow: [
                            '0 20px 60px rgba(74, 120, 255, 0.4)',
                            '0 25px 80px rgba(74, 120, 255, 0.6)',
                            '0 20px 60px rgba(74, 120, 255, 0.4)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {/* Animated shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            repeatDelay: 1,
                            ease: 'linear' 
                          }}
                        />
                        
                        {/* Start icon with rotation */}
                        <motion.div
                          animate={{ 
                            rotate: [0, -10, 10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="relative z-10"
                        >
                          <ArrowRight className="w-6 h-6" />
                        </motion.div>
                        
                        <span className="relative z-10 font-extrabold tracking-wide">
                          Start here
                        </span>
                        
                        {/* Particle effect */}
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                              top: '20%',
                              left: `${30 + i * 20}%`
                            }}
                            animate={{
                              y: [-5, -15, -5],
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                              ease: 'easeInOut'
                            }}
                          />
                        ))}
                      </motion.button>

                      {/* Pulsing border effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-primary-400 pointer-events-none"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    
                    {/* Secondary button with subtle animation */}
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 text-white px-8 py-4 rounded-2xl font-medium border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-3 backdrop-blur-sm"
                    >
                      <Share className="w-5 h-5" />
                      <span>Share with Friends</span>
                    </motion.button>
                  </motion.div>

                  {/* Trust indicators with animation */}
                  <motion.p 
                    className="text-neutral-400 text-sm mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  >
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-green-400 font-semibold"
                    >
                      ✓
                    </motion.span>
                    {" "}No credit card required • Cancel anytime • Privacy guaranteed
                  </motion.p>

                  {/* Urgency indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full border border-amber-500/30"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-amber-400 rounded-full"
                    />
                    <span className="text-sm font-medium">Limited time: Free first year for JUNCTION attendees</span>
                  </motion.div>
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
                    &ldquo;{testimonial.quote}&rdquo;
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
            © 2025 Aurora Health. Made with ❤️ for JUNCTION 2025
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
