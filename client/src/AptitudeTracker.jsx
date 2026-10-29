
import { useEffect, useMemo, useState } from 'react';

function AptitudeTracker() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    async function loadTopics() {
      try {
        const response = await fetch('/api/aptitude-topics');

        if (!response.ok) {
          throw new Error('Unable to load Aptitude topics.');
        }

        const data = await response.json();
        setTopics(data);
      } catch (err) {
        setError(err.message || 'Unable to load Aptitude topics.');
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
      const response = await fetch(`/api/aptitude-topics/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not update topic.');
      }

      setTopics((currentTopics) =>
        currentTopics.map((topic) =>
          topic.id === id ? data.topic : topic
        )
      );
    } catch (err) {
      setError(err.message || 'Could not update topic.');
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

  if (loading) {
    return (
      <section className="java-tracker">
        <p>Loading Aptitude topics...</p>
      </section>
    );
  }

  return (
    <section className="java-tracker" id="aptitude-tracker">
      <div className="java-tracker-header">
        <div>
          <p className="java-eyebrow">PLACEMENT PREPARATION</p>
          <h2>Aptitude Syllabus Tracker</h2>
          <p>Build your quantitative, reasoning and verbal skills.</p>
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
          placeholder="Search Aptitude topics..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search Aptitude topics"
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter Aptitude topics by status"
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
          <p className="java-empty">No matching Aptitude topics found.</p>
        )}
      </div>
    </section>
  );
}

export default AptitudeTracker;
