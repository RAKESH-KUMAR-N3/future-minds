import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, GraduationCap, ShieldCheck, Heart } from 'lucide-react';
import logo from '../assets/future-minds logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Invalid credentials. Try again!');
    }
  };

  if (authLoading) return null;

  return (
    <div className="flex min-h-screen bg-slate-50 font-inter">

      {/* Left — Branding Panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 to-slate-950 flex-col justify-center items-center p-20 text-white relative overflow-hidden">
        {/* Background dots */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{ backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
        />
        <div className="relative z-10 text-center">
          <div
            className="w-48 h-48 bg-white rounded-[50px] flex items-center justify-center mx-auto mb-10 cursor-pointer overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-2xl p-4"
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-7xl font-black mb-6 tracking-tighter font-outfit leading-none">
            <span className="text-white">Future</span>
            <span className="text-[#39B54A]">Minds</span>
          </h1>
          <p className="text-lg opacity-60 max-w-sm mx-auto mb-12 leading-relaxed font-medium italic">
            "Where learning feels like an adventure! 🚀 Join 1000+ students in their quest."
          </p>
          <div className="flex justify-center gap-6">
            <div className="p-5 bg-white/5 rounded-3xl ring-1 ring-white/10 shadow-xl">
              <ShieldCheck size={28} className="text-emerald-400" />
            </div>
            <div className="p-5 bg-white/5 rounded-3xl ring-1 ring-white/10 shadow-xl">
              <GraduationCap size={28} className="text-[#F15A24]" />
            </div>
            <div className="p-5 bg-white/5 rounded-3xl ring-1 ring-white/10 shadow-xl">
              <Heart size={28} className="text-[#FF4D8D]" />
            </div>
          </div>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-[1.2] flex justify-center items-center p-8 md:p-12 lg:p-24 bg-white relative">
        {/* Mobile logo */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="font-outfit font-black text-xl">
            <span className="text-slate-900">Future</span>
            <span className="text-[#39B54A]">Minds</span>
          </span>
        </div>

        <div className="w-full max-w-lg bg-white border border-slate-100 rounded-3xl p-14 shadow-sm">
          <div className="mb-12">
            <h2 className="text-5xl text-slate-900 mb-3 font-black font-outfit leading-[1.1] tracking-tight">
              Welcome Back! 👋
            </h2>
            <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">
              Ready for your next adventure?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-1">
                Explorer Name
              </label>
              <input
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-lg font-bold transition-all focus:bg-white focus:border-[#39B54A] focus:shadow-[0_0_0_4px_rgba(57,181,74,0.1)]"
                required
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-1">
                Secret Passcode
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-lg font-bold transition-all focus:bg-white focus:border-[#39B54A] focus:shadow-[0_0_0_4px_rgba(57,181,74,0.1)]"
                required
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-500 text-sm font-bold rounded-2xl px-5 py-4">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#39B54A] hover:bg-[#2e933c] text-white font-black p-5 rounded-2xl text-lg shadow-lg shadow-emerald-100 active:scale-95 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3 border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : <><span>Let's Go!</span> <LogIn size={22} /></>}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              Lost your way?{' '}
              <button
                onClick={() => alert('Contact your teacher for your magic pass!')}
                className="text-slate-700 font-black bg-transparent border-none cursor-pointer hover:text-[#39B54A] transition-colors underline underline-offset-4"
              >
                Ask your Teacher 🍎
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
