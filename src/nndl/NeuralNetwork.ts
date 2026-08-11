// Neural Network & Deep Learning Mathematical Engine for DSA Problem Solving

export interface RecommendationItem {
  problemId: number;
  problemName: string;
  concept: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  retentionScore: number;
  recommendedAction: 'Revise Today' | 'Optimal Retention' | 'Unsolved Target';
  reason: string;
}

// 1. NEURAL ACTIVATION MODEL FOR ALGORITHMIC PATTERNS (Softmax + Forward Pass)
export const computeNeuralPatternActivations = (queryText: string) => {
  const text = queryText.toLowerCase();
  
  // Feature vector extraction x
  const x = [
    text.includes('sorted') || text.includes('order') ? 1 : 0,      // x0: sorted data
    text.includes('string') || text.includes('char') ? 1 : 0,        // x1: character frequency
    text.includes('subarray') || text.includes('window') ? 1 : 0,   // x2: contiguous subsegment
    text.includes('kth') || text.includes('top') ? 1 : 0,            // x3: top k / min-max
    text.includes('tree') || text.includes('path') ? 1 : 0,          // x4: hierarchical graph
    text.includes('optimal') || text.includes('min cost') ? 1 : 0,   // x5: optimization subproblems
  ];

  // Neural Weights Matrix W (Inputs -> 6 Primary Pattern Activations)
  const patternWeights: Record<string, number[]> = {
    'Two Pointers': [0.9, 0.4, 0.6, 0.1, 0.0, 0.2],
    'Hash Map / Frequency': [0.1, 0.9, 0.3, 0.2, 0.0, 0.1],
    'Sliding Window': [0.3, 0.5, 0.95, 0.0, 0.0, 0.2],
    'Heap / Priority Queue': [0.1, 0.0, 0.1, 0.95, 0.0, 0.4],
    'DFS / BFS Graph': [0.0, 0.0, 0.0, 0.0, 0.95, 0.3],
    'Dynamic Programming': [0.1, 0.0, 0.2, 0.1, 0.4, 0.95],
  };

  // Linear Combination z = W * x + b
  const logits: Record<string, number> = {};
  let expSum = 0;

  Object.entries(patternWeights).forEach(([pattern, weights]) => {
    const logit = weights.reduce((acc, w, idx) => acc + w * x[idx], 0.1); // bias b = 0.1
    logits[pattern] = logit;
    expSum += Math.exp(logit);
  });

  // Softmax Activation P(Pattern_i) = exp(z_i) / sum(exp(z_k))
  const activations = Object.entries(logits).map(([pattern, logit]) => ({
    pattern,
    probability: Math.round((Math.exp(logit) / expSum) * 100),
  })).sort((a, b) => b.probability - a.probability);

  return activations;
};

// 2. RETENTION DECAY ENGINE: R(t) = exp(-t / S)
export const calculateRealRetention = (addedAt: number, difficulty: 'Easy' | 'Medium' | 'Hard' = 'Easy'): number => {
  const now = Date.now();
  const daysElapsed = Math.max(0.1, (now - addedAt) / (1000 * 60 * 60 * 24));
  const stability = difficulty === 'Easy' ? 14 : difficulty === 'Medium' ? 7 : 4;
  const retention = Math.exp(-daysElapsed / stability);
  return Math.max(5, Math.min(100, Math.round(retention * 100)));
};

// 3. CODE COMPLEXITY FEATURE EMBEDDING ANALYZER
export const analyzeCodeComplexity = (code: string) => {
  if (!code.trim()) return { timeComplexity: 'O(1)', spaceComplexity: 'O(1)', loopCount: 0 };
  
  const lower = code.toLowerCase();
  const loopMatches = lower.match(/for\s*\(|while\s*\(/g) || [];
  const loopCount = loopMatches.length;

  let timeComplexity = 'O(N)';
  if (loopCount >= 2) timeComplexity = 'O(N²)';
  else if (loopCount === 3) timeComplexity = 'O(N³)';
  else if (lower.includes('/ 2') || lower.includes('>> 1') || lower.includes('binary')) timeComplexity = 'O(log N)';

  let spaceComplexity = 'O(1)';
  if (lower.includes('new array') || lower.includes('vector') || lower.includes('map') || lower.includes('set') || lower.includes('[]')) {
    spaceComplexity = 'O(N)';
  }

  return { timeComplexity, spaceComplexity, loopCount };
};
