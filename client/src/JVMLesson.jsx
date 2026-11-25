

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
          JVM stands for Java Virtual Machine. It is the runtime environment
          that executes Java bytecode.
        </p>
        <p>
          Java source code is usually compiled into bytecode. The JVM loads
          and executes that bytecode on a particular platform.
        </p>
        <p>
          This is the foundation of Java's platform independence: the same
          bytecode can run on different operating systems when a compatible
          JVM is available.
        </p>
      </>
    ),
    code: `// Main.java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}

// Compile:
// javac Main.java

// Run:
// java Main`,
  },
  {
    title: "2. JDK vs JRE vs JVM",
    content: (
      <>
        <p>These three terms are often asked in interviews.</p>
        <ul>
          <li>
            <strong>JVM:</strong> Executes Java bytecode.
          </li>
          <li>
            <strong>JRE:</strong> Conceptually, the JVM plus runtime
            libraries and supporting components needed to run Java
            applications.
          </li>
          <li>
            <strong>JDK:</strong> Development kit containing tools such as
            the compiler, along with the runtime components.
          </li>
        </ul>
        <p>
          Modern Java distributions may package these components differently,
          but the conceptual distinction remains useful.
        </p>
      </>
    ),
    code: `// JDK includes development tools such as:
// javac - Java compiler
// java  - Java application launcher
// javadoc - Documentation generator

// JVM executes the compiled bytecode.`,
  },
  {
    title: "3. Java Program Execution Flow",
    content: (
      <>
        <p>A typical Java program follows this flow:</p>
        <ol>
          <li>Write source code in a .java file.</li>
          <li>Compile source code using javac.</li>
          <li>The compiler produces .class bytecode.</li>
          <li>The class loader loads required classes.</li>
          <li>The bytecode verifier checks bytecode properties.</li>
          <li>The JVM executes bytecode using its execution engine.</li>
        </ol>
      </>
    ),
    code: `Main.java
    |
    | javac Main.java
    v
Main.class (bytecode)
    |
    | java Main
    v
Class Loading
    |
    v
Bytecode Verification
    |
    v
JVM Execution`,
  },
  {
    title: "4. What Is Bytecode?",
    content: (
      <>
        <p>
          Bytecode is the intermediate instruction format produced by the
          Java compiler.
        </p>
        <p>
          It is stored in .class files and is designed to be executed by a
          JVM rather than directly by a particular processor.
        </p>
        <p>
          Bytecode is not the same as machine code. The JVM may interpret
          bytecode or compile frequently executed code into native machine
          code.
        </p>
      </>
    ),
    code: `// Source
int result = 10 + 20;

// Compile
javac Main.java

// Inspect bytecode
javap -c Main`,
  },
  {
    title: "5. JVM Architecture",
    content: (
      <>
        <p>The JVM is commonly explained using these major components:</p>
        <ul>
          <li>Class Loader Subsystem.</li>
          <li>Runtime Data Areas.</li>
          <li>Execution Engine.</li>
          <li>Native Method Interface.</li>
          <li>Native Libraries.</li>
        </ul>
        <p>
          The class loader loads classes, runtime areas store execution
          data, and the execution engine runs the instructions.
        </p>
      </>
    ),
    code: `JVM
 |
 +-- Class Loader
 |
 +-- Runtime Data Areas
 |    +-- Heap
 |    +-- Java Stacks
 |    +-- Method Area
 |    +-- PC Registers
 |    +-- Native Method Stacks
 |
 +-- Execution Engine
 |    +-- Interpreter
 |    +-- JIT Compiler
 |    +-- Garbage Collector
 |
 +-- Native Interface`,
  },
  {
    title: "6. Class Loader Subsystem",
    content: (
      <>
        <p>
          The class loader subsystem loads class definitions into the JVM.
        </p>
        <p>Class loading is commonly described in three phases:</p>
        <ul>
          <li>
            <strong>Loading:</strong> Finds the class representation and
            creates its runtime form.
          </li>
          <li>
            <strong>Linking:</strong> Includes verification, preparation,
            and resolution.
          </li>
          <li>
            <strong>Initialization:</strong> Executes class initialization
            code, such as static initializers.
          </li>
        </ul>
      </>
    ),
    code: `class Example {
    static int value = 100;

    static {
        System.out.println(
            "Class initialized"
        );
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Example.value);
    }
}`,
  },
  {
    title: "7. Parent Delegation Model",
    content: (
      <>
        <p>
          Java class loaders commonly follow parent delegation.
        </p>
        <p>
          A class loader generally asks its parent to load a class first.
          If the parent cannot find it, the child may attempt to load it.
        </p>
        <p>
          This helps avoid duplicate loading of core Java classes and
          improves consistency.
        </p>
      </>
    ),
    code: `// Common class loader hierarchy

Bootstrap ClassLoader
        |
        v
Platform ClassLoader
        |
        v
Application ClassLoader

// Custom class loaders can extend
// ClassLoader and define their own behavior.`,
  },
  {
    title: "8. Types of Class Loaders",
    content: (
      <>
        <p>Important class loaders:</p>
        <ul>
          <li>
            <strong>Bootstrap:</strong> Loads core Java runtime classes.
          </li>
          <li>
            <strong>Platform:</strong> Loads platform classes and modules.
          </li>
          <li>
            <strong>Application:</strong> Loads classes from the application
            class path or module path.
          </li>
          <li>
            <strong>Custom:</strong> A developer-defined class loader.
          </li>
        </ul>
        <p>
          In modern Java, the platform class loader replaced the older
          extension class loader role.
        </p>
      </>
    ),
    code: `public class Main {
    public static void main(String[] args) {
        ClassLoader loader =
            Main.class.getClassLoader();

        System.out.println(loader);

        System.out.println(
            loader.getParent()
        );
    }
}`,
  },
  {
    title: "9. Runtime Data Areas",
    content: (
      <>
        <p>
          JVM runtime data areas are memory regions used during execution.
        </p>
        <p>
          Some areas are shared across threads, while others belong to each
          thread.
        </p>
        <ul>
          <li>
            <strong>Shared:</strong> Heap and method area.
          </li>
          <li>
            <strong>Per-thread:</strong> Java stack, PC register, and native
            method stack.
          </li>
        </ul>
        <p>
          This distinction helps explain memory behavior and thread-related
          errors.
        </p>
      </>
    ),
    code: `Shared:
    Heap
    Method Area

Per Thread:
    Java Stack
    PC Register
    Native Method Stack`,
  },
  {
    title: "10. Heap Memory",
    content: (
      <>
        <p>
          The heap is the runtime area where objects and arrays are
          allocated.
        </p>
        <p>
          It is shared among threads. Garbage collection primarily manages
          memory in the heap.
        </p>
        <p>
          If an application cannot allocate an object because the heap has
          insufficient space, it may throw <code>OutOfMemoryError</code>.
        </p>
      </>
    ),
    code: `class Student {
    String name;
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();

        student.name = "Angel";
    }
}

// The Student object is allocated on the heap.
// The local reference variable student
// belongs to the main thread's stack frame.`,
  },
  {
    title: "11. Java Stack",
    content: (
      <>
        <p>
          Each thread has its own Java stack. It contains stack frames for
          method calls.
        </p>
        <p>A stack frame typically contains:</p>
        <ul>
          <li>Local variables.</li>
          <li>Operand stack.</li>
          <li>Information needed to return from the method.</li>
        </ul>
        <p>
          A very deep or infinite recursion may exhaust the stack and cause
          <code> StackOverflowError</code>.
        </p>
      </>
    ),
    code: `public class Main {
    static void callAgain() {
        callAgain();
    }

    public static void main(String[] args) {
        callAgain();
    }
}

// Each recursive call creates another
// active method frame.
// Eventually the stack may overflow.`,
  },
  {
    title: "12. Method Area and Metaspace",
    content: (
      <>
        <p>
          The method area is a JVM specification concept that stores
          class-level structures such as runtime constant pools and method
          information.
        </p>
        <p>
          In HotSpot JVM, class metadata is commonly stored in native memory
          called Metaspace.
        </p>
        <p>
          Do not assume the method area is a fixed physical memory layout
          identical across all JVM implementations.
        </p>
      </>
    ),
    code: `// Class metadata includes information about:
// - Class structure
// - Method metadata
// - Runtime constant pool
// - Field metadata

// HotSpot implementation:
// Class metadata is stored in Metaspace.`,
  },
  {
    title: "13. PC Register",
    content: (
      <>
        <p>
          Each JVM thread has its own program counter (PC) register.
        </p>
        <p>
          It tracks the current JVM instruction being executed by that
          thread.
        </p>
        <p>
          For a thread executing a non-native method, the PC identifies the
          current bytecode instruction. For native methods, its value is
          undefined in the JVM specification.
        </p>
      </>
    ),
    code: `Thread A -> its own PC register
Thread B -> its own PC register

// Each thread tracks its own execution position.`,
  },
  {
    title: "14. Execution Engine",
    content: (
      <>
        <p>
          The execution engine executes the loaded bytecode.
        </p>
        <p>It commonly includes:</p>
        <ul>
          <li>
            <strong>Interpreter:</strong> Executes bytecode instruction by
            instruction.
          </li>
          <li>
            <strong>JIT compiler:</strong> Compiles frequently executed code
            into native machine code.
          </li>
          <li>
            <strong>Garbage collector:</strong> Reclaims memory occupied by
            objects that are no longer reachable.
          </li>
        </ul>
      </>
    ),
    code: `Bytecode
    |
    v
Interpreter executes code
    |
    v
Frequently executed code
    |
    v
JIT compilation
    |
    v
Native machine code`,
  },
  {
    title: "15. JIT Compiler",
    content: (
      <>
        <p>
          JIT stands for Just-In-Time compiler.
        </p>
        <p>
          It compiles selected bytecode into native machine code while the
          application is running.
        </p>
        <p>
          The JVM can optimize frequently executed code using runtime
          information. This is one reason Java applications may become faster
          after warm-up.
        </p>
        <p>
          JIT compilation is not guaranteed to compile every method.
        </p>
      </>
    ),
    code: `// Simplified concept

for (int i = 0; i < 1_000_000; i++) {
    calculate(i);
}

// A frequently executed method may become
// a candidate for JIT compilation and
// runtime optimization.`,
  },
  {
    title: "16. Interpreter vs JIT",
    content: (
      <>
        <p>Both are parts of JVM execution, but they work differently.</p>
        <ul>
          <li>
            <strong>Interpreter:</strong> Starts executing bytecode quickly,
            but repeatedly interpreting instructions can be slower.
          </li>
          <li>
            <strong>JIT:</strong> Has compilation overhead, but optimized
            native code can run faster for frequently executed paths.
          </li>
        </ul>
        <p>
          Modern JVMs use a combination of techniques rather than relying
          exclusively on one approach.
        </p>
      </>
    ),
    code: `Interpreter:
Bytecode -> execute instructions

JIT:
Bytecode -> compile -> native code -> execute`,
  },
  {
    title: "17. Garbage Collection and JVM",
    content: (
      <>
        <p>
          Garbage collection automatically reclaims memory from objects that
          are no longer reachable by the application.
        </p>
        <p>
          The JVM determines object reachability through references from GC
          roots, such as active thread stacks and other runtime references.
        </p>
        <p>
          Setting a reference to null does not immediately guarantee that the
          object will be collected.
        </p>
      </>
    ),
    code: `Student student = new Student();

// The object is reachable through student.

student = null;

// The object may become eligible for GC
// if no other reachable reference exists.`,
  },
  {
    title: "18. Native Method Interface",
    content: (
      <>
        <p>
          JNI stands for Java Native Interface.
        </p>
        <p>
          It allows Java code to interact with native code written in
          languages such as C or C++.
        </p>
        <p>
          Native methods are declared using the <code>native</code> keyword
          and require a native implementation to be available.
        </p>
      </>
    ),
    code: `class NativeExample {
    native void performNativeOperation();
}

// A native library must provide the
// implementation for this method.`,
  },
  {
    title: "19. JVM Errors",
    content: (
      <>
        <p>Common JVM-related errors include:</p>
        <ul>
          <li>
            <code>OutOfMemoryError</code> — memory allocation failure.
          </li>
          <li>
            <code>StackOverflowError</code> — stack exhaustion.
          </li>
          <li>
            <code>NoClassDefFoundError</code> — a required class definition
            could not be found at runtime.
          </li>
          <li>
            <code>ClassNotFoundException</code> — a class-loading operation
            could not locate a requested class.
          </li>
          <li>
            <code>ClassCastException</code> — invalid runtime cast.
          </li>
        </ul>
      </>
    ),
    code: `// ClassNotFoundException
Class.forName("com.example.MissingClass");

// NoClassDefFoundError may occur when
// a class was available during compilation
// but cannot be found during execution.`,
  },
  {
    title: "20. JVM Options",
    content: (
      <>
        <p>
          JVM options configure runtime behavior, memory, diagnostics, and
          other settings.
        </p>
        <p>Common options include:</p>
        <ul>
          <li><code>-Xms</code> — initial heap size.</li>
          <li><code>-Xmx</code> — maximum heap size.</li>
          <li><code>-XX:</code> — advanced JVM options.</li>
          <li><code>-verbose:class</code> — class loading details on supported JVMs.</li>
        </ul>
        <p>
          Options vary by JVM implementation and version. Check the
          documentation for the JVM you are using.
        </p>
      </>
    ),
    code: `// Example
java -Xms256m -Xmx1g Main

// Initial heap: 256 MB
// Maximum heap: 1 GB`,
  },
  {
    title: "21. Interview Questions",
    content: (
      <>
        <ol>
          <li>What is the JVM?</li>
          <li>JDK vs JRE vs JVM?</li>
          <li>What is bytecode?</li>
          <li>Explain the Java execution process.</li>
          <li>What are the JVM runtime data areas?</li>
          <li>Heap vs stack?</li>
          <li>What is class loading?</li>
          <li>Explain parent delegation.</li>
          <li>Interpreter vs JIT compiler?</li>
          <li>What is Metaspace?</li>
          <li>What is JNI?</li>
          <li>What causes StackOverflowError?</li>
          <li>What causes OutOfMemoryError?</li>
          <li>How does garbage collection relate to reachability?</li>
        </ol>
      </>
    ),
    code: `// Practice:
// 1. Compile a Java program.
// 2. Inspect its bytecode with javap -c.
// 3. Print the class loader of your class.
// 4. Create a recursive method and observe
//    what happens with deep recursion.
// 5. Explain heap, stack, and Metaspace.`,
  },
];

export default function JVMLesson({ onBack }) {
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
        Java Virtual Machine & Class Loading
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Understand how Java source code becomes bytecode, how the JVM loads
        classes, how memory is organized, and how bytecode gets executed.
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
          <li>Understand JDK, JRE, and JVM.</li>
          <li>Explain source code to bytecode to execution.</li>
          <li>Know class loading and parent delegation.</li>
          <li>Understand heap, stack, method area, and Metaspace.</li>
          <li>Explain interpreter, JIT, and garbage collection.</li>
          <li>Recognize common JVM errors and options.</li>
        </ul>
      </section>
    </div>
  );
}
