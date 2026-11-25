

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
    title: "1. What is a loop?",
    content: (
      <>
        <p>
          A loop repeatedly executes a block of code while a condition allows
          it to continue.
        </p>
        <p>
          Without a loop, printing numbers from 1 to 100 would require many
          repeated statements. A loop lets us write the logic once.
        </p>
        <ul>
          <li>Initialization: where the loop begins.</li>
          <li>Condition: whether the loop should continue.</li>
          <li>Update: how the loop moves toward stopping.</li>
        </ul>
      </>
    ),
    code: `// Without loop
System.out.println(1);
System.out.println(2);
System.out.println(3);

// With loop
for (int i = 1; i <= 3; i++) {
    System.out.println(i);
}`,
  },
  {
    title: "2. The for loop",
    content: (
      <>
        <p>
          A <code>for</code> loop is commonly used when the number of
          repetitions is known or controlled by a counter.
        </p>
        <p>Syntax:</p>
        <p>
          <code>
            for (initialization; condition; update)
          </code>
        </p>
        <ul>
          <li>Initialization runs once.</li>
          <li>Condition is checked before each iteration.</li>
          <li>Loop body runs when the condition is true.</li>
          <li>Update runs after the body.</li>
        </ul>
      </>
    ),
    code: `for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}

Output:
1
2
3
4
5`,
  },
  {
    title: "3. For loop execution order",
    content: (
      <>
        <p>The execution order is important:</p>
        <ol>
          <li>Initialization</li>
          <li>Condition check</li>
          <li>Loop body</li>
          <li>Update</li>
          <li>Condition check again</li>
        </ol>
        <p>
          When the condition becomes false, the loop stops and execution
          continues after the loop.
        </p>
      </>
    ),
    code: `for (int i = 1; i <= 3; i++) {
    System.out.println("Hello");
}

// Dry run:
// i = 1 -> condition true -> print
// i = 2 -> condition true -> print
// i = 3 -> condition true -> print
// i = 4 -> condition false -> stop

Output:
Hello
Hello
Hello`,
  },
  {
    title: "4. Counting backwards",
    content: (
      <>
        <p>
          A loop can count backwards by decreasing the counter.
        </p>
        <p>
          Make sure the condition and update move in compatible directions.
          Otherwise, the loop may never stop.
        </p>
      </>
    ),
    code: `for (int i = 5; i >= 1; i--) {
    System.out.println(i);
}

Output:
5
4
3
2
1`,
  },
  {
    title: "5. The while loop",
    content: (
      <>
        <p>
          A <code>while</code> loop checks its condition before executing
          the body.
        </p>
        <p>
          It is useful when the number of repetitions is not known in advance,
          such as reading values until the user enters a stopping value.
        </p>
        <p>
          If the condition is false at the beginning, the body executes
          zero times.
        </p>
      </>
    ),
    code: `int i = 1;

while (i <= 5) {
    System.out.println(i);
    i++;
}`,
  },
  {
    title: "6. The do-while loop",
    content: (
      <>
        <p>
          A <code>do-while</code> loop checks the condition after executing
          the body.
        </p>
        <p>
          Therefore, its body always executes at least once, even when the
          condition is initially false.
        </p>
        <p>
          Notice that a do-while statement ends with a semicolon.
        </p>
      </>
    ),
    code: `int i = 10;

do {
    System.out.println(i);
    i++;
} while (i <= 5);

Output:
10`,
  },
  {
    title: "7. Comparing the three loops",
    content: (
      <>
        <table>
          <thead>
            <tr>
              <th>Loop</th>
              <th>Condition checked</th>
              <th>Minimum runs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>for</td>
              <td>Before body</td>
              <td>0</td>
            </tr>
            <tr>
              <td>while</td>
              <td>Before body</td>
              <td>0</td>
            </tr>
            <tr>
              <td>do-while</td>
              <td>After body</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
        <p>
          Choose the loop that makes the logic easiest to understand.
          There is no rule that every problem must use a for loop.
        </p>
      </>
    ),
    code: `// for
for (int i = 0; i < 3; i++) {
    System.out.println(i);
}

// while
int j = 0;
while (j < 3) {
    System.out.println(j);
    j++;
}

// do-while
int k = 0;
do {
    System.out.println(k);
    k++;
} while (k < 3);`,
  },
  {
    title: "8. Infinite loops",
    content: (
      <>
        <p>
          An infinite loop continues forever because its stopping condition
          never becomes false, or because it has no stopping condition.
        </p>
        <p>
          Infinite loops can be intentional, such as in servers or menu
          systems, but they need a way to exit.
        </p>
      </>
    ),
    code: `// Infinite loop
while (true) {
    System.out.println("Running");
}

// Common accidental infinite loop
int i = 1;

while (i <= 5) {
    System.out.println(i);
    // Missing i++!
}`,
  },
  {
    title: "9. The break statement",
    content: (
      <>
        <p>
          <code>break</code> immediately exits the nearest enclosing loop
          or switch statement.
        </p>
        <p>
          It is useful when the answer has been found and further iterations
          are unnecessary.
        </p>
      </>
    ),
    code: `for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;
    }

    System.out.println(i);
}

Output:
1
2
3
4`,
  },
  {
    title: "10. The continue statement",
    content: (
      <>
        <p>
          <code>continue</code> skips the remaining statements in the
          current iteration and moves to the next iteration.
        </p>
        <p>
          In a for loop, the update expression still runs after continue.
          In a while loop, execution moves directly to the condition check.
        </p>
      </>
    ),
    code: `for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;
    }

    System.out.println(i);
}

Output:
1
2
4
5`,
  },
  {
    title: "11. Nested loops",
    content: (
      <>
        <p>
          A nested loop is a loop inside another loop.
        </p>
        <p>
          For every one iteration of the outer loop, the inner loop runs
          through its complete cycle, unless it is interrupted.
        </p>
        <p>
          Nested loops are used for patterns, tables, matrices, and
          two-dimensional arrays.
        </p>
      </>
    ),
    code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 2; j++) {
        System.out.println(i + " " + j);
    }
}

Output:
1 1
1 2
2 1
2 2
3 1
3 2`,
  },
  {
    title: "12. Nested loop dry run",
    content: (
      <>
        <p>For this example:</p>
        <ul>
          <li>Outer loop runs 3 times.</li>
          <li>Inner loop runs 2 times for each outer iteration.</li>
          <li>Total inner-body executions = 3 × 2 = 6.</li>
        </ul>
        <p>
          The inner counter is usually initialized again whenever the
          outer loop starts a new iteration.
        </p>
      </>
    ),
    code: `for (int i = 1; i <= 2; i++) {
    for (int j = 1; j <= 3; j++) {
        System.out.print("* ");
    }

    System.out.println();
}

Output:
* * *
* * *`,
  },
  {
    title: "13. Pattern printing",
    content: (
      <>
        <p>
          Pattern problems help you understand nested loops.
        </p>
        <p>
          Usually, the outer loop controls rows and the inner loop controls
          the number of symbols printed in each row.
        </p>
        <p>
          Start by identifying how many rows are required and how many
          symbols each row contains.
        </p>
      </>
    ),
    code: `for (int row = 1; row <= 4; row++) {
    for (int col = 1; col <= row; col++) {
        System.out.print("* ");
    }

    System.out.println();
}

Output:
*
* *
* * *
* * * *`,
  },
  {
    title: "14. Enhanced for loop",
    content: (
      <>
        <p>
          The enhanced for loop, also called the for-each loop, is used to
          process each element of an array or collection.
        </p>
        <p>
          It is simpler when you need the value of each element but do not
          need its index.
        </p>
        <p>
          It does not directly provide the index of the current element.
        </p>
      </>
    ),
    code: `int[] numbers = {10, 20, 30};

for (int number : numbers) {
    System.out.println(number);
}

Output:
10
20
30`,
  },
  {
    title: "15. Traditional for vs enhanced for",
    content: (
      <>
        <p>
          Use a traditional for loop when you need an index, want to move
          backwards, or need to control the step size.
        </p>
        <p>
          Use an enhanced for loop when you simply need to visit each
          element in order.
        </p>
      </>
    ),
    code: `int[] numbers = {10, 20, 30};

// Traditional for: index is available
for (int i = 0; i < numbers.length; i++) {
    System.out.println(i + ": " + numbers[i]);
}

// Enhanced for: value is available
for (int value : numbers) {
    System.out.println(value);
}`,
  },
  {
    title: "16. Looping through a String",
    content: (
      <>
        <p>
          A String can be accessed character by character using
          <code> charAt(index)</code>.
        </p>
        <p>
          The last valid index is one less than the String's length.
        </p>
        <p>
          This is useful for counting characters, checking vowels, and
          reversing a String.
        </p>
      </>
    ),
    code: `String word = "JAVA";

for (int i = 0; i < word.length(); i++) {
    System.out.println(word.charAt(i));
}

Output:
J
A
V
A`,
  },
  {
    title: "17. Looping with arrays",
    content: (
      <>
        <p>
          An array's <code>length</code> property tells you how many
          elements it contains.
        </p>
        <p>
          Use the array length in the loop condition so the loop adapts
          when the array size changes.
        </p>
        <p>
          Be careful: the final valid index is <code>length - 1</code>.
        </p>
      </>
    ),
    code: `int[] values = {4, 8, 12, 16};

for (int i = 0; i < values.length; i++) {
    System.out.println(values[i]);
}`,
  },
  {
    title: "18. Common loop mistakes",
    content: (
      <>
        <ul>
          <li>Forgetting to update the loop counter.</li>
          <li>Using the wrong stopping condition.</li>
          <li>Starting at the wrong index.</li>
          <li>Using less-than-or-equal when it causes an extra iteration.</li>
          <li>Accessing an array index outside its valid range.</li>
          <li>Accidentally placing a semicolon after the loop header.</li>
          <li>Changing the counter unexpectedly inside the loop body.</li>
        </ul>
      </>
    ),
    code: `// Incorrect: extra semicolon
for (int i = 1; i <= 5; i++);

// The loop body is empty!

// Correct
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}`,
  },
  {
    title: "19. Time complexity of loops",
    content: (
      <>
        <p>
          Time complexity describes how the amount of work grows as input
          size grows.
        </p>
        <ul>
          <li>One loop from 1 to n: O(n)</li>
          <li>Two nested loops each from 1 to n: O(n²)</li>
          <li>Loop that halves n each time: O(log n)</li>
          <li>Two separate loops of n iterations: O(n + n) = O(n)</li>
        </ul>
        <p>
          Do not automatically call every nested loop O(n²). Count how
          many times the body actually executes.
        </p>
      </>
    ),
    code: `// O(n)
for (int i = 0; i < n; i++) {
    System.out.println(i);
}

// O(n^2)
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        System.out.println(i + j);
    }
}

// O(log n)
while (n > 1) {
    n = n / 2;
}`,
  },
  {
    title: "20. Practice problems",
    content: (
      <>
        <ol>
          <li>Print numbers from 1 to n.</li>
          <li>Print numbers from n down to 1.</li>
          <li>Find the sum of numbers from 1 to n.</li>
          <li>Find the factorial of a number.</li>
          <li>Print the multiplication table of a number.</li>
          <li>Count the digits in an integer.</li>
          <li>Reverse an integer using a loop.</li>
          <li>Check whether a number is prime.</li>
          <li>Print a right triangle star pattern.</li>
          <li>Count vowels in a String.</li>
          <li>Find the maximum element in an array.</li>
          <li>Use break to stop when a target is found.</li>
        </ol>
      </>
    ),
    code: `// Practice: sum from 1 to n

int n = 5;
int sum = 0;

for (int i = 1; i <= n; i++) {
    sum += i;
}

System.out.println(sum);

// Output: 15`,
  },
  {
    title: "21. Interview questions",
    content: (
      <>
        <ol>
          <li>What is a loop?</li>
          <li>What is the difference between for and while?</li>
          <li>Why does do-while execute at least once?</li>
          <li>What is an infinite loop?</li>
          <li>What is the difference between break and continue?</li>
          <li>What is a nested loop?</li>
          <li>How many times does an inner loop execute?</li>
          <li>What is an enhanced for loop?</li>
          <li>Can enhanced for provide an index directly?</li>
          <li>How do you loop through a String?</li>
          <li>How do you avoid array index errors?</li>
          <li>What is the time complexity of nested loops?</li>
          <li>Why can two separate loops still be O(n)?</li>
          <li>How do you analyze a loop that divides by 2?</li>
        </ol>
      </>
    ),
    code: `// Remember:
// for        -> counter-controlled repetition
// while      -> condition-controlled repetition
// do-while   -> executes at least once
// break      -> exits the nearest loop
// continue   -> skips current iteration
// for-each   -> visits array/collection elements`,
  },
];

export default function LoopsLesson({ onBack }) {
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
        Java Loops
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn repetition in Java using for, while, do-while, nested loops,
        break, continue, and enhanced for loops.
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
          <li>I can write for, while, and do-while loops.</li>
          <li>I understand loop execution order.</li>
          <li>I can use break and continue correctly.</li>
          <li>I can trace nested loops and pattern programs.</li>
          <li>I can loop through Strings and arrays.</li>
          <li>I can estimate basic loop time complexity.</li>
          <li>I can solve the practice problems independently.</li>
        </ul>
      </section>
    </div>
  );
}
