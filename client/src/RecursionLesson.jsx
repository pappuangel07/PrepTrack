
const sectionStyle = {
  background: "var(--card-bg, #ffffff)",
  border: "1px solid var(--border-color, #e5e7eb)",
  borderRadius: "12px",
  padding: "18px",
  marginBottom: "16px",
  color: "var(--text-color, #1f2937)",
};

const codeStyle = {
  background: "var(--code-bg, #f3f4f6)",
  padding: "14px",
  borderRadius: "8px",
  overflowX: "auto",
  fontSize: "13px",
  lineHeight: 1.6,
};

function Code({ children }) {
  return (
    <pre style={codeStyle}>
      <code>{children}</code>
    </pre>
  );
}

function Section({ title, children }) {
  return (
    <section style={sectionStyle}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function RecursionLesson({ onBack }) {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <button onClick={onBack} style={{ marginBottom: "18px" }}>
        ← Back to DSA
      </button>

      <header style={{ marginBottom: "24px" }}>
        <h1>Recursion</h1>
        <p>
          Learn how a function solves a problem by calling itself on
          smaller subproblems until it reaches a stopping condition.
        </p>
      </header>

      <Section title="1. What is Recursion?">
        <p>
          Recursion is a programming technique where a method calls
          itself to solve a smaller version of the same problem.
        </p>
        <p>
          Example: To calculate factorial of 5, calculate factorial of
          4 first, then multiply by 5.
        </p>
        <Code>{`factorial(5)
= 5 * factorial(4)
= 5 * 4 * factorial(3)
= 5 * 4 * 3 * factorial(2)
= 5 * 4 * 3 * 2 * factorial(1)
= 5 * 4 * 3 * 2 * 1`}</Code>
        <p>
          Every recursive solution needs a way to stop and a way to
          make progress toward that stopping point.
        </p>
      </Section>

      <Section title="2. The Two Essential Parts">
        <h3>Base case</h3>
        <p>
          The base case is the condition that stops further recursive
          calls.
        </p>
        <h3>Recursive case</h3>
        <p>
          The recursive case reduces the problem and calls the method
          again.
        </p>
        <Code>{`int countdown(int n) {
    if (n == 0) {       // Base case
        return 0;
    }

    System.out.println(n);
    return countdown(n - 1); // Recursive case
}`}</Code>
        <p>
          If the base case is missing—or never reached—the calls continue
          until the program runs out of stack space.
        </p>
      </Section>

      <Section title="3. How the Call Stack Works">
        <p>
          Each method call gets its own stack frame containing its
          local variables and execution state.
        </p>
        <Code>{`factorial(3)
  factorial(2)
    factorial(1)
      factorial(0) -> returns 1
    returns 1 * 1 = 1
  returns 2 * 1 = 2
returns 3 * 2 = 6`}</Code>
        <p>
          Calls move downward until the base case. Return values then
          move upward as each waiting call finishes.
        </p>
        <p>
          This is why recursion has extra memory usage: active calls
          occupy stack frames.
        </p>
      </Section>

      <Section title="4. Factorial">
        <p>
          Factorial of n is the product of positive integers from 1
          through n. By definition, 0! = 1.
        </p>
        <Code>{`public static int factorial(int n) {
    if (n < 0) {
        throw new IllegalArgumentException("n must be non-negative");
    }

    if (n == 0 || n == 1) {
        return 1;
    }

    return n * factorial(n - 1);
}`}</Code>
        <h3>Complexity</h3>
        <ul>
          <li>Time: O(n) recursive calls.</li>
          <li>Extra stack space: O(n).</li>
        </ul>
        <p>
          The result can overflow an int for relatively small n.
          Use a suitable numeric type or BigInteger when exact large
          factorials are required.
        </p>
      </Section>

      <Section title="5. Sum of Numbers">
        <p>
          Sum from 1 to n can be defined recursively:
          sum(n) = n + sum(n − 1).
        </p>
        <Code>{`public static int sumToN(int n) {
    if (n <= 0) {
        return 0;
    }

    return n + sumToN(n - 1);
}`}</Code>
        <p>
          Time: O(n). Stack space: O(n).
        </p>
        <p>
          For this particular problem, the formula n × (n + 1) / 2
          is faster and uses O(1) space. Recursion is useful here for
          learning the technique, not because it is the best solution.
        </p>
      </Section>

      <Section title="6. Fibonacci">
        <p>
          Fibonacci numbers follow:
          F(0) = 0, F(1) = 1, and F(n) = F(n − 1) + F(n − 2).
        </p>
        <Code>{`public static int fibonacci(int n) {
    if (n < 0) {
        throw new IllegalArgumentException("n must be non-negative");
    }

    if (n <= 1) {
        return n;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}`}</Code>
        <h3>Why this version is inefficient</h3>
        <p>
          Many values are recalculated repeatedly. For example,
          fibonacci(3) is computed in both branches of fibonacci(5).
        </p>
        <ul>
          <li>Time: O(2ⁿ) upper bound for this simple implementation.</li>
          <li>Stack space: O(n).</li>
        </ul>
        <p>
          Use memoization or an iterative approach to avoid repeated
          calculations. This is an early example of the motivation
          behind Dynamic Programming.
        </p>
      </Section>

      <Section title="7. Recursion on Arrays">
        <p>
          A recursive array method can process one index and then
          move to the next.
        </p>
        <h3>Print array elements</h3>
        <Code>{`public static void printArray(int[] arr, int index) {
    if (index == arr.length) {
        return;
    }

    System.out.println(arr[index]);
    printArray(arr, index + 1);
}`}</Code>
        <h3>Find maximum</h3>
        <Code>{`public static int max(int[] arr, int index) {
    if (index == arr.length - 1) {
        return arr[index];
    }

    int maxOfRest = max(arr, index + 1);
    return Math.max(arr[index], maxOfRest);
}`}</Code>
        <p>
          These examples use O(n) time and O(n) stack space.
          Ensure the array is non-empty before calling max.
        </p>
      </Section>

      <Section title="8. Recursive Binary Search">
        <p>
          Binary Search is naturally recursive: each call searches
          a smaller half of a sorted array.
        </p>
        <Code>{`public static int binarySearch(
        int[] arr, int target, int low, int high) {

    if (low > high) {
        return -1;
    }

    int mid = low + (high - low) / 2;

    if (arr[mid] == target) {
        return mid;
    }

    if (arr[mid] < target) {
        return binarySearch(arr, target, mid + 1, high);
    }

    return binarySearch(arr, target, low, mid - 1);
}`}</Code>
        <p>
          Time: O(log n). Stack space: O(log n).
        </p>
      </Section>

      <Section title="9. Multiple Recursive Calls">
        <p>
          A method may make more than one recursive call. This can
          create a branching recursion tree.
        </p>
        <Code>{`f(3)
├── f(2)
│   ├── f(1)
│   └── f(0)
└── f(1)`}</Code>
        <p>
          The number of calls depends on the branching structure.
          Do not assume every recursive method is O(n).
        </p>
        <p>
          For Fibonacci, the call tree grows exponentially because
          many subproblems repeat.
        </p>
      </Section>

      <Section title="10. Recursion vs Iteration">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px" }}>Recursion</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Iteration</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Uses method calls", "Uses loops"],
                ["Uses call stack", "Often O(1) extra space"],
                ["Can be clearer for trees and divide-and-conquer", "Often efficient for simple repetition"],
                ["May cause StackOverflowError", "Avoids recursive stack growth"],
                ["Can express recursive structure directly", "Can require explicit state or stack"],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        padding: "8px",
                        borderTop: "1px solid var(--border-color, #e5e7eb)",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Recursion is not automatically better or worse. Choose the
          approach that is correct, understandable, and safe for the
          input constraints.
        </p>
      </Section>

      <Section title="11. Tail Recursion">
        <p>
          A recursive call is tail-recursive when it is the final
          operation performed by the method.
        </p>
        <Code>{`// Not tail recursive
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Tail-recursive form
int factorialTail(int n, int result) {
    if (n <= 1) return result;
    return factorialTail(n - 1, n * result);
}`}</Code>
        <p>
          Tail recursion can sometimes be optimized by languages or
          compilers. Java does not guarantee tail-call optimization,
          so tail-recursive Java code can still use O(n) stack space.
        </p>
      </Section>

      <Section title="12. Recursion and Subsequence Problems">
        <p>
          A common pattern is making a decision for each element:
          include it or exclude it.
        </p>
        <Code>{`void generate(int[] arr, int index, List<Integer> current) {
    if (index == arr.length) {
        System.out.println(current);
        return;
    }

    // Include current element
    current.add(arr[index]);
    generate(arr, index + 1, current);

    // Backtrack: remove the included element
    current.remove(current.size() - 1);

    // Exclude current element
    generate(arr, index + 1, current);
}`}</Code>
        <p>
          Each element has two choices, so there can be 2ⁿ subsequences.
          Generating all of them takes at least exponential time because
          the output itself is exponential.
        </p>
        <p>
          This include/exclude structure is a stepping stone to
          Backtracking.
        </p>
      </Section>

      <Section title="13. How to Build a Recursive Solution">
        <ol>
          <li>Define exactly what the function means.</li>
          <li>Identify the smallest input that can be answered directly.</li>
          <li>Reduce the current problem to a smaller one.</li>
          <li>Make sure the input moves toward the base case.</li>
          <li>Combine the smaller result with the current step.</li>
          <li>Check time and stack-space complexity.</li>
        </ol>
        <p>
          Example function definition:
          <code> factorial(n) </code> returns the factorial of n.
          Once this meaning is clear, the recursive formula follows.
        </p>
      </Section>

      <Section title="14. Common Recursion Mistakes">
        <ul>
          <li>Missing base case.</li>
          <li>Base case is unreachable.</li>
          <li>Recursive call does not reduce the problem.</li>
          <li>Incorrect return value from recursive calls.</li>
          <li>Forgetting that each call has its own local variables.</li>
          <li>Ignoring repeated work in multiple-call recursion.</li>
          <li>Ignoring stack-space complexity.</li>
          <li>Using recursion for very deep input without considering stack overflow.</li>
        </ul>
      </Section>

      <Section title="15. Interview Pattern Recognition">
        <ul>
          <li>Repeatedly reduce input → basic recursion.</li>
          <li>Divide into smaller independent parts → divide and conquer.</li>
          <li>Tree traversal → recursive DFS.</li>
          <li>Try choices and undo choices → Backtracking.</li>
          <li>Repeated overlapping subproblems → Memoization / DP.</li>
          <li>Process each element with include/exclude → subsequence recursion.</li>
          <li>Halve the search space → recursive Binary Search.</li>
        </ul>
      </Section>

      <Section title="16. Practice Problems">
        <ol>
          <li>Print numbers from 1 to N</li>
          <li>Print numbers from N to 1</li>
          <li>Sum of first N numbers</li>
          <li>Factorial of N</li>
          <li>Fibonacci Number</li>
          <li>Reverse an array recursively</li>
          <li>Check whether a string is a palindrome</li>
          <li>Recursive Binary Search</li>
          <li>Generate all subsequences</li>
          <li>Generate all subsets</li>
          <li>Generate permutations</li>
          <li>Tower of Hanoi</li>
        </ol>
      </Section>

      <Section title="17. Quick Revision">
        <ul>
          <li>Base case stops recursion.</li>
          <li>Recursive case reduces the problem.</li>
          <li>Each active call consumes stack space.</li>
          <li>One call per level often gives O(n) time.</li>
          <li>Halving the problem often gives O(log n) levels.</li>
          <li>Repeated branching may cause exponential time.</li>
          <li>Tail recursion is not guaranteed to be optimized in Java.</li>
          <li>Recursion is a foundation for Backtracking, Trees, and DP.</li>
        </ul>
      </Section>
    </div>
  );
}
