

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
    title: "1. What is file handling?",
    content: (
      <>
        <p>
          File handling means creating, reading, writing, updating, and
          deleting files using a program.
        </p>
        <p>
          Java provides classes and APIs for working with files, folders,
          text, binary data, and streams.
        </p>
        <ul>
          <li>File: represents a file or directory path.</li>
          <li>Stream: transfers data between a source and destination.</li>
          <li>Reader/Writer: handles character-based data.</li>
          <li>InputStream/OutputStream: handles byte-based data.</li>
        </ul>
      </>
    ),
    code: `// Common packages

import java.io.*;
import java.nio.file.*;

// java.io provides many traditional
// file and stream classes.

// java.nio.file provides modern
// Path and Files APIs.`,
  },
  {
    title: "2. File class",
    content: (
      <>
        <p>
          The File class represents a pathname. It can be used to check
          file or directory information and perform certain operations.
        </p>
        <p>
          Creating a File object does not automatically create a file
          on disk.
        </p>
      </>
    ),
    code: `import java.io.File;

File file = new File("data.txt");

System.out.println(file.exists());
System.out.println(file.getName());
System.out.println(file.getAbsolutePath());
System.out.println(file.length());`,
  },
  {
    title: "3. Creating a file",
    content: (
      <>
        <p>
          The createNewFile() method creates a new empty file if it does
          not already exist.
        </p>
        <p>
          It returns true when a new file is created and false when
          the file already exists.
        </p>
        <p>
          File operations can fail, so handle IOException.
        </p>
      </>
    ),
    code: `import java.io.File;
import java.io.IOException;

File file = new File("data.txt");

try {
    boolean created = file.createNewFile();

    if (created) {
        System.out.println("Created");
    } else {
        System.out.println("Already exists");
    }
} catch (IOException e) {
    System.out.println("File creation failed");
}`,
  },
  {
    title: "4. Creating directories",
    content: (
      <>
        <p>
          File provides mkdir() and mkdirs() for creating directories.
        </p>
        <ul>
          <li>mkdir(): creates one directory.</li>
          <li>mkdirs(): creates missing parent directories too.</li>
        </ul>
        <p>
          For modern Java code, Path and Files are generally preferred
          for many file operations.
        </p>
      </>
    ),
    code: `import java.io.File;

File folder = new File("myFolder");

boolean created = folder.mkdir();

File nested = new File("parent/child");

boolean nestedCreated = nested.mkdirs();`,
  },
  {
    title: "5. Checking file information",
    content: (
      <>
        <p>
          The File class provides methods to inspect a path.
        </p>
        <ul>
          <li>exists(): checks whether the path exists.</li>
          <li>isFile(): checks whether it is a regular file.</li>
          <li>isDirectory(): checks whether it is a directory.</li>
          <li>canRead(): checks whether it is readable.</li>
          <li>canWrite(): checks whether it is writable.</li>
          <li>getName(): returns the final path name.</li>
        </ul>
      </>
    ),
    code: `File file = new File("data.txt");

if (file.exists()) {
    System.out.println(file.isFile());
    System.out.println(file.isDirectory());
    System.out.println(file.canRead());
    System.out.println(file.canWrite());
}`,
  },
  {
    title: "6. Writing text using FileWriter",
    content: (
      <>
        <p>
          FileWriter writes character data to a file.
        </p>
        <p>
          By default, FileWriter overwrites an existing file.
          Use the append option to add content at the end.
        </p>
        <p>
          Use try-with-resources so the writer closes automatically.
        </p>
      </>
    ),
    code: `import java.io.FileWriter;
import java.io.IOException;

try (FileWriter writer =
        new FileWriter("data.txt")) {

    writer.write("Hello Java");
    writer.write("\\n");
    writer.write("File handling");

} catch (IOException e) {
    System.out.println("Writing failed");
}`,
  },
  {
    title: "7. Appending text",
    content: (
      <>
        <p>
          To append instead of overwrite, pass true as the second
          argument to FileWriter.
        </p>
        <p>
          Appending is useful for logs or adding new lines to a file.
        </p>
      </>
    ),
    code: `try (FileWriter writer =
        new FileWriter("data.txt", true)) {

    writer.write("\\nNew content");

} catch (IOException e) {
    System.out.println("Append failed");
}`,
  },
  {
    title: "8. Reading text using FileReader",
    content: (
      <>
        <p>
          FileReader reads character data from a file.
        </p>
        <p>
          Reading one character at a time is simple but may be inefficient
          for large files. BufferedReader is often more convenient.
        </p>
        <p>
          The read() method returns an integer. It returns -1 when the
          end of the stream is reached.
        </p>
      </>
    ),
    code: `import java.io.FileReader;
import java.io.IOException;

try (FileReader reader =
        new FileReader("data.txt")) {

    int ch;

    while ((ch = reader.read()) != -1) {
        System.out.print((char) ch);
    }

} catch (IOException e) {
    System.out.println("Reading failed");
}`,
  },
  {
    title: "9. BufferedReader",
    content: (
      <>
        <p>
          BufferedReader reads text efficiently using a buffer.
        </p>
        <p>
          readLine() reads one line and returns null when the end of
          the file is reached.
        </p>
        <p>
          It is commonly used for reading text files line by line.
        </p>
      </>
    ),
    code: `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

try (BufferedReader reader =
        new BufferedReader(
            new FileReader("data.txt")
        )) {

    String line;

    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }

} catch (IOException e) {
    System.out.println("Read error");
}`,
  },
  {
    title: "10. BufferedWriter",
    content: (
      <>
        <p>
          BufferedWriter writes text efficiently by collecting characters
          in a buffer before sending them to the underlying writer.
        </p>
        <p>
          Use newLine() to write the platform's line separator.
        </p>
        <p>
          Closing the writer flushes buffered content.
        </p>
      </>
    ),
    code: `import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

try (BufferedWriter writer =
        new BufferedWriter(
            new FileWriter("data.txt")
        )) {

    writer.write("First line");
    writer.newLine();
    writer.write("Second line");

} catch (IOException e) {
    System.out.println("Write error");
}`,
  },
  {
    title: "11. Byte streams",
    content: (
      <>
        <p>
          InputStream and OutputStream are used for byte-based data.
        </p>
        <p>
          They are suitable for binary files such as images, PDFs,
          audio, and other non-text data.
        </p>
        <ul>
          <li>FileInputStream reads bytes.</li>
          <li>FileOutputStream writes bytes.</li>
        </ul>
        <p>
          Do not use character readers to copy arbitrary binary files.
        </p>
      </>
    ),
    code: `import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

try (
    FileInputStream in =
        new FileInputStream("input.bin");
    FileOutputStream out =
        new FileOutputStream("output.bin")
) {
    int data;

    while ((data = in.read()) != -1) {
        out.write(data);
    }

} catch (IOException e) {
    System.out.println("Copy failed");
}`,
  },
  {
    title: "12. Buffered byte streams",
    content: (
      <>
        <p>
          BufferedInputStream and BufferedOutputStream reduce the number
          of direct interactions with the underlying data source.
        </p>
        <p>
          They are useful when copying larger files.
        </p>
        <p>
          For modern file copying, Files.copy() is often simpler.
        </p>
      </>
    ),
    code: `import java.io.*;

try (
    BufferedInputStream in =
        new BufferedInputStream(
            new FileInputStream("input.bin")
        );
    BufferedOutputStream out =
        new BufferedOutputStream(
            new FileOutputStream("output.bin")
        )
) {
    byte[] buffer = new byte[8192];
    int count;

    while ((count = in.read(buffer)) != -1) {
        out.write(buffer, 0, count);
    }

} catch (IOException e) {
    System.out.println("Copy error");
}`,
  },
  {
    title: "13. Modern Path and Files API",
    content: (
      <>
        <p>
          Java NIO provides Path and Files for modern file operations.
        </p>
        <p>
          Path represents a file system path. Files provides static
          methods for reading, writing, copying, moving, and checking paths.
        </p>
        <p>
          These APIs are often more concise than older File-based code.
        </p>
      </>
    ),
    code: `import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;

Path path = Paths.get("data.txt");

System.out.println(Files.exists(path));
System.out.println(Files.isRegularFile(path));
System.out.println(Files.size(path));`,
  },
  {
    title: "14. Writing with Files.writeString",
    content: (
      <>
        <p>
          Files.writeString() writes text to a file.
        </p>
        <p>
          If the file does not exist, it can create it. By default,
          writing replaces existing content.
        </p>
        <p>
          Use StandardOpenOption.APPEND to append text.
        </p>
      </>
    ),
    code: `import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;

Path path = Path.of("data.txt");

try {
    Files.writeString(path, "Hello Java");
} catch (IOException e) {
    System.out.println("Write failed");
}`,
  },
  {
    title: "15. Reading with Files.readString",
    content: (
      <>
        <p>
          Files.readString() reads the file's text content into a String.
        </p>
        <p>
          This is convenient for small or reasonably sized text files.
          It loads the content into memory, so avoid it for huge files.
        </p>
      </>
    ),
    code: `import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;

Path path = Path.of("data.txt");

try {
    String content = Files.readString(path);
    System.out.println(content);
} catch (IOException e) {
    System.out.println("Read failed");
}`,
  },
  {
    title: "16. Copying and moving files",
    content: (
      <>
        <p>
          Files.copy() copies a file. Files.move() moves or renames a path.
        </p>
        <p>
          Use StandardCopyOption.REPLACE_EXISTING when replacing an
          existing destination is intended.
        </p>
        <p>
          File operations can fail due to permissions, missing paths,
          or file system restrictions.
        </p>
      </>
    ),
    code: `import java.nio.file.*;

Path source = Path.of("source.txt");
Path target = Path.of("backup.txt");

try {
    Files.copy(
        source,
        target,
        StandardCopyOption.REPLACE_EXISTING
    );

    Files.move(
        target,
        Path.of("renamed.txt"),
        StandardCopyOption.REPLACE_EXISTING
    );

} catch (IOException e) {
    System.out.println("File operation failed");
}`,
  },
  {
    title: "17. Deleting files",
    content: (
      <>
        <p>
          Files.delete() throws an exception if the path does not exist
          or cannot be deleted.
        </p>
        <p>
          Files.deleteIfExists() returns true if a file was deleted
          and false if it did not exist.
        </p>
        <p>
          Be careful when deleting files. Verify the path before performing
          destructive operations.
        </p>
      </>
    ),
    code: `import java.nio.file.*;

Path path = Path.of("old.txt");

try {
    boolean deleted = Files.deleteIfExists(path);
    System.out.println(deleted);
} catch (IOException e) {
    System.out.println("Delete failed");
}`,
  },
  {
    title: "18. Listing directory contents",
    content: (
      <>
        <p>
          Files.list() returns a stream of paths in a directory.
        </p>
        <p>
          The returned stream must be closed. Use try-with-resources.
        </p>
        <p>
          Directory listing order is not guaranteed.
        </p>
      </>
    ),
    code: `import java.nio.file.*;
import java.io.IOException;

Path folder = Path.of(".");

try (var paths = Files.list(folder)) {
    paths.forEach(System.out::println);
} catch (IOException e) {
    System.out.println("List failed");
}`,
  },
  {
    title: "19. Serialization basics",
    content: (
      <>
        <p>
          Serialization converts an object's state into a byte stream.
          Deserialization reconstructs an object from that stream.
        </p>
        <p>
          A class commonly implements Serializable to allow its objects
          to be serialized.
        </p>
        <p>
          Serialization is not a safe format for untrusted input.
          Deserializing untrusted data can create serious security risks.
        </p>
      </>
    ),
    code: `import java.io.Serializable;

class Student implements Serializable {
    private static final long serialVersionUID = 1L;

    String name;
    int age;
}`,
  },
  {
    title: "20. ObjectOutputStream",
    content: (
      <>
        <p>
          ObjectOutputStream writes objects to an output stream.
        </p>
        <p>
          The object must be serializable, including its non-transient
          object fields.
        </p>
        <p>
          Use ObjectInputStream to read serialized objects.
        </p>
      </>
    ),
    code: `import java.io.*;

Student student = new Student();
student.name = "Ravi";
student.age = 19;

try (
    ObjectOutputStream out =
        new ObjectOutputStream(
            new FileOutputStream("student.dat")
        )
) {
    out.writeObject(student);
} catch (IOException e) {
    System.out.println("Serialization failed");
}`,
  },
  {
    title: "21. transient and serialVersionUID",
    content: (
      <>
        <p>
          The transient keyword prevents a field from being serialized
          through default serialization.
        </p>
        <p>
          serialVersionUID identifies the version of a serializable class
          for compatibility checks.
        </p>
        <p>
          Do not serialize passwords, secrets, or sensitive data casually.
        </p>
      </>
    ),
    code: `class User implements Serializable {
    private static final long serialVersionUID = 1L;

    String username;
    transient String password;
}`,
  },
  {
    title: "22. Character encoding",
    content: (
      <>
        <p>
          Text files contain bytes. Character encoding defines how
          characters are represented as bytes.
        </p>
        <p>
          UTF-8 is a common encoding and is recommended for many
          text-file use cases.
        </p>
        <p>
          Specify the charset when reading or writing text if the file's
          encoding matters.
        </p>
      </>
    ),
    code: `import java.nio.charset.StandardCharsets;
import java.nio.file.*;

Path path = Path.of("data.txt");

try {
    Files.writeString(
        path,
        "Hello",
        StandardCharsets.UTF_8
    );

    String text = Files.readString(
        path,
        StandardCharsets.UTF_8
    );
} catch (IOException e) {
    System.out.println("Encoding/file error");
}`,
  },
  {
    title: "23. Common file handling mistakes",
    content: (
      <>
        <ul>
          <li>Forgetting to close streams.</li>
          <li>Not handling IOException.</li>
          <li>Using FileReader for binary files.</li>
          <li>Assuming File object creation creates a disk file.</li>
          <li>Overwriting a file when append was intended.</li>
          <li>Reading a huge file entirely into memory.</li>
          <li>Ignoring character encoding.</li>
          <li>Using unsafe paths from user input.</li>
          <li>Deserializing untrusted data.</li>
          <li>Deleting files without verifying the path.</li>
        </ul>
      </>
    ),
    code: `// Prefer:
try (BufferedReader reader =
        Files.newBufferedReader(
            Path.of("data.txt")
        )) {
    // Read safely
} catch (IOException e) {
    // Handle error
}`,
  },
  {
    title: "24. Complexity and memory",
    content: (
      <>
        <p>
          File operation performance depends on file size, storage,
          buffering, and the underlying file system.
        </p>
        <ul>
          <li>Reading a file of n bytes takes O(n) time.</li>
          <li>Reading all text into a String uses O(n) memory.</li>
          <li>Buffered processing can use O(k) extra memory for buffer size k.</li>
          <li>Copying a file requires processing its contents.</li>
        </ul>
        <p>
          For large files, process data in chunks or line by line rather
          than loading everything into memory.
        </p>
      </>
    ),
    code: `// Whole file:
// String text = Files.readString(path);
// Memory: O(n)

// Buffered reading:
// Read one line or chunk at a time
// Extra memory: depends on buffer
// and the current line/chunk size`,
  },
  {
    title: "25. Practice problems",
    content: (
      <>
        <ol>
          <li>Create a file and check whether it exists.</li>
          <li>Write student details to a text file.</li>
          <li>Append a new line to an existing file.</li>
          <li>Read a file line by line.</li>
          <li>Count the number of lines in a file.</li>
          <li>Copy a text file to another location.</li>
          <li>List all files in a directory.</li>
          <li>Delete a file only if it exists.</li>
          <li>Copy a binary file using buffered streams.</li>
          <li>Serialize and deserialize a simple Student object.</li>
        </ol>
      </>
    ),
    code: `// Count lines

int count = 0;

try (BufferedReader reader =
        Files.newBufferedReader(
            Path.of("data.txt")
        )) {

    while (reader.readLine() != null) {
        count++;
    }

} catch (IOException e) {
    System.out.println("Read failed");
}

System.out.println(count);`,
  },
  {
    title: "26. Interview questions",
    content: (
      <>
        <ol>
          <li>What is file handling?</li>
          <li>What is the difference between File and Path?</li>
          <li>FileReader vs FileInputStream?</li>
          <li>What is the difference between byte and character streams?</li>
          <li>Why use BufferedReader?</li>
          <li>What is try-with-resources?</li>
          <li>What is the difference between write and append?</li>
          <li>What is the Files class?</li>
          <li>What is serialization?</li>
          <li>What is transient?</li>
          <li>What is serialVersionUID?</li>
          <li>Why is deserializing untrusted data dangerous?</li>
          <li>Why is UTF-8 important?</li>
          <li>How do you process a large file efficiently?</li>
        </ol>
      </>
    ),
    code: `// Remember:
// File / Path -> represent locations
// InputStream -> bytes in
// OutputStream -> bytes out
// Reader -> characters in
// Writer -> characters out
// try-with-resources -> automatic close`,
  },
];

export default function FileHandlingLesson({ onBack }) {
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
        Java File Handling
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn file and directory operations, text and byte streams,
        buffered reading, modern NIO APIs, serialization, and safe
        resource management.
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
          <li>I can create and inspect files and directories.</li>
          <li>I can read and write text files.</li>
          <li>I understand byte streams and character streams.</li>
          <li>I can use buffering for file processing.</li>
          <li>I understand Path and Files.</li>
          <li>I can copy, move, and delete files safely.</li>
          <li>I understand serialization basics and its risks.</li>
          <li>I can handle IOException and close resources.</li>
          <li>I can solve the practice problems independently.</li>
        </ul>
      </section>
    </div>
  );
}
