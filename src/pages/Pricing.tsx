import { Check, Zap } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from '../components/LoginModal';

const Pricing = () => {
  const { user } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const tokenPackages = [
    {
      name: "Starter",
      tokens: 10,
      price: 299,
      description: "Perfect for individual security audits",
      features: [
        "10 Scan Tokens",
        "1 URL scan per token",
        "30-day token validity",
        "Basic vulnerability reports",
        "Email support"
      ],
      cta: "Buy Now",
      highlighted: false
    },
    {
      name: "Professional",
      tokens: 20,
      price: 598,
      description: "Best for regular security testing",
      features: [
        "20 Scan Tokens",
        "1 URL scan per token",
        "90-day token validity",
        "Advanced vulnerability analysis",
        "Detailed reports with remediation",
        "Priority support",
        "Save 1% per token"
      ],
      cta: "Buy Now",
      highlighted: true
    },
    {
      name: "Enterprise",
      tokens: 30,
      price: 897,
      description: "Ideal for continuous security monitoring",
      features: [
        "30 Scan Tokens",
        "1 URL scan per token",
        "180-day token validity",
        "Full vulnerability database access",
        "Comprehensive reports with priority fixes",
        "24/7 priority support",
        "Save 0% per token",
        "Account manager"
      ],
      cta: "Buy Now",
      highlighted: false
    }
  ];

  const scanLimits = [
    { limit: "Monthly Scan Cap", value: "5 scans per month per account" },
    { limit: "Token Usage", value: "1 token per scan" },
    { limit: "Token Validity", value: "30-180 days depending on package" },
    { limit: "Multiple URLs", value: "Each URL requires 1 token" }
  ];

  const handleBuyNow = (tokens: number, price: number) => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }

    console.log(`Purchasing ${tokens} tokens for ${price} paise`);

    alert(`Purchase would be processed: ${tokens} tokens for ₹${(price / 100).toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 pt-28 pb-20">
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(244, 63, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Flexible Token-Based Pricing</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Pay only for what you use. Buy scan tokens and perform unlimited vulnerability assessments with complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {tokenPackages.map((pkg, i) => (
            <div
              key={i}
              className={`rounded-2xl border backdrop-blur p-8 transition-all duration-300 flex flex-col ${
                pkg.highlighted
                  ? 'bg-gradient-to-b from-rose-950/40 to-slate-900/60 border-rose-500/60 lg:scale-105 lg:shadow-2xl lg:shadow-rose-500/25'
                  : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-900/50'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-rose-500 text-white text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{pkg.description}</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">₹{(pkg.price / 100).toFixed(0)}</span>
                  <span className="text-slate-400 text-sm">{pkg.tokens} tokens</span>
                </div>
                <p className="text-xs text-slate-400">₹{(pkg.price / pkg.tokens / 100).toFixed(0)} per token</p>
              </div>

              <button
                onClick={() => handleBuyNow(pkg.tokens, pkg.price)}
                className={`w-full px-6 py-3 rounded-lg font-semibold mb-8 transition-all duration-200 flex items-center justify-center gap-2 ${
                  pkg.highlighted
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <Zap size={18} />
                {pkg.cta}
              </button>

              <ul className="space-y-3 flex-1">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-slate-800/60 backdrop-blur rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-rose-400 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Purchase Tokens</h3>
              <p className="text-slate-400 text-sm">Choose a package and buy scan tokens</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-rose-400 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Start Scanning</h3>
              <p className="text-slate-400 text-sm">Enter your target URL and launch a scan</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-rose-400 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Get Results</h3>
              <p className="text-slate-400 text-sm">Receive detailed vulnerability reports instantly</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-rose-400 font-bold text-lg">4</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Fix Issues</h3>
              <p className="text-slate-400 text-sm">Follow remediation steps to secure your site</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-slate-800/60 backdrop-blur rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Scan Limits & Guidelines</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                <Zap size={20} className="text-rose-500" />
                Account Limits
              </h3>

              <div className="space-y-4">
                {scanLimits.map((item, i) => (
                  <div key={i} className="pb-4 border-b border-slate-800/40">
                    <p className="text-slate-400 text-sm font-medium">{item.limit}</p>
                    <p className="text-slate-300 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6">What Each Token Covers</h3>

              <div className="space-y-4">
                <div className="pb-4 border-b border-slate-800/40">
                  <p className="text-slate-300 flex items-center gap-2">
                    <Check size={16} className="text-emerald-500" />
                    One complete URL scan
                  </p>
                </div>

                <div className="pb-4 border-b border-slate-800/40">
                  <p className="text-slate-300 flex items-center gap-2">
                    <Check size={16} className="text-emerald-500" />
                    Full vulnerability assessment
                  </p>
                </div>

                <div className="pb-4 border-b border-slate-800/40">
                  <p className="text-slate-300 flex items-center gap-2">
                    <Check size={16} className="text-emerald-500" />
                    Detailed remediation recommendations
                  </p>
                </div>

                <div className="pb-4">
                  <p className="text-slate-300 flex items-center gap-2">
                    <Check size={16} className="text-emerald-500" />
                    Permanent scan history and reports
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-400 mb-4">Have questions about our pricing?</p>
          <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all border border-slate-700">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
