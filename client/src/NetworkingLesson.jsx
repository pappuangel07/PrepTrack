

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
    title: "1. What is computer networking?",
    content: (
      <>
        <p>
          Computer networking allows devices to communicate and exchange
          data through wired or wireless connections.
        </p>
        <p>
          Java provides APIs for building network applications such as
          chat programs, client-server systems, and web clients.
        </p>
        <ul>
          <li>Client: requests a service.</li>
          <li>Server: provides a service.</li>
          <li>Protocol: defines communication rules.</li>
          <li>Packet: a unit of data transmitted over a network.</li>
        </ul>
      </>
    ),
    code: `// Example communication:

// Java client
//      |
//      v
// Network
//      |
//      v
// Java server

// Client sends request.
// Server processes request.
// Server sends response.`,
  },
  {
    title: "2. IP address",
    content: (
      <>
        <p>
          An IP address identifies a network interface or endpoint
          for communication using the Internet Protocol.
        </p>
        <ul>
          <li>IPv4 uses 32 bits.</li>
          <li>IPv6 uses 128 bits.</li>
          <li>127.0.0.1 is the IPv4 loopback address.</li>
          <li>::1 is the IPv6 loopback address.</li>
        </ul>
        <p>
          Loopback addresses refer to the local machine.
        </p>
      </>
    ),
    code: `import java.net.InetAddress;

InetAddress address =
    InetAddress.getLoopbackAddress();

System.out.println(address);
System.out.println(address.getHostAddress());`,
  },
  {
    title: "3. Port number",
    content: (
      <>
        <p>
          A port identifies a communication endpoint on a host.
          IP address identifies the host or interface; the port
          identifies the application endpoint.
        </p>
        <p>
          TCP and UDP port numbers range from 0 to 65535.
        </p>
        <ul>
          <li>0–1023: well-known ports.</li>
          <li>1024–49151: registered ports.</li>
          <li>49152–65535: commonly used dynamic/private ports.</li>
        </ul>
      </>
    ),
    code: `// Common ports:
HTTP  -> 80
HTTPS -> 443
SSH   -> 22
DNS   -> 53
MySQL -> 3306

// A Java server must bind to
// an available local port.`,
  },
  {
    title: "4. TCP vs UDP",
    content: (
      <>
        <p>
          TCP and UDP are transport-layer protocols.
        </p>
        <ul>
          <li>TCP: connection-oriented and reliable byte stream.</li>
          <li>UDP: connectionless datagrams with no delivery guarantee.</li>
        </ul>
        <p>
          TCP provides ordered delivery and retransmission mechanisms.
          UDP has lower protocol overhead but applications must handle
          reliability themselves if required.
        </p>
      </>
    ),
    code: `// TCP examples:
// Web browsing, file transfer,
// database connections.

// UDP examples:
// DNS queries, live media,
// some multiplayer game traffic.

// Choose based on requirements,
// not simply "TCP is always better."`,
  },
  {
    title: "5. Socket programming",
    content: (
      <>
        <p>
          A socket is an endpoint used for network communication.
        </p>
        <p>
          Java provides Socket for TCP clients and ServerSocket
          for accepting TCP connections.
        </p>
        <p>
          A TCP connection is identified by the endpoints involved,
          including their IP addresses and port numbers.
        </p>
      </>
    ),
    code: `import java.net.Socket;

// Connect to a server:
Socket socket = new Socket(
    "localhost",
    5000
);

// Use socket streams to exchange data.
// Close the socket when finished.`,
  },
  {
    title: "6. ServerSocket",
    content: (
      <>
        <p>
          ServerSocket listens for incoming TCP connection requests.
        </p>
        <p>
          accept() blocks until a client connects, then returns
          a Socket for communication with that client.
        </p>
      </>
    ),
    code: `import java.net.ServerSocket;
import java.net.Socket;
import java.io.IOException;

try (ServerSocket server =
        new ServerSocket(5000)) {

    System.out.println("Waiting for client");

    try (Socket client = server.accept()) {
        System.out.println("Client connected");
    }

} catch (IOException e) {
    e.printStackTrace();
}`,
  },
  {
    title: "7. TCP client",
    content: (
      <>
        <p>
          A TCP client creates a Socket using the server's host
          and port.
        </p>
        <p>
          After the connection is established, the client can use
          input and output streams to exchange bytes.
        </p>
      </>
    ),
    code: `import java.net.Socket;
import java.io.IOException;

try (Socket socket =
        new Socket("localhost", 5000)) {

    System.out.println("Connected");

} catch (IOException e) {
    System.out.println("Connection failed");
}`,
  },
  {
    title: "8. Sending text through a socket",
    content: (
      <>
        <p>
          Socket provides input and output streams.
          For text communication, wrap them in readers and writers.
        </p>
        <p>
          Use a defined character encoding such as UTF-8.
          The client and server must agree on the message format.
        </p>
      </>
    ),
    code: `import java.net.Socket;
import java.io.*;
import java.nio.charset.StandardCharsets;

try (Socket socket =
        new Socket("localhost", 5000);
     BufferedWriter writer =
        new BufferedWriter(
            new OutputStreamWriter(
                socket.getOutputStream(),
                StandardCharsets.UTF_8
            )
        )) {

    writer.write("Hello server");
    writer.newLine();
    writer.flush();
}`,
  },
  {
    title: "9. Receiving text through a socket",
    content: (
      <>
        <p>
          BufferedReader can read text from a socket.
        </p>
        <p>
          readLine() waits until a line is available or the stream
          reaches end-of-stream.
        </p>
        <p>
          A protocol must define how messages end. For example,
          newline-delimited messages use a newline as the delimiter.
        </p>
      </>
    ),
    code: `import java.net.Socket;
import java.io.*;
import java.nio.charset.StandardCharsets;

try (Socket socket =
        new Socket("localhost", 5000);
     BufferedReader reader =
        new BufferedReader(
            new InputStreamReader(
                socket.getInputStream(),
                StandardCharsets.UTF_8
            )
        )) {

    String response = reader.readLine();
    System.out.println(response);
}`,
  },
  {
    title: "10. Complete TCP echo server",
    content: (
      <>
        <p>
          An echo server sends back the message it receives.
          This example handles one client at a time.
        </p>
        <p>
          Run the server first, then run the client.
        </p>
      </>
    ),
    code: `import java.net.*;
import java.io.*;
import java.nio.charset.StandardCharsets;

public class EchoServer {
    public static void main(String[] args)
            throws IOException {

        try (ServerSocket server =
                new ServerSocket(5000)) {

            System.out.println("Server started");

            try (Socket client = server.accept();
                 BufferedReader reader =
                    new BufferedReader(
                        new InputStreamReader(
                            client.getInputStream(),
                            StandardCharsets.UTF_8
                        )
                    );
                 BufferedWriter writer =
                    new BufferedWriter(
                        new OutputStreamWriter(
                            client.getOutputStream(),
                            StandardCharsets.UTF_8
                        )
                    )) {

                String message = reader.readLine();

                writer.write("Echo: " + message);
                writer.newLine();
                writer.flush();
            }
        }
    }
}`,
  },
  {
    title: "11. Complete TCP echo client",
    content: (
      <>
        <p>
          The client connects to the echo server, sends one line,
          and reads the response.
        </p>
        <p>
          This client expects the server to use the same
          newline-delimited message protocol.
        </p>
      </>
    ),
    code: `import java.net.*;
import java.io.*;
import java.nio.charset.StandardCharsets;

public class EchoClient {
    public static void main(String[] args)
            throws IOException {

        try (Socket socket =
                new Socket("localhost", 5000);
             BufferedReader reader =
                new BufferedReader(
                    new InputStreamReader(
                        socket.getInputStream(),
                        StandardCharsets.UTF_8
                    )
                );
             BufferedWriter writer =
                new BufferedWriter(
                    new OutputStreamWriter(
                        socket.getOutputStream(),
                        StandardCharsets.UTF_8
                    )
                )) {

            writer.write("Hello");
            writer.newLine();
            writer.flush();

            System.out.println(reader.readLine());
        }
    }
}`,
  },
  {
    title: "12. UDP communication",
    content: (
      <>
        <p>
          UDP sends independent datagrams rather than establishing
          a TCP connection.
        </p>
        <p>
          Java provides DatagramSocket and DatagramPacket.
        </p>
        <ul>
          <li>DatagramSocket sends and receives packets.</li>
          <li>DatagramPacket stores packet data and addressing information.</li>
        </ul>
      </>
    ),
    code: `import java.net.*;
import java.nio.charset.StandardCharsets;

byte[] data =
    "Hello".getBytes(StandardCharsets.UTF_8);

InetAddress address =
    InetAddress.getByName("localhost");

DatagramPacket packet =
    new DatagramPacket(
        data,
        data.length,
        address,
        5000
    );

try (DatagramSocket socket =
        new DatagramSocket()) {

    socket.send(packet);
}`,
  },
  {
    title: "13. UDP receiver",
    content: (
      <>
        <p>
          A UDP receiver binds a DatagramSocket to a port and waits
          for datagrams.
        </p>
        <p>
          The receive() method blocks until a packet arrives.
          The buffer size limits how much packet data can be received.
        </p>
      </>
    ),
    code: `import java.net.*;
import java.nio.charset.StandardCharsets;

byte[] buffer = new byte[1024];

try (DatagramSocket socket =
        new DatagramSocket(5000)) {

    DatagramPacket packet =
        new DatagramPacket(
            buffer,
            buffer.length
        );

    socket.receive(packet);

    String message = new String(
        packet.getData(),
        packet.getOffset(),
        packet.getLength(),
        StandardCharsets.UTF_8
    );

    System.out.println(message);
}`,
  },
  {
    title: "14. InetAddress and DNS",
    content: (
      <>
        <p>
          InetAddress represents an IP address and can perform
          hostname resolution.
        </p>
        <p>
          DNS maps domain names to IP addresses.
        </p>
        <p>
          DNS results may be cached. Network resolution can fail
          or return multiple addresses.
        </p>
      </>
    ),
    code: `import java.net.InetAddress;
import java.net.UnknownHostException;

try {
    InetAddress address =
        InetAddress.getByName("example.com");

    System.out.println(address.getHostAddress());

} catch (UnknownHostException e) {
    System.out.println("Host not found");
}`,
  },
  {
    title: "15. URL and URI",
    content: (
      <>
        <p>
          URI represents a resource identifier.
          URL represents a resource locator.
        </p>
        <p>
          URI is useful for parsing and validating resource
          identifiers. URL is used when working with locations
          that can be opened.
        </p>
      </>
    ),
    code: `import java.net.URI;
import java.net.URL;

URI uri = URI.create(
    "https://example.com/docs"
);

URL url = uri.toURL();

System.out.println(uri.getScheme());
System.out.println(uri.getHost());
System.out.println(uri.getPath());`,
  },
  {
    title: "16. HTTP basics",
    content: (
      <>
        <p>
          HTTP is an application-layer protocol used for
          communication between clients and web servers.
        </p>
        <p>Common HTTP methods:</p>
        <ul>
          <li>GET: retrieve a resource.</li>
          <li>POST: submit data or create a resource.</li>
          <li>PUT: replace a resource representation.</li>
          <li>PATCH: partially update a resource.</li>
          <li>DELETE: remove a resource.</li>
        </ul>
        <p>
          HTTPS is HTTP secured using TLS.
        </p>
      </>
    ),
    code: `// HTTP request structure:

GET /students HTTP/1.1
Host: example.com

// HTTP response includes:
// status line
// headers
// optional response body`,
  },
  {
    title: "17. HTTP status codes",
    content: (
      <>
        <p>Important status code groups:</p>
        <ul>
          <li>1xx: informational.</li>
          <li>2xx: success.</li>
          <li>3xx: redirection.</li>
          <li>4xx: client error.</li>
          <li>5xx: server error.</li>
        </ul>
        <p>Common examples:</p>
        <ul>
          <li>200 OK</li>
          <li>201 Created</li>
          <li>400 Bad Request</li>
          <li>401 Unauthorized</li>
          <li>403 Forbidden</li>
          <li>404 Not Found</li>
          <li>500 Internal Server Error</li>
        </ul>
      </>
    ),
    code: `// Always inspect the status code
// before assuming an HTTP request
// succeeded.

int statusCode = response.statusCode();`,
  },
  {
    title: "18. Java HttpClient",
    content: (
      <>
        <p>
          Java 11 introduced the standard HttpClient API in
          java.net.http.
        </p>
        <p>
          It supports synchronous and asynchronous HTTP requests.
          It can be used to call REST APIs.
        </p>
      </>
    ),
    code: `import java.net.URI;
import java.net.http.*;

HttpClient client =
    HttpClient.newHttpClient();

HttpRequest request =
    HttpRequest.newBuilder()
        .uri(URI.create("https://example.com"))
        .GET()
        .build();

HttpResponse<String> response =
    client.send(
        request,
        HttpResponse.BodyHandlers.ofString()
    );

System.out.println(response.statusCode());
System.out.println(response.body());`,
  },
  {
    title: "19. Handling HTTP errors",
    content: (
      <>
        <p>
          HttpClient.send() can throw IOException or
          InterruptedException.
        </p>
        <p>
          A response with status 404 or 500 is still a valid
          HTTP response. Check the status code separately.
        </p>
      </>
    ),
    code: `try {
    HttpResponse<String> response =
        client.send(
            request,
            HttpResponse.BodyHandlers.ofString()
        );

    if (response.statusCode() >= 200
            && response.statusCode() < 300) {
        System.out.println("Success");
    } else {
        System.out.println("HTTP error");
    }

} catch (IOException e) {
    System.out.println("Network error");
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}`,
  },
  {
    title: "20. Asynchronous HTTP",
    content: (
      <>
        <p>
          sendAsync() returns a CompletableFuture.
          It allows the caller to continue without waiting
          synchronously for the response.
        </p>
        <p>
          Asynchronous does not mean the operation is guaranteed
          to finish successfully.
        </p>
      </>
    ),
    code: `HttpClient client =
    HttpClient.newHttpClient();

HttpRequest request =
    HttpRequest.newBuilder()
        .uri(URI.create("https://example.com"))
        .GET()
        .build();

client.sendAsync(
    request,
    HttpResponse.BodyHandlers.ofString()
).thenApply(HttpResponse::body)
 .thenAccept(System.out::println)
 .exceptionally(error -> {
     System.out.println("Request failed");
     return null;
 });`,
  },
  {
    title: "21. Socket timeout",
    content: (
      <>
        <p>
          Network operations can block for a long time.
          Timeouts prevent applications from waiting indefinitely.
        </p>
        <p>
          Socket supports connect and read timeouts.
          HttpClient supports request timeouts.
        </p>
      </>
    ),
    code: `import java.net.*;
import java.time.Duration;
import java.net.http.*;

Socket socket = new Socket();

socket.connect(
    new InetSocketAddress("localhost", 5000),
    3000
);

socket.setSoTimeout(5000);

// For HttpClient:
HttpRequest request =
    HttpRequest.newBuilder()
        .uri(URI.create("https://example.com"))
        .timeout(Duration.ofSeconds(5))
        .GET()
        .build();`,
  },
  {
    title: "22. Client-server architecture",
    content: (
      <>
        <p>
          In client-server architecture, clients request services
          from servers.
        </p>
        <p>
          A server may handle multiple clients concurrently.
          A simple server that calls accept() and processes each
          client before accepting the next is sequential.
        </p>
        <p>
          For many clients, use a thread pool or an appropriate
          asynchronous design.
        </p>
      </>
    ),
    code: `// Basic server structure:

while (true) {
    Socket client = server.accept();

    // Handle client
    // Sequential handling means
    // one slow client can block others.
}

// Better for multiple clients:
// submit client handling to
// an ExecutorService.`,
  },
  {
    title: "23. Multi-client server with thread pool",
    content: (
      <>
        <p>
          ExecutorService can handle multiple connected clients
          using a pool of worker threads.
        </p>
        <p>
          The server should close each client socket after its
          request is completed.
        </p>
      </>
    ),
    code: `import java.net.*;
import java.io.*;
import java.util.concurrent.*;

ExecutorService pool =
    Executors.newFixedThreadPool(10);

ServerSocket server =
    new ServerSocket(5000);

while (true) {
    Socket client = server.accept();

    pool.submit(() -> {
        try (client) {
            // Handle client request
        } catch (IOException e) {
            e.printStackTrace();
        }
    });
}`,
  },
  {
    title: "24. Network security basics",
    content: (
      <>
        <ul>
          <li>Use HTTPS for sensitive HTTP communication.</li>
          <li>Do not transmit passwords in plain text.</li>
          <li>Validate data received from clients.</li>
          <li>Do not trust client-side validation alone.</li>
          <li>Set appropriate timeouts.</li>
          <li>Limit message and upload sizes.</li>
          <li>Handle malformed packets and requests.</li>
          <li>Do not expose internal error details to clients.</li>
        </ul>
        <p>
          Encryption protects data in transit, but applications
          still need authentication, authorization, and validation.
        </p>
      </>
    ),
    code: `// HTTPS provides TLS protection.
// It does not automatically provide:
// - user authentication
// - authorization
// - input validation
// - secure database queries`,
  },
  {
    title: "25. Common networking exceptions",
    content: (
      <>
        <ul>
          <li>IOException: general I/O failure.</li>
          <li>UnknownHostException: hostname could not be resolved.</li>
          <li>ConnectException: connection failed or was refused.</li>
          <li>SocketTimeoutException: socket operation timed out.</li>
          <li>BindException: address or port could not be bound.</li>
        </ul>
        <p>
          Diagnose the actual cause. A connection failure may be
          caused by an unavailable server, wrong port, firewall,
          DNS problem, or network issue.
        </p>
      </>
    ),
    code: `try {
    // Network operation
} catch (UnknownHostException e) {
    System.out.println("DNS problem");
} catch (SocketTimeoutException e) {
    System.out.println("Timed out");
} catch (IOException e) {
    System.out.println("Network I/O error");
}`,
  },
  {
    title: "26. Practice problems",
    content: (
      <>
        <ol>
          <li>Print the local loopback IP address.</li>
          <li>Create a TCP server that accepts one client.</li>
          <li>Create a TCP client that sends a message.</li>
          <li>Build an echo server and client.</li>
          <li>Build a simple chat server for two clients.</li>
          <li>Send a UDP datagram to a receiver.</li>
          <li>Resolve a domain name to an IP address.</li>
          <li>Call a public REST API using HttpClient.</li>
          <li>Handle HTTP status codes properly.</li>
          <li>Add a timeout to a network request.</li>
          <li>Handle multiple clients using a thread pool.</li>
        </ol>
      </>
    ),
    code: `// Mini project:
// Java Client-Server Chat

// Features:
// 1. Server listens on a port
// 2. Client connects
// 3. Client sends messages
// 4. Server responds
// 5. Handle disconnects
// 6. Support multiple clients`,
  },
  {
    title: "27. Interview questions",
    content: (
      <>
        <ol>
          <li>What is a socket?</li>
          <li>What is an IP address?</li>
          <li>What is a port number?</li>
          <li>TCP vs UDP?</li>
          <li>What is ServerSocket?</li>
          <li>What does accept() do?</li>
          <li>What is InetAddress?</li>
          <li>What is DNS?</li>
          <li>What is the difference between URI and URL?</li>
          <li>What is HTTP and HTTPS?</li>
          <li>What are HTTP methods and status codes?</li>
          <li>How does Java HttpClient work?</li>
          <li>What is the difference between send() and sendAsync()?</li>
          <li>What is a socket timeout?</li>
          <li>How can a server handle multiple clients?</li>
          <li>What is the difference between sequential and concurrent servers?</li>
          <li>What is TLS?</li>
        </ol>
      </>
    ),
    code: `// Quick revision:
IP address -> identifies network endpoint
Port -> identifies application endpoint
TCP -> reliable ordered byte stream
UDP -> datagram transport
Socket -> communication endpoint
ServerSocket -> accepts TCP clients
HttpClient -> Java HTTP API
HTTPS -> HTTP secured with TLS`,
  },
];

export default function NetworkingLesson({ onBack }) {
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
        Java Networking
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn network communication in Java using TCP, UDP, sockets,
        HTTP clients, and client-server architecture.
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
          <li>I understand IP addresses, ports, TCP, and UDP.</li>
          <li>I can create a TCP client and server.</li>
          <li>I can send and receive text through sockets.</li>
          <li>I understand UDP datagrams.</li>
          <li>I can use InetAddress, URI, and URL.</li>
          <li>I can make HTTP requests using HttpClient.</li>
          <li>I can handle status codes, exceptions, and timeouts.</li>
          <li>I understand how servers handle multiple clients.</li>
          <li>I know basic network security practices.</li>
          <li>I can solve the practice problems independently.</li>
        </ul>
      </section>
    </div>
  );
}
