export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
  id: number;
  name: string;
  concept: string;
  company?: string;
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
