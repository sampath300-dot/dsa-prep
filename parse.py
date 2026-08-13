import re
import json

lines = open('top75.md', encoding='utf-8').read().split('\n')
problems = []
current_category = ''
current_id = 2000

for line in lines:
    if line.startswith('## '):
        current_category = line.replace('## ', '').strip()
        if current_category == 'Content':
            current_category = ''
    elif line.startswith('- ') and current_category != '':
        match = re.match(r'- (.*?) - (https://leetcode.com/problems/.*?)(/|)$', line)
        if match:
            name, link = match.group(1), match.group(2)
        else:
            match2 = re.match(r'- (.*?) - (.*)', line)
            if match2:
                name, link = match2.group(1), match2.group(2)
            else:
                name, link = line.replace('- ', ''), ''
        
        current_id += 1
        name_clean = name.strip()
        link_clean = link.strip()
        
        # Determine difficulty roughly
        diff = 'Medium'
        if 'Two Sum' in name_clean or 'Contains Duplicate' in name_clean or 'Best Time to Buy' in name_clean or 'Maximum Depth' in name_clean or 'Same Tree' in name_clean or 'Invert' in name_clean or 'Reverse Linked List' in name_clean or 'Linked List Cycle' in name_clean or 'Valid Anagram' in name_clean or 'Valid Parentheses' in name_clean or 'Climbing Stairs' in name_clean or 'Missing Number' in name_clean or 'Reverse Bits' in name_clean:
            diff = 'Easy'
        if 'Merge K Sorted Lists' in name_clean or 'Find Median' in name_clean or 'Serialize and Deserialize' in name_clean or 'Minimum Window Substring' in name_clean or 'Word Search II' in name_clean:
            diff = 'Hard'
            
        prob = f'  {{ id: {current_id}, name: \"{name_clean}\", concept: \"company-top-75\", company: \"top-75\", level: \"{current_category}\", difficulty: \"{diff}\", link: \"{link_clean}\", notes: \"Blind Top 75\", solved: false, addedAt: {current_id} }},'
        problems.append(prob)

with open('top75_out.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(problems))
