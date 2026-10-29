
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [taskError, setTaskError] = useState('');
  const [taskMessage, setTaskMessage] = useState('');
  const [savingTask, setSavingTask] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editPriority, setEditPriority] = useState('Medium');
  const [savingEdit, setSavingEdit] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');

  const priorities = ['High', 'Medium', 'Low'];

  // Search and filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = (task.title || '')
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesPriority =
      priorityFilter === 'All' ||
      (task.priority || 'Medium') === priorityFilter;

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Completed' && Boolean(task.completed)) ||
      (statusFilter === 'Pending' && !Boolean(task.completed));

    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Sort the filtered tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'Priority') {
      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      return (
        (priorityOrder[a.priority || 'Medium'] || 2) -
        (priorityOrder[b.priority || 'Medium'] || 2)
      );
    }

    if (sortBy === 'Due Date') {
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;

      return a.due_date.localeCompare(b.due_date);
    }

    // Newest First
    return Number(b.id) - Number(a.id);
  });

  // Load roadmap and tasks from the backend
  useEffect(() => {
    async function loadRoadmap() {
      try {
        const response = await fetch('/api/roadmap');

        if (!response.ok) {
          throw new Error('Unable to load roadmap.');
        }

        setRoadmap(await response.json());
      } catch (err) {
        setError(err.message || 'Unable to load roadmap.');
      } finally {
        setLoading(false);
      }
    }

    async function loadTasks() {
      try {
        const response = await fetch('/api/tasks');

        if (!response.ok) {
          throw new Error('Unable to load tasks.');
        }

        setTasks(await response.json());
        setTaskError('');
      } catch (err) {
        setTaskError(err.message || 'Unable to load tasks.');
      } finally {
        setTasksLoading(false);
      }
    }

    loadRoadmap();
    loadTasks();
  }, []);

  // Update roadmap progress
  async function updateStatus(id, newStatus) {
    setUpdatingId(id);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/roadmap/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update progress.');
      }

      setRoadmap((current) =>
        current.map((item) => (item.id === id ? data.item : item))
      );

      setSuccess(`${data.item.title} progress saved successfully!`);
    } catch (err) {
      setError(err.message || 'Unable to update progress.');
    } finally {
      setUpdatingId(null);
    }
  }

  // Create a new task
  async function createTask(event) {
    event.preventDefault();
    setTaskError('');
    setTaskMessage('');

    if (!title.trim()) {
      setTaskError('Please enter a task title.');
      return;
    }

    setSavingTask(true);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          due_date: dueDate || null,
          priority,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to create task.');
      }

      setTasks((current) => [data.task, ...current]);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
      setTaskMessage('Task created successfully!');
    } catch (err) {
      setTaskError(err.message || 'Unable to create task.');
    } finally {
      setSavingTask(false);
    }
  }

  // Mark a task complete or incomplete
  async function toggleTask(task) {
    setUpdatingTaskId(task.id);
    setTaskError('');
    setTaskMessage('');

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !Boolean(task.completed),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update task.');
      }

      setTasks((current) =>
        current.map((item) => (item.id === task.id ? data.task : item))
      );

      setTaskMessage('Task progress saved!');
    } catch (err) {
      setTaskError(err.message || 'Unable to update task.');
    } finally {
      setUpdatingTaskId(null);
    }
  }

  // Delete a task
  async function deleteTask(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (!confirmed) return;

    setDeletingTaskId(id);
    setTaskError('');
    setTaskMessage('');

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete task.');
      }

      setTasks((current) => current.filter((task) => task.id !== id));
      setTaskMessage('Task deleted successfully!');
    } catch (err) {
      setTaskError(err.message || 'Unable to delete task.');
    } finally {
      setDeletingTaskId(null);
    }
  }

  // Start editing a task
  function startEditingTask(task) {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditDueDate(task.due_date || '');
    setEditPriority(task.priority || 'Medium');
    setTaskError('');
    setTaskMessage('');
  }

  // Cancel editing
  function cancelEditingTask() {
    setEditingTaskId(null);
    setEditTitle('');
    setEditDescription('');
    setEditDueDate('');
    setEditPriority('Medium');
    setTaskError('');
  }

  // Save edited task
  async function saveEditedTask(event) {
    event.preventDefault();

    if (!editTitle.trim()) {
      setTaskError('Please enter a task title.');
      return;
    }

    setSavingEdit(true);
    setTaskError('');
    setTaskMessage('');

    try {
      const response = await fetch(`/api/tasks/${editingTaskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle.trim(),
          description: editDescription.trim(),
          due_date: editDueDate || null,
          priority: editPriority,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to edit task.');
      }

      setTasks((current) =>
        current.map((task) =>
          task.id === editingTaskId ? data.task : task
        )
      );

      setTaskMessage('Task updated successfully!');
      setEditingTaskId(null);
      setEditTitle('');
      setEditDescription('');
      setEditDueDate('');
      setEditPriority('Medium');
    } catch (err) {
      setTaskError(err.message || 'Unable to edit task.');
    } finally {
      setSavingEdit(false);
    }
  }

  const completedCount = roadmap.filter(
    (item) => item.status === 'Completed'
  ).length;

  const progressPercentage =
    roadmap.length === 0
      ? 0
      : Math.round((completedCount / roadmap.length) * 100);

  const completedTasks = tasks.filter(
    (task) => Boolean(task.completed)
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

          <div className="welcome-actions">
            <a className="primary-button" href="#roadmap">
              Explore your roadmap
            </a>
            <a className="secondary-button" href="#tasks">
              Manage your tasks
            </a>
          </div>
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

                {updatingId === item.id && <p>Saving progress...</p>}
              </article>
            ))}
        </section>

        <section className="tasks-section" id="tasks">
          <div className="section-heading">
            <div>
              <h2>My Tasks</h2>
              <p>Plan your daily placement preparation.</p>
            </div>

            <span className="task-count">
              {completedTasks}/{tasks.length} completed
            </span>
          </div>

          {/* Search, filters and sorting */}
          <div className="task-filters">
            <input
              type="text"
              placeholder="Search tasks by title..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search tasks by title"
            />

            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
              aria-label="Filter tasks by priority"
            >
              <option value="All">All priorities</option>
              <option value="High">High priority</option>
              <option value="Medium">Medium priority</option>
              <option value="Low">Low priority</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter tasks by status"
            >
              <option value="All">All statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort tasks"
            >
              <option value="Newest First">Newest First</option>
              <option value="Due Date">Due Date</option>
              <option value="Priority">Priority</option>
            </select>
          </div>

          <form className="task-form" onSubmit={createTask}>
            <h3>Create a new task</h3>

            <label htmlFor="task-title">Task title *</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Solve 3 Java problems"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={150}
              required
            />

            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              placeholder="What do you want to accomplish?"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              maxLength={1000}
            />

            <label htmlFor="task-date">Due date (optional)</label>
            <input
              id="task-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />

            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              {priorities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <button type="submit" disabled={savingTask}>
              {savingTask ? 'Creating task...' : '+ Add task'}
            </button>
          </form>

          {taskError && <p role="alert">{taskError}</p>}
          {taskMessage && <p role="status">{taskMessage}</p>}
          {tasksLoading && <p>Loading tasks...</p>}

          {!tasksLoading && tasks.length === 0 && (
            <div className="empty-tasks">
              <h3>No tasks yet</h3>
              <p>Create your first task and start making progress!</p>
            </div>
          )}

          {!tasksLoading &&
            tasks.length > 0 &&
            filteredTasks.length === 0 && (
              <div className="empty-tasks">
                <h3>No matching tasks</h3>
                <p>Try changing your search or filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setPriorityFilter('All');
                    setStatusFilter('All');
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}

          {!tasksLoading && sortedTasks.length > 0 && (
            <div className="task-list">
              {sortedTasks.map((task) => (
                <article
                  className={`task-card ${
                    Boolean(task.completed) ? 'task-completed' : ''
                  }`}
                  key={task.id}
                >
                  {editingTaskId === task.id ? (
                    <form
                      className="task-form task-edit-form"
                      onSubmit={saveEditedTask}
                    >
                      <h3>Edit task</h3>

                      <label htmlFor={`edit-title-${task.id}`}>
                        Task title *
                      </label>
                      <input
                        id={`edit-title-${task.id}`}
                        type="text"
                        value={editTitle}
                        onChange={(event) =>
                          setEditTitle(event.target.value)
                        }
                        maxLength={150}
                        required
                      />

                      <label htmlFor={`edit-description-${task.id}`}>
                        Description
                      </label>
                      <textarea
                        id={`edit-description-${task.id}`}
                        value={editDescription}
                        onChange={(event) =>
                          setEditDescription(event.target.value)
                        }
                        rows={3}
                        maxLength={1000}
                      />

                      <label htmlFor={`edit-date-${task.id}`}>
                        Due date (optional)
                      </label>
                      <input
                        id={`edit-date-${task.id}`}
                        type="date"
                        value={editDueDate}
                        onChange={(event) =>
                          setEditDueDate(event.target.value)
                        }
                      />

                      <label htmlFor={`edit-priority-${task.id}`}>
                        Priority
                      </label>
                      <select
                        id={`edit-priority-${task.id}`}
                        value={editPriority}
                        onChange={(event) =>
                          setEditPriority(event.target.value)
                        }
                      >
                        {priorities.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>

                      <div className="task-actions">
                        <button type="submit" disabled={savingEdit}>
                          {savingEdit ? 'Saving...' : 'Save changes'}
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          disabled={savingEdit}
                          onClick={cancelEditingTask}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="task-card-content">
                        <h3>{task.title}</h3>

                        {task.description && <p>{task.description}</p>}

                        {task.due_date && (
                          <p
                            className={`task-due-date ${
                              !Boolean(task.completed) &&
                              task.due_date <
                                new Date().toLocaleDateString('en-CA')
                                ? 'due-overdue'
                                : !Boolean(task.completed) &&
                                    task.due_date ===
                                      new Date().toLocaleDateString('en-CA')
                                  ? 'due-today'
                                  : 'due-upcoming'
                            }`}
                          >
                            {Boolean(task.completed)
                              ? 'Due: '
                              : task.due_date <
                                  new Date().toLocaleDateString('en-CA')
                                ? 'Overdue: '
                                : task.due_date ===
                                    new Date().toLocaleDateString('en-CA')
                                  ? 'Due today: '
                                  : 'Due: '}
                            {task.due_date}
                          </p>
                        )}

                        <span
                          className={`priority-badge priority-${(
                            task.priority || 'Medium'
                          ).toLowerCase()}`}
                        >
                          {task.priority || 'Medium'} Priority
                        </span>

                        <span className="task-status">
                          {Boolean(task.completed)
                            ? 'Completed'
                            : 'In progress'}
                        </span>
                      </div>

                      <div className="task-actions">
                        <button
                          type="button"
                          className="complete-button"
                          disabled={
                            updatingTaskId === task.id ||
                            editingTaskId !== null
                          }
                          onClick={() => toggleTask(task)}
                        >
                          {updatingTaskId === task.id
                            ? 'Saving...'
                            : Boolean(task.completed)
                              ? 'Mark incomplete'
                              : 'Mark complete'}
                        </button>

                        <button
                          type="button"
                          className="complete-button"
                          disabled={
                            editingTaskId !== null ||
                            deletingTaskId === task.id
                          }
                          onClick={() => startEditingTask(task)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          disabled={
                            deletingTaskId === task.id ||
                            editingTaskId !== null
                          }
                          onClick={() => deleteTask(task.id)}
                        >
                          {deletingTaskId === task.id
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
