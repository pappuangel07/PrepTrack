

const pageStyle = {
  padding: '20px',
  maxWidth: '1000px',
  margin: '0 auto',
  lineHeight: 1.7,
};

const cardStyle = {
  background: 'var(--card-bg, #ffffff)',
  border: '1px solid var(--border-color, #e5e7eb)',
  borderRadius: '12px',
  padding: '18px',
  marginBottom: '16px',
};

const headingStyle = {
  fontSize: '1.25rem',
  fontWeight: 700,
  marginBottom: '12px',
};

function Code({ lines }) {
  return (
    <pre
      style={{
        background: 'var(--code-bg, #f5f5f5)',
        padding: '14px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: 1.6,
      }}
    >
      <code>{lines.join('\n')}</code>
    </pre>
  );
}

function Section({ title, children }) {
  return (
    <section style={cardStyle}>
      <h2 style={headingStyle}>{title}</h2>
      {children}
    </section>
  );
}

export default function MonotonicStackQueueLesson({ onBack }) {
  return (
    <div style={pageStyle}>
      <button onClick={onBack} style={{ marginBottom: '16px' }}>
        ← Back to DSA
      </button>

      <h1>Monotonic Stack & Queue Applications</h1>
      <p>Advanced Patterns • Java • Interview Preparation</p>

      <Section title="1. What is a Monotonic Stack?">
        <p>
          A monotonic stack is a stack whose elements are maintained
          in either increasing or decreasing order.
        </p>
        <p>
          When a new element arrives, we remove elements from the top
          that violate the required order.
        </p>
        <ul>
          <li>Monotonic increasing stack: values increase from bottom to top.</li>
          <li>Monotonic decreasing stack: values decrease from bottom to top.</li>
        </ul>
        <p>
          Monotonic stacks are useful when we need the nearest greater
          or smaller element on the left or right.
        </p>
      </Section>

      <Section title="2. Why Use a Monotonic Stack?">
        <p>
          A brute-force solution may compare each element with every
          element to its right, taking O(n²) time.
        </p>
        <p>
          A monotonic stack can often solve the same problem in O(n)
          time because each element is pushed and popped at most once.
        </p>
        <p>
          The key idea is to remove elements that can no longer be
          answers for future positions.
        </p>
      </Section>

      <Section title="3. Increasing vs Decreasing Stack">
        <p>
          <strong>Monotonic increasing:</strong> Keep values in
          increasing order from bottom to top.
        </p>
        <Code lines={[
          'while (!stack.isEmpty()',
          '       && stack.peek() > current) {',
          '    stack.pop();',
          '}',
        ]} />
        <p>
          <strong>Monotonic decreasing:</strong> Keep values in
          decreasing order from bottom to top.
        </p>
        <Code lines={[
          'while (!stack.isEmpty()',
          '       && stack.peek() < current) {',
          '    stack.pop();',
          '}',
        ]} />
        <p>
          The comparison operator depends on whether the problem asks
          for strictly greater, greater-or-equal, strictly smaller,
          or smaller-or-equal values.
        </p>
      </Section>

      <Section title="4. Next Greater Element to the Right">
        <p>
          For every element, find the first element to its right that
          is strictly greater.
        </p>
        <p>Example:</p>
        <Code lines={[
          'arr = [2, 1, 5, 3]',
          '',
          'Next greater = [5, 5, -1, -1]',
        ]} />
        <p>
          Process the array from right to left.
        </p>
        <ol>
          <li>Remove stack elements less than or equal to current.</li>
          <li>The remaining top is the next greater element.</li>
          <li>Push current onto the stack.</li>
        </ol>
        <Code lines={[
          'int[] nextGreaterRight(int[] arr) {',
          '    int n = arr.length;',
          '    int[] answer = new int[n];',
          '    java.util.Stack<Integer> stack =',
          '        new java.util.Stack<>();',
          '',
          '    for (int i = n - 1; i >= 0; i--) {',
          '        while (!stack.isEmpty()',
          '                && stack.peek() <= arr[i]) {',
          '            stack.pop();',
          '        }',
          '',
          '        answer[i] = stack.isEmpty()',
          '                ? -1 : stack.peek();',
          '        stack.push(arr[i]);',
          '    }',
          '',
          '    return answer;',
          '}',
        ]} />
        <p>
          Time: O(n). Space: O(n).
        </p>
      </Section>

      <Section title="5. Next Greater Element to the Left">
        <p>
          To find the nearest greater element on the left, process
          from left to right.
        </p>
        <Code lines={[
          'for (int i = 0; i < n; i++) {',
          '    while (!stack.isEmpty()',
          '            && stack.peek() <= arr[i]) {',
          '        stack.pop();',
          '    }',
          '',
          '    answer[i] = stack.isEmpty()',
          '            ? -1 : stack.peek();',
          '',
          '    stack.push(arr[i]);',
          '}',
        ]} />
        <p>
          The stack contains candidates from earlier positions.
          Removing smaller or equal values leaves the nearest valid
          greater candidate at the top.
        </p>
      </Section>

      <Section title="6. Next Smaller Element">
        <p>
          For the next strictly smaller element to the right, process
          from right to left and remove values greater than or equal
          to the current value.
        </p>
        <Code lines={[
          'while (!stack.isEmpty()',
          '       && stack.peek() >= arr[i]) {',
          '    stack.pop();',
          '}',
          '',
          'answer[i] = stack.isEmpty()',
          '        ? -1 : stack.peek();',
          '',
          'stack.push(arr[i]);',
        ]} />
        <p>
          The comparison is reversed because we are looking for a
          smaller value.
        </p>
      </Section>

      <Section title="7. Store Indices or Values?">
        <p>
          A monotonic stack can store values or indices.
        </p>
        <ul>
          <li>
            Store values when only the next greater or smaller value
            is required.
          </li>
          <li>
            Store indices when the distance, position, or width is
            required.
          </li>
          <li>
            Store indices when duplicate values must be distinguished.
          </li>
        </ul>
        <p>
          Many interview problems are easier with indices because
          arr[stack.peek()] gives the corresponding value.
        </p>
      </Section>

      <Section title="8. Stock Span Problem">
        <p>
          For each day, stock span is the number of consecutive days
          ending today whose prices are less than or equal to today's
          price.
        </p>
        <Code lines={[
          'prices = [100, 80, 60, 70, 60, 75, 85]',
          '',
          'span =   [1,   1,  1,  2,  1,  4,  6]',
        ]} />
        <p>
          Maintain a decreasing stack of indices. Pop previous prices
          that are less than or equal to the current price.
        </p>
        <Code lines={[
          'int[] stockSpan(int[] prices) {',
          '    int n = prices.length;',
          '    int[] span = new int[n];',
          '    java.util.Stack<Integer> stack =',
          '        new java.util.Stack<>();',
          '',
          '    for (int i = 0; i < n; i++) {',
          '        while (!stack.isEmpty()',
          '                && prices[stack.peek()] <= prices[i]) {',
          '            stack.pop();',
          '        }',
          '',
          '        span[i] = stack.isEmpty()',
          '                ? i + 1 : i - stack.peek();',
          '',
          '        stack.push(i);',
          '    }',
          '',
          '    return span;',
          '}',
        ]} />
        <p>
          Time: O(n) total. Each index is pushed and popped at most once.
        </p>
      </Section>

      <Section title="9. Largest Rectangle in Histogram">
        <p>
          Each histogram bar has a height. Find the largest rectangle
          that can be formed using consecutive bars.
        </p>
        <Code lines={[
          'heights = [2, 1, 5, 6, 2, 3]',
          'Largest rectangle area = 10',
        ]} />
        <p>
          For each bar, find the first smaller bar on the left and
          the first smaller bar on the right.
        </p>
        <p>
          If current index is i:
        </p>
        <Code lines={[
          'width = rightSmaller - leftSmaller - 1',
          'area = heights[i] * width',
        ]} />
        <p>
          Use a stack of indices with increasing heights. When a
          smaller height arrives, pop bars and calculate their areas.
        </p>
        <Code lines={[
          'int largestRectangleArea(int[] heights) {',
          '    int n = heights.length;',
          '    java.util.Stack<Integer> stack =',
          '        new java.util.Stack<>();',
          '    int maxArea = 0;',
          '',
          '    for (int i = 0; i <= n; i++) {',
          '        int current = i == n ? 0 : heights[i];',
          '',
          '        while (!stack.isEmpty()',
          '                && heights[stack.peek()] > current) {',
          '            int height = heights[stack.pop()];',
          '',
          '            int leftSmaller = stack.isEmpty()',
          '                    ? -1 : stack.peek();',
          '            int width = i - leftSmaller - 1;',
          '',
          '            maxArea = Math.max(maxArea, height * width);',
          '        }',
          '',
          '        stack.push(i);',
          '    }',
          '',
          '    return maxArea;',
          '}',
        ]} />
        <p>
          The extra iteration at i == n uses height 0 to flush the
          remaining bars from the stack.
        </p>
        <p>
          Time: O(n). Space: O(n).
        </p>
      </Section>

      <Section title="10. Trapping Rain Water">
        <p>
          Water trapped above a bar depends on the tallest boundary
          on its left and right.
        </p>
        <p>
          A monotonic decreasing stack can calculate trapped water
          when a right boundary is discovered.
        </p>
        <Code lines={[
          'int trap(int[] height) {',
          '    java.util.Stack<Integer> stack =',
          '        new java.util.Stack<>();',
          '    int water = 0;',
          '',
          '    for (int i = 0; i < height.length; i++) {',
          '        while (!stack.isEmpty()',
          '                && height[i] > height[stack.peek()]) {',
          '            int bottom = stack.pop();',
          '',
          '            if (stack.isEmpty()) {',
          '                break;',
          '            }',
          '',
          '            int left = stack.peek();',
          '            int width = i - left - 1;',
          '            int boundedHeight = Math.min(',
          '                    height[left], height[i]) - height[bottom];',
          '',
          '            water += width * boundedHeight;',
          '        }',
          '',
          '        stack.push(i);',
          '    }',
          '',
          '    return water;',
          '}',
        ]} />
        <p>
          The popped bar is the bottom of a possible water container.
          The new stack top is the left boundary, and i is the right
          boundary.
        </p>
        <p>
          Time: O(n). Space: O(n).
        </p>
      </Section>

      <Section title="11. What is a Monotonic Queue?">
        <p>
          A monotonic queue is commonly implemented using a deque.
          It maintains candidates in increasing or decreasing order
          while elements enter and leave a sliding window.
        </p>
        <p>
          A decreasing deque is useful for finding the maximum value
          in every sliding window.
        </p>
        <p>
          The deque stores indices, not just values, so expired
          elements can be removed from the front.
        </p>
      </Section>

      <Section title="12. Sliding Window Maximum">
        <p>
          Given an array and window size k, find the maximum in every
          consecutive window of size k.
        </p>
        <Code lines={[
          'arr = [1, 3, -1, -3, 5, 3, 6, 7]',
          'k = 3',
          '',
          'answer = [3, 3, 5, 5, 6, 7]',
        ]} />
        <p>
          Maintain a deque of indices whose values are decreasing
          from front to back.
        </p>
        <ol>
          <li>Remove indices that are outside the current window.</li>
          <li>Remove indices from the back whose values are less than
            or equal to the current value.</li>
          <li>Add the current index.</li>
          <li>The front index is the current window maximum.</li>
        </ol>
        <Code lines={[
          'int[] maxSlidingWindow(int[] nums, int k) {',
          '    if (nums.length == 0 || k <= 0) {',
          '        return new int[0];',
          '    }',
          '',
          '    int n = nums.length;',
          '    int[] result = new int[n - k + 1];',
          '    java.util.Deque<Integer> deque =',
          '        new java.util.ArrayDeque<>();',
          '',
          '    for (int i = 0; i < n; i++) {',
          '        while (!deque.isEmpty()',
          '                && deque.peekFirst() <= i - k) {',
          '            deque.pollFirst();',
          '        }',
          '',
          '        while (!deque.isEmpty()',
          '                && nums[deque.peekLast()] <= nums[i]) {',
          '            deque.pollLast();',
          '        }',
          '',
          '        deque.offerLast(i);',
          '',
          '        if (i >= k - 1) {',
          '            result[i - k + 1] = nums[deque.peekFirst()];',
          '        }',
          '    }',
          '',
          '    return result;',
          '}',
        ]} />
        <p>
          Time: O(n). Space: O(k) for the deque, excluding the output.
        </p>
      </Section>

      <Section title="13. Sliding Window Minimum">
        <p>
          To find the minimum in every sliding window, maintain an
          increasing deque instead.
        </p>
        <Code lines={[
          'while (!deque.isEmpty()',
          '        && nums[deque.peekLast()] >= nums[i]) {',
          '    deque.pollLast();',
          '}',
        ]} />
        <p>
          The front index then stores the minimum of the current window.
        </p>
      </Section>

      <Section title="14. Sum of Subarray Minimums">
        <p>
          This problem asks for the sum of the minimum value of every
          possible subarray.
        </p>
        <p>
          Instead of enumerating all subarrays, calculate how many
          subarrays use each element as their minimum.
        </p>
        <p>
          For index i:
        </p>
        <Code lines={[
          'leftCount = i - previousSmallerIndex',
          'rightCount = nextSmallerIndex - i',
          '',
          'contribution = arr[i] * leftCount * rightCount',
        ]} />
        <p>
          Use a monotonic stack to find the previous and next smaller
          boundaries.
        </p>
        <p>
          Duplicate values need careful tie-breaking. A common approach
          is to find the previous strictly smaller element and the
          next smaller-or-equal element, so each subarray is counted
          exactly once.
        </p>
      </Section>

      <Section title="15. Sum of Subarray Maximums">
        <p>
          This is the corresponding problem for maximum values.
        </p>
        <p>
          For each index, calculate the number of subarrays where
          arr[i] is the maximum.
        </p>
        <Code lines={[
          'contribution = arr[i]',
          '             * leftChoices',
          '             * rightChoices',
        ]} />
        <p>
          Use previous greater and next greater boundaries, with a
          consistent duplicate-handling rule.
        </p>
      </Section>

      <Section title="16. Remove K Digits">
        <p>
          Given a number as a string, remove k digits to produce the
          smallest possible number.
        </p>
        <p>
          Use a monotonic increasing stack of digits.
        </p>
        <Code lines={[
          'while (k > 0 && !stack.isEmpty()',
          '        && stack.peek() > digit) {',
          '    stack.pop();',
          '    k--;',
          '}',
          '',
          'stack.push(digit);',
        ]} />
        <p>
          Removing a larger digit before a smaller digit makes the
          resulting number smaller.
        </p>
        <p>
          After processing all digits, remove any remaining k digits
          from the end. Then remove leading zeros.
        </p>
      </Section>

      <Section title="17. Lexicographically Smallest Subsequence">
        <p>
          A monotonic stack can help build a subsequence that is
          lexicographically smallest while satisfying required
          frequency or uniqueness constraints.
        </p>
        <p>
          The general pattern is:
        </p>
        <ul>
          <li>Track which elements remain available.</li>
          <li>Track which elements are already in the stack.</li>
          <li>Pop a larger element if it can safely appear later.</li>
          <li>Push the current element if it is not already included.</li>
        </ul>
        <p>
          This pattern appears in problems such as removing duplicate
          letters to obtain the smallest result.
        </p>
      </Section>

      <Section title="18. Complexity: Why O(n)?">
        <p>
          A nested while loop may look like O(n²), but monotonic stack
          algorithms are often O(n).
        </p>
        <p>
          Each element:
        </p>
        <ul>
          <li>Is pushed onto the stack at most once.</li>
          <li>Is popped from the stack at most once.</li>
        </ul>
        <p>
          Therefore, across the entire algorithm, the total number
          of stack operations is O(n).
        </p>
        <p>
          This is called <strong>amortized analysis</strong>.
        </p>
      </Section>

      <Section title="19. Choosing the Correct Comparison">
        <p>
          Strict and non-strict comparisons affect duplicate values.
        </p>
        <Code lines={[
          'Next strictly greater:',
          'pop while top <= current',
          '',
          'Next greater or equal:',
          'pop while top < current',
          '',
          'Next strictly smaller:',
          'pop while top >= current',
          '',
          'Next smaller or equal:',
          'pop while top > current',
        ]} />
        <p>
          Do not copy the comparison operator blindly. Read whether
          the problem says greater, greater-or-equal, smaller, or
          smaller-or-equal.
        </p>
      </Section>

      <Section title="20. Common Mistakes">
        <ul>
          <li>Using a normal stack when a deque is needed for both ends.</li>
          <li>Storing values when indices are required for distance or width.</li>
          <li>Using the wrong comparison for duplicate values.</li>
          <li>Forgetting to remove expired sliding-window indices.</li>
          <li>Calculating histogram width incorrectly.</li>
          <li>Forgetting to flush the stack at the end of histogram processing.</li>
          <li>Assuming a nested while loop automatically means O(n²).</li>
          <li>Not considering empty input or k greater than array length.</li>
        </ul>
      </Section>

      <Section title="21. Pattern Recognition">
        <p>
          Monotonic stack or queue may be useful when a problem asks:
        </p>
        <ul>
          <li>Nearest greater or smaller element.</li>
          <li>First greater element on the left or right.</li>
          <li>Maximum or minimum in every sliding window.</li>
          <li>Largest rectangle in a histogram.</li>
          <li>How many subarrays use an element as minimum or maximum.</li>
          <li>Remove digits to make a number smallest or largest.</li>
        </ul>
      </Section>

      <Section title="22. Interview Questions">
        <ol>
          <li>What is a monotonic stack?</li>
          <li>Explain next greater element using a stack.</li>
          <li>Why is next greater element O(n)?</li>
          <li>Explain stock span.</li>
          <li>How do you solve largest rectangle in histogram?</li>
          <li>How does a monotonic deque solve sliding window maximum?</li>
          <li>Why do we store indices in sliding window problems?</li>
          <li>How do duplicates affect subarray minimum contribution?</li>
          <li>Explain amortized analysis for a monotonic stack.</li>
          <li>When should you use a deque instead of a stack?</li>
        </ol>
      </Section>

      <Section title="23. Practice Problems">
        <ol>
          <li>Next Greater Element I</li>
          <li>Next Greater Element II</li>
          <li>Daily Temperatures</li>
          <li>Stock Span</li>
          <li>Largest Rectangle in Histogram</li>
          <li>Trapping Rain Water</li>
          <li>Sliding Window Maximum</li>
          <li>Sum of Subarray Minimums</li>
          <li>Sum of Subarray Ranges</li>
          <li>Remove K Digits</li>
          <li>132 Pattern</li>
          <li>Remove Duplicate Letters</li>
        </ol>
      </Section>

      <Section title="24. Quick Revision">
        <Code lines={[
          'Monotonic Stack:',
          'Increasing or decreasing order',
          '',
          'Next greater right:',
          'Traverse right to left',
          'Pop <= current',
          '',
          'Next smaller right:',
          'Traverse right to left',
          'Pop >= current',
          '',
          'Histogram:',
          'Increasing stack of indices',
          'area = height * width',
          '',
          'Sliding window maximum:',
          'Decreasing deque of indices',
          'Remove expired indices from front',
          'Remove smaller values from back',
          '',
          'Complexity:',
          'Usually O(n) time and O(n) space',
        ]} />
      </Section>
    </div>
  );
}
