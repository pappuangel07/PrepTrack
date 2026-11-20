
import { useState } from 'react';

const sections = [
  { id: 'intro', label: 'Introduction' },
  { id: 'internals', label: 'Queue Internals' },
  { id: 'operations', label: 'Queue Operations' },
  { id: 'implementations', label: 'Java Implementations' },
  { id: 'complexity', label: 'Complexity Analysis' },
  { id: 'types', label: 'Types of Queues' },
  { id: 'patterns', label: 'Problem Patterns' },
  { id: 'advanced', label: 'Advanced Concepts' },
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

function QueuesLesson({ onBack }) {
  const [activeSection, setActiveSection] = useState('intro');
  const [completedSections, setCompletedSections] = useState([]);

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

  return (
    <section className="dsa-lesson">
      <button
        type="button"
        className="secondary-button"
        onClick={onBack}
      >
        ← Back to DSA Topics
      </button>

      <header className="dsa-lesson-header">
        <p className="java-eyebrow">DSA LEARNING HUB · QUEUES</p>
        <h1>Queues – Complete Learning Guide</h1>
        <p>
          Master Queue data structures in Java, from fundamentals
          to advanced implementations and technical interviews.
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

        {/* 1. INTRODUCTION */}

        <article id="intro" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 1 · BEGINNER</p>
          <h2>1. Introduction to Queues</h2>

          <h3>What is a Queue?</h3>
          <p>
            A Queue is a linear data structure that follows
            FIFO (First In, First Out).
            The element inserted first is removed first.
          </p>

          <p>
            Real-life example: People standing in a ticket
            booking line. The first person who joins the line
            gets served first.
          </p>

          <h3>FIFO Principle</h3>
          <CodeExample>{`Queue: [10, 20, 30]

Front -> 10
Rear  -> 30

Remove operation:

Queue: [20, 30]

Front -> 20
Rear  -> 30`}</CodeExample>

          <h3>Important Queue Terminology</h3>
          <ul>
            <li><strong>Front:</strong> Position from which elements are removed.</li>
            <li><strong>Rear:</strong> Position where new elements are inserted.</li>
            <li><strong>Enqueue:</strong> Insert an element.</li>
            <li><strong>Dequeue:</strong> Remove an element.</li>
            <li><strong>Peek:</strong> View the front element without removing it.</li>
            <li><strong>isEmpty:</strong> Checks whether the queue contains elements.</li>
            <li><strong>isFull:</strong> Checks whether a fixed-capacity queue is full.</li>
          </ul>

          <h3>Queue vs Stack</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Queue</th>
                <th>Stack</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Principle</td><td>FIFO</td><td>LIFO</td></tr>
              <tr><td>Insertion</td><td>Rear</td><td>Top</td></tr>
              <tr><td>Removal</td><td>Front</td><td>Top</td></tr>
              <tr><td>Operations</td><td>Enqueue / Dequeue</td><td>Push / Pop</td></tr>
              <tr><td>Example</td><td>Ticket line</td><td>Stack of plates</td></tr>
            </tbody>
          </table>

          <h3>Applications of Queues</h3>
          <ul>
            <li>CPU process scheduling.</li>
            <li>Breadth First Search (BFS).</li>
            <li>Printer job scheduling.</li>
            <li>Network packet management.</li>
            <li>Operating system task management.</li>
            <li>Message queues and asynchronous processing.</li>
            <li>Level-order traversal of binary trees.</li>
          </ul>
        </article>

        {/* 2. INTERNALS */}

        <article id="internals" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2 · INTERNAL WORKING</p>
          <h2>2. Queue Internals</h2>

          <h3>2.1 How does a Queue work?</h3>
          <p>
            A Queue maintains two important positions:
            Front and Rear. Insertion happens at the Rear,
            and deletion happens at the Front.
          </p>

          <CodeExample>{`Initially:
Queue = []

Enqueue(10):
[10]

Enqueue(20):
[10, 20]

Enqueue(30):
[10, 20, 30]

Dequeue():
[20, 30]

Peek():
20`}</CodeExample>

          <h3>2.2 Array-based Queue</h3>
          <p>
            An array-based queue stores elements in consecutive
            memory locations. Front and Rear indices track the
            queue boundaries.
          </p>

          <CodeExample>{`int[] queue = new int[5];

int front = 0;
int rear = -1;

queue[++rear] = 10;
queue[++rear] = 20;
queue[++rear] = 30;

System.out.println(queue[front]); // 10`}</CodeExample>

          <h3>2.3 The Linear Queue Limitation</h3>
          <p>
            In a simple linear array queue, removing elements
            increases the Front index. Even if earlier positions
            become empty, the Rear may reach the last array index.
            This can cause false overflow.
          </p>

          <CodeExample>{`Capacity = 5

[10, 20, 30, 40, 50]

After two deletions:

[_, _, 30, 40, 50]

Front = 2
Rear = 4

Rear cannot move forward.

The first two positions are unused,
but the linear queue appears full.`}</CodeExample>

          <h3>2.4 How does a Circular Queue solve this?</h3>
          <p>
            A Circular Queue connects the last array position
            back to the first position. It reuses free spaces
            through modular arithmetic.
          </p>

          <CodeExample>{`nextIndex = (currentIndex + 1) % capacity

Example:

currentIndex = 4
capacity = 5

nextIndex = (4 + 1) % 5

nextIndex = 0`}</CodeExample>

          <h3>2.5 Linked List Queue Internals</h3>
          <p>
            A linked list queue maintains Front and Rear node
            references. Each node stores data and a reference
            to the next node.
          </p>

          <CodeExample>{`Front                     Rear
  |                         |
  v                         v
[10 | next] -> [20 | next] -> [30 | null]`}</CodeExample>

          <ul>
            <li>Enqueue creates a new node at the Rear.</li>
            <li>Dequeue removes the Front node.</li>
            <li>When the queue becomes empty, both references must become null.</li>
            <li>No fixed capacity is required, apart from available memory.</li>
          </ul>
        </article>

        {/* 3. OPERATIONS */}

        <article id="operations" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2 · CORE OPERATIONS</p>
          <h2>3. Queue Operations</h2>

          <h3>3.1 Enqueue</h3>
          <p>Inserts a new element at the Rear.</p>

          <CodeExample>{`Queue: [10, 20]

Enqueue(30)

Queue: [10, 20, 30]`}</CodeExample>

          <h3>3.2 Dequeue</h3>
          <p>Removes and returns the Front element.</p>

          <CodeExample>{`Queue: [10, 20, 30]

Dequeue()

Removed: 10
Queue: [20, 30]`}</CodeExample>

          <h3>3.3 Peek / Element</h3>
          <p>
            Returns the front element without removing it.
            In Java, element() throws an exception if the queue
            is empty.
          </p>

          <h3>3.4 Poll</h3>
          <p>
            poll() retrieves and removes the front element.
            It returns null when the queue is empty.
          </p>

          <h3>3.5 Offer</h3>
          <p>
            offer() attempts to insert an element.
            It returns false when a capacity-restricted queue
            cannot accept the element.
          </p>

          <h3>3.6 isEmpty and Size</h3>
          <CodeExample>{`Queue<Integer> queue = new ArrayDeque<>();

System.out.println(queue.isEmpty()); // true

queue.offer(10);
queue.offer(20);

System.out.println(queue.size()); // 2`}</CodeExample>

          <h3>Important Java Queue Methods</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Throws exception</th>
                <th>Special return value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>add(e)</td><td>offer(e)</td></tr>
              <tr><td>remove()</td><td>poll()</td></tr>
              <tr><td>element()</td><td>peek()</td></tr>
            </tbody>
          </table>

          <p>
            The special-value methods are generally preferred
            when an empty queue or capacity limitation is an
            expected possibility.
          </p>
        </article>

        {/* 4. IMPLEMENTATIONS */}

        <article id="implementations" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2–3 · JAVA IMPLEMENTATIONS</p>
          <h2>4. Queue Implementations in Java</h2>

          <h3>4.1 Using the Queue Interface</h3>
          <CodeExample>{`import java.util.Queue;
import java.util.ArrayDeque;

public class Main {
    public static void main(String[] args) {

        Queue<Integer> queue = new ArrayDeque<>();

        queue.offer(10);
        queue.offer(20);
        queue.offer(30);

        System.out.println(queue.peek()); // 10

        System.out.println(queue.poll()); // 10

        System.out.println(queue); // [20, 30]
    }
}`}</CodeExample>

          <h3>4.2 Implementing Queue Using an Array</h3>
          <CodeExample>{`class ArrayQueue {
    int[] arr;
    int front;
    int rear;
    int size;

    ArrayQueue(int capacity) {
        arr = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }

    void enqueue(int value) {
        if (size == arr.length) {
            System.out.println("Queue Full");
            return;
        }

        rear = (rear + 1) % arr.length;
        arr[rear] = value;
        size++;
    }

    int dequeue() {
        if (size == 0) {
            throw new IllegalStateException("Queue Empty");
        }

        int value = arr[front];
        front = (front + 1) % arr.length;
        size--;

        return value;
    }

    int peek() {
        if (size == 0) {
            throw new IllegalStateException("Queue Empty");
        }

        return arr[front];
    }

    boolean isEmpty() {
        return size == 0;
    }

    int size() {
        return size;
    }
}`}</CodeExample>

          <p>
            This implementation uses a circular array.
            The size variable distinguishes a full queue
            from an empty queue.
          </p>

          <h3>4.3 Implementing Queue Using a Linked List</h3>
          <CodeExample>{`class LinkedQueue {

    class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
        }
    }

    Node front;
    Node rear;

    void enqueue(int value) {
        Node newNode = new Node(value);

        if (rear == null) {
            front = rear = newNode;
            return;
        }

        rear.next = newNode;
        rear = newNode;
    }

    int dequeue() {
        if (front == null) {
            throw new IllegalStateException("Queue Empty");
        }

        int value = front.data;
        front = front.next;

        if (front == null) {
            rear = null;
        }

        return value;
    }

    int peek() {
        if (front == null) {
            throw new IllegalStateException("Queue Empty");
        }

        return front.data;
    }

    boolean isEmpty() {
        return front == null;
    }
}`}</CodeExample>

          <h3>4.4 Using PriorityQueue</h3>
          <CodeExample>{`import java.util.PriorityQueue;

PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(40);
pq.offer(10);
pq.offer(30);
pq.offer(20);

System.out.println(pq.poll()); // 10
System.out.println(pq.poll()); // 20`}</CodeExample>

          <p>
            Java PriorityQueue uses a min-heap by default.
            poll() removes the smallest element, not necessarily
            the element inserted first.
          </p>

          <h3>4.5 Max Heap PriorityQueue</h3>
          <CodeExample>{`import java.util.PriorityQueue;
import java.util.Collections;

PriorityQueue<Integer> pq =
    new PriorityQueue<>(Collections.reverseOrder());

pq.offer(10);
pq.offer(40);
pq.offer(20);

System.out.println(pq.poll()); // 40`}</CodeExample>
        </article>

        {/* 5. COMPLEXITY */}

        <article id="complexity" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2–3 · COMPLEXITY ANALYSIS</p>
          <h2>5. Time and Space Complexity</h2>

          <h3>5.1 Complexity Comparison</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Array Circular Queue</th>
                <th>Linked List Queue</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Enqueue</td><td>O(1)</td><td>O(1)</td></tr>
              <tr><td>Dequeue</td><td>O(1)</td><td>O(1)</td></tr>
              <tr><td>Peek</td><td>O(1)</td><td>O(1)</td></tr>
              <tr><td>isEmpty</td><td>O(1)</td><td>O(1)</td></tr>
              <tr><td>Search</td><td>O(n)</td><td>O(n)</td></tr>
            </tbody>
          </table>

          <h3>5.2 Space Complexity</h3>
          <ul>
            <li>Array Queue: O(capacity).</li>
            <li>Linked List Queue: O(n) for n stored nodes.</li>
            <li>Each linked-list node also requires reference storage.</li>
          </ul>

          <h3>5.3 Amortized Complexity</h3>
          <p>
            ArrayDeque is a resizable circular-array implementation.
            Its insertion and removal operations at the ends are
            generally O(1), with occasional resizing making
            insertion amortized O(1).
          </p>

          <h3>5.4 Choosing an Implementation</h3>
          <ul>
            <li>ArrayDeque: General-purpose queue and deque operations.</li>
            <li>LinkedList: Queue implementation with linked nodes.</li>
            <li>PriorityQueue: Priority-based processing.</li>
            <li>Array implementation: Fixed-capacity or custom queue requirements.</li>
          </ul>
        </article>

        {/* 6. TYPES */}

        <article id="types" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 3 · QUEUE VARIANTS</p>
          <h2>6. Types of Queues</h2>

          <h3>6.1 Simple Queue</h3>
          <p>
            Follows FIFO. Insertion takes place at the Rear
            and removal takes place at the Front.
          </p>

          <h3>6.2 Circular Queue</h3>
          <p>
            The last position connects to the first position.
            It efficiently reuses empty array positions.
          </p>

          <h3>6.3 Deque (Double Ended Queue)</h3>
          <p>
            A Deque allows insertion and deletion at both ends.
          </p>
          <CodeExample>{`Deque<Integer> deque = new ArrayDeque<>();

deque.offerFirst(10);
deque.offerLast(20);

deque.pollFirst();
deque.pollLast();`}</CodeExample>

          <h3>6.4 Input Restricted Deque</h3>
          <p>
            Insertion is allowed at only one end, but deletion
            is allowed at both ends.
          </p>

          <h3>6.5 Output Restricted Deque</h3>
          <p>
            Deletion is allowed at only one end, but insertion
            is allowed at both ends.
          </p>

          <h3>6.6 Priority Queue</h3>
          <p>
            Elements are processed according to priority rather
            than insertion order. A heap is commonly used.
          </p>

          <h3>Comparison</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Insertion</th>
                <th>Deletion</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Simple Queue</td><td>Rear</td><td>Front</td></tr>
              <tr><td>Circular Queue</td><td>Circular Rear</td><td>Circular Front</td></tr>
              <tr><td>Deque</td><td>Both ends</td><td>Both ends</td></tr>
              <tr><td>Input Restricted Deque</td><td>One end</td><td>Both ends</td></tr>
              <tr><td>Output Restricted Deque</td><td>Both ends</td><td>One end</td></tr>
              <tr><td>Priority Queue</td><td>Priority-based structure</td><td>Highest-priority element</td></tr>
            </tbody>
          </table>
        </article>

        {/* 7. PATTERNS */}

        <article id="patterns" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 3–4 · PROBLEM SOLVING</p>
          <h2>7. Queue Problem-Solving Patterns</h2>

          <h3>7.1 BFS (Breadth First Search)</h3>
          <p>
            BFS explores a graph level by level using a Queue.
            It is useful for finding shortest paths in unweighted
            graphs.
          </p>
          <CodeExample>{`Queue<Integer> queue = new ArrayDeque<>();
boolean[] visited = new boolean[n];

queue.offer(start);
visited[start] = true;

while (!queue.isEmpty()) {
    int node = queue.poll();

    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            visited[neighbor] = true;
            queue.offer(neighbor);
        }
    }
}`}</CodeExample>

          <p>
            Mark nodes visited when they are enqueued to prevent
            duplicate queue entries.
          </p>

          <h3>7.2 Level Order Tree Traversal</h3>
          <p>
            Process all nodes at one tree level before moving
            to the next level.
          </p>
          <CodeExample>{`Queue<TreeNode> queue = new ArrayDeque<>();

queue.offer(root);

while (!queue.isEmpty()) {
    int levelSize = queue.size();

    for (int i = 0; i < levelSize; i++) {
        TreeNode node = queue.poll();

        if (node.left != null) {
            queue.offer(node.left);
        }

        if (node.right != null) {
            queue.offer(node.right);
        }
    }
}`}</CodeExample>

          <h3>7.3 Sliding Window Maximum</h3>
          <p>
            A monotonic deque maintains useful candidate indices
            for the maximum value in each sliding window.
          </p>

          <h3>7.4 Multi-source BFS</h3>
          <p>
            Add all starting nodes to the queue before beginning
            BFS. This is useful for problems involving multiple
            sources, such as Rotten Oranges.
          </p>

          <h3>7.5 Shortest Path in an Unweighted Graph</h3>
          <p>
            BFS discovers vertices in increasing distance from
            the source. The first discovery gives the shortest
            edge-count distance.
          </p>

          <h3>7.6 Simulation</h3>
          <p>
            Queue operations can simulate real-world processes,
            such as task scheduling, customer service and round-robin
            processing.
          </p>
        </article>

        {/* 8. ADVANCED */}

        <article id="advanced" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 4 · ADVANCED CONCEPTS</p>
          <h2>8. Advanced Queue Concepts</h2>

          <h3>8.1 Monotonic Queue</h3>
          <p>
            A monotonic queue maintains elements in increasing
            or decreasing order. It helps answer sliding-window
            minimum and maximum queries efficiently.
          </p>

          <h3>8.2 Monotonic Decreasing Deque</h3>
          <CodeExample>{`// Maintain decreasing values.
// Store indices, not just values.

while (!deque.isEmpty() &&
       nums[deque.peekLast()] <= nums[i]) {
    deque.pollLast();
}

deque.offerLast(i);

// Remove indices outside the window.
while (!deque.isEmpty() &&
       deque.peekFirst() <= i - k) {
    deque.pollFirst();
}

// Front index gives maximum.
int maximum = nums[deque.peekFirst()];`}</CodeExample>

          <h3>8.3 Priority Queue and Heap</h3>
          <p>
            PriorityQueue commonly uses a binary heap.
            Insertion and removal take O(log n), while
            accessing the highest-priority element takes O(1).
          </p>

          <h3>8.4 BFS vs DFS</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>BFS</th>
                <th>DFS</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Data structure</td><td>Queue</td><td>Stack / Recursion</td></tr>
              <tr><td>Traversal</td><td>Level by level</td><td>Depth first</td></tr>
              <tr><td>Shortest path in unweighted graph</td><td>Yes</td><td>Not guaranteed</td></tr>
              <tr><td>Space</td><td>O(V)</td><td>O(V)</td></tr>
            </tbody>
          </table>

          <h3>8.5 Common Mistakes</h3>
          <ul>
            <li>Using remove() without checking whether a queue is empty.</li>
            <li>Forgetting to reset Rear when the linked-list queue becomes empty.</li>
            <li>Incorrect circular queue modulo calculations.</li>
            <li>Marking BFS nodes visited too late.</li>
            <li>Confusing FIFO Queue with PriorityQueue.</li>
            <li>Using a normal Queue when a Deque is required.</li>
            <li>Storing values instead of indices in sliding-window deque problems.</li>
          </ul>
        </article>

        {/* 9. PRACTICE */}

        <article id="practice" className="dsa-lesson-section">
          <p className="dsa-level">PRACTICE ZONE · BEGINNER TO ADVANCED</p>
          <h2>9. Queue Coding Practice</h2>

          <p>
            Solve in order. Understand the brute-force approach,
            optimize it, and analyse complexity.
          </p>

          <h3>Beginner</h3>

          <div className="dsa-practice-card">
            <h4>1. Implement Queue using Arrays</h4>
            <p><strong>Concepts:</strong> FIFO, arrays, Front and Rear.</p>
            <p><strong>Target:</strong> O(1) enqueue and dequeue.</p>
            <a href="https://www.geeksforgeeks.org/problems/implement-queue-using-array/1" target="_blank" rel="noreferrer">Solve on GeeksforGeeks →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>2. Implement Stack using Queues</h4>
            <p><strong>Concepts:</strong> Queue operations, simulation.</p>
            <a href="https://leetcode.com/problems/implement-stack-using-queues/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>3. Number of Recent Calls</h4>
            <p><strong>Concepts:</strong> Queue, time-window simulation.</p>
            <a href="https://leetcode.com/problems/number-of-recent-calls/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <h3>Intermediate</h3>

          <div className="dsa-practice-card">
            <h4>4. Implement Queue using Stacks</h4>
            <p><strong>Concepts:</strong> Two stacks, amortized complexity.</p>
            <a href="https://leetcode.com/problems/implement-queue-using-stacks/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>5. Design Circular Queue</h4>
            <p><strong>Concepts:</strong> Circular arrays, modulo.</p>
            <a href="https://leetcode.com/problems/design-circular-queue/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>6. Binary Tree Level Order Traversal</h4>
            <p><strong>Concepts:</strong> BFS, tree traversal.</p>
            <a href="https://leetcode.com/problems/binary-tree-level-order-traversal/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <h3>Advanced</h3>

          <div className="dsa-practice-card">
            <h4>7. Rotting Oranges</h4>
            <p><strong>Concepts:</strong> Multi-source BFS, grids.</p>
            <a href="https://leetcode.com/problems/rotting-oranges/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>8. Sliding Window Maximum</h4>
            <p><strong>Concepts:</strong> Monotonic Deque, sliding window.</p>
            <a href="https://leetcode.com/problems/sliding-window-maximum/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>9. Shortest Path in Binary Matrix</h4>
            <p><strong>Concepts:</strong> BFS, shortest path, grid traversal.</p>
            <a href="https://leetcode.com/problems/shortest-path-in-binary-matrix/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>10. Design Front Middle Back Queue</h4>
            <p><strong>Concepts:</strong> Deque, data structure design.</p>
            <a href="https://leetcode.com/problems/design-front-middle-back-queue/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>
        </article>

        {/* 10. INTERVIEW */}

        <article id="interview" className="dsa-lesson-section">
          <p className="dsa-level">INTERVIEW PREPARATION · EXPERT LEVEL</p>
          <h2>10. Queue Interview Questions</h2>

          <details className="dsa-interview-question">
            <summary>1. What is FIFO?</summary>
            <p>
              FIFO means First In, First Out. The earliest
              inserted element is the first one removed.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>2. What is the difference between Queue and Deque?</summary>
            <p>
              A normal Queue follows insertion at one end and
              deletion at the other. A Deque supports insertion
              and deletion at both ends.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>3. Why is a circular queue better than a linear array queue?</summary>
            <p>
              It reuses freed array positions through wraparound,
              avoiding false overflow caused by unused positions
              at the beginning.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>4. Can a Queue be implemented using two Stacks?</summary>
            <p>
              Yes. One stack handles incoming elements and
              another handles outgoing elements. With lazy
              transfer, enqueue and dequeue are amortized O(1).
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>5. Can a Stack be implemented using Queues?</summary>
            <p>
              Yes. Two queues or one queue with element rotation
              can simulate LIFO behaviour.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>6. Why is BFS implemented using a Queue?</summary>
            <p>
              FIFO processing ensures vertices are explored
              in non-decreasing distance order in an unweighted
              graph.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>7. What is a PriorityQueue?</summary>
            <p>
              A queue-like data structure that removes elements
              according to priority rather than insertion order.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>8. What is the difference between poll() and remove()?</summary>
            <p>
              Both remove the front element. poll() returns null
              if empty, whereas remove() throws an exception.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>9. What is a monotonic deque?</summary>
            <p>
              A deque that maintains increasing or decreasing
              element order, useful for sliding-window extrema.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>10. What is the complexity of PriorityQueue operations?</summary>
            <p>
              Insertion O(log n), removal O(log n), and
              accessing the root element O(1).
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>11. Why should BFS mark nodes visited when enqueuing?</summary>
            <p>
              It prevents multiple neighbouring vertices from
              inserting the same unvisited node repeatedly.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>12. What is the difference between ArrayDeque and LinkedList?</summary>
            <p>
              ArrayDeque uses a resizable circular array.
              LinkedList uses linked nodes. ArrayDeque is
              generally preferred for ordinary queue and
              deque operations.
            </p>
          </details>

          <h3>Final Queue Revision Checklist</h3>

          <div className="dsa-completion-panel">
            <div className="dsa-completion-summary">
              <strong>Mark each section as completed</strong>
              <span>{progress}% syllabus completed</span>
            </div>

            {sections.map((section) => (
              <label
                className="dsa-completion-item"
                key={section.id}
              >
                <input
                  type="checkbox"
                  checked={completedSections.includes(section.id)}
                  onChange={() => toggleSection(section.id)}
                />
                <span>{section.label}</span>
              </label>
            ))}
          </div>
        </article>

      </main>
    </section>
  );
}

export default QueuesLesson;
