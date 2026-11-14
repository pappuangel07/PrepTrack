
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

    db.prepare(
      'INSERT INTO bootstrap_state (singleton, owner_student_id) VALUES (1, ?)'
    ).run(studentId);

    return {
      bootstrapped: true,
      tasksTransferred: tasks.changes,
      studySessionsTransferred: studySessions.changes,
      pomodoroTransferred: pomodoro.changes,
      notesTransferred: notes.changes,
      bookmarksTransferred: bookmarks.changes
    };
  });

  return operation.immediate();
}

module.exports = { bootstrapFirstStudent };
