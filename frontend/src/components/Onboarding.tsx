'use client';

import { useState } from 'react';
import { RadioTower, Activity, Clock, Sparkles, Moon, ArrowRight } from 'lucide-react';

interface OnboardingStep {
  title: string;
  description: string;
  icon: any;
  gradient: string;
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to Aurora',
    description: 'Your silent companion for migraine prediction. No manual tracking, just intelligent insights.',
    icon: Sparkles,
    gradient: 'from-purple-400/20 to-indigo-400/20'
  },
  {
    title: 'Zero Input Required',
    description: 'Aurora learns from passive signals like sleep patterns, weather changes, and calendar events.',
    icon: Moon,
    gradient: 'from-indigo-400/20 to-blue-400/20'
  },
  {
    title: 'Your 24h Radar',
    description: 'Get a simple risk prediction every morning. One number, one explanation, one action.',
    icon: RadioTower,
    gradient: 'from-blue-400/20 to-cyan-400/20'
  },
  {
    title: 'Passive Signals',
    description: 'Monitor the factors that matter without lifting a finger. We track, you relax.',
    icon: Activity,
    gradient: 'from-cyan-400/20 to-teal-400/20'
  },
  {
    title: 'Pattern Recognition',
    description: 'Over time, Aurora learns your unique patterns and provides increasingly accurate predictions.',
    icon: Clock,
    gradient: 'from-teal-400/20 to-emerald-400/20'
  }
];

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 bg-gradient-calm z-[200] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-md mx-auto px-6 w-full">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-12 animate-fade-in">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentStep
                  ? 'w-8 bg-primary'
                  : index < currentStep
                  ? 'w-1.5 bg-primary/50'
                  : 'w-1.5 bg-primary/20'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-aurora animate-scale-in`}>
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                <Icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-extralight text-foreground/90 mb-4">
              {step.title}
            </h2>
            <p className="text-base text-muted-foreground font-light leading-relaxed px-4">
              {step.description}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={handleSkip}
            className="text-muted-foreground font-light text-sm hover:text-foreground transition-colors duration-200"
          >
            Skip
          </button>

          <button
            onClick={handleNext}
            className="glass-card px-8 py-4 rounded-full shadow-calm hover:shadow-aurora transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
          >
            <span className="font-light text-foreground/90">
              {currentStep === steps.length - 1 ? "Let's Begin" : 'Next'}
            </span>
            <ArrowRight className="w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Skip All Link */}
        {currentStep === 0 && (
          <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={handleSkip}
              className="text-xs text-muted-foreground/60 font-light hover:text-muted-foreground transition-colors duration-200"
            >
              I've used Aurora before
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
