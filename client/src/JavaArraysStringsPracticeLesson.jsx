

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
    title: "1. Move Zeroes to the End",
    level: "Beginner",
    question:
      "Move all zeroes to the end of the array while maintaining the relative order of non-zero elements. Modify the array in-place.",
    hint:
      "Use one pointer to track where the next non-zero element should be placed.",
    solution: `static void moveZeroes(int[] nums) {
    int insert = 0;

    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            nums[insert] = nums[i];
            insert++;
        }
    }

    while (insert < nums.length) {
        nums[insert] = 0;
        insert++;
    }
}

public static void main(String[] args) {
    int[] nums = {0, 1, 0, 3, 12};

    moveZeroes(nums);

    System.out.println(
        java.util.Arrays.toString(nums)
    ); // [1, 3, 12, 0, 0]
}`,
    explanation:
      "The first loop copies non-zero values forward. The second loop fills the remaining positions with zeroes. The relative order of non-zero values is preserved.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "2. Remove Duplicates from a Sorted Array",
    level: "Beginner",
    question:
      "Given a sorted array, remove duplicates in-place and return the number of unique elements. The first k positions should contain the unique values.",
    hint:
      "Use a slow pointer for the position of the last unique value and a fast pointer to scan the array.",
    solution: `static int removeDuplicates(int[] nums) {
    if (nums.length == 0) {
        return 0;
    }

    int unique = 0;

    for (int i = 1; i < nums.length; i++) {
        if (nums[i] != nums[unique]) {
            unique++;
            nums[unique] = nums[i];
        }
    }

    return unique + 1;
}

public static void main(String[] args) {
    int[] nums = {1, 1, 2, 2, 3};

    int k = removeDuplicates(nums);

    System.out.println(k); // 3

    for (int i = 0; i < k; i++) {
        System.out.print(nums[i] + " ");
    } // 1 2 3
}`,
    explanation:
      "Because the array is sorted, duplicates are adjacent. Every new value is copied into the next unique position.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "3. Rotate an Array to the Right",
    level: "Intermediate",
    question:
      "Rotate an array to the right by k positions. Do it in-place.",
    hint:
      "Reverse the entire array, then reverse the first k elements and the remaining elements.",
    solution: `static void reverse(
    int[] nums,
    int left,
    int right
) {
    while (left < right) {
        int temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;

        left++;
        right--;
    }
}

static void rotate(int[] nums, int k) {
    if (nums.length == 0) {
        return;
    }

    k = k % nums.length;

    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
}

public static void main(String[] args) {
    int[] nums = {1, 2, 3, 4, 5, 6, 7};

    rotate(nums, 3);

    System.out.println(
        java.util.Arrays.toString(nums)
    ); // [5, 6, 7, 1, 2, 3, 4]
}`,
    explanation:
      "The three reversals place the last k elements at the beginning while preserving their order. Using k % n handles rotations larger than the array length.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "4. Best Time to Buy and Sell Stock",
    level: "Intermediate",
    question:
      "Given daily stock prices, choose one day to buy and a later day to sell. Return the maximum possible profit. Return 0 if no profit is possible.",
    hint:
      "Track the minimum price seen so far and calculate the profit if you sell today.",
    solution: `static int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int bestProfit = 0;

    for (int price : prices) {
        minPrice = Math.min(minPrice, price);

        int profit = price - minPrice;

        bestProfit = Math.max(
            bestProfit,
            profit
        );
    }

    return bestProfit;
}

public static void main(String[] args) {
    int[] prices = {7, 1, 5, 3, 6, 4};

    System.out.println(maxProfit(prices)); // 5
}`,
    explanation:
      "For every selling day, the best earlier buying price is the minimum price seen so far. This avoids checking every possible pair of days.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "5. Majority Element",
    level: "Intermediate",
    question:
      "Find the element that appears more than n/2 times. The problem guarantees that such an element exists.",
    hint:
      "Use the Boyer-Moore Voting Algorithm. Maintain a candidate and a counter.",
    solution: `static int majorityElement(int[] nums) {
    int candidate = 0;
    int count = 0;

    for (int num : nums) {
        if (count == 0) {
            candidate = num;
        }

        if (num == candidate) {
            count++;
        } else {
            count--;
        }
    }

    return candidate;
}

public static void main(String[] args) {
    int[] nums = {2, 2, 1, 1, 1, 2, 2};

    System.out.println(majorityElement(nums)); // 2
}`,
    explanation:
      "Different elements cancel each other out. Since the majority element occurs more than half the time, it cannot be completely cancelled. This version relies on the problem's guarantee that a majority exists.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "6. Find the Missing Number",
    level: "Intermediate",
    question:
      "An array contains n distinct numbers from the range 0 to n. Find the missing number.",
    hint:
      "Compare the expected sum from 0 to n with the actual array sum. Use long to avoid overflow.",
    solution: `static int missingNumber(int[] nums) {
    int n = nums.length;

    long expected =
        (long) n * (n + 1) / 2;

    long actual = 0;

    for (int num : nums) {
        actual += num;
    }

    return (int) (expected - actual);
}

public static void main(String[] args) {
    int[] nums = {3, 0, 1};

    System.out.println(missingNumber(nums)); // 2
}`,
    explanation:
      "The sum of numbers from 0 to n is n(n + 1)/2. Subtracting the actual sum gives the missing value.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "7. Product of Array Except Self",
    level: "Interview",
    question:
      "Return an array where each position contains the product of all elements except the element at that position. Do not use division.",
    hint:
      "First store the product of elements to the left. Then multiply by the product of elements to the right.",
    solution: `static int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];

    int prefix = 1;

    for (int i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    int suffix = 1;

    for (int i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
}

public static void main(String[] args) {
    int[] nums = {1, 2, 3, 4};

    System.out.println(
        java.util.Arrays.toString(
            productExceptSelf(nums)
        )
    ); // [24, 12, 8, 6]
}`,
    explanation:
      "The first pass stores left products. The second pass multiplies each position by its right product. The output array is not counted as auxiliary space; only constant extra variables are used. Products must fit the chosen integer type.",
    complexity: "Time: O(n) | Extra space excluding output: O(1)",
  },
  {
    title: "8. Check Whether Two Strings Are Anagrams",
    level: "Beginner",
    question:
      "Determine whether two strings contain exactly the same characters with the same frequencies. This version is case-sensitive and does not ignore spaces or punctuation.",
    hint:
      "If both strings contain the same characters with the same frequencies, their character counts will match.",
    solution: `static boolean isAnagram(String a, String b) {
    if (a.length() != b.length()) {
        return false;
    }

    int[] count = new int[65536];

    for (int i = 0; i < a.length(); i++) {
        count[a.charAt(i)]++;
        count[b.charAt(i)]--;
    }

    for (int value : count) {
        if (value != 0) {
            return false;
        }
    }

    return true;
}

public static void main(String[] args) {
    System.out.println(
        isAnagram("listen", "silent")
    ); // true
}`,
    explanation:
      "Each character in the first string increases its count, and the matching character in the second string decreases it. All counts must finish at zero. This implementation uses Java char values, not full Unicode code points.",
    complexity: "Time: O(n + 65536) | Extra space: O(1) for the fixed-size array",
  },
  {
    title: "9. First Non-Repeating Character",
    level: "Intermediate",
    question:
      "Return the index of the first character that appears exactly once. Return -1 if every character repeats.",
    hint:
      "Count characters in one pass, then scan the string again in original order.",
    solution: `static int firstUniqueChar(String s) {
    int[] count = new int[65536];

    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i)]++;
    }

    for (int i = 0; i < s.length(); i++) {
        if (count[s.charAt(i)] == 1) {
            return i;
        }
    }

    return -1;
}

public static void main(String[] args) {
    System.out.println(
        firstUniqueChar("leetcode")
    ); // 0

    System.out.println(
        firstUniqueChar("aabb")
    ); // -1
}`,
    explanation:
      "The first pass builds frequencies. The second pass preserves the original order, so the first character with frequency one is the answer.",
    complexity: "Time: O(n + 65536) | Extra space: O(1) for the fixed-size array",
  },
  {
    title: "10. Longest Common Prefix",
    level: "Intermediate",
    question:
      "Given an array of strings, return the longest prefix shared by every string.",
    hint:
      "Start with the first string as the prefix. Shorten it until each string starts with it.",
    solution: `static String longestCommonPrefix(String[] strs) {
    if (strs.length == 0) {
        return "";
    }

    String prefix = strs[0];

    for (int i = 1; i < strs.length; i++) {
        while (!strs[i].startsWith(prefix)) {
            prefix = prefix.substring(
                0,
                prefix.length() - 1
            );

            if (prefix.isEmpty()) {
                return "";
            }
        }
    }

    return prefix;
}

public static void main(String[] args) {
    String[] strs = {
        "flower",
        "flow",
        "flight"
    };

    System.out.println(
        longestCommonPrefix(strs)
    ); // fl
}`,
    explanation:
      "The prefix can only become shorter as more strings are checked. If it becomes empty, no non-empty common prefix exists.",
    complexity: "Time: O(total characters examined) | Extra space: depends on substring implementation",
  },
  {
    title: "11. Group Anagrams",
    level: "Interview",
    question:
      "Group strings that are anagrams of each other. The order of groups and strings within groups does not matter.",
    hint:
      "Sort the characters of each string. Anagrams produce the same sorted key.",
    solution: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

static List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups =
        new HashMap<>();

    for (String word : strs) {
        char[] chars = word.toCharArray();

        Arrays.sort(chars);

        String key = new String(chars);

        groups.computeIfAbsent(
            key,
            k -> new ArrayList<>()
        ).add(word);
    }

    return new ArrayList<>(groups.values());
}

public static void main(String[] args) {
    String[] words = {
        "eat", "tea", "tan",
        "ate", "nat", "bat"
    };

    System.out.println(
        groupAnagrams(words)
    );
}`,
    explanation:
      "Sorting creates a canonical key for each anagram group. Strings with the same sorted characters are placed in the same list.",
    complexity: "Time: O(m × k log k) | Extra space: O(m × k), where m is the number of strings and k is their maximum length",
  },
  {
    title: "12. Longest Palindromic Substring",
    level: "Interview",
    question:
      "Find the longest contiguous substring that is a palindrome.",
    hint:
      "Every palindrome has a center. Expand around each character and each gap between characters.",
    solution: `static String longestPalindrome(String s) {
    if (s == null || s.length() < 2) {
        return s;
    }

    int start = 0;
    int end = 0;

    for (int i = 0; i < s.length(); i++) {
        int odd = expand(s, i, i);
        int even = expand(s, i, i + 1);

        int length = Math.max(odd, even);

        if (length > end - start + 1) {
            start = i - (length - 1) / 2;
            end = i + length / 2;
        }
    }

    return s.substring(start, end + 1);
}

static int expand(String s, int left, int right) {
    while (
        left >= 0 &&
        right < s.length() &&
        s.charAt(left) == s.charAt(right)
    ) {
        left--;
        right++;
    }

    return right - left - 1;
}

public static void main(String[] args) {
    System.out.println(
        longestPalindrome("babad")
    ); // bab or aba
}`,
    explanation:
      "Odd-length palindromes have one center character. Even-length palindromes have a center gap. Expanding from both types of centers checks every possible palindrome center.",
    complexity: "Time: O(n²) | Extra space: O(1) excluding the returned substring",
  },
  {
    title: "13. String Compression",
    level: "Intermediate",
    question:
      "Compress consecutive repeated characters. For example, aabccc becomes a2b1c3. Return the compressed string.",
    hint:
      "Scan groups of equal characters. Count each group and append its character and count.",
    solution: `static String compress(String s) {
    StringBuilder result = new StringBuilder();

    int i = 0;

    while (i < s.length()) {
        char current = s.charAt(i);
        int count = 0;

        while (
            i < s.length() &&
            s.charAt(i) == current
        ) {
            count++;
            i++;
        }

        result.append(current);
        result.append(count);
    }

    return result.toString();
}

public static void main(String[] args) {
    System.out.println(
        compress("aabccc")
    ); // a2b1c3
}`,
    explanation:
      "The inner loop consumes one consecutive group. The outer loop then starts at the next different character.",
    complexity: "Time: O(n) | Extra space: O(n) for the result",
  },
  {
    title: "14. Arrays & Strings — Interview Checklist",
    level: "All levels",
    question:
      "For each problem, identify the pattern and explain why it works before coding.",
    hint:
      "Ask whether the input is sorted, whether duplicates matter, whether the range is contiguous, and whether a hash map or two pointers can reduce repeated work.",
    solution: `For every problem:

1. Clarify input and constraints.
2. Work through a small example.
3. Explain brute force.
4. Identify the bottleneck.
5. Choose a pattern.
6. Write code.
7. Test edge cases.
8. Analyze complexity.

Edge cases:
- Empty array or string
- One element
- All duplicates
- Negative values
- Already sorted input
- Very large values
- No valid answer`,
    explanation:
      "The goal is not to memorize these 13 solutions. The goal is to recognize the underlying pattern and adapt it when the interviewer changes the constraints.",
    complexity: "Practice until you can solve and explain each problem without looking.",
  },
];

export default function JavaArraysStringsPracticeLesson({ onBack }) {
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
        Java Coding Practice — Arrays & Strings
      </h1>

      <p
        style={{
          color: "var(--muted, #6b7280)",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        Practice array and string problems using
        two pointers, hashing, prefix/suffix
        techniques, sorting, and expansion around
        center. Attempt each problem before reading
        its solution.
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
            Level: {lesson.level}
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
        <h2 style={headingStyle}>Final Checklist</h2>

        <ul style={{ lineHeight: "1.8" }}>
          <li>Use two pointers confidently.</li>
          <li>Understand in-place array modification.</li>
          <li>Use frequency counting and hashing.</li>
          <li>Understand prefix and suffix techniques.</li>
          <li>Handle duplicates and edge cases.</li>
          <li>Explain string immutability and StringBuilder.</li>
          <li>Write each solution without copying.</li>
          <li>Analyze time and space complexity.</li>
        </ul>
      </section>
    </div>
  );
}
