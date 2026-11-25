
import  { useMemo, useState } from 'react';

const pageStyle = {
  minHeight: '100vh',
  padding: '24px',
  background: 'var(--background, #f8fafc)',
  color: 'var(--foreground, #0f172a)',
  fontFamily: 'inherit',
};

const cardStyle = {
  background: 'var(--card, #ffffff)',
  border: '1px solid var(--border, #e2e8f0)',
  borderRadius: '14px',
  padding: '20px',
  marginBottom: '18px',
};

const headingStyle = {
  fontSize: '22px',
  fontWeight: 700,
  marginBottom: '12px',
};

const problems = [
  {
    title: 'Two Sum',
    pattern: 'Hashing',
    difficulty: 'Easy',
    description: 'Find two numbers whose sum equals the target.',
    skills: 'HashMap, complement lookup, one-pass optimization',
  },
  {
    title: 'Valid Anagram',
    pattern: 'Hashing',
    difficulty: 'Easy',
    description: 'Check whether two strings contain the same characters.',
    skills: 'Frequency counting, character arrays',
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    pattern: 'Sliding Window',
    difficulty: 'Medium',
    description: 'Find the longest substring containing unique characters.',
    skills: 'Sliding window, last-seen index',
  },
  {
    title: 'Maximum Sum Subarray',
    pattern: 'Kadane',
    difficulty: 'Medium',
    description: 'Find the maximum sum of a contiguous subarray.',
    skills: 'Kadane’s algorithm, local and global optimum',
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    pattern: 'Kadane',
    difficulty: 'Easy',
    description: 'Maximize profit from one buy and one sell.',
    skills: 'Minimum-so-far, greedy tracking',
  },
  {
    title: 'Move Zeroes',
    pattern: 'Two Pointers',
    difficulty: 'Easy',
    description: 'Move zeroes to the end while preserving other elements.',
    skills: 'In-place array modification, two pointers',
  },
  {
    title: 'Container With Most Water',
    pattern: 'Two Pointers',
    difficulty: 'Medium',
    description: 'Find two lines that contain the maximum water.',
    skills: 'Two pointers, proof of pointer movement',
  },
  {
    title: 'Merge Intervals',
    pattern: 'Intervals',
    difficulty: 'Medium',
    description: 'Merge all overlapping intervals.',
    skills: 'Sorting, interval boundaries',
  },
  {
    title: 'Binary Search',
    pattern: 'Binary Search',
    difficulty: 'Easy',
    description: 'Find a target in a sorted array.',
    skills: 'Search space, mid calculation, boundaries',
  },
  {
    title: 'Search in Rotated Sorted Array',
    pattern: 'Binary Search',
    difficulty: 'Medium',
    description: 'Search a sorted array that has been rotated.',
    skills: 'Sorted half identification, invariant',
  },
  {
    title: 'Reverse Linked List',
    pattern: 'Linked List',
    difficulty: 'Easy',
    description: 'Reverse a singly linked list.',
    skills: 'Previous, current, next pointers',
  },
  {
    title: 'Detect Cycle in Linked List',
    pattern: 'Linked List',
    difficulty: 'Easy',
    description: 'Determine whether a linked list contains a cycle.',
    skills: 'Floyd’s slow and fast pointers',
  },
  {
    title: 'Valid Parentheses',
    pattern: 'Stack',
    difficulty: 'Easy',
    description: 'Check whether brackets are correctly matched.',
    skills: 'Stack, matching pairs',
  },
  {
    title: 'Daily Temperatures',
    pattern: 'Monotonic Stack',
    difficulty: 'Medium',
    description: 'Find how many days until a warmer temperature.',
    skills: 'Monotonic decreasing stack of indices',
  },
  {
    title: 'Sliding Window Maximum',
    pattern: 'Monotonic Queue',
    difficulty: 'Hard',
    description: 'Find the maximum value in each window of size k.',
    skills: 'Deque, index expiration',
  },
  {
    title: 'Binary Tree Level Order Traversal',
    pattern: 'Trees',
    difficulty: 'Medium',
    description: 'Return tree nodes level by level.',
    skills: 'Queue, BFS, level size',
  },
  {
    title: 'Lowest Common Ancestor',
    pattern: 'Trees',
    difficulty: 'Medium',
    description: 'Find the lowest common ancestor of two nodes.',
    skills: 'Tree recursion, return-value reasoning',
  },
  {
    title: 'Number of Islands',
    pattern: 'Graph / Grid',
    difficulty: 'Medium',
    description: 'Count connected groups of land in a grid.',
    skills: 'DFS or BFS, visited tracking',
  },
  {
    title: 'Course Schedule',
    pattern: 'Graph / Topological Sort',
    difficulty: 'Medium',
    description: 'Determine whether all courses can be completed.',
    skills: 'Directed cycle detection, indegree, Kahn’s algorithm',
  },
  {
    title: 'Combination Sum',
    pattern: 'Backtracking',
    difficulty: 'Medium',
    description: 'Find combinations that sum to a target.',
    skills: 'Backtracking, choices, undoing state',
  },
  {
    title: 'Subsets',
    pattern: 'Backtracking',
    difficulty: 'Medium',
    description: 'Generate all subsets of an array.',
    skills: 'Decision tree, include/exclude',
  },
  {
    title: 'Coin Change',
    pattern: 'Dynamic Programming',
    difficulty: 'Medium',
    description: 'Find the minimum number of coins for a target amount.',
    skills: '1D DP, state definition, transitions',
  },
  {
    title: 'Longest Increasing Subsequence',
    pattern: 'Dynamic Programming',
    difficulty: 'Medium',
    description: 'Find the length of the longest strictly increasing subsequence.',
    skills: 'DP, binary-search optimization',
  },
  {
    title: 'Union of Connected Components',
    pattern: 'DSU',
    difficulty: 'Medium',
    description: 'Group connected elements and answer connectivity queries.',
    skills: 'Disjoint Set Union, path compression, union by size',
  },
  {
    title: 'Range Sum Query',
    pattern: 'Fenwick Tree',
    difficulty: 'Medium',
    description: 'Support point updates and prefix or range sum queries.',
    skills: 'Binary Indexed Tree, lowbit, logarithmic updates',
  },
];

const patterns = [
  'All',
  'Hashing',
  'Sliding Window',
  'Kadane',
  'Two Pointers',
  'Intervals',
  'Binary Search',
  'Linked List',
  'Stack',
  'Monotonic Stack',
  'Monotonic Queue',
  'Trees',
  'Graph / Grid',
  'Graph / Topological Sort',
  'Backtracking',
  'Dynamic Programming',
  'DSU',
  'Fenwick Tree',
];

const difficultyOrder = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

function Section({ title, children }) {
  return (
    <section style={cardStyle}>
      <h2 style={headingStyle}>{title}</h2>
      {children}
    </section>
  );
}

function Code({ lines }) {
  return (
    <pre
      style={{
        overflowX: 'auto',
        padding: '16px',
        borderRadius: '10px',
        background: 'var(--code-background, #0f172a)',
        color: 'var(--code-foreground, #e2e8f0)',
        fontSize: '13px',
        lineHeight: 1.6,
      }}
    >
      <code>{lines.join('\n')}</code>
    </pre>
  );
}

export default function DSACodingPracticeLesson({ onBack }) {
  const [selectedPattern, setSelectedPattern] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [completed, setCompleted] = useState({});
  const [search, setSearch] = useState('');

  const filteredProblems = useMemo(() => {
    return problems
      .filter((problem) => {
        const matchesPattern =
          selectedPattern === 'All' ||
          problem.pattern === selectedPattern;

        const matchesDifficulty =
          selectedDifficulty === 'All' ||
          problem.difficulty === selectedDifficulty;

        const matchesSearch =
          problem.title.toLowerCase().includes(search.toLowerCase()) ||
          problem.pattern.toLowerCase().includes(search.toLowerCase());

        return matchesPattern && matchesDifficulty && matchesSearch;
      })
      .sort(
        (a, b) =>
          difficultyOrder[a.difficulty] -
          difficultyOrder[b.difficulty]
      );
  }, [selectedPattern, selectedDifficulty, search]);

  const completedCount = Object.values(completed).filter(Boolean).length;

  const progress = Math.round(
    (completedCount / problems.length) * 100
  );

  function toggleCompleted(title) {
    setCompleted((previous) => ({
      ...previous,
      [title]: !previous[title],
    }));
  }

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{
            border: '1px solid var(--border, #cbd5e1)',
            background: 'var(--card, #ffffff)',
            padding: '10px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          ← Back to DSA Topics
        </button>

        <header style={cardStyle}>
          <p
            style={{
              color: 'var(--muted-foreground, #64748b)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            DSA ROADMAP · TOPIC 25
          </p>

          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              margin: '8px 0',
            }}
          >
            DSA Coding Practice
          </h1>

          <p style={{ lineHeight: 1.7 }}>
            Practice problems by pattern. Your goal is not to memorize
            solutions—it is to recognize the pattern, build a correct
            approach, and explain why it works.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            <div>
              <strong>{completedCount}</strong>
              <div style={{ color: '#64748b', fontSize: '13px' }}>
                Completed
              </div>
            </div>

            <div>
              <strong>{problems.length}</strong>
              <div style={{ color: '#64748b', fontSize: '13px' }}>
                Total problems
              </div>
            </div>

            <div>
              <strong>{progress}%</strong>
              <div style={{ color: '#64748b', fontSize: '13px' }}>
                Progress
              </div>
            </div>
          </div>

          <div
            style={{
              height: '9px',
              background: 'var(--border, #e2e8f0)',
              borderRadius: '10px',
              overflow: 'hidden',
              marginTop: '14px',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: '#16a34a',
                transition: 'width 0.2s ease',
              }}
            />
          </div>
        </header>

        <Section title="How to solve a DSA problem">
          <ol style={{ lineHeight: 1.9, paddingLeft: '22px' }}>
            <li>
              <strong>Understand the problem:</strong> identify input,
              output, constraints, and special cases.
            </li>
            <li>
              <strong>Try a brute-force solution:</strong> make sure
              you understand the problem before optimizing.
            </li>
            <li>
              <strong>Find the pattern:</strong> hashing, two pointers,
              sliding window, binary search, DP, or another technique.
            </li>
            <li>
              <strong>Explain the approach:</strong> state why it works
              before writing code.
            </li>
            <li>
              <strong>Write Java code:</strong> use meaningful variable
              names and avoid unnecessary complexity.
            </li>
            <li>
              <strong>Dry run:</strong> test normal input, edge cases,
              and the smallest possible input.
            </li>
            <li>
              <strong>Analyze complexity:</strong> explain time and
              auxiliary space.
            </li>
          </ol>
        </Section>

        <Section title="Problem-solving template">
          <p>
            Use this checklist for every problem. If you skip these
            steps, you may get accepted code without understanding
            the technique.
          </p>

          <Code
            lines={[
              '1. Restate the problem in your own words.',
              '2. Write a small example.',
              '3. Identify constraints.',
              '4. Build the brute-force approach.',
              '5. Identify the bottleneck.',
              '6. Choose a suitable DSA pattern.',
              '7. Prove the optimized approach.',
              '8. Implement in Java.',
              '9. Dry run edge cases.',
              '10. State time and space complexity.',
            ]}
          />
        </Section>

        <Section title="Java coding checklist">
          <ul style={{ lineHeight: 1.9, paddingLeft: '22px' }}>
            <li>Use correct data types and avoid integer overflow.</li>
            <li>Check empty arrays, single elements, and null nodes.</li>
            <li>Use long when sums or products may exceed int range.</li>
            <li>Calculate mid as low + (high - low) / 2.</li>
            <li>Do not modify input unless the problem allows it.</li>
            <li>For recursion, check the base case first.</li>
            <li>For BFS, mark nodes visited when adding them to the queue.</li>
            <li>For DP, define what each state means before coding.</li>
            <li>Do not claim O(1) auxiliary space if you use extra arrays.</li>
          </ul>
        </Section>

        <Section title="Practice problem list">
          <p style={{ lineHeight: 1.7 }}>
            Filter the list by pattern or difficulty. Mark a problem
            complete only after you can explain the solution without
            copying it.
          </p>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search problems or patterns..."
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '12px',
              border: '1px solid var(--border, #cbd5e1)',
              borderRadius: '8px',
              margin: '12px 0',
              background: 'var(--input, #ffffff)',
              color: 'inherit',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            {patterns.map((pattern) => (
              <button
                key={pattern}
                onClick={() => setSelectedPattern(pattern)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '20px',
                  border:
                    selectedPattern === pattern
                      ? '1px solid #2563eb'
                      : '1px solid var(--border, #cbd5e1)',
                  background:
                    selectedPattern === pattern
                      ? '#2563eb'
                      : 'var(--card, #ffffff)',
                  color:
                    selectedPattern === pattern
                      ? '#ffffff'
                      : 'inherit',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                {pattern}
              </button>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            {['All', 'Easy', 'Medium', 'Hard'].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border:
                    selectedDifficulty === difficulty
                      ? '1px solid #2563eb'
                      : '1px solid var(--border, #cbd5e1)',
                  background:
                    selectedDifficulty === difficulty
                      ? '#2563eb'
                      : 'var(--card, #ffffff)',
                  color:
                    selectedDifficulty === difficulty
                      ? '#ffffff'
                      : 'inherit',
                  cursor: 'pointer',
                }}
              >
                {difficulty}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gap: '12px' }}>
            {filteredProblems.map((problem) => (
              <article
                key={problem.title}
                style={{
                  border: '1px solid var(--border, #e2e8f0)',
                  borderRadius: '10px',
                  padding: '14px',
                  opacity: completed[problem.title] ? 0.7 : 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '12px',
                    alignItems: 'flex-start',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '16px',
                        margin: '0 0 6px',
                        textDecoration: completed[problem.title]
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      {problem.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '13px',
                        color: '#64748b',
                        margin: '0 0 8px',
                      }}
                    >
                      {problem.pattern} · {problem.difficulty}
                    </p>
                  </div>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(completed[problem.title])}
                      onChange={() => toggleCompleted(problem.title)}
                    />
                    Done
                  </label>
                </div>

                <p style={{ margin: '8px 0', lineHeight: 1.6 }}>
                  {problem.description}
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: '#64748b',
                  }}
                >
                  Focus: {problem.skills}
                </p>
              </article>
            ))}

            {filteredProblems.length === 0 && (
              <p>No problems match your filters.</p>
            )}
          </div>
        </Section>

        <Section title="Weekly practice plan">
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              {
                day: 'Day 1',
                focus: 'Arrays, hashing, and two pointers',
                target: '3 problems',
              },
              {
                day: 'Day 2',
                focus: 'Sliding window, binary search, intervals',
                target: '3 problems',
              },
              {
                day: 'Day 3',
                focus: 'Linked lists, stacks, monotonic patterns',
                target: '3 problems',
              },
              {
                day: 'Day 4',
                focus: 'Trees and graph traversal',
                target: '2 problems',
              },
              {
                day: 'Day 5',
                focus: 'Backtracking and dynamic programming',
                target: '2 problems',
              },
              {
                day: 'Day 6',
                focus: 'DSU, Fenwick Tree, and revision',
                target: '2 problems',
              },
              {
                day: 'Day 7',
                focus: 'Timed mock interview and error review',
                target: '1 mock',
              },
            ].map((day) => (
              <div
                key={day.day}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '12px',
                  border: '1px solid var(--border, #e2e8f0)',
                  borderRadius: '8px',
                }}
              >
                <div>
                  <strong>{day.day}</strong>
                  <div style={{ marginTop: '4px' }}>{day.focus}</div>
                </div>
                <span
                  style={{
                    color: '#64748b',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {day.target}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="When are you interview-ready?">
          <p>
            Solving a problem once is not enough. You should be able
            to do all of the following:
          </p>

          <ul style={{ lineHeight: 1.9, paddingLeft: '22px' }}>
            <li>Recognize the pattern from a new problem statement.</li>
            <li>Explain brute force and why it is inefficient.</li>
            <li>Write the optimized solution without looking at notes.</li>
            <li>Explain correctness and complexity.</li>
            <li>Handle edge cases without interviewer hints.</li>
            <li>Write clean Java code under time pressure.</li>
            <li>Answer follow-up questions about trade-offs.</li>
          </ul>

          <p>
            A practical target is to solve Easy problems independently
            and Medium problems with a clear approach within 25–35
            minutes. Hard problems require deeper pattern knowledge
            and are not the first measure of readiness.
          </p>
        </Section>

        <Section title="Important reminder">
          <p style={{ lineHeight: 1.8 }}>
            Do not rush through the checklist just to increase your
            completed count. If you needed to see the solution, mark
            the problem for revision and solve it again after a few
            days. Understanding and recall matter more than the number
            of green checkmarks.
          </p>
        </Section>
      </div>
    </div>
  );
}
