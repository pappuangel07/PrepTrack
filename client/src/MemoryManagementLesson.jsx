

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
    title: "1. What is memory management?",
    content: (
      <>
        <p>
          Memory management is the process of allocating, using, and
          releasing memory while a program runs.
        </p>
        <p>
          Java manages most object memory automatically through the
          Java Virtual Machine (JVM) and its garbage collector.
        </p>
        <ul>
          <li>Memory is allocated when objects and data are created.</li>
          <li>Objects are used while they are needed.</li>
          <li>Garbage collection reclaims eligible unused objects.</li>
        </ul>
      </>
    ),
    code: `Student s = new Student();

// Memory is allocated for the object.
// The variable s refers to that object.
// When the object becomes unreachable,
// it may eventually be garbage collected.`,
  },
  {
    title: "2. JVM memory overview",
    content: (
      <>
        <p>
          The JVM uses different runtime memory areas for different
          purposes.
        </p>
        <ul>
          <li>Heap — stores objects and arrays.</li>
          <li>Java stacks — hold method frames for each thread.</li>
          <li>Method area — stores class-level runtime information.</li>
          <li>PC register — tracks the current instruction per thread.</li>
          <li>Native method stacks — support native method execution.</li>
        </ul>
        <p>
          These are JVM runtime areas. Actual implementation details
          can vary between JVM implementations.
        </p>
      </>
    ),
    code: `JVM Runtime Memory

Heap
  -> Objects and arrays

Java Stack (per thread)
  -> Method frames
  -> Local variables
  -> Operand stack

Method Area
  -> Class metadata
  -> Runtime constant pool`,
  },
  {
    title: "3. Stack memory",
    content: (
      <>
        <p>
          Each Java thread has its own JVM stack.
          A method call creates a stack frame.
        </p>
        <p>
          A frame contains information such as local variables,
          intermediate calculations, and method execution state.
        </p>
        <p>
          When the method finishes, its frame is removed.
        </p>
      </>
    ),
    code: `void display() {
    int age = 19;
    double marks = 90.5;
}

// When display() runs:
// A frame is created for display().
// Local variables belong to that frame.
// When display() returns,
// its frame is removed.`,
  },
  {
    title: "4. Heap memory",
    content: (
      <>
        <p>
          The heap is the runtime area where objects and arrays
          are allocated.
        </p>
        <p>
          Heap memory is shared by Java threads.
          Objects can remain alive after the method that created
          them has returned, as long as they are still reachable.
        </p>
      </>
    ),
    code: `Student createStudent() {
    Student s = new Student();
    s.name = "Ravi";

    return s;
}

// The method frame disappears.
// The Student object can remain
// on the heap because the caller
// receives a reference to it.`,
  },
  {
    title: "5. Stack vs Heap",
    content: (
      <>
        <p>
          Stack and heap have different roles.
        </p>
        <ul>
          <li>Stack: method execution and local frame data.</li>
          <li>Heap: objects and arrays.</li>
          <li>Stack is private to each thread.</li>
          <li>Heap is shared between threads.</li>
          <li>Stack frames are removed as methods return.</li>
          <li>Heap objects are reclaimed when eligible for GC.</li>
        </ul>
        <p>
          Do not assume every local variable is physically stored
          in a stack slot. JVM optimizations may change the actual
          implementation.
        </p>
      </>
    ),
    code: `void example() {
    int x = 10;
    Student s = new Student();
}

// x is a local primitive variable.
// s is a local reference variable.
// The Student object is allocated
// as an object in the heap model.`,
  },
  {
    title: "6. Primitive variables and references",
    content: (
      <>
        <p>
          Primitive variables hold primitive values.
          Reference variables hold references to objects.
        </p>
        <p>
          A reference is not the object itself.
          Multiple references can refer to the same object.
        </p>
      </>
    ),
    code: `int a = 10;

Student s1 = new Student();
Student s2 = s1;

// s1 and s2 refer to the same object.

s1.name = "Ravi";

System.out.println(s2.name);
// Ravi`,
  },
  {
    title: "7. Object allocation",
    content: (
      <>
        <p>
          The new keyword commonly creates an object and returns
          a reference to it.
        </p>
        <p>
          The constructor initializes the object.
          The constructor itself does not allocate the object;
          object creation happens as part of the new expression.
        </p>
      </>
    ),
    code: `class Student {
    String name;

    Student(String name) {
        this.name = name;
    }
}

Student s =
    new Student("Priya");`,
  },
  {
    title: "8. What is garbage collection?",
    content: (
      <>
        <p>
          Garbage collection (GC) is the JVM's automatic process
          for reclaiming heap memory occupied by objects that
          are no longer reachable.
        </p>
        <p>
          The programmer usually does not manually free objects.
          GC timing is controlled by the JVM.
        </p>
      </>
    ),
    code: `Student s = new Student();

s = null;

// The object may now be eligible
// for garbage collection if no
// other reachable reference points
// to it.`,
  },
  {
    title: "9. Reachability",
    content: (
      <>
        <p>
          An object is reachable if the JVM can access it through
          a chain of references starting from a GC root.
        </p>
        <p>
          Common GC roots include active thread references,
          static references, and references held by the JVM.
        </p>
        <p>
          An object can be unreachable even if it still refers
          to other objects.
        </p>
      </>
    ),
    code: `Student a = new Student();
Student b = new Student();

a = null;
b = null;

// If no other reachable references
// point to these objects,
// they may become eligible for GC.`,
  },
  {
    title: "10. Eligible for GC does not mean collected immediately",
    content: (
      <>
        <p>
          Becoming unreachable only makes an object eligible
          for garbage collection.
        </p>
        <p>
          The JVM decides when and how to collect it.
          There is no guarantee that collection happens
          immediately or at all before the program exits.
        </p>
      </>
    ),
    code: `Object obj = new Object();

obj = null;

// Eligible for GC, assuming no
// other reachable reference exists.

// The object is not guaranteed
// to be collected immediately.`,
  },
  {
    title: "11. System.gc()",
    content: (
      <>
        <p>
          System.gc() requests that the JVM consider performing
          garbage collection.
        </p>
        <p>
          It is only a request. The JVM may ignore it.
          Do not use it as a reliable way to free memory.
        </p>
      </>
    ),
    code: `System.gc();

// This does not guarantee that
// garbage collection will occur.`,
  },
  {
    title: "12. Object references and aliasing",
    content: (
      <>
        <p>
          Aliasing occurs when multiple variables refer to
          the same object.
        </p>
        <p>
          Updating the object through one reference is visible
          through the other reference.
        </p>
      </>
    ),
    code: `class Box {
    int value;
}

Box a = new Box();
a.value = 10;

Box b = a;
b.value = 50;

System.out.println(a.value);
// 50`,
  },
  {
    title: "13. Null references",
    content: (
      <>
        <p>
          null means a reference does not currently refer
          to an object.
        </p>
        <p>
          Accessing an instance field or calling an instance
          method through null causes NullPointerException.
        </p>
      </>
    ),
    code: `Student s = null;

// Throws NullPointerException:
// System.out.println(s.name);

// Safe check:
if (s != null) {
    System.out.println(s.name);
}`,
  },
  {
    title: "14. What is a memory leak in Java?",
    content: (
      <>
        <p>
          A memory leak occurs when a program keeps references
          to objects that it no longer needs.
        </p>
        <p>
          Those objects remain reachable, so the garbage
          collector cannot reclaim them.
        </p>
        <p>
          Java can have memory leaks even though it has
          automatic garbage collection.
        </p>
      </>
    ),
    code: `static List<Object> cache =
    new ArrayList<>();

void addData() {
    for (int i = 0; i < 100000; i++) {
        cache.add(new Object());
    }
}

// If entries are never removed,
// the static list keeps references
// to all those objects.`,
  },
  {
    title: "15. Common causes of memory leaks",
    content: (
      <>
        <ul>
          <li>Unbounded static collections.</li>
          <li>Listeners or callbacks never removed.</li>
          <li>Long-lived caches without eviction.</li>
          <li>ThreadLocal values not cleared when needed.</li>
          <li>References kept by background threads.</li>
          <li>Objects retained unintentionally by closures.</li>
        </ul>
      </>
    ),
    code: `// Risky:
static Map<String, Object> cache =
    new HashMap<>();

void store(String key, Object value) {
    cache.put(key, value);
}

// If the cache grows without limit,
// memory usage can keep increasing.`,
  },
  {
    title: "16. How to prevent memory leaks",
    content: (
      <>
        <ul>
          <li>Remove objects from collections when no longer needed.</li>
          <li>Use bounded caches with eviction policies.</li>
          <li>Unregister listeners and callbacks.</li>
          <li>Stop unnecessary background threads.</li>
          <li>Clean up ThreadLocal values when appropriate.</li>
          <li>Use profiling tools to identify retained objects.</li>
        </ul>
      </>
    ),
    code: `cache.remove(key);

// For a listener:
source.removeListener(listener);

// For ThreadLocal:
threadLocal.remove();`,
  },
  {
    title: "17. Strong references",
    content: (
      <>
        <p>
          A normal reference is a strong reference.
          An object with a strong reference from a GC root
          remains reachable.
        </p>
        <p>
          Strong references are the default and are used
          in most Java programs.
        </p>
      </>
    ),
    code: `Student s = new Student();

// Strong reference:
s = null;

// If no other reachable strong
// path or other GC-relevant
// reference keeps the object alive,
// it may become eligible for GC.`,
  },
  {
    title: "18. Weak references",
    content: (
      <>
        <p>
          A WeakReference does not by itself keep an object
          alive against garbage collection.
        </p>
        <p>
          Weak references are useful in some memory-sensitive
          structures, but they are not a universal cache solution.
        </p>
      </>
    ),
    code: `import java.lang.ref.WeakReference;

Student s = new Student();

WeakReference<Student> weak =
    new WeakReference<>(s);

s = null;

// The object may be collected.
// weak.get() may return null.`,
  },
  {
    title: "19. Soft and phantom references",
    content: (
      <>
        <p>
          Soft references may be cleared at the JVM's discretion
          in response to memory demand.
        </p>
        <p>
          Phantom references are used with reference queues
          for advanced post-reachability cleanup tracking.
          They do not provide access to the object itself.
        </p>
        <p>
          For most application code, prefer ordinary references
          and well-designed resource management.
        </p>
      </>
    ),
    code: `// Reference types:
Strong reference
WeakReference
SoftReference
PhantomReference

// Soft and phantom references
// have specialized use cases.
// They are not substitutes for
// proper cache/resource design.`,
  },
  {
    title: "20. finalize() and its problems",
    content: (
      <>
        <p>
          Object.finalize() was historically associated with
          cleanup before an object was reclaimed.
        </p>
        <p>
          Finalization is deprecated for removal and should
          not be used for resource cleanup.
        </p>
        <p>
          It is unpredictable, can delay reclamation,
          and can create serious correctness problems.
        </p>
      </>
    ),
    code: `// Do not use finalize() for cleanup.

// Prefer try-with-resources
// for resources implementing
// AutoCloseable.`,
  },
  {
    title: "21. try-with-resources",
    content: (
      <>
        <p>
          Garbage collection manages memory.
          It does not guarantee timely release of files,
          sockets, database connections, or other external resources.
        </p>
        <p>
          try-with-resources automatically calls close()
          on resources that implement AutoCloseable.
        </p>
      </>
    ),
    code: `try (BufferedReader reader =
        new BufferedReader(
            new FileReader("data.txt"))) {

    System.out.println(reader.readLine());

} catch (IOException e) {
    e.printStackTrace();
}`,
  },
  {
    title: "22. StackOverflowError",
    content: (
      <>
        <p>
          StackOverflowError occurs when a thread's stack
          cannot accommodate further method frames.
        </p>
        <p>
          A common cause is deep or infinite recursion.
        </p>
      </>
    ),
    code: `static void callAgain() {
    callAgain();
}

// This recursion has no base case.
// It eventually causes StackOverflowError.`,
  },
  {
    title: "23. OutOfMemoryError",
    content: (
      <>
        <p>
          OutOfMemoryError occurs when the JVM cannot
          allocate memory as required.
        </p>
        <p>
          It can happen because of excessive object allocation,
          memory leaks, insufficient heap limits, or other
          runtime memory constraints.
        </p>
        <p>
          It is an Error, not an ordinary Exception.
        </p>
      </>
    ),
    code: `List<byte[]> data =
    new ArrayList<>();

while (true) {
    data.add(new byte[1024 * 1024]);
}

// This may eventually cause
// OutOfMemoryError.`,
  },
  {
    title: "24. Heap generations",
    content: (
      <>
        <p>
          Many garbage collectors use generational collection
          strategies based on the observation that many objects
          become unreachable quickly.
        </p>
        <ul>
          <li>Young generation — commonly contains newly allocated objects.</li>
          <li>Old generation — commonly contains longer-lived objects.</li>
        </ul>
        <p>
          Exact heap organization depends on the selected
          garbage collector and JVM implementation.
        </p>
      </>
    ),
    code: `Typical generational idea:

New objects
    ↓
Young generation
    ↓ survive collections
Old generation

// This is a conceptual model.
// JVM collector details vary.`,
  },
  {
    title: "25. Minor, major, and full GC",
    content: (
      <>
        <p>
          These terms are commonly used to describe different
          collection scopes, but their exact meanings can vary
          by garbage collector and JVM.
        </p>
        <ul>
          <li>Young or minor collection — focuses on young objects.</li>
          <li>Old or major collection — often refers to old-generation collection.</li>
          <li>Full GC — usually involves a broader heap collection.</li>
        </ul>
        <p>
          Do not assume every collector uses exactly the same
          definitions or collection behavior.
        </p>
      </>
    ),
    code: `// GC terminology varies by collector.

// A GC event may collect:
// - young generation
// - old generation
// - multiple heap regions
// - or the entire heap`,
  },
  {
    title: "26. Stop-the-world pauses",
    content: (
      <>
        <p>
          Some garbage collection phases pause application
          threads. These are called stop-the-world pauses.
        </p>
        <p>
          Modern collectors try to reduce pause duration
          and perform some work concurrently.
        </p>
        <p>
          GC tuning often balances throughput, memory use,
          and pause-time goals.
        </p>
      </>
    ),
    code: `GC goals:

Throughput
  -> More time doing application work

Latency
  -> Shorter pauses

Memory footprint
  -> Less memory used

// These goals can trade off
// against one another.`,
  },
  {
    title: "27. Escape analysis",
    content: (
      <>
        <p>
          Escape analysis is a JVM optimization that determines
          whether an object reference escapes a method or thread.
        </p>
        <p>
          Depending on the implementation and optimization,
          the JVM may eliminate some allocations or optimize
          how objects are represented.
        </p>
        <p>
          Do not assume every object created with new must
          physically reside on the heap in every optimized execution.
        </p>
      </>
    ),
    code: `int calculate() {
    Point p = new Point(3, 4);

    return p.x + p.y;
}

// A JIT compiler may optimize
// away the Point allocation
// if it can prove the object
// does not need to escape.`,
  },
  {
    title: "28. String pool and memory",
    content: (
      <>
        <p>
          String literals are interned by Java.
          Identical string literals can refer to the same
          pooled String object.
        </p>
        <p>
          Strings are immutable. Operations that appear to
          modify a String create or return another String.
        </p>
      </>
    ),
    code: `String a = "Java";
String b = "Java";

System.out.println(a == b);
// true for these interned literals

String c = new String("Java");

System.out.println(a == c);
// false: different references

System.out.println(a.equals(c));
// true: same content`,
  },
  {
    title: "29. Memory management best practices",
    content: (
      <>
        <ul>
          <li>Do not rely on System.gc().</li>
          <li>Do not use finalize() for cleanup.</li>
          <li>Close files, sockets, and DB connections explicitly.</li>
          <li>Avoid unbounded collections and caches.</li>
          <li>Remove listeners when they are no longer needed.</li>
          <li>Use profiling tools to investigate memory growth.</li>
          <li>Understand reachability instead of setting every variable to null.</li>
          <li>Choose GC settings based on measured application behavior.</li>
        </ul>
      </>
    ),
    code: `// Good resource management:
try (Connection connection =
        DriverManager.getConnection(url)) {

    // Use connection

} catch (SQLException e) {
    e.printStackTrace();
}`,
  },
  {
    title: "30. Practice problems",
    content: (
      <>
        <ol>
          <li>Draw the stack and heap for a simple object program.</li>
          <li>Explain what happens when a reference is set to null.</li>
          <li>Show two references pointing to the same object.</li>
          <li>Create an example of a memory leak using a static list.</li>
          <li>Explain why an unreachable object may not be collected immediately.</li>
          <li>Demonstrate WeakReference.</li>
          <li>Write a recursive method that causes StackOverflowError.</li>
          <li>Explain the difference between StackOverflowError and OutOfMemoryError.</li>
          <li>Use try-with-resources to close a file.</li>
          <li>Explain how a long-lived static collection can retain objects.</li>
        </ol>
      </>
    ),
    code: `// Practice: object references

class Box {
    int value;
}

Box a = new Box();
a.value = 10;

Box b = a;
b.value = 20;

System.out.println(a.value);

// Predict the output and explain
// why both references see it.`,
  },
  {
    title: "31. Interview questions",
    content: (
      <>
        <ol>
          <li>What is JVM memory management?</li>
          <li>Explain stack and heap memory.</li>
          <li>Where are objects allocated?</li>
          <li>What is a reference variable?</li>
          <li>What is garbage collection?</li>
          <li>When does an object become eligible for GC?</li>
          <li>Does System.gc() guarantee collection?</li>
          <li>What is a memory leak in Java?</li>
          <li>What are GC roots?</li>
          <li>What is the difference between strong and weak references?</li>
          <li>What are soft and phantom references?</li>
          <li>Why should finalize() be avoided?</li>
          <li>What is try-with-resources?</li>
          <li>What causes StackOverflowError?</li>
          <li>What causes OutOfMemoryError?</li>
          <li>What is generational garbage collection?</li>
          <li>What is a stop-the-world pause?</li>
          <li>What is escape analysis?</li>
          <li>How does the String pool work?</li>
          <li>How do you investigate memory leaks?</li>
        </ol>
      </>
    ),
    code: `// Quick revision

Stack -> per-thread method frames
Heap -> objects and arrays
GC -> reclaims unreachable objects
Reachability -> path from GC roots
Memory leak -> unnecessary retained objects
System.gc() -> request only
WeakReference -> does not keep object alive
try-with-resources -> closes resources
StackOverflowError -> stack exhaustion
OutOfMemoryError -> allocation failure`,
  },
];

export default function MemoryManagementLesson({ onBack }) {
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
        Java Memory Management & Garbage Collection
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn JVM memory areas, stack and heap, object references,
        reachability, garbage collection, memory leaks, reference types,
        and JVM memory errors.
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
          <li>I understand JVM memory areas.</li>
          <li>I can explain stack vs heap.</li>
          <li>I understand references and object reachability.</li>
          <li>I know when objects become eligible for GC.</li>
          <li>I understand memory leaks in Java.</li>
          <li>I know strong, weak, soft, and phantom references.</li>
          <li>I understand StackOverflowError and OutOfMemoryError.</li>
          <li>I can explain GC basics and stop-the-world pauses.</li>
          <li>I know how to manage external resources safely.</li>
        </ul>
      </section>
    </div>
  );
}
