
import { useMemo, useState } from 'react';

const sections = [
  { id: 'intro', title: '1. Introduction' },
  { id: 'internals', title: '2. Internal Working' },
  { id: 'types', title: '3. Types of Linked Lists' },
  { id: 'operations', title: '4. Operations' },
  { id: 'complexity', title: '5. Time Complexity' },
  { id: 'java', title: '6. Java Implementation' },
  { id: 'patterns', title: '7. Problem-Solving Patterns' },
  { id: 'algorithms', title: '8. Important Algorithms' },
  { id: 'edge-cases', title: '9. Edge Cases' },
  { id: 'practice', title: '10. Practice Problems' },
  { id: 'interview', title: '11. Interview Questions' },
];

const problems = [
  {
    level: 'Beginner',
    name: 'Reverse Linked List',
    link: 'https://leetcode.com/problems/reverse-linked-list/',
    idea: 'Reverse every next pointer using previous, current and next references.',
    complexity: 'O(n) time, O(1) extra space',
  },
  {
    level: 'Beginner',
    name: 'Middle of the Linked List',
    link: 'https://leetcode.com/problems/middle-of-the-linked-list/',
    idea: 'Use slow and fast pointers. Fast moves two steps while slow moves one.',
    complexity: 'O(n) time, O(1) space',
  },
  {
    level: 'Beginner',
    name: 'Linked List Cycle',
    link: 'https://leetcode.com/problems/linked-list-cycle/',
    idea: 'Floyd’s cycle detection: slow and fast pointers meet if a cycle exists.',
    complexity: 'O(n) time, O(1) space',
  },
  {
    level: 'Beginner',
    name: 'Merge Two Sorted Lists',
    link: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    idea: 'Use a dummy node and repeatedly attach the smaller current node.',
    complexity: 'O(n + m) time',
  },
  {
    level: 'Intermediate',
    name: 'Remove Nth Node From End of List',
    link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    idea: 'Maintain a gap of n nodes between fast and slow pointers.',
    complexity: 'O(n) time, O(1) space',
  },
  {
    level: 'Intermediate',
    name: 'Add Two Numbers',
    link: 'https://leetcode.com/problems/add-two-numbers/',
    idea: 'Simulate digit-by-digit addition while carrying the overflow.',
    complexity: 'O(max(n, m)) time',
  },
  {
    level: 'Intermediate',
    name: 'Palindrome Linked List',
    link: 'https://leetcode.com/problems/palindrome-linked-list/',
    idea: 'Find the middle, reverse the second half and compare both halves.',
    complexity: 'O(n) time',
  },
  {
    level: 'Intermediate',
    name: 'Intersection of Two Linked Lists',
    link: 'https://leetcode.com/problems/intersection-of-two-linked-lists/',
    idea: 'Switch each pointer to the other list after reaching the end.',
    complexity: 'O(n + m) time, O(1) space',
  },
  {
    level: 'Advanced',
    name: 'Reverse Nodes in k-Group',
    link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
    idea: 'Reverse complete groups of k nodes and reconnect group boundaries.',
    complexity: 'O(n) time, O(1) auxiliary space',
  },
  {
    level: 'Advanced',
    name: 'Copy List with Random Pointer',
    link: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
    idea: 'Use a HashMap or interweave copied nodes with original nodes.',
    complexity: 'O(n) time',
  },
  {
    level: 'Advanced',
    name: 'Merge k Sorted Lists',
    link: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    idea: 'Use a min heap or divide-and-conquer merging.',
    complexity: 'O(N log k) with a min heap',
  },
  {
    level: 'Advanced',
    name: 'LRU Cache',
    link: 'https://leetcode.com/problems/lru-cache/',
    idea: 'Combine a HashMap with a doubly linked list for O(1) get and put.',
    complexity: 'O(1) average per operation',
  },
];

const questions = [
  {
    q: 'What is a Linked List?',
    a: 'A Linked List is a linear data structure made of nodes. Each node stores data and one or more references connecting it to other nodes. Unlike arrays, nodes do not need to occupy consecutive memory locations.',
  },
  {
    q: 'Why is random access O(n) in a Linked List?',
    a: 'A Linked List does not maintain direct index-to-memory mapping. To reach position i, traversal must begin at an end and follow links. In a singly linked list, reaching the last node takes n - 1 links.',
  },
  {
    q: 'Is insertion always O(1) in a Linked List?',
    a: 'No. Insertion is O(1) only when the insertion position or the required neighbouring node is already known. Finding a position by index first takes O(n).',
  },
  {
    q: 'Why is a doubly linked list useful?',
    a: 'It supports traversal in both directions. Given a node reference, insertion or deletion around that node can be O(1), because both previous and next links are available.',
  },
  {
    q: 'What is the difference between a Linked List and an ArrayList?',
    a: 'ArrayList uses a resizable array and supports O(1) index access. LinkedList uses connected nodes and requires O(n) index access. LinkedList can insert or delete around a known node in O(1), but it has extra node and pointer overhead.',
  },
  {
    q: 'What is a dummy node?',
    a: 'A dummy or sentinel node is an extra node placed before the actual head. It simplifies operations involving the head because insertion and deletion can use a common linking procedure.',
  },
  {
    q: 'How do you detect a cycle?',
    a: 'Use Floyd’s tortoise-and-hare algorithm. Move slow by one node and fast by two. If they meet, a cycle exists. If fast reaches null, there is no cycle.',
  },
  {
    q: 'How do you find the middle node in one traversal?',
    a: 'Use slow and fast pointers. When fast reaches the end, slow is at the middle. For an even number of nodes, this standard implementation returns the second middle.',
  },
  {
    q: 'Can a Linked List be traversed backwards?',
    a: 'A singly linked list cannot be traversed backwards using its links alone. A doubly linked list supports backward traversal using the prev reference.',
  },
  {
    q: 'What is the space complexity of a Linked List?',
    a: 'For n nodes, the total storage is O(n). Each node stores data and references. A doubly linked list generally has more per-node overhead than a singly linked list.',
  },
  {
    q: 'Why use a Linked List in an LRU Cache?',
    a: 'A doubly linked list can move a known node to the front and remove a known node in O(1). A HashMap finds the node in O(1) average time. Together they support O(1) average get and put operations.',
  },
  {
    q: 'What is the difference between null and a cycle?',
    a: 'In a normal list, the final node points to null. In a cyclic list, some node points back to an earlier node, so traversal never naturally reaches null.',
  },
];

function CodeBlock({ title, code }) {
  return (
    <div className="java-code-card">
      <div className="java-code-header">
        <span>{title}</span>
        <button
          type="button"
          className="secondary-button"
          onClick={() => navigator.clipboard?.writeText(code)}
        >
          Copy code
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function Note({ type = 'tip', title, children }) {
  return (
    <div className={`java-note java-note-${type}`}>
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  );
}

const basicNodeCode = `class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
        this.next = null;
    }
}`;

const basicListCode = `class LinkedList {
    Node head;

    void display() {
        Node current = head;

        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }

        System.out.println("null");
    }
}`;

const insertionCode = `void insertAtBeginning(int value) {
    Node newNode = new Node(value);

    newNode.next = head;
    head = newNode;
}

void insertAtEnd(int value) {
    Node newNode = new Node(value);

    if (head == null) {
        head = newNode;
        return;
    }

    Node current = head;

    while (current.next != null) {
        current = current.next;
    }

    current.next = newNode;
}`;

const deletionCode = `void deleteByValue(int value) {
    if (head == null) {
        return;
    }

    if (head.data == value) {
        head = head.next;
        return;
    }

    Node current = head;

    while (current.next != null &&
           current.next.data != value) {
        current = current.next;
    }

    if (current.next != null) {
        current.next = current.next.next;
    }
}`;

const reverseCode = `Node reverse(Node head) {
    Node previous = null;
    Node current = head;

    while (current != null) {
        Node nextNode = current.next;

        current.next = previous;

        previous = current;
        current = nextNode;
    }

    return previous;
}`;

const recursiveReverseCode = `Node reverseRecursive(Node head) {
    // Base case
    if (head == null || head.next == null) {
        return head;
    }

    Node newHead = reverseRecursive(head.next);

    head.next.next = head;
    head.next = null;

    return newHead;
}`;

const middleCode = `Node findMiddle(Node head) {
    Node slow = head;
    Node fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}`;

const cycleCode = `boolean hasCycle(Node head) {
    Node slow = head;
    Node fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow == fast) {
            return true;
        }
    }

    return false;
}`;

const doublyCode = `class DoublyNode {
    int data;
    DoublyNode prev;
    DoublyNode next;

    DoublyNode(int data) {
        this.data = data;
    }
}

// Insert a node after a known node
void insertAfter(DoublyNode current, DoublyNode node) {
    node.next = current.next;
    node.prev = current;

    if (current.next != null) {
        current.next.prev = node;
    }

    current.next = node;
}`;

const circularCode = `// Traverse a circular singly linked list
void displayCircular(Node head) {
    if (head == null) {
        return;
    }

    Node current = head;

    do {
        System.out.print(current.data + " -> ");
        current = current.next;
    } while (current != head);

    System.out.println("(back to head)");
}`;

const mergeCode = `Node mergeSorted(Node first, Node second) {
    Node dummy = new Node(0);
    Node tail = dummy;

    while (first != null && second != null) {
        if (first.data <= second.data) {
            tail.next = first;
            first = first.next;
        } else {
            tail.next = second;
            second = second.next;
        }

        tail = tail.next;
    }

    tail.next = (first != null) ? first : second;

    return dummy.next;
}`;

const removeNthCode = `Node removeNthFromEnd(Node head, int n) {
    Node dummy = new Node(0);
    dummy.next = head;

    Node fast = dummy;
    Node slow = dummy;

    for (int i = 0; i < n; i++) {
        fast = fast.next;
    }

    while (fast.next != null) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;

    return dummy.next;
}`;

export default function LinkedListLesson({ onBack }) {
  const [activeSection, setActiveSection] = useState('intro');
  const [completedSections, setCompletedSections] = useState([]);
  const [expandedProblems, setExpandedProblems] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState([]);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const progress = useMemo(
    () => Math.round((completedSections.length / sections.length) * 100),
    [completedSections]
  );

  function toggleSection(id) {
    setCompletedSections((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function toggleProblem(index) {
    setExpandedProblems((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  }

  function toggleQuestion(index) {
    setExpandedQuestions((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  }

  function goToSection(id) {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <section className="java-tracker linked-list-lesson">
      <div className="java-tracker-header">
        <button
          type="button"
          className="secondary-button"
          onClick={onBack}
        >
          ← Back to DSA Topics
        </button>

        <p className="java-eyebrow">DATA STRUCTURES AND ALGORITHMS</p>
        <h2>Linked Lists — Beginner to Advanced</h2>
        <p>
          Understand how nodes connect, how pointers change, and how to solve
          linked-list interview problems using Java.
        </p>

        <div className="java-progress-info">
          <span>Learning progress</span>
          <strong>{completedSections.length}/{sections.length} sections · {progress}%</strong>
        </div>
        <div className="java-progress-track">
          <div
            className="java-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="java-topic-layout">
        <aside className="java-topic-sidebar">
          <h3>On this page</h3>
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`java-topic-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => goToSection(section.id)}
            >
              <span>{section.title}</span>
              {completedSections.includes(section.id) && <span>✓</span>}
            </button>
          ))}
        </aside>

        <main className="java-topic-content">
          <article id="intro" className="java-topic-section">
            <p className="java-eyebrow">SECTION 01 · FOUNDATION</p>
            <h2>1. What is a Linked List?</h2>

            <p>
              A Linked List is a linear data structure consisting of separate
              objects called <strong>nodes</strong>. Each node stores a value
              and a reference to another node.
            </p>

            <h3>Understand with an example</h3>
            <p>
              Imagine a treasure hunt. Each clue tells you where the next clue
              is located. You cannot directly jump to clue number 5. You must
              follow the clues one by one.
            </p>

            <div className="java-example-box">
              <strong>Linked List representation</strong>
              <pre>10 → 20 → 30 → 40 → null</pre>
              <p>
                Each box represents a node. The arrow represents the
                reference to the next node. Null means there is no next node.
              </p>
            </div>

            <h3>What is a node?</h3>
            <p>A basic singly linked-list node contains two parts:</p>
            <ul>
              <li><strong>Data:</strong> The value stored in the node.</li>
              <li><strong>Next:</strong> A reference to the next node.</li>
            </ul>

            <CodeBlock title="Node.java" code={basicNodeCode} />

            <h3>Important terminology</h3>
            <ul>
              <li><strong>Head:</strong> Reference to the first node.</li>
              <li><strong>Tail:</strong> The final node, if a tail reference is maintained.</li>
              <li><strong>Next:</strong> Reference to the next node.</li>
              <li><strong>Previous:</strong> Reference to the previous node in a doubly linked list.</li>
              <li><strong>Null:</strong> Indicates that a reference points to no object.</li>
              <li><strong>Traversal:</strong> Visiting nodes by following their links.</li>
            </ul>

            <Note title="Remember this" type="tip">
              The head is a reference to a node, not the node's data itself.
              If head is null, the list is empty.
            </Note>

            <h3>Array vs Linked List</h3>
            <table className="java-comparison-table">
              <thead>
                <tr><th>Feature</th><th>Array</th><th>Linked List</th></tr>
              </thead>
              <tbody>
                <tr><td>Memory layout</td><td>Contiguous elements</td><td>Separate node objects</td></tr>
                <tr><td>Index access</td><td>O(1)</td><td>O(n)</td></tr>
                <tr><td>Insertion at beginning</td><td>O(n) for shifting</td><td>O(1) with head reference</td></tr>
                <tr><td>Extra pointer storage</td><td>No per-element next reference</td><td>Yes</td></tr>
                <tr><td>Cache locality</td><td>Usually better</td><td>Usually poorer</td></tr>
                <tr><td>Size</td><td>Fixed for ordinary arrays</td><td>Can grow node by node</td></tr>
              </tbody>
            </table>

            <Note title="Interview trap" type="warning">
              Do not say Linked Lists are always faster for insertion.
              Finding the insertion position may itself take O(n).
            </Note>
          </article>

          <article id="internals" className="java-topic-section">
            <p className="java-eyebrow">SECTION 02 · INTERNAL WORKING</p>
            <h2>2. How does a Linked List work internally?</h2>

            <h3>Connecting nodes</h3>
            <p>
              Suppose we have three nodes: 10, 20 and 30. The head points to
              node 10. Node 10 points to node 20. Node 20 points to node 30.
              Node 30 points to null.
            </p>

            <pre className="java-diagram">{`head
 |
 v
+------+------+
|  10  | next | ----+
+------+------+     |
                   v
              +------+------+
              |  20  | next | ----+
              +------+------+     |
                                  v
                             +------+------+
                             |  30  | null |
                             +------+------+`}</pre>

            <h3>How traversal happens</h3>
            <ol>
              <li>Start with current = head.</li>
              <li>Read current.data.</li>
              <li>Move to current.next.</li>
              <li>Repeat until current becomes null.</li>
            </ol>

            <CodeBlock title="Traversal.java" code={`Node current = head;

while (current != null) {
    System.out.println(current.data);
    current = current.next;
}`} />

            <h3>What happens in memory?</h3>
            <ul>
              <li>Each node is an object in Java.</li>
              <li>The next field stores a reference to another object.</li>
              <li>Nodes do not need to be next to each other in memory.</li>
              <li>The garbage collector can reclaim unreachable nodes when no live references point to them.</li>
            </ul>

            <Note title="Important distinction" type="tip">
              Java references are not raw memory addresses that you manually
              calculate. You connect nodes by assigning object references.
            </Note>

            <h3>Why is get(index) O(n)?</h3>
            <p>
              A Linked List cannot calculate the address of the fifth node
              directly from the index. It follows the next reference repeatedly.
              In a doubly linked list, traversal can start from the nearer end,
              but the worst case remains O(n).
            </p>

            <h3>What does insertion actually change?</h3>
            <p>
              To insert 25 between 20 and 30, create a new node and change
              references:
            </p>
            <pre className="java-diagram">{`Before:
20 ───────→ 30

After:
20 ───────→ 25 ───────→ 30`}</pre>
            <p>
              The new node's next must point to 30 before node 20 is connected
              to the new node. Otherwise, the reference to the rest of the list
              could be lost.
            </p>
          </article>

          <article id="types" className="java-topic-section">
            <p className="java-eyebrow">SECTION 03 · VARIANTS</p>
            <h2>3. Types of Linked Lists</h2>

            <h3>A. Singly Linked List</h3>
            <p>
              Each node contains data and one next reference. Traversal is
              possible only in the forward direction.
            </p>
            <pre className="java-diagram">{`head
 ↓
10 → 20 → 30 → null`}</pre>
            <ul>
              <li>Less pointer storage per node.</li>
              <li>Forward traversal only.</li>
              <li>Deleting a node usually requires its previous node.</li>
              <li>Useful for stacks, simple lists and many interview problems.</li>
            </ul>

            <h3>B. Doubly Linked List</h3>
            <p>
              Each node contains data, a previous reference and a next
              reference.
            </p>
            <pre className="java-diagram">{`null ← 10 ⇄ 20 ⇄ 30 → null`}</pre>
            <ul>
              <li>Supports forward and backward traversal.</li>
              <li>Deletion of a known node can be O(1).</li>
              <li>Requires extra memory for prev.</li>
              <li>Useful for browser navigation, deques and LRU caches.</li>
            </ul>
            <CodeBlock title="DoublyNode.java" code={doublyCode} />

            <h3>C. Circular Singly Linked List</h3>
            <p>
              The final node points back to the head instead of null.
            </p>
            <pre className="java-diagram">{`     ┌─────────────────┐
     ↓                 |
10 → 20 → 30 → 40 ─────┘`}</pre>
            <ul>
              <li>There is no null at the end of a non-empty circular list.</li>
              <li>Traversal must stop when it returns to the starting node.</li>
              <li>Useful for round-robin scheduling.</li>
            </ul>
            <CodeBlock title="Circular traversal" code={circularCode} />

            <h3>D. Circular Doubly Linked List</h3>
            <p>
              Each node has prev and next references. The tail connects to the
              head, and the head's previous reference connects to the tail.
            </p>
            <pre className="java-diagram">{`       ┌───────────────────────┐
       ↓                       |
head ⇄ 10 ⇄ 20 ⇄ 30 ⇄ 40 ⇄ tail
       |                       ↑
       └───────────────────────┘`}</pre>

            <table className="java-comparison-table">
              <thead>
                <tr><th>Type</th><th>References per node</th><th>Traversal</th></tr>
              </thead>
              <tbody>
                <tr><td>Singly</td><td>next</td><td>Forward</td></tr>
                <tr><td>Doubly</td><td>prev, next</td><td>Both directions</td></tr>
                <tr><td>Circular singly</td><td>next</td><td>Forward, circular</td></tr>
                <tr><td>Circular doubly</td><td>prev, next</td><td>Both directions, circular</td></tr>
              </tbody>
            </table>
          </article>

          <article id="operations" className="java-topic-section">
            <p className="java-eyebrow">SECTION 04 · CORE OPERATIONS</p>
            <h2>4. Linked List Operations</h2>

            <h3>1. Traversal</h3>
            <p>
              Visit each node from head until null. If there are n nodes, the
              loop visits n nodes.
            </p>
            <p><strong>Time:</strong> O(n)</p>
            <CodeBlock title="display()" code={basicListCode} />

            <h3>2. Insert at the beginning</h3>
            <ol>
              <li>Create a new node.</li>
              <li>Point its next to the current head.</li>
              <li>Make the new node the head.</li>
            </ol>
            <p><strong>Time:</strong> O(1)</p>

            <h3>3. Insert at the end</h3>
            <ol>
              <li>Create a new node.</li>
              <li>If the list is empty, make it the head.</li>
              <li>Otherwise, traverse to the last node.</li>
              <li>Connect the last node to the new node.</li>
            </ol>
            <p><strong>Time:</strong> O(n) without a tail reference; O(1) with a maintained tail reference.</p>

            <h3>4. Insert at a given position</h3>
            <p>
              For zero-based index i, reach the node at i - 1, then adjust
              references. Inserting at index 0 is a special case because the
              head changes.
            </p>
            <p><strong>Time:</strong> O(n) to locate the position, O(1) to relink.</p>

            <CodeBlock title="Insertion methods" code={insertionCode} />

            <h3>5. Delete from the beginning</h3>
            <p>
              Move head to head.next. The previous first node becomes
              unreachable from the list.
            </p>
            <p><strong>Time:</strong> O(1)</p>

            <h3>6. Delete by value</h3>
            <ol>
              <li>Check whether the list is empty.</li>
              <li>If the head contains the value, move head forward.</li>
              <li>Otherwise, find the node whose next contains the target.</li>
              <li>Skip the target by connecting current.next to current.next.next.</li>
            </ol>
            <p><strong>Time:</strong> O(n)</p>
            <CodeBlock title="deleteByValue()" code={deletionCode} />

            <h3>7. Search</h3>
            <p>
              Compare each node's data with the target until found or until
              null is reached.
            </p>
            <p><strong>Time:</strong> O(n)</p>

            <h3>8. Update a value</h3>
            <p>
              Find the node and change its data field. Finding it takes O(n);
              changing the field after locating it takes O(1).
            </p>
          </article>

          <article id="complexity" className="java-topic-section">
            <p className="java-eyebrow">SECTION 05 · ANALYSIS</p>
            <h2>5. Time and Space Complexity</h2>

            <h3>Singly Linked List</h3>
            <table className="java-comparison-table">
              <thead>
                <tr><th>Operation</th><th>Complexity</th><th>Reason</th></tr>
              </thead>
              <tbody>
                <tr><td>Access by index</td><td>O(n)</td><td>Must traverse</td></tr>
                <tr><td>Search</td><td>O(n)</td><td>Linear scan</td></tr>
                <tr><td>Insert at head</td><td>O(1)</td><td>Change head reference</td></tr>
                <tr><td>Insert at tail</td><td>O(n)</td><td>Without tail reference</td></tr>
                <tr><td>Delete head</td><td>O(1)</td><td>Move head reference</td></tr>
                <tr><td>Delete by value</td><td>O(n)</td><td>Find target and predecessor</td></tr>
                <tr><td>Traverse</td><td>O(n)</td><td>Visit every node</td></tr>
                <tr><td>Reverse</td><td>O(n)</td><td>Visit and relink every node</td></tr>
              </tbody>
            </table>

            <h3>With a tail reference</h3>
            <p>
              Maintaining a tail reference makes insertion at the end O(1).
              It does not make access by index O(1), and deleting the tail of a
              singly linked list still requires finding its predecessor.
            </p>

            <h3>Space complexity</h3>
            <ul>
              <li>Storing n nodes: O(n).</li>
              <li>Iterative reversal: O(1) auxiliary space.</li>
              <li>Recursive reversal: O(n) call-stack space in the worst case.</li>
              <li>HashMap-based solutions: often O(n) additional space.</li>
            </ul>

            <Note title="Big-O is about growth" type="tip">
              O(1) does not mean zero work. It means the number of operations
              stays bounded as the list grows.
            </Note>
          </article>

          <article id="java" className="java-topic-section">
            <p className="java-eyebrow">SECTION 06 · JAVA CODING</p>
            <h2>6. Complete Java Implementation</h2>

            <p>
              First learn to implement a singly linked list manually. This
              helps you understand node references rather than depending only
              on Java's built-in LinkedList class.
            </p>

            <CodeBlock
              title="SinglyLinkedList.java"
              code={`class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    Node head;

    void insertAtBeginning(int value) {
        Node newNode = new Node(value);
        newNode.next = head;
        head = newNode;
    }

    void insertAtEnd(int value) {
        Node newNode = new Node(value);

        if (head == null) {
            head = newNode;
            return;
        }

        Node current = head;

        while (current.next != null) {
            current = current.next;
        }

        current.next = newNode;
    }

    void display() {
        Node current = head;

        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }

        System.out.println("null");
    }

    boolean search(int value) {
        Node current = head;

        while (current != null) {
            if (current.data == value) {
                return true;
            }

            current = current.next;
        }

        return false;
    }

    void delete(int value) {
        if (head == null) {
            return;
        }

        if (head.data == value) {
            head = head.next;
            return;
        }

        Node current = head;

        while (current.next != null &&
               current.next.data != value) {
            current = current.next;
        }

        if (current.next != null) {
            current.next = current.next.next;
        }
    }

    int size() {
        int count = 0;
        Node current = head;

        while (current != null) {
            count++;
            current = current.next;
        }

        return count;
    }
}

public class Main {
    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();

        list.insertAtEnd(10);
        list.insertAtEnd(20);
        list.insertAtBeginning(5);

        list.display();

        System.out.println(list.search(20));

        list.delete(10);
        list.display();

        System.out.println("Size: " + list.size());
    }
}`}
            />

            <h3>Expected output</h3>
            <pre className="java-output">{`5 -> 10 -> 20 -> null
true
5 -> 20 -> null
Size: 2`}</pre>

            <h3>Java's built-in LinkedList</h3>
            <p>
              Java provides <code>java.util.LinkedList</code>, which is a
              doubly linked list implementation of the List and Deque
              interfaces.
            </p>
            <CodeBlock
              title="Using java.util.LinkedList"
              code={`import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>();

        list.add(10);
        list.add(20);
        list.addFirst(5);
        list.addLast(30);

        System.out.println(list);

        list.removeFirst();
        list.removeLast();

        System.out.println(list);
        System.out.println(list.get(0));
    }
}`}
            />

            <Note title="Do not confuse these" type="warning">
              Your manually implemented Node-based list and Java's built-in
              java.util.LinkedList are different implementations. Interview
              questions often expect you to manipulate the provided Node
              references yourself.
            </Note>
          </article>

          <article id="patterns" className="java-topic-section">
            <p className="java-eyebrow">SECTION 07 · PROBLEM SOLVING</p>
            <h2>7. Important Linked List Patterns</h2>

            <h3>Pattern 1: Slow and Fast Pointers</h3>
            <p>
              Maintain two references. Slow moves one node at a time and fast
              moves two nodes at a time.
            </p>
            <p>Common uses:</p>
            <ul>
              <li>Finding the middle node.</li>
              <li>Detecting a cycle.</li>
              <li>Finding the start of a cycle.</li>
              <li>Finding the middle before reversing a half.</li>
            </ul>
            <CodeBlock title="Find middle" code={middleCode} />

            <h3>Pattern 2: Pointer Reversal</h3>
            <p>
              Reverse links using previous, current and nextNode. Save the
              next reference before changing current.next.
            </p>
            <CodeBlock title="Iterative reversal" code={reverseCode} />

            <h3>Pattern 3: Dummy Node</h3>
            <p>
              Create an extra node before the head. This avoids writing separate
              logic for many head-changing operations.
            </p>
            <ul>
              <li>Merge two sorted lists.</li>
              <li>Remove a node from the beginning or middle.</li>
              <li>Build a result list.</li>
              <li>Partition a list around a value.</li>
            </ul>

            <h3>Pattern 4: Gap Between Two Pointers</h3>
            <p>
              Move fast ahead by n nodes, then move both references together.
              When fast reaches the end, slow is positioned near the node to
              remove.
            </p>

            <h3>Pattern 5: Hashing</h3>
            <p>
              A HashSet or HashMap can remember visited nodes or store
              relationships. This often makes a solution easier but costs
              additional O(n) space.
            </p>

            <h3>Pattern 6: Merge and Divide</h3>
            <p>
              Merge sorted lists by comparing their current nodes. For merging
              k lists, a min heap or divide-and-conquer approach is commonly
              used.
            </p>
          </article>

          <article id="algorithms" className="java-topic-section">
            <p className="java-eyebrow">SECTION 08 · ADVANCED ALGORITHMS</p>
            <h2>8. Important Algorithms</h2>

            <h3>A. Reverse a Linked List — Iterative</h3>
            <p>
              Example: 10 → 20 → 30 → null becomes 30 → 20 → 10 → null.
            </p>
            <ol>
              <li>previous starts as null.</li>
              <li>current starts at head.</li>
              <li>Save current.next in nextNode.</li>
              <li>Reverse current.next to previous.</li>
              <li>Move previous and current forward.</li>
              <li>Return previous as the new head.</li>
            </ol>
            <CodeBlock title="reverse()" code={reverseCode} />
            <p><strong>Time:</strong> O(n). <strong>Auxiliary space:</strong> O(1).</p>

            <h3>B. Reverse a Linked List — Recursive</h3>
            <p>
              Recursively reverse the list starting from head.next. Then
              connect the next node back to the current node.
            </p>
            <CodeBlock title="Recursive reversal" code={recursiveReverseCode} />
            <p><strong>Time:</strong> O(n). <strong>Call stack:</strong> O(n).</p>

            <Note title="Critical pointer order" type="warning">
              In iterative reversal, save current.next before assigning
              current.next = previous. If you overwrite it first, you lose
              access to the remaining nodes.
            </Note>

            <h3>C. Find the Middle Node</h3>
            <p>
              Slow moves one step and fast moves two. When fast reaches the
              end, slow points to the middle.
            </p>
            <CodeBlock title="findMiddle()" code={middleCode} />
            <p>
              For an even number of nodes, this version returns the second
              middle node.
            </p>

            <h3>D. Detect a Cycle — Floyd's Algorithm</h3>
            <p>
              If a cycle exists, the fast pointer eventually catches the slow
              pointer inside the cycle. If fast reaches null, there is no cycle.
            </p>
            <CodeBlock title="hasCycle()" code={cycleCode} />
            <p><strong>Time:</strong> O(n). <strong>Space:</strong> O(1).</p>

            <h3>E. Merge Two Sorted Linked Lists</h3>
            <p>
              Use a dummy node as the start of the result. Attach the smaller
              current node, advance that list and continue.
            </p>
            <CodeBlock title="mergeSorted()" code={mergeCode} />
            <p><strong>Time:</strong> O(n + m).</p>

            <h3>F. Remove Nth Node From the End</h3>
            <p>
              Use a dummy node and keep fast n nodes ahead of slow. When fast
              reaches the last node, slow is just before the node to remove.
            </p>
            <CodeBlock title="removeNthFromEnd()" code={removeNthCode} />
            <Note title="Assumption" type="tip">
              The code above assumes n is valid: 1 ≤ n ≤ list length. In
              production code, validate input before dereferencing fast.
            </Note>

            <h3>G. Palindrome Linked List</h3>
            <ol>
              <li>Find the middle using slow and fast pointers.</li>
              <li>Reverse the second half.</li>
              <li>Compare values from both halves.</li>
              <li>Optionally restore the original second half.</li>
            </ol>
            <p><strong>Time:</strong> O(n). <strong>Auxiliary space:</strong> O(1) when reversing in place.</p>

            <h3>H. Intersection of Two Linked Lists</h3>
            <p>
              Use two pointers. When one reaches null, move it to the other
              list's head. If an intersection exists, the pointers meet at the
              shared node after traversing equal combined distances.
            </p>

            <h3>I. LRU Cache</h3>
            <p>
              Combine a HashMap and a doubly linked list. The map finds a node
              quickly; the list maintains most-recently-used order.
            </p>
            <ul>
              <li>Most recently used node is moved to the front.</li>
              <li>Least recently used node is at the back.</li>
              <li>When capacity is exceeded, remove the back node.</li>
              <li>Map lookup and known-node relinking are O(1) average.</li>
            </ul>
          </article>

          <article id="edge-cases" className="java-topic-section">
            <p className="java-eyebrow">SECTION 09 · CORRECTNESS</p>
            <h2>9. Edge Cases and Common Mistakes</h2>

            <h3>Always test these cases</h3>
            <ul>
              <li>Empty list: head = null.</li>
              <li>One-node list.</li>
              <li>Two-node list.</li>
              <li>Insert at index 0.</li>
              <li>Insert at the end.</li>
              <li>Delete the head.</li>
              <li>Delete the tail.</li>
              <li>Target value does not exist.</li>
              <li>Duplicate values.</li>
              <li>Even and odd number of nodes.</li>
              <li>Cycle exists or does not exist.</li>
              <li>Invalid index or invalid n.</li>
            </ul>

            <h3>Common bugs</h3>
            <table className="java-comparison-table">
              <thead>
                <tr><th>Bug</th><th>Why it happens</th><th>Prevention</th></tr>
              </thead>
              <tbody>
                <tr><td>NullPointerException</td><td>Accessing next on null</td><td>Check current before dereferencing</td></tr>
                <tr><td>Lost remaining nodes</td><td>Overwriting next too early</td><td>Save nextNode first</td></tr>
                <tr><td>Incorrect head</td><td>Forgetting head-changing cases</td><td>Handle empty and head cases</td></tr>
                <tr><td>Infinite loop</td><td>Not advancing current or circular traversal stop condition missing</td><td>Check loop termination</td></tr>
                <tr><td>Broken doubly list</td><td>Updating only one direction</td><td>Update both prev and next</td></tr>
                <tr><td>Wrong tail</td><td>Deleting or inserting at end without updating tail</td><td>Maintain head and tail invariants</td></tr>
              </tbody>
            </table>

            <Note title="A reliable debugging habit" type="tip">
              Draw the nodes and arrows before changing code. Trace every
              reference assignment one line at a time.
            </Note>
          </article>

          <article id="practice" className="java-topic-section">
            <p className="java-eyebrow">SECTION 10 · PRACTICE</p>
            <h2>10. Linked List Practice Problems</h2>
            <p>
              Solve in order. Do not jump to advanced questions without being
              able to reverse, traverse, find the middle and detect a cycle.
            </p>

            {problems.map((problem, index) => (
              <div className="java-practice-card" key={problem.name}>
                <div className="java-practice-heading">
                  <div>
                    <span className="java-eyebrow">{problem.level}</span>
                    <h3>{index + 1}. {problem.name}</h3>
                  </div>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => toggleProblem(index)}
                  >
                    {expandedProblems.includes(index) ? 'Hide approach' : 'Show approach'}
                  </button>
                </div>
                <p>{problem.complexity}</p>
                {expandedProblems.includes(index) && (
                  <div className="java-practice-approach">
                    <p><strong>Core idea:</strong> {problem.idea}</p>
                    <a href={problem.link} target="_blank" rel="noreferrer">
                      Solve on LeetCode ↗
                    </a>
                  </div>
                )}
              </div>
            ))}
          </article>

          <article id="interview" className="java-topic-section">
            <p className="java-eyebrow">SECTION 11 · INTERVIEW PREPARATION</p>
            <h2>11. Interview Questions and Answers</h2>
            <p>
              Try answering each question yourself before opening the answer.
            </p>

            {(showAllQuestions ? questions : questions.slice(0, 6)).map((item, index) => (
              <div className="java-interview-card" key={item.q}>
                <button
                  type="button"
                  className="java-interview-question"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={expandedQuestions.includes(index)}
                >
                  <strong>{index + 1}. {item.q}</strong>
                  <span>{expandedQuestions.includes(index) ? '−' : '+'}</span>
                </button>
                {expandedQuestions.includes(index) && (
                  <p className="java-interview-answer">{item.a}</p>
                )}
              </div>
            ))}

            <button
              type="button"
              className="secondary-button"
              onClick={() => setShowAllQuestions((value) => !value)}
            >
              {showAllQuestions ? 'Show fewer questions' : `Show all ${questions.length} questions`}
            </button>

            <h3>Before moving to the next topic</h3>
            <p>You should be able to do all of these without copying code:</p>
            <ul>
              <li>Explain node, head, tail and next.</li>
              <li>Implement a singly linked list in Java.</li>
              <li>Insert and delete at different positions.</li>
              <li>Reverse iteratively and recursively.</li>
              <li>Find the middle using slow and fast pointers.</li>
              <li>Detect a cycle using Floyd's algorithm.</li>
              <li>Merge two sorted lists.</li>
              <li>Explain the complexity of each operation.</li>
            </ul>
          </article>

          <div className="java-lesson-completion">
            <h3>Section completion checklist</h3>
            <p>Mark a section complete only after studying and understanding it.</p>
            {sections.map((section) => (
              <label className="java-checklist-item" key={section.id}>
                <input
                  type="checkbox"
                  checked={completedSections.includes(section.id)}
                  onChange={() => toggleSection(section.id)}
                />
                <span>{section.title}</span>
              </label>
            ))}
            <div className="java-progress-info">
              <strong>{completedSections.length} of {sections.length} completed</strong>
              <strong>{progress}%</strong>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
