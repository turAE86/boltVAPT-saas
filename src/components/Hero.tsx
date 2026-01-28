import { Zap, ArrowRight, Globe, Lock, Cpu, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="pt-32 pb-20 flex flex-col items-center px-6 max-w-5xl mx-auto w-full">
      <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-8 backdrop-blur-sm">
        <Zap size={16} className="animate-pulse" />
        <span>Latest: Multi-cloud CSPM with AI-powered risk analysis</span>
      </div>

      <h1 className="animate-fade-in-up text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight max-w-4xl leading-tight text-center">
        Enterprise-Grade <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-red-500">
          Security Scanning
        </span>
      </h1>

      <p className="animate-fade-in-up text-slate-300 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed text-center">
        Comprehensive vulnerability assessments and penetration testing powered by AI. Detect threats before attackers do with real-time insights and actionable remediation guidance.
      </p>

      <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 mb-16">
        <Link
          to="/scanner"
          className="group relative px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold rounded-lg transition-all shadow-xl shadow-rose-500/30 flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-rose-500/50"
        >
          Launch Scanner
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </Link>

        <Link
          to="/contact"
          className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white font-bold rounded-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2"
        >
          <Calendar size={18} />
          Schedule Consultation
        </Link>

        <Link
          to="/services"
          className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white font-bold rounded-lg transition-all backdrop-blur-sm"
        >
          Explore Services
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl animate-fade-in-up">
        {[
          {
            icon: Globe,
            title: "Global Coverage",
            desc: "Distributed scanning nodes across 12 regions with instant compliance validation",
            metric: "99.9% Uptime"
          },
          {
            icon: Lock,
            title: "Zero-Trust Security",
            desc: "Integrates with IAM, RBAC, and multi-factor authentication policies",
            metric: "256-bit Encryption"
          },
          {
            icon: Cpu,
            title: "AI-Powered Analysis",
            desc: "Machine learning models identify vulnerabilities faster with fewer false positives",
            metric: "2.5s Response"
          }
        ].map((feature, i) => (
          <div
            key={i}
            className="group bg-gradient-to-br from-slate-800/40 to-slate-900/20 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50 hover:border-rose-500/50 transition-all duration-300 hover:bg-gradient-to-br hover:from-slate-800/60 hover:to-slate-900/40 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-rose-500/20 to-rose-600/10 flex items-center justify-center mb-4 text-rose-400 group-hover:text-rose-300 transition-colors">
              <feature.icon size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2 group-hover:text-rose-300 transition-colors">{feature.title}</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">{feature.desc}</p>
            <div className="inline-block px-2 py-1 bg-rose-500/10 border border-rose-500/20 rounded text-xs font-semibold text-rose-300">
              {feature.metric}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
