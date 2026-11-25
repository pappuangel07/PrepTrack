

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
    title: "1. What Is Logging?",
    content: (
      <>
        <p>
          Logging means recording information about what a program is doing
          while it runs.
        </p>
        <p>Logs help developers:</p>
        <ul>
          <li>Understand application behavior.</li>
          <li>Find errors and unexpected conditions.</li>
          <li>Monitor performance and important events.</li>
          <li>Investigate problems after deployment.</li>
        </ul>
        <p>
          Logging is different from debugging. Logging records information;
          debugging lets you pause and inspect the program.
        </p>
      </>
    ),
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Application started");

        int result = 10 + 20;

        System.out.println("Result: " + result);
    }
}`,
  },
  {
    title: "2. System.out.println vs Logging",
    content: (
      <>
        <p>
          <code>System.out.println()</code> is useful for simple output and
          beginner programs.
        </p>
        <p>
          Logging frameworks provide levels, timestamps, filtering,
          configuration, and output destinations.
        </p>
        <p>
          Real applications generally use a logging framework instead of
          printing every diagnostic message directly to the console.
        </p>
      </>
    ),
    code: `// Simple console output
System.out.println("User logged in");

// Logging
logger.info("User logged in");

// Logging with an error
logger.severe("Database connection failed");`,
  },
  {
    title: "3. Java Built-in Logger",
    content: (
      <>
        <p>
          Java provides a logging API in <code>java.util.logging</code>.
        </p>
        <p>
          The main class is <code>Logger</code>. It records messages at
          different severity levels.
        </p>
        <p>
          You can create a logger using <code>Logger.getLogger()</code>.
        </p>
      </>
    ),
    code: `import java.util.logging.Logger;

public class Main {
    private static final Logger logger =
        Logger.getLogger(Main.class.getName());

    public static void main(String[] args) {
        logger.info("Application started");
    }
}`,
  },
  {
    title: "4. Logging Levels",
    content: (
      <>
        <p>Java's built-in logger provides several levels:</p>
        <ul>
          <li>
            <code>SEVERE</code> — serious failure.
          </li>
          <li>
            <code>WARNING</code> — potential problem.
          </li>
          <li>
            <code>INFO</code> — important application events.
          </li>
          <li>
            <code>CONFIG</code> — configuration information.
          </li>
          <li>
            <code>FINE</code> — debugging information.
          </li>
          <li>
            <code>FINER</code> — more detailed debugging information.
          </li>
          <li>
            <code>FINEST</code> — very detailed tracing.
          </li>
        </ul>
        <p>
          The logger's configured level determines which messages are
          processed. A message below the configured level may not appear.
        </p>
      </>
    ),
    code: `import java.util.logging.Logger;

class LoggingExample {
    private static final Logger logger =
        Logger.getLogger(LoggingExample.class.getName());

    void run() {
        logger.severe("Critical error");
        logger.warning("Unexpected condition");
        logger.info("Application started");
        logger.fine("Debug details");
    }
}`,
  },
  {
    title: "5. Logging Variables",
    content: (
      <>
        <p>
          Logs become more useful when they include relevant values.
        </p>
        <p>
          Use clear messages that explain what the value represents.
        </p>
        <p>
          Avoid logging passwords, authentication tokens, private personal
          information, or other sensitive data.
        </p>
      </>
    ),
    code: `import java.util.logging.Logger;

class UserService {
    private static final Logger logger =
        Logger.getLogger(UserService.class.getName());

    void login(int userId) {
        logger.info("Login attempt for userId=" + userId);
    }
}`,
  },
  {
    title: "6. Logging Exceptions",
    content: (
      <>
        <p>
          When an exception occurs, logging the exception object can preserve
          its stack trace.
        </p>
        <p>
          This helps identify where the error happened and which method calls
          led to it.
        </p>
        <p>
          Do not log an exception and then silently ignore it. Handle the
          problem appropriately or propagate it.
        </p>
      </>
    ),
    code: `import java.util.logging.Level;
import java.util.logging.Logger;

class FileService {
    private static final Logger logger =
        Logger.getLogger(FileService.class.getName());

    void loadFile() {
        try {
            // File operation
        } catch (Exception e) {
            logger.log(
                Level.SEVERE,
                "Failed to load file",
                e
            );
        }
    }
}`,
  },
  {
    title: "7. Logger Names and Class-based Logging",
    content: (
      <>
        <p>
          A common convention is to create one logger per class.
        </p>
        <p>
          Using the class name helps identify where a message originated.
        </p>
        <p>
          The logger is often declared <code>private static final</code>{" "}
          because it is shared by all instances of that class.
        </p>
      </>
    ),
    code: `import java.util.logging.Logger;

public class PaymentService {
    private static final Logger logger =
        Logger.getLogger(
            PaymentService.class.getName()
        );

    void processPayment() {
        logger.info("Processing payment");
    }
}`,
  },
  {
    title: "8. Debugging — What Does It Mean?",
    content: (
      <>
        <p>
          Debugging is the process of finding and fixing defects in a program.
        </p>
        <p>Typical debugging steps:</p>
        <ol>
          <li>Reproduce the problem.</li>
          <li>Identify where the behavior becomes incorrect.</li>
          <li>Inspect variables and program state.</li>
          <li>Find the root cause.</li>
          <li>Fix the cause.</li>
          <li>Test again to verify the fix.</li>
        </ol>
        <p>
          Guessing and changing random lines is not debugging. It often
          introduces more bugs.
        </p>
      </>
    ),
    code: `// Buggy code
int total = 0;

for (int i = 1; i <= 5; i++) {
    total = i;
}

System.out.println(total);

// Expected: 15
// Actual: 5
//
// Root cause:
// total = i replaces the previous value.
// Use total += i to accumulate.`,
  },
  {
    title: "9. Breakpoints",
    content: (
      <>
        <p>
          A breakpoint tells the debugger to pause execution at a particular
          line.
        </p>
        <p>In VS Code:</p>
        <ol>
          <li>Open your Java source file.</li>
          <li>Click beside a line number to add a breakpoint.</li>
          <li>Start the program using Run and Debug.</li>
          <li>Execution pauses when the breakpoint is reached.</li>
        </ol>
        <p>
          Choose a line where the variable or condition you want to inspect
          is available.
        </p>
      </>
    ),
    code: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;

        // Set a breakpoint here
        int result = a + b;

        System.out.println(result);
    }
}`,
  },
  {
    title: "10. Step Over, Step Into, Step Out",
    content: (
      <>
        <p>Debugger controls help you move through program execution.</p>
        <ul>
          <li>
            <strong>Continue:</strong> Resume until the next breakpoint.
          </li>
          <li>
            <strong>Step Over:</strong> Execute the current line without
            entering called methods.
          </li>
          <li>
            <strong>Step Into:</strong> Enter a method call.
          </li>
          <li>
            <strong>Step Out:</strong> Finish the current method and return
            to its caller.
          </li>
        </ul>
        <p>
          These controls help you follow the flow of execution without adding
          print statements everywhere.
        </p>
      </>
    ),
    code: `public class Main {
    static int square(int number) {
        return number * number;
    }

    public static void main(String[] args) {
        int value = 5;

        int result = square(value);

        System.out.println(result);
    }
}

// Set a breakpoint on the square(value) line.
// Use Step Into to inspect square().`,
  },
  {
    title: "11. Inspecting Variables",
    content: (
      <>
        <p>
          When execution pauses, inspect variables in the debugger.
        </p>
        <p>You can check:</p>
        <ul>
          <li>Current values.</li>
          <li>Object fields.</li>
          <li>Array contents.</li>
          <li>Loop counters.</li>
          <li>Method parameters.</li>
        </ul>
        <p>
          Compare the actual values with what you expected at that exact line.
        </p>
      </>
    ),
    code: `int[] numbers = {2, 4, 6};

int sum = 0;

for (int i = 0; i < numbers.length; i++) {
    sum += numbers[i];

    // Breakpoint here:
    // Inspect i, numbers[i], and sum.
}`,
  },
  {
    title: "12. Watch Expressions",
    content: (
      <>
        <p>
          A watch expression lets you monitor an expression while debugging.
        </p>
        <p>
          For example, you can watch <code>sum</code>, <code>i</code>, or
          <code> numbers[i]</code> during a loop.
        </p>
        <p>
          Watches are useful when you want to track a value without repeatedly
          searching through the Variables panel.
        </p>
      </>
    ),
    code: `int a = 10;
int b = 5;

int result = a * b;

// Add these expressions to Watch:
// a
// b
// result
// a + b`,
  },
  {
    title: "13. Conditional Breakpoints",
    content: (
      <>
        <p>
          A conditional breakpoint pauses execution only when a condition is
          true.
        </p>
        <p>
          This is especially useful in large loops where you do not want the
          debugger to stop on every iteration.
        </p>
        <p>
          Example condition: <code>i == 100</code>.
        </p>
      </>
    ),
    code: `for (int i = 0; i < 1000; i++) {
    process(i);
}

// Set a conditional breakpoint inside the loop:
// i == 500

// The debugger pauses only when i is 500.`,
  },
  {
    title: "14. Call Stack",
    content: (
      <>
        <p>
          The call stack shows the sequence of method calls that led to the
          current execution point.
        </p>
        <p>
          Each active method call has a stack frame containing information
          such as local variables and return location.
        </p>
        <p>
          When an exception occurs, the stack trace helps you understand
          where it originated and how execution reached that point.
        </p>
      </>
    ),
    code: `public class Main {
    static void first() {
        second();
    }

    static void second() {
        third();
    }

    static void third() {
        int result = 10 / 0;
    }

    public static void main(String[] args) {
        first();
    }
}

// Call sequence:
// main() -> first() -> second() -> third()`,
  },
  {
    title: "15. Reading a Stack Trace",
    content: (
      <>
        <p>
          A stack trace contains the exception type, message, and method-call
          locations.
        </p>
        <p>
          Start with the exception name and message. Then inspect the first
          stack frame that points to your own code.
        </p>
        <p>
          The top frame is generally where the exception was thrown, but the
          root cause may be earlier in the execution flow.
        </p>
      </>
    ),
    code: `Exception in thread "main" java.lang.ArithmeticException: / by zero
    at Main.divide(Main.java:5)
    at Main.main(Main.java:10)

// Main.divide(Main.java:5)
// means:
// method: divide
// file: Main.java
// line: 5`,
  },
  {
    title: "16. Logging Best Practices",
    content: (
      <>
        <ul>
          <li>Use meaningful messages.</li>
          <li>Choose the correct logging level.</li>
          <li>Include useful context such as IDs.</li>
          <li>Do not log passwords or secrets.</li>
          <li>Avoid logging the same exception repeatedly.</li>
          <li>Do not use logs as a substitute for proper error handling.</li>
          <li>Use structured logging in larger applications when appropriate.</li>
          <li>Keep detailed debug logs disabled in normal production operation.</li>
        </ul>
      </>
    ),
    code: `// Better
logger.info("Order created, orderId=" + orderId);

// Avoid
logger.info("Something happened");

// Never log sensitive values
// logger.info("Password=" + password);`,
  },
  {
    title: "17. Logging and Performance",
    content: (
      <>
        <p>
          Logging can affect performance, especially when producing large
          messages or writing to slow destinations.
        </p>
        <p>
          For expensive debug messages, check whether the level is enabled
          before constructing the message.
        </p>
        <p>
          Some logging frameworks support parameterized messages, which can
          avoid unnecessary string construction.
        </p>
      </>
    ),
    code: `import java.util.logging.Logger;

class PerformanceExample {
    private static final Logger logger =
        Logger.getLogger(
            PerformanceExample.class.getName()
        );

    void inspect(String value) {
        if (logger.isLoggable(
            java.util.logging.Level.FINE
        )) {
            logger.fine("Value details: " + value);
        }
    }
}`,
  },
  {
    title: "18. Debugging Common Java Problems",
    content: (
      <>
        <p>Common problems and what to inspect:</p>
        <ul>
          <li>
            <code>NullPointerException</code> — inspect which reference is
            null.
          </li>
          <li>
            <code>ArrayIndexOutOfBoundsException</code> — inspect index and
            array length.
          </li>
          <li>
            Wrong output — inspect intermediate values.
          </li>
          <li>
            Infinite loop — inspect loop condition and counter changes.
          </li>
          <li>
            Unexpected exception — inspect stack trace and call stack.
          </li>
          <li>
            Slow code — measure performance before optimizing.
          </li>
        </ul>
      </>
    ),
    code: `// NullPointerException example
String name = null;

// Set a breakpoint before this line
System.out.println(name.length());

// Inspect name.
// It is null, so calling length() fails.`,
  },
  {
    title: "19. Interview Questions",
    content: (
      <>
        <ol>
          <li>What is logging?</li>
          <li>Logging vs debugging?</li>
          <li>What are the Java logging levels?</li>
          <li>What is a logger?</li>
          <li>How do you log an exception with its stack trace?</li>
          <li>What is a breakpoint?</li>
          <li>Step Over vs Step Into?</li>
          <li>What is a conditional breakpoint?</li>
          <li>What is a call stack?</li>
          <li>How do you read a stack trace?</li>
          <li>Why should sensitive data not be logged?</li>
          <li>Can excessive logging affect performance?</li>
        </ol>
      </>
    ),
    code: `// Practice task:
// Create a Java program that calculates
// the average of an integer array.
//
// 1. Log when calculation starts.
// 2. Log the array length.
// 3. Handle an empty array.
// 4. Log the calculated average.
// 5. Set a breakpoint inside the loop.
// 6. Inspect sum and index.
// 7. Test an invalid input case.`,
  },
];

export default function LoggingLesson({ onBack }) {
  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: "20px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid var(--border, #d1d5db)",
          background: "var(--card, #ffffff)",
          color: "var(--text, #111827)",
          cursor: "pointer",
        }}
      >
        ← Back to Java
      </button>

      <h1 style={{ fontSize: "30px", fontWeight: "800", marginBottom: "10px" }}>
        Java Logging & Debugging
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn to record application events, inspect errors, use Java logging,
        and debug programs with breakpoints, watches, and stack traces.
      </p>

      {lessons.map((lesson, index) => (
        <section key={index} style={sectionStyle}>
          <h2 style={headingStyle}>{lesson.title}</h2>
          <div style={{ lineHeight: "1.7", marginBottom: "14px" }}>
            {lesson.content}
          </div>
          <pre style={codeStyle}>
            <code>{lesson.code}</code>
          </pre>
        </section>
      ))}

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Final Checklist</h2>
        <ul>
          <li>Understand logging levels and Logger.</li>
          <li>Log exceptions with useful stack traces.</li>
          <li>Use breakpoints and debugger controls.</li>
          <li>Inspect variables and watch expressions.</li>
          <li>Understand call stacks and stack traces.</li>
          <li>Know logging security and performance best practices.</li>
        </ul>
      </section>
    </div>
  );
}
