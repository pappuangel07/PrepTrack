
import { useState } from 'react';

const sections = [
  { id: 'intro', label: 'Introduction' },
  { id: 'fundamentals', label: 'Pointer Fundamentals' },
  { id: 'patterns', label: 'Two Pointer Patterns' },
  { id: 'complexity', label: 'Complexity Analysis' },
  { id: 'java', label: 'Java Implementations' },
  { id: 'dry-runs', label: 'Step-by-Step Dry Runs' },
  { id: 'advanced', label: 'Advanced Applications' },
  { id: 'edge-cases', label: 'Edge Cases and Mistakes' },
  { id: 'practice', label: 'Coding Practice' },
  { id: 'interview', label: 'Interview Questions' },
];

function CodeExample({ children }) {
  return (
    <pre className="dsa-code">
      <code>{children}</code>
    </pre>
  );
}

function TwoPointersLesson({ onBack }) {
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

  const content = {
    intro: (
      <>
        <p className="dsa-level">LEVEL 1 · BEGINNER</p>
        <h2>1. Introduction to Two Pointers</h2>

        <h3>What is the Two Pointers Technique?</h3>
        <p>
          Two Pointers is a problem-solving technique in which
          two variables represent positions in a data structure,
          usually an array or String.
        </p>
        <p>
          Instead of repeatedly checking every possible pair,
          we move two pointers according to specific conditions.
          This can reduce a brute-force O(n²) solution to O(n).
        </p>

        <h3>Simple real-world example</h3>
        <p>
          Imagine two people standing at opposite ends of a line.
          They move towards each other to find a particular pair
          of people. Instead of checking every possible pair,
          they systematically eliminate unnecessary possibilities.
        </p>

        <h3>Basic representation</h3>
        <CodeExample>{`int left = 0;
int right = arr.length - 1;

while (left < right) {
    // Process arr[left] and arr[right]

    left++;
    right--;
}`}</CodeExample>

        <h3>Visual understanding</h3>
        <CodeExample>{`Array:   [10, 20, 30, 40, 50]
           L              R

First:   [10, 20, 30, 40, 50]
              L        R

Next:    [10, 20, 30, 40, 50]
                 L  R

Stop when the pointers meet.`}</CodeExample>

        <h3>Why use Two Pointers?</h3>
        <ul>
          <li>Reduce unnecessary nested loops.</li>
          <li>Improve time complexity.</li>
          <li>Often use constant extra space.</li>
          <li>Solve sorted-array pair problems efficiently.</li>
          <li>Useful for reversing and partitioning arrays.</li>
          <li>Useful for palindrome and substring problems.</li>
        </ul>

        <h3>When should you think about Two Pointers?</h3>
        <ul>
          <li>The problem involves an array or String.</li>
          <li>You need to find a pair satisfying a condition.</li>
          <li>The input is sorted.</li>
          <li>You need to compare elements from both ends.</li>
          <li>You need to remove duplicates in place.</li>
          <li>You need to find a cycle in a linked list.</li>
        </ul>

        <h3>Important limitation</h3>
        <p>
          Two Pointers is not automatically applicable to every
          array problem. Pointer movement must be justified by
          the problem's properties. Sorted order is especially
          important for many opposite-direction problems.
        </p>
      </>
    ),

    fundamentals: (
      <>
        <p className="dsa-level">LEVEL 2 · CORE FUNDAMENTALS</p>
        <h2>2. Pointer Fundamentals</h2>

        <h3>2.1 What is a pointer in this technique?</h3>
        <p>
          In Java DSA, a pointer usually means an integer index
          or a reference to a node. It does not mean a C or C++
          memory pointer.
        </p>

        <CodeExample>{`int[] arr = {10, 20, 30, 40};

int left = 0;
int right = arr.length - 1;

System.out.println(arr[left]);  // 10
System.out.println(arr[right]); // 40`}</CodeExample>

        <h3>2.2 Opposite-direction pointers</h3>
        <p>
          One pointer starts at the beginning and another starts
          at the end. They move towards each other.
        </p>

        <CodeExample>{`int left = 0;
int right = arr.length - 1;

while (left < right) {
    // Compare both elements
    left++;
    right--;
}`}</CodeExample>

        <p>Common applications:</p>
        <ul>
          <li>Reverse an array.</li>
          <li>Palindrome checking.</li>
          <li>Two Sum in a sorted array.</li>
          <li>Container With Most Water.</li>
        </ul>

        <h3>2.3 Same-direction pointers</h3>
        <p>
          Both pointers move from left to right, but at different
          speeds or for different purposes.
        </p>

        <CodeExample>{`int slow = 0;

for (int fast = 0; fast < arr.length; fast++) {
    if (arr[fast] != 0) {
        arr[slow] = arr[fast];
        slow++;
    }
}`}</CodeExample>

        <p>Common applications:</p>
        <ul>
          <li>Remove duplicates.</li>
          <li>Move zeroes.</li>
          <li>Partition arrays.</li>
          <li>In-place filtering.</li>
        </ul>

        <h3>2.4 Fast and slow pointers</h3>
        <p>
          Two pointers traverse a linked list at different speeds.
          The fast pointer moves two steps while the slow pointer
          moves one step.
        </p>

        <CodeExample>{`slow = slow.next;
fast = fast.next.next;`}</CodeExample>

        <p>Common applications:</p>
        <ul>
          <li>Detect a linked-list cycle.</li>
          <li>Find the middle node.</li>
          <li>Find the start of a cycle.</li>
        </ul>

        <h3>2.5 Three pointers</h3>
        <p>
          Some problems extend the idea to three pointers.
          For example, sorting an array containing 0, 1 and 2
          uses low, mid and high pointers.
        </p>

        <CodeExample>{`int low = 0;
int mid = 0;
int high = arr.length - 1;`}</CodeExample>

        <h3>Choosing the right pattern</h3>
        <table className="dsa-comparison-table">
          <thead>
            <tr>
              <th>Problem requirement</th>
              <th>Pattern</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Compare both ends</td><td>Opposite direction</td></tr>
            <tr><td>Remove or filter elements</td><td>Same direction</td></tr>
            <tr><td>Find middle or cycle</td><td>Fast and slow</td></tr>
            <tr><td>Partition three categories</td><td>Three pointers</td></tr>
          </tbody>
        </table>
      </>
    ),

    patterns: (
      <>
        <p className="dsa-level">LEVEL 2–3 · PROBLEM-SOLVING PATTERNS</p>
        <h2>3. Two Pointer Patterns</h2>

        <h3>Pattern 1: Opposite Ends</h3>
        <p>
          Start one pointer at index 0 and another at the last
          index. Move them towards each other.
        </p>
        <CodeExample>{`int left = 0;
int right = arr.length - 1;

while (left < right) {
    if (arr[left] + arr[right] == target) {
        // Found the pair
        break;
    } else if (arr[left] + arr[right] < target) {
        left++;
    } else {
        right--;
    }
}`}</CodeExample>
        <p>
          Used for sorted Two Sum, palindrome checks and
          reversing an array.
        </p>

        <h3>Pattern 2: Read and Write Pointers</h3>
        <p>
          One pointer reads every element. Another tracks where
          the next valid element should be written.
        </p>
        <CodeExample>{`int write = 0;

for (int read = 0; read < arr.length; read++) {
    if (arr[read] != 0) {
        arr[write] = arr[read];
        write++;
    }
}`}</CodeExample>
        <p>
          Used for moving zeroes, removing duplicates and
          filtering elements in place.
        </p>

        <h3>Pattern 3: Fast and Slow Pointers</h3>
        <p>
          The pointers move at different speeds. This is
          particularly useful for linked lists.
        </p>
        <CodeExample>{`ListNode slow = head;
ListNode fast = head;

while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}

// slow is at the middle node`}</CodeExample>

        <h3>Pattern 4: Fixed Boundary and Moving Pointer</h3>
        <p>
          One pointer represents a boundary while another
          explores the array. This is useful in partitioning
          and rearrangement problems.
        </p>

        <h3>Pattern 5: Three Pointers</h3>
        <p>
          Use three positions to divide an array into regions.
          The Dutch National Flag algorithm is a classic example.
        </p>
        <CodeExample>{`int low = 0;
int mid = 0;
int high = arr.length - 1;

while (mid <= high) {
    if (arr[mid] == 0) {
        swap(arr, low, mid);
        low++;
        mid++;
    } else if (arr[mid] == 1) {
        mid++;
    } else {
        swap(arr, mid, high);
        high--;
    }
}`}</CodeExample>

        <h3>Pattern 6: Two Pointers + Hashing</h3>
        <p>
          Some problems combine a pointer-based traversal with
          a HashSet or HashMap to track previously seen values.
          Use this when pointer movement alone is insufficient.
        </p>

        <h3>How to identify the correct movement</h3>
        <ul>
          <li>Write down what each pointer represents.</li>
          <li>Understand which elements can be eliminated.</li>
          <li>Move a pointer only when the problem's logic justifies it.</li>
          <li>Check whether sorted order or another invariant is required.</li>
          <li>Ensure the loop always makes progress.</li>
        </ul>
      </>
    ),

    complexity: (
      <>
        <p className="dsa-level">LEVEL 3 · COMPLEXITY ANALYSIS</p>
        <h2>4. Time and Space Complexity</h2>

        <h3>4.1 Basic Two Pointer complexity</h3>
        <CodeExample>{`int left = 0;
int right = n - 1;

while (left < right) {
    left++;
    right--;
}`}</CodeExample>
        <p>
          Each pointer moves towards the other. The total
          number of iterations is proportional to n.
        </p>

        <p><strong>Time Complexity:</strong> O(n)</p>
        <p><strong>Extra Space:</strong> O(1)</p>

        <h3>4.2 Why is it O(n), not O(n²)?</h3>
        <p>
          A nested-loop brute-force solution may examine every
          possible pair, giving approximately n(n - 1) / 2
          comparisons, which is O(n²).
        </p>
        <p>
          In a typical two-pointer traversal, the pointers
          collectively move at most O(n) times. Therefore,
          the solution takes O(n) time.
        </p>

        <h3>4.3 Complexity comparison</h3>
        <table className="dsa-comparison-table">
          <thead>
            <tr>
              <th>Approach</th>
              <th>Time</th>
              <th>Extra Space</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Brute-force pair search</td><td>O(n²)</td><td>O(1)</td></tr>
            <tr><td>Sorted Two Sum</td><td>O(n)</td><td>O(1)</td></tr>
            <tr><td>Reverse array in place</td><td>O(n)</td><td>O(1)</td></tr>
            <tr><td>Remove duplicates in place</td><td>O(n)</td><td>O(1)</td></tr>
            <tr><td>Two Sum using HashMap</td><td>O(n) average</td><td>O(n)</td></tr>
          </tbody>
        </table>

        <h3>4.4 Important distinction: Sorting cost</h3>
        <p>
          If an array is not sorted and your solution first
          sorts it, the total complexity includes sorting.
          For comparison-based sorting, this is typically
          O(n log n).
        </p>
        <CodeExample>{`Sorting:       O(n log n)
Two Pointers:  O(n)

Total:         O(n log n)`}</CodeExample>

        <h3>4.5 Amortized analysis</h3>
        <p>
          In some same-direction algorithms, a pointer may
          move through the array only once overall, even if
          individual iterations perform different amounts
          of work. The total pointer movements are still O(n).
        </p>

        <h3>Interview takeaway</h3>
        <p>
          Never claim O(n) merely because a solution contains
          two pointers. Count the total movements and include
          any sorting, copying or nested processing.
        </p>
      </>
    ),

    java: (
      <>
        <p className="dsa-level">LEVEL 2–4 · JAVA IMPLEMENTATIONS</p>
        <h2>5. Java Implementations</h2>

        <h3>5.1 Reverse an Array</h3>
        <CodeExample>{`public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            left++;
            right--;
        }

        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}

// Output: 5 4 3 2 1
// Time: O(n)
// Space: O(1)`}</CodeExample>

        <h3>5.2 Two Sum II — Sorted Array</h3>
        <p>
          Given a sorted array and a target, return the
          1-based indices of two numbers whose sum equals
          the target.
        </p>
        <CodeExample>{`public class Main {
    public static void main(String[] args) {
        int[] arr = {2, 7, 11, 15};
        int target = 9;

        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int sum = arr[left] + arr[right];

            if (sum == target) {
                System.out.println(
                    (left + 1) + " " + (right + 1)
                );
                return;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
}

// Output: 1 2
// Time: O(n)
// Space: O(1)`}</CodeExample>

        <h3>5.3 Valid Palindrome</h3>
        <p>
          Ignore non-alphanumeric characters and compare
          letters without considering case.
        </p>
        <CodeExample>{`public class Main {
    public static void main(String[] args) {
        String s = "A man, a plan, a canal: Panama";

        int left = 0;
        int right = s.length() - 1;

        boolean valid = true;

        while (left < right) {
            while (left < right &&
                !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }

            while (left < right &&
                !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }

            char a = Character.toLowerCase(s.charAt(left));
            char b = Character.toLowerCase(s.charAt(right));

            if (a != b) {
                valid = false;
                break;
            }

            left++;
            right--;
        }

        System.out.println(valid);
    }
}

// Output: true
// Time: O(n)
// Space: O(1)`}</CodeExample>

        <h3>5.4 Move Zeroes to the End</h3>
        <p>
          Move all zeroes to the end without changing the
          relative order of non-zero elements.
        </p>
        <CodeExample>{`public class Main {
    public static void main(String[] args) {
        int[] arr = {0, 1, 0, 3, 12};

        int write = 0;

        for (int read = 0; read < arr.length; read++) {
            if (arr[read] != 0) {
                arr[write] = arr[read];
                write++;
            }
        }

        while (write < arr.length) {
            arr[write] = 0;
            write++;
        }

        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}

// Output: 1 3 12 0 0
// Time: O(n)
// Space: O(1)`}</CodeExample>

        <h3>5.5 Remove Duplicates from Sorted Array</h3>
        <p>
          Keep only unique values at the beginning of the
          array. Return the number of unique elements.
        </p>
        <CodeExample>{`public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 1, 2, 2, 3};

        if (arr.length == 0) {
            System.out.println(0);
            return;
        }

        int slow = 0;

        for (int fast = 1; fast < arr.length; fast++) {
            if (arr[fast] != arr[slow]) {
                slow++;
                arr[slow] = arr[fast];
            }
        }

        int k = slow + 1;

        System.out.println("Unique count: " + k);

        for (int i = 0; i < k; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}

// Output: 3
//          1 2 3
// Time: O(n)
// Space: O(1)`}</CodeExample>

        <h3>5.6 Container With Most Water</h3>
        <p>
          Find two vertical lines that form a container
          holding the maximum amount of water.
        </p>
        <CodeExample>{`public class Main {
    public static void main(String[] args) {
        int[] height = {1, 8, 6, 2, 5, 4, 8, 3, 7};

        int left = 0;
        int right = height.length - 1;

        int maxWater = 0;

        while (left < right) {
            int width = right - left;

            int currentHeight = Math.min(
                height[left],
                height[right]
            );

            int area = width * currentHeight;

            maxWater = Math.max(maxWater, area);

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        System.out.println(maxWater);
    }
}

// Output: 49
// Time: O(n)
// Space: O(1)`}</CodeExample>

        <h3>5.7 Three Sum</h3>
        <p>
          Find unique triplets whose sum equals zero.
          Sort first, then use two pointers for the remaining
          two values.
        </p>
        <CodeExample>{`import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        int[] arr = {-1, 0, 1, 2, -1, -4};

        Arrays.sort(arr);

        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < arr.length - 2; i++) {

            if (i > 0 && arr[i] == arr[i - 1]) {
                continue;
            }

            int left = i + 1;
            int right = arr.length - 1;

            while (left < right) {
                int sum = arr[i] + arr[left] + arr[right];

                if (sum == 0) {
                    List<Integer> triplet = new ArrayList<>();
                    triplet.add(arr[i]);
                    triplet.add(arr[left]);
                    triplet.add(arr[right]);

                    result.add(triplet);

                    left++;
                    right--;

                    while (left < right &&
                        arr[left] == arr[left - 1]) {
                        left++;
                    }

                    while (left < right &&
                        arr[right] == arr[right + 1]) {
                        right--;
                    }

                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        System.out.println(result);
    }
}

// Output: [[-1, -1, 2], [-1, 0, 1]]
// Time: O(n^2)
// Space: O(1) auxiliary, excluding output
// Sorting may require additional implementation-dependent space.`}</CodeExample>

        <h3>5.8 Find Middle of a Linked List</h3>
        <p>
          This implementation assumes a standard ListNode
          class and a non-circular linked list.
        </p>
        <CodeExample>{`ListNode slow = head;
ListNode fast = head;

while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}

// slow points to the middle node.`}</CodeExample>

        <h3>5.9 Helper method for swapping</h3>
        <CodeExample>{`static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}`}</CodeExample>

        <h3>Important implementation rules</h3>
        <ul>
          <li>Use left less than right when both pointers must remain distinct.</li>
          <li>Use left less than or equal to right when the middle element must also be processed.</li>
          <li>Check array boundaries before accessing elements.</li>
          <li>Skip duplicate values when the problem requires unique results.</li>
          <li>Use long instead of int if sums or products can overflow.</li>
        </ul>
      </>
    ),

    'dry-runs': (
      <>
        <p className="dsa-level">LEVEL 3 · TRACE AND DEBUG</p>
        <h2>6. Step-by-Step Dry Runs</h2>

        <h3>6.1 Two Sum on a sorted array</h3>
        <p>
          Array: [2, 7, 11, 15], Target: 9.
        </p>

        <CodeExample>{`left = 0, right = 3
2 + 15 = 17
17 > 9, move right

left = 0, right = 2
2 + 11 = 13
13 > 9, move right

left = 0, right = 1
2 + 7 = 9
Found!`}</CodeExample>

        <table className="dsa-comparison-table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Left</th>
              <th>Right</th>
              <th>Sum</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>2</td><td>15</td><td>17</td><td>Right--</td></tr>
            <tr><td>2</td><td>2</td><td>11</td><td>13</td><td>Right--</td></tr>
            <tr><td>3</td><td>2</td><td>7</td><td>9</td><td>Found</td></tr>
          </tbody>
        </table>

        <h3>6.2 Reverse an array</h3>
        <p>Input: [10, 20, 30, 40, 50]</p>
        <CodeExample>{`Initial:
[10, 20, 30, 40, 50]
 L              R

Swap 10 and 50:
[50, 20, 30, 40, 10]
     L        R

Swap 20 and 40:
[50, 40, 30, 20, 10]
         L  R

Stop.

Output:
[50, 40, 30, 20, 10]`}</CodeExample>

        <h3>6.3 Move Zeroes</h3>
        <p>Input: [0, 1, 0, 3, 12]</p>
        <CodeExample>{`Read 0  -> Skip
Read 1  -> Write at index 0
Read 0  -> Skip
Read 3  -> Write at index 1
Read 12 -> Write at index 2

After filling remaining positions:
[1, 3, 12, 0, 0]`}</CodeExample>

        <h3>6.4 Three Sum</h3>
        <p>Input: [-1, 0, 1, 2, -1, -4]</p>
        <CodeExample>{`After sorting:
[-4, -1, -1, 0, 1, 2]

Fix -4:
Find two values with sum 4.
No valid pair.

Fix first -1:
Find two values with sum 1.

-1 + 0 + 1 = 0
Found: [-1, 0, 1]

-1 + 2 + (-1) = 0
Found: [-1, -1, 2]

Skip duplicate starting -1.

Final:
[[-1, -1, 2], [-1, 0, 1]]`}</CodeExample>

        <h3>How to dry-run any Two Pointer problem</h3>
        <ol>
          <li>Write the input array.</li>
          <li>Mark each pointer's initial position.</li>
          <li>Calculate the current condition.</li>
          <li>Decide which pointer moves and why.</li>
          <li>Record the updated positions.</li>
          <li>Repeat until the stopping condition is reached.</li>
          <li>Verify the output manually.</li>
        </ol>
      </>
    ),

    advanced: (
      <>
        <p className="dsa-level">LEVEL 4 · ADVANCED APPLICATIONS</p>
        <h2>7. Advanced Two Pointer Concepts</h2>

        <h3>7.1 Dutch National Flag Algorithm</h3>
        <p>
          Sort an array containing only 0, 1 and 2 in a
          single traversal using three pointers.
        </p>
        <ul>
          <li>0 to low - 1 contains zeroes.</li>
          <li>low to mid - 1 contains ones.</li>
          <li>mid to high is the unknown region.</li>
          <li>high + 1 to the end contains twos.</li>
        </ul>
        <p>
          When the middle element is 2, swap it with high
          and reduce high. Do not increment mid immediately,
          because the swapped element has not been examined.
        </p>
        <p>Time: O(n). Extra space: O(1).</p>

        <h3>7.2 Floyd's Cycle Detection Algorithm</h3>
        <p>
          Also called the Tortoise and Hare algorithm.
          It detects a cycle in a linked list using two
          pointers moving at different speeds.
        </p>
        <CodeExample>{`ListNode slow = head;
ListNode fast = head;

while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow == fast) {
        System.out.println("Cycle detected");
        return;
    }
}

System.out.println("No cycle");`}</CodeExample>
        <p>
          If a cycle exists, the two pointers eventually
          meet. This uses O(n) time and O(1) extra space.
        </p>

        <h3>7.3 Finding the start of a cycle</h3>
        <p>
          First detect a meeting point using Floyd's algorithm.
          Then reset one pointer to the head. Move both pointers
          one step at a time. Their next meeting point is the
          start of the cycle.
        </p>

        <h3>7.4 Trapping Rain Water</h3>
        <p>
          A two-pointer approach calculates trapped water
          without storing separate prefix and suffix maximum
          arrays.
        </p>
        <CodeExample>{`int left = 0;
int right = height.length - 1;

int leftMax = 0;
int rightMax = 0;
int water = 0;

while (left < right) {
    if (height[left] <= height[right]) {
        leftMax = Math.max(leftMax, height[left]);
        water += leftMax - height[left];
        left++;
    } else {
        rightMax = Math.max(rightMax, height[right]);
        water += rightMax - height[right];
        right--;
    }
}`}</CodeExample>
        <p>
          Time: O(n). Extra space: O(1).
        </p>

        <h3>7.5 Four Sum</h3>
        <p>
          Fix two indices using nested loops, then use two
          pointers for the remaining pair. Sorting helps
          eliminate duplicates and enables directional movement.
        </p>
        <p>
          Typical time complexity: O(n³), excluding output
          construction.
        </p>

        <h3>7.6 Merge Two Sorted Arrays</h3>
        <p>
          Use one pointer for each sorted input array.
          Compare current elements and advance the pointer
          belonging to the smaller value.
        </p>

        <h3>7.7 Two Pointers vs Sliding Window</h3>
        <table className="dsa-comparison-table">
          <thead>
            <tr>
              <th>Two Pointers</th>
              <th>Sliding Window</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Uses two positions to process data.</td>
              <td>Maintains a continuous range.</td>
            </tr>
            <tr>
              <td>Can move towards each other.</td>
              <td>Usually expands and shrinks a window.</td>
            </tr>
            <tr>
              <td>Useful for pairs and partitioning.</td>
              <td>Useful for subarrays and substrings.</td>
            </tr>
            <tr>
              <td>Does not always maintain a window.</td>
              <td>Always reasons about a window.</td>
            </tr>
          </tbody>
        </table>

        <h3>7.8 When Two Pointers is not enough</h3>
        <ul>
          <li>When all possible combinations must be examined without useful pruning.</li>
          <li>When input properties do not justify directional pointer movement.</li>
          <li>When a frequency map or other data structure is required.</li>
          <li>When a problem needs a variable-size window with additional state.</li>
        </ul>
      </>
    ),

    'edge-cases': (
      <>
        <p className="dsa-level">LEVEL 4 · INTERVIEW ESSENTIALS</p>
        <h2>8. Edge Cases and Common Mistakes</h2>

        <h3>Important edge cases</h3>
        <ul>
          <li>Empty array.</li>
          <li>Array containing one element.</li>
          <li>Array containing two elements.</li>
          <li>All elements are equal.</li>
          <li>Array contains negative numbers.</li>
          <li>Array contains zeroes.</li>
          <li>Target does not exist.</li>
          <li>Multiple pairs produce the same result.</li>
          <li>Input contains duplicate values.</li>
          <li>Very large values cause integer overflow.</li>
          <li>Already sorted and reverse-sorted arrays.</li>
        </ul>

        <h3>Common mistakes</h3>
        <ol>
          <li>
            <strong>Wrong loop condition:</strong> Using
            left less than right when the middle element must
            also be processed.
          </li>
          <li>
            <strong>Incorrect pointer movement:</strong>
            Moving the wrong pointer can skip a valid answer.
          </li>
          <li>
            <strong>Ignoring sorted input:</strong>
            Directional sum-based decisions require sorted order.
          </li>
          <li>
            <strong>Duplicate results:</strong>
            Failing to skip duplicates in Three Sum.
          </li>
          <li>
            <strong>Index errors:</strong>
            Accessing right or left after crossing array boundaries.
          </li>
          <li>
            <strong>Integer overflow:</strong>
            Adding or multiplying large int values without
            considering long.
          </li>
          <li>
            <strong>Incorrect fast-pointer condition:</strong>
            Accessing fast.next.next without first checking
            fast and fast.next.
          </li>
          <li>
            <strong>Incorrect movement in Container With Most Water:</strong>
            Moving the taller boundary instead of the shorter one.
          </li>
        </ol>

        <h3>How to debug a Two Pointer solution</h3>
        <ul>
          <li>Check initial pointer positions.</li>
          <li>Check the loop termination condition.</li>
          <li>Check whether every iteration moves a pointer.</li>
          <li>Check whether the movement preserves the solution logic.</li>
          <li>Test empty and smallest valid inputs.</li>
          <li>Test duplicate values and boundary cases.</li>
        </ul>

        <h3>Interview rule</h3>
        <p>
          Be prepared to explain why moving a particular pointer
          cannot discard a better solution. Merely memorising
          the code is not enough.
        </p>
      </>
    ),

    practice: (
      <>
        <p className="dsa-level">PRACTICE ZONE · BEGINNER TO EXPERT</p>
        <h2>9. Two Pointers Coding Practice</h2>
        <p>
          Solve the problems in order. First understand the
          brute-force approach, then derive the pointer movement,
          implement it in Java and analyse complexity.
        </p>

        <h3>Beginner — Build your fundamentals</h3>

        <div className="dsa-practice-card">
          <h4>1. Reverse String</h4>
          <p><strong>Task:</strong> Reverse a character array in place.</p>
          <p><strong>Pattern:</strong> Opposite-direction pointers.</p>
          <p><strong>Target:</strong> O(n) time, O(1) extra space.</p>
          <a href="https://leetcode.com/problems/reverse-string/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
        </div>

        <div className="dsa-practice-card">
          <h4>2. Valid Palindrome</h4>
          <p><strong>Task:</strong> Check whether a String is a palindrome after ignoring non-alphanumeric characters and case.</p>
          <p><strong>Pattern:</strong> Opposite-direction pointers.</p>
          <p><strong>Target:</strong> O(n) time, O(1) extra space.</p>
          <a href="https://leetcode.com/problems/valid-palindrome/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
        </div>

        <div className="dsa-practice-card">
          <h4>3. Move Zeroes</h4>
          <p><strong>Task:</strong> Move zeroes to the end while maintaining the relative order of non-zero values.</p>
          <p><strong>Pattern:</strong> Read and write pointers.</p>
          <p><strong>Target:</strong> O(n) time, O(1) extra space.</p>
          <a href="https://leetcode.com/problems/move-zeroes/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
        </div>

        <div className="dsa-practice-card">
          <h4>4. Remove Duplicates from Sorted Array</h4>
          <p><strong>Task:</strong> Remove duplicates in place and return the number of unique elements.</p>
          <p><strong>Pattern:</strong> Slow and fast pointers.</p>
          <p><strong>Target:</strong> O(n) time, O(1) extra space.</p>
          <a href="https://leetcode.com/problems/remove-duplicates-from-sorted-array/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
        </div>

        <h3>Intermediate — Recognise patterns</h3>

        <div className="dsa-practice-card">
          <h4>5. Two Sum II — Input Array Is Sorted</h4>
          <p><strong>Task:</strong> Find two numbers whose sum equals the target.</p>
          <p><strong>Pattern:</strong> Opposite-direction pointers.</p>
          <p><strong>Target:</strong> O(n) time, O(1) extra space.</p>
          <a href="https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
        </div>

        <div className="dsa-practice-card">
          <h4>6. Container With Most Water</h4>
          <p><strong>Task:</strong> Find the maximum water container area.</p>
          <p><strong>Pattern:</strong> Greedy opposite-direction pointers.</p>
          <p><strong>Target:</strong> O(n) time, O(1) extra space.</p>
          <a href="https://leetcode.com/problems/container-with-most-water/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
        </div>

        <div className="dsa-practice-card">
          <h4>7. 3Sum</h4>
          <p><strong>Task:</strong> Find all unique triplets whose sum is zero.</p>
          <p><strong>Pattern:</strong> Sorting + fixed pointer + two pointers.</p>
          <p><strong>Target:</strong> O(n²) time.</p>
          <a href="https://leetcode.com/problems/3sum/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
        </div>

        <div className="dsa-practice-card">
          <h4>8. Sort Colors</h4>
          <p><strong>Task:</strong> Sort an array containing 0, 1 and 2 in place.</p>
          <p><strong>Pattern:</strong> Three pointers / Dutch National Flag.</p>
          <p><strong>Target:</strong> O(n) time, O(1) extra space.</p>
          <a href="https://leetcode.com/problems/sort-colors/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
        </div>

        <h3>Advanced — Interview-level problems</h3>

        <div className="dsa-practice-card">
          <h4>9. Trapping Rain Water</h4>
          <p><strong>Task:</strong> Calculate how much rainwater can be trapped.</p>
          <p><strong>Pattern:</strong> Two pointers + running maximums.</p>
          <p><strong>Target:</strong> O(n) time, O(1) extra space.</p>
          <a href="https://leetcode.com/problems/trapping-rain-water/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
        </div>

        <div className="dsa-practice-card">
          <h4>10. 4Sum</h4>
          <p><strong>Task:</strong> Find all unique quadruplets whose sum equals the target.</p>
          <p><strong>Pattern:</strong> Sorting + two fixed indices + two pointers.</p>
          <p><strong>Target:</strong> O(n³) time.</p>
          <a href="https://leetcode.com/problems/4sum/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
        </div>

        <div className="dsa-practice-card">
          <h4>11. Linked List Cycle</h4>
          <p><strong>Task:</strong> Determine whether a linked list contains a cycle.</p>
          <p><strong>Pattern:</strong> Fast and slow pointers.</p>
          <p><strong>Target:</strong> O(n) time, O(1) extra space.</p>
          <a href="https://leetcode.com/problems/linked-list-cycle/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
        </div>

        <div className="dsa-practice-card">
          <h4>12. Find the Duplicate Number</h4>
          <p><strong>Task:</strong> Find the duplicate number under the problem's specified constraints.</p>
          <p><strong>Pattern:</strong> Floyd's cycle detection.</p>
          <p><strong>Target:</strong> O(n) time, O(1) extra space.</p>
          <a href="https://leetcode.com/problems/find-the-duplicate-number/" target="_blank" rel="noreferrer">Solve on LeetCode →</a>
        </div>

        <h3>Practice strategy</h3>
        <ol>
          <li>Attempt each problem without looking at the solution.</li>
          <li>Write the brute-force approach.</li>
          <li>Identify what each pointer represents.</li>
          <li>Explain why each pointer moves.</li>
          <li>Implement the solution in Java.</li>
          <li>Dry-run edge cases.</li>
          <li>Record time and space complexity.</li>
          <li>Re-solve difficult problems after a few days.</li>
        </ol>
      </>
    ),

    interview: (
      <>
        <p className="dsa-level">INTERVIEW PREPARATION · EXPERT LEVEL</p>
        <h2>10. Two Pointers Interview Questions</h2>

        <h3>Basic conceptual questions</h3>
        <ol>
          <li>What is the Two Pointers technique?</li>
          <li>How is it different from nested loops?</li>
          <li>What are opposite-direction pointers?</li>
          <li>What are same-direction pointers?</li>
          <li>What is the fast and slow pointer technique?</li>
          <li>Does Two Pointers always require sorted input?</li>
          <li>What is the usual space complexity?</li>
          <li>How do you avoid duplicate combinations?</li>
        </ol>

        <h3>Intermediate questions</h3>
        <ol>
          <li>Explain the Two Sum sorted-array solution.</li>
          <li>How do you remove duplicates in place?</li>
          <li>How do you move zeroes to the end?</li>
          <li>Explain the Container With Most Water solution.</li>
          <li>Why does the shorter boundary move in Container With Most Water?</li>
          <li>How does sorting help solve Three Sum?</li>
          <li>How do you merge two sorted arrays?</li>
          <li>What is the Dutch National Flag algorithm?</li>
        </ol>

        <h3>Advanced questions</h3>
        <ol>
          <li>Explain Floyd's cycle detection algorithm.</li>
          <li>How can you find the starting node of a linked-list cycle?</li>
          <li>How can Two Pointers solve Trapping Rain Water?</li>
          <li>Why is Three Sum O(n²)?</li>
          <li>How would you extend Three Sum to Four Sum?</li>
          <li>What are the mathematical reasons behind pointer movement?</li>
          <li>When is Two Pointers not an appropriate technique?</li>
          <li>How does Two Pointers differ from Sliding Window?</li>
        </ol>

        <h3>Common interview follow-ups</h3>
        <ul>
          <li>What if the array is not sorted?</li>
          <li>What if multiple answers exist?</li>
          <li>What if duplicates are present?</li>
          <li>Can you solve it without modifying the original array?</li>
          <li>Can you reduce auxiliary space to O(1)?</li>
          <li>What happens when the input contains negative values?</li>
          <li>Can integer overflow occur?</li>
          <li>Can you prove that no valid solution is skipped?</li>
        </ul>

        <h3>What you must be able to explain</h3>
        <ul>
          <li>Brute-force approach and its limitations.</li>
          <li>Why the chosen pointer pattern works.</li>
          <li>Pointer movement conditions.</li>
          <li>Correct termination condition.</li>
          <li>Time and space complexity.</li>
          <li>Edge cases and correctness reasoning.</li>
        </ul>
      </>
    ),
  };

  const activeIndex = sections.findIndex(
    (section) => section.id === activeSection
  );

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
        <p className="java-eyebrow">
          DSA LEARNING HUB · TWO POINTERS
        </p>

        <h1>Two Pointers – Complete Learning Guide</h1>

        <p>
          Master Two Pointers from fundamentals to advanced
          algorithms, Java implementations and technical interviews.
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
            onClick={() => setActiveSection(section.id)}
          >
            {completedSections.includes(section.id) ? '✓ ' : ''}
            {section.label}
          </button>
        ))}
      </nav>

      <main className="dsa-lesson-content">
        {content[activeSection]}

        <div className="dsa-section-completion">
          <button
            type="button"
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
            type="button"
            className="secondary-button"
            disabled={activeIndex === 0}
            onClick={() =>
              setActiveSection(sections[activeIndex - 1].id)
            }
          >
            ← Previous
          </button>

          <button
            type="button"
            className="secondary-button"
            disabled={activeIndex === sections.length - 1}
            onClick={() =>
              setActiveSection(sections[activeIndex + 1].id)
            }
          >
            Next →
          </button>
        </div>
      </main>
    </section>
  );
}

export default TwoPointersLesson;
