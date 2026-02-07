
import React, { useState, useEffect } from 'react';
import { Page } from '../types';

export const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center font-bold tracking-tight select-none ${className}`}>
    <span className="text-black">Noob</span>
    <span className="text-[#FF0000] font-mono mx-0.5">{"{"}</span>
    <span className="text-black">dev</span>
    <span className="text-[#FF0000] font-mono mx-0.5">{"}"}</span>
  </div>
);

// Fix: Make children optional to resolve "Property 'children' is missing in type '{}' but required" errors in JSX
export const BraceWrap = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <span className={className}>
    <span className="text-[#FF0000] font-mono">{"{"}</span>
    {children}
    <span className="text-[#FF0000] font-mono">{"}"}</span>
  </span>
);

export const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Services', value: 'services' },
    { label: 'Showcase', value: 'showcase' },
    { label: 'Blog', value: 'blog' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => setPage('home')} className="cursor-pointer">
          <Logo className="text-2xl" />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => setPage(link.value)}
              className={`text-sm font-medium transition-colors hover:text-[#FF0000] ${
                currentPage === link.value ? 'text-[#FF0000] border-b-2 border-[#FF0000]' : 'text-gray-600'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => setPage('contact')}
            className="bg-[#FF0000] text-white px-6 py-2 rounded-sm text-sm font-bold hover:bg-black transition-all duration-300"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl py-6 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => { setPage(link.value); setIsMenuOpen(false); }}
              className={`text-left text-lg font-bold ${currentPage === link.value ? 'text-[#FF0000]' : 'text-gray-900'}`}
            >
              {currentPage === link.value ? `{${link.label}}` : link.label}
            </button>
          ))}
          <button 
            onClick={() => { setPage('contact'); setIsMenuOpen(false); }}
            className="bg-[#FF0000] text-white py-4 font-bold"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div>
            <Logo className="text-xl mb-4" />
            <p className="text-sm font-bold text-black mb-1">NO-CODE AUTOMATION STUDIO</p>
            <p className="text-xs text-gray-500 font-mono mb-4">estd 2025</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Democratizing automation for businesses worldwide. Built by developers, designed for everyone.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 font-mono text-sm underline decoration-[#FF0000]">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Showcase', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <button onClick={() => setPage(item.toLowerCase() as Page)} className="text-gray-600 hover:text-[#FF0000] text-sm transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 font-mono text-sm underline decoration-[#FF0000]">Services</h4>
            <ul className="space-y-3">
              {['AI Automation', 'Web Development', 'SEO Services', 'CRM Solutions'].map((item) => (
                <li key={item}>
                  <button onClick={() => setPage('services')} className="text-gray-600 hover:text-[#FF0000] text-sm transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 font-mono text-sm underline decoration-[#FF0000]">Connect</h4>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4 font-mono leading-none">Subscribe to weekly tips:</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-gray-50 border border-gray-200 px-4 py-2 text-sm w-full focus:outline-none focus:border-[#FF0000]" 
                />
                <button className="bg-[#FF0000] text-white px-4 py-2 hover:bg-black transition-colors">
                  →
                </button>
              </div>
            </div>
            <div className="flex space-x-4">
              {['LinkedIn', 'Twitter', 'GitHub'].map(social => (
                <button key={social} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#FF0000] hover:text-[#FF0000] transition-all">
                  <span className="text-xs font-mono">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© 2025 Noobdev. All rights reserved.</p>
          <div className="flex space-x-6">
            <button className="hover:text-[#FF0000]">Privacy</button>
            <button className="hover:text-[#FF0000]">Terms</button>
            <button className="hover:text-[#FF0000]">Cookies</button>
          </div>
          <p>Made with <span className="text-[#FF0000]">{"{❤️}"}</span> by Noobdev</p>
        </div>
      </div>
    </footer>
  );
};
