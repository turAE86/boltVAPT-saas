import { Globe, Server, Layers, Code, CheckCircle, Shield, Zap, Lock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Application Security",
      description: "Comprehensive DAST and SAST scanning to identify OWASP Top 10 vulnerabilities in real-time.",
      features: ["Dynamic Analysis", "Static Code Analysis", "API Endpoint Testing", "Real-time Reporting"]
    },
    {
      icon: Server,
      title: "Network Infrastructure Assessment",
      description: "Internal and external network scanning to detect open ports, weak configurations, and legacy services.",
      features: ["Port Scanning", "Service Enumeration", "Vulnerability Detection", "Risk Prioritization"]
    },
    {
      icon: Layers,
      title: "Cloud Security & CSPM",
      description: "Multi-cloud workload protection for AWS, Azure, and GCP environments with compliance monitoring.",
      features: ["Cloud Posture Management", "Workload Protection", "Compliance Audits", "Security Baselines"]
    },
    {
      icon: Code,
      title: "API Security Testing",
      description: "Automated discovery and testing of REST, GraphQL, and SOAP endpoints for logic flaws.",
      features: ["Endpoint Discovery", "Logic Flaw Detection", "Authentication Testing", "Rate Limiting Analysis"]
    }
  ];

  const compliance = [
    {
      icon: Shield,
      title: "PCI-DSS Compliance",
      description: "Payment Card Industry Data Security Standard assessment and remediation guidance.",
      badge: "Financial"
    },
    {
      icon: Lock,
      title: "HIPAA Compliance",
      description: "Healthcare Industry security evaluation with PHI protection verification.",
      badge: "Healthcare"
    },
    {
      icon: Zap,
      title: "ISO 27001 Compliance",
      description: "Information security management system auditing and gap analysis.",
      badge: "Enterprise"
    },
    {
      icon: Globe,
      title: "GDPR Compliance",
      description: "Data protection and privacy assessment for EU regulatory requirements.",
      badge: "Data Privacy"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Complete VAPT Services
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Advanced vulnerability assessment and penetration testing solutions tailored to your security needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, i) => (
            <div key={i} className="p-8 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-rose-500/50 transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-rose-500/10 transition-colors">
                <service.icon className="text-rose-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle size={16} className="text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Compliance Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {compliance.map((comp, i) => (
              <div key={i} className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-rose-500/50 transition-all">
                <div className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium mb-4">
                  {comp.badge}
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-rose-500">
                  <comp.icon size={20} />
                </div>
                <h3 className="text-slate-200 font-semibold mb-2">{comp.title}</h3>
                <p className="text-slate-500 text-sm">{comp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Custom Engagement</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Need a tailored security assessment? Our certified security engineers design comprehensive engagements specific to your infrastructure and compliance requirements.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-lg transition-all shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40">
            <Calendar size={18} />
            Schedule Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
