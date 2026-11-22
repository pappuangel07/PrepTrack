
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

export default function GreedyAlgorithmsLesson({ onBack }) {
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

      <h1>Greedy Algorithms</h1>
      <p>
        Learn how to make locally optimal choices and determine when those
        choices produce a globally optimal solution.
      </p>

      <Section title="1. What is a Greedy Algorithm?">
        <p>
          A greedy algorithm builds a solution step by step. At every step,
          it chooses the option that looks best at that moment.
        </p>
        <p>
          It usually does not reconsider previous choices.
        </p>
        <ul>
          <li>Local optimum: best choice at the current step.</li>
          <li>Global optimum: best complete solution to the problem.</li>
          <li>Greedy goal: make local choices that lead to a global optimum.</li>
        </ul>
        <p><strong>Example:</strong> You want to attend the maximum number of
          non-overlapping meetings. Choosing the meeting that finishes earliest
          can leave the most time for later meetings.</p>
      </Section>

      <Section title="2. Greedy vs Brute Force vs Dynamic Programming">
        <ul>
          <li><strong>Brute force:</strong> tries many or all possible choices.</li>
          <li><strong>Greedy:</strong> chooses one promising option at each step.</li>
          <li><strong>Dynamic Programming:</strong> solves and reuses overlapping subproblems.</li>
        </ul>
        <p>
          Greedy is often faster and uses less memory, but it only works when
          the problem has the right mathematical structure.
        </p>
        <p>
          A greedy algorithm can be fast and still be wrong. Speed does not
          prove correctness.
        </p>
      </Section>

      <Section title="3. When Does Greedy Work?">
        <h3>Greedy-choice property</h3>
        <p>
          There is an optimal solution that includes the greedy choice made
          at the current step.
        </p>
        <h3>Optimal substructure</h3>
        <p>
          After making a choice, the remaining problem can be solved optimally
          to form an optimal complete solution.
        </p>
        <p>
          These properties are useful signals, but you must still prove that
          the algorithm is correct for the specific problem.
        </p>
      </Section>

      <Section title="4. How to Prove a Greedy Algorithm">
        <ol>
          <li>Describe the greedy choice precisely.</li>
          <li>Assume an optimal solution exists.</li>
          <li>Show that the optimal solution can be changed to include the greedy choice without becoming worse.</li>
          <li>Remove the chosen item and consider the remaining subproblem.</li>
          <li>Repeat the argument, or use induction, to prove the full solution is optimal.</li>
        </ol>
        <p>
          A common proof technique is an <strong>exchange argument</strong>:
          replace part of an optimal solution with the greedy choice and show
          that the solution remains optimal.
        </p>
      </Section>

      <Section title="5. Classic Example: Activity Selection">
        <p>
          Given activities with start and finish times, select the maximum
          number of activities that do not overlap.
        </p>
        <p><strong>Greedy choice:</strong> always select the compatible activity
          that finishes earliest.</p>
        <p>
          Why? An activity that finishes earlier leaves at least as much room
          for the remaining activities as one that finishes later.
        </p>
        <Code lines={[
          "import java.util.Arrays;",
          "import java.util.Comparator;",
          "",
          "class Activity {",
          "    int start, end;",
          "",
          "    Activity(int start, int end) {",
          "        this.start = start;",
          "        this.end = end;",
          "    }",
          "}",
          "",
          "public class Main {",
          "    public static int selectActivities(Activity[] activities) {",
          "        Arrays.sort(activities,",
          "            Comparator.comparingInt(a -> a.end));",
          "",
          "        int count = 0;",
          "        int lastEnd = Integer.MIN_VALUE;",
          "",
          "        for (Activity activity : activities) {",
          "            if (activity.start >= lastEnd) {",
          "                count++;",
          "                lastEnd = activity.end;",
          "            }",
          "        }",
          "",
          "        return count;",
          "    }",
          "}"
        ]} />
        <p><strong>Time:</strong> O(n log n) for sorting + O(n) scanning.</p>
        <p><strong>Space:</strong> depends on the sorting implementation; the scan itself uses O(1) extra space.</p>
        <p>
          If the problem defines meetings as incompatible when one starts
          exactly at the other's end, change the condition from
          <code>start &gt;= lastEnd</code> to <code>start &gt; lastEnd</code>.
        </p>
      </Section>

      <Section title="6. Interval Problems">
        <p>
          Many interval problems use sorting followed by a greedy scan.
        </p>
        <h3>Common patterns</h3>
        <ul>
          <li>Sort by end time to select maximum non-overlapping intervals.</li>
          <li>Sort by start time to merge overlapping intervals.</li>
          <li>Track the current interval's end while scanning.</li>
          <li>Decide whether touching intervals count as overlapping.</li>
        </ul>
        <p>
          Do not blindly sort every interval problem by the same field.
          The correct sorting key depends on what you are optimizing.
        </p>
      </Section>

      <Section title="7. Fractional Knapsack">
        <p>
          Each item has a value and weight. You may take a fraction of an item.
          Maximize total value within the weight capacity.
        </p>
        <p><strong>Greedy choice:</strong> take items in decreasing order of
          value / weight ratio.</p>
        <p>
          Fractions are allowed, so taking the highest value per unit weight
          first is optimal.
        </p>
        <Code lines={[
          "import java.util.Arrays;",
          "import java.util.Comparator;",
          "",
          "class Item {",
          "    double value, weight;",
          "",
          "    Item(double value, double weight) {",
          "        this.value = value;",
          "        this.weight = weight;",
          "    }",
          "}",
          "",
          "public static double fractionalKnapsack(",
          "        Item[] items, double capacity) {",
          "    Arrays.sort(items,",
          "        Comparator.comparingDouble(",
          "            (Item item) -> item.value / item.weight",
          "        ).reversed());",
          "",
          "    double totalValue = 0;",
          "",
          "    for (Item item : items) {",
          "        if (capacity <= 0) break;",
          "",
          "        double take = Math.min(capacity, item.weight);",
          "        totalValue += take * item.value / item.weight;",
          "        capacity -= take;",
          "    }",
          "",
          "    return totalValue;",
          "}"
        ]} />
        <p><strong>Time:</strong> O(n log n).</p>
        <p>
          Important: this greedy strategy does <strong>not</strong> solve
          0/1 Knapsack, where each item must be taken entirely or not at all.
          0/1 Knapsack is commonly solved using Dynamic Programming.
        </p>
      </Section>

      <Section title="8. Minimum Number of Coins">
        <p>
          A common greedy approach repeatedly takes the largest coin that
          does not exceed the remaining amount.
        </p>
        <p>
          This works for some coin systems, but not all coin systems.
        </p>
        <p>
          Example coins: 1, 3, 4. Amount: 6.
        </p>
        <ul>
          <li>Greedy: 4 + 1 + 1 = 3 coins.</li>
          <li>Optimal: 3 + 3 = 2 coins.</li>
        </ul>
        <p>
          This is a counterexample proving that greedy is not universally
          correct for coin change.
        </p>
        <p>
          For arbitrary denominations and minimum coin count, Dynamic
          Programming is a safer general solution.
        </p>
      </Section>

      <Section title="9. Job Sequencing with Deadlines">
        <p>
          Each job takes one unit of time and has a deadline and profit.
          Complete jobs before their deadlines to maximize profit.
        </p>
        <p><strong>Greedy idea:</strong></p>
        <ol>
          <li>Sort jobs by decreasing profit.</li>
          <li>For each job, place it in the latest available slot at or before its deadline.</li>
          <li>Skip it if no valid slot exists.</li>
        </ol>
        <p>
          Placing a job as late as possible preserves earlier slots for jobs
          with tighter deadlines.
        </p>
        <p>
          A simple implementation scans backward through slots. With n jobs
          and a maximum deadline D, this version can take O(n log n + nD)
          time including sorting. Disjoint Set Union can optimize slot
          searching in suitable implementations.
        </p>
      </Section>

      <Section title="10. Minimum Spanning Tree: Kruskal's Algorithm">
        <p>
          A Minimum Spanning Tree (MST) connects all vertices in a connected,
          weighted, undirected graph with minimum total edge weight and no
          cycles.
        </p>
        <p><strong>Kruskal greedy choice:</strong> process edges from smallest
          weight to largest, adding an edge only if it connects two different
          components.
        </p>
        <p>
          Use Disjoint Set Union (DSU) to check whether two vertices are
          already connected.
        </p>
        <Code lines={[
          "Arrays.sort(edges,",
          "    Comparator.comparingInt(edge -> edge.weight));",
          "",
          "int totalWeight = 0;",
          "int edgesUsed = 0;",
          "",
          "for (Edge edge : edges) {",
          "    if (dsu.find(edge.u) != dsu.find(edge.v)) {",
          "        dsu.union(edge.u, edge.v);",
          "        totalWeight += edge.weight;",
          "        edgesUsed++;",
          "    }",
          "",
          "    if (edgesUsed == vertices - 1) break;",
          "}",
          "",
          "// If edgesUsed != vertices - 1, the graph is disconnected."
        ]} />
        <p><strong>Time:</strong> O(E log E) for sorting, plus near-constant amortized DSU operations.</p>
        <p>
          Kruskal is greedy because the cut property guarantees that a
          minimum-weight edge crossing a suitable cut can safely be included
          in an MST.
        </p>
      </Section>

      <Section title="11. Dijkstra's Algorithm">
        <p>
          Dijkstra finds shortest paths from one source in a graph with
          non-negative edge weights.
        </p>
        <p><strong>Greedy choice:</strong> repeatedly finalize the unvisited
          vertex with the smallest tentative distance.
        </p>
        <p>
          It works with non-negative weights. Negative edges can break the
          correctness of the greedy finalization step.
        </p>
        <p>
          Typical implementation with an adjacency list and priority queue:
          O((V + E) log V), depending on the implementation and heap behavior.
        </p>
      </Section>

      <Section title="12. Greedy on Arrays and Strings">
        <p>Look for problems where a choice can be made without revisiting
          previous decisions.</p>
        <ul>
          <li>Jump Game: track the farthest reachable index.</li>
          <li>Gas Station: reset the candidate start when running fuel becomes negative.</li>
          <li>Assign Cookies: match the smallest sufficient cookie to the least greedy child.</li>
          <li>Best time to buy and sell stock: track the minimum price so far for one transaction.</li>
        </ul>
        <p>
          These problems use different greedy reasoning. Learn the proof or
          invariant for each one instead of memorizing “greedy = sort.”
        </p>
      </Section>

      <Section title="13. Greedy vs Dynamic Programming">
        <p>
          Ask this before choosing greedy:
        </p>
        <ul>
          <li>Does the current choice permanently discard alternatives?</li>
          <li>Can I prove that some optimal solution includes this choice?</li>
          <li>Can the remaining problem be solved independently in the same way?</li>
          <li>Can I construct a small counterexample to test my idea?</li>
        </ul>
        <p>
          If choices interact in a way that requires comparing multiple
          future possibilities, Dynamic Programming may be necessary.
        </p>
      </Section>

      <Section title="14. Common Mistakes">
        <ul>
          <li>Assuming the largest value is always the best choice.</li>
          <li>Using greedy without a correctness proof.</li>
          <li>Confusing fractional and 0/1 knapsack.</li>
          <li>Assuming greedy coin change works for every denomination system.</li>
          <li>Sorting by start time when the problem requires earliest finish time.</li>
          <li>Forgetting tie cases and boundary conditions.</li>
          <li>Ignoring negative weights in Dijkstra.</li>
          <li>Failing to check whether a graph is disconnected when building an MST.</li>
        </ul>
      </Section>

      <Section title="15. Interview Problem-Solving Template">
        <ol>
          <li>Identify what must be minimized or maximized.</li>
          <li>List the possible choices at each step.</li>
          <li>Suggest a greedy rule and state it clearly.</li>
          <li>Test it on small examples and edge cases.</li>
          <li>Try to find a counterexample.</li>
          <li>Prove the rule using an exchange argument, cut property, or induction.</li>
          <li>Implement the algorithm and analyze time and space complexity.</li>
        </ol>
      </Section>

      <Section title="16. Practice Problems">
        <h3>Beginner</h3>
        <ul>
          <li>Assign Cookies</li>
          <li>Maximum Meetings in One Room</li>
          <li>Activity Selection</li>
          <li>Minimum Number of Platforms</li>
        </ul>
        <h3>Intermediate</h3>
        <ul>
          <li>Jump Game</li>
          <li>Gas Station</li>
          <li>Non-overlapping Intervals</li>
          <li>Job Sequencing with Deadlines</li>
          <li>Fractional Knapsack</li>
        </ul>
        <h3>Advanced</h3>
        <ul>
          <li>Merge Intervals</li>
          <li>Minimum Number of Arrows to Burst Balloons</li>
          <li>Huffman Coding</li>
          <li>Kruskal's Minimum Spanning Tree</li>
          <li>Dijkstra's Shortest Path</li>
        </ul>
      </Section>

      <Section title="17. Quick Revision">
        <ul>
          <li>Greedy makes the best-looking choice at each step.</li>
          <li>Local optimum does not automatically mean global optimum.</li>
          <li>Greedy-choice property and optimal substructure are key ideas.</li>
          <li>Exchange arguments are a common proof technique.</li>
          <li>Activity selection: sort by finish time.</li>
          <li>Fractional knapsack: sort by value/weight.</li>
          <li>Kruskal: sort edges and use DSU.</li>
          <li>Dijkstra: non-negative edge weights only.</li>
          <li>Always test greedy against counterexamples.</li>
        </ul>
      </Section>
    </div>
  );
}
