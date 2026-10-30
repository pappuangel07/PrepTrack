import { useEffect, useMemo, useState } from 'react';

function StudyPlanner({ goToDashboard }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editSubject, setEditSubject] = useState('Java');
  const [editTopic, setEditTopic] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('17:00');
  const [editDuration, setEditDuration] = useState(60);
  const [savingEdit, setSavingEdit] = useState(false);

  const [subject, setSubject] = useState('Java');
  const [topic, setTopic] = useState('');
  const [studyDate, setStudyDate] = useState(
    new Date().toLocaleDateString('en-CA')
  );
  const [startTime, setStartTime] = useState('17:00');
  const [duration, setDuration] = useState(60);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('en-CA')
  );

  // Load study sessions
  async function loadSessions() {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/study-sessions');

      if (!response.ok) {
        throw new Error('Unable to load study sessions.');
      }

      const data = await response.json();
      setSessions(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSessions();
  }, []);

  // Filter sessions by selected date
  const dailySessions = useMemo(() => {
    return sessions.filter(
      (session) => session.study_date === selectedDate
    );
  }, [sessions, selectedDate]);

  const plannedMinutes = dailySessions.reduce(
    (total, session) => total + session.duration_minutes,
    0
  );

  const completedMinutes = dailySessions
    .filter((session) => Boolean(session.completed))
    .reduce(
      (total, session) => total + session.duration_minutes,
      0
    );

// Mark a study session as completed
async function toggleSession(session) {
  try {
    setError('');
    setMessage('');

    const response = await fetch(
      `/api/study-sessions/${session.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !Boolean(session.completed),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Unable to update session.');
    }

    setSessions((current) =>
      current.map((item) =>
        item.id === session.id ? data.session : item
      )
    );

    setMessage('Study session updated successfully!');
  } catch (err) {
    setError(err.message || 'Unable to update session.');
  }
}

// Start editing a study session
function startEditing(session) {
  setEditingSessionId(session.id);
  setEditSubject(session.subject);
  setEditTopic(session.topic);
  setEditDate(session.study_date);
  setEditTime(session.start_time);
  setEditDuration(session.duration_minutes);
  setError('');
  setMessage('');
}

// Save edited study session
async function saveEdit(event) {
  event.preventDefault();

  try {
    setSavingEdit(true);
    setError('');
    setMessage('');

    const response = await fetch(
      `/api/study-sessions/${editingSessionId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: editSubject,
          topic: editTopic,
          study_date: editDate,
          start_time: editTime,
          duration_minutes: Number(editDuration),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Unable to update session.');
    }

    setSessions((current) =>
      current.map((item) =>
        item.id === editingSessionId ? data.session : item
      )
    );

    setSelectedDate(editDate);
    setEditingSessionId(null);
    setMessage('Study session edited successfully!');
  } catch (err) {
    setError(err.message || 'Unable to edit session.');
  } finally {
    setSavingEdit(false);
  }
}

// Delete a study session
async function deleteSession(sessionId) {
  const confirmed = window.confirm(
    'Are you sure you want to delete this study session?'
  );

  if (!confirmed) return;

  try {
    setError('');
    setMessage('');

    const response = await fetch(
      `/api/study-sessions/${sessionId}`,
      {
        method: 'DELETE',
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Unable to delete session.');
    }

    setSessions((current) =>
      current.filter((session) => session.id !== sessionId)
    );

    setMessage('Study session deleted successfully!');
  } catch (err) {
    setError(err.message || 'Unable to delete session.');
  }
}

  // Create a new study session
  async function addSession(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError('');
      setMessage('');

      const response = await fetch('/api/study-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          topic,
          study_date: studyDate,
          start_time: startTime,
          duration_minutes: Number(duration),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to create session.');
      }

      setSessions((current) => [...current, data.session]);
      setTopic('');
      setMessage('Study session added successfully!');
      setSelectedDate(studyDate);
    } catch (err) {
      setError(err.message || 'Unable to add session.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="study-planner">
      <button
        type="button"
        className="secondary-button"
        onClick={goToDashboard}
      >
        Back to Dashboard
      </button>

      <div className="planner-heading">
        <h2>Daily Study Planner</h2>
        <p>Plan your study sessions and track your daily progress.</p>
      </div>

      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      <div className="planner-summary">
        <article className="planner-stat">
          <h3>Planned Study Time</h3>
          <p>{(plannedMinutes / 60).toFixed(1)} hrs</p>
        </article>

        <article className="planner-stat">
          <h3>Completed Study Time</h3>
          <p>{(completedMinutes / 60).toFixed(1)} hrs</p>
        </article>

        <article className="planner-stat">
          <h3>Pending Study Time</h3>
          <p>{((plannedMinutes - completedMinutes) / 60).toFixed(1)} hrs</p>
        </article>
      </div>

      <div className="planner-form-card">
        <h3>Add Study Session</h3>

        <form onSubmit={addSession}>
          <label>
            Subject
            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              <option value="Java">Java</option>
              <option value="DSA">DSA</option>
              <option value="Aptitude">Aptitude</option>
            </select>
          </label>

          <label>
            Topic
            <input
              type="text"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Enter topic to study"
              required
            />
          </label>

          <label>
            Study Date
            <input
              type="date"
              value={studyDate}
              onChange={(event) => setStudyDate(event.target.value)}
              required
            />
          </label>

          <label>
            Start Time
            <input
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              required
            />
          </label>

          <label>
            Duration (minutes)
            <input
              type="number"
              min="1"
              max="1440"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={saving}>
            {saving ? 'Adding...' : 'Add Study Session'}
          </button>
        </form>
      </div>

      <div className="planner-sessions">
        <h3>Your Daily Sessions</h3>

        <label>
          Select Date
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </label>

        {loading ? (
          <p>Loading study sessions...</p>
        ) : dailySessions.length === 0 ? (
          <p>No study sessions planned for this date.</p>
        ) : (
          dailySessions.map((session) => (
            <article className="planner-session-card" key={session.id}>
              <div>
                <h4>{session.topic}</h4>
                <p>{session.subject}</p>
                <p>
                  {session.start_time} · {session.duration_minutes} minutes
                </p>
              </div>
<button
  type="button"
  className="planner-edit-button"
  onClick={() => startEditing(session)}
>
  Edit
</button>

<button
  type="button"
  className="planner-delete-button"
  onClick={() => deleteSession(session.id)}
>
  Delete
</button>

{editingSessionId === session.id && (
  <form onSubmit={saveEdit} className="planner-edit-form">
    <label>
      Subject
      <select
        value={editSubject}
        onChange={(event) => setEditSubject(event.target.value)}
      >
        <option value="Java">Java</option>
        <option value="DSA">DSA</option>
        <option value="Aptitude">Aptitude</option>
      </select>
    </label>

    <label>
      Topic
      <input
        value={editTopic}
        onChange={(event) => setEditTopic(event.target.value)}
        required
      />
    </label>

    <label>
      Date
      <input
        type="date"
        value={editDate}
        onChange={(event) => setEditDate(event.target.value)}
        required
      />
    </label>

    <label>
      Start Time
      <input
        type="time"
        value={editTime}
        onChange={(event) => setEditTime(event.target.value)}
        required
      />
    </label>

    <label>
      Duration (minutes)
      <input
        type="number"
        min="1"
        max="1440"
        value={editDuration}
        onChange={(event) => setEditDuration(event.target.value)}
        required
      />
    </label>

    <button type="submit" disabled={savingEdit}>
      {savingEdit ? 'Saving...' : 'Save Changes'}
    </button>

    <button
      type="button"
      onClick={() => setEditingSessionId(null)}
    >
      Cancel
    </button>
  </form>
)}
           <button
  type="button"
  className={
    session.completed
      ? 'planner-completed-button'
      : 'planner-complete-button'
  }
  onClick={() => toggleSession(session)}
>
  {session.completed ? 'Undo Complete' : 'Mark Complete'}
</button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default StudyPlanner;