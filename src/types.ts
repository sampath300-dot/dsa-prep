export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
  id: number;
  name: string;
  concept: string;
  company?: string;
  approach?: string;
  level: string;
  difficulty: Difficulty;
  link?: string;
  notes?: string;
  solved: boolean;
  addedAt: number;
}

export interface Topic {
  id: string;
  category: string;
  title: string;
  concept: string;
  difficulty: Difficulty;
  icon: string;
  description: string;
}

export interface Company {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Approach {
  id: string;
  name: string;
  tool: string;
  icon: string;
  description: string;
}
