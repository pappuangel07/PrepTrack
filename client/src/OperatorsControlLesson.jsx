

export default function OperatorsControlLesson({ onBack }) {
  const sectionStyle = {
    background: "var(--card-bg, #ffffff)",
    border: "1px solid var(--border-color, #e5e7eb)",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "18px",
    lineHeight: 1.7,
  };

  const codeStyle = {
    background: "var(--code-bg, #f3f4f6)",
    padding: "14px",
    borderRadius: "8px",
    overflowX: "auto",
    fontSize: "14px",
    whiteSpace: "pre",
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>
        ← Back to Java Topics
      </button>

      <h1>Operators</h1>
      <p>Beginner to Advanced | Core Java | Interview Preparation</p>

      <section style={sectionStyle}>
        <h2>1. What Is an Operator?</h2>
        <p>
          An operator is a symbol or construct that performs an
          operation on one or more operands.
        </p>

        <pre style={codeStyle}>
{`int result = 10 + 5;`}
        </pre>

        <ul>
          <li><code>10</code> and <code>5</code> are operands.</li>
          <li><code>+</code> is the operator.</li>
          <li><code>15</code> is the result.</li>
        </ul>

        <h3>Types of operators</h3>
        <ul>
          <li>Arithmetic</li>
          <li>Unary</li>
          <li>Relational</li>
          <li>Logical</li>
          <li>Bitwise</li>
          <li>Shift</li>
          <li>Assignment</li>
          <li>Conditional (ternary)</li>
          <li> instanceof</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2>2. Arithmetic Operators</h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px" }}>Operator</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Meaning</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "8px" }}>+</td><td style={{ padding: "8px" }}>Addition</td><td style={{ padding: "8px" }}>10 + 3 = 13</td></tr>
            <tr><td style={{ padding: "8px" }}>-</td><td style={{ padding: "8px" }}>Subtraction</td><td style={{ padding: "8px" }}>10 - 3 = 7</td></tr>
            <tr><td style={{ padding: "8px" }}>*</td><td style={{ padding: "8px" }}>Multiplication</td><td style={{ padding: "8px" }}>10 * 3 = 30</td></tr>
            <tr><td style={{ padding: "8px" }}>/</td><td style={{ padding: "8px" }}>Division</td><td style={{ padding: "8px" }}>10 / 3 = 3</td></tr>
            <tr><td style={{ padding: "8px" }}>%</td><td style={{ padding: "8px" }}>Remainder</td><td style={{ padding: "8px" }}>10 % 3 = 1</td></tr>
          </tbody>
        </table>

        <h3>Integer division</h3>
        <pre style={codeStyle}>
{`System.out.println(7 / 2);`}
        </pre>
        <p>Output: <code>3</code></p>
        <p>
          When both operands are integers, the fractional part is
          discarded. The result is not rounded.
        </p>

        <h3>Remainder operator</h3>
        <pre style={codeStyle}>
{`System.out.println(17 % 5);`}
        </pre>
        <p>Output: <code>2</code></p>
        <p>
          Because 17 = 5 × 3 + 2.
        </p>

        <h3>Negative remainder</h3>
        <pre style={codeStyle}>
{`System.out.println(-17 % 5);
System.out.println(17 % -5);`}
        </pre>
        <p>Output:</p>
        <pre style={codeStyle}>
{`-2
2`}
        </pre>
        <p>
          Java's remainder has the sign of the dividend, the
          left-hand operand. It is not the same as mathematical
          modulo for negative values.
        </p>

        <h3>Division by zero</h3>
        <pre style={codeStyle}>
{`int result = 10 / 0;`}
        </pre>
        <p>
          This causes <code>ArithmeticException</code> at runtime
          for integer division.
        </p>
        <p>
          Floating-point division behaves differently:
        </p>
        <pre style={codeStyle}>
{`System.out.println(10.0 / 0.0);`}
        </pre>
        <p>Output: <code>Infinity</code></p>
      </section>

      <section style={sectionStyle}>
        <h2>3. Unary Operators</h2>

        <p>
          Unary operators operate on one operand.
        </p>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr><td style={{ padding: "8px" }}>+</td><td style={{ padding: "8px" }}>Unary plus</td></tr>
            <tr><td style={{ padding: "8px" }}>-</td><td style={{ padding: "8px" }}>Unary minus</td></tr>
            <tr><td style={{ padding: "8px" }}>++</td><td style={{ padding: "8px" }}>Increment</td></tr>
            <tr><td style={{ padding: "8px" }}>--</td><td style={{ padding: "8px" }}>Decrement</td></tr>
            <tr><td style={{ padding: "8px" }}>!</td><td style={{ padding: "8px" }}>Logical NOT</td></tr>
            <tr><td style={{ padding: "8px" }}>~</td><td style={{ padding: "8px" }}>Bitwise complement</td></tr>
          </tbody>
        </table>

        <h3>Increment and decrement</h3>
        <pre style={codeStyle}>
{`int x = 5;
x++;
System.out.println(x);`}
        </pre>
        <p>Output: <code>6</code></p>

        <h3>Prefix increment</h3>
        <pre style={codeStyle}>
{`int x = 5;
int result = ++x;

System.out.println(x);
System.out.println(result);`}
        </pre>
        <p>Output:</p>
        <pre style={codeStyle}>
{`6
6`}
        </pre>
        <p>
          Prefix increment changes the variable first, then
          produces the updated value.
        </p>

        <h3>Postfix increment</h3>
        <pre style={codeStyle}>
{`int x = 5;
int result = x++;

System.out.println(x);
System.out.println(result);`}
        </pre>
        <p>Output:</p>
        <pre style={codeStyle}>
{`6
5`}
        </pre>
        <p>
          Postfix increment produces the old value for the
          expression, then increments the variable.
        </p>

        <h3>Interview warning</h3>
        <p>
          Avoid expressions such as <code>x = x++ + ++x;</code>
          in real code. They are confusing and easy to misread.
          Understand evaluation order, but write clear statements.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>4. Relational Operators</h2>

        <p>
          Relational operators compare values and produce a boolean.
        </p>

        <pre style={codeStyle}>
{`int a = 10;
int b = 20;

System.out.println(a < b);
System.out.println(a == b);
System.out.println(a != b);`}
        </pre>
        <p>Output:</p>
        <pre style={codeStyle}>
{`true
false
true`}
        </pre>

        <h3>Operators</h3>
        <ul>
          <li><code>==</code> equal to</li>
          <li><code>!=</code> not equal to</li>
          <li><code>&gt;</code> greater than</li>
          <li><code>&lt;</code> less than</li>
          <li><code>&gt;=</code> greater than or equal to</li>
          <li><code>&lt;=</code> less than or equal to</li>
        </ul>

        <h3>Important: String comparison</h3>
        <pre style={codeStyle}>
{`String a = new String("Java");
String b = new String("Java");

System.out.println(a == b);
System.out.println(a.equals(b));`}
        </pre>
        <p>Output:</p>
        <pre style={codeStyle}>
{`false
true`}
        </pre>
        <p>
          For objects, <code>==</code> compares references.
          String's <code>equals()</code> compares content.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>5. Logical Operators</h2>

        <p>
          Logical operators combine or invert boolean expressions.
        </p>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr><td style={{ padding: "8px" }}>&&</td><td style={{ padding: "8px" }}>Logical AND</td></tr>
            <tr><td style={{ padding: "8px" }}>||</td><td style={{ padding: "8px" }}>Logical OR</td></tr>
            <tr><td style={{ padding: "8px" }}>!</td><td style={{ padding: "8px" }}>Logical NOT</td></tr>
          </tbody>
        </table>

        <h3>Truth table</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px" }}>A</th>
              <th style={{ textAlign: "left", padding: "8px" }}>B</th>
              <th style={{ textAlign: "left", padding: "8px" }}>A && B</th>
              <th style={{ textAlign: "left", padding: "8px" }}>A || B</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "8px" }}>true</td><td style={{ padding: "8px" }}>true</td><td style={{ padding: "8px" }}>true</td><td style={{ padding: "8px" }}>true</td></tr>
            <tr><td style={{ padding: "8px" }}>true</td><td style={{ padding: "8px" }}>false</td><td style={{ padding: "8px" }}>false</td><td style={{ padding: "8px" }}>true</td></tr>
            <tr><td style={{ padding: "8px" }}>false</td><td style={{ padding: "8px" }}>true</td><td style={{ padding: "8px" }}>false</td><td style={{ padding: "8px" }}>true</td></tr>
            <tr><td style={{ padding: "8px" }}>false</td><td style={{ padding: "8px" }}>false</td><td style={{ padding: "8px" }}>false</td><td style={{ padding: "8px" }}>false</td></tr>
          </tbody>
        </table>

        <h3>Short-circuit AND</h3>
        <pre style={codeStyle}>
{`int x = 0;

if (x != 0 && 10 / x > 1) {
    System.out.println("True");
}`}
        </pre>
        <p>
          If the left side of <code>&amp;&amp;</code> is false,
          Java does not evaluate the right side. This prevents
          division by zero in this example.
        </p>

        <h3>Short-circuit OR</h3>
        <pre style={codeStyle}>
{`int age = 17;

if (age < 18 || age > 60) {
    System.out.println("Special category");
}`}
        </pre>
        <p>
          If the left side of <code>||</code> is true, the
          right side is not evaluated.
        </p>

        <h3>&amp; and | with booleans</h3>
        <p>
          <code>&amp;</code> and <code>|</code> can also operate
          on booleans, but they evaluate both operands. Use
          <code>&amp;&amp;</code> and <code>||</code> for normal
          short-circuit logical conditions.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>6. Assignment Operators</h2>

        <pre style={codeStyle}>
{`int x = 10;

x += 5;  // x = x + 5
x -= 2;  // x = x - 2
x *= 3;  // x = x * 3
x /= 2;  // x = x / 2
x %= 4;  // x = x % 4`}
        </pre>

        <p>
          Compound assignment performs the operation and assigns
          the result back to the left-hand variable.
        </p>

        <h3>Subtle difference</h3>
        <pre style={codeStyle}>
{`byte b = 10;

b += 5;       // Allowed
// b = b + 5;  // Not allowed without cast`}
        </pre>
        <p>
          Compound assignment includes an implicit conversion
          to the left-hand type. Ordinary addition produces int
          after numeric promotion, so assigning it to byte
          requires a cast.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>7. Ternary Operator</h2>

        <p>
          The ternary operator is a compact conditional expression.
        </p>

        <pre style={codeStyle}>
{`int age = 20;

String result = age >= 18 ? "Adult" : "Minor";

System.out.println(result);`}
        </pre>
        <p>Output: <code>Adult</code></p>

        <p>Syntax:</p>
        <pre style={codeStyle}>
{`condition ? valueIfTrue : valueIfFalse`}
        </pre>

        <h3>Nested ternary</h3>
        <pre style={codeStyle}>
{`int marks = 85;

String grade = marks >= 90 ? "A"
             : marks >= 75 ? "B"
             : marks >= 50 ? "C"
             : "Fail";`}
        </pre>
        <p>
          Nested ternaries can become difficult to read.
          For complex logic, prefer if-else statements.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>8. Bitwise Operators</h2>

        <p>
          Bitwise operators work on individual bits of integral
          values such as int and long.
        </p>

        <ul>
          <li><code>&amp;</code> — bitwise AND</li>
          <li><code>|</code> — bitwise OR</li>
          <li><code>^</code> — bitwise XOR</li>
          <li><code>~</code> — bitwise complement</li>
        </ul>

        <h3>Example</h3>
        <pre style={codeStyle}>
{`int a = 5;  // 0101
int b = 3;  // 0011

System.out.println(a & b);
System.out.println(a | b);
System.out.println(a ^ b);`}
        </pre>
        <p>Output:</p>
        <pre style={codeStyle}>
{`1
7
6`}
        </pre>

        <h3>Bitwise AND</h3>
        <p>
          A bit becomes 1 only when both corresponding bits
          are 1.
        </p>

        <pre style={codeStyle}>
{`  0101
& 0011
------
  0001`}
        </pre>

        <h3>Bitwise OR</h3>
        <p>
          A bit becomes 1 when at least one corresponding bit
          is 1.
        </p>

        <pre style={codeStyle}>
{`  0101
| 0011
------
  0111`}
        </pre>

        <h3>Bitwise XOR</h3>
        <p>
          A bit becomes 1 when the corresponding bits are different.
        </p>

        <pre style={codeStyle}>
{`  0101
^ 0011
------
  0110`}
        </pre>

        <h3>Bitwise complement</h3>
        <pre style={codeStyle}>
{`System.out.println(~5);`}
        </pre>
        <p>Output: <code>-6</code></p>
        <p>
          For signed int values, complement flips all 32 bits.
          The identity <code>~x == -x - 1</code> holds for int
          and long values.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>9. Shift Operators</h2>

        <ul>
          <li><code>&lt;&lt;</code> — left shift</li>
          <li><code>&gt;&gt;</code> — signed right shift</li>
          <li><code>&gt;&gt;&gt;</code> — unsigned right shift</li>
        </ul>

        <h3>Left shift</h3>
        <pre style={codeStyle}>
{`System.out.println(5 << 1);
System.out.println(5 << 2);`}
        </pre>
        <p>Output:</p>
        <pre style={codeStyle}>
{`10
20`}
        </pre>
        <p>
          Left shift moves bits to the left and fills the
          right-hand positions with zeros. For values where
          no significant bits are lost, shifting left by n
          is equivalent to multiplying by 2^n.
        </p>

        <h3>Signed right shift</h3>
        <pre style={codeStyle}>
{`System.out.println(16 >> 2);
System.out.println(-16 >> 2);`}
        </pre>
        <p>Output:</p>
        <pre style={codeStyle}>
{`4
-4`}
        </pre>
        <p>
          Signed right shift preserves the sign by filling
          the left-hand positions with the sign bit.
        </p>

        <h3>Unsigned right shift</h3>
        <pre style={codeStyle}>
{`System.out.println(-16 >>> 2);`}
        </pre>
        <p>
          The result is a large positive int because zeros
          are shifted into the left-hand positions.
        </p>

        <h3>Shift distance</h3>
        <p>
          For int, only the low 5 bits of the shift distance
          are used. For long, only the low 6 bits are used.
          Therefore int shift distances are effectively
          modulo 32, and long shift distances modulo 64.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>10. instanceof Operator</h2>

        <p>
          <code>instanceof</code> checks whether an object
          reference is compatible with a given type.
        </p>

        <pre style={codeStyle}>
{`String name = "Java";

System.out.println(name instanceof String);`}
        </pre>
        <p>Output: <code>true</code></p>

        <p>
          If the reference is null, instanceof returns false.
        </p>

        <pre style={codeStyle}>
{`String name = null;

System.out.println(name instanceof String);`}
        </pre>
        <p>Output: <code>false</code></p>
      </section>

      <section style={sectionStyle}>
        <h2>11. Operator Precedence</h2>

        <p>
          Operator precedence determines how operators are grouped
          in an expression. Parentheses can make the intended
          grouping explicit.
        </p>

        <pre style={codeStyle}>
{`int result = 10 + 5 * 2;

System.out.println(result);`}
        </pre>
        <p>Output: <code>20</code></p>
        <p>
          Multiplication has higher precedence than addition.
        </p>

        <h3>Useful precedence order</h3>
        <ol>
          <li>Postfix: x++, x--</li>
          <li>Unary: ++x, --x, !, ~</li>
          <li>Multiplicative: *, /, %</li>
          <li>Additive: +, -</li>
          <li>Shift: &lt;&lt;, &gt;&gt;, &gt;&gt;&gt;</li>
          <li>Relational: &lt;, &gt;, &lt;=, &gt;=, instanceof</li>
          <li>Equality: ==, !=</li>
          <li>Bitwise AND, XOR, OR</li>
          <li>Logical AND, OR</li>
          <li>Ternary: ? :</li>
          <li>Assignment: =, +=, -=, etc.</li>
        </ol>

        <p>
          Don't rely on memorizing every precedence rule.
          Use parentheses when an expression is not immediately
          obvious.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>12. Common Mistakes</h2>

        <ul>
          <li>Using = instead of == for comparison.</li>
          <li>Expecting integer division to produce decimals.</li>
          <li>Confusing remainder with mathematical modulo.</li>
          <li>Using ++ or -- inside complicated expressions.</li>
          <li>Using &amp; instead of &amp;&amp; for short-circuit logic.</li>
          <li>Comparing String content with ==.</li>
          <li>Ignoring operator precedence.</li>
          <li>Assuming left shift always safely multiplies by powers of two.</li>
          <li>Assuming &gt;&gt; and &gt;&gt;&gt; behave the same for negative values.</li>        </ul>
      </section>

      <section style={sectionStyle}>
        <h2>13. Interview Questions</h2>

        <details>
          <summary>1. What is the difference between == and equals()?</summary>
          <p>
            For objects, == compares references. equals() can
            compare logical content if the class overrides it.
          </p>
        </details>

        <details>
          <summary>2. What is the difference between && and &?</summary>
          <p>
            && short-circuits for boolean expressions. & evaluates
            both boolean operands and also supports bitwise AND.
          </p>
        </details>

        <details>
          <summary>3. What is the difference between prefix and postfix increment?</summary>
          <p>
            Prefix increments first and yields the updated value.
            Postfix yields the old value and then increments.
          </p>
        </details>

        <details>
          <summary>4. What does 10 / 3 return in Java?</summary>
          <p>
            It returns 3 because both operands are integers.
          </p>
        </details>

        <details>
          <summary>5. What is the output of 10 % 3?</summary>
          <p>
            1, because 10 = 3 × 3 + 1.
          </p>
        </details>

        <details>
          <summary>6. What is the difference between &gt;&gt; and &gt;&gt;&gt;?</summary>
          <p>
            &gt;&gt; preserves the sign bit. &gt;&gt;&gt; shifts zeros into
            the left-hand positions.
          </p>
        </details>

        <details>
          <summary>7. What is short-circuit evaluation?</summary>
          <p>
            The second operand is skipped when the first operand
            already determines the result of && or ||.
          </p>
        </details>

        <details>
          <summary>8. What is the ternary operator?</summary>
          <p>
            A conditional expression with the form condition
            ? expression1 : expression2.
          </p>
        </details>

        <details>
          <summary>9. What is the result of ~5?</summary>
          <p>
            -6 for int, using the identity ~x = -x - 1.
          </p>
        </details>

        <details>
          <summary>10. What is operator precedence?</summary>
          <p>
            It determines how operators are grouped in an expression.
            Parentheses can explicitly control grouping.
          </p>
        </details>
      </section>

      <section style={sectionStyle}>
        <h2>14. Practice Problems</h2>

        <ol>
          <li>Find the output of 17 / 4 and 17 % 4.</li>
          <li>Explain prefix and postfix increment with a dry run.</li>
          <li>Check whether a number is even using the remainder operator.</li>
          <li>Find the largest of two numbers using ternary.</li>
          <li>Check whether a number is between 10 and 50 using logical operators.</li>
          <li>Swap two integers using XOR and explain the limitations.</li>
          <li>Check whether the kth bit of a number is set.</li>
          <li>Set, clear, and toggle a bit using bitwise operators.</li>
          <li>Explain the output of -8 &gt;&gt; 1 and -8 &gt;&gt;&gt; 1.</li>
          <li>Evaluate a complex expression using precedence and parentheses.</li>
        </ol>
      </section>

      <section style={sectionStyle}>
        <h2>15. Quick Revision</h2>

        <ul>
          <li>Arithmetic: +, -, *, /, %</li>
          <li>Unary: ++, --, !, ~</li>
          <li>Relational operators produce boolean results.</li>
          <li>&amp;&amp; and || use short-circuit evaluation.</li>
          <li>Assignment operators combine operation and assignment.</li>
          <li>Ternary operator is a conditional expression.</li>
          <li>Bitwise operators manipulate individual bits.</li>
          <li>&lt;&lt; left shifts; &gt;&gt; signed right shifts; &gt;&gt;&gt; unsigned right shifts.</li>
          <li>instanceof checks type compatibility.</li>
          <li>Use parentheses to make complex expressions clear.</li>
        </ul>
      </section>
    </div>
  );
}
