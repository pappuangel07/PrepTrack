

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
    title: "1. How to Approach a Coding Problem",
    content: (
      <>
        <p>
          Don't immediately start coding. First understand
          the problem and identify its constraints.
        </p>
        <ol>
          <li>Read the problem carefully.</li>
          <li>Identify input, output, and constraints.</li>
          <li>Try a small example manually.</li>
          <li>Think of a brute-force solution.</li>
          <li>Find the bottleneck.</li>
          <li>Choose a suitable pattern.</li>
          <li>Write code and test edge cases.</li>
          <li>Analyze time and space complexity.</li>
        </ol>
      </>
    ),
    code: `Problem-solving checklist:

1. Understand
2. Example
3. Brute force
4. Optimize
5. Code
6. Test
7. Complexity`,
  },
  {
    title: "2. Pattern: Frequency Counting",
    content: (
      <>
        <p>
          Use a frequency map when you need to count
          how many times each value appears.
        </p>
        <p>Common applications:</p>
        <ul>
          <li>Find duplicate elements</li>
          <li>Count characters</li>
          <li>Check whether two strings are anagrams</li>
          <li>Find elements occurring more than once</li>
        </ul>
        <p>
          Time complexity is usually O(n) for n elements
          with average-case HashMap operations.
        </p>
      </>
    ),
    code: `import java.util.HashMap;
import java.util.Map;

int[] nums = {2, 3, 2, 5, 3, 2};

Map<Integer, Integer> frequency =
    new HashMap<>();

for (int num : nums) {
    frequency.put(
        num,
        frequency.getOrDefault(num, 0) + 1
    );
}

System.out.println(frequency);

// Average time: O(n)
// Extra space: O(k)
// k = distinct values`,
  },
  {
    title: "3. Pattern: Two Pointers",
    content: (
      <>
        <p>
          Two pointers use two positions to scan
          a collection, often reducing nested loops
          to a single pass.
        </p>
        <p>Common applications:</p>
        <ul>
          <li>Pair sum in a sorted array</li>
          <li>Reverse an array</li>
          <li>Remove duplicates from sorted arrays</li>
          <li>Palindrome checking</li>
        </ul>
        <p>
          For the pair-sum example below, the array
          must be sorted.
        </p>
      </>
    ),
    code: `int[] nums = {1, 2, 4, 6, 9};
int target = 10;

int left = 0;
int right = nums.length - 1;

while (left < right) {
    int sum = nums[left] + nums[right];

    if (sum == target) {
        System.out.println(
            left + ", " + right
        );
        break;
    }

    if (sum < target) {
        left++;
    } else {
        right--;
    }
}

// Time: O(n)
// Extra space: O(1)`,
  },
  {
    title: "4. Pattern: Sliding Window",
    content: (
      <>
        <p>
          Sliding window maintains a range of elements
          and moves its boundaries instead of repeatedly
          processing every possible subarray.
        </p>
        <p>Use it for problems involving:</p>
        <ul>
          <li>Subarrays or substrings</li>
          <li>Fixed-size windows</li>
          <li>Longest or shortest valid range</li>
          <li>Window sums or frequency counts</li>
        </ul>
        <p>
          A variable-size sliding window often works
          when the condition changes predictably as
          the window expands or shrinks.
        </p>
      </>
    ),
    code: `// Maximum sum of a fixed-size window
// k must be between 1 and nums.length.

int[] nums = {2, 1, 5, 1, 3, 2};
int k = 3;

int windowSum = 0;

for (int i = 0; i < k; i++) {
    windowSum += nums[i];
}

int maxSum = windowSum;

for (int i = k; i < nums.length; i++) {
    windowSum += nums[i];
    windowSum -= nums[i - k];

    maxSum = Math.max(maxSum, windowSum);
}

System.out.println(maxSum); // 9

// Time: O(n)
// Extra space: O(1)`,
  },
  {
    title: "5. Pattern: Prefix Sum",
    content: (
      <>
        <p>
          A prefix sum stores cumulative sums.
          It can answer range-sum queries efficiently.
        </p>
        <p>
          With a prefix array of length n + 1,
          the sum from index left to right inclusive
          is calculated using two prefix values.
        </p>
        <p>
          Building the prefix array takes O(n).
          Each range-sum query then takes O(1).
        </p>
      </>
    ),
    code: `int[] nums = {2, 4, 1, 5};
int n = nums.length;

int[] prefix = new int[n + 1];

for (int i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
}

// Sum from index 1 to 3:
int left = 1;
int right = 3;

int sum =
    prefix[right + 1] - prefix[left];

System.out.println(sum); // 10`,
  },
  {
    title: "6. Pattern: Binary Search",
    content: (
      <>
        <p>
          Binary search repeatedly halves the search
          space. It commonly requires sorted data
          or a monotonic condition.
        </p>
        <p>Use it for:</p>
        <ul>
          <li>Searching in sorted arrays</li>
          <li>Finding first or last occurrence</li>
          <li>Finding a lower or upper bound</li>
          <li>Searching an answer space</li>
        </ul>
        <p>
          The usual time complexity is O(log n).
        </p>
      </>
    ),
    code: `int[] nums = {1, 3, 5, 7, 9};
int target = 7;

int left = 0;
int right = nums.length - 1;
int answer = -1;

while (left <= right) {
    int mid = left + (right - left) / 2;

    if (nums[mid] == target) {
        answer = mid;
        break;
    }

    if (nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

System.out.println(answer); // 3`,
  },
  {
    title: "7. Pattern: Stack",
    content: (
      <>
        <p>
          A stack follows Last In, First Out (LIFO).
          The most recently added element is removed first.
        </p>
        <p>Common applications:</p>
        <ul>
          <li>Balanced parentheses</li>
          <li>Undo operations</li>
          <li>Expression evaluation</li>
          <li>Next greater element</li>
          <li>Monotonic stack problems</li>
        </ul>
        <p>
          In modern Java, ArrayDeque is usually preferred
          over the legacy Stack class for stack operations.
        </p>
      </>
    ),
    code: `import java.util.ArrayDeque;
import java.util.Deque;

Deque<Character> stack =
    new ArrayDeque<>();

String text = "({[]})";

for (char ch : text.toCharArray()) {
    if (ch == '(' || ch == '{' || ch == '[') {
        stack.push(ch);
    } else {
        if (stack.isEmpty()) {
            break;
        }

        char open = stack.pop();

        // Compare open and ch
        // using matching bracket rules.
    }
}

// Stack operations: O(1) each
// Total time: O(n)`,
  },
  {
    title: "8. Pattern: Queue and BFS",
    content: (
      <>
        <p>
          A queue follows First In, First Out (FIFO).
          Breadth-first search uses a queue to explore
          nodes level by level.
        </p>
        <p>Common applications:</p>
        <ul>
          <li>Shortest path in an unweighted graph</li>
          <li>Level-order tree traversal</li>
          <li>Grid traversal</li>
          <li>Finding minimum steps in state problems</li>
        </ul>
      </>
    ),
    code: `import java.util.ArrayDeque;
import java.util.Queue;

Queue<Integer> queue =
    new ArrayDeque<>();

boolean[] visited = new boolean[n];

queue.offer(start);
visited[start] = true;

while (!queue.isEmpty()) {
    int node = queue.poll();

    for (int next : graph[node]) {
        if (!visited[next]) {
            visited[next] = true;
            queue.offer(next);
        }
    }
}

// Graph BFS: O(V + E)
// V = vertices, E = edges`,
  },
  {
    title: "9. Pattern: Recursion and Backtracking",
    content: (
      <>
        <p>
          Recursion solves a problem by calling the
          same function on a smaller problem.
        </p>
        <p>
          Backtracking explores a choice, recursively
          searches, and then undoes the choice.
        </p>
        <p>Common applications:</p>
        <ul>
          <li>Subsets</li>
          <li>Permutations</li>
          <li>Combination sum</li>
          <li>Maze paths</li>
          <li>N-Queens</li>
        </ul>
        <p>
          Always identify the base case and ensure
          each recursive call makes progress.
        </p>
      </>
    ),
    code: `static void generate(
    int index,
    int[] nums,
    java.util.List<Integer> current
) {
    if (index == nums.length) {
        System.out.println(current);
        return;
    }

    // Exclude current element
    generate(index + 1, nums, current);

    // Include current element
    current.add(nums[index]);

    generate(index + 1, nums, current);

    // Undo choice
    current.remove(current.size() - 1);
}

// Number of subsets: 2^n
// Output itself can be exponential`,
  },
  {
    title: "10. Pattern: Dynamic Programming",
    content: (
      <>
        <p>
          Dynamic programming (DP) is useful when a
          problem has overlapping subproblems and
          optimal substructure.
        </p>
        <p>Two common approaches:</p>
        <ul>
          <li>
            Memoization: recursion with cached results.
          </li>
          <li>
            Tabulation: solve smaller states iteratively.
          </li>
        </ul>
        <p>
          Define the state, recurrence, base cases,
          and evaluation order before writing code.
        </p>
      </>
    ),
    code: `// Fibonacci using tabulation

int n = 6;

int[] dp = new int[n + 1];

dp[0] = 0;

if (n >= 1) {
    dp[1] = 1;
}

for (int i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
}

System.out.println(dp[n]); // 8

// Time: O(n)
// Space: O(n)`,
  },
  {
    title: "11. Pattern: Greedy",
    content: (
      <>
        <p>
          A greedy algorithm chooses what seems best
          at the current step.
        </p>
        <p>
          Greedy is not automatically correct.
          You need a proof or a known property showing
          that local choices lead to a global optimum.
        </p>
        <p>Common examples:</p>
        <ul>
          <li>Activity selection</li>
          <li>Interval scheduling</li>
          <li>Some coin systems</li>
          <li>Minimum spanning tree algorithms</li>
        </ul>
      </>
    ),
    code: `// Activity selection idea:
//
// 1. Sort activities by finish time.
// 2. Select the first activity.
// 3. Select the next activity whose
//    start time is >= last finish time.
//
// Sorting: O(n log n)
// Selection after sorting: O(n)
//
// Correctness depends on the
// activity-selection problem assumptions.`,
  },
  {
    title: "12. Pattern Recognition Guide",
    content: (
      <>
        <p>Look for clues in the problem statement:</p>
        <ul>
          <li>
            "Count occurrences" → frequency map
          </li>
          <li>
            "Sorted array, pair" → two pointers or binary search
          </li>
          <li>
            "Contiguous subarray/substring" → sliding window
            or prefix sum
          </li>
          <li>
            "Range sum queries" → prefix sum
          </li>
          <li>
            "Next greater/smaller" → monotonic stack
          </li>
          <li>
            "Level by level / minimum steps" → BFS
          </li>
          <li>
            "All combinations / all arrangements" → backtracking
          </li>
          <li>
            "Minimum/maximum with repeated states" → consider DP
          </li>
        </ul>
        <p>
          These are clues, not guaranteed solutions.
          Constraints and exact conditions decide the pattern.
        </p>
      </>
    ),
    code: `Before choosing a pattern, ask:

1. Is the input sorted?
2. Is the range contiguous?
3. Are repeated values important?
4. Do I need all possible answers?
5. Is there a shortest path?
6. Do subproblems repeat?
7. Is there a monotonic condition?`,
  },
  {
    title: "13. Common Mistakes",
    content: (
      <>
        <ul>
          <li>Using sliding window when negatives break the logic.</li>
          <li>Using binary search on unsorted data.</li>
          <li>Forgetting to mark BFS nodes visited.</li>
          <li>Changing a backtracking list without undoing it.</li>
          <li>Using recursion without a base case.</li>
          <li>Assuming greedy works without justification.</li>
          <li>Ignoring integer overflow in sums.</li>
          <li>Giving complexity without analyzing loops.</li>
        </ul>
      </>
    ),
    code: `// Safer midpoint:
int mid = left + (right - left) / 2;

// For large sums, consider:
long sum = (long) a + b;`,
  },
  {
    title: "14. Practice Plan",
    content: (
      <>
        <p>
          Practice patterns in increasing difficulty.
          Don't jump directly to hard problems.
        </p>
        <ol>
          <li>5 frequency-map problems</li>
          <li>5 two-pointer problems</li>
          <li>5 sliding-window problems</li>
          <li>5 prefix-sum problems</li>
          <li>5 binary-search problems</li>
          <li>5 stack and queue problems</li>
          <li>5 recursion/backtracking problems</li>
          <li>5 DP problems</li>
        </ol>
        <p>
          For each problem, write down why the pattern
          applies and what alternative you considered.
        </p>
      </>
    ),
    code: `Problem log:

Name:
Pattern:
Brute-force approach:
Optimized approach:
Time complexity:
Space complexity:
Mistake:
Revision date:`,
  },
];

export default function JavaCodingPatternsLesson({ onBack }) {
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
        Java Coding Interview Patterns
      </h1>

      <p
        style={{
          color: "var(--muted, #6b7280)",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        Learn how to recognize common problem-solving
        patterns and implement them using Java.
        Focus on understanding when each pattern works,
        its limitations, and its complexity.
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
          <li>Recognize common patterns from problem clues.</li>
          <li>Explain why a pattern works.</li>
          <li>Know its assumptions and limitations.</li>
          <li>Write the implementation without copying.</li>
          <li>Test edge cases.</li>
          <li>Analyze time and space complexity.</li>
          <li>Keep a problem log and revise mistakes.</li>
        </ul>
      </section>
    </div>
  );
}
