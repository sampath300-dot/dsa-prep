// Real-Life DSA Study Optimizer & Neural Retention Engine

export interface RecommendationItem {
  problemId: number;
  problemName: string;
  concept: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  retentionScore: number;
  recommendedAction: 'Revise Today' | 'Optimal Retention' | 'Unsolved Target';
  reason: string;
}

// Calculate Retention decay based on Ebbinghaus Forgetting Curve: R(t) = exp(-t / S)
export const calculateRealRetention = (addedAt: number, difficulty: 'Easy' | 'Medium' | 'Hard' = 'Easy'): number => {
  const now = Date.now();
  const daysElapsed = Math.max(0.1, (now - addedAt) / (1000 * 60 * 60 * 24));
  const stability = difficulty === 'Easy' ? 14 : difficulty === 'Medium' ? 7 : 4;
  const retention = Math.exp(-daysElapsed / stability);
  return Math.max(5, Math.min(100, Math.round(retention * 100)));
};

// Real-life Code Complexity & Keyword Analyzer
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
