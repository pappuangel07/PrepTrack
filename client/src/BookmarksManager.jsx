
import { useEffect, useMemo, useState } from 'react';

function BookmarksManager({ goToDashboard }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [subject, setSubject] = useState('Java');
  const [description, setDescription] = useState('');

  const [editingBookmarkId, setEditingBookmarkId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');


useEffect(() => {
  let isActive = true;

  async function fetchBookmarks() {
    try {
      const response = await fetch('/api/bookmarks');

      if (!response.ok) {
        throw new Error('Unable to load bookmarks.');
      }

      const data = await response.json();

      if (isActive) {
        setBookmarks(data);
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

  fetchBookmarks();

  return () => {
    isActive = false;
  };
}, []);


async function loadBookmarks() {
  try {
    setLoading(true);
    setError('');
    const response = await fetch('/api/bookmarks');

    if (!response.ok) {
      throw new Error('Unable to load bookmarks.');
    }

    const data = await response.json();
    setBookmarks(data);
  } catch (err) {
    setError(err.message || 'Something went wrong.');
  } finally {
    setLoading(false);
  }
}


  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((bookmark) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        bookmark.title.toLowerCase().includes(search) ||
        bookmark.url.toLowerCase().includes(search) ||
        bookmark.description.toLowerCase().includes(search);

      const matchesSubject =
        filterSubject === 'All' || bookmark.subject === filterSubject;

      return matchesSearch && matchesSubject;
    });
  }, [bookmarks, searchTerm, filterSubject]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError('');
      setMessage('');

      const isEditing = editingBookmarkId !== null;
      const endpoint = isEditing
        ? `/api/bookmarks/${editingBookmarkId}`
        : '/api/bookmarks';

      const response = await fetch(endpoint, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          url,
          subject,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to save bookmark.');
      }

      resetForm();

      setMessage(
        isEditing
          ? 'Bookmark updated successfully!'
          : 'Bookmark added successfully!'
      );

      await loadBookmarks();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setTitle('');
    setUrl('');
    setSubject('Java');
    setDescription('');
    setEditingBookmarkId(null);
  }

  function startEditing(bookmark) {
    setEditingBookmarkId(bookmark.id);
    setTitle(bookmark.title);
    setUrl(bookmark.url);
    setSubject(bookmark.subject);
    setDescription(bookmark.description);
    setMessage('');
    setError('');
  }

  function cancelEditing() {
    resetForm();
  }

  async function deleteBookmark(bookmarkId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this bookmark?'
    );

    if (!confirmed) return;

    try {
      setError('');
      setMessage('');

      const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete bookmark.');
      }

      if (editingBookmarkId === bookmarkId) {
        cancelEditing();
      }

      setMessage('Bookmark deleted successfully!');
      await loadBookmarks();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    }
  }

  return (
    <section className="bookmarks-manager">
      <button
        type="button"
        className="secondary-button"
        onClick={goToDashboard}
      >
        Back to Dashboard
      </button>

      <div className="bookmarks-heading">
        <h2>My Bookmarks</h2>
        <p>Save and organize useful Java, DSA, and Aptitude resources.</p>
      </div>

      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      <div className="bookmarks-form-card">
        <h3>
          {editingBookmarkId !== null
            ? 'Edit Bookmark'
            : 'Save a Resource'}
        </h3>

        <form onSubmit={handleSubmit}>
          <label>
            Resource Title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: Java Tutorials"
              required
              maxLength={150}
            />
          </label>

          <label>
            Resource URL
            <input
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com"
              required
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

          <label className="bookmarks-description-label">
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What is this resource useful for?"
              rows={4}
            />
          </label>

          <div className="bookmarks-form-actions">
            <button type="submit" disabled={saving}>
              {saving
                ? 'Saving...'
                : editingBookmarkId !== null
                  ? 'Save Changes'
                  : 'Add Bookmark'}
            </button>

            {editingBookmarkId !== null && (
              <button type="button" onClick={cancelEditing}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bookmarks-list">
        <h3>Your Resources ({bookmarks.length})</h3>

        <div className="bookmarks-filters">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search resources..."
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
          <p>Loading bookmarks...</p>
        ) : filteredBookmarks.length === 0 ? (
          <p>No bookmarks found. Save your first resource above!</p>
        ) : (
          <div className="bookmarks-grid">
            {filteredBookmarks.map((bookmark) => (
              <article className="bookmark-card" key={bookmark.id}>
                <div className="bookmark-card-heading">
                  <h4>{bookmark.title}</h4>
                  <span>{bookmark.subject}</span>
                </div>

                <p className="bookmark-description">
                  {bookmark.description || 'No description added.'}
                </p>

                <a
                  className="bookmark-url"
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Resource ↗
                </a>

                <p className="bookmark-updated">
                  Updated: {new Date(
                    `${bookmark.updated_at.replace(' ', 'T')}Z`
                  ).toLocaleString()}
                </p>

                <div className="bookmark-actions">
                  <button
                    type="button"
                    onClick={() => startEditing(bookmark)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteBookmark(bookmark.id)}
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

export default BookmarksManager;
