import React, { useState, useRef, useEffect } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SkinAnalyzer from './components/SkinAnalyzer';
import Testimonials from './components/Testimonials';
import { ScanLine, BrainCircuit, LineChart, Cookie, ShieldAlert, Check, Globe, FileText, Lock, Camera, Send, ArrowRight, AlertTriangle } from 'lucide-react';

// Reusable wrapper for content pages with a clean white background
const PageContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="pt-28 pb-20 min-h-screen bg-white animate-fadeIn">
    <div className="max-w-4xl mx-auto px-6">
      <div className="border-b border-slate-100 pb-8 mb-8">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{title}</h1>
      </div>
      <div className="prose prose-slate prose-lg max-w-none text-slate-600">
        {children}
      </div>
    </div>
  </div>
);

// Reusable section component for the Home page
const Section: React.FC<{ 
  className?: string; 
  children: React.ReactNode;
  id?: string;
  forwardRef?: React.Ref<HTMLDivElement>;
}> = ({ className, children, id, forwardRef }) => (
  <section id={id} ref={forwardRef} className={`py-20 px-4 sm:px-6 lg:px-8 w-full ${className}`}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [contactStatus, setContactStatus] = useState<'idle' | 'sent'>('idle');
  const analyzerRef = useRef<HTMLDivElement>(null);

  // --- Routing Logic (History API) ---
  const getPageFromPath = (path: string): Page => {
    switch (path) {
      case '/about': return 'ABOUT';
      case '/features': return 'FEATURES';
      case '/privacy': return 'PRIVACY';
      case '/terms': return 'TERMS';
      case '/contact': return 'CONTACT';
      case '/testimonials': return 'TESTIMONIALS';
      case '/cookie-policy': return 'COOKIE_POLICY';
      case '/disclaimer': return 'DISCLAIMER';
      case '/how-it-works': return 'HOW_IT_WORKS';
      default: return 'HOME';
    }
  };

  const getPathFromPage = (page: Page): string => {
    switch (page) {
      case 'HOME': return '/';
      case 'ABOUT': return '/about';
      case 'FEATURES': return '/features';
      case 'PRIVACY': return '/privacy';
      case 'TERMS': return '/terms';
      case 'CONTACT': return '/contact';
      case 'TESTIMONIALS': return '/testimonials';
      case 'COOKIE_POLICY': return '/cookie-policy';
      case 'DISCLAIMER': return '/disclaimer';
      case 'HOW_IT_WORKS': return '/how-it-works';
      default: return '/';
    }
  };

  useEffect(() => {
    // Handle back/forward browser buttons
    const onPopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };

    // Set initial page
    setCurrentPage(getPageFromPath(window.location.pathname));

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (page: Page) => {
    const path = getPathFromPage(page);
    window.history.pushState(null, '', path);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // -----------------------------------

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sent');
    setTimeout(() => {
      setContactStatus('idle');
    }, 3000);
  };

  const scrollToAnalyzer = () => {
    if (currentPage !== 'HOME') {
      handleNavigate('HOME');
      // Wait for navigation then scroll
      setTimeout(() => {
        const el = document.getElementById('analyzer');
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      analyzerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'HOME':
        return (
          <>
            {/* 1. Hero Section (White Background) */}
            <div className="bg-white relative">
              <Hero onStart={scrollToAnalyzer} onLearnMore={() => handleNavigate('HOW_IT_WORKS')} />
            </div>
            
            {/* 2. Features/How-it-works Section (Slate-100 Background for Contrast) */}
            <Section className="bg-slate-100 border-y border-slate-200" id="how-it-works">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-teal-600 font-semibold tracking-wide text-sm uppercase">Simple Process</span>
                <h2 className="text-3xl font-bold text-slate-900 mt-2">How DermAI Coach Works</h2>
                <p className="text-slate-600 mt-4 text-lg">
                  We combine advanced image analysis with trusted medical knowledge bases to give you clarity in seconds.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <ScanLine className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">1. Snap & Upload</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Take a clear photo of the skin area or describe your symptoms in detail using our secure form.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                   <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <BrainCircuit className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">2. AI Analysis</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our AI scans visual patterns and cross-references them with high-authority medical sources on Google.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                   <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <LineChart className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">3. Track & Manage</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Get personalized wellness tips, trusted resource links, and log your progress over time.
                  </p>
                </div>
              </div>
            </Section>

            {/* 3. Testimonials Section (White Background) */}
            <Section className="bg-white border-b border-slate-200" id="testimonials">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-teal-600 font-semibold tracking-wide text-sm uppercase">Community</span>
                <h2 className="text-3xl font-bold text-slate-900 mt-2">Trusted by Users</h2>
                <p className="text-slate-600 mt-4 text-lg">
                  Join thousands who are managing their skin health journey with confidence and clarity.
                </p>
              </div>
              <Testimonials />
            </Section>

            {/* 4. Analyzer Section (Teal-50 Background for Branded "App" feel) */}
            <Section forwardRef={analyzerRef} className="bg-teal-50/50 scroll-mt-20 border-b border-slate-200" id="analyzer">
              <SkinAnalyzer />
            </Section>
          </>
        );
      
      case 'HOW_IT_WORKS':
        return (
          <PageContainer title="How It Works">
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              DermAI Coach uses state-of-the-art artificial intelligence combined with real-time medical knowledge grounding to provide you with instant, reliable skin wellness insights. Here is a look under the hood.
            </p>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
                    <Lock className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">1. Secure & Private Input</h3>
                  <p className="text-slate-600 leading-relaxed">
                    When you upload an image or type a description, your data is processed securely. We prioritize privacy by design: your images are analyzed in real-time and are not permanently stored on our servers for this session.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                    <BrainCircuit className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">2. Advanced Vision Analysis</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our system uses the <strong>Gemini 3</strong> multimodal AI model. It breaks down the visual components of your skin photo—looking at texture, color, and distribution—just like a skilled observer would note patterns, but without making a medical diagnosis.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                    <Globe className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">3. Medical Knowledge Grounding</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Unlike standard chatbots that might "hallucinate," DermAI Coach is connected to <strong>Google Search Grounding</strong>. 
                  </p>
                  <p className="text-slate-600 mt-2 leading-relaxed">
                    When the AI sees a symptom, it performs a real-time search against trusted medical repositories (like major health organizations and medical journals) to verify its wellness suggestions. This ensures the tips you receive are evidence-based and up-to-date.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                    <FileText className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">4. Actionable Wellness Summary</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Finally, we compile everything into a simple, easy-to-read report. You get a visual observation summary, a symptom check, and 1-3 practical wellness tips (like "apply a cool compress" or "use fragrance-free moisturizer") along with links to the trusted articles we found.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Ready to try it?</h3>
              <button 
                onClick={() => handleNavigate('HOME')}
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-teal-500/20"
              >
                Start Analysis
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </PageContainer>
        );

      case 'ABOUT':
        return (
          <PageContainer title="About Us">
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              DermAI Coach was founded on a simple mission: to empower individuals living with chronic skin conditions through technology and evidence-based wellness.
            </p>
            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
              <p className="italic text-teal-800">
                "We believe that consistent tracking and reliable information are the first steps towards better skin health."
              </p>
            </div>
            <p className="mb-6">
              We understand that managing skin health can be a daily challenge. Our AI-powered platform provides a private, secure, and supportive space to track your journey, identify triggers, and find reliable wellness information.
            </p>
            <p>
              While we are not a replacement for professional medical advice, we strive to be the best companion for your day-to-day management, helping you communicate better with your dermatologist.
            </p>
          </PageContainer>
        );

      case 'FEATURES':
        return (
          <PageContainer title="Features">
            <p className="text-lg text-slate-600 mb-10">Explore the tools we've built to help you manage your skin health journey effectively.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-teal-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Camera className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Visual Tracking</h3>
                <p className="text-slate-600">Upload photos securely to monitor visual changes over time. Our AI helps you note subtle differences you might miss.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Send className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Smart Suggestions</h3>
                <p className="text-slate-600">Receive personalized, non-medical wellness tips based on your logs, such as moisturizing techniques or stress management.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <BrainCircuit className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Trusted Resources</h3>
                <p className="text-slate-600">We automatically search high-authority medical sources to provide you with relevant reading material for your specific symptoms.</p>
              </div>
            </div>
          </PageContainer>
        );
      
      case 'TESTIMONIALS':
        return (
          <PageContainer title="What Our Users Say">
            <p className="text-lg text-slate-600 mb-10">
              Read stories from our community about how they use DermAI Coach to manage their skin health.
            </p>
            <Testimonials />
          </PageContainer>
        );

      case 'COOKIE_POLICY':
        return (
          <PageContainer title="Cookie Policy">
            <div className="flex items-center gap-3 mb-6 bg-blue-50 p-4 rounded-xl text-blue-800">
              <Cookie className="w-6 h-6 flex-shrink-0" />
              <p className="font-medium">We believe in transparency about how we use your data.</p>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. What are cookies?</h3>
            <p className="mb-4">
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to remember your actions and preferences over a period of time.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. How we use cookies</h3>
            <p className="mb-4">
              DermAI Coach uses cookies for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-slate-600">
              <li><strong>Essential Cookies:</strong> Necessary for the website to function properly, such as remembering your session state.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the website by collecting and reporting information anonymously.</li>
              <li><strong>Preference Cookies:</strong> Allow the website to remember choices you make (such as your preferred language) to provide enhanced features.</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Managing Cookies</h3>
            <p>
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a site.
            </p>
          </PageContainer>
        );

      case 'DISCLAIMER':
        return (
          <PageContainer title="Medical Disclaimer">
             <div className="bg-rose-50 border-l-4 border-rose-500 p-8 mb-10 rounded-r-xl shadow-sm">
               <div className="flex items-start gap-4">
                 <ShieldAlert className="w-8 h-8 text-rose-600 flex-shrink-0" />
                 <div>
                   <h3 className="text-xl font-bold text-rose-800 mb-2">Important Medical Notice</h3>
                   <p className="text-rose-700 leading-relaxed">
                     DermAI Coach is designed for informational and educational purposes only. It is <strong>NOT</strong> a substitute for professional medical advice, diagnosis, or treatment.
                   </p>
                 </div>
               </div>
             </div>

             <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Not a Medical Device</h3>
             <p className="mb-6">
               The content, including text, graphics, images, and other material contained on this website ("Content") are for informational purposes only. The Content is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
             </p>

             <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Consult Your Doctor</h3>
             <p className="mb-6">
               Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
             </p>

             <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Emergency Situations</h3>
             <p className="mb-6">
               If you think you may have a medical emergency, call your doctor or 911 immediately. DermAI Coach does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Site.
             </p>

             <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Accuracy of Information</h3>
             <p className="mb-6">
               While we strive to provide accurate and up-to-date information through our AI analysis and search features, medical knowledge is constantly evolving. We cannot guarantee that all information provided is completely current or exhaustive.
             </p>
          </PageContainer>
        );

      case 'PRIVACY':
        return (
          <PageContainer title="Privacy Policy">
            <p className="mb-6 font-medium"><strong>Effective Date:</strong> January 1, 2024</p>
            <p className="mb-6">
              At DermAI Coach, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">1. Information We Collect</h3>
            <p className="mb-4">
              We collect images and text descriptions you voluntarily provide for analysis. We do not store this data permanently on our servers after the session ends in this preview version.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">2. How We Use Information</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>To provide wellness analysis and summaries.</li>
              <li>To improve our AI models (only with explicit consent).</li>
              <li>We do <strong>not</strong> sell your data to third parties.</li>
            </ul>
          </PageContainer>
        );

      case 'TERMS':
        return (
          <PageContainer title="Terms of Service">
             <p className="mb-6 text-lg">
              By accessing and using DermAI Coach, you agree to be bound by these Terms of Service.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Medical Disclaimer</h3>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <p className="text-amber-800 font-bold">
                  DermAI Coach is NOT a medical device and does not provide medical diagnoses. Always consult a healthcare professional for medical advice.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">User Responsibilities</h3>
            <p>
              You are responsible for maintaining the confidentiality of your information and ensuring that your use of the service complies with local laws. You must be at least 18 years of age to use this service.
            </p>
          </PageContainer>
        );

      case 'CONTACT':
        return (
          <PageContainer title="Contact Us">
            <p className="text-xl text-slate-600 mb-10">We'd love to hear from you. Whether you have a question about features, trials, or just want to say hello.</p>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 max-w-2xl">
               <form className="space-y-6" onSubmit={handleContactSubmit}>
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                   <input type="text" className="w-full rounded-xl border-slate-200 bg-white p-3.5 border focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition shadow-sm" placeholder="Your name" required />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                   <input type="email" className="w-full rounded-xl border-slate-200 bg-white p-3.5 border focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition shadow-sm" placeholder="you@example.com" required />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                   <textarea className="w-full rounded-xl border-slate-200 bg-white p-3.5 border focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition shadow-sm" rows={4} placeholder="How can we help?" required></textarea>
                 </div>
                 <button 
                  type="submit" 
                  disabled={contactStatus === 'sent'}
                  className={`w-full font-bold py-4 px-6 rounded-xl transition shadow-lg flex items-center justify-center gap-2 ${
                    contactStatus === 'sent' 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/20' 
                      : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-500/20'
                  }`}
                 >
                   {contactStatus === 'sent' ? (
                     <>
                      <Check className="w-5 h-5" />
                      Message Sent!
                     </>
                   ) : (
                     'Send Message'
                   )}
                 </button>
               </form>
            </div>
          </PageContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-grow w-full" role="main">
        {renderContent()}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Sticky Disclaimer (Always Visible) */}
      <div className="fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 z-40 text-center shadow-lg-up" role="contentinfo">
         <p className="text-xs text-slate-500 max-w-4xl mx-auto flex items-center justify-center gap-2">
           <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
           <span><strong>Disclaimer:</strong> Not a medical device. For informational use only. Consult a doctor for medical concerns.</span>
         </p>
      </div>
    </div>
  );
};

export default App;