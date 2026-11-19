
import { useState } from 'react';

const sections = [
  { id: 'intro', label: 'Introduction' },
  { id: 'memory', label: 'Internal Working' },
  { id: 'operations', label: 'Operations' },
  { id: 'complexity', label: 'Complexity' },
  { id: 'java', label: 'Java Implementations' },
  { id: 'patterns', label: 'Problem Patterns' },
  { id: 'edge-cases', label: 'Edge Cases' },
  { id: 'practice', label: 'Practice Problems' },
  { id: 'interview', label: 'Interview Questions' },
];

const practiceProblems = [
  {
    level: 'Beginner',
    name: 'Find the largest element',
    task: 'Return the maximum element in an integer array.',
    approach: 'Maintain a variable max and update it whenever a larger element is found.',
    complexity: 'O(n) time, O(1) extra space.',
    platform: 'GeeksforGeeks',
    url: 'https://www.geeksforgeeks.org/problems/largest-element-in-array4009/1',
  },
  {
    level: 'Beginner',
    name: 'Find the second largest element',
    task: 'Find the second largest distinct element without sorting.',
    approach: 'Maintain largest and secondLargest while traversing once.',
    complexity: 'O(n) time, O(1) extra space.',
    platform: 'GeeksforGeeks',
    url: 'https://www.geeksforgeeks.org/problems/second-largest3735/1',
  },
  {
    level: 'Beginner',
    name: 'Reverse an array',
    task: 'Reverse an array in place.',
    approach: 'Use two pointers, one at the beginning and one at the end.',
    complexity: 'O(n) time, O(1) extra space.',
    platform: 'GeeksforGeeks',
    url: 'https://www.geeksforgeeks.org/problems/reverse-an-array/1',
  },
  {
    level: 'Beginner',
    name: 'Check if array is sorted',
    task: 'Check whether elements are in non-decreasing order.',
    approach: 'Compare every element with its previous element.',
    complexity: 'O(n) time, O(1) extra space.',
    platform: 'GeeksforGeeks',
    url: 'https://www.geeksforgeeks.org/dsa/program-check-array-sorted-not-iterative-recursive/',
  },
  {
    level: 'Intermediate',
    name: 'Move zeroes to the end',
    task: 'Move all zeroes to the end while maintaining the order of non-zero elements.',
    approach: 'Use a write pointer to place non-zero elements, then fill remaining positions with zero.',
    complexity: 'O(n) time, O(1) extra space.',
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/move-zeroes/',
  },
  {
    level: 'Intermediate',
    name: 'Remove duplicates from sorted array',
    task: 'Remove duplicates in place and return the number of unique elements.',
    approach: 'Use slow and fast pointers.',
    complexity: 'O(n) time, O(1) extra space.',
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
  },
  {
    level: 'Intermediate',
    name: 'Two Sum',
    task: 'Find two indices whose elements add up to a target.',
    approach: 'Use a HashMap to store previously seen values and their indices.',
    complexity: 'O(n) expected time, O(n) space.',
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/two-sum/',
  },
  {
    level: 'Intermediate',
    name: 'Maximum subarray sum',
    task: 'Find the maximum sum of a contiguous subarray.',
    approach: "Use Kadane's algorithm to maintain the best sum ending at the current position.",
    complexity: 'O(n) time, O(1) extra space.',
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/maximum-subarray/',
  },
  {
    level: 'Advanced',
    name: 'Product of array except self',
    task: 'Return an array where each position contains the product of all other elements, without division.',
    approach: 'Combine prefix and suffix products.',
    complexity: 'O(n) time, O(1) auxiliary space excluding output.',
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/product-of-array-except-self/',
  },
  {
    level: 'Advanced',
    name: 'Trapping rain water',
    task: 'Calculate how much water can be trapped between bars of different heights.',
    approach: 'Use two pointers and track leftMax and rightMax.',
    complexity: 'O(n) time, O(1) extra space.',
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/trapping-rain-water/',
  },
  {
    level: 'Advanced',
    name: 'Subarray sum equals K',
    task: 'Count contiguous subarrays whose sum equals K.',
    approach: 'Use prefix sums and a HashMap of prefix-sum frequencies.',
    complexity: 'O(n) expected time, O(n) space.',
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/subarray-sum-equals-k/',
  },
];

function CodeExample({ children }) {
  return (
    <pre className="dsa-code">
      <code>{children}</code>
    </pre>
  );
}

function DSALesson({ onBack }) {
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
    <section className="dsa-lesson">
      <button
        type="button"
        className="secondary-button"
        onClick={onBack}
      >
        ← Back to DSA Topics
      </button>

      <header className="dsa-lesson-header">
        <p className="java-eyebrow">DSA LEARNING HUB · ARRAYS</p>
        <h1>Arrays – Complete Learning Guide</h1>
        <p>
          Start with the fundamentals and progress towards
          advanced problem-solving and interview-level questions.
        </p>

        <div className="dsa-lesson-progress">
          <div className="dsa-lesson-progress-info">
            <strong>{progress}% completed</strong>
            <span>
              {completedSections.length} of {sections.length} sections
            </span>
          </div>
          <div className="java-progress-track">
            <div
              className="java-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <nav className="dsa-section-nav" aria-label="Arrays lesson sections">
        {sections.map((section, index) => (
          <button
            type="button"
            key={section.id}
            className={
              activeSection === section.id
                ? 'dsa-section-link active'
                : 'dsa-section-link'
            }
            onClick={() => {
              setActiveSection(section.id);
              document.getElementById(section.id)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          >
            {index + 1}. {section.label}
            {completedSections.includes(section.id) ? ' ✓' : ''}
          </button>
        ))}
      </nav>

      <main className="dsa-lesson-content">

        <article id="intro" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 1 · BEGINNER</p>
          <h2>1. Introduction to Arrays</h2>

          <h3>What is an Array?</h3>
          <p>
            An array is a linear data structure that stores multiple
            elements of the same data type in an indexed collection.
          </p>

          <p>Instead of creating separate variables:</p>
          <CodeExample>{`int mark1 = 80;
int mark2 = 90;
int mark3 = 75;
int mark4 = 85;`}</CodeExample>

          <p>We can store all the marks in one array:</p>
          <CodeExample>{`int[] marks = {80, 90, 75, 85};`}</CodeExample>

          <h3>Important Characteristics</h3>
          <ul>
            <li>Stores elements of the same declared type.</li>
            <li>Uses zero-based indexing in Java.</li>
            <li>Provides direct access using an index.</li>
            <li>Java arrays have a fixed length after creation.</li>
            <li>Elements are accessed using the array variable and index.</li>
          </ul>

          <h3>Array Indexing</h3>
          <CodeExample>{`int[] numbers = {10, 20, 30, 40, 50};

numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;
numbers[3] = 40;
numbers[4] = 50;

System.out.println(numbers[2]); // 30`}</CodeExample>

          <p>
            If an array has n elements, its valid indices are
            from 0 to n - 1.
          </p>

          <h3>Declaration and Creation</h3>
          <CodeExample>{`// Declaration
int[] numbers;

// Creation
numbers = new int[5];

// Declaration and creation together
int[] values = new int[5];

// Initialization with values
int[] data = {10, 20, 30, 40, 50};

// Array length
System.out.println(data.length); // 5`}</CodeExample>

          <h3>Default Values in Java Arrays</h3>
          <ul>
            <li>int: 0</li>
            <li>long: 0L</li>
            <li>float: 0.0f</li>
            <li>double: 0.0</li>
            <li>boolean: false</li>
            <li>char: '\u0000'</li>
            <li>Reference types: null</li>
          </ul>

          <h3>Array Traversal</h3>
          <CodeExample>{`int[] arr = {10, 20, 30, 40};

for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}`}</CodeExample>

          <p>
            Traversal means visiting each element of an array,
            usually to read, inspect or process its value.
          </p>
        </article>

        <article id="memory" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2 · UNDERSTANDING INTERNALS</p>
          <h2>2. Internal Working of Arrays</h2>

          <h3>How does array indexing work?</h3>
          <p>
            An array provides direct indexed access. Conceptually,
            the location of an element in a contiguous array can
            be calculated from its base address and element size.
          </p>

          <CodeExample>{`Address of arr[i] =
Base address + (i * size of each element)`}</CodeExample>

          <p>
            For example, assume a conceptual array starts at address
            1000 and each element occupies 4 bytes.
          </p>

          <CodeExample>{`arr[0] -> 1000
arr[1] -> 1004
arr[2] -> 1008
arr[3] -> 1012`}</CodeExample>

          <p>
            This is a conceptual memory-address model. Java guarantees
            indexed access, but does not expose actual array memory
            addresses to ordinary Java code.
          </p>

          <h3>Why is array access O(1)?</h3>
          <p>
            The index directly identifies the required element.
            The number of elements does not need to be traversed
            to access a particular index.
          </p>

          <h3>Array vs ArrayList</h3>
          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Array</th>
                <th>ArrayList</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Size</td>
                <td>Fixed</td>
                <td>Resizable</td>
              </tr>
              <tr>
                <td>Stores primitives</td>
                <td>Yes</td>
                <td>Uses wrapper types</td>
              </tr>
              <tr>
                <td>Access by index</td>
                <td>O(1)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>Insertion in middle</td>
                <td>O(n)</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td>Built-in methods</td>
                <td>Limited</td>
                <td>More collection methods</td>
              </tr>
            </tbody>
          </table>

          <h3>Two-Dimensional Arrays</h3>
          <p>
            A two-dimensional array is an array whose elements
            are references to other arrays. It is useful for
            representing matrices and grids.
          </p>
          <CodeExample>{`int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

System.out.println(matrix[1][2]); // 6`}</CodeExample>

          <p>
            Java supports jagged arrays, where different rows
            can have different lengths.
          </p>
          <CodeExample>{`int[][] jagged = new int[3][];

jagged[0] = new int[2];
jagged[1] = new int[4];
jagged[2] = new int[3];`}</CodeExample>
        </article>

        <article id="operations" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2 · CORE OPERATIONS</p>
          <h2>3. Array Operations</h2>

          <h3>Access</h3>
          <CodeExample>{`int[] arr = {10, 20, 30};
int value = arr[1]; // 20`}</CodeExample>
          <p>Time: O(1).</p>

          <h3>Update</h3>
          <CodeExample>{`arr[1] = 99;`}</CodeExample>
          <p>Time: O(1).</p>

          <h3>Linear Search</h3>
          <p>
            Checks elements one by one until the target is found
            or the array ends.
          </p>
          <CodeExample>{`int[] arr = {10, 20, 30, 40};
int target = 30;
int answer = -1;

for (int i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
        answer = i;
        break;
    }
}

System.out.println(answer); // 2`}</CodeExample>
          <p>Time: O(n) worst case. Extra space: O(1).</p>

          <h3>Insertion at an Index</h3>
          <p>
            A normal Java array cannot grow. To insert while retaining
            all elements, use a new array or an ArrayList. If capacity
            is available in a manually managed array, shift elements.
          </p>
          <CodeExample>{`int[] arr = {10, 20, 30, 40};
int position = 2;
int value = 25;

int[] result = new int[arr.length + 1];

for (int i = 0; i < position; i++) {
    result[i] = arr[i];
}

result[position] = value;

for (int i = position; i < arr.length; i++) {
    result[i + 1] = arr[i];
}

// Result: {10, 20, 25, 30, 40}`}</CodeExample>
          <p>Time: O(n). New array space: O(n).</p>

          <h3>Deletion at an Index</h3>
          <CodeExample>{`int[] arr = {10, 20, 30, 40};
int position = 1;

int[] result = new int[arr.length - 1];

for (int i = 0; i < position; i++) {
    result[i] = arr[i];
}

for (int i = position + 1; i < arr.length; i++) {
    result[i - 1] = arr[i];
}

// Result: {10, 30, 40}`}</CodeExample>
          <p>Time: O(n). New array space: O(n).</p>

          <h3>Reverse an Array In Place</h3>
          <CodeExample>{`int[] arr = {10, 20, 30, 40, 50};

int left = 0;
int right = arr.length - 1;

while (left < right) {
    int temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    left++;
    right--;
}`}</CodeExample>
          <p>Time: O(n). Extra space: O(1).</p>
        </article>

        <article id="complexity" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2 · COMPLEXITY ANALYSIS</p>
          <h2>4. Time and Space Complexity</h2>

          <table className="dsa-comparison-table">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Time Complexity</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Access by index</td><td>O(1)</td></tr>
              <tr><td>Update by index</td><td>O(1)</td></tr>
              <tr><td>Traversal</td><td>O(n)</td></tr>
              <tr><td>Linear search</td><td>O(n)</td></tr>
              <tr><td>Binary search on sorted array</td><td>O(log n)</td></tr>
              <tr><td>Insertion at beginning</td><td>O(n)</td></tr>
              <tr><td>Deletion at beginning</td><td>O(n)</td></tr>
              <tr><td>Reverse in place</td><td>O(n)</td></tr>
            </tbody>
          </table>

          <h3>Why is traversal O(n)?</h3>
          <CodeExample>{`for (int i = 0; i < n; i++) {
    System.out.println(arr[i]);
}`}</CodeExample>

          <p>
            The loop executes n times. Each iteration performs
            constant work. Therefore total work grows proportionally
            to n: O(n).
          </p>

          <h3>Why is nested traversal often O(n²)?</h3>
          <CodeExample>{`for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        System.out.println(arr[i] + " " + arr[j]);
    }
}`}</CodeExample>

          <p>
            The inner loop runs n times for each of the n outer
            iterations. Total iterations = n × n = n².
          </p>

          <h3>Auxiliary Space vs Total Space</h3>
          <ul>
            <li>
              Input space: memory occupied by the input array.
            </li>
            <li>
              Auxiliary space: additional memory used by the algorithm,
              excluding the input.
            </li>
            <li>
              Output space: memory used to store the result.
            </li>
          </ul>

          <p>
            When an algorithm reverses an array in place, its
            auxiliary space is O(1), because it uses only a
            constant number of extra variables.
          </p>
        </article>

        <article id="java" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 2–3 · JAVA IMPLEMENTATION</p>
          <h2>5. Important Java Implementations</h2>

          <h3>Find the Largest Element</h3>
          <CodeExample>{`public static int findLargest(int[] arr) {
    if (arr == null || arr.length == 0) {
        throw new IllegalArgumentException("Array is empty");
    }

    int max = arr[0];

    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    return max;
}`}</CodeExample>

          <h3>Find the Second Largest Distinct Element</h3>
          <CodeExample>{`public static int secondLargest(int[] arr) {
    if (arr == null || arr.length < 2) {
        throw new IllegalArgumentException("Not enough elements");
    }

    int largest = Integer.MIN_VALUE;
    int second = Integer.MIN_VALUE;

    for (int value : arr) {
        if (value > largest) {
            second = largest;
            largest = value;
        } else if (value < largest && value > second) {
            second = value;
        }
    }

    if (second == Integer.MIN_VALUE) {
        throw new IllegalArgumentException("No second distinct element");
    }

    return second;
}`}</CodeExample>

          <p>
            This implementation uses Integer.MIN_VALUE as a sentinel.
            For fully general code, use a boolean flag or another
            representation so that a real Integer.MIN_VALUE value
            cannot be confused with the sentinel.
          </p>

          <h3>Move Zeroes to the End</h3>
          <CodeExample>{`public static void moveZeroes(int[] arr) {
    int position = 0;

    for (int i = 0; i < arr.length; i++) {
        if (arr[i] != 0) {
            arr[position] = arr[i];
            position++;
        }
    }

    while (position < arr.length) {
        arr[position] = 0;
        position++;
    }
}`}</CodeExample>

          <h3>Binary Search</h3>
          <p>
            Binary search works only when the array is sorted
            according to the searched ordering.
          </p>
          <CodeExample>{`public static int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}`}</CodeExample>
          <p>
            Time: O(log n). Iterative auxiliary space: O(1).
          </p>

          <h3>Kadane's Algorithm</h3>
          <p>
            Finds the maximum sum of a non-empty contiguous subarray.
          </p>
          <CodeExample>{`public static int maxSubarraySum(int[] arr) {
    if (arr == null || arr.length == 0) {
        throw new IllegalArgumentException("Array is empty");
    }

    int currentSum = arr[0];
    int bestSum = arr[0];

    for (int i = 1; i < arr.length; i++) {
        currentSum = Math.max(
            arr[i],
            currentSum + arr[i]
        );

        bestSum = Math.max(bestSum, currentSum);
    }

    return bestSum;
}`}</CodeExample>
          <p>
            Time: O(n). Auxiliary space: O(1).
            Initializing with arr[0] correctly handles arrays
            containing only negative numbers.
          </p>
        </article>

        <article id="patterns" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 3–4 · PROBLEM SOLVING</p>
          <h2>6. Important Array Problem Patterns</h2>

          <h3>1. Two Pointers</h3>
          <p>
            Use two indices to process elements from different
            positions, often moving towards each other or in the
            same direction.
          </p>
          <p>Useful for:</p>
          <ul>
            <li>Reverse an array.</li>
            <li>Pair sum in a sorted array.</li>
            <li>Remove duplicates from a sorted array.</li>
            <li>Move zeroes.</li>
          </ul>

          <CodeExample>{`int left = 0;
int right = arr.length - 1;

while (left < right) {
    // Process arr[left] and arr[right]
    left++;
    right--;
}`}</CodeExample>

          <h3>2. Sliding Window</h3>
          <p>
            Maintains a window over a contiguous portion of an array.
            It is useful when a problem asks about subarrays or
            contiguous ranges.
          </p>
          <p>Common types:</p>
          <ul>
            <li>Fixed-size window.</li>
            <li>Variable-size window.</li>
          </ul>
          <CodeExample>{`// Maximum sum of a window of size k
int windowSum = 0;

for (int i = 0; i < k; i++) {
    windowSum += arr[i];
}

int maxSum = windowSum;

for (int i = k; i < arr.length; i++) {
    windowSum += arr[i];
    windowSum -= arr[i - k];

    maxSum = Math.max(maxSum, windowSum);
}`}</CodeExample>

          <h3>3. Prefix Sum</h3>
          <p>
            Stores cumulative sums so range-sum queries can be
            answered efficiently.
          </p>
          <CodeExample>{`int[] prefix = new int[arr.length];

prefix[0] = arr[0];

for (int i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i - 1] + arr[i];
}

// Sum from index left to right
int sum = prefix[right];

if (left > 0) {
    sum -= prefix[left - 1];
}`}</CodeExample>
          <p>
            Preprocessing: O(n). Each range-sum query: O(1).
          </p>

          <h3>4. Hashing / Frequency Counting</h3>
          <p>
            Use a HashMap or HashSet when fast expected lookup,
            counting frequencies or checking duplicates is useful.
          </p>
          <CodeExample>{`import java.util.HashMap;
import java.util.Map;

Map<Integer, Integer> frequency = new HashMap<>();

for (int value : arr) {
    frequency.put(
        value,
        frequency.getOrDefault(value, 0) + 1
    );
}`}</CodeExample>

          <h3>5. Binary Search on Answer</h3>
          <p>
            Sometimes the answer is not an array index. If a
            feasibility condition is monotonic, binary search can
            find the smallest or largest valid answer.
          </p>
          <p>
            Examples include minimum capacity problems, allocation
            problems and minimum feasible speed problems.
          </p>

          <h3>6. In-Place Modification</h3>
          <p>
            Modify the original array instead of allocating another
            array, when the problem allows it. This often reduces
            auxiliary space from O(n) to O(1).
          </p>
        </article>

        <article id="edge-cases" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 4 · INTERVIEW READINESS</p>
          <h2>7. Edge Cases and Common Mistakes</h2>

          <h3>Always test these cases</h3>
          <ul>
            <li>Empty array.</li>
            <li>Array containing one element.</li>
            <li>All elements are equal.</li>
            <li>Already sorted array.</li>
            <li>Reverse-sorted array.</li>
            <li>Negative numbers.</li>
            <li>Duplicate values.</li>
            <li>All zeroes.</li>
            <li>Integer.MIN_VALUE and Integer.MAX_VALUE.</li>
            <li>Very large arrays.</li>
          </ul>

          <h3>Common mistakes</h3>
          <ol>
            <li>
              Accessing index arr.length. The last valid index is
              arr.length - 1.
            </li>
            <li>
              Using {'<='} instead of {'<'} in a loop when it causes
              out-of-bounds access.
            </li>
            <li>
              Assuming every array is sorted before binary search.
            </li>
            <li>
              Forgetting that Java arrays have fixed length.
            </li>
            <li>
              Ignoring negative values in maximum-subarray problems.
            </li>
            <li>
              Using int for sums that may overflow. Consider long
              when input constraints require it.
            </li>
            <li>
              Forgetting whether the problem asks for distinct
              elements or allows duplicates.
            </li>
          </ol>

          <h3>How to approach an array problem</h3>
          <ol>
            <li>Understand the input and expected output.</li>
            <li>Check constraints and edge cases.</li>
            <li>Write a brute-force solution first.</li>
            <li>Analyze its time and space complexity.</li>
            <li>Identify repeated work or unnecessary traversal.</li>
            <li>Look for two pointers, sliding window, prefix sum,
              hashing or binary search.</li>
            <li>Dry-run the optimized solution.</li>
            <li>Test edge cases before submitting.</li>
          </ol>
        </article>

        <article id="practice" className="dsa-lesson-section">
          <p className="dsa-level">LEVEL 1–4 · CODING PRACTICE</p>
          <h2>8. Practice Problems</h2>
          <p>
            Attempt each problem before opening its approach.
            Understanding the pattern is more important than
            memorizing the solution.
          </p>

          {practiceProblems.map((problem, index) => (
            <div className="dsa-practice-card" key={problem.name}>
              <div className="dsa-practice-heading">
                <div>
                  <span className="dsa-topic-category">
                    {problem.level}
                  </span>
                  <h3>{index + 1}. {problem.name}</h3>
                </div>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => toggleProblem(problem.name)}
                >
                  {expandedProblems.includes(problem.name)
                    ? 'Hide approach'
                    : 'Show approach'}
                </button>
              </div>

              <p>{problem.task}</p>

              <div className="dsa-practice-actions">
  <span className="dsa-platform-label">
    {problem.platform}
  </span>

  <a
    href={problem.url}
    target="_blank"
    rel="noopener noreferrer"
    className="primary-button"
  >
    Solve Problem ↗
  </a>
</div>

              {expandedProblems.includes(problem.name) && (
                <div className="dsa-answer">
                  <p><strong>Approach:</strong> {problem.approach}</p>
                  <p><strong>Complexity:</strong> {problem.complexity}</p>
                </div>
              )}
            </div>
          ))}
        </article>

      <article id="interview" className="dsa-lesson-section">
  <p className="dsa-level">LEVEL 1–4 · INTERVIEW PREPARATION</p>
  <h2>9. Interview Questions</h2>

  {[
    {
      q: 'Why is array access O(1)?',
      a: 'Arrays store elements in indexed positions. The address of an element can be calculated directly using the base address and index. No traversal is needed.'
    },
    {
      q: 'Why is insertion at the beginning O(n)?',
      a: 'Existing elements must shift one position to the right. This requires up to n movements.'
    },
    {
      q: 'What is the difference between an array and an ArrayList in Java?',
      a: 'An array has a fixed length and can store primitives or references. ArrayList is dynamically resizable and stores objects. Primitive values use wrapper classes.'
    },
    {
      q: 'What is the difference between subarray and subsequence?',
      a: 'A subarray contains contiguous elements. A subsequence preserves relative order but may skip elements.'
    },
    {
      q: 'When should you use hashing instead of sorting?',
      a: 'Use hashing for expected O(1) lookup and frequency counting. Sorting is useful when ordered data or two-pointer processing is required.'
    },
    {
      q: 'Can binary search work on an unsorted array?',
      a: 'Generally no. Binary search requires sorted data or a valid monotonic condition.'
    },
    {
      q: 'What is Kadane’s algorithm?',
      a: 'It finds the maximum sum of a non-empty contiguous subarray in O(n) time and O(1) auxiliary space.'
    },
    {
      q: 'How do you find the second largest distinct element in one traversal?',
      a: 'Maintain largest and secondLargest. Update both carefully when a new maximum appears, and ignore duplicates of the maximum.'
    },
    {
      q: 'Why can the sliding window technique fail with negative numbers?',
      a: 'For negative values, expanding or shrinking a window does not guarantee a predictable change in its sum. Prefix sums with hashing may be needed instead.'
    },
    {
      q: 'What is the difference between prefix sum and Kadane’s algorithm?',
      a: 'Prefix sums help answer range-sum queries and identify subarray sums. Kadane’s algorithm specifically finds the maximum-sum contiguous subarray.'
    },
    {
      q: 'How can you search in a rotated sorted array?',
      a: 'Use modified binary search. Identify which half is sorted, then decide whether the target lies in that half.'
    },
    {
      q: 'What happens when an array contains duplicate values?',
      a: 'Algorithms must define whether duplicates are allowed. Distinct-element problems must explicitly ignore repeated values.'
    },
    {
      q: 'What is the difference between in-place and out-of-place algorithms?',
      a: 'In-place algorithms use constant or small auxiliary memory. Out-of-place algorithms require additional storage.'
    },
    {
      q: 'How do you optimize a nested-loop array solution?',
      a: 'Identify repeated work. Consider hashing, sorting, two pointers, sliding windows, or prefix sums depending on the problem constraints.'
    },
    {
      q: 'What is the complexity of merging two sorted arrays?',
      a: 'A standard merge takes O(n + m) time. Additional space depends on whether a new result array is required.'
    }
  ].map((item, index) => (
    <details key={index}>
      <summary>{index + 1}. {item.q}</summary>
      <p>{item.a}</p>
    </details>
  ))}
</article>

        <div className="dsa-completion-panel">
          <h2>Section completion</h2>
          <p>
            Mark a section complete after studying and practising
            its concepts.
          </p>

          {sections.map((section) => (
            <label className="dsa-completion-item" key={section.id}>
              <input
                type="checkbox"
                checked={completedSections.includes(section.id)}
                onChange={() => toggleSection(section.id)}
              />
              {section.label}
            </label>
          ))}

          <p>
            Your current lesson checklist: {completedSections.length}
            {' / '}
            {sections.length} sections completed.
          </p>
        </div>
      </main>
    </section>
  );
}

export default DSALesson;
