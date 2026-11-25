
import React from "react";

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
    title: "1. What is JDBC?",
    content: (
      <>
        <p>
          JDBC stands for Java Database Connectivity. It is a Java API
          used to connect Java applications to relational databases.
        </p>
        <p>JDBC allows Java programs to:</p>
        <ul>
          <li>Connect to a database.</li>
          <li>Execute SQL queries.</li>
          <li>Insert, update, and delete records.</li>
          <li>Read data returned by SQL queries.</li>
          <li>Manage database transactions.</li>
        </ul>
      </>
    ),
    code: `// Java application
//       |
//       v
// JDBC API
//       |
//       v
// JDBC Driver
//       |
//       v
// Database (MySQL, PostgreSQL, etc.)`,
  },
  {
    title: "2. JDBC architecture",
    content: (
      <>
        <p>
          JDBC provides a common interface for Java applications.
          A database-specific JDBC driver communicates with the
          selected database.
        </p>
        <p>
          Your Java code can use JDBC interfaces such as Connection,
          PreparedStatement, and ResultSet.
        </p>
        <p>
          The driver handles database-specific communication.
        </p>
      </>
    ),
    code: `Connection connection;
PreparedStatement statement;
ResultSet resultSet;

// These are JDBC interfaces.
// A database driver provides
// their implementation.`,
  },
  {
    title: "3. JDBC packages and classes",
    content: (
      <>
        <p>Important JDBC types:</p>
        <ul>
          <li>DriverManager: obtains database connections.</li>
          <li>Connection: represents a database connection.</li>
          <li>Statement: executes basic SQL statements.</li>
          <li>PreparedStatement: executes parameterized SQL.</li>
          <li>ResultSet: contains query results.</li>
          <li>SQLException: represents database access errors.</li>
        </ul>
      </>
    ),
    code: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;`,
  },
  {
    title: "4. JDBC driver dependency",
    content: (
      <>
        <p>
          A JDBC API alone is not enough. Your application also needs
          the JDBC driver for the database you use.
        </p>
        <p>
          For example, MySQL uses the MySQL Connector/J driver.
          The driver must be available on the application's classpath.
        </p>
        <p>
          In Maven, add the database driver's dependency to pom.xml.
          Use a current compatible version from the official vendor.
        </p>
      </>
    ),
    code: `<!-- MySQL Connector/J dependency -->

<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>YOUR_COMPATIBLE_VERSION</version>
</dependency>

// Replace YOUR_COMPATIBLE_VERSION
// with a real version from the
// official MySQL documentation.`,
  },
  {
    title: "5. Database connection",
    content: (
      <>
        <p>
          DriverManager.getConnection() creates a connection using
          the database URL, username, and password.
        </p>
        <p>
          A connection represents a session with the database.
          Close it when you finish using it.
        </p>
      </>
    ),
    code: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

String url =
    "jdbc:mysql://localhost:3306/studentdb";

String username = "your_username";
String password = "your_password";

try (Connection connection =
        DriverManager.getConnection(
            url, username, password
        )) {

    System.out.println("Connected");

} catch (SQLException e) {
    e.printStackTrace();
}`,
  },
  {
    title: "6. JDBC URL",
    content: (
      <>
        <p>
          A JDBC URL identifies the database and connection details.
        </p>
        <p>
          The exact format depends on the database and driver.
        </p>
        <ul>
          <li>MySQL: jdbc:mysql://host:port/database</li>
          <li>PostgreSQL: jdbc:postgresql://host:port/database</li>
          <li>SQLite: jdbc:sqlite:path/to/database.db</li>
        </ul>
      </>
    ),
    code: `// MySQL
String url =
    "jdbc:mysql://localhost:3306/studentdb";

// PostgreSQL
String postgresUrl =
    "jdbc:postgresql://localhost:5432/studentdb";

// SQLite
String sqliteUrl =
    "jdbc:sqlite:studentdb.db";`,
  },
  {
    title: "7. Creating a table",
    content: (
      <>
        <p>
          SQL can be executed from Java using JDBC statements.
          CREATE TABLE is a Data Definition Language (DDL) operation.
        </p>
        <p>
          In real projects, database schema changes are often managed
          using migration tools.
        </p>
      </>
    ),
    code: `String sql = """
    CREATE TABLE IF NOT EXISTS students (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        age INT
    )
    """;

try (
    Connection connection =
        DriverManager.getConnection(url, username, password);
    Statement statement = connection.createStatement()
) {
    statement.executeUpdate(sql);
}`,
  },
  {
    title: "8. Statement",
    content: (
      <>
        <p>
          Statement is used to execute SQL statements without
          parameter placeholders.
        </p>
        <p>
          It can execute fixed SQL, but building SQL by concatenating
          user input is unsafe.
        </p>
        <p>
          For user-provided values, prefer PreparedStatement.
        </p>
      </>
    ),
    code: `try (
    Connection connection =
        DriverManager.getConnection(url, username, password);
    Statement statement = connection.createStatement()
) {
    statement.executeUpdate(
        "CREATE TABLE IF NOT EXISTS demo (id INT)"
    );
}`,
  },
  {
    title: "9. PreparedStatement",
    content: (
      <>
        <p>
          PreparedStatement executes SQL containing parameter
          placeholders represented by question marks.
        </p>
        <p>
          Parameters are set separately from the SQL text.
          This helps prevent SQL injection for parameter values.
        </p>
        <p>
          Parameter positions start from 1, not 0.
        </p>
      </>
    ),
    code: `String sql =
    "SELECT * FROM students WHERE age = ?";

try (
    Connection connection =
        DriverManager.getConnection(url, username, password);
    PreparedStatement ps =
        connection.prepareStatement(sql)
) {
    ps.setInt(1, 19);

    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            System.out.println(rs.getString("name"));
        }
    }
}`,
  },
  {
    title: "10. executeQuery()",
    content: (
      <>
        <p>
          executeQuery() is used for SQL statements that return
          a ResultSet, commonly SELECT queries.
        </p>
        <p>
          The returned ResultSet is a cursor over the query results.
          Initially, the cursor is positioned before the first row.
        </p>
        <p>
          Call next() to move to the next row.
        </p>
      </>
    ),
    code: `String sql = "SELECT id, name FROM students";

try (
    Connection connection =
        DriverManager.getConnection(url, username, password);
    PreparedStatement ps =
        connection.prepareStatement(sql);
    ResultSet rs = ps.executeQuery()
) {
    while (rs.next()) {
        int id = rs.getInt("id");
        String name = rs.getString("name");

        System.out.println(id + " " + name);
    }
}`,
  },
  {
    title: "11. executeUpdate()",
    content: (
      <>
        <p>
          executeUpdate() is used for INSERT, UPDATE, DELETE,
          and many DDL statements.
        </p>
        <p>
          For INSERT, UPDATE, and DELETE, it returns the number
          of rows affected.
        </p>
      </>
    ),
    code: `String sql =
    "UPDATE students SET age = ? WHERE id = ?";

try (
    Connection connection =
        DriverManager.getConnection(url, username, password);
    PreparedStatement ps =
        connection.prepareStatement(sql)
) {
    ps.setInt(1, 20);
    ps.setInt(2, 1);

    int rows = ps.executeUpdate();

    System.out.println("Updated: " + rows);
}`,
  },
  {
    title: "12. execute()",
    content: (
      <>
        <p>
          execute() is a general method that can execute SQL
          when the result type may vary.
        </p>
        <p>
          It returns true if the first result is a ResultSet
          and false if it is an update count or no result.
        </p>
        <p>
          For ordinary SELECT queries, executeQuery() is clearer.
        </p>
      </>
    ),
    code: `boolean hasResult = statement.execute(sql);

if (hasResult) {
    ResultSet rs = statement.getResultSet();
} else {
    int count = statement.getUpdateCount();
}`,
  },
  {
    title: "13. Insert a record",
    content: (
      <>
        <p>
          INSERT adds a new row to a table.
        </p>
        <p>
          Use PreparedStatement to bind the values safely.
        </p>
      </>
    ),
    code: `String sql =
    "INSERT INTO students(name, age) VALUES (?, ?)";

try (
    Connection connection =
        DriverManager.getConnection(url, username, password);
    PreparedStatement ps =
        connection.prepareStatement(sql)
) {
    ps.setString(1, "Arun");
    ps.setInt(2, 19);

    int rows = ps.executeUpdate();
    System.out.println(rows);
}`,
  },
  {
    title: "14. Retrieve generated keys",
    content: (
      <>
        <p>
          If the database generates a primary key automatically,
          JDBC can retrieve the generated key after insertion.
        </p>
        <p>
          The exact behavior depends on the database and driver.
        </p>
      </>
    ),
    code: `import java.sql.Statement;

String sql =
    "INSERT INTO students(name, age) VALUES (?, ?)";

try (
    Connection connection =
        DriverManager.getConnection(url, username, password);
    PreparedStatement ps =
        connection.prepareStatement(
            sql,
            Statement.RETURN_GENERATED_KEYS
        )
) {
    ps.setString(1, "Arun");
    ps.setInt(2, 19);

    ps.executeUpdate();

    try (ResultSet keys = ps.getGeneratedKeys()) {
        if (keys.next()) {
            int id = keys.getInt(1);
            System.out.println(id);
        }
    }
}`,
  },
  {
    title: "15. Update a record",
    content: (
      <>
        <p>
          UPDATE modifies existing rows.
        </p>
        <p>
          Always check the WHERE condition. Without it, every row
          in the table may be updated.
        </p>
      </>
    ),
    code: `String sql =
    "UPDATE students SET age = ? WHERE id = ?";

try (PreparedStatement ps =
        connection.prepareStatement(sql)) {

    ps.setInt(1, 21);
    ps.setInt(2, 5);

    int rows = ps.executeUpdate();
    System.out.println(rows);
}`,
  },
  {
    title: "16. Delete a record",
    content: (
      <>
        <p>
          DELETE removes rows from a table.
        </p>
        <p>
          Always verify the WHERE condition before executing
          a DELETE statement.
        </p>
      </>
    ),
    code: `String sql =
    "DELETE FROM students WHERE id = ?";

try (PreparedStatement ps =
        connection.prepareStatement(sql)) {

    ps.setInt(1, 5);

    int rows = ps.executeUpdate();
    System.out.println("Deleted: " + rows);
}`,
  },
  {
    title: "17. SQL injection",
    content: (
      <>
        <p>
          SQL injection happens when untrusted input changes the
          structure or meaning of an SQL statement.
        </p>
        <p>
          Concatenating user input into SQL is dangerous.
          PreparedStatement parameter binding is the standard
          protection for values.
        </p>
        <p>
          Placeholders cannot safely represent table names,
          column names, or SQL keywords. Validate those separately
          using an allowlist when they must be dynamic.
        </p>
      </>
    ),
    code: `// Unsafe:
String sql =
    "SELECT * FROM users WHERE name = '" + userInput + "'";

// Safer:
String sql =
    "SELECT * FROM users WHERE name = ?";

PreparedStatement ps =
    connection.prepareStatement(sql);

ps.setString(1, userInput);`,
  },
  {
    title: "18. ResultSet navigation",
    content: (
      <>
        <p>
          ResultSet provides methods to read column values.
        </p>
        <ul>
          <li>next(): moves to the next row.</li>
          <li>getInt(): reads an integer column.</li>
          <li>getString(): reads a string column.</li>
          <li>getDouble(): reads a double column.</li>
          <li>getDate(): reads a SQL date.</li>
        </ul>
        <p>
          Column indexes start at 1. Using column names can make
          code easier to understand.
        </p>
      </>
    ),
    code: `while (rs.next()) {
    int id = rs.getInt("id");
    String name = rs.getString("name");
    int age = rs.getInt("age");

    System.out.println(id + " " + name + " " + age);
}`,
  },
  {
    title: "19. SQL NULL values",
    content: (
      <>
        <p>
          SQL NULL means the value is missing or unknown.
          It is not the same as 0 or an empty string.
        </p>
        <p>
          For primitive numeric getters, JDBC may return 0 when
          the SQL value is NULL. Use wasNull() immediately after
          the getter to check.
        </p>
      </>
    ),
    code: `int age = rs.getInt("age");

if (rs.wasNull()) {
    System.out.println("Age is NULL");
} else {
    System.out.println(age);
}

// For nullable numeric values,
// consider getObject() with a wrapper type.`,
  },
  {
    title: "20. try-with-resources",
    content: (
      <>
        <p>
          JDBC resources should be closed to release database
          connections, statements, and result sets.
        </p>
        <p>
          try-with-resources automatically closes resources
          when the block exits.
        </p>
        <p>
          ResultSet and Statement are usually closed before
          their associated Connection.
        </p>
      </>
    ),
    code: `try (
    Connection connection =
        DriverManager.getConnection(url, username, password);
    PreparedStatement ps =
        connection.prepareStatement(sql);
    ResultSet rs = ps.executeQuery()
) {
    while (rs.next()) {
        System.out.println(rs.getString(1));
    }
} catch (SQLException e) {
    e.printStackTrace();
}`,
  },
  {
    title: "21. Transactions",
    content: (
      <>
        <p>
          A transaction is a group of database operations treated
          as one logical unit.
        </p>
        <p>Transactions follow ACID properties:</p>
        <ul>
          <li>Atomicity: all operations succeed or none do.</li>
          <li>Consistency: valid database rules are preserved.</li>
          <li>Isolation: concurrent transactions are controlled.</li>
          <li>Durability: committed changes persist.</li>
        </ul>
      </>
    ),
    code: `connection.setAutoCommit(false);

try {
    // Execute multiple SQL operations

    connection.commit();

} catch (SQLException e) {
    connection.rollback();
    throw e;
}`,
  },
  {
    title: "22. Transaction example",
    content: (
      <>
        <p>
          Consider transferring money between two bank accounts.
          Both the debit and credit must succeed together.
        </p>
        <p>
          If one operation fails, roll back the transaction.
        </p>
      </>
    ),
    code: `String debit =
    "UPDATE accounts SET balance = balance - ? WHERE id = ?";

String credit =
    "UPDATE accounts SET balance = balance + ? WHERE id = ?";

try {
    connection.setAutoCommit(false);

    try (
        PreparedStatement p1 =
            connection.prepareStatement(debit);
        PreparedStatement p2 =
            connection.prepareStatement(credit)
    ) {
        p1.setBigDecimal(1, amount);
        p1.setInt(2, fromId);
        p1.executeUpdate();

        p2.setBigDecimal(1, amount);
        p2.setInt(2, toId);
        p2.executeUpdate();

        connection.commit();
    }

} catch (SQLException e) {
    connection.rollback();
    throw e;
}`,
  },
  {
    title: "23. Batch processing",
    content: (
      <>
        <p>
          Batch processing groups multiple SQL operations and
          sends them together to reduce communication overhead.
        </p>
        <p>
          Batch operations can improve performance for many
          inserts or updates.
        </p>
      </>
    ),
    code: `String sql =
    "INSERT INTO students(name, age) VALUES (?, ?)";

try (PreparedStatement ps =
        connection.prepareStatement(sql)) {

    ps.setString(1, "A");
    ps.setInt(2, 18);
    ps.addBatch();

    ps.setString(1, "B");
    ps.setInt(2, 19);
    ps.addBatch();

    int[] results = ps.executeBatch();
}`,
  },
  {
    title: "24. Database metadata",
    content: (
      <>
        <p>
          DatabaseMetaData provides information about the
          database, driver, tables, and supported features.
        </p>
        <p>
          ResultSetMetaData provides information about columns
          returned by a query.
        </p>
      </>
    ),
    code: `import java.sql.DatabaseMetaData;

DatabaseMetaData meta =
    connection.getMetaData();

System.out.println(meta.getDatabaseProductName());
System.out.println(meta.getDriverName());

ResultSetMetaData columns =
    resultSet.getMetaData();

System.out.println(columns.getColumnCount());`,
  },
  {
    title: "25. Connection pooling",
    content: (
      <>
        <p>
          Opening a new database connection can be expensive.
          Connection pooling reuses connections.
        </p>
        <p>
          In production applications, a connection pool such as
          HikariCP is commonly used.
        </p>
        <p>
          Closing a pooled connection usually returns it to the pool
          rather than physically closing the database connection.
        </p>
      </>
    ),
    code: `// Conceptual usage with a DataSource:

Connection connection =
    dataSource.getConnection();

try {
    // Use the connection
} finally {
    connection.close();
}

// With a pool, close() usually returns
// the connection to the pool.`,
  },
  {
    title: "26. DAO pattern",
    content: (
      <>
        <p>
          DAO means Data Access Object.
        </p>
        <p>
          A DAO separates database access logic from application
          business logic.
        </p>
        <p>
          It makes code easier to test, maintain, and reuse.
        </p>
      </>
    ),
    code: `interface StudentDao {
    Student findById(int id) throws SQLException;

    void save(Student student) throws SQLException;

    void deleteById(int id) throws SQLException;
}

// StudentDaoImpl contains JDBC queries.
// Service classes use StudentDao
// instead of writing SQL everywhere.`,
  },
  {
    title: "27. Common JDBC exceptions",
    content: (
      <>
        <p>
          SQLException represents database access errors.
        </p>
        <p>Useful information includes:</p>
        <ul>
          <li>getMessage(): error message.</li>
          <li>getSQLState(): SQL state code.</li>
          <li>getErrorCode(): vendor-specific error code.</li>
        </ul>
        <p>
          Do not ignore database exceptions. Log useful details
          safely and handle the failure appropriately.
        </p>
      </>
    ),
    code: `catch (SQLException e) {
    System.out.println(e.getMessage());
    System.out.println(e.getSQLState());
    System.out.println(e.getErrorCode());
}`,
  },
  {
    title: "28. JDBC best practices",
    content: (
      <>
        <ul>
          <li>Use PreparedStatement for parameter values.</li>
          <li>Use try-with-resources.</li>
          <li>Use transactions for related operations.</li>
          <li>Use connection pooling in server applications.</li>
          <li>Keep credentials outside source code.</li>
          <li>Do not expose database passwords in GitHub.</li>
          <li>Validate dynamic table and column names.</li>
          <li>Use indexes appropriately for query performance.</li>
          <li>Do not load huge result sets unnecessarily.</li>
          <li>Handle SQL exceptions properly.</li>
        </ul>
      </>
    ),
    code: `// Avoid hardcoding production credentials.
// Use environment variables or a
// secure configuration mechanism.

String username =
    System.getenv("DB_USERNAME");

String password =
    System.getenv("DB_PASSWORD");`,
  },
  {
    title: "29. Practice problems",
    content: (
      <>
        <ol>
          <li>Connect Java to a MySQL database.</li>
          <li>Create a students table.</li>
          <li>Insert student records.</li>
          <li>Display all students.</li>
          <li>Search a student by ID.</li>
          <li>Update a student's age.</li>
          <li>Delete a student by ID.</li>
          <li>Retrieve an automatically generated ID.</li>
          <li>Perform multiple operations in one transaction.</li>
          <li>Insert multiple rows using batch processing.</li>
          <li>Build a simple Student DAO.</li>
        </ol>
      </>
    ),
    code: `// Mini project:
// Student Management System

// Features:
// 1. Add student
// 2. View all students
// 3. Search by ID
// 4. Update student
// 5. Delete student

// Use JDBC + PreparedStatement
// + MySQL + a simple menu.`,
  },
  {
    title: "30. Interview questions",
    content: (
      <>
        <ol>
          <li>What is JDBC?</li>
          <li>Explain JDBC architecture.</li>
          <li>What is a JDBC driver?</li>
          <li>Statement vs PreparedStatement?</li>
          <li>executeQuery() vs executeUpdate()?</li>
          <li>What is ResultSet?</li>
          <li>How does PreparedStatement prevent SQL injection?</li>
          <li>What is a transaction?</li>
          <li>Explain ACID properties.</li>
          <li>What are commit() and rollback()?</li>
          <li>What is auto-commit?</li>
          <li>What is connection pooling?</li>
          <li>What is batch processing?</li>
          <li>What is DAO?</li>
          <li>How do you retrieve generated keys?</li>
          <li>How do you handle SQL NULL?</li>
          <li>Why use try-with-resources?</li>
        </ol>
      </>
    ),
    code: `// Quick revision:
JDBC -> Java database API
Connection -> database session
PreparedStatement -> parameterized SQL
ResultSet -> query results
executeQuery -> returns ResultSet
executeUpdate -> affected row count
commit -> save transaction
rollback -> undo transaction
DAO -> separates database access`,
  },
];

export default function JDBCLesson({ onBack }) {
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
        Java JDBC
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn how Java applications connect to databases, execute SQL,
        manage transactions, retrieve results, and safely handle data.
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
          <li>I understand JDBC architecture and drivers.</li>
          <li>I can connect Java to a database.</li>
          <li>I can execute SELECT, INSERT, UPDATE, and DELETE.</li>
          <li>I understand Statement and PreparedStatement.</li>
          <li>I can read query results using ResultSet.</li>
          <li>I understand SQL injection prevention.</li>
          <li>I can manage transactions with commit and rollback.</li>
          <li>I understand batch processing and connection pooling.</li>
          <li>I can build a basic Student Management System.</li>
        </ul>
      </section>
    </div>
  );
}
