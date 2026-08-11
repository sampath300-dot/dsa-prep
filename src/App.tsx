import React, { useState, useEffect } from 'react';
import { ExternalLink, Trash2, Search, Plus, RotateCcw, Moon, Sun, Shield, ArrowLeft, ArrowRight, Building2, BookOpen, Target, User, LogIn } from 'lucide-react';
import type { Problem, Difficulty } from './types';
import { INITIAL_PROBLEMS, TOPICS_LIST, COMPANY_LIST } from './data';
import { getCompanyLogoComponent } from './CompanyLogos';
import NNDLDashboard from './components/NNDLDashboard';

type Theme = 'black' | 'dark' | 'light';
type MainNavTab = 'concepts' | 'companies' | 'daily-plan';

export default function App() {
  // Current logged in username (default 'default_user')
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem('dsa_tracker_active_user') || 'default_user';
  });

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginInput, setLoginInput] = useState('');

  // Per-user problem state
  const [problems, setProblems] = useState<Problem[]>(() => {
    const activeUser = localStorage.getItem('dsa_tracker_active_user') || 'default_user';
    const saved = localStorage.getItem(`dsa_tracker_user_${activeUser}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PROBLEMS;
      }
    }
    return INITIAL_PROBLEMS;
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('dsa_tracker_theme');
    return (saved as Theme) || 'black';
  });

  // Top Nav Tab: 'concepts' | 'companies' | 'daily-plan'
  const [mainNavTab, setMainNavTab] = useState<MainNavTab>('concepts');

  // Navigation State: null = Home Page, string = Topic ID or Company ID
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  // Difficulty Tab inside Topic View (default 'Easy')
  const [selectedDifficultyTab, setSelectedDifficultyTab] = useState<Difficulty | 'All'>('Easy');

  // Filter States
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Solved' | 'Unsolved'>('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');

  // Save problems per user
  useEffect(() => {
    localStorage.setItem(`dsa_tracker_user_${username}`, JSON.stringify(problems));
    localStorage.setItem('dsa_tracker_active_user', username);
  }, [problems, username]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dsa_tracker_theme', theme);
  }, [theme]);

  // Handle Login / Switch User
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInput.trim()) return;

    const newUsername = loginInput.trim().toLowerCase();
    setUsername(newUsername);
    localStorage.setItem('dsa_tracker_active_user', newUsername);

    // Load user problems or initialize default
    const saved = localStorage.getItem(`dsa_tracker_user_${newUsername}`);
    if (saved) {
      try {
        setProblems(JSON.parse(saved));
      } catch (e) {
        setProblems(INITIAL_PROBLEMS);
      }
    } else {
      setProblems(INITIAL_PROBLEMS);
    }

    setLoginInput('');
    setShowLoginModal(false);
  };

  const activeTopic = TOPICS_LIST.find(t => t.id === selectedTopicId);
  const activeCompany = COMPANY_LIST.find(c => c.id === selectedCompanyId);

  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const diffToUse: Difficulty = selectedDifficultyTab === 'All' ? difficulty : (selectedDifficultyTab as Difficulty);

    const newProb: Problem = {
      id: Date.now(),
      name: name.trim(),
      concept: activeCompany ? `company-${activeCompany.id}` : (activeTopic ? activeTopic.concept : 'String'),
      company: activeCompany ? activeCompany.id : undefined,
      level: activeCompany ? `${activeCompany.name} Problem` : `${diffToUse} Problem`,
      difficulty: diffToUse,
      link: link.trim() || undefined,
      notes: notes.trim() || undefined,
      solved: false,
      addedAt: Date.now(),
    };

    setProblems([newProb, ...problems]);
    setName('');
    setLink('');
    setNotes('');
    setShowAddForm(false);
  };

  const toggleSolved = (id: number) => {
    setProblems(problems.map(p => p.id === id ? { ...p, solved: !p.solved } : p));
  };

  const deleteProblem = (id: number) => {
    setProblems(problems.filter(p => p.id !== id));
  };

  const resetToInitial = () => {
    if (window.confirm(`Reset ${username}'s list to default 25 String problems?`)) {
      setProblems(INITIAL_PROBLEMS);
    }
  };

  const totalOverall = problems.length;
  const solvedOverall = problems.filter(p => p.solved).length;
  const percentageOverall = totalOverall > 0 ? Math.round((solvedOverall / totalOverall) * 100) : 0;

  // Filter problems for active topic OR company
  const viewProblems = activeCompany
    ? problems.filter(p => p.company === activeCompany.id || p.concept === `company-${activeCompany.id}`)
    : (activeTopic
        ? problems.filter(p => p.concept.toLowerCase() === activeTopic.concept.toLowerCase())
        : problems
      );

  const topicProblemsWithDifficulty = (selectedDifficultyTab === 'All' || activeCompany)
    ? viewProblems
    : viewProblems.filter(p => p.difficulty === selectedDifficultyTab);

  const filteredProblems = topicProblemsWithDifficulty.filter(p => {
    if (statusFilter === 'Solved' && !p.solved) return false;
    if (statusFilter === 'Unsolved' && p.solved) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.concept.toLowerCase().includes(q) ||
        (p.notes && p.notes.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '24px 20px', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      {/* ── HEADER ── */}
      <header style={{ marginBottom: '24px', paddingBottom: '18px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h1 
              onClick={() => { setSelectedTopicId(null); setSelectedCompanyId(null); }}
              style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>DSA Tracker</span>
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Overall Progress: {solvedOverall} / {totalOverall} Solved ({percentageOverall}%)
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            
            {/* User Account / Switch Login */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '8px', padding: '4px 10px' }}>
              <User size={15} color="var(--primary)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>
                {username}
              </span>
              <button
                onClick={() => setShowLoginModal(true)}
                title="Switch User Account / Login"
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px 4px', display: 'flex', alignItems: 'center' }}
              >
                <LogIn size={14} />
              </button>
            </div>

            {/* Theme Toggle Buttons */}
            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => setTheme('black')}
                title="Black Night Mode"
                style={{
                  background: theme === 'black' ? 'var(--panel-hover)' : 'transparent',
                  color: theme === 'black' ? '#fff' : 'var(--text-muted)',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Shield size={14} /> Black Night
              </button>
              <button
                onClick={() => setTheme('dark')}
                title="Dark Mode"
                style={{
                  background: theme === 'dark' ? 'var(--panel-hover)' : 'transparent',
                  color: theme === 'dark' ? 'var(--primary)' : 'var(--text-muted)',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Moon size={14} /> Dark
              </button>
              <button
                onClick={() => setTheme('light')}
                title="Light Mode"
                style={{
                  background: theme === 'light' ? 'var(--panel-hover)' : 'transparent',
                  color: theme === 'light' ? '#0284c7' : 'var(--text-muted)',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Sun size={14} /> Light
              </button>
            </div>

            <button
              onClick={resetToInitial}
              title="Reset 25 String Problems"
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <RotateCcw size={15} /> Reset
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: '5px', background: 'var(--border)', borderRadius: '3px', marginTop: '14px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${percentageOverall}%`, background: 'var(--success)', transition: 'width 0.3s' }} />
        </div>
      </header>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <form onSubmit={handleLoginSubmit} style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', maxWidth: '400px', width: '100%' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '6px' }}>User Login / Switch Account</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Log in with your username to save and track your personal problem progress separately.
            </p>

            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>Username / Student Name *</label>
            <input
              type="text"
              placeholder="e.g. sampa"
              value={loginInput}
              onChange={e => setLoginInput(e.target.value)}
              required
              style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px 12px', color: 'var(--text)', fontSize: '0.9rem', marginBottom: '18px' }}
            />

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '8px 16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ background: 'var(--primary)', color: '#0f172a', border: 'none', padding: '8px 20px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
              >
                Login & Load Progress
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── HOME DASHBOARD VIEW ── */}
      {selectedTopicId === null && selectedCompanyId === null ? (
        <div>
          {/* Main Nav Tabs: Concepts vs Companies vs Daily Plan */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setMainNavTab('concepts')}
              style={{
                background: mainNavTab === 'concepts' ? 'var(--panel-hover)' : 'transparent',
                color: mainNavTab === 'concepts' ? 'var(--primary)' : 'var(--text-muted)',
                border: `1px solid ${mainNavTab === 'concepts' ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <BookOpen size={18} /> Concept Sheets
            </button>

            <button
              onClick={() => setMainNavTab('companies')}
              style={{
                background: mainNavTab === 'companies' ? 'var(--panel-hover)' : 'transparent',
                color: mainNavTab === 'companies' ? '#facc15' : 'var(--text-muted)',
                border: `1px solid ${mainNavTab === 'companies' ? '#facc15' : 'var(--border)'}`,
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Building2 size={18} /> Company Specific Questions
            </button>

            <button
              onClick={() => setMainNavTab('daily-plan')}
              style={{
                background: mainNavTab === 'daily-plan' ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
                color: mainNavTab === 'daily-plan' ? 'var(--success)' : 'var(--text-muted)',
                border: `1px solid ${mainNavTab === 'daily-plan' ? 'var(--success)' : 'var(--border)'}`,
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Target size={18} /> Smart Daily Plan
            </button>
          </div>

          {/* TAB 1: CONCEPT SHEETS */}
          {mainNavTab === 'concepts' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>DSA Concept Modules</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Select a topic below to view its Easy, Medium, and Hard problems.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
                {TOPICS_LIST.map(topic => {
                  const topicProbs = problems.filter(p => p.concept.toLowerCase() === topic.concept.toLowerCase());
                  const tSolved = topicProbs.filter(p => p.solved).length;
                  const tTotal = topicProbs.length;
                  const tPct = tTotal > 0 ? Math.round((tSolved / tTotal) * 100) : 0;

                  return (
                    <div
                      key={topic.id}
                      onClick={() => {
                        setSelectedTopicId(topic.id);
                        setSelectedDifficultyTab('Easy');
                      }}
                      style={{
                        background: 'var(--panel)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        padding: '22px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ fontSize: '2rem' }}>{topic.icon}</span>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80' }}>Easy</span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: 'rgba(250, 204, 21, 0.15)', color: '#facc15' }}>Med</span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: 'rgba(248, 113, 113, 0.15)', color: '#f87171' }}>Hard</span>
                          </div>
                        </div>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>
                          {topic.title}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '18px' }}>
                          {topic.description}
                        </p>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                          <span>{tTotal} {tTotal === 1 ? 'Problem' : 'Problems'}</span>
                          <span style={{ fontWeight: 700, color: tSolved > 0 ? 'var(--success)' : 'var(--text-muted)' }}>
                            {tSolved} / {tTotal} Solved
                          </span>
                        </div>

                        <div style={{ height: '5px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden', marginBottom: '14px' }}>
                          <div style={{ height: '100%', width: `${tPct}%`, background: 'var(--success)', transition: 'width 0.3s' }} />
                        </div>

                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          Explore {topic.title} <ArrowRight size={15} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: COMPANY SPECIFIC QUESTIONS */}
          {mainNavTab === 'companies' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={20} color="#facc15" /> Company Interview Sheets
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Target specific top tech companies. Select a company to view or add questions you want to practice!
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '18px' }}>
                {COMPANY_LIST.map(comp => {
                  const compProbs = problems.filter(p => p.company === comp.id || p.concept === `company-${comp.id}`);
                  const cSolved = compProbs.filter(p => p.solved).length;
                  const cTotal = compProbs.length;
                  const cPct = cTotal > 0 ? Math.round((cSolved / cTotal) * 100) : 0;

                  return (
                    <div
                      key={comp.id}
                      onClick={() => {
                        setSelectedCompanyId(comp.id);
                        setSelectedDifficultyTab('All');
                      }}
                      style={{
                        background: 'var(--panel)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        padding: '22px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = '#facc15')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>
                            {getCompanyLogoComponent(comp.id, 24)}
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: '6px', background: 'rgba(250, 204, 21, 0.12)', color: '#facc15' }}>
                            Company Sheet
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '6px' }}>
                          {comp.name}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '18px' }}>
                          {comp.description}
                        </p>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                          <span>{cTotal} {cTotal === 1 ? 'Problem' : 'Problems'}</span>
                          <span style={{ fontWeight: 700, color: cSolved > 0 ? 'var(--success)' : 'var(--text-muted)' }}>
                            {cSolved} / {cTotal} Solved
                          </span>
                        </div>

                        <div style={{ height: '5px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden', marginBottom: '14px' }}>
                          <div style={{ height: '100%', width: `${cPct}%`, background: '#facc15', transition: 'width 0.3s' }} />
                        </div>

                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#facc15', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          Open {comp.name} Questions <ArrowRight size={15} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SMART DAILY PRACTICE PLAN */}
          {mainNavTab === 'daily-plan' && <NNDLDashboard problems={problems} onToggleSolved={toggleSolved} />}
        </div>
      ) : (
        /* ── DETAIL PROBLEM LIST VIEW (Topic OR Company) ── */
        <div>
          {/* Back button & Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <button
              onClick={() => { setSelectedTopicId(null); setSelectedCompanyId(null); }}
              style={{
                background: 'var(--panel)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ArrowLeft size={18} /> {activeCompany ? 'Back to Companies' : 'Back to Concept Modules'}
            </button>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              style={{
                background: 'var(--primary)',
                color: '#0f172a',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus size={16} /> {showAddForm ? 'Close Form' : `Add Problem`}
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {activeCompany ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>
                  {getCompanyLogoComponent(activeCompany.id, 22)}
                </span>
              ) : (
                <span>{activeTopic?.icon}</span>
              )}
              <span>{activeCompany ? `${activeCompany.name} Interview Questions` : activeTopic?.title}</span>
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {activeCompany ? activeCompany.description : activeTopic?.description}
            </p>
          </div>

          {/* ── DIFFICULTY TABS (For Topics) ── */}
          {activeTopic && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              {(['Easy', 'Medium', 'Hard'] as const).map(diff => {
                const count = problems.filter(p => 
                  p.concept.toLowerCase() === activeTopic?.concept.toLowerCase() && p.difficulty === diff
                ).length;
                const solvedCount = problems.filter(p => 
                  p.concept.toLowerCase() === activeTopic?.concept.toLowerCase() && p.difficulty === diff && p.solved
                ).length;

                const isSelected = selectedDifficultyTab === diff;
                const activeColor = diff === 'Easy' ? '#4ade80' : diff === 'Medium' ? '#facc15' : '#f87171';

                return (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficultyTab(diff)}
                    style={{
                      background: isSelected ? 'var(--panel-hover)' : 'var(--panel)',
                      color: isSelected ? activeColor : 'var(--text-muted)',
                      border: `1px solid ${isSelected ? activeColor : 'var(--border)'}`,
                      borderRadius: '8px',
                      padding: '8px 18px',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{diff === 'Easy' ? '🟢 Easy' : diff === 'Medium' ? '🟡 Medium' : '🔴 Hard'}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8, background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: '4px' }}>
                      {solvedCount}/{count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ADD PROBLEM FORM */}
          {showAddForm && (
            <form onSubmit={handleAddProblem} style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px' }}>
                Add Problem to {activeCompany ? activeCompany.name : activeTopic?.title}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>Problem Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Two Sum"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '9px 12px', color: 'var(--text)', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value as Difficulty)}
                    style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '9px 12px', color: 'var(--text)', fontSize: '0.9rem' }}
                  >
                    <option value="Easy">🟢 Easy</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Hard">🔴 Hard</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>LeetCode Link (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '9px 12px', color: 'var(--text)', fontSize: '0.9rem' }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>Notes / Frequency / Key Insight (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Asked 5+ times in phone screen, use Hash Map"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '9px 12px', color: 'var(--text)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>
              <button type="submit" style={{ background: 'var(--primary)', color: '#0f172a', border: 'none', padding: '9px 20px', borderRadius: '6px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                Save Problem
              </button>
            </form>
          )}

          {/* SEARCH & STATUS TOOLBAR */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 260px', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="text"
                placeholder={`Search inside ${activeCompany ? activeCompany.name : activeTopic?.title}...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '8px', padding: '9px 12px 9px 38px', color: 'var(--text)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
              {(['All', 'Solved', 'Unsolved'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  style={{
                    background: statusFilter === st ? 'var(--panel-hover)' : 'transparent',
                    color: statusFilter === st ? 'var(--text)' : 'var(--text-muted)',
                    border: 'none',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* PROBLEM ROWS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredProblems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', background: 'var(--panel)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                {activeCompany 
                  ? `No problems added for ${activeCompany.name} yet! Click Add Problem above to start building your ${activeCompany.name} question list.`
                  : `No ${selectedDifficultyTab} problems found for ${activeTopic?.title}. Click Add Problem above to add one!`
                }
              </div>
            ) : (
              filteredProblems.map(p => (
                <div
                  key={p.id}
                  style={{
                    background: p.solved ? 'var(--success-bg)' : 'var(--panel)',
                    border: `1px solid ${p.solved ? 'var(--success-border)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px'
                  }}
                >
                  {/* Checkbox & Details */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                    <input
                      type="checkbox"
                      checked={p.solved}
                      onChange={() => toggleSolved(p.id)}
                      title={p.solved ? 'Mark Unsolved' : 'Mark Solved'}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        
                        {/* Title text links to problem URL if available */}
                        {p.link ? (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontWeight: 600,
                              fontSize: '1rem',
                              color: p.solved ? 'var(--text-muted)' : 'var(--text)',
                              textDecoration: p.solved ? 'line-through' : 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            <span>{p.name}</span>
                            <ExternalLink size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                          </a>
                        ) : (
                          <span style={{
                            fontWeight: 600,
                            fontSize: '1rem',
                            color: p.solved ? 'var(--text-muted)' : 'var(--text)',
                            textDecoration: p.solved ? 'line-through' : 'none'
                          }}>
                            {p.name}
                          </span>
                        )}

                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          color: p.difficulty === 'Easy' ? '#4ade80' : p.difficulty === 'Medium' ? '#facc15' : '#f87171',
                          background: 'rgba(255,255,255,0.06)'
                        }}>
                          {p.difficulty}
                        </span>
                      </div>

                      {/* Level & Notes */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          {p.level}
                        </span>

                        {p.notes && (
                          <>
                            <span>•</span>
                            <span style={{ color: 'var(--text-dim)' }}>
                              {p.notes}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => deleteProblem(p.id)}
                    title="Delete"
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '6px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
