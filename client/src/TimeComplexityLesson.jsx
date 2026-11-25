
function TimeComplexityLesson({ onBack }) {
  return (
    <div className="dsa-lesson">
      <button
        type="button"
        className="secondary-button"
        onClick={onBack}
      >
        ← Back to DSA
      </button>

      <h1>Time and Space Complexity</h1>

      <p>
        Complexity analysis helps us understand how an algorithm's
        resource usage grows when the input size increases.
      </p>

      <section>
        <h2>1. What is Time Complexity?</h2>

        <p>
          Time complexity describes how the number of operations
          performed by an algorithm grows with input size n.
        </p>

        <p>
          We usually do not measure exact seconds because execution
          time depends on the computer, programming language,
          compiler, and other factors.
        </p>

        <h3>Example</h3>

        <pre className="dsa-code">
{`for (int i = 0; i < n; i++) {
    System.out.println(i);
}`}
        </pre>

        <p>
          The loop runs n times. Therefore, its time complexity
          is O(n).
        </p>
      </section>

      <section>
        <h2>2. What is Space Complexity?</h2>

        <p>
          Space complexity describes how memory usage grows
          with input size.
        </p>

        <h3>Auxiliary Space</h3>

        <p>
          Auxiliary space is the extra memory used by an algorithm,
          excluding the input storage itself.
        </p>

        <h3>Example</h3>

        <pre className="dsa-code">
{`int sum = 0;

for (int i = 0; i < n; i++) {
    sum += i;
}`}
        </pre>

        <p>
          Only a few variables are used, regardless of n.
          Auxiliary space is O(1).
        </p>
      </section>

      <section>
        <h2>3. Asymptotic Notations</h2>

        <h3>Big-O: O()</h3>

        <p>
          Describes an asymptotic upper bound. It is commonly
          used to express worst-case growth.
        </p>

        <h3>Big-Omega: Ω()</h3>

        <p>
          Describes an asymptotic lower bound.
        </p>

        <h3>Big-Theta: Θ()</h3>

        <p>
          Describes a tight asymptotic bound when the upper
          and lower bounds match.
        </p>

        <p>
          Important: Big-O is not automatically the worst case.
          We can analyze best, average, or worst-case behavior
          using appropriate bounds.
        </p>
      </section>

      <section>
        <h2>4. Common Complexity Classes</h2>

        <ul>
          <li>O(1) - Constant</li>
          <li>O(log n) - Logarithmic</li>
          <li>O(n) - Linear</li>
          <li>O(n log n) - Linearithmic</li>
          <li>O(n²) - Quadratic</li>
          <li>O(n³) - Cubic</li>
          <li>O(2ⁿ) - Exponential</li>
          <li>O(n!) - Factorial</li>
        </ul>

        <p>
          For large inputs, polynomial and exponential differences
          become significant. O(2ⁿ) and O(n!) usually become
          impractical much faster than O(n²).
        </p>
      </section>

      <section>
        <h2>5. O(1) - Constant Time</h2>

        <pre className="dsa-code">
{`int getFirst(int[] arr) {
    return arr[0];
}`}
        </pre>

        <p>
          Accessing the first array element takes constant time.
          The operation count does not grow with array length.
        </p>

        <p><strong>Time:</strong> O(1)</p>
        <p><strong>Auxiliary space:</strong> O(1)</p>

        <p>
          Note: This assumes the array is non-empty and the
          operation is ordinary array indexing.
        </p>
      </section>

      <section>
        <h2>6. O(n) - Linear Time</h2>

        <pre className="dsa-code">
{`int sum(int[] arr) {
    int total = 0;

    for (int i = 0; i < arr.length; i++) {
        total += arr[i];
    }

    return total;
}`}
        </pre>

        <p>
          If the array contains n elements, the loop visits
          every element once.
        </p>

        <p><strong>Time:</strong> O(n)</p>
        <p><strong>Auxiliary space:</strong> O(1)</p>
      </section>

      <section>
        <h2>7. O(n²) - Quadratic Time</h2>

        <pre className="dsa-code">
{`void printPairs(int[] arr) {
    int n = arr.length;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            System.out.println(arr[i] + ", " + arr[j]);
        }
    }
}`}
        </pre>

        <p>
          The outer loop runs n times. For each outer iteration,
          the inner loop also runs n times.
        </p>

        <p>
          Total operations: n × n = n².
        </p>

        <p><strong>Time:</strong> O(n²)</p>
        <p><strong>Auxiliary space:</strong> O(1)</p>
      </section>

      <section>
        <h2>8. Sequential Loops</h2>

        <pre className="dsa-code">
{`for (int i = 0; i < n; i++) {
    System.out.println(i);
}

for (int j = 0; j < n; j++) {
    System.out.println(j);
}`}
        </pre>

        <p>
          First loop: O(n)
        </p>

        <p>
          Second loop: O(n)
        </p>

        <p>
          Total: O(n + n) = O(2n) = O(n)
        </p>

        <p>
          We drop constant factors in asymptotic notation.
        </p>
      </section>

      <section>
        <h2>9. Nested Loops with Different Bounds</h2>

        <pre className="dsa-code">
{`for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
        System.out.println(i + " " + j);
    }
}`}
        </pre>

        <p>
          Inner loop runs:
        </p>

        <ul>
          <li>0 times when i = 0</li>
          <li>1 time when i = 1</li>
          <li>2 times when i = 2</li>
          <li>... up to n - 1 times</li>
        </ul>

        <p>
          Total = 0 + 1 + 2 + ... + (n - 1)
        </p>

        <p>
          Total = n(n - 1) / 2
        </p>

        <p><strong>Time:</strong> O(n²)</p>
      </section>

      <section>
        <h2>10. O(log n) - Logarithmic Time</h2>

        <pre className="dsa-code">
{`int n = 100;

while (n > 1) {
    n = n / 2;
}`}
        </pre>

        <p>
          Each iteration divides n by 2.
        The number of iterations is approximately log₂(n).
        </p>

        <p><strong>Time:</strong> O(log n)</p>

        <h3>Why?</h3>

        <p>
          After k iterations:
        </p>

        <p>
          n / 2ᵏ = 1
        </p>

        <p>
          Therefore:
        </p>

        <p>
          k = log₂(n)
        </p>
      </section>

      <section>
        <h2>11. O(n log n)</h2>

        <pre className="dsa-code">
{`for (int i = 0; i < n; i++) {
    int j = n;

    while (j > 1) {
        j = j / 2;
    }
}`}
        </pre>

        <p>
          Outer loop: O(n)
        </p>

        <p>
          Inner loop: O(log n)
        </p>

        <p>
          Total: O(n log n)
        </p>

        <p>
          This complexity commonly appears in efficient sorting
          algorithms such as Merge Sort and Heap Sort.
        </p>
      </section>

      <section>
        <h2>12. Drop Constants and Lower Terms</h2>

        <ul>
          <li>O(3n) becomes O(n)</li>
          <li>O(n + 10) becomes O(n)</li>
          <li>O(n² + n) becomes O(n²)</li>
          <li>O(5n² + 3n + 7) becomes O(n²)</li>
        </ul>

        <p>
          We focus on the dominant term as n grows.
        </p>
      </section>

      <section>
        <h2>13. Best, Average, and Worst Case</h2>

        <h3>Linear Search</h3>

        <pre className="dsa-code">
{`int search(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }

    return -1;
}`}
        </pre>

        <ul>
          <li>
            Best case: target is first - O(1)
          </li>
          <li>
            Worst case: target is last or absent - O(n)
          </li>
          <li>
            Average case: typically O(n) for a uniformly
            distributed target position
          </li>
        </ul>
      </section>

      <section>
        <h2>14. Recursion and Space Complexity</h2>

        <pre className="dsa-code">
{`int factorial(int n) {
    if (n <= 1) {
        return 1;
    }

    return n * factorial(n - 1);
}`}
        </pre>

        <p>
          The function calls itself until n reaches 1.
        There are n recursive calls in the call chain.
        </p>

        <p><strong>Time:</strong> O(n)</p>
        <p><strong>Auxiliary space:</strong> O(n)</p>

        <p>
          Each recursive call occupies stack space until it
          returns. This is called the call stack.
        </p>
      </section>

      <section>
        <h2>15. Recursion with O(log n) Stack Space</h2>

        <pre className="dsa-code">
{`void divide(int n) {
    if (n <= 1) {
        return;
    }

    divide(n / 2);
}`}
        </pre>

        <p>
          The input is divided by 2 at every call.
        The recursion depth is log₂(n).
        </p>

        <p><strong>Time:</strong> O(log n)</p>
        <p><strong>Auxiliary space:</strong> O(log n)</p>
      </section>

      <section>
        <h2>16. Input Space vs Auxiliary Space</h2>

        <pre className="dsa-code">
{`int[] copyArray(int[] arr) {
    int[] copy = new int[arr.length];

    for (int i = 0; i < arr.length; i++) {
        copy[i] = arr[i];
    }

    return copy;
}`}
        </pre>

        <p>
          Input array: O(n)
        </p>

        <p>
          Extra array: O(n)
        </p>

        <p>
          Auxiliary space: O(n)
        </p>

        <p>
          If counting total memory including input, it is also
          O(n) because O(n) + O(n) = O(2n) = O(n).
        </p>
      </section>

      <section>
        <h2>17. Complexity Analysis Checklist</h2>

        <ol>
          <li>Identify the input size n.</li>
          <li>Count how many times each loop runs.</li>
          <li>For nested loops, multiply or sum based on bounds.</li>
          <li>For sequential blocks, add their costs.</li>
          <li>For halving or doubling, look for logarithms.</li>
          <li>For recursion, analyze calls and stack depth.</li>
          <li>Count extra arrays and data structures.</li>
          <li>Keep the dominant term.</li>
        </ol>
      </section>

      <section>
        <h2>18. Interview Questions</h2>

        <ol>
          <li>What is time complexity?</li>
          <li>What is auxiliary space?</li>
          <li>Difference between O, Ω, and Θ?</li>
          <li>Why is O(2n) simplified to O(n)?</li>
          <li>What is the complexity of two nested loops?</li>
          <li>Why does repeatedly dividing by 2 give O(log n)?</li>
          <li>What is the difference between iterative and recursive space?</li>
          <li>Can an algorithm have O(n) time and O(1) space?</li>
          <li>What is the complexity of binary search?</li>
          <li>Why is Merge Sort O(n log n)?</li>
        </ol>
      </section>
    </div>
  );
}

export default TimeComplexityLesson;
