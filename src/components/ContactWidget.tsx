import { Phone, Mail, CheckSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactWidget = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 mt-20 mb-24 animate-fade-in-up">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900/30 to-slate-900 border border-rose-500/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-left backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/2"></div>

        <div className="z-10 max-w-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Custom Engagement Programs
          </h3>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Need a tailored approach? Our certified security engineers architect comprehensive assessments specific to your infrastructure, compliance needs, and risk profile.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <CheckSquare size={18} className="text-emerald-500 flex-shrink-0" />
              <span>Manual Pen-Testing</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <CheckSquare size={18} className="text-emerald-500 flex-shrink-0" />
              <span>Red Team Ops</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <CheckSquare size={18} className="text-emerald-500 flex-shrink-0" />
              <span>Compliance Audits</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <CheckSquare size={18} className="text-emerald-500 flex-shrink-0" />
              <span>Architecture Review</span>
            </div>
          </div>
        </div>

        <div className="z-10 flex flex-col gap-3 w-full md:w-auto">
          <Link
            to="/contact"
            className="group px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold rounded-lg transition-all shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-rose-500/40"
          >
            <Phone size={18} />
            Book Consultation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white font-semibold rounded-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <Mail size={18} />
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactWidget;
