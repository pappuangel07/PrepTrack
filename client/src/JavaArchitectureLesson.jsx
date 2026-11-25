

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
    title: "1. What Is Software Architecture?",
    content: (
      <>
        <p>
          Software architecture describes the major structure of
          an application and how its components communicate.
        </p>
        <p>
          It includes decisions about layers, responsibilities,
          data flow, dependencies, deployment, and security.
        </p>
        <p>
          Good architecture makes software easier to understand,
          test, maintain, and extend.
        </p>
      </>
    ),
    code: `// Example application:
//
// User Interface
//       |
//       v
// Application Logic
//       |
//       v
// Data Access
//       |
//       v
// Database`,
  },
  {
    title: "2. Why Architecture Matters",
    content: (
      <>
        <p>
          Poor architecture often creates tightly coupled code,
          duplicated logic, difficult testing, and risky changes.
        </p>
        <p>
          Architecture helps define where responsibilities belong
          and how components depend on one another.
        </p>
        <p>
          Architecture is not about adding the maximum number
          of classes. It is about managing complexity.
        </p>
      </>
    ),
    code: `// Poor design:
// One class handles UI, SQL, validation,
// authentication, and business rules.
//
// Better design:
// Separate responsibilities into
// understandable components.`,
  },
  {
    title: "3. Separation of Concerns",
    content: (
      <>
        <p>
          Separation of concerns means dividing a system into
          parts that each handle a distinct responsibility.
        </p>
        <p>
          For example, database code should not be mixed directly
          into presentation code.
        </p>
      </>
    ),
    code: `// StudentController
// Handles HTTP requests
//
// StudentService
// Handles business rules
//
// StudentRepository
// Handles database operations`,
  },
  {
    title: "4. Layered Architecture",
    content: (
      <>
        <p>
          Layered architecture organizes an application into
          logical layers.
        </p>
        <ul>
          <li>Presentation layer: handles user interaction.</li>
          <li>Application layer: coordinates use cases.</li>
          <li>Domain layer: contains business rules.</li>
          <li>Data access layer: communicates with storage.</li>
        </ul>
        <p>
          Each layer should have a clear responsibility.
        </p>
      </>
    ),
    code: `// Typical layered flow:
//
// Controller
//     |
//     v
// Service
//     |
//     v
// Repository
//     |
//     v
// Database`,
  },
  {
    title: "5. Controller Layer",
    content: (
      <>
        <p>
          A controller receives requests and returns responses.
        </p>
        <p>
          It should handle request-level concerns such as
          extracting parameters, validating request structure,
          and selecting the appropriate service operation.
        </p>
        <p>
          Business rules should not be placed entirely inside
          controllers.
        </p>
      </>
    ),
    code: `public class StudentController {
    private final StudentService service;

    public StudentController(
            StudentService service) {
        this.service = service;
    }

    public Student getStudent(int id) {
        return service.findStudent(id);
    }
}`,
  },
  {
    title: "6. Service Layer",
    content: (
      <>
        <p>
          The service layer contains application operations
          and business logic.
        </p>
        <p>
          A service may coordinate multiple repositories,
          validate business rules, and manage transactions.
        </p>
        <p>
          Services should not depend unnecessarily on HTTP
          request or response objects.
        </p>
      </>
    ),
    code: `public class StudentService {
    private final StudentRepository repository;

    public StudentService(
            StudentRepository repository) {
        this.repository = repository;
    }

    public Student findStudent(int id) {
        if (id <= 0) {
            throw new IllegalArgumentException(
                "Invalid student ID"
            );
        }

        return repository.findById(id);
    }
}`,
  },
  {
    title: "7. Repository Layer",
    content: (
      <>
        <p>
          A repository provides an abstraction for accessing
          and storing data.
        </p>
        <p>
          It hides database-specific operations from the
          business logic.
        </p>
        <p>
          This makes it easier to test services and change
          the persistence implementation.
        </p>
      </>
    ),
    code: `public interface StudentRepository {
    Student findById(int id);

    void save(Student student);

    void deleteById(int id);
}`,
  },
  {
    title: "8. Dependency Injection",
    content: (
      <>
        <p>
          Dependency Injection (DI) means providing an object
          with the dependencies it needs instead of making it
          create them itself.
        </p>
        <p>
          Constructor injection makes dependencies explicit
          and helps create testable classes.
        </p>
      </>
    ),
    code: `public class StudentService {
    private final StudentRepository repository;

    public StudentService(
            StudentRepository repository) {
        this.repository = repository;
    }
}

// The caller supplies the repository.
// StudentService does not create it internally.`,
  },
  {
    title: "9. Dependency Inversion Principle",
    content: (
      <>
        <p>
          High-level business logic should not depend directly
          on low-level implementation details.
        </p>
        <p>
          Both should depend on abstractions.
        </p>
        <p>
          This allows a service to use a database repository,
          a mock repository, or another implementation without
          changing the service itself.
        </p>
      </>
    ),
    code: `// Service depends on abstraction
StudentRepository repository;

// Implementations
// SqlStudentRepository
// InMemoryStudentRepository
// MockStudentRepository`,
  },
  {
    title: "10. Interface-Based Design",
    content: (
      <>
        <p>
          Interfaces define contracts that implementations
          must follow.
        </p>
        <p>
          They help separate what a component does from
          how it does it.
        </p>
        <p>
          Do not create an interface for every class
          automatically. Use abstractions where they provide
          meaningful flexibility or testability.
        </p>
      </>
    ),
    code: `public interface NotificationService {
    void send(String message);
}

public class EmailNotificationService
        implements NotificationService {

    public void send(String message) {
        System.out.println(
            "Email: " + message
        );
    }
}`,
  },
  {
    title: "11. DTO — Data Transfer Object",
    content: (
      <>
        <p>
          A DTO carries data between application boundaries,
          such as between a backend and a frontend.
        </p>
        <p>
          DTOs help control which fields are exposed.
          Do not return database entities blindly from APIs.
        </p>
      </>
    ),
    code: `public class StudentResponse {
    private final int id;
    private final String name;

    public StudentResponse(
            int id,
            String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}`,
  },
  {
    title: "12. Entity vs DTO",
    content: (
      <>
        <p>
          An entity represents data managed by the persistence
          layer.
        </p>
        <p>
          A DTO represents data exchanged across an application
          boundary.
        </p>
        <p>
          They may contain similar fields, but their purposes
          are different.
        </p>
      </>
    ),
    code: `// Entity
class StudentEntity {
    int id;
    String name;
    String passwordHash;
}

// API response DTO
class StudentResponse {
    int id;
    String name;
}

// Never expose passwordHash in the response.`,
  },
  {
    title: "13. Domain Model",
    content: (
      <>
        <p>
          A domain model represents the important concepts
          and rules of the problem being solved.
        </p>
        <p>
          A good domain model protects its own invariants
          rather than allowing arbitrary invalid state.
        </p>
      </>
    ),
    code: `public class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be positive"
            );
        }

        balance += amount;
    }
}`,
  },
  {
    title: "14. SOLID Principles",
    content: (
      <>
        <p>
          SOLID is a group of five object-oriented design
          principles.
        </p>
        <ul>
          <li>S: Single Responsibility Principle</li>
          <li>O: Open/Closed Principle</li>
          <li>L: Liskov Substitution Principle</li>
          <li>I: Interface Segregation Principle</li>
          <li>D: Dependency Inversion Principle</li>
        </ul>
        <p>
          These principles aim to reduce coupling and make
          changes safer.
        </p>
      </>
    ),
    code: `// S -> one clear responsibility
// O -> extend behavior without unnecessary modification
// L -> subtypes remain substitutable
// I -> small focused interfaces
// D -> depend on abstractions`,
  },
  {
    title: "15. Single Responsibility Principle",
    content: (
      <>
        <p>
          A class should have one main responsibility
          or one cohesive reason to change.
        </p>
        <p>
          A class that handles student data, sends emails,
          generates reports, and manages database connections
          has too many responsibilities.
        </p>
      </>
    ),
    code: `// Better separation:
//
// StudentService
// EmailService
// ReportService
// StudentRepository`,
  },
  {
    title: "16. Open/Closed Principle",
    content: (
      <>
        <p>
          Software entities should be open for extension
          but closed for unnecessary modification.
        </p>
        <p>
          New behavior can often be added through interfaces
          and new implementations rather than repeatedly
          editing a large conditional statement.
        </p>
      </>
    ),
    code: `interface Discount {
    double apply(double price);
}

class StudentDiscount implements Discount {
    public double apply(double price) {
        return price * 0.90;
    }
}

class RegularDiscount implements Discount {
    public double apply(double price) {
        return price;
    }
}`,
  },
  {
    title: "17. Liskov Substitution Principle",
    content: (
      <>
        <p>
          A subtype should be usable wherever its base type
          is expected without breaking correctness.
        </p>
        <p>
          A subclass should not unexpectedly strengthen
          requirements or violate behavior promised by
          its parent type.
        </p>
      </>
    ),
    code: `// If code expects a PaymentMethod,
// every implementation should honor
// the PaymentMethod contract.
//
// A subtype should not surprise callers
// with incompatible behavior.`,
  },
  {
    title: "18. Interface Segregation Principle",
    content: (
      <>
        <p>
          Clients should not be forced to depend on methods
          they do not use.
        </p>
        <p>
          Prefer smaller, focused interfaces over one
          large interface containing unrelated operations.
        </p>
      </>
    ),
    code: `interface Printable {
    void print();
}

interface Scannable {
    void scan();
}

// A simple printer implements Printable.
// A printer-scanner implements both.`,
  },
  {
    title: "19. Factory Pattern",
    content: (
      <>
        <p>
          The Factory pattern centralizes object creation.
        </p>
        <p>
          It is useful when the caller should request an
          object without knowing the exact implementation
          construction details.
        </p>
      </>
    ),
    code: `interface Shape {
    void draw();
}

class Circle implements Shape {
    public void draw() {
        System.out.println("Circle");
    }
}

class ShapeFactory {
    static Shape create(String type) {
        if ("circle".equalsIgnoreCase(type)) {
            return new Circle();
        }

        throw new IllegalArgumentException(
            "Unknown shape"
        );
    }
}`,
  },
  {
    title: "20. Strategy Pattern",
    content: (
      <>
        <p>
          Strategy defines a family of interchangeable
          algorithms behind a common interface.
        </p>
        <p>
          It helps replace large conditional blocks with
          separate behavior implementations.
        </p>
      </>
    ),
    code: `interface PaymentStrategy {
    void pay(double amount);
}

class UpiPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("UPI: " + amount);
    }
}

class CardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Card: " + amount);
    }
}`,
  },
  {
    title: "21. Singleton Pattern",
    content: (
      <>
        <p>
          Singleton aims to provide one shared instance
          of a class.
        </p>
        <p>
          It can be useful for certain shared services,
          but global mutable state makes testing and
          concurrency harder.
        </p>
        <p>
          Prefer dependency injection when it provides
          a cleaner lifecycle and easier testing.
        </p>
      </>
    ),
    code: `public enum AppConfig {
    INSTANCE;

    public String getAppName() {
        return "PrepTrack";
    }
}

// Enum singleton is a robust Java option
// for a simple singleton instance.`,
  },
  {
    title: "22. Monolithic Architecture",
    content: (
      <>
        <p>
          A monolith is an application deployed as one
          unit, even if its internal code is divided
          into modules or layers.
        </p>
        <p>
          Monoliths are often simpler to develop,
          test, deploy, and debug for small teams.
        </p>
        <p>
          A monolith is not automatically poorly designed.
        </p>
      </>
    ),
    code: `// One deployable application
//
// Modules:
// - Authentication
// - Student management
// - Tasks
// - Reports
//
// All deployed together`,
  },
  {
    title: "23. Microservices Architecture",
    content: (
      <>
        <p>
          Microservices split an application into
          independently deployable services.
        </p>
        <p>
          Each service typically owns a focused business
          capability and communicates through APIs or
          messaging.
        </p>
        <p>
          Microservices introduce operational complexity:
          network failures, monitoring, deployment,
          data consistency, and service coordination.
        </p>
      </>
    ),
    code: `// Example services
//
// Auth Service
// Student Service
// Task Service
// Notification Service
//
// Each service may be deployed separately.`,
  },
  {
    title: "24. Monolith vs Microservices",
    content: (
      <>
        <p>
          Choose architecture based on actual requirements,
          team size, deployment needs, and system complexity.
        </p>
        <p>
          Splitting a small application into many services
          usually adds overhead without solving a real problem.
        </p>
      </>
    ),
    code: `// Monolith
// - Simpler deployment
// - Easier local debugging
// - Lower operational overhead
//
// Microservices
// - Independent deployment
// - Separate scaling possibilities
// - More network and operational complexity`,
  },
  {
    title: "25. Clean Architecture",
    content: (
      <>
        <p>
          Clean Architecture organizes code so that core
          business rules do not depend on external
          frameworks or infrastructure.
        </p>
        <p>
          Dependencies point inward toward the domain
          and application rules.
        </p>
        <p>
          Database and framework details are treated
          as outer implementation layers.
        </p>
      </>
    ),
    code: `// Outer layers
// Web framework
// Database
// External services
//
// Inner layers
// Application use cases
// Domain entities
//
// Inner code should not depend
// on outer implementation details.`,
  },
  {
    title: "26. Hexagonal Architecture",
    content: (
      <>
        <p>
          Hexagonal Architecture is also called Ports
          and Adapters.
        </p>
        <p>
          The application defines ports describing
          required capabilities. Adapters connect those
          ports to databases, APIs, or user interfaces.
        </p>
      </>
    ),
    code: `// Port
interface StudentStore {
    Student findById(int id);
}

// Adapter
class SqlStudentStore
        implements StudentStore {
    public Student findById(int id) {
        // SQL implementation
        return null;
    }
}`,
  },
  {
    title: "27. Testing Architecture",
    content: (
      <>
        <p>
          Well-separated components are easier to test
          independently.
        </p>
        <ul>
          <li>Unit tests: test a small component.</li>
          <li>Integration tests: test components together.</li>
          <li>End-to-end tests: test a complete workflow.</li>
        </ul>
        <p>
          Dependency injection allows a service to use
          a fake repository during unit testing.
        </p>
      </>
    ),
    code: `// Unit test idea:
//
// StudentService
//      |
//      v
// FakeStudentRepository
//
// No real database is needed
// to test service business rules.`,
  },
  {
    title: "28. Architecture Decision Records",
    content: (
      <>
        <p>
          An Architecture Decision Record (ADR) documents
          an important design decision.
        </p>
        <p>
          It typically records the context, decision,
          alternatives, and consequences.
        </p>
        <p>
          ADRs help future developers understand why
          a design was chosen.
        </p>
      </>
    ),
    code: `// ADR example
//
// Decision:
// Use SQLite for local development.
//
// Context:
// Small student project.
//
// Consequences:
// Simple setup and local storage.
// Future migration may be required
// for multi-user production deployment.`,
  },
  {
    title: "29. Common Architecture Mistakes",
    content: (
      <>
        <ul>
          <li>Putting all logic in one giant class.</li>
          <li>Creating unnecessary interfaces everywhere.</li>
          <li>Using microservices without a real need.</li>
          <li>Mixing database code into controllers.</li>
          <li>Returning database entities directly.</li>
          <li>Using global mutable state excessively.</li>
          <li>Making every layer depend on every other layer.</li>
          <li>Overengineering a small application.</li>
        </ul>
      </>
    ),
    code: `// Architecture should solve real problems.
//
// Start simple.
// Separate clear responsibilities.
// Add abstractions when useful.
// Refactor when requirements evolve.`,
  },
  {
    title: "30. Interview Questions",
    content: (
      <>
        <ol>
          <li>What is software architecture?</li>
          <li>What is layered architecture?</li>
          <li>Explain separation of concerns.</li>
          <li>What is dependency injection?</li>
          <li>What is dependency inversion?</li>
          <li>What is the purpose of a DTO?</li>
          <li>Explain the SOLID principles.</li>
          <li>What is the Factory pattern?</li>
          <li>What is the Strategy pattern?</li>
          <li>Monolith vs microservices?</li>
          <li>What is Clean Architecture?</li>
          <li>What are ports and adapters?</li>
        </ol>
      </>
    ),
    code: `// Strong interview answer:
//
// Explain the design.
// Identify responsibilities.
// Show dependency direction.
// Explain trade-offs.
// Give a practical project example.`,
  },
  {
    title: "31. Practice Tasks",
    content: (
      <>
        <ol>
          <li>Design a layered student management application.</li>
          <li>Create controller, service, and repository classes.</li>
          <li>Use constructor dependency injection.</li>
          <li>Create a DTO for API responses.</li>
          <li>Implement Strategy for payment methods.</li>
          <li>Implement a simple Factory.</li>
          <li>Compare monolith and microservices for PrepTrack.</li>
          <li>Write an ADR explaining one architecture decision.</li>
        </ol>
      </>
    ),
    code: `// Mini project:
//
// Student Management System
//
// Layers:
// - Controller
// - Service
// - Repository
// - Domain model
// - DTO
//
// Add unit tests using a fake repository.`,
  },
];

export default function JavaArchitectureLesson({ onBack }) {
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
        Advanced Java Architecture
      </h1>

      <p
        style={{
          color: "var(--muted, #6b7280)",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        Learn how to structure maintainable Java applications
        using layers, dependency injection, SOLID principles,
        design patterns, and architectural styles.
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
          <li>Understand layered architecture.</li>
          <li>Know controller, service, and repository roles.</li>
          <li>Understand dependency injection and inversion.</li>
          <li>Know DTOs and domain models.</li>
          <li>Understand SOLID principles.</li>
          <li>Know Factory, Strategy, and Singleton patterns.</li>
          <li>Compare monolith and microservices.</li>
          <li>Understand Clean and Hexagonal Architecture.</li>
          <li>Know how architecture improves testing.</li>
        </ul>
      </section>
    </div>
  );
}
