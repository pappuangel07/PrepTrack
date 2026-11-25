
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

export default function DisjointSetUnionLesson({ onBack }) {
  return (
    <div style={pageStyle}>
      <button onClick={onBack} style={{ marginBottom: '16px' }}>
        ← Back to DSA
      </button>

      <h1>Disjoint Set Union (DSU)</h1>
      <p>
        Beginner to Advanced • Java • Interview Preparation
      </p>

      <Section title="1. What is Disjoint Set Union?">
        <p>
          Disjoint Set Union is a data structure that maintains a collection
          of non-overlapping sets.
        </p>
        <p>
          It supports two important operations:
        </p>
        <ul>
          <li>
            <strong>Find:</strong> Find which set an element belongs to.
          </li>
          <li>
            <strong>Union:</strong> Merge the sets containing two elements.
          </li>
        </ul>
        <p>
          The word <strong>disjoint</strong> means that two sets have no
          common elements.
        </p>
        <p>
          DSU is also known as <strong>Union-Find</strong>.
        </p>
      </Section>

      <Section title="2. Real-Life Example">
        <p>
          Imagine students joining friendship groups.
        </p>
        <ul>
          <li>Initially, every student is in their own group.</li>
          <li>If student 1 becomes friends with student 2, merge their groups.</li>
          <li>If student 2 becomes friends with student 3, merge again.</li>
          <li>Now students 1, 2, and 3 belong to the same group.</li>
        </ul>
        <p>
          DSU helps answer: <strong>Are student 1 and student 3 in the
          same group?</strong>
        </p>
      </Section>

      <Section title="3. Initial State">
        <p>
          Suppose we have 5 elements: 0, 1, 2, 3, 4.
        </p>
        <p>
          Initially, every element is its own parent.
        </p>
        <Code lines={[
          'parent = [0, 1, 2, 3, 4]',
          '',
          '0 is its own group',
          '1 is its own group',
          '2 is its own group',
          '3 is its own group',
          '4 is its own group',
        ]} />
        <p>
          Each element starts as a separate set.
        </p>
      </Section>

      <Section title="4. Parent Array">
        <p>
          DSU commonly uses an array called <strong>parent</strong>.
        </p>
        <p>
          parent[x] stores the parent of element x in a tree structure.
        </p>
        <Code lines={[
          'parent[0] = 0',
          'parent[1] = 1',
          'parent[2] = 2',
          '',
          'If parent[x] == x,',
          'then x is the root of its tree.',
        ]} />
        <p>
          The root represents the entire set. Elements belonging to the
          same set eventually reach the same root.
        </p>
      </Section>

      <Section title="5. The Find Operation">
        <p>
          <strong>find(x)</strong> returns the representative, or root,
          of the set containing x.
        </p>
        <p>
          We repeatedly move from a node to its parent until we reach a
          node whose parent is itself.
        </p>
        <Code lines={[
          'int find(int x) {',
          '    while (parent[x] != x) {',
          '        x = parent[x];',
          '    }',
          '    return x;',
          '}',
        ]} />
        <p>
          If find(2) returns 0, then element 2 belongs to the set
          represented by root 0.
        </p>
      </Section>

      <Section title="6. The Union Operation">
        <p>
          <strong>union(a, b)</strong> merges the sets containing a and b.
        </p>
        <ol>
          <li>Find the root of a.</li>
          <li>Find the root of b.</li>
          <li>If both roots are equal, they are already in the same set.</li>
          <li>Otherwise, connect one root to the other.</li>
        </ol>
        <Code lines={[
          'void unionSets(int a, int b) {',
          '    int rootA = find(a);',
          '    int rootB = find(b);',
          '',
          '    if (rootA == rootB) {',
          '        return;',
          '    }',
          '',
          '    parent[rootB] = rootA;',
          '}',
        ]} />
        <p>
          This basic union works, but without optimization the trees can
          become tall and slow.
        </p>
      </Section>

      <Section title="7. Dry Run">
        <p>
          Start with 5 separate elements.
        </p>
        <Code lines={[
          'parent = [0, 1, 2, 3, 4]',
          '',
          'unionSets(0, 1)',
          'parent = [0, 0, 2, 3, 4]',
          '',
          'unionSets(1, 2)',
          'parent = [0, 0, 0, 3, 4]',
          '',
          'unionSets(3, 4)',
          'parent = [0, 0, 0, 3, 3]',
        ]} />
        <p>
          Now:
        </p>
        <ul>
          <li>0, 1, 2 belong to one set.</li>
          <li>3, 4 belong to another set.</li>
        </ul>
        <p>
          find(2) returns 0, and find(4) returns 3.
        </p>
        <p>
          Since the roots differ, 2 and 4 are not connected.
        </p>
      </Section>

      <Section title="8. Path Compression">
        <p>
          Path compression is an optimization applied during find.
        </p>
        <p>
          After finding the root, we directly connect the visited node
          to that root.
        </p>
        <Code lines={[
          'int find(int x) {',
          '    if (parent[x] == x) {',
          '        return x;',
          '    }',
          '',
          '    parent[x] = find(parent[x]);',
          '    return parent[x];',
          '}',
        ]} />
        <p>
          Suppose the tree is:
        </p>
        <Code lines={[
          '4 -> 3 -> 2 -> 1 -> 0',
          '',
          'find(4) returns 0',
          '',
          'After path compression:',
          '4 -> 0',
          '3 -> 0',
          '2 -> 0',
          '1 -> 0',
        ]} />
        <p>
          Future find operations become much faster because the tree
          becomes flatter.
        </p>
      </Section>

      <Section title="9. Union by Size">
        <p>
          Union by size attaches the smaller tree under the larger tree.
        </p>
        <p>
          Maintain a size array where size[root] stores the number of
          elements in that root's set.
        </p>
        <Code lines={[
          'if (size[rootA] < size[rootB]) {',
          '    int temp = rootA;',
          '    rootA = rootB;',
          '    rootB = temp;',
          '}',
          '',
          'parent[rootB] = rootA;',
          'size[rootA] += size[rootB];',
        ]} />
        <p>
          This avoids unnecessarily increasing tree height.
        </p>
        <p>
          Important: update the size of the new root only. The size
          values of non-root nodes are no longer used for decisions.
        </p>
      </Section>

      <Section title="10. Union by Rank">
        <p>
          Rank is an approximate measure of tree height.
        </p>
        <ul>
          <li>If root A has smaller rank, attach A under B.</li>
          <li>If root B has smaller rank, attach B under A.</li>
          <li>If ranks are equal, attach one root under the other and
            increase the new root's rank by 1.</li>
        </ul>
        <Code lines={[
          'if (rank[rootA] < rank[rootB]) {',
          '    parent[rootA] = rootB;',
          '} else if (rank[rootA] > rank[rootB]) {',
          '    parent[rootB] = rootA;',
          '} else {',
          '    parent[rootB] = rootA;',
          '    rank[rootA]++;',
          '}',
        ]} />
        <p>
          Rank is not necessarily the exact height after path compression.
          It is used as a balancing heuristic.
        </p>
      </Section>

      <Section title="11. Union by Size vs Union by Rank">
        <ul>
          <li>
            <strong>Union by size:</strong> Track the number of elements
            in each set.
          </li>
          <li>
            <strong>Union by rank:</strong> Track an approximate tree height.
          </li>
          <li>
            Both keep trees balanced when combined with path compression.
          </li>
          <li>
            In typical implementations, choose either size or rank;
            you do not need both.
          </li>
        </ul>
      </Section>

      <Section title="12. Complete Java Implementation">
        <p>
          This implementation uses path compression and union by size.
        </p>
        <Code lines={[
          'class DSU {',
          '    int[] parent;',
          '    int[] size;',
          '',
          '    DSU(int n) {',
          '        parent = new int[n];',
          '        size = new int[n];',
          '',
          '        for (int i = 0; i < n; i++) {',
          '            parent[i] = i;',
          '            size[i] = 1;',
          '        }',
          '    }',
          '',
          '    int find(int x) {',
          '        if (parent[x] == x) {',
          '            return x;',
          '        }',
          '',
          '        parent[x] = find(parent[x]);',
          '        return parent[x];',
          '    }',
          '',
          '    boolean union(int a, int b) {',
          '        int rootA = find(a);',
          '        int rootB = find(b);',
          '',
          '        if (rootA == rootB) {',
          '            return false;',
          '        }',
          '',
          '        if (size[rootA] < size[rootB]) {',
          '            int temp = rootA;',
          '            rootA = rootB;',
          '            rootB = temp;',
          '        }',
          '',
          '        parent[rootB] = rootA;',
          '        size[rootA] += size[rootB];',
          '',
          '        return true;',
          '    }',
          '',
          '    boolean connected(int a, int b) {',
          '        return find(a) == find(b);',
          '    }',
          '}',
        ]} />
        <p>
          <strong>union returns true</strong> if two different sets were
          merged. It returns false if they were already connected.
        </p>
      </Section>

      <Section title="13. Example Usage">
        <Code lines={[
          'DSU dsu = new DSU(5);',
          '',
          'dsu.union(0, 1);',
          'dsu.union(1, 2);',
          'dsu.union(3, 4);',
          '',
          'System.out.println(dsu.connected(0, 2));',
          '// true',
          '',
          'System.out.println(dsu.connected(0, 4));',
          '// false',
          '',
          'dsu.union(2, 4);',
          '',
          'System.out.println(dsu.connected(0, 4));',
          '// true',
        ]} />
      </Section>

      <Section title="14. Time Complexity">
        <p>
          With path compression and union by size or rank:
        </p>
        <ul>
          <li>
            <strong>Find:</strong> amortized O(α(n))
          </li>
          <li>
            <strong>Union:</strong> amortized O(α(n))
          </li>
          <li>
            <strong>Initialization:</strong> O(n)
          </li>
          <li>
            <strong>Space:</strong> O(n)
          </li>
        </ul>
        <p>
          α(n) is the inverse Ackermann function. It grows so slowly that
          it is at most a tiny constant for all practical input sizes.
        </p>
        <p>
          For interview analysis, DSU operations with both optimizations
          are commonly treated as nearly O(1) amortized.
        </p>
      </Section>

      <Section title="15. DSU for Cycle Detection">
        <p>
          In an undirected graph, if an edge connects two vertices that
          are already in the same DSU set, that edge creates a cycle
          relative to the edges processed so far.
        </p>
        <Code lines={[
          'for (int[] edge : edges) {',
          '    int u = edge[0];',
          '    int v = edge[1];',
          '',
          '    if (dsu.find(u) == dsu.find(v)) {',
          '        // Cycle detected',
          '    } else {',
          '        dsu.union(u, v);',
          '    }',
          '}',
        ]} />
        <p>
          This is useful for cycle detection in undirected graphs.
          It is not the standard method for detecting directed cycles.
        </p>
      </Section>

      <Section title="16. DSU and Kruskal's Algorithm">
        <p>
          Kruskal's algorithm builds a Minimum Spanning Tree (MST) by
          processing edges in increasing order of weight.
        </p>
        <ol>
          <li>Sort all edges by weight.</li>
          <li>For each edge (u, v), check their DSU roots.</li>
          <li>If roots differ, add the edge to the MST.</li>
          <li>Merge the two sets.</li>
          <li>Stop after selecting n - 1 edges for a connected graph.</li>
        </ol>
        <p>
          DSU prevents Kruskal from adding an edge that would create a cycle.
        </p>
        <p>
          Complexity is typically O(E log E) due to sorting. DSU operations
          add nearly linear total overhead.
        </p>
      </Section>

      <Section title="17. Number of Connected Components">
        <p>
          Initially, n elements form n separate components.
        </p>
        <p>
          Every successful union reduces the component count by one.
        </p>
        <Code lines={[
          'int components = n;',
          '',
          'if (dsu.union(u, v)) {',
          '    components--;',
          '}',
        ]} />
        <p>
          After processing all edges, components stores the number of
          connected components.
        </p>
      </Section>

      <Section title="18. DSU Limitations">
        <ul>
          <li>
            Standard DSU supports merging sets efficiently.
          </li>
          <li>
            It does not naturally support splitting a set after a union.
          </li>
          <li>
            It is designed for connectivity that grows through merges.
          </li>
          <li>
            It does not directly maintain arbitrary shortest paths,
            distances, or graph traversal order.
          </li>
        </ul>
        <p>
          If the problem requires removing edges or dynamically splitting
          connected components, ordinary DSU may not be enough.
        </p>
      </Section>

      <Section title="19. Common Mistakes">
        <ul>
          <li>Calling union on elements instead of their roots.</li>
          <li>Forgetting to initialize parent[i] = i.</li>
          <li>Forgetting to initialize size[i] = 1.</li>
          <li>Updating size of a non-root after merging.</li>
          <li>Using rank as exact tree height after path compression.</li>
          <li>Not checking whether both roots are already equal.</li>
          <li>Using DSU for directed graph cycle detection without adapting the algorithm.</li>
          <li>Assuming DSU can undo unions or split sets.</li>
        </ul>
      </Section>

      <Section title="20. When Should You Recognize DSU?">
        <p>
          Look for phrases such as:
        </p>
        <ul>
          <li>Are these two elements connected?</li>
          <li>Merge two groups or components.</li>
          <li>Find the number of connected components.</li>
          <li>Detect a cycle in an undirected graph.</li>
          <li>Process edges in increasing weight.</li>
          <li>Determine whether two accounts or items belong to the same group.</li>
        </ul>
        <p>
          If the problem involves many connectivity queries and merges,
          DSU is a strong candidate.
        </p>
      </Section>

      <Section title="21. Interview Questions">
        <ol>
          <li>What is Disjoint Set Union?</li>
          <li>What are find and union operations?</li>
          <li>Why do we use path compression?</li>
          <li>Explain union by size.</li>
          <li>Explain union by rank.</li>
          <li>Why is DSU nearly constant time?</li>
          <li>How does DSU detect cycles in an undirected graph?</li>
          <li>How is DSU used in Kruskal's algorithm?</li>
          <li>Can DSU efficiently split a set?</li>
          <li>What is the difference between DSU and DFS for connectivity?</li>
        </ol>
      </Section>

      <Section title="22. Practice Problems">
        <ol>
          <li>Implement DSU with path compression.</li>
          <li>Implement union by size.</li>
          <li>Find the number of connected components.</li>
          <li>Detect a cycle in an undirected graph.</li>
          <li>Number of Provinces.</li>
          <li>Redundant Connection.</li>
          <li>Accounts Merge.</li>
          <li>Kruskal's Minimum Spanning Tree.</li>
          <li>Number of Operations to Make Network Connected.</li>
          <li>Most Stones Removed with Same Row or Column.</li>
        </ol>
      </Section>

      <Section title="23. Quick Revision">
        <Code lines={[
          'DSU = Disjoint Set Union = Union-Find',
          '',
          'find(x) -> returns the root of x',
          'union(a, b) -> merges the sets of a and b',
          '',
          'Root condition:',
          'parent[x] == x',
          '',
          'Optimizations:',
          '1. Path compression',
          '2. Union by size OR union by rank',
          '',
          'Optimized amortized complexity:',
          'O(alpha(n)) per operation',
          '',
          'Common applications:',
          'Connectivity, cycle detection, Kruskal MST',
        ]} />
      </Section>
    </div>
  );
}
