const MethodologySection = () => {
  const phases = [
    {
      step: "01",
      title: "Reconnaissance",
      desc: "Passive and active gathering of intelligence to map your attack surface."
    },
    {
      step: "02",
      title: "Scanning & Enumeration",
      desc: "Automated identification of potential entry points and weak configurations."
    },
    {
      step: "03",
      title: "Exploitation & Validation",
      desc: "Controlled validation of vulnerabilities to determine real-world risk impact."
    },
    {
      step: "04",
      title: "Reporting & Remediation",
      desc: "Detailed executive and technical reports with prioritized remediation actions."
    }
  ];

  return (
    <div className="w-full py-24 bg-gradient-to-b from-[#0B1120] to-[#0F172A] border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built on Proven Methodologies
            </h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              We follow industry-standard frameworks including OSSTMM, PTES, and NIST to ensure repeatable, reliable, and actionable security assessments.
            </p>

            <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-16 before:w-0.5 before:bg-gradient-to-b before:from-rose-500/50 before:to-slate-800/50">
              {phases.map((phase, i) => (
                <div key={i} className="relative pl-14">
                  <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-gradient-to-br from-rose-600 to-rose-500 flex items-center justify-center text-xs font-bold text-white z-10 shadow-lg shadow-rose-500/50">
                    {phase.step}
                  </div>
                  <div className="group hover:bg-slate-800/30 p-4 rounded-lg transition-all">
                    <h4 className="text-white font-semibold mb-2 group-hover:text-rose-300 transition-colors">{phase.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full animate-fade-in-up">
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-rose-500/30 p-8 text-center transition-all duration-300">
              <h3 className="text-white font-bold text-lg mb-2">Trusted by Industry Leaders</h3>
              <p className="text-slate-400 text-sm mb-8">Security teams at Fortune 500 companies rely on our assessments</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                {["Fortune 500", "Tech Leaders", "Gov Agencies", "Fintech", "Healthcare", "Enterprises"].map((category, i) => (
                  <div key={i} className="h-12 bg-gradient-to-br from-slate-700/50 to-slate-800/30 rounded-lg flex items-center justify-center text-xs font-semibold text-slate-300 hover:from-rose-500/20 hover:to-rose-600/10 transition-all cursor-pointer border border-slate-700/50">
                    {category}
                  </div>
                ))}
              </div>
              <div className="pt-8 border-t border-slate-700/50">
                <p className="text-slate-400 text-sm mb-4 font-semibold">Industry Certifications</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["ISO 27001", "CREST Certified", "CHECK Approved", "SOC 2 Type II"].map((cert, i) => (
                    <div key={i} className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-xs font-semibold text-rose-300 hover:bg-rose-500/10 transition-all cursor-pointer">
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologySection;
