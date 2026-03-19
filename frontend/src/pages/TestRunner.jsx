import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ChevronRight, Trophy, RotateCcw, Home, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import scoreBg from '../assets/future minds 5.jpg';

const TestRunner = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const test = location.state?.test;

    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [saved, setSaved] = useState(false);
    const [doubtSent, setDoubtSent] = useState(null); // { questionIndex: true }
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!test) navigate('/all-tests');
    }, [test]);

    if (!test) return null;

    const questions = test.questions || [];
    const question = questions[currentQ];
    const totalQ = questions.length;
    const progress = (currentQ / totalQ) * 100;

    const getColor = () => {
        if (user?.role === 'sub-junior') return '#FF4D8D';
        if (user?.role === 'junior') return '#39B54A';
        return '#F15A24';
    };
    const color = getColor();

    const handleSelect = (idx) => {
        if (selected !== null) return;
        setSelected(idx);
        setShowExplanation(true);
    };

    const handleNext = () => {
        const newAnswers = [...answers, { selected, correct: question.correctAnswer }];
        setAnswers(newAnswers);
        setSelected(null);
        setShowExplanation(false);
        if (currentQ + 1 >= totalQ) {
            finishTest(newAnswers);
        } else {
            setCurrentQ(currentQ + 1);
        }
    };

    const finishTest = async (finalAnswers) => {
        const score = finalAnswers.filter(a => a.selected === a.correct).length;
        const percentage = Math.round((score / totalQ) * 100);
        setShowResult(true);

        // Save result to DB
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    testId: test._id,
                    testTitle: test.title,
                    score,
                    total: totalQ,
                    percentage
                })
            });
            setSaved(true);
        } catch (err) {
            console.error('Failed to save result:', err);
        }
    };

    const handleAskDoubt = async () => {
        if (!question) return;
        setIsSubmitting(true);
        try {
            const r = await fetch(`${import.meta.env.VITE_API_URL}/doubts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    subject: `Review: ${test.title}`,
                    question: `I have a doubt about Q${currentQ + 1}: ${question.questionText}. (Test: ${test.title})`
                })
            });
            if (r.ok) {
                setDoubtSent({ ...doubtSent, [currentQ]: true });
            }
        } catch (err) {
            console.error('Failed to send doubt:', err);
        }
        setIsSubmitting(false);
    };

    const score = answers.filter(a => a.selected === a.correct).length;
    const percentage = Math.round((score / totalQ) * 100);

    const getScoreEmoji = () => {
        if (percentage >= 80) return '🏆';
        if (percentage >= 60) return '⭐';
        if (percentage >= 40) return '👍';
        return '💪';
    };

    const getScoreMessage = () => {
        if (percentage >= 80) return 'Amazing! You are a star!';
        if (percentage >= 60) return 'Great job! Keep it up!';
        if (percentage >= 40) return 'Good effort! Practice more!';
        return "Don't give up! Try again!";
    };

    // ── RESULT SCREEN ──────────────────────────────────────────
    if (showResult) {
        return (
            <div style={{ minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px', fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>
                
                {/* Background Layer for Mobile */}
                <div 
                    className="mobile-score-bg" 
                    style={{ 
                        display: 'none', 
                        position: 'absolute', 
                        inset: 0, 
                        background: `url("${scoreBg}") center/cover no-repeat`, 
                        opacity: 0.15,
                        zIndex: 0 
                    }} 
                />

                <style>{`
                    @media (max-width: 768px) {
                        .mobile-score-bg { display: block !important; }
                    }
                `}</style>

                <div style={{ maxWidth: '480px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '28px', position: 'relative', zIndex: 1 }}>

                    {/* Score Summary (Side-by-Side) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', justifyContent: 'center', width: '100%', marginBottom: '10px' }}>
                        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: `linear-gradient(135deg, ${color}, #0f172a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 30px ${color}33`, flexShrink: 0 }}>
                            <span style={{ fontSize: '3.2rem' }}>{getScoreEmoji()}</span>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.6rem', marginBottom: '2px' }}>Test Result</p>
                            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '4rem', color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1, margin: 0 }}>{score}/{totalQ}</h1>
                        </div>
                    </div>

                    <div style={{ marginTop: '-10px' }}>
                        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', marginBottom: '8px' }}>Test Complete! {saved ? '✅ Saved' : ''}</p>
                        <p style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif' }}>{getScoreMessage()}</p>
                    </div>

                    {/* Progress bar */}
                    <div style={{ width: '100%', height: '14px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: `${percentage}%`, height: '100%', background: color, borderRadius: '99px', transition: 'width 1s' }} />
                    </div>
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.8rem', color }}>{percentage}% Score</p>

                    {/* Answer dots */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                        {answers.map((a, i) => (
                            <div key={i} style={{ flex: 1, minWidth: '32px', height: '10px', borderRadius: '99px', background: a.selected === a.correct ? '#4ade80' : '#f87171' }} />
                        ))}
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                        <button
                            onClick={() => { setCurrentQ(0); setAnswers([]); setSelected(null); setShowResult(false); setShowExplanation(false); setSaved(false); }}
                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '16px', padding: '16px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
                            onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}
                        >
                            <RotateCcw size={18} /> Try Again
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: color, color: 'white', border: 'none', borderRadius: '16px', padding: '16px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', boxShadow: `0 8px 24px ${color}33`, transition: 'all 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            <Home size={18} /> Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── QUESTION SCREEN ────────────────────────────────────────
    return (
        <div style={{ minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column', padding: '100px 24px 40px', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <p style={{ fontSize: '0.72rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8', marginBottom: '4px' }}>{test.category} • {test.title}</p>
                        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.5rem', color: '#0f172a' }}>Question {currentQ + 1} of {totalQ}</p>
                    </div>
                    <div style={{ background: color, color: 'white', padding: '8px 20px', borderRadius: '99px', fontSize: '0.72rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                        {test.duration} mins
                    </div>
                </div>

                {/* Progress bar */}
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: color, borderRadius: '99px', transition: 'width 0.4s' }} />
                </div>

                {/* Question Card */}
                <div style={{ background: 'white', border: '1px solid #f1f5f9', borderRadius: '28px', padding: '44px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', flex: 1 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.5rem', color: '#0f172a', marginBottom: '32px', lineHeight: '1.4' }}>
                        {question.questionText}
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {question.options.map((opt, idx) => {
                            let bg = 'white', borderColor = '#e2e8f0', textColor = '#334155', opacity = 1;
                            if (selected !== null) {
                                if (idx === question.correctAnswer) {
                                    bg = '#f0fdf4'; borderColor = '#4ade80'; textColor = '#166534';
                                } else if (idx === selected && selected !== question.correctAnswer) {
                                    bg = '#fff1f2'; borderColor = '#f87171'; textColor = '#991b1b';
                                } else {
                                    opacity = 0.45;
                                }
                            }
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(idx)}
                                    disabled={selected !== null}
                                    style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 22px', borderRadius: '16px', border: `2px solid ${borderColor}`, background: bg, color: textColor, fontSize: '1rem', fontWeight: '600', cursor: selected === null ? 'pointer' : 'default', opacity, transition: 'all 0.2s' }}
                                >
                                    <span style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: '900', color: '#64748b', flexShrink: 0 }}>
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span style={{ flex: 1 }}>{opt}</span>
                                    {selected !== null && idx === question.correctAnswer && <CheckCircle size={20} color="#16a34a" style={{ flexShrink: 0 }} />}
                                    {selected !== null && idx === selected && selected !== question.correctAnswer && <XCircle size={20} color="#dc2626" style={{ flexShrink: 0 }} />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Explanation */}
                    {showExplanation && question.explanation && (
                        <div style={{ marginTop: '24px', padding: '20px 24px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '16px', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <p style={{ fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>💡 Explanation</p>
                                {doubtSent?.[currentQ] ? (
                                    <span style={{ fontSize: '0.65rem', fontWeight: '900', color: '#16a34a', background: '#f0fdf4', padding: '4px 8px', borderRadius: '6px' }}>✓ Doubt Sent</span>
                                ) : (
                                    <button 
                                        disabled={isSubmitting}
                                        onClick={handleAskDoubt}
                                        style={{ background: 'white', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.65rem', fontWeight: '900', padding: '4px 10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', transition: 'all 0.2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}
                                    >
                                        <Zap size={12} fill={color} color={color} /> {isSubmitting ? 'Sending...' : 'Ask Doubt'}
                                    </button>
                                )}
                            </div>
                            <p style={{ color: '#334155', fontWeight: '500', lineHeight: '1.6' }}>{question.explanation}</p>
                        </div>
                    )}
                </div>

                {/* Next Button */}
                {selected !== null && (
                    <button
                        onClick={handleNext}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: color, color: 'white', border: 'none', borderRadius: '18px', padding: '20px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', boxShadow: `0 10px 30px ${color}33`, transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        {currentQ + 1 >= totalQ ? <><Trophy size={22} /> See My Score</> : <>Next Question <ChevronRight size={22} strokeWidth={3} /></>}
                    </button>
                )}
            </div>
        </div>
    );
};

export default TestRunner;
