
import { useState } from "react";
import HcfLcmLesson from "./HcfLcmLesson";

export default function AptitudeLesson({ topic, onBack }) {
  const [completed, setCompleted] = useState(false);
if (topic === "HCF and LCM") {
  return <HcfLcmLesson onBack={onBack} />;
}

  if (topic !== "Number System") {
    return (
      <div className="java-tracker">
        <button
          type="button"
          className="secondary-button"
          onClick={onBack}
        >
          ← Back to Aptitude
        </button>

        <h1>{topic}</h1>
        <p>This lesson is coming soon.</p>
      </div>
    );
  }

  return (
    <div className="java-tracker">
      <button
        type="button"
        className="secondary-button"
        onClick={onBack}
      >
        ← Back to Aptitude
      </button>

      <header className="java-lesson-header">
        <span>Quantitative Aptitude</span>
        <h1>Number System</h1>
        <p>
          Learn different types of numbers, divisibility rules,
          factors, multiples, prime numbers and remainders.
        </p>
      </header>

      <section className="java-lesson-section">
        <h2>1. What is a Number System?</h2>

        <p>
          A number system is a way of classifying and working
          with numbers. In aptitude exams, number system
          questions mainly involve properties of numbers,
          divisibility, factors, multiples and remainders.
        </p>

        <h3>Types of Numbers</h3>

        <ul>
          <li>
            <strong>Natural numbers:</strong> 1, 2, 3, 4, 5...
          </li>
          <li>
            <strong>Whole numbers:</strong> 0, 1, 2, 3, 4...
          </li>
          <li>
            <strong>Integers:</strong> ..., -3, -2, -1, 0, 1, 2, 3...
          </li>
          <li>
            <strong>Even numbers:</strong> Numbers divisible by 2.
            Example: 2, 4, 6, 8.
          </li>
          <li>
            <strong>Odd numbers:</strong> Numbers not divisible by 2.
            Example: 1, 3, 5, 7.
          </li>
          <li>
            <strong>Prime numbers:</strong> Numbers greater than 1
            having exactly two factors: 1 and itself.
          </li>
          <li>
            <strong>Composite numbers:</strong> Numbers greater
            than 1 having more than two factors.
          </li>
        </ul>

        <p>
          <strong>Important:</strong> 1 is neither prime nor
          composite. 2 is the only even prime number.
        </p>
      </section>

      <section className="java-lesson-section">
        <h2>2. Factors and Multiples</h2>

        <h3>Factors</h3>

        <p>
          A factor divides a number exactly, leaving no remainder.
        </p>

        <p>
          Example: Factors of 12 are 1, 2, 3, 4, 6 and 12.
        </p>

        <h3>Multiples</h3>

        <p>
          Multiples are obtained by multiplying a number by
          1, 2, 3, 4 and so on.
        </p>

        <p>
          Example: Multiples of 5 are 5, 10, 15, 20, 25...
        </p>

        <h3>Prime Factorization</h3>

        <p>
          Prime factorization means expressing a number as a
          product of prime numbers.
        </p>

        <p>
          Example:
        </p>

        <p>
          60 = 2 × 2 × 3 × 5
        </p>

        <p>
          This is useful for finding HCF, LCM and the number
          of factors of a number.
        </p>
      </section>

      <section className="java-lesson-section">
        <h2>3. Divisibility Rules</h2>

        <div className="java-lesson-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>Divisibility rule</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>2</td>
                <td>Last digit is 0, 2, 4, 6 or 8.</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Sum of digits is divisible by 3.</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Last two digits form a number divisible by 4.</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Last digit is 0 or 5.</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Number is divisible by both 2 and 3.</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Last three digits form a number divisible by 8.</td>
              </tr>
              <tr>
                <td>9</td>
                <td>Sum of digits is divisible by 9.</td>
              </tr>
              <tr>
                <td>10</td>
                <td>Last digit is 0.</td>
              </tr>
              <tr>
                <td>11</td>
                <td>
                  Difference between the sums of alternate
                  digits is 0 or a multiple of 11.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Solved Example</h3>

        <p>
          Check whether 738 is divisible by 9.
        </p>

        <p>
          Step 1: Add the digits.
        </p>

        <p>7 + 3 + 8 = 18</p>

        <p>
          Step 2: Check whether 18 is divisible by 9.
        </p>

        <p>
          18 ÷ 9 = 2
        </p>

        <p>
          <strong>Answer:</strong> 738 is divisible by 9.
        </p>
      </section>

      <section className="java-lesson-section">
        <h2>4. Important Number Properties</h2>

        <ul>
          <li>
            Even + Even = Even
          </li>
          <li>
            Odd + Odd = Even
          </li>
          <li>
            Even + Odd = Odd
          </li>
          <li>
            Even × Any integer = Even
          </li>
          <li>
            Odd × Odd = Odd
          </li>
        </ul>

        <h3>Consecutive Numbers</h3>

        <p>
          Consecutive numbers follow one after another.
        </p>

        <p>
          Example: 10, 11, 12, 13, 14.
        </p>

        <p>
          The sum of the first n natural numbers is:
        </p>

        <p>
          <strong>n(n + 1) / 2</strong>
        </p>

        <h3>Example</h3>

        <p>
          Find the sum of the first 20 natural numbers.
        </p>

        <p>
          = 20 × 21 / 2
        </p>

        <p>
          = 10 × 21
        </p>

        <p>
          <strong>Answer: 210</strong>
        </p>
      </section>

      <section className="java-lesson-section">
        <h2>5. Remainders</h2>

        <p>
          When a number is divided by another number, the
          leftover value is called the remainder.
        </p>

        <p>
          Dividend = Divisor × Quotient + Remainder
        </p>

        <p>
          Example:
        </p>

        <p>
          17 ÷ 5 = 3 remainder 2
        </p>

        <p>
          17 = 5 × 3 + 2
        </p>

        <h3>Remainder Shortcut</h3>

        <p>
          If a number is divisible by a divisor, its remainder
          is 0.
        </p>

        <p>
          Example: 24 ÷ 6 leaves remainder 0.
        </p>

        <p>
          If a number is one more than a multiple of the divisor,
          its remainder is 1.
        </p>

        <p>
          Example: 31 ÷ 5 leaves remainder 1.
        </p>
      </section>

      <section className="java-lesson-section">
        <h2>6. Placement Shortcuts</h2>

        <ul>
          <li>
            To check divisibility by 3 or 9, add the digits
            instead of performing long division.
          </li>
          <li>
            For divisibility by 4, check only the last two digits.
          </li>
          <li>
            For divisibility by 8, check only the last three digits.
          </li>
          <li>
            For prime numbers, test divisibility only up to
            the square root of the number.
          </li>
          <li>
            Memorize squares from 1² to 30² and cubes from
            1³ to 15³ for faster calculations.
          </li>
        </ul>

        <h3>Prime Number Example</h3>

        <p>
          Is 97 a prime number?
        </p>

        <p>
          √97 is approximately 9.85.
        </p>

        <p>
          Check prime divisors up to 9: 2, 3, 5 and 7.
        </p>

        <p>
          97 is not divisible by any of them.
        </p>

        <p>
          <strong>Answer: 97 is prime.</strong>
        </p>
      </section>

      <section className="java-lesson-section">

<section className="java-lesson-section">
  <h2>6. Advanced Number System</h2>

  <h3>6.1 Number of Factors</h3>

  <p>
    If a number is written in prime factorized form:
  </p>

  <p>
    N = p^a × q^b × r^c
  </p>

  <p>
    Number of factors = (a + 1)(b + 1)(c + 1)
  </p>

  <p>
    <strong>Example:</strong> Find the number of factors of 72.
  </p>

  <p>
    72 = 2³ × 3²
  </p>

  <p>
    Number of factors = (3 + 1)(2 + 1)
  </p>

  <p>
    = 4 × 3 = 12
  </p>

  <p>
    <strong>Answer: 12 factors</strong>
  </p>

  <h3>6.2 Unit Digit and Cyclicity</h3>

  <p>
    The unit digit is the last digit of a number.
    For large powers, the unit digit repeats in a cycle.
  </p>

  <p>
    Example: Find the unit digit of 7⁴⁵.
  </p>

  <p>
    Powers of 7 have this unit digit pattern:
  </p>

  <p>
    7, 9, 3, 1, 7, 9, 3, 1...
  </p>

  <p>
    The cycle length is 4.
  </p>

  <p>
    45 ÷ 4 gives remainder 1.
  </p>

  <p>
    Therefore, use the first digit in the cycle.
  </p>

  <p>
    <strong>Answer: 7</strong>
  </p>

  <h3>6.3 Trailing Zeros in Factorials</h3>

  <p>
    A trailing zero is a zero at the end of a number.
    Each trailing zero comes from a factor of 10.
  </p>

  <p>
    10 = 2 × 5
  </p>

  <p>
    In factorials, factors of 2 are more common than
    factors of 5. So count the number of factors of 5.
  </p>

  <p>
    Formula:
  </p>

  <p>
    Number of trailing zeros in n! =
    ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ...
  </p>

  <p>
    Stop when the divisor becomes greater than n.
  </p>

  <p>
    <strong>Example:</strong> Find trailing zeros in 100!.
  </p>

  <p>
    = ⌊100/5⌋ + ⌊100/25⌋
  </p>

  <p>
    = 20 + 4
  </p>

  <p>
    <strong>Answer: 24 trailing zeros</strong>
  </p>

  <h3>6.4 Remainder Patterns</h3>

  <p>
    When powers are large, calculate remainders using
    repeating patterns instead of expanding the full number.
  </p>

  <p>
    Example: Find the remainder when 2⁵ is divided by 5.
  </p>

  <p>
    2¹ = 2 → remainder 2
  </p>

  <p>
    2² = 4 → remainder 4
  </p>

  <p>
    2³ = 8 → remainder 3
  </p>

  <p>
    2⁴ = 16 → remainder 1
  </p>

  <p>
    The remainder pattern repeats every 4 powers.
  </p>

  <p>
    5 ÷ 4 gives remainder 1.
  </p>

  <p>
    So the required remainder is the first value in
    the pattern.
  </p>

  <p>
    <strong>Answer: 2</strong>
  </p>

  <h3>6.5 Quick Placement Practice</h3>

  <details>
    <summary>
      Find the number of factors of 360.
    </summary>

    <p>
      360 = 2³ × 3² × 5¹
    </p>

    <p>
      Number of factors = (3 + 1)(2 + 1)(1 + 1)
    </p>

    <p>
      <strong>Answer: 24</strong>
    </p>
  </details>

  <details>
    <summary>
      Find the unit digit of 3²⁷.
    </summary>

    <p>
      Unit digit cycle of 3: 3, 9, 7, 1.
    </p>

    <p>
      27 ÷ 4 gives remainder 3.
    </p>

    <p>
      <strong>Answer: 7</strong>
    </p>
  </details>

  <details>
    <summary>
      Find the number of trailing zeros in 50!.
    </summary>

    <p>
      = ⌊50/5⌋ + ⌊50/25⌋
    </p>

    <p>
      = 10 + 2
    </p>

    <p>
      <strong>Answer: 12</strong>
    </p>
  </details>
</section>

        <h2>7. Practice Questions</h2>

        <p>
          Try solving each question before opening its answer.
        </p>

        <details>
          <summary>
            Question 1: Is 1 a prime number?
          </summary>
          <p>
            <strong>Answer:</strong> No.
          </p>
          <p>
            Explanation: A prime number must have exactly
            two distinct factors. 1 has only one factor.
          </p>
        </details>

        <details>
          <summary>
            Question 2: Find the sum of the first 15 natural numbers.
          </summary>
          <p>
            <strong>Hint:</strong> Use n(n + 1) / 2.
          </p>
          <p>
            <strong>Answer:</strong> 15 × 16 / 2 = 120.
          </p>
        </details>

        <details>
          <summary>
            Question 3: Is 456 divisible by 3?
          </summary>
          <p>
            <strong>Answer:</strong> Yes.
          </p>
          <p>
            Explanation: 4 + 5 + 6 = 15, and 15 is divisible by 3.
          </p>
        </details>

        <details>
          <summary>
            Question 4: Find the remainder when 83 is divided by 7.
          </summary>
          <p>
            <strong>Answer:</strong> 6.
          </p>
          <p>
            Explanation: 83 = 7 × 11 + 6.
          </p>
        </details>

        <details>
          <summary>
            Question 5: Find the prime factorization of 84.
          </summary>
          <p>
            <strong>Answer:</strong> 2 × 2 × 3 × 7.
          </p>
          <p>
            Explanation: 84 = 2 × 42 = 2 × 2 × 21 = 2 × 2 × 3 × 7.
          </p>
        </details>

        <details>
          <summary>
            Question 6: Which is the only even prime number?
          </summary>
          <p>
            <strong>Answer:</strong> 2.
          </p>
        </details>

        <details>
          <summary>
            Question 7: Is 121 divisible by 11?
          </summary>
          <p>
            <strong>Answer:</strong> Yes.
          </p>
          <p>
            Explanation: 121 = 11 × 11.
          </p>
        </details>

        <details>
          <summary>
            Question 8: Find the smallest prime factor of 91.
          </summary>
          <p>
            <strong>Answer:</strong> 7.
          </p>
          <p>
            Explanation: 91 = 7 × 13.
          </p>
        </details>
      </section>

      <section className="java-lesson-section">

<section className="java-lesson-section">
  <h2>Advanced Placement Practice</h2>

  <p>
    Try these questions without using a calculator.
    Open the answer only after attempting the problem.
  </p>

  <details>
    <summary>
      Q1. Find the total number of factors of 144.
    </summary>

    <p>
      <strong>Hint:</strong> Use prime factorization.
    </p>

    <p>
      144 = 2⁴ × 3²
    </p>

    <p>
      Number of factors = (4 + 1)(2 + 1)
    </p>

    <p>
      <strong>Answer: 15</strong>
    </p>
  </details>

  <details>
    <summary>
      Q2. Find the unit digit of 9⁹⁹.
    </summary>

    <p>
      Powers of 9 have the unit digit pattern:
      9, 1, 9, 1...
    </p>

    <p>
      Since 99 is odd, the unit digit is 9.
    </p>

    <p>
      <strong>Answer: 9</strong>
    </p>
  </details>

  <details>
    <summary>
      Q3. Find the number of trailing zeros in 125!.
    </summary>

    <p>
      Trailing zeros = ⌊125/5⌋ + ⌊125/25⌋ + ⌊125/125⌋
    </p>

    <p>
      = 25 + 5 + 1
    </p>

    <p>
      <strong>Answer: 31</strong>
    </p>
  </details>

  <details>
    <summary>
      Q4. Find the remainder when 3²⁰ is divided by 7.
    </summary>

    <p>
      Powers of 3 modulo 7 repeat:
      3, 2, 6, 4, 5, 1.
    </p>

    <p>
      The cycle length is 6.
    </p>

    <p>
      20 ÷ 6 gives remainder 2.
    </p>

    <p>
      The second value in the cycle is 2.
    </p>

    <p>
      <strong>Answer: 2</strong>
    </p>
  </details>

  <details>
    <summary>
      Q5. Find the smallest positive integer n such that n! has at least 2 trailing zeros.
    </summary>

    <p>
      We need at least two factors of 5 in n!.
    </p>

    <p>
      For 10!: ⌊10/5⌋ = 2.
    </p>

    <p>
      For 9!: ⌊9/5⌋ = 1.
    </p>

    <p>
      <strong>Answer: 10</strong>
    </p>
  </details>

  <details>
    <summary>
      Q6. Find the number of factors of 540.
    </summary>

    <p>
      540 = 2² × 3³ × 5¹
    </p>

    <p>
      Number of factors = (2 + 1)(3 + 1)(1 + 1)
    </p>

    <p>
      = 3 × 4 × 2
    </p>

    <p>
      <strong>Answer: 24</strong>
    </p>
  </details>

  <details>
    <summary>
      Q7. Find the unit digit of 7²⁰²⁶.
    </summary>

    <p>
      Powers of 7 have a cycle of 4:
      7, 9, 3, 1.
    </p>

    <p>
      2026 ÷ 4 gives remainder 2.
    </p>

    <p>
      The second digit in the cycle is 9.
    </p>

    <p>
      <strong>Answer: 9</strong>
    </p>
  </details>

  <details>
    <summary>
      Q8. Find the remainder when 2¹⁰⁰ is divided by 7.
    </summary>

    <p>
      Powers of 2 modulo 7 repeat:
      2, 4, 1.
    </p>

    <p>
      The cycle length is 3.
    </p>

    <p>
      100 ÷ 3 gives remainder 1.
    </p>

    <p>
      The first value in the cycle is 2.
    </p>

    <p>
      <strong>Answer: 2</strong>
    </p>
  </details>

  <details>
    <summary>
      Q9. Find the smallest number that must be added to 568 to make it divisible by 9.
    </summary>

    <p>
      Sum of digits = 5 + 6 + 8 = 19.
    </p>

    <p>
      19 leaves remainder 1 when divided by 9.
    </p>

    <p>
      We need to add 8 to make the digit sum reach a multiple of 9.
    </p>

    <p>
      568 + 8 = 576.
    </p>

    <p>
      <strong>Answer: 8</strong>
    </p>
  </details>

  <details>
    <summary>
      Q10. How many factors does a perfect square have?
    </summary>

    <p>
      A perfect square does not always have the same number
      of factors. However, its total number of factors is
      always odd.
    </p>

    <p>
      Example: 36 = 2² × 3².
    </p>

    <p>
      Number of factors = (2 + 1)(2 + 1) = 9.
    </p>

    <p>
      <strong>Answer: An odd number of factors.</strong>
    </p>
  </details>
</section>

        <h2>8. Common Mistakes</h2>

        <ul>
          <li>
            Thinking 1 is a prime number.
          </li>
          <li>
            Forgetting that 2 is the only even prime number.
          </li>
          <li>
            Confusing factors with multiples.
          </li>
          <li>
            Checking only the last digit for divisibility by 3.
          </li>
          <li>
            Using long division when a divisibility rule is faster.
          </li>
        </ul>
      </section>

      <section className="java-lesson-section">
        <h2>9. Lesson Completion</h2>

        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(event) => setCompleted(event.target.checked)}
          />
          I have studied Number System and attempted the practice questions.
        </label>

        {completed && (
          <p>
            Great! You have marked this lesson as completed.
          </p>
        )}
      </section>

      <button
        type="button"
        className="secondary-button"
        onClick={onBack}
      >
        ← Back to Aptitude
      </button>
    </div>
  );
}
