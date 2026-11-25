

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
    title: "1. What Is Unit Testing?",
    content: (
      <>
        <p>
          Unit testing means testing a small, isolated part of a program,
          usually a method or class, to check whether it behaves correctly.
        </p>
        <p>
          A unit test checks expected behavior using known inputs and expected
          outputs.
        </p>
        <ul>
          <li>Find bugs early.</li>
          <li>Prevent old bugs from returning.</li>
          <li>Make refactoring safer.</li>
          <li>Document how a method should behave.</li>
        </ul>
        <p>
          JUnit is a popular Java testing framework. JUnit 5 is commonly used
          in modern Java projects.
        </p>
      </>
    ),
    code: `// Production code
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

// Test code checks whether add() behaves correctly.`,
  },
  {
    title: "2. JUnit 5 Setup",
    content: (
      <>
        <p>
          JUnit 5 is made up of the JUnit Platform, JUnit Jupiter, and other
          components. Jupiter provides the programming model and annotations
          commonly used to write JUnit 5 tests.
        </p>
        <p>
          In Maven, add the JUnit Jupiter dependency and configure a compatible
          test runner. Modern Maven Surefire versions support JUnit 5.
        </p>
        <p>
          In a typical Maven project, production code is placed in
          <code> src/main/java</code> and test code in
          <code> src/test/java</code>.
        </p>
      </>
    ),
    code: `<dependencies>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.11.4</version>
        <scope>test</scope>
    </dependency>
</dependencies>`,
  },
  {
    title: "3. Your First JUnit Test",
    content: (
      <>
        <p>
          A test method is usually annotated with <code>@Test</code>.
        </p>
        <p>
          Use static imports for assertion methods so test code remains
          readable.
        </p>
        <p>
          Test method names should describe the behavior being checked.
        </p>
      </>
    ),
    code: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    @Test
    void addTwoNumbers() {
        Calculator calculator = new Calculator();

        int result = calculator.add(3, 4);

        assertEquals(7, result);
    }
}`,
  },
  {
    title: "4. Arrange, Act, Assert (AAA)",
    content: (
      <>
        <p>
          A common structure for unit tests is Arrange, Act, Assert.
        </p>
        <ul>
          <li>
            <strong>Arrange:</strong> Prepare objects and input data.
          </li>
          <li>
            <strong>Act:</strong> Call the method being tested.
          </li>
          <li>
            <strong>Assert:</strong> Check the result.
          </li>
        </ul>
        <p>
          This structure makes tests easier to read and debug.
        </p>
      </>
    ),
    code: `@Test
void calculateTotalPrice() {
    // Arrange
    Calculator calculator = new Calculator();
    int price = 100;
    int quantity = 3;

    // Act
    int total = calculator.add(
        price,
        quantity
    );

    // Assert
    assertEquals(103, total);
}`,
  },
  {
    title: "5. Important Assertions",
    content: (
      <>
        <p>Assertions compare actual behavior with expected behavior.</p>
        <ul>
          <li><code>assertEquals(expected, actual)</code></li>
          <li><code>assertNotEquals(expected, actual)</code></li>
          <li><code>assertTrue(condition)</code></li>
          <li><code>assertFalse(condition)</code></li>
          <li><code>assertNull(value)</code></li>
          <li><code>assertNotNull(value)</code></li>
          <li><code>assertSame(expected, actual)</code></li>
          <li><code>assertNotSame(expected, actual)</code></li>
        </ul>
        <p>
          <code>assertEquals</code> checks equality. <code>assertSame</code>{" "}
          checks whether both references point to the same object.
        </p>
      </>
    ),
    code: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AssertionTest {

    @Test
    void checkAssertions() {
        assertEquals(10, 10);
        assertNotEquals(10, 20);

        assertTrue(5 > 2);
        assertFalse(5 < 2);

        String value = "Java";

        assertNotNull(value);
        assertSame(value, value);
    }
}`,
  },
  {
    title: "6. Testing Boolean Conditions",
    content: (
      <>
        <p>
          Use <code>assertTrue</code> and <code>assertFalse</code> when a
          method returns a boolean.
        </p>
        <p>
          Avoid writing tests that merely repeat the implementation. Test the
          expected behavior and important edge cases.
        </p>
      </>
    ),
    code: `class User {
    boolean isAdult(int age) {
        return age >= 18;
    }
}

class UserTest {
    @Test
    void adultAgeReturnsTrue() {
        User user = new User();

        assertTrue(user.isAdult(18));
    }

    @Test
    void belowAdultAgeReturnsFalse() {
        User user = new User();

        assertFalse(user.isAdult(17));
    }
}`,
  },
  {
    title: "7. Testing Exceptions",
    content: (
      <>
        <p>
          Use <code>assertThrows()</code> when a method is expected to throw
          an exception.
        </p>
        <p>
          It returns the exception object, so you can also verify its message
          or other details.
        </p>
      </>
    ),
    code: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class DivisionTest {

    int divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException(
                "Divisor cannot be zero"
            );
        }

        return a / b;
    }

    @Test
    void divisionByZeroThrowsException() {
        DivisionTest calculator =
            new DivisionTest();

        IllegalArgumentException exception =
            assertThrows(
                IllegalArgumentException.class,
                () -> calculator.divide(10, 0)
            );

        assertEquals(
            "Divisor cannot be zero",
            exception.getMessage()
        );
    }
}`,
  },
  {
    title: "8. JUnit Lifecycle Annotations",
    content: (
      <>
        <p>Lifecycle annotations run at specific points during testing.</p>
        <ul>
          <li>
            <code>@BeforeEach</code> — before every test method.
          </li>
          <li>
            <code>@AfterEach</code> — after every test method.
          </li>
          <li>
            <code>@BeforeAll</code> — once before all tests in the class.
          </li>
          <li>
            <code>@AfterAll</code> — once after all tests in the class.
          </li>
        </ul>
        <p>
          In JUnit Jupiter, <code>@BeforeAll</code> and <code>@AfterAll</code>{" "}
          methods are usually static unless the test class uses
          <code> @TestInstance</code> with a per-class lifecycle.
        </p>
      </>
    ),
    code: `import org.junit.jupiter.api.*;

class LifecycleTest {

    @BeforeAll
    static void beforeAll() {
        System.out.println("Runs once before all tests");
    }

    @BeforeEach
    void beforeEach() {
        System.out.println("Runs before each test");
    }

    @Test
    void testOne() {
        System.out.println("Test one");
    }

    @Test
    void testTwo() {
        System.out.println("Test two");
    }

    @AfterEach
    void afterEach() {
        System.out.println("Runs after each test");
    }

    @AfterAll
    static void afterAll() {
        System.out.println("Runs once after all tests");
    }
}`,
  },
  {
    title: "9. Test Display Names",
    content: (
      <>
        <p>
          <code>@DisplayName</code> gives a test a readable name in the test
          report.
        </p>
        <p>
          It is useful when method names alone do not clearly explain the
          behavior being tested.
        </p>
      </>
    ),
    code: `import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

class DisplayNameTest {

    @Test
    @DisplayName("Adding two positive numbers")
    void addPositiveNumbers() {
        Calculator calculator = new Calculator();

        assertEquals(
            5,
            calculator.add(2, 3)
        );
    }
}`,
  },
  {
    title: "10. Parameterized Tests",
    content: (
      <>
        <p>
          A parameterized test runs the same test logic with multiple input
          values.
        </p>
        <p>
          It reduces repeated test code and helps cover more cases.
        </p>
        <p>
          JUnit Jupiter parameterized tests require the
          <code> junit-jupiter-params</code> module, which is included when
          using the aggregate <code>junit-jupiter</code> dependency.
        </p>
      </>
    ),
    code: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

class EvenNumberTest {

    boolean isEven(int number) {
        return number % 2 == 0;
    }

    @ParameterizedTest
    @ValueSource(ints = {2, 4, 6, 8, 10})
    void evenNumbersReturnTrue(int number) {
        assertTrue(isEven(number));
    }
}`,
  },
  {
    title: "11. CsvSource",
    content: (
      <>
        <p>
          <code>@CsvSource</code> supplies multiple arguments to a
          parameterized test.
        </p>
        <p>
          It is useful when each test case contains input and expected output.
        </p>
      </>
    ),
    code: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorParameterizedTest {

    int add(int a, int b) {
        return a + b;
    }

    @ParameterizedTest
    @CsvSource({
        "1, 2, 3",
        "5, 5, 10",
        "-2, 2, 0"
    })
    void addReturnsExpectedResult(
        int a,
        int b,
        int expected
    ) {
        assertEquals(expected, add(a, b));
    }
}`,
  },
  {
    title: "12. Testing Collections",
    content: (
      <>
        <p>
          When testing collections, check the contents and important
          properties:
        </p>
        <ul>
          <li>Expected size.</li>
          <li>Expected elements.</li>
          <li>Order, if order matters.</li>
          <li>Behavior when empty.</li>
          <li>Behavior with duplicates.</li>
        </ul>
        <p>
          Use <code>assertIterableEquals()</code> to compare iterable contents
          in order.
        </p>
      </>
    ),
    code: `import java.util.List;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ListTest {

    @Test
    void listContainsExpectedItems() {
        List<String> actual =
            List.of("Java", "SQL", "DSA");

        List<String> expected =
            List.of("Java", "SQL", "DSA");

        assertIterableEquals(expected, actual);
        assertEquals(3, actual.size());
    }
}`,
  },
  {
    title: "13. Testing with Mocks",
    content: (
      <>
        <p>
          A mock is a test double that lets you control and verify interactions
          with a dependency.
        </p>
        <p>
          Mockito is a popular Java mocking framework. It can help isolate a
          unit from external services, repositories, or APIs.
        </p>
        <p>
          Do not mock everything. Mock dependencies at boundaries; test simple
          value objects and business logic directly.
        </p>
      </>
    ),
    code: `import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.*;

interface EmailService {
    void send(String email);
}

class RegistrationService {
    private EmailService emailService;

    RegistrationService(EmailService emailService) {
        this.emailService = emailService;
    }

    void register(String email) {
        emailService.send(email);
    }
}

class RegistrationTest {

    @Test
    void registrationSendsEmail() {
        EmailService emailService =
            mock(EmailService.class);

        RegistrationService service =
            new RegistrationService(emailService);

        service.register("student@example.com");

        verify(emailService)
            .send("student@example.com");
    }
}`,
  },
  {
    title: "14. Mocking with when and thenReturn",
    content: (
      <>
        <p>
          Mockito can configure a mock to return a value when a method is
          called with specific arguments.
        </p>
        <p>
          This is called stubbing. It lets the test control the dependency's
          response.
        </p>
      </>
    ),
    code: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

interface UserRepository {
    String findNameById(int id);
}

class UserService {
    private UserRepository repository;

    UserService(UserRepository repository) {
        this.repository = repository;
    }

    String getName(int id) {
        return repository.findNameById(id);
    }
}

class UserServiceTest {

    @Test
    void returnsNameFromRepository() {
        UserRepository repository =
            mock(UserRepository.class);

        when(repository.findNameById(1))
            .thenReturn("Angel");

        UserService service =
            new UserService(repository);

        assertEquals("Angel", service.getName(1));
    }
}`,
  },
  {
    title: "15. Test Coverage",
    content: (
      <>
        <p>
          Test coverage measures how much of the code is executed by tests.
        </p>
        <ul>
          <li>
            <strong>Line coverage:</strong> Which lines were executed?
          </li>
          <li>
            <strong>Branch coverage:</strong> Which decision branches were
            executed?
          </li>
          <li>
            <strong>Method coverage:</strong> Which methods were called?
          </li>
        </ul>
        <p>
          High coverage does not guarantee good tests. A test can execute a
          line without checking whether its result is correct.
        </p>
        <p>
          Aim for meaningful tests of normal cases, edge cases, and failure
          behavior rather than chasing a coverage percentage alone.
        </p>
      </>
    ),
    code: `// Example method with two branches

boolean isEligible(int age) {
    if (age >= 18) {
        return true;
    }

    return false;
}

// Test both:
// age = 20 -> true
// age = 15 -> false

// Testing only age = 20 gives line execution,
// but does not fully cover both decision branches.`,
  },
  {
    title: "16. Edge Cases and Test Design",
    content: (
      <>
        <p>Strong tests cover more than the happy path.</p>
        <ul>
          <li>Minimum and maximum valid values.</li>
          <li>Zero and negative values.</li>
          <li>Empty strings and empty collections.</li>
          <li>Null values, when permitted by the API.</li>
          <li>Invalid input.</li>
          <li>Boundary conditions.</li>
        </ul>
        <p>
          For example, if a method accepts ages from 0 to 120, test 0, 120,
          values just outside the range, and representative values inside it.
        </p>
      </>
    ),
    code: `@Test
void ageBoundaryCases() {
    User user = new User();

    assertFalse(user.isAdult(17));
    assertTrue(user.isAdult(18));
    assertTrue(user.isAdult(19));
}`,
  },
  {
    title: "17. Unit, Integration, and End-to-End Tests",
    content: (
      <>
        <p>These tests differ by scope.</p>
        <ul>
          <li>
            <strong>Unit test:</strong> Tests one small unit in isolation.
          </li>
          <li>
            <strong>Integration test:</strong> Tests how multiple components
            work together.
          </li>
          <li>
            <strong>End-to-end test:</strong> Tests a complete user workflow
            through the system.
          </li>
        </ul>
        <p>
          Unit tests are usually fast and numerous. End-to-end tests are often
          slower and validate broader behavior.
        </p>
      </>
    ),
    code: `// Unit test
// Test Calculator.add() directly.

// Integration test
// Test UserService with a real repository
// and a test database.

// End-to-end test
// Register user -> login -> open dashboard.`,
  },
  {
    title: "18. Common Testing Mistakes",
    content: (
      <>
        <ul>
          <li>Testing implementation details instead of behavior.</li>
          <li>Writing tests that depend on execution order.</li>
          <li>Using real network services in unit tests.</li>
          <li>Mocking every object unnecessarily.</li>
          <li>Ignoring edge cases and exceptions.</li>
          <li>Writing assertions that are too weak.</li>
          <li>Sharing mutable state between tests.</li>
          <li>Assuming high coverage means bug-free code.</li>
        </ul>
        <p>
          A good test should fail when the behavior is wrong and pass when
          the behavior is correct.
        </p>
      </>
    ),
    code: `// Weak test
@Test
void weakTest() {
    Calculator calculator = new Calculator();

    calculator.add(2, 3);

    assertTrue(true);
}

// Better test
@Test
void addReturnsCorrectSum() {
    Calculator calculator = new Calculator();

    assertEquals(5, calculator.add(2, 3));
}`,
  },
  {
    title: "19. Interview Questions",
    content: (
      <>
        <ol>
          <li>What is unit testing?</li>
          <li>What is JUnit?</li>
          <li>What is the difference between JUnit 4 and JUnit 5?</li>
          <li>What does @Test do?</li>
          <li>Explain Arrange, Act, Assert.</li>
          <li>What is the difference between assertEquals and assertSame?</li>
          <li>How do you test exceptions?</li>
          <li>What are @BeforeEach and @BeforeAll?</li>
          <li>What is a parameterized test?</li>
          <li>What is mocking and stubbing?</li>
          <li>What is the difference between unit and integration tests?</li>
          <li>Does 100% code coverage guarantee correctness?</li>
        </ol>
      </>
    ),
    code: `// Practice task:
// Write tests for a BankAccount class.
//
// Methods:
// deposit(amount)
// withdraw(amount)
// getBalance()
//
// Test:
// 1. Valid deposit
// 2. Invalid deposit
// 3. Valid withdrawal
// 4. Withdrawal exceeding balance
// 5. Zero amount
// 6. Negative amount
// 7. Balance after multiple transactions`,
  },
];

export default function JUnitLesson({ onBack }) {
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
        Java Unit Testing with JUnit 5
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn how to write reliable Java tests, use assertions, test exceptions,
        run parameterized tests, and isolate dependencies with Mockito.
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
          <li>Understand unit testing and the AAA structure.</li>
          <li>Use common JUnit assertions correctly.</li>
          <li>Test exceptions and boundary conditions.</li>
          <li>Know lifecycle and parameterized test annotations.</li>
          <li>Understand mocks, stubs, and Mockito verification.</li>
          <li>Distinguish unit, integration, and end-to-end tests.</li>
        </ul>
      </section>
    </div>
  );
}
