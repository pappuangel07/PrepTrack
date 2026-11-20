import { useState } from 'react';

const sections = [
  { id: 'intro', label: '1. Introduction to Hashing' },
  { id: 'hash-functions', label: '2. Hash Functions' },
  { id: 'collisions', label: '3. Collision Handling' },
  { id: 'internals', label: '4. Internal Working' },
  { id: 'complexity', label: '5. Time and Space Complexity' },
  { id: 'java', label: '6. Hashing in Java' },
  { id: 'patterns', label: '7. Problem-Solving Patterns' },
  { id: 'advanced', label: '8. Advanced Concepts' },
  { id: 'edge-cases', label: '9. Edge Cases and Mistakes' },
  { id: 'practice', label: '10. Coding Practice' },
  { id: 'interview', label: '11. Interview Questions' },
];

function CodeExample({ children }) {
  return (
    <pre className="dsa-code">
      <code>{children}</code>
    </pre>
  );
}

function HashingLesson({ onBack }) {
  const [activeSection, setActiveSection] = useState('intro');
  const [completedSections, setCompletedSections] = useState([]);

  const progress = Math.round(
    (completedSections.length / sections.length) * 100
  );

  function toggleSection(id) {
    setCompletedSections((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <section className="dsa-lesson">
      <button className="secondary-button" onClick={onBack}>
        ← Back to DSA Topics
      </button>

      <header className="dsa-lesson-header">
        <h1>Hashing</h1>
        <p>
          Learn how hashing stores and retrieves data efficiently using
          hash functions and hash tables.
        </p>

        <div className="dsa-progress-info">
          <span>Lesson progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="dsa-progress-bar">
          <div
            className="dsa-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="dsa-lesson-layout">
        <nav className="dsa-lesson-nav">
          <h3>Contents</h3>

          {sections.map((section) => (
            <button
              key={section.id}
              className={
                activeSection === section.id ? 'active' : ''
              }
              onClick={() => setActiveSection(section.id)}
            >
              {completedSections.includes(section.id) ? '✓ ' : ''}
              {section.label}
            </button>
          ))}
        </nav>

        <article className="dsa-lesson-content">

          {activeSection === 'intro' && (
            <>
              <h2>1. Introduction to Hashing</h2>

              <h3>What is Hashing?</h3>
              <p>
                Hashing is a technique used to store and retrieve data
                efficiently. It converts a key into an index using a
                hash function.
              </p>

              <p>
                Instead of searching every element one by one, hashing
                helps us directly access the location where data is
                expected to be stored.
              </p>

              <h3>Real-world example</h3>
              <p>
                Imagine a college student database. Each student has a
                unique roll number. A hashing system can convert that
                roll number into a storage index to find the student's
                record quickly.
              </p>

              <h3>Important terminology</h3>
              <ul>
                <li><strong>Key:</strong> The input used to identify data.</li>
                <li><strong>Hash Function:</strong> Converts a key into an index.</li>
                <li><strong>Hash Table:</strong> Data structure that stores key-value pairs.</li>
                <li><strong>Bucket:</strong> A location in the hash table.</li>
                <li><strong>Collision:</strong> When different keys map to the same index.</li>
              </ul>

              <h3>Why do we use hashing?</h3>
              <ul>
                <li>Fast searching.</li>
                <li>Fast insertion and deletion on average.</li>
                <li>Counting frequencies.</li>
                <li>Finding duplicates.</li>
                <li>Checking whether an element exists.</li>
              </ul>
            </>
          )}

          {activeSection === 'hash-functions' && (
            <>
              <h2>2. Hash Functions</h2>

              <h3>What is a Hash Function?</h3>
              <p>
                A hash function takes a key as input and produces an
                integer index for storing that key in a hash table.
              </p>

              <CodeExample>{`index = hash(key) % tableSize`}</CodeExample>

              <h3>Example</h3>
              <p>
                Suppose the key is 27 and the table size is 10.
              </p>

              <CodeExample>{`index = 27 % 10
index = 7`}</CodeExample>

              <p>
                The key will be stored at index 7.
              </p>

              <h3>Properties of a good hash function</h3>
              <ul>
                <li>It should be fast to calculate.</li>
                <li>It should distribute keys uniformly.</li>
                <li>It should reduce collisions.</li>
                <li>The same key should produce the same hash value.</li>
              </ul>

              <h3>Important point</h3>
              <p>
                A hash function cannot guarantee that every key gets a
                unique index. Different keys can produce the same index.
                This is called a collision.
              </p>
            </>
          )}

          {activeSection === 'collisions' && (
            <>
              <h2>3. Collision Handling</h2>

              <h3>What is a Collision?</h3>
              <p>
                A collision occurs when two or more different keys
                produce the same hash table index.
              </p>

              <CodeExample>{`hash(12) % 10 = 2
hash(22) % 10 = 2

Both keys map to index 2.`}</CodeExample>

              <h3>Method 1: Separate Chaining</h3>
              <p>
                Each bucket stores a collection of elements. When
                multiple keys map to the same index, they are stored
                together in that bucket, commonly using a linked list
                or another collection.
              </p>

              <CodeExample>{`Index 0: -
Index 1: -
Index 2: 12 -> 22 -> 32
Index 3: -
Index 4: -`}</CodeExample>

              <h3>Method 2: Open Addressing</h3>
              <p>
                All elements are stored inside the hash table itself.
                If a position is occupied, another available position
                is searched.
              </p>

              <h3>Linear Probing</h3>
              <p>
                Check the next position one by one until an empty slot
                is found.
              </p>

              <CodeExample>{`index = (hash(key) + i) % tableSize

i = 0, 1, 2, 3, ...`}</CodeExample>

              <h3>Quadratic Probing</h3>
              <p>
                Search using squared increments instead of checking
                consecutive positions.
              </p>

              <CodeExample>{`index = (hash(key) + i * i) % tableSize`}</CodeExample>

              <h3>Double Hashing</h3>
              <p>
                Uses a second hash function to decide the step size
                when a collision occurs.
              </p>

              <CodeExample>{`index = (hash1(key) + i * hash2(key))
        % tableSize`}</CodeExample>

              <h3>Comparison</h3>
              <ul>
                <li>Chaining stores collided elements in the same bucket.</li>
                <li>Open addressing searches for another empty slot.</li>
                <li>Linear probing can cause primary clustering.</li>
                <li>Quadratic probing reduces primary clustering.</li>
                <li>Double hashing helps reduce clustering further.</li>
              </ul>
            </>
          )}

          {activeSection === 'internals' && (
            <>
              <h2>4. Internal Working</h2>

              <h3>How does a Hash Table work?</h3>
              <ol>
                <li>Receive a key.</li>
                <li>Pass the key to the hash function.</li>
                <li>Calculate the hash value.</li>
                <li>Convert it into a valid table index.</li>
                <li>Store or retrieve the value at that index.</li>
                <li>Handle collisions if the position is occupied.</li>
              </ol>

              <h3>Insertion example</h3>
              <CodeExample>{`Table size = 10
Key = 42

Index = 42 % 10
Index = 2

Store 42 at index 2.`}</CodeExample>

              <h3>Load Factor</h3>
              <p>
                Load factor measures how full a hash table is.
              </p>

              <CodeExample>{`Load Factor = Number of elements / Table size`}</CodeExample>

              <p>
                Example: 7 elements in a table with 10 buckets gives
                a load factor of 0.7.
              </p>

              <h3>Rehashing</h3>
              <p>
                When a hash table becomes too full, it may create a
                larger table and calculate new positions for existing
                elements. This process is called rehashing.
              </p>

              <h3>Why rehashing?</h3>
              <ul>
                <li>To reduce collisions.</li>
                <li>To maintain efficient operations.</li>
                <li>To provide more available buckets.</li>
              </ul>
            </>
          )}

          {activeSection === 'complexity' && (
            <>
              <h2>5. Time and Space Complexity</h2>

              <table>
                <thead>
                  <tr>
                    <th>Operation</th>
                    <th>Average</th>
                    <th>Worst Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Search</td><td>O(1)</td><td>O(n)</td></tr>
                  <tr><td>Insertion</td><td>O(1)</td><td>O(n)</td></tr>
                  <tr><td>Deletion</td><td>O(1)</td><td>O(n)</td></tr>
                </tbody>
              </table>

              <h3>Why is the average case O(1)?</h3>
              <p>
                A good hash function distributes elements across
                buckets. Most operations can access the required
                bucket directly without scanning the entire structure.
              </p>

              <h3>Why can the worst case become O(n)?</h3>
              <p>
                If many keys collide into the same bucket, searching
                that bucket may require checking many elements.
              </p>

              <h3>Space Complexity</h3>
              <p>
                A hash table storing n elements generally requires
                O(n) space. Additional space may be needed for unused
                buckets and collision-handling structures.
              </p>

              <p>
                Important: O(1) is an average-case expectation, not
                a guarantee for every operation.
              </p>
            </>
          )}

          {activeSection === 'java' && (
            <>
              <h2>6. Hashing in Java</h2>

              <h3>Important Java Classes</h3>
              <ul>
                <li><strong>HashMap:</strong> Stores key-value pairs.</li>
                <li><strong>HashSet:</strong> Stores unique elements.</li>
                <li><strong>Hashtable:</strong> Legacy synchronized key-value collection.</li>
                <li><strong>LinkedHashMap:</strong> Maintains insertion order.</li>
                <li><strong>TreeMap:</strong> Stores keys in sorted order.</li>
              </ul>

              <h3>HashMap example</h3>
              <CodeExample>{`import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> marks = new HashMap<>();

        marks.put("Angel", 90);
        marks.put("John", 85);

        System.out.println(marks.get("Angel"));

        System.out.println(marks.containsKey("John"));

        marks.remove("John");

        System.out.println(marks);
    }
}`}</CodeExample>

              <h3>HashSet example</h3>
              <CodeExample>{`import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<Integer> numbers = new HashSet<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(10);

        System.out.println(numbers.size());
        System.out.println(numbers.contains(20));
    }
}`}</CodeExample>

              <h3>Frequency counting with HashMap</h3>
              <CodeExample>{`import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 2, 3, 1, 2};

        HashMap<Integer, Integer> freq = new HashMap<>();

        for (int num : arr) {
            freq.put(num, freq.getOrDefault(num, 0) + 1);
        }

        System.out.println(freq);
    }
}`}</CodeExample>

              <h3>Important Java details</h3>
              <ul>
                <li>HashMap allows one null key and multiple null values.</li>
                <li>HashSet does not allow duplicate elements.</li>
                <li>HashMap does not guarantee iteration order.</li>
                <li>HashMap is not thread-safe by default.</li>
                <li>Keys should have consistent equals() and hashCode() implementations.</li>
              </ul>
            </>
          )}

          {activeSection === 'patterns' && (
            <>
              <h2>7. Problem-Solving Patterns</h2>

              <h3>Pattern 1: Frequency Counting</h3>
              <p>
                Use a HashMap to count how many times each element
                appears.
              </p>

              <CodeExample>{`for (int num : arr) {
    freq.put(num, freq.getOrDefault(num, 0) + 1);
}`}</CodeExample>

              <p>Useful for: duplicates, majority elements and anagrams.</p>

              <h3>Pattern 2: Fast Lookup</h3>
              <p>
                Store elements in a HashSet when you only need to
                check whether an element exists.
              </p>

              <CodeExample>{`HashSet<Integer> set = new HashSet<>();

for (int num : arr) {
    set.add(num);
}

if (set.contains(target)) {
    System.out.println("Found");
}`}</CodeExample>

              <h3>Pattern 3: Complement Lookup</h3>
              <p>
                For problems like Two Sum, store previously seen
                values and check whether the required complement
                already exists.
              </p>

              <CodeExample>{`int complement = target - arr[i];

if (map.containsKey(complement)) {
    // A valid pair is found
}`}</CodeExample>

              <h3>Pattern 4: Prefix Sum + HashMap</h3>
              <p>
                Store prefix sums and their frequencies or indices
                to solve subarray problems efficiently.
              </p>

              <h3>Pattern 5: Grouping</h3>
              <p>
                Use a calculated key to group related elements.
                Example: group words that are anagrams using their
                character-frequency representation.
              </p>
            </>
          )}

          {activeSection === 'advanced' && (
            <>
              <h2>8. Advanced Concepts</h2>

              <h3>1. Hashing and String Matching</h3>
              <p>
                Rolling hash techniques calculate hash values for
                substrings efficiently. They are used in algorithms
                such as Rabin-Karp.
              </p>

              <h3>2. Cryptographic Hashing</h3>
              <p>
                Cryptographic hash functions such as SHA-256 are
                designed for security-related applications. They are
                different from ordinary hash table hash functions.
              </p>

              <h3>3. Immutable and Mutable Keys</h3>
              <p>
                A key should not change in a way that affects its
                equals() or hashCode() result while it is stored in
                a HashMap. Otherwise, retrieving it can fail.
              </p>

              <h3>4. HashMap Internal Working in Java</h3>
              <ul>
                <li>HashMap uses an array of buckets internally.</li>
                <li>A key's hash helps determine its bucket.</li>
                <li>Collisions are handled within the bucket.</li>
                <li>In modern Java, heavily-collided buckets can be converted into balanced trees under certain conditions.</li>
                <li>Resizing and rehashing occur when the capacity threshold is exceeded.</li>
              </ul>

              <h3>5. When should you avoid hashing?</h3>
              <ul>
                <li>When sorted order is required, consider TreeMap or sorting.</li>
                <li>When memory is extremely limited, another approach may be better.</li>
                <li>When worst-case guarantees matter, consider data structures with predictable bounds.</li>
              </ul>
            </>
          )}

          {activeSection === 'edge-cases' && (
            <>
              <h2>9. Edge Cases and Common Mistakes</h2>

              <ul>
                <li>Empty input collection.</li>
                <li>All elements are duplicates.</li>
                <li>No duplicate elements.</li>
                <li>Negative numbers as keys.</li>
                <li>Zero as a key or value.</li>
                <li>Very large integer values.</li>
                <li>Multiple keys producing the same hash.</li>
                <li>Missing keys when retrieving values.</li>
                <li>Null keys and null values in Java collections.</li>
                <li>Incorrect equals() and hashCode() implementations.</li>
              </ul>

              <h3>Common mistakes</h3>
              <ul>
                <li>Assuming HashMap always maintains insertion order.</li>
                <li>Assuming every operation is guaranteed O(1).</li>
                <li>Using a HashSet when frequency information is required.</li>
                <li>Overwriting a frequency instead of incrementing it.</li>
                <li>Forgetting that different keys can have the same hash.</li>
              </ul>

              <h3>Interview tip</h3>
              <p>
                Before choosing a HashMap or HashSet, ask yourself:
                Do I need key-value mapping, frequency counting,
                uniqueness, or just fast membership checking?
              </p>
            </>
          )}

          {activeSection === 'practice' && (
            <>
              <h2>10. Coding Practice</h2>

              <h3>Beginner Level</h3>
              <ol>
                <li>Count the frequency of each array element.</li>
                <li>Find duplicate elements in an array.</li>
                <li>Find the first repeating element.</li>
                <li>Find the first non-repeating element.</li>
                <li>Check whether two arrays contain the same elements.</li>
              </ol>

              <h3>Intermediate Level</h3>
              <ol>
                <li>Two Sum.</li>
                <li>Valid Anagram.</li>
                <li>Group Anagrams.</li>
                <li>Longest Consecutive Sequence.</li>
                <li>Subarray Sum Equals K.</li>
              </ol>

              <h3>Advanced Level</h3>
              <ol>
                <li>Longest Subarray with Zero Sum.</li>
                <li>Count Subarrays with XOR K.</li>
                <li>4Sum II.</li>
                <li>Minimum Window Substring.</li>
                <li>Rabin-Karp String Matching.</li>
              </ol>

              <h3>Practice strategy</h3>
              <p>
                First solve using brute force. Then identify repeated
                searching or counting operations. Replace those
                operations with a HashMap or HashSet and compare
                complexity.
              </p>
            </>
          )}

          {activeSection === 'interview' && (
            <>
              <h2>11. Interview Questions</h2>

              <h3>Conceptual Questions</h3>
              <ol>
                <li>What is hashing and why is it used?</li>
                <li>What is a hash function?</li>
                <li>What is a collision?</li>
                <li>Explain separate chaining and open addressing.</li>
                <li>What is load factor?</li>
                <li>What is rehashing?</li>
                <li>Why can hashing have O(n) worst-case complexity?</li>
                <li>What is the difference between HashMap and HashSet?</li>
                <li>How does Java HashMap work internally?</li>
                <li>Why should equals() and hashCode() be consistent?</li>
              </ol>

              <h3>Problem-Solving Questions</h3>
              <ol>
                <li>How would you find duplicates in an array?</li>
                <li>How would you count character frequencies?</li>
                <li>How would you solve Two Sum efficiently?</li>
                <li>How can hashing help find a zero-sum subarray?</li>
                <li>How would you group anagrams?</li>
              </ol>

              <h3>Important follow-up questions</h3>
              <ul>
                <li>What happens when two keys have the same hash?</li>
                <li>Can two different objects have the same hash code?</li>
                <li>Can a HashMap store duplicate keys?</li>
                <li>What happens when a key is modified after insertion?</li>
                <li>When would you choose TreeMap instead of HashMap?</li>
              </ul>
            </>
          )}

          <div className="dsa-section-completion">
            <button
              className="primary-button"
              onClick={() => toggleSection(activeSection)}
            >
              {completedSections.includes(activeSection)
                ? 'Mark as Incomplete'
                : 'Mark Section as Complete'}
            </button>
          </div>

          <div className="dsa-section-navigation">
            <button
              className="secondary-button"
              disabled={
                sections.findIndex((item) => item.id === activeSection) === 0
              }
              onClick={() => {
                const index = sections.findIndex(
                  (item) => item.id === activeSection
                );
                setActiveSection(sections[index - 1].id);
              }}
            >
              ← Previous
            </button>

            <button
              className="secondary-button"
              disabled={
                sections.findIndex((item) => item.id === activeSection) ===
                sections.length - 1
              }
              onClick={() => {
                const index = sections.findIndex(
                  (item) => item.id === activeSection
                );
                setActiveSection(sections[index + 1].id);
              }}
            >
              Next →
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default HashingLesson;