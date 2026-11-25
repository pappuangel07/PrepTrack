
export default function JavaWrapperClassesLesson({ onBack }) {
  const sectionStyle = {
    background: "var(--card-bg, #ffffff)",
    border: "1px solid var(--border-color, #e5e7eb)",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "18px",
    lineHeight: 1.7,
  };

  const codeStyle = {
    background: "var(--code-bg, #f3f4f6)",
    padding: "14px",
    borderRadius: "8px",
    overflowX: "auto",
    fontSize: "14px",
    whiteSpace: "pre",
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>
        ← Back to Java Topics
      </button>

      <h1>Wrapper Classes and Autoboxing</h1>
      <p>Beginner to Advanced | Core Java | Interview Preparation</p>

      <section style={sectionStyle}>
        <h2>1. What Is a Wrapper Class?</h2>

        <p>
          A wrapper class is a class that represents a primitive
          data type as an object. Java provides wrapper classes
          for all eight primitive data types.
        </p>

        <p>
          Primitive variables store values directly. Wrapper
          objects represent those values as objects, which is
          useful when working with collections and APIs that
          require objects.
        </p>

        <pre style={codeStyle}>
{`int number = 10;

Integer wrappedNumber = Integer.valueOf(number);`}
        </pre>

        <p>
          Here, <code>int</code> is the primitive type and
          <code> Integer</code> is its wrapper class.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>2. Primitive Types and Their Wrapper Classes</h2>

        <pre style={codeStyle}>
{`Primitive       Wrapper Class
--------------------------------
byte            Byte
short           Short
int             Integer
long            Long
float           Float
double          Double
char            Character
boolean         Boolean`}
        </pre>

        <p>
          Remember that the wrapper class names are capitalized.
          The wrapper for <code>int</code> is
          <code> Integer</code>, not <code>Int</code>.
        </p>

        <h3>Example</h3>

        <pre style={codeStyle}>
{`int age = 19;
Integer ageObject = 19;

char grade = 'A';
Character gradeObject = 'A';

boolean passed = true;
Boolean passedObject = true;`}
        </pre>
      </section>

      <section style={sectionStyle}>
        <h2>3. Why Do We Need Wrapper Classes?</h2>

        <h3>Reason 1: Collections require objects</h3>

        <p>
          Java collections such as ArrayList cannot directly
          store primitive values as their element type.
          Wrapper classes allow primitive values to be stored
          in collections.
        </p>

        <pre style={codeStyle}>
{`import java.util.ArrayList;

ArrayList<Integer> numbers =
    new ArrayList<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);`}
        </pre>

        <h3>Reason 2: Utility methods</h3>

        <p>
          Wrapper classes provide useful methods for parsing,
          comparing, converting, and examining values.
        </p>

        <pre style={codeStyle}>
{`int number = Integer.parseInt("123");

System.out.println(number + 10);
// 133`}
        </pre>

        <h3>Reason 3: Representing absence</h3>

        <p>
          A wrapper reference can be <code>null</code>,
          whereas a primitive variable cannot hold
          <code> null</code>.
        </p>

        <pre style={codeStyle}>
{`Integer score = null;

// No score has been assigned`}
        </pre>

        <p>
          Be careful: using a null wrapper as a primitive
          value can cause a NullPointerException.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>4. What Is Boxing?</h2>

        <p>
          Boxing means converting a primitive value into
          its corresponding wrapper object.
        </p>

        <h3>Explicit boxing</h3>

        <pre style={codeStyle}>
{`int value = 100;

Integer object =
    Integer.valueOf(value);`}
        </pre>

        <p>
          <code>Integer.valueOf()</code> converts an
          int value into an Integer object.
        </p>

        <h3>Constructor approach</h3>

        <pre style={codeStyle}>
{`Integer object =
    new Integer(100);`}
        </pre>

        <p>
          The Integer constructor is deprecated for removal
          in modern Java. Prefer <code>Integer.valueOf()</code>
          or automatic boxing.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>5. What Is Autoboxing?</h2>

        <p>
          Autoboxing is the automatic conversion of a
          primitive value into its corresponding wrapper
          object by the Java compiler.
        </p>

        <pre style={codeStyle}>
{`int number = 50;

Integer object = number;`}
        </pre>

        <p>
          The compiler automatically performs the equivalent
          of a boxing conversion.
        </p>

        <h3>Autoboxing in collections</h3>

        <pre style={codeStyle}>
{`ArrayList<Integer> numbers =
    new ArrayList<>();

numbers.add(10);`}
        </pre>

        <p>
          The value <code>10</code> is an int literal.
          Java automatically converts it to an Integer
          object before storing it in the collection.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>6. What Is Unboxing?</h2>

        <p>
          Unboxing means converting a wrapper object into
          its corresponding primitive value.
        </p>

        <pre style={codeStyle}>
{`Integer object = Integer.valueOf(25);

int number = object;`}
        </pre>

        <p>
          Java automatically extracts the int value from
          the Integer object.
        </p>

        <h3>Unboxing in calculations</h3>

        <pre style={codeStyle}>
{`Integer a = 10;
Integer b = 20;

int result = a + b;

System.out.println(result);
// 30`}
        </pre>

        <p>
          Java unboxes both wrapper objects before
          performing primitive arithmetic.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>7. Boxing and Unboxing Together</h2>

        <pre style={codeStyle}>
{`Integer number = 100;  // Autoboxing

int value = number;    // Unboxing

number = number + 5;   // Unbox, add, box again

System.out.println(number);
// 105`}
        </pre>

        <p>
          In the last statement, Java unboxes the Integer,
          performs the addition using int, and boxes the
          result back into an Integer.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>8. Important Wrapper Class Methods</h2>

        <h3>Integer.parseInt()</h3>

        <p>
          Converts a numeric String into a primitive int.
        </p>

        <pre style={codeStyle}>
{`int value =
    Integer.parseInt("250");

System.out.println(value);
// 250`}
        </pre>

        <h3>Integer.valueOf()</h3>

        <p>
          Converts a String or int value into an Integer
          object.
        </p>

        <pre style={codeStyle}>
{`Integer a =
    Integer.valueOf("250");

Integer b =
    Integer.valueOf(250);`}
        </pre>

        <h3>intValue()</h3>

        <p>
          Extracts the primitive int value from an Integer.
        </p>

        <pre style={codeStyle}>
{`Integer object = 75;

int value = object.intValue();`}
        </pre>

        <h3>compare()</h3>

        <p>
          Compares two primitive int values.
          It returns a negative number, zero, or a
          positive number depending on the comparison.
        </p>

        <pre style={codeStyle}>
{`int result =
    Integer.compare(10, 20);

// Negative value`}
        </pre>

        <h3>toString()</h3>

        <p>
          Converts an int value into a String.
        </p>

        <pre style={codeStyle}>
{`String text =
    Integer.toString(123);

System.out.println(text);
// "123"`}
        </pre>
      </section>

      <section style={sectionStyle}>
        <h2>9. Comparing Wrapper Objects</h2>

        <h3>Using ==</h3>

        <p>
          For wrapper objects, <code>==</code> compares
          object references when both operands are
          references. It does not reliably compare
          the numeric values.
        </p>

        <pre style={codeStyle}>
{`Integer a = 1000;
Integer b = 1000;

System.out.println(a == b);
// Do not rely on this for value comparison`}
        </pre>

        <h3>Using equals()</h3>

        <p>
          The <code>equals()</code> method compares
          the values represented by wrapper objects.
        </p>

        <pre style={codeStyle}>
{`Integer a = 1000;
Integer b = 1000;

System.out.println(a.equals(b));
// true`}
        </pre>

        <h3>Best practice</h3>

        <p>
          Use <code>equals()</code> when comparing wrapper
          values, or unbox them and compare primitive values.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>10. Integer Cache</h2>

        <p>
          Java commonly caches Integer objects for values
          from -128 to 127. Autoboxing or valueOf() may
          reuse cached objects for values in this range.
        </p>

        <pre style={codeStyle}>
{`Integer a = 100;
Integer b = 100;

System.out.println(a == b);
// true in the standard Integer cache range`}
        </pre>

        <p>
          For values outside the cache range, separate
          objects may be created.
        </p>

        <pre style={codeStyle}>
{`Integer x = 1000;
Integer y = 1000;

System.out.println(x == y);
// Do not rely on the result`}
        </pre>

        <p>
          The cache is an implementation optimization.
          Never use <code>==</code> as a wrapper value
          comparison technique.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>11. Null and Unboxing</h2>

        <p>
          A wrapper reference can contain null.
          Unboxing a null wrapper throws a
          NullPointerException.
        </p>

        <pre style={codeStyle}>
{`Integer number = null;

int value = number;
// NullPointerException`}
        </pre>

        <h3>Safer approach</h3>

        <pre style={codeStyle}>
{`Integer number = null;

if (number != null) {
    int value = number;
    System.out.println(value);
}`}
        </pre>

        <p>
          Always check whether a wrapper reference is
          null before unboxing it when null is possible.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>12. Wrapper Classes Are Immutable</h2>

        <p>
          Wrapper objects are immutable. Once an Integer
          object is created, its represented value cannot
          be changed.
        </p>

        <pre style={codeStyle}>
{`Integer number = 10;

number = number + 5;`}
        </pre>

        <p>
          This does not modify the original Integer object.
          The expression creates or obtains another Integer
          representing 15, and the variable reference is
          reassigned.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>13. Primitive vs Wrapper Class</h2>

        <pre style={codeStyle}>
{`Primitive              Wrapper
--------------------------------
int                   Integer
Stores value           References an object
Cannot be null         Can be null
Usually less overhead  Object overhead
Has no instance methods Provides utility methods`}
        </pre>

        <p>
          Use primitives for ordinary numeric calculations
          when an object is not required. Use wrappers when
          working with collections, generic types, or APIs
          that require objects.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>14. Performance Considerations</h2>

        <p>
          Wrapper objects can introduce memory and
          performance overhead compared with primitives.
          Repeated boxing and unboxing may create extra work.
        </p>

        <pre style={codeStyle}>
{`Integer sum = 0;

for (int i = 0; i < 100000; i++) {
    sum = sum + i;
}`}
        </pre>

        <p>
          This repeatedly unboxes sum, adds i, and boxes
          the result. For performance-sensitive numeric
          loops, a primitive int sum is usually preferable.
        </p>

        <pre style={codeStyle}>
{`int sum = 0;

for (int i = 0; i < 100000; i++) {
    sum += i;
}`}
        </pre>
      </section>

      <section style={sectionStyle}>
        <h2>15. Common Mistakes</h2>

        <ul>
          <li>
            Using <code>==</code> to compare wrapper values.
          </li>
          <li>
            Unboxing a wrapper that may be null.
          </li>
          <li>
            Using wrapper objects unnecessarily in
            performance-sensitive calculations.
          </li>
          <li>
            Confusing <code>parseInt()</code> with
            <code> valueOf()</code>.
          </li>
          <li>
            Assuming every autoboxing operation reuses
            the same object.
          </li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2>16. Practice Questions</h2>

        <h3>Question 1</h3>
        <p>What is the wrapper class of int?</p>
        <p><strong>Answer:</strong> Integer</p>

        <h3>Question 2</h3>
        <p>What is autoboxing?</p>
        <p>
          <strong>Answer:</strong> Automatic conversion
          of a primitive value into its wrapper object.
        </p>

        <h3>Question 3</h3>
        <p>What is unboxing?</p>
        <p>
          <strong>Answer:</strong> Conversion of a wrapper
          object into its primitive value.
        </p>

        <h3>Question 4</h3>
        <p>What happens when null is unboxed?</p>
        <p>
          <strong>Answer:</strong> A
          NullPointerException is thrown.
        </p>

        <h3>Question 5</h3>
        <p>How should two Integer values be compared?</p>
        <p>
          <strong>Answer:</strong> Use equals() for
          value comparison, or compare their primitive
          values.
        </p>

        <h3>Question 6</h3>
        <p>Are wrapper classes mutable?</p>
        <p>
          <strong>Answer:</strong> No. Wrapper classes
          are immutable.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>17. Interview Summary</h2>

        <ul>
          <li>Every primitive type has a wrapper class.</li>
          <li>Autoboxing converts primitive to wrapper.</li>
          <li>Unboxing converts wrapper to primitive.</li>
          <li>Collections use wrapper types for primitives.</li>
          <li>Wrapper classes are immutable.</li>
          <li>Wrapper references can be null.</li>
          <li>Unboxing null causes NullPointerException.</li>
          <li>
            Use equals() or primitive comparison for values,
            not wrapper reference comparison with ==.
          </li>
        </ul>
      </section>
    </div>
  );
}
