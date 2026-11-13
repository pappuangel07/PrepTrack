const FEATURE_TABLES = [
  'tasks',
  'notes',
  'bookmarks',
  'study_sessions',
  'pomodoro_sessions',
];

const BASELINE_COLUMNS = {
  roadmap: ['id', 'title', 'description', 'status'],
  java_topics: ['id', 'title', 'category', 'description', 'status', 'sort_order'],
  dsa_topics: ['id', 'title', 'category', 'description', 'status', 'sort_order'],
  aptitude_topics: ['id', 'title', 'category', 'description', 'status', 'sort_order'],
  tasks: ['id', 'title', 'description', 'due_date', 'completed', 'priority', 'deleted'],
  notes: ['id', 'title', 'subject', 'content', 'created_at', 'updated_at'],
  bookmarks: ['id', 'title', 'url', 'subject', 'description', 'created_at', 'updated_at'],
  study_sessions: ['id', 'subject', 'topic', 'study_date', 'start_time', 'duration_minutes', 'completed', 'created_at'],
  pomodoro_sessions: ['id', 'subject', 'duration_minutes', 'completed_at', 'created_at'],
};

const MIGRATION_TABLES = [
  'students',
  'sessions',
  'roadmap_progress',
  'java_topic_progress',
  'dsa_topic_progress',
  'aptitude_topic_progress',
];

const EXPECTED_COLUMNS = {
  roadmap: [['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['description', 'TEXT', 1, null, 0], ['status', 'TEXT', 1, "'Not Started'", 0]],
  java_topics: [['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['category', 'TEXT', 1, null, 0], ['description', 'TEXT', 1, "''", 0], ['status', 'TEXT', 1, "'Not Started'", 0], ['sort_order', 'INTEGER', 1, null, 0]],
  dsa_topics: [['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['category', 'TEXT', 1, null, 0], ['description', 'TEXT', 1, "''", 0], ['status', 'TEXT', 1, "'Not Started'", 0], ['sort_order', 'INTEGER', 1, null, 0]],
  aptitude_topics: [['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['category', 'TEXT', 1, null, 0], ['description', 'TEXT', 1, "''", 0], ['status', 'TEXT', 1, "'Not Started'", 0], ['sort_order', 'INTEGER', 1, null, 0]],
  tasks: [['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['description', 'TEXT', 1, "''", 0], ['due_date', 'TEXT', 0, null, 0], ['completed', 'INTEGER', 1, '0', 0], ['priority', 'TEXT', 1, "'Medium'", 0], ['deleted', 'INTEGER', 1, '0', 0], ['student_id', 'INTEGER', 0, null, 0]],
  notes: [['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['subject', 'TEXT', 1, null, 0], ['content', 'TEXT', 1, "''", 0], ['created_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0], ['student_id', 'INTEGER', 0, null, 0]],
  bookmarks: [['id', 'INTEGER', 0, null, 1], ['title', 'TEXT', 1, null, 0], ['url', 'TEXT', 1, null, 0], ['subject', 'TEXT', 1, null, 0], ['description', 'TEXT', 1, "''", 0], ['created_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0], ['student_id', 'INTEGER', 0, null, 0]],
  study_sessions: [['id', 'INTEGER', 0, null, 1], ['subject', 'TEXT', 1, null, 0], ['topic', 'TEXT', 1, null, 0], ['study_date', 'TEXT', 1, null, 0], ['start_time', 'TEXT', 1, null, 0], ['duration_minutes', 'INTEGER', 1, null, 0], ['completed', 'INTEGER', 1, '0', 0], ['created_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0], ['student_id', 'INTEGER', 0, null, 0]],
  pomodoro_sessions: [['id', 'INTEGER', 0, null, 1], ['subject', 'TEXT', 1, null, 0], ['duration_minutes', 'INTEGER', 1, null, 0], ['completed_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0], ['created_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0], ['student_id', 'INTEGER', 0, null, 0]],
  students: [['id', 'INTEGER', 0, null, 1], ['display_name', 'TEXT', 1, null, 0], ['email', 'TEXT', 1, null, 0], ['password_hash', 'TEXT', 1, null, 0], ['created_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0]],
  sessions: [['sid', 'TEXT', 1, null, 1], ['student_id', 'INTEGER', 0, null, 0], ['session_data', 'TEXT', 1, null, 0], ['created_at_ms', 'INTEGER', 1, null, 0], ['expires_at_ms', 'INTEGER', 1, null, 0]],
  roadmap_progress: [['student_id', 'INTEGER', 1, null, 1], ['roadmap_id', 'INTEGER', 1, null, 2], ['status', 'TEXT', 1, "'Not Started'", 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0]],
  java_topic_progress: [['student_id', 'INTEGER', 1, null, 1], ['topic_id', 'INTEGER', 1, null, 2], ['status', 'TEXT', 1, "'Not Started'", 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0]],
  dsa_topic_progress: [['student_id', 'INTEGER', 1, null, 1], ['topic_id', 'INTEGER', 1, null, 2], ['status', 'TEXT', 1, "'Not Started'", 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0]],
  aptitude_topic_progress: [['student_id', 'INTEGER', 1, null, 1], ['topic_id', 'INTEGER', 1, null, 2], ['status', 'TEXT', 1, "'Not Started'", 0], ['updated_at', 'TEXT', 1, 'CURRENT_TIMESTAMP', 0]],
};

const EXPECTED_FOREIGN_KEYS = {
  sessions: [['student_id', 'students', 'id', 'CASCADE']],
  roadmap_progress: [['student_id', 'students', 'id', 'RESTRICT'], ['roadmap_id', 'roadmap', 'id', 'RESTRICT']],
  java_topic_progress: [['student_id', 'students', 'id', 'RESTRICT'], ['topic_id', 'java_topics', 'id', 'RESTRICT']],
  dsa_topic_progress: [['student_id', 'students', 'id', 'RESTRICT'], ['topic_id', 'dsa_topics', 'id', 'RESTRICT']],
  aptitude_topic_progress: [['student_id', 'students', 'id', 'RESTRICT'], ['topic_id', 'aptitude_topics', 'id', 'RESTRICT']],
  tasks: [['student_id', 'students', 'id', 'RESTRICT']],
  notes: [['student_id', 'students', 'id', 'RESTRICT']],
  bookmarks: [['student_id', 'students', 'id', 'RESTRICT']],
  study_sessions: [['student_id', 'students', 'id', 'RESTRICT']],
  pomodoro_sessions: [['student_id', 'students', 'id', 'RESTRICT']],
};

const EXPECTED_INDEXES = {
  sessions_expiry_idx: { table: 'sessions', columns: [['expires_at_ms', 0, 'BINARY']] },
  sessions_student_idx: { table: 'sessions', columns: [['student_id', 0, 'BINARY']] },
  roadmap_progress_student_idx: { table: 'roadmap_progress', columns: [['student_id', 0, 'BINARY']] },
  java_topic_progress_student_idx: { table: 'java_topic_progress', columns: [['student_id', 0, 'BINARY']] },
  dsa_topic_progress_student_idx: { table: 'dsa_topic_progress', columns: [['student_id', 0, 'BINARY']] },
  aptitude_topic_progress_student_idx: { table: 'aptitude_topic_progress', columns: [['student_id', 0, 'BINARY']] },
  tasks_owner_idx: { table: 'tasks', columns: [['student_id', 0, 'BINARY'], ['deleted', 0, 'BINARY'], ['id', 1, 'BINARY']] },
  notes_owner_idx: { table: 'notes', columns: [['student_id', 0, 'BINARY'], ['updated_at', 1, 'BINARY'], ['id', 1, 'BINARY']] },
  bookmarks_owner_idx: { table: 'bookmarks', columns: [['student_id', 0, 'BINARY'], ['subject', 0, 'BINARY'], ['updated_at', 1, 'BINARY']] },
  study_sessions_owner_idx: { table: 'study_sessions', columns: [['student_id', 0, 'BINARY'], ['study_date', 0, 'BINARY'], ['start_time', 0, 'BINARY']] },
  pomodoro_owner_idx: { table: 'pomodoro_sessions', columns: [['student_id', 0, 'BINARY'], ['completed_at', 0, 'BINARY']] },
};

const EXPECTED_UNIQUE_INDEXES = {
  students: [[['email', 0, 'NOCASE']]],
  sessions: [[['sid', 0, 'BINARY']]],
  java_topics: [[['title', 0, 'BINARY']], [['sort_order', 0, 'BINARY']]],
  dsa_topics: [[['title', 0, 'BINARY']], [['sort_order', 0, 'BINARY']]],
  aptitude_topics: [[['title', 0, 'BINARY']], [['sort_order', 0, 'BINARY']]],
  roadmap_progress: [[['student_id', 0, 'BINARY'], ['roadmap_id', 0, 'BINARY']]],
  java_topic_progress: [[['student_id', 0, 'BINARY'], ['topic_id', 0, 'BINARY']]],
  dsa_topic_progress: [[['student_id', 0, 'BINARY'], ['topic_id', 0, 'BINARY']]],
  aptitude_topic_progress: [[['student_id', 0, 'BINARY'], ['topic_id', 0, 'BINARY']]],
};

const AUTOINCREMENT_TABLES = ['students', ...FEATURE_TABLES];

function tableExists(db, tableName) {
  return Boolean(db.prepare(
    'SELECT 1 FROM sqlite_master WHERE type = ? AND name = ?'
  ).get('table', tableName));
}

function columnsFor(db, tableName) {
  return db.pragma(`table_info("${tableName}")`).map((column) => column.name);
}

function assertConstraintFailure(db, label, code, sql, parameters = []) {
  try {
    db.prepare(sql).run(...parameters);
  } catch (error) {
    if (error.code === code) return;
    throw new Error(`Schema validation for ${label} failed for another reason: ${error.message}`);
  }
  throw new Error(`Schema version 1 is incompatible: expected ${code} constraint for ${label} did not reject the value.`);
}

function assertCheckFailure(db, label, sql, parameters = []) {
  assertConstraintFailure(db, label, 'SQLITE_CONSTRAINT_CHECK', sql, parameters);
}

function assertCheckFailures(db, label, sql, valueIndex, values, parametersForValue) {
  for (const value of values) {
    assertCheckFailure(db, `${label}=${JSON.stringify(value)}`, sql, parametersForValue(value, valueIndex));
  }
}

function nextId(db, tableName) {
  return db.prepare(`SELECT COALESCE(MAX(id), 0) + 1 AS id FROM "${tableName}"`).get().id;
}

function assertCheckConstraintBehavior(db) {
  const token = `${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
  db.exec('SAVEPOINT auth_schema_check_validation');
  try {
    const studentId = nextId(db, 'students');
    db.prepare('INSERT INTO students (id, display_name, email, password_hash) VALUES (?, ?, ?, ?)')
      .run(studentId, 'Schema Probe', `schema-probe-${token}@invalid.test`, 'probe-hash');

    const roadmapId = nextId(db, 'roadmap');
    db.prepare('INSERT INTO roadmap (id, title, description, status) VALUES (?, ?, ?, ?)')
      .run(roadmapId, `__schema_probe_${token}`, 'probe', 'Not Started');
    const topicIds = {};
    for (const tableName of ['java_topics', 'dsa_topics', 'aptitude_topics']) {
      const id = nextId(db, tableName);
      topicIds[tableName] = id;
      const sortOrder = db.prepare(`SELECT COALESCE(MAX(sort_order), 0) + 1 AS n FROM "${tableName}"`).get().n;
      db.prepare(`INSERT INTO "${tableName}" (id, title, category, description, status, sort_order) VALUES (?, ?, ?, ?, ?, ?)`)
        .run(id, `__schema_probe_${token}`, 'Probe', '', 'Not Started', sortOrder);
    }

    const blankNames = ['', ' ', '  '];
    assertCheckFailures(db, 'students.display_name INSERT',
      'INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)', 0, blankNames,
      (name, index) => [name, `blank-${token}-${index}@invalid.test`, 'hash']);
    assertCheckFailures(db, 'students.email INSERT',
      'INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)', 0, blankNames,
      (email, index) => ['Valid Name', email, `hash-${index}`]);
    assertConstraintFailure(db, 'students.email NOT NULL', 'SQLITE_CONSTRAINT_NOTNULL',
      'INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)', ['Valid Name', null, 'hash']);
    assertConstraintFailure(db, 'students.email case-insensitive UNIQUE', 'SQLITE_CONSTRAINT_UNIQUE',
      'INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)',
      ['Another Student', `SCHEMA-PROBE-${token}@INVALID.TEST`, 'hash']);
    assertCheckFailures(db, 'sessions.expires_at_ms INSERT',
      'INSERT INTO sessions (sid, student_id, session_data, created_at_ms, expires_at_ms) VALUES (?, ?, ?, ?, ?)', 0, [0, -1],
      (expiry, index) => [`bad-expiry-${token}-${index}`, studentId, '{}', 1, expiry]);

    const progressTables = [
      ['roadmap_progress', 'roadmap_id', roadmapId],
      ['java_topic_progress', 'topic_id', topicIds.java_topics],
      ['dsa_topic_progress', 'topic_id', topicIds.dsa_topics],
      ['aptitude_topic_progress', 'topic_id', topicIds.aptitude_topics],
    ];
    for (const [tableName, refColumn, refId] of progressTables) {
      const invalidStatuses = ['', 'Invalid', 'Unexpected Status', 'Not Started '];
      for (let i = 0; i < invalidStatuses.length; i += 1) {
        const invalidStudentId = nextId(db, 'students');
        db.prepare('INSERT INTO students (id, display_name, email, password_hash) VALUES (?, ?, ?, ?)')
          .run(invalidStudentId, 'Progress Probe', `progress-probe-${token}-${tableName}-${i}@invalid.test`, 'hash');
        assertCheckFailure(db, `${tableName}.status INSERT ${JSON.stringify(invalidStatuses[i])}`,
          `INSERT INTO "${tableName}" (student_id, "${refColumn}", status) VALUES (?, ?, ?)`,
          [invalidStudentId, refId, invalidStatuses[i]]);
      }
    }

    for (const tableName of ['java_topics', 'dsa_topics', 'aptitude_topics']) {
      const id = nextId(db, tableName);
      const sortOrder = db.prepare(`SELECT COALESCE(MAX(sort_order), 0) + 1 AS n FROM "${tableName}"`).get().n;
      db.prepare(`INSERT INTO "${tableName}" (id, title, category, description, status, sort_order) VALUES (?, ?, ?, ?, ?, ?)`)
        .run(id, `__schema_probe_update_${token}`, 'Probe', '', 'Not Started', sortOrder);
      for (const validStatus of ['Not Started', 'In Progress', 'Completed']) {
        db.prepare(`UPDATE "${tableName}" SET status = ? WHERE id = ?`).run(validStatus, id);
      }
      for (const invalidStatus of ['', 'Invalid', 'Unexpected Status', 'Not Started ']) {
        assertCheckFailure(db, `${tableName}.status UPDATE ${JSON.stringify(invalidStatus)}`,
          `UPDATE "${tableName}" SET status = ? WHERE id = ?`, [invalidStatus, id]);
      }
    }

    const sessionId = `valid-session-${token}`;
    db.prepare('INSERT INTO sessions (sid, student_id, session_data, created_at_ms, expires_at_ms) VALUES (?, ?, ?, ?, ?)')
      .run(sessionId, studentId, '{}', 1, 1);
    assertCheckFailures(db, 'sessions.expires_at_ms UPDATE',
      'UPDATE sessions SET expires_at_ms = ? WHERE sid = ?', 0, [0, -1],
      (expiry) => [expiry, sessionId]);
    assertCheckFailures(db, 'students.display_name UPDATE',
      'UPDATE students SET display_name = ? WHERE id = ?', 0, blankNames,
      (name) => [name, studentId]);
    assertCheckFailures(db, 'students.email UPDATE',
      'UPDATE students SET email = ? WHERE id = ?', 0, blankNames,
      (email) => [email, studentId]);

    for (const [tableName, refColumn, refId] of progressTables) {
      db.prepare(`INSERT INTO "${tableName}" (student_id, "${refColumn}") VALUES (?, ?)`)
        .run(studentId, refId);
      for (const validStatus of ['Not Started', 'In Progress', 'Completed']) {
        db.prepare(`UPDATE "${tableName}" SET status = ? WHERE student_id = ? AND "${refColumn}" = ?`)
          .run(validStatus, studentId, refId);
      }
      for (const invalidStatus of ['', 'Invalid', 'Unexpected Status', 'Not Started ']) {
        assertCheckFailure(db, `${tableName}.status UPDATE ${JSON.stringify(invalidStatus)}`,
          `UPDATE "${tableName}" SET status = ? WHERE student_id = ? AND "${refColumn}" = ?`,
          [invalidStatus, studentId, refId]);
      }
    }

    const noteId = nextId(db, 'notes');
    db.prepare('INSERT INTO notes (id, title, subject, content) VALUES (?, ?, ?, ?)')
      .run(noteId, `__schema_probe_${token}`, 'Java', '');
    for (const subject of ['Java', 'DSA', 'Aptitude']) {
      db.prepare('UPDATE notes SET subject = ? WHERE id = ?').run(subject, noteId);
    }
    const invalidSubjects = ['', 'Invalid', 'Biology'];
    assertCheckFailures(db, 'notes.subject INSERT',
      'INSERT INTO notes (title, subject, content) VALUES (?, ?, ?)', 0, invalidSubjects,
      (subject, index) => [`bad-${token}-${index}`, subject, '']);
    for (const subject of ['Java', 'DSA', 'Aptitude']) db.prepare('UPDATE notes SET subject = ? WHERE id = ?').run(subject, noteId);
    assertCheckFailures(db, 'notes.subject UPDATE',
      'UPDATE notes SET subject = ? WHERE id = ?', 0, invalidSubjects, (subject) => [subject, noteId]);

    const bookmarkId = nextId(db, 'bookmarks');
    db.prepare('INSERT INTO bookmarks (id, title, url, subject, description) VALUES (?, ?, ?, ?, ?)')
      .run(bookmarkId, `__schema_probe_${token}`, 'https://example.invalid', 'Java', '');
    for (const subject of ['Java', 'DSA', 'Aptitude']) {
      db.prepare('UPDATE bookmarks SET subject = ? WHERE id = ?').run(subject, bookmarkId);
    }
    assertCheckFailures(db, 'bookmarks.subject INSERT',
      'INSERT INTO bookmarks (title, url, subject, description) VALUES (?, ?, ?, ?)', 0, invalidSubjects,
      (subject, index) => [`bad-${token}-${index}`, 'https://example.invalid', subject, '']);
    for (const subject of ['Java', 'DSA', 'Aptitude']) db.prepare('UPDATE bookmarks SET subject = ? WHERE id = ?').run(subject, bookmarkId);
    assertCheckFailures(db, 'bookmarks.subject UPDATE',
      'UPDATE bookmarks SET subject = ? WHERE id = ?', 0, invalidSubjects, (subject) => [subject, bookmarkId]);

    assertCheckFailures(db, 'study_sessions.subject INSERT',
      'INSERT INTO study_sessions (subject, topic, study_date, start_time, duration_minutes) VALUES (?, ?, ?, ?, ?)', 0, invalidSubjects,
      (subject) => [subject, 'probe', '2030-01-01', '10:00', 10]);
    assertCheckFailures(db, 'study_sessions.duration_minutes INSERT',
      'INSERT INTO study_sessions (subject, topic, study_date, start_time, duration_minutes) VALUES (?, ?, ?, ?, ?)', 0, [0, -1],
      (duration) => ['Java', 'probe', '2030-01-01', '10:00', duration]);
    assertCheckFailures(db, 'study_sessions.completed INSERT',
      'INSERT INTO study_sessions (subject, topic, study_date, start_time, duration_minutes, completed) VALUES (?, ?, ?, ?, ?, ?)', 0, [2, -1],
      (completed) => ['Java', 'probe', '2030-01-01', '10:00', 10, completed]);
    const studyId = nextId(db, 'study_sessions');
    db.prepare('INSERT INTO study_sessions (id, subject, topic, study_date, start_time, duration_minutes) VALUES (?, ?, ?, ?, ?, ?)')
      .run(studyId, 'Java', 'probe', '2030-01-01', '10:00', 10);
    for (const subject of ['Java', 'DSA', 'Aptitude']) {
      db.prepare('UPDATE study_sessions SET subject = ? WHERE id = ?').run(subject, studyId);
    }
    db.prepare('UPDATE study_sessions SET completed = 1 WHERE id = ?').run(studyId);
    assertCheckFailures(db, 'study_sessions.subject UPDATE', 'UPDATE study_sessions SET subject = ? WHERE id = ?', 0, invalidSubjects,
      (subject) => [subject, studyId]);
    assertCheckFailures(db, 'study_sessions.duration_minutes UPDATE', 'UPDATE study_sessions SET duration_minutes = ? WHERE id = ?', 0, [0, -1],
      (duration) => [duration, studyId]);
    assertCheckFailures(db, 'study_sessions.completed UPDATE', 'UPDATE study_sessions SET completed = ? WHERE id = ?', 0, [2, -1],
      (completed) => [completed, studyId]);

    assertCheckFailures(db, 'pomodoro_sessions.subject INSERT',
      'INSERT INTO pomodoro_sessions (subject, duration_minutes) VALUES (?, ?)', 0, invalidSubjects,
      (subject) => [subject, 25]);
    assertCheckFailures(db, 'pomodoro_sessions.duration_minutes INSERT',
      'INSERT INTO pomodoro_sessions (subject, duration_minutes) VALUES (?, ?)', 0, [0, -1],
      (duration) => ['Java', duration]);
    const pomodoroId = nextId(db, 'pomodoro_sessions');
    db.prepare('INSERT INTO pomodoro_sessions (id, subject, duration_minutes) VALUES (?, ?, ?)')
      .run(pomodoroId, 'Java', 25);
    for (const subject of ['Java', 'DSA', 'Aptitude']) {
      db.prepare('UPDATE pomodoro_sessions SET subject = ? WHERE id = ?').run(subject, pomodoroId);
    }
    assertCheckFailures(db, 'pomodoro_sessions.subject UPDATE', 'UPDATE pomodoro_sessions SET subject = ? WHERE id = ?', 0, invalidSubjects,
      (subject) => [subject, pomodoroId]);
    assertCheckFailures(db, 'pomodoro_sessions.duration_minutes UPDATE', 'UPDATE pomodoro_sessions SET duration_minutes = ? WHERE id = ?', 0, [0, -1],
      (duration) => [duration, pomodoroId]);
  } finally {
    db.exec('ROLLBACK TO auth_schema_check_validation; RELEASE auth_schema_check_validation');
  }
}

function assertAutoincrementBehavior(db) {
  const token = `${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
  const probes = {
    students: {
      insert: db.prepare('INSERT INTO students (id, display_name, email, password_hash) VALUES (?, ?, ?, ?)'),
      generated: db.prepare('INSERT INTO students (display_name, email, password_hash) VALUES (?, ?, ?)'),
      values: (id) => [id, 'Sequence Probe', `sequence-probe-${token}-${id}@invalid.test`, 'hash'],
      generatedValues: [ 'Sequence Probe', `sequence-probe-${token}-generated@invalid.test`, 'hash' ],
    },
    tasks: {
      insert: db.prepare('INSERT INTO tasks (id, title) VALUES (?, ?)'),
      generated: db.prepare('INSERT INTO tasks (title) VALUES (?)'),
      values: (id) => [id, `sequence-probe-${token}-${id}`],
      generatedValues: [`sequence-probe-${token}-generated`],
    },
    notes: {
      insert: db.prepare('INSERT INTO notes (id, title, subject, content) VALUES (?, ?, ?, ?)'),
      generated: db.prepare('INSERT INTO notes (title, subject, content) VALUES (?, ?, ?)'),
      values: (id) => [id, `sequence-probe-${token}-${id}`, 'Java', ''],
      generatedValues: [`sequence-probe-${token}-generated`, 'Java', ''],
    },
    bookmarks: {
      insert: db.prepare('INSERT INTO bookmarks (id, title, url, subject, description) VALUES (?, ?, ?, ?, ?)'),
      generated: db.prepare('INSERT INTO bookmarks (title, url, subject, description) VALUES (?, ?, ?, ?)'),
      values: (id) => [id, `sequence-probe-${token}-${id}`, 'https://example.invalid', 'Java', ''],
      generatedValues: [`sequence-probe-${token}-generated`, 'https://example.invalid', 'Java', ''],
    },
    study_sessions: {
      insert: db.prepare('INSERT INTO study_sessions (id, subject, topic, study_date, start_time, duration_minutes) VALUES (?, ?, ?, ?, ?, ?)'),
      generated: db.prepare('INSERT INTO study_sessions (subject, topic, study_date, start_time, duration_minutes) VALUES (?, ?, ?, ?, ?)'),
      values: (id) => [id, 'Java', 'probe', '2030-01-01', '10:00', 10],
      generatedValues: ['Java', 'probe', '2030-01-01', '10:00', 10],
    },
    pomodoro_sessions: {
      insert: db.prepare('INSERT INTO pomodoro_sessions (id, subject, duration_minutes) VALUES (?, ?, ?)'),
      generated: db.prepare('INSERT INTO pomodoro_sessions (subject, duration_minutes) VALUES (?, ?)'),
      values: (id) => [id, 'Java', 25],
      generatedValues: ['Java', 25],
    },
  };

  db.exec('SAVEPOINT auth_schema_autoincrement_validation');
  try {
    for (const [tableName, probe] of Object.entries(probes)) {
      const highId = db.prepare(`SELECT COALESCE(MAX(id), 0) + 1000 AS id FROM "${tableName}"`).get().id;
      probe.insert.run(...probe.values(highId));
      db.prepare(`DELETE FROM "${tableName}" WHERE id = ?`).run(highId);
      const nextId = Number(probe.generated.run(...probe.generatedValues).lastInsertRowid);
      if (nextId <= highId) {
        throw new Error(`Schema version 1 is incompatible: "${tableName}.id" does not behave as AUTOINCREMENT.`);
      }
    }
  } finally {
    db.exec('ROLLBACK TO auth_schema_autoincrement_validation; RELEASE auth_schema_autoincrement_validation');
  }
}

function assertBaselineSchema(db) {
  for (const [tableName, requiredColumns] of Object.entries(BASELINE_COLUMNS)) {
    if (!tableExists(db, tableName)) {
      throw new Error(`Cannot migrate: required baseline table "${tableName}" is missing.`);
    }
    const actualColumns = new Set(columnsFor(db, tableName));
    const missing = requiredColumns.filter((column) => !actualColumns.has(column));
    if (missing.length > 0) {
      throw new Error(`Cannot migrate: "${tableName}" is missing columns: ${missing.join(', ')}.`);
    }
  }

  for (const tableName of FEATURE_TABLES) {
    if (columnsFor(db, tableName).includes('student_id')) {
      throw new Error(`Cannot migrate: "${tableName}.student_id" exists while user_version is 0.`);
    }
  }

  for (const tableName of MIGRATION_TABLES) {
    if (tableExists(db, tableName)) {
      throw new Error(`Cannot migrate: migration object "${tableName}" already exists while user_version is 0.`);
    }
  }
}

function assertV1Schema(db) {
  for (const [tableName, expected] of Object.entries(EXPECTED_COLUMNS)) {
    if (!tableExists(db, tableName)) {
      throw new Error(`Schema version 1 is incomplete: table "${tableName}" is missing.`);
    }
    const tableColumns = db.pragma(`table_xinfo("${tableName}")`);
    if (tableColumns.some((column) => column.hidden !== 0)) {
      throw new Error(`Schema version 1 is incompatible: hidden/generated columns exist in "${tableName}".`);
    }
    const actual = tableColumns.map((column) => [
      column.name, column.type.toUpperCase(), column.notnull, column.dflt_value, column.pk,
    ]);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Schema version 1 is incompatible: column definitions differ for "${tableName}".`);
    }
  }

  for (const [tableName, expected] of Object.entries(EXPECTED_FOREIGN_KEYS)) {
    const actual = db.pragma(`foreign_key_list("${tableName}")`)
      .map((key) => [key.from, key.table, key.to, key.on_delete.toUpperCase()])
      .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
    const orderedExpected = expected.slice().sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
    if (JSON.stringify(actual) !== JSON.stringify(orderedExpected)) {
      throw new Error(`Schema version 1 is incompatible: foreign keys differ for "${tableName}".`);
    }
  }

  for (const [indexName, expected] of Object.entries(EXPECTED_INDEXES)) {
    const listed = db.pragma(`index_list("${expected.table}")`).find((index) => index.name === indexName);
    if (!listed) throw new Error(`Schema version 1 is incomplete: index "${indexName}" is missing.`);
    const actual = db.pragma(`index_xinfo("${indexName}")`)
      .filter((column) => column.key === 1)
      .map((column) => [column.name, column.desc, column.coll.toUpperCase()]);
    if (listed.unique !== 0 || listed.partial !== 0 || JSON.stringify(actual) !== JSON.stringify(expected.columns)) {
      throw new Error(`Schema version 1 is incompatible: index "${indexName}" has incorrect uniqueness, partial status, order, direction or collation.`);
    }
  }

  for (const [tableName, expectedIndexes] of Object.entries(EXPECTED_UNIQUE_INDEXES)) {
    const indexes = db.pragma(`index_list("${tableName}")`);
    const actualUnique = indexes.filter((index) => index.unique === 1 && index.partial === 0).map((index) =>
      db.pragma(`index_xinfo("${index.name}")`).filter((column) => column.key === 1)
        .map((column) => [column.name, column.desc, column.coll.toUpperCase()]));
    for (const expected of expectedIndexes) {
      if (!actualUnique.some((actual) => JSON.stringify(actual) === JSON.stringify(expected))) {
        throw new Error(`Schema version 1 is incompatible: UNIQUE/PRIMARY KEY index differs for "${tableName}".`);
      }
    }
  }

  const createSql = Object.fromEntries(db.prepare(
    'SELECT name, sql FROM sqlite_master WHERE type = ? AND sql IS NOT NULL'
  ).all('table').map((row) => [row.name, row.sql]));
  for (const tableName of AUTOINCREMENT_TABLES) {
    if (!/\bid\s+INTEGER\s+PRIMARY\s+KEY\s+AUTOINCREMENT\b/i.test(createSql[tableName] || '')) {
      throw new Error(`Schema version 1 is incompatible: "${tableName}.id" must declare INTEGER PRIMARY KEY AUTOINCREMENT.`);
    }
  }

  assertAutoincrementBehavior(db);
  assertCheckConstraintBehavior(db);

  for (const tableName of ['roadmap_progress', 'java_topic_progress', 'dsa_topic_progress', 'aptitude_topic_progress']) {
    const primaryKey = db.pragma(`table_info("${tableName}")`).filter((column) => column.pk > 0)
      .sort((a, b) => a.pk - b.pk).map((column) => column.name);
    if (JSON.stringify(primaryKey) !== JSON.stringify(['student_id', tableName === 'roadmap_progress' ? 'roadmap_id' : 'topic_id'])) {
      throw new Error(`Schema version 1 is incompatible: composite primary key differs for "${tableName}".`);
    }
  }
}

function failAt(failpoint, point) {
  if (failpoint === point) throw new Error(`Injected migration failure at ${point}.`);
}

function applyV1(db, failpoint) {
  db.exec(`
    CREATE TABLE students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      display_name TEXT NOT NULL CHECK (length(trim(display_name)) > 0),
      email TEXT NOT NULL COLLATE NOCASE UNIQUE CHECK (length(trim(email)) > 0),
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE sessions (
      sid TEXT PRIMARY KEY NOT NULL,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      session_data TEXT NOT NULL,
      created_at_ms INTEGER NOT NULL,
      expires_at_ms INTEGER NOT NULL CHECK (expires_at_ms > 0)
    );
    CREATE INDEX sessions_expiry_idx ON sessions(expires_at_ms);
    CREATE INDEX sessions_student_idx ON sessions(student_id);

    CREATE TABLE roadmap_progress (
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
      roadmap_id INTEGER NOT NULL REFERENCES roadmap(id) ON DELETE RESTRICT,
      status TEXT NOT NULL DEFAULT 'Not Started'
        CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (student_id, roadmap_id)
    );
    CREATE INDEX roadmap_progress_student_idx ON roadmap_progress(student_id);

    CREATE TABLE java_topic_progress (
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
      topic_id INTEGER NOT NULL REFERENCES java_topics(id) ON DELETE RESTRICT,
      status TEXT NOT NULL DEFAULT 'Not Started'
        CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (student_id, topic_id)
    );
    CREATE INDEX java_topic_progress_student_idx ON java_topic_progress(student_id);

    CREATE TABLE dsa_topic_progress (
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
      topic_id INTEGER NOT NULL REFERENCES dsa_topics(id) ON DELETE RESTRICT,
      status TEXT NOT NULL DEFAULT 'Not Started'
        CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (student_id, topic_id)
    );
    CREATE INDEX dsa_topic_progress_student_idx ON dsa_topic_progress(student_id);

    CREATE TABLE aptitude_topic_progress (
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
      topic_id INTEGER NOT NULL REFERENCES aptitude_topics(id) ON DELETE RESTRICT,
      status TEXT NOT NULL DEFAULT 'Not Started'
        CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (student_id, topic_id)
    );
    CREATE INDEX aptitude_topic_progress_student_idx ON aptitude_topic_progress(student_id);
  `);
  failAt(failpoint, 'after-tables');

  // Phase 2 adds nullable owner references without rebuilding tables. Phase 3
  // will assign the legacy owner and enforce NOT NULL after bootstrap.
  for (const tableName of FEATURE_TABLES) {
    db.exec(`ALTER TABLE "${tableName}" ADD COLUMN student_id INTEGER REFERENCES students(id) ON DELETE RESTRICT`);
  }
  failAt(failpoint, 'after-owner-columns');

  db.exec(`
    CREATE INDEX tasks_owner_idx ON tasks(student_id, deleted, id DESC);
    CREATE INDEX notes_owner_idx ON notes(student_id, updated_at DESC, id DESC);
    CREATE INDEX bookmarks_owner_idx ON bookmarks(student_id, subject, updated_at DESC);
    CREATE INDEX study_sessions_owner_idx ON study_sessions(student_id, study_date, start_time);
    CREATE INDEX pomodoro_owner_idx ON pomodoro_sessions(student_id, completed_at);
  `);
  failAt(failpoint, 'after-indexes');

  db.pragma('user_version = 1');
  failAt(failpoint, 'after-user-version');

  const violations = db.pragma('foreign_key_check');
  if (violations.length > 0) {
    throw new Error(`Migration produced ${violations.length} foreign-key violation(s).`);
  }
}

function migrateAuthSchema(db, options = {}) {
  if (!db || typeof db.transaction !== 'function') {
    throw new TypeError('migrateAuthSchema requires an open better-sqlite3 database.');
  }
  const failpoints = ['after-tables', 'after-owner-columns', 'after-indexes', 'after-user-version', 'validation', 'after-validation'];
  if (options.failpoint && !failpoints.includes(options.failpoint)) {
    throw new Error(`Unknown migration test failpoint: ${options.failpoint}`);
  }

  db.pragma('foreign_keys = ON');
  if (db.pragma('foreign_keys')[0].foreign_keys !== 1) {
    throw new Error('SQLite foreign-key enforcement could not be enabled.');
  }

  const version = db.pragma('user_version')[0].user_version;
  if (version === 1) {
    assertV1Schema(db);
    return 'already-current';
  }
  if (version !== 0) {
    throw new Error(`No migration is defined from schema version ${version}.`);
  }

  assertBaselineSchema(db);
  const transaction = db.transaction(() => {
    if (db.pragma('user_version')[0].user_version !== 0) {
      throw new Error('Schema version changed while migration was starting.');
    }
    assertBaselineSchema(db);
    applyV1(db, options.failpoint);
    if (options.failpoint === 'validation') db.exec('DROP INDEX tasks_owner_idx');
    assertV1Schema(db);
    failAt(options.failpoint, 'after-validation');
  });
  transaction.immediate();
  return 'applied';
}

module.exports = {
  migrateAuthSchema,
  validateAuthSchema: assertV1Schema,
};
