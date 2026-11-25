

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
    title: "1. What Is Serialization?",
    content: (
      <>
        <p>
          Serialization is the process of converting an object's state
          into a byte stream.
        </p>
        <p>
          The byte stream can be stored in a file, transferred over a
          network, or saved for later use.
        </p>
        <p>
          Deserialization is the reverse process: reconstructing an
          object from the byte stream.
        </p>
      </>
    ),
    code: `// Serialization
// Java object -> byte stream
//
// Deserialization
// Byte stream -> Java object`,
  },
  {
    title: "2. Why Is Serialization Used?",
    content: (
      <>
        <ul>
          <li>Saving object state to a file.</li>
          <li>Transferring objects between systems.</li>
          <li>Storing session state in some applications.</li>
          <li>Supporting legacy Java communication systems.</li>
        </ul>
        <p>
          Native Java serialization is not the default choice for every
          modern application. JSON, Protocol Buffers, and other formats
          are often preferred for APIs and long-term data storage.
        </p>
      </>
    ),
    code: `// Example use cases:
//
// Save an object to a file
// Send data to another Java process
// Restore previously saved state`,
  },
  {
    title: "3. Serializable Interface",
    content: (
      <>
        <p>
          Serializable is a marker interface in java.io.
        </p>
        <p>
          A marker interface has no methods. Implementing Serializable
          tells Java's serialization mechanism that the class supports
          default serialization, subject to its object graph and rules.
        </p>
        <p>
          A non-transient, non-static field must generally refer to an
          object that is also serializable, or serialization may fail.
        </p>
      </>
    ),
    code: `import java.io.Serializable;

public class Student implements Serializable {
    private String name;
    private int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}`,
  },
  {
    title: "4. ObjectOutputStream",
    content: (
      <>
        <p>
          ObjectOutputStream writes Java objects to an output stream.
        </p>
        <p>
          Its writeObject() method performs serialization for objects
          that support it.
        </p>
        <p>
          Use try-with-resources to close the stream safely.
        </p>
      </>
    ),
    code: `import java.io.FileOutputStream;
import java.io.ObjectOutputStream;

Student student =
    new Student("Arun", 20);

try (ObjectOutputStream out =
        new ObjectOutputStream(
            new FileOutputStream("student.ser")
        )) {

    out.writeObject(student);
}`,
  },
  {
    title: "5. ObjectInputStream",
    content: (
      <>
        <p>
          ObjectInputStream reads objects from a byte stream.
        </p>
        <p>
          readObject() returns Object, so the result may need a cast
          to the expected type.
        </p>
        <p>
          Class compatibility and object data must match the
          serialization rules.
        </p>
      </>
    ),
    code: `import java.io.FileInputStream;
import java.io.ObjectInputStream;

try (ObjectInputStream in =
        new ObjectInputStream(
            new FileInputStream("student.ser")
        )) {

    Student student =
        (Student) in.readObject();

    System.out.println(student);
}`,
  },
  {
    title: "6. Complete Serialization Example",
    content: (
      <>
        <p>
          This example writes a Student object to a file and reads it
          back.
        </p>
        <p>
          Run it only with a file created by your own trusted program.
          Do not use this pattern to deserialize arbitrary uploaded files
          or network input.
        </p>
      </>
    ),
    code: `import java.io.*;

class Student implements Serializable {
    private static final long serialVersionUID = 1L;

    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return name + " - " + age;
    }
}

public class SerializationDemo {
    public static void main(String[] args)
            throws Exception {

        Student original =
            new Student("Arun", 20);

        try (ObjectOutputStream out =
                new ObjectOutputStream(
                    new FileOutputStream("student.ser")
                )) {

            out.writeObject(original);
        }

        try (ObjectInputStream in =
                new ObjectInputStream(
                    new FileInputStream("student.ser")
                )) {

            Student restored =
                (Student) in.readObject();

            System.out.println(restored);
        }
    }
}`,
  },
  {
    title: "7. serialVersionUID",
    content: (
      <>
        <p>
          serialVersionUID is a version identifier for a serializable
          class.
        </p>
        <p>
          During deserialization, Java compares the stream's class
          version identifier with the local class identifier.
        </p>
        <p>
          If they are incompatible, InvalidClassException may occur.
          Explicitly declaring the identifier helps control versioning.
        </p>
      </>
    ),
    code: `public class Student implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;
}`,
  },
  {
    title: "8. Static Fields and Serialization",
    content: (
      <>
        <p>
          Static fields belong to the class, not to an individual
          object.
        </p>
        <p>
          Default serialization saves the object's instance state.
          Static fields are not serialized as part of that object.
        </p>
      </>
    ),
    code: `class Student implements Serializable {
    private String name;

    static String college = "SKCET";
}

// name -> instance field
// college -> static field
//
// college is not saved as part of
// the serialized Student object.`,
  },
  {
    title: "9. transient Keyword",
    content: (
      <>
        <p>
          transient prevents a field from being included in default
          serialization.
        </p>
        <p>
          It is useful for fields that should not be persisted,
          such as temporary values or sensitive data.
        </p>
        <p>
          transient does not automatically make an application secure.
          A password should not be serialized in the first place.
        </p>
      </>
    ),
    code: `class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String username;

    private transient String temporaryToken;
}`,
  },
  {
    title: "10. What Happens to transient Fields?",
    content: (
      <>
        <p>
          During default deserialization, transient fields receive
          their default values unless the class restores them through
          custom logic.
        </p>
        <ul>
          <li>int -&gt; 0</li>
          <li>boolean -&gt; false</li>
          <li>Object reference -&gt; null</li>
        </ul>
      </>
    ),
    code: `class Account implements Serializable {
    private String username;
    private transient int temporaryCode;
}

// After default deserialization:
// username -> restored
// temporaryCode -> 0`,
  },
  {
    title: "11. Serialization of Object Graphs",
    content: (
      <>
        <p>
          An object may reference other objects. Serialization follows
          the reachable object graph according to serialization rules.
        </p>
        <p>
          If a required referenced object is not serializable,
          NotSerializableException may occur.
        </p>
      </>
    ),
    code: `class Address implements Serializable {
    String city;
}

class Person implements Serializable {
    String name;
    Address address;
}

// Person references Address.
// Both classes must support serialization
// for default serialization to succeed.`,
  },
  {
    title: "12. Object References and Shared Objects",
    content: (
      <>
        <p>
          Java serialization tracks object references in the stream.
          If two fields refer to the same object, the restored object
          graph can preserve that shared reference.
        </p>
        <p>
          This is different from independently serializing the same
          object twice into separate streams.
        </p>
      </>
    ),
    code: `Address address = new Address();

Person first = new Person();
Person second = new Person();

first.address = address;
second.address = address;

// Both refer to the same Address object.
//
// Serialization can preserve this shared
// reference within the object stream.`,
  },
  {
    title: "13. Custom Serialization: writeObject",
    content: (
      <>
        <p>
          A class can define private writeObject() to customize how
          its data is serialized.
        </p>
        <p>
          Calling defaultWriteObject() performs the normal default
          serialization for eligible fields.
        </p>
        <p>
          Custom serialization increases complexity. Use it only
          when there is a clear requirement.
        </p>
      </>
    ),
    code: `import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String username;

    private void writeObject(
            ObjectOutputStream out)
            throws IOException {

        out.defaultWriteObject();
    }
}`,
  },
  {
    title: "14. Custom Deserialization: readObject",
    content: (
      <>
        <p>
          A class can define private readObject() to customize
          deserialization.
        </p>
        <p>
          It may validate restored state or reconstruct transient
          fields.
        </p>
        <p>
          Validation must be carefully designed. Deserialization can
          involve complex object graphs and callbacks.
        </p>
      </>
    ),
    code: `import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String username;

    private void readObject(
            ObjectInputStream in)
            throws IOException,
                   ClassNotFoundException {

        in.defaultReadObject();

        if (username == null
                || username.isBlank()) {
            throw new InvalidObjectException(
                "Invalid username"
            );
        }
    }
}`,
  },
  {
    title: "15. readObject and Security Risks",
    content: (
      <>
        <p>
          readObject() is not simply a harmless field-copy operation.
          Deserialization may trigger class-specific behavior while
          reconstructing objects.
        </p>
        <p>
          A malicious object graph may exploit dangerous methods in
          classes available on the classpath.
        </p>
        <p>
          Therefore, validating one field inside readObject() is not
          a complete defense against untrusted serialized data.
        </p>
      </>
    ),
    code: `// Risky design:
//
// ObjectInputStream reads attacker-controlled bytes
//        |
//        v
// Object graph is reconstructed
//        |
//        v
// Class-specific deserialization behavior
//        |
//        v
// Unexpected or dangerous behavior may occur`,
  },
  {
    title: "16. Deserialization Vulnerability",
    content: (
      <>
        <p>
          A deserialization vulnerability occurs when an application
          processes crafted serialized data in an unsafe way.
        </p>
        <p>
          Depending on available classes and the application's behavior,
          exploitation may cause denial of service, unexpected actions,
          or potentially code execution.
        </p>
        <p>
          The main defense is to avoid deserializing untrusted data.
        </p>
      </>
    ),
    code: `// Dangerous input sources include:
//
// - User-uploaded serialized files
// - Untrusted network messages
// - Data from unknown systems
// - Tampered cache or session files
//
// Do not assume a .ser extension means
// the file is safe.`,
  },
  {
    title: "17. Gadget Chains",
    content: (
      <>
        <p>
          A gadget is a class or method that can participate in
          unexpected behavior during deserialization.
        </p>
        <p>
          A gadget chain connects multiple existing classes so that
          processing a crafted object graph triggers a dangerous
          sequence of operations.
        </p>
        <p>
          The vulnerable classes may come from dependencies rather
          than from the application's own source code.
        </p>
      </>
    ),
    code: `// Conceptual gadget chain:
//
// Crafted serialized object
//        |
//        v
// Class A callback
//        |
//        v
// Class B method
//        |
//        v
// Dangerous operation
//
// This is why dependency inventory matters.`,
  },
  {
    title: "18. ObjectInputFilter",
    content: (
      <>
        <p>
          ObjectInputFilter allows an application to restrict classes
          and object graph characteristics during deserialization.
        </p>
        <p>
          Filters can limit depth, references, array sizes, and
          permitted classes.
        </p>
        <p>
          A strict allowlist is preferable to accepting every class.
          Filtering is defense-in-depth, not permission to deserialize
          arbitrary untrusted data casually.
        </p>
      </>
    ),
    code: `import java.io.*;

public class FilterExample {
    public static void main(String[] args)
            throws Exception {

        try (ObjectInputStream in =
                new ObjectInputStream(
                    new FileInputStream("student.ser")
                )) {

            in.setObjectInputFilter(
                ObjectInputFilter.Config
                    .createFilter(
                        "maxdepth=5;"
                        + "maxrefs=100;"
                        + "maxarray=1000;"
                        + "Student;!*"
                    )
            );

            Student student =
                (Student) in.readObject();
        }
    }
}

// Use a filter tailored to the exact classes
// and object graph your application needs.`,
  },
  {
    title: "19. ObjectInputFilter Rejection",
    content: (
      <>
        <p>
          If an object violates the configured filter, the filter
          can reject it.
        </p>
        <p>
          Rejection may result in InvalidClassException.
          Handle the exception safely and do not continue using
          partially processed untrusted data.
        </p>
      </>
    ),
    code: `// Filter decision examples:
//
// ALLOWED -> class and graph match policy
// REJECTED -> class or graph violates policy
// UNDECIDED -> filter has no decision
//
// A strict filter should reject classes
// that are not explicitly permitted.`,
  },
  {
    title: "20. Externalizable",
    content: (
      <>
        <p>
          Externalizable is an interface that gives a class full
          control over its serialization format.
        </p>
        <p>
          It requires a public no-argument constructor and implementations
          of writeExternal() and readExternal().
        </p>
        <p>
          Because the class controls the format, it must also handle
          compatibility and validation carefully.
        </p>
      </>
    ),
    code: `import java.io.*;

class Point implements Externalizable {
    int x;
    int y;

    public Point() {
    }

    public void writeExternal(
            ObjectOutput out)
            throws IOException {

        out.writeInt(x);
        out.writeInt(y);
    }

    public void readExternal(
            ObjectInput in)
            throws IOException {

        x = in.readInt();
        y = in.readInt();
    }
}`,
  },
  {
    title: "21. Serializable vs Externalizable",
    content: (
      <>
        <p>
          Serializable uses default serialization unless customized.
          Externalizable requires the class to define its own
          read/write format.
        </p>
        <p>
          Externalizable offers more control but also more responsibility
          for correctness, compatibility, and security.
        </p>
      </>
    ),
    code: `// Serializable
// - Marker interface
// - Default field serialization
// - Can customize with writeObject/readObject
//
// Externalizable
// - Explicit writeExternal/readExternal
// - Public no-argument constructor
// - Class controls serialized data`,
  },
  {
    title: "22. Serialization Compatibility",
    content: (
      <>
        <p>
          A serialized object may be read by a later version of its
          class only if the serialization compatibility rules allow it.
        </p>
        <p>
          Adding or removing fields, changing types, or changing
          serialVersionUID can affect compatibility.
        </p>
        <p>
          Native Java serialization is often a poor choice for
          long-lived public data formats.
        </p>
      </>
    ),
    code: `// Version 1
class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
}

// Version 2 may add a field.
// Compatibility depends on Java serialization
// rules and the class's version identifier.`,
  },
  {
    title: "23. Serialization and Constructors",
    content: (
      <>
        <p>
          For ordinary Serializable classes, deserialization does not
          invoke the serializable class's normal constructor.
        </p>
        <p>
          The no-argument constructor of the first non-serializable
          superclass is invoked instead.
        </p>
        <p>
          This behavior is important when reasoning about object
          initialization and invariants.
        </p>
      </>
    ),
    code: `class Base {
    Base() {
        System.out.println("Base constructor");
    }
}

class Child extends Base
        implements Serializable {
    Child() {
        System.out.println("Child constructor");
    }
}

// During ordinary deserialization:
// Base constructor runs.
// Child constructor does not run.`,
  },
  {
    title: "24. readResolve and writeReplace",
    content: (
      <>
        <p>
          writeReplace() can substitute an object before serialization.
          readResolve() can substitute the object returned after
          deserialization.
        </p>
        <p>
          These methods are often discussed in connection with
          singleton patterns and serialization behavior.
        </p>
        <p>
          They must be designed carefully because object identity
          and invariants may be affected.
        </p>
      </>
    ),
    code: `import java.io.*;

class Singleton implements Serializable {
    private static final long serialVersionUID = 1L;

    private static final Singleton INSTANCE =
        new Singleton();

    private Singleton() {
    }

    private Object readResolve()
            throws ObjectStreamException {
        return INSTANCE;
    }
}`,
  },
  {
    title: "25. Why JSON Is Often Preferred",
    content: (
      <>
        <p>
          JSON represents data using explicit structures such as
          objects, arrays, strings, numbers, and booleans.
        </p>
        <p>
          It is widely supported across languages and easier to inspect
          than Java's native serialized byte stream.
        </p>
        <p>
          JSON is not automatically secure: validate data, control
          types, and avoid unsafe polymorphic deserialization settings.
        </p>
      </>
    ),
    code: `// Java object
Student student =
    new Student("Arun", 20);

// JSON representation:
// {
//   "name": "Arun",
//   "age": 20
// }
//
// JSON is a data format.
// It does not require reconstructing
// arbitrary Java object graphs.`,
  },
  {
    title: "26. Serialization Best Practices",
    content: (
      <>
        <ul>
          <li>Avoid native Java serialization for untrusted input.</li>
          <li>Prefer explicit data formats for APIs.</li>
          <li>Use ObjectInputFilter when deserialization is required.</li>
          <li>Use strict class allowlists.</li>
          <li>Validate restored object state.</li>
          <li>Keep dependencies patched.</li>
          <li>Never serialize passwords or secrets unnecessarily.</li>
          <li>Do not assume a file is safe because it was local once.</li>
        </ul>
      </>
    ),
    code: `// Secure design:
//
// Prefer data transfer objects.
// Validate input.
// Restrict allowed types.
// Keep secrets out of serialized state.
// Avoid deserializing untrusted byte streams.`,
  },
  {
    title: "27. Interview Questions",
    content: (
      <>
        <ol>
          <li>What is serialization and deserialization?</li>
          <li>What is the Serializable interface?</li>
          <li>What is serialVersionUID?</li>
          <li>What is the purpose of transient?</li>
          <li>Are static fields serialized?</li>
          <li>What is ObjectInputFilter?</li>
          <li>What is a deserialization vulnerability?</li>
          <li>What is a gadget chain?</li>
          <li>What is the difference between Serializable and Externalizable?</li>
          <li>Why is native Java serialization risky for untrusted data?</li>
          <li>What are readResolve() and writeReplace()?</li>
          <li>Why are JSON or schema-based formats often preferred?</li>
        </ol>
      </>
    ),
    code: `// Strong interview answer:
//
// Define the concept.
// Explain the mechanism.
// Give a small Java example.
// Discuss compatibility.
// Explain the security risk.
// State the recommended practice.`,
  },
  {
    title: "28. Practice Tasks",
    content: (
      <>
        <ol>
          <li>Create a Student class implementing Serializable.</li>
          <li>Save and restore a Student object.</li>
          <li>Add serialVersionUID.</li>
          <li>Mark one field transient and observe its restored value.</li>
          <li>Serialize an object containing another object.</li>
          <li>Write a custom readObject() validation.</li>
          <li>Configure an ObjectInputFilter for an allowed class.</li>
          <li>Compare a Java serialized file with JSON output.</li>
        </ol>
      </>
    ),
    code: `// Mini project:
//
// Create a trusted local save system
// for student progress.
//
// Requirements:
// - Serializable model
// - Explicit serialVersionUID
// - No passwords or secrets
// - ObjectInputFilter
// - Validate restored state
// - Handle corrupted files safely`,
  },
];

export default function JavaSerializationLesson({ onBack }) {
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
        Java Serialization & Serialization Security
      </h1>

      <p
        style={{
          color: "var(--muted, #6b7280)",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        Learn how Java objects are converted into byte streams,
        restored from files, versioned, customized, and protected
        against unsafe deserialization.
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
          <li>Understand serialization and deserialization.</li>
          <li>Know Serializable and serialVersionUID.</li>
          <li>Understand transient and static fields.</li>
          <li>Know how object graphs are serialized.</li>
          <li>Understand custom readObject() and writeObject().</li>
          <li>Know ObjectInputFilter and class allowlists.</li>
          <li>Understand gadget chains and deserialization risks.</li>
          <li>Know when JSON or another format is preferable.</li>
        </ul>
      </section>
    </div>
  );
}
