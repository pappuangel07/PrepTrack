export default function VariablesDataTypesLesson({ onBack }) {
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

      <h1>Variables and Data Types</h1>
      <p>Beginner to Advanced | Core Java | Interview Preparation</p>

      <section style={sectionStyle}>
        <h2>1. What Is a Variable?</h2>

        <p>
          A variable is a named storage location used by a program to
          represent a value. In Java, every variable has a type that
          determines what kind of value it can hold.
        </p>

        <pre style={codeStyle}>
{`int age = 19;`}
        </pre>

        <p>Here:</p>
        <ul>
          <li><code>int</code> — data type</li>
          <li><code>age</code> — variable name</li>
          <li><code>19</code> — value</li>
          <li><code>=</code> — assignment operator</li>
        </ul>

        <h3>Declaration</h3>
        <pre style={codeStyle}>
{`int age;`}
        </pre>
        <p>
          Declaration introduces a variable and specifies its type.
          This statement does not explicitly assign a value.
        </p>

        <h3>Initialization</h3>
        <pre style={codeStyle}>
{`int age = 19;`}
        </pre>
        <p>
          Initialization means giving a variable its initial value.
        </p>

        <h3>Assignment</h3>
        <pre style={codeStyle}>
{`int age = 19;
age = 20;`}
        </pre>
        <p>
          Assignment stores a value in a variable. The second statement
          changes the value of <code>age</code> to 20.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>2. Types of Variables</h2>

        <h3>Local variable</h3>
        <p>
          A local variable is declared inside a method, constructor,
          or block. It can be used only within its scope.
        </p>

        <pre style={codeStyle}>
{`public class Main {
    public static void main(String[] args) {
        int marks = 90;
        System.out.println(marks);
    }
}`}
        </pre>

        <p>
          Local variables do not receive automatic default values.
          They must be definitely assigned before being read.
        </p>

        <h3>Instance variable</h3>
        <p>
          An instance variable is declared inside a class but outside
          methods and constructors, without the static keyword.
          Each object has its own instance fields.
        </p>

        <pre style={codeStyle}>
{`class Student {
    int age;
    String name;
}`}
        </pre>

        <p>
          Every Student object has its own <code>age</code> and
          <code>name</code> fields.
        </p>

        <h3>Static variable</h3>
        <p>
          A static variable belongs to the class rather than to each
          individual object. There is one class-level variable for
          that class in its defining class loader.
        </p>

        <pre style={codeStyle}>
{`class Student {
    static String college = "SKCET";
}`}
        </pre>

        <p>
          Objects can access this shared field, but it is generally
          clearer to access it using the class name:
        </p>

        <pre style={codeStyle}>
{`System.out.println(Student.college);`}
        </pre>

        <h3>Comparison</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px" }}>Variable</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Declared in</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Belongs to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px" }}>Local</td>
              <td style={{ padding: "8px" }}>Method or block</td>
              <td style={{ padding: "8px" }}>That scope</td>
            </tr>
            <tr>
              <td style={{ padding: "8px" }}>Instance</td>
              <td style={{ padding: "8px" }}>Class body</td>
              <td style={{ padding: "8px" }}>Each object</td>
            </tr>
            <tr>
              <td style={{ padding: "8px" }}>Static</td>
              <td style={{ padding: "8px" }}>Class body with static</td>
              <td style={{ padding: "8px" }}>Class-level</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={sectionStyle}>
        <h2>3. Primitive Data Types</h2>

        <p>
          Java has eight primitive data types. Primitive variables
          store values of their respective primitive types.
        </p>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px" }}>Type</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Size</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "8px" }}>byte</td><td style={{ padding: "8px" }}>8 bits</td><td style={{ padding: "8px" }}>byte b = 10;</td></tr>
            <tr><td style={{ padding: "8px" }}>short</td><td style={{ padding: "8px" }}>16 bits</td><td style={{ padding: "8px" }}>short s = 100;</td></tr>
            <tr><td style={{ padding: "8px" }}>int</td><td style={{ padding: "8px" }}>32 bits</td><td style={{ padding: "8px" }}>int n = 500;</td></tr>
            <tr><td style={{ padding: "8px" }}>long</td><td style={{ padding: "8px" }}>64 bits</td><td style={{ padding: "8px" }}>long l = 1000L;</td></tr>
            <tr><td style={{ padding: "8px" }}>float</td><td style={{ padding: "8px" }}>32 bits</td><td style={{ padding: "8px" }}>float f = 2.5f;</td></tr>
            <tr><td style={{ padding: "8px" }}>double</td><td style={{ padding: "8px" }}>64 bits</td><td style={{ padding: "8px" }}>double d = 2.5;</td></tr>
            <tr><td style={{ padding: "8px" }}>char</td><td style={{ padding: "8px" }}>16 bits</td><td style={{ padding: "8px" }}>char c = 'A';</td></tr>
            <tr><td style={{ padding: "8px" }}>boolean</td><td style={{ padding: "8px" }}>JVM-dependent representation</td><td style={{ padding: "8px" }}>boolean ok = true;</td></tr>
          </tbody>
        </table>

        <h3>Integer types</h3>
        <p>
          <code>byte</code>, <code>short</code>, <code>int</code>,
          and <code>long</code> store whole-number values.
        </p>

        <p>
          The range of a signed n-bit integer is:
        </p>

        <pre style={codeStyle}>
{`Minimum = -2^(n - 1)
Maximum =  2^(n - 1) - 1`}
        </pre>

        <p>Examples:</p>
        <ul>
          <li>byte: -128 to 127</li>
          <li>short: -32,768 to 32,767</li>
          <li>int: -2,147,483,648 to 2,147,483,647</li>
          <li>long: approximately -9.22 × 10^18 to 9.22 × 10^18</li>
        </ul>

        <h3>Why use long?</h3>
        <pre style={codeStyle}>
{`long population = 8000000000L;`}
        </pre>
        <p>
          An int cannot represent this value. The suffix
          <code> L</code> marks the integer literal as long.
          Prefer uppercase L because lowercase l can look like 1.
        </p>

        <h3>Floating-point types</h3>
        <p>
          <code>float</code> and <code>double</code> represent
          floating-point values using IEEE 754 formats.
        </p>

        <pre style={codeStyle}>
{`float price = 12.5f;
double distance = 123.456;`}
        </pre>

        <p>
          A decimal literal such as <code>12.5</code> is a double
          by default. Use <code>f</code> or <code>F</code> for float.
        </p>

        <h3>Important floating-point issue</h3>
        <pre style={codeStyle}>
{`System.out.println(0.1 + 0.2);`}
        </pre>
        <p>
          Output may be:
        </p>
        <pre style={codeStyle}>
{`0.30000000000000004`}
        </pre>
        <p>
          Many decimal fractions cannot be represented exactly in
          binary floating-point. For financial calculations requiring
          decimal precision, consider <code>BigDecimal</code>.
        </p>

        <h3>char</h3>
        <p>
          Java char is a 16-bit unsigned type representing a UTF-16
          code unit. It is not necessarily one complete Unicode
          character because some characters require two code units.
        </p>

        <pre style={codeStyle}>
{`char letter = 'A';
char digit = '7';
char symbol = '$';`}
        </pre>

        <p>
          Use single quotes for char literals. Double quotes create
          String literals.
        </p>

        <h3>boolean</h3>
        <pre style={codeStyle}>
{`boolean isPassed = true;
boolean isAbsent = false;`}
        </pre>
        <p>
          A boolean value is either <code>true</code> or
          <code> false</code>. Java does not allow treating an
          integer such as 1 as a boolean.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>4. Reference Data Types</h2>

        <p>
          Reference variables hold references to objects or null.
          They do not directly contain the complete object itself
          as a primitive value.
        </p>

        <p>Examples of reference types:</p>
        <ul>
          <li>Classes</li>
          <li>Arrays</li>
          <li>Interfaces</li>
          <li>Enums</li>
          <li>Strings</li>
        </ul>

        <pre style={codeStyle}>
{`String name = "Angel";
int[] numbers = {10, 20, 30};`}
        </pre>

        <h3>Primitive vs reference</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px" }}>Primitive</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Reference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px" }}>Holds primitive value</td>
              <td style={{ padding: "8px" }}>Holds object reference or null</td>
            </tr>
            <tr>
              <td style={{ padding: "8px" }}>Examples: int, char</td>
              <td style={{ padding: "8px" }}>Examples: String, arrays</td>
            </tr>
            <tr>
              <td style={{ padding: "8px" }}>Cannot be null</td>
              <td style={{ padding: "8px" }}>Can be null</td>
            </tr>
          </tbody>
        </table>

        <h3>What is null?</h3>
        <pre style={codeStyle}>
{`String name = null;`}
        </pre>
        <p>
          <code>null</code> means the reference does not refer to
          an object. Calling an instance method through a null
          reference causes a <code>NullPointerException</code>.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>5. Type Conversion</h2>

        <h3>Widening conversion</h3>
        <p>
          Widening converts a value from a type with a smaller
          range or precision category to a compatible broader type.
          Many widening primitive conversions happen automatically.
        </p>

        <pre style={codeStyle}>
{`int number = 100;
long bigger = number;
double decimal = number;`}
        </pre>

        <p>
          This is generally safe from integer overflow during the
          conversion to long, but converting large integers to
          floating-point types may lose precision.
        </p>

        <h3>Narrowing conversion</h3>
        <p>
          Narrowing converts a value to a type that may represent
          fewer values. An explicit cast is usually required.
        </p>

        <pre style={codeStyle}>
{`double price = 99.99;
int whole = (int) price;

System.out.println(whole);`}
        </pre>

        <p>Output:</p>
        <pre style={codeStyle}>
{`99`}
        </pre>

        <p>
          Casting a floating-point value to an integer truncates
          the fractional part toward zero. It does not round.
        </p>

        <h3>Overflow during narrowing</h3>
        <pre style={codeStyle}>
{`int number = 130;
byte value = (byte) number;

System.out.println(value);`}
        </pre>

        <p>
          Output:
        </p>
        <pre style={codeStyle}>
{`-126`}
        </pre>

        <p>
          The value cannot fit in byte. Narrowing keeps the low-order
          bits, producing a different signed value.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>6. Type Promotion in Expressions</h2>

        <p>
          Java promotes certain operands before performing arithmetic.
          byte, short, and char are generally promoted to int in
          arithmetic expressions.
        </p>

        <pre style={codeStyle}>
{`byte a = 10;
byte b = 20;

// Error:
byte result = a + b;

// Correct:
int result = a + b;`}
        </pre>

        <p>
          Even though both operands are byte, the addition result
          is int.
        </p>

        <h3>Mixed numeric types</h3>
        <pre style={codeStyle}>
{`int a = 10;
double b = 2.5;

double result = a + b;`}
        </pre>

        <p>
          The int operand is converted to double before addition.
        </p>

        <h3>Integer division</h3>
        <pre style={codeStyle}>
{`System.out.println(5 / 2);
System.out.println(5 / 2.0);`}
        </pre>

        <p>Output:</p>
        <pre style={codeStyle}>
{`2
2.5`}
        </pre>

        <p>
          When both operands are integers, division produces an
          integer result and truncates the fractional part.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>7. Constants and final</h2>

        <p>
          The <code>final</code> keyword prevents a variable from
          being assigned again after it has been initialized.
        </p>

        <pre style={codeStyle}>
{`final double PI = 3.14159;`}
        </pre>

        <p>
          Attempting to assign a new value to PI causes a
          compile-time error.
        </p>

        <h3>Final reference</h3>
        <pre style={codeStyle}>
{`final int[] values = {1, 2, 3};

values[0] = 100; // Allowed

// values = new int[5]; // Not allowed`}
        </pre>

        <p>
          A final reference cannot be reassigned to another array,
          but the contents of the referenced array can still change.
          final does not automatically make an object immutable.
        </p>

        <h3>Constant naming convention</h3>
        <pre style={codeStyle}>
{`static final int MAX_USERS = 100;`}
        </pre>
        <p>
          Constant-like static final fields are commonly written
          using uppercase letters and underscores.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>8. Variable Scope and Lifetime</h2>

        <h3>Scope</h3>
        <p>
          Scope determines where a variable can be accessed in
          source code.
        </p>

        <pre style={codeStyle}>
{`if (true) {
    int count = 10;
}

// count cannot be used here`}
        </pre>

        <h3>Lifetime</h3>
        <p>
          Lifetime refers to how long a variable or its associated
          storage exists during program execution.
        </p>

        <ul>
          <li>Local variables are associated with method or block execution.</li>
          <li>Instance fields exist as part of an object's state.</li>
          <li>Static fields exist as class-level state while the class is loaded.</li>
        </ul>

        <h3>Shadowing</h3>
        <p>
          Shadowing occurs when a variable in an inner scope or
          parameter has the same name as another variable.
        </p>

        <pre style={codeStyle}>
{`class Student {
    int age = 18;

    void setAge(int age) {
        this.age = age;
    }
}`}
        </pre>

        <p>
          <code>this.age</code> refers to the instance field.
          The parameter <code>age</code> shadows the field name
          inside the method.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>9. var — Local Variable Type Inference</h2>

        <p>
          Since Java 10, <code>var</code> can be used for local
          variables when the compiler can infer the type from
          the initializer.
        </p>

        <pre style={codeStyle}>
{`var age = 19;       // inferred as int
var name = "Angel";  // inferred as String`}
        </pre>

        <h3>Important rules</h3>
        <ul>
          <li>var is not a new data type.</li>
          <li>The variable still has a fixed compile-time type.</li>
          <li>A local variable declared with var needs an initializer.</li>
          <li>var cannot be used for fields or method parameters.</li>
          <li>It cannot be initialized with only null because the type cannot be inferred.</li>
        </ul>

        <pre style={codeStyle}>
{`var value = 10;

// value = "hello"; // Compile-time error`}
        </pre>

        <p>
          The inferred type is int, so assigning a String later
          is not allowed.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>10. Wrapper Classes</h2>

        <p>
          Each primitive type has a corresponding wrapper class.
          Wrapper objects allow primitive values to be used where
          objects are required, such as in generic collections.
        </p>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px" }}>Primitive</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Wrapper</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "8px" }}>byte</td><td style={{ padding: "8px" }}>Byte</td></tr>
            <tr><td style={{ padding: "8px" }}>short</td><td style={{ padding: "8px" }}>Short</td></tr>
            <tr><td style={{ padding: "8px" }}>int</td><td style={{ padding: "8px" }}>Integer</td></tr>
            <tr><td style={{ padding: "8px" }}>long</td><td style={{ padding: "8px" }}>Long</td></tr>
            <tr><td style={{ padding: "8px" }}>float</td><td style={{ padding: "8px" }}>Float</td></tr>
            <tr><td style={{ padding: "8px" }}>double</td><td style={{ padding: "8px" }}>Double</td></tr>
            <tr><td style={{ padding: "8px" }}>char</td><td style={{ padding: "8px" }}>Character</td></tr>
            <tr><td style={{ padding: "8px" }}>boolean</td><td style={{ padding: "8px" }}>Boolean</td></tr>
          </tbody>
        </table>

        <pre style={codeStyle}>
{`int number = 10;
Integer objectNumber = number;`}
        </pre>

        <p>
          The automatic conversion from primitive to wrapper is
          called autoboxing. Converting wrapper to primitive
          is called unboxing.
        </p>

        <p>
          Wrapper classes are immutable. For example, an Integer
          object cannot have its stored value changed after creation.
        </p>

        <h3>Null unboxing danger</h3>
        <pre style={codeStyle}>
{`Integer number = null;

// Causes NullPointerException:
int value = number;`}
        </pre>
        <p>
          Unboxing null throws a NullPointerException.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>11. Memory Concepts</h2>

        <p>
          At a conceptual level, primitive local variables and
          reference variables are often described as being stored
          in stack frames, while objects are commonly allocated
          on the heap.
        </p>

        <pre style={codeStyle}>
{`Student student = new Student();`}
        </pre>

        <p>
          This creates a Student object and assigns its reference
          to the variable student.
        </p>

        <p>
          Important: Java specifications do not require every object
          to physically reside on the heap in every implementation.
          JVM optimizations may eliminate or transform allocations.
          The stack/heap model is a useful learning model, not a
          guarantee of exact physical memory placement.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>12. Common Mistakes</h2>

        <ul>
          <li>Using a decimal literal for float without f or F.</li>
          <li>Assuming int can store every whole number.</li>
          <li>Assuming casting double to int rounds the value.</li>
          <li>Assuming byte + byte produces byte.</li>
          <li>Using == to compare String contents.</li>
          <li>Reading a local variable before assigning it.</li>
          <li>Assuming final makes an object immutable.</li>
          <li>Unboxing a null wrapper object.</li>
          <li>Assuming floating-point calculations are exact decimal arithmetic.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2>13. Interview Questions</h2>

        <details>
          <summary>1. What are the eight primitive types in Java?</summary>
          <p>
            byte, short, int, long, float, double, char, and boolean.
          </p>
        </details>

        <details>
          <summary>2. What is the difference between primitive and reference types?</summary>
          <p>
            Primitive variables hold primitive values. Reference
            variables hold references to objects or null.
          </p>
        </details>

        <details>
          <summary>3. Why does byte + byte produce int?</summary>
          <p>
            Java promotes byte, short, and char operands to int
            during most arithmetic operations.
          </p>
        </details>

        <details>
          <summary>4. What is type casting?</summary>
          <p>
            Type casting explicitly converts a value to another
            compatible type, commonly used for narrowing conversions.
          </p>
        </details>

        <details>
          <summary>5. What is the difference between widening and narrowing?</summary>
          <p>
            Widening converts to a broader compatible type and is
            often automatic. Narrowing may lose information and
            generally requires an explicit cast.
          </p>
        </details>

        <details>
          <summary>6. What is the difference between local, instance, and static variables?</summary>
          <p>
            Local variables belong to a scope, instance fields
            belong to each object, and static fields are class-level.
          </p>
        </details>

        <details>
          <summary>7. What does final mean for an object reference?</summary>
          <p>
            The reference cannot be reassigned, but the object
            itself may still be mutable.
          </p>
        </details>

        <details>
          <summary>8. What is autoboxing?</summary>
          <p>
            Automatic conversion of a primitive value to its
            corresponding wrapper type.
          </p>
        </details>

        <details>
          <summary>9. Can a local variable have a default value?</summary>
          <p>
            Local variables do not receive default values and must
            be definitely assigned before use.
          </p>
        </details>

        <details>
          <summary>10. What is var?</summary>
          <p>
            var enables local variable type inference. The compiler
            infers a fixed type from the initializer.
          </p>
        </details>

        <details>
          <summary>11. Why can floating-point values be imprecise?</summary>
          <p>
            Many decimal fractions have no exact finite binary
            representation, so their stored values are approximations.
          </p>
        </details>

        <details>
          <summary>12. What happens when an Integer null is unboxed?</summary>
          <p>
            A NullPointerException is thrown.
          </p>
        </details>
      </section>

      <section style={sectionStyle}>
        <h2>14. Practice Problems</h2>

        <ol>
          <li>Declare variables for name, age, CGPA, and pass status.</li>
          <li>Convert int to double and print both values.</li>
          <li>Convert double to int and explain the result.</li>
          <li>Find the output of byte + byte.</li>
          <li>Find the output of 5 / 2 and 5 / 2.0.</li>
          <li>Demonstrate integer overflow with a small example.</li>
          <li>Create a final variable and try to reassign it.</li>
          <li>Create a final array and modify one element.</li>
          <li>Use Integer and demonstrate autoboxing and unboxing.</li>
          <li>Explain local, instance, and static variables with a class.</li>
        </ol>
      </section>

      <section style={sectionStyle}>
        <h2>15. Quick Revision</h2>

        <ul>
          <li>Java has eight primitive data types.</li>
          <li>String is a reference type, not a primitive.</li>
          <li>Local variables must be initialized before use.</li>
          <li>Instance fields and static fields receive default values.</li>
          <li>byte, short, and char usually promote to int in arithmetic.</li>
          <li>Floating-point to integer casting truncates toward zero.</li>
          <li>final prevents reassignment, not necessarily object mutation.</li>
          <li>var is local variable type inference, not dynamic typing.</li>
          <li>Wrapper classes are used where object types are required.</li>
          <li>Unboxing null causes NullPointerException.</li>
        </ul>
      </section>
    </div>
  );
}
