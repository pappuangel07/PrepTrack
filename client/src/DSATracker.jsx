import { apiFetch } from './api';
import { useEffect, useMemo, useState } from 'react';
import DSALesson from './DSALesson';
import StringsLesson from './StringsLesson';
import LinkedListLesson from './LinkedListLesson';
import StackLesson from './StackLesson';
import QueuesLesson from './QueuesLesson';
import HashingLesson from './HashingLesson';
import TwoPointersLesson from './TwoPointersLesson';
import SlidingWindowLesson from './SlidingWindowLesson';
import SearchingLesson from './SearchingLesson';
import SortingLesson from './SortingLesson';
import RecursionLesson from './RecursionLesson';
import BacktrackingLesson from './BacktrackingLesson';
import BinaryTreesLesson from './BinaryTreesLesson';
import BSTLesson from './BSTLesson';
import HeapsLesson from './HeapsLesson';
import GraphsLesson from './GraphsLesson';
import GreedyAlgorithmsLesson from './GreedyAlgorithmsLesson';

function DSATracker() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    async function loadTopics() {
      try {
        const response = await apiFetch('/api/dsa-topics');

        if (!response.ok) {
          throw new Error('Unable to load DSA topics.');
        }

        const data = await response.json();
        setTopics(data);
      } catch (err) {
        setError(err.message || 'Unable to load DSA topics.');
      } finally {
        setLoading(false);
      }
    }

    loadTopics();
  }, []);

  async function updateStatus(id, status) {
    setUpdatingId(id);
    setError('');

    try {
      const response = await apiFetch(`/api/dsa-topics/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not update DSA topic.');
      }

      setTopics((currentTopics) =>
  currentTopics.map((topic) =>
    topic.id === id ? data : topic
  )
);
    } catch (err) {
      setError(err.message || 'Could not update DSA topic.');
    } finally {
      setUpdatingId(null);
    }
  }

  const completedCount = topics.filter(
    (topic) => topic.status === 'Completed'
  ).length;

  const progress = topics.length
    ? Math.round((completedCount / topics.length) * 100)
    : 0;

  const filteredTopics = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return topics.filter((topic) => {
      const matchesSearch =
        topic.title.toLowerCase().includes(searchText) ||
        topic.category.toLowerCase().includes(searchText) ||
        topic.description.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === 'All' || topic.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [topics, search, statusFilter]);

  if (selectedTopic === 'Arrays') {
  return (
    <DSALesson
      onBack={() => setSelectedTopic(null)}
    />
  );
}

if (selectedTopic === 'Strings') {
  return (
    <StringsLesson onBack={() => setSelectedTopic(null)} />
  );
}

if (selectedTopic === 'Linked Lists') {
  return (
    <LinkedListLesson onBack={() => setSelectedTopic(null)} />
  );
}

if (selectedTopic === 'Stacks') {
  return (
    <StackLesson
      onBack={() => setSelectedTopic(null)}
    />
  );
}

if (selectedTopic === 'Queues') {
  return (
    <QueuesLesson
      onBack={() => setSelectedTopic(null)}
    />
  );
}

if (selectedTopic === 'Hashing') {
  return <HashingLesson onBack={() => setSelectedTopic(null)} />;
}

if (selectedTopic === 'Two Pointers') {
  return (
    <TwoPointersLesson
      onBack={() => setSelectedTopic(null)}
    />
  );
}

if (selectedTopic === 'Sliding Windows') {
  return (
    <SlidingWindowLesson
      onBack={() => setSelectedTopic(null)}
    />
  );
}


if (selectedTopic === 'Searching') {
  return <SearchingLesson onBack={() => setSelectedTopic(null)} />;
}


if (selectedTopic === 'Sorting') {
  return <SortingLesson onBack={() => setSelectedTopic(null)} />;
}


if (selectedTopic === 'Recursion') {
  return <RecursionLesson onBack={() => setSelectedTopic(null)} />;
}

if (selectedTopic === 'Backtracking') {
  return <BacktrackingLesson onBack={() => setSelectedTopic(null)} />;
}
if (selectedTopic === 'Binary Trees') {
  return (
    <BinaryTreesLesson
      onBack={() => setSelectedTopic(null)}
    />
  );
}
if (selectedTopic === 'Binary Search Trees') {
  return (
    <BSTLesson
      onBack={() => setSelectedTopic(null)}
    />
  );
}

if (selectedTopic === 'Heaps and Priority Queues') {
  return (
    <HeapsLesson
      onBack={() => setSelectedTopic(null)}
    />
  );
}
if (selectedTopic === 'Graphs') {
  return (
    <GraphsLesson
      onBack={() => setSelectedTopic(null)}
    />
  );
}
if (selectedTopic === 'Greedy Algorithms') {
  return (
    <GreedyAlgorithmsLesson
      onBack={() => setSelectedTopic(null)}
    />
  );
}

  if (loading) {
    return (
      <section className="java-tracker">
        <p>Loading DSA topics...</p>
      </section>
    );
  }

  return (
    <section className="java-tracker" id="dsa-tracker">
      <div className="java-tracker-header">
        <div>
          <p className="java-eyebrow">PLACEMENT PREPARATION</p>
          <h2>DSA Syllabus Tracker</h2>
          <p>Learn data structures and algorithms step by step.</p>
        </div>

        <div className="java-progress-summary">
          <strong>{progress}%</strong>
          <span>{completedCount} of {topics.length} completed</span>
        </div>
      </div>

      <div className="java-progress-track">
        <div
          className="java-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {error && <p className="java-error" role="alert">{error}</p>}

      <div className="java-filters">
        <input
          type="search"
          placeholder="Search DSA topics..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search DSA topics"
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter DSA topics by status"
        >
          <option value="All">All statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="java-topic-list">
        {filteredTopics.map((topic) => (
          <article className="java-topic-card" key={topic.id}>
            <div className="java-topic-info">
              <span className="java-topic-category">{topic.category}</span>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              {topic.title === 'Arrays' && (
  <button

    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Arrays')}
  >
    Start Learning →
  </button>
)}
{topic.title === 'Linked Lists' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Linked Lists')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Strings' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Strings')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Stacks' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Stacks')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Queues' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Queues')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Hashing' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Hashing')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Two Pointers' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Two Pointers')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Sliding Window' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Sliding Window')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Searching' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Searching')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Sorting' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Sorting')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Recursion' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Recursion')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Backtracking' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Backtracking')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Binary Trees' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Binary Trees')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Binary Search Trees' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Binary Search Trees')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Heaps and Priority Queues' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Heaps and Priority Queues')}
  >
    Start Learning →
  </button>
)}

{topic.title === 'Graphs' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Graphs')}
  >
    Start Learning →
  </button>
)}
{topic.title === 'Greedy Algorithms' && (
  <button
    type="button"
    className="secondary-button"
    onClick={() => setSelectedTopic('Greedy Algorithms')}
  >
    Start Learning →
  </button>
)}

            </div>

            <label className="java-status-label">
              <span className="sr-only">Status for {topic.title}</span>
              <select
                value={topic.status}
                disabled={updatingId === topic.id}
                onChange={(event) =>
                  updateStatus(topic.id, event.target.value)
                }
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </article>
        ))}

        {filteredTopics.length === 0 && (
          <p className="java-empty">No matching DSA topics found.</p>
        )}
      </div>
    </section>
  );
}

export default DSATracker;
