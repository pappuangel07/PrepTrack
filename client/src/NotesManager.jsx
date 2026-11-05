
import { useEffect, useMemo, useState } from 'react';

function NotesManager({ goToDashboard }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Java');
  const [content, setContent] = useState('');

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');

  async function loadNotes() {
    try {
    setLoading(true);
    setError('');

      const response = await fetch('/api/notes');

      if (!response.ok) {
        throw new Error('Unable to load notes.');
      }

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }


useEffect(() => {
  let isActive = true;

  async function fetchNotes() {
    try {
      const response = await fetch('/api/notes');

      if (!response.ok) {
        throw new Error('Unable to load notes.');
      }

      const data = await response.json();

      if (isActive) {
        setNotes(data);
      }
    } catch (err) {
      if (isActive) {
        setError(err.message || 'Something went wrong.');
      }
    } finally {
      if (isActive) {
        setLoading(false);
      }
    }
  }

  fetchNotes();

  return () => {
    isActive = false;
  };
}, []);


  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject =
        filterSubject === 'All' || note.subject === filterSubject;

      return matchesSearch && matchesSubject;
    });
  }, [notes, searchTerm, filterSubject]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError('');
      setMessage('');

      const isEditing = editingNoteId !== null;
      const url = isEditing
        ? `/api/notes/${editingNoteId}`
        : '/api/notes';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          subject,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to save note.');
      }

      setTitle('');
      setSubject('Java');
      setContent('');
      setEditingNoteId(null);

      setMessage(isEditing ? 'Note updated successfully!' : 'Note added successfully!');

      await loadNotes();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }

  function startEditing(note) {
    setEditingNoteId(note.id);
    setTitle(note.title);
    setSubject(note.subject);
    setContent(note.content);
    setMessage('');
    setError('');
  }

  function cancelEditing() {
    setEditingNoteId(null);
    setTitle('');
    setSubject('Java');
    setContent('');
  }

  async function deleteNote(noteId) {
    const confirmed = window.confirm('Are you sure you want to delete this note?');

    if (!confirmed) return;

    try {
      setError('');
      setMessage('');

      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete note.');
      }

      if (editingNoteId === noteId) {
        cancelEditing();
      }

      setMessage('Note deleted successfully!');
      await loadNotes();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    }
  }

  return (
    <section className="notes-manager">
      <button
        type="button"
        className="secondary-button"
        onClick={goToDashboard}
      >
        Back to Dashboard
      </button>

      <div className="notes-heading">
        <h2>My Notes</h2>
        <p>Create, organize, and revise your Java, DSA, and Aptitude notes.</p>
      </div>

      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      <div className="notes-form-card">
        <h3>{editingNoteId !== null ? 'Edit Note' : 'Create a Note'}</h3>

        <form onSubmit={handleSubmit}>
          <label>
            Note Title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter note title"
              required
              maxLength={150}
            />
          </label>

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

          <label className="notes-content-label">
            Note Content
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Write your notes here..."
              rows={6}
            />
          </label>

          <div className="notes-form-actions">
            <button type="submit" disabled={saving}>
              {saving
                ? 'Saving...'
                : editingNoteId !== null
                  ? 'Save Changes'
                  : 'Add Note'}
            </button>

            {editingNoteId !== null && (
              <button type="button" onClick={cancelEditing}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="notes-list">
        <h3>Your Notes ({notes.length})</h3>

        <div className="notes-filters">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search notes..."
          />

          <select
            value={filterSubject}
            onChange={(event) => setFilterSubject(event.target.value)}
          >
            <option value="All">All Subjects</option>
            <option value="Java">Java</option>
            <option value="DSA">DSA</option>
            <option value="Aptitude">Aptitude</option>
          </select>
        </div>

        {loading ? (
          <p>Loading notes...</p>
        ) : filteredNotes.length === 0 ? (
          <p>No notes found. Create your first note above!</p>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <article className="note-card" key={note.id}>
                <div className="note-card-heading">
                  <h4>{note.title}</h4>
                  <span>{note.subject}</span>
                </div>

                <p className="note-content">{note.content || 'No content added.'}</p>

                <p className="note-updated">
                  Updated: {new Date(`${note.updated_at.replace(' ', 'T')}Z`).toLocaleString()}
                </p>

                <div className="note-actions">
                  <button
                    type="button"
                    onClick={() => startEditing(note)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default NotesManager;
