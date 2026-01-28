import React from 'react';
import { X } from 'lucide-react';
import { SignIn } from '@clerk/clerk-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-slate-900 rounded-lg shadow-2xl w-full max-w-md mx-4 border border-slate-800">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Sign In</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'bg-rose-600 hover:bg-rose-500 text-white',
                card: 'bg-slate-900 border border-slate-800',
                headerTitle: 'text-white',
                headerSubtitle: 'text-slate-400',
                socialButtonsBlockButton: 'border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300',
                formFieldInput: 'bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:border-rose-500',
                formFieldLabel: 'text-slate-300',
              },
            }}
            redirectUrl="/"
            signUpUrl="/signup"
          />
        </div>
      </div>
    </div>
  );
}
