import { Zap, AlertCircle, CheckCircle, Clock, TrendingUp, Shield, Radar, Bug, Code, Lock, ExternalLink, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from '../components/LoginModal';
import { supabase } from '../lib/supabase';

interface Vulnerability {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  description: string;
  recommendation: string;
  cveId?: string;
}

interface Scan {
  id: string;
  target_url: string;
  status: string;
  severity_count: { critical: number; high: number; medium: number; low: number; info: number };
  total_vulnerabilities: number;
  scan_result?: Vulnerability[];
  created_at: string;
  completed_at?: string;
  tokens_used: number;
}

const Scanner = () => {
  const { user, loading } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [scanStarted, setScanStarted] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [targetUrl, setTargetUrl] = useState('');
  const [scanComplete, setScanComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('scanner');
  const [scans, setScans] = useState<Scan[]>([]);
  const [currentScan, setCurrentScan] = useState<Scan | null>(null);
  const [userTokens, setUserTokens] = useState(0);
  const [scanCount, setScanCount] = useState(0);
  const [fetchingHistory, setFetchingHistory] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchScanHistory();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!supabase || !user) return;

    const { data } = await supabase
      .from('user_tokens')
      .select('total_tokens, used_tokens')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      setUserTokens(data.total_tokens - data.used_tokens);
    }
  };

  const fetchScanHistory = async () => {
    if (!supabase || !user) return;

    setFetchingHistory(true);
    const { data } = await supabase
      .from('scans')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setScans(data);
      const thisMonthCount = data.filter(
        (s) => new Date(s.created_at).getMonth() === new Date().getMonth()
      ).length;
      setScanCount(thisMonthCount);
    }
    setFetchingHistory(false);
  };

  const startScan = async () => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }

    if (scanCount >= 5) {
      alert('You have reached your 5-scan limit this month. Upgrade your plan.');
      return;
    }

    if (userTokens <= 0) {
      alert('Insufficient tokens. Purchase more tokens to continue scanning.');
      return;
    }

    if (!targetUrl.trim()) return;

    setScanStarted(true);
    setScanProgress(0);
    setScanComplete(false);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vapt-scan`;
      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      };

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 90) {
          setScanProgress(90);
        } else {
          setScanProgress(progress);
        }
      }, 800);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ url: targetUrl }),
      });

      clearInterval(interval);

      if (!response.ok) throw new Error('Scan failed');

      const result = await response.json();
      setScanProgress(100);

      if (!supabase) return;

      const { data: scanRecord } = await supabase
        .from('scans')
        .insert({
          user_id: user.id,
          target_url: targetUrl,
          status: 'completed',
          severity_count: result.severityCounts,
          total_vulnerabilities: result.totalVulnerabilities,
          scan_result: result.vulnerabilities,
          completed_at: new Date().toISOString(),
          tokens_used: 1,
        })
        .select()
        .maybeSingle();

      if (scanRecord) {
        setCurrentScan(scanRecord);
        setScanCount((prev) => prev + 1);
        setUserTokens((prev) => Math.max(0, prev - 1));

        await supabase
          .from('user_tokens')
          .update({ used_tokens: supabase.from('user_tokens').select('used_tokens') })
          .eq('user_id', user.id);

        await fetchScanHistory();
      }

      setScanComplete(true);
    } catch (error) {
      console.error('Scan error:', error);
      alert('Scan failed. Please try again.');
      setScanStarted(false);
    }
  };

  const startNewScan = () => {
    setScanStarted(false);
    setScanProgress(0);
    setScanComplete(false);
    setTargetUrl('');
    setCurrentScan(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-500/15 text-red-400 border border-red-500/20';
      case 'high':
        return 'bg-orange-500/15 text-orange-400 border border-orange-500/20';
      case 'medium':
        return 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20';
      case 'low':
        return 'bg-blue-500/15 text-blue-400 border border-blue-500/20';
      default:
        return 'bg-slate-500/15 text-slate-400 border border-slate-500/20';
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 pt-28 flex items-center justify-center text-slate-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 pt-28 pb-20">
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />

      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(244, 63, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <Radar className="text-rose-500" size={32} strokeWidth={1.5} />
            <h1 className="text-5xl font-bold text-white">Security Scanner</h1>
          </div>
          <p className="text-slate-400 text-lg">Launch comprehensive vulnerability assessments. Scan your target and get instant insights.</p>
        </div>

        {user && (
          <div className="mb-6 p-4 bg-slate-800/40 border border-slate-700/50 rounded-lg flex justify-between items-center">
            <div className="text-sm">
              <span className="text-slate-300">Available Tokens:</span>
              <span className="ml-2 text-lg font-bold text-rose-400">{userTokens}</span>
              <span className="ml-4 text-slate-300">Scans This Month:</span>
              <span className="ml-2 text-lg font-bold text-rose-400">{scanCount}/5</span>
            </div>
            <a href="/pricing" className="text-rose-400 hover:text-rose-300 text-sm font-medium transition">
              Buy More Tokens
            </a>
          </div>
        )}

        <div className="flex gap-3 mb-8 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-6 py-3 font-medium text-sm transition-all border-b-2 -mb-px ${
              activeTab === 'scanner'
                ? 'text-rose-400 border-b-rose-500'
                : 'text-slate-400 border-b-transparent hover:text-slate-300'
            }`}
          >
            Scanner
          </button>
          <button
            onClick={() => {
              if (!user) setLoginModalOpen(true);
              else setActiveTab('history');
            }}
            className={`px-6 py-3 font-medium text-sm transition-all border-b-2 -mb-px ${
              activeTab === 'history'
                ? 'text-rose-400 border-b-rose-500'
                : 'text-slate-400 border-b-transparent hover:text-slate-300'
            }`}
          >
            Scan History
          </button>
        </div>

        {activeTab === 'scanner' && (
          <div className="animate-fade-in">
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-slate-800/60 backdrop-blur rounded-2xl p-8 shadow-2xl mb-12">
              <div className="flex items-center gap-3 mb-8">
                <Shield className="text-rose-500" size={24} strokeWidth={1.5} />
                <h2 className="text-2xl font-semibold text-white">Start New Scan</h2>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">Target URL or IP Address</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="https://example.com or 192.168.1.1"
                      disabled={!user || (scanStarted && scanProgress < 100)}
                      className="w-full bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500/70 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {scanStarted && (
                  <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg animate-fade-in">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-300">Analysis Progress</span>
                        <span className="text-sm font-bold text-rose-400">{Math.round(scanProgress)}%</span>
                      </div>
                      <div className="relative w-full bg-slate-700/30 rounded-full h-3 overflow-hidden border border-slate-700/30">
                        <div
                          className="bg-gradient-to-r from-rose-500 via-rose-400 to-pink-400 h-full transition-all duration-300 rounded-full shadow-lg shadow-rose-500/20"
                          style={{ width: `${scanProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    {scanProgress < 100 && (
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                        Performing vulnerability analysis...
                      </div>
                    )}
                    {scanProgress === 100 && (
                      <div className="text-xs text-emerald-400 flex items-center gap-2">
                        <CheckCircle size={14} />
                        Scan completed! Results shown below.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!user ? (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40"
                >
                  <LogIn size={18} />
                  Sign In to Start Scanning
                </button>
              ) : (
                <button
                  onClick={scanComplete ? startNewScan : startScan}
                  disabled={(scanStarted && scanProgress < 100) || !targetUrl.trim() || scanCount >= 5 || userTokens <= 0}
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 disabled:shadow-none group"
                >
                  {scanComplete ? (
                    <>
                      <Zap size={18} />
                      Start New Scan
                    </>
                  ) : scanStarted && scanProgress < 100 ? (
                    <>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span>Scanning in Progress</span>
                    </>
                  ) : (
                    <>
                      <Zap size={18} />
                      Launch Scan
                    </>
                  )}
                </button>
              )}
            </div>

            {currentScan && (
              <div className="animate-fade-in">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Bug className="text-rose-500" size={24} strokeWidth={1.5} />
                    <h2 className="text-2xl font-semibold text-white">Found Vulnerabilities</h2>
                    <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-semibold ml-auto">
                      {currentScan.total_vulnerabilities} findings
                    </span>
                  </div>

                  <div className="space-y-4">
                    {(currentScan.scan_result || []).map((vuln, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-slate-800/60 backdrop-blur rounded-xl p-6 shadow-lg hover:shadow-lg hover:shadow-slate-700/20 transition-all hover:border-slate-700/80"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`p-2 rounded-lg ${getSeverityColor(vuln.severity).split(' ')[0]}`}>
                              <AlertCircle size={18} className={getSeverityColor(vuln.severity).split(' ')[1]} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base font-semibold text-white mb-1">{vuln.title}</h3>
                              <div className="flex flex-wrap gap-2 items-center">
                                <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                                  {vuln.severity.charAt(0).toUpperCase() + vuln.severity.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pl-11 space-y-3">
                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Details</p>
                            <p className="text-sm text-slate-300">{vuln.description}</p>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Remediation</p>
                            <div className="flex items-start gap-2 text-sm text-emerald-300">
                              <Lock size={14} className="mt-0.5 flex-shrink-0" />
                              <p>{vuln.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6 bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-slate-800/60 backdrop-blur rounded-xl">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white mb-1">{currentScan.severity_count.critical}</p>
                    <p className="text-sm text-red-400">Critical</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white mb-1">{currentScan.severity_count.high}</p>
                    <p className="text-sm text-orange-400">High</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white mb-1">{currentScan.severity_count.medium}</p>
                    <p className="text-sm text-yellow-400">Medium</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white mb-1">{currentScan.severity_count.low}</p>
                    <p className="text-sm text-blue-400">Low</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white mb-1">{currentScan.severity_count.info}</p>
                    <p className="text-sm text-slate-400">Info</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="animate-fade-in">
            {!user ? (
              <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-slate-800/60 backdrop-blur rounded-2xl p-12 shadow-2xl text-center">
                <LogIn size={48} className="mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Sign in to view your scan history</h3>
                <p className="text-slate-400 mb-6">Access your previous security scans and track vulnerabilities over time.</p>
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-lg transition"
                >
                  Sign In
                </button>
              </div>
            ) : fetchingHistory ? (
              <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-slate-800/60 backdrop-blur rounded-2xl p-12 shadow-2xl text-center">
                <p className="text-slate-400">Loading scan history...</p>
              </div>
            ) : scans.length === 0 ? (
              <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-slate-800/60 backdrop-blur rounded-2xl p-12 shadow-2xl text-center">
                <Clock size={48} className="mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No scans yet</h3>
                <p className="text-slate-400">Start your first security scan to build your history.</p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-slate-800/60 backdrop-blur rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp className="text-rose-500" size={24} strokeWidth={1.5} />
                  <h2 className="text-2xl font-semibold text-white">Scan History</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800/60">
                        <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Target</th>
                        <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Findings</th>
                        <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scans.map((scan) => (
                        <tr key={scan.id} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-all duration-200">
                          <td className="px-4 py-4 text-sm text-white font-medium truncate">{scan.target_url}</td>
                          <td className="px-4 py-4 text-sm">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                              <CheckCircle size={13} />
                              Complete
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-300 font-medium">{scan.total_vulnerabilities} issues</td>
                          <td className="px-4 py-4 text-sm text-slate-500">{new Date(scan.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Scanner;
