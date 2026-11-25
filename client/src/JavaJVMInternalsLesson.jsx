

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
    title: "1. What Is the JVM?",
    content: (
      <>
        <p>
          JVM stands for Java Virtual Machine. It provides
          a runtime environment that executes Java bytecode.
        </p>
        <p>
          The JVM is part of the Java runtime implementation.
          It manages class loading, execution, memory, and
          garbage collection.
        </p>
        <p>
          The JVM specification defines behavior, while
          different implementations may use different
          internal techniques.
        </p>
      </>
    ),
    code: `// Java source
class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}

// Compile:
// javac Main.java
//
// Run:
// java Main`,
  },
  {
    title: "2. JDK vs JRE vs JVM",
    content: (
      <>
        <p>
          JVM executes bytecode.
        </p>
        <p>
          The Java runtime environment provides the JVM
          and runtime libraries needed to run applications.
        </p>
        <p>
          The JDK includes development tools such as
          the Java compiler and runtime components.
        </p>
      </>
    ),
    code: `JDK
 ├── Development tools
 └── Runtime components
      ├── JVM
      └── Java libraries

// javac: compiler
// java: application launcher`,
  },
  {
    title: "3. Java Compilation Process",
    content: (
      <>
        <p>
          Java source code is compiled into bytecode.
          The JVM loads and executes that bytecode.
        </p>
        <p>
          Bytecode is not machine code for one specific
          processor. A JVM implementation translates or
          executes it for its environment.
        </p>
      </>
    ),
    code: `Main.java
    |
    | javac
    v
Main.class
(Bytecode)
    |
    | JVM
    v
Execution on the machine`,
  },
  {
    title: "4. Bytecode",
    content: (
      <>
        <p>
          Bytecode is the instruction format stored in
          compiled Java class files.
        </p>
        <p>
          It contains instructions for operations such as
          loading values, invoking methods, and returning
          results.
        </p>
        <p>
          You can inspect bytecode using the javap tool.
        </p>
      </>
    ),
    code: `javac Main.java

javap -c Main

// -c displays bytecode instructions
// for methods in the class`,
  },
  {
    title: "5. Class Loader Subsystem",
    content: (
      <>
        <p>
          The class loader subsystem loads class definitions
          into the JVM when they are needed.
        </p>
        <p>
          Class loading involves loading, linking, and
          initialization.
        </p>
        <p>
          Linking includes verification, preparation,
          and resolution.
        </p>
      </>
    ),
    code: `Class loading lifecycle:
//
// Loading
//    |
//    v
// Linking
//    |
//    +-- Verification
//    +-- Preparation
//    +-- Resolution
//    |
//    v
// Initialization`,
  },
  {
    title: "6. Class Loader Types",
    content: (
      <>
        <p>
          Common built-in class loaders include:
        </p>
        <ul>
          <li>
            Bootstrap Class Loader: loads core platform
            classes.
          </li>
          <li>
            Platform Class Loader: loads platform classes.
          </li>
          <li>
            Application Class Loader: loads application
            classes from the application class path or
            module path.
          </li>
        </ul>
        <p>
          Exact implementation details can vary by JVM.
        </p>
      </>
    ),
    code: `ClassLoader loader =
    Main.class.getClassLoader();

System.out.println(loader);

// A class loaded by the bootstrap loader
// may return null from getClassLoader().`,
  },
  {
    title: "7. Parent Delegation",
    content: (
      <>
        <p>
          In the usual parent-delegation model, a class
          loader asks its parent to load a class before
          attempting to load it itself.
        </p>
        <p>
          This helps avoid accidentally replacing core
          platform classes with application classes.
        </p>
        <p>
          Custom class loaders can implement different
          loading strategies.
        </p>
      </>
    ),
    code: `Application Class Loader
          |
          v
Platform Class Loader
          |
          v
Bootstrap Class Loader

// Delegation usually proceeds
// toward the parent first.`,
  },
  {
    title: "8. JVM Runtime Memory Areas",
    content: (
      <>
        <p>
          The JVM defines several runtime data areas.
          Some are shared across threads, while others
          belong to individual threads.
        </p>
        <ul>
          <li>Heap</li>
          <li>Method area</li>
          <li>Java stacks</li>
          <li>PC registers</li>
          <li>Native method stacks</li>
        </ul>
      </>
    ),
    code: `Shared:
- Heap
- Method area

Per thread:
- Java stack
- PC register
- Native method stack`,
  },
  {
    title: "9. Heap Memory",
    content: (
      <>
        <p>
          The heap is the runtime area from which objects
          and arrays are generally allocated.
        </p>
        <p>
          The heap is shared among application threads.
          Garbage collection reclaims memory occupied by
          objects that are no longer reachable.
        </p>
        <p>
          Heap organization and collector algorithms depend
          on the JVM implementation.
        </p>
      </>
    ),
    code: `Student student = new Student();

// Conceptually:
// 1. A Student object is allocated.
// 2. The reference is stored in student.
// 3. The object is reachable through student.`,
  },
  {
    title: "10. Java Stack",
    content: (
      <>
        <p>
          Each thread has its own Java stack.
        </p>
        <p>
          A method invocation creates a stack frame.
          A frame stores information such as local variables,
          operand stack data, and method execution state.
        </p>
        <p>
          Frames are removed when their method calls return.
        </p>
      </>
    ),
    code: `void first() {
    second();
}

void second() {
    third();
}

void third() {
    // Current call stack:
    //
    // third()
    // second()
    // first()
}`,
  },
  {
    title: "11. Stack Overflow",
    content: (
      <>
        <p>
          StackOverflowError may occur when a thread's
          stack cannot accommodate additional frames.
        </p>
        <p>
          Deep or infinite recursion is a common cause.
        </p>
        <p>
          Increasing stack size is not a substitute for
          fixing uncontrolled recursion.
        </p>
      </>
    ),
    code: `static void repeat() {
    repeat();
}

// This never reaches a base case.
// It can eventually cause StackOverflowError.`,
  },
  {
    title: "12. Method Area and Metaspace",
    content: (
      <>
        <p>
          The JVM specification defines a method area
          for class-level structures.
        </p>
        <p>
          HotSpot commonly uses native memory called
          Metaspace for class metadata.
        </p>
        <p>
          Metaspace is not the same thing as the Java heap.
          Static fields and class metadata should not be
          simplistically described as all living in one
          universal memory location across JVMs.
        </p>
      </>
    ),
    code: `// HotSpot example option:
-XX:MaxMetaspaceSize=256m

// This limits Metaspace usage.
// It is not a general heap-size option.`,
  },
  {
    title: "13. PC Register",
    content: (
      <>
        <p>
          Each JVM thread has a program counter register.
        </p>
        <p>
          It tracks the current JVM instruction being
          executed by that thread.
        </p>
        <p>
          For a thread executing a non-native method,
          the PC identifies the current bytecode instruction.
        </p>
      </>
    ),
    code: `Thread A -> instruction 12
Thread B -> instruction 45

// Each thread has its own
// execution position.`,
  },
  {
    title: "14. Native Method Stack",
    content: (
      <>
        <p>
          Native method stacks support native methods
          implemented outside the JVM bytecode model,
          often using languages such as C or C++.
        </p>
        <p>
          Their exact implementation is JVM-dependent.
        </p>
      </>
    ),
    code: `// Java may declare a native method:
public native int calculate();

// The implementation is supplied
// through a native interface such as JNI.`,
  },
  {
    title: "15. Execution Engine",
    content: (
      <>
        <p>
          The execution engine executes bytecode.
        </p>
        <p>
          JVM implementations may use interpretation,
          just-in-time compilation, or a combination.
        </p>
        <p>
          HotSpot commonly uses adaptive techniques
          to optimize frequently executed code.
        </p>
      </>
    ),
    code: `Bytecode
   |
   v
Execution Engine
   |
   +-- Interpreter
   |
   +-- JIT Compiler
   |
   v
Machine-level execution`,
  },
  {
    title: "16. Interpreter",
    content: (
      <>
        <p>
          An interpreter executes bytecode instructions
          without first compiling the entire method into
          native machine code.
        </p>
        <p>
          Interpretation can provide quick startup,
          but repeatedly interpreting hot code may be
          less efficient than optimized native code.
        </p>
      </>
    ),
    code: `// Conceptual execution:
//
// Read bytecode instruction
// Execute its operation
// Move to next instruction`,
  },
  {
    title: "17. JIT Compiler",
    content: (
      <>
        <p>
          JIT means Just-In-Time compilation.
        </p>
        <p>
          A JIT compiler compiles selected bytecode
          into native machine code during runtime.
        </p>
        <p>
          Frequently executed code may be optimized
          using runtime profiling information.
        </p>
      </>
    ),
    code: `Cold method:
Bytecode may be interpreted.

Hot method:
May be compiled and optimized
into native machine code.

// Exact thresholds and strategies
// depend on the JVM and configuration.`,
  },
  {
    title: "18. JIT Optimizations",
    content: (
      <>
        <p>
          JIT compilers may perform optimizations such as:
        </p>
        <ul>
          <li>Method inlining</li>
          <li>Dead-code elimination</li>
          <li>Loop optimizations</li>
          <li>Escape analysis</li>
          <li>Scalar replacement</li>
        </ul>
        <p>
          These optimizations depend on the code,
          runtime profile, and compiler.
        </p>
      </>
    ),
    code: `// Method inlining idea:
//
// Before:
calculate() -> call helper()
//
// After optimization:
calculate() -> helper logic inserted
//
// This can reduce call overhead
// and enable further optimization.`,
  },
  {
    title: "19. Garbage Collection",
    content: (
      <>
        <p>
          Garbage collection automatically reclaims
          memory occupied by objects that are no longer
          reachable from relevant GC roots.
        </p>
        <p>
          It does not simply remove every object that
          has no variable name.
        </p>
        <p>
          Objects may remain reachable through fields,
          arrays, static references, or active stack frames.
        </p>
      </>
    ),
    code: `Student a = new Student();
Student b = a;

a = null;

// The object is still reachable
// through b.

b = null;

// It may now become eligible
// for garbage collection.`,
  },
  {
    title: "20. GC Roots and Reachability",
    content: (
      <>
        <p>
          GC roots are starting points used by the
          garbage collector to determine reachability.
        </p>
        <p>
          Examples include references from active
          thread stacks, static fields, and certain
          JVM-internal structures.
        </p>
        <p>
          An object is collectible when it is no longer
          reachable through the relevant reachability
          analysis.
        </p>
      </>
    ),
    code: `GC Root
   |
   v
Object A
   |
   v
Object B

// If the root-to-object path disappears,
// the objects may become unreachable.`,
  },
  {
    title: "21. Generational Garbage Collection",
    content: (
      <>
        <p>
          Many garbage collectors use generational
          techniques based on the observation that
          many objects die young.
        </p>
        <p>
          A generational heap may distinguish young
          and old object regions.
        </p>
        <p>
          Exact regions and policies vary by collector.
        </p>
      </>
    ),
    code: `Conceptual generational heap:
//
// Young generation
//   - New objects
//
// Old generation
//   - Objects surviving longer
//
// Objects may be promoted
// according to collector policy.`,
  },
  {
    title: "22. Common Garbage Collectors",
    content: (
      <>
        <p>
          HotSpot offers several garbage collectors,
          including:
        </p>
        <ul>
          <li>Serial GC</li>
          <li>Parallel GC</li>
          <li>G1 GC</li>
          <li>ZGC</li>
          <li>Shenandoah GC, where available</li>
        </ul>
        <p>
          The best collector depends on latency,
          throughput, heap size, and workload.
        </p>
      </>
    ),
    code: `// Example HotSpot options:
-XX:+UseSerialGC
-XX:+UseParallelGC
-XX:+UseG1GC
-XX:+UseZGC

// Check the supported options
// for your installed Java version.`,
  },
  {
    title: "23. Stop-the-World Pauses",
    content: (
      <>
        <p>
          Some garbage collection phases require
          application threads to pause.
        </p>
        <p>
          These pauses are often called stop-the-world
          pauses.
        </p>
        <p>
          Modern collectors can perform many operations
          concurrently, but they do not necessarily
          eliminate every pause.
        </p>
      </>
    ),
    code: `Application threads
       |
       v
Pause for a GC phase
       |
       v
Resume application execution`,
  },
  {
    title: "24. Memory Leaks in Java",
    content: (
      <>
        <p>
          Java can still have memory leaks.
        </p>
        <p>
          A leak occurs when objects remain reachable
          even though the application no longer needs them.
        </p>
        <p>
          Common causes include unbounded caches,
          forgotten listeners, and long-lived collections
          retaining obsolete objects.
        </p>
      </>
    ),
    code: `List<Object> cache = new ArrayList<>();

// Continuously adding objects
// without removing unused entries
// can cause memory growth.`,
  },
  {
    title: "25. OutOfMemoryError",
    content: (
      <>
        <p>
          OutOfMemoryError indicates that the JVM
          or a relevant runtime resource could not
          satisfy an allocation request.
        </p>
        <p>
          Causes may include heap exhaustion,
          Metaspace exhaustion, or native memory limits.
        </p>
        <p>
          Diagnose the specific error message and
          memory usage before changing JVM options.
        </p>
      </>
    ),
    code: `// Heap example:
java -Xms256m -Xmx1g Main

// -Xms: initial heap size
// -Xmx: maximum heap size`,
  },
  {
    title: "26. JVM Monitoring Tools",
    content: (
      <>
        <p>
          Useful JDK tools include:
        </p>
        <ul>
          <li>jps: lists Java processes.</li>
          <li>jcmd: sends diagnostic commands.</li>
          <li>jstack: obtains thread stack information.</li>
          <li>jmap: heap-related diagnostic operations.</li>
          <li>Java Flight Recorder: records runtime events.</li>
        </ul>
        <p>
          Tool availability and commands vary by JDK version.
        </p>
      </>
    ),
    code: `jps

jcmd <pid> VM.version

jcmd <pid> GC.heap_info

jstack <pid>

// Replace <pid> with the Java process ID.`,
  },
  {
    title: "27. JVM Flags",
    content: (
      <>
        <p>
          JVM options configure runtime behavior,
          memory limits, diagnostics, and performance.
        </p>
        <p>
          Avoid copying random flags from the internet.
          Some options are experimental, obsolete,
          or specific to a particular JVM version.
        </p>
      </>
    ),
    code: `java -Xms256m -Xmx1g Main

java -XX:+UseG1GC Main

java -version

// Confirm the Java version and
// supported options before tuning.`,
  },
  {
    title: "28. JVM Interview Questions",
    content: (
      <>
        <ol>
          <li>What is the JVM?</li>
          <li>Explain JDK, JRE, and JVM.</li>
          <li>How does Java bytecode execute?</li>
          <li>What are the class loading phases?</li>
          <li>Explain parent delegation.</li>
          <li>What are JVM runtime memory areas?</li>
          <li>Heap vs stack?</li>
          <li>What is Metaspace?</li>
          <li>Interpreter vs JIT compiler?</li>
          <li>What is method inlining?</li>
          <li>How does garbage collection work?</li>
          <li>What are GC roots?</li>
          <li>Can Java have memory leaks?</li>
          <li>What causes StackOverflowError?</li>
          <li>What causes OutOfMemoryError?</li>
        </ol>
      </>
    ),
    code: `// Interview tip:
//
// Explain the concept.
// Describe its role in execution.
// Give a practical example.
// Mention implementation differences
// when the topic is JVM-specific.`,
  },
  {
    title: "29. Practice Tasks",
    content: (
      <>
        <ol>
          <li>Compile a Java class and inspect its bytecode.</li>
          <li>Use javap -c to examine method instructions.</li>
          <li>Print the class loader of your application class.</li>
          <li>Write a small program that creates objects.</li>
          <li>Observe heap information using jcmd.</li>
          <li>Create a memory-retention example with a collection.</li>
          <li>Compare JVM options on your installed JDK.</li>
          <li>Explain the Java execution pipeline aloud.</li>
        </ol>
      </>
    ),
    code: `// Mini practical:
//
// Main.java
//   |
// javac Main.java
//   |
// Main.class
//   |
// javap -c Main
//   |
// java Main`,
  },
];

export default function JavaJVMInternalsLesson({ onBack }) {
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
        Advanced JVM Internals
      </h1>

      <p
        style={{
          color: "var(--muted, #6b7280)",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        Understand how Java source code becomes bytecode,
        how the JVM loads and executes classes, how runtime
        memory is organized, and how JIT compilation and
        garbage collection work.
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
        <h2 style={headingStyle}>Final Checklist</h2>

        <ul style={{ lineHeight: "1.8" }}>
          <li>Explain the Java compilation and execution process.</li>
          <li>Understand bytecode and class loading.</li>
          <li>Know parent delegation and class loader types.</li>
          <li>Understand heap, stack, method area, and Metaspace.</li>
          <li>Explain interpretation and JIT compilation.</li>
          <li>Understand garbage collection and reachability.</li>
          <li>Know common GC collectors and JVM tools.</li>
          <li>Understand StackOverflowError and OutOfMemoryError.</li>
        </ul>
      </section>
    </div>
  );
}
