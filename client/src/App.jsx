
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetch('/api/roadmap')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load roadmap');
        }
        return response.json();
      })
      .then((data) => {
        setRoadmap(data);
      })
      .catch(() => {
        setError('Unable to load roadmap. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function updateStatus(id, newStatus) {
    setUpdatingId(id);
    setError('');

    try {
      const response = await fetch(`/api/roadmap/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update progress');
      }

      setRoadmap((currentRoadmap) =>
        currentRoadmap.map((item) =>
          item.id === id ? data.item : item
        )
      );
    } catch (err) {
      setError(err.message || 'Unable to update progress.');
    } finally {
      setUpdatingId(null);
    }
  }

  const completedCount = roadmap.filter(
    (item) => item.status === 'Completed'
  ).length;

  return (
    <div className="app">
      <header className="header">
        <h1>PrepTrack</h1>
        <p>Your placement preparation journey starts here.</p>
      </header>

      <main className="main">
        <section className="welcome">
          <h2>Welcome to PrepTrack 👋</h2>
          <p>
            Learn Java, practice DSA, improve aptitude,
            and track your placement progress.
          </p>
          <a className="primary-button" href="#roadmap">
            Explore your roadmap
          </a>
        </section>

        <section className="modules" id="roadmap">
          <h2>Your Placement Roadmap</h2>

          {!loading && !error && (
            <p>
              Completed: {completedCount} / {roadmap.length}
            </p>
          )}

          {loading && <p>Loading your roadmap...</p>}

          {error && <p role="alert">{error}</p>}

          {!loading && roadmap.length > 0 && roadmap.map((item) => (
            <article className="module-card" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <label htmlFor={`status-${item.id}`}>
                Progress status:
              </label>

              <select
                id={`status-${item.id}`}
                value={item.status}
                disabled={updatingId === item.id}
                onChange={(event) =>
                  updateStatus(item.id, event.target.value)
                }
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              {updatingId === item.id && (
                <p>Saving progress...</p>
              )}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
