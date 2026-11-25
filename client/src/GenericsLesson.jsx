

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
    title: "1. What are Generics?",
    content: (
      <>
        <p>
          Generics allow classes, interfaces, and methods to work with
          different data types while maintaining compile-time type safety.
        </p>
        <p>
          Instead of writing separate classes for Integer, String, and
          other types, you can write one reusable generic class.
        </p>
      </>
    ),
    code: `// Without generics:
class IntegerBox {
    int value;
}

// With generics:
class Box<T> {
    T value;
}`,
  },
  {
    title: "2. Why do we need Generics?",
    content: (
      <>
        <ul>
          <li>Provides compile-time type safety.</li>
          <li>Reduces unnecessary type casting.</li>
          <li>Improves code reusability.</li>
          <li>Helps prevent ClassCastException caused by wrong types.</li>
        </ul>
      </>
    ),
    code: `// Without generics:
Object value = "Java";
String text = (String) value;

// With generics:
String value2 = "Java";
String text2 = value2;`,
  },
  {
    title: "3. Generic class",
    content: (
      <>
        <p>
          A generic class declares a type parameter inside angle brackets.
          The type parameter acts as a placeholder for an actual type.
        </p>
        <p>
          T is a common name for a type parameter.
        </p>
      </>
    ),
    code: `class Box<T> {
    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}

Box<String> box = new Box<>();
box.set("Hello");

System.out.println(box.get());`,
  },
  {
    title: "4. Type parameter naming conventions",
    content: (
      <>
        <p>
          Type parameter names are usually single uppercase letters.
          These are conventions, not mandatory rules.
        </p>
        <ul>
          <li>T — Type</li>
          <li>E — Element</li>
          <li>K — Key</li>
          <li>V — Value</li>
          <li>N — Number</li>
          <li>R — Return type</li>
        </ul>
      </>
    ),
    code: `class Pair<K, V> {
    K key;
    V value;
}

Pair<Integer, String> pair =
    new Pair<>();`,
  },
  {
    title: "5. Multiple type parameters",
    content: (
      <>
        <p>
          A generic class can declare more than one type parameter.
          Each parameter can represent a different type.
        </p>
      </>
    ),
    code: `class Pair<K, V> {
    private K key;
    private V value;

    Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    K getKey() {
        return key;
    }

    V getValue() {
        return value;
    }
}

Pair<Integer, String> p =
    new Pair<>(101, "Java");`,
  },
  {
    title: "6. Generic methods",
    content: (
      <>
        <p>
          A generic method declares its own type parameter before
          the return type.
        </p>
        <p>
          The type parameter belongs to the method, not necessarily
          to the class.
        </p>
      </>
    ),
    code: `class Printer {
    public <T> void print(T value) {
        System.out.println(value);
    }
}

Printer p = new Printer();

p.print(100);
p.print("Java");
p.print(3.14);`,
  },
  {
    title: "7. Generic static methods",
    content: (
      <>
        <p>
          Static methods cannot directly use a class's instance
          type parameter.
        </p>
        <p>
          A static method can declare its own type parameter.
        </p>
      </>
    ),
    code: `class Utility<T> {

    // Invalid:
    // static T getValue() { ... }

    // Valid:
    public static <E> E identity(E value) {
        return value;
    }
}

String result =
    Utility.identity("Hello");`,
  },
  {
    title: "8. Generic interfaces",
    content: (
      <>
        <p>
          Interfaces can also declare type parameters.
          Implementing classes can specify the type or remain generic.
        </p>
      </>
    ),
    code: `interface Storage<T> {
    void save(T item);
    T get();
}

class StringStorage
        implements Storage<String> {

    private String value;

    public void save(String item) {
        value = item;
    }

    public String get() {
        return value;
    }
}`,
  },
  {
    title: "9. Generic constructors",
    content: (
      <>
        <p>
          Constructors can declare their own type parameters.
          This is useful even inside a non-generic class.
        </p>
      </>
    ),
    code: `class Display {
    <T> Display(T value) {
        System.out.println(value);
    }
}

Display d1 = new Display("Java");
Display d2 = new Display(100);`,
  },
  {
    title: "10. Type inference and the diamond operator",
    content: (
      <>
        <p>
          Java can often infer the type parameter from the
          variable declaration or method arguments.
        </p>
        <p>
          The diamond operator {"<>"} avoids repeating the type
          on the right side of object creation.
        </p>
      </>
    ),
    code: `// Repeating the type:
ArrayList<String> names =
    new ArrayList<String>();

// Diamond operator:
ArrayList<String> names2 =
    new ArrayList<>();

// Type inference for a method:
String result = Utility.identity("Java");`,
  },
  {
    title: "11. Generic collections",
    content: (
      <>
        <p>
          Collections commonly use generics to specify the type
          of elements they store.
        </p>
        <p>
          This prevents inserting an incompatible type and avoids
          manual casting when retrieving values.
        </p>
      </>
    ),
    code: `List<String> names =
    new ArrayList<>();

names.add("Ravi");
names.add("Priya");

// Compile-time error:
// names.add(100);

String first = names.get(0);`,
  },
  {
    title: "12. Raw types",
    content: (
      <>
        <p>
          A raw type uses a generic class without specifying
          its type parameter.
        </p>
        <p>
          Raw types exist mainly for backward compatibility.
          Avoid them in new code because they remove much of
          the compiler's type checking.
        </p>
      </>
    ),
    code: `List list = new ArrayList();

list.add("Java");
list.add(100);

// Unsafe:
String text = (String) list.get(1);

// This throws ClassCastException
// because the second element is Integer.`,
  },
  {
    title: "13. Bounded type parameters",
    content: (
      <>
        <p>
          A bounded type parameter restricts which types can
          be used as the generic argument.
        </p>
        <p>
          The extends keyword is used for an upper bound.
          It works with classes and interfaces.
        </p>
      </>
    ),
    code: `class Calculator<T extends Number> {
    private T value;

    Calculator(T value) {
        this.value = value;
    }

    double getDoubleValue() {
        return value.doubleValue();
    }
}

Calculator<Integer> c1 =
    new Calculator<>(10);

Calculator<Double> c2 =
    new Calculator<>(5.5);

// Invalid:
// Calculator<String> c3 =
//     new Calculator<>("Java");`,
  },
  {
    title: "14. Multiple bounds",
    content: (
      <>
        <p>
          A type parameter can have multiple bounds.
        </p>
        <p>
          If a class is included, it must appear first.
          Interface bounds follow it, separated by &amp;.
        </p>
      </>
    ),
    code: `class Test<T extends Number
              & Comparable<T>> {
    T value;
}

// T must extend Number
// and implement Comparable<T>`,
  },
  {
    title: "15. What is a wildcard?",
    content: (
      <>
        <p>
          A wildcard is represented by ? and means an unknown type.
        </p>
        <p>
          Wildcards are useful when a method should accept
          generic types without requiring one exact type argument.
        </p>
      </>
    ),
    code: `List<?> values;

values = new ArrayList<String>();
values = new ArrayList<Integer>();

// You can read elements as Object.
// You cannot safely add a String,
// Integer, or another specific value.`,
  },
  {
    title: "16. Unbounded wildcard",
    content: (
      <>
        <p>
          List{"<?>"} means a list of some unknown type.
        </p>
        <p>
          You can read an element as Object, but you cannot
          add ordinary values because the actual element type
          is unknown.
        </p>
        <p>
          null is the exception: it can be added to a reference
          type collection.
        </p>
      </>
    ),
    code: `static void printList(List<?> list) {
    for (Object item : list) {
        System.out.println(item);
    }
}

printList(List.of("Java", "C++"));
printList(List.of(10, 20, 30));`,
  },
  {
    title: "17. Upper bounded wildcard",
    content: (
      <>
        <p>
          ? extends Number means an unknown type that is Number
          or a subclass of Number.
        </p>
        <p>
          It is useful when a method needs to read values
          from different numeric lists.
        </p>
        <p>
          You generally cannot add a specific Number value
          because the actual subtype is unknown.
        </p>
      </>
    ),
    code: `static double sum(List<? extends Number> list) {
    double total = 0;

    for (Number n : list) {
        total += n.doubleValue();
    }

    return total;
}

sum(List.of(1, 2, 3));
sum(List.of(1.5, 2.5));`,
  },
  {
    title: "18. Lower bounded wildcard",
    content: (
      <>
        <p>
          ? super Integer means an unknown type that is
          Integer or a superclass of Integer.
        </p>
        <p>
          It is useful when a method needs to add Integer
          values to a collection.
        </p>
        <p>
          Values can be safely read as Object.
        </p>
      </>
    ),
    code: `static void addNumbers(
        List<? super Integer> list) {

    list.add(10);
    list.add(20);
}

List<Integer> a = new ArrayList<>();
List<Number> b = new ArrayList<>();
List<Object> c = new ArrayList<>();

addNumbers(a);
addNumbers(b);
addNumbers(c);`,
  },
  {
    title: "19. PECS rule",
    content: (
      <>
        <p>
          PECS means Producer Extends, Consumer Super.
        </p>
        <ul>
          <li>
            Use ? extends T when the collection produces values
            that your method reads as T.
          </li>
          <li>
            Use ? super T when the collection consumes values
            that your method adds as T.
          </li>
        </ul>
        <p>
          This is a practical rule for choosing wildcard bounds.
        </p>
      </>
    ),
    code: `// Producer: read values
static double sum(
        List<? extends Number> values) {
    double total = 0;

    for (Number n : values) {
        total += n.doubleValue();
    }

    return total;
}

// Consumer: add values
static void add(
        List<? super Integer> values) {
    values.add(10);
}`,
  },
  {
    title: "20. Generic type invariance",
    content: (
      <>
        <p>
          In Java, generic types are invariant.
        </p>
        <p>
          Even though Integer extends Number,
          {"List<Integer>"} is not a subtype of {"List<Number>"}.
        </p>
        <p>
          This prevents unsafe insertion of another Number
          such as Double into a list of Integer values.
        </p>
      </>
    ),
    code: `List<Integer> integers =
    new ArrayList<>();

// Invalid:
List<Number> numbers = integers;

// If allowed, this would be unsafe:
// numbers.add(3.14);

// Use a wildcard when appropriate:
List<? extends Number> values =
    integers;`,
  },
  {
    title: "21. Type erasure",
    content: (
      <>
        <p>
          Java implements generics using type erasure.
          Most generic type information is removed during
          compilation, with required casts and checks inserted.
        </p>
        <p>
          Generic types generally share the same runtime
          class representation.
        </p>
      </>
    ),
    code: `List<String> a =
    new ArrayList<>();

List<Integer> b =
    new ArrayList<>();

System.out.println(
    a.getClass() == b.getClass()
);

// true`,
  },
  {
    title: "22. Restrictions caused by type erasure",
    content: (
      <>
        <p>
          Because generic type information is erased,
          Java does not allow several operations.
        </p>
        <ul>
          <li>new T()</li>
          <li>new T[]</li>
          <li>instanceof List&lt;String&gt;</li>
          <li>Creating a generic class's static field of type T.</li>
          <li>Overloading methods whose signatures erase to the same type.</li>
        </ul>
      </>
    ),
    code: `class Box<T> {
    // Invalid:
    // T value = new T();

    // Invalid:
    // T[] array = new T[10];

    // Invalid:
    // static T value;
}`,
  },
  {
    title: "23. Generic arrays",
    content: (
      <>
        <p>
          Java does not allow direct creation of arrays of
          a type parameter because arrays are reified while
          generics use type erasure.
        </p>
        <p>
          Prefer collections such as ArrayList when possible.
        </p>
      </>
    ),
    code: `class Box<T> {
    // Not allowed:
    // T[] items = new T[10];

    // Common alternative:
    List<T> items = new ArrayList<>();
}`,
  },
  {
    title: "24. Generic inheritance",
    content: (
      <>
        <p>
          A generic class can extend another generic class.
          The child class may preserve or specify the parent's
          type parameter.
        </p>
      </>
    ),
    code: `class Box<T> {
    T value;
}

class StringBox extends Box<String> {
}

// Generic child:
class ChildBox<T> extends Box<T> {
}

StringBox a = new StringBox();
ChildBox<Integer> b =
    new ChildBox<>();`,
  },
  {
    title: "25. Comparable and generic bounds",
    content: (
      <>
        <p>
          Comparable is a generic interface used to define
          natural ordering.
        </p>
        <p>
          A bound such as T extends Comparable&lt;T&gt;
          allows a method to compare values of type T.
        </p>
      </>
    ),
    code: `static <T extends Comparable<T>>
T findMax(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

System.out.println(findMax(10, 20));
System.out.println(findMax("Apple", "Mango"));`,
  },
  {
    title: "26. Common generic mistakes",
    content: (
      <>
        <ul>
          <li>Using raw types unnecessarily.</li>
          <li>Assuming List&lt;Integer&gt; is a List&lt;Number&gt;.</li>
          <li>Adding values to List&lt;?&gt;.</li>
          <li>Using extends and super incorrectly.</li>
          <li>Trying to create new T().</li>
          <li>Assuming generic type arguments exist at runtime.</li>
          <li>Using a wildcard when a type parameter is clearer.</li>
        </ul>
      </>
    ),
    code: `// Exact type:
static <T> void copy(
        List<T> source,
        List<T> destination) {
    destination.addAll(source);
}

// Flexible source and destination:
static <T> void copyFlexible(
        List<? extends T> source,
        List<? super T> destination) {
    destination.addAll(source);
}`,
  },
  {
    title: "27. Practice problems",
    content: (
      <>
        <ol>
          <li>Create a generic Box class.</li>
          <li>Create a generic Pair class.</li>
          <li>Write a generic method to print an array.</li>
          <li>Write a method that finds the maximum value.</li>
          <li>Write a method that accepts List&lt;?&gt;.</li>
          <li>Write a method that sums List&lt;? extends Number&gt;.</li>
          <li>Write a method that adds Integer values to List&lt;? super Integer&gt;.</li>
          <li>Create a generic Storage interface.</li>
          <li>Explain why List&lt;Integer&gt; is not List&lt;Number&gt;.</li>
          <li>Explain type erasure and its restrictions.</li>
        </ol>
      </>
    ),
    code: `// Practice: generic identity method

public static <T> T identity(T value) {
    return value;
}

// Test:
System.out.println(identity("Java"));
System.out.println(identity(100));`,
  },
  {
    title: "28. Interview questions",
    content: (
      <>
        <ol>
          <li>What are generics in Java?</li>
          <li>Why are generics useful?</li>
          <li>What is a generic class?</li>
          <li>What is a generic method?</li>
          <li>What is a raw type?</li>
          <li>What is a bounded type parameter?</li>
          <li>What is a wildcard?</li>
          <li>What is the difference between ? and ? extends T?</li>
          <li>What is the difference between ? extends T and ? super T?</li>
          <li>Explain PECS.</li>
          <li>Why are generic types invariant?</li>
          <li>What is type erasure?</li>
          <li>Why can't we create new T()?</li>
          <li>Why can't we create generic arrays directly?</li>
          <li>Can static methods use a class type parameter?</li>
          <li>What is the diamond operator?</li>
          <li>How do generics work with inheritance?</li>
          <li>What is the purpose of Comparable&lt;T&gt;?</li>
        </ol>
      </>
    ),
    code: `// Quick revision

<T>             // Type parameter
<?>             // Unknown type
<? extends T>    // Producer / read
<? super T>     // Consumer / write
<T extends X>   // Upper bounded type
PECS            // Producer Extends,
                // Consumer Super
Type erasure    // Generic type info
                // mostly removed
`,
  },
];

export default function GenericsLesson({ onBack }) {
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
        Java Generics
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn generic classes, methods, interfaces, bounded types,
        wildcards, PECS, type erasure, and generic interview concepts.
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
          <li>I understand why generics are used.</li>
          <li>I can create generic classes and methods.</li>
          <li>I understand generic interfaces and inheritance.</li>
          <li>I can use bounded type parameters.</li>
          <li>I understand wildcards and PECS.</li>
          <li>I know why generic types are invariant.</li>
          <li>I understand type erasure and its restrictions.</li>
          <li>I can solve the practice problems independently.</li>
        </ul>
      </section>
    </div>
  );
}
