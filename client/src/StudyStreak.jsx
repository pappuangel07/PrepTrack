import { useEffect, useState } from 'react';

function StudyStreak() {
  const [streak, setStreak] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const response = await fetch('/api/study-streak');

        if (!response.ok) {
          throw new Error('Failed to fetch study streak');
        }

        const data = await response.json();
        setStreak(data);
      } catch (err) {
        console.error('Study streak error:', err);
        setError('Unable to load study streak.');
      }
    };

    fetchStreak();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!streak) {
    return <p>Loading study streak...</p>;
  }

  return (
    <div className="study-streak">
      <h2>Study Streak Tracker</h2>

      <div className="streak-stats">
        <div className="streak-card">
          <h3>🔥 Current Streak</h3>
          <p>{streak.currentStreak} days</p>
        </div>

        <div className="streak-card">
          <h3>🏆 Longest Streak</h3>
          <p>{streak.longestStreak} days</p>
        </div>

        <div className="streak-card">
          <h3>📅 Total Study Days</h3>
          <p>{streak.totalStudyDays} days</p>
        </div>
      </div>

      <p>
        {streak.studiedToday
          ? '✅ You studied today. Keep going!'
          : '📚 Complete a study session today to continue your streak.'}
      </p>

      <h3>Study Dates</h3>

      {streak.studyDates.length === 0 ? (
        <p>No study activity recorded yet.</p>
      ) : (
        <ul>
          {streak.studyDates.map((date) => (
            <li key={date}>{date}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudyStreak;