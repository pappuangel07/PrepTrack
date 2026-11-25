
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
    title: "1. What is the Java Collections Framework?",
    content: (
      <>
        <p>
          The Java Collections Framework provides interfaces and classes
          for storing and manipulating groups of objects.
        </p>
        <p>
          Collections can grow or shrink dynamically. They provide
          operations such as adding, removing, searching, sorting,
          and traversing elements.
        </p>
        <ul>
          <li>List: ordered collection, allows duplicates.</li>
          <li>Set: collection of unique elements.</li>
          <li>Queue: designed for processing elements.</li>
          <li>Map: stores key-value pairs.</li>
        </ul>
      </>
    ),
    code: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.HashMap;

ArrayList<Integer> list = new ArrayList<>();
HashSet<Integer> set = new HashSet<>();
HashMap<String, Integer> map = new HashMap<>();`,
  },
  {
    title: "2. Collection hierarchy",
    content: (
      <>
        <p>
          Collection is an interface that represents a group of elements.
          List, Set, and Queue are major interfaces derived from it.
        </p>
        <p>
          Map is part of the Collections Framework, but it does not
          extend the Collection interface.
        </p>
      </>
    ),
    code: `Iterable
   |
   Collection
   |
   |-- List
   |    |-- ArrayList
   |    |-- LinkedList
   |    |-- Vector
   |
   |-- Set
   |    |-- HashSet
   |    |-- LinkedHashSet
   |    |-- TreeSet
   |
   |-- Queue
        |-- PriorityQueue
        |-- LinkedList

Map
   |-- HashMap
   |-- LinkedHashMap
   |-- TreeMap`,
  },
  {
    title: "3. Generics",
    content: (
      <>
        <p>
          Generics allow a collection to specify the type of elements
          it stores.
        </p>
        <p>
          They provide compile-time type checking and reduce the need
          for manual type casting.
        </p>
        <p>
          Java collections store objects, so primitive values use
          wrapper classes such as Integer and Double.
        </p>
      </>
    ),
    code: `ArrayList<Integer> numbers = new ArrayList<>();

numbers.add(10);
numbers.add(20);

// numbers.add("Java"); // Compile-time error

int value = numbers.get(0);`,
  },
  {
    title: "4. ArrayList",
    content: (
      <>
        <p>
          ArrayList is a resizable array implementation of the List
          interface.
        </p>
        <ul>
          <li>Maintains insertion order.</li>
          <li>Allows duplicate elements.</li>
          <li>Allows null elements.</li>
          <li>Fast indexed access.</li>
          <li>Insertion or deletion in the middle may require shifting.</li>
        </ul>
        <p>
          It is a good default choice when you need a dynamic list
          and frequent index-based access.
        </p>
      </>
    ),
    code: `import java.util.ArrayList;

ArrayList<String> names = new ArrayList<>();

names.add("Ravi");
names.add("Meena");
names.add("Ravi");

System.out.println(names);
System.out.println(names.get(1));
System.out.println(names.size());`,
  },
  {
    title: "5. Common ArrayList methods",
    content: (
      <>
        <table>
          <thead>
            <tr><th>Method</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td>add(value)</td><td>Add element</td></tr>
            <tr><td>add(index, value)</td><td>Insert at index</td></tr>
            <tr><td>get(index)</td><td>Access element</td></tr>
            <tr><td>set(index, value)</td><td>Replace element</td></tr>
            <tr><td>remove(index)</td><td>Remove by index</td></tr>
            <tr><td>remove(value)</td><td>Remove matching object</td></tr>
            <tr><td>contains(value)</td><td>Check membership</td></tr>
            <tr><td>size()</td><td>Number of elements</td></tr>
            <tr><td>clear()</td><td>Remove all elements</td></tr>
            <tr><td>isEmpty()</td><td>Check whether empty</td></tr>
          </tbody>
        </table>
      </>
    ),
    code: `ArrayList<Integer> nums = new ArrayList<>();

nums.add(10);
nums.add(20);
nums.add(30);

nums.set(1, 99);
nums.remove(0);

System.out.println(nums); // [99, 30]
System.out.println(nums.contains(30)); // true`,
  },
  {
    title: "6. ArrayList internal working",
    content: (
      <>
        <p>
          ArrayList uses an internal array to store elements.
        </p>
        <p>
          When the internal array becomes full, it allocates a larger
          array and copies existing elements into it.
        </p>
        <p>
          This resizing makes individual append operations occasionally
          expensive, but append is amortized O(1).
        </p>
        <p>
          ArrayList is not synchronized by default.
        </p>
      </>
    ),
    code: `// Typical complexity

// get(index): O(1)
// set(index): O(1)
// append: amortized O(1)
// insert at middle: O(n)
// remove at middle: O(n)
// search by value: O(n)`,
  },
  {
    title: "7. LinkedList",
    content: (
      <>
        <p>
          LinkedList is a doubly linked list implementation of List
          and Deque.
        </p>
        <p>
          Each node stores an element and links to the previous and
          next nodes.
        </p>
        <ul>
          <li>Maintains insertion order.</li>
          <li>Allows duplicates.</li>
          <li>Efficient insertion/removal at ends.</li>
          <li>Indexed access requires traversal.</li>
        </ul>
      </>
    ),
    code: `import java.util.LinkedList;

LinkedList<String> names = new LinkedList<>();

names.add("A");
names.add("B");
names.addFirst("Start");
names.addLast("End");

System.out.println(names);

names.removeFirst();
names.removeLast();`,
  },
  {
    title: "8. ArrayList vs LinkedList",
    content: (
      <>
        <table>
          <thead>
            <tr><th>ArrayList</th><th>LinkedList</th></tr>
          </thead>
          <tbody>
            <tr><td>Resizable array</td><td>Doubly linked nodes</td></tr>
            <tr><td>Fast indexed access</td><td>Slow indexed access</td></tr>
            <tr><td>Middle insert shifts elements</td><td>Relinking is efficient after reaching node</td></tr>
            <tr><td>Usually less memory overhead</td><td>Extra memory for node links</td></tr>
            <tr><td>Often good general-purpose List</td><td>Useful for deque operations</td></tr>
          </tbody>
        </table>
        <p>
          LinkedList does not make arbitrary middle insertion O(1):
          finding the position still takes time.
        </p>
      </>
    ),
    code: `// ArrayList
list.get(100); // O(1)

// LinkedList
linkedList.get(100); // O(n)

// LinkedList at the ends
linkedList.addFirst(10);
linkedList.addLast(20);`,
  },
  {
    title: "9. HashSet",
    content: (
      <>
        <p>
          HashSet implements Set and stores unique elements.
        </p>
        <ul>
          <li>Does not guarantee iteration order.</li>
          <li>Does not allow duplicate elements.</li>
          <li>Allows one null element.</li>
          <li>Uses hashing for membership operations.</li>
        </ul>
        <p>
          Add returns false when the element is already present.
        </p>
      </>
    ),
    code: `import java.util.HashSet;

HashSet<Integer> set = new HashSet<>();

set.add(10);
set.add(20);
set.add(10);

System.out.println(set.size()); // 2
System.out.println(set.contains(20)); // true`,
  },
  {
    title: "10. Hashing and HashSet internals",
    content: (
      <>
        <p>
          Hash-based collections use hash codes to help locate elements.
        </p>
        <p>
          HashSet is backed by a HashMap internally. The set element
          is stored as a map key.
        </p>
        <p>
          Average add, remove, and contains operations are O(1) under
          suitable hashing conditions. Worst-case behavior can be slower.
        </p>
        <p>
          Correct equals() and hashCode() implementations are important
          when storing custom objects.
        </p>
      </>
    ),
    code: `// HashSet uses hashCode() and equals()
// to determine element uniqueness.

// If two objects are equal according
// to equals(), they must have equal
// hashCode() values.`,
  },
  {
    title: "11. LinkedHashSet and TreeSet",
    content: (
      <>
        <p>
          LinkedHashSet maintains insertion order while storing unique
          elements.
        </p>
        <p>
          TreeSet stores unique elements in sorted order.
        </p>
        <table>
          <thead>
            <tr><th>Collection</th><th>Order</th></tr>
          </thead>
          <tbody>
            <tr><td>HashSet</td><td>No guaranteed order</td></tr>
            <tr><td>LinkedHashSet</td><td>Insertion order</td></tr>
            <tr><td>TreeSet</td><td>Sorted order</td></tr>
          </tbody>
        </table>
      </>
    ),
    code: `import java.util.LinkedHashSet;
import java.util.TreeSet;

LinkedHashSet<Integer> linked =
    new LinkedHashSet<>();

linked.add(3);
linked.add(1);
linked.add(2);

// Iteration: 3, 1, 2

TreeSet<Integer> sorted = new TreeSet<>();

sorted.add(3);
sorted.add(1);
sorted.add(2);

// Iteration: 1, 2, 3`,
  },
  {
    title: "12. HashMap",
    content: (
      <>
        <p>
          HashMap stores key-value pairs.
        </p>
        <ul>
          <li>Keys must be unique.</li>
          <li>Values can be duplicated.</li>
          <li>Allows one null key and multiple null values.</li>
          <li>Does not guarantee iteration order.</li>
        </ul>
        <p>
          Adding a value using an existing key replaces the old value.
        </p>
      </>
    ),
    code: `import java.util.HashMap;

HashMap<String, Integer> marks = new HashMap<>();

marks.put("Ravi", 90);
marks.put("Meena", 95);
marks.put("Ravi", 99);

System.out.println(marks.get("Ravi")); // 99
System.out.println(marks.size()); // 2`,
  },
  {
    title: "13. Common HashMap methods",
    content: (
      <>
        <table>
          <thead>
            <tr><th>Method</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td>put(key, value)</td><td>Add or replace mapping</td></tr>
            <tr><td>get(key)</td><td>Get value</td></tr>
            <tr><td>getOrDefault()</td><td>Get value or fallback</td></tr>
            <tr><td>containsKey(key)</td><td>Check key</td></tr>
            <tr><td>containsValue(value)</td><td>Check value</td></tr>
            <tr><td>remove(key)</td><td>Remove mapping</td></tr>
            <tr><td>keySet()</td><td>View keys</td></tr>
            <tr><td>values()</td><td>View values</td></tr>
            <tr><td>entrySet()</td><td>View key-value entries</td></tr>
          </tbody>
        </table>
      </>
    ),
    code: `HashMap<String, Integer> map = new HashMap<>();

map.put("Java", 10);
map.put("DSA", 20);

System.out.println(map.get("Java"));
System.out.println(map.getOrDefault("SQL", 0));

System.out.println(map.containsKey("DSA"));`,
  },
  {
    title: "14. HashMap traversal",
    content: (
      <>
        <p>
          Use entrySet() when you need both keys and values.
        </p>
        <p>
          Use keySet() when you need only keys, and values() when you
          need only values.
        </p>
        <p>
          HashMap iteration order is not guaranteed.
        </p>
      </>
    ),
    code: `HashMap<String, Integer> map = new HashMap<>();

map.put("Java", 10);
map.put("DSA", 20);

for (Map.Entry<String, Integer> entry
        : map.entrySet()) {
    System.out.println(
        entry.getKey() + " " +
        entry.getValue()
    );
}`,
  },
  {
    title: "15. HashMap internal working",
    content: (
      <>
        <p>
          HashMap uses a hash table structure.
        </p>
        <p>
          A key's hash code helps determine a bucket. If multiple keys
          map to the same bucket, the collection handles the collision.
        </p>
        <p>
          Java HashMap can use linked nodes and may treeify a heavily
          collided bucket under specific conditions.
        </p>
        <p>
          Average get and put are O(1) under suitable hashing
          conditions, while worst-case behavior depends on collisions
          and implementation details.
        </p>
      </>
    ),
    code: `// Simplified idea

hash = key.hashCode()
bucket = calculateBucket(hash)

// Search bucket:
// 1. Compare hash
// 2. Compare keys using equals()

// Actual implementation is more
// detailed than this simplified model.`,
  },
  {
    title: "16. Iterator",
    content: (
      <>
        <p>
          Iterator provides a standard way to traverse a collection.
        </p>
        <ul>
          <li><code>hasNext()</code>: checks whether another element exists.</li>
          <li><code>next()</code>: returns the next element.</li>
          <li><code>remove()</code>: removes the current element through the iterator.</li>
        </ul>
        <p>
          Use iterator.remove() when removing elements during iteration.
        </p>
      </>
    ),
    code: `ArrayList<Integer> list = new ArrayList<>();

list.add(10);
list.add(20);
list.add(30);

Iterator<Integer> it = list.iterator();

while (it.hasNext()) {
    int value = it.next();

    if (value == 20) {
        it.remove();
    }
}

System.out.println(list); // [10, 30]`,
  },
  {
    title: "17. Fail-fast behavior",
    content: (
      <>
        <p>
          Many standard collection iterators are fail-fast.
          They may throw ConcurrentModificationException if the
          collection is structurally modified outside the iterator
          while iteration is in progress.
        </p>
        <p>
          Fail-fast behavior is best-effort and should not be used
          as a concurrency control mechanism.
        </p>
        <p>
          Use iterator.remove() for supported removal during iteration.
        </p>
      </>
    ),
    code: `ArrayList<Integer> list = new ArrayList<>();

list.add(1);
list.add(2);

for (Integer value : list) {
    // list.remove(value);
    // May cause ConcurrentModificationException
}`,
  },
  {
    title: "18. Comparable",
    content: (
      <>
        <p>
          Comparable defines a class's natural ordering.
        </p>
        <p>
          A class implements Comparable and overrides compareTo().
        </p>
        <p>
          compareTo returns a negative number, zero, or a positive
          number depending on the ordering.
        </p>
      </>
    ),
    code: `class Student implements Comparable<Student> {
    int marks;

    Student(int marks) {
        this.marks = marks;
    }

    @Override
    public int compareTo(Student other) {
        return Integer.compare(
            this.marks,
            other.marks
        );
    }
}`,
  },
  {
    title: "19. Comparator",
    content: (
      <>
        <p>
          Comparator defines an external or alternative ordering.
        </p>
        <p>
          It is useful when the same class needs different sorting
          rules, such as sorting students by marks or name.
        </p>
        <p>
          Comparator uses compare(a, b).
        </p>
      </>
    ),
    code: `import java.util.Comparator;

Comparator<Student> byMarks =
    new Comparator<Student>() {
        @Override
        public int compare(Student a, Student b) {
            return Integer.compare(
                a.marks,
                b.marks
            );
        }
    };

// Modern Java can use a lambda:
Comparator<Student> byMarksLambda =
    (a, b) -> Integer.compare(a.marks, b.marks);`,
  },
  {
    title: "20. Comparable vs Comparator",
    content: (
      <>
        <table>
          <thead>
            <tr><th>Comparable</th><th>Comparator</th></tr>
          </thead>
          <tbody>
            <tr><td>Natural ordering</td><td>Custom ordering</td></tr>
            <tr><td>compareTo()</td><td>compare()</td></tr>
            <tr><td>Implemented by the class</td><td>Often separate from the class</td></tr>
            <tr><td>Usually one natural order</td><td>Can define multiple orderings</td></tr>
          </tbody>
        </table>
      </>
    ),
    code: `// Sort by marks
students.sort(
    (a, b) -> Integer.compare(a.marks, b.marks)
);

// Sort by name
students.sort(
    (a, b) -> a.name.compareTo(b.name)
);`,
  },
  {
    title: "21. Queue and Deque",
    content: (
      <>
        <p>
          Queue is commonly used for processing elements in order.
          Many queues follow FIFO: first in, first out.
        </p>
        <p>
          Deque supports insertion and removal at both ends.
        </p>
        <ul>
          <li>offer(): add element.</li>
          <li>poll(): remove and return head, or null if empty.</li>
          <li>peek(): inspect head, or null if empty.</li>
          <li>addFirst() and addLast(): operate at deque ends.</li>
        </ul>
      </>
    ),
    code: `import java.util.ArrayDeque;
import java.util.Queue;
import java.util.Deque;

Queue<Integer> queue = new ArrayDeque<>();

queue.offer(10);
queue.offer(20);

System.out.println(queue.poll()); // 10

Deque<Integer> deque = new ArrayDeque<>();

deque.addFirst(1);
deque.addLast(2);`,
  },
  {
    title: "22. PriorityQueue",
    content: (
      <>
        <p>
          PriorityQueue processes elements according to priority,
          not insertion order.
        </p>
        <p>
          By default, Java's PriorityQueue places the smallest element
          at the head for natural ordering.
        </p>
        <p>
          Iterating over a PriorityQueue does not guarantee sorted order.
          Repeatedly polling returns elements in priority order.
        </p>
      </>
    ),
    code: `import java.util.PriorityQueue;

PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(30);
pq.offer(10);
pq.offer(20);

System.out.println(pq.poll()); // 10
System.out.println(pq.poll()); // 20
System.out.println(pq.poll()); // 30`,
  },
  {
    title: "23. Collections utility class",
    content: (
      <>
        <p>
          The Collections class provides static utility methods for
          working with collections.
        </p>
        <ul>
          <li>sort()</li>
          <li>reverse()</li>
          <li>shuffle()</li>
          <li>max()</li>
          <li>min()</li>
          <li>frequency()</li>
          <li>unmodifiableList()</li>
        </ul>
        <p>
          Collections is a utility class. Collection is an interface.
        </p>
      </>
    ),
    code: `import java.util.Collections;

ArrayList<Integer> list = new ArrayList<>();

list.add(3);
list.add(1);
list.add(2);

Collections.sort(list);
Collections.reverse(list);

System.out.println(list);`,
  },
  {
    title: "24. Collection complexity summary",
    content: (
      <>
        <table>
          <thead>
            <tr><th>Operation</th><th>Typical complexity</th></tr>
          </thead>
          <tbody>
            <tr><td>ArrayList get(index)</td><td>O(1)</td></tr>
            <tr><td>ArrayList append</td><td>Amortized O(1)</td></tr>
            <tr><td>ArrayList middle insert/remove</td><td>O(n)</td></tr>
            <tr><td>LinkedList get(index)</td><td>O(n)</td></tr>
            <tr><td>LinkedList add/remove at ends</td><td>O(1)</td></tr>
            <tr><td>HashSet contains</td><td>Average O(1)</td></tr>
            <tr><td>HashMap get/put</td><td>Average O(1)</td></tr>
            <tr><td>TreeSet / TreeMap operations</td><td>O(log n)</td></tr>
            <tr><td>PriorityQueue offer/poll</td><td>O(log n)</td></tr>
          </tbody>
        </table>
        <p>
          These are typical estimates, not unconditional guarantees.
        </p>
      </>
    ),
    code: `// Choose based on operation:

// Frequent indexed access -> ArrayList
// Unique elements -> HashSet
// Key-value lookup -> HashMap
// Sorted unique elements -> TreeSet
// Priority processing -> PriorityQueue
// Queue/deque operations -> ArrayDeque`,
  },
  {
    title: "25. Common mistakes",
    content: (
      <>
        <ul>
          <li>Using primitive types directly as generic arguments.</li>
          <li>Assuming HashSet preserves insertion order.</li>
          <li>Assuming HashMap is sorted by key.</li>
          <li>Using == to compare custom object contents.</li>
          <li>Overriding equals() without hashCode().</li>
          <li>Removing elements directly during enhanced for iteration.</li>
          <li>Assuming LinkedList indexed access is O(1).</li>
          <li>Assuming PriorityQueue iteration is sorted.</li>
          <li>Confusing Collection with Collections.</li>
          <li>Assuming Map extends Collection.</li>
        </ul>
      </>
    ),
    code: `// Correct generic type
ArrayList<Integer> numbers = new ArrayList<>();

// Not valid:
// ArrayList<int> numbers;

// Compare String content
a.equals(b);

// Use iterator for safe iterator removal
Iterator<Integer> it = numbers.iterator();`,
  },
  {
    title: "26. Practice problems",
    content: (
      <>
        <ol>
          <li>Store and print student names using ArrayList.</li>
          <li>Remove duplicate numbers using HashSet.</li>
          <li>Count character frequencies using HashMap.</li>
          <li>Find the first non-repeating character.</li>
          <li>Sort custom Student objects by marks.</li>
          <li>Sort students by name using Comparator.</li>
          <li>Use a PriorityQueue to find the kth largest element.</li>
          <li>Use a Queue to simulate a waiting line.</li>
          <li>Remove even numbers from a list using Iterator.</li>
          <li>Group words by frequency using a Map.</li>
        </ol>
      </>
    ),
    code: `// Character frequency

String text = "java";
HashMap<Character, Integer> freq = new HashMap<>();

for (char ch : text.toCharArray()) {
    freq.put(
        ch,
        freq.getOrDefault(ch, 0) + 1
    );
}

System.out.println(freq);`,
  },
  {
    title: "27. Interview questions",
    content: (
      <>
        <ol>
          <li>What is the Collections Framework?</li>
          <li>Explain List, Set, Queue, and Map.</li>
          <li>Why does Map not extend Collection?</li>
          <li>ArrayList vs LinkedList?</li>
          <li>How does HashSet work internally?</li>
          <li>How does HashMap work internally?</li>
          <li>What are collisions in hashing?</li>
          <li>Why are equals() and hashCode() related?</li>
          <li>HashSet vs TreeSet?</li>
          <li>HashMap vs TreeMap?</li>
          <li>Comparable vs Comparator?</li>
          <li>What is an Iterator?</li>
          <li>What is ConcurrentModificationException?</li>
          <li>How does PriorityQueue work?</li>
          <li>What is the difference between Collection and Collections?</li>
        </ol>
      </>
    ),
    code: `// Key points:
// ArrayList -> dynamic array
// LinkedList -> doubly linked list
// HashSet -> unique elements
// HashMap -> key-value pairs
// TreeSet -> sorted unique elements
// PriorityQueue -> priority-based processing`,
  },
];

export default function CollectionsLesson({ onBack }) {
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
        Java Collections Framework
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn dynamic data structures, lists, sets, maps, queues,
        hashing, iterators, sorting, and collection complexity.
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
          <li>I understand the Collections Framework hierarchy.</li>
          <li>I can use ArrayList and LinkedList.</li>
          <li>I understand HashSet and HashMap.</li>
          <li>I can traverse collections using Iterator.</li>
          <li>I understand Comparable and Comparator.</li>
          <li>I can use Queue, Deque, and PriorityQueue.</li>
          <li>I understand common collection complexities.</li>
          <li>I can solve the practice problems independently.</li>
        </ul>
      </section>
    </div>
  );
}
