import { SignUp } from '@clerk/clerk-react';

const Signup = () => {
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
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 'bg-rose-600 hover:bg-rose-500 text-white w-full',
                card: 'bg-transparent border-0',
                headerTitle: 'text-2xl font-bold text-white',
                headerSubtitle: 'text-slate-400',
                socialButtonsBlockButton: 'border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300',
                formFieldInput: 'bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-rose-500',
                formFieldLabel: 'text-slate-300 text-sm font-medium',
                dividerLine: 'bg-slate-800',
                dividerText: 'text-slate-400',
              },
              layout: 'socialButtonsPlacement',
            }}
            redirectUrl="/scanner"
            signInUrl="/login"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
