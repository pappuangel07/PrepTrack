

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
    title: "1. How to Answer Java Interview Questions",
    content: (
      <>
        <p>
          A strong interview answer is not just a definition.
          Explain the concept, why it exists, how it works,
          and where you would use it.
        </p>
        <ol>
          <li>Give a clear definition.</li>
          <li>Explain the internal working.</li>
          <li>Give a small example.</li>
          <li>Mention advantages and limitations.</li>
          <li>Connect it to a real use case.</li>
        </ol>
        <p>
          Avoid memorized paragraphs. Interviewers often
          change one condition to check whether you
          actually understand the concept.
        </p>
      </>
    ),
    code: `Question: What is polymorphism?

Answer structure:
1. Definition
2. Compile-time and runtime types
3. Small example
4. Use case
5. Important limitation`,
  },
  {
    title: "2. Java Fundamentals — Must Know",
    content: (
      <>
        <p>Prepare clear answers for:</p>
        <ul>
          <li>What is Java?</li>
          <li>Why is Java platform-independent?</li>
          <li>What is bytecode?</li>
          <li>JDK vs JVM?</li>
          <li>Primitive vs reference types?</li>
          <li>What is type casting?</li>
          <li>What is the difference between == and equals()?</li>
          <li>Why is String immutable?</li>
        </ul>
      </>
    ),
    code: `int a = 10;
int b = 10;

System.out.println(a == b); // true

String x = new String("Java");
String y = new String("Java");

System.out.println(x == y);      // false
System.out.println(x.equals(y)); // true`,
  },
  {
    title: "3. OOP Interview Questions",
    content: (
      <>
        <p>Know these concepts deeply:</p>
        <ul>
          <li>Class and object</li>
          <li>Encapsulation</li>
          <li>Inheritance</li>
          <li>Polymorphism</li>
          <li>Abstraction</li>
          <li>Interface vs abstract class</li>
          <li>Overloading vs overriding</li>
          <li>Composition vs inheritance</li>
        </ul>
        <p>
          Don't simply say "encapsulation means data hiding."
          Explain how access modifiers and methods help
          control access to an object's state.
        </p>
      </>
    ),
    code: `class Account {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public double getBalance() {
        return balance;
    }
}`,
  },
  {
    title: "4. Overloading vs Overriding",
    content: (
      <>
        <p>
          Overloading means using the same method name
          with different parameter lists.
        </p>
        <p>
          Overriding means a subclass provides its own
          implementation of an inherited instance method.
        </p>
        <p>
          Overloading is resolved at compile time.
          Overridden instance methods use runtime
          dynamic dispatch.
        </p>
      </>
    ),
    code: `class Printer {
    void print(int value) {
        System.out.println(value);
    }

    void print(String value) {
        System.out.println(value);
    }
}

class Animal {
    void sound() {
        System.out.println("Animal");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Bark");
    }
}`,
  },
  {
    title: "5. String Interview Questions",
    content: (
      <>
        <ul>
          <li>Why is String immutable?</li>
          <li>String vs StringBuilder vs StringBuffer?</li>
          <li>What is the String pool?</li>
          <li>What does intern() do?</li>
          <li>How do you reverse a string?</li>
          <li>How do you check a palindrome?</li>
          <li>How do you count character frequencies?</li>
        </ul>
        <p>
          Use StringBuilder for repeated string modifications
          in a single thread when mutable string building
          is appropriate.
        </p>
      </>
    ),
    code: `StringBuilder result = new StringBuilder();

for (int i = 0; i < 5; i++) {
    result.append(i);
}

System.out.println(result);`,
  },
  {
    title: "6. Collections Framework",
    content: (
      <>
        <p>Know the differences and use cases:</p>
        <ul>
          <li>List vs Set vs Map</li>
          <li>ArrayList vs LinkedList</li>
          <li>HashMap vs TreeMap</li>
          <li>HashSet vs TreeSet</li>
          <li>Queue vs Deque</li>
          <li>Comparable vs Comparator</li>
          <li>Fail-fast iterators</li>
          <li>HashMap hashing and collisions</li>
        </ul>
        <p>
          Be ready to justify your collection choice
          based on lookup, insertion, ordering,
          duplicates, and memory requirements.
        </p>
      </>
    ),
    code: `Map<String, Integer> counts = new HashMap<>();

counts.put("Java", 3);
counts.put("Python", 2);

System.out.println(counts.get("Java"));

Set<Integer> unique = new HashSet<>();
unique.add(10);
unique.add(10);

System.out.println(unique.size()); // 1`,
  },
  {
    title: "7. HashMap Internals",
    content: (
      <>
        <p>
          HashMap uses a hash to help determine where
          a key-value entry should be stored.
        </p>
        <p>
          Keys that map to the same bucket are handled
          through collision-resolution mechanisms.
          In modern OpenJDK implementations, heavily
          populated buckets may use tree structures
          under certain conditions.
        </p>
        <p>
          HashMap allows one null key and multiple null
          values. It is not synchronized by default.
        </p>
      </>
    ),
    code: `Map<String, Integer> map = new HashMap<>();

map.put("A", 10);
map.put("B", 20);

map.put("A", 99);

// Existing key is updated.
System.out.println(map.get("A")); // 99`,
  },
  {
    title: "8. Exception Handling",
    content: (
      <>
        <ul>
          <li>Checked vs unchecked exceptions</li>
          <li>Exception vs Error</li>
          <li>throw vs throws</li>
          <li>try-catch-finally</li>
          <li>Try-with-resources</li>
          <li>Custom exceptions</li>
        </ul>
        <p>
          Catch exceptions you can meaningfully handle.
          Don't use empty catch blocks to hide failures.
        </p>
      </>
    ),
    code: `try {
    int result = 10 / 0;
    System.out.println(result);
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}`,
  },
  {
    title: "9. JVM and Memory",
    content: (
      <>
        <ul>
          <li>JVM runtime memory areas</li>
          <li>Heap vs stack</li>
          <li>Class loading</li>
          <li>JIT compiler</li>
          <li>Garbage collection</li>
          <li>GC roots and reachability</li>
          <li>StackOverflowError</li>
          <li>OutOfMemoryError</li>
        </ul>
        <p>
          Be careful: garbage collection does not mean
          every object without a local variable is
          immediately deleted. Reachability matters.
        </p>
      </>
    ),
    code: `Student first = new Student();
Student second = first;

first = null;

// Still reachable through second.

second = null;

// May now be eligible for GC.`,
  },
  {
    title: "10. Multithreading",
    content: (
      <>
        <ul>
          <li>Process vs thread</li>
          <li>Thread lifecycle</li>
          <li>Runnable vs Thread</li>
          <li>synchronized</li>
          <li>Race condition</li>
          <li>Deadlock</li>
          <li>volatile</li>
          <li>ExecutorService</li>
          <li>Callable and Future</li>
        </ul>
        <p>
          Understand the difference between visibility,
          atomicity, and mutual exclusion.
          They are related but not interchangeable.
        </p>
      </>
    ),
    code: `class Counter {
    private int count = 0;

    synchronized void increment() {
        count++;
    }

    synchronized int getCount() {
        return count;
    }
}`,
  },
  {
    title: "11. Lambda and Stream API",
    content: (
      <>
        <ul>
          <li>Functional interface</li>
          <li>Lambda expression</li>
          <li>Method reference</li>
          <li>Intermediate vs terminal operations</li>
          <li>Lazy evaluation</li>
          <li>map() vs flatMap()</li>
          <li>filter() and reduce()</li>
          <li>Parallel streams and their trade-offs</li>
        </ul>
        <p>
          Streams process data; they are not collections
          and do not normally store elements themselves.
        </p>
      </>
    ),
    code: `List<Integer> numbers =
    Arrays.asList(1, 2, 3, 4, 5);

List<Integer> squares = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .collect(Collectors.toList());

System.out.println(squares); // [4, 16]`,
  },
  {
    title: "12. Generics",
    content: (
      <>
        <ul>
          <li>Why generics are used</li>
          <li>Generic classes and methods</li>
          <li>Type safety</li>
          <li>Bounded type parameters</li>
          <li>Wildcards</li>
          <li>PECS: Producer Extends, Consumer Super</li>
          <li>Type erasure</li>
        </ul>
      </>
    ),
    code: `class Box<T> {
    private T value;

    void set(T value) {
        this.value = value;
    }

    T get() {
        return value;
    }
}

Box<String> box = new Box<>();
box.set("Java");`,
  },
  {
    title: "13. Coding Patterns to Practice",
    content: (
      <>
        <p>For placement coding rounds, practice:</p>
        <ul>
          <li>Frequency counting using HashMap</li>
          <li>Two pointers</li>
          <li>Sliding window</li>
          <li>Binary search</li>
          <li>Prefix sum</li>
          <li>Stack-based problems</li>
          <li>Queue and BFS</li>
          <li>Recursion and backtracking</li>
          <li>Basic dynamic programming</li>
        </ul>
        <p>
          Learn when a pattern applies. Memorizing
          solutions without recognizing the pattern
          will fail on modified questions.
        </p>
      </>
    ),
    code: `// Two pointers: sorted array
int left = 0;
int right = numbers.length - 1;

while (left < right) {
    int sum = numbers[left] + numbers[right];

    if (sum == target) {
        break;
    } else if (sum < target) {
        left++;
    } else {
        right--;
    }
}`,
  },
  {
    title: "14. Time and Space Complexity",
    content: (
      <>
        <p>
          Explain complexity using input size n.
          Identify how many times operations execute
          and whether additional memory grows with n.
        </p>
        <ul>
          <li>O(1): constant</li>
          <li>O(log n): logarithmic</li>
          <li>O(n): linear</li>
          <li>O(n log n): common efficient sorting growth</li>
          <li>O(n²): nested linear work</li>
        </ul>
        <p>
          Big-O describes growth, not exact runtime
          on every machine.
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
}`,
  },
  {
    title: "15. Project-Based Interview Questions",
    content: (
      <>
        <p>
          Interviewers may ask about your project
          to check whether you built and understand it.
        </p>
        <ul>
          <li>What problem does your project solve?</li>
          <li>Why did you choose this tech stack?</li>
          <li>Explain the architecture.</li>
          <li>How does the frontend communicate with backend?</li>
          <li>How is data stored?</li>
          <li>How do you validate user input?</li>
          <li>What was your hardest bug?</li>
          <li>What would you improve next?</li>
        </ul>
        <p>
          Know your own code. Claiming a feature you
          cannot explain is an avoidable interview failure.
        </p>
      </>
    ),
    code: `Project explanation structure:

1. Problem
2. Users
3. Features
4. Architecture
5. Database
6. API flow
7. Challenges
8. Improvements`,
  },
  {
    title: "16. Mock Interview Practice",
    content: (
      <>
        <p>
          Practice answering aloud. Set a timer and
          avoid looking at notes during the first attempt.
        </p>
        <ol>
          <li>Explain JVM in 60 seconds.</li>
          <li>Explain HashMap in 2 minutes.</li>
          <li>Compare ArrayList and LinkedList.</li>
          <li>Explain overriding with code.</li>
          <li>Explain a race condition.</li>
          <li>Solve one array problem in 25 minutes.</li>
          <li>Explain your solution's complexity.</li>
          <li>Discuss one project in 3 minutes.</li>
        </ol>
      </>
    ),
    code: `After every mock, record:

- Question
- What I answered
- What I missed
- Correct explanation
- Follow-up question
- Date to revise`,
  },
  {
    title: "17. Revision Strategy",
    content: (
      <>
        <p>
          Don't revise all Java topics equally every day.
          Prioritize weak areas and topics frequently
          used in coding and interviews.
        </p>
        <ul>
          <li>Review notes briefly.</li>
          <li>Answer questions without looking.</li>
          <li>Write code from memory.</li>
          <li>Explain the solution aloud.</li>
          <li>Track mistakes and revisit them.</li>
        </ul>
        <p>
          A topic is not complete because you watched
          a video. It is complete when you can explain
          it and use it independently.
        </p>
      </>
    ),
    code: `Revision session:

10 min - Recall concepts
20 min - Write code
15 min - Interview questions
15 min - Review mistakes`,
  },
];

export default function JavaInterviewPreparationLesson({ onBack }) {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <button
        onClick={onBack}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid var(--border, #e5e7eb)",
          background: "var(--card, #ffffff)",
          color: "var(--text, #111827)",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back to Java
      </button>

      <h1
        style={{
          fontSize: "30px",
          fontWeight: "800",
          marginBottom: "10px",
        }}
      >
        Java Interview Preparation & Revision
      </h1>

      <p
        style={{
          color: "var(--muted, #6b7280)",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        Revise core Java concepts, explain internal
        workings, solve coding problems, and prepare
        to discuss your projects confidently.
      </p>

      {lessons.map((lesson, index) => (
        <section key={index} style={sectionStyle}>
          <h2 style={headingStyle}>{lesson.title}</h2>

          <div
            style={{
              lineHeight: "1.7",
              marginBottom: "14px",
            }}
          >
            {lesson.content}
          </div>

          <pre style={codeStyle}>
            <code>{lesson.code}</code>
          </pre>
        </section>
      ))}

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Final Interview Checklist</h2>

        <ul style={{ lineHeight: "1.8" }}>
          <li>Explain core Java without memorized scripts.</li>
          <li>Write OOP examples independently.</li>
          <li>Understand collections and their trade-offs.</li>
          <li>Explain JVM memory and garbage collection.</li>
          <li>Understand concurrency basics.</li>
          <li>Write common coding patterns in Java.</li>
          <li>Analyze time and space complexity.</li>
          <li>Explain your own project architecture and code.</li>
          <li>Complete mock interviews and review mistakes.</li>
        </ul>
      </section>
    </div>
  );
}
