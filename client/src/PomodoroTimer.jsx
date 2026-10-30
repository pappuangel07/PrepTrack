
import { useEffect, useState } from 'react';

const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

function PomodoroTimer({ goToDashboard }) {
  const [mode, setMode] = useState('focus');
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [subject, setSubject] = useState('Java');
  const [message, setMessage] = useState('');
const [sessions, setSessions] = useState([]);

useEffect(() => {
  if (!isRunning) return;

  const timerId = window.setInterval(() => {
    setSecondsLeft((previous) => {
      if (previous > 1) {
        return previous - 1;
      }

      return 0;
    });
  }, 1000);

  return () => window.clearInterval(timerId);
}, [isRunning]);


useEffect(() => {
  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/pomodoro-sessions');

      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }

      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Session history error:', error);
    }
  };

  fetchSessions();
}, []);


const savePomodoroSession = async () => {
  try {
    const response = await fetch('/api/pomodoro-sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        duration_minutes: Math.ceil(FOCUS_SECONDS / 60),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save Pomodoro session');
    }

    setMessage('Focus session completed and saved successfully!');
  } catch (error) {
    console.error('Pomodoro save error:', error);
    setMessage('Session completed, but saving failed.');
  }
};


useEffect(() => {
  if (!isRunning || secondsLeft !== 0) return;

  setIsRunning(false);

  if (mode === 'focus') {
    savePomodoroSession();

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('PrepTrack', {
        body: `${subject} focus session completed!`,
      });
    }
  } else {
    setMessage('Break complete! Ready to focus again?');
  }
}, [secondsLeft, isRunning, mode, subject]);


const totalSessions = sessions.length;

const totalFocusMinutes = sessions.reduce(
  (total, session) => total + session.duration_minutes,
  0
);

const subjectStats = {
  Java: sessions.filter((session) => session.subject === 'Java').length,
  DSA: sessions.filter((session) => session.subject === 'DSA').length,
  Aptitude: sessions.filter((session) => session.subject === 'Aptitude').length,
};


  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const changeMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setSecondsLeft(newMode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS);
    setMessage('');
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(mode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS);
    setMessage('');
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const startTimer = async () => {
    await requestNotificationPermission();
    setMessage('');
    setIsRunning(true);
  };

  return (
    <main className="pomodoro-page">
      <button
        type="button"
        className="secondary-button"
        onClick={goToDashboard}
      >
        Back to Dashboard
      </button>

      <section className="pomodoro-card">
        <h2>Pomodoro Timer</h2>
        <p>Focus on one task at a time. Small sessions build consistency.</p>

        <div className="pomodoro-modes">
          <button
            type="button"
            className={mode === 'focus' ? 'pomodoro-mode active' : 'pomodoro-mode'}
            onClick={() => changeMode('focus')}
          >
            Focus · 25 min
          </button>

          <button
            type="button"
            className={mode === 'break' ? 'pomodoro-mode active' : 'pomodoro-mode'}
            onClick={() => changeMode('break')}
          >
            Short Break · 5 min
          </button>
        </div>

        <label className="pomodoro-subject">
          Study subject
          <select
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            disabled={isRunning}
          >
            <option value="Java">Java</option>
            <option value="DSA">DSA</option>
            <option value="Aptitude">Aptitude</option>
          </select>
        </label>

        <div className="pomodoro-clock" role="timer" aria-live="off">
          {formatTime(secondsLeft)}
        </div>

        <p className="pomodoro-status">
          {isRunning ? 'Timer running — stay focused!' : 'Ready when you are.'}
        </p>

        <div className="pomodoro-controls">
          <button
            type="button"
            onClick={startTimer}
            disabled={isRunning || secondsLeft === 0}
          >
            {secondsLeft === (mode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS)
              ? 'Start'
              : 'Resume'}
          </button>

          <button
            type="button"
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
          >
            Pause
          </button>

          <button type="button" onClick={resetTimer}>
            Reset
          </button>
        </div>

        {message && <p className="pomodoro-message">{message}</p>}
      </section>
      

<section className="pomodoro-stats">
  <h3>Your Focus Statistics</h3>

  <div className="pomodoro-stat-grid">
    <div className="pomodoro-stat-card">
      <h4>Total Sessions</h4>
      <p>{totalSessions}</p>
    </div>

    <div className="pomodoro-stat-card">
      <h4>Total Focus Time</h4>
      <p>
        {Math.floor(totalFocusMinutes / 60)}h {totalFocusMinutes % 60}m
      </p>
    </div>

    <div className="pomodoro-stat-card">
      <h4>Java Sessions</h4>
      <p>{subjectStats.Java}</p>
    </div>

    <div className="pomodoro-stat-card">
      <h4>DSA Sessions</h4>
      <p>{subjectStats.DSA}</p>
    </div>

    <div className="pomodoro-stat-card">
      <h4>Aptitude Sessions</h4>
      <p>{subjectStats.Aptitude}</p>
    </div>
  </div>
</section>


<section className="pomodoro-history">
  <h3>Focus Session History</h3>

  {sessions.length === 0 ? (
    <p>No completed sessions yet.</p>
  ) : (
    <div>
      {sessions.map((session) => (
        <div className="pomodoro-history-item" key={session.id}>
          <strong>{session.subject}</strong>
          <span>{session.duration_minutes} minutes</span>
          <small>
            {new Date(session.completed_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  )}
</section>

    </main>
  );
}

export default PomodoroTimer;
