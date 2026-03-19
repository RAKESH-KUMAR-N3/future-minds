import React, { useState, useEffect, useRef } from 'react';
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
import ctaBg from '../assets/future minds 11.jpg';
import carouselImg1 from '../assets/ChatGPT Image Mar 18, 2026, 01_05_23 PM.png';
import carouselImg2 from '../assets/future minds 10.avif';
import carouselImg3 from '../assets/future minds 11.png';
import carouselImg4 from '../assets/hero-kids.png';

/* ══════════════════════════════════════════
   FAQ DATA
══════════════════════════════════════════ */
const faqs = [
  { q: 'Can I take tests on my phone?', a: 'Yes! Future Minds works on any device — phone, tablet, or laptop.' },
  { q: 'How are children grouped?', a: 'We group by grade: Sub-Junior (Gr 1–4), Junior (Gr 5–7), Senior (Gr 8–10). Each group gets age-appropriate challenges.' },
  { q: 'What types of tests are available?', a: 'We have Daily Tests (practice) and Grand Exam (timed competitions with scores saved).' },
  { q: 'Is my child\'s data safe?', a: 'Absolutely. We use encrypted logins and never share personal data. Each student has a private dashboard.' },
];

/* ══════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════ */
/* ══════════════════════════════════════════
   MOBILE CAROUSEL COMPONENT
══════════════════════════════════════════ */
const carouselImages = [
  { src: carouselImg1, alt: 'Future Minds Adventure' },
  { src: carouselImg2, alt: 'Future Minds Learning' },
  { src: carouselImg3, alt: 'Future Minds Tests' },
  { src: carouselImg4, alt: 'Future Minds Kids' },
];

const MobileCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <>
      <style>{`
        .mobile-carousel { display: none; }
        .hero-float-cards { display: flex; }
        .hero-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 40px; }
        .hero-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; }
        .hero-stats-row { display: flex; gap: 32px; flex-wrap: wrap; }
        @media (max-width: 768px) {
          .mobile-carousel { display: block !important; }
          .hero-float-cards { display: none !important; }
          .hero-btn-row { gap: 10px; flex-wrap: nowrap; margin-bottom: 24px; }
          .hero-btn { flex: 1; padding: 13px 8px !important; font-size: 0.72rem !important; letter-spacing: 0.08em !important; border-radius: 13px !important; }
          .hero-stats-row { gap: 0; flex-wrap: nowrap; justify-content: space-between; background: rgba(255,255,255,0.55); border-radius: 16px; padding: 12px 16px; backdrop-filter: blur(8px); }
          .hero-stat-divider { display: block !important; }
          /* How It Works mobile — fit entire section in one screen */
          .hiw-section {
            height: calc(100dvh - 60px - 62px) !important;
            min-height: 0 !important;
            padding: 10px 12px 8px !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
          }
          .hiw-section > div { width: 100%; }
          .hiw-heading-block { margin-bottom: 10px !important; }
          .hiw-heading-block p { font-size: 9px !important; margin-bottom: 4px !important; letter-spacing: 0.2em !important; }
          .hiw-heading-block h2 { font-size: 1.15rem !important; }
          .hiw-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }
          .hiw-card {
            padding: 10px 10px !important;
            border-radius: 12px !important;
            box-shadow: 0 3px 12px rgba(0,0,0,0.06) !important;
            border: 2px solid transparent !important;
          }
          .hiw-card:nth-child(1) { border-color: #FF4D8D !important; }
          .hiw-card:nth-child(2) { border-color: #39B54A !important; }
          .hiw-card:nth-child(3) { border-color: #F15A24 !important; }
          .hiw-card:first-child { grid-column: 1 / -1; max-width: 200px; margin: 0 auto; width: 100%; }
          .hiw-icon-box { width: 30px !important; height: 30px !important; border-radius: 9px !important; margin-bottom: 6px !important; }
          .hiw-step-num { font-size: 1.4rem !important; top: 8px !important; right: 10px !important; }
          .hiw-card h3 { font-size: 0.8rem !important; margin-bottom: 3px !important; }
          .hiw-card p { font-size: 0.65rem !important; line-height: 1.4 !important; }
          /* Why Kids Love Us mobile — horizontal row cards */
          .wklu-section {
            height: calc(100dvh - 60px - 62px) !important;
            min-height: 0 !important;
            padding: 10px 14px 8px !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
          }
          .wklu-section > div { width: 100%; overflow: hidden; }
          .wklu-heading { margin-bottom: 10px !important; }
          .wklu-heading p:first-child { font-size: 9px !important; margin-bottom: 3px !important; }
          .wklu-heading h2 { font-size: 1.1rem !important; }
          .wklu-heading p:last-child { font-size: 0.7rem !important; margin-top: 2px !important; }
          .wklu-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
          }
          .wklu-card {
            flex-direction: row !important;
            align-items: center !important;
            padding: 12px 14px !important;
            border-radius: 14px !important;
            gap: 12px !important;
            border: 2px solid transparent !important;
          }
          .wklu-card:nth-child(1) { border-color: #FF4D8D !important; }
          .wklu-card:nth-child(2) { border-color: #39B54A !important; }
          .wklu-card:nth-child(3) { border-color: #F15A24 !important; }
          .wklu-icon-box { width: 42px !important; height: 42px !important; min-width: 42px !important; border-radius: 12px !important; margin-bottom: 0 !important; }
          .wklu-card h3 { font-size: 0.85rem !important; margin-bottom: 3px !important; }
          .wklu-card > div:last-child p { font-size: 0.68rem !important; line-height: 1.4 !important; margin-bottom: 0 !important; }
          .wklu-section .wklu-checks { display: none !important; height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important; }
          /* Choose Your Path mobile — triangle like HIW */
          .cyp-section {
            height: calc(100dvh - 60px - 62px) !important;
            min-height: 0 !important;
            padding: 10px 12px 8px !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
          }
          .cyp-section > div { width: 100%; overflow: hidden; }
          .cyp-heading { margin-bottom: 10px !important; }
          .cyp-heading p { font-size: 9px !important; margin-bottom: 3px !important; }
          .cyp-heading h2 { font-size: 1.15rem !important; }
          .cyp-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }
          .cyp-card {
            padding: 12px 10px !important;
            border-radius: 14px !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: 0 !important;
            border: 2.5px solid transparent !important;
          }
          .cyp-card:nth-child(1) { border-color: #FF4D8D !important; }
          .cyp-card:nth-child(2) { border-color: #39B54A !important; }
          .cyp-card:nth-child(3) { border-color: #F15A24 !important; }
          .cyp-card:first-child { grid-column: 1 / -1; max-width: 200px; margin: 0 auto; width: 100%; }
          .cyp-icon { width: 42px !important; height: 42px !important; min-width: 42px !important; border-radius: 13px !important; margin-bottom: 8px !important; }
          .cyp-card h3 { font-size: 0.9rem !important; margin-bottom: 2px !important; }
          .cyp-card .cyp-meta { font-size: 0.54rem !important; margin-bottom: 4px !important; letter-spacing: 0.08em !important; }
          .cyp-card .cyp-desc { display: none !important; }
          .cyp-perks { display: none !important; height: 0 !important; overflow: hidden !important; }
          .cyp-join { font-size: 0.62rem !important; margin-top: 6px !important; justify-content: center !important; }
          .cyp-card > div { width: 100%; }
          /* CTA Banner mobile — circle image left + text right */
          .cta-section {
            height: calc(100dvh - 60px - 62px) !important;
            min-height: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: stretch !important;
            background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%) !important;
          }
          .cta-card {
            flex-direction: row !important;
            height: 100% !important;
            width: 100% !important;
            border-radius: 0 !important;
            align-items: center !important;
            padding: 24px 20px !important;
            gap: 18px !important;
            background: transparent !important;
            box-shadow: none !important;
            max-width: 100% !important;
            overflow: visible !important;
          }
          .cta-img-panel {
            flex: 0 0 140px !important;
            width: 140px !important;
            height: 140px !important;
            border-radius: 50% !important;
            overflow: hidden !important;
            border: 4px solid rgba(57,181,74,0.6) !important;
            box-shadow: 0 0 0 6px rgba(57,181,74,0.12), 0 8px 28px rgba(0,0,0,0.3) !important;
            flex-shrink: 0 !important;
          }
          .cta-img-panel img { width: 100% !important; height: 100% !important; object-fit: cover !important; object-position: center top !important; }
          .cta-content-panel {
            flex: 1 !important;
            padding: 0 !important;
            background: transparent !important;
            position: static !important;
            overflow: hidden !important;
          }
          .cta-rocket { font-size: 1.3rem !important; margin-bottom: 6px !important; }
          .cta-content-panel h2 { font-size: 1.05rem !important; margin-bottom: 8px !important; line-height: 1.25 !important; }
          .cta-content-panel p { font-size: 0.7rem !important; margin-bottom: 14px !important; line-height: 1.55 !important; }
          .cta-btn { padding: 10px 20px !important; font-size: 0.67rem !important; border-radius: 10px !important; }
          /* FAQ section mobile */
          .faq-section { padding: 50px 14px 80px !important; }
          .faq-heading-block { margin-bottom: 24px !important; }
          .faq-heading-block h2 { font-size: 1.3rem !important; }
          .faq-list { gap: 8px !important; }
          .faq-item { border-radius: 14px !important; }
          .faq-btn { padding: 14px 16px !important; }
          .faq-btn span { font-size: 0.82rem !important; }
          .faq-answer { padding: 0 16px 14px !important; font-size: 0.75rem !important; line-height: 1.55 !important; }

        }
      `}</style>
      <div className="mobile-carousel" style={{
        width: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
        background: '#f0fdf4',
        marginBottom: '0',
      }}>
        {/* Image Track */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          overflow: 'hidden',
        }}>
          {carouselImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: i === current ? 1 : 0,
                transition: 'opacity 0.5s ease',
                zIndex: i === current ? 1 : 0,
              }}
            />
          ))}

          {/* Gradient overlay at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '60px',
            background: 'linear-gradient(to top, rgba(240,253,250,0.7), transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
        </div>

        {/* Dot indicators */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: '7px', padding: '10px 0 8px',
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(8px)',
        }}>
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? '22px' : '7px',
                height: '7px',
                borderRadius: '4px',
                background: i === current ? '#39B54A' : '#d1fae5',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: i === current ? '0 2px 8px rgba(57,181,74,0.4)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section style={{ position: 'relative', background: '#f0fdfa', minHeight: '100vh', paddingTop: '80px', paddingBottom: '20px', paddingLeft: '10px', paddingRight: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
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
            {/* Mobile carousel — appears below heading on mobile */}
            <MobileCarousel />
            <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.8', marginBottom: '36px', maxWidth: '460px', fontWeight: '500' }}>
              Future Minds helps kids master Math, Science, and Coding with fun role-based tests — designed for ages 6 to 15.
            </p>

            <div className="hero-btn-row">
              <button
                className="hero-btn"
                onClick={() => navigate('/login')}
                style={{ background: '#39B54A', color: 'white', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '16px 36px', borderRadius: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 12px 36px rgba(57,181,74,0.3)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 48px rgba(57,181,74,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(57,181,74,0.3)'; }}
              >
                Start My Adventure <ChevronRight size={18} strokeWidth={3} />
              </button>
              <button
                className="hero-btn"
                onClick={() => navigate('/all-tests')}
                style={{ background: 'white', color: '#0f172a', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '16px 32px', borderRadius: '16px', border: '2px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#39B54A'; e.currentTarget.style.color = '#39B54A'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
              >
                Browse Tests
              </button>
            </div>

            {/* Stats Row */}
            <div className="hero-stats-row">
              {[
                { n: '1000+', l: 'Happy Students' },
                { n: '4', l: 'Test Categories' },
                { n: '3', l: 'Age Groups' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.4rem', color: '#0f172a', marginBottom: '2px', lineHeight: 1 }}>{s.n}</p>
                  <p style={{ fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Cards Hero Visual — hidden on mobile */}
          <div className="hero-float-cards" style={{ flex: '1', minWidth: '280px', position: 'relative', height: '400px', alignItems: 'center', justifyContent: 'center' }}>
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
      <section className="hiw-section" style={{ position: 'relative', background: '#f8fafc', borderTop: '1px solid #f1f5f9', height: '100vh', padding: '40px 40px', overflow: 'hidden', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        {/* Background Image Layer */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${bg9})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.35, pointerEvents: 'none', zIndex: 0
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="hiw-heading-block" style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ fontSize: '11px', fontWeight: '900', color: '#39B54A', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '8px' }}>Simple Process</p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Start in 3 Easy Steps 🛤️
            </h2>
          </div>
          <div className="hiw-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', icon: <Users size={24} color="#6366f1" />, bg: '#eef2ff', title: 'Get Enrolled', desc: 'Ask your teacher to create a student account. Takes less than 1 minute.' },
              { step: '02', icon: <BookOpen size={24} color="#39B54A" />, bg: '#f0fdf4', title: 'Choose Your Quest', desc: 'Browse Mock or Grand tests made for your age group and jump in.' },
              { step: '03', icon: <Trophy size={24} color="#F15A24" />, bg: '#fff7ed', title: 'Earn & Grow', desc: 'Finish tests, earn XP, see your score, and track your progress.' },
            ].map((s, i) => (
              <div key={i} className="hiw-card" style={{ 
                background: 'rgba(255,255,255,0.25)', 
                backdropFilter: 'blur(12px)', 
                WebkitBackdropFilter: 'blur(12px)', 
                borderRadius: '22px', 
                padding: '28px 28px', 
                border: `2px solid ${i === 0 ? '#FF4D8D' : i === 1 ? '#39B54A' : '#F15A24'}`, 
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)', 
                position: 'relative', 
                overflow: 'hidden' 
              }}>
                <span className="hiw-step-num" style={{ position: 'absolute', top: '16px', right: '20px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '3rem', color: '#f8fafc', lineHeight: 1 }}>{s.step}</span>
                <div className="hiw-icon-box" style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>{s.icon}</div>
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
      <section className="wklu-section" style={{ position: 'relative', background: 'white', borderTop: '1px solid #f1f5f9', height: '100vh', padding: '40px 40px', overflow: 'hidden', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        {/* Background Image Layer */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${bg6})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.35, pointerEvents: 'none', zIndex: 0
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="wklu-heading" style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ fontSize: '11px', fontWeight: '900', color: '#FF4D8D', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '8px' }}>Features</p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Why Kids Love Us! ❤️
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500', marginTop: '8px' }}>
              special features designed for every age group
            </p>
          </div>
          <div className="wklu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {[
              { icon: <Star size={30} color="#FF4D8D" fill="#FF4D8D" />, bg: '#fdf2f8', title: 'Fun Daily Tests', desc: 'Weekly Daily and Grand Exam that feel exactly like a game!', checks: ['5 Questions Per Test', 'Instant Results', 'XP Points'] },
              { icon: <Rocket size={30} color="#39B54A" fill="#39B54A" />, bg: '#f0fdf4', title: 'Role Dashboards', desc: 'Specially designed interfaces for your specific age group.', checks: ['Progress Tracking', 'Achievement Badges', 'Streak Tracker'] },
              { icon: <ShieldCheck size={30} color="#F15A24" fill="#F15A24" />, bg: '#fff7ed', title: 'Safe & Easy', desc: 'No messy signups! Teacher manages everything.', checks: ['No Email Needed', 'Parent Friendly', 'Secure Logins'] },
            ].map((f, i) => (
              <div key={i} className="wklu-card" style={{ 
                background: 'rgba(255,255,255,0.25)', 
                backdropFilter: 'blur(12px)', 
                WebkitBackdropFilter: 'blur(12px)', 
                border: `2px solid ${i === 0 ? '#FF4D8D' : i === 1 ? '#39B54A' : '#F15A24'}`, 
                borderRadius: '22px', 
                padding: '28px 28px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)', 
                transition: 'all 0.3s' 
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
              >
                <div className="wklu-icon-box" style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>{f.icon}</div>
                <div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>{f.title}</h3>
                  <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.88rem', marginBottom: '16px' }}>{f.desc}</p>
                  {!isMobile && (
                    <div className="wklu-checks" style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                      {f.checks.map((c, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '700', color: '#475569' }}>
                          <CheckCircle2 size={14} color="#39B54A" /> {c}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHOOSE YOUR PATH
      ════════════════════════════════════════ */}
      <section className="cyp-section" style={{ position: 'relative', background: '#f8fafc', borderTop: '1px solid #f1f5f9', height: '100vh', padding: '40px 40px', overflow: 'hidden', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        {/* Background Image Layer */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${bg8})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.35, pointerEvents: 'none', zIndex: 0
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="cyp-heading" style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ fontSize: '11px', fontWeight: '900', color: '#F15A24', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '8px' }}>Age Groups</p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Choose Your Path 🌈
            </h2>
          </div>
          <div className="cyp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {[
              { icon: <Heart size={28} color="white" fill="white" />, grad: 'linear-gradient(135deg, #FF4D8D, #FF7EB3)', border: '#fce7f3', hborder: '#FF4D8D', shadow: 'rgba(255,77,141,0.15)', title: 'Sub-Junior', meta: 'Grades 1–4 • Ages 6–9', color: '#FF4D8D', desc: 'Basic Math & Creative Fun.', perks: ['Simple Number Games', 'Colorful Quizzes', 'Fun Achievements'] },
              { icon: <Star size={28} color="white" fill="white" />, grad: 'linear-gradient(135deg, #39B54A, #6dd679)', border: '#dcfce7', hborder: '#39B54A', shadow: 'rgba(57,181,74,0.15)', title: 'Junior', meta: 'Grades 5–7 • Ages 10–12', color: '#39B54A', desc: 'Science & Growth Puzzles.', perks: ['Science Challenges', 'Logical Thinking', 'Weekly Tournaments'] },
              { icon: <Rocket size={28} color="white" fill="white" />, grad: 'linear-gradient(135deg, #F15A24, #FFB347)', border: '#ffedd5', hborder: '#F15A24', shadow: 'rgba(241,90,36,0.15)', title: 'Senior', meta: 'Grades 8–10 • Ages 13–15', color: '#F15A24', desc: 'Advanced Math & Coding.', perks: ['Coding Challenges', 'Advanced Math', 'All-India Ranks'] },
            ].map((p, i) => (
              <div key={i} className="cyp-card"
                onClick={() => navigate('/login')}
                style={{ 
                  background: 'rgba(255,255,255,0.25)', 
                  backdropFilter: 'blur(12px)', 
                  WebkitBackdropFilter: 'blur(12px)', 
                  border: `2.5px solid ${i === 0 ? '#FF4D8D' : i === 1 ? '#39B54A' : '#F15A24'}`, 
                  borderRadius: '22px', 
                  padding: '28px 28px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-start', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s', 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)' 
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = p.hborder; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.borderColor = i === 0 ? '#FF4D8D' : i === 1 ? '#39B54A' : '#F15A24'; }}
              >
                <div className="cyp-icon" style={{ width: '58px', height: '58px', borderRadius: '18px', background: p.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: `0 8px 20px ${p.shadow}` }}>{p.icon}</div>
                <div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.5rem', color: p.color, marginBottom: '2px' }}>{p.title}</h3>
                  <p className="cyp-meta" style={{ fontSize: '0.65rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px' }}>{p.meta}</p>
                  <p className="cyp-desc" style={{ color: '#64748b', fontWeight: '600', fontSize: '0.88rem', marginBottom: '14px' }}>{p.desc}</p>
                  {!isMobile && (
                    <div className="cyp-perks" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px', width: '100%' }}>
                      {p.perks.map((x, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '700', color: '#475569' }}>
                          <CheckCircle2 size={13} color={p.color} /> {x}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="cyp-join" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: p.color, fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Join Now <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA BANNER — Single Unified Card
      ════════════════════════════════════════ */}
      <section className="cta-section" style={{ position: 'relative', height: '100vh', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', boxSizing: 'border-box', overflow: 'hidden' }}>
        {/* bg image layer */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${ctaBg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, pointerEvents: 'none', zIndex: 0 }} />
        {/* Single unified card */}
        <div className="cta-card" style={{ position: 'relative', zIndex: 1, display: 'flex', width: '100%', maxWidth: '900px', height: '480px', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.14)' }}>

          {/* Left — Image (50%) */}
          <div className="cta-img-panel" style={{ flex: '0 0 50%', overflow: 'hidden' }}>
            <img
              src={ctaImg}
              alt="Learning Adventure"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transform: 'scale(1.15)', transformOrigin: 'center top' }}
            />
          </div>

          {/* Right — Dark content (50%) */}
          <div className="cta-content-panel" style={{ flex: '0 0 50%', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 40px', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
            {/* decorative */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.04, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, #39B54A33, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, #FF4D8D22, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <span className="cta-rocket" style={{ fontSize: '2.2rem', display: 'block', marginBottom: '18px' }}>🚀</span>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: 'clamp(1.3rem, 2vw, 1.9rem)', color: 'white', letterSpacing: '-0.02em', marginBottom: '14px', lineHeight: '1.2' }}>
                Ready to Start Your<br />Learning Adventure?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', fontWeight: '500', marginBottom: '28px', lineHeight: '1.65' }}>
                Join 1000+ students leveling up their Math, Science, and Coding skills every week.
              </p>
              <button
                className="cta-btn"
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
      <section className="faq-section" style={{ background: '#f8fafc', borderTop: '1px solid #f1f5f9', padding: '100px 40px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div className="faq-heading-block" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Questions? We Got You! 🙋
            </h2>
          </div>
          <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item" style={{ background: 'white', border: `1px solid ${openFaq === i ? '#bbf7d0' : '#f1f5f9'}`, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'all 0.2s' }}>
                <button
                  className="faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 28px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1rem', color: openFaq === i ? '#39B54A' : '#0f172a' }}>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={20} color="#39B54A" /> : <ChevronDown size={20} color="#94a3b8" />}
                </button>
                {openFaq === i && (
                  <div className="faq-answer" style={{ padding: '0 28px 22px', color: '#64748b', fontWeight: '500', lineHeight: '1.7', borderTop: '1px solid #f8fafc' }}>
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
