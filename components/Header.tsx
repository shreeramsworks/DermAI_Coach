import React, { useState, useEffect } from 'react';
import { HeartPulse, Menu, X } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = React.memo(({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; value: Page }[] = [
    { label: 'Home', value: 'HOME' },
    { label: 'About', value: 'ABOUT' },
    { label: 'Features', value: 'FEATURES' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled || mobileMenuOpen 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-200' 
          : 'bg-slate-50/95 backdrop-blur-md border-slate-200 shadow-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => handleNavClick('HOME')}
          >
            <div className="bg-teal-100 p-2 rounded-xl group-hover:bg-teal-200 transition-colors">
              <HeartPulse className="w-6 h-6 text-teal-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">DermAI Coach</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => handleNavClick(link.value)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === link.value 
                    ? 'text-teal-600' 
                    : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('HOME')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg active:scale-95"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 absolute w-full px-4 py-4 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => handleNavClick(link.value)}
              className={`block w-full text-left py-2 px-4 rounded-lg text-base font-medium ${
                currentPage === link.value 
                  ? 'bg-teal-50 text-teal-700' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button 
              onClick={() => handleNavClick('HOME')}
              className="w-full bg-teal-600 text-white font-semibold py-3 rounded-xl mt-2 active:bg-teal-700"
            >
              Start Analysis
            </button>
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;