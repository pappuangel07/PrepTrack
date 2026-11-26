import { useState } from "react";
import "./JavaLesson.css";

export default function JavaLessonLayout({ title, level = "Beginner to Interview", overview, sections = [], practice = [], questions = [], onBack }) {
  const [done, setDone] = useState({});
  const toggle = (key) => setDone((prev) => ({ ...prev, [key]: !prev[key] }));
  const completed = Object.values(done).filter(Boolean).length;
  const total = practice.length;

  return (
    <div className="java-lesson-page">
      <button type="button" className="java-lesson-back" onClick={onBack || (() => window.history.back())}>
        ← Back to Java Topics
      </button>

      <header className="java-lesson-header">
        <p className="java-lesson-eyebrow">JAVA LEARNING HUB · {level}</p>
        <h1>{title}</h1>
        <p>{overview}</p>
      </header>

      <section className="java-lesson-section">
        <h2>Lesson Notes</h2>
        {sections.map((section, index) => (
          <article className="java-lesson-card" key={`${section.heading}-${index}`}>
            <h3>{section.heading}</h3>
            {section.notes?.length > 0 && (
              <ul>
                {section.notes.map((note, i) => <li key={i}>{note}</li>)}
              </ul>
            )}
            {section.code && (
              <pre className="java-lesson-code"><code>{section.code}</code></pre>
            )}
            {section.example && <p className="java-lesson-example">{section.example}</p>}
          </article>
        ))}
      </section>

      <section className="java-lesson-section">
        <h2>Practice Problems <small>{completed}/{total} completed</small></h2>
        <div className="java-lesson-progress">
          <span style={{ width: total ? `${(completed / total) * 100}%` : "0%" }} />
        </div>
{practice.map((item, index) => {
  const question = typeof item === "string" ? item : item.question;

  return (
    <div
      className={`java-lesson-practice ${done[index] ? "is-done" : ""}`}
      key={index}
    >
      <label>
        <input
          type="checkbox"
          checked={Boolean(done[index])}
          onChange={() => toggle(index)}
        />
        <span>
          <b>Problem {index + 1}.</b> {question}
        </span>
      </label>

      {typeof item === "object" && item.answer && (
        <details className="java-practice-answer">
          <summary>View answer</summary>

          <p>{item.answer}</p>

          {item.explanation && (
            <p>
              <b>Explanation:</b> {item.explanation}
            </p>
          )}

          {item.code && (
            <pre>
              <code>{item.code}</code>
            </pre>
          )}
        </details>
      )}
    </div>
  );
})}
      </section>

      <section className="java-lesson-section">
        <h2>Interview Questions</h2>
        {questions.map((item, index) => (
          <details className="java-lesson-question" key={index}>
            <summary>{index + 1}. {item.question}</summary>
            <p>{item.answer}</p>
            {item.followUp && <p><b>Follow-up:</b> {item.followUp}</p>}
          </details>
        ))}
      </section>
    </div>
  );
}
