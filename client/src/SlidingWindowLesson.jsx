
import { useState } from 'react';

const sections = [
  {
    title: '1. What is Sliding Window?',
    content: (
      <>
        <p><strong>Sliding Window</strong> is an algorithm technique used to solve problems involving continuous (contiguous) parts of an array or string.</p>
        <p>Instead of recalculating the result for every subarray, we maintain a window and move it across the input.</p>
        <h4>Simple example</h4>
        <p>Array: [2, 1, 5, 1, 3, 2]</p>
        <p>Find the maximum sum of any 3 consecutive elements.</p>
        <ul>
          <li>Window 1: [2, 1, 5] → sum = 8</li>
          <li>Move right: [1, 5, 1] → sum = 7</li>
          <li>Move right: [5, 1, 3] → sum = 9</li>
          <li>Move right: [1, 3, 2] → sum = 6</li>
        </ul>
        <p><strong>Answer: 9</strong></p>
        <p>Notice that when the window moves, we remove the outgoing element and add the incoming element. We do not calculate the entire sum again.</p>
      </>
    ),
  },
  {
    title: '2. Why do we need Sliding Window?',
    content: (
      <>
        <p>Consider an array of n elements. Finding the sum of every window of size k using nested loops can take O(n × k) time.</p>
        <p>Sliding Window updates the previous window's result in O(1) time per move, giving O(n) overall time.</p>
        <ul>
          <li>Brute force: repeatedly calculate every window.</li>
          <li>Optimized: reuse the previous window's information.</li>
        </ul>
        <p><strong>Important:</strong> Sliding Window is useful when the problem asks about contiguous subarrays or substrings. It is not automatically suitable for every subarray problem.</p>
      </>
    ),
  },
  {
    title: '3. Types of Sliding Window',
    content: (
      <>
        <h4>A. Fixed-size window</h4>
        <p>The window size k is given and never changes.</p>
        <p>Examples: maximum sum of k consecutive elements, average of every k elements, first negative number in every window of size k.</p>
        <h4>B. Variable-size window</h4>
        <p>The window expands and shrinks based on a condition.</p>
        <p>Examples: smallest subarray with sum at least target, longest substring without repeating characters, longest subarray satisfying a constraint.</p>
        <h4>C. Multiple-window / advanced variations</h4>
        <p>Some problems use two pointers, frequency maps, deques, or other data structures to maintain information about the current window.</p>
      </>
    ),
  },
  {
    title: '4. Fixed-size Sliding Window',
    content: (
      <>
        <p><strong>Steps:</strong></p>
        <ol>
          <li>Calculate the result for the first k elements.</li>
          <li>Move the right pointer one step forward.</li>
          <li>Remove the element leaving the window.</li>
          <li>Add the new element entering the window.</li>
          <li>Update the answer.</li>
          <li>Repeat until the array ends.</li>
        </ol>
        <h4>Java implementation: Maximum sum of size k</h4>
        <pre>{`public class Main {
    public static int maxSum(int[] arr, int k) {
        if (arr == null || k <= 0 || k > arr.length) {
            throw new IllegalArgumentException("Invalid input");
        }

        int windowSum = 0;

        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }

        int maxSum = windowSum;

        for (int right = k; right < arr.length; right++) {
            windowSum += arr[right];
            windowSum -= arr[right - k];

            maxSum = Math.max(maxSum, windowSum);
        }

        return maxSum;
    }

    public static void main(String[] args) {
        int[] arr = {2, 1, 5, 1, 3, 2};
        System.out.println(maxSum(arr, 3));
    }
}`}</pre>
        <p><strong>Output:</strong> 9</p>
        <p><strong>Time:</strong> O(n). <strong>Extra space:</strong> O(1).</p>
      </>
    ),
  },
  {
    title: '5. Fixed Window — Dry Run',
    content: (
      <>
        <p>Input: arr = [2, 1, 5, 1, 3, 2], k = 3</p>
        <p>Initial window sum = 2 + 1 + 5 = 8. Maximum = 8.</p>
        <ul>
          <li>right = 3: add 1, remove 2 → sum = 7, max = 8</li>
          <li>right = 4: add 3, remove 1 → sum = 9, max = 9</li>
          <li>right = 5: add 2, remove 5 → sum = 6, max = 9</li>
        </ul>
        <p>Final answer = <strong>9</strong>.</p>
        <p>The outgoing index is always <code>right - k</code> because that is the element just outside the new window.</p>
      </>
    ),
  },
  {
    title: '6. Variable-size Sliding Window',
    content: (
      <>
        <p>In a variable window, the window size is not fixed. We expand it to include new elements and shrink it when the condition requires it.</p>
        <p><strong>General pattern:</strong></p>
        <ol>
          <li>Move the right pointer to expand the window.</li>
          <li>Update the current window's information.</li>
          <li>While the window violates the required condition, move the left pointer forward.</li>
          <li>Update the answer using the valid window.</li>
        </ol>
        <h4>Example: Minimum length subarray with sum ≥ target</h4>
        <p>Array = [2, 3, 1, 2, 4, 3], target = 7</p>
        <p>The smallest qualifying subarray is [4, 3], with length 2.</p>
        <pre>{`public class Main {
    public static int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int sum = 0;
        int minLength = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];

            while (sum >= target) {
                minLength = Math.min(
                    minLength, right - left + 1
                );

                sum -= nums[left];
                left++;
            }
        }

        return minLength == Integer.MAX_VALUE ? 0 : minLength;
    }

    public static void main(String[] args) {
        int[] nums = {2, 3, 1, 2, 4, 3};
        System.out.println(minSubArrayLen(7, nums));
    }
}`}</pre>
        <p><strong>Output:</strong> 2</p>
        <p><strong>Time:</strong> O(n), because each pointer moves forward at most n times. <strong>Extra space:</strong> O(1).</p>
      </>
    ),
  },
  {
    title: '7. Variable Window — Important Dry Run',
    content: (
      <>
        <p>Input: [2, 3, 1, 2, 4, 3], target = 7.</p>
        <ul>
          <li>Add 2, 3, 1, 2 → sum = 8. Valid window length = 4.</li>
          <li>Remove 2 → sum = 6. Window is no longer valid.</li>
          <li>Add 4 → sum = 10. Valid window length = 4.</li>
          <li>Remove 3 → sum = 7. Valid window length = 3.</li>
          <li>Remove 1 → sum = 6. Stop shrinking.</li>
          <li>Add 3 → sum = 9. Valid window length = 3.</li>
          <li>Remove 2 → sum = 7. Valid window length = 2.</li>
          <li>Remove 4 → sum = 3. Stop shrinking.</li>
        </ul>
        <p>Minimum valid length = <strong>2</strong>.</p>
      </>
    ),
  },
  {
    title: '8. Sliding Window with Strings',
    content: (
      <>
        <p>For string problems, the window represents a substring. We often use a frequency array or HashMap to track characters.</p>
        <h4>Example: Longest substring without repeating characters</h4>
        <p>Input: <code>"abcabcbb"</code></p>
        <p>Answer: 3, because <code>"abc"</code> is the longest substring without repeated characters.</p>
        <pre>{`import java.util.HashMap;
import java.util.Map;

public class Main {
    public static int longestUnique(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();

        int left = 0;
        int maxLength = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);

            if (lastSeen.containsKey(ch)) {
                left = Math.max(left, lastSeen.get(ch) + 1);
            }

            lastSeen.put(ch, right);

            maxLength = Math.max(
                maxLength, right - left + 1
            );
        }

        return maxLength;
    }

    public static void main(String[] args) {
        System.out.println(longestUnique("abcabcbb"));
    }
}`}</pre>
        <p><strong>Output:</strong> 3</p>
        <p><strong>Time:</strong> O(n) average. <strong>Space:</strong> O(min(n, character set size)).</p>
        <p>Using <code>Math.max</code> is important: the left pointer must never move backwards when a repeated character was seen before the current window.</p>
      </>
    ),
  },
  {
    title: '9. Frequency Map and Deque Variations',
    content: (
      <>
        <h4>Frequency map</h4>
        <p>Use a HashMap or frequency array when the window needs counts of characters or values.</p>
        <p>Typical problems: anagrams, permutation matching, and substrings containing a required set of characters.</p>
        <h4>Deque (double-ended queue)</h4>
        <p>Use a deque when you need the maximum or minimum element of every fixed-size window.</p>
        <p>For a sliding-window maximum, maintain indices in decreasing order of their values. Remove expired indices from the front and smaller values from the back.</p>
        <p>This gives O(n) time overall, instead of scanning each window independently.</p>
        <p>These are advanced patterns. Learn the basic fixed and variable windows first.</p>
      </>
    ),
  },
  {
    title: '10. When Sliding Window Does NOT Work',
    content: (
      <>
        <p>Do not blindly use variable-size sliding window for every sum problem.</p>
        <ul>
          <li>For sum-based shrinking windows, the standard approach usually relies on non-negative elements.</li>
          <li>With negative numbers, expanding the window may decrease the sum, so the usual grow/shrink logic can fail.</li>
          <li>For many negative-number subarray-sum problems, prefix sums with a HashMap or other techniques are more appropriate.</li>
          <li>Subsequence problems are not necessarily sliding-window problems because a subsequence does not have to be contiguous.</li>
        </ul>
        <p><strong>Interview tip:</strong> Always check whether the problem asks for a contiguous subarray or substring and whether the window condition behaves predictably as the window grows or shrinks.</p>
      </>
    ),
  },
  {
    title: '11. Complexity Analysis',
    content: (
      <>
        <table>
          <thead><tr><th>Approach</th><th>Time</th><th>Extra space</th></tr></thead>
          <tbody>
            <tr><td>Brute force fixed window</td><td>O(n × k)</td><td>O(1)</td></tr>
            <tr><td>Optimized fixed window</td><td>O(n)</td><td>O(1)</td></tr>
            <tr><td>Variable window</td><td>O(n)</td><td>Usually O(1)</td></tr>
            <tr><td>Window with HashMap</td><td>Usually O(n) average</td><td>O(k) or O(character set)</td></tr>
            <tr><td>Window maximum using deque</td><td>O(n)</td><td>O(k)</td></tr>
          </tbody>
        </table>
        <p>Why is the variable-window approach O(n), even though it has a nested while loop? Because left and right each move forward at most n times. The total number of pointer movements is bounded by approximately 2n.</p>
      </>
    ),
  },
  {
    title: '12. Common Mistakes and Edge Cases',
    content: (
      <>
        <ul>
          <li>Forgetting to validate k when it is larger than the array length.</li>
          <li>Using <code>if</code> instead of <code>while</code> when the window may need to shrink several times.</li>
          <li>Calculating window length incorrectly: use <code>right - left + 1</code>.</li>
          <li>Moving left backwards when handling repeated characters.</li>
          <li>Assuming a sum-based sliding window works with negative numbers.</li>
          <li>Not handling empty arrays or strings.</li>
          <li>Using int when the sum may exceed the int range; use long when needed.</li>
          <li>Confusing a substring (contiguous) with a subsequence (not necessarily contiguous).</li>
        </ul>
        <p>Always test: empty input, one element, k = 1, k = n, all equal values, negative values where allowed, and no valid answer.</p>
      </>
    ),
  },
  {
    title: '13. Interview Problem Patterns',
    content: (
      <>
        <h4>Beginner</h4>
        <ul>
          <li>Maximum sum of subarray of size K.</li>
          <li>Average of all subarrays of size K.</li>
          <li>First negative number in every window of size K.</li>
        </ul>
        <h4>Intermediate</h4>
        <ul>
          <li>Longest substring without repeating characters.</li>
          <li>Minimum size subarray sum.</li>
          <li>Find all anagrams in a string.</li>
          <li>Permutation in string.</li>
        </ul>
        <h4>Advanced</h4>
        <ul>
          <li>Sliding Window Maximum.</li>
          <li>Minimum Window Substring.</li>
          <li>Longest repeating character replacement.</li>
          <li>Subarrays with K different integers.</li>
        </ul>
        <p>For each problem, identify the window, the information to maintain, the condition for shrinking, and when to update the answer.</p>
      </>
    ),
  },
  {
    title: '14. Interview Questions',
    content: (
      <>
        <ol>
          <li>What is the Sliding Window technique?</li>
          <li>What is the difference between fixed and variable windows?</li>
          <li>Why is an optimized fixed window O(n)?</li>
          <li>Why can a nested while loop still give O(n) complexity?</li>
          <li>When should you use a HashMap inside a window?</li>
          <li>Why can negative numbers break a sum-based variable window?</li>
          <li>How do you find the maximum of every window in O(n)?</li>
          <li>What is the difference between a substring and a subsequence?</li>
          <li>Why do we use right - left + 1 for window length?</li>
          <li>How do you prevent the left pointer from moving backwards?</li>
        </ol>
      </>
    ),
  },
];

export default function SlidingWindowLesson({ onBack }) {
  const [completed, setCompleted] = useState([]);
  const [expanded, setExpanded] = useState(0);

  const toggleCompleted = (index) => {
    setCompleted((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  const progress = Math.round(
    (completed.length / sections.length) * 100
  );

  return (
    <div style={{ maxWidth: 950, margin: '0 auto', padding: '24px 16px' }}>
      <button type="button" onClick={onBack}>
        ← Back to DSA Topics
      </button>

      <div style={{ margin: '24px 0' }}>
        <p>DSA / Problem-Solving Patterns</p>
        <h1>Sliding Window</h1>
        <p>
          Learn how to solve contiguous subarray and substring
          problems efficiently by maintaining a moving window.
        </p>
        <p>
          <strong>{completed.length} / {sections.length}</strong>
          {' '}sections completed · {progress}%
        </p>
        <div style={{
          height: 8,
          background: '#e5e7eb',
          borderRadius: 20,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: '#16a34a',
            transition: 'width 0.2s',
          }} />
        </div>
      </div>

      {sections.map((section, index) => (
        <section
          key={section.title}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: 10,
            padding: 18,
            marginBottom: 14,
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}>
            <button
              type="button"
              onClick={() => setExpanded(
                expanded === index ? -1 : index
              )}
              style={{
                border: 0,
                background: 'transparent',
                textAlign: 'left',
                fontSize: 17,
                fontWeight: 700,
                cursor: 'pointer',
                flex: 1,
                padding: 0,
              }}
            >
              {expanded === index ? '▼' : '▶'} {section.title}
            </button>

            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              whiteSpace: 'nowrap',
            }}>
              <input
                type="checkbox"
                checked={completed.includes(index)}
                onChange={() => toggleCompleted(index)}
              />
              Completed
            </label>
          </div>

          {expanded === index && (
            <div style={{
              marginTop: 18,
              lineHeight: 1.7,
              overflowX: 'auto',
            }}>
              {section.content}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
