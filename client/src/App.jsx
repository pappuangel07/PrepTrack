
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  // Load roadmap from the backend when the page opens
  useEffect(() => {
    async function loadRoadmap() {
      try {
        const response = await fetch('/api/roadmap');

        if (!response.ok) {
          throw new Error(`Failed to load roadmap (HTTP ${response.status})`);
        }

        const data = await response.json();
        setRoadmap(data);
        setError('');
      } catch (err) {
        setError(err.message || 'Unable to load roadmap. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadRoadmap();
  }, []);

  // Update one roadmap item's status
  async function updateStatus(id, newStatus) {
    setUpdatingId(id);
    setError('');
    setSuccess('');

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

      // Read the response safely before parsing JSON
      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Server returned an unexpected response (HTTP ${response.status}). Please try again.`
        );
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update progress');
      }

      if (!data.item || typeof data.item.id !== 'number') {
        throw new Error('The server response was missing the updated roadmap item.');
      }

      // Update React state only after the backend confirms success
      setRoadmap((currentRoadmap) =>
        currentRoadmap.map((item) =>
          item.id === id ? data.item : item
        )
      );

      setSuccess(`${data.item.title} progress saved successfully!`);
    } catch (err) {
      setError(err.message || 'Unable to update progress. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  }

  // Calculate completed modules and overall progress
  const completedCount = roadmap.filter(
    (item) => item.status === 'Completed'
  ).length;

  const progressPercentage =
    roadmap.length === 0
      ? 0
      : Math.round((completedCount / roadmap.length) * 100);

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

          {!loading && roadmap.length > 0 && (
            <>
              <p>
                Completed: {completedCount} / {roadmap.length}
              </p>

              <div className="progress-section">
                <div className="progress-label">
                  <span>Overall progress</span>
                  <strong>{progressPercentage}%</strong>
                </div>

                <div
                  className="progress-track"
                  role="progressbar"
                  aria-label="Overall roadmap progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progressPercentage}
                >
                  <div
                    className="progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </>
          )}

          {loading && <p>Loading your roadmap...</p>}

          {error && <p role="alert">{error}</p>}

          {success && <p role="status">{success}</p>}

          {!loading && !error && roadmap.length === 0 && (
            <p>No roadmap modules are available yet.</p>
          )}

          {!loading &&
            roadmap.map((item) => (
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
                  <p role="status">Saving progress...</p>
                )}
              </article>
            ))}
        </section>
      </main>
    </div>
  );
}

export default App;
