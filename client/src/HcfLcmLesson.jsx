import { useState } from "react";

const questions = [
  ["Find HCF of 24 and 36.", "Prime-factorize both.", "12", "24 = 2³ × 3; 36 = 2² × 3². HCF = 2² × 3 = 12."],
  ["Find LCM of 12 and 18.", "Take the highest power of each prime.", "36", "12 = 2² × 3; 18 = 2 × 3². LCM = 2² × 3² = 36."],
  ["Find HCF and LCM of 15 and 20.", "Use prime factors.", "HCF = 5; LCM = 60", "15 = 3 × 5; 20 = 2² × 5."],
  ["Two bells ring every 8 and 12 minutes. When together again?", "Use LCM.", "24 minutes", "LCM(8,12) = 24."],
  ["Find the greatest divisor leaving the same remainder for 43 and 91.", "Find the difference.", "48", "91 − 43 = 48. The greatest possible divisor is 48; both leave remainder 43."],
  ["Find the greatest rod length that measures 360 cm and 480 cm exactly.", "Use HCF of lengths.", "120 cm", "HCF(360,480) = 120 cm."],
  ["Find the smallest number divisible by 6, 8 and 15.", "Use LCM.", "120", "LCM = 2³ × 3 × 5 = 120."],
  ["HCF = 6, LCM = 180 and one number = 30. Find the other.", "Product of two numbers = HCF × LCM.", "36", "Other = (6 × 180) ÷ 30 = 36."],
  ["Find HCF of 72, 120 and 168.", "Use common prime powers.", "24", "All contain 2³ × 3, so HCF = 24."],
  ["Find LCM of 9, 12 and 15.", "Use maximum prime powers.", "180", "LCM = 2² × 3² × 5 = 180."]
];

function Section({ title, children }) {
  return <section className="java-lesson-section"><h2>{title}</h2>{children}</section>;
}

export default function HcfLcmLesson({ onBack }) {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="java-tracker">
      <header className="java-lesson-header">
        <button className="secondary-button" onClick={onBack}>← Back to Aptitude</button>
        <span>Quantitative Aptitude</span>
        <h1>HCF and LCM</h1>
        <p>Learn concepts, methods, shortcuts and placement-style applications.</p>
      </header>

      <Section title="1. Factors and multiples">
        <p><strong>Factor:</strong> A number that divides another number exactly.</p>
        <p><strong>Multiple:</strong> A number obtained by multiplying a number by an integer.</p>
        <p>Example: Factors of 12 are 1, 2, 3, 4, 6, 12. Multiples are 12, 24, 36, ...</p>
      </Section>

      <Section title="2. HCF (Highest Common Factor)">
        <p>HCF, also called GCD, is the greatest positive integer that divides all the given numbers exactly.</p>
        <p>Example: Common factors of 18 and 30 are 1, 2, 3, 6. So HCF = 6.</p>
        <p><strong>Use HCF</strong> for the greatest equal piece/size, exact measurement, or greatest divisor.</p>
      </Section>

      <Section title="3. LCM (Least Common Multiple)">
        <p>LCM is the smallest positive integer that is a multiple of every given number.</p>
        <p>Example: Multiples of 4 and 6 first meet at 12. So LCM(4,6) = 12.</p>
        <p><strong>Use LCM</strong> for repeating events meeting again or the smallest number divisible by all given numbers.</p>
      </Section>

      <Section title="4. Prime factorization method">
        <p>Write each number as prime powers.</p>
        <ul>
          <li><strong>HCF:</strong> common primes with the smallest exponents.</li>
          <li><strong>LCM:</strong> all primes present with the largest exponents.</li>
        </ul>
        <p>Example: 24 = 2³ × 3; 36 = 2² × 3².</p>
        <p>HCF = 2² × 3 = 12. LCM = 2³ × 3² = 72.</p>
      </Section>

      <Section title="5. Division method (Euclidean algorithm)">
        <p>For a &gt; b: HCF(a,b) = HCF(b, a remainder b). Repeat until remainder is 0; the last non-zero divisor is the HCF.</p>
        <p>Example: 252 = 105 × 2 + 42; 105 = 42 × 2 + 21; 42 = 21 × 2 + 0.</p>
        <p>Therefore HCF(252,105) = 21.</p>
      </Section>

      <Section title="6. Relationship between HCF and LCM">
        <p>For <strong>two positive integers</strong> a and b:</p>
        <p><strong>a × b = HCF(a,b) × LCM(a,b)</strong></p>
        <p>Other number = (HCF × LCM) ÷ known number.</p>
        <p>Example: HCF 4, LCM 96, one number 32. Other = 4 × 96 ÷ 32 = 12.</p>
        <p>Do not apply this product identity directly to three or more numbers.</p>
      </Section>

      <Section title="7. Remainder pattern">
        <p>If a divisor leaves the same remainder for two or more numbers, it divides their differences.</p>
        <p>Example: same remainder for 43 and 91 means divisor divides 91 − 43 = 48. Greatest possible divisor = 48.</p>
        <p>If N leaves remainder r, then N − r is divisible by the divisor. If remainder is divisor − 1, then N + 1 is divisible by it.</p>
      </Section>

      <Section title="8. Quick decision table">
        <div className="java-lesson-table-wrapper">
          <table>
            <thead><tr><th>Question clue</th><th>Use</th></tr></thead>
            <tbody>
              <tr><td>Greatest equal size / exact measurement</td><td>HCF</td></tr>
              <tr><td>Smallest number divisible by all</td><td>LCM</td></tr>
              <tr><td>Repeating events coincide</td><td>LCM</td></tr>
              <tr><td>Same remainder</td><td>HCF of differences</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="9. Common mistakes">
        <ul>
          <li>Taking highest exponents for HCF instead of lowest common exponents.</li>
          <li>Forgetting primes that appear in only one number when finding LCM.</li>
          <li>Using HCF for repeating-event questions; those usually need LCM.</li>
          <li>Finding HCF of original numbers instead of differences in same-remainder problems.</li>
          <li>Mixing units in length questions; convert to one unit first.</li>
        </ul>
      </Section>

      <Section title="10. Practice">
        <p>Try first. Open the hint and answer only when needed.</p>
        {questions.map(([question, hint, answer, explanation], i) => (
          <details key={i}>
            <summary>Q{i + 1}. {question}</summary>
            <p><strong>Hint:</strong> {hint}</p>
            <details>
              <summary>View answer and explanation</summary>
              <p><strong>Answer:</strong> {answer}</p>
              <p>{explanation}</p>
            </details>
          </details>
        ))}
      </Section>

      <Section title="11. Lesson completion">
        <label>
          <input type="checkbox" checked={completed} onChange={(event) => setCompleted(event.target.checked)} />
          I studied HCF and LCM and attempted the practice questions.
        </label>
        {completed && <p>Marked complete for this session.</p>}
        <p><strong>Note:</strong> Completion is not saved to the database yet.</p>
      </Section>
    </div>
  );
}