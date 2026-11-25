

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
    title: "1. What Is a Package?",
    content: (
      <>
        <p>
          A package is a namespace used to organize related Java classes,
          interfaces, enums, and other types.
        </p>
        <p>Packages help with:</p>
        <ul>
          <li>Organizing large applications.</li>
          <li>Avoiding class-name conflicts.</li>
          <li>Controlling access to classes and members.</li>
          <li>Making code easier to maintain.</li>
        </ul>
        <p>
          For example, two packages can contain classes with the same name.
        </p>
      </>
    ),
    code: `package com.preptrack.student;

public class Student {
    String name;
}`,
  },
  {
    title: "2. Package Naming Convention",
    content: (
      <>
        <p>
          Package names are conventionally written in lowercase.
        </p>
        <p>
          Developers often use a reversed domain name to create a unique
          package namespace.
        </p>
        <p>
          For example, a company with the domain example.com might use
          <code> com.example</code>.
        </p>
      </>
    ),
    code: `com.company.project
com.company.project.model
com.company.project.service
com.company.project.controller

// Avoid:
Com.Company.Project`,
  },
  {
    title: "3. Package Declaration",
    content: (
      <>
        <p>
          The package declaration tells Java which package the source file
          belongs to.
        </p>
        <p>
          If present, it must appear before import declarations and type
          declarations, apart from comments and annotations allowed there.
        </p>
      </>
    ),
    code: `package com.preptrack;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("PrepTrack");
    }
}`,
  },
  {
    title: "4. Folder Structure",
    content: (
      <>
        <p>
          Package names usually correspond to directory structure.
        </p>
        <p>
          The compiler and runtime use the package name and class name to
          locate classes through the class path or module path.
        </p>
      </>
    ),
    code: `src/
└── com/
    └── preptrack/
        ├── Main.java
        └── student/
            └── Student.java

// Student.java
package com.preptrack.student;

public class Student {
}`,
  },
  {
    title: "5. Import Statement",
    content: (
      <>
        <p>
          The import statement lets you refer to types by their simple names
          instead of writing their fully qualified names every time.
        </p>
        <p>
          Importing a package does not import its subpackages automatically.
        </p>
      </>
    ),
    code: `import java.util.Scanner;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<String> names = new ArrayList<>();
    }
}`,
  },
  {
    title: "6. Fully Qualified Class Name",
    content: (
      <>
        <p>
          A fully qualified name includes the package name and the type name.
        </p>
        <p>
          It can be used without an import statement.
        </p>
        <p>
          This is useful when two packages contain classes with the same
          simple name.
        </p>
      </>
    ),
    code: `public class Main {
    public static void main(String[] args) {
        java.util.Date date =
            new java.util.Date();

        System.out.println(date);
    }
}`,
  },
  {
    title: "7. Wildcard Imports",
    content: (
      <>
        <p>
          A wildcard import imports accessible types declared directly in
          the specified package.
        </p>
        <p>
          It does not import subpackages, and it does not import static
          members.
        </p>
        <p>
          Wildcard imports are legal, but explicit imports can make
          dependencies easier to see.
        </p>
      </>
    ),
    code: `import java.util.*;

// Does not import:
// java.util.concurrent.*

// Static members need static imports,
// or can be accessed through their class.`,
  },
  {
    title: "8. Static Import",
    content: (
      <>
        <p>
          A static import allows static fields and methods to be accessed
          without qualifying them with the class name.
        </p>
        <p>
          Use it carefully. Too many static imports can make the origin of
          a method or constant unclear.
        </p>
      </>
    ),
    code: `import static java.lang.Math.PI;
import static java.lang.Math.sqrt;

public class Main {
    public static void main(String[] args) {
        System.out.println(PI);
        System.out.println(sqrt(25));
    }
}`,
  },
  {
    title: "9. Access Modifiers",
    content: (
      <>
        <p>
          Access modifiers control where classes, methods, fields, and
          constructors can be accessed.
        </p>
        <ul>
          <li><strong>public:</strong> Accessible wherever the type or member is visible.</li>
          <li><strong>protected:</strong> Accessible within the package and under subclass access rules.</li>
          <li><strong>default:</strong> Package-private access when no modifier is written.</li>
          <li><strong>private:</strong> Accessible within the declaring top-level class or nest.</li>
        </ul>
        <p>
          Top-level classes can generally be public or package-private.
        </p>
      </>
    ),
    code: `public class Student {
    public String name;
    protected int age;
    String department; // package-private
    private int marks;
}`,
  },
  {
    title: "10. Package Access Example",
    content: (
      <>
        <p>
          Package-private members can be accessed by classes in the same
          package, but not by unrelated classes in another package.
        </p>
        <p>
          This is useful for hiding implementation details from code outside
          the package.
        </p>
      </>
    ),
    code: `// File: Student.java
package com.preptrack;

public class Student {
    int marks = 90;
}

// Another class in com.preptrack
package com.preptrack;

public class Test {
    public static void main(String[] args) {
        Student s = new Student();
        System.out.println(s.marks);
    }
}`,
  },
  {
    title: "11. Packages and Encapsulation",
    content: (
      <>
        <p>
          Packages can help organize encapsulated components.
        </p>
        <p>
          A class can expose a small public API while keeping helper classes
          and package-private methods hidden from other packages.
        </p>
        <p>
          Remember: package-private access is not the same as private access.
        </p>
      </>
    ),
    code: `package com.preptrack.service;

public class StudentService {
    public void register() {
        validateStudent();
    }

    private void validateStudent() {
        System.out.println("Validated");
    }
}`,
  },
  {
    title: "12. What Is a JAR?",
    content: (
      <>
        <p>
          JAR stands for Java Archive.
        </p>
        <p>
          A JAR file packages compiled classes, resources, and metadata into
          an archive format based on ZIP.
        </p>
        <p>
          JAR files are commonly used to distribute Java libraries and
          applications.
        </p>
      </>
    ),
    code: `// Create a JAR
jar --create --file app.jar Main.class

// List its contents
jar --list --file app.jar

// Extract its contents
jar --extract --file app.jar`,
  },
  {
    title: "13. Classpath",
    content: (
      <>
        <p>
          The class path tells Java tools where to find classes and
          libraries.
        </p>
        <p>
          It can contain directories and JAR files.
        </p>
        <p>
          The class path is commonly used for class-path-based applications
          that do not use the Java module system.
        </p>
      </>
    ),
    code: `// Windows
java -cp ".;lib\\library.jar" Main

// Linux or macOS
java -cp ".:lib/library.jar" Main`,
  },
  {
    title: "14. What Is the Java Module System?",
    content: (
      <>
        <p>
          The Java Platform Module System was introduced in Java 9.
        </p>
        <p>
          A module groups related packages and declares:
        </p>
        <ul>
          <li>Which modules it depends on.</li>
          <li>Which packages it exports.</li>
          <li>Which services it uses or provides.</li>
        </ul>
        <p>
          The module system makes dependencies and package visibility more
          explicit.
        </p>
      </>
    ),
    code: `module com.preptrack.app {
    requires java.sql;

    exports com.preptrack.api;
}`,
  },
  {
    title: "15. module-info.java",
    content: (
      <>
        <p>
          The module descriptor is written in a file named
          <code> module-info.java</code>.
        </p>
        <p>
          It declares the module name and its requirements, exports, and
          other module directives.
        </p>
        <p>
          A named module normally has one module descriptor at its root.
        </p>
      </>
    ),
    code: `module com.preptrack.student {
    requires java.logging;

    exports com.preptrack.student.api;
}`,
  },
  {
    title: "16. requires Directive",
    content: (
      <>
        <p>
          The <code>requires</code> directive declares a dependency on
          another module.
        </p>
        <p>
          The required module must be observable and available when the
          module is compiled or resolved at runtime.
        </p>
      </>
    ),
    code: `module com.preptrack.app {
    requires java.sql;
    requires java.logging;
}`,
  },
  {
    title: "17. exports Directive",
    content: (
      <>
        <p>
          The <code>exports</code> directive makes a package's public types
          accessible to other modules.
        </p>
        <p>
          Exporting a package does not make its private or package-private
          members public.
        </p>
      </>
    ),
    code: `module com.preptrack.core {
    exports com.preptrack.api;
}

// Other modules can access public types
// in the exported package, subject to
// normal Java access rules.`,
  },
  {
    title: "18. opens Directive",
    content: (
      <>
        <p>
          The <code>opens</code> directive allows deep reflection on types
          in a package at runtime.
        </p>
        <p>
          It is commonly useful for frameworks that inspect private members
          through reflection.
        </p>
        <p>
          An opened package is not the same as an exported package.
        </p>
      </>
    ),
    code: `module com.preptrack.model {
    opens com.preptrack.model.entities;
}

// opens supports deep reflection.
// exports provides ordinary access
// to public types.`,
  },
  {
    title: "19. exports vs opens",
    content: (
      <>
        <p>
          These directives serve different purposes.
        </p>
        <ul>
          <li>
            <strong>exports:</strong> Makes public types in a package
            accessible for normal use.
          </li>
          <li>
            <strong>opens:</strong> Allows deep reflective access to types
            and members in a package at runtime.
          </li>
        </ul>
        <p>
          A package may be exported, opened, both, or neither.
        </p>
      </>
    ),
    code: `module com.preptrack {
    exports com.preptrack.api;
    opens com.preptrack.entities;
}`,
  },
  {
    title: "20. requires transitive",
    content: (
      <>
        <p>
          <code>requires transitive</code> declares a dependency that is
          also readable by modules that depend on the current module.
        </p>
        <p>
          Use it when your module's public API exposes types from another
          module and downstream modules need that dependency.
        </p>
      </>
    ),
    code: `module com.preptrack.api {
    requires transitive java.sql;
}

// A module requiring com.preptrack.api
// also reads java.sql.`,
  },
  {
    title: "21. requires static",
    content: (
      <>
        <p>
          <code>requires static</code> declares a dependency required at
          compile time but optional during runtime resolution.
        </p>
        <p>
          It is useful for optional annotations or compile-time-only
          dependencies, provided the code can run without that module.
        </p>
      </>
    ),
    code: `module com.preptrack.app {
    requires static some.optional.module;
}`,
  },
  {
    title: "22. Automatic and Unnamed Modules",
    content: (
      <>
        <p>
          A JAR without a module descriptor can be placed on the module path
          and treated as an automatic module.
        </p>
        <p>
          Classes loaded from the class path belong to an unnamed module.
        </p>
        <p>
          Automatic and unnamed modules are useful for migration, but they
          do not provide the same explicit encapsulation as a well-defined
          named module.
        </p>
      </>
    ),
    code: `// Class path:
java -cp "lib/example.jar;." Main

// Module path:
java --module-path lib --module com.example.app`,
  },
  {
    title: "23. Compile and Run a Modular Application",
    content: (
      <>
        <p>
          A simple modular application can be compiled using the module
          source path and run using the module path.
        </p>
        <p>
          The module name and main class are separated by a slash when
          launching with <code>--module</code>.
        </p>
      </>
    ),
    code: `// Example structure
src/
└── com.preptrack.app/
    ├── module-info.java
    └── com/
        └── preptrack/
            └── Main.java

// Compile
javac -d out --module-source-path src ^
  -m com.preptrack.app

// Run
java --module-path out ^
  --module com.preptrack.app/com.preptrack.Main`,
  },
  {
    title: "24. Common Mistakes",
    content: (
      <>
        <ul>
          <li>Assuming wildcard imports include subpackages.</li>
          <li>Confusing package-private with private.</li>
          <li>Thinking import loads or copies a class.</li>
          <li>Thinking exports allows deep reflection.</li>
          <li>Using module names as if they were package names.</li>
          <li>Mixing class path and module path without understanding the difference.</li>
          <li>Assuming every JAR is a named module.</li>
        </ul>
      </>
    ),
    code: `// Package:
com.preptrack.student

// Module:
com.preptrack.student.module

// They are different concepts.
// A module can contain multiple packages.`,
  },
  {
    title: "25. Interview Questions",
    content: (
      <>
        <ol>
          <li>What is a Java package?</li>
          <li>Why are packages used?</li>
          <li>What is a fully qualified class name?</li>
          <li>What is the difference between import and package?</li>
          <li>Does import java.util.* import subpackages?</li>
          <li>Explain Java access modifiers.</li>
          <li>What is a JAR file?</li>
          <li>What is the class path?</li>
          <li>What is the Java module system?</li>
          <li>What is module-info.java?</li>
          <li>Explain requires and exports.</li>
          <li>Difference between exports and opens?</li>
          <li>What is requires transitive?</li>
          <li>What is requires static?</li>
          <li>What are automatic and unnamed modules?</li>
        </ol>
      </>
    ),
    code: `// Practice task:
// Create two packages:
// com.preptrack.model
// com.preptrack.service
//
// Create a Student class in model.
// Create a StudentService in service.
// Import Student and use it.
//
// Then create module-info.java and
// export the public API package.`,
  },
];

export default function ModulesLesson({ onBack }) {
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
        Java Modules & Packages
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn how Java organizes classes, controls access, packages
        libraries, and declares module dependencies.
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
          <li>Understand package declaration and folder structure.</li>
          <li>Know import, wildcard import, and static import.</li>
          <li>Understand access modifiers and package-private access.</li>
          <li>Know JAR, class path, and module path.</li>
          <li>Understand module-info.java and module directives.</li>
          <li>Distinguish exports from opens.</li>
          <li>Practice creating a multi-package Java application.</li>
        </ul>
      </section>
    </div>
  );
}
