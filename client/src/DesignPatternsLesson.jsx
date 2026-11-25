

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
    title: "1. What Are Design Patterns?",
    content: (
      <>
        <p>
          A design pattern is a reusable approach to solving a common software
          design problem.
        </p>
        <p>
          It is not a ready-made program or a library. It is a proven structure
          that helps developers organize classes and objects.
        </p>
        <p>Example problems:</p>
        <ul>
          <li>How do we create objects without tightly coupling code?</li>
          <li>How do we notify many objects when something changes?</li>
          <li>How do we add features without modifying existing classes?</li>
          <li>How do we make an algorithm interchangeable?</li>
        </ul>
      </>
    ),
    code: `// Design pattern example:
// Strategy Pattern

interface PaymentStrategy {
    void pay(double amount);
}

class UpiPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid using UPI: " + amount);
    }
}

class CardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid using Card: " + amount);
    }
}`,
  },
  {
    title: "2. Three Main Categories",
    content: (
      <>
        <p>Design patterns are commonly grouped into three categories.</p>
        <ul>
          <li>
            <strong>Creational:</strong> How objects are created.
          </li>
          <li>
            <strong>Structural:</strong> How classes and objects are combined.
          </li>
          <li>
            <strong>Behavioral:</strong> How objects communicate and share
            responsibilities.
          </li>
        </ul>
        <p>
          The classic Gang of Four (GoF) catalog contains 23 design patterns.
        </p>
      </>
    ),
    code: `// Creational
// Singleton, Factory Method, Abstract Factory,
// Builder, Prototype

// Structural
// Adapter, Bridge, Composite, Decorator,
// Facade, Flyweight, Proxy

// Behavioral
// Chain of Responsibility, Command,
// Interpreter, Iterator, Mediator,
// Memento, Observer, State, Strategy,
// Template Method, Visitor`,
  },
  {
    title: "3. Singleton Pattern",
    content: (
      <>
        <p>
          Singleton ensures that a class has one shared instance and provides
          a way to access it.
        </p>
        <p>
          Use it only when one shared instance is genuinely required. A
          Singleton can make testing and dependency management harder if
          overused.
        </p>
        <p>
          A common Java implementation uses an enum, which also handles
          serialization and reflection concerns more safely than many
          hand-written implementations.
        </p>
      </>
    ),
    code: `enum AppConfig {
    INSTANCE;

    private String appName = "PrepTrack";

    public String getAppName() {
        return appName;
    }
}

public class Main {
    public static void main(String[] args) {
        AppConfig config = AppConfig.INSTANCE;

        System.out.println(config.getAppName());
    }
}`,
  },
  {
    title: "4. Factory Method Pattern",
    content: (
      <>
        <p>
          Factory Method moves object creation behind a method or interface.
        </p>
        <p>
          The calling code asks for an object without needing to know the
          concrete implementation class.
        </p>
        <p>
          This is useful when the exact object type depends on input or
          configuration.
        </p>
      </>
    ),
    code: `interface Notification {
    void send(String message);
}

class EmailNotification implements Notification {
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SmsNotification implements Notification {
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

class NotificationFactory {
    public static Notification create(String type) {
        if (type.equalsIgnoreCase("email")) {
            return new EmailNotification();
        }

        if (type.equalsIgnoreCase("sms")) {
            return new SmsNotification();
        }

        throw new IllegalArgumentException("Unknown type");
    }
}

public class Main {
    public static void main(String[] args) {
        Notification notification =
            NotificationFactory.create("email");

        notification.send("Hello");
    }
}`,
  },
  {
    title: "5. Abstract Factory Pattern",
    content: (
      <>
        <p>
          Abstract Factory creates families of related objects without
          specifying their concrete classes.
        </p>
        <p>
          Example: a UI application may create a matching set of Windows
          buttons and text fields, or a matching set of Mac buttons and text
          fields.
        </p>
        <p>
          Factory Method usually focuses on creating one product. Abstract
          Factory focuses on creating a family of related products.
        </p>
      </>
    ),
    code: `interface Button {
    void render();
}

interface Checkbox {
    void render();
}

interface UIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

class WindowsButton implements Button {
    public void render() {
        System.out.println("Windows button");
    }
}

class WindowsCheckbox implements Checkbox {
    public void render() {
        System.out.println("Windows checkbox");
    }
}

class WindowsFactory implements UIFactory {
    public Button createButton() {
        return new WindowsButton();
    }

    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
}`,
  },
  {
    title: "6. Builder Pattern",
    content: (
      <>
        <p>
          Builder constructs complex objects step by step.
        </p>
        <p>
          It is useful when a class has many optional fields or when
          constructors become difficult to read.
        </p>
        <p>
          Builder can improve readability, but it adds extra code. For simple
          objects with only a few fields, a normal constructor may be better.
        </p>
      </>
    ),
    code: `class Student {
    private final String name;
    private final int age;
    private final String department;

    private Student(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.department = builder.department;
    }

    static class Builder {
        private String name;
        private int age;
        private String department;

        Builder name(String name) {
            this.name = name;
            return this;
        }

        Builder age(int age) {
            this.age = age;
            return this;
        }

        Builder department(String department) {
            this.department = department;
            return this;
        }

        Student build() {
            return new Student(this);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student.Builder()
            .name("Angel")
            .age(19)
            .department("CSE")
            .build();
    }
}`,
  },
  {
    title: "7. Prototype Pattern",
    content: (
      <>
        <p>
          Prototype creates a new object by copying an existing object.
        </p>
        <p>
          It can be useful when creating an object from scratch is expensive
          or when an object has a predefined configuration.
        </p>
        <p>
          Java's <code>Cloneable</code> and <code>Object.clone()</code> are
          legacy mechanisms. In modern code, an explicit copy constructor or
          copy method is often clearer.
        </p>
      </>
    ),
    code: `class Document {
    private String title;

    Document(String title) {
        this.title = title;
    }

    Document copy() {
        return new Document(this.title);
    }

    void show() {
        System.out.println(title);
    }
}

public class Main {
    public static void main(String[] args) {
        Document original =
            new Document("Java Notes");

        Document copied = original.copy();

        copied.show();
    }
}`,
  },
  {
    title: "8. Adapter Pattern",
    content: (
      <>
        <p>
          Adapter allows incompatible interfaces to work together.
        </p>
        <p>
          Think of a power adapter: the device expects one connection, but
          the adapter translates it to another.
        </p>
        <p>
          In software, an adapter wraps an existing class and exposes the
          interface expected by the client.
        </p>
      </>
    ),
    code: `interface MediaPlayer {
    void play(String file);
}

class OldAudioPlayer {
    void playMp3(String file) {
        System.out.println("Playing MP3: " + file);
    }
}

class AudioAdapter implements MediaPlayer {
    private OldAudioPlayer oldPlayer =
        new OldAudioPlayer();

    public void play(String file) {
        oldPlayer.playMp3(file);
    }
}

public class Main {
    public static void main(String[] args) {
        MediaPlayer player = new AudioAdapter();

        player.play("song.mp3");
    }
}`,
  },
  {
    title: "9. Decorator Pattern",
    content: (
      <>
        <p>
          Decorator adds behavior to an object dynamically without changing
          its original class.
        </p>
        <p>
          It uses composition: a decorator contains another object implementing
          the same interface.
        </p>
        <p>
          Multiple decorators can be combined to add several features.
        </p>
      </>
    ),
    code: `interface Coffee {
    double cost();
}

class PlainCoffee implements Coffee {
    public double cost() {
        return 50;
    }
}

class MilkDecorator implements Coffee {
    private Coffee coffee;

    MilkDecorator(Coffee coffee) {
        this.coffee = coffee;
    }

    public double cost() {
        return coffee.cost() + 10;
    }
}

public class Main {
    public static void main(String[] args) {
        Coffee coffee =
            new MilkDecorator(new PlainCoffee());

        System.out.println(coffee.cost());
    }
}`,
  },
  {
    title: "10. Facade Pattern",
    content: (
      <>
        <p>
          Facade provides a simple interface to a complex subsystem.
        </p>
        <p>
          Instead of making the client call many classes in the correct order,
          the facade provides one convenient method.
        </p>
        <p>
          A facade simplifies access. It does not necessarily remove or replace
          the underlying subsystem.
        </p>
      </>
    ),
    code: `class Database {
    void connect() {
        System.out.println("Connected");
    }
}

class Logger {
    void start() {
        System.out.println("Logging started");
    }
}

class AppFacade {
    private Database database = new Database();
    private Logger logger = new Logger();

    void startApp() {
        database.connect();
        logger.start();
    }
}

public class Main {
    public static void main(String[] args) {
        AppFacade app = new AppFacade();

        app.startApp();
    }
}`,
  },
  {
    title: "11. Proxy Pattern",
    content: (
      <>
        <p>
          Proxy provides a substitute object that controls access to another
          object.
        </p>
        <p>Common uses include:</p>
        <ul>
          <li>Lazy initialization.</li>
          <li>Access control.</li>
          <li>Logging and monitoring.</li>
          <li>Remote object access.</li>
        </ul>
        <p>
          A proxy usually implements the same interface as the real object.
        </p>
      </>
    ),
    code: `interface Image {
    void display();
}

class RealImage implements Image {
    RealImage() {
        loadFromDisk();
    }

    private void loadFromDisk() {
        System.out.println("Loading image");
    }

    public void display() {
        System.out.println("Displaying image");
    }
}

class ImageProxy implements Image {
    private RealImage realImage;

    public void display() {
        if (realImage == null) {
            realImage = new RealImage();
        }

        realImage.display();
    }
}

public class Main {
    public static void main(String[] args) {
        Image image = new ImageProxy();

        image.display();
    }
}`,
  },
  {
    title: "12. Strategy Pattern",
    content: (
      <>
        <p>
          Strategy defines a family of algorithms and makes them
          interchangeable.
        </p>
        <p>
          Instead of writing many conditional branches, the client receives
          the required strategy object.
        </p>
        <p>
          This is useful for payment methods, sorting rules, discount
          calculations, and validation policies.
        </p>
      </>
    ),
    code: `interface PaymentStrategy {
    void pay(double amount);
}

class UpiPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("UPI payment: " + amount);
    }
}

class CardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Card payment: " + amount);
    }
}

class Checkout {
    private PaymentStrategy strategy;

    Checkout(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    void completePayment(double amount) {
        strategy.pay(amount);
    }
}

public class Main {
    public static void main(String[] args) {
        Checkout checkout =
            new Checkout(new UpiPayment());

        checkout.completePayment(500);
    }
}`,
  },
  {
    title: "13. Observer Pattern",
    content: (
      <>
        <p>
          Observer defines a one-to-many relationship between objects.
        </p>
        <p>
          When the subject changes state, it notifies its registered
          observers.
        </p>
        <p>
          Example: when a user completes a task, the dashboard, notification
          system, and progress tracker may need to react.
        </p>
      </>
    ),
    code: `import java.util.ArrayList;
import java.util.List;

interface Observer {
    void update(String message);
}

class Subscriber implements Observer {
    private String name;

    Subscriber(String name) {
        this.name = name;
    }

    public void update(String message) {
        System.out.println(name + ": " + message);
    }
}

class Publisher {
    private List<Observer> observers =
        new ArrayList<>();

    void subscribe(Observer observer) {
        observers.add(observer);
    }

    void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Publisher publisher = new Publisher();

        publisher.subscribe(new Subscriber("User A"));
        publisher.subscribe(new Subscriber("User B"));

        publisher.notifyObservers("Task completed");
    }
}`,
  },
  {
    title: "14. Template Method Pattern",
    content: (
      <>
        <p>
          Template Method defines the steps of an algorithm in a base class
          while allowing subclasses to implement selected steps.
        </p>
        <p>
          The overall algorithm stays consistent, but some details vary.
        </p>
        <p>
          It commonly uses inheritance and is different from Strategy, which
          usually uses composition.
        </p>
      </>
    ),
    code: `abstract class DataProcessor {
    final void process() {
        readData();
        transformData();
        saveData();
    }

    abstract void readData();
    abstract void transformData();

    void saveData() {
        System.out.println("Saving data");
    }
}

class CsvProcessor extends DataProcessor {
    void readData() {
        System.out.println("Reading CSV");
    }

    void transformData() {
        System.out.println("Transforming CSV");
    }
}

public class Main {
    public static void main(String[] args) {
        DataProcessor processor =
            new CsvProcessor();

        processor.process();
    }
}`,
  },
  {
    title: "15. Command Pattern",
    content: (
      <>
        <p>
          Command encapsulates a request as an object.
        </p>
        <p>
          It separates the object that asks for an action from the object
          that performs the action.
        </p>
        <p>
          Common uses include undo/redo, task queues, menu actions, and
          operation logging.
        </p>
      </>
    ),
    code: `interface Command {
    void execute();
}

class Light {
    void turnOn() {
        System.out.println("Light ON");
    }
}

class TurnOnCommand implements Command {
    private Light light;

    TurnOnCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.turnOn();
    }
}

class Button {
    private Command command;

    Button(Command command) {
        this.command = command;
    }

    void click() {
        command.execute();
    }
}

public class Main {
    public static void main(String[] args) {
        Light light = new Light();

        Command command =
            new TurnOnCommand(light);

        Button button = new Button(command);

        button.click();
    }
}`,
  },
  {
    title: "16. State Pattern",
    content: (
      <>
        <p>
          State allows an object to change its behavior when its internal
          state changes.
        </p>
        <p>
          Instead of large conditional statements checking the current state,
          each state class implements its own behavior.
        </p>
        <p>
          Example: a task may be Pending, InProgress, or Completed, and each
          state may allow different operations.
        </p>
      </>
    ),
    code: `interface TaskState {
    void handle();
}

class PendingState implements TaskState {
    public void handle() {
        System.out.println("Task is pending");
    }
}

class CompletedState implements TaskState {
    public void handle() {
        System.out.println("Task is completed");
    }
}

class Task {
    private TaskState state;

    Task(TaskState state) {
        this.state = state;
    }

    void setState(TaskState state) {
        this.state = state;
    }

    void handle() {
        state.handle();
    }
}

public class Main {
    public static void main(String[] args) {
        Task task = new Task(new PendingState());

        task.handle();

        task.setState(new CompletedState());

        task.handle();
    }
}`,
  },
  {
    title: "17. Iterator Pattern",
    content: (
      <>
        <p>
          Iterator provides a way to traverse a collection without exposing
          its internal representation.
        </p>
        <p>
          Java's collection framework already uses the Iterator pattern.
        </p>
        <p>
          The <code>Iterator</code> interface provides methods such as
          <code> hasNext()</code> and <code>next()</code>.
        </p>
      </>
    ),
    code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names =
            new ArrayList<>();

        names.add("Asha");
        names.add("Ravi");
        names.add("Kumar");

        Iterator<String> iterator =
            names.iterator();

        while (iterator.hasNext()) {
            String name = iterator.next();

            System.out.println(name);
        }
    }
}`,
  },
  {
    title: "18. Model-View-Controller (MVC)",
    content: (
      <>
        <p>
          MVC separates an application into three responsibilities.
        </p>
        <ul>
          <li>
            <strong>Model:</strong> Data and business rules.
          </li>
          <li>
            <strong>View:</strong> What the user sees.
          </li>
          <li>
            <strong>Controller:</strong> Handles input and coordinates
            application behavior.
          </li>
        </ul>
        <p>
          MVC is an architectural pattern, not one of the 23 classic GoF
          patterns.
        </p>
      </>
    ),
    code: `// Model
class Student {
    private String name;

    Student(String name) {
        this.name = name;
    }

    String getName() {
        return name;
    }
}

// View
class StudentView {
    void display(String name) {
        System.out.println("Student: " + name);
    }
}

// Controller
class StudentController {
    private Student model;
    private StudentView view;

    StudentController(
        Student model,
        StudentView view
    ) {
        this.model = model;
        this.view = view;
    }

    void updateView() {
        view.display(model.getName());
    }
}`,
  },
  {
    title: "19. Design Patterns and SOLID Principles",
    content: (
      <>
        <p>
          SOLID principles are guidelines for designing maintainable
          object-oriented software. Design patterns often help apply these
          principles.
        </p>
        <ul>
          <li>
            <strong>S — Single Responsibility:</strong> One reason to change.
          </li>
          <li>
            <strong>O — Open/Closed:</strong> Extend behavior without
            repeatedly modifying stable code.
          </li>
          <li>
            <strong>L — Liskov Substitution:</strong> Subtypes should work
            wherever their base type is expected.
          </li>
          <li>
            <strong>I — Interface Segregation:</strong> Prefer small,
            focused interfaces.
          </li>
          <li>
            <strong>D — Dependency Inversion:</strong> Depend on abstractions,
            not concrete implementations.
          </li>
        </ul>
        <p>
          Strategy, Factory, and Dependency Injection can support these
          principles, but using a pattern does not automatically make code
          well-designed.
        </p>
      </>
    ),
    code: `// Depend on an abstraction

interface MessageService {
    void send(String message);
}

class EmailService implements MessageService {
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class AlertManager {
    private MessageService service;

    AlertManager(MessageService service) {
        this.service = service;
    }

    void alert(String message) {
        service.send(message);
    }
}

public class Main {
    public static void main(String[] args) {
        MessageService service =
            new EmailService();

        AlertManager manager =
            new AlertManager(service);

        manager.alert("Hello");
    }
}`,
  },
  {
    title: "20. Choosing the Right Pattern",
    content: (
      <>
        <p>Choose based on the actual design problem:</p>
        <ul>
          <li>
            Need flexible object creation? Factory Method or Builder.
          </li>
          <li>
            Need a family of matching objects? Abstract Factory.
          </li>
          <li>
            Need to copy a configured object? Prototype.
          </li>
          <li>
            Need incompatible interfaces to work together? Adapter.
          </li>
          <li>
            Need to add optional behavior? Decorator.
          </li>
          <li>
            Need a simple interface to a complex subsystem? Facade.
          </li>
          <li>
            Need controlled access or lazy loading? Proxy.
          </li>
          <li>
            Need interchangeable algorithms? Strategy.
          </li>
          <li>
            Need notifications to multiple subscribers? Observer.
          </li>
          <li>
            Need to represent an action as an object? Command.
          </li>
        </ul>
        <p>
          Do not use a pattern just because you know its name. A pattern
          should reduce complexity, not add unnecessary classes.
        </p>
      </>
    ),
    code: `// Before applying a pattern, ask:

// 1. What problem am I solving?
// 2. What changes frequently?
// 3. Which classes are tightly coupled?
// 4. Can a simpler design solve this?
// 5. Will the pattern make testing easier?
// 6. Does it introduce unnecessary complexity?`,
  },
  {
    title: "21. Interview Questions",
    content: (
      <>
        <ol>
          <li>What is a design pattern?</li>
          <li>What are the three categories of GoF patterns?</li>
          <li>Explain Singleton and its thread-safety concerns.</li>
          <li>Factory Method vs Abstract Factory?</li>
          <li>Builder vs Factory?</li>
          <li>Adapter vs Decorator?</li>
          <li>Facade vs Proxy?</li>
          <li>Strategy vs State?</li>
          <li>Observer vs Mediator?</li>
          <li>How does Command support undo/redo?</li>
          <li>How do design patterns relate to SOLID?</li>
          <li>Can using design patterns make code worse?</li>
        </ol>
      </>
    ),
    code: `// Practice task:
// Build a notification system that supports
// Email, SMS, and Push notifications.
//
// Requirements:
// 1. Use an interface.
// 2. Use a Factory to create notification objects.
// 3. Avoid exposing concrete classes to the client.
// 4. Add a new notification type without changing
//    the client code.
//
// Then explain why Factory Method is suitable.`,
  },
];

export default function DesignPatternsLesson({ onBack }) {
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
        Java Design Patterns
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn common object-oriented design solutions, their purpose, Java
        implementations, trade-offs, and interview differences.
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
          <li>Understand creational, structural, and behavioral patterns.</li>
          <li>Explain the purpose of each pattern covered.</li>
          <li>Recognize when a pattern is useful and when it is overkill.</li>
          <li>Practice implementing Factory, Strategy, Observer, and Builder.</li>
          <li>Connect patterns with SOLID principles.</li>
        </ul>
      </section>
    </div>
  );
}
