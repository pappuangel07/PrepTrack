
const sectionStyle = {
  background: "var(--card, #ffffff)",
  border: "1px solid var(--border, #e5e7eb)",
  borderRadius: "12px",
  padding: "18px",
  marginBottom: "18px",
};

const headingStyle = {
  fontSize: "21px",
  fontWeight: "700",
  marginBottom: "12px",
};

const codeStyle = {
  background: "var(--code-bg, #f3f4f6)",
  color: "var(--text, #111827)",
  padding: "14px",
  borderRadius: "8px",
  overflowX: "auto",
  whiteSpace: "pre",
  fontSize: "13px",
  lineHeight: "1.6",
};

const lessons = [
  {
    title: "1. What are conditional statements?",
    content: (
      <>
        <p>
          A conditional statement allows a program to make a decision.
          It executes different code depending on whether a condition is
          true or false.
        </p>
        <p>Example: If marks are at least 50, the student passes.</p>
        <ul>
          <li>Condition: marks are at least 50.</li>
          <li>True: display Pass.</li>
          <li>False: display Fail.</li>
        </ul>
      </>
    ),
    code: `int marks = 75;

if (marks >= 50) {
    System.out.println("Pass");
}`,
  },
  {
    title: "2. The if statement",
    content: (
      <>
        <p>
          The <code>if</code> statement executes its block only when the
          condition is true.
        </p>
        <p>
          The condition must evaluate to a boolean value: <code>true</code>{" "}
          or <code>false</code>.
        </p>
      </>
    ),
    code: `int age = 19;

if (age >= 18) {
    System.out.println("Eligible");
}

System.out.println("Program continues");`,
  },
  {
    title: "3. Dry run of if",
    content: (
      <>
        <p>Dry run means tracing the program manually.</p>
        <p>Here, age is 19.</p>
        <ol>
          <li>Check whether age is at least 18.</li>
          <li>19 is at least 18, so the condition is true.</li>
          <li>Execute the statement inside the if block.</li>
        </ol>
      </>
    ),
    code: `int age = 19;

if (age >= 18) {
    System.out.println("Eligible");
}

Output:
Eligible`,
  },
  {
    title: "4. The if-else statement",
    content: (
      <>
        <p>
          Use <code>if-else</code> when there are two possible paths.
        </p>
        <p>
          If the condition is true, the if block executes. Otherwise, the
          else block executes.
        </p>
      </>
    ),
    code: `int marks = 35;

if (marks >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Fail");
}

Output:
Fail`,
  },
  {
    title: "5. The else-if ladder",
    content: (
      <>
        <p>
          An else-if ladder checks multiple conditions in order.
        </p>
        <p>
          Java checks from top to bottom. Once a condition is true, its block
          executes and the remaining conditions are skipped.
        </p>
        <p>
          Put more specific conditions before broader conditions when their
          order matters.
        </p>
      </>
    ),
    code: `int marks = 82;

if (marks >= 90) {
    System.out.println("Grade A");
} else if (marks >= 75) {
    System.out.println("Grade B");
} else if (marks >= 50) {
    System.out.println("Grade C");
} else {
    System.out.println("Fail");
}

Output:
Grade B`,
  },
  {
    title: "6. Understanding condition order",
    content: (
      <>
        <p>
          Suppose you check <code>marks &gt;= 50</code> before
          <code> marks &gt;= 90</code>.
        </p>
        <p>
          A mark of 95 satisfies both conditions. The first matching block
          executes, so the program may assign the wrong grade.
        </p>
        <p>
          The correct approach is to check the highest grade first.
        </p>
      </>
    ),
    code: `// Incorrect order
if (marks >= 50) {
    System.out.println("Grade C");
} else if (marks >= 90) {
    System.out.println("Grade A");
}

// For marks = 95, Grade C is printed.
// The second condition is never checked.`,
  },
  {
    title: "7. Nested if statements",
    content: (
      <>
        <p>
          A nested if is an <code>if</code> statement inside another
          <code> if</code> statement.
        </p>
        <p>
          Use it when the second decision should be checked only after the
          first condition is satisfied.
        </p>
      </>
    ),
    code: `int age = 20;
boolean hasId = true;

if (age >= 18) {
    if (hasId) {
        System.out.println("Entry allowed");
    } else {
        System.out.println("ID required");
    }
} else {
    System.out.println("Not eligible");
}`,
  },
  {
    title: "8. Logical operators in conditions",
    content: (
      <>
        <p>
          Logical operators combine or reverse boolean conditions.
        </p>
        <ul>
          <li><code>&amp;&amp;</code> — AND: both conditions must be true.</li>
          <li><code>||</code> — OR: at least one condition must be true.</li>
          <li><code>!</code> — NOT: reverses a boolean value.</li>
        </ul>
        <p>
          These operators are useful when a decision depends on multiple
          requirements.
        </p>
      </>
    ),
    code: `int age = 20;
boolean hasId = true;

if (age >= 18 && hasId) {
    System.out.println("Entry allowed");
}

if (age < 18 || !hasId) {
    System.out.println("Entry denied");
}`,
  },
  {
    title: "9. Short-circuit evaluation",
    content: (
      <>
        <p>
          Java's <code>&amp;&amp;</code> and <code>||</code> operators use
          short-circuit evaluation.
        </p>
        <ul>
          <li>
            With AND, if the left side is false, Java does not evaluate
            the right side.
          </li>
          <li>
            With OR, if the left side is true, Java does not evaluate
            the right side.
          </li>
        </ul>
        <p>
          This can prevent errors when the second condition depends on the
          first condition being true.
        </p>
      </>
    ),
    code: `String name = null;

if (name != null && name.length() > 0) {
    System.out.println(name);
}

// Safe: name.length() is checked only if
// name != null is true.`,
  },
  {
    title: "10. The switch statement",
    content: (
      <>
        <p>
          <code>switch</code> is useful when one expression is compared
          against several fixed choices.
        </p>
        <p>
          It is often clearer than a long else-if ladder when checking
          values such as menu options, days, or command choices.
        </p>
        <p>
          Traditional switch uses <code>case</code>, <code>break</code>,
          and optionally <code>default</code>.
        </p>
      </>
    ),
    code: `int day = 2;

switch (day) {
    case 1:
        System.out.println("Monday");
        break;

    case 2:
        System.out.println("Tuesday");
        break;

    case 3:
        System.out.println("Wednesday");
        break;

    default:
        System.out.println("Invalid day");
}`,
  },
  {
    title: "11. Why break is used in switch",
    content: (
      <>
        <p>
          In a traditional switch, <code>break</code> exits the switch
          statement.
        </p>
        <p>
          Without break, execution can continue into the following case
          statements. This behavior is called fall-through.
        </p>
      </>
    ),
    code: `int number = 1;

switch (number) {
    case 1:
        System.out.println("One");

    case 2:
        System.out.println("Two");
        break;

    default:
        System.out.println("Other");
}

Output:
One
Two`,
  },
  {
    title: "12. Grouping multiple cases",
    content: (
      <>
        <p>
          Multiple case labels can share the same block when they produce
          the same result.
        </p>
        <p>
          This avoids repeating identical statements.
        </p>
      </>
    ),
    code: `int day = 6;

switch (day) {
    case 1:
    case 7:
        System.out.println("Weekend");
        break;

    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
        System.out.println("Weekday");
        break;

    default:
        System.out.println("Invalid day");
}`,
  },
  {
    title: "13. The default case",
    content: (
      <>
        <p>
          The <code>default</code> block executes when no case matches.
        </p>
        <p>
          It is optional, but useful when you want to handle unexpected
          or invalid choices.
        </p>
      </>
    ),
    code: `int choice = 9;

switch (choice) {
    case 1:
        System.out.println("Start");
        break;

    case 2:
        System.out.println("Exit");
        break;

    default:
        System.out.println("Invalid choice");
}`,
  },
  {
    title: "14. Switch expression (modern Java)",
    content: (
      <>
        <p>
          Modern Java supports switch expressions, which can return a value.
        </p>
        <p>
          The arrow form does not fall through into the next case.
          It is often easier to read when assigning a result.
        </p>
        <p>
          This syntax is supported in modern Java versions, including Java 14
          and later.
        </p>
      </>
    ),
    code: `int day = 2;

String result = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    default -> "Other day";
};

System.out.println(result);`,
  },
  {
    title: "15. The ternary operator",
    content: (
      <>
        <p>
          The ternary operator is a compact way to choose between two values.
        </p>
        <p>Syntax:</p>
        <p>
          <code>condition ? valueIfTrue : valueIfFalse</code>
        </p>
        <p>
          Use it for simple decisions. If the logic becomes complicated,
          use if-else for readability.
        </p>
      </>
    ),
    code: `int age = 20;

String result = age >= 18
    ? "Adult"
    : "Minor";

System.out.println(result);`,
  },
  {
    title: "16. Nested ternary operator",
    content: (
      <>
        <p>
          A ternary operator can be placed inside another ternary operator.
        </p>
        <p>
          However, deeply nested ternaries become difficult to read and debug.
          For multiple conditions, an else-if ladder is usually clearer.
        </p>
      </>
    ),
    code: `int marks = 82;

String grade = marks >= 90
    ? "A"
    : marks >= 75
        ? "B"
        : marks >= 50
            ? "C"
            : "Fail";

System.out.println(grade);`,
  },
  {
    title: "17. Comparing values correctly",
    content: (
      <>
        <p>
          Use comparison operators for primitive values:
          <code> ==</code>, <code>!=</code>, <code> &gt;</code>,
          <code> &lt;</code>, <code> &gt;=</code>, and <code>&lt;=</code>.
        </p>
        <p>
          For Strings, <code>==</code> checks whether references point to
          the same object, not whether the text is equal.
        </p>
        <p>
          Use <code>equals()</code> to compare String content.
        </p>
      </>
    ),
    code: `String a = new String("Java");
String b = new String("Java");

System.out.println(a == b);      // false
System.out.println(a.equals(b)); // true`,
  },
  {
    title: "18. Common mistakes",
    content: (
      <>
        <ul>
          <li>
            Using <code>=</code> instead of <code>==</code> for comparison.
          </li>
          <li>
            Writing a condition that is not boolean.
          </li>
          <li>
            Forgetting braces and accidentally controlling only one statement.
          </li>
          <li>
            Putting broad conditions before specific conditions.
          </li>
          <li>
            Forgetting <code>break</code> in traditional switch.
          </li>
          <li>
            Using <code>==</code> to compare String contents.
          </li>
          <li>
            Writing complicated nested ternary expressions.
          </li>
        </ul>
      </>
    ),
    code: `// Incorrect
if (age = 18) {
    System.out.println("Adult");
}

// Correct
if (age == 18) {
    System.out.println("Exactly 18");
}`,
  },
  {
    title: "19. Practice problems",
    content: (
      <>
        <ol>
          <li>Check whether a number is positive, negative, or zero.</li>
          <li>Check whether a number is even or odd.</li>
          <li>Find the largest of two numbers.</li>
          <li>Find the largest of three numbers.</li>
          <li>Check whether a year is a leap year.</li>
          <li>Assign a grade based on marks.</li>
          <li>Check whether a character is a vowel or consonant.</li>
          <li>Create a simple calculator using switch.</li>
          <li>Display the number of days in a month using switch.</li>
          <li>Use ternary to find the greater of two numbers.</li>
        </ol>
      </>
    ),
    code: `// Practice: even or odd

int number = 17;

if (number % 2 == 0) {
    System.out.println("Even");
} else {
    System.out.println("Odd");
}`,
  },
  {
    title: "20. Interview questions",
    content: (
      <>
        <ol>
          <li>What is a conditional statement?</li>
          <li>What is the difference between if and if-else?</li>
          <li>How does an else-if ladder execute?</li>
          <li>What is a nested if?</li>
          <li>Can an if condition contain multiple expressions?</li>
          <li>What is short-circuit evaluation?</li>
          <li>What is the difference between AND and OR?</li>
          <li>What is fall-through in switch?</li>
          <li>Why is break used in a traditional switch?</li>
          <li>What is the purpose of default?</li>
          <li>What is a switch expression?</li>
          <li>What is the ternary operator?</li>
          <li>When should ternary be avoided?</li>
          <li>Why should Strings be compared using equals()?</li>
          <li>How does condition order affect an else-if ladder?</li>
        </ol>
      </>
    ),
    code: `// Remember:
// if        -> one condition
// if-else   -> two paths
// else-if   -> multiple conditions
// switch    -> fixed choices
// ternary   -> compact two-value decision`,
  },
];

export default function ConditionalStatementsLesson({ onBack }) {
  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <button
        onClick={onBack}
        style={{
          padding: "8px 14px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid var(--border, #d1d5db)",
          background: "transparent",
          cursor: "pointer",
          color: "inherit",
        }}
      >
        ← Back to Java
      </button>

      <h1 style={{ fontSize: "30px", fontWeight: "800", marginBottom: "8px" }}>
        Java Conditional Statements
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn how Java makes decisions using conditions, branching,
        switch statements, and the ternary operator.
      </p>

      {lessons.map((lesson, index) => (
        <section key={index} style={sectionStyle}>
          <h2 style={headingStyle}>{lesson.title}</h2>

          <div style={{ lineHeight: "1.75", marginBottom: "14px" }}>
            {lesson.content}
          </div>

          <pre style={codeStyle}>
            <code>{lesson.code}</code>
          </pre>
        </section>
      ))}

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Final checklist</h2>
        <ul>
          <li>I can write if, if-else, and else-if statements.</li>
          <li>I understand nested conditions and logical operators.</li>
          <li>I can use switch with case, break, and default.</li>
          <li>I understand switch expressions and ternary.</li>
          <li>I can trace condition order and fall-through.</li>
          <li>I can solve the practice problems independently.</li>
        </ul>
      </section>
    </div>
  );
}
