
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

export default function SearchingLesson({ onBack }) {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <button onClick={onBack} style={{ marginBottom: "18px" }}>
        ← Back to DSA
      </button>

      <header style={{ marginBottom: "24px" }}>
        <h1>Searching Algorithms</h1>
        <p>
          Learn how to find elements, positions, boundaries, and answers
          efficiently using searching techniques.
        </p>
      </header>

      <Section title="1. What is Searching?">
        <p>
          Searching means finding whether a particular value exists in a
          collection and, if it exists, finding its position.
        </p>
        <p>
          Example: In <code>[10, 20, 30, 40]</code>, searching for{" "}
          <code>30</code> returns index <code>2</code>.
        </p>
        <p>Searching problems may ask you to:</p>
        <ul>
          <li>Find whether an element exists.</li>
          <li>Return its index.</li>
          <li>Find the first or last occurrence.</li>
          <li>Find the smallest or largest valid answer.</li>
          <li>Find a position where a condition changes.</li>
        </ul>
      </Section>

      <Section title="2. Linear Search">
        <p>
          Linear Search checks elements one by one from the beginning until
          the target is found or the array ends.
        </p>

        <h3>Dry run</h3>
        <p>Array: [7, 4, 9, 2], target = 9</p>
        <ol>
          <li>Index 0: 7 is not 9.</li>
          <li>Index 1: 4 is not 9.</li>
          <li>Index 2: 9 matches.</li>
          <li>Return index 2.</li>
        </ol>

        <Code>{`public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }

    return -1;
}`}</Code>

        <h3>Complexity</h3>
        <ul>
          <li>Best case: O(1) — target is the first element.</li>
          <li>Average case: O(n).</li>
          <li>Worst case: O(n) — target is last or absent.</li>
          <li>Extra space: O(1).</li>
        </ul>

        <h3>When to use</h3>
        <ul>
          <li>Array is unsorted.</li>
          <li>Input is small.</li>
          <li>Only one search is needed.</li>
          <li>Data structure does not support efficient random access.</li>
        </ul>
      </Section>

      <Section title="3. Binary Search">
        <p>
          Binary Search repeatedly divides a sorted search space into two
          halves.
        </p>
        <p>
          It works when the search space has a reliable order that allows
          us to discard half of the remaining candidates.
        </p>

        <h3>Requirement</h3>
        <p>
          For the standard array version, the array must be sorted in
          ascending order.
        </p>

        <h3>Example</h3>
        <p>Array: [2, 5, 8, 12, 16, 23, 38], target = 16</p>
        <ol>
          <li>low = 0, high = 6, mid = 3 → value 12.</li>
          <li>16 is greater than 12, so search the right half.</li>
          <li>low = 4, high = 6, mid = 5 → value 23.</li>
          <li>16 is less than 23, so search the left half.</li>
          <li>low = 4, high = 4, mid = 4 → value 16.</li>
          <li>Return index 4.</li>
        </ol>

        <h3>Java implementation</h3>
        <Code>{`public static int binarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}`}</Code>

        <h3>Why calculate mid this way?</h3>
        <Code>{`int mid = low + (high - low) / 2;`}</Code>
        <p>
          This avoids possible integer overflow from{" "}
          <code>(low + high) / 2</code> when indexes are very large.
        </p>

        <h3>Complexity</h3>
        <ul>
          <li>Best case: O(1).</li>
          <li>Worst case: O(log n).</li>
          <li>Extra space: O(1) for iterative binary search.</li>
        </ul>
      </Section>

      <Section title="4. Binary Search: The Boundary Rules">
        <p>
          The most common bug is mixing up <code>low &lt;= high</code> and{" "}
          <code>low &lt; high</code>.
        </p>

        <h3>Standard search</h3>
        <Code>{`while (low <= high) {
    int mid = low + (high - low) / 2;

    if (arr[mid] == target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
}`}</Code>

        <p>
          Here, both endpoints are still candidates. When the range becomes
          empty, <code>low &gt; high</code>.
        </p>

        <h3>Boundary search</h3>
        <Code>{`while (low < high) {
    int mid = low + (high - low) / 2;

    if (condition(mid)) {
        high = mid;
    } else {
        low = mid + 1;
    }
}`}</Code>

        <p>
          Here, the goal is to shrink the range until only one possible
          answer remains. This pattern is useful for first-true or minimum
          valid answer problems.
        </p>

        <h3>Rules to remember</h3>
        <ul>
          <li>
            If <code>mid</code> cannot be the answer anymore, remove it using{" "}
            <code>mid + 1</code> or <code>mid - 1</code>.
          </li>
          <li>
            If <code>mid</code> may still be the answer, keep it in the range.
          </li>
          <li>Every loop must make progress.</li>
          <li>Choose one interval definition and follow it consistently.</li>
        </ul>
      </Section>

      <Section title="5. First and Last Occurrence">
        <p>
          If duplicates exist, ordinary binary search may return any matching
          index. To find the first occurrence, continue searching left after
          finding the target.
        </p>

        <Code>{`public static int firstOccurrence(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;
    int answer = -1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            answer = mid;
            high = mid - 1;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return answer;
}`}</Code>

        <p>
          For the last occurrence, when the target is found, save the answer
          and move right:
        </p>
        <Code>{`answer = mid;
low = mid + 1;`}</Code>

        <h3>Count occurrences</h3>
        <p>
          In a sorted array, count = last occurrence − first occurrence + 1.
          If the target is absent, return 0.
        </p>
      </Section>

      <Section title="6. Lower Bound and Upper Bound">
        <p>
          These are important boundary concepts used in many advanced
          searching problems.
        </p>

        <ul>
          <li>
            <strong>Lower bound:</strong> first index whose value is greater
            than or equal to target.
          </li>
          <li>
            <strong>Upper bound:</strong> first index whose value is strictly
            greater than target.
          </li>
        </ul>

        <p>
          Example: array <code>[1, 2, 2, 2, 4, 6]</code>, target{" "}
          <code>2</code>
        </p>
        <ul>
          <li>Lower bound = index 1.</li>
          <li>Upper bound = index 4.</li>
          <li>Count of 2 = 4 − 1 = 3.</li>
        </ul>

        <Code>{`// Lower bound: first index where arr[index] >= target
public static int lowerBound(int[] arr, int target) {
    int low = 0;
    int high = arr.length;

    while (low < high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] >= target) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return low;
}

// Upper bound: first index where arr[index] > target
public static int upperBound(int[] arr, int target) {
    int low = 0;
    int high = arr.length;

    while (low < high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] > target) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return low;
}`}</Code>

        <p>
          Notice <code>high = arr.length</code>. The answer may be{" "}
          <code>arr.length</code> when every element is smaller than the
          target. That means the target belongs after the final element.
        </p>
      </Section>

      <Section title="7. Binary Search on Answer">
        <p>
          Sometimes the problem does not ask you to search for an element.
          It asks you to find the smallest or largest value that satisfies
          a condition.
        </p>

        <h3>Recognition clues</h3>
        <ul>
          <li>Minimize the maximum value.</li>
          <li>Maximize the minimum value.</li>
          <li>Find the smallest capacity that works.</li>
          <li>Find the minimum speed or time needed.</li>
          <li>A feasibility check can answer “Can we do it with X?”</li>
        </ul>

        <h3>Example: minimum capacity</h3>
        <p>
          Suppose a condition <code>canFinish(capacity)</code> becomes true
          for every capacity above some threshold.
        </p>
        <p>
          The condition is monotonic: false, false, false, true, true, true.
          Binary Search finds the first true value.
        </p>

        <Code>{`int low = minimumPossible;
int high = maximumPossible;

while (low < high) {
    int mid = low + (high - low) / 2;

    if (canFinish(mid)) {
        high = mid;       // mid may be the answer
    } else {
        low = mid + 1;    // mid is too small
    }
}

return low;`}</Code>

        <p>
          The difficult part is usually not binary search itself. It is
          designing a correct and efficient <code>canFinish</code> function.
        </p>
      </Section>

      <Section title="8. Searching in a Rotated Sorted Array">
        <p>
          Example: <code>[4, 5, 6, 7, 0, 1, 2]</code>
        </p>
        <p>
          The array was sorted, then rotated. At least one half of the
          current search range is sorted.
        </p>

        <Code>{`public static int searchRotated(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid;
        }

        // Left half is sorted
        if (arr[low] <= arr[mid]) {
            if (arr[low] <= target && target < arr[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (arr[mid] < target && target <= arr[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }

    return -1;
}`}</Code>

        <p>
          Complexity: O(log n) time and O(1) extra space when values are
          distinct. With duplicates, some cases may require O(n).
        </p>
      </Section>

      <Section title="9. Search in a 2D Matrix">
        <p>
          If a matrix is sorted row by row and the first element of each row
          is greater than the last element of the previous row, treat it as
          one sorted array.
        </p>

        <p>
          For <code>rows</code> and <code>cols</code>, a virtual index{" "}
          <code>mid</code> maps to:
        </p>
        <Code>{`row = mid / cols;
col = mid % cols;`}</Code>

        <Code>{`public static boolean searchMatrix(int[][] matrix, int target) {
    int rows = matrix.length;

    if (rows == 0 || matrix[0].length == 0) {
        return false;
    }

    int cols = matrix[0].length;
    int low = 0;
    int high = rows * cols - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        int value = matrix[mid / cols][mid % cols];

        if (value == target) {
            return true;
        } else if (value < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return false;
}`}</Code>

        <p>Complexity: O(log(rows × cols)) time.</p>
      </Section>

      <Section title="10. Common Mistakes">
        <ul>
          <li>Using Binary Search on an unsorted array.</li>
          <li>Incorrect loop condition.</li>
          <li>Forgetting to update low or high.</li>
          <li>Using <code>high = mid</code> when mid must be excluded.</li>
          <li>Using <code>high = mid - 1</code> when mid may still be the answer.</li>
          <li>Returning an arbitrary duplicate when first/last is required.</li>
          <li>Not handling an empty array.</li>
          <li>Not checking whether the target is absent.</li>
          <li>Incorrectly assuming both halves are sorted in a rotated array.</li>
          <li>Overflow in midpoint or arithmetic used by answer-search problems.</li>
        </ul>
      </Section>

      <Section title="11. Interview Pattern Recognition">
        <ul>
          <li>
            Sorted array + find element → standard Binary Search.
          </li>
          <li>
            Duplicates + first/last position → boundary Binary Search.
          </li>
          <li>
            First value satisfying a condition → lower-bound style search.
          </li>
          <li>
            Minimum feasible capacity/speed/time → Binary Search on Answer.
          </li>
          <li>
            Rotated sorted array → identify the sorted half.
          </li>
          <li>
            Sorted matrix with row boundaries → virtual 1D Binary Search.
          </li>
          <li>
            Search in unsorted data → Linear Search, unless another data
            structure is appropriate.
          </li>
        </ul>
      </Section>

      <Section title="12. Practice Problems">
        <ol>
          <li>Linear Search</li>
          <li>Binary Search</li>
          <li>Search Insert Position</li>
          <li>First and Last Position of Element in Sorted Array</li>
          <li>Count Occurrences in Sorted Array</li>
          <li>Find Peak Element</li>
          <li>Search in Rotated Sorted Array</li>
          <li>Find Minimum in Rotated Sorted Array</li>
          <li>Search a 2D Matrix</li>
          <li>Find the Square Root of a Number</li>
          <li>Koko Eating Bananas</li>
          <li>Capacity to Ship Packages Within D Days</li>
          <li>Median of Two Sorted Arrays</li>
        </ol>
      </Section>

      <Section title="13. Quick Revision">
        <ul>
          <li>Linear Search: O(n).</li>
          <li>Binary Search: O(log n).</li>
          <li>Standard Binary Search: <code>low &lt;= high</code>.</li>
          <li>Boundary Binary Search: commonly <code>low &lt; high</code>.</li>
          <li>Lower bound: first value ≥ target.</li>
          <li>Upper bound: first value &gt; target.</li>
          <li>Binary Search on Answer requires a monotonic condition.</li>
          <li>Always define what low, high, and mid represent.</li>
        </ul>
      </Section>
    </div>
  );
}
