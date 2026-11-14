
'use strict';

function bootstrapFirstStudent(db, studentId) {
  if (!Number.isSafeInteger(studentId) || studentId <= 0) {
    throw new TypeError('Invalid student ID.');
  }

  const operation = db.transaction(() => {
    const student = db.prepare(
      'SELECT id FROM students WHERE id = ?'
    ).get(studentId);

    if (!student) throw new Error('Student does not exist.');

    const existing = db.prepare(
      'SELECT owner_student_id FROM bootstrap_state WHERE singleton = 1'
    ).get();

    if (existing) return { bootstrapped: false };

    const students = db.prepare(
      'SELECT COUNT(*) AS total, MIN(id) AS first_id FROM students'
    ).get();

    if (students.total !== 1 || students.first_id !== studentId) {
      return { bootstrapped: false };
    }

    const tasks = db.prepare(
      'UPDATE tasks SET student_id = ? WHERE student_id IS NULL'
    ).run(studentId);

    const studySessions = db.prepare(
      'UPDATE study_sessions SET student_id = ? WHERE student_id IS NULL'
    ).run(studentId);

    const pomodoro = db.prepare(
      'UPDATE pomodoro_sessions SET student_id = ? WHERE student_id IS NULL'
    ).run(studentId);

    const notes = db.prepare(
      'UPDATE notes SET student_id = ? WHERE student_id IS NULL'
    ).run(studentId);

    const bookmarks = db.prepare(
      'UPDATE bookmarks SET student_id = ? WHERE student_id IS NULL'
    ).run(studentId);

    // Transfer legacy roadmap progress to the first student.
    const roadmapProgress = db.prepare(`
      INSERT INTO roadmap_progress
        (student_id, roadmap_id, status, updated_at)
      SELECT ?, id, status, CURRENT_TIMESTAMP
      FROM roadmap
      WHERE status != 'Not Started'
      ON CONFLICT(student_id, roadmap_id) DO NOTHING
    `).run(studentId);

    // Transfer legacy Java topic progress.
    const javaProgress = db.prepare(`
      INSERT INTO java_topic_progress
        (student_id, topic_id, status, updated_at)
      SELECT ?, id, status, CURRENT_TIMESTAMP
      FROM java_topics
      WHERE status != 'Not Started'
      ON CONFLICT(student_id, topic_id) DO NOTHING
    `).run(studentId);

    // Transfer legacy DSA topic progress.
    const dsaProgress = db.prepare(`
      INSERT INTO dsa_topic_progress
        (student_id, topic_id, status, updated_at)
      SELECT ?, id, status, CURRENT_TIMESTAMP
      FROM dsa_topics
      WHERE status != 'Not Started'
      ON CONFLICT(student_id, topic_id) DO NOTHING
    `).run(studentId);

    // Transfer legacy aptitude topic progress.
    const aptitudeProgress = db.prepare(`
      INSERT INTO aptitude_topic_progress
        (student_id, topic_id, status, updated_at)
      SELECT ?, id, status, CURRENT_TIMESTAMP
      FROM aptitude_topics
      WHERE status != 'Not Started'
      ON CONFLICT(student_id, topic_id) DO NOTHING
    `).run(studentId);

    db.prepare(
      'INSERT INTO bootstrap_state (singleton, owner_student_id) VALUES (1, ?)'
    ).run(studentId);

    return {
      bootstrapped: true,
      tasksTransferred: tasks.changes,
      studySessionsTransferred: studySessions.changes,
      pomodoroTransferred: pomodoro.changes,
      notesTransferred: notes.changes,
      roadmapProgressTransferred: roadmapProgress.changes,
      javaProgressTransferred: javaProgress.changes,
      dsaProgressTransferred: dsaProgress.changes,
      aptitudeProgressTransferred: aptitudeProgress.changes,
      bookmarksTransferred: bookmarks.changes
    };
  });

  return operation.immediate();
}

module.exports = { bootstrapFirstStudent };
