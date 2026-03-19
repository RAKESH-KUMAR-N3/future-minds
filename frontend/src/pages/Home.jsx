import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Rocket, Star, ShieldCheck, Heart, ChevronRight, ChevronDown, ChevronUp,
  CheckCircle2, ArrowRight, Users, Trophy, BookOpen, Zap
} from 'lucide-react';
import logo from '../assets/future-minds logo.png';
import heroBg from '../assets/ChatGPT Image Mar 18, 2026, 01_05_23 PM.png';
import bg9 from '../assets/future minds 1.png';
import bg6 from '../assets/future minds 12.png';
import bg8 from '../assets/future minds 11.png';
import ctaImg from '../assets/future minds 3.avif';

/* ══════════════════════════════════════════
   FAQ DATA
══════════════════════════════════════════ */
const faqs = [
  { q: 'Can I take tests on my phone?', a: 'Yes! Future Minds works on any device — phone, tablet, or laptop.' },
  { q: 'How are children grouped?', a: 'We group by grade: Sub-Junior (Gr 1–4), Junior (Gr 5–7), Senior (Gr 8–10). Each group gets age-appropriate challenges.' },
  { q: 'What types of tests are available?', a: 'We have Weekly Mock Tests (practice) and Grand Tests (timed competitions with scores saved).' },
  { q: 'Is my child\'s data safe?', a: 'Absolutely. We use encrypted logins and never share personal data. Each student has a private dashboard.' },
];

/* ══════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════ */
const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section style={{ position: 'relative', background: '#f0fdfa', height: '100vh', paddingTop: '80px', paddingBottom: '20px', paddingLeft: '10px', paddingRight: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        {/* Background Image Layer */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: `url(${heroBg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          opacity: 0.15, 
          pointerEvents: 'none', 
          zIndex: 0 
        }} />
        
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '600px', height: '600px', background: 'radial-gradient(circle, #dcfce7 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '500px', height: '500px', background: 'radial-gradient(circle, #fce7f3 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '999px', padding: '8px 18px', fontSize: '11px', fontWeight: '900', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '28px' }}>
              🚀 Where Learning Feels Like a Game
            </div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: '1.1', color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.02em' }}>
              Believe in{' '}
              <span style={{ background: 'linear-gradient(135deg, #FF4D8D, #FF7EB3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Yourself</span>,<br />
              Aim for the{' '}
              <span style={{ background: 'linear-gradient(135deg, #F15A24, #FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Stars</span>!
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.8', marginBottom: '36px', maxWidth: '460px', fontWeight: '500' }}>
              Future Minds helps kids master Math, Science, and Coding with fun role-based tests — designed for ages 6 to 15.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <button
                onClick={() => navigate('/login')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#39B54A', color: 'white', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '16px 36px', borderRadius: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 12px 36px rgba(57,181,74,0.3)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 48px rgba(57,181,74,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(57,181,74,0.3)'; }}
              >
                Start My Adventure <ChevronRight size={20} strokeWidth={3} />
              </button>
              <button
                onClick={() => navigate('/all-tests')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'white', color: '#0f172a', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '16px 32px', borderRadius: '16px', border: '2px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#39B54A'; e.currentTarget.style.color = '#39B54A'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
              >
                Browse Tests
              </button>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {[
                { n: '1000+', l: 'Happy Students' },
                { n: '4', l: 'Test Categories' },
                { n: '3', l: 'Age Groups' },
              ].map((s, i) => (
                <div key={i}>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.6rem', color: '#0f172a', marginBottom: '2px', lineHeight: 1 }}>{s.n}</p>
                  <p style={{ fontSize: '0.72rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Cards Hero Visual */}
          <div style={{ flex: '1', minWidth: '280px', position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '260px', height: '260px', borderRadius: '50%', background: 'linear-gradient(135deg, #39B54A22, #FF4D8D22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={logo} alt="Future Minds" style={{ width: '200px', height: '200px', objectFit: 'contain' }} />
            </div>
            {/* Floating badge cards */}
            {[
              { top: '20px', left: '0px', bg: '#fdf2f8', icon: '🏆', label: 'Grand Tests' },
              { top: '60px', right: '0px', bg: '#f0fdf4', icon: '⭐', label: '50 XP / Test' },
              { bottom: '40px', left: '20px', bg: '#eff6ff', icon: '🎯', label: 'Role Dashboards' },
              { bottom: '80px', right: '10px', bg: '#fff7ed', icon: '🔥', label: 'Daily Streaks' },
            ].map((b, i) => (
              <div key={i} style={{ position: 'absolute', top: b.top, right: b.right, bottom: b.bottom, left: b.left, background: b.bg, borderRadius: '18px', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.8)', fontSize: '0.8rem', fontFamily: 'Outfit, sans-serif', fontWeight: '800', color: '#334155', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: '1.2rem' }}>{b.icon}</span> {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS (Inspired by Greenlane's 3-step process)
      ════════════════════════════════════════ */}
      <section style={{ position: 'relative', background: '#f8fafc', borderTop: '1px solid #f1f5f9', height: '100vh', padding: '40px 40px', overflow: 'hidden', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        {/* Background Image Layer */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${bg9})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.35, pointerEvents: 'none', zIndex: 0
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ fontSize: '11px', fontWeight: '900', color: '#39B54A', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '8px' }}>Simple Process</p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Start in 3 Easy Steps 🛤️
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', icon: <Users size={24} color="#6366f1" />, bg: '#eef2ff', title: 'Get Enrolled', desc: 'Ask your teacher to create a student account. Takes less than 1 minute.' },
              { step: '02', icon: <BookOpen size={24} color="#39B54A" />, bg: '#f0fdf4', title: 'Choose Your Quest', desc: 'Browse Mock or Grand tests made for your age group and jump in.' },
              { step: '03', icon: <Trophy size={24} color="#F15A24" />, bg: '#fff7ed', title: 'Earn & Grow', desc: 'Finish tests, earn XP, see your score, and track your progress.' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '22px', padding: '28px 28px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden' }}>
                <span style={{ position: 'absolute', top: '16px', right: '20px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '3rem', color: '#f8fafc', lineHeight: 1 }}>{s.step}</span>
                <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.15rem', color: '#0f172a', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.88rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY KIDS LOVE US
      ════════════════════════════════════════ */}
      <section style={{ position: 'relative', background: 'white', borderTop: '1px solid #f1f5f9', height: '100vh', padding: '40px 40px', overflow: 'hidden', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        {/* Background Image Layer */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${bg6})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.35, pointerEvents: 'none', zIndex: 0
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ fontSize: '11px', fontWeight: '900', color: '#FF4D8D', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '8px' }}>Features</p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Why Kids Love Us! ❤️
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500', marginTop: '8px' }}>
              special features designed for every age group
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {[
              { icon: <Star size={30} color="#FF4D8D" fill="#FF4D8D" />, bg: '#fdf2f8', title: 'Fun Tests', desc: 'Weekly Mock and Grand tests that feel exactly like a game!', checks: ['5 Questions Per Test', 'Instant Results', 'XP Points'] },
              { icon: <Rocket size={30} color="#39B54A" fill="#39B54A" />, bg: '#f0fdf4', title: 'Role Dashboards', desc: 'Specially designed interfaces for your specific age group.', checks: ['Progress Tracking', 'Achievement Badges', 'Streak Tracker'] },
              { icon: <ShieldCheck size={30} color="#F15A24" fill="#F15A24" />, bg: '#fff7ed', title: 'Safe & Easy', desc: 'No messy signups! Teacher manages everything.', checks: ['No Email Needed', 'Parent Friendly', 'Secure Logins'] },
            ].map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '22px', padding: '28px 28px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.88rem', marginBottom: '16px' }}>{f.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                  {f.checks.map((c, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '700', color: '#475569' }}>
                      <CheckCircle2 size={14} color="#39B54A" /> {c}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHOOSE YOUR PATH
      ════════════════════════════════════════ */}
      <section style={{ position: 'relative', background: '#f8fafc', borderTop: '1px solid #f1f5f9', height: '100vh', padding: '40px 40px', overflow: 'hidden', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        {/* Background Image Layer */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${bg8})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.35, pointerEvents: 'none', zIndex: 0
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ fontSize: '11px', fontWeight: '900', color: '#F15A24', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '8px' }}>Age Groups</p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Choose Your Path 🌈
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {[
              { icon: <Heart size={28} color="white" fill="white" />, grad: 'linear-gradient(135deg, #FF4D8D, #FF7EB3)', border: '#fce7f3', hborder: '#FF4D8D', shadow: 'rgba(255,77,141,0.15)', title: 'Sub-Junior', meta: 'Grades 1–4 • Ages 6–9', color: '#FF4D8D', desc: 'Basic Math & Creative Fun.', perks: ['Simple Number Games', 'Colorful Quizzes', 'Fun Achievements'] },
              { icon: <Star size={28} color="white" fill="white" />, grad: 'linear-gradient(135deg, #39B54A, #6dd679)', border: '#dcfce7', hborder: '#39B54A', shadow: 'rgba(57,181,74,0.15)', title: 'Junior', meta: 'Grades 5–7 • Ages 10–12', color: '#39B54A', desc: 'Science & Growth Puzzles.', perks: ['Science Challenges', 'Logical Thinking', 'Weekly Tournaments'] },
              { icon: <Rocket size={28} color="white" fill="white" />, grad: 'linear-gradient(135deg, #F15A24, #FFB347)', border: '#ffedd5', hborder: '#F15A24', shadow: 'rgba(241,90,36,0.15)', title: 'Senior', meta: 'Grades 8–10 • Ages 13–15', color: '#F15A24', desc: 'Advanced Math & Coding.', perks: ['Coding Challenges', 'Advanced Math', 'All-India Ranks'] },
            ].map((p, i) => (
              <div key={i}
                onClick={() => navigate('/login')}
                style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: `2px solid rgba(255,255,255,0.5)`, borderRadius: '22px', padding: '28px 28px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = p.hborder; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
              >
                <div style={{ width: '58px', height: '58px', borderRadius: '18px', background: p.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: `0 8px 20px ${p.shadow}` }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.5rem', color: p.color, marginBottom: '2px' }}>{p.title}</h3>
                <p style={{ fontSize: '0.65rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px' }}>{p.meta}</p>
                <p style={{ color: '#64748b', fontWeight: '600', fontSize: '0.88rem', marginBottom: '14px' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px', width: '100%' }}>
                  {p.perks.map((x, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '700', color: '#475569' }}>
                      <CheckCircle2 size={13} color={p.color} /> {x}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: p.color, fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Join Now <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA BANNER — Single Unified Card
      ════════════════════════════════════════ */}
      <section style={{ height: '100vh', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', boxSizing: 'border-box', overflow: 'hidden' }}>
        {/* Single unified card */}
        <div style={{ display: 'flex', width: '100%', maxWidth: '900px', height: '480px', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.14)' }}>

          {/* Left — Image (50%) */}
          <div style={{ flex: '0 0 50%', overflow: 'hidden' }}>
            <img
              src={ctaImg}
              alt="Learning Adventure"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          {/* Right — Dark content (50%) */}
          <div style={{ flex: '0 0 50%', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 40px', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
            {/* decorative */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.04, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, #39B54A33, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, #FF4D8D22, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '18px' }}>🚀</span>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: 'clamp(1.3rem, 2vw, 1.9rem)', color: 'white', letterSpacing: '-0.02em', marginBottom: '14px', lineHeight: '1.2' }}>
                Ready to Start Your<br />Learning Adventure?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', fontWeight: '500', marginBottom: '28px', lineHeight: '1.65' }}>
                Join 1000+ students leveling up their Math, Science, and Coding skills every week.
              </p>
              <button
                onClick={() => navigate('/login')}
                style={{ background: '#39B54A', color: 'white', border: 'none', borderRadius: '14px', padding: '14px 34px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 28px rgba(57,181,74,0.4)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(57,181,74,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(57,181,74,0.4)'; }}
              >
                <Zap size={16} fill="white" /> Begin My Quest
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQ (inspired by original project)
      ════════════════════════════════════════ */}
      <section style={{ background: '#f8fafc', borderTop: '1px solid #f1f5f9', padding: '100px 40px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Questions? We Got You! 🙋
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: 'white', border: `1px solid ${openFaq === i ? '#bbf7d0' : '#f1f5f9'}`, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'all 0.2s' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 28px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1rem', color: openFaq === i ? '#39B54A' : '#0f172a' }}>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={20} color="#39B54A" /> : <ChevronDown size={20} color="#94a3b8" />}
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 28px 22px', color: '#64748b', fontWeight: '500', lineHeight: '1.7', borderTop: '1px solid #f8fafc' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer style={{ background: '#0f172a', padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logo} alt="Logo" style={{ height: '44px', width: 'auto' }} />
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.4rem' }}>
            <span style={{ color: 'white' }}>Future</span>
            <span style={{ color: '#39B54A' }}>Minds</span>
          </span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', fontWeight: '500', maxWidth: '420px' }}>
          Empowering the next generation through fun, engaging, role-based learning adventures.
        </p>
        <div style={{ display: 'flex', gap: '32px', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.25em' }}>
          {['Privacy', 'Terms', 'Contact'].map(l => (
            <span key={l} style={{ cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#39B54A'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >{l}</span>
          ))}
        </div>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          © 2026 Future Minds Academy
        </p>
      </footer>

    </div>
  );
};

export default Home;
