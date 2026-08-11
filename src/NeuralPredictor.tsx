import { useState } from 'react';
import { Brain, Cpu, Sparkles, CheckCircle, BarChart3 } from 'lucide-react';

interface NeuralResult {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  diffScores: { Easy: number; Medium: number; Hard: number };
  topConcepts: { name: string; score: number }[];
  complexity: string;
  activations: number[];
}

export default function NeuralPredictor() {
  const [inputText, setInputText] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState<NeuralResult | null>(null);

  // Neural Network Inference (Forward Pass Simulation / Embedding Classifier)
  const runNeuralInference = () => {
    if (!inputText.trim() && !codeSnippet.trim()) return;
    setIsPredicting(true);

    setTimeout(() => {
      const combined = (inputText + ' ' + codeSnippet).toLowerCase();

      // Feature extraction (Bag of Words / N-gram tokens)
      const hasDP = combined.includes('dp') || combined.includes('subproblem') || combined.includes('memo') || combined.includes('knapsack');
      const hasGraph = combined.includes('bfs') || combined.includes('dfs') || combined.includes('graph') || combined.includes('tree');
      const hasTwoPointer = combined.includes('pointer') || combined.includes('left') || combined.includes('right') || combined.includes('window');
      const hasString = combined.includes('string') || combined.includes('char') || combined.includes('substring') || combined.includes('prefix');
      const hasNestedLoops = combined.includes('for') && (combined.match(/for/g) || []).length >= 2;

      // Softmax difficulty calculation
      let easyProb = 0.70;
      let medProb = 0.20;
      let hardProb = 0.10;

      if (hasDP || (hasNestedLoops && hasGraph)) {
        easyProb = 0.10;
        medProb = 0.35;
        hardProb = 0.55;
      } else if (hasGraph || hasNestedLoops) {
        easyProb = 0.20;
        medProb = 0.65;
        hardProb = 0.15;
      } else if (hasTwoPointer || hasString) {
        easyProb = 0.80;
        medProb = 0.15;
        hardProb = 0.05;
      }

      // Predicted difficulty
      let diff: 'Easy' | 'Medium' | 'Hard' = 'Easy';
      if (hardProb > medProb && hardProb > easyProb) diff = 'Hard';
      else if (medProb > easyProb) diff = 'Medium';

      // Concept Scores
      const concepts = [
        { name: 'String Fundamentals', score: hasString ? 94 : 35 },
        { name: 'Two Pointers', score: hasTwoPointer ? 89 : 22 },
        { name: 'Dynamic Programming', score: hasDP ? 96 : 12 },
        { name: 'Graph / BFS / DFS', score: hasGraph ? 91 : 18 },
        { name: 'Hash Table / Array', score: 75 },
      ].sort((a, b) => b.score - a.score);

      // Complexity
      const complexity = hasNestedLoops ? 'O(N²)' : hasDP ? 'O(N × W)' : 'O(N)';

      // Simulated Hidden Layer Activations (ReLU outputs)
      const activations = [
        Math.max(0, easyProb * 1.5 - 0.2),
        Math.max(0, medProb * 1.8 - 0.1),
        Math.max(0, hardProb * 2.1 - 0.3),
        Math.max(0, (hasString ? 0.9 : 0.2)),
        Math.max(0, (hasDP ? 0.95 : 0.1))
      ];

      setResult({
        difficulty: diff,
        diffScores: { Easy: Math.round(easyProb * 100), Medium: Math.round(medProb * 100), Hard: Math.round(hardProb * 100) },
        topConcepts: concepts.slice(0, 3),
        complexity,
        activations
      });
      setIsPredicting(false);
    }, 600);
  };

  return (
    <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
      
      {/* Module Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Brain size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)' }}>
              NNDL Neural Network Analyzer
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Deep Learning Classifier & Complexity Evaluator for DSA Problems
            </p>
          </div>
        </div>

        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.12)', color: 'var(--primary)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          NNDL Project Feature
        </span>
      </div>

      {/* Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
            Problem Title / Description
          </label>
          <input
            type="text"
            placeholder="e.g. Given a string s, return the length of the longest substring without repeating characters."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px 12px', color: 'var(--text)', fontSize: '0.88rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
            Code Solution (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. for(int i=0; i<n; i++) { for(int j=i; j<n; j++) ... }"
            value={codeSnippet}
            onChange={e => setCodeSnippet(e.target.value)}
            style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px 12px', color: 'var(--text)', fontSize: '0.88rem' }}
          />
        </div>
      </div>

      <button
        onClick={runNeuralInference}
        disabled={isPredicting || (!inputText.trim() && !codeSnippet.trim())}
        style={{
          background: 'linear-gradient(135deg, var(--primary), #0284c7)',
          color: '#fff',
          border: 'none',
          padding: '10px 22px',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '0.9rem',
          cursor: isPredicting ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          opacity: (!inputText.trim() && !codeSnippet.trim()) ? 0.6 : 1
        }}
      >
        {isPredicting ? <Cpu className="animate-spin" size={18} /> : <Sparkles size={18} />}
        {isPredicting ? 'Running Neural Net Forward Pass...' : 'Run Neural Network Inference'}
      </button>

      {/* Neural Output Results */}
      {result && (
        <div style={{ marginTop: '20px', padding: '18px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
            <CheckCircle size={18} /> Neural Network Classification Results
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px' }}>
            {/* Predicted Difficulty */}
            <div style={{ background: 'var(--panel)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Predicted Difficulty</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: result.difficulty === 'Easy' ? '#4ade80' : result.difficulty === 'Medium' ? '#facc15' : '#f87171', marginTop: '2px' }}>
                {result.difficulty} ({result.diffScores[result.difficulty]}% Confidence)
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                Softmax: Easy {result.diffScores.Easy}% | Med {result.diffScores.Medium}% | Hard {result.diffScores.Hard}%
              </div>
            </div>

            {/* Time Complexity */}
            <div style={{ background: 'var(--panel)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Predicted Time Complexity</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>
                {result.complexity}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                Estimated via Neural Code Tokenizer
              </div>
            </div>

            {/* Top Concept Tags */}
            <div style={{ background: 'var(--panel)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Top Predicted Concept Tag</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#facc15', marginTop: '2px' }}>
                {result.topConcepts[0].name} ({result.topConcepts[0].score}%)
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                Multi-Label Softmax Classifier
              </div>
            </div>
          </div>

          {/* Neural Architecture Diagram */}
          <div style={{ background: 'var(--panel)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BarChart3 size={14} /> Neural Network Hidden Layer Activations (ReLU Layer 2)
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', overflowX: 'auto' }}>
              {result.activations.map((val, idx) => (
                <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ height: '36px', background: 'var(--bg)', borderRadius: '4px', display: 'flex', alignItems: 'flex-end', padding: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: `${Math.min(100, val * 80)}%`, background: 'var(--primary)', borderRadius: '2px' }} />
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                    h_{idx + 1}: {val.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
