import React from 'react';
import { HeartPulse, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = React.memo(({ onNavigate }) => {
  const handleSocialClick = () => {
    onNavigate('HOME');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-teal-500/10 p-2 rounded-lg">
                <HeartPulse className="w-6 h-6 text-teal-400" />
              </div>
              <span className="text-xl font-bold tracking-tight">DermAI Coach</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering your skin health journey with artificial intelligence and evidence-based wellness tracking.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => onNavigate('FEATURES')} className="hover:text-teal-400 transition-colors">Features</button>
              </li>
              <li>
                <button onClick={() => onNavigate('HOME')} className="hover:text-teal-400 transition-colors">Analyzer</button>
              </li>
              <li>
                <button onClick={() => onNavigate('TESTIMONIALS')} className="hover:text-teal-400 transition-colors">Testimonials</button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => onNavigate('ABOUT')} className="hover:text-teal-400 transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => onNavigate('CONTACT')} className="hover:text-teal-400 transition-colors">Contact</button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => onNavigate('PRIVACY')} className="hover:text-teal-400 transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => onNavigate('TERMS')} className="hover:text-teal-400 transition-colors">Terms of Service</button>
              </li>
              <li>
                <button onClick={() => onNavigate('COOKIE_POLICY')} className="hover:text-teal-400 transition-colors">Cookie Policy</button>
              </li>
              <li>
                <button onClick={() => onNavigate('DISCLAIMER')} className="hover:text-teal-400 transition-colors">Disclaimer</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} DermAI Coach. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={handleSocialClick} className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></button>
            <button onClick={handleSocialClick} className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></button>
            <button onClick={handleSocialClick} className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></button>
            <button onClick={handleSocialClick} className="text-slate-400 hover:text-white transition-colors"><Mail className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;