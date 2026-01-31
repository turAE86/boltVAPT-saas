import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    if (!supabase) {
      setError('Database connection unavailable');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/scanner`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 pt-28 pb-20 flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(#334155 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            maskImage: 'linear-gradient(to bottom, black 20%, transparent 90%)'
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
          <h1 className="text-2xl font-bold text-white mb-2 text-center">Sign In</h1>
          <p className="text-slate-400 text-center mb-8">Sign in to your account to continue</p>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full px-6 py-3 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-500/15 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <p className="text-center text-slate-400 text-sm mt-6">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-rose-400 hover:text-rose-300 transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
