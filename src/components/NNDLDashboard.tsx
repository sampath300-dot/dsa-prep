import { useState } from 'react';
import { Target, Zap, Clock, CheckCircle, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react';
import { calculateRealRetention, analyzeCodeComplexity } from '../nndl/NeuralNetwork';
import type { Problem } from '../types';

interface Props {
  problems: Problem[];
  onToggleSolved: (id: number) => void;
}

export default function NNDLDashboard({ problems, onToggleSolved }: Props) {
  const [userCode, setUserCode] = useState('');
  const [codeAnalysis, setCodeAnalysis] = useState<{ timeComplexity: string; spaceComplexity: string; loopCount: number } | null>(null);

  // Compute retention & daily recommendations
  const solvedProblems = problems.filter(p => p.solved);
  const unsolvedProblems = problems.filter(p => !p.solved);

  const retentionList = solvedProblems.map(p => ({
    problem: p,
    retention: calculateRealRetention(p.addedAt, p.difficulty)
  }));

  // Identify problems needing revision (retention < 70%)
  const revisionDue = retentionList.filter(item => item.retention < 70);

  // Daily Recommended Plan: Pick 2 revision items + 1 unsolved target
  const dailyRecommendations = [
    ...revisionDue.slice(0, 2).map(r => ({
      problem: r.problem,
      type: 'Revision Due' as const,
      reason: `Retention at ${r.retention}%. Revise today to retain algorithm.`
    })),
    ...unsolvedProblems.slice(0, 3 - Math.min(2, revisionDue.length)).map(u => ({
      problem: u,
      type: 'New Target' as const,
      reason: `High priority ${u.difficulty} problem in ${u.level}.`
    }))
  ];

  const handleAnalyzeCode = () => {
    if (!userCode.trim()) return;
    const res = analyzeCodeComplexity(userCode);
    setCodeAnalysis(res);
  };

  return (
    <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
      
      {/* Clean Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
            <Target size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)' }}>
              Smart Daily Practice Plan
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Spaced Repetition & Code Complexity Analysis
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Daily Plan + Code Complexity Analyzer */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        
        {/* FEATURE 1: SMART DAILY PRACTICE PLAN */}
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '18px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
            <Zap size={18} color="#facc15" /> Recommended Today
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
            Problems selected for optimal revision and practice based on memory retention.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {dailyRecommendations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                No active recommendations. Great job keeping your practice up to date!
              </div>
            ) : (
              dailyRecommendations.map(item => (
                <div key={item.problem.id} style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        background: item.type === 'Revision Due' ? 'rgba(250, 204, 21, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                        color: item.type === 'Revision Due' ? '#facc15' : 'var(--primary)'
                      }}>
                        {item.type}
                      </span>
                      
                      {/* Clickable Problem Title Text */}
                      {item.problem.link ? (
                        <a
                          href={item.problem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            color: 'var(--text)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>{item.problem.name}</span>
                          <ExternalLink size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                        </a>
                      ) : (
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.problem.name}
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                      {item.reason}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => onToggleSolved(item.problem.id)}
                      style={{
                        background: item.problem.solved ? 'var(--success-bg)' : 'var(--panel-hover)',
                        color: item.problem.solved ? 'var(--success)' : 'var(--text)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <CheckCircle size={14} /> {item.problem.solved ? 'Solved' : 'Mark Done'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* FEATURE 2: INSTANT CODE COMPLEXITY ANALYZER */}
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '18px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
            <Clock size={18} color="var(--primary)" /> Code Complexity Evaluator
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.4 }}>
            Paste your solution code to evaluate Big-O Time & Space Complexity.
          </p>

          <textarea
            rows={4}
            placeholder="Paste your solution C++ / Java / Python / JS code here..."
            value={userCode}
            onChange={e => setUserCode(e.target.value)}
            style={{ width: '100%', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px', color: 'var(--text)', fontSize: '0.82rem', fontFamily: 'monospace', resize: 'none', marginBottom: '10px' }}
          />

          <button
            onClick={handleAnalyzeCode}
            style={{
              width: '100%',
              background: 'var(--panel-hover)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              padding: '8px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '12px'
            }}
          >
            <RefreshCw size={14} /> Analyze Code Complexity
          </button>

          {codeAnalysis && (
            <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Time Complexity</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>{codeAnalysis.timeComplexity}</div>
              </div>
              <div style={{ width: '1px', background: 'var(--border)' }} />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Space Complexity</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#facc15', marginTop: '2px' }}>{codeAnalysis.spaceComplexity}</div>
              </div>
              <div style={{ width: '1px', background: 'var(--border)' }} />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Loop Nest Depth</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', marginTop: '2px' }}>{codeAnalysis.loopCount}</div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Memory Decay Warning Banner */}
      {revisionDue.length > 0 && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(250, 204, 21, 0.1)', border: '1px solid rgba(250, 204, 21, 0.3)', fontSize: '0.85rem', color: '#facc15', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={18} />
          <span>
            <strong>Memory Retention Warning:</strong> You have <strong>{revisionDue.length} solved problem(s)</strong> with retention score under 70%. Revise them today to ensure long-term algorithm mastery!
          </span>
        </div>
      )}

    </div>
  );
}
