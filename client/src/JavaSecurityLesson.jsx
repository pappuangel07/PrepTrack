

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
    title: "1. What Is Java Security?",
    content: (
      <>
        <p>
          Java security means protecting applications, users, data, and
          systems from unauthorized access and attacks.
        </p>
        <p>
          Security is not just about writing code that works. It is about
          writing code that continues to behave safely when someone tries
          to misuse it.
        </p>
        <ul>
          <li>Confidentiality: only authorized people can access data.</li>
          <li>Integrity: data cannot be changed without permission.</li>
          <li>Availability: the system remains usable when needed.</li>
          <li>Authentication: verifying who someone is.</li>
          <li>Authorization: deciding what someone is allowed to do.</li>
        </ul>
      </>
    ),
    code: `// Example security requirement:
//
// A student can view their own marks.
// A student cannot modify another student's marks.
//
// Authentication:
// "Who are you?"
//
// Authorization:
// "Are you allowed to do this?"`,
  },
  {
    title: "2. Authentication vs Authorization",
    content: (
      <>
        <p>
          Authentication checks identity. Authorization checks permission.
          They are different security steps.
        </p>
        <p>
          A user may successfully log in but still be forbidden from
          accessing an administrator's page.
        </p>
      </>
    ),
    code: `// Authentication example
if (user != null && user.isAuthenticated()) {
    System.out.println("User is logged in");
}

// Authorization example
if (user.hasRole("ADMIN")) {
    System.out.println("Admin action allowed");
} else {
    System.out.println("Access denied");
}`,
  },
  {
    title: "3. Principle of Least Privilege",
    content: (
      <>
        <p>
          Give users, programs, and services only the permissions they
          actually need.
        </p>
        <p>
          A student account should not have database administrator
          permissions. A report-generation service should not be able to
          delete the entire database.
        </p>
        <p>
          This reduces the damage if an account or component is
          compromised.
        </p>
      </>
    ),
    code: `// Bad design:
// Every user gets administrator access.
//
// Better design:
// STUDENT -> view own progress
// TEACHER -> view assigned students
// ADMIN   -> manage users and system settings`,
  },
  {
    title: "4. Input Validation",
    content: (
      <>
        <p>
          Never blindly trust input from users, APIs, files, or external
          systems.
        </p>
        <p>
          Validate input according to the expected type, range, length,
          and format. Prefer allowlists over trying to block every
          dangerous character.
        </p>
        <p>
          Validation does not replace parameterized SQL queries or
          context-aware output encoding.
        </p>
      </>
    ),
    code: `public static int validateAge(String input) {
    if (input == null || input.isBlank()) {
        throw new IllegalArgumentException(
            "Age is required"
        );
    }

    int age = Integer.parseInt(input);

    if (age < 0 || age > 120) {
        throw new IllegalArgumentException(
            "Invalid age"
        );
    }

    return age;
}`,
  },
  {
    title: "5. SQL Injection",
    content: (
      <>
        <p>
          SQL injection happens when untrusted input is inserted directly
          into an SQL query.
        </p>
        <p>
          An attacker may change the meaning of the query and access or
          modify data they should not be able to access.
        </p>
        <p>
          Use PreparedStatement with parameter placeholders. Do not build
          SQL queries by concatenating user input.
        </p>
      </>
    ),
    code: `// UNSAFE
String sql =
    "SELECT * FROM users WHERE username = '"
    + username + "'";

// SAFE
String sql =
    "SELECT * FROM users WHERE username = ?";

PreparedStatement ps =
    connection.prepareStatement(sql);

ps.setString(1, username);

ResultSet rs = ps.executeQuery();`,
  },
  {
    title: "6. Password Security",
    content: (
      <>
        <p>
          Never store passwords as plain text. If the database is exposed,
          plain-text passwords immediately expose user accounts.
        </p>
        <p>
          Passwords should be stored using a password-hashing algorithm
          designed for this purpose, such as Argon2id, bcrypt, or
          PBKDF2, with appropriate parameters and unique salts.
        </p>
        <p>
          SHA-256 alone is not a suitable password-storage algorithm:
          it is too fast for this purpose.
        </p>
      </>
    ),
    code: `// Conceptual password storage:
//
// User password
//      |
//      v
// Password hashing algorithm
//      |
//      v
// Salt + password hash
//      |
//      v
// Store hash and salt/parameters
//
// During login:
// Verify submitted password against stored hash.
//
// Never store the original password.`,
  },
  {
    title: "7. Secure Password Verification",
    content: (
      <>
        <p>
          Password verification should use the password-hashing
          library's verification function.
        </p>
        <p>
          Do not manually compare plain-text passwords or invent your
          own password-hashing algorithm.
        </p>
        <p>
          A production application should use a well-maintained security
          library and keep its configuration updated.
        </p>
      </>
    ),
    code: `// Pseudocode: library-specific API
//
// String storedHash = database.getPasswordHash(user);
//
// boolean valid = passwordHasher.verify(
//     submittedPassword,
//     storedHash
// );
//
// if (valid) {
//     createAuthenticatedSession();
// } else {
//     rejectLogin();
// }`,
  },
  {
    title: "8. Secure Random Numbers",
    content: (
      <>
        <p>
          Use SecureRandom for security-sensitive random values such as
          tokens and verification codes.
        </p>
        <p>
          Do not use java.util.Random for password-reset tokens,
          authentication tokens, or cryptographic keys.
        </p>
      </>
    ),
    code: `import java.security.SecureRandom;

public class SecureTokenExample {
    public static void main(String[] args) {
        SecureRandom random = new SecureRandom();

        byte[] token = new byte[32];

        random.nextBytes(token);

        System.out.println(
            "Generated 32 random bytes"
        );
    }
}`,
  },
  {
    title: "9. Cryptography: Encryption vs Hashing",
    content: (
      <>
        <p>
          Encryption is reversible when the correct key is available.
          Hashing is designed to be one-way.
        </p>
        <ul>
          <li>Encryption: protect data that must be recovered.</li>
          <li>Hashing: verify data without recovering the original.</li>
          <li>Digital signature: verify authenticity and integrity.</li>
        </ul>
        <p>
          Use standard cryptographic libraries. Never design your own
          encryption algorithm.
        </p>
      </>
    ),
    code: `// Encryption:
// plaintext + key -> ciphertext
// ciphertext + key -> plaintext
//
// Hashing:
// input -> hash
// There is no normal reverse operation.
//
// Passwords:
// use password hashing, not reversible encryption.`,
  },
  {
    title: "10. Secure Encryption in Java",
    content: (
      <>
        <p>
          For modern symmetric encryption, authenticated encryption such
          as AES-GCM is commonly used.
        </p>
        <p>
          AES-GCM provides confidentiality and integrity. Each encryption
          operation must use a unique nonce/IV for a given key.
        </p>
        <p>
          Never reuse a GCM nonce with the same key. Store or manage keys
          securely, separately from encrypted data.
        </p>
      </>
    ),
    code: `import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import java.security.SecureRandom;

public class AesGcmExample {
    public static void main(String[] args)
            throws Exception {

        KeyGenerator generator =
            KeyGenerator.getInstance("AES");

        generator.init(256);

        SecretKey key = generator.generateKey();

        byte[] nonce = new byte[12];

        new SecureRandom().nextBytes(nonce);

        Cipher cipher =
            Cipher.getInstance("AES/GCM/NoPadding");

        GCMParameterSpec spec =
            new GCMParameterSpec(128, nonce);

        cipher.init(
            Cipher.ENCRYPT_MODE,
            key,
            spec
        );

        byte[] encrypted =
            cipher.doFinal("Hello Java".getBytes());

        System.out.println(
            "Encrypted bytes: " + encrypted.length
        );
    }
}`,
  },
  {
    title: "11. Avoid Hardcoded Secrets",
    content: (
      <>
        <p>
          Never commit passwords, API keys, private keys, or database
          credentials to GitHub.
        </p>
        <p>
          Use environment variables or a secrets manager. Environment
          variables are better than hardcoding, but production systems
          may need dedicated secret-management solutions.
        </p>
        <p>
          If a secret is accidentally committed, removing it from the
          latest commit is not enough. Rotate the exposed secret.
        </p>
      </>
    ),
    code: `// Avoid
String password = "myDatabasePassword";

// Better for local development
String password =
    System.getenv("DB_PASSWORD");

if (password == null || password.isBlank()) {
    throw new IllegalStateException(
        "DB_PASSWORD is not configured"
    );
}`,
  },
  {
    title: "12. Cross-Site Scripting (XSS)",
    content: (
      <>
        <p>
          XSS happens when attacker-controlled content is rendered as
          executable script in a user's browser.
        </p>
        <p>
          Java backend applications can contribute to XSS if they return
          unsafe content or render unescaped user input.
        </p>
        <p>
          Use context-aware output encoding and safe templating.
          Avoid inserting untrusted strings into HTML or JavaScript.
        </p>
      </>
    ),
    code: `// Unsafe idea:
// Render user input directly as HTML.
//
// Safer approach:
// Render user input as text and let the framework
// escape it automatically.
//
// In React:
// <p>{userInput}</p>
//
// Avoid dangerouslySetInnerHTML with untrusted input.`,
  },
  {
    title: "13. Cross-Site Request Forgery (CSRF)",
    content: (
      <>
        <p>
          CSRF tricks a user's browser into sending an unwanted request
          to a site where the user is already authenticated.
        </p>
        <p>
          For cookie-based sessions, use framework CSRF protection,
          appropriate SameSite cookie settings, and validate requests
          that change state.
        </p>
        <p>
          SameSite is useful defense-in-depth, not a universal
          replacement for CSRF protection.
        </p>
      </>
    ),
    code: `// Example state-changing request:
//
// POST /account/change-email
//
// Security checks may include:
// 1. Valid authenticated session
// 2. CSRF token validation
// 3. Authorization check
// 4. Input validation
//
// GET requests should not perform
// state-changing operations.`,
  },
  {
    title: "14. Secure Session Management",
    content: (
      <>
        <p>
          A session connects multiple requests to the same authenticated
          user.
        </p>
        <ul>
          <li>Use unpredictable session identifiers.</li>
          <li>Regenerate the session ID after login.</li>
          <li>Set secure cookie attributes.</li>
          <li>Expire inactive sessions.</li>
          <li>Invalidate sessions during logout.</li>
        </ul>
      </>
    ),
    code: `// Typical session cookie protections:
//
// HttpOnly -> JavaScript cannot read the cookie
// Secure   -> sent only over HTTPS
// SameSite -> helps limit cross-site cookie sending
//
// Also:
// Use session expiration.
// Regenerate session ID after authentication.`,
  },
  {
    title: "15. HTTPS and TLS",
    content: (
      <>
        <p>
          HTTPS protects communication between the client and server
          using TLS.
        </p>
        <p>
          It helps prevent eavesdropping and tampering in transit and
          authenticates the server through certificates.
        </p>
        <p>
          Do not disable certificate validation to make a connection
          work. Fix the certificate or trust configuration instead.
        </p>
      </>
    ),
    code: `// Secure application deployment:
//
// Use HTTPS for login and all sensitive pages.
// Keep TLS configuration modern.
// Validate certificates.
// Never use trust-all certificate managers
// in production.`,
  },
  {
    title: "16. Secure File Handling",
    content: (
      <>
        <p>
          File paths and uploaded files are untrusted input.
        </p>
        <p>
          Path traversal attacks try to escape an intended directory
          using paths such as ../../secret.txt.
        </p>
        <p>
          Resolve paths against a fixed base directory and verify that
          the normalized path remains inside it.
        </p>
      </>
    ),
    code: `import java.nio.file.Path;

public class SafePathExample {
    public static Path safePath(
            Path baseDirectory,
            String userFileName) {

        Path base =
            baseDirectory.toAbsolutePath()
                .normalize();

        Path target =
            base.resolve(userFileName)
                .normalize();

        if (!target.startsWith(base)) {
            throw new SecurityException(
                "Invalid file path"
            );
        }

        return target;
    }
}`,
  },
  {
    title: "17. Secure File Uploads",
    content: (
      <>
        <p>
          File extensions can be forged. Do not trust a filename such
          as report.pdf to prove that the file is a PDF.
        </p>
        <p>
          Validate file size, content type, actual file signature,
          and allowed formats. Generate server-side filenames and
          store uploads outside executable web directories.
        </p>
      </>
    ),
    code: `// Upload validation checklist:
//
// 1. Limit file size
// 2. Allow only required file types
// 3. Inspect actual file content
// 4. Generate a safe server-side filename
// 5. Store outside public executable folders
// 6. Apply access control
// 7. Scan files when appropriate`,
  },
  {
    title: "18. Exception and Error Handling",
    content: (
      <>
        <p>
          Detailed internal errors can expose database names, file
          paths, stack traces, or implementation details.
        </p>
        <p>
          Log useful diagnostic information securely, but return
          generic error messages to users.
        </p>
        <p>
          Never silently ignore security-related exceptions.
        </p>
      </>
    ),
    code: `try {
    performOperation();
} catch (Exception e) {
    // Internal log for developers
    logger.error(
        "Operation failed",
        e
    );

    // Safe message for the user
    System.out.println(
        "Unable to complete the request"
    );
}`,
  },
  {
    title: "19. Logging Security",
    content: (
      <>
        <p>
          Logs help detect attacks and investigate failures.
          But logs themselves can leak sensitive information.
        </p>
        <p>
          Never log passwords, authentication tokens, private keys,
          or full sensitive personal data.
        </p>
        <p>
          Sanitize user-controlled log fields to prevent log injection.
        </p>
      </>
    ),
    code: `// Avoid
logger.info("Login password: " + password);

// Better
logger.info(
    "Login attempt for user ID: {}",
    userId
);

// Never log:
// - Passwords
// - Session tokens
// - API secrets
// - Private cryptographic keys`,
  },
  {
    title: "20. Dependency Security",
    content: (
      <>
        <p>
          Java applications often depend on external libraries.
          A vulnerable dependency can expose your application even
          when your own code looks safe.
        </p>
        <ul>
          <li>Keep dependencies updated.</li>
          <li>Remove unused libraries.</li>
          <li>Review security advisories.</li>
          <li>Use dependency scanning tools.</li>
          <li>Pin and review dependency versions.</li>
        </ul>
      </>
    ),
    code: `// Maven example:
//
// mvn versions:display-dependency-updates
//
// Also use a dependency vulnerability scanner
// in your build or CI pipeline.
//
// Do not blindly update every dependency
// without testing compatibility.`,
  },
  {
    title: "21. Java Security Manager",
    content: (
      <>
        <p>
          The Java Security Manager was historically used to restrict
          certain operations through permission checks.
        </p>
        <p>
          It was deprecated for removal in Java 17 and permanently
          disabled in Java 24. Do not build new applications around it.
        </p>
        <p>
          Modern Java security relies on operating-system isolation,
          application design, secure libraries, and deployment controls.
        </p>
      </>
    ),
    code: `// Historical concept:
//
// SecurityManager
// Policy files
// Permission checks
//
// Modern Java:
// Do not depend on SecurityManager
// for application sandboxing.`,
  },
  {
    title: "22. Serialization Security",
    content: (
      <>
        <p>
          Deserializing untrusted Java objects can be dangerous.
          Crafted serialized data may trigger unexpected behavior
          through object graphs and gadget chains.
        </p>
        <p>
          Avoid native Java serialization for untrusted input.
          Prefer simpler data formats with explicit schemas.
        </p>
        <p>
          If serialization is unavoidable, restrict allowed classes
          and use ObjectInputFilter where appropriate.
        </p>
      </>
    ),
    code: `import java.io.ObjectInputFilter;
import java.io.ObjectInputStream;

// Conceptual filter setup:
//
// ObjectInputFilter filter =
//     ObjectInputFilter.Config.createFilter(
//         "maxdepth=10;maxrefs=1000;*"
//     );
//
// inputStream.setObjectInputFilter(filter);
//
// A real filter should allow only
// the specific classes your application needs.`,
  },
  {
    title: "23. Secure Database Access",
    content: (
      <>
        <p>
          Database security includes both safe queries and correct
          permissions.
        </p>
        <ul>
          <li>Use PreparedStatement.</li>
          <li>Use a dedicated database account.</li>
          <li>Grant only required permissions.</li>
          <li>Keep credentials outside source code.</li>
          <li>Use transactions for consistent updates.</li>
        </ul>
      </>
    ),
    code: `// Application database account:
//
// SELECT -> only if needed
// INSERT -> only if needed
// UPDATE -> only if needed
// DELETE -> only if needed
//
// Do not connect your web application
// using the database root account.`,
  },
  {
    title: "24. Secure API Design",
    content: (
      <>
        <p>
          Every API endpoint must verify authentication when required,
          authorization for the requested resource, and valid input.
        </p>
        <p>
          Do not rely on the frontend to hide buttons or prevent
          unauthorized actions. Attackers can call APIs directly.
        </p>
        <p>
          Use rate limits for sensitive endpoints such as login,
          password reset, and verification codes.
        </p>
      </>
    ),
    code: `// Example request checks:
//
// 1. Is the user authenticated?
// 2. Does the user have permission?
// 3. Does the resource belong to this user?
// 4. Is the request valid?
// 5. Is the request rate acceptable?
//
// Backend checks are mandatory.`,
  },
  {
    title: "25. Security Testing",
    content: (
      <>
        <p>
          Security testing checks whether an application behaves safely
          under malicious or unexpected input.
        </p>
        <ul>
          <li>Test invalid and boundary inputs.</li>
          <li>Test unauthorized API access.</li>
          <li>Test SQL injection attempts.</li>
          <li>Test session expiration and logout.</li>
          <li>Scan dependencies for vulnerabilities.</li>
          <li>Review secrets and configuration.</li>
        </ul>
      </>
    ),
    code: `// Example security test cases:
//
// Student tries to access another student's data
// -> must be denied
//
// Invalid token
// -> must be denied
//
// Oversized upload
// -> must be rejected
//
// SQL injection payload
// -> must not change query structure`,
  },
  {
    title: "26. Common Java Security Mistakes",
    content: (
      <>
        <ul>
          <li>Storing plain-text passwords.</li>
          <li>Using string concatenation for SQL.</li>
          <li>Hardcoding secrets in source code.</li>
          <li>Trusting client-side validation only.</li>
          <li>Disabling TLS certificate validation.</li>
          <li>Using Random for security tokens.</li>
          <li>Returning stack traces to users.</li>
          <li>Giving every user administrator access.</li>
          <li>Deserializing untrusted objects.</li>
        </ul>
      </>
    ),
    code: `// Security mindset:
//
// Never trust input.
// Never expose secrets.
// Never grant unnecessary permissions.
// Never invent cryptography.
// Never assume the frontend is secure.
//
// Validate, authorize, protect, and monitor.`,
  },
  {
    title: "27. Interview Questions",
    content: (
      <>
        <ol>
          <li>What is the difference between authentication and authorization?</li>
          <li>What is SQL injection and how does PreparedStatement prevent it?</li>
          <li>Why is SHA-256 not suitable for password storage by itself?</li>
          <li>What is the difference between encryption and hashing?</li>
          <li>Why should SecureRandom be used for security tokens?</li>
          <li>What is XSS?</li>
          <li>What is CSRF?</li>
          <li>What is the principle of least privilege?</li>
          <li>Why is Java serialization risky with untrusted data?</li>
          <li>What is the purpose of HTTPS?</li>
        </ol>
      </>
    ),
    code: `// Interview answer pattern:
//
// Define the concept.
// Explain how the attack or defense works.
// Give a practical Java example.
// Mention the limitation or best practice.`,
  },
  {
    title: "28. Practice Tasks",
    content: (
      <>
        <ol>
          <li>Write input validation for username and age.</li>
          <li>Rewrite an unsafe SQL query using PreparedStatement.</li>
          <li>Generate a secure random token.</li>
          <li>Design a secure password storage workflow.</li>
          <li>Create an API authorization checklist.</li>
          <li>Review a sample application for hardcoded secrets.</li>
          <li>Write tests for unauthorized resource access.</li>
        </ol>
      </>
    ),
    code: `// Mini project:
//
// Build a secure student login module.
//
// Include:
// - Password hashing
// - Login verification
// - Role-based authorization
// - Session expiration
// - PreparedStatement
// - Safe error messages
// - Login rate limiting`,
  },
];

export default function JavaSecurityLesson({ onBack }) {
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
        Java Security & Secure Coding
      </h1>

      <p
        style={{
          color: "var(--muted, #6b7280)",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        Learn how to protect Java applications from common attacks,
        secure user data, and write safer production-quality code.
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
          <li>Understand authentication and authorization.</li>
          <li>Know how to prevent SQL injection.</li>
          <li>Understand secure password storage.</li>
          <li>Know encryption vs hashing.</li>
          <li>Understand XSS, CSRF, and HTTPS.</li>
          <li>Know how to protect sessions and secrets.</li>
          <li>Understand secure file handling.</li>
          <li>Know common Java security mistakes.</li>
        </ul>
      </section>
    </div>
  );
}
