
const pageStyle = {
  minHeight: '100vh',
  padding: '24px',
  background: 'var(--bg, #f8fafc)',
  color: 'var(--text, #172033)',
};

const cardStyle = {
  padding: '20px',
  marginBottom: '16px',
  borderRadius: '14px',
  border: '1px solid var(--border, #e2e8f0)',
  background: 'var(--card, #ffffff)',
};

const headingStyle = {
  marginTop: 0,
  marginBottom: '12px',
};

function Code({ lines }) {
  return (
    <pre
      style={{
        overflowX: 'auto',
        padding: '16px',
        borderRadius: '10px',
        background: '#111827',
        color: '#e5e7eb',
        fontSize: '13px',
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

export default function DynamicProgrammingLesson({ onBack }) {
  return (
    <div style={pageStyle}>
      <button
        onClick={onBack}
        style={{
          marginBottom: '20px',
          padding: '10px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        ← Back to DSA
      </button>

      <h1>Dynamic Programming</h1>
      <p>
        Dynamic Programming (DP) solves problems by breaking them into
        smaller overlapping subproblems and storing their results.
      </p>

      <Section title="1. What is Dynamic Programming?">
        <p>
          In normal recursion, the same subproblem may be solved many times.
          DP stores the answer so that each state is computed only once.
        </p>
        <p>
          DP is commonly useful when a problem has:
        </p>
        <ul>
          <li><strong>Overlapping subproblems:</strong> the same smaller problems appear repeatedly.</li>
          <li><strong>Optimal substructure:</strong> an optimal answer can be built from optimal answers to smaller states.</li>
        </ul>
        <p>
          DP is not a single algorithm. It is a problem-solving technique
          used in counting, optimization, decision, and sequence problems.
        </p>
      </Section>

      <Section title="2. Recursion Without DP">
        <p>
          Fibonacci numbers are defined as:
        </p>
        <p><strong>F(n) = F(n - 1) + F(n - 2)</strong></p>
        <p>
          With naive recursion, F(5) repeatedly calculates values such as
          F(3), F(2), and F(1).
        </p>
        <Code lines={[
          "static int fib(int n) {",
          "    if (n <= 1) return n;",
          "    return fib(n - 1) + fib(n - 2);",
          "}"
        ]} />
        <p>
          Naive Fibonacci recursion takes exponential time, approximately
          O(2ⁿ), because many calls repeat the same work.
        </p>
      </Section>

      <Section title="3. Memoization: Top-Down DP">
        <p>
          Memoization uses recursion and a cache. Before solving a state,
          check whether its answer has already been stored.
        </p>
        <Code lines={[
          "static int fib(int n, int[] dp) {",
          "    if (n <= 1) return n;",
          "",
          "    if (dp[n] != -1) return dp[n];",
          "",
          "    dp[n] = fib(n - 1, dp) + fib(n - 2, dp);",
          "    return dp[n];",
          "}",
          "",
          "int n = 10;",
          "int[] dp = new int[n + 1];",
          "Arrays.fill(dp, -1);",
          "int answer = fib(n, dp);"
        ]} />
        <p>
          Each state from 0 to n is computed once.
        </p>
        <p><strong>Time:</strong> O(n).</p>
        <p><strong>Space:</strong> O(n) cache + O(n) recursion stack.</p>
        <p>
          Top-down means the recursion starts from the requested answer
          and moves toward smaller states.
        </p>
      </Section>

      <Section title="4. Tabulation: Bottom-Up DP">
        <p>
          Tabulation removes recursion. Solve the smallest states first,
          then build larger states using already-computed values.
        </p>
        <Code lines={[
          "static int fib(int n) {",
          "    if (n <= 1) return n;",
          "",
          "    int[] dp = new int[n + 1];",
          "    dp[0] = 0;",
          "    dp[1] = 1;",
          "",
          "    for (int i = 2; i <= n; i++) {",
          "        dp[i] = dp[i - 1] + dp[i - 2];",
          "    }",
          "",
          "    return dp[n];",
          "}"
        ]} />
        <p><strong>Time:</strong> O(n).</p>
        <p><strong>Space:</strong> O(n).</p>
        <p>
          Bottom-up DP often makes the dependency order easier to see.
        </p>
      </Section>

      <Section title="5. Space Optimization">
        <p>
          If the current state only depends on the previous two states,
          storing the entire DP array is unnecessary.
        </p>
        <Code lines={[
          "static int fib(int n) {",
          "    if (n <= 1) return n;",
          "",
          "    int prev2 = 0;",
          "    int prev1 = 1;",
          "",
          "    for (int i = 2; i <= n; i++) {",
          "        int current = prev1 + prev2;",
          "        prev2 = prev1;",
          "        prev1 = current;",
          "    }",
          "",
          "    return prev1;",
          "}"
        ]} />
        <p><strong>Time:</strong> O(n).</p>
        <p><strong>Extra space:</strong> O(1).</p>
        <p>
          Only optimize space after understanding the state dependencies.
          Some DP problems need the entire table to reconstruct the answer.
        </p>
      </Section>

      <Section title="6. The 5-Step DP Framework">
        <ol>
          <li><strong>Define the state:</strong> what does dp[i] or dp[i][j] mean?</li>
          <li><strong>Write the transition:</strong> how does the current state depend on smaller states?</li>
          <li><strong>Set base cases:</strong> what are the smallest known answers?</li>
          <li><strong>Choose the computation order:</strong> recursion with memoization or bottom-up loops?</li>
          <li><strong>Return the answer:</strong> which state contains the requested result?</li>
        </ol>
        <p>
          Also determine the state count and the amount of work done per
          state. This gives the time complexity.
        </p>
      </Section>

      <Section title="7. 1D DP: Climbing Stairs">
        <p>
          You can climb 1 or 2 steps at a time. How many distinct ways
          are there to reach step n?
        </p>
        <p><strong>State:</strong> dp[i] = number of ways to reach step i.</p>
        <p><strong>Transition:</strong> dp[i] = dp[i - 1] + dp[i - 2].</p>
        <p><strong>Base cases:</strong> dp[0] = 1, dp[1] = 1.</p>
        <Code lines={[
          "static int climbStairs(int n) {",
          "    if (n <= 1) return 1;",
          "",
          "    int prev2 = 1;",
          "    int prev1 = 1;",
          "",
          "    for (int i = 2; i <= n; i++) {",
          "        int current = prev1 + prev2;",
          "        prev2 = prev1;",
          "        prev1 = current;",
          "    }",
          "",
          "    return prev1;",
          "}"
        ]} />
        <p>
          This is Fibonacci-like DP. The same recurrence appears in many
          problems with a different interpretation of the state.
        </p>
      </Section>

      <Section title="8. 1D DP: House Robber">
        <p>
          Each house has money. You cannot rob two adjacent houses.
          Find the maximum money you can collect.
        </p>
        <p><strong>State:</strong> dp[i] = maximum money from houses 0 to i.</p>
        <p>
          At house i, either skip it or rob it and skip house i - 1.
        </p>
        <p><strong>Transition:</strong> dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]).</p>
        <Code lines={[
          "static int rob(int[] nums) {",
          "    int prev2 = 0;",
          "    int prev1 = 0;",
          "",
          "    for (int money : nums) {",
          "        int current = Math.max(",
          "            prev1,",
          "            prev2 + money",
          "        );",
          "",
          "        prev2 = prev1;",
          "        prev1 = current;",
          "    }",
          "",
          "    return prev1;",
          "}"
        ]} />
        <p><strong>Time:</strong> O(n).</p>
        <p><strong>Extra space:</strong> O(1).</p>
        <p>
          This version assumes house values are non-negative. If the problem
          allows negative values and requires robbing at least one house,
          the state and initialization need to change.
        </p>
      </Section>

      <Section title="9. Grid DP: Unique Paths">
        <p>
          A robot starts at the top-left of a grid and can move only right
          or down. Count paths to the bottom-right.
        </p>
        <p><strong>State:</strong> dp[r][c] = paths to cell (r, c).</p>
        <p><strong>Transition:</strong> dp[r][c] = dp[r - 1][c] + dp[r][c - 1].</p>
        <p>
          First row and first column each have exactly one path.
        </p>
        <Code lines={[
          "static int uniquePaths(int m, int n) {",
          "    int[][] dp = new int[m][n];",
          "",
          "    for (int r = 0; r < m; r++) dp[r][0] = 1;",
          "    for (int c = 0; c < n; c++) dp[0][c] = 1;",
          "",
          "    for (int r = 1; r < m; r++) {",
          "        for (int c = 1; c < n; c++) {",
          "            dp[r][c] = dp[r - 1][c]",
          "                      + dp[r][c - 1];",
          "        }",
          "    }",
          "",
          "    return dp[m - 1][n - 1];",
          "}"
        ]} />
        <p><strong>Time:</strong> O(mn).</p>
        <p><strong>Space:</strong> O(mn), reducible to O(n) with a 1D array.</p>
      </Section>

      <Section title="10. 0/1 Knapsack">
        <p>
          Each item has a weight and value. You may take each item at most
          once. Maximize value without exceeding capacity W.
        </p>
        <p><strong>State:</strong> dp[i][w] = maximum value using the first
          i items with capacity w.</p>
        <p>
          For each item, either do not take it, or take it if its weight
          fits.
        </p>
        <p><strong>Transition:</strong></p>
        <p>
          dp[i][w] = max(dp[i - 1][w], value[i] + dp[i - 1][w - weight[i]])
        </p>
        <p>
          The second option is allowed only when weight[i] ≤ w.
        </p>
        <Code lines={[
          "static int knapsack(int[] weight, int[] value, int W) {",
          "    int n = weight.length;",
          "    int[][] dp = new int[n + 1][W + 1];",
          "",
          "    for (int i = 1; i <= n; i++) {",
          "        for (int w = 0; w <= W; w++) {",
          "            dp[i][w] = dp[i - 1][w];",
          "",
          "            if (weight[i - 1] <= w) {",
          "                dp[i][w] = Math.max(",
          "                    dp[i][w],",
          "                    value[i - 1]",
          "                    + dp[i - 1][w - weight[i - 1]]",
          "                );",
          "            }",
          "        }",
          "    }",
          "",
          "    return dp[n][W];",
          "}"
        ]} />
        <p><strong>Time:</strong> O(nW).</p>
        <p><strong>Space:</strong> O(nW).</p>
        <p>
          O(nW) is pseudo-polynomial, not polynomial in the number of bits
          needed to represent W.
        </p>
      </Section>

      <Section title="11. 0/1 Knapsack: 1D Optimization">
        <p>
          We can compress the table to one array. Iterate capacity backward
          so the same item is not used more than once.
        </p>
        <Code lines={[
          "static int knapsack(int[] weight, int[] value, int W) {",
          "    int[] dp = new int[W + 1];",
          "",
          "    for (int i = 0; i < weight.length; i++) {",
          "        for (int w = W; w >= weight[i]; w--) {",
          "            dp[w] = Math.max(",
          "                dp[w],",
          "                value[i] + dp[w - weight[i]]",
          "            );",
          "        }",
          "    }",
          "",
          "    return dp[W];",
          "}"
        ]} />
        <p>
          <strong>Why backward?</strong> It ensures dp[w - weight[i]] still
          represents the previous item layer. Forward iteration can reuse
          the current item repeatedly, which changes the problem into
          Unbounded Knapsack.
        </p>
      </Section>

      <Section title="12. Subset Sum">
        <p>
          Given positive integers and a target, determine whether some
          subset sums to the target.
        </p>
        <p><strong>State:</strong> dp[s] = whether sum s is achievable.</p>
        <p><strong>Base:</strong> dp[0] = true, because choosing no elements
          gives sum zero.</p>
        <Code lines={[
          "static boolean subsetSum(int[] nums, int target) {",
          "    boolean[] dp = new boolean[target + 1];",
          "    dp[0] = true;",
          "",
          "    for (int num : nums) {",
          "        for (int sum = target; sum >= num; sum--) {",
          "            dp[sum] = dp[sum] || dp[sum - num];",
          "        }",
          "    }",
          "",
          "    return dp[target];",
          "}"
        ]} />
        <p>
          Backward iteration prevents using the same number multiple times.
        This implementation assumes non-negative numbers.
        </p>
        <p><strong>Time:</strong> O(n × target).</p>
        <p><strong>Space:</strong> O(target).</p>
      </Section>

      <Section title="13. Longest Common Subsequence (LCS)">
        <p>
          LCS is the longest sequence that appears in both strings in the
          same order, but not necessarily consecutively.
        </p>
        <p><strong>State:</strong> dp[i][j] = LCS length of the first i
          characters of string A and first j characters of string B.</p>
        <p><strong>Transition:</strong></p>
        <ul>
          <li>If A[i - 1] equals B[j - 1], use 1 + dp[i - 1][j - 1].</li>
          <li>Otherwise, take max(dp[i - 1][j], dp[i][j - 1]).</li>
        </ul>
        <Code lines={[
          "static int lcs(String a, String b) {",
          "    int m = a.length();",
          "    int n = b.length();",
          "    int[][] dp = new int[m + 1][n + 1];",
          "",
          "    for (int i = 1; i <= m; i++) {",
          "        for (int j = 1; j <= n; j++) {",
          "            if (a.charAt(i - 1) == b.charAt(j - 1)) {",
          "                dp[i][j] = 1 + dp[i - 1][j - 1];",
          "            } else {",
          "                dp[i][j] = Math.max(",
          "                    dp[i - 1][j], dp[i][j - 1]);",
          "            }",
          "        }",
          "    }",
          "",
          "    return dp[m][n];",
          "}"
        ]} />
        <p><strong>Time:</strong> O(mn).</p>
        <p><strong>Space:</strong> O(mn), reducible to O(min(m, n)) for length only.</p>
      </Section>

      <Section title="14. Longest Increasing Subsequence (LIS)">
        <p>
          Find the length of the longest strictly increasing subsequence.
          Elements do not need to be adjacent.
        </p>
        <p><strong>State:</strong> dp[i] = LIS length ending at index i.</p>
        <p><strong>Transition:</strong> for every j &lt; i where nums[j] &lt;
          nums[i], consider dp[j] + 1.</p>
        <Code lines={[
          "static int lis(int[] nums) {",
          "    if (nums.length == 0) return 0;",
          "",
          "    int n = nums.length;",
          "    int[] dp = new int[n];",
          "    Arrays.fill(dp, 1);",
          "    int answer = 1;",
          "",
          "    for (int i = 0; i < n; i++) {",
          "        for (int j = 0; j < i; j++) {",
          "            if (nums[j] < nums[i]) {",
          "                dp[i] = Math.max(dp[i], dp[j] + 1);",
          "            }",
          "        }",
          "        answer = Math.max(answer, dp[i]);",
          "    }",
          "",
          "    return answer;",
          "}"
        ]} />
        <p><strong>Time:</strong> O(n²).</p>
        <p>
          An advanced method uses binary search and runs in O(n log n)
          for the LIS length. The binary-search array is not itself the
          actual subsequence; it stores the smallest tail for each length.
        </p>
      </Section>

      <Section title="15. DP on Strings: Edit Distance">
        <p>
          Find the minimum operations to convert one string into another.
          Allowed operations: insert, delete, replace.
        </p>
        <p><strong>State:</strong> dp[i][j] = minimum edits to convert the
          first i characters of A into the first j characters of B.</p>
        <p><strong>Base cases:</strong> dp[i][0] = i and dp[0][j] = j.</p>
        <p>
          If characters match, use dp[i - 1][j - 1]. Otherwise take
          1 + min(delete, insert, replace).
        </p>
        <p><strong>Time and space:</strong> O(mn).</p>
      </Section>

      <Section title="16. DP on Stocks">
        <p>
          Stock problems usually define states based on day, whether you
          hold a stock, and sometimes the number of transactions remaining.
        </p>
        <p>Example state meaning:</p>
        <ul>
          <li>dp[i][0]: best profit on day i when not holding a stock.</li>
          <li>dp[i][1]: best profit on day i when holding a stock.</li>
        </ul>
        <p>
          Transitions compare keeping the previous state with buying or
          selling today.
        </p>
        <p>
          For multiple transactions, add a transaction-count dimension or
          use a specialized state machine. Carefully define whether a
          transaction is counted on buying or selling.
        </p>
      </Section>

      <Section title="17. DP on Trees">
        <p>
          Tree DP stores answers for subtrees. A state often depends on
          the current node and a condition about its parent or children.
        </p>
        <p>Example: maximum sum of non-adjacent tree nodes.</p>
        <ul>
          <li>Take the node: add its value and skip its children.</li>
          <li>Skip the node: take the best option from each child.</li>
        </ul>
        <p>
          Tree DP is often computed using DFS/postorder so child states
          are ready before the parent is processed.
        </p>
      </Section>

      <Section title="18. DP on Graphs">
        <p>
          DP on a graph is easiest when the dependency graph is a Directed
          Acyclic Graph (DAG).
        </p>
        <p>
          Compute states in topological order so every predecessor is
          processed before its dependent state.
        </p>
        <p>
          Example: longest path in a DAG can be solved by relaxing edges
          in topological order. General graphs with cycles may require
          different techniques or constraints.
        </p>
      </Section>

      <Section title="19. How to Recognize DP">
        <p>DP may be a good fit when the problem asks:</p>
        <ul>
          <li>How many ways?</li>
          <li>What is the minimum cost?</li>
          <li>What is the maximum profit or length?</li>
          <li>Is it possible to reach a target?</li>
          <li>What is the best answer over prefixes, suffixes, or subranges?</li>
        </ul>
        <p>
          These phrases are clues, not proof. You still need to identify
          the state and recurrence.
        </p>
      </Section>

      <Section title="20. Common DP Mistakes">
        <ul>
          <li>Defining dp[i] without clearly stating what it represents.</li>
          <li>Using an incorrect base case.</li>
          <li>Returning the wrong state.</li>
          <li>Using forward iteration in 0/1 Knapsack.</li>
          <li>Confusing subsequence with subarray.</li>
          <li>Forgetting empty input or target zero.</li>
          <li>Using int when the number of ways may overflow.</li>
          <li>Optimizing space before understanding dependencies.</li>
          <li>Memorizing a recurrence without knowing why it works.</li>
        </ul>
      </Section>

      <Section title="21. Practice Problems">
        <h3>Beginner</h3>
        <ul>
          <li>Fibonacci Number</li>
          <li>Climbing Stairs</li>
          <li>Min Cost Climbing Stairs</li>
          <li>House Robber</li>
          <li>Frog Jump</li>
        </ul>
        <h3>Intermediate</h3>
        <ul>
          <li>Unique Paths</li>
          <li>Minimum Path Sum</li>
          <li>0/1 Knapsack</li>
          <li>Subset Sum</li>
          <li>Partition Equal Subset Sum</li>
          <li>Coin Change</li>
          <li>Longest Common Subsequence</li>
          <li>Longest Increasing Subsequence</li>
        </ul>
        <h3>Advanced</h3>
        <ul>
          <li>Edit Distance</li>
          <li>Longest Palindromic Subsequence</li>
          <li>Matrix Chain Multiplication</li>
          <li>DP on Trees</li>
          <li>DP on DAGs</li>
          <li>Stock Buy and Sell with transaction constraints</li>
        </ul>
      </Section>

      <Section title="22. Quick Revision">
        <ul>
          <li>DP stores results of overlapping subproblems.</li>
          <li>Memoization = top-down recursion + cache.</li>
          <li>Tabulation = bottom-up table.</li>
          <li>Define the state before writing code.</li>
          <li>Write transition and base cases carefully.</li>
          <li>State count × work per state = time complexity.</li>
          <li>For 0/1 Knapsack, iterate capacity backward.</li>
          <li>For unbounded choices, forward iteration may be appropriate.</li>
          <li>Space optimization depends on dependency direction.</li>
          <li>Always dry-run small inputs.</li>
        </ul>
      </Section>
    </div>
  );
}
