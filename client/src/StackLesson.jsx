
import { useState } from 'react';

const sections = [
  { id: 'intro', label: 'Introduction' },
  { id: 'internals', label: 'Stack Internals' },
  { id: 'operations', label: 'Operations' },
  { id: 'implementation', label: 'Java Implementations' },
  { id: 'complexity', label: 'Complexity Analysis' },
  { id: 'patterns', label: 'Problem Patterns' },
  { id: 'advanced', label: 'Advanced Applications' },
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

function StackLesson({ onBack }) {
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
        <p className="java-eyebrow">DSA LEARNING HUB · STACKS</p>
        <h1>Stacks – Complete Learning Guide</h1>
        <p>
          Master Stack data structures from fundamentals to
          advanced applications, Java implementations and
          technical interviews.
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
          <h2>1. Introduction to Stacks</h2>

          <h3>What is a Stack?</h3>
          <p>
            A Stack is a linear data structure in which elements
            are inserted and removed from the same end, called
            the TOP.
          </p>
          <p>
            It follows the LIFO principle:
            Last In, First Out.
          </p>
          <p>
            The element inserted last is the first element
            removed.
          </p>

          <h3>Real-world examples</h3>
          <ul>
            <li>A stack of plates: remove the top plate first.</li>
            <li>Undo operation in text editors.</li>
            <li>Browser back navigation.</li>
            <li>Function calls and recursion.</li>
            <li>Expression evaluation in calculators.</li>
          </ul>

          <h3>Visual understanding</h3>
          <CodeExample>{`        TOP
         |
      +------+
      |  30  |  <- Last inserted
      +------+
      |  20  |
      +------+
      |  10  |  <- First inserted
      +------+

       Stack`}</CodeExample>

          <h3>Understanding LIFO</h3>
          <CodeExample>{`push(10);
push(20);
push(30);

pop(); // Removes 30
pop(); // Removes 20

// Remaining stack: 10`}</CodeExample>

          <h3>Stack terminology</h3>
          <ul>
            <li><strong>TOP:</strong> Position of the most recently inserted element.</li>
            <li><strong>Push:</strong> Insert an element.</li>
            <li><strong>Pop:</strong> Remove the top element.</li>
            <li><strong>Peek:</strong> View the top element without removing it.</li>
            <li><strong>Underflow:</strong> Trying to remove an element from an empty stack.</li>
            <li><strong>Overflow:</strong> Trying to insert into a full fixed-capacity stack.</li>
          </ul>

          <h3>Stack vs Array</h3>
          <ul>
            <li>An array supports direct indexed access.</li>
            <li>A Stack restricts normal access to its top element.</li>
            <li>A Stack can be implemented using an array or linked list.</li>
            <li>A Stack is an abstract data type (ADT), not necessarily a particular storage structure.</li>
          </ul>

          <h3>When should we use a Stack?</h3>
          <ul>
            <li>When the most recent item must be processed first.</li>
            <li>When reversing an order of operations.</li>
            <li>When tracking nested structures.</li>
            <li>When implementing backtracking algorithms.</li>
          </ul>
        </article>

        {/* 2. INTERNALS */}

        <article id="internals" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2 · INTERNAL WORKING</p>
          <h2>2. Stack Internals and Memory Management</h2>

          <h3>2.1 How does a Stack work internally?</h3>
          <p>
            A Stack maintains a reference or index to its top
            element. Every insertion and deletion happens at
            that position.
          </p>

          <h3>2.2 Push operation dry run</h3>
          <CodeExample>{`Initially: Empty Stack

push(10):
[10]       TOP = 10

push(20):
[10, 20]   TOP = 20

push(30):
[10, 20, 30] TOP = 30`}</CodeExample>

          <h3>2.3 Pop operation dry run</h3>
          <CodeExample>{`Initial Stack:
[10, 20, 30]

pop():

Removed = 30
Remaining = [10, 20]
TOP = 20`}</CodeExample>

          <h3>2.4 Stack using an array</h3>
          <p>
            An array-based Stack stores elements in consecutive
            memory locations. A variable called top tracks the
            last occupied index.
          </p>

          <CodeExample>{`int[] stack = new int[5];
int top = -1;

// Empty stack: top = -1
// First element: top = 0
// Second element: top = 1`}</CodeExample>

          <h3>2.5 Stack using a linked list</h3>
          <p>
            A linked-list Stack stores elements in nodes.
            The head node represents the top. Insertion and
            deletion happen at the head.
          </p>

          <CodeExample>{`TOP
 |
 v
[30 | next] -> [20 | next] -> [10 | null]`}</CodeExample>

          <h3>2.6 Stack memory vs Heap memory</h3>
          <p>
            Do not confuse the Stack data structure with the
            JVM call stack or heap memory.
          </p>
          <ul>
            <li><strong>Stack data structure:</strong> A LIFO abstract data type.</li>
            <li><strong>JVM call stack:</strong> Stores method frames and local execution information.</li>
            <li><strong>Heap memory:</strong> Stores objects and arrays during Java execution.</li>
          </ul>

          <h3>2.7 What is a Stack Frame?</h3>
          <p>
            Each method invocation creates a stack frame in
            the JVM thread's call stack. It holds information
            required for that method execution, including
            local variables and return information.
          </p>

          <CodeExample>{`static void first() {
    second();
}

static void second() {
    third();
}

static void third() {
    System.out.println("Hello");
}

public static void main(String[] args) {
    first();
}`}</CodeExample>

          <p>
            The call sequence is main → first → second → third.
            When third finishes, execution returns in reverse
            order.
          </p>

          <h3>2.8 Stack Overflow</h3>
          <p>
            Excessive recursive calls can exhaust the available
            JVM thread stack and cause StackOverflowError.
          </p>

          <CodeExample>{`static void recursive() {
    recursive();
}

public static void main(String[] args) {
    recursive();
}`}</CodeExample>
        </article>

        {/* 3. OPERATIONS */}

        <article id="operations" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2 · CORE OPERATIONS</p>
          <h2>3. Stack Operations</h2>

          <h3>3.1 Push</h3>
          <p>
            Push inserts an element at the top of the Stack.
          </p>
          <CodeExample>{`Stack<Integer> stack = new Stack<>();

stack.push(10);
stack.push(20);
stack.push(30);`}</CodeExample>
          <p>Result: [10, 20, 30], with 30 at the top.</p>

          <h3>3.2 Pop</h3>
          <p>
            Pop removes and returns the top element.
          </p>
          <CodeExample>{`int removed = stack.pop();

System.out.println(removed); // 30`}</CodeExample>
          <p>
            Calling pop() on an empty Java Stack throws
            EmptyStackException.
          </p>

          <h3>3.3 Peek</h3>
          <p>
            Peek returns the top element without removing it.
          </p>
          <CodeExample>{`int topElement = stack.peek();

System.out.println(topElement); // 20`}</CodeExample>

          <h3>3.4 isEmpty</h3>
          <CodeExample>{`if (stack.isEmpty()) {
    System.out.println("Stack is empty");
}`}</CodeExample>

          <h3>3.5 Search</h3>
          <CodeExample>{`Stack<Integer> stack = new Stack<>();

stack.push(10);
stack.push(20);
stack.push(30);

System.out.println(stack.search(30)); // 1
System.out.println(stack.search(10)); // 3`}</CodeExample>
          <p>
            Java Stack.search() returns a 1-based position
            counted from the top. It returns -1 if the element
            is not found.
          </p>

          <h3>3.6 Size</h3>
          <CodeExample>{`System.out.println(stack.size());`}</CodeExample>

          <h3>3.7 Complete operation example</h3>
          <CodeExample>{`import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();

        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println(stack.peek()); // 30
        System.out.println(stack.pop());  // 30
        System.out.println(stack.size()); // 2
        System.out.println(stack.isEmpty()); // false
    }
}`}</CodeExample>
        </article>

        {/* 4. IMPLEMENTATION */}

        <article id="implementation" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2–3 · JAVA IMPLEMENTATIONS</p>
          <h2>4. Implementing Stacks in Java</h2>

          <h3>4.1 Using the Stack class</h3>
          <p>
            Java provides java.util.Stack. It is a legacy
            synchronized class that extends Vector.
          </p>
          <CodeExample>{`import java.util.Stack;

Stack<Integer> stack = new Stack<>();

stack.push(10);
stack.push(20);

System.out.println(stack.pop());`}</CodeExample>

          <h3>4.2 Using ArrayDeque – Recommended for many cases</h3>
          <p>
            ArrayDeque is generally preferred over the legacy
            Stack class for ordinary single-threaded LIFO
            operations.
          </p>
          <CodeExample>{`import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        Deque<Integer> stack = new ArrayDeque<>();

        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println(stack.peek()); // 30
        System.out.println(stack.pop());  // 30
    }
}`}</CodeExample>
          <p>
            ArrayDeque does not allow null elements. It is not
            thread-safe by default.
          </p>

          <h3>4.3 Implement Stack using an array</h3>
          <CodeExample>{`class MyStack {
    private int[] arr;
    private int top;
    private int capacity;

    MyStack(int size) {
        arr = new int[size];
        capacity = size;
        top = -1;
    }

    public void push(int value) {
        if (top == capacity - 1) {
            System.out.println("Stack Overflow");
            return;
        }

        arr[++top] = value;
    }

    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack Underflow");
        }

        return arr[top--];
    }

    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is Empty");
        }

        return arr[top];
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public int size() {
        return top + 1;
    }
}`}</CodeExample>

          <h3>4.4 Implement Stack using a linked list</h3>
          <CodeExample>{`class MyStack {
    private static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
        }
    }

    private Node top;
    private int size;

    public void push(int value) {
        Node node = new Node(value);
        node.next = top;
        top = node;
        size++;
    }

    public int pop() {
        if (top == null) {
            throw new RuntimeException("Stack Underflow");
        }

        int value = top.data;
        top = top.next;
        size--;

        return value;
    }

    public int peek() {
        if (top == null) {
            throw new RuntimeException("Stack is Empty");
        }

        return top.data;
    }

    public boolean isEmpty() {
        return top == null;
    }

    public int size() {
        return size;
    }
}`}</CodeExample>

          <h3>4.5 Which implementation should you choose?</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Implementation</th>
                <th>When to use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Stack</td>
                <td>Learning the legacy Java API</td>
              </tr>
              <tr>
                <td>ArrayDeque</td>
                <td>Most ordinary LIFO applications</td>
              </tr>
              <tr>
                <td>Array</td>
                <td>Fixed capacity or manual implementation</td>
              </tr>
              <tr>
                <td>Linked List</td>
                <td>Dynamic node-based implementation</td>
              </tr>
            </tbody>
          </table>
        </article>

        {/* 5. COMPLEXITY */}

        <article id="complexity" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2–3 · COMPLEXITY ANALYSIS</p>
          <h2>5. Time and Space Complexity</h2>

          <h3>5.1 Operation complexity</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Array Stack</th>
                <th>Linked List Stack</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Push</td><td>O(1) fixed capacity</td><td>O(1)</td></tr>
              <tr><td>Pop</td><td>O(1)</td><td>O(1)</td></tr>
              <tr><td>Peek</td><td>O(1)</td><td>O(1)</td></tr>
              <tr><td>isEmpty</td><td>O(1)</td><td>O(1)</td></tr>
              <tr><td>Search</td><td>O(n)</td><td>O(n)</td></tr>
            </tbody>
          </table>

          <h3>5.2 Why is Push O(1)?</h3>
          <p>
            In a fixed-capacity array, push updates the top
            index and writes one value. It does not depend on
            the number of existing elements.
          </p>

          <h3>5.3 Dynamic array amortized complexity</h3>
          <p>
            Dynamic arrays may occasionally resize and copy
            elements. Therefore, an individual insertion can
            cost O(n), but push has amortized O(1) complexity
            over a sequence of insertions.
          </p>

          <h3>5.4 Space complexity</h3>
          <ul>
            <li>Storing n elements requires O(n) space.</li>
            <li>Array-based stacks reserve their capacity.</li>
            <li>Linked-list stacks require additional node references.</li>
            <li>Recursive algorithms can use O(n) call-stack space in the worst case.</li>
          </ul>

          <h3>5.5 Auxiliary space vs total space</h3>
          <p>
            Total space includes the input and data structures
            being used. Auxiliary space refers to additional
            memory used by an algorithm, excluding the input
            according to the stated convention.
          </p>
        </article>

        {/* 6. PATTERNS */}

        <article id="patterns" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 3 · PROBLEM SOLVING</p>
          <h2>6. Important Stack Problem Patterns</h2>

          <h3>6.1 Balanced Parentheses</h3>
          <p>
            Use a Stack to track opening brackets. When a
            closing bracket appears, check whether it matches
            the most recent opening bracket.
          </p>
          <CodeExample>{`String s = "{[()]}";

// Push: {, [, (
// Read ): matches (
// Read ]: matches [
// Read }: matches {

// Result: Balanced`}</CodeExample>

          <h3>6.2 Next Greater Element</h3>
          <p>
            Find the first greater element to the right of
            every array element. A monotonic decreasing Stack
            helps solve this in O(n) time.
          </p>
          <CodeExample>{`Input:  [4, 5, 2, 10]

Output: [5, 10, 10, -1]`}</CodeExample>

          <h3>6.3 Next Smaller Element</h3>
          <p>
            Find the first smaller element to the right.
            Maintain a suitable monotonic Stack while
            traversing the array.
          </p>

          <h3>6.4 Previous Greater and Previous Smaller</h3>
          <p>
            Similar to next-element problems, but process
            elements in the opposite direction or use the
            corresponding traversal strategy.
          </p>

          <h3>6.5 Monotonic Stack</h3>
          <p>
            A Monotonic Stack maintains elements in increasing
            or decreasing order. It is useful when an element
            must find its nearest greater or smaller neighbour.
          </p>
          <ul>
            <li>Monotonic increasing Stack.</li>
            <li>Monotonic decreasing Stack.</li>
            <li>Next Greater Element.</li>
            <li>Previous Smaller Element.</li>
            <li>Stock Span Problem.</li>
            <li>Largest Rectangle in Histogram.</li>
          </ul>

          <h3>6.6 Stock Span Problem</h3>
          <p>
            Find how many consecutive previous days have
            prices less than or equal to today's price.
            A monotonic Stack provides an O(n) solution.
          </p>
          <CodeExample>{`Input:  [100, 80, 60, 70, 60, 75, 85]

Output: [1, 1, 1, 2, 1, 4, 6]`}</CodeExample>

          <h3>6.7 Min Stack</h3>
          <p>
            Design a Stack that supports retrieving the
            minimum element in O(1) time.
          </p>
          <p>
            One approach maintains an additional Stack of
            minimum values.
          </p>

          <h3>6.8 Two Stacks in One Array</h3>
          <p>
            Use two top pointers. One Stack grows from the
            beginning and the other grows from the end.
            Overflow occurs when the two tops meet.
          </p>
        </article>

        {/* 7. ADVANCED */}

        <article id="advanced" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 4 · ADVANCED ALGORITHMS</p>
          <h2>7. Advanced Stack Applications</h2>

          <h3>7.1 Expression Evaluation</h3>
          <p>
            Stacks are used to evaluate arithmetic expressions
            and manage operators and operands.
          </p>
          <ul>
            <li>Infix: A + B</li>
            <li>Prefix: + A B</li>
            <li>Postfix: A B +</li>
          </ul>

          <h3>7.2 Infix to Postfix Conversion</h3>
          <p>
            Use an operator Stack to manage precedence and
            parentheses. Operands are added directly to the
            output, while operators are popped according to
            precedence and associativity rules.
          </p>

          <h3>7.3 Postfix Evaluation</h3>
          <CodeExample>{`Expression: 2 3 4 * +

Push 2
Push 3
Push 4

Read *:
Pop 4 and 3
Calculate 3 * 4 = 12
Push 12

Read +:
Pop 12 and 2
Calculate 2 + 12 = 14

Answer: 14`}</CodeExample>

          <h3>7.4 Largest Rectangle in Histogram</h3>
          <p>
            A monotonic increasing Stack tracks bar indices.
            When a shorter bar is found, calculate the
            rectangle areas for bars that can no longer
            extend further.
          </p>

          <h3>7.5 Trapping Rain Water</h3>
          <p>
            A monotonic Stack can identify boundaries that
            hold water between taller bars. A two-pointer
            approach is another common O(n) solution.
          </p>

          <h3>7.6 Remove K Digits</h3>
          <p>
            Maintain a monotonic increasing sequence of
            digits. Remove larger preceding digits when
            a smaller digit arrives and removals remain.
          </p>

          <h3>7.7 Iterative Tree Traversal</h3>
          <p>
            Stacks can replace recursion in preorder,
            inorder and certain postorder tree traversals.
          </p>

          <h3>7.8 Graph DFS</h3>
          <p>
            Depth First Search can be implemented using
            an explicit Stack instead of recursive calls.
          </p>

          <h3>7.9 Backtracking</h3>
          <p>
            Stacks help track decisions and states that
            need to be revisited when exploring alternative
            solutions.
          </p>

          <h3>7.10 Call Stack and Recursion</h3>
          <p>
            Recursive method calls create execution frames.
            Understanding the order in which frames are
            pushed and removed is essential for debugging
            recursion.
          </p>
        </article>

        {/* 8. EDGE CASES */}

        <article id="edge-cases" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 4 · EDGE CASES</p>
          <h2>8. Edge Cases and Common Mistakes</h2>

          <h3>Important test cases</h3>
          <ul>
            <li>Pop from an empty Stack.</li>
            <li>Peek from an empty Stack.</li>
            <li>Push into a full fixed-capacity Stack.</li>
            <li>Push only one element and then pop it.</li>
            <li>Repeatedly push and pop elements.</li>
            <li>Duplicate values in the Stack.</li>
            <li>Negative numbers and zero.</li>
            <li>Large input sizes.</li>
            <li>Unbalanced parentheses.</li>
            <li>Expressions with multiple operators of equal precedence.</li>
          </ul>

          <h3>Common mistakes</h3>
          <ul>
            <li>Forgetting to update top after pop.</li>
            <li>Using top = 0 for an empty array-based Stack.</li>
            <li>Confusing peek() with pop().</li>
            <li>Not checking underflow.</li>
            <li>Incorrect bracket matching.</li>
            <li>Using the wrong monotonic Stack order.</li>
            <li>Forgetting duplicate elements in boundary calculations.</li>
            <li>Ignoring integer overflow in area calculations.</li>
          </ul>

          <h3>Debugging checklist</h3>
          <ol>
            <li>What does top represent?</li>
            <li>What is the initial value of top?</li>
            <li>Is the Stack empty before pop?</li>
            <li>Are elements being processed in the correct order?</li>
            <li>Does every pushed element eventually get handled?</li>
          </ol>
        </article>

        {/* 9. PRACTICE */}

        <article id="practice" className="dsa-lesson-section">
          <p className="dsa-level">PRACTICE ZONE · BEGINNER TO ADVANCED</p>
          <h2>9. Stack Coding Practice</h2>
          <p>
            Solve in order. Understand brute force first,
            then optimize. Analyse time and auxiliary space.
          </p>

          <h3>Beginner — Build fundamentals</h3>

          <div className="dsa-practice-card">
            <h4>1. Implement Stack using Arrays</h4>
            <p><strong>Task:</strong> Implement push, pop, peek and isEmpty.</p>
            <p><strong>Concepts:</strong> Arrays, top pointer, LIFO.</p>
            <p><strong>Target:</strong> O(1) per operation.</p>
            <a href="https://www.geeksforgeeks.org/problems/implement-stack-using-array/1" target="_blank" rel="noreferrer">Solve on GeeksforGeeks →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>2. Valid Parentheses</h4>
            <p><strong>Task:</strong> Check whether brackets are correctly matched.</p>
            <p><strong>Concepts:</strong> Stack, character matching.</p>
            <p><strong>Target:</strong> O(n) time, O(n) space.</p>
            <a href="https://leetcode.com/problems/valid-parentheses/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>3. Implement Queue using Stacks</h4>
            <p><strong>Task:</strong> Build FIFO queue operations using two stacks.</p>
            <p><strong>Concepts:</strong> Stack, amortized analysis.</p>
            <p><strong>Target:</strong> Amortized O(1) per operation.</p>
            <a href="https://leetcode.com/problems/implement-queue-using-stacks/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <h3>Intermediate — Pattern recognition</h3>

          <div className="dsa-practice-card">
            <h4>4. Min Stack</h4>
            <p><strong>Task:</strong> Support retrieving the minimum in constant time.</p>
            <p><strong>Concepts:</strong> Auxiliary Stack, design.</p>
            <p><strong>Target:</strong> O(1) per operation.</p>
            <a href="https://leetcode.com/problems/min-stack/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>5. Next Greater Element I</h4>
            <p><strong>Task:</strong> Find the next greater value for each requested element.</p>
            <p><strong>Concepts:</strong> Monotonic Stack, hashing.</p>
            <p><strong>Target:</strong> O(n + m) time.</p>
            <a href="https://leetcode.com/problems/next-greater-element-i/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>6. Daily Temperatures</h4>
            <p><strong>Task:</strong> Find how many days until a warmer temperature.</p>
            <p><strong>Concepts:</strong> Monotonic decreasing Stack.</p>
            <p><strong>Target:</strong> O(n) time.</p>
            <a href="https://leetcode.com/problems/daily-temperatures/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <h3>Advanced — Interview level</h3>

          <div className="dsa-practice-card">
            <h4>7. Largest Rectangle in Histogram</h4>
            <p><strong>Task:</strong> Find the largest rectangle area in a histogram.</p>
            <p><strong>Concepts:</strong> Monotonic Stack, boundaries.</p>
            <p><strong>Target:</strong> O(n) time.</p>
            <a href="https://leetcode.com/problems/largest-rectangle-in-histogram/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>8. Trapping Rain Water</h4>
            <p><strong>Task:</strong> Calculate the total trapped rainwater.</p>
            <p><strong>Concepts:</strong> Monotonic Stack, two pointers.</p>
            <p><strong>Target:</strong> O(n) time.</p>
            <a href="https://leetcode.com/problems/trapping-rain-water/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>9. Basic Calculator II</h4>
            <p><strong>Task:</strong> Evaluate an expression containing +, -, * and /.</p>
            <p><strong>Concepts:</strong> Stack, operator precedence.</p>
            <p><strong>Target:</strong> O(n) time.</p>
            <a href="https://leetcode.com/problems/basic-calculator-ii/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>

          <div className="dsa-practice-card">
            <h4>10. Remove K Digits</h4>
            <p><strong>Task:</strong> Remove k digits to create the smallest possible number.</p>
            <p><strong>Concepts:</strong> Greedy, monotonic Stack.</p>
            <p><strong>Target:</strong> O(n) time.</p>
            <a href="https://leetcode.com/problems/remove-k-digits/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
          </div>
        </article>

        {/* 10. INTERVIEW */}

        <article id="interview" className="dsa-lesson-section">
          <p className="dsa-level">INTERVIEW PREPARATION · EXPERT LEVEL</p>
          <h2>10. Stack Interview Questions</h2>

          <details className="dsa-interview-question">
            <summary>1. What is a Stack?</summary>
            <p>
              A linear abstract data type following LIFO.
              Insertion and deletion happen at the top.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>2. What is the difference between Stack and Queue?</summary>
            <p>
              Stack follows LIFO, while Queue follows FIFO.
              Stack inserts and removes at the same end.
              Queue typically inserts at the rear and removes
              from the front.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>3. Can a Stack be implemented without an array?</summary>
            <p>
              Yes. It can be implemented using a linked list,
              dynamic array or other suitable structures.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>4. Why is Stack push O(1)?</summary>
            <p>
              A fixed-capacity implementation updates the top
              and inserts one element without shifting existing
              elements. Dynamic arrays provide amortized O(1)
              push.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>5. What is Stack underflow?</summary>
            <p>
              Attempting to remove an element when the Stack
              is empty.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>6. What is a Monotonic Stack?</summary>
            <p>
              A Stack that maintains elements in increasing
              or decreasing order to efficiently solve
              nearest greater or smaller element problems.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>7. What is the difference between peek and pop?</summary>
            <p>
              Peek returns the top element without removing it.
              Pop returns and removes the top element.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>8. Why is ArrayDeque preferred over Stack in Java?</summary>
            <p>
              ArrayDeque is generally preferred for ordinary
              single-threaded LIFO operations because it avoids
              the legacy Stack class's Vector inheritance and
              synchronization overhead.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>9. How do you implement a Stack using two Queues?</summary>
            <p>
              One approach makes push costly by rearranging
              elements so that the newest item stays at the
              front. Another approach makes pop costly.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>10. What causes StackOverflowError?</summary>
            <p>
              Exhaustion of a thread's available JVM call-stack
              space, often due to excessively deep recursion
              or too many nested method calls.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>11. Explain the Stock Span problem.</summary>
            <p>
              For each day, find the number of consecutive
              previous days with prices less than or equal
              to today's price. A monotonic Stack solves it
              in O(n) time.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>12. Explain Largest Rectangle in Histogram.</summary>
            <p>
              Find the maximum rectangle using bar heights
              and their nearest smaller boundaries. A
              monotonic Stack solves it in O(n) time.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>13. What is the difference between JVM Stack and Stack ADT?</summary>
            <p>
              Stack ADT is a LIFO data structure. JVM Stack
              is a per-thread runtime memory structure that
              stores method frames.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>14. Can a Stack contain duplicate values?</summary>
            <p>
              Yes. A Stack can contain repeated values.
              Each insertion is a separate stack entry.
            </p>
          </details>

          <details className="dsa-interview-question">
            <summary>15. How can you reverse a String using a Stack?</summary>
            <p>
              Push every character onto the Stack and pop
              characters one by one to obtain the reverse
              order. Time and auxiliary space are O(n).
            </p>
          </details>
        </article>

        {/* COMPLETION */}

        <section className="dsa-completion-panel">
          <div className="dsa-completion-summary">
            <h2>Stack Learning Progress</h2>
            <p>Mark sections complete as you master them.</p>
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

          <p>
            {completedSections.length} / {sections.length} sections
            completed · {progress}%
          </p>
        </section>

      </main>
    </section>
  );
}

export default StackLesson;
