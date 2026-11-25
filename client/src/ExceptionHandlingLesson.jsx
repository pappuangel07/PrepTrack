

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
    title: "1. What is an exception?",
    content: (
      <>
        <p>
          An exception is an event that interrupts the normal flow of
          program execution.
        </p>
        <p>
          For example, dividing an integer by zero or accessing an invalid
          array index can cause an exception.
        </p>
        <p>
          Exception handling allows a program to respond to certain
          runtime problems instead of immediately terminating.
        </p>
      </>
    ),
    code: `int a = 10;
int b = 0;

// This causes ArithmeticException
int result = a / b;`,
  },
  {
    title: "2. Exception hierarchy",
    content: (
      <>
        <p>
          Java's exception and error types are organized under
          <code> Throwable</code>.
        </p>
        <ul>
          <li>Throwable</li>
          <li>├── Error</li>
          <li>└── Exception</li>
          <li>    └── RuntimeException</li>
        </ul>
        <p>
          Errors usually represent serious problems that applications
          generally should not try to recover from.
        </p>
        <p>
          Exceptions represent conditions that a program may handle.
        </p>
      </>
    ),
    code: `Throwable
    |
    |-- Error
    |
    |-- Exception
          |
          |-- RuntimeException
          |     |-- ArithmeticException
          |     |-- NullPointerException
          |     |-- ArrayIndexOutOfBoundsException
          |
          |-- IOException
          |-- SQLException`,
  },
  {
    title: "3. Checked and unchecked exceptions",
    content: (
      <>
        <p>
          Checked exceptions are checked by the compiler. A method must
          catch them or declare them using <code>throws</code>.
        </p>
        <p>
          Unchecked exceptions are RuntimeException subclasses. The
          compiler does not require them to be caught or declared.
        </p>
        <table>
          <thead>
            <tr><th>Checked</th><th>Unchecked</th></tr>
          </thead>
          <tbody>
            <tr><td>IOException</td><td>ArithmeticException</td></tr>
            <tr><td>SQLException</td><td>NullPointerException</td></tr>
            <tr><td>ClassNotFoundException</td><td>IllegalArgumentException</td></tr>
          </tbody>
        </table>
      </>
    ),
    code: `// Checked exception example
import java.io.IOException;

// IOException is checked.

// Unchecked exception example
int result = 10 / 0;

// ArithmeticException is unchecked.`,
  },
  {
    title: "4. try and catch",
    content: (
      <>
        <p>
          Put code that may throw an exception inside a try block.
          A matching catch block handles the exception.
        </p>
        <p>
          If an exception occurs, the remaining statements in that try
          block are skipped.
        </p>
      </>
    ),
    code: `try {
    int result = 10 / 0;
    System.out.println("After division");
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}

System.out.println("Program continues");`,
  },
  {
    title: "5. Exception object and methods",
    content: (
      <>
        <p>
          The catch variable refers to the exception object.
        </p>
        <ul>
          <li><code>getMessage()</code>: returns the detail message.</li>
          <li><code>toString()</code>: returns exception type and message.</li>
          <li><code>printStackTrace()</code>: prints stack trace details.</li>
        </ul>
        <p>
          Stack traces are useful for debugging. Avoid exposing detailed
          internal error information to end users in production.
        </p>
      </>
    ),
    code: `try {
    int[] arr = {10, 20};
    System.out.println(arr[5]);
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println(e.getMessage());
    System.out.println(e.toString());
    e.printStackTrace();
}`,
  },
  {
    title: "6. Multiple catch blocks",
    content: (
      <>
        <p>
          A try block can have multiple catch blocks to handle different
          exception types differently.
        </p>
        <p>
          Only the first matching catch block executes.
        </p>
        <p>
          Place more specific exception types before more general types.
        </p>
      </>
    ),
    code: `try {
    int[] arr = {10, 20};
    System.out.println(arr[5]);
} catch (ArithmeticException e) {
    System.out.println("Arithmetic problem");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Invalid array index");
} catch (Exception e) {
    System.out.println("Some other exception");
}`,
  },
  {
    title: "7. Catch order",
    content: (
      <>
        <p>
          A child exception type must be caught before its parent type.
        </p>
        <p>
          If a parent exception is caught first, a later catch for its
          child becomes unreachable and causes a compile-time error.
        </p>
      </>
    ),
    code: `// Correct order
try {
    int x = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Arithmetic");
} catch (Exception e) {
    System.out.println("General");
}

// Incorrect order:
// catch (Exception e) first,
// then catch (ArithmeticException e)
// causes a compile-time error.`,
  },
  {
    title: "8. finally block",
    content: (
      <>
        <p>
          The finally block normally executes after try and catch,
          whether an exception occurred or not.
        </p>
        <p>
          It is commonly used for cleanup operations.
        </p>
        <p>
          However, finally is not guaranteed to execute if the JVM
          terminates abruptly, such as through certain system-level
          termination conditions.
        </p>
      </>
    ),
    code: `try {
    System.out.println("Try");
    int x = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Catch");
} finally {
    System.out.println("Finally");
}

// Output:
// Try
// Catch
// Finally`,
  },
  {
    title: "9. finally with return",
    content: (
      <>
        <p>
          A return statement in finally can override a return value from
          try or catch.
        </p>
        <p>
          This is confusing and dangerous. Avoid returning from finally.
        </p>
      </>
    ),
    code: `static int test() {
    try {
        return 10;
    } finally {
        return 20;
    }
}

// Returns 20
// Avoid this pattern.`,
  },
  {
    title: "10. throw keyword",
    content: (
      <>
        <p>
          The <code>throw</code> keyword explicitly throws an exception
          object.
        </p>
        <p>
          It is used when your code detects a condition that should be
          treated as an error.
        </p>
      </>
    ),
    code: `static void checkAge(int age) {
    if (age < 18) {
        throw new IllegalArgumentException(
            "Age must be 18 or above"
        );
    }

    System.out.println("Allowed");
}

checkAge(15);`,
  },
  {
    title: "11. throws keyword",
    content: (
      <>
        <p>
          The <code>throws</code> keyword declares exceptions that a
          method may pass to its caller.
        </p>
        <p>
          It is commonly used with checked exceptions.
        </p>
        <p>
          The caller must handle or further declare a checked exception.
        </p>
      </>
    ),
    code: `import java.io.IOException;

static void readFile() throws IOException {
    // File-reading code may throw IOException
}

static void mainWork() throws IOException {
    readFile();
}`,
  },
  {
    title: "12. throw vs throws",
    content: (
      <>
        <table>
          <thead>
            <tr><th>throw</th><th>throws</th></tr>
          </thead>
          <tbody>
            <tr><td>Used to throw an exception</td><td>Used to declare exceptions</td></tr>
            <tr><td>Inside method or block</td><td>In method declaration</td></tr>
            <tr><td>Throws an exception object</td><td>Lists exception types</td></tr>
          </tbody>
        </table>
      </>
    ),
    code: `static void validate(int value)
        throws Exception {
    if (value < 0) {
        throw new Exception("Negative value");
    }
}`,
  },
  {
    title: "13. Creating a custom exception",
    content: (
      <>
        <p>
          You can create your own exception class when a domain-specific
          error needs a meaningful name.
        </p>
        <p>
          Extend Exception for a checked custom exception, or
          RuntimeException for an unchecked custom exception.
        </p>
      </>
    ),
    code: `class InvalidAgeException extends Exception {
    InvalidAgeException(String message) {
        super(message);
    }
}

static void checkAge(int age)
        throws InvalidAgeException {
    if (age < 18) {
        throw new InvalidAgeException(
            "Age is not valid"
        );
    }
}`,
  },
  {
    title: "14. Try-with-resources",
    content: (
      <>
        <p>
          Try-with-resources automatically closes resources that implement
          AutoCloseable.
        </p>
        <p>
          It is useful for files, streams, and database resources.
        </p>
        <p>
          Resources are closed automatically when the try block exits,
          including when an exception occurs.
        </p>
      </>
    ),
    code: `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

try (
    BufferedReader reader =
        new BufferedReader(
            new FileReader("data.txt")
        )
) {
    System.out.println(reader.readLine());
} catch (IOException e) {
    System.out.println("File error");
}`,
  },
  {
    title: "15. Multi-catch",
    content: (
      <>
        <p>
          Multi-catch allows one catch block to handle multiple unrelated
          exception types.
        </p>
        <p>
          Use the pipe symbol between exception types.
        </p>
        <p>
          The exception types in a multi-catch cannot be related through
          inheritance.
        </p>
      </>
    ),
    code: `try {
    // risky operation
} catch (
    ArithmeticException |
    NullPointerException e
) {
    System.out.println("Invalid operation");
}`,
  },
  {
    title: "16. Exception propagation",
    content: (
      <>
        <p>
          If a method does not handle an exception, it can propagate to
          its caller.
        </p>
        <p>
          The JVM searches up the call stack for a matching handler.
          If none is found, the thread terminates after reporting the
          uncaught exception.
        </p>
      </>
    ),
    code: `static void methodC() {
    int x = 10 / 0;
}

static void methodB() {
    methodC();
}

static void methodA() {
    methodB();
}

methodA();

// Exception starts in methodC
// and propagates through methodB
// and methodA if not handled.`,
  },
  {
    title: "17. Nested try blocks",
    content: (
      <>
        <p>
          A try block can exist inside another try block.
        </p>
        <p>
          An inner catch handles exceptions that match it. If it does not
          handle an exception, the exception can propagate to the outer
          catch.
        </p>
        <p>
          Use nested try blocks only when separate handling scopes are
          genuinely needed.
        </p>
      </>
    ),
    code: `try {
    try {
        int x = 10 / 0;
    } catch (NullPointerException e) {
        System.out.println("Inner catch");
    }
} catch (ArithmeticException e) {
    System.out.println("Outer catch");
}`,
  },
  {
    title: "18. Common exception types",
    content: (
      <>
        <table>
          <thead>
            <tr><th>Exception</th><th>Typical cause</th></tr>
          </thead>
          <tbody>
            <tr><td>ArithmeticException</td><td>Integer division by zero</td></tr>
            <tr><td>NullPointerException</td><td>Using a null reference</td></tr>
            <tr><td>ArrayIndexOutOfBoundsException</td><td>Invalid array index</td></tr>
            <tr><td>NumberFormatException</td><td>Invalid numeric String conversion</td></tr>
            <tr><td>IllegalArgumentException</td><td>Invalid method argument</td></tr>
            <tr><td>IOException</td><td>Input/output failure</td></tr>
            <tr><td>ClassNotFoundException</td><td>Requested class cannot be found</td></tr>
          </tbody>
        </table>
      </>
    ),
    code: `int number = Integer.parseInt("abc");

// NumberFormatException`,
  },
  {
    title: "19. Best practices",
    content: (
      <>
        <ul>
          <li>Catch specific exceptions whenever possible.</li>
          <li>Do not use exceptions for normal program flow.</li>
          <li>Do not leave catch blocks empty.</li>
          <li>Do not expose sensitive stack traces to users.</li>
          <li>Use try-with-resources for closable resources.</li>
          <li>Do not return from finally.</li>
          <li>Preserve the original exception when wrapping it.</li>
          <li>Choose checked or unchecked custom exceptions deliberately.</li>
        </ul>
      </>
    ),
    code: `try {
    // risky operation
} catch (IOException e) {
    // Log or handle appropriately
    System.out.println("Unable to read file");
}`,
  },
  {
    title: "20. Practice problems",
    content: (
      <>
        <ol>
          <li>Handle division by zero.</li>
          <li>Handle invalid array indexes.</li>
          <li>Parse a number from a String safely.</li>
          <li>Create a custom InvalidAgeException.</li>
          <li>Write a method that declares IOException.</li>
          <li>Use try-with-resources to read a file.</li>
          <li>Demonstrate exception propagation across methods.</li>
          <li>Use multi-catch for two exception types.</li>
          <li>Explain the output of try-catch-finally examples.</li>
        </ol>
      </>
    ),
    code: `try {
    int value = Integer.parseInt("123");
    System.out.println(value);
} catch (NumberFormatException e) {
    System.out.println("Invalid number");
}`,
  },
  {
    title: "21. Interview questions",
    content: (
      <>
        <ol>
          <li>What is an exception?</li>
          <li>Explain the Throwable hierarchy.</li>
          <li>What is the difference between checked and unchecked exceptions?</li>
          <li>What is the difference between throw and throws?</li>
          <li>Can we have multiple catch blocks?</li>
          <li>Why must child exceptions be caught before parent exceptions?</li>
          <li>Does finally always execute?</li>
          <li>Can finally override a return value?</li>
          <li>What is exception propagation?</li>
          <li>What is a custom exception?</li>
          <li>What is try-with-resources?</li>
          <li>What is multi-catch?</li>
          <li>What is the difference between Error and Exception?</li>
          <li>Can we catch an exception and throw it again?</li>
        </ol>
      </>
    ),
    code: `// Remember:
// try      -> risky code
// catch    -> handles matching exception
// finally  -> cleanup code
// throw    -> explicitly throw an object
// throws   -> declare possible exceptions`,
  },
];

export default function ExceptionHandlingLesson({ onBack }) {
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
        Java Exception Handling
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn exception types, try-catch-finally, throw and throws,
        custom exceptions, exception propagation, and resource handling.
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
          <li>I understand checked and unchecked exceptions.</li>
          <li>I can use try, catch, and finally.</li>
          <li>I understand throw and throws.</li>
          <li>I can create custom exceptions.</li>
          <li>I understand exception propagation.</li>
          <li>I can use try-with-resources.</li>
          <li>I can explain common exception types.</li>
          <li>I can solve the practice problems independently.</li>
        </ul>
      </section>
    </div>
  );
}
