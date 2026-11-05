# PrepTrack



**A personalized placement preparation platform designed to help college students organize, track, and improve their technical and aptitude skills.**



PrepTrack brings placement preparation activities into one place. Students can manage learning roadmaps, organize daily study sessions, track their progress, practice consistently, and maintain useful learning resources.



## Features



### 1. Placement Roadmap

- Structured learning roadmaps for Java, DSA, and Aptitude.

- Track topic completion status.

- Monitor overall learning progress.



### 2. Task Manager

- Create, edit, complete, and delete tasks.

- Set priorities and due dates.

- Search, filter, and organize tasks.

- Restore deleted tasks and undo deletions.



### 3. Java Tracker

- Track Java learning topics.

- Update topic completion status.

- Monitor Java learning progress.



### 4. DSA Tracker

- Structured Data Structures and Algorithms topic tracker.

- Track learning progress and completion status.



### 5. Aptitude Tracker

- Organize quantitative aptitude preparation.

- Track topic-wise progress.



### 6. Daily Study Planner

- Schedule study sessions.

- Organize sessions by date and subject.

- Mark sessions as completed.

- Monitor planned, completed, and pending study hours.



### 7. Pomodoro Timer

- 25-minute focus sessions.

- 5-minute short breaks.

- Start, pause, resume, and reset controls.

- Select Java, DSA, or Aptitude as the study subject.

- Browser notifications and saved focus-session history.



### 8. Study Streak Tracker

- Track consecutive study days.

- View the longest study streak.

- Monitor total unique study days.

- Uses completed study sessions and saved Pomodoro sessions.



### 9. Notes Manager

- Create, edit, and delete study notes.

- Organize notes by subject.

- Search notes by title or content.



### 10. Bookmarks & Resources Manager

- Save useful learning resources.

- Organize bookmarks by subject.

- Search and filter saved resources.

- Open saved links directly.



## Technology Stack



| Technology | Purpose |

|---|---|

| React 19 | Frontend user interface |

| Vite 8 | Frontend development and build tool |

| Node.js | Backend runtime |

| Express 5 | Backend API |

| SQLite | Database |

| better-sqlite3 | SQLite database integration |

| JavaScript | Application development |

| ESLint | Code quality and linting |

| Git & GitHub | Version control |


## Project Structure

```text
PrepTrack/
|-- client/
|   |-- public/
|   |-- src/
|   |-- package.json
|   `-- vite.config.js
|
|-- server/
|   |-- server.js
|   |-- package.json
|   `-- preptrack.db (generated locally)
|
|-- .gitignore
`-- README.md



## Getting Started



Follow these instructions to run PrepTrack locally.



### Prerequisites



- Node.js and npm

- Git



### 1. Clone the Repository



```bash

git clone https://github.com/pappuangel07/PrepTrack.git

```



### 2. Navigate to the Project



```bash

cd PrepTrack

```



### 3. Install Backend Dependencies



```bash

cd server

npm install

```



### 4. Start the Backend Server



```bash

node server.js

```



The backend server runs at:



```text

http://localhost:5000

```



### 5. Install Frontend Dependencies



Open a **second terminal** in the project directory.



```bash

cd client

npm install

```



### 6. Start the Frontend



```bash

npm run dev

```



Open the application at:



```text

http://localhost:5173

```



The Vite development server proxies `/api` requests to the Express backend on port 5000.



## Database



PrepTrack uses SQLite with better-sqlite3.



- The database file is created automatically when the backend starts if it does not exist.

- Database tables are initialized using `CREATE TABLE IF NOT EXISTS`.

- Initial roadmap records are inserted when the roadmap table is empty.

- Certain existing database schemas are updated by checking for missing columns.



The local database file is:



```text

server/preptrack.db

```



Database files and local backups are excluded from Git through `.gitignore`.



## Development Commands



Run these commands from the appropriate directory.



**Frontend**



```bash

npm run dev

```



Start the development server.



```bash

npm run build

```



Create a production build.



```bash

npm run lint

```



Check frontend code using ESLint.



```bash

npm run preview

```



Preview the production build locally.



**Backend**



```bash

node server.js

```



Start the Express backend.



## API Overview



The Express backend provides REST API functionality for the application's features, including:



- Roadmap and learning trackers

- Task management

- Study session management

- Pomodoro session history

- Study streak calculations

- Notes management

- Bookmarks and learning resources



The frontend communicates with the backend through the `/api` proxy configured in `client/vite.config.js`.



## Current Project Status



**Status: Active Development**



Completed features include the learning trackers, task manager, study planner, Pomodoro timer, study streak tracker, notes manager, and bookmarks manager.



The project is undergoing quality improvements, documentation updates, API verification, and deployment preparation.



## Future Improvements



- User authentication and individual student accounts.

- Personalized learning recommendations.

- Detailed placement preparation analytics.

- More practice resources and coding challenges.

- Responsive improvements and deployment.



## Repository



GitHub: https://github.com/pappuangel07/PrepTrack



---



*PrepTrack - Plan your learning. Track your progress. Prepare for placements.*