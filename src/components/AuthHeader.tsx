import React from 'react';
import { User } from 'firebase/auth';
import { LogOut, CheckCircle2 } from 'lucide-react';
import { googleSignIn, logout } from '../services/auth';

interface AuthHeaderProps {
  user: User | null;
  hasToken: boolean;
  onLoginSuccess: (user: User, token: string) => void;
  onLogout: () => void;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  user,
  hasToken,
  onLoginSuccess,
  onLogout,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await googleSignIn();
      if (res) {
        onLoginSuccess(res.user, res.accessToken);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMsg(err?.message || 'Authentication was cancelled or failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    onLogout();
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-emerald-950/40 border border-emerald-800/30 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
          GR
        </div>
        <div>
          <div className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            Greece Dog Feeds & Treats Database
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live Greek Market Data
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Export directly to Google Sheets with your Google account, or download as CSV.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        {errorMsg && (
          <span className="text-xs text-rose-400 max-w-[200px] truncate" title={errorMsg}>
            {errorMsg}
          </span>
        )}

        {user && hasToken ? (
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-700/60 text-xs text-zinc-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">{user.displayName || user.email}</span>
            </div>
            <button
              onClick={handleSignOut}
              id="sign-out-btn"
              title="Sign out of Google"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            disabled={loading}
            id="google-signin-btn"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white text-zinc-800 hover:bg-zinc-100 font-medium text-xs shadow-sm transition border border-zinc-200 active:scale-[0.98] disabled:opacity-60"
          >
            <svg className="w-4 h-4" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            <span>{loading ? 'Connecting...' : 'Sign in with Google'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
