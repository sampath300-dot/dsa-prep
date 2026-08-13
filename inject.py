import re
import sys

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Insert Company
company_entry = "  { id: 'top-75', name: 'Blind Top 75', icon: '🎯', color: '#10b981', description: 'Curated list of Top 75 LeetCode Questions to save your time. Master core concepts and techniques.' },\n"
content = content.replace('export const COMPANY_LIST: Company[] = [\n', 'export const COMPANY_LIST: Company[] = [\n' + company_entry)

# Insert Problems
with open('top75_out.txt', 'r', encoding='utf-8') as f:
    problems = f.read()

content = content.replace('export const INITIAL_PROBLEMS: Problem[] = [\n', 'export const INITIAL_PROBLEMS: Problem[] = [\n' + problems + '\n')

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)
