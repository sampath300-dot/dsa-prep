import type { Problem, Topic, Company } from './types';

export const COMPANY_LIST: Company[] = [
  { id: 'google', name: 'Google', icon: '🔍', color: '#4285F4', description: 'Frequently asked Google interview questions & coding rounds.' },
  { id: 'amazon', name: 'Amazon', icon: '📦', color: '#FF9900', description: 'Top Amazon Leadership Principles & Online Assessment questions.' },
  { id: 'microsoft', name: 'Microsoft', icon: '💻', color: '#00A4EF', description: 'Microsoft technical interview problem set & array/string classics.' },
  { id: 'meta', name: 'Meta (Facebook)', icon: '♾️', color: '#0668E1', description: 'High frequency Meta tagged interview questions.' },
  { id: 'apple', name: 'Apple', icon: '🍎', color: '#A2AAAD', description: 'Apple software engineering technical screen questions.' },
  { id: 'netflix', name: 'Netflix', icon: '🎬', color: '#E50914', description: 'Netflix senior engineer interview questions.' },
  { id: 'uber', name: 'Uber', icon: '🚗', color: '#000000', description: 'Uber system-focused algorithm questions.' },
  { id: 'adobe', name: 'Adobe', icon: '🅰️', color: '#FF0000', description: 'Adobe coding round & technical interview questions.' }
];

export const TOPICS_LIST: Topic[] = [
  {
    id: 'string',
    category: 'Core Concept',
    title: 'String',
    concept: 'String',
    difficulty: 'Easy',
    icon: '🔤',
    description: 'String manipulation, character frequency, palindromes, and substring patterns.'
  },
  {
    id: 'array',
    category: 'Core Concept',
    title: 'Array & Hashing',
    concept: 'Array',
    difficulty: 'Easy',
    icon: '🔢',
    description: 'Iteration, prefix sums, hash maps, frequency tables, and 2D matrices.'
  },
  {
    id: 'two-pointers',
    category: 'Core Concept',
    title: 'Two Pointers & Sliding Window',
    concept: 'Two Pointers',
    difficulty: 'Easy',
    icon: '🎯',
    description: 'Left & right pointer techniques, subsegment scanning, and window sliding.'
  },
  {
    id: 'stack-queue',
    category: 'Core Concept',
    title: 'Stack & Queue',
    concept: 'Stack',
    difficulty: 'Easy',
    icon: '🥞',
    description: 'LIFO & FIFO operations, parentheses matching, and monotonic stacks.'
  },
  {
    id: 'trees',
    category: 'Core Concept',
    title: 'Trees & BST',
    concept: 'Tree',
    difficulty: 'Easy',
    icon: '🌲',
    description: 'Binary trees, traversals (Inorder, Preorder, Postorder), and BST search.'
  },
  {
    id: 'graphs',
    category: 'Core Concept',
    title: 'Graphs',
    concept: 'Graph',
    difficulty: 'Medium',
    icon: '🕸️',
    description: 'Breadth-first search, depth-first search, and graph traversals.'
  },
  {
    id: 'dp',
    category: 'Core Concept',
    title: 'Dynamic Programming',
    concept: 'DP',
    difficulty: 'Medium',
    icon: '🧩',
    description: 'Memoization, tabulation, and overlapping subproblems.'
  }
];

export const INITIAL_PROBLEMS: Problem[] = [
  // Level 1 — String Fundamentals
  { id: 1, name: "709. To Lower Case", concept: "String", level: "Level 1: String Fundamentals", difficulty: "Easy", link: "https://leetcode.com/problems/to-lower-case/", notes: "Learn: .lower(), basic string manipulation", solved: false, addedAt: 1 },
  { id: 2, name: "1108. Defanging an IP Address", concept: "String", level: "Level 1: String Fundamentals", difficulty: "Easy", link: "https://leetcode.com/problems/defanging-an-ip-address/", notes: "Learn: .replace()", solved: false, addedAt: 2 },
  { id: 3, name: "1678. Goal Parser Interpretation", concept: "String", level: "Level 1: String Fundamentals", difficulty: "Easy", link: "https://leetcode.com/problems/goal-parser-interpretation/", notes: "Learn: traversing a string", solved: false, addedAt: 3 },
  { id: 4, name: "1662. Check If Two String Arrays are Equivalent", concept: "String", level: "Level 1: String Fundamentals", difficulty: "Easy", link: "https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent/", notes: "Learn: joining and comparing strings", solved: false, addedAt: 4 },
  { id: 5, name: "1768. Merge Strings Alternately", concept: "String", level: "Level 1: String Fundamentals", difficulty: "Easy", link: "https://leetcode.com/problems/merge-strings-alternately/", notes: "Learn: indexes + multiple strings", solved: false, addedAt: 5 },

  // Level 2 — Characters & Traversal
  { id: 6, name: "344. Reverse String", concept: "String", level: "Level 2: Characters & Traversal", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-string/", notes: "Learn: indexes, loops, swapping", solved: false, addedAt: 6 },
  { id: 7, name: "58. Length of Last Word", concept: "String", level: "Level 2: Characters & Traversal", difficulty: "Easy", link: "https://leetcode.com/problems/length-of-last-word/", notes: "Learn: spaces, split(), indexing", solved: false, addedAt: 7 },
  { id: 8, name: "771. Jewels and Stones", concept: "String", level: "Level 2: Characters & Traversal", difficulty: "Easy", link: "https://leetcode.com/problems/jewels-and-stones/", notes: "Learn: checking characters + sets", solved: false, addedAt: 8 },
  { id: 9, name: "657. Robot Return to Origin", concept: "String", level: "Level 2: Characters & Traversal", difficulty: "Easy", link: "https://leetcode.com/problems/robot-return-to-origin/", notes: "Learn: counting characters / conditions", solved: false, addedAt: 9 },
  { id: 10, name: "1528. Shuffle String", concept: "String", level: "Level 2: Characters & Traversal", difficulty: "Easy", link: "https://leetcode.com/problems/shuffle-string/", notes: "Learn: indexes and constructing strings", solved: false, addedAt: 10 },

  // Level 3 — Counting Characters
  { id: 11, name: "387. First Unique Character in a String", concept: "String", level: "Level 3: Counting Characters", difficulty: "Easy", link: "https://leetcode.com/problems/first-unique-character-in-a-string/", notes: "Learn: frequency counting", solved: false, addedAt: 11 },
  { id: 12, name: "242. Valid Anagram", concept: "String", level: "Level 3: Counting Characters", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/", notes: "Learn: character frequency / HashMap", solved: false, addedAt: 12 },
  { id: 13, name: "383. Ransom Note", concept: "String", level: "Level 3: Counting Characters", difficulty: "Easy", link: "https://leetcode.com/problems/ransom-note/", notes: "Learn: frequency counting", solved: false, addedAt: 13 },
  { id: 14, name: "1941. Check if All Characters Have Equal Occurrences", concept: "String", level: "Level 3: Counting Characters", difficulty: "Easy", link: "https://leetcode.com/problems/check-if-all-characters-have-equal-number-of-occurrences/", notes: "Learn: frequency maps", solved: false, addedAt: 14 },
  { id: 15, name: "1748. Sum of Unique Elements", concept: "String", level: "Level 3: Counting Characters", difficulty: "Easy", link: "https://leetcode.com/problems/sum-of-unique-elements/", notes: "Learn: counting + arrays/maps", solved: false, addedAt: 15 },

  // Level 4 — Comparing Strings
  { id: 16, name: "14. Longest Common Prefix", concept: "String", level: "Level 4: Comparing Strings", difficulty: "Easy", link: "https://leetcode.com/problems/longest-common-prefix/", notes: "Learn: comparing multiple strings", solved: false, addedAt: 16 },
  { id: 17, name: "28. Find Index of First Occurrence in a String", concept: "String", level: "Level 4: Comparing Strings", difficulty: "Easy", link: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", notes: "Learn: substring searching", solved: false, addedAt: 17 },
  { id: 18, name: "520. Detect Capital", concept: "String", level: "Level 4: Comparing Strings", difficulty: "Easy", link: "https://leetcode.com/problems/detect-capital/", notes: "Learn: character conditions", solved: false, addedAt: 18 },
  { id: 19, name: "1614. Maximum Nesting Depth of Parentheses", concept: "String", level: "Level 4: Comparing Strings", difficulty: "Easy", link: "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/", notes: "Learn: scanning + counter", solved: false, addedAt: 19 },
  { id: 20, name: "1021. Remove Outermost Parentheses", concept: "String", level: "Level 4: Comparing Strings", difficulty: "Easy", link: "https://leetcode.com/problems/remove-outermost-parentheses/", notes: "Learn: counters + building a string", solved: false, addedAt: 20 },

  // Level 5 — Palindrome & Two Pointers
  { id: 21, name: "125. Valid Palindrome", concept: "String", level: "Level 5: Palindrome & Two Pointers", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome/", notes: "Learn: two pointers + isalnum()", solved: false, addedAt: 21 },
  { id: 22, name: "680. Valid Palindrome II", concept: "String", level: "Level 5: Palindrome & Two Pointers", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome-ii/", notes: "Learn: two pointers + handling one mistake", solved: false, addedAt: 22 },

  // Level 6 — String + Simple Logic
  { id: 23, name: "412. Fizz Buzz", concept: "String", level: "Level 6: String + Simple Logic", difficulty: "Easy", link: "https://leetcode.com/problems/fizz-buzz/", notes: "Learn: conditions and constructing output", solved: false, addedAt: 23 },
  { id: 24, name: "415. Add Strings", concept: "String", level: "Level 6: String + Simple Logic", difficulty: "Easy", link: "https://leetcode.com/problems/add-strings/", notes: "Learn: processing numbers as strings", solved: false, addedAt: 24 },
  { id: 25, name: "67. Add Binary", concept: "String", level: "Level 6: String + Simple Logic", difficulty: "Easy", link: "https://leetcode.com/problems/add-binary/", notes: "Learn: string-based arithmetic", solved: false, addedAt: 25 }
];
