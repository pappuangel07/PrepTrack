

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
    title: "1. What is Input and Output?",
    content: (
      <>
        <p>
          A Java program often needs to receive information from the user and
          display its result.
        </p>
        <ul>
          <li><b>Input:</b> Data entering the program.</li>
          <li><b>Output:</b> Information displayed by the program.</li>
        </ul>
        <p>
          Example: A calculator receives two numbers as input and displays their
          sum as output.
        </p>
      </>
    ),
    code: `Input:
10
20

Output:
Sum = 30`,
  },
  {
    title: "2. Java output: System.out",
    content: (
      <>
        <p>
          Java provides <code>System.out</code> to display information on the
          console.
        </p>
        <h4>print()</h4>
        <p>Displays text without automatically moving to the next line.</p>
        <h4>println()</h4>
        <p>Displays text and then moves to the next line.</p>
        <h4>printf()</h4>
        <p>
          Displays formatted output. Useful when controlling decimal places,
          spacing, or combining values with text.
        </p>
      </>
    ),
    code: `System.out.print("Hello ");
System.out.print("Java");

System.out.println("Hello");
System.out.println("Java");

System.out.printf("Age = %d", 19);`,
  },
  {
    title: "3. print() vs println() vs printf()",
    content: (
      <>
        <p>Understand the difference instead of memorizing names.</p>
        <ul>
          <li><code>print()</code> — stays on the same line.</li>
          <li><code>println()</code> — moves to the next line.</li>
          <li><code>printf()</code> — formats output using placeholders.</li>
        </ul>
      </>
    ),
    code: `System.out.print("A");
System.out.print("B");
System.out.println("C");
System.out.println("D");

Output:
ABC
D`,
  },
  {
    title: "4. Format specifiers in printf()",
    content: (
      <>
        <p>
          A format specifier is a placeholder that tells Java what kind of
          value should be displayed.
        </p>
        <table>
          <thead>
            <tr>
              <th>Specifier</th>
              <th>Meaning</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>%d</td><td>Integer</td><td>25</td></tr>
            <tr><td>%f</td><td>Floating-point</td><td>3.14</td></tr>
            <tr><td>%s</td><td>String</td><td>Hello</td></tr>
            <tr><td>%c</td><td>Character</td><td>A</td></tr>
            <tr><td>%b</td><td>Boolean</td><td>true</td></tr>
            <tr><td>%n</td><td>Platform-specific newline</td><td>New line</td></tr>
          </tbody>
        </table>
        <p>
          For floating-point values, <code>%.2f</code> displays two digits
          after the decimal point.
        </p>
      </>
    ),
    code: `int age = 19;
double price = 125.6789;
String name = "Angel";

System.out.printf("Age: %d%n", age);
System.out.printf("Price: %.2f%n", price);
System.out.printf("Name: %s%n", name);

Output:
Age: 19
Price: 125.68
Name: Angel`,
  },
  {
    title: "5. Taking input using Scanner",
    content: (
      <>
        <p>
          <code>Scanner</code> is a beginner-friendly class used to read input
          from the keyboard.
        </p>
        <p>
          It belongs to the <code>java.util</code> package, so import it before
          using it.
        </p>
        <p>
          <code>System.in</code> represents the standard input stream, usually
          the keyboard.
        </p>
      </>
    ),
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = sc.nextLine();

        System.out.println("Hello " + name);
    }
}`,
  },
  {
    title: "6. Scanner methods",
    content: (
      <>
        <p>Use the method that matches the type of input you need.</p>
        <table>
          <thead>
            <tr><th>Method</th><th>Reads</th></tr>
          </thead>
          <tbody>
            <tr><td>nextInt()</td><td>Integer</td></tr>
            <tr><td>nextLong()</td><td>Long integer</td></tr>
            <tr><td>nextFloat()</td><td>Float</td></tr>
            <tr><td>nextDouble()</td><td>Double</td></tr>
            <tr><td>next()</td><td>One token, usually one word</td></tr>
            <tr><td>nextLine()</td><td>Remaining line of text</td></tr>
            <tr><td>nextBoolean()</td><td>Boolean value</td></tr>
          </tbody>
        </table>
        <p>
          <code>next()</code> stops at whitespace. <code>nextLine()</code>{" "}
          reads the rest of the current line, including spaces.
        </p>
      </>
    ),
    code: `Scanner sc = new Scanner(System.in);

int age = sc.nextInt();
double mark = sc.nextDouble();
String firstName = sc.next();
String fullName = sc.nextLine();`,
  },
  {
    title: "7. The nextInt() and nextLine() problem",
    content: (
      <>
        <p>
          This is one of the most common Scanner mistakes.
        </p>
        <p>
          When you enter a number and press Enter, <code>nextInt()</code>{" "}
          reads the number but leaves the newline character in the input.
          The next <code>nextLine()</code> consumes that leftover newline,
          so it may appear to skip your text input.
        </p>
        <p>
          The usual solution is to call an extra <code>nextLine()</code>{" "}
          after reading the number, before reading the full text.
        </p>
      </>
    ),
    code: `Scanner sc = new Scanner(System.in);

System.out.print("Enter age: ");
int age = sc.nextInt();

sc.nextLine(); // Consume leftover newline

System.out.print("Enter full name: ");
String name = sc.nextLine();

System.out.println(name + " is " + age);`,
  },
  {
    title: "8. Scanner input: complete example",
    content: (
      <>
        <p>
          This program reads a student's name, age, and mark, then displays
          the values.
        </p>
        <p>Try entering a name containing spaces.</p>
      </>
    ),
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter full name: ");
        String name = sc.nextLine();

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        System.out.print("Enter mark: ");
        double mark = sc.nextDouble();

        System.out.println("\\n--- Student Details ---");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.printf("Mark: %.2f%n", mark);

        sc.close();
    }
}`,
  },
  {
    title: "9. String concatenation",
    content: (
      <>
        <p>
          The <code>+</code> operator can join strings and values.
          This is called string concatenation.
        </p>
        <p>
          If either operand is a String, Java may convert the other operand
          to text and join them.
        </p>
        <p>
          Be careful: parentheses affect arithmetic before concatenation.
        </p>
      </>
    ),
    code: `int a = 10;
int b = 20;

System.out.println("Sum = " + (a + b));
System.out.println("Values = " + a + b);

Output:
Sum = 30
Values = 1020`,
  },
  {
    title: "10. Taking character input",
    content: (
      <>
        <p>
          Scanner does not provide a direct <code>nextChar()</code> method.
          Read a String and take its first character using <code>charAt(0)</code>.
        </p>
        <p>
          Before calling <code>charAt(0)</code>, make sure the input is not
          empty.
        </p>
      </>
    ),
    code: `Scanner sc = new Scanner(System.in);

System.out.print("Enter a character: ");
String input = sc.next();

if (!input.isEmpty()) {
    char ch = input.charAt(0);
    System.out.println("Character: " + ch);
}`,
  },
  {
    title: "11. Reading input using BufferedReader",
    content: (
      <>
        <p>
          <code>BufferedReader</code> is another way to read text input.
          It is often used when reading large amounts of input efficiently.
        </p>
        <p>
          Unlike Scanner's numeric methods, <code>readLine()</code> returns
          text. Convert it to a number when needed.
        </p>
        <p>
          <code>readLine()</code> can throw <code>IOException</code>, so the
          program must handle or declare it.
        </p>
      </>
    ),
    code: `import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args)
            throws IOException {

        BufferedReader br =
            new BufferedReader(
                new InputStreamReader(System.in)
            );

        System.out.print("Enter age: ");
        int age = Integer.parseInt(br.readLine());

        System.out.println("Age = " + age);
    }
}`,
  },
  {
    title: "12. Converting String input to numbers",
    content: (
      <>
        <p>
          When input is read as text, use parsing methods to convert it.
        </p>
        <ul>
          <li><code>Integer.parseInt()</code></li>
          <li><code>Long.parseLong()</code></li>
          <li><code>Double.parseDouble()</code></li>
          <li><code>Float.parseFloat()</code></li>
        </ul>
        <p>
          If the text is not a valid number, Java throws
          <code> NumberFormatException</code>.
        </p>
      </>
    ),
    code: `String number = "123";

int value = Integer.parseInt(number);
double decimal = Double.parseDouble("12.5");

System.out.println(value + 10);
System.out.println(decimal);

Output:
133
12.5`,
  },
  {
    title: "13. Command-line arguments",
    content: (
      <>
        <p>
          Java can receive input when the program starts. These values are
          stored in the <code>args</code> array in the main method.
        </p>
        <p>
          Each command-line argument is a String. Convert it if you need
          a number.
        </p>
      </>
    ),
    code: `public class Main {
    public static void main(String[] args) {
        if (args.length > 0) {
            System.out.println("Hello " + args[0]);
        }
    }
}

Run:
java Main Angel

Output:
Hello Angel`,
  },
  {
    title: "14. Common input and output errors",
    content: (
      <>
        <ul>
          <li>
            Forgetting <code>import java.util.Scanner;</code>.
          </li>
          <li>
            Using <code>next()</code> when the full line is required.
          </li>
          <li>
            Forgetting the leftover newline after <code>nextInt()</code>.
          </li>
          <li>
            Using the wrong format specifier in <code>printf()</code>.
          </li>
          <li>
            Parsing invalid text into a number.
          </li>
          <li>
            Calling <code>charAt(0)</code> on an empty String.
          </li>
          <li>
            Forgetting that <code>args</code> values are Strings.
          </li>
        </ul>
      </>
    ),
    code: `// Incorrect: may skip the full name
int age = sc.nextInt();
String name = sc.nextLine();

// Correct:
int age = sc.nextInt();
sc.nextLine();
String name = sc.nextLine();`,
  },
  {
    title: "15. Scanner vs BufferedReader",
    content: (
      <>
        <table>
          <thead>
            <tr><th>Scanner</th><th>BufferedReader</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Beginner-friendly</td>
              <td>More manual conversion</td>
            </tr>
            <tr>
              <td>Provides numeric methods</td>
              <td>Reads text lines</td>
            </tr>
            <tr>
              <td>Convenient for small programs</td>
              <td>Often preferred for large input</td>
            </tr>
            <tr>
              <td>Can be slower for heavy input</td>
              <td>Usually faster for heavy input</td>
            </tr>
          </tbody>
        </table>
        <p>
          For beginner programs, Scanner is usually easier. For competitive
          programming with large input, BufferedReader is commonly used.
        </p>
      </>
    ),
    code: `// Scanner
Scanner sc = new Scanner(System.in);
int n = sc.nextInt();

// BufferedReader
BufferedReader br =
    new BufferedReader(
        new InputStreamReader(System.in)
    );

int x = Integer.parseInt(br.readLine());`,
  },
  {
    title: "16. Practice problems",
    content: (
      <>
        <ol>
          <li>Read two integers and print their sum.</li>
          <li>Read a person's full name and age.</li>
          <li>Read three marks and print their average.</li>
          <li>Read a double and print it to two decimal places.</li>
          <li>Read a character and check whether it is a vowel.</li>
          <li>Read a number as String and convert it to int.</li>
          <li>Read a name using command-line arguments.</li>
          <li>Write the same input program using Scanner and BufferedReader.</li>
        </ol>
      </>
    ),
    code: `// Practice: sum of two numbers

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int a = sc.nextInt();
        int b = sc.nextInt();

        int sum = a + b;

        System.out.println("Sum = " + sum);

        sc.close();
    }
}`,
  },
  {
    title: "17. Interview questions",
    content: (
      <>
        <ol>
          <li>What is System.in?</li>
          <li>What is System.out?</li>
          <li>Difference between print() and println()?</li>
          <li>What is printf() used for?</li>
          <li>What is a format specifier?</li>
          <li>Difference between Scanner next() and nextLine()?</li>
          <li>Why does nextLine() sometimes appear to skip input?</li>
          <li>Does Scanner nextInt() return a String?</li>
          <li>What does Integer.parseInt() do?</li>
          <li>What exception can parsing invalid text cause?</li>
          <li>What is BufferedReader?</li>
          <li>Why is BufferedReader often used for large input?</li>
          <li>What are command-line arguments?</li>
          <li>What is stored in args[0]?</li>
          <li>What happens if args is empty and args[0] is accessed?</li>
        </ol>
      </>
    ),
    code: `// Remember:
// Scanner reads input.
// System.out displays output.
// parseInt converts String to int.
// printf formats output.
// args contains command-line Strings.`,
  },
];

export default function InputOutputLesson({ onBack }) {
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
        Java Input and Output
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn how Java receives input, displays output, formats values,
        and handles common input problems.
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
          <li>I know print(), println(), and printf().</li>
          <li>I can read integers, decimals, and Strings using Scanner.</li>
          <li>I understand next() versus nextLine().</li>
          <li>I can fix the nextInt() and nextLine() issue.</li>
          <li>I can use BufferedReader and parse input.</li>
          <li>I can solve the practice problems without copying.</li>
        </ul>
      </section>
    </div>
  );
}
