

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
    title: "1. What Is an API?",
    content: (
      <>
        <p>
          API stands for Application Programming Interface.
          It defines how one software system communicates with another.
        </p>
        <p>
          A REST API commonly allows a frontend, mobile app, or
          another server to communicate with a backend using HTTP.
        </p>
        <p>
          Example: PrepTrack's React frontend sends a request to
          its Express backend to retrieve tasks.
        </p>
      </>
    ),
    code: `// Frontend
fetch("http://localhost:5000/api/tasks")
    .then(response => response.json())
    .then(tasks => console.log(tasks));

// Backend returns data to the frontend.`,
  },
  {
    title: "2. What Is HTTP?",
    content: (
      <>
        <p>
          HTTP stands for Hypertext Transfer Protocol.
          It is a protocol used for communication between clients
          and servers.
        </p>
        <p>
          A client sends an HTTP request. The server processes it
          and returns an HTTP response.
        </p>
      </>
    ),
    code: `// Request
GET /api/students HTTP/1.1
Host: example.com

// Response
HTTP/1.1 200 OK
Content-Type: application/json

[{"id":1,"name":"Arun"}]`,
  },
  {
    title: "3. HTTP Request Structure",
    content: (
      <>
        <p>An HTTP request contains:</p>
        <ul>
          <li>Method: what operation is requested.</li>
          <li>URL: where the request is sent.</li>
          <li>Headers: metadata about the request.</li>
          <li>Body: optional data sent to the server.</li>
        </ul>
      </>
    ),
    code: `POST /api/students HTTP/1.1
Content-Type: application/json
Authorization: Bearer TOKEN

{
  "name": "Arun",
  "age": 20
}`,
  },
  {
    title: "4. HTTP Response Structure",
    content: (
      <>
        <p>An HTTP response contains:</p>
        <ul>
          <li>Status code: result of the request.</li>
          <li>Headers: response metadata.</li>
          <li>Body: optional returned content.</li>
        </ul>
        <p>
          The response body may contain JSON, text, HTML,
          or other data.
        </p>
      </>
    ),
    code: `HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 101,
  "name": "Arun"
}`,
  },
  {
    title: "5. HTTP Methods",
    content: (
      <>
        <p>Common HTTP methods:</p>
        <ul>
          <li>GET: retrieve a resource.</li>
          <li>POST: create a resource or perform an operation.</li>
          <li>PUT: replace a resource.</li>
          <li>PATCH: partially update a resource.</li>
          <li>DELETE: delete a resource.</li>
        </ul>
        <p>
          These methods describe intended behavior. The server
          must still implement the behavior correctly.
        </p>
      </>
    ),
    code: `GET    /api/students/10
POST   /api/students
PUT    /api/students/10
PATCH  /api/students/10
DELETE /api/students/10`,
  },
  {
    title: "6. What Is REST?",
    content: (
      <>
        <p>
          REST stands for Representational State Transfer.
          It is an architectural style for designing network APIs.
        </p>
        <p>
          REST APIs commonly use resources, HTTP methods,
          representations such as JSON, and stateless communication.
        </p>
        <p>
          Not every API that uses HTTP is automatically RESTful.
        </p>
      </>
    ),
    code: `// Resource-oriented API
GET    /api/tasks
GET    /api/tasks/5
POST   /api/tasks
PATCH  /api/tasks/5
DELETE /api/tasks/5`,
  },
  {
    title: "7. REST Resource Design",
    content: (
      <>
        <p>
          A resource represents an entity or concept exposed
          by the API.
        </p>
        <p>
          Use meaningful nouns in resource paths.
          Prefer consistent naming and avoid exposing internal
          database implementation details unnecessarily.
        </p>
      </>
    ),
    code: `// Good resource paths
/api/users
/api/users/12
/api/users/12/tasks
/api/tasks/45

// Avoid inconsistent paths
/getAllUsers
/deleteTaskById?id=45`,
  },
  {
    title: "8. HTTP Status Codes",
    content: (
      <>
        <p>
          Status codes tell the client what happened.
        </p>
        <ul>
          <li>200 OK: request succeeded.</li>
          <li>201 Created: resource created.</li>
          <li>204 No Content: succeeded with no response body.</li>
          <li>400 Bad Request: invalid request.</li>
          <li>401 Unauthorized: authentication is missing or invalid.</li>
          <li>403 Forbidden: access is not allowed.</li>
          <li>404 Not Found: resource was not found.</li>
          <li>500 Internal Server Error: server failure.</li>
        </ul>
      </>
    ),
    code: `// Example responses
200 -> GET succeeded
201 -> POST created a resource
400 -> invalid input
401 -> authentication required
403 -> permission denied
404 -> resource not found
500 -> unexpected server error`,
  },
  {
    title: "9. JSON",
    content: (
      <>
        <p>
          JSON stands for JavaScript Object Notation.
          It is a text format commonly used to exchange data.
        </p>
        <p>
          JSON supports objects, arrays, strings, numbers,
          booleans, and null.
        </p>
        <p>
          JSON is language-independent. Java applications can
          parse and generate JSON using libraries.
        </p>
      </>
    ),
    code: `{
  "id": 10,
  "name": "Arun",
  "active": true,
  "skills": ["Java", "SQL"]
}`,
  },
  {
    title: "10. Java HttpClient",
    content: (
      <>
        <p>
          Java provides HttpClient in the java.net.http package
          starting with Java 11.
        </p>
        <p>
          It can send HTTP requests and receive responses.
          It supports synchronous and asynchronous communication.
        </p>
      </>
    ),
    code: `import java.net.http.HttpClient;

HttpClient client =
    HttpClient.newHttpClient();

// HttpClient can be reused
// for multiple requests.`,
  },
  {
    title: "11. Sending a GET Request",
    content: (
      <>
        <p>
          HttpRequest represents an HTTP request.
          HttpResponse represents the server's response.
        </p>
        <p>
          The send() method performs a synchronous request
          and returns the response.
        </p>
      </>
    ),
    code: `import java.net.URI;
import java.net.http.*;

public class GetExample {
    public static void main(String[] args)
            throws Exception {

        HttpClient client =
            HttpClient.newHttpClient();

        HttpRequest request =
            HttpRequest.newBuilder()
                .uri(URI.create(
                    "https://example.com"
                ))
                .GET()
                .build();

        HttpResponse<String> response =
            client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
            );

        System.out.println(
            response.statusCode()
        );

        System.out.println(
            response.body()
        );
    }
}`,
  },
  {
    title: "12. Understanding HttpResponse",
    content: (
      <>
        <p>
          HttpResponse provides information about the response.
        </p>
        <ul>
          <li>statusCode(): HTTP status code.</li>
          <li>body(): response body.</li>
          <li>headers(): response headers.</li>
          <li>uri(): request URI.</li>
        </ul>
        <p>
          Check the status code before assuming the request succeeded.
        </p>
      </>
    ),
    code: `int status = response.statusCode();

if (status >= 200 && status < 300) {
    System.out.println("Success");
} else {
    System.out.println(
        "Request failed: " + status
    );
}`,
  },
  {
    title: "13. Sending a POST Request",
    content: (
      <>
        <p>
          POST requests commonly send data to create a resource
          or trigger an operation.
        </p>
        <p>
          Use an appropriate request body publisher and set
          the Content-Type header.
        </p>
      </>
    ),
    code: `import java.net.URI;
import java.net.http.*;

public class PostExample {
    public static void main(String[] args)
            throws Exception {

        HttpClient client =
            HttpClient.newHttpClient();

        String json =
            "{\\"name\\":\\"Arun\\",\\"age\\":20}";

        HttpRequest request =
            HttpRequest.newBuilder()
                .uri(URI.create(
                    "https://example.com/api/students"
                ))
                .header(
                    "Content-Type",
                    "application/json"
                )
                .POST(
                    HttpRequest.BodyPublishers
                        .ofString(json)
                )
                .build();

        HttpResponse<String> response =
            client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
            );

        System.out.println(
            response.statusCode()
        );
    }
}`,
  },
  {
    title: "14. Request Headers",
    content: (
      <>
        <p>
          Headers provide metadata about a request or response.
        </p>
        <p>Common request headers include:</p>
        <ul>
          <li>Content-Type: format of the request body.</li>
          <li>Accept: formats the client can receive.</li>
          <li>Authorization: credentials or access token.</li>
          <li>User-Agent: client information.</li>
        </ul>
      </>
    ),
    code: `HttpRequest request =
    HttpRequest.newBuilder()
        .uri(URI.create(
            "https://example.com/api"
        ))
        .header(
            "Accept",
            "application/json"
        )
        .header(
            "Content-Type",
            "application/json"
        )
        .GET()
        .build();`,
  },
  {
    title: "15. Query Parameters",
    content: (
      <>
        <p>
          Query parameters provide additional information in a URL.
        </p>
        <p>
          They are commonly used for filtering, searching,
          pagination, or sorting.
        </p>
        <p>
          Encode parameter values correctly. Do not concatenate
          arbitrary user input into URLs without encoding.
        </p>
      </>
    ),
    code: `// Example URL
// /api/tasks?status=active&page=2
//
// Query parameters:
// status = active
// page = 2`,
  },
  {
    title: "16. Path Parameters",
    content: (
      <>
        <p>
          Path parameters identify a specific resource.
        </p>
        <p>
          For example, /api/students/10 identifies the student
          whose ID is 10.
        </p>
        <p>
          The backend must validate the parameter and check
          whether the current user can access that resource.
        </p>
      </>
    ),
    code: `// Resource path
GET /api/students/10

// Backend concept:
// Extract student ID = 10
// Validate ID
// Check authorization
// Retrieve student`,
  },
  {
    title: "17. Asynchronous HTTP Requests",
    content: (
      <>
        <p>
          sendAsync() performs an HTTP request asynchronously
          and returns a CompletableFuture.
        </p>
        <p>
          It allows the calling thread to continue without
          waiting for the response immediately.
        </p>
      </>
    ),
    code: `HttpClient client =
    HttpClient.newHttpClient();

HttpRequest request =
    HttpRequest.newBuilder()
        .uri(URI.create(
            "https://example.com"
        ))
        .GET()
        .build();

client.sendAsync(
        request,
        HttpResponse.BodyHandlers.ofString()
    )
    .thenApply(HttpResponse::body)
    .thenAccept(System.out::println);`,
  },
  {
    title: "18. Timeouts",
    content: (
      <>
        <p>
          Network requests can take too long or never complete
          because of server or network problems.
        </p>
        <p>
          Configure connection and request timeouts to prevent
          requests from waiting indefinitely.
        </p>
      </>
    ),
    code: `import java.time.Duration;

HttpClient client =
    HttpClient.newBuilder()
        .connectTimeout(
            Duration.ofSeconds(5)
        )
        .build();

HttpRequest request =
    HttpRequest.newBuilder()
        .uri(URI.create(
            "https://example.com"
        ))
        .timeout(
            Duration.ofSeconds(10)
        )
        .GET()
        .build();`,
  },
  {
    title: "19. Handling HTTP Errors",
    content: (
      <>
        <p>
          HTTP errors are not always Java exceptions.
          A server can return status 404 or 500 normally,
          and send the status in the response.
        </p>
        <p>
          Handle network exceptions separately from HTTP status
          codes.
        </p>
      </>
    ),
    code: `try {
    HttpResponse<String> response =
        client.send(
            request,
            HttpResponse.BodyHandlers.ofString()
        );

    if (response.statusCode() == 404) {
        System.out.println("Not found");
    } else if (response.statusCode() >= 500) {
        System.out.println("Server error");
    }

} catch (java.io.IOException e) {
    System.out.println("Network error");
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}`,
  },
  {
    title: "20. REST API Security",
    content: (
      <>
        <ul>
          <li>Use HTTPS.</li>
          <li>Authenticate protected requests.</li>
          <li>Authorize access to each resource.</li>
          <li>Validate request data on the server.</li>
          <li>Use rate limiting for sensitive endpoints.</li>
          <li>Do not expose secrets in URLs.</li>
          <li>Return safe error messages.</li>
        </ul>
        <p>
          Hiding a frontend button does not secure an API.
          The backend must enforce access rules.
        </p>
      </>
    ),
    code: `// Every protected request should consider:
//
// 1. Is the user authenticated?
// 2. Is the user authorized?
// 3. Is the input valid?
// 4. Is the request rate acceptable?
// 5. Is sensitive data protected?`,
  },
  {
    title: "21. REST API Design Mistakes",
    content: (
      <>
        <ul>
          <li>Using GET to change data.</li>
          <li>Returning 200 for every outcome.</li>
          <li>Using inconsistent resource names.</li>
          <li>Exposing database errors to clients.</li>
          <li>Ignoring authentication and authorization.</li>
          <li>Returning too much sensitive information.</li>
          <li>Not validating request bodies.</li>
        </ul>
      </>
    ),
    code: `// Better API design:
//
// GET    /api/tasks
// POST   /api/tasks
// GET    /api/tasks/5
// PATCH  /api/tasks/5
// DELETE /api/tasks/5`,
  },
  {
    title: "22. Java REST API Frameworks",
    content: (
      <>
        <p>
          Java has several frameworks for building REST APIs.
        </p>
        <ul>
          <li>Spring Boot</li>
          <li>Jakarta REST (JAX-RS)</li>
          <li>Quarkus</li>
          <li>Micronaut</li>
        </ul>
        <p>
          These frameworks help map HTTP requests to Java methods,
          validate data, manage dependencies, and produce responses.
        </p>
      </>
    ),
    code: `// Conceptual endpoint:
//
// GET /api/students/10
//
// Java handler:
// getStudentById(10)
//
// Response:
// JSON representation of the student`,
  },
  {
    title: "23. Interview Questions",
    content: (
      <>
        <ol>
          <li>What is an API?</li>
          <li>What is HTTP?</li>
          <li>What is REST?</li>
          <li>Explain GET, POST, PUT, PATCH, and DELETE.</li>
          <li>What is the difference between 401 and 403?</li>
          <li>What is JSON?</li>
          <li>What is Java HttpClient?</li>
          <li>What is the difference between send() and sendAsync()?</li>
          <li>What are HTTP headers?</li>
          <li>Why should APIs use HTTPS?</li>
          <li>What is a stateless API?</li>
          <li>How do you handle API errors?</li>
        </ol>
      </>
    ),
    code: `// Interview answer structure:
//
// Define the concept.
// Explain the request/response flow.
// Give an HTTP example.
// Explain status codes.
// Mention security and error handling.`,
  },
  {
    title: "24. Practice Tasks",
    content: (
      <>
        <ol>
          <li>Send a GET request using HttpClient.</li>
          <li>Print the response status and body.</li>
          <li>Send a POST request with JSON.</li>
          <li>Add request headers.</li>
          <li>Configure request timeouts.</li>
          <li>Handle 404 and 500 responses.</li>
          <li>Send an asynchronous request.</li>
          <li>Design REST endpoints for a student system.</li>
        </ol>
      </>
    ),
    code: `// Mini project:
//
// Java API client for a student system.
//
// Features:
// - GET student list
// - GET student by ID
// - POST new student
// - Handle status codes
// - Configure timeouts
// - Validate response data`,
  },
];

export default function JavaRestApiLesson({ onBack }) {
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
        Java REST APIs & HTTP
      </h1>

      <p
        style={{
          color: "var(--muted, #6b7280)",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        Learn HTTP communication, REST API design, Java HttpClient,
        JSON requests and responses, status codes, and API security.
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
          <li>Understand API, HTTP, and REST.</li>
          <li>Know HTTP methods and status codes.</li>
          <li>Understand JSON and request headers.</li>
          <li>Know how to use Java HttpClient.</li>
          <li>Understand synchronous and asynchronous requests.</li>
          <li>Know how to configure timeouts.</li>
          <li>Understand API authentication and authorization.</li>
          <li>Know common REST API design mistakes.</li>
        </ul>
      </section>
    </div>
  );
}
