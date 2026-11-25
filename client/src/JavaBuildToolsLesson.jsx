
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
    title: "1. What Are Java Build Tools?",
    content: (
      <>
        <p>
          A build tool automates the steps needed to turn source code
          into a usable application.
        </p>
        <p>
          Typical build tasks include compiling Java files, downloading
          libraries, running tests, packaging code, and preparing
          applications for deployment.
        </p>
        <p>
          Maven and Gradle are two widely used Java build tools.
        </p>
      </>
    ),
    code: `// Without a build tool:
// Compile files manually
// Find and download libraries
// Configure classpath
// Run tests manually
// Create JAR manually
//
// With Maven or Gradle:
// Automate these tasks through a build file.`,
  },
  {
    title: "2. Why Do We Need Build Tools?",
    content: (
      <>
        <ul>
          <li>Manage external libraries.</li>
          <li>Compile source code consistently.</li>
          <li>Run automated tests.</li>
          <li>Package applications into JAR files.</li>
          <li>Share a repeatable build process.</li>
          <li>Support continuous integration pipelines.</li>
        </ul>
      </>
    ),
    code: `// Example project needs:
//
// Java code
// SQLite JDBC library
// JUnit testing library
//
// Build tool downloads dependencies
// and configures them for the project.`,
  },
  {
    title: "3. What Is Maven?",
    content: (
      <>
        <p>
          Apache Maven is a build and project management tool.
        </p>
        <p>
          Maven commonly uses an XML file named pom.xml to describe
          project information, dependencies, plugins, and build
          configuration.
        </p>
        <p>
          Maven follows conventions for directory structure and
          build lifecycle.
        </p>
      </>
    ),
    code: `// Maven project:
//
// project/
//   pom.xml
//   src/
//     main/
//       java/
//     test/
//       java/`,
  },
  {
    title: "4. What Is pom.xml?",
    content: (
      <>
        <p>
          pom.xml means Project Object Model.
        </p>
        <p>
          It describes the Maven project, including its coordinates,
          dependencies, build settings, and plugins.
        </p>
        <p>
          Maven reads this file to understand how the project
          should be built.
        </p>
      </>
    ),
    code: `<project>
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>student-app</artifactId>
    <version>1.0.0</version>
</project>`,
  },
  {
    title: "5. Maven Coordinates",
    content: (
      <>
        <p>
          Maven identifies artifacts using coordinates.
        </p>
        <ul>
          <li>groupId: organization or project group.</li>
          <li>artifactId: name of the artifact.</li>
          <li>version: artifact version.</li>
        </ul>
        <p>
          Together, these values identify a particular version of
          a Maven artifact.
        </p>
      </>
    ),
    code: `<groupId>com.example</groupId>
<artifactId>student-app</artifactId>
<version>1.0.0</version>

// Coordinates:
// com.example:student-app:1.0.0`,
  },
  {
    title: "6. Maven Standard Directory Structure",
    content: (
      <>
        <p>
          Maven uses a conventional directory structure. Following
          the convention reduces the amount of configuration needed.
        </p>
        <p>
          Production code and test code are stored separately.
        </p>
      </>
    ),
    code: `student-app/
  pom.xml
  src/
    main/
      java/
        com/
          example/
            App.java
      resources/
    test/
      java/
        com/
          example/
            AppTest.java
      resources/
  target/`,
  },
  {
    title: "7. Maven Dependencies",
    content: (
      <>
        <p>
          A dependency is an external library your project needs.
        </p>
        <p>
          Maven can download dependencies from configured repositories
          and make them available during the appropriate build phases.
        </p>
        <p>
          Dependencies are declared in pom.xml.
        </p>
      </>
    ),
    code: `<dependencies>
    <dependency>
        <groupId>org.xerial</groupId>
        <artifactId>sqlite-jdbc</artifactId>
        <version>3.50.3.0</version>
    </dependency>
</dependencies>

// Always verify the library version
// and compatibility before using it.`,
  },
  {
    title: "8. Dependency Scope",
    content: (
      <>
        <p>
          Dependency scope controls where a dependency is available.
        </p>
        <ul>
          <li>compile: default scope; available in main compilation.</li>
          <li>provided: expected from the runtime environment.</li>
          <li>runtime: needed at runtime, not main compilation.</li>
          <li>test: needed only for tests.</li>
        </ul>
        <p>
          Choosing the correct scope avoids unnecessary dependencies
          in the final application.
        </p>
      </>
    ),
    code: `<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.12.2</version>
    <scope>test</scope>
</dependency>`,
  },
  {
    title: "9. Maven Build Lifecycle",
    content: (
      <>
        <p>
          Maven has predefined lifecycle phases.
        </p>
        <p>
          Important phases include validate, compile, test, package,
          verify, install, and deploy.
        </p>
        <p>
          Running a later phase executes the earlier phases in that
          lifecycle before it.
        </p>
      </>
    ),
    code: `mvn validate
mvn compile
mvn test
mvn package
mvn verify
mvn install
mvn deploy`,
  },
  {
    title: "10. Maven Commands",
    content: (
      <>
        <p>
          These commands are commonly used during development.
        </p>
        <p>
          The Maven Wrapper is preferred when the project provides it,
          because it helps use the configured Maven version.
        </p>
      </>
    ),
    code: `// Windows
mvnw.cmd clean
mvnw.cmd test
mvnw.cmd package

// If Maven is installed globally
mvn clean test
mvn package

// clean removes the generated target directory.
// Do not manually delete source files.`,
  },
  {
    title: "11. What Is Gradle?",
    content: (
      <>
        <p>
          Gradle is a build automation tool used in Java, Android,
          and many other projects.
        </p>
        <p>
          Gradle supports build scripts written in Groovy or Kotlin.
        </p>
        <p>
          Gradle emphasizes flexible task-based build configuration
          and incremental execution.
        </p>
      </>
    ),
    code: `// Gradle project:
//
// project/
//   settings.gradle
//   build.gradle
//   src/
//     main/
//       java/
//     test/
//       java/`,
  },
  {
    title: "12. build.gradle",
    content: (
      <>
        <p>
          build.gradle is a Gradle build script written using the
          Groovy DSL.
        </p>
        <p>
          It defines plugins, repositories, dependencies, and
          configuration for the project.
        </p>
      </>
    ),
    code: `plugins {
    id 'java'
}

group = 'com.example'
version = '1.0.0'

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(
        'org.junit.jupiter:junit-jupiter:5.12.2'
    )
}

test {
    useJUnitPlatform()
}`,
  },
  {
    title: "13. Kotlin DSL: build.gradle.kts",
    content: (
      <>
        <p>
          Gradle also supports Kotlin DSL.
        </p>
        <p>
          The file extension is build.gradle.kts.
        </p>
        <p>
          Kotlin DSL provides Kotlin syntax and editor support
          for build configuration.
        </p>
      </>
    ),
    code: `plugins {
    java
}

group = "com.example"
version = "1.0.0"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(
        "org.junit.jupiter:junit-jupiter:5.12.2"
    )
}

tasks.test {
    useJUnitPlatform()
}`,
  },
  {
    title: "14. Gradle Tasks",
    content: (
      <>
        <p>
          A task is a unit of work in Gradle.
        </p>
        <p>
          Examples include compiling code, running tests,
          creating a JAR, and cleaning build output.
        </p>
        <p>
          Gradle builds are organized around task dependencies.
        </p>
      </>
    ),
    code: `// Common Gradle tasks

gradlew.bat tasks
gradlew.bat clean
gradlew.bat build
gradlew.bat test
gradlew.bat jar`,
  },
  {
    title: "15. Maven vs Gradle",
    content: (
      <>
        <p>
          Maven uses a convention-driven lifecycle and XML
          configuration.
        </p>
        <p>
          Gradle uses a flexible task model and Groovy or Kotlin
          build scripts.
        </p>
        <p>
          Neither tool is automatically better for every project.
          Use the tool already selected by the project or team.
        </p>
      </>
    ),
    code: `// Maven
// - pom.xml
// - XML configuration
// - Lifecycle-based build
//
// Gradle
// - build.gradle or build.gradle.kts
// - Groovy or Kotlin DSL
// - Task-based build`,
  },
  {
    title: "16. JAR Files",
    content: (
      <>
        <p>
          JAR stands for Java Archive.
        </p>
        <p>
          A JAR is a ZIP-based archive that can contain class files,
          resources, and metadata.
        </p>
        <p>
          A JAR may be a library or an executable application,
          depending on its manifest and packaging.
        </p>
      </>
    ),
    code: `// Maven package output:
//
// target/student-app-1.0.0.jar
//
// Gradle jar output:
//
// build/libs/student-app-1.0.0.jar`,
  },
  {
    title: "17. Executable JAR",
    content: (
      <>
        <p>
          An executable JAR typically specifies the main class
          in its manifest.
        </p>
        <p>
          It can be launched using java -jar when its packaging
          and runtime dependencies are configured correctly.
        </p>
      </>
    ),
    code: `// Run an executable JAR
java -jar student-app.jar

// The manifest may contain:
// Main-Class: com.example.App`,
  },
  {
    title: "18. Maven Plugins",
    content: (
      <>
        <p>
          Maven plugins provide build functionality.
        </p>
        <p>
          The compiler plugin compiles Java code. The Surefire plugin
          runs tests. The JAR plugin packages classes into a JAR.
        </p>
        <p>
          Plugins can be configured in the build section of pom.xml.
        </p>
      </>
    ),
    code: `<build>
    <plugins>
        <plugin>
            <groupId>
                org.apache.maven.plugins
            </groupId>
            <artifactId>
                maven-compiler-plugin
            </artifactId>
            <version>3.14.0</version>
            <configuration>
                <release>17</release>
            </configuration>
        </plugin>
    </plugins>
</build>`,
  },
  {
    title: "19. Java Version Configuration",
    content: (
      <>
        <p>
          A project should declare the Java version it targets.
        </p>
        <p>
          This helps prevent different developers from compiling
          the same project with incompatible language settings.
        </p>
        <p>
          The JDK used to run the build and the target Java release
          should be configured intentionally.
        </p>
      </>
    ),
    code: `// Maven compiler configuration
<properties>
    <maven.compiler.release>17</maven.compiler.release>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>

// Gradle
java {
    toolchain {
        languageVersion =
            JavaLanguageVersion.of(17)
    }
}`,
  },
  {
    title: "20. Maven Wrapper and Gradle Wrapper",
    content: (
      <>
        <p>
          A wrapper lets a project specify the build tool version
          that should be used.
        </p>
        <p>
          It reduces the need for every developer to install
          the exact same Maven or Gradle version manually.
        </p>
        <p>
          Wrapper files should be committed to the project repository.
        </p>
      </>
    ),
    code: `// Maven Wrapper
mvnw
mvnw.cmd
.mvn/wrapper/

// Gradle Wrapper
gradlew
gradlew.bat
gradle/wrapper/`,
  },
  {
    title: "21. Dependency Conflict",
    content: (
      <>
        <p>
          A dependency conflict occurs when different libraries
          require different versions of the same dependency.
        </p>
        <p>
          Build tools resolve dependency graphs according to their
          resolution rules.
        </p>
        <p>
          Inspect the dependency tree when runtime errors or
          incompatible classes appear.
        </p>
      </>
    ),
    code: `// Maven
mvn dependency:tree

// Gradle
gradlew.bat dependencies

// Investigate:
// - Different versions
// - Transitive dependencies
// - Compatibility
// - Vulnerable library versions`,
  },
  {
    title: "22. Transitive Dependencies",
    content: (
      <>
        <p>
          A transitive dependency is a library required by another
          dependency.
        </p>
        <p>
          For example, your project may depend on Library A,
          which itself depends on Library B.
        </p>
        <p>
          Build tools can resolve and download these dependencies
          automatically.
        </p>
      </>
    ),
    code: `// Your application
//     |
//     v
// Library A
//     |
//     v
// Library B
//
// Library B is a transitive dependency
// if your project did not declare it directly.`,
  },
  {
    title: "23. Build and Continuous Integration",
    content: (
      <>
        <p>
          Continuous Integration (CI) automatically builds and tests
          code when changes are pushed or submitted.
        </p>
        <p>
          A typical Java CI pipeline checks out code, configures
          the JDK, runs the build, executes tests, and stores
          build artifacts.
        </p>
      </>
    ),
    code: `// Typical CI steps
//
// 1. Checkout repository
// 2. Configure JDK
// 3. Run Maven or Gradle build
// 4. Run tests
// 5. Publish test results
// 6. Store build artifact`,
  },
  {
    title: "24. Common Build Errors",
    content: (
      <>
        <ul>
          <li>Dependency could not be downloaded.</li>
          <li>Wrong JDK version is configured.</li>
          <li>Compilation error in source code.</li>
          <li>Test failed during the build.</li>
          <li>Plugin version is incompatible.</li>
          <li>Network or repository configuration issue.</li>
        </ul>
        <p>
          Read the first meaningful error in the build output.
          The final failure message may only describe the consequence.
        </p>
      </>
    ),
    code: `// Useful troubleshooting commands

java -version
javac -version

// Maven
mvn -version
mvn clean test

// Gradle
gradlew.bat --version
gradlew.bat clean build`,
  },
  {
    title: "25. Interview Questions",
    content: (
      <>
        <ol>
          <li>What is a build tool?</li>
          <li>What is Maven?</li>
          <li>What is pom.xml?</li>
          <li>What are Maven coordinates?</li>
          <li>What is a dependency scope?</li>
          <li>Explain the Maven lifecycle.</li>
          <li>What is Gradle?</li>
          <li>What is a Gradle task?</li>
          <li>What is the difference between Maven and Gradle?</li>
          <li>What is a transitive dependency?</li>
          <li>What is a JAR?</li>
          <li>Why use a build wrapper?</li>
        </ol>
      </>
    ),
    code: `// Interview answer:
//
// Define the build tool.
// Explain dependency management.
// Explain compile/test/package.
// Compare Maven and Gradle.
// Give a real project example.`,
  },
  {
    title: "26. Practice Tasks",
    content: (
      <>
        <ol>
          <li>Create a simple Maven Java project.</li>
          <li>Add a dependency to pom.xml.</li>
          <li>Compile and package the project.</li>
          <li>Run tests using Maven.</li>
          <li>Create a simple Gradle Java project.</li>
          <li>Add a test dependency in Gradle.</li>
          <li>Inspect the dependency tree.</li>
          <li>Build a JAR and run it.</li>
        </ol>
      </>
    ),
    code: `// Mini project:
//
// Create a Java console application
// using Maven or Gradle.
//
// Requirements:
// - Standard source structure
// - External dependency
// - Unit tests
// - Java version configuration
// - Buildable JAR
// - Wrapper committed to Git`,
  },
];

export default function JavaBuildToolsLesson({ onBack }) {
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
        Java Build Tools — Maven & Gradle
      </h1>

      <p
        style={{
          color: "var(--muted, #6b7280)",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        Learn how Java projects manage dependencies, compile source
        code, run tests, and package applications using Maven and
        Gradle.
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
          <li>Understand the purpose of build tools.</li>
          <li>Know Maven and pom.xml.</li>
          <li>Understand dependencies and scopes.</li>
          <li>Know the Maven build lifecycle.</li>
          <li>Understand Gradle build scripts and tasks.</li>
          <li>Know Maven vs Gradle.</li>
          <li>Understand JAR packaging.</li>
          <li>Know how wrappers and CI builds work.</li>
        </ul>
      </section>
    </div>
  );
}
