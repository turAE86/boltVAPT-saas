import { Shield, Menu, X, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getLinkClass = (path: string) => {
    const base = "transition-all px-3 py-2 md:px-0 md:py-0 rounded md:rounded-none";
    const hover = "hover:text-white md:hover:bg-transparent hover:bg-slate-900";

    if (isActive(path)) {
      return `${base} ${hover} text-rose-400 font-semibold md:border-b-2 md:border-rose-400 md:pb-1`;
    }
    return `${base} ${hover} text-slate-400`;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#0B1120]/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-rose-500 hover:opacity-80 transition-opacity">
          <Shield className="h-8 w-8 fill-rose-500/20" />
          <span className="text-xl font-bold tracking-wider text-white">
            VAPT<span className="text-slate-400 font-light">TOOL</span>
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${isOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full left-0 right-0 md:top-auto md:left-auto md:right-auto md:bg-transparent bg-[#0B1120] border-b md:border-0 border-slate-800 flex-col md:flex-row items-stretch md:items-center gap-0 md:gap-8 w-full md:w-auto p-4 md:p-0 text-sm font-medium`}>
          <Link to="/" onClick={() => setIsOpen(false)} className={getLinkClass('/')}>Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className={getLinkClass('/services')}>Services</Link>
          <Link to="/scanner" onClick={() => setIsOpen(false)} className={getLinkClass('/scanner')}>Scanner</Link>
          <Link to="/pricing" onClick={() => setIsOpen(false)} className={getLinkClass('/pricing')}>Pricing</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className={getLinkClass('/contact')}>Contact</Link>
        </div>

        <div className="hidden md:flex gap-4 items-center relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/50 rounded-lg transition-all"
              >
                <User size={18} className="text-rose-400" />
                <span className="text-white text-sm font-medium truncate max-w-[150px]">{user.email}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-50">
                  <div className="px-4 py-3 border-b border-slate-800">
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Account</p>
                    <p className="text-sm text-white mt-1 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 text-left text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg border border-slate-700 transition-all">
                Log In
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium rounded-lg transition-all">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
