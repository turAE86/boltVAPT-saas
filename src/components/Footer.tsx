import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-slate-900 bg-[#0F172A]/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 text-rose-500 mb-4">
            <Shield className="h-6 w-6 fill-rose-500/20" />
            <span className="text-lg font-bold tracking-wider text-white">
              VAPT<span className="text-slate-400 font-light">TOOL</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Next-generation security scanning for the modern enterprise. Detect threats before
            they become breaches.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/scanner" className="hover:text-rose-400 transition-colors">Scanner Engine</Link></li>
            <li><Link to="/services" className="hover:text-rose-400 transition-colors">Services</Link></li>
            <li><Link to="/pricing" className="hover:text-rose-400 transition-colors">Pricing</Link></li>
            <li><a href="#api" className="hover:text-rose-400 transition-colors">API Access</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#privacy" className="hover:text-rose-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-rose-400 transition-colors">Terms & Conditions</a></li>
            <li><a href="#sla" className="hover:text-rose-400 transition-colors">SLA</a></li>
            <li><a href="#compliance" className="hover:text-rose-400 transition-colors">Compliance</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <a href="mailto:sales@vapttool.io" className="hover:text-rose-400 transition-colors">sales@vapttool.io</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <a href="tel:+18885550123" className="hover:text-rose-400 transition-colors">+1 (888) 555-0123</a>
            </li>
            <li className="mt-4 flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-rose-600 cursor-pointer transition-colors text-xs font-bold">X</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-rose-600 cursor-pointer transition-colors text-xs font-bold">In</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
        <p>© 2025 VAPT Tool Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#security" className="hover:text-slate-400 transition-colors">Security</a>
          <a href="#status" className="hover:text-slate-400 transition-colors">Status</a>
          <a href="#docs" className="hover:text-slate-400 transition-colors">Docs</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
