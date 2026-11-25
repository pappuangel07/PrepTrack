

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
    title: "1. Beginner — Reverse an Array",
    difficulty: "Beginner",
    question:
      "Given an integer array, reverse its elements in-place without creating another array.",
    hint:
      "Use two pointers. One starts at the beginning and the other at the end. Swap and move inward.",
    solution: `static void reverse(int[] arr) {
    int left = 0;
    int right = arr.length - 1;

    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;

        left++;
        right--;
    }
}

public static void main(String[] args) {
    int[] arr = {1, 2, 3, 4, 5};

    reverse(arr);

    System.out.println(
        java.util.Arrays.toString(arr)
    );
}`,
    explanation:
      "Each swap puts two elements into their final positions. The pointers meet after approximately n/2 swaps.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "2. Beginner — Check a Palindrome",
    difficulty: "Beginner",
    question:
      "Determine whether a string reads the same forward and backward. This version is case-sensitive and considers every character.",
    hint:
      "Compare characters from both ends. Stop when they differ or the pointers meet.",
    solution: `static boolean isPalindrome(String s) {
    int left = 0;
    int right = s.length() - 1;

    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

public static void main(String[] args) {
    System.out.println(isPalindrome("level")); // true
    System.out.println(isPalindrome("Java"));  // false
}`,
    explanation:
      "Only half the string needs to be checked because each comparison checks a pair of mirrored characters.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "3. Beginner — Find the Second Largest Distinct Element",
    difficulty: "Beginner",
    question:
      "Find the second largest distinct value in an integer array. Return -1 if it does not exist.",
    hint:
      "Maintain the largest and second largest values while scanning once. Handle duplicates carefully.",
    solution: `static int secondLargest(int[] arr) {
    int largest = Integer.MIN_VALUE;
    int second = Integer.MIN_VALUE;

    for (int value : arr) {
        if (value > largest) {
            second = largest;
            largest = value;
        } else if (
            value < largest && value > second
        ) {
            second = value;
        }
    }

    if (second == Integer.MIN_VALUE) {
        return -1;
    }

    return second;
}

public static void main(String[] args) {
    int[] arr = {8, 4, 8, 6, 3};

    System.out.println(secondLargest(arr)); // 6
}`,
    explanation:
      "The second value must be strictly smaller than the largest. This implementation uses Integer.MIN_VALUE as a sentinel, so if that value itself can be a valid array element, use a separate boolean or a wider representation to distinguish the sentinel.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "4. Beginner — Character Frequency",
    difficulty: "Beginner",
    question:
      "Count how many times each character appears in a string.",
    hint:
      "Use a HashMap<Character, Integer>. Update the count for every character.",
    solution: `import java.util.HashMap;
import java.util.Map;

static Map<Character, Integer> frequency(String s) {
    Map<Character, Integer> map = new HashMap<>();

    for (char ch : s.toCharArray()) {
        map.put(
            ch,
            map.getOrDefault(ch, 0) + 1
        );
    }

    return map;
}

public static void main(String[] args) {
    System.out.println(frequency("banana"));
}`,
    explanation:
      "The map stores each distinct character as a key and its count as the value. HashMap operations are average-case O(1).",
    complexity: "Time: O(n) average | Extra space: O(k), k = distinct characters",
  },
  {
    title: "5. Intermediate — Two Sum in a Sorted Array",
    difficulty: "Intermediate",
    question:
      "Given a sorted array and a target, return the indices of two elements whose sum equals the target. Return {-1, -1} if no pair exists.",
    hint:
      "If the sum is too small, move the left pointer. If it is too large, move the right pointer.",
    solution: `static int[] twoSum(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;

    while (left < right) {
        long sum = (long) arr[left] + arr[right];

        if (sum == target) {
            return new int[] {left, right};
        }

        if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return new int[] {-1, -1};
}

public static void main(String[] args) {
    int[] arr = {1, 2, 4, 6, 9};

    int[] result = twoSum(arr, 10);

    System.out.println(
        java.util.Arrays.toString(result)
    ); // [1, 3]
}`,
    explanation:
      "Because the array is sorted, moving a pointer changes the sum in a predictable direction. The long conversion prevents overflow during addition.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "6. Intermediate — Maximum Subarray Sum",
    difficulty: "Intermediate",
    question:
      "Find the maximum sum of a non-empty contiguous subarray.",
    hint:
      "At each element, decide whether to extend the current subarray or start a new one.",
    solution: `static int maxSubarraySum(int[] arr) {
    int current = arr[0];
    int best = arr[0];

    for (int i = 1; i < arr.length; i++) {
        current = Math.max(
            arr[i],
            current + arr[i]
        );

        best = Math.max(best, current);
    }

    return best;
}

public static void main(String[] args) {
    int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};

    System.out.println(maxSubarraySum(arr)); // 6
}`,
    explanation:
      "This is Kadane's algorithm. A negative running sum is not useful for extending a future subarray, so the algorithm may restart at the current element.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "7. Intermediate — First Occurrence with Binary Search",
    difficulty: "Intermediate",
    question:
      "Given a sorted array that may contain duplicates, return the first index of the target.",
    hint:
      "When you find the target, store its index and continue searching on the left.",
    solution: `static int firstOccurrence(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    int answer = -1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            answer = mid;
            right = mid - 1;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return answer;
}

public static void main(String[] args) {
    int[] arr = {1, 2, 2, 2, 5, 7};

    System.out.println(firstOccurrence(arr, 2)); // 1
}`,
    explanation:
      "The search continues after finding a match, but discards the right half. This guarantees the earliest matching index.",
    complexity: "Time: O(log n) | Extra space: O(1)",
  },
  {
    title: "8. Intermediate — Valid Parentheses",
    difficulty: "Intermediate",
    question:
      "Given a string containing brackets, determine whether every opening bracket has a matching closing bracket in the correct order.",
    hint:
      "Push opening brackets onto a stack. For each closing bracket, check the most recent opening bracket.",
    solution: `import java.util.ArrayDeque;
import java.util.Deque;

static boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();

    for (char ch : s.toCharArray()) {
        if (ch == '(' || ch == '[' || ch == '{') {
            stack.push(ch);
        } else {
            if (stack.isEmpty()) {
                return false;
            }

            char open = stack.pop();

            if (ch == ')' && open != '(') {
                return false;
            }

            if (ch == ']' && open != '[') {
                return false;
            }

            if (ch == '}' && open != '{') {
                return false;
            }
        }
    }

    return stack.isEmpty();
}

public static void main(String[] args) {
    System.out.println(isValid("({[]})")); // true
    System.out.println(isValid("([)]"));   // false
}`,
    explanation:
      "A stack preserves the order of unmatched opening brackets. The last opening bracket must be the first one closed.",
    complexity: "Time: O(n) | Extra space: O(n)",
  },
  {
    title: "9. Intermediate — Longest Substring Without Repeating Characters",
    difficulty: "Intermediate",
    question:
      "Find the length of the longest substring containing no repeated characters.",
    hint:
      "Use a sliding window and store the last index of each character. Move the left boundary past a repeated character.",
    solution: `import java.util.HashMap;
import java.util.Map;

static int longestUniqueSubstring(String s) {
    Map<Character, Integer> lastSeen = new HashMap<>();

    int left = 0;
    int best = 0;

    for (int right = 0; right < s.length(); right++) {
        char ch = s.charAt(right);

        if (lastSeen.containsKey(ch)) {
            left = Math.max(
                left,
                lastSeen.get(ch) + 1
            );
        }

        lastSeen.put(ch, right);

        best = Math.max(
            best,
            right - left + 1
        );
    }

    return best;
}

public static void main(String[] args) {
    System.out.println(
        longestUniqueSubstring("abcabcbb")
    ); // 3
}`,
    explanation:
      "The left boundary never moves backward. Each character is processed a constant number of times, giving a linear-time sliding window.",
    complexity: "Time: O(n) average | Extra space: O(k), k = distinct characters",
  },
  {
    title: "10. Interview Level — Subarray Sum Equals K",
    difficulty: "Interview",
    question:
      "Count the number of contiguous subarrays whose sum equals k. The array may contain positive, zero, and negative values.",
    hint:
      "Use prefix sums and a frequency map. If currentPrefix - k has appeared before, those earlier prefixes form valid subarrays.",
    solution: `import java.util.HashMap;
import java.util.Map;

static int countSubarrays(int[] arr, int k) {
    Map<Integer, Integer> prefixCount =
        new HashMap<>();

    prefixCount.put(0, 1);

    int prefixSum = 0;
    int count = 0;

    for (int value : arr) {
        prefixSum += value;

        count += prefixCount.getOrDefault(
            prefixSum - k,
            0
        );

        prefixCount.put(
            prefixSum,
            prefixCount.getOrDefault(prefixSum, 0) + 1
        );
    }

    return count;
}

public static void main(String[] args) {
    int[] arr = {1, 1, 1};

    System.out.println(countSubarrays(arr, 2)); // 2
}`,
    explanation:
      "The initial prefix sum 0 occurs once so subarrays starting at index 0 can be counted. Use long for prefix sums and counts if constraints may exceed int.",
    complexity: "Time: O(n) average | Extra space: O(n)",
  },
  {
    title: "11. Interview Level — Merge Overlapping Intervals",
    difficulty: "Interview",
    question:
      "Given intervals, merge all overlapping intervals and return the merged result.",
    hint:
      "Sort by starting point. Compare each interval with the last merged interval.",
    solution: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

static int[][] merge(int[][] intervals) {
    if (intervals.length == 0) {
        return new int[0][];
    }

    Arrays.sort(
        intervals,
        (a, b) -> Integer.compare(a[0], b[0])
    );

    List<int[]> result = new ArrayList<>();

    for (int[] interval : intervals) {
        if (result.isEmpty()) {
            result.add(interval.clone());
        } else {
            int[] last = result.get(result.size() - 1);

            if (interval[0] <= last[1]) {
                last[1] = Math.max(
                    last[1],
                    interval[1]
                );
            } else {
                result.add(interval.clone());
            }
        }
    }

    return result.toArray(new int[result.size()][]);
}

public static void main(String[] args) {
    int[][] intervals = {
        {1, 3},
        {2, 6},
        {8, 10},
        {15, 18}
    };

    int[][] merged = merge(intervals);

    for (int[] interval : merged) {
        System.out.println(
            java.util.Arrays.toString(interval)
        );
    }
}`,
    explanation:
      "Sorting makes interval starts nondecreasing. If the next interval starts before or at the last merged end, the intervals overlap and can be combined.",
    complexity: "Time: O(n log n) | Extra space: O(n) for the result",
  },
  {
    title: "12. Interview Level — Climbing Stairs",
    difficulty: "Interview",
    question:
      "You can climb either 1 or 2 steps at a time. How many distinct ways are there to reach step n?",
    hint:
      "To reach step n, you must come from step n - 1 or n - 2.",
    solution: `static int climbStairs(int n) {
    if (n <= 2) {
        return n;
    }

    int previousTwo = 1;
    int previousOne = 2;

    for (int step = 3; step <= n; step++) {
        int current =
            previousOne + previousTwo;

        previousTwo = previousOne;
        previousOne = current;
    }

    return previousOne;
}

public static void main(String[] args) {
    System.out.println(climbStairs(5)); // 8
}`,
    explanation:
      "The recurrence is ways(n) = ways(n - 1) + ways(n - 2). Only the previous two results are needed, so the DP array can be reduced to two variables.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "13. Interview Level — BFS on a Graph",
    difficulty: "Interview",
    question:
      "Traverse a graph from a starting node using breadth-first search.",
    hint:
      "Use a queue and mark a node visited when you add it to the queue—not when you remove it.",
    solution: `import java.util.ArrayDeque;
import java.util.Queue;

static void bfs(
    int[][] graph,
    int start
) {
    boolean[] visited = new boolean[graph.length];

    Queue<Integer> queue = new ArrayDeque<>();

    visited[start] = true;
    queue.offer(start);

    while (!queue.isEmpty()) {
        int node = queue.poll();

        System.out.println(node);

        for (int next : graph[node]) {
            if (!visited[next]) {
                visited[next] = true;
                queue.offer(next);
            }
        }
    }
}

public static void main(String[] args) {
    int[][] graph = {
        {1, 2},
        {0, 3},
        {0, 3},
        {1, 2}
    };

    bfs(graph, 0);
}`,
    explanation:
      "Marking nodes when enqueued prevents duplicate queue entries. For an adjacency-list graph, BFS takes O(V + E) time.",
    complexity: "Time: O(V + E) | Extra space: O(V)",
  },
  {
    title: "14. Interview Level — Generate All Subsets",
    difficulty: "Interview",
    question:
      "Given an array of distinct integers, generate every possible subset.",
    hint:
      "For each element, make two choices: include it or exclude it.",
    solution: `import java.util.ArrayList;
import java.util.List;

static void generateSubsets(
    int[] nums,
    int index,
    List<Integer> current,
    List<List<Integer>> result
) {
    if (index == nums.length) {
        result.add(new ArrayList<>(current));
        return;
    }

    // Exclude current element
    generateSubsets(
        nums,
        index + 1,
        current,
        result
    );

    // Include current element
    current.add(nums[index]);

    generateSubsets(
        nums,
        index + 1,
        current,
        result
    );

    // Undo the choice
    current.remove(current.size() - 1);
}

public static void main(String[] args) {
    int[] nums = {1, 2, 3};

    List<List<Integer>> result = new ArrayList<>();

    generateSubsets(
        nums,
        0,
        new ArrayList<>(),
        result
    );

    System.out.println(result);
}`,
    explanation:
      "Each of n elements has two choices, so there are 2^n subsets. Copy the current list at the base case; otherwise every result would refer to the same mutable list.",
    complexity: "Time: O(n × 2^n) including output copying | Extra recursion space: O(n)",
  },
  {
    title: "15. How to Analyze Your Solution",
    difficulty: "All levels",
    question:
      "For every problem, explain the time complexity, extra space complexity, and why the algorithm is correct.",
    hint:
      "Count loop iterations, recursive calls, and additional data structures. Separate output storage from auxiliary space when relevant.",
    solution: `Example: Two Sum in a sorted array

- One left pointer
- One right pointer
- At least one pointer moves each iteration
- Each pointer moves at most n times

Therefore:
Time: O(n)
Extra space: O(1)

Correctness:
If sum < target, moving right pointer
would only make sum smaller.
Move left pointer instead.

If sum > target, move right pointer
to make sum smaller.`,
    explanation:
      "Complexity is not a label to memorize. It follows from how much work the algorithm performs as the input grows.",
    complexity: "Always state assumptions and input constraints.",
  },
];

export default function JavaAdvancedCodingPracticeLesson({ onBack }) {
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
        Java Advanced Coding Practice
      </h1>

      <p
        style={{
          color: "var(--muted, #6b7280)",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        Practice Java coding problems from beginner
        to interview level. Each problem includes
        a hint, a solution, an explanation, and
        complexity analysis.
      </p>

      {lessons.map((lesson, index) => (
        <section key={index} style={sectionStyle}>
          <h2 style={headingStyle}>{lesson.title}</h2>

          <p
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "var(--muted, #6b7280)",
              marginBottom: "12px",
            }}
          >
            Level: {lesson.difficulty}
          </p>

          <p style={{ lineHeight: "1.7" }}>
            <strong>Problem:</strong> {lesson.question}
          </p>

          <div
            style={{
              background: "var(--code-bg, #f3f4f6)",
              padding: "12px",
              borderRadius: "8px",
              margin: "12px 0",
              lineHeight: "1.7",
            }}
          >
            <strong>Hint:</strong> {lesson.hint}
          </div>

          <h3
            style={{
              fontSize: "16px",
              fontWeight: "700",
              margin: "14px 0 10px",
            }}
          >
            Solution
          </h3>

          <pre style={codeStyle}>
            <code>{lesson.solution}</code>
          </pre>

          <h3
            style={{
              fontSize: "16px",
              fontWeight: "700",
              margin: "14px 0 10px",
            }}
          >
            Explanation
          </h3>

          <p style={{ lineHeight: "1.7" }}>
            {lesson.explanation}
          </p>

          <p
            style={{
              fontWeight: "700",
              marginTop: "12px",
            }}
          >
            {lesson.complexity}
          </p>
        </section>
      ))}

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Final Practice Checklist</h2>

        <ul style={{ lineHeight: "1.8" }}>
          <li>Attempt each problem before viewing the solution.</li>
          <li>Write the code without copying.</li>
          <li>Test empty, small, duplicate, and boundary inputs.</li>
          <li>Explain why the algorithm works.</li>
          <li>Analyze time and space complexity.</li>
          <li>Re-solve missed problems after a few days.</li>
        </ul>
      </section>
    </div>
  );
}
