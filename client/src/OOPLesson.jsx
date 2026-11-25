

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
    title: "1. What is OOP?",
    content: (
      <>
        <p>
          Object-Oriented Programming is a programming approach that organizes
          code using classes and objects.
        </p>
        <p>
          An object combines data and behavior. Data is represented using
          fields, and behavior is represented using methods.
        </p>
        <ul>
          <li>Class: blueprint or definition.</li>
          <li>Object: instance created from a class.</li>
          <li>Field: variable that belongs to a class or object.</li>
          <li>Method: behavior defined inside a class.</li>
        </ul>
      </>
    ),
    code: `class Student {
    String name;
    int age;

    void study() {
        System.out.println("Student is studying");
    }
}

Student s1 = new Student();
s1.name = "Angel";
s1.age = 19;
s1.study();`,
  },
  {
    title: "2. Class and object",
    content: (
      <>
        <p>
          A class defines what data and behavior its objects can have.
          An object is a real instance created from that class.
        </p>
        <p>
          One class can create many objects. Each object can have its own
          instance field values.
        </p>
      </>
    ),
    code: `class Car {
    String brand;
    int speed;
}

Car car1 = new Car();
Car car2 = new Car();

car1.brand = "Honda";
car1.speed = 80;

car2.brand = "Toyota";
car2.speed = 100;

System.out.println(car1.brand); // Honda
System.out.println(car2.brand); // Toyota`,
  },
  {
    title: "3. Creating objects with new",
    content: (
      <>
        <p>
          The <code>new</code> keyword creates an object and returns a
          reference to it.
        </p>
        <p>
          The reference variable is not the object itself. It stores a
          reference that allows the program to access the object.
        </p>
      </>
    ),
    code: `Student student = new Student();

// student is a reference variable.
// new Student() creates the object.

student.name = "Ravi";`,
  },
  {
    title: "4. Instance variables and local variables",
    content: (
      <>
        <p>
          Instance variables belong to an object. Each object has its own
          instance variable values.
        </p>
        <p>
          Local variables are declared inside methods, constructors, or
          blocks. They exist only within their scope.
        </p>
        <p>
          Instance variables receive default values. Local variables must
          be initialized before they are read.
        </p>
      </>
    ),
    code: `class Example {
    int instanceValue; // default 0

    void show() {
        int localValue = 10;

        System.out.println(instanceValue);
        System.out.println(localValue);
    }
}`,
  },
  {
    title: "5. Constructors",
    content: (
      <>
        <p>
          A constructor initializes an object when it is created.
        </p>
        <ul>
          <li>Constructor name must match the class name.</li>
          <li>It has no return type, not even void.</li>
          <li>It runs during object creation.</li>
          <li>Constructors can be overloaded.</li>
        </ul>
        <p>
          If you declare no constructor, Java provides a default
          no-argument constructor. If you declare any constructor,
          Java does not automatically provide that default constructor.
        </p>
      </>
    ),
    code: `class Student {
    String name;
    int age;

    Student() {
        name = "Unknown";
        age = 0;
    }
}

Student s = new Student();

System.out.println(s.name); // Unknown`,
  },
  {
    title: "6. Parameterized constructor",
    content: (
      <>
        <p>
          A parameterized constructor accepts values while creating an object.
          It helps initialize objects with different data.
        </p>
      </>
    ),
    code: `class Student {
    String name;
    int age;

    Student(String n, int a) {
        name = n;
        age = a;
    }
}

Student s1 = new Student("Ravi", 19);
Student s2 = new Student("Meena", 20);`,
  },
  {
    title: "7. The this keyword",
    content: (
      <>
        <p>
          <code>this</code> refers to the current object.
        </p>
        <p>
          It is commonly used when parameter names and instance variable
          names are the same.
        </p>
        <p>
          <code>this()</code> can call another constructor in the same class.
          It must be the first statement in that constructor.
        </p>
      </>
    ),
    code: `class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    Student() {
        this("Unknown", 0);
    }
}`,
  },
  {
    title: "8. Encapsulation",
    content: (
      <>
        <p>
          Encapsulation means keeping data and the methods that operate on
          it together, while controlling access to the object's internal state.
        </p>
        <p>
          A common Java approach is to make fields private and provide
          public methods for controlled access.
        </p>
        <p>
          A setter can validate data before changing the field.
        </p>
      </>
    ),
    code: `class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public double getBalance() {
        return balance;
    }
}

BankAccount account = new BankAccount();
account.deposit(500);

System.out.println(account.getBalance());`,
  },
  {
    title: "9. Access modifiers",
    content: (
      <>
        <table>
          <thead>
            <tr>
              <th>Modifier</th>
              <th>Access</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>private</td>
              <td>Inside the declaring class</td>
            </tr>
            <tr>
              <td>default</td>
              <td>Within the same package</td>
            </tr>
            <tr>
              <td>protected</td>
              <td>Same package and subclass access</td>
            </tr>
            <tr>
              <td>public</td>
              <td>Accessible wherever the class/member is accessible</td>
            </tr>
          </tbody>
        </table>
        <p>
          Default access means no access modifier is written.
          It is not the same as the <code>default</code> keyword in a switch
          statement.
        </p>
      </>
    ),
    code: `class Example {
    private int a;
    int b;
    protected int c;
    public int d;
}`,
  },
  {
    title: "10. Inheritance",
    content: (
      <>
        <p>
          Inheritance allows a class to inherit accessible members from
          another class.
        </p>
        <p>
          The class being inherited from is the parent or superclass.
          The class that inherits is the child or subclass.
        </p>
        <p>
          Java uses the <code>extends</code> keyword for class inheritance.
        </p>
      </>
    ),
    code: `class Animal {
    void eat() {
        System.out.println("Eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Barking");
    }
}

Dog d = new Dog();
d.eat();
d.bark();`,
  },
  {
    title: "11. Types of inheritance",
    content: (
      <>
        <ul>
          <li>
            Single inheritance: one child inherits from one parent.
          </li>
          <li>
            Multilevel inheritance: a class inherits from a child class
            that already inherits from another class.
          </li>
          <li>
            Hierarchical inheritance: multiple child classes inherit from
            the same parent.
          </li>
          <li>
            Multiple inheritance of classes: Java does not support this
            directly.
          </li>
        </ul>
        <p>
          Java supports multiple inheritance of type through interfaces.
        </p>
      </>
    ),
    code: `class Animal {}

class Dog extends Animal {}

class Puppy extends Dog {}

// Multilevel:
// Animal -> Dog -> Puppy

class Cat extends Animal {}

// Hierarchical:
// Animal -> Dog
// Animal -> Cat`,
  },
  {
    title: "12. The super keyword",
    content: (
      <>
        <p>
          <code>super</code> refers to the immediate parent class.
        </p>
        <ul>
          <li><code>super.field</code> accesses a parent field.</li>
          <li><code>super.method()</code> calls a parent method.</li>
          <li><code>super()</code> calls a parent constructor.</li>
        </ul>
        <p>
          A call to <code>super()</code> must be the first statement in
          a constructor when explicitly written.
        </p>
      </>
    ),
    code: `class Animal {
    Animal(String name) {
        System.out.println(name);
    }
}

class Dog extends Animal {
    Dog() {
        super("Dog");
    }
}

Dog d = new Dog();`,
  },
  {
    title: "13. Method overriding",
    content: (
      <>
        <p>
          Method overriding happens when a subclass provides its own
          implementation of an inherited instance method.
        </p>
        <ul>
          <li>Method name and parameter list must match.</li>
          <li>Return type must be compatible.</li>
          <li>Access cannot be more restrictive.</li>
          <li>Use <code>@Override</code> to catch mistakes.</li>
        </ul>
        <p>
          Static methods are hidden, not overridden. Private methods are
          not inherited for overriding.
        </p>
      </>
    ),
    code: `class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Bark");
    }
}

Dog d = new Dog();
d.sound(); // Bark`,
  },
  {
    title: "14. Polymorphism",
    content: (
      <>
        <p>
          Polymorphism means one reference or interface can represent
          different object types.
        </p>
        <p>
          With runtime polymorphism, the overridden method that executes
          depends on the actual object type.
        </p>
        <p>
          The reference type determines which members can be accessed
          directly. The object type determines the overridden instance
          method implementation that runs.
        </p>
      </>
    ),
    code: `class Animal {
    void sound() {
        System.out.println("Animal");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog");
    }
}

Animal a = new Dog();

a.sound(); // Dog`,
  },
  {
    title: "15. Compile-time polymorphism: overloading",
    content: (
      <>
        <p>
          Method overloading means multiple methods have the same name
          but different parameter lists.
        </p>
        <p>
          The compiler selects the appropriate overload using the
          arguments and method signatures.
        </p>
        <p>
          Changing only the return type does not create a valid overload.
        </p>
      </>
    ),
    code: `class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}`,
  },
  {
    title: "16. Abstract classes",
    content: (
      <>
        <p>
          An abstract class cannot be instantiated directly.
        </p>
        <p>
          It can contain abstract methods without a body and concrete
          methods with implementations.
        </p>
        <p>
          A concrete subclass must implement inherited abstract methods
          unless it is also declared abstract.
        </p>
      </>
    ),
    code: `abstract class Shape {
    abstract double area();

    void display() {
        System.out.println("Shape");
    }
}

class Circle extends Shape {
    double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }
}`,
  },
  {
    title: "17. Interfaces",
    content: (
      <>
        <p>
          An interface defines a contract that implementing classes agree
          to provide.
        </p>
        <p>
          A class uses <code>implements</code> to implement an interface.
          A class can implement multiple interfaces.
        </p>
        <p>
          Interfaces can contain abstract methods, default methods,
          static methods, and constants.
        </p>
      </>
    ),
    code: `interface Printable {
    void print();
}

interface Scannable {
    void scan();
}

class Machine implements Printable, Scannable {
    public void print() {
        System.out.println("Printing");
    }

    public void scan() {
        System.out.println("Scanning");
    }
}`,
  },
  {
    title: "18. Abstract class vs interface",
    content: (
      <>
        <table>
          <thead>
            <tr><th>Abstract class</th><th>Interface</th></tr>
          </thead>
          <tbody>
            <tr><td>Can have instance fields</td><td>Fields are public static final constants</td></tr>
            <tr><td>Can have constructors</td><td>Cannot have constructors</td></tr>
            <tr><td>Class extends one class</td><td>Class can implement multiple interfaces</td></tr>
            <tr><td>Can provide shared state and behavior</td><td>Primarily defines a contract</td></tr>
          </tbody>
        </table>
        <p>
          Choose based on the design, not just because one keyword looks
          shorter.
        </p>
      </>
    ),
    code: `abstract class Vehicle {
    int speed;

    abstract void start();
}

interface GPS {
    void navigate();
}

class Car extends Vehicle implements GPS {
    void start() {
        System.out.println("Start");
    }

    public void navigate() {
        System.out.println("Navigate");
    }
}`,
  },
  {
    title: "19. The static keyword",
    content: (
      <>
        <p>
          A static member belongs to the class rather than to a particular
          object.
        </p>
        <ul>
          <li>Static variable: shared class-level variable.</li>
          <li>Static method: can be called using the class name.</li>
          <li>Static block: runs when the class is initialized.</li>
        </ul>
        <p>
          A static method cannot directly access instance members without
          an object reference.
        </p>
      </>
    ),
    code: `class Student {
    static String college = "SKCET";
    String name;

    static void showCollege() {
        System.out.println(college);
    }
}

Student.showCollege();

Student s = new Student();
s.name = "Angel";`,
  },
  {
    title: "20. The final keyword",
    content: (
      <>
        <p>
          <code>final</code> restricts reassignment or inheritance,
          depending on where it is used.
        </p>
        <ul>
          <li>Final variable: can be assigned only once.</li>
          <li>Final method: cannot be overridden.</li>
          <li>Final class: cannot be subclassed.</li>
        </ul>
        <p>
          A final reference cannot point to another object, but the
          referenced object's mutable state may still change.
        </p>
      </>
    ),
    code: `final int MAX = 100;

// MAX = 200; // Error

final class Utility {
}

// class Child extends Utility {} // Error`,
  },
  {
    title: "21. Object class and toString()",
    content: (
      <>
        <p>
          Every Java class directly or indirectly inherits from
          <code> Object</code>, unless it extends another class.
        </p>
        <p>
          Common Object methods include <code>toString()</code>,
          <code> equals()</code>, and <code>hashCode()</code>.
        </p>
        <p>
          Override <code>toString()</code> to provide a useful textual
          representation of an object.
        </p>
      </>
    ),
    code: `class Student {
    String name;

    Student(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student: " + name;
    }
}

Student s = new Student("Ravi");

System.out.println(s);`,
  },
  {
    title: "22. equals() and hashCode()",
    content: (
      <>
        <p>
          <code>equals()</code> defines logical equality between objects.
          The default implementation from Object compares identity.
        </p>
        <p>
          If you override <code>equals()</code>, you should also override
          <code> hashCode()</code>.
        </p>
        <p>
          Equal objects must have equal hash codes. Unequal objects may
          have the same hash code.
        </p>
        <p>
          This contract is important for HashSet and HashMap.
        </p>
      </>
    ),
    code: `// Contract:
// if a.equals(b) is true,
// then a.hashCode() == b.hashCode()

// Hash-based collections use hashCode()
// to locate a bucket, then equals()
// to distinguish matching keys.`,
  },
  {
    title: "23. Upcasting and downcasting",
    content: (
      <>
        <p>
          Upcasting means assigning a subclass object to a superclass
          reference. It is generally implicit and safe.
        </p>
        <p>
          Downcasting means converting a superclass reference back to a
          subclass reference. It requires an explicit cast and can fail
          at runtime.
        </p>
        <p>
          Use <code>instanceof</code> when you need to check the object's
          type before casting.
        </p>
      </>
    ),
    code: `class Animal {}
class Dog extends Animal {
    void bark() {
        System.out.println("Bark");
    }
}

Animal a = new Dog(); // Upcasting

if (a instanceof Dog) {
    Dog d = (Dog) a; // Downcasting
    d.bark();
}`,
  },
  {
    title: "24. Composition",
    content: (
      <>
        <p>
          Composition means one class contains or uses an object of another
          class to build its behavior.
        </p>
        <p>
          It represents a has-a relationship.
        </p>
        <p>
          In many designs, composition is more flexible than inheritance
          because behavior can be delegated to separate objects.
        </p>
      </>
    ),
    code: `class Engine {
    void start() {
        System.out.println("Engine started");
    }
}

class Car {
    private Engine engine = new Engine();

    void startCar() {
        engine.start();
    }
}

Car car = new Car();
car.startCar();`,
  },
  {
    title: "25. Association, aggregation, composition",
    content: (
      <>
        <ul>
          <li>
            Association: two objects are related or communicate.
          </li>
          <li>
            Aggregation: a weaker has-a relationship; the contained
            object can exist independently.
          </li>
          <li>
            Composition: stronger ownership; the containing object
            manages the part as part of its design.
          </li>
        </ul>
        <p>
          These are design relationships. Java does not enforce them
          through special keywords.
        </p>
      </>
    ),
    code: `class Department {
    String name;
}

class College {
    Department department;
}

// College has a Department reference.
// The exact ownership relationship depends
// on how objects are created and managed.`,
  },
  {
    title: "26. Common OOP mistakes",
    content: (
      <>
        <ul>
          <li>Confusing a class with an object.</li>
          <li>Thinking the reference variable is the object.</li>
          <li>Forgetting that constructors have no return type.</li>
          <li>Using private parent fields directly in a subclass.</li>
          <li>Confusing overloading with overriding.</li>
          <li>Assuming static methods are overridden.</li>
          <li>Calling an abstract class constructor directly.</li>
          <li>Downcasting without checking the actual object type.</li>
          <li>Overriding equals() but not hashCode().</li>
          <li>Using inheritance when composition is more suitable.</li>
        </ul>
      </>
    ),
    code: `// Overloading:
// same method name, different parameters

// Overriding:
// subclass provides implementation
// of inherited instance method

// Hiding:
// subclass declares a static method
// with the same signature as parent`,
  },
  {
    title: "27. Interview questions",
    content: (
      <>
        <ol>
          <li>What is OOP and why is it used?</li>
          <li>What is the difference between class and object?</li>
          <li>What is a constructor?</li>
          <li>What is constructor overloading?</li>
          <li>What is the use of this and super?</li>
          <li>Explain encapsulation with an example.</li>
          <li>What are access modifiers?</li>
          <li>What is inheritance?</li>
          <li>Does Java support multiple inheritance?</li>
          <li>What is method overriding?</li>
          <li>What is runtime polymorphism?</li>
          <li>What is the difference between overloading and overriding?</li>
          <li>What is an abstract class?</li>
          <li>What is an interface?</li>
          <li>What is the difference between abstract class and interface?</li>
          <li>What are static and final?</li>
          <li>What is upcasting and downcasting?</li>
          <li>What is composition?</li>
          <li>Why should equals() and hashCode() be overridden together?</li>
        </ol>
      </>
    ),
    code: `// Four commonly taught OOP pillars:
// 1. Encapsulation
// 2. Inheritance
// 3. Polymorphism
// 4. Abstraction`,
  },
  {
    title: "28. Practice problems",
    content: (
      <>
        <ol>
          <li>Create a Student class with fields and a constructor.</li>
          <li>Create a BankAccount class with private balance.</li>
          <li>Create an Employee class with overloaded constructors.</li>
          <li>Create Animal and Dog classes with method overriding.</li>
          <li>Create a Shape abstract class and Circle subclass.</li>
          <li>Create a Printable interface and implement it.</li>
          <li>Demonstrate runtime polymorphism using superclass references.</li>
          <li>Create a Car class that contains an Engine object.</li>
          <li>Override toString() for a Student class.</li>
          <li>Implement equals() and hashCode() for a simple class.</li>
        </ol>
      </>
    ),
    code: `class Student {
    private String name;
    private int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}`,
  },
];

export default function OOPLesson({ onBack }) {
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
        Java Object-Oriented Programming
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn classes, objects, constructors, encapsulation, inheritance,
        polymorphism, abstraction, interfaces, and object relationships.
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
          <li>I can create classes and objects.</li>
          <li>I understand constructors and this.</li>
          <li>I can implement encapsulation using private fields.</li>
          <li>I understand inheritance and super.</li>
          <li>I can explain overloading and overriding.</li>
          <li>I understand abstract classes and interfaces.</li>
          <li>I can explain runtime polymorphism.</li>
          <li>I understand static, final, and Object methods.</li>
          <li>I can choose between inheritance and composition.</li>
          <li>I can solve the practice problems without copying.</li>
        </ul>
      </section>
    </div>
  );
}
