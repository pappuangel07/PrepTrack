
import './App.css';

function App() {
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
          <a className="primary-button" href="#roadmap">
            Explore your roadmap
          </a>
        </section>

        <section className="modules" id="roadmap">
          <article className="module-card">
            <h3>Java</h3>
            <p>Build your programming fundamentals.</p>
            <span>Start with the basics</span>
          </article>

          <article className="module-card">
            <h3>DSA</h3>
            <p>Learn algorithms and solve coding problems.</p>
            <span>Practice consistently</span>
          </article>

          <article className="module-card">
            <h3>Aptitude</h3>
            <p>Improve quantitative and logical reasoning.</p>
            <span>Strengthen your skills</span>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
