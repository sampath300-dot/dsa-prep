import type { Problem, Topic, Company } from './types';

export const COMPANY_LIST: Company[] = [
  { id: 'google', name: 'Google', icon: '🔍', color: '#4285F4', description: 'Comprehensive Analysis of Google Interview Problems (2025-2026).' },
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
  // ── STRING BASICS (25 PROBLEMS) ──
  { id: 1, name: "709. To Lower Case", concept: "String", level: "Level 1: String Fundamentals", difficulty: "Easy", link: "https://leetcode.com/problems/to-lower-case/", notes: "Learn: .lower(), basic string manipulation", solved: false, addedAt: 1 },
  { id: 2, name: "1108. Defanging an IP Address", concept: "String", level: "Level 1: String Fundamentals", difficulty: "Easy", link: "https://leetcode.com/problems/defanging-an-ip-address/", notes: "Learn: .replace()", solved: false, addedAt: 2 },
  { id: 3, name: "1678. Goal Parser Interpretation", concept: "String", level: "Level 1: String Fundamentals", difficulty: "Easy", link: "https://leetcode.com/problems/goal-parser-interpretation/", notes: "Learn: traversing a string", solved: false, addedAt: 3 },
  { id: 4, name: "1662. Check If Two String Arrays are Equivalent", concept: "String", level: "Level 1: String Fundamentals", difficulty: "Easy", link: "https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent/", notes: "Learn: joining and comparing strings", solved: false, addedAt: 4 },
  { id: 5, name: "1768. Merge Strings Alternately", concept: "String", level: "Level 1: String Fundamentals", difficulty: "Easy", link: "https://leetcode.com/problems/merge-strings-alternately/", notes: "Learn: indexes + multiple strings", solved: false, addedAt: 5 },
  { id: 6, name: "344. Reverse String", concept: "String", level: "Level 2: Characters & Traversal", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-string/", notes: "Learn: indexes, loops, swapping", solved: false, addedAt: 6 },
  { id: 7, name: "58. Length of Last Word", concept: "String", level: "Level 2: Characters & Traversal", difficulty: "Easy", link: "https://leetcode.com/problems/length-of-last-word/", notes: "Learn: spaces, split(), indexing", solved: false, addedAt: 7 },
  { id: 8, name: "771. Jewels and Stones", concept: "String", level: "Level 2: Characters & Traversal", difficulty: "Easy", link: "https://leetcode.com/problems/jewels-and-stones/", notes: "Learn: checking characters + sets", solved: false, addedAt: 8 },
  { id: 9, name: "657. Robot Return to Origin", concept: "String", level: "Level 2: Characters & Traversal", difficulty: "Easy", link: "https://leetcode.com/problems/robot-return-to-origin/", notes: "Learn: counting characters / conditions", solved: false, addedAt: 9 },
  { id: 10, name: "1528. Shuffle String", concept: "String", level: "Level 2: Characters & Traversal", difficulty: "Easy", link: "https://leetcode.com/problems/shuffle-string/", notes: "Learn: indexes and constructing strings", solved: false, addedAt: 10 },
  { id: 11, name: "387. First Unique Character in a String", concept: "String", level: "Level 3: Counting Characters", difficulty: "Easy", link: "https://leetcode.com/problems/first-unique-character-in-a-string/", notes: "Learn: frequency counting", solved: false, addedAt: 11 },
  { id: 12, name: "242. Valid Anagram", concept: "String", level: "Level 3: Counting Characters", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/", notes: "Learn: character frequency / HashMap", solved: false, addedAt: 12 },
  { id: 13, name: "383. Ransom Note", concept: "String", level: "Level 3: Counting Characters", difficulty: "Easy", link: "https://leetcode.com/problems/ransom-note/", notes: "Learn: frequency counting", solved: false, addedAt: 13 },
  { id: 14, name: "1941. Check if All Characters Have Equal Occurrences", concept: "String", level: "Level 3: Counting Characters", difficulty: "Easy", link: "https://leetcode.com/problems/check-if-all-characters-have-equal-number-of-occurrences/", notes: "Learn: frequency maps", solved: false, addedAt: 14 },
  { id: 15, name: "1748. Sum of Unique Elements", concept: "String", level: "Level 3: Counting Characters", difficulty: "Easy", link: "https://leetcode.com/problems/sum-of-unique-elements/", notes: "Learn: counting + arrays/maps", solved: false, addedAt: 15 },
  { id: 16, name: "14. Longest Common Prefix", concept: "String", level: "Level 4: Comparing Strings", difficulty: "Easy", link: "https://leetcode.com/problems/longest-common-prefix/", notes: "Learn: comparing multiple strings", solved: false, addedAt: 16 },
  { id: 17, name: "28. Find Index of First Occurrence in a String", concept: "String", level: "Level 4: Comparing Strings", difficulty: "Easy", link: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", notes: "Learn: substring searching", solved: false, addedAt: 17 },
  { id: 18, name: "520. Detect Capital", concept: "String", level: "Level 4: Comparing Strings", difficulty: "Easy", link: "https://leetcode.com/problems/detect-capital/", notes: "Learn: character conditions", solved: false, addedAt: 18 },
  { id: 19, name: "1614. Maximum Nesting Depth of Parentheses", concept: "String", level: "Level 4: Comparing Strings", difficulty: "Easy", link: "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/", notes: "Learn: scanning + counter", solved: false, addedAt: 19 },
  { id: 20, name: "1021. Remove Outermost Parentheses", concept: "String", level: "Level 4: Comparing Strings", difficulty: "Easy", link: "https://leetcode.com/problems/remove-outermost-parentheses/", notes: "Learn: counters + building a string", solved: false, addedAt: 20 },
  { id: 21, name: "125. Valid Palindrome", concept: "String", level: "Level 5: Palindrome & Two Pointers", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome/", notes: "Learn: two pointers + isalnum()", solved: false, addedAt: 21 },
  { id: 22, name: "680. Valid Palindrome II", concept: "String", level: "Level 5: Palindrome & Two Pointers", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome-ii/", notes: "Learn: two pointers + handling one mistake", solved: false, addedAt: 22 },
  { id: 23, name: "412. Fizz Buzz", concept: "String", level: "Level 6: String + Simple Logic", difficulty: "Easy", link: "https://leetcode.com/problems/fizz-buzz/", notes: "Learn: conditions and constructing output", solved: false, addedAt: 23 },
  { id: 24, name: "415. Add Strings", concept: "String", level: "Level 6: String + Simple Logic", difficulty: "Easy", link: "https://leetcode.com/problems/add-strings/", notes: "Learn: processing numbers as strings", solved: false, addedAt: 24 },
  { id: 25, name: "67. Add Binary", concept: "String", level: "Level 6: String + Simple Logic", difficulty: "Easy", link: "https://leetcode.com/problems/add-binary/", notes: "Learn: string-based arithmetic", solved: false, addedAt: 25 },

  // ── GOOGLE INTERVIEW PROBLEMS (2025-2026 COMPREHENSIVE ANALYSIS) ──
  // Most Frequent Problems (Recent Trends)
  { id: 101, name: "1. Two Sum", concept: "company-google", company: "google", level: "Google Top Frequent (100%)", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum", notes: "Frequency: 100% | Core hash map benchmark", solved: false, addedAt: 101 },
  { id: 102, name: "3. Longest Substring Without Repeating Characters", concept: "company-google", company: "google", level: "Google Top Frequent (62.5%)", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters", notes: "Frequency: 62.5% | Sliding window + Hash map", solved: false, addedAt: 102 },
  { id: 103, name: "15. 3Sum", concept: "company-google", company: "google", level: "Google Top Frequent (62.5%)", difficulty: "Medium", link: "https://leetcode.com/problems/3sum", notes: "Frequency: 62.5% | Two pointers + sorting", solved: false, addedAt: 103 },
  { id: 104, name: "2. Add Two Numbers", concept: "company-google", company: "google", level: "Google Top Frequent (62.5%)", difficulty: "Medium", link: "https://leetcode.com/problems/add-two-numbers", notes: "Frequency: 62.5% | Linked List iteration + carry", solved: false, addedAt: 104 },
  { id: 105, name: "56. Merge Intervals", concept: "company-google", company: "google", level: "Google Top Frequent (62.5%)", difficulty: "Medium", link: "https://leetcode.com/problems/merge-intervals", notes: "Frequency: 62.5% | Interval sorting & merging", solved: false, addedAt: 105 },
  { id: 106, name: "4. Median of Two Sorted Arrays", concept: "company-google", company: "google", level: "Google Top Frequent (50.0%)", difficulty: "Hard", link: "https://leetcode.com/problems/median-of-two-sorted-arrays", notes: "Frequency: 50.0% | Binary search on partition", solved: false, addedAt: 106 },
  { id: 107, name: "42. Trapping Rain Water", concept: "company-google", company: "google", level: "Google Top Frequent (50.0%)", difficulty: "Hard", link: "https://leetcode.com/problems/trapping-rain-water", notes: "Frequency: 50.0% | Two pointers / Monotonic stack", solved: false, addedAt: 107 },
  { id: 108, name: "560. Subarray Sum Equals K", concept: "company-google", company: "google", level: "Google Top Frequent (37.5%)", difficulty: "Medium", link: "https://leetcode.com/problems/subarray-sum-equals-k", notes: "Frequency: 37.5% | Prefix sum + Hash map count", solved: false, addedAt: 108 },
  { id: 109, name: "121. Best Time to Buy and Sell Stock", concept: "company-google", company: "google", level: "Google Top Frequent (62.5%)", difficulty: "Easy", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock", notes: "Frequency: 62.5% | One pass min variable tracking", solved: false, addedAt: 109 },
  { id: 110, name: "11. Container With Most Water", concept: "company-google", company: "google", level: "Google Top Frequent (50.0%)", difficulty: "Medium", link: "https://leetcode.com/problems/container-with-most-water", notes: "Frequency: 50.0% | Two pointers inward shrinkage", solved: false, addedAt: 110 },

  // Category 1: Arrays and Strings (35% of Google Questions)
  { id: 111, name: "238. Product of Array Except Self", concept: "company-google", company: "google", level: "Google Arrays & Strings (35%)", difficulty: "Medium", link: "https://leetcode.com/problems/product-of-array-except-self", notes: "Prefix & Suffix product pass without division", solved: false, addedAt: 111 },
  { id: 112, name: "76. Minimum Window Substring", concept: "company-google", company: "google", level: "Google Arrays & Strings (35%)", difficulty: "Hard", link: "https://leetcode.com/problems/minimum-window-substring", notes: "Sliding window with frequency counter match", solved: false, addedAt: 112 },
  { id: 113, name: "31. Next Permutation", concept: "company-google", company: "google", level: "Google Arrays & Strings (35%)", difficulty: "Medium", link: "https://leetcode.com/problems/next-permutation", notes: "Right-to-left pivot swap & suffix reverse", solved: false, addedAt: 113 },
  { id: 114, name: "128. Longest Consecutive Sequence", concept: "company-google", company: "google", level: "Google Arrays & Strings (35%)", difficulty: "Medium", link: "https://leetcode.com/problems/longest-consecutive-sequence", notes: "Hash Set start-of-sequence lookup in O(N)", solved: false, addedAt: 114 },
  { id: 115, name: "68. Text Justification", concept: "company-google", company: "google", level: "Google Arrays & Strings (35%)", difficulty: "Hard", link: "https://leetcode.com/problems/text-justification", notes: "Greedy line formatting & space distribution", solved: false, addedAt: 115 },

  // Category 2: Trees and Graphs (25% of Google Questions)
  { id: 116, name: "200. Number of Islands", concept: "company-google", company: "google", level: "Google Trees & Graphs (25%)", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-islands", notes: "2D Grid BFS / DFS flood fill", solved: false, addedAt: 116 },
  { id: 117, name: "207. Course Schedule", concept: "company-google", company: "google", level: "Google Trees & Graphs (25%)", difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule", notes: "Topological Sort / Kahn's BFS / Cycle DFS", solved: false, addedAt: 117 },
  { id: 118, name: "127. Word Ladder", concept: "company-google", company: "google", level: "Google Trees & Graphs (25%)", difficulty: "Hard", link: "https://leetcode.com/problems/word-ladder", notes: "Shortest path BFS transformation graph", solved: false, addedAt: 118 },
  { id: 119, name: "236. Lowest Common Ancestor of a Binary Tree", concept: "company-google", company: "google", level: "Google Trees & Graphs (25%)", difficulty: "Medium", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree", notes: "Post-order recursive subtree search", solved: false, addedAt: 119 },
  { id: 120, name: "297. Serialize and Deserialize Binary Tree", concept: "company-google", company: "google", level: "Google Trees & Graphs (25%)", difficulty: "Hard", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree", notes: "Preorder string serialization & queue reconstruction", solved: false, addedAt: 120 },

  // Category 3: Dynamic Programming (15% of Google Questions)
  { id: 121, name: "322. Coin Change", concept: "company-google", company: "google", level: "Google Dynamic Programming (15%)", difficulty: "Medium", link: "https://leetcode.com/problems/coin-change", notes: "Unbounded Knapsack 1D DP minimum steps", solved: false, addedAt: 121 },
  { id: 122, name: "300. Longest Increasing Subsequence", concept: "company-google", company: "google", level: "Google Dynamic Programming (15%)", difficulty: "Medium", link: "https://leetcode.com/problems/longest-increasing-subsequence", notes: "DP with Binary Search (Patience Sort) O(N log N)", solved: false, addedAt: 122 },
  { id: 123, name: "72. Edit Distance", concept: "company-google", company: "google", level: "Google Dynamic Programming (15%)", difficulty: "Medium", link: "https://leetcode.com/problems/edit-distance", notes: "2D Matrix DP Levenshtein distance", solved: false, addedAt: 123 },
  { id: 124, name: "139. Word Break", concept: "company-google", company: "google", level: "Google Dynamic Programming (15%)", difficulty: "Medium", link: "https://leetcode.com/problems/word-break", notes: "1D DP boolean dictionary matching", solved: false, addedAt: 124 },
  { id: 125, name: "91. Decode Ways", concept: "company-google", company: "google", level: "Google Dynamic Programming (15%)", difficulty: "Medium", link: "https://leetcode.com/problems/decode-ways", notes: "DP counting valid single & double digit decodings", solved: false, addedAt: 125 },

  // Category 4: Advanced Data Structures (Senior L4+)
  { id: 126, name: "295. Find Median from Data Stream", concept: "company-google", company: "google", level: "Google Advanced DS (Senior L4+)", difficulty: "Hard", link: "https://leetcode.com/problems/find-median-from-data-stream", notes: "Two Heaps (Max-Heap + Min-Heap) balancing", solved: false, addedAt: 126 },
  { id: 127, name: "307. Range Sum Query - Mutable", concept: "company-google", company: "google", level: "Google Advanced DS (Senior L4+)", difficulty: "Medium", link: "https://leetcode.com/problems/range-sum-query-mutable", notes: "Segment Tree / Fenwick Tree (Binary Indexed Tree)", solved: false, addedAt: 127 },
  { id: 128, name: "327. Count of Range Sum", concept: "company-google", company: "google", level: "Google Advanced DS (Senior L4+)", difficulty: "Hard", link: "https://leetcode.com/problems/count-of-range-sum", notes: "Merge Sort / Fenwick Tree on prefix sums", solved: false, addedAt: 128 },
  { id: 129, name: "23. Merge K Sorted Lists", concept: "company-google", company: "google", level: "Google Advanced DS (Senior L4+)", difficulty: "Hard", link: "https://leetcode.com/problems/merge-k-sorted-lists", notes: "Min-Heap priority queue / Divide & Conquer merge", solved: false, addedAt: 129 }
];
