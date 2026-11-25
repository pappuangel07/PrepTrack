
import { useState } from 'react';

const topics = [
  'Arrays and Strings',
  'Hashing',
  'Two Pointers',
  'Sliding Window',
  'Binary Search',
  'Linked Lists',
  'Stacks and Queues',
  'Recursion and Backtracking',
  'Trees and BST',
  'Heaps',
  'Greedy',
  'Dynamic Programming',
  'Graphs',
  'Tries',
  'Bit Manipulation',
  'DSU',
  'Segment Tree',
  'Fenwick Tree',
  'Monotonic Stack and Queue',
];

const questions = [
  {
    topic: 'Arrays',
    question: 'How would you find a pair of numbers that adds up to a target?',
    followUp: 'Can you improve the brute-force O(n²) solution?',
    expected: 'HashMap complement lookup or sorting with two pointers.',
  },
  {
    topic: 'Sliding Window',
    question: 'How do you find the longest substring without repeating characters?',
    followUp: 'Why can the left pointer move forward without going backward?',
    expected: 'Maintain a valid window and last-seen character positions.',
  },
  {
    topic: 'Binary Search',
    question: 'What condition allows binary search to work?',
    followUp: 'How do you avoid an infinite loop?',
    expected: 'A monotonic search condition or sorted search space; update boundaries correctly.',
  },
  {
    topic: 'Linked Lists',
    question: 'How can you reverse a singly linked list iteratively?',
    followUp: 'What information must be saved before changing a next pointer?',
    expected: 'Previous, current, and next pointers.',
  },
  {
    topic: 'Stacks',
    question: 'How can you find the next greater element for every array element?',
    followUp: 'Why is the monotonic stack O(n) even though there is a while loop?',
    expected: 'Each index is pushed and popped at most once.',
  },
  {
    topic: 'Trees',
    question: 'How do BFS and DFS differ?',
    followUp: 'Which data structure does level-order traversal use?',
    expected: 'BFS uses a queue; DFS commonly uses recursion or a stack.',
  },
  {
    topic: 'Graphs',
    question: 'How can you detect a cycle in a directed graph?',
    followUp: 'How does topological sorting help?',
    expected: 'DFS recursion states or Kahn’s algorithm.',
  },
  {
    topic: 'Dynamic Programming',
    question: 'What are the steps to design a DP solution?',
    followUp: 'How can you reduce its space complexity?',
    expected: 'Define state, transition, base cases, order, and possibly compress states.',
  },
  {
    topic: 'Greedy',
    question: 'How do you prove that a greedy choice is safe?',
    followUp: 'Why does a locally optimal choice not always give a global optimum?',
    expected: 'Use an exchange argument or another correctness proof.',
  },
  {
    topic: 'DSU',
    question: 'What do path compression and union by size optimize?',
    followUp: 'When is DSU useful?',
    expected: 'Efficient connectivity and component merging.',
  },
];

const tests = [
  {
    question: 'Which technique is suitable for finding a pair in a sorted array?',
    options: ['Nested loops only', 'Two pointers', 'DFS', 'Union-Find'],
    answer: 1,
    explanation: 'Two pointers can move inward based on the current sum.',
  },
  {
    question: 'What is the time complexity of binary search on a sorted array?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    answer: 1,
    explanation: 'Each iteration reduces the search space by approximately half.',
  },
  {
    question: 'Which data structure is commonly used for BFS?',
    options: ['Stack', 'Queue', 'Heap', 'Trie'],
    answer: 1,
    explanation: 'A queue processes nodes in the order they are discovered.',
  },
  {
    question: 'What does a DP state represent?',
    options: [
      'Only the final answer',
      'A subproblem or condition of the problem',
      'A random variable',
      'The input array itself',
    ],
    answer: 1,
    explanation: 'A DP state stores the answer to a defined subproblem.',
  },
  {
    question: 'Why is a monotonic stack often O(n)?',
    options: [
      'It never uses a loop',
      'Every element is pushed and popped at most once',
      'It sorts the input',
      'It uses recursion',
    ],
    answer: 1,
    explanation: 'The total number of stack operations is linear.',
  },
];

function Section({ title, children }) {
  return (
    <section
      style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '14px',
        padding: '20px',
        marginBottom: '18px',
      }}
    >
      <h2 style={{ fontSize: '21px', marginTop: 0 }}>{title}</h2>
      {children}
    </section>
  );
}

export default function DSARevisionMockLesson({ onBack }) {
  const [status, setStatus] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState({});
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const statusOptions = ['Not started', 'Attempted', 'Solved', 'Revise'];

  const solvedCount = topics.filter(
    (topic) => status[topic] === 'Solved'
  ).length;

  const reviseCount = topics.filter(
    (topic) => status[topic] === 'Revise'
  ).length;

  const score = tests.reduce((total, test, index) => {
    return total + (selectedQuestions[index] === test.answer ? 1 : 0);
  }, 0);

  function updateStatus(topic, value) {
    setStatus((previous) => ({
      ...previous,
      [topic]: value,
    }));
  }

  function resetTest() {
    setSelectedQuestions({});
    setSubmitted(false);
    setStarted(false);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '24px',
        background: 'var(--background, #f8fafc)',
        color: 'var(--foreground, #0f172a)',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border, #cbd5e1)',
            background: 'var(--card, #ffffff)',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          ← Back to DSA Topics
        </button>

        <header
          style={{
            background: 'var(--card, #ffffff)',
            border: '1px solid var(--border, #e2e8f0)',
            borderRadius: '14px',
            padding: '24px',
            marginBottom: '18px',
          }}
        >
          <p style={{ color: '#64748b', fontSize: '13px' }}>
            DSA LEARNING FLOW · REVISION
          </p>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)' }}>
            Revision & Mock Interview Practice
          </h1>
          <p style={{ lineHeight: 1.7 }}>
            Revisit weak topics, test your understanding, and practice
            explaining solutions like you would in a technical interview.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              marginTop: '18px',
            }}
          >
            <div>
              <strong>{solvedCount}/{topics.length}</strong>
              <div style={{ color: '#64748b', fontSize: '13px' }}>
                Topics marked solved
              </div>
            </div>
            <div>
              <strong>{reviseCount}</strong>
              <div style={{ color: '#64748b', fontSize: '13px' }}>
                Topics to revise
              </div>
            </div>
          </div>
        </header>

        <Section title="1. Topic revision tracker">
          <p style={{ lineHeight: 1.7 }}>
            Choose the status that reflects your actual understanding.
            “Solved” means you can solve problems independently—not
            just that you watched a tutorial.
          </p>

          <div style={{ display: 'grid', gap: '10px' }}>
            {topics.map((topic) => (
              <div
                key={topic}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                  border: '1px solid var(--border, #e2e8f0)',
                  borderRadius: '9px',
                  padding: '12px',
                }}
              >
                <strong>{topic}</strong>
                <select
                  value={status[topic] || 'Not started'}
                  onChange={(event) =>
                    updateStatus(topic, event.target.value)
                  }
                  style={{
                    padding: '8px',
                    borderRadius: '7px',
                    border: '1px solid var(--border, #cbd5e1)',
                    background: 'var(--card, #ffffff)',
                    color: 'inherit',
                  }}
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </Section>

        <Section title="2. Mock interview questions">
          <p style={{ lineHeight: 1.7 }}>
            Answer each question aloud before opening the expected
            concept. Interviewers care about your reasoning, not
            memorized definitions.
          </p>

          <div style={{ display: 'grid', gap: '12px' }}>
            {questions.map((item, index) => (
              <details
                key={item.topic}
                style={{
                  border: '1px solid var(--border, #e2e8f0)',
                  borderRadius: '10px',
                  padding: '14px',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
                  {index + 1}. {item.topic}: {item.question}
                </summary>

                <div style={{ marginTop: '12px', lineHeight: 1.7 }}>
                  <p>
                    <strong>Follow-up:</strong> {item.followUp}
                  </p>
                  <p>
                    <strong>Key points:</strong> {item.expected}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </Section>

        <Section title="3. Quick DSA knowledge test">
          {!started && (
            <div>
              <p>
                This short test contains {tests.length} multiple-choice
                questions. Try it without notes.
              </p>
              <button
                onClick={() => setStarted(true)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#2563eb',
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                Start test
              </button>
            </div>
          )}

          {started && (
            <div>
              {tests.map((test, index) => (
                <div
                  key={index}
                  style={{
                    padding: '14px 0',
                    borderBottom: '1px solid var(--border, #e2e8f0)',
                  }}
                >
                  <p>
                    <strong>
                      {index + 1}. {test.question}
                    </strong>
                  </p>

                  {test.options.map((option, optionIndex) => (
                    <label
                      key={option}
                      style={{
                        display: 'flex',
                        gap: '8px',
                        margin: '10px 0',
                        alignItems: 'flex-start',
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={selectedQuestions[index] === optionIndex}
                        disabled={submitted}
                        onChange={() =>
                          setSelectedQuestions((previous) => ({
                            ...previous,
                            [index]: optionIndex,
                          }))
                        }
                      />
                      <span>{option}</span>
                    </label>
                  ))}

                  {submitted && (
                    <p style={{ lineHeight: 1.6 }}>
                      <strong>
                        {selectedQuestions[index] === test.answer
                          ? 'Correct.'
                          : 'Incorrect.'}
                      </strong>{' '}
                      {test.explanation}
                    </p>
                  )}
                </div>
              ))}

              {!submitted ? (
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={
                    Object.keys(selectedQuestions).length !== tests.length
                  }
                  style={{
                    marginTop: '16px',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#2563eb',
                    color: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  Submit test
                </button>
              ) : (
                <div style={{ marginTop: '16px' }}>
                  <h3>
                    Score: {score} / {tests.length}
                  </h3>
                  <p>
                    {score === tests.length
                      ? 'Great. Now explain each answer without looking.'
                      : 'Review the explanations and retry after revising.'}
                  </p>
                  <button
                    onClick={resetTest}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border, #cbd5e1)',
                      background: 'var(--card, #ffffff)',
                      cursor: 'pointer',
                    }}
                  >
                    Retry test
                  </button>
                </div>
              )}
            </div>
          )}
        </Section>

        <Section title="4. Weekly revision routine">
          <ol style={{ lineHeight: 1.9, paddingLeft: '22px' }}>
            <li>Revise one weak topic and its core patterns.</li>
            <li>Solve two problems without looking at solutions.</li>
            <li>Explain one solution aloud in 5 minutes.</li>
            <li>Take a timed test once per week.</li>
            <li>Record mistakes and revisit them after a few days.</li>
          </ol>
        </Section>

        <Section title="5. Interview readiness checklist">
          <ul style={{ lineHeight: 1.9, paddingLeft: '22px' }}>
            <li>Can explain brute force and optimized approaches.</li>
            <li>Can identify the correct pattern from a new problem.</li>
            <li>Can write Java code without copying.</li>
            <li>Can dry-run edge cases correctly.</li>
            <li>Can justify time and space complexity.</li>
            <li>Can respond to interviewer follow-up questions.</li>
          </ul>
        </Section>

        <p style={{ color: '#64748b', fontSize: '13px' }}>
          Note: Revision statuses and test answers currently use local
          component state. They reset when this page is refreshed.
          Connect them to your existing backend to save progress.
        </p>
      </div>
    </div>
  );
}
