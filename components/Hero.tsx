import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Activity } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onLearnMore: () => void;
}

const Hero: React.FC<HeroProps> = React.memo(({ onStart, onLearnMore }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden" aria-label="Introduction">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">AI-Powered Wellness</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Clarity for your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                Skin Journey
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Track symptoms, identify patterns, and receive evidence-based wellness insights. 
              Your intelligent companion for managing eczema, acne, and psoriasis care.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-all shadow-lg shadow-teal-500/30 hover:-translate-y-1"
                aria-label="Start your free skin check-in analysis"
              >
                Start Free Check-in
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={onLearnMore}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-slate-600 hover:bg-white hover:text-slate-900 transition-all border border-transparent hover:border-slate-200"
              >
                How it works
              </button>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm">Private & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm">AI Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                <span className="text-sm">Daily Tracking</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="flex-1 w-full max-w-[500px] lg:max-w-none">
            <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Floating Badge */}
              <div className="absolute -left-6 top-10 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                <div className="bg-rose-100 p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Symptom Intensity</p>
                  <p className="text-sm font-bold text-slate-800">Improving</p>
                </div>
              </div>

              {/* Main Card Content Simulation */}
              <div className="space-y-4">
                <div className="h-48 bg-slate-100 rounded-xl w-full overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800" 
                    alt="Visualization of healthy, clear skin on a woman" 
                    className="w-full h-full object-cover opacity-80" 
                    width="800"
                    height="600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-slate-100 rounded-full"></div>
                  <div className="h-4 w-1/2 bg-slate-100 rounded-full"></div>
                </div>
                <div className="pt-2 flex gap-2">
                  <div className="h-8 w-20 bg-teal-50 rounded-lg"></div>
                  <div className="h-8 w-20 bg-blue-50 rounded-lg"></div>
                </div>
              </div>

               {/* Another Floating Badge */}
               <div className="absolute -right-4 bottom-8 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slower">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">AI Coach</p>
                  <p className="text-sm font-bold text-slate-800">Analysis Ready</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default Hero;