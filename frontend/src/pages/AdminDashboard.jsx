import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus, Users, LayoutDashboard, LogOut,
  ClipboardCheck, Trophy, BarChart2, Trash2, Key,
  FlaskConical, Plus, X, ChevronDown, ChevronUp,
  CheckCircle, Save, ArrowLeft
} from 'lucide-react';
import logo from '../assets/future-minds logo.png';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/* ─── Empty question template ───────────────────────── */
const emptyQuestion = () => ({
  questionText: '',
  options: ['', '', '', ''],
  correctAnswer: 0,
  explanation: ''
});

const AdminDashboard = () => {
  const { allUsers, logout, token } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [tests, setTests] = useState([]);
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({ avgScore: 0, total: 0 });
  const [testCount, setTestCount] = useState(0);
  const [doubts, setDoubts] = useState([]);
  const [replyText, setReplyText] = useState({}); // { doubtId: 'text' }

  /* Create student */
  const [formData, setFormData] = useState({ username: '', password: '', role: 'sub-junior' });
  const [formMsg, setFormMsg] = useState('');

  /* Create test */
  const [testForm, setTestForm] = useState({ title: '', role: 'sub-junior', type: 'mock', category: '', duration: 15 });
  const [testMsg, setTestMsg] = useState('');
  const [showTestForm, setShowTestForm] = useState(false);

  /* Question editor */
  const [editingTest, setEditingTest] = useState(null);   // full test object being edited
  const [questions, setQuestions] = useState([]);         // working copy
  const [saveMsg, setSaveMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const authHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }), [token]);

  const fetchTests = useCallback(async () => {
    try {
      const r = await fetch(`${API_URL}/tests`);
      const data = await r.json();
      if (Array.isArray(data)) { setTests(data); setTestCount(data.length); }
    } catch { }
  }, []);

  const getTopPerformers = () => {
    const userStats = {};
    results.forEach(r => {
      if (!userStats[r.username]) userStats[r.username] = { sum: 0, count: 0 };
      userStats[r.username].sum += r.percentage;
      userStats[r.username].count += 1;
    });
    return Object.entries(userStats)
      .map(([name, s]) => ({ username: name, avg: Math.round(s.sum / s.count) }))
      .sort((a,b) => b.avg - a.avg)
      .slice(0, 3);
  };

  const fetchResults = useCallback(async () => {
    try {
      const r = await fetch(`${API_URL}/results/all`, { headers: authHeaders() });
      if (r.ok) setResults(await r.json());
    } catch { }
  }, [authHeaders]);

  const fetchStats = useCallback(async () => {
    try {
      const r = await fetch(`${API_URL}/results/stats`, { headers: authHeaders() });
      if (r.ok) setStats(await r.json());
    } catch { }
  }, [authHeaders]);

  const fetchDoubts = useCallback(async () => {
    try {
      const r = await fetch(`${API_URL}/doubts/all`, { headers: authHeaders() });
      if (r.ok) setDoubts(await r.json());
    } catch { }
  }, [authHeaders]);

  useEffect(() => { fetchTests(); fetchResults(); fetchStats(); fetchDoubts(); }, [fetchTests, fetchResults, fetchStats, fetchDoubts]);

  /* ── Students ─────────────────────────────────────── */
  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      const r = await fetch(`${API_URL}/users`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ ...formData, name: formData.username })
      });
      const data = await r.json();
      if (data.success) {
        setFormMsg('✅ Student account created!');
        setFormData({ username: '', password: '', role: 'sub-junior' });
        window.location.reload();
      } else { setFormMsg('❌ ' + (data.message || 'Something went wrong')); }
    } catch { setFormMsg('❌ Server error'); }
    setTimeout(() => setFormMsg(''), 4000);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to remove this student? All their records will be lost.')) return;
    try {
      const r = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE', headers: authHeaders() });
      if (r.ok) setAllUsers(allUsers.filter(u => u._id !== id));
    } catch { }
  };

  const handleResetPassword = async (id) => {
    const newPass = window.prompt('Enter new passcode for this student:');
    if (!newPass) return;
    try {
      const r = await fetch(`${API_URL}/users/${id}/reset-password`, {
        method: 'PUT',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPass })
      });
      const data = await r.json();
      alert(data.message || 'Passcode updated!');
    } catch {
      alert('Failed to reset passcode.');
    }
  };

  /* ── Tests ────────────────────────────────────────── */
  const handleCreateTest = async (e) => {
    e.preventDefault();
    try {
      const r = await fetch(`${API_URL}/tests`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ ...testForm, questions: [] })
      });
      const data = await r.json();
      if (data._id) {
        setTestMsg('✅ Test created!');
        setTestForm({ title: '', role: 'sub-junior', type: 'mock', category: '', duration: 15 });
        setShowTestForm(false);
        fetchTests();
      } else { setTestMsg('❌ ' + (data.message || 'Error')); }
    } catch { setTestMsg('❌ Server error'); }
    setTimeout(() => setTestMsg(''), 4000);
  };

  const handleDeleteTest = async (id, title) => {
    if (!window.confirm(`Delete test "${title}"?`)) return;
    try {
      await fetch(`${API_URL}/tests/${id}`, { method: 'DELETE', headers: authHeaders() });
      fetchTests();
    } catch { }
  };

  /* ── Question Editor ─────────────────────────────── */
  const openEditor = (test) => {
    setEditingTest(test);
    setQuestions((test.questions || []).map(q => ({
      questionText: q.questionText || '',
      options: q.options?.length === 4 ? [...q.options] : ['', '', '', ''],
      correctAnswer: q.correctAnswer ?? 0,
      explanation: q.explanation || ''
    })));
    setSaveMsg('');
  };

  const closeEditor = () => { setEditingTest(null); setQuestions([]); setSaveMsg(''); };

  const addQuestion = () => setQuestions(prev => [...prev, emptyQuestion()]);

  const removeQuestion = (i) => setQuestions(prev => prev.filter((_, idx) => idx !== i));

  const updateQuestion = (i, field, value) => {
    setQuestions(prev => prev.map((q, idx) => idx === i ? { ...q, [field]: value } : q));
  };

  const updateOption = (qi, oi, value) => {
    setQuestions(prev => prev.map((q, idx) => {
      if (idx !== qi) return q;
      const opts = [...q.options];
      opts[oi] = value;
      return { ...q, options: opts };
    }));
  };

  const saveQuestions = async () => {
    // validate
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) { setSaveMsg(`❌ Question ${i + 1} has no text`); return; }
      if (q.options.some(o => !o.trim())) { setSaveMsg(`❌ Question ${i + 1} has empty options`); return; }
    }
    setSaving(true);
    try {
      const r = await fetch(`${API_URL}/tests/${editingTest._id}/questions`, {
        method: 'PUT', headers: authHeaders(),
        body: JSON.stringify({ questions })
      });
      const data = await r.json();
      if (data.success) {
        setSaveMsg('✅ Questions saved!');
        fetchTests();
        setTimeout(closeEditor, 1200);
      } else { setSaveMsg('❌ ' + (data.message || 'Save failed')); }
    } catch { setSaveMsg('❌ Server error'); }
    setSaving(false);
  };

  /* ── Doubts ───────────────────────────────────────── */
  const handleReply = async (id) => {
    const text = replyText[id];
    if (!text?.trim()) return;
    try {
      const r = await fetch(`${API_URL}/doubts/${id}/respond`, {
        method: 'PUT', headers: authHeaders(),
        body: JSON.stringify({ response: text })
      });
      if (r.ok) {
        setReplyText({ ...replyText, [id]: '' });
        fetchDoubts();
      }
    } catch { }
  };

  const handleDeleteDoubt = async (id) => {
    if (!window.confirm('Delete this doubt?')) return;
    try {
      const r = await fetch(`${API_URL}/doubts/${id}`, { method: 'DELETE', headers: authHeaders() });
      if (r.ok) fetchDoubts();
    } catch { }
  };

  /* ── Shared Styles ─────────────────────────────── */
  const card = { background: 'white', borderRadius: '28px', padding: '36px', border: '1px solid #f1f5f9', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' };
  const inputStyle = { padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', fontSize: '0.93rem', fontWeight: '600', width: '100%', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' };
  const focusStyle = (e) => { e.target.style.borderColor = '#39B54A'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 4px rgba(57,181,74,0.08)'; };
  const blurStyle = (e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; };

  const roleBadge = (role) => {
    const map = { admin: { bg: '#eef2ff', color: '#6366f1' }, 'sub-junior': { bg: '#fdf2f8', color: '#ec4899' }, junior: { bg: '#f0fdf4', color: '#16a34a' }, senior: { bg: '#fff7ed', color: '#f97316' } };
    const c = map[role] || { bg: '#f8fafc', color: '#64748b' };
    return <span style={{ background: c.bg, color: c.color, padding: '4px 12px', borderRadius: '99px', fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{role}</span>;
  };

  const typeBadge = (type) => {
    const c = type === 'grand' ? { bg: '#fff7ed', color: '#f97316' } : { bg: '#eff6ff', color: '#3b82f6' };
    return <span style={{ background: c.bg, color: c.color, padding: '4px 12px', borderRadius: '99px', fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{type}</span>;
  };

  const sidebarBtn = (active, onClick, icon, label) => (
    <button key={label} onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', borderRadius: '16px', border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', transition: 'all 0.2s', width: '100%', textAlign: 'left', background: active ? '#39B54A' : 'transparent', color: active ? 'white' : '#94a3b8', boxShadow: active ? '0 8px 24px rgba(57,181,74,0.25)' : 'none' }}>
      {icon} {label}
    </button>
  );

  /* ══════════════════════════════════════════════════
     QUESTION EDITOR PANEL
   ══════════════════════════════════════════════════ */
  const renderQuestionEditor = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={closeEditor} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px 18px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; }}>
            <ArrowLeft size={15} /> Back
          </button>
          <div>
            <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2px' }}>Editing Questions</p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.4rem', color: '#0f172a', lineHeight: 1 }}>{editingTest.title}</h2>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '6px 16px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: '900', border: '1px solid #bbf7d0' }}>
            {questions.length} Question{questions.length !== 1 ? 's' : ''}
          </span>
          <button onClick={addQuestion} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '10px 20px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.color = '#3b82f6'; }}>
            <Plus size={15} /> Add Question
          </button>
          <button onClick={saveQuestions} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: saving ? '#94a3b8' : '#39B54A', color: 'white', border: 'none', borderRadius: '12px', padding: '10px 24px', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', boxShadow: '0 6px 20px rgba(57,181,74,0.25)', transition: 'all 0.2s' }}>
            <Save size={15} /> {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
      </div>

      {saveMsg && (
        <div style={{ padding: '12px 18px', borderRadius: '12px', background: saveMsg.startsWith('✅') ? '#f0fdf4' : '#fef2f2', color: saveMsg.startsWith('✅') ? '#16a34a' : '#ef4444', fontWeight: '700', fontSize: '0.9rem', border: `1px solid ${saveMsg.startsWith('✅') ? '#bbf7d0' : '#fecaca'}` }}>
          {saveMsg}
        </div>
      )}

      {questions.length === 0 && (
        <div style={{ ...card, textAlign: 'center', padding: '60px' }}>
          <p style={{ fontSize: '3rem', marginBottom: '16px' }}>📝</p>
          <p style={{ color: '#94a3b8', fontWeight: '700', fontSize: '1rem', marginBottom: '20px' }}>No questions yet. Click "Add Question" to start!</p>
          <button onClick={addQuestion} style={{ background: '#39B54A', color: 'white', border: 'none', borderRadius: '14px', padding: '14px 32px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', boxShadow: '0 6px 20px rgba(57,181,74,0.25)' }}>
            + Add First Question
          </button>
        </div>
      )}

      {/* Question Cards */}
      {questions.map((q, qi) => (
        <div key={qi} style={{ ...card, padding: '28px', position: 'relative', border: '1px solid #e2e8f0' }}>

          {/* Q number + Delete */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.85rem', color: '#39B54A' }}>
                {qi + 1}
              </div>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Question {qi + 1}</span>
            </div>
            <button onClick={() => removeQuestion(qi)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '10px', padding: '7px 14px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: '900', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}>
              <Trash2 size={13} /> Remove
            </button>
          </div>

          {/* Question Text */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>Question Text</label>
            <textarea
              value={q.questionText}
              onChange={e => updateQuestion(qi, 'questionText', e.target.value)}
              placeholder="Type the question here…"
              rows={2}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
              onFocus={focusStyle} onBlur={blurStyle}
            />
          </div>

          {/* Options */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
              Options — Click ✓ to mark correct answer
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {q.options.map((opt, oi) => {
                const isCorrect = q.correctAnswer === oi;
                return (
                  <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isCorrect ? '#f0fdf4' : '#f8fafc', border: `2px solid ${isCorrect ? '#39B54A' : '#e2e8f0'}`, borderRadius: '14px', padding: '8px 12px', transition: 'all 0.2s' }}>
                    <button type="button" onClick={() => updateQuestion(qi, 'correctAnswer', oi)}
                      style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isCorrect ? '#39B54A' : '#e2e8f0', transition: 'all 0.2s' }}
                      title="Mark as correct answer">
                      <CheckCircle size={16} color={isCorrect ? 'white' : '#94a3b8'} />
                    </button>
                    <span style={{ fontSize: '0.72rem', fontWeight: '900', color: isCorrect ? '#16a34a' : '#94a3b8', minWidth: '18px', textTransform: 'uppercase' }}>{String.fromCharCode(65 + oi)}</span>
                    <input
                      type="text"
                      value={opt}
                      onChange={e => updateOption(qi, oi, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                      style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '0.93rem', fontWeight: '600', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          <div>
            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>Explanation <span style={{ color: '#94a3b8', fontWeight: '600', textTransform: 'none', letterSpacing: 0 }}>(shown after answering)</span></label>
            <input
              type="text"
              value={q.explanation}
              onChange={e => updateQuestion(qi, 'explanation', e.target.value)}
              placeholder="Why is this the correct answer?"
              style={inputStyle}
              onFocus={focusStyle} onBlur={blurStyle}
            />
          </div>
        </div>
      ))}

      {/* Bottom Save bar */}
      {questions.length > 0 && (
        <div style={{ position: 'sticky', bottom: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={addQuestion} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: '#3b82f6', border: '2px solid #bfdbfe', borderRadius: '14px', padding: '13px 24px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#eff6ff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}>
            <Plus size={15} /> Add Question
          </button>
          <button onClick={saveQuestions} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: saving ? '#94a3b8' : '#39B54A', color: 'white', border: 'none', borderRadius: '14px', padding: '13px 28px', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', boxShadow: '0 8px 24px rgba(57,181,74,0.3)', transition: 'all 0.2s' }}>
            <Save size={15} /> {saving ? 'Saving…' : 'Save All Questions'}
          </button>
        </div>
      )}
    </div>
  );

  /* ══════════════════════════════════════════════════
     TABS
   ══════════════════════════════════════════════════ */
  const renderOverview = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ROW 1: CORE ACADEMIC STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { icon: <Users size={22} color="#3b82f6" />, bg: '#eff6ff', label: 'Registered Students', value: allUsers.filter(u => u.role !== 'admin').length },
          { icon: <CheckCircle size={22} color="#39B54A" />, bg: '#f0fdf4', label: 'Student Participation', value: new Set(results.map(r => r.username)).size },
          { icon: <ClipboardCheck size={22} color="#8b5cf6" />, bg: '#f5f3ff', label: 'Active Assessments', value: testCount },
          { icon: <Trophy size={22} color="#F15A24" />, bg: '#fff7ed', label: 'Class Average', value: stats.total > 0 ? `${stats.avgScore}%` : '—' },
        ].map((s, i) => (
          <div key={i} style={{ ...card, padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
            <div>
              <p style={{ fontSize: '0.62rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>{s.label}</p>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.8rem', color: '#0f172a', lineHeight: 1 }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
        
        {/* LEFT COLUMN: LOGS & INQUIRIES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* PENDING INQUIRIES ALERT */}
          {doubts.filter(d => d.status === 'pending').length > 0 && (
            <div style={{ ...card, padding: '20px 24px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.1rem', color: '#0f172a', marginBottom: '2px' }}>Academic Inquiries Pending 📝</h4>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>{doubts.filter(d => d.status === 'pending').length} student questions require instructional response.</p>
              </div>
              <button onClick={() => setActiveTab('doubts')} style={{ background: '#0f172a', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: '900', fontSize: '0.72rem', textTransform: 'uppercase', cursor: 'pointer' }}>Address Now</button>
            </div>
          )}

          {/* PERFORMANCE LOG */}
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1rem', color: '#0f172a' }}>Recent Activity Log</h3>
              <button onClick={() => setActiveTab('results')} style={{ background: 'transparent', border: 'none', color: '#39B54A', fontWeight: '900', fontSize: '0.68rem', textTransform: 'uppercase', cursor: 'pointer' }}>Full Report</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ borderBottom: '1px solid #f1f5f9' }}>{['Student', 'Assessment', 'Result', 'Status'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 0', fontSize: '0.62rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{h}</th>)}</tr></thead>
                <tbody>
                  {results.slice(0, 5).map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                      <td style={{ padding: '12px 0', fontWeight: '700', color: '#0f172a', fontSize: '0.82rem' }}>{r.username}</td>
                      <td style={{ padding: '12px 0', color: '#64748b', fontSize: '0.8rem' }}>{r.testTitle}</td>
                      <td style={{ padding: '12px 0', fontWeight: '900', color: '#0f172a', fontSize: '0.82rem' }}>{r.score}/{r.total}</td>
                      <td style={{ padding: '12px 0' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: '900', color: r.percentage >= 75 ? '#39B54A' : '#f97316' }}>
                          {r.percentage >= 75 ? 'DISTINCTION' : r.percentage >= 40 ? 'PASSED' : 'NEEDS REVIEW'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ANALYTICS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* TOP PERFORMERS */}
          <div style={{ ...card, background: '#0f172a', color: 'white', border: 'none' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.9rem', textAlign: 'center', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Top Performance</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {getTopPerformers().map((p, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{p.username}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '900', color: '#39B54A' }}>{p.avg}% Avg</span>
                </div>
              ))}
              {getTopPerformers().length === 0 && <p style={{ fontSize: '0.8rem', opacity: 0.5, textAlign: 'center' }}>No performance data</p>}
            </div>
          </div>

          {/* DISTRIBUTION */}
          <div style={card}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.9rem', color: '#0f172a', textAlign: 'center', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Enrollment</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Sub-Junior', color: '#FF4D8D', count: allUsers.filter(u => u.role === 'sub-junior').length },
                { label: 'Junior', color: '#39B54A', count: allUsers.filter(u => u.role === 'junior').length },
                { label: 'Senior', color: '#F15A24', count: allUsers.filter(u => u.role === 'senior').length }
              ].map((cat, idx) => {
                const total = allUsers.filter(u => u.role !== 'admin').length || 1;
                const pct = (cat.count / total) * 100;
                return (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: '900', color: '#0f172a' }}>{cat.label}</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: '600', color: '#94a3b8' }}>{cat.count}</span>
                    </div>
                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: cat.color, transition: 'width 1s' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.3rem', color: '#0f172a' }}>Student Roster</h3>
        <span style={{ background: '#f8fafc', border: '1px solid #f1f5f9', padding: '6px 16px', borderRadius: '99px', fontSize: '0.68rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{allUsers.filter(u => u.role !== 'admin').length} Students</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ borderBottom: '2px solid #f8fafc' }}>{['Name', 'Username', 'Category', 'Joined', 'Action'].map(h => <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.65rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{h}</th>)}</tr></thead>
          <tbody>
            {allUsers.filter(u => u.role !== 'admin').map((u, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '16px', fontWeight: '700', color: '#0f172a' }}>{u.name || u.username}</td>
                <td style={{ padding: '16px', color: '#64748b', fontSize: '0.9rem' }}>{u.username}</td>
                <td style={{ padding: '16px' }}>{roleBadge(u.role)}</td>
                <td style={{ padding: '16px', color: '#94a3b8', fontSize: '0.82rem' }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                <td style={{ padding: '16px' }}>
                  <button onClick={() => handleDeleteStudent(u._id, u.name || u.username)} style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '10px', padding: '7px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', fontWeight: '900', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }} onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}>
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {allUsers.filter(u => u.role !== 'admin').length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px', fontSize: '0.9rem' }}>No students enrolled yet.</p>}
      </div>
    </div>
  );

  const renderResults = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {[{ label: 'Total Submissions', value: stats.total, color: '#3b82f6', bg: '#eff6ff' }, { label: 'Overall Avg Score', value: stats.total > 0 ? `${stats.avgScore}%` : '—', color: '#39B54A', bg: '#f0fdf4' }].map((s, i) => (
          <div key={i} style={{ ...card, padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><BarChart2 size={24} color={s.color} /></div>
            <div>
              <p style={{ fontSize: '0.68rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '4px' }}>{s.label}</p>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '2rem', color: '#0f172a', lineHeight: 1 }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={card}>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.3rem', color: '#0f172a', marginBottom: '24px' }}>All Test Results</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ borderBottom: '2px solid #f8fafc' }}>{['Student', 'Test', 'Score', 'Percentage', 'Time Taken', 'Date'].map(h => <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.65rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{h}</th>)}</tr></thead>
            <tbody>
              {results.map((r, i) => {
                const pct = r.percentage;
                const pctColor = pct >= 75 ? '#16a34a' : pct >= 50 ? '#f97316' : '#ef4444';
                const pctBg = pct >= 75 ? '#f0fdf4' : pct >= 50 ? '#fff7ed' : '#fef2f2';
                const mins = Math.floor((r.timeTaken || 0) / 60), secs = (r.timeTaken || 0) % 60;
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '14px 16px', fontWeight: '700', color: '#0f172a' }}>{r.username}</td>
                    <td style={{ padding: '14px 16px', color: '#475569', fontSize: '0.9rem' }}>{r.testTitle}</td>
                    <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '700' }}>{r.score}/{r.total}</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ background: pctBg, color: pctColor, padding: '4px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: '900' }}>{pct}%</span></td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>{mins}m {secs}s</td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.82rem' }}>{new Date(r.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {results.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px', fontSize: '0.9rem' }}>No test results yet.</p>}
        </div>
      </div>
    </div>
  );

  const renderDoubts = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.3rem', color: '#0f172a' }}>Student Doubts</h3>
          <span style={{ background: '#f8fafc', border: '1px solid #f1f5f9', padding: '6px 16px', borderRadius: '99px', fontSize: '0.68rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            {doubts.filter(d => d.status === 'pending').length} Pending
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {doubts.map((d, i) => (
            <div key={i} style={{ padding: '24px', borderRadius: '20px', background: d.status === 'answered' ? '#f8fafc' : 'white', border: `1px solid ${d.status === 'answered' ? '#e2e8f0' : '#39B54A'}`, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: '900', fontSize: '0.85rem', color: '#0f172a' }}>{d.username}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94a3b8', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>{d.subject}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(d.createdAt).toLocaleString()}</span>
                  <button onClick={() => handleDeleteDoubt(d._id)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
              </div>
              <p style={{ fontSize: '1rem', color: '#475569', fontWeight: '500', marginBottom: '16px', lineHeight: '1.5' }}>{d.question}</p>
              
              {d.status === 'answered' ? (
                <div style={{ marginTop: '12px', padding: '16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: '900', color: '#39B54A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Expert Response</p>
                  <p style={{ fontSize: '0.93rem', color: '#0f172a', fontWeight: '600' }}>{d.response}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input
                    type="text"
                    value={replyText[d._id] || ''}
                    onChange={(e) => setReplyText({ ...replyText, [d._id]: e.target.value })}
                    placeholder="Type your response here..."
                    style={{ ...inputStyle, padding: '10px 14px' }}
                    onFocus={focusStyle} onBlur={blurStyle}
                  />
                  <button
                    onClick={() => handleReply(d._id)}
                    style={{ background: '#39B54A', color: 'white', border: 'none', borderRadius: '12px', padding: '0 20px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', fontSize: '0.72rem' }}
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))}
          {doubts.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>No doubts posted yet.</p>}
        </div>
      </div>
    </div>
  );

  const renderTests = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => setShowTestForm(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#39B54A', color: 'white', border: 'none', borderRadius: '14px', padding: '13px 24px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', boxShadow: '0 6px 20px rgba(57,181,74,0.25)', transition: 'all 0.2s' }}>
          {showTestForm ? <X size={16} /> : <Plus size={16} />}{showTestForm ? 'Cancel' : 'New Test'}
        </button>
      </div>
      {showTestForm && (
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={20} color="#3b82f6" /></div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.2rem', color: '#0f172a' }}>Create New Test</h3>
          </div>
          <form onSubmit={handleCreateTest} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[{ label: 'Test Title', key: 'title', placeholder: 'e.g. Math Challenge', type: 'text' }, { label: 'Category', key: 'category', placeholder: 'e.g. Math, Science', type: 'text' }, { label: 'Duration (minutes)', key: 'duration', placeholder: '15', type: 'number' }].map(f => (
              <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.68rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={testForm[f.key]} onChange={e => setTestForm({ ...testForm, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value })} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
            ))}
            {[{ label: 'Target Role', key: 'role', options: [['sub-junior', 'Sub-Junior (6–9)'], ['junior', 'Junior (10–12)'], ['senior', 'Senior (13–15)']] }, { label: 'Test Type', key: 'type', options: [['mock', 'Mock Test'], ['grand', 'Grand Test']] }].map(f => (
              <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.68rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{f.label}</label>
                <select value={testForm[f.key]} onChange={e => setTestForm({ ...testForm, [f.key]: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {f.options.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
                </select>
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '14px', padding: '14px 28px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s' }}>Create Test</button>
            </div>
          </form>
          {testMsg && <div style={{ marginTop: '14px', padding: '12px 18px', borderRadius: '12px', background: testMsg.startsWith('✅') ? '#f0fdf4' : '#fef2f2', color: testMsg.startsWith('✅') ? '#16a34a' : '#ef4444', fontWeight: '700', fontSize: '0.88rem' }}>{testMsg}</div>}
        </div>
      )}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.3rem', color: '#0f172a' }}>All Tests</h3>
          <span style={{ background: '#f8fafc', border: '1px solid #f1f5f9', padding: '6px 16px', borderRadius: '99px', fontSize: '0.68rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{tests.length} Tests</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ borderBottom: '2px solid #f8fafc' }}>{['Title', 'Category', 'Role', 'Type', 'Duration', 'Questions', 'Actions'].map(h => <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.65rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{h}</th>)}</tr></thead>
            <tbody>
              {tests.map((t, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: '#0f172a' }}>{t.title}</td>
                  <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '0.9rem' }}>{t.category}</td>
                  <td style={{ padding: '14px 16px' }}>{roleBadge(t.role)}</td>
                  <td style={{ padding: '14px 16px' }}>{typeBadge(t.type)}</td>
                  <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>{t.duration}m</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1rem', color: (t.questions || []).length === 0 ? '#ef4444' : '#0f172a' }}>
                      {(t.questions || []).length}
                    </span>
                    {(t.questions || []).length === 0 && <span style={{ marginLeft: '6px', fontSize: '0.65rem', color: '#ef4444', fontWeight: '700' }}>⚠ None</span>}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {/* Edit Questions Button */}
                      <button onClick={() => openEditor(t)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '7px 14px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: '900', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#39B54A'; e.currentTarget.style.color = 'white'; }} onMouseLeave={e => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.color = '#16a34a'; }}>
                        ✎ Questions
                      </button>
                      <button onClick={() => handleDeleteTest(t._id, t.title)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '10px', padding: '7px 14px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: '900', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }} onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tests.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px', fontSize: '0.9rem' }}>No tests yet.</p>}
        </div>
      </div>
    </div>
  );

  /* ══════════════════════════════════════════════════
     LAYOUT
   ══════════════════════════════════════════════════ */
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', padding: '24px', paddingTop: '104px', gap: '24px' }}>
      <aside style={{ width: '270px', flexShrink: 0, background: 'white', borderRadius: '32px', padding: '32px 20px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 30px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginBottom: '36px' }}>
          <img src={logo} alt="Logo" style={{ height: '44px', width: 'auto' }} />
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.3rem', lineHeight: 1 }}>
            <span style={{ color: '#0f172a' }}>Future</span><span style={{ color: '#39B54A' }}>Minds</span>
          </span>
        </div>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {sidebarBtn(activeTab === 'overview' && !editingTest, () => { closeEditor(); setActiveTab('overview'); }, <LayoutDashboard size={17} />, 'Overview')}
          {sidebarBtn(activeTab === 'students' && !editingTest, () => { closeEditor(); setActiveTab('students'); }, <Users size={17} />, 'Students')}
          {sidebarBtn(activeTab === 'results' && !editingTest, () => { closeEditor(); setActiveTab('results'); }, <BarChart2 size={17} />, 'Results')}
          {sidebarBtn(activeTab === 'tests' || !!editingTest, () => { closeEditor(); setActiveTab('tests'); }, <FlaskConical size={17} />, 'Manage Tests')}
          {sidebarBtn(activeTab === 'doubts' && !editingTest, () => { closeEditor(); setActiveTab('doubts'); }, <ClipboardCheck size={17} />, 'Doubts')}
        </nav>
        <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', marginTop: '16px', borderRadius: '14px', border: 'none', background: 'transparent', color: '#94a3b8', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', cursor: 'pointer', transition: 'all 0.2s', width: '100%' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}>
          <LogOut size={17} /> Logout
        </button>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
        <div>
          <p style={{ color: '#39B54A', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.68rem', marginBottom: '8px', fontStyle: 'italic' }}>Academic Director</p>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '2.6rem', color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {editingTest ? `✏️ ${editingTest.title}` : "Instructional Oversight Hub 🛡️"}
          </h1>
        </div>

        {editingTest
          ? renderQuestionEditor()
          : activeTab === 'overview' ? renderOverview()
          : activeTab === 'students' ? renderStudents()
          : activeTab === 'results' ? renderResults()
          : activeTab === 'doubts' ? renderDoubts()
          : renderTests()
        }
      </main>
    </div>
  );
};

export default AdminDashboard;
