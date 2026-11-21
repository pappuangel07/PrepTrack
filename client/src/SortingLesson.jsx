
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

export default function SortingLesson({ onBack }) {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <button onClick={onBack} style={{ marginBottom: "18px" }}>
        ← Back to DSA
      </button>

      <header style={{ marginBottom: "24px" }}>
        <h1>Sorting Algorithms</h1>
        <p>
          Learn how to arrange data efficiently and choose the right
          sorting algorithm for different situations.
        </p>
      </header>

      <Section title="1. What is Sorting?">
        <p>
          Sorting means arranging elements in a particular order, usually
          ascending or descending.
        </p>
        <p>
          Example: <code>[5, 2, 8, 1]</code> becomes{" "}
          <code>[1, 2, 5, 8]</code> in ascending order.
        </p>
        <p>Sorting helps with:</p>
        <ul>
          <li>Binary Search.</li>
          <li>Finding duplicates.</li>
          <li>Finding pairs and triplets.</li>
          <li>Finding minimum and maximum values.</li>
          <li>Scheduling and interval problems.</li>
          <li>Grouping similar values.</li>
        </ul>
      </Section>

      <Section title="2. Important Sorting Terms">
        <h3>Stable sorting</h3>
        <p>
          A sorting algorithm is stable if equal-key elements preserve
          their original relative order.
        </p>
        <p>
          Example: Two students have the same marks. A stable sort keeps
          them in the same order they appeared before sorting.
        </p>

        <h3>In-place sorting</h3>
        <p>
          An algorithm is in-place if it uses only a small, constant
          amount of extra memory, typically O(1).
        </p>
        <p>
          Note: Some definitions allow a small amount of auxiliary
          memory. Always state the space convention being used.
        </p>

        <h3>Adaptive sorting</h3>
        <p>
          An adaptive algorithm performs better when the input is already
          or nearly sorted.
        </p>

        <h3>Comparison-based sorting</h3>
        <p>
          These algorithms sort by comparing elements, such as using
          <code> &lt; </code>, <code> &gt; </code>, or a comparator.
        </p>

        <h3>Non-comparison sorting</h3>
        <p>
          These algorithms use properties of the values, such as their
          range or digits, rather than relying only on comparisons.
        </p>
      </Section>

      <Section title="3. Bubble Sort">
        <p>
          Bubble Sort repeatedly compares adjacent elements and swaps
          them if they are in the wrong order.
        </p>

        <h3>Dry run</h3>
        <p>Array: [5, 1, 4, 2]</p>
        <p>First pass:</p>
        <ol>
          <li>Compare 5 and 1 → swap: [1, 5, 4, 2]</li>
          <li>Compare 5 and 4 → swap: [1, 4, 5, 2]</li>
          <li>Compare 5 and 2 → swap: [1, 4, 2, 5]</li>
        </ol>
        <p>The largest element reaches the end of the unsorted part.</p>

        <Code>{`public static void bubbleSort(int[] arr) {
    int n = arr.length;

    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;

        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                swapped = true;
            }
        }

        // Already sorted
        if (!swapped) {
            break;
        }
    }
}`}</Code>

        <h3>Complexity</h3>
        <ul>
          <li>Best: O(n) with the swapped optimization.</li>
          <li>Average: O(n²).</li>
          <li>Worst: O(n²).</li>
          <li>Extra space: O(1).</li>
          <li>Stable: Yes, when only strictly greater elements are swapped.</li>
        </ul>

        <p>
          Bubble Sort is useful for learning, but usually not suitable
          for large inputs.
        </p>
      </Section>

      <Section title="4. Selection Sort">
        <p>
          Selection Sort finds the minimum element in the unsorted part
          and swaps it into the next correct position.
        </p>

        <h3>How it works</h3>
        <ol>
          <li>Assume the current index is the minimum.</li>
          <li>Scan the remaining unsorted elements.</li>
          <li>Find the actual minimum.</li>
          <li>Swap it with the current element.</li>
          <li>Move the boundary forward.</li>
        </ol>

        <Code>{`public static void selectionSort(int[] arr) {
    int n = arr.length;

    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;

        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}`}</Code>

        <h3>Complexity</h3>
        <ul>
          <li>Best: O(n²).</li>
          <li>Average: O(n²).</li>
          <li>Worst: O(n²).</li>
          <li>Extra space: O(1).</li>
          <li>Stable: No, in its usual swap-based implementation.</li>
        </ul>

        <p>
          Selection Sort performs at most O(n) swaps, which can be useful
          when writes are expensive. However, it still performs O(n²)
          comparisons.
        </p>
      </Section>

      <Section title="5. Insertion Sort">
        <p>
          Insertion Sort builds a sorted portion one element at a time.
          It takes the next element and inserts it into the correct
          position among the already sorted elements.
        </p>

        <h3>Analogy</h3>
        <p>
          Imagine arranging playing cards in your hand. You pick one card
          and insert it into its correct position.
        </p>

        <Code>{`public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}`}</Code>

        <h3>Dry run</h3>
        <p>Array: [5, 3, 4]</p>
        <ol>
          <li>Key = 3. Shift 5 right → [3, 5, 4].</li>
          <li>Key = 4. Shift 5 right → [3, 4, 5].</li>
          <li>Array is sorted.</li>
        </ol>

        <h3>Complexity</h3>
        <ul>
          <li>Best: O(n) for already sorted input.</li>
          <li>Average: O(n²).</li>
          <li>Worst: O(n²).</li>
          <li>Extra space: O(1).</li>
          <li>Stable: Yes, when equal elements are not shifted past each other.</li>
          <li>Adaptive: Yes.</li>
        </ul>

        <p>
          Insertion Sort is useful for small arrays and nearly sorted
          data. Some practical sorting implementations use it for small
          partitions.
        </p>
      </Section>

      <Section title="6. Merge Sort">
        <p>
          Merge Sort uses the divide-and-conquer technique.
        </p>
        <ol>
          <li>Divide the array into two halves.</li>
          <li>Sort each half recursively.</li>
          <li>Merge the two sorted halves.</li>
        </ol>

        <h3>Why is merging efficient?</h3>
        <p>
          When both halves are sorted, compare their first remaining
          elements. The smaller one is the next element in the result.
          Each element is processed a constant number of times during
          one merge.
        </p>

        <Code>{`public static void mergeSort(int[] arr) {
    if (arr.length <= 1) {
        return;
    }

    int[] temp = new int[arr.length];
    mergeSort(arr, temp, 0, arr.length - 1);
}

private static void mergeSort(
        int[] arr, int[] temp, int left, int right) {

    if (left >= right) {
        return;
    }

    int mid = left + (right - left) / 2;

    mergeSort(arr, temp, left, mid);
    mergeSort(arr, temp, mid + 1, right);

    merge(arr, temp, left, mid, right);
}

private static void merge(
        int[] arr, int[] temp,
        int left, int mid, int right) {

    int i = left;
    int j = mid + 1;
    int k = left;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }

    while (i <= mid) {
        temp[k++] = arr[i++];
    }

    while (j <= right) {
        temp[k++] = arr[j++];
    }

    for (int index = left; index <= right; index++) {
        arr[index] = temp[index];
    }
}`}</Code>

        <h3>Complexity</h3>
        <ul>
          <li>Best: O(n log n).</li>
          <li>Average: O(n log n).</li>
          <li>Worst: O(n log n).</li>
          <li>Extra array space: O(n).</li>
          <li>Recursion stack: O(log n).</li>
          <li>Stable: Yes, when equal elements are taken from the left half first.</li>
        </ul>

        <h3>Important interview fact</h3>
        <p>
          Merge Sort is predictable: its worst-case time is O(n log n).
          It is also useful for linked lists and external sorting.
        </p>
      </Section>

      <Section title="7. Quick Sort">
        <p>
          Quick Sort also uses divide and conquer, but it partitions the
          array around a pivot.
        </p>
        <ol>
          <li>Choose a pivot.</li>
          <li>Partition elements around the pivot.</li>
          <li>Recursively sort the left and right partitions.</li>
        </ol>

        <h3>Lomuto partition</h3>
        <p>
          This example chooses the last element as the pivot. It places
          values less than or equal to the pivot before it.
        </p>

        <Code>{`public static void quickSort(int[] arr) {
    quickSort(arr, 0, arr.length - 1);
}

private static void quickSort(int[] arr, int low, int high) {
    if (low >= high) {
        return;
    }

    int pivotIndex = partition(arr, low, high);

    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
        }
    }

    int temp = arr[i];
    arr[i] = arr[high];
    arr[high] = temp;

    return i;
}`}</Code>

        <h3>Complexity</h3>
        <ul>
          <li>Best: O(n log n).</li>
          <li>Average: O(n log n).</li>
          <li>Worst: O(n²), such as repeatedly choosing a poor pivot.</li>
          <li>Typical extra space: O(log n) recursion stack on balanced partitions.</li>
          <li>Worst recursion stack: O(n).</li>
          <li>Stable: No, in the usual in-place implementation.</li>
        </ul>

        <h3>How to reduce bad partitions</h3>
        <ul>
          <li>Randomized pivot.</li>
          <li>Median-of-three pivot selection.</li>
          <li>Use a hybrid algorithm with a fallback strategy.</li>
        </ul>

        <p>
          The last-element pivot implementation above is educational.
          It can perform poorly on already sorted or duplicate-heavy
          input. Do not assume this simple version is production-grade.
        </p>
      </Section>

      <Section title="8. Heap Sort">
        <p>
          Heap Sort uses a binary heap. For ascending order, it builds
          a max heap so the largest element is at the root.
        </p>

        <ol>
          <li>Build a max heap.</li>
          <li>Swap the root with the last element.</li>
          <li>Reduce the heap size.</li>
          <li>Restore the heap property.</li>
          <li>Repeat.</li>
        </ol>

        <Code>{`public static void heapSort(int[] arr) {
    int n = arr.length;

    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Move maximum to the end
    for (int end = n - 1; end > 0; end--) {
        int temp = arr[0];
        arr[0] = arr[end];
        arr[end] = temp;

        heapify(arr, end, 0);
    }
}

private static void heapify(int[] arr, int size, int root) {
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;

    if (left < size && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < size && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != root) {
        int temp = arr[root];
        arr[root] = arr[largest];
        arr[largest] = temp;

        heapify(arr, size, largest);
    }
}`}</Code>

        <h3>Complexity</h3>
        <ul>
          <li>Build heap: O(n).</li>
          <li>Sorting phase: O(n log n).</li>
          <li>Overall: O(n log n).</li>
          <li>Extra space: O(1) auxiliary array space.</li>
          <li>Stable: No.</li>
        </ul>

        <p>
          Heap Sort gives guaranteed O(n log n) time and is in-place,
          but it is often less cache-friendly than well-implemented
          Quick Sort.
        </p>
      </Section>

      <Section title="9. Counting Sort">
        <p>
          Counting Sort is a non-comparison sorting algorithm. It counts
          how many times each value occurs.
        </p>

        <p>
          It is efficient when the value range is reasonably small
          compared with the number of elements.
        </p>

        <Code>{`public static void countingSort(int[] arr) {
    if (arr.length == 0) {
        return;
    }

    int min = arr[0];
    int max = arr[0];

    for (int value : arr) {
        min = Math.min(min, value);
        max = Math.max(max, value);
    }

    int range = max - min + 1;
    int[] count = new int[range];

    for (int value : arr) {
        count[value - min]++;
    }

    int index = 0;

    for (int i = 0; i < range; i++) {
        while (count[i] > 0) {
            arr[index++] = i + min;
            count[i]--;
        }
    }
}`}</Code>

        <h3>Complexity</h3>
        <ul>
          <li>Time: O(n + k), where k is the value range.</li>
          <li>Extra space: O(k).</li>
          <li>Stable: This simple version is not stable in the general sense of preserving record order.</li>
        </ul>

        <p>
          This implementation handles negative integers by offsetting
          values using the minimum. Be careful: a huge range can require
          too much memory, and <code>max - min + 1</code> can overflow
          for extreme integer values.
        </p>
      </Section>

      <Section title="10. Radix Sort">
        <p>
          Radix Sort sorts numbers digit by digit. A common approach
          processes digits from least significant to most significant.
        </p>
        <p>
          Each digit pass must use a stable sorting method, commonly
          Counting Sort.
        </p>

        <Code>{`// Radix Sort for non-negative integers
public static void radixSort(int[] arr) {
    if (arr.length == 0) {
        return;
    }

    int max = arr[0];

    for (int value : arr) {
        if (value < 0) {
            throw new IllegalArgumentException(
                "This version supports non-negative values only"
            );
        }

        max = Math.max(max, value);
    }

    for (long exp = 1; max / exp > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}

private static void countingSortByDigit(int[] arr, long exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10];

    for (int value : arr) {
        int digit = (int) ((value / exp) % 10);
        count[digit]++;
    }

    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Traverse backwards to preserve stability
    for (int i = n - 1; i >= 0; i--) {
        int digit = (int) ((arr[i] / exp) % 10);
        output[--count[digit]] = arr[i];
    }

    System.arraycopy(output, 0, arr, 0, n);
}`}</Code>

        <h3>Complexity</h3>
        <ul>
          <li>Time: O(d × (n + 10)), for decimal digits d.</li>
          <li>Extra space: O(n + 10).</li>
          <li>Stable: Yes, because each digit pass is stable.</li>
        </ul>

        <p>
          This version is for non-negative integers. Handling negative
          values requires additional logic.
        </p>
      </Section>

      <Section title="11. Sorting Algorithm Comparison">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px" }}>Algorithm</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Best</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Average</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Worst</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Stable?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Bubble", "O(n)", "O(n²)", "O(n²)", "Yes*"],
                ["Selection", "O(n²)", "O(n²)", "O(n²)", "No"],
                ["Insertion", "O(n)", "O(n²)", "O(n²)", "Yes"],
                ["Merge", "O(n log n)", "O(n log n)", "O(n log n)", "Yes"],
                ["Quick", "O(n log n)", "O(n log n)", "O(n²)", "No"],
                ["Heap", "O(n log n)", "O(n log n)", "O(n log n)", "No"],
                ["Counting", "O(n + k)", "O(n + k)", "O(n + k)", "Depends"],
                ["Radix", "O(dn)", "O(dn)", "O(dn)", "Yes**"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td
                      key={index}
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
          * Bubble Sort is stable when equal elements are not swapped.
        </p>
        <p>
          ** Radix Sort is stable when its digit-level sort is stable.
        </p>
        <p>
          Counting Sort's complexity depends on the range k, not just n.
          Radix Sort's complexity depends on the number of digits d and
          the cost of each digit pass.
        </p>
      </Section>

      <Section title="12. Java Arrays.sort()">
        <p>
          In real Java programs, you usually should not implement a
          sorting algorithm yourself unless the problem asks you to.
        </p>

        <Code>{`import java.util.Arrays;

int[] numbers = {5, 2, 8, 1};
Arrays.sort(numbers);

// numbers: [1, 2, 5, 8]`}</Code>

        <p>
          For object arrays, Java supports comparators:
        </p>

        <Code>{`import java.util.Arrays;
import java.util.Comparator;

Integer[] numbers = {5, 2, 8, 1};

Arrays.sort(numbers, Comparator.reverseOrder());

// numbers: [8, 5, 2, 1]`}</Code>

        <p>
          Important: <code>Comparator.reverseOrder()</code> works with
          object types such as <code>Integer</code>, not primitive{" "}
          <code>int[]</code>.
        </p>
      </Section>

      <Section title="13. Sorting-Based Interview Patterns">
        <h3>Pattern 1: Sort, then scan</h3>
        <p>
          Sort the array, then use one pass to detect duplicates,
          gaps, or consecutive values.
        </p>

        <h3>Pattern 2: Sort + Two Pointers</h3>
        <p>
          Sorting can make pair and triplet problems easier. After
          sorting, move two pointers based on whether the current sum
          is too small or too large.
        </p>

        <h3>Pattern 3: Sort intervals</h3>
        <p>
          Sort intervals by start time, then merge overlapping
          intervals or schedule tasks.
        </p>

        <h3>Pattern 4: Custom comparator</h3>
        <p>
          Sort objects by multiple fields, such as priority first and
          then deadline.
        </p>

        <h3>Pattern 5: Sort by frequency</h3>
        <p>
          Count frequencies, then sort values by frequency or use a
          bucket/heap approach depending on constraints.
        </p>
      </Section>

      <Section title="14. Common Mistakes">
        <ul>
          <li>Forgetting that array sorting modifies the original array.</li>
          <li>Using Bubble or Selection Sort for large inputs.</li>
          <li>Confusing stable sorting with in-place sorting.</li>
          <li>Assuming Quick Sort always runs in O(n log n).</li>
          <li>Ignoring the range k in Counting Sort.</li>
          <li>Using an unstable digit sort inside Radix Sort.</li>
          <li>Writing a comparator that overflows using subtraction.</li>
        </ul>

        <p>Unsafe comparator:</p>
        <Code>{`return a - b;`}</Code>
        <p>
          For extreme integer values, subtraction can overflow. Prefer:
        </p>
        <Code>{`return Integer.compare(a, b);`}</Code>
      </Section>

      <Section title="15. Practice Problems">
        <ol>
          <li>Sort an Array</li>
          <li>Bubble Sort</li>
          <li>Selection Sort</li>
          <li>Insertion Sort</li>
          <li>Merge Sort</li>
          <li>Quick Sort</li>
          <li>Sort Colors</li>
          <li>Merge Intervals</li>
          <li>Largest Number</li>
          <li>Meeting Rooms</li>
          <li>Count Inversions</li>
          <li>Reverse Pairs</li>
          <li>Sort List</li>
        </ol>
      </Section>

      <Section title="16. Quick Revision">
        <ul>
          <li>Bubble: adjacent swaps.</li>
          <li>Selection: select minimum and place it.</li>
          <li>Insertion: insert next item into sorted prefix.</li>
          <li>Merge: divide, sort, merge.</li>
          <li>Quick: pivot and partition.</li>
          <li>Heap: repeatedly remove the maximum.</li>
          <li>Counting: count values in a limited range.</li>
          <li>Radix: stable digit-by-digit sorting.</li>
          <li>Stable means equal-key order is preserved.</li>
          <li>In-place means constant auxiliary memory under the stated convention.</li>
        </ul>
      </Section>
    </div>
  );
}
