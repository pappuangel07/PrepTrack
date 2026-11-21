
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

export default function BacktrackingLesson({ onBack }) {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <button onClick={onBack} style={{ marginBottom: "18px" }}>
        ← Back to DSA
      </button>

      <header style={{ marginBottom: "24px" }}>
        <h1>Backtracking</h1>
        <p>
          Explore possible choices, build candidate solutions, and undo
          decisions when a path cannot lead to a valid answer.
        </p>
      </header>

      <Section title="1. What is Backtracking?">
        <p>
          Backtracking is a problem-solving technique that explores
          possible solutions step by step. When a choice leads to an
          invalid or unhelpful state, the algorithm reverses that choice
          and tries another.
        </p>
        <p>
          The basic process is:
        </p>
        <ol>
          <li>Choose an option.</li>
          <li>Check whether the choice is valid.</li>
          <li>Explore the next step recursively.</li>
          <li>Undo the choice.</li>
          <li>Try the next option.</li>
        </ol>
        <p>
          Backtracking is commonly implemented using recursion and a
          shared path or state.
        </p>
      </Section>

      <Section title="2. Recursion vs Backtracking">
        <p>
          Recursion is a method calling itself. Backtracking is a
          search strategy that often uses recursion.
        </p>
        <ul>
          <li>Recursion describes how a function calls itself.</li>
          <li>Backtracking describes exploring choices and undoing them.</li>
        </ul>
        <p>
          Not every recursive algorithm is backtracking. Factorial is
          recursive, but it does not explore alternative choices.
        </p>
      </Section>

      <Section title="3. The Backtracking Template">
        <Code>{`void backtrack(State state) {
    if (isComplete(state)) {
        saveSolution(state);
        return;
    }

    for (Choice choice : getChoices(state)) {
        if (!isValid(choice, state)) {
            continue;
        }

        makeChoice(state, choice);

        backtrack(state);

        undoChoice(state, choice);
    }
}`}</Code>
        <p>
          The undo step is essential when multiple branches share
          mutable state.
        </p>
        <p>
          If you forget to undo a choice, the next branch may
          accidentally inherit decisions from the previous branch.
        </p>
      </Section>

      <Section title="4. Decision Tree">
        <p>
          Backtracking can be visualized as a decision tree. Each level
          represents a decision, and each branch represents a choice.
        </p>
        <Code>{`                 Start
               /       \\
            choose A  choose B
             /             \\
          A + C           B + C
          /   \\           /   \\
        ...  ...        ...  ...`}</Code>
        <p>
          The algorithm performs a depth-first exploration of the
          decision tree. It can stop exploring a branch as soon as
          that branch cannot produce a valid solution.
        </p>
      </Section>

      <Section title="5. Subsets — Include or Exclude">
        <p>
          For every element, choose whether to include it in the
          current subset or exclude it.
        </p>
        <p>
          For an array of n elements, there are 2ⁿ possible subsets.
        </p>
        <Code>{`import java.util.ArrayList;
import java.util.List;

public static List<List<Integer>> subsets(int[] arr) {
    List<List<Integer>> result = new ArrayList<>();
    List<Integer> current = new ArrayList<>();

    generateSubsets(arr, 0, current, result);

    return result;
}

private static void generateSubsets(
        int[] arr,
        int index,
        List<Integer> current,
        List<List<Integer>> result) {

    if (index == arr.length) {
        result.add(new ArrayList<>(current));
        return;
    }

    // Include current element
    current.add(arr[index]);
    generateSubsets(arr, index + 1, current, result);

    // Undo inclusion
    current.remove(current.size() - 1);

    // Exclude current element
    generateSubsets(arr, index + 1, current, result);
}`}</Code>
        <p>
  Important: <code>{"new ArrayList<>(current)"}</code> creates a
  snapshot. Adding the same mutable list object repeatedly
  would make all stored results change together.
</p>
        <h3>Complexity</h3>
        <ul>
          <li>Number of subsets: 2ⁿ.</li>
          <li>Time: O(n × 2ⁿ) when copying each subset.</li>
          <li>Auxiliary recursion/path space: O(n), excluding output.</li>
        </ul>
      </Section>

      <Section title="6. Combination Sum">
        <p>
          Choose numbers repeatedly to reach a target. In the classic
          Combination Sum problem, each candidate can be reused.
        </p>
        <Code>{`public static List<List<Integer>> combinationSum(
        int[] candidates, int target) {

    List<List<Integer>> result = new ArrayList<>();
    List<Integer> current = new ArrayList<>();

    findCombinations(
        candidates, target, 0, current, result
    );

    return result;
}

private static void findCombinations(
        int[] candidates,
        int remaining,
        int start,
        List<Integer> current,
        List<List<Integer>> result) {

    if (remaining == 0) {
        result.add(new ArrayList<>(current));
        return;
    }

    if (remaining < 0) {
        return;
    }

    for (int i = start; i < candidates.length; i++) {
        current.add(candidates[i]);

        // i, not i + 1: reuse is allowed
        findCombinations(
            candidates,
            remaining - candidates[i],
            i,
            current,
            result
        );

        current.remove(current.size() - 1);
    }
}`}</Code>
        <p>
          This assumes candidates are positive and distinct, as in
          the classic version. Negative or duplicate candidates need
          additional handling to avoid infinite recursion or duplicate
          combinations.
        </p>
        <p>
          The start index prevents generating the same combination in
          different orders, such as [2, 3] and [3, 2].
        </p>
      </Section>

      <Section title="7. Permutations">
        <p>
          A permutation is an arrangement of elements where order
          matters. For n distinct elements, there are n! permutations.
        </p>
        <Code>{`public static List<List<Integer>> permutations(int[] arr) {
    List<List<Integer>> result = new ArrayList<>();
    boolean[] used = new boolean[arr.length];
    List<Integer> current = new ArrayList<>();

    generatePermutations(arr, used, current, result);

    return result;
}

private static void generatePermutations(
        int[] arr,
        boolean[] used,
        List<Integer> current,
        List<List<Integer>> result) {

    if (current.size() == arr.length) {
        result.add(new ArrayList<>(current));
        return;
    }

    for (int i = 0; i < arr.length; i++) {
        if (used[i]) {
            continue;
        }

        used[i] = true;
        current.add(arr[i]);

        generatePermutations(arr, used, current, result);

        current.remove(current.size() - 1);
        used[i] = false;
    }
}`}</Code>
        <p>
          The <code>used</code> array tracks which elements are already
          in the current permutation.
        </p>
        <ul>
          <li>Number of permutations: n!</li>
          <li>Time: O(n × n!) when copying each result.</li>
          <li>Auxiliary space: O(n) for path, used array, and recursion.</li>
        </ul>
      </Section>

      <Section title="8. N-Queens">
        <p>
          Place n queens on an n × n chessboard so that no two queens
          attack each other.
        </p>
        <p>
          A queen attacks along its row, column, and diagonals.
          Place one queen per row and check whether its column and
          diagonals are safe.
        </p>
        <Code>{`public static List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();

    char[][] board = new char[n][n];
    for (int r = 0; r < n; r++) {
        Arrays.fill(board[r], '.');
    }

    boolean[] columns = new boolean[n];
    boolean[] diagonal1 = new boolean[2 * n - 1];
    boolean[] diagonal2 = new boolean[2 * n - 1];

    placeQueen(
        0, n, board, columns, diagonal1, diagonal2, result
    );

    return result;
}

private static void placeQueen(
        int row,
        int n,
        char[][] board,
        boolean[] columns,
        boolean[] diagonal1,
        boolean[] diagonal2,
        List<List<String>> result) {

    if (row == n) {
        List<String> solution = new ArrayList<>();

        for (char[] line : board) {
            solution.add(new String(line));
        }

        result.add(solution);
        return;
    }

    for (int col = 0; col < n; col++) {
        int d1 = row - col + n - 1;
        int d2 = row + col;

        if (columns[col] || diagonal1[d1] || diagonal2[d2]) {
            continue;
        }

        board[row][col] = 'Q';
        columns[col] = true;
        diagonal1[d1] = true;
        diagonal2[d2] = true;

        placeQueen(
            row + 1, n, board, columns,
            diagonal1, diagonal2, result
        );

        board[row][col] = '.';
        columns[col] = false;
        diagonal1[d1] = false;
        diagonal2[d2] = false;
    }
}`}</Code>
        <p>
          The diagonal indexes convert each diagonal into an array
          position:
        </p>
        <ul>
          <li>row − col + n − 1 identifies one diagonal direction.</li>
          <li>row + col identifies the other diagonal direction.</li>
        </ul>
        <p>
          Tracking columns and diagonals makes the safety check O(1)
          instead of scanning the board each time.
        </p>
      </Section>

      <Section title="9. Sudoku Solver">
        <p>
          Sudoku backtracking fills an empty cell with a candidate
          digit, checks whether it is valid in its row, column, and
          3 × 3 box, and recursively solves the remaining board.
        </p>
        <Code>{`boolean solveSudoku(char[][] board) {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if (board[row][col] != '.') {
                continue;
            }

            for (char digit = '1'; digit <= '9'; digit++) {
                if (isValidSudoku(board, row, col, digit)) {
                    board[row][col] = digit;

                    if (solveSudoku(board)) {
                        return true;
                    }

                    // Undo failed choice
                    board[row][col] = '.';
                }
            }

            // No digit works in this cell
            return false;
        }
    }

    // No empty cells remain
    return true;
}

boolean isValidSudoku(
        char[][] board, int row, int col, char digit) {

    for (int i = 0; i < 9; i++) {
        if (board[row][i] == digit) return false;
        if (board[i][col] == digit) return false;

        int boxRow = 3 * (row / 3) + i / 3;
        int boxCol = 3 * (col / 3) + i % 3;

        if (board[boxRow][boxCol] == digit) {
            return false;
        }
    }

    return true;
}`}</Code>
        <p>
          This is a basic solver. More advanced solvers improve
          performance by choosing the empty cell with the fewest
          valid candidates (Minimum Remaining Values).
        </p>
      </Section>

      <Section title="10. Word Search">
        <p>
          Given a grid of characters, determine whether a word can
          be formed by moving up, down, left, or right. A cell cannot
          be reused in the same word path.
        </p>
        <Code>{`boolean exist(char[][] board, String word) {
    for (int row = 0; row < board.length; row++) {
        for (int col = 0; col < board[0].length; col++) {
            if (searchWord(board, word, row, col, 0)) {
                return true;
            }
        }
    }

    return false;
}

boolean searchWord(
        char[][] board, String word,
        int row, int col, int index) {

    if (index == word.length()) {
        return true;
    }

    if (row < 0 || row >= board.length ||
        col < 0 || col >= board[0].length ||
        board[row][col] != word.charAt(index)) {
        return false;
    }

    char saved = board[row][col];
    board[row][col] = '#'; // Mark as visited

    boolean found =
        searchWord(board, word, row + 1, col, index + 1) ||
        searchWord(board, word, row - 1, col, index + 1) ||
        searchWord(board, word, row, col + 1, index + 1) ||
        searchWord(board, word, row, col - 1, index + 1);

    board[row][col] = saved; // Restore cell

    return found;
}`}</Code>
        <p>
          Marking a cell prevents revisiting it during the current path.
          Restoring it is necessary so other starting positions and
          paths can use that cell.
        </p>
        <p>
          Approximate worst-case time: O(R × C × 4^L), where L is the
          word length. The first move has at most four directions;
          later moves have at most three new directions after avoiding
          the previous cell. This is a loose upper bound.
        </p>
      </Section>

      <Section title="11. Pruning">
        <p>
          Pruning means stopping a branch early when it cannot produce
          a valid solution.
        </p>
        <p>Examples:</p>
        <ul>
          <li>Combination Sum: stop when remaining target is negative.</li>
          <li>N-Queens: skip a column or diagonal already occupied.</li>
          <li>Sudoku: reject a digit that violates a rule.</li>
          <li>Word Search: stop when the cell does not match the next character.</li>
        </ul>
        <p>
          Good pruning can reduce the number of explored states
          dramatically, although the worst-case complexity may remain
          exponential.
        </p>
      </Section>

      <Section title="12. Duplicate Solutions">
        <p>
          If the input contains duplicate values, a naive backtracking
          solution may produce duplicate answers.
        </p>
        <p>
          For problems such as Subsets II or Combination Sum II:
        </p>
        <ol>
          <li>Sort the input.</li>
          <li>At each recursion level, skip a value equal to the previous value.</li>
          <li>Use the correct start index to avoid reusing elements.</li>
        </ol>
        <Code>{`Arrays.sort(arr);

for (int i = start; i < arr.length; i++) {
    if (i > start && arr[i] == arr[i - 1]) {
        continue;
    }

    // Choose arr[i], recurse, then undo
}`}</Code>
        <p>
          The condition <code>i &gt; start</code> matters. It skips
          duplicates at the same decision level, but still allows
          equal values at different levels when the problem permits it.
        </p>
      </Section>

      <Section title="13. Complexity of Backtracking">
        <p>
          Backtracking complexity depends on the number of states,
          branching factor, and work performed at each state.
        </p>
        <ul>
          <li>Subsets: 2ⁿ possible results.</li>
          <li>Permutations: n! possible results for distinct elements.</li>
          <li>N-Queens: exponential search in the general case.</li>
          <li>Sudoku: worst-case search can be exponential.</li>
        </ul>
        <p>
          When output is required, include the cost of copying or
          constructing each solution. For example, generating all
          subsets requires O(n × 2ⁿ) time to copy their contents.
        </p>
        <p>
          Auxiliary space usually includes the recursion depth and
          current path, but excludes the output list unless the
          question asks for total space.
        </p>
      </Section>

      <Section title="14. Common Mistakes">
        <ul>
          <li>Forgetting to undo a choice.</li>
          <li>Saving the same mutable path instead of a copy.</li>
          <li>Not checking constraints before recursion.</li>
          <li>Using the wrong start index in combinations.</li>
          <li>Allowing the same element when reuse is forbidden.</li>
          <li>Skipping duplicates at the wrong recursion level.</li>
          <li>Forgetting to restore visited cells or board state.</li>
          <li>Ignoring exponential output size.</li>
        </ul>
      </Section>

      <Section title="15. Interview Pattern Recognition">
        <ul>
          <li>Generate all subsets → include/exclude recursion.</li>
          <li>Generate all arrangements → permutations.</li>
          <li>Choose values to reach a target → combination search.</li>
          <li>Place items under constraints → N-Queens style.</li>
          <li>Fill a grid with rules → Sudoku-style search.</li>
          <li>Explore paths in a grid → DFS + visited state.</li>
          <li>Repeated subproblems → consider memoization or DP.</li>
        </ul>
      </Section>

      <Section title="16. Practice Problems">
        <ol>
          <li>Subsets</li>
          <li>Subsets II</li>
          <li>Combination Sum</li>
          <li>Combination Sum II</li>
          <li>Permutations</li>
          <li>Permutations II</li>
          <li>Palindrome Partitioning</li>
          <li>Word Search</li>
          <li>N-Queens</li>
          <li>Sudoku Solver</li>
          <li>Rat in a Maze</li>
          <li>Letter Combinations of a Phone Number</li>
        </ol>
      </Section>

      <Section title="17. Quick Revision">
        <ul>
          <li>Backtracking explores choices using depth-first search.</li>
          <li>Choose → explore → undo.</li>
          <li>Base case identifies a completed solution.</li>
          <li>Pruning stops invalid or impossible branches early.</li>
          <li>Copy mutable paths when saving solutions.</li>
          <li>Use sorting and same-level duplicate checks when needed.</li>
          <li>Analyze branching and output size carefully.</li>
        </ul>
      </Section>
    </div>
  );
}
