import { Globe, Server, Layers, Code } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Globe,
      title: "Web App Security",
      desc: "In-depth DAST and SAST scanning to identify OWASP Top 10 vulnerabilities in real-time.",
      color: "from-blue-500/20 to-blue-600/10"
    },
    {
      icon: Server,
      title: "Network Infrastructure",
      desc: "Internal and external network scanning to detect open ports, weak configs, and legacy services.",
      color: "from-cyan-500/20 to-cyan-600/10"
    },
    {
      icon: Layers,
      title: "Cloud Security",
      desc: "CSPM and workload protection for AWS, Azure, and GCP environments with compliance mapping.",
      color: "from-purple-500/20 to-purple-600/10"
    },
    {
      icon: Code,
      title: "API Security",
      desc: "Automated discovery and testing of REST, GraphQL, and SOAP endpoints for logic flaws.",
      color: "from-orange-500/20 to-orange-600/10"
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-[#0F172A]/50 to-[#0B1120] py-24 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Complete Threat Management
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Comprehensive protection across all attack surfaces. Our unified platform handles infrastructure, applications, APIs, and compliance requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
          {services.map((service, i) => (
            <div
              key={i}
              className={`group p-6 rounded-xl bg-gradient-to-br ${service.color} backdrop-blur-xl border border-slate-700/50 hover:border-rose-500/50 transition-all duration-300 hover:bg-gradient-to-br hover:from-slate-800/60 hover:to-slate-900/40 hover:-translate-y-1 cursor-pointer`}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-rose-500/20 to-rose-600/10 flex items-center justify-center mb-6 group-hover:from-rose-500/30 group-hover:to-rose-600/20 transition-all">
                <service.icon className="text-rose-400 group-hover:text-rose-300 transition-colors" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-rose-300 transition-colors">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
