
import { useState } from 'react';

const sections = [
  { id: 'intro', label: 'Introduction' },
  { id: 'internals', label: 'String Internals' },
  { id: 'operations', label: 'Operations' },
  { id: 'complexity', label: 'Complexity' },
  { id: 'java', label: 'Java Implementations' },
  { id: 'patterns', label: 'Problem Patterns' },
  { id: 'algorithms', label: 'Advanced Algorithms' },
  { id: 'edge-cases', label: 'Edge Cases' },
  { id: 'practice', label: 'Practice Problems' },
  { id: 'interview', label: 'Interview Questions' },
];

function CodeExample({ children }) {
  return (
    <pre className="dsa-code">
      <code>{children}</code>
    </pre>
  );
}

function StringsLesson({ onBack }) {
  const [activeSection, setActiveSection] = useState('intro');
  const [completedSections, setCompletedSections] = useState([]);
  const [expandedProblems, setExpandedProblems] = useState([]);

  const progress = Math.round(
    (completedSections.length / sections.length) * 100
  );

  function toggleSection(id) {
    setCompletedSections((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function toggleProblem(name) {
    setExpandedProblems((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  }

  return (
    <section className="dsa-lesson"><button
        type="button"
        className="secondary-button"
        onClick={onBack}
      >
        ← Back to DSA Topics
      </button>

      <header className="dsa-lesson-header">
        <p className="java-eyebrow">DSA LEARNING HUB · STRINGS</p>
        <h1>Strings – Complete Learning Guide</h1>
        <p>
          Master Java Strings from fundamentals to advanced algorithms,
          coding patterns and technical interviews.
        </p>

        <div className="dsa-lesson-progress">
          <div className="dsa-lesson-progress-info">
            <strong>{progress}% completed</strong>
            <span>
              {completedSections.length} of {sections.length} sections
            </span>
          </div>
          <div className="dsa-progress-track">
            <div
              className="dsa-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <nav className="dsa-lesson-nav">
        {sections.map((section) => (
          <button
            type="button"
            key={section.id}
            className={
              activeSection === section.id ? 'active' : ''
            }
            onClick={() => {
              setActiveSection(section.id);
              document.getElementById(section.id)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <main className="dsa-lesson-content">
        <article id="intro" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 1 · BEGINNER</p>
          <h2>1. Introduction to Strings</h2>

          <h3>What is a String?</h3>
          <p>
            A String is a sequence of characters used to represent
            text. Examples include names, sentences, passwords,
            email addresses and messages.
          </p>

          <CodeExample>{`String name = "Angel";
String language = "Java";
String message = "Welcome to DSA";`}</CodeExample>

          <h3>How are Strings represented in Java?</h3>
          <p>
            Java provides the built-in String class in the
            java.lang package. String objects store textual data
            and provide methods to search, compare, extract and
            transform text.
          </p>

          <h3>String vs Character</h3>
          <CodeExample>{`char letter = 'A';
String word = "APPLE";`}</CodeExample>

          <ul>
            <li><strong>char:</strong> Represents one UTF-16 code unit in Java.</li>
            <li><strong>String:</strong> Represents a sequence of UTF-16 code units.</li>
            <li>A character literal uses single quotes.</li>
            <li>A String literal uses double quotes.</li>
          </ul>

          <h3>Creating Strings</h3>
          <p>There are two commonly taught ways to create Strings.</p>

          <CodeExample>{`// 1. String literal
String first = "Hello";

// 2. Using the new keyword
String second = new String("Hello");`}</CodeExample>

          <h3>Important characteristics</h3>
          <ul>
            <li>Strings are immutable.</li>
            <li>String is a reference type.</li>
            <li>String literals can use the String Pool.</li>
            <li>String provides many built-in methods.</li>
            <li>Strings can contain spaces and special characters.</li>
          </ul>

          <h3>Why are Strings important in DSA?</h3>
          <p>
            String problems test traversal, comparison, hashing,
            frequency counting, two pointers, sliding windows,
            recursion and advanced pattern-matching algorithms.
          </p>

          <h3>Common String problem categories</h3>
          <ul>
            <li>Reverse a String.</li>
            <li>Check whether a String is a palindrome.</li>
            <li>Find duplicate characters.</li>
            <li>Check whether two Strings are anagrams.</li>
            <li>Find the longest substring without repeating characters.</li>
            <li>Find a pattern inside a larger String.</li>
          </ul>
        </article>


        <article id="internals" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2 · INTERNAL WORKING</p>
          <h2>2. String Internals and Memory Management</h2>

          <h3>2.1 Why is String immutable?</h3>
          <p>
            An immutable object cannot be changed after it has been
            created. Java Strings are immutable. Whenever we appear
            to modify a String, Java creates another String object
            instead of changing the original object.
          </p>

          <CodeExample>{`String name = "Java";
name.concat(" Programming");

System.out.println(name); // Java`}</CodeExample>

          <p>
            The concat() method returns a new String. Since we
            did not assign that returned value, name still
            refers to "Java".
          </p>

          <CodeExample>{`String name = "Java";
name = name.concat(" Programming");

System.out.println(name); // Java Programming`}</CodeExample>

          <h3>2.2 Advantages of immutability</h3>
          <ul>
            <li><strong>Security:</strong> Values such as file paths and URLs cannot be changed through an existing String reference.</li>
            <li><strong>Thread safety:</strong> Immutable String objects can safely be shared between threads.</li>
            <li><strong>String Pool:</strong> Identical String literals can share the same pooled object.</li>
            <li><strong>Hashing:</strong> A String's content does not change after its hash code is calculated.</li>
            <li><strong>Predictability:</strong> Methods cannot unexpectedly modify the original String.</li>
          </ul>

          <h3>2.3 What is the String Pool?</h3>
          <p>
            The String Pool is a special area managed by the JVM
            for canonical String instances. When Java encounters
            an eligible String literal, it can reuse an existing
            pooled instance with the same content.
          </p>

          <CodeExample>{`String a = "Java";
String b = "Java";

System.out.println(a == b);      // true
System.out.println(a.equals(b)); // true`}</CodeExample>

          <p>
            Both variables refer to the same pooled String object.
            The == operator compares references, whereas equals()
            compares String contents.
          </p>

          <h3>2.4 String Pool vs Heap objects</h3>
          <CodeExample>{`String a = "Java";
String b = new String("Java");

System.out.println(a == b);      // false
System.out.println(a.equals(b)); // true`}</CodeExample>

          <p>
            The literal refers to the pooled instance. The new
            expression explicitly creates a distinct String
            object on the heap.
          </p>

          <h3>2.5 Understanding intern()</h3>
          <p>
            The intern() method returns the canonical pooled
            representation of a String.
          </p>

          <CodeExample>{`String a = new String("Java");
String b = a.intern();
String c = "Java";

System.out.println(a == b); // false
System.out.println(b == c); // true`}</CodeExample>

          <h3>2.6 Compile-time vs runtime concatenation</h3>
          <CodeExample>{`String a = "Pre" + "pTrack";
String b = "PrepTrack";

System.out.println(a == b); // true

String course = "Prep";
String c = course + "Track";

System.out.println(c == b); // false`}</CodeExample>

          <p>
            The first concatenation uses compile-time constant
            expressions and is evaluated as a single literal.
            The second depends on a variable at runtime and
            produces a distinct String result.
          </p>

          <h3>2.7 String memory representation</h3>
          <p>
            In modern OpenJDK implementations, String internally
            uses a byte array and a coder field to represent
            Latin-1 or UTF-16 data when possible. Older Java
            implementations commonly used a char array.
          </p>

          <p>
            This is an implementation detail, not a guarantee
            that every Java implementation uses the same layout.
          </p>

          <h3>2.8 Important interview distinction</h3>
          <ul>
            <li>== checks reference identity.</li>
            <li>equals() checks content equality.</li>
            <li>intern() returns a canonical pooled reference.</li>
            <li>String immutability means the object cannot be modified.</li>
            <li>Reassigning a variable does not mutate its old object.</li>
          </ul>

          <h3>Quick self-check</h3>
          <CodeExample>{`String x = "Hello";
String y = "Hello";
String z = new String("Hello");

System.out.println(x == y);
System.out.println(x == z);
System.out.println(x.equals(z));`}</CodeExample>

          <p>
            Expected output: true, false, true.
          </p>
        </article>

        <article id="operations" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2 · CORE OPERATIONS</p>
          <h2>3. String Operations and Built-in Methods</h2>

          <h3>3.1 Finding String length</h3>
          <CodeExample>{`String text = "Programming";

System.out.println(text.length()); // 11`}</CodeExample>
          <p>
            length() returns the number of UTF-16 code units.
            It takes O(1) time.
          </p>

          <h3>3.2 Accessing characters</h3>
          <CodeExample>{`String text = "Java";

System.out.println(text.charAt(0)); // J
System.out.println(text.charAt(2)); // v`}</CodeExample>
          <p>
            Indexing starts at zero. Accessing a valid index
            takes O(1) time. An invalid index throws
            StringIndexOutOfBoundsException.
          </p>

          <h3>3.3 Extracting a substring</h3>
          <CodeExample>{`String text = "Programming";

System.out.println(text.substring(0, 7));
// Program

System.out.println(text.substring(3));
// gramming`}</CodeExample>
          <p>
            substring(start, end) includes the start index
            but excludes the end index. Modern Java implementations
            create a result String with the selected content.
            Copying k UTF-16 code units takes O(k) time.
          </p>

          <h3>3.4 Comparing Strings</h3>
          <CodeExample>{`String a = "Java";
String b = "java";

System.out.println(a.equals(b));           // false
System.out.println(a.equalsIgnoreCase(b)); // true
System.out.println(a.compareTo(b));        // negative value`}</CodeExample>
          <ul>
            <li><strong>equals():</strong> Checks exact content equality.</li>
            <li><strong>equalsIgnoreCase():</strong> Compares while ignoring case differences.</li>
            <li><strong>compareTo():</strong> Performs lexicographical comparison.</li>
          </ul>
          <p>
            Comparing two Strings can take O(n) time in the
            worst case, where n is their compared length.
          </p>

          <h3>3.5 Searching inside a String</h3>
          <CodeExample>{`String text = "Java Programming";

System.out.println(text.contains("Java")); // true
System.out.println(text.indexOf("a"));     // 1
System.out.println(text.lastIndexOf("a")); // 3
System.out.println(text.startsWith("Java")); // true
System.out.println(text.endsWith("ing"));    // true`}</CodeExample>
          <p>
            These methods help locate characters or substrings.
            Their exact performance depends on the method,
            input and Java implementation. Do not assume every
            search operation is O(1).
          </p>

          <h3>3.6 Replacing content</h3>
          <CodeExample>{`String text = "I like C";

String result = text.replace("C", "Java");

System.out.println(result);
// I like Java

System.out.println(text);
// I like C`}</CodeExample>
          <p>
            replace() returns a new String. It does not modify
            the original object.
          </p>

          <h3>3.7 Changing case and removing spaces</h3>
          <CodeExample>{`String text = "  Hello Java  ";

System.out.println(text.trim());
System.out.println(text.toUpperCase());
System.out.println(text.toLowerCase());
System.out.println(text.strip());`}</CodeExample>
          <ul>
            <li>trim() removes leading and trailing characters with values up to U+0020.</li>
            <li>strip() uses Unicode whitespace rules and is available from Java 11.</li>
            <li>toUpperCase() and toLowerCase() use locale-sensitive case conversion.</li>
          </ul>

          <h3>3.8 Splitting and joining</h3>
          <CodeExample>{`String names = "Ram,Sam,John";

String[] parts = names.split(",");

for (String name : parts) {
    System.out.println(name);
}

String joined = String.join(" - ", parts);

System.out.println(joined);
// Ram - Sam - John`}</CodeExample>
          <p>
            split() uses a regular expression, not a plain
            literal delimiter. A period must be escaped when
            used as a literal separator: split("\\\\.") in Java.
          </p>

          <h3>3.9 Converting between Strings and numbers</h3>
          <CodeExample>{`String value = "123";

int number = Integer.parseInt(value);
String text = String.valueOf(number);

System.out.println(number + 10); // 133
System.out.println(text);        // 123`}</CodeExample>
          <p>
            parseInt() converts valid integer text to an int.
            Invalid input throws NumberFormatException.
          </p>

          <h3>3.10 Converting between String and character array</h3>
          <CodeExample>{`String word = "HELLO";

char[] letters = word.toCharArray();

letters[0] = 'Y';

String updated = new String(letters);

System.out.println(word);    // HELLO
System.out.println(updated); // YELLO`}</CodeExample>
          <p>
            toCharArray() creates a new character array.
            Modifying that array does not change the original
            immutable String.
          </p>

          <h3>3.11 Important method complexity summary</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Typical complexity</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>length()</td><td>O(1)</td></tr>
              <tr><td>charAt()</td><td>O(1)</td></tr>
              <tr><td>equals()</td><td>O(n) worst case</td></tr>
              <tr><td>compareTo()</td><td>O(n) worst case</td></tr>
              <tr><td>substring()</td><td>O(k) for k copied code units</td></tr>
              <tr><td>toCharArray()</td><td>O(n)</td></tr>
              <tr><td>toUpperCase()</td><td>O(n) typical input-dependent work</td></tr>
              <tr><td>replace()</td><td>Input and output dependent</td></tr>
            </tbody>
          </table>

          <p>
            Complexity can depend on the Java version,
            implementation, input size and whether new content
            must be allocated. Treat these as practical guidance,
            not universal API guarantees.
          </p>
        </article>

        <article id="complexity" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2–3 · COMPLEXITY ANALYSIS</p>
          <h2>4. Time and Space Complexity of Strings</h2>

          <h3>4.1 Understanding String length</h3>
          <p>
            Let n represent the number of UTF-16 code units in a String.
            Most String algorithms traverse these units.
          </p>

          <CodeExample>{`String text = "Programming";

for (int i = 0; i < text.length(); i++) {
    System.out.println(text.charAt(i));
}`}</CodeExample>

          <p>
            The loop executes n times. Each charAt() access is O(1),
            so total time complexity is O(n).
          </p>

          <h3>4.2 Common String operation complexities</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Time complexity</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>length()</td><td>O(1)</td><td>Length is stored.</td></tr>
              <tr><td>charAt(i)</td><td>O(1)</td><td>Direct indexed access.</td></tr>
              <tr><td>Traversal</td><td>O(n)</td><td>Visits each code unit.</td></tr>
              <tr><td>equals()</td><td>O(n)</td><td>May compare all code units.</td></tr>
              <tr><td>toCharArray()</td><td>O(n)</td><td>Copies the contents.</td></tr>
              <tr><td>substring()</td><td>O(k)</td><td>Copies k code units in modern Java.</td></tr>
              <tr><td>Reverse using StringBuilder</td><td>O(n)</td><td>Processes the characters.</td></tr>
            </tbody>
          </table>

          <h3>4.3 Why repeated String concatenation is expensive</h3>
          <CodeExample>{`String result = "";

for (int i = 0; i < n; i++) {
    result = result + "a";
}`}</CodeExample>

          <p>
            Strings are immutable. Each concatenation creates a new
            result and copies the previous contents.
          </p>

          <p>
            The total copying work is approximately:
          </p>

          <CodeExample>{`1 + 2 + 3 + ... + n

= n * (n + 1) / 2

Time complexity = O(n²)`}</CodeExample>

          <h3>4.4 Optimized concatenation using StringBuilder</h3>
          <CodeExample>{`StringBuilder result = new StringBuilder();

for (int i = 0; i < n; i++) {
    result.append("a");
}

String answer = result.toString();`}</CodeExample>

          <p>
            StringBuilder uses a mutable buffer. Appending is
            amortized O(1), so n appends take O(n) amortized time.
            Converting the final result to a String takes O(n).
          </p>

          <h3>4.5 String vs StringBuilder vs StringBuffer</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>String</th>
                <th>StringBuilder</th>
                <th>StringBuffer</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Mutable</td><td>No</td><td>Yes</td><td>Yes</td></tr>
              <tr><td>Thread-safe methods</td><td>Safe to share due to immutability</td><td>No</td><td>Yes, synchronized methods</td></tr>
              <tr><td>Modification</td><td>Creates new result</td><td>Modifies buffer</td><td>Modifies buffer</td></tr>
              <tr><td>Performance</td><td>Repeated changes can be costly</td><td>Usually faster for single-threaded building</td><td>Synchronization can add overhead</td></tr>
              <tr><td>Typical use</td><td>Fixed text</td><td>Repeated modifications</td><td>Shared mutable text with synchronized methods</td></tr>
            </tbody>
          </table>

          <h3>4.6 StringBuilder internal working</h3>
          <p>
            StringBuilder maintains a resizable character buffer.
            When capacity is insufficient, it allocates a larger
            buffer and copies the existing contents.
          </p>

          <CodeExample>{`StringBuilder sb = new StringBuilder();

sb.append("Java");
sb.append(" ");
sb.append("DSA");

System.out.println(sb); // Java DSA
System.out.println(sb.length());
System.out.println(sb.capacity());`}</CodeExample>

          <ul>
            <li>length() gives the number of characters stored.</li>
            <li>capacity() gives the current buffer capacity.</li>
            <li>ensureCapacity() can request a minimum capacity.</li>
            <li>setLength() changes the logical length.</li>
            <li>toString() creates an immutable String result.</li>
          </ul>

          <h3>4.7 Amortized complexity</h3>
          <p>
            An append operation is usually O(1) amortized. Some
            individual appends can take O(n) when the buffer grows
            and existing content must be copied.
          </p>

          <h3>4.8 Auxiliary space</h3>
          <ul>
            <li>Reading a String without modifying it can use O(1) extra space.</li>
            <li>Creating a character frequency array of fixed size 26 uses O(1) space.</li>
            <li>A HashMap storing up to n distinct characters uses O(n) space.</li>
            <li>A StringBuilder containing n characters uses O(n) space.</li>
          </ul>

          <h3>Interview takeaway</h3>
          <p>
            Never choose an algorithm only by its time complexity.
            Consider auxiliary memory, input constraints, Unicode
            requirements and whether the original String must remain
            unchanged.
          </p>
        </article>

        <article id="java" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2–4 · JAVA IMPLEMENTATION</p>
          <h2>5. Important Java String Implementations</h2>

          <h3>5.1 Reverse a String</h3>
          <p><strong>Approach:</strong> Use two pointers to reverse a character array.</p>
          <CodeExample>{`public static String reverse(String str) {
    char[] arr = str.toCharArray();

    int left = 0;
    int right = arr.length - 1;

    while (left < right) {
        char temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;

        left++;
        right--;
    }

    return new String(arr);
}`}</CodeExample>
          <p><strong>Dry run:</strong> "JAVA" → "AVAJ"</p>
          <p><strong>Complexity:</strong> O(n) time and O(n) auxiliary space for the character array.</p>

          <h3>5.2 Check whether a String is a palindrome</h3>
          <p><strong>Approach:</strong> Compare characters from both ends.</p>
          <CodeExample>{`public static boolean isPalindrome(String str) {
    int left = 0;
    int right = str.length() - 1;

    while (left < right) {
        if (str.charAt(left) != str.charAt(right)) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}`}</CodeExample>
          <p><strong>Dry run:</strong> "MADAM" → M=M, A=A, D is the middle → true.</p>
          <p><strong>Complexity:</strong> O(n) time and O(1) auxiliary space.</p>

          <h3>5.3 Count vowels and consonants</h3>
          <CodeExample>{`public static void countLetters(String str) {
    int vowels = 0;
    int consonants = 0;

    for (int i = 0; i < str.length(); i++) {
        char ch = Character.toLowerCase(str.charAt(i));

        if (ch >= 'a' && ch <= 'z') {
            if (ch == 'a' || ch == 'e' || ch == 'i'
                    || ch == 'o' || ch == 'u') {
                vowels++;
            } else {
                consonants++;
            }
        }
    }

    System.out.println("Vowels: " + vowels);
    System.out.println("Consonants: " + consonants);
}`}</CodeExample>
          <p>
            This implementation counts English alphabetic letters
            only. Spaces, digits and punctuation are ignored.
          </p>
          <p><strong>Complexity:</strong> O(n) time and O(1) auxiliary space.</p>

          <h3>5.4 Find character frequencies</h3>
          <CodeExample>{`public static void frequency(String str) {
    int[] freq = new int[26];

    for (int i = 0; i < str.length(); i++) {
        char ch = str.charAt(i);

        if (ch >= 'a' && ch <= 'z') {
            freq[ch - 'a']++;
        }
    }

    for (int i = 0; i < 26; i++) {
        if (freq[i] > 0) {
            System.out.println(
                (char) (i + 'a') + " : " + freq[i]
            );
        }
    }
}`}</CodeExample>
          <p>
            Example: "banana" produces a: 3, b: 1, n: 2.
            This implementation handles lowercase English letters only.
          </p>
          <p><strong>Complexity:</strong> O(n + 26) time and O(26) space.</p>

          <h3>5.5 Check whether two Strings are anagrams</h3>
          <p>
            Two Strings are anagrams if they contain the same
            characters with the same frequencies.
          </p>
          <CodeExample>{`public static boolean areAnagrams(
        String first, String second) {

    if (first.length() != second.length()) {
        return false;
    }

    int[] freq = new int[26];

    for (int i = 0; i < first.length(); i++) {
        freq[first.charAt(i) - 'a']++;
        freq[second.charAt(i) - 'a']--;
    }

    for (int count : freq) {
        if (count != 0) {
            return false;
        }
    }

    return true;
}`}</CodeExample>
          <p>
            Example: "listen" and "silent" are anagrams.
            This version assumes lowercase English letters.
          </p>
          <p><strong>Complexity:</strong> O(n + 26) time and O(26) space.</p>

          <h3>5.6 Remove duplicate characters</h3>
          <CodeExample>{`public static String removeDuplicates(String str) {
    boolean[] seen = new boolean[256];
    StringBuilder result = new StringBuilder();

    for (int i = 0; i < str.length(); i++) {
        char ch = str.charAt(i);

        if (!seen[ch]) {
            seen[ch] = true;
            result.append(ch);
        }
    }

    return result.toString();
}`}</CodeExample>
          <p>
            Example: "programming" → "progamin".
            This version supports only character values from
            0 to 255. A HashSet is more suitable for general
            UTF-16 code units.
          </p>
          <p><strong>Complexity:</strong> O(n) time and O(1) auxiliary space for the fixed-size array, excluding output.</p>

          <h3>5.7 Find the first non-repeating character</h3>
          <CodeExample>{`public static char firstNonRepeating(String str) {
    int[] freq = new int[256];

    for (int i = 0; i < str.length(); i++) {
        freq[str.charAt(i)]++;
    }

    for (int i = 0; i < str.length(); i++) {
        if (freq[str.charAt(i)] == 1) {
            return str.charAt(i);
        }
    }

    return '\\0';
}`}</CodeExample>
          <p>
            Example: "swiss" → 'w'. This implementation assumes
            every character fits in the range 0–255.
          </p>
          <p><strong>Complexity:</strong> O(n) time and O(1) auxiliary space under that fixed alphabet assumption.</p>

          <h3>5.8 Reverse words in a sentence</h3>
          <CodeExample>{`public static String reverseWords(String str) {
    String[] words = str.trim().split("\\\\s+");
    StringBuilder result = new StringBuilder();

    for (int i = words.length - 1; i >= 0; i--) {
        result.append(words[i]);

        if (i > 0) {
            result.append(" ");
        }
    }

    return result.toString();
}`}</CodeExample>
          <p>
            Example: "Java is powerful" → "powerful is Java".
            This version normalizes whitespace between words.
          </p>
          <p><strong>Complexity:</strong> O(n) time and O(n) additional space.</p>

          <h3>5.9 Check whether a String contains only digits</h3>
          <CodeExample>{`public static boolean containsOnlyDigits(String str) {
    if (str.isEmpty()) {
        return false;
    }

    for (int i = 0; i < str.length(); i++) {
        if (str.charAt(i) < '0' || str.charAt(i) > '9') {
            return false;
        }
    }

    return true;
}`}</CodeExample>
          <p>
            Example: "12345" → true; "12a45" → false.
            This checks ASCII digits only.
          </p>
          <p><strong>Complexity:</strong> O(n) time and O(1) auxiliary space.</p>

          <h3>5.10 Important implementation lessons</h3>
          <ul>
            <li>Use StringBuilder for repeated modifications.</li>
            <li>Use two pointers for reversal and palindrome checks.</li>
            <li>Use frequency arrays when the character range is known.</li>
            <li>Use HashMap or HashSet when the character range is not fixed.</li>
            <li>Always define how uppercase, lowercase, spaces and Unicode should be handled.</li>
          </ul>
        </article>

        <article id="patterns" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 3–4 · PROBLEM SOLVING</p>
          <h2>6. Important String Problem Patterns</h2>

          <h3>6.1 Two Pointers</h3>
          <p>
            Two pointers use two indexes to process a String,
            often from opposite ends or at different speeds.
          </p>
          <p><strong>Use cases:</strong> Palindromes, reversing, comparing Strings and removing characters.</p>
          <CodeExample>{`public static boolean isPalindrome(String str) {
    int left = 0;
    int right = str.length() - 1;

    while (left < right) {
        if (str.charAt(left) != str.charAt(right)) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}`}</CodeExample>
          <p><strong>Complexity:</strong> O(n) time and O(1) auxiliary space.</p>

          <h3>6.2 Sliding Window</h3>
          <p>
            Sliding window processes a continuous part of a String.
            Instead of repeatedly examining every substring,
            maintain information about the current window.
          </p>
          <p><strong>Use cases:</strong> Longest substring without repeating characters, minimum window substring and fixed-length substring problems.</p>
          <CodeExample>{`public static int longestUniqueSubstring(String str) {
    int[] lastSeen = new int[256];
    java.util.Arrays.fill(lastSeen, -1);

    int left = 0;
    int maxLength = 0;

    for (int right = 0; right < str.length(); right++) {
        char ch = str.charAt(right);

        if (lastSeen[ch] >= left) {
            left = lastSeen[ch] + 1;
        }

        lastSeen[ch] = right;
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}`}</CodeExample>
          <p>
            Example: "abcabcbb" → 3, because "abc" is the
            longest substring without repeating characters.
          </p>
          <p>
            This implementation assumes character values from
            0 to 255. Use a HashMap or a suitable Unicode-aware
            representation for broader input.
          </p>
          <p><strong>Complexity:</strong> O(n) time and O(1) auxiliary space for this fixed-size table.</p>

          <h3>6.3 Hashing and Frequency Counting</h3>
          <p>
            Store how often each character appears. Frequency
            counting is useful when the order of characters
            does not matter.
          </p>
          <p><strong>Use cases:</strong> Anagrams, duplicate detection, first unique character and character comparison.</p>
          <CodeExample>{`public static boolean areAnagrams(String a, String b) {
    if (a.length() != b.length()) {
        return false;
    }

    java.util.Map<Character, Integer> frequency =
        new java.util.HashMap<>();

    for (int i = 0; i < a.length(); i++) {
        char ch = a.charAt(i);
        frequency.put(ch, frequency.getOrDefault(ch, 0) + 1);
    }

    for (int i = 0; i < b.length(); i++) {
        char ch = b.charAt(i);
        int count = frequency.getOrDefault(ch, 0);

        if (count == 0) {
            return false;
        }

        frequency.put(ch, count - 1);
    }

    return true;
}`}</CodeExample>
          <p>
            This version is case-sensitive and compares UTF-16
            code units. If a problem requires case-insensitive
            or Unicode code-point comparison, normalize and
            process the input accordingly.
          </p>
          <p><strong>Complexity:</strong> O(n) expected time and O(k) space, where k is the number of distinct characters.</p>

          <h3>6.4 Prefix and Suffix Techniques</h3>
          <p>
            Prefix and suffix information can help avoid
            repeatedly processing the same characters.
            A prefix describes content before a position;
            a suffix describes content after it.
          </p>
          <p><strong>Use cases:</strong> Comparing prefixes, suffix matching, repeated pattern analysis and preprocessing.</p>
          <CodeExample>{`public static String longestCommonPrefix(String[] words) {
    if (words == null || words.length == 0) {
        return "";
    }

    String prefix = words[0];

    for (int i = 1; i < words.length; i++) {
        while (!words[i].startsWith(prefix)) {
            prefix = prefix.substring(0, prefix.length() - 1);

            if (prefix.isEmpty()) {
                return "";
            }
        }
    }

    return prefix;
}`}</CodeExample>
          <p>
            Example: ["flower", "flow", "flight"] → "fl".
          </p>
          <p><strong>Complexity:</strong> Depends on the total number of compared characters; this implementation may repeatedly create shorter prefixes.</p>

          <h3>6.5 Sorting-Based Techniques</h3>
          <p>
            Sorting characters makes it easier to compare
            their contents independent of their original order.
          </p>
          <p><strong>Use cases:</strong> Anagram grouping and comparing character multisets.</p>
          <CodeExample>{`public static String sortCharacters(String str) {
    char[] chars = str.toCharArray();

    java.util.Arrays.sort(chars);

    return new String(chars);
}`}</CodeExample>
          <p>
            Example: "listen" and "silent" both become "eilnst".
          </p>
          <p><strong>Complexity:</strong> O(n log n) time and O(n) space for the character array.</p>

          <h3>6.6 Stack-Based Techniques</h3>
          <p>
            A stack is useful when the latest character must
            be processed or removed before earlier characters.
          </p>
          <p><strong>Use cases:</strong> Valid parentheses, removing adjacent duplicates and decoding nested Strings.</p>
          <CodeExample>{`public static boolean isValidParentheses(String str) {
    java.util.Stack<Character> stack = new java.util.Stack<>();

    for (int i = 0; i < str.length(); i++) {
        char ch = str.charAt(i);

        if (ch == '(' || ch == '[' || ch == '{') {
            stack.push(ch);
        } else {
            if (stack.isEmpty()) {
                return false;
            }

            char top = stack.pop();

            if ((ch == ')' && top != '(') ||
                (ch == ']' && top != '[') ||
                (ch == '}' && top != '{')) {
                return false;
            }
        }
    }

    return stack.isEmpty();
}`}</CodeExample>
          <p>
            Example: "{'()[]{}'}" → true; "{'(]'}" → false.
            This implementation assumes the input contains
            only bracket characters.
          </p>
          <p><strong>Complexity:</strong> O(n) time and O(n) worst-case space.</p>

          <h3>6.7 How to identify the right pattern</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Problem clue</th>
                <th>Likely pattern</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Compare both ends</td><td>Two pointers</td></tr>
              <tr><td>Longest or shortest substring</td><td>Sliding window</td></tr>
              <tr><td>Character counts matter</td><td>Hashing / frequency array</td></tr>
              <tr><td>Order does not matter</td><td>Sorting or frequency counting</td></tr>
              <tr><td>Nested or matching brackets</td><td>Stack</td></tr>
              <tr><td>Common beginning of many Strings</td><td>Prefix processing</td></tr>
              <tr><td>Find a pattern efficiently</td><td>KMP / Z algorithm / Rabin–Karp</td></tr>
            </tbody>
          </table>

          <h3>6.8 How to choose an optimized approach</h3>
          <ol>
            <li>Identify whether the problem asks about a substring, subsequence or complete String.</li>
            <li>Check whether order matters.</li>
            <li>Check whether repeated characters are allowed.</li>
            <li>Look for a continuous range that suggests sliding window.</li>
            <li>Look for frequency requirements that suggest hashing.</li>
            <li>Check constraints before choosing brute force or optimization.</li>
            <li>Dry-run the approach on repeated characters and boundary cases.</li>
          </ol>
        </article>

        <article id="algorithms" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 4 · ADVANCED ALGORITHMS</p>
          <h2>7. Advanced String Matching Algorithms</h2>

          <h3>7.1 Why do we need advanced algorithms?</h3>
          <p>
            The basic substring search approach checks the pattern
            at every possible starting position. In the worst case,
            this takes O(n × m) time, where n is the text length
            and m is the pattern length.
          </p>
          <p>
            Advanced algorithms reuse previously calculated
            information to reduce unnecessary comparisons.
          </p>

          <h3>7.2 KMP Algorithm</h3>
          <p>
            KMP stands for Knuth–Morris–Pratt. It searches for a
            pattern without moving the text pointer backwards.
            It uses an LPS array.
          </p>

          <h3>What is LPS?</h3>
          <p>
            LPS means Longest Proper Prefix which is also a Suffix.
            A proper prefix cannot be the entire String.
          </p>
          <CodeExample>{`Pattern: ABABC

Index:   0 1 2 3 4
Char:    A B A B C
LPS:     0 0 1 2 0`}</CodeExample>

          <p>
            At index 3, "ABAB" has the longest proper prefix
            that is also a suffix: "AB".
          </p>

          <h3>Building the LPS array</h3>
          <CodeExample>{`public static int[] buildLPS(String pattern) {
    int m = pattern.length();
    int[] lps = new int[m];

    int len = 0;
    int i = 1;

    while (i < m) {
        if (pattern.charAt(i) == pattern.charAt(len)) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}`}</CodeExample>

          <h3>KMP pattern search</h3>
          <CodeExample>{`public static int kmpSearch(String text, String pattern) {
    if (pattern.isEmpty()) {
        return 0;
    }

    int[] lps = buildLPS(pattern);

    int i = 0;
    int j = 0;

    while (i < text.length()) {
        if (text.charAt(i) == pattern.charAt(j)) {
            i++;
            j++;
        }

        if (j == pattern.length()) {
            return i - j;
        } else if (i < text.length()
                && text.charAt(i) != pattern.charAt(j)) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return -1;
}`}</CodeExample>

          <p>
            Example: text = "ABABDABACDABABCABAB",
            pattern = "ABABC" → index 10.
          </p>
          <p><strong>Time:</strong> O(n + m). <strong>Space:</strong> O(m).</p>

          <h3>7.3 Rabin–Karp Algorithm</h3>
          <p>
            Rabin–Karp uses hashing to compare a pattern with
            text windows. Instead of recalculating every window's
            hash from scratch, it updates the hash using a
            rolling-hash formula.
          </p>

          <h3>Rolling hash concept</h3>
          <p>
            When the window moves one position, remove the
            contribution of the outgoing character, shift the
            remaining hash and add the incoming character.
          </p>

          <CodeExample>{`public static int rabinKarp(String text, String pattern) {
    int n = text.length();
    int m = pattern.length();

    if (m == 0) return 0;
    if (m > n) return -1;

    int base = 256;
    int mod = 1_000_000_007;

    long patternHash = 0;
    long windowHash = 0;
    long highestPower = 1;

    for (int i = 0; i < m - 1; i++) {
        highestPower = (highestPower * base) % mod;
    }

    for (int i = 0; i < m; i++) {
        patternHash = (patternHash * base + pattern.charAt(i)) % mod;
        windowHash = (windowHash * base + text.charAt(i)) % mod;
    }

    for (int i = 0; i <= n - m; i++) {
        if (patternHash == windowHash
                && text.regionMatches(i, pattern, 0, m)) {
            return i;
        }

        if (i < n - m) {
            windowHash =
                (windowHash - text.charAt(i) * highestPower % mod + mod) % mod;

            windowHash =
                (windowHash * base + text.charAt(i + m)) % mod;
        }
    }

    return -1;
}`}</CodeExample>

          <p>
            A hash match is not proof of String equality because
            collisions are possible. The implementation verifies
            matching windows using regionMatches().
          </p>
          <p>
            <strong>Expected time:</strong> O(n + m) under good
            hash distribution. <strong>Worst case:</strong> O(n × m)
            because of collisions and verification.
          </p>

          <h3>7.4 Z Algorithm</h3>
          <p>
            The Z-array stores the length of the longest substring
            starting at each index that matches the prefix of
            the entire String.
          </p>

          <CodeExample>{`String:  a a b a a b a
Index:   0 1 2 3 4 5 6
Z:       - 1 0 3 1 0 1`}</CodeExample>

          <p>
            Conventionally, Z[0] is often set to 0 or left
            unused. Here it is shown as a dash.
          </p>

          <h3>Building the Z-array</h3>
          <CodeExample>{`public static int[] buildZ(String str) {
    int n = str.length();
    int[] z = new int[n];

    int left = 0;
    int right = 0;

    for (int i = 1; i < n; i++) {
        if (i <= right) {
            z[i] = Math.min(right - i + 1, z[i - left]);
        }

        while (i + z[i] < n
                && str.charAt(z[i]) == str.charAt(i + z[i])) {
            z[i]++;
        }

        if (i + z[i] - 1 > right) {
            left = i;
            right = i + z[i] - 1;
        }
    }

    return z;
}`}</CodeExample>

          <h3>Using Z Algorithm for pattern search</h3>
          <CodeExample>{`public static int zSearch(String text, String pattern) {
    if (pattern.isEmpty()) return 0;

    String combined = pattern + "$" + text;
    int[] z = buildZ(combined);

    int m = pattern.length();

    for (int i = m + 1; i < combined.length(); i++) {
        if (z[i] >= m) {
            return i - m - 1;
        }
    }

    return -1;
}`}</CodeExample>

          <p>
            The separator "$" must not appear in either input.
            For unrestricted input, use a separator representation
            that cannot collide with the input alphabet.
          </p>
          <p><strong>Time:</strong> O(n + m). <strong>Space:</strong> O(n + m).</p>

          <h3>7.5 Comparing advanced algorithms</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Time complexity</th>
                <th>Extra space</th>
                <th>Main idea</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>KMP</td><td>O(n + m)</td><td>O(m)</td><td>LPS preprocessing</td></tr>
              <tr><td>Rabin–Karp</td><td>Expected O(n + m); worst O(nm)</td><td>O(1)</td><td>Rolling hash</td></tr>
              <tr><td>Z Algorithm</td><td>O(n + m)</td><td>O(n + m)</td><td>Prefix matching</td></tr>
            </tbody>
          </table>

          <h3>7.6 Which algorithm should you choose?</h3>
          <ul>
            <li>Choose KMP for guaranteed linear-time single-pattern searching.</li>
            <li>Choose Rabin–Karp when hashing is useful, including multiple-pattern variants.</li>
            <li>Choose Z Algorithm when prefix-match information is useful across the String.</li>
          </ul>
        </article>

        <article id="edge-cases" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 4 · INTERVIEW ESSENTIALS</p>
          <h2>8. String Edge Cases and Common Mistakes</h2>

          <h3>8.1 Empty Strings</h3>
          <p>
            An empty String has length zero. Always check whether
            an algorithm handles empty input correctly.
          </p>
          <CodeExample>{`String s = "";

System.out.println(s.length()); // 0
System.out.println(s.isEmpty()); // true
System.out.println(s.equals("")); // true`}</CodeExample>

          <h3>8.2 Single-character Strings</h3>
          <p>
            Check one-character inputs before using two pointers,
            substring boundaries or loops that access neighboring
            characters.
          </p>
          <CodeExample>{`String s = "A";

System.out.println(s.charAt(0)); // A
System.out.println(s.substring(0, 1)); // A`}</CodeExample>

          <h3>8.3 Null vs Empty String</h3>
          <p>
            null means no String object is referenced.
            An empty String is a valid String object containing
            zero characters.
          </p>
          <CodeExample>{`String a = null;
String b = "";

System.out.println(b.isEmpty()); // true

// a.isEmpty() would throw NullPointerException.

if (a != null && !a.isEmpty()) {
    System.out.println(a);
}`}</CodeExample>

          <h3>8.4 Case Sensitivity</h3>
          <p>
            Java String comparisons are case-sensitive by default.
            "Java" and "java" are different Strings.
          </p>
          <CodeExample>{`String a = "Java";
String b = "java";

System.out.println(a.equals(b)); // false
System.out.println(a.equalsIgnoreCase(b)); // true`}</CodeExample>

          <h3>8.5 Spaces and Whitespace</h3>
          <p>
            Leading spaces, trailing spaces, tabs and newlines
            can affect String comparisons and parsing.
          </p>
          <CodeExample>{`String s = "  Java  ";

System.out.println(s.trim());  // Java
System.out.println(s.strip()); // Java`}</CodeExample>
          <p>
            trim() removes leading and trailing characters whose
            values are at most U+0020. strip() uses Unicode-aware
            whitespace handling and is available from Java 11.
          </p>

          <h3>8.6 Repeated Characters</h3>
          <p>
            Inputs such as "aaaaaa" expose mistakes in duplicate
            removal, frequency counting, sliding windows and
            substring matching.
          </p>

          <h3>8.7 Index Boundaries</h3>
          <p>
            String indices start at zero. The last valid index is
            length() - 1. substring(start, end) excludes end.
          </p>
          <CodeExample>{`String s = "HELLO";

System.out.println(s.charAt(0)); // H
System.out.println(s.charAt(4)); // O
System.out.println(s.substring(1, 4)); // ELL

// s.charAt(5) causes StringIndexOutOfBoundsException.`}</CodeExample>

          <h3>8.8 Unicode: char is not always one character</h3>
          <p>
            Java String uses UTF-16. Its length() counts UTF-16
            code units, not necessarily human-perceived characters.
            A Unicode code point outside the Basic Multilingual
            Plane occupies two char positions (a surrogate pair).
          </p>
          <CodeExample>{`String emoji = "😀";

System.out.println(emoji.length()); // 2
System.out.println(emoji.codePointCount(0, emoji.length())); // 1`}</CodeExample>

          <h3>8.9 Iterating by Unicode code points</h3>
          <p>
            If an algorithm must process Unicode code points
            rather than UTF-16 char values, use codePoints().
          </p>
          <CodeExample>{`String s = "A😀B";

s.codePoints().forEach(codePoint -> {
    System.out.println(codePoint);
});`}</CodeExample>

          <h3>8.10 Code points vs grapheme clusters</h3>
          <p>
            Even one visible symbol can contain multiple Unicode
            code points. For example, a letter and a combining
            accent may be displayed as one visible character.
            Emoji sequences can also contain multiple code points.
          </p>
          <p>
            Therefore, codePointCount() does not always count
            user-perceived characters. Grapheme-cluster processing
            requires Unicode-aware text segmentation.
          </p>

          <h3>8.11 Unicode normalization</h3>
          <p>
            Two Strings can look identical but have different
            underlying code-point sequences. Unicode normalization
            can make canonically equivalent text comparable.
          </p>
          <CodeExample>{`import java.text.Normalizer;

String a = "\\u00E9";
String b = "e\\u0301";

System.out.println(a.equals(b)); // false

String normalizedA =
    Normalizer.normalize(a, Normalizer.Form.NFC);

String normalizedB =
    Normalizer.normalize(b, Normalizer.Form.NFC);

System.out.println(normalizedA.equals(normalizedB)); // true`}</CodeExample>

          <h3>8.12 Locale-sensitive case conversion</h3>
          <p>
            Case conversion can depend on the default locale.
            For language-independent identifiers, use Locale.ROOT.
          </p>
          <CodeExample>{`import java.util.Locale;

String value = "JAVA";

String normalized = value.toLowerCase(Locale.ROOT);

System.out.println(normalized); // java`}</CodeExample>

          <h3>8.13 Fixed-size frequency arrays</h3>
          <p>
            An int[26] frequency array works only for lowercase
            English letters when the index is calculated using
            ch - 'a'. An int[256] array is not safe for every
            Java char value.
          </p>
          <CodeExample>{`int[] frequency = new int[26];

String s = "banana";

for (int i = 0; i < s.length(); i++) {
    char ch = s.charAt(i);

    if (ch >= 'a' && ch <= 'z') {
        frequency[ch - 'a']++;
    }
}`}</CodeExample>

          <h3>8.14 Common interview mistakes</h3>
          <ul>
            <li>Using == instead of equals() for String content comparison.</li>
            <li>Forgetting that String is immutable.</li>
            <li>Using repeated concatenation inside a large loop.</li>
            <li>Accessing charAt(length()) instead of the last valid index.</li>
            <li>Forgetting that substring() excludes its ending index.</li>
            <li>Assuming every visible character occupies one char.</li>
            <li>Using a fixed-size frequency array without checking the character range.</li>
            <li>Ignoring empty input, null and repeated-character cases.</li>
            <li>Assuming a hash match guarantees String equality.</li>
          </ul>

          <h3>8.15 Edge-case testing checklist</h3>
          <ul>
            <li>Empty input: ""</li>
            <li>One character: "a"</li>
            <li>All repeated: "aaaa"</li>
            <li>No repeated characters: "abcd"</li>
            <li>Mixed case: "Java"</li>
            <li>Spaces: " hello "</li>
            <li>Punctuation: "a!b@c"</li>
            <li>Unicode: "café 😀"</li>
            <li>Null input, if the method contract permits null.</li>
            <li>Very long input to expose inefficient algorithms.</li>
          </ul>
        </article>

        <article id="practice" className="dsa-lesson-section">
          <p className="dsa-level">PRACTICE ZONE · BEGINNER TO ADVANCED</p>
          <h2>9. String Coding Practice</h2>
          <p>
            Solve these problems in order. First understand the
            brute-force approach, then try to optimize your solution.
            Analyse time and space complexity before submitting.
          </p>

          <h3>Beginner — Build your fundamentals</h3>

          <div className="dsa-practice-card">
  <h4>1. Reverse String</h4>

  <button
    type="button"
    className="secondary-button"
    onClick={() => toggleProblem('Reverse String')}
  >
    {expandedProblems.includes('Reverse String')
      ? 'Hide Details ↑'
      : 'Show Details ↓'}
  </button>

  {expandedProblems.includes('Reverse String') && (
    <>
      <p><strong>Task:</strong> Reverse a character array in place.</p>
      <p><strong>Concepts:</strong> Two pointers, swapping, arrays.</p>
      <p><strong>Approach:</strong> Use left and right pointers and swap characters until they meet.</p>
      <p><strong>Target complexity:</strong> O(n) time, O(1) extra space.</p>
      <a
        href="https://leetcode.com/problems/reverse-string/"
        target="_blank"
        rel="noreferrer"
      >
        Solve on LeetCode →
      </a>
    </>
  )}
</div>


<div className="dsa-practice-card">
  <h4>2. Valid Palindrome</h4>

  <button
    type="button"
    className="secondary-button"
    onClick={() => toggleProblem('Valid Palindrome')}
  >
    {expandedProblems.includes('Valid Palindrome')
      ? 'Hide Details ↑'
      : 'Show Details ↓'}
  </button>

  {expandedProblems.includes('Valid Palindrome') && (
    <>
      <p><strong>Task:</strong> Check whether a String is a palindrome after ignoring non-alphanumeric characters and case.</p>
      <p><strong>Concepts:</strong> Two pointers, character checking.</p>
      <p><strong>Approach:</strong> Move pointers inward, skipping invalid characters and comparing normalized characters.</p>
      <p><strong>Target complexity:</strong> O(n) time, O(1) extra space.</p>
      <a href="https://leetcode.com/problems/valid-palindrome/" target="_blank" rel="noreferrer">
        Solve on LeetCode →
      </a>
    </>
  )}
</div>

<div className="dsa-practice-card">
    <h4>3. Valid Anagram</h4>
  <button
    type="button"
    className="secondary-button"
    onClick={() => toggleProblem('Valid Anagram')}
  >
    {expandedProblems.includes('Valid Anagram')
      ? 'Hide Details ↑'
      : 'Show Details ↓'}
  </button>

  {expandedProblems.includes('Valid Anagram') && (
    <>
      <p><strong>Task:</strong> Determine whether two Strings contain the same characters with the same frequencies.</p>
      <p><strong>Concepts:</strong> Frequency counting, arrays, hashing.</p>
      <p><strong>Approach:</strong> Count character frequencies and compare the counts.</p>
      <p><strong>Target complexity:</strong> O(n) time, O(1) extra space for a fixed character set.</p>
      <a href="https://leetcode.com/problems/valid-anagram/" target="_blank" rel="noreferrer">
        Solve on LeetCode →
      </a>
    </>
  )}
</div>


          <div className="dsa-practice-card">
            <h4>4. First Unique Character in a String</h4>
            <p><strong>Task:</strong> Find the index of the first character that occurs exactly once.</p>
            <p><strong>Concepts:</strong> Frequency arrays, traversal.</p>
            <p><strong>Approach:</strong> Count frequencies in one pass, then find the first character with frequency one.</p>
            <p><strong>Target complexity:</strong> O(n) time, O(1) extra space for lowercase English letters.</p>
            <a href="https://leetcode.com/problems/first-unique-character-in-a-string/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>5. Find the Index of the First Occurrence in a String</h4>
            <p><strong>Task:</strong> Find the first occurrence of a pattern inside a text.</p>
            <p><strong>Concepts:</strong> Substring search, pattern matching.</p>
            <p><strong>Approach:</strong> Start with a straightforward search, then implement KMP.</p>
            <p><strong>Target complexity:</strong> O(n + m) using KMP.</p>
            <a href="https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <h3>Intermediate — Recognize problem patterns</h3>

          <div className="dsa-practice-card">
            <h4>6. Longest Substring Without Repeating Characters</h4>
            <p><strong>Task:</strong> Find the length of the longest substring containing no repeated characters.</p>
            <p><strong>Concepts:</strong> Sliding window, HashSet or HashMap.</p>
            <p><strong>Approach:</strong> Expand the right boundary and move the left boundary when a duplicate appears.</p>
            <p><strong>Target complexity:</strong> O(n) time.</p>
            <a href="https://leetcode.com/problems/longest-substring-without-repeating-characters/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>7. Longest Common Prefix</h4>
            <p><strong>Task:</strong> Find the longest prefix shared by all Strings in an array.</p>
            <p><strong>Concepts:</strong> Prefix matching, String traversal.</p>
            <p><strong>Approach:</strong> Compare characters at the same position across all Strings.</p>
            <p><strong>Target complexity:</strong> O(total characters compared).</p>
            <a href="https://leetcode.com/problems/longest-common-prefix/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>8. Longest Palindromic Substring</h4>
            <p><strong>Task:</strong> Find the longest contiguous substring that is a palindrome.</p>
            <p><strong>Concepts:</strong> Two pointers, expand around center, dynamic programming.</p>
            <p><strong>Approach:</strong> Try every possible center and expand while characters match.</p>
            <p><strong>Target complexity:</strong> O(n²) time, O(1) extra space using center expansion.</p>
            <a href="https://leetcode.com/problems/longest-palindromic-substring/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>9. Repeated Substring Pattern</h4>
            <p><strong>Task:</strong> Determine whether a String can be constructed by repeating one of its proper substrings.</p>
            <p><strong>Concepts:</strong> String properties, KMP, prefix information.</p>
            <p><strong>Approach:</strong> Explore the doubled-String technique and the LPS-based solution.</p>
            <p><strong>Target complexity:</strong> O(n) time using KMP-based reasoning.</p>
            <a href="https://leetcode.com/problems/repeated-substring-pattern/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>10. String to Integer (atoi)</h4>
            <p><strong>Task:</strong> Parse an integer from a String while handling whitespace, signs and overflow.</p>
            <p><strong>Concepts:</strong> Parsing, edge cases, integer boundaries.</p>
            <p><strong>Approach:</strong> Process characters carefully and check overflow before multiplying and adding.</p>
            <p><strong>Target complexity:</strong> O(n) time, O(1) extra space.</p>
            <a href="https://leetcode.com/problems/string-to-integer-atoi/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <h3>Advanced — Strong interview preparation</h3>

          <div className="dsa-practice-card">
            <h4>11. Minimum Window Substring</h4>
            <p><strong>Task:</strong> Find the smallest substring of a source String containing all characters of a target String, including required frequencies.</p>
            <p><strong>Concepts:</strong> Sliding window, frequency counting.</p>
            <p><strong>Approach:</strong> Expand until the window is valid, then shrink it while preserving validity.</p>
            <p><strong>Target complexity:</strong> O(n + m) time.</p>
            <a href="https://leetcode.com/problems/minimum-window-substring/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>12. Group Anagrams</h4>
            <p><strong>Task:</strong> Group all Strings that are anagrams of one another.</p>
            <p><strong>Concepts:</strong> HashMap, frequency signatures, sorting.</p>
            <p><strong>Approach:</strong> Create a consistent key for each String using sorted characters or character frequencies.</p>
            <p><strong>Target complexity:</strong> O(k × n log n) using sorting, where k is the number of Strings and n is their average length.</p>
            <a href="https://leetcode.com/problems/group-anagrams/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>13. Edit Distance</h4>
            <p><strong>Task:</strong> Find the minimum insertions, deletions or replacements needed to convert one String into another.</p>
            <p><strong>Concepts:</strong> Dynamic programming, two-dimensional state transitions.</p>
            <p><strong>Approach:</strong> Define dp[i][j] as the minimum operations needed to convert the first i characters into the first j characters.</p>
            <p><strong>Target complexity:</strong> O(n × m) time, O(n × m) space.</p>
            <a href="https://leetcode.com/problems/edit-distance/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>14. Regular Expression Matching</h4>
            <p><strong>Task:</strong> Implement matching that supports '.' and '*' according to the problem's rules.</p>
            <p><strong>Concepts:</strong> Dynamic programming, recursion, memoization.</p>
            <p><strong>Approach:</strong> Define states for matching prefixes and carefully handle the '*' operator.</p>
            <p><strong>Target complexity:</strong> O(n × m) time, O(n × m) space using dynamic programming.</p>
            <a href="https://leetcode.com/problems/regular-expression-matching/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>15. Shortest Palindrome</h4>
            <p><strong>Task:</strong> Add characters in front of a String to make the shortest possible palindrome.</p>
            <p><strong>Concepts:</strong> KMP, LPS, prefix and suffix matching.</p>
            <p><strong>Approach:</strong> Find the longest palindromic prefix using KMP-style prefix processing.</p>
            <p><strong>Target complexity:</strong> O(n) time.</p>
            <a href="https://leetcode.com/problems/shortest-palindrome/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <h3>Recommended solving order</h3>
          <ol>
            <li>Understand the problem and write sample inputs.</li>
            <li>Try a brute-force solution first.</li>
            <li>Identify the repeated work in your solution.</li>
            <li>Choose the appropriate pattern or data structure.</li>
            <li>Write the optimized Java implementation.</li>
            <li>Dry-run normal cases and edge cases.</li>
            <li>Analyse time and space complexity.</li>
            <li>Re-solve the problem without looking at your previous code.</li>
          </ol>
        </article>

        <article id="interview" className="dsa-lesson-section">
          <p className="dsa-level">INTERVIEW PREPARATION · EXPERT LEVEL</p>
          <h2>10. String Interview Questions</h2>
          <p>
            Understand the reasoning behind each answer. Don't
            memorize definitions without being able to explain
            the examples and trade-offs.
          </p>

          <h3>Fundamentals</h3>

          <details className="dsa-interview-question">
            <summary>1. What is a String in Java?</summary>
            <p>A String is an object representing a sequence of characters. Java provides the String class in java.lang.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>2. Why are Strings immutable in Java?</summary>
            <p>Once created, a String's contents cannot be changed. Immutability supports safe sharing, String Pool reuse, predictable hashing and thread safety of the String value.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>3. What is the String Pool?</summary>
            <p>It is a special pool of canonical String instances. Identical String literals can reuse the same pooled object instead of creating separate objects.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>4. What is the difference between == and equals()?</summary>
            <p>== compares object references. equals() compares String contents. Use equals() when checking whether two Strings contain the same text.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>5. What does intern() do?</summary>
            <p>intern() returns the canonical pooled representation of a String. If an equivalent pooled String does not exist, the String is added to the pool.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>6. What is the difference between String, StringBuilder and StringBuffer?</summary>
            <p>String is immutable. StringBuilder is mutable and generally preferred for single-threaded modification. StringBuffer has synchronized methods for thread-safe individual operations.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>7. Why is repeated String concatenation inefficient?</summary>
            <p>Because every concatenation can create a new String and copy existing content. Repeated concatenation in a loop can take O(n²) total time. StringBuilder avoids repeatedly copying the entire accumulated result.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>8. Is String thread-safe?</summary>
            <p>String objects are immutable, so their contents can be safely shared between threads. This does not automatically make variables or compound operations involving Strings thread-safe.</p>
          </details>

          <h3>Java internals and operations</h3>

          <details className="dsa-interview-question">
            <summary>9. What is the difference between length() and capacity()?</summary>
            <p>String provides length(), which returns its number of UTF-16 code units. StringBuilder provides both length() and capacity(). Capacity is the available storage before another expansion is needed.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>10. What is the difference between trim() and strip()?</summary>
            <p>trim() removes leading and trailing characters whose values are at most U+0020. strip() uses Unicode-aware whitespace handling and was introduced in Java 11.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>11. What does compareTo() return?</summary>
            <p>It returns zero when the Strings are equal, a negative value when the first String is lexicographically smaller, and a positive value when it is larger. Do not assume it returns only -1, 0 or 1.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>12. What is the difference between substring and subsequence?</summary>
            <p>A substring is contiguous. A subsequence preserves relative order but does not need to be contiguous. For example, "ace" is a subsequence of "abcde", but not a substring.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>13. Is StringBuilder always faster than StringBuffer?</summary>
            <p>StringBuilder generally has less synchronization overhead. Actual performance depends on the workload. StringBuffer's synchronized methods do not make a sequence of multiple method calls automatically atomic.</p>
          </details>

          <h3>Problem-solving and patterns</h3>

          <details className="dsa-interview-question">
            <summary>14. How do you check whether two Strings are anagrams?</summary>
            <p>For a known fixed alphabet, count character frequencies in one String and subtract frequencies from the other. If every count is zero and the lengths match, they are anagrams. Define whether case and spaces matter.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>15. How do you find the first non-repeating character?</summary>
            <p>Count the frequency of every character in one traversal. Traverse again and return the first character whose frequency is one. This takes O(n) time.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>16. When should you use sliding window for Strings?</summary>
            <p>Use it when the problem asks about contiguous substrings and a window can be expanded or contracted while maintaining a useful condition, such as character frequencies or uniqueness.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>17. What is the difference between brute-force substring search and KMP?</summary>
            <p>Brute force may repeat comparisons after a mismatch and take O(n × m) time. KMP uses LPS information to avoid unnecessary comparisons and guarantees O(n + m) time.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>18. What is the LPS array in KMP?</summary>
            <p>For each pattern position, LPS stores the length of the longest proper prefix that is also a suffix of the pattern prefix ending at that position.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>19. What is a hash collision in Rabin–Karp?</summary>
            <p>A collision occurs when different Strings produce the same hash value. Therefore, after a hash match, verify the actual characters before reporting a pattern match.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>20. What is the Z-array?</summary>
            <p>Z[i] stores the length of the longest substring starting at index i that matches the prefix of the complete String. It can support linear-time pattern searching.</p>
          </details>

          <h3>Advanced Java and Unicode</h3>

          <details className="dsa-interview-question">
            <summary>21. Does String.length() count visible characters?</summary>
            <p>No. It counts UTF-16 code units. A supplementary Unicode code point can occupy two code units. codePointCount() counts code points, but not necessarily user-perceived grapheme clusters.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>22. What is a surrogate pair?</summary>
            <p>In UTF-16, a supplementary Unicode code point is represented using two char values: a high surrogate and a low surrogate.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>23. Why can two visually identical Strings fail equals()?</summary>
            <p>They may use different Unicode code-point sequences, such as a precomposed accented letter versus a base letter followed by a combining mark. Unicode normalization can help compare canonically equivalent text.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>24. Why use Locale.ROOT when converting identifiers to lowercase?</summary>
            <p>Default-locale case conversion can produce language-specific results. Locale.ROOT provides locale-independent case conversion for identifiers and other language-neutral text.</p>
          </details>

          <details className="dsa-interview-question">
            <summary>25. How do you optimize a String algorithm?</summary>
            <p>First identify the repeated work. Consider two pointers, sliding windows, frequency counting, hashing, prefix information or dynamic programming. Then prove the time and space complexity and test edge cases.</p>
          </details>

          <h3>Interview readiness checklist</h3>
          <ul>
            <li>Explain String immutability and the String Pool with examples.</li>
            <li>Differentiate ==, equals() and compareTo().</li>
            <li>Write StringBuilder-based solutions.</li>
            <li>Implement two-pointer and sliding-window problems.</li>
            <li>Explain frequency counting and HashMap-based solutions.</li>
            <li>Build the LPS array and implement KMP.</li>
            <li>Explain rolling hashes and collisions.</li>
            <li>Build a Z-array and use it for pattern matching.</li>
            <li>Handle Unicode and boundary cases correctly.</li>
            <li>Analyse complexity and defend your approach.</li>
          </ul>
        </article>

          <div className="dsa-completion-panel">
            <h2>Strings Learning Checklist</h2>
            <p>
              Mark each section complete after studying the concepts
              and practising the related problems.
            </p>

            {sections.map((section) => (
              <label className="dsa-completion-item" key={section.id}>
                <input
                  type="checkbox"
                  checked={completedSections.includes(section.id)}
                  onChange={() => toggleSection(section.id)}
                />
                <span>{section.label}</span>
              </label>
            ))}

            <div className="dsa-completion-summary">
              <strong>
                {completedSections.length} / {sections.length} sections completed
              </strong>
              <p>
                {progress === 100
                  ? 'Congratulations! You have completed the Strings lesson.'
                  : 'Keep learning and practising. You are making progress!'}
              </p>
            </div>
          </div>


      </main>

    </section>
  );
}

export default StringsLesson;
