

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
    title: "1. What is a method?",
    content: (
      <>
        <p>
          A method is a named block of code that performs a particular task.
          You can call it whenever you need that task.
        </p>
        <p>
          Methods help you avoid repeating code, divide a large program into
          smaller parts, and make programs easier to test and maintain.
        </p>
        <p>
          In simple words: write the logic once, call it whenever needed.
        </p>
      </>
    ),
    code: `public class Main {
    static void greet() {
        System.out.println("Hello Java");
    }

    public static void main(String[] args) {
        greet();
        greet();
    }
}

Output:
Hello Java
Hello Java`,
  },
  {
    title: "2. Method syntax",
    content: (
      <>
        <p>A method declaration generally contains:</p>
        <ul>
          <li>Access modifier — who can access the method.</li>
          <li>Optional modifier — such as static.</li>
          <li>Return type — what value the method returns.</li>
          <li>Method name — the name used to call it.</li>
          <li>Parameters — input values, if required.</li>
          <li>Method body — the statements that perform the task.</li>
        </ul>
      </>
    ),
    code: `public static int add(int a, int b) {
    int sum = a + b;
    return sum;
}`,
  },
  {
    title: "3. Calling a method",
    content: (
      <>
        <p>
          Defining a method does not automatically execute it. You must call
          the method.
        </p>
        <p>
          When a method is called, execution moves to that method. After it
          finishes, execution returns to the statement after the call.
        </p>
      </>
    ),
    code: `static void sayHello() {
    System.out.println("Hello");
}

public static void main(String[] args) {
    System.out.println("Start");

    sayHello();

    System.out.println("End");
}

Output:
Start
Hello
End`,
  },
  {
    title: "4. Parameters and arguments",
    content: (
      <>
        <p>
          A parameter is a variable declared in a method definition.
        </p>
        <p>
          An argument is the actual value supplied when calling the method.
        </p>
        <p>
          Tanglish: method definition-la irukkura input variable parameter.
          Method call pannumbodhu pass panra value argument.
        </p>
      </>
    ),
    code: `static void greet(String name) {
    System.out.println("Hello " + name);
}

public static void main(String[] args) {
    greet("Angel");
}

// name is the parameter
// "Angel" is the argument

Output:
Hello Angel`,
  },
  {
    title: "5. Methods with multiple parameters",
    content: (
      <>
        <p>
          A method can receive more than one parameter. Each argument must
          match the corresponding parameter in order.
        </p>
        <p>
          The number, order, and compatible types of arguments matter when
          calling a method.
        </p>
      </>
    ),
    code: `static int add(int a, int b) {
    return a + b;
}

public static void main(String[] args) {
    int result = add(10, 20);
    System.out.println(result);
}

Output:
30`,
  },
  {
    title: "6. Return type",
    content: (
      <>
        <p>
          The return type tells Java what type of value the method sends
          back to the caller.
        </p>
        <ul>
          <li><code>int</code> — returns an integer.</li>
          <li><code>double</code> — returns a decimal value.</li>
          <li><code>String</code> — returns text.</li>
          <li><code>boolean</code> — returns true or false.</li>
          <li><code>void</code> — does not return a value.</li>
        </ul>
      </>
    ),
    code: `static int square(int n) {
    return n * n;
}

static String getName() {
    return "Java";
}

static boolean isEven(int n) {
    return n % 2 == 0;
}`,
  },
  {
    title: "7. The return statement",
    content: (
      <>
        <p>
          The <code>return</code> statement sends a value back to the caller
          and ends the current method's execution.
        </p>
        <p>
          A method with a non-void return type must return a compatible value
          on every possible path that completes normally.
        </p>
      </>
    ),
    code: `static int multiply(int a, int b) {
    return a * b;
}

public static void main(String[] args) {
    int answer = multiply(4, 5);
    System.out.println(answer);
}

Output:
20`,
  },
  {
    title: "8. void methods",
    content: (
      <>
        <p>
          A <code>void</code> method performs an action but does not return
          a result.
        </p>
        <p>
          You can still use <code>return;</code> to exit a void method early.
          You cannot return a value from a void method.
        </p>
      </>
    ),
    code: `static void checkAge(int age) {
    if (age < 18) {
        System.out.println("Minor");
        return;
    }

    System.out.println("Adult");
}`,
  },
  {
    title: "9. Storing and using return values",
    content: (
      <>
        <p>
          A returned value can be stored in a variable, used in an expression,
          or passed directly to another method.
        </p>
        <p>
          You do not have to print the value inside the method. Keeping
          calculation and display separate makes code more reusable.
        </p>
      </>
    ),
    code: `static int square(int n) {
    return n * n;
}

public static void main(String[] args) {
    int result = square(5);

    System.out.println(result);
    System.out.println(square(3) + 2);
}

Output:
25
11`,
  },
  {
    title: "10. The static keyword",
    content: (
      <>
        <p>
          A static method belongs to the class rather than to a particular
          object.
        </p>
        <p>
          You can call a static method using the class name, without creating
          an object.
        </p>
        <p>
          The main method is static because Java can start the program
          without first creating an object of the class.
        </p>
      </>
    ),
    code: `class Calculator {
    static int add(int a, int b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        int result = Calculator.add(5, 7);
        System.out.println(result);
    }
}`,
  },
  {
    title: "11. Instance methods",
    content: (
      <>
        <p>
          An instance method belongs to an object. You normally call it
          using an object reference.
        </p>
        <p>
          Instance methods can access instance variables and other instance
          methods of that object.
        </p>
      </>
    ),
    code: `class Student {
    String name;

    void displayName() {
        System.out.println(name);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        s.name = "Angel";

        s.displayName();
    }
}`,
  },
  {
    title: "12. Static vs instance methods",
    content: (
      <>
        <table>
          <thead>
            <tr>
              <th>Static method</th>
              <th>Instance method</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Belongs to class</td>
              <td>Belongs to object</td>
            </tr>
            <tr>
              <td>Can be called using class name</td>
              <td>Usually called using object</td>
            </tr>
            <tr>
              <td>Cannot directly use instance members</td>
              <td>Can access instance members</td>
            </tr>
            <tr>
              <td>Example: Math.max()</td>
              <td>Example: object.display()</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
    code: `class Demo {
    static void staticMethod() {
        System.out.println("Static");
    }

    void instanceMethod() {
        System.out.println("Instance");
    }
}

public class Main {
    public static void main(String[] args) {
        Demo.staticMethod();

        Demo obj = new Demo();
        obj.instanceMethod();
    }
}`,
  },
  {
    title: "13. Method overloading",
    content: (
      <>
        <p>
          Method overloading means defining multiple methods with the same
          name but different parameter lists.
        </p>
        <p>
          The parameter lists can differ in number, types, or order of
          parameter types.
        </p>
        <p>
          Overloading is an example of compile-time polymorphism.
        </p>
      </>
    ),
    code: `static int add(int a, int b) {
    return a + b;
}

static int add(int a, int b, int c) {
    return a + b + c;
}

static double add(double a, double b) {
    return a + b;
}

public static void main(String[] args) {
    System.out.println(add(2, 3));
    System.out.println(add(2, 3, 4));
    System.out.println(add(2.5, 3.5));
}`,
  },
  {
    title: "14. What does NOT create overloading?",
    content: (
      <>
        <p>
          Changing only the return type is not enough to overload a method.
        </p>
        <p>
          Java uses the method name and parameter list to distinguish
          overloaded methods. The return type alone does not make a different
          method signature.
        </p>
      </>
    ),
    code: `// Invalid: same name and parameters
static int calculate(int x) {
    return x;
}

// This cannot be added to the same class
// just by changing the return type.
static double calculate(int x) {
    return x * 1.5;
}`,
  },
  {
    title: "15. Method overloading resolution",
    content: (
      <>
        <p>
          When you call an overloaded method, Java selects the most
          appropriate applicable method based on the argument types.
        </p>
        <p>
          If Java cannot find a suitable method or the call is ambiguous,
          compilation fails.
        </p>
        <p>
          Be careful with numeric conversions and overloaded methods,
          especially when passing values such as int, long, and double.
        </p>
      </>
    ),
    code: `static void show(int x) {
    System.out.println("int");
}

static void show(double x) {
    System.out.println("double");
}

public static void main(String[] args) {
    show(10);    // int overload
    show(10.5);  // double overload
}`,
  },
  {
    title: "16. Variable scope inside methods",
    content: (
      <>
        <p>
          Scope means the region of the program where a variable can be
          accessed.
        </p>
        <ul>
          <li>
            Local variable: declared inside a method or block.
          </li>
          <li>
            Parameter: available inside the method receiving it.
          </li>
          <li>
            Instance variable: belongs to an object.
          </li>
          <li>
            Static variable: belongs to the class.
          </li>
        </ul>
        <p>
          A local variable must be initialized before it is read.
        </p>
      </>
    ),
    code: `static void example(int value) {
    int local = 10;

    System.out.println(value);
    System.out.println(local);
}

// value and local cannot be accessed
// directly outside this method.`,
  },
  {
    title: "17. Java is pass-by-value",
    content: (
      <>
        <p>
          Java is always pass-by-value.
        </p>
        <p>
          For primitive arguments, the method receives a copy of the
          primitive value.
        </p>
        <p>
          For object arguments, the method receives a copy of the reference.
          The copied reference can still point to the same object, so the
          method may change that object's fields.
        </p>
        <p>
          But assigning a new object to the copied reference does not change
          the caller's reference.
        </p>
      </>
    ),
    code: `static void change(int x) {
    x = 100;
}

public static void main(String[] args) {
    int number = 10;

    change(number);

    System.out.println(number);
}

// Output:
// 10`,
  },
  {
    title: "18. Pass-by-value with objects",
    content: (
      <>
        <p>
          The reference is copied, not the entire object.
        </p>
        <p>
          Both references can point to the same object. Changing the object's
          state through one reference can be visible through the other.
        </p>
      </>
    ),
    code: `class Box {
    int value;
}

static void change(Box b) {
    b.value = 50;
}

public static void main(String[] args) {
    Box box = new Box();
    box.value = 10;

    change(box);

    System.out.println(box.value);
}

// Output:
// 50`,
  },
  {
    title: "19. Recursion basics",
    content: (
      <>
        <p>
          Recursion happens when a method calls itself.
        </p>
        <p>
          Every recursive solution needs:
        </p>
        <ul>
          <li>Base case: stops further recursive calls.</li>
          <li>Recursive case: moves toward the base case.</li>
        </ul>
        <p>
          Without a correct base case, recursion may continue until a
          StackOverflowError occurs.
        </p>
      </>
    ),
    code: `static void countDown(int n) {
    if (n == 0) {
        return; // Base case
    }

    System.out.println(n);

    countDown(n - 1); // Recursive case
}`,
  },
  {
    title: "20. Recursion dry run: factorial",
    content: (
      <>
        <p>
          Factorial of n is the product of positive integers from 1 to n.
        </p>
        <p>
          Mathematically, 5! = 5 × 4 × 3 × 2 × 1 = 120.
        </p>
        <p>
          The recursive definition is n × factorial(n - 1), with factorial(0)
          equal to 1.
        </p>
      </>
    ),
    code: `static int factorial(int n) {
    if (n == 0) {
        return 1;
    }

    return n * factorial(n - 1);
}

// factorial(4)
// = 4 * factorial(3)
// = 4 * 3 * factorial(2)
// = 4 * 3 * 2 * factorial(1)
// = 4 * 3 * 2 * 1 * factorial(0)
// = 4 * 3 * 2 * 1 * 1
// = 24`,
  },
  {
    title: "21. Recursion vs iteration",
    content: (
      <>
        <table>
          <thead>
            <tr>
              <th>Recursion</th>
              <th>Iteration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Method calls itself</td>
              <td>Uses loops</td>
            </tr>
            <tr>
              <td>Uses call stack space</td>
              <td>Often uses less extra stack space</td>
            </tr>
            <tr>
              <td>Can be natural for tree problems</td>
              <td>Often efficient for simple repetition</td>
            </tr>
            <tr>
              <td>May cause stack overflow</td>
              <td>Can avoid recursive stack growth</td>
            </tr>
          </tbody>
        </table>
        <p>
          Recursion is not automatically faster or better. Choose based on
          clarity, constraints, and complexity.
        </p>
      </>
    ),
    code: `// Iterative factorial
static int factorialLoop(int n) {
    int result = 1;

    for (int i = 1; i <= n; i++) {
        result *= i;
    }

    return result;
}`,
  },
  {
    title: "22. Method design best practices",
    content: (
      <>
        <ul>
          <li>Give methods meaningful names.</li>
          <li>Make each method perform one clear task.</li>
          <li>Use parameters instead of hard-coded values.</li>
          <li>Return calculation results instead of printing them unnecessarily.</li>
          <li>Avoid very long methods.</li>
          <li>Validate inputs when required.</li>
          <li>Use static only when object state is not needed.</li>
          <li>Do not use recursion when it creates unnecessary stack risk.</li>
        </ul>
      </>
    ),
    code: `// Reusable calculation method
static double calculateAverage(
        double mark1,
        double mark2,
        double mark3) {

    return (mark1 + mark2 + mark3) / 3.0;
}`,
  },
  {
    title: "23. Practice problems",
    content: (
      <>
        <ol>
          <li>Write a method that prints your name.</li>
          <li>Write a method that adds two integers.</li>
          <li>Write a method that returns the square of a number.</li>
          <li>Write a method that checks whether a number is even.</li>
          <li>Write a method that returns the largest of three numbers.</li>
          <li>Overload a method to add two and three numbers.</li>
          <li>Write a method to calculate factorial using a loop.</li>
          <li>Write a recursive factorial method.</li>
          <li>Write a method that counts digits in an integer.</li>
          <li>Write a method that reverses a String.</li>
          <li>Pass an object to a method and modify one of its fields.</li>
        </ol>
      </>
    ),
    code: `// Practice: check even

static boolean isEven(int number) {
    return number % 2 == 0;
}

public static void main(String[] args) {
    System.out.println(isEven(8));
    System.out.println(isEven(7));
}

// Output:
// true
// false`,
  },
  {
    title: "24. Interview questions",
    content: (
      <>
        <ol>
          <li>What is a method in Java?</li>
          <li>What are parameters and arguments?</li>
          <li>What is a return type?</li>
          <li>What is the difference between void and non-void methods?</li>
          <li>What does return do?</li>
          <li>What is a static method?</li>
          <li>What is an instance method?</li>
          <li>What is method overloading?</li>
          <li>Can methods be overloaded by return type alone?</li>
          <li>How does Java select an overloaded method?</li>
          <li>What is variable scope?</li>
          <li>Is Java pass-by-value or pass-by-reference?</li>
          <li>How are object references passed to methods?</li>
          <li>What is recursion?</li>
          <li>What are base case and recursive case?</li>
          <li>What is StackOverflowError?</li>
          <li>When would iteration be preferable to recursion?</li>
        </ol>
      </>
    ),
    code: `// Remember:
// Method      -> reusable block
// Parameter   -> variable in definition
// Argument    -> value passed in call
// Return      -> sends value back
// Overloading -> same name, different parameters
// Recursion   -> method calls itself`,
  },
];

export default function MethodsLesson({ onBack }) {
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
        Java Methods
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn reusable methods, parameters, return values, overloading,
        scope, pass-by-value, and recursion.
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
          <li>I can define and call methods.</li>
          <li>I understand parameters, arguments, and return values.</li>
          <li>I can write static and instance methods.</li>
          <li>I understand method overloading.</li>
          <li>I understand scope and pass-by-value.</li>
          <li>I can trace basic recursion.</li>
          <li>I can solve the practice problems independently.</li>
        </ul>
      </section>
    </div>
  );
}
