

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
    title: "1. What are annotations?",
    content: (
      <>
        <p>
          An annotation is metadata added to Java code. It gives
          information to the compiler, tools, frameworks, or runtime
          programs.
        </p>
        <p>
          An annotation does not automatically execute a method.
          Its effect depends on the tool or program that reads it.
        </p>
      </>
    ),
    code: `@Override
public String toString() {
    return "Java";
}`,
  },
  {
    title: "2. Why are annotations used?",
    content: (
      <>
        <ul>
          <li>Give instructions or information to the compiler.</li>
          <li>Help detect programming mistakes.</li>
          <li>Provide metadata for frameworks and tools.</li>
          <li>Support testing, dependency injection, and serialization.</li>
          <li>Allow runtime inspection when configured for it.</li>
        </ul>
      </>
    ),
    code: `@Deprecated
public void oldMethod() {
    // Old implementation
}

// Compiler can warn when
// oldMethod() is used.`,
  },
  {
    title: "3. Built-in annotations",
    content: (
      <>
        <p>
          Java provides several commonly used annotations.
        </p>
        <ul>
          <li>@Override — indicates a method overrides a parent method.</li>
          <li>@Deprecated — marks an API as deprecated.</li>
          <li>@SuppressWarnings — suppresses selected compiler warnings.</li>
          <li>@FunctionalInterface — checks functional interface rules.</li>
        </ul>
      </>
    ),
    code: `@Override
public void display() {
    System.out.println("Hello");
}

@Deprecated
void oldMethod() {
}

@SuppressWarnings("unchecked")
void example() {
    // Warning suppression
}`,
  },
  {
    title: "4. @Override",
    content: (
      <>
        <p>
          @Override tells the compiler that a method is intended
          to override a superclass method or implement an interface
          method.
        </p>
        <p>
          If the method signature is incorrect, the compiler
          reports an error.
        </p>
      </>
    ),
    code: `class Parent {
    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    @Override
    void show() {
        System.out.println("Child");
    }
}`,
  },
  {
    title: "5. @Deprecated",
    content: (
      <>
        <p>
          @Deprecated marks a class, method, or field as outdated
          or discouraged for use.
        </p>
        <p>
          It does not delete the API. It signals that newer code
          should avoid using it when possible.
        </p>
      </>
    ),
    code: `@Deprecated
public void oldMethod() {
    System.out.println("Old");
}

// Better practice:
@Deprecated(since = "2.0", forRemoval = true)
public void legacyMethod() {
}`,
  },
  {
    title: "6. @SuppressWarnings",
    content: (
      <>
        <p>
          @SuppressWarnings asks the compiler to suppress specific
          warning categories in a particular scope.
        </p>
        <p>
          Use it narrowly. Suppressing warnings without understanding
          them can hide real bugs.
        </p>
      </>
    ),
    code: `@SuppressWarnings("unchecked")
List<String> names =
    (List<String>) someObject;

// Common warning names:
// "unchecked"
// "deprecation"
// "rawtypes"`,
  },
  {
    title: "7. Custom annotations",
    content: (
      <>
        <p>
          You can create your own annotation using the @interface
          keyword.
        </p>
        <p>
          Annotation elements look like methods and may have
          default values.
        </p>
      </>
    ),
    code: `@interface Author {
    String name();
    int year();
}

@Author(name = "Angel", year = 2026)
class MyClass {
}`,
  },
  {
    title: "8. Annotation elements",
    content: (
      <>
        <p>
          Annotation elements can use supported types such as
          primitive types, String, Class, enums, other annotations,
          and arrays of these types.
        </p>
        <p>
          Annotation elements cannot use arbitrary objects such
          as ArrayList or custom class instances.
        </p>
      </>
    ),
    code: `enum Level {
    BEGINNER,
    INTERMEDIATE,
    ADVANCED
}

@interface Topic {
    String name();
    Level level() default Level.BEGINNER;
    String[] tags() default {};
}

@Topic(
    name = "Reflection",
    level = Level.ADVANCED,
    tags = {"Java", "Runtime"}
)
class ReflectionTopic {
}`,
  },
  {
    title: "9. Annotation defaults",
    content: (
      <>
        <p>
          The default keyword provides a value when an annotation
          element is not explicitly supplied.
        </p>
        <p>
          Elements without defaults are required when the annotation
          is used.
        </p>
      </>
    ),
    code: `@interface Student {
    String name();
    int age() default 18;
}

@Student(name = "Ravi")
class StudentData {
}

// age uses the default value 18`,
  },
  {
    title: "10. @Retention",
    content: (
      <>
        <p>
          @Retention controls how long an annotation is retained.
        </p>
        <ul>
          <li>SOURCE — available in source code only.</li>
          <li>CLASS — stored in the class file; not necessarily available at runtime.</li>
          <li>RUNTIME — available through runtime reflection.</li>
        </ul>
        <p>
          RUNTIME is required when you want to inspect an annotation
          using reflection after the program starts.
        </p>
      </>
    ),
    code: `import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@interface Info {
    String value();
}

@Info("Demo class")
class Demo {
}`,
  },
  {
    title: "11. @Target",
    content: (
      <>
        <p>
          @Target specifies where an annotation may be applied.
        </p>
        <p>
          Common targets include TYPE, METHOD, FIELD,
          CONSTRUCTOR, PARAMETER, and TYPE_USE.
        </p>
      </>
    ),
    code: `@Target({
    ElementType.TYPE,
    ElementType.METHOD
})
@Retention(RetentionPolicy.RUNTIME)
@interface Track {
    String value();
}

@Track("class")
class Example {

    @Track("method")
    void display() {
    }
}`,
  },
  {
    title: "12. @Documented and @Inherited",
    content: (
      <>
        <p>
          @Documented indicates that an annotation should appear
          in generated Javadoc.
        </p>
        <p>
          @Inherited allows a class-level annotation to be
          inherited from a superclass when queried using
          getAnnotation().
        </p>
        <p>
          @Inherited does not apply to methods, fields,
          interfaces, or arbitrary annotation locations.
        </p>
      </>
    ),
    code: `@Documented
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Role {
    String value();
}

@Role("Admin")
class Parent {
}

class Child extends Parent {
}

// Child.class.getAnnotation(Role.class)
// can return the inherited annotation`,
  },
  {
    title: "13. Repeatable annotations",
    content: (
      <>
        <p>
          @Repeatable allows the same annotation type to be
          applied multiple times to one declaration.
        </p>
        <p>
          A container annotation stores the repeated annotations.
        </p>
      </>
    ),
    code: `@Retention(RetentionPolicy.RUNTIME)
@interface Tags {
    Tag[] value();
}

@Repeatable(Tags.class)
@Retention(RetentionPolicy.RUNTIME)
@interface Tag {
    String value();
}

@Tag("Java")
@Tag("Backend")
class Project {
}`,
  },
  {
    title: "14. What is reflection?",
    content: (
      <>
        <p>
          Reflection allows a Java program to inspect classes,
          constructors, fields, methods, and annotations at runtime.
        </p>
        <p>
          It is commonly used by frameworks, testing tools,
          dependency injection systems, and serializers.
        </p>
      </>
    ),
    code: `Class<?> clazz = String.class;

System.out.println(clazz.getName());
System.out.println(clazz.getSimpleName());
System.out.println(clazz.getPackageName());`,
  },
  {
    title: "15. The Class object",
    content: (
      <>
        <p>
          Every loaded Java class has a corresponding Class object.
          It represents the class's metadata.
        </p>
        <p>
          You can obtain a Class object in several ways.
        </p>
      </>
    ),
    code: `// Using .class
Class<String> c1 = String.class;

// Using getClass()
String text = "Java";
Class<?> c2 = text.getClass();

// Using class name
Class<?> c3 =
    Class.forName("java.lang.String");`,
  },
  {
    title: "16. getName() vs getSimpleName()",
    content: (
      <>
        <p>
          getName() returns the fully qualified class name.
          getSimpleName() returns the short class name.
        </p>
      </>
    ),
    code: `Class<?> clazz = java.util.ArrayList.class;

System.out.println(clazz.getName());
// java.util.ArrayList

System.out.println(clazz.getSimpleName());
// ArrayList`,
  },
  {
    title: "17. Inspecting fields",
    content: (
      <>
        <p>
          Reflection can inspect fields declared in a class
          or fields that are accessible through its class hierarchy.
        </p>
        <ul>
          <li>getDeclaredFields() — fields declared directly in the class.</li>
          <li>getFields() — public fields, including inherited public fields.</li>
        </ul>
      </>
    ),
    code: `import java.lang.reflect.*;

class Person {
    private String name;
    public int age;
}

Class<?> clazz = Person.class;

Field[] fields =
    clazz.getDeclaredFields();

for (Field field : fields) {
    System.out.println(field.getName());
    System.out.println(field.getType());
    System.out.println(field.getModifiers());
}`,
  },
  {
    title: "18. Inspecting methods",
    content: (
      <>
        <p>
          Reflection can inspect method names, return types,
          parameter types, and modifiers.
        </p>
        <ul>
          <li>getDeclaredMethods() — methods declared in the class.</li>
          <li>getMethods() — public methods, including inherited ones.</li>
        </ul>
      </>
    ),
    code: `Class<?> clazz = String.class;

Method[] methods =
    clazz.getDeclaredMethods();

for (Method method : methods) {
    System.out.println(method.getName());
    System.out.println(method.getReturnType());
    System.out.println(
        Arrays.toString(method.getParameterTypes())
    );
}`,
  },
  {
    title: "19. Inspecting constructors",
    content: (
      <>
        <p>
          Constructor objects represent class constructors.
          They can be inspected and, with appropriate access,
          used to create objects.
        </p>
        <p>
          getDeclaredConstructors() returns constructors
          declared directly in the class.
        </p>
      </>
    ),
    code: `Class<?> clazz = StringBuilder.class;

Constructor<?>[] constructors =
    clazz.getDeclaredConstructors();

for (Constructor<?> constructor : constructors) {
    System.out.println(constructor);
}`,
  },
  {
    title: "20. Calling a method using reflection",
    content: (
      <>
        <p>
          Method.invoke() calls a method on an object.
        </p>
        <p>
          The first argument is the target object.
          Remaining arguments are the method's parameters.
        </p>
        <p>
          For static methods, the target object can be null.
        </p>
      </>
    ),
    code: `import java.lang.reflect.*;

class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

Calculator calc = new Calculator();

Method method =
    Calculator.class.getMethod(
        "add", int.class, int.class
    );

Object result =
    method.invoke(calc, 10, 20);

System.out.println(result);`,
  },
  {
    title: "21. Creating objects using reflection",
    content: (
      <>
        <p>
          Constructor.newInstance() creates an object
          through a reflected constructor.
        </p>
        <p>
          Prefer ordinary object creation when the class
          is already known. Reflection is useful when the
          class is selected dynamically.
        </p>
      </>
    ),
    code: `Class<?> clazz =
    Class.forName("java.lang.StringBuilder");

Constructor<?> constructor =
    clazz.getConstructor();

Object object =
    constructor.newInstance();

System.out.println(object);`,
  },
  {
    title: "22. Accessing private members",
    content: (
      <>
        <p>
          Reflection can sometimes access non-public members
          using setAccessible(true).
        </p>
        <p>
          Modern Java module boundaries may prevent access.
          setAccessible(true) is not a universal bypass.
        </p>
        <p>
          Avoid accessing private fields when ordinary public
          APIs are available.
        </p>
      </>
    ),
    code: `class Secret {
    private String password = "abc";
}

Secret secret = new Secret();

Field field =
    Secret.class.getDeclaredField("password");

field.setAccessible(true);

Object value = field.get(secret);

System.out.println(value);`,
  },
  {
    title: "23. Reading annotations with reflection",
    content: (
      <>
        <p>
          An annotation can be read at runtime only when
          its retention policy is RUNTIME.
        </p>
        <p>
          getAnnotation() returns an annotation of the
          requested type, or null if it is not present.
        </p>
      </>
    ),
    code: `@Retention(RetentionPolicy.RUNTIME)
@interface Info {
    String value();
}

@Info("Important")
class Demo {
}

Info info =
    Demo.class.getAnnotation(Info.class);

if (info != null) {
    System.out.println(info.value());
}`,
  },
  {
    title: "24. getAnnotation() vs getDeclaredAnnotation()",
    content: (
      <>
        <p>
          getAnnotation() can return an annotation inherited
          from a superclass when the annotation type is
          marked @Inherited.
        </p>
        <p>
          getDeclaredAnnotation() checks only the annotation
          directly present on that element.
        </p>
      </>
    ),
    code: `Role inherited =
    Child.class.getAnnotation(Role.class);

Role declared =
    Child.class.getDeclaredAnnotation(Role.class);

// inherited may be non-null
// declared may be null`,
  },
  {
    title: "25. Reflection exceptions",
    content: (
      <>
        <p>
          Reflection APIs can throw checked or runtime exceptions.
          Handle the relevant exceptions rather than hiding them.
        </p>
        <ul>
          <li>ClassNotFoundException</li>
          <li>NoSuchMethodException</li>
          <li>NoSuchFieldException</li>
          <li>IllegalAccessException</li>
          <li>InvocationTargetException</li>
          <li>InstantiationException</li>
        </ul>
      </>
    ),
    code: `try {
    Class<?> clazz =
        Class.forName("com.example.Demo");

    Object object =
        clazz.getConstructor().newInstance();

} catch (ClassNotFoundException e) {
    e.printStackTrace();
} catch (ReflectiveOperationException e) {
    e.printStackTrace();
}`,
  },
  {
    title: "26. InvocationTargetException",
    content: (
      <>
        <p>
          Method.invoke() wraps an exception thrown by the
          invoked method inside InvocationTargetException.
        </p>
        <p>
          getCause() returns the original exception thrown
          by the target method.
        </p>
      </>
    ),
    code: `try {
    method.invoke(target);
} catch (InvocationTargetException e) {
    Throwable original = e.getCause();
    original.printStackTrace();
}`,
  },
  {
    title: "27. Reflection performance and risks",
    content: (
      <>
        <ul>
          <li>Reflection can be slower than direct method calls.</li>
          <li>It reduces compile-time type safety.</li>
          <li>It can make code harder to understand and maintain.</li>
          <li>Private access may be blocked by module restrictions.</li>
          <li>Use it when dynamic inspection is genuinely needed.</li>
        </ul>
      </>
    ),
    code: `// Direct call:
calculator.add(10, 20);

// Reflective call:
method.invoke(calculator, 10, 20);

// Direct calls are generally
// simpler and easier to optimize.`,
  },
  {
    title: "28. Where annotations and reflection are used",
    content: (
      <>
        <ul>
          <li>JUnit uses annotations to identify tests.</li>
          <li>Spring uses annotations for configuration and dependency injection.</li>
          <li>ORM tools use metadata to map objects to database tables.</li>
          <li>Serialization libraries inspect fields and methods.</li>
          <li>Testing tools inspect classes and invoke methods.</li>
        </ul>
        <p>
          These frameworks use additional logic. The annotation
          itself does not perform the framework's behavior.
        </p>
      </>
    ),
    code: `// Example framework-style annotation:
@interface Test {
}

// A testing framework could inspect
// methods marked @Test and execute them.`,
  },
  {
    title: "29. Practice problems",
    content: (
      <>
        <ol>
          <li>Create a custom annotation named Author.</li>
          <li>Use @Retention(RUNTIME) on the annotation.</li>
          <li>Apply the annotation to a class.</li>
          <li>Read the annotation using reflection.</li>
          <li>Print all declared fields of a class.</li>
          <li>Print all declared methods and parameter types.</li>
          <li>Create an object using a reflected constructor.</li>
          <li>Invoke a public method using Method.invoke().</li>
          <li>Read a private field in a controlled example.</li>
          <li>Explain the difference between getMethods() and getDeclaredMethods().</li>
        </ol>
      </>
    ),
    code: `// Practice: inspect a class

Class<?> clazz = Student.class;

System.out.println(clazz.getName());

for (Field field :
        clazz.getDeclaredFields()) {
    System.out.println(field.getName());
}`,
  },
  {
    title: "30. Interview questions",
    content: (
      <>
        <ol>
          <li>What is an annotation in Java?</li>
          <li>What are built-in annotations?</li>
          <li>How do you create a custom annotation?</li>
          <li>What is @Retention?</li>
          <li>What is @Target?</li>
          <li>What is @Inherited?</li>
          <li>What is a repeatable annotation?</li>
          <li>What is reflection?</li>
          <li>What is the Class object?</li>
          <li>getDeclaredFields() vs getFields()?</li>
          <li>getDeclaredMethods() vs getMethods()?</li>
          <li>How can reflection invoke a method?</li>
          <li>How can reflection create an object?</li>
          <li>Can reflection access private members?</li>
          <li>What is InvocationTargetException?</li>
          <li>What are the disadvantages of reflection?</li>
          <li>How do frameworks use annotations and reflection?</li>
        </ol>
      </>
    ),
    code: `// Quick revision

Annotation -> metadata
@interface -> custom annotation
Retention -> annotation lifetime
Target -> where annotation is allowed
Reflection -> runtime inspection
Class<?> -> class metadata
Field -> field metadata
Method -> method metadata
Constructor -> constructor metadata
invoke() -> call reflected method
newInstance() -> create reflected object`,
  },
];

export default function ReflectionAnnotationsLesson({ onBack }) {
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
        Java Reflection & Annotations
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn built-in and custom annotations, retention policies,
        reflection APIs, inspecting classes, fields, methods,
        constructors, and runtime annotation processing.
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
          <li>I understand built-in and custom annotations.</li>
          <li>I can define annotation retention and targets.</li>
          <li>I understand the Class object.</li>
          <li>I can inspect fields, methods, and constructors.</li>
          <li>I can invoke a method using reflection.</li>
          <li>I can read runtime annotations.</li>
          <li>I understand reflection exceptions and limitations.</li>
          <li>I know when reflection should and should not be used.</li>
        </ul>
      </section>
    </div>
  );
}
