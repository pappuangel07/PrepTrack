
const pageStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px',
  color: 'var(--text-primary, #1e293b)',
};

const cardStyle = {
  background: 'var(--card-bg, #ffffff)',
  border: '1px solid var(--border-color, #e2e8f0)',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '18px',
};

const headingStyle = {
  color: 'var(--accent-color, #4f46e5)',
  marginTop: 0,
};

const Code = ({ lines }) => (
  <pre
    style={{
      background: '#111827',
      color: '#e5e7eb',
      padding: '16px',
      borderRadius: '8px',
      overflowX: 'auto',
      fontSize: '13px',
      lineHeight: 1.6,
      whiteSpace: 'pre',
    }}
  >
    <code>{lines.join('\n')}</code>
  </pre>
);

const Section = ({ title, children }) => (
  <section style={cardStyle}>
    <h2 style={headingStyle}>{title}</h2>
    {children}
  </section>
);

const GraphsLesson = ({ onBack }) => {
  return (
    <main style={pageStyle}>
      <button
        onClick={onBack}
        style={{
          padding: '10px 16px',
          borderRadius: '8px',
          border: '1px solid var(--border-color, #cbd5e1)',
          background: 'var(--card-bg, #ffffff)',
          color: 'var(--text-primary, #1e293b)',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        ← Back to DSA Topics
      </button>

      <header style={cardStyle}>
        <h1 style={headingStyle}>Graphs</h1>
        <p>
          Graphs model relationships between objects. They are used
          in maps, networks, social connections, dependencies,
          scheduling, and many algorithmic problems.
        </p>
        <p>
          <strong>Prerequisites:</strong> Arrays, HashMap,
          Queue, Stack, recursion, heaps, and time complexity.
        </p>
      </header>

      <Section title="1. What is a Graph?">
        <p>
          A graph is a data structure consisting of:
        </p>
        <ul>
          <li><strong>Vertices (nodes):</strong> Objects in the graph.</li>
          <li><strong>Edges:</strong> Connections between vertices.</li>
        </ul>
        <Code
          lines={[
            'Example:',
            '',
            'A ----- B',
            '|       |',
            'C ----- D',
            '',
            'Vertices: A, B, C, D',
            'Edges: A-B, A-C, B-D, C-D',
          ]}
        />
        <p>
          A graph is commonly represented as
          <code> G = (V, E)</code>, where V is the set of vertices
          and E is the set of edges.
        </p>
      </Section>

      <Section title="2. Types of Graphs">
        <h3>Undirected Graph</h3>
        <p>
          An edge has no direction. If A is connected to B,
          B is also connected to A.
        </p>

        <h3>Directed Graph (Digraph)</h3>
        <p>
          Edges have direction. A → B does not automatically
          mean B → A.
        </p>

        <h3>Weighted Graph</h3>
        <p>
          Each edge has a weight such as distance, cost, or time.
        </p>

        <h3>Unweighted Graph</h3>
        <p>
          Edges are treated equally. The shortest path is usually
          the path with the fewest edges.
        </p>

        <h3>Connected Graph</h3>
        <p>
          In an undirected graph, every vertex can reach every
          other vertex.
        </p>

        <h3>Cycle</h3>
        <p>
          A path that starts and ends at the same vertex without
          repeating intermediate vertices.
        </p>

        <h3>Directed Acyclic Graph (DAG)</h3>
        <p>
          A directed graph with no directed cycle.
        </p>
      </Section>

      <Section title="3. Important Graph Terminology">
        <ul>
          <li><strong>Degree:</strong> Number of edges connected to a vertex in an undirected graph.</li>
          <li><strong>Indegree:</strong> Number of incoming edges in a directed graph.</li>
          <li><strong>Outdegree:</strong> Number of outgoing edges in a directed graph.</li>
          <li><strong>Path:</strong> Sequence of vertices connected by edges.</li>
          <li><strong>Cycle:</strong> A closed path.</li>
          <li><strong>Connected component:</strong> Maximal connected group in an undirected graph.</li>
          <li><strong>Self-loop:</strong> Edge from a vertex to itself.</li>
          <li><strong>Parallel edges:</strong> Multiple edges between the same pair of vertices.</li>
        </ul>
        <p>
          In an undirected graph, the sum of all vertex degrees
          equals <code>2E</code>, because each edge contributes
          to the degree of both endpoints.
        </p>
      </Section>

      <Section title="4. Graph Representation">
        <h3>Adjacency Matrix</h3>
        <p>
          Use a 2D array where <code>matrix[u][v]</code> indicates
          whether an edge exists.
        </p>
        <Code
          lines={[
            'int[][] matrix = new int[V][V];',
            '',
            '// Undirected edge between u and v',
            'matrix[u][v] = 1;',
            'matrix[v][u] = 1;',
          ]}
        />
        <p>
          Space: <code>O(V²)</code>. Checking an edge:
          <code> O(1)</code>. Useful for dense graphs.
        </p>

        <h3>Adjacency List</h3>
        <p>
          Store a list of neighbors for each vertex.
        </p>
        <Code
          lines={[
            'List<List<Integer>> graph = new ArrayList<>();',
            '',
            'for (int i = 0; i < V; i++) {',
            '    graph.add(new ArrayList<>());',
            '}',
            '',
            '// Undirected edge',
            'graph.get(u).add(v);',
            'graph.get(v).add(u);',
          ]}
        />
        <p>
          Space: <code>O(V + E)</code>. Usually preferred for
          sparse graphs and most interview problems.
        </p>
      </Section>

      <Section title="5. Directed and Undirected Adjacency Lists">
        <p>
          For an undirected edge between u and v, add both directions:
        </p>
        <Code
          lines={[
            'graph.get(u).add(v);',
            'graph.get(v).add(u);',
          ]}
        />
        <p>
          For a directed edge u → v, add only:
        </p>
        <Code
          lines={[
            'graph.get(u).add(v);',
          ]}
        />
        <p>
          For weighted graphs, store a neighbor and its weight,
          usually using a small Edge class or pair-like object.
        </p>
      </Section>

      <Section title="6. Breadth-First Search (BFS)">
        <p>
          BFS explores the graph level by level. It uses a queue
          and is useful for shortest paths in unweighted graphs.
        </p>
        <Code
          lines={[
            'void bfs(List<List<Integer>> graph, int start) {',
            '    boolean[] visited = new boolean[graph.size()];',
            '    Queue<Integer> queue = new LinkedList<>();',
            '',
            '    visited[start] = true;',
            '    queue.offer(start);',
            '',
            '    while (!queue.isEmpty()) {',
            '        int node = queue.poll();',
            '        System.out.println(node);',
            '',
            '        for (int next : graph.get(node)) {',
            '            if (!visited[next]) {',
            '                visited[next] = true;',
            '                queue.offer(next);',
            '            }',
            '        }',
            '    }',
            '}',
          ]}
        />
        <p>
          Mark visited when adding to the queue. This prevents
          the same vertex from being added repeatedly.
        </p>
        <p>
          Time: <code>O(V + E)</code>. Space: <code>O(V)</code>.
        </p>
      </Section>

      <Section title="7. Depth-First Search (DFS)">
        <p>
          DFS explores as far as possible along one path before
          backtracking. It can be implemented recursively or
          using a stack.
        </p>
        <Code
          lines={[
            'void dfs(List<List<Integer>> graph,',
            '        int node, boolean[] visited) {',
            '    visited[node] = true;',
            '    System.out.println(node);',
            '',
            '    for (int next : graph.get(node)) {',
            '        if (!visited[next]) {',
            '            dfs(graph, next, visited);',
            '        }',
            '    }',
            '}',
          ]}
        />
        <p>
          Call it with a visited array:
        </p>
        <Code
          lines={[
            'boolean[] visited = new boolean[V];',
            'dfs(graph, start, visited);',
          ]}
        />
        <p>
          Time: <code>O(V + E)</code>. Auxiliary space:
          <code> O(V)</code> including visited and recursion stack.
        </p>
      </Section>

      <Section title="8. Connected Components">
        <p>
          A connected component is a group of vertices where
          every vertex can reach every other vertex.
        </p>
        <p>
          To count components in an undirected graph:
        </p>
        <ol>
          <li>Create a visited array.</li>
          <li>Loop through every vertex.</li>
          <li>If unvisited, start DFS or BFS.</li>
          <li>Increase the component count.</li>
        </ol>
        <Code
          lines={[
            'int countComponents(List<List<Integer>> graph) {',
            '    int n = graph.size();',
            '    boolean[] visited = new boolean[n];',
            '    int count = 0;',
            '',
            '    for (int i = 0; i < n; i++) {',
            '        if (!visited[i]) {',
            '            count++;',
            '            dfs(graph, i, visited);',
            '        }',
            '    }',
            '',
            '    return count;',
            '}',
          ]}
        />
        <p>
          Time: <code>O(V + E)</code>.
        </p>
      </Section>

      <Section title="9. Cycle Detection in an Undirected Graph">
        <p>
          During DFS, if you reach a visited neighbor that is
          not the current node's parent, a cycle exists.
        </p>
        <Code
          lines={[
            'boolean hasCycleUndirected(',
            '        List<List<Integer>> graph,',
            '        int node, int parent, boolean[] visited) {',
            '    visited[node] = true;',
            '',
            '    for (int next : graph.get(node)) {',
            '        if (!visited[next]) {',
            '            if (hasCycleUndirected(',
            '                    graph, next, node, visited)) {',
            '                return true;',
            '            }',
            '        } else if (next != parent) {',
            '            return true;',
            '        }',
            '    }',
            '',
            '    return false;',
            '}',
          ]}
        />
        <p>
          Run this from every unvisited vertex to cover disconnected
          graphs. This parent-based method assumes a simple
          undirected graph without parallel edges.
        </p>
        <p>
          Time: <code>O(V + E)</code>.
        </p>
      </Section>

      <Section title="10. Cycle Detection in a Directed Graph">
        <p>
          In directed DFS, use three states:
        </p>
        <ul>
          <li>0 = unvisited</li>
          <li>1 = currently in recursion path</li>
          <li>2 = fully processed</li>
        </ul>
        <p>
          An edge to a node with state 1 indicates a back edge
          and therefore a directed cycle.
        </p>
        <Code
          lines={[
            'boolean hasCycleDirected(',
            '        List<List<Integer>> graph,',
            '        int node, int[] state) {',
            '    state[node] = 1;',
            '',
            '    for (int next : graph.get(node)) {',
            '        if (state[next] == 1) {',
            '            return true;',
            '        }',
            '',
            '        if (state[next] == 0',
            '                && hasCycleDirected(',
            '                    graph, next, state)) {',
            '            return true;',
            '        }',
            '    }',
            '',
            '    state[node] = 2;',
            '    return false;',
            '}',
          ]}
        />
        <p>
          Check all vertices because the graph may be disconnected.
          Time: <code>O(V + E)</code>.
        </p>
      </Section>

      <Section title="11. Topological Sorting">
        <p>
          Topological order is a linear ordering of vertices in
          a directed acyclic graph (DAG), such that for every
          edge u → v, u appears before v.
        </p>
        <p>
          It is used for course prerequisites, build systems,
          dependency ordering, and task scheduling.
        </p>
        <p>
          A graph with a directed cycle cannot have a valid
          topological ordering.
        </p>
      </Section>

      <Section title="12. Topological Sort using Kahn's Algorithm">
        <p>
          Kahn's algorithm uses indegree:
        </p>
        <ol>
          <li>Calculate indegree of every vertex.</li>
          <li>Add all vertices with indegree 0 to a queue.</li>
          <li>Remove one vertex and add it to the result.</li>
          <li>Decrease indegree of its neighbors.</li>
          <li>Add neighbors whose indegree becomes 0.</li>
        </ol>
        <Code
          lines={[
            'List<Integer> topologicalSort(',
            '        List<List<Integer>> graph) {',
            '    int n = graph.size();',
            '    int[] indegree = new int[n];',
            '',
            '    for (int u = 0; u < n; u++) {',
            '        for (int v : graph.get(u)) {',
            '            indegree[v]++;',
            '        }',
            '    }',
            '',
            '    Queue<Integer> queue = new LinkedList<>();',
            '    for (int i = 0; i < n; i++) {',
            '        if (indegree[i] == 0) {',
            '            queue.offer(i);',
            '        }',
            '    }',
            '',
            '    List<Integer> order = new ArrayList<>();',
            '    while (!queue.isEmpty()) {',
            '        int node = queue.poll();',
            '        order.add(node);',
            '',
            '        for (int next : graph.get(node)) {',
            '            indegree[next]--;',
            '            if (indegree[next] == 0) {',
            '                queue.offer(next);',
            '            }',
            '        }',
            '    }',
            '',
            '    if (order.size() != n) {',
            '        return new ArrayList<>();',
            '    }',
            '',
            '    return order;',
            '}',
          ]}
        />
        <p>
          If fewer than V vertices are processed, the graph
          contains a directed cycle.
        </p>
        <p>
          Time: <code>O(V + E)</code>. Space: <code>O(V)</code>.
        </p>
      </Section>

      <Section title="13. Shortest Path in an Unweighted Graph">
        <p>
          Use BFS. Since every edge has equal cost, the first
          time a vertex is reached gives its minimum number
          of edges from the source.
        </p>
        <Code
          lines={[
            'int[] shortestDistanceUnweighted(',
            '        List<List<Integer>> graph, int source) {',
            '    int n = graph.size();',
            '    int[] distance = new int[n];',
            '    Arrays.fill(distance, -1);',
            '',
            '    Queue<Integer> queue = new LinkedList<>();',
            '    distance[source] = 0;',
            '    queue.offer(source);',
            '',
            '    while (!queue.isEmpty()) {',
            '        int node = queue.poll();',
            '',
            '        for (int next : graph.get(node)) {',
            '            if (distance[next] == -1) {',
            '                distance[next] = distance[node] + 1;',
            '                queue.offer(next);',
            '            }',
            '        }',
            '    }',
            '',
            '    return distance;',
            '}',
          ]}
        />
        <p>
          A distance of -1 means the vertex is unreachable.
          Time: <code>O(V + E)</code>.
        </p>
      </Section>

      <Section title="14. Dijkstra's Algorithm">
        <p>
          Dijkstra finds shortest paths from one source in a
          weighted graph with <strong>non-negative edge weights</strong>.
        </p>
        <p>
          It repeatedly processes the vertex with the smallest
          known distance using a min priority queue.
        </p>
        <Code
          lines={[
            'class Edge {',
            '    int to;',
            '    int weight;',
            '',
            '    Edge(int to, int weight) {',
            '        this.to = to;',
            '        this.weight = weight;',
            '    }',
            '}',
            '',
            'int[] dijkstra(',
            '        List<List<Edge>> graph, int source) {',
            '    int n = graph.size();',
            '    int[] dist = new int[n];',
            '    Arrays.fill(dist, Integer.MAX_VALUE);',
            '',
            '    PriorityQueue<int[]> pq =',
            '        new PriorityQueue<>(',
            '            (a, b) -> Integer.compare(a[1], b[1]));',
            '',
            '    dist[source] = 0;',
            '    pq.offer(new int[]{source, 0});',
            '',
            '    while (!pq.isEmpty()) {',
            '        int[] current = pq.poll();',
            '        int node = current[0];',
            '        int distance = current[1];',
            '',
            '        if (distance != dist[node]) continue;',
            '',
            '        for (Edge edge : graph.get(node)) {',
            '            int next = edge.to;',
            '            int newDist = distance + edge.weight;',
            '',
            '            if (newDist < dist[next]) {',
            '                dist[next] = newDist;',
            '                pq.offer(new int[]{next, newDist});',
            '            }',
            '        }',
            '    }',
            '',
            '    return dist;',
            '}',
          ]}
        />
        <p>
          The stale-entry check skips outdated priority queue
          entries. In production code, use a sufficiently wide
          type such as <code>long</code> for distances if
          overflow is possible.
        </p>
        <p>
          With a binary heap and adjacency list, the common
          complexity is <code>O((V + E) log V)</code>.
        </p>
        <p>
          Do not use Dijkstra when negative edge weights exist.
        </p>
      </Section>

      <Section title="15. Bellman-Ford Algorithm">
        <p>
          Bellman-Ford supports negative edge weights and can
          detect a reachable negative-weight cycle.
        </p>
        <ol>
          <li>Initialize source distance to 0.</li>
          <li>Relax every edge V - 1 times.</li>
          <li>Run one additional pass.</li>
          <li>If any distance can still improve, a reachable negative cycle exists.</li>
        </ol>
        <p>
          Relaxing edge u → v with weight w means checking
          whether <code>dist[u] + w</code> is smaller than
          <code>dist[v]</code>.
        </p>
        <p>
          Time: <code>O(VE)</code>. Space:
          <code> O(V)</code>.
        </p>
        <p>
          Bellman-Ford is slower than Dijkstra for many
          non-negative-weight graphs, but handles negative
          edges correctly.
        </p>
      </Section>

      <Section title="16. Floyd-Warshall Algorithm">
        <p>
          Floyd-Warshall computes shortest paths between
          every pair of vertices.
        </p>
        <p>
          Its dynamic programming idea is to ask whether
          using vertex k as an intermediate point improves
          the path from i to j.
        </p>
        <Code
          lines={[
            'for (int k = 0; k < n; k++) {',
            '    for (int i = 0; i < n; i++) {',
            '        for (int j = 0; j < n; j++) {',
            '            if (dist[i][k] != INF',
            '                    && dist[k][j] != INF) {',
            '                dist[i][j] = Math.min(',
            '                    dist[i][j],',
            '                    dist[i][k] + dist[k][j]);',
            '            }',
            '        }',
            '    }',
            '}',
          ]}
        />
        <p>
          Time: <code>O(V³)</code>. Space:
          <code> O(V²)</code>.
        </p>
        <p>
          A negative value on <code>dist[i][i]</code> after
          completion indicates a negative cycle.
        </p>
      </Section>

      <Section title="17. Disjoint Set Union (DSU)">
        <p>
          DSU, also called Union-Find, maintains groups of
          connected elements.
        </p>
        <ul>
          <li><strong>find(x):</strong> Finds the representative of x's set.</li>
          <li><strong>union(a, b):</strong> Merges the sets containing a and b.</li>
          <li><strong>Path compression:</strong> Makes nodes point closer to the root.</li>
          <li><strong>Union by size/rank:</strong> Attaches the smaller tree under the larger.</li>
        </ul>
        <Code
          lines={[
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
            '        if (parent[x] != x) {',
            '            parent[x] = find(parent[x]);',
            '        }',
            '        return parent[x];',
            '    }',
            '',
            '    boolean union(int a, int b) {',
            '        int rootA = find(a);',
            '        int rootB = find(b);',
            '',
            '        if (rootA == rootB) return false;',
            '',
            '        if (size[rootA] < size[rootB]) {',
            '            int temp = rootA;',
            '            rootA = rootB;',
            '            rootB = temp;',
            '        }',
            '',
            '        parent[rootB] = rootA;',
            '        size[rootA] += size[rootB];',
            '        return true;',
            '    }',
            '}',
          ]}
        />
        <p>
          With path compression and union by size, operations
          take nearly constant amortized time:
          <code> O(α(V))</code>, where α is the inverse
          Ackermann function.
        </p>
      </Section>

      <Section title="18. Minimum Spanning Tree (MST)">
        <p>
          A spanning tree connects all vertices in a connected
          undirected graph without cycles.
        </p>
        <p>
          A minimum spanning tree has the smallest possible
          total edge weight among all spanning trees.
        </p>
        <ul>
          <li>It contains exactly V - 1 edges.</li>
          <li>It has no cycles.</li>
          <li>It connects all vertices.</li>
        </ul>
        <p>
          Two common MST algorithms are Kruskal and Prim.
        </p>
      </Section>

      <Section title="19. Kruskal's Algorithm">
        <p>
          Kruskal sorts all edges by weight and adds an edge
          if it does not create a cycle. DSU efficiently
          checks whether endpoints are already connected.
        </p>
        <ol>
          <li>Sort edges by increasing weight.</li>
          <li>Create a DSU with each vertex in its own set.</li>
          <li>Process edges in sorted order.</li>
          <li>Add edge if union succeeds.</li>
          <li>Stop after V - 1 edges for a connected graph.</li>
        </ol>
        <p>
          Time: <code>O(E log E)</code>, dominated by sorting.
          DSU operations are nearly constant amortized time.
        </p>
        <p>
          If fewer than V - 1 edges are selected, the graph
          is disconnected; the result is a minimum spanning
          forest.
        </p>
      </Section>

      <Section title="20. Prim's Algorithm">
        <p>
          Prim grows an MST from a starting vertex. At each
          step, choose the minimum-weight edge connecting
          the current tree to a vertex outside it.
        </p>
        <ul>
          <li>Start from any vertex.</li>
          <li>Add candidate edges to a min priority queue.</li>
          <li>Choose the smallest edge reaching an unvisited vertex.</li>
          <li>Add that vertex and its outgoing candidate edges.</li>
          <li>Continue until all vertices are included.</li>
        </ul>
        <p>
          With adjacency lists and a binary heap, a common
          complexity is <code>O(E log V)</code>.
        </p>
        <p>
          Prim and Kruskal solve the same MST problem but
          use different strategies: Prim grows one tree;
          Kruskal selects globally sorted edges.
        </p>
      </Section>

      <Section title="21. Bridges and Articulation Points">
        <p>
          A <strong>bridge</strong> is an edge whose removal
          increases the number of connected components.
        </p>
        <p>
          An <strong>articulation point</strong> is a vertex
          whose removal increases the number of connected
          components.
        </p>
        <p>
          DFS discovery times and low-link values can identify
          them in <code>O(V + E)</code>.
        </p>
        <ul>
          <li><strong>Discovery time:</strong> When a vertex is first visited.</li>
          <li><strong>Low value:</strong> Earliest discovery time reachable through DFS tree edges and at most one back edge.</li>
        </ul>
        <p>
          For a DFS tree edge u → v, it is a bridge when
          <code> low[v] &gt; disc[u]</code>.
        </p>
        <p>
          For a non-root vertex u, it is an articulation point
          if a child v has <code>low[v] &gt;= disc[u]</code>.
          The DFS root is an articulation point if it has
          more than one DFS child.
        </p>
      </Section>

      <Section title="22. Graph Algorithm Selection">
        <ul>
          <li><strong>Reachability:</strong> BFS or DFS.</li>
          <li><strong>Unweighted shortest path:</strong> BFS.</li>
          <li><strong>Weighted shortest path, non-negative:</strong> Dijkstra.</li>
          <li><strong>Negative edges:</strong> Bellman-Ford.</li>
          <li><strong>All-pairs shortest paths:</strong> Floyd-Warshall.</li>
          <li><strong>Directed dependency order:</strong> Topological sort.</li>
          <li><strong>Cycle detection:</strong> DFS or DSU depending on graph type.</li>
          <li><strong>Minimum spanning tree:</strong> Kruskal or Prim.</li>
          <li><strong>Dynamic connectivity:</strong> DSU.</li>
          <li><strong>Bridges/articulation points:</strong> DFS low-link.</li>
        </ul>
      </Section>

      <Section title="23. Common Interview Mistakes">
        <ul>
          <li>Forgetting to mark visited vertices.</li>
          <li>Marking visited too late in BFS.</li>
          <li>Running BFS for weighted shortest paths without a valid reason.</li>
          <li>Using Dijkstra with negative edge weights.</li>
          <li>Not checking disconnected components.</li>
          <li>Confusing directed and undirected cycle detection.</li>
          <li>Using topological sorting on a cyclic graph.</li>
          <li>Forgetting that MST is defined for undirected weighted graphs.</li>
          <li>Confusing a shortest path tree with a minimum spanning tree.</li>
          <li>Ignoring integer overflow in distance calculations.</li>
        </ul>
      </Section>

      <Section title="24. Practice Problems">
        <h3>Beginner</h3>
        <ul>
          <li>BFS traversal</li>
          <li>DFS traversal</li>
          <li>Number of connected components</li>
          <li>Find whether a path exists</li>
          <li>Flood Fill</li>
          <li>Number of Islands</li>
        </ul>

        <h3>Intermediate</h3>
        <ul>
          <li>Detect cycle in an undirected graph</li>
          <li>Detect cycle in a directed graph</li>
          <li>Course Schedule</li>
          <li>Topological Sort</li>
          <li>Shortest path in an unweighted graph</li>
          <li>Dijkstra's algorithm</li>
          <li>Disjoint Set Union</li>
        </ul>

        <h3>Advanced</h3>
        <ul>
          <li>Bellman-Ford</li>
          <li>Floyd-Warshall</li>
          <li>Minimum Spanning Tree</li>
          <li>Critical Connections / Bridges</li>
          <li>Articulation Points</li>
          <li>Strongly Connected Components</li>
          <li>Network Delay Time</li>
          <li>Cheapest Flights Within K Stops</li>
        </ul>
      </Section>

      <Section title="25. Interview Quick Revision">
        <ul>
          <li>Graph = vertices + edges.</li>
          <li>Adjacency list usually uses O(V + E) space.</li>
          <li>BFS uses a queue.</li>
          <li>DFS uses recursion or a stack.</li>
          <li>BFS finds shortest paths in unweighted graphs.</li>
          <li>Dijkstra requires non-negative edge weights.</li>
          <li>Bellman-Ford supports negative edges.</li>
          <li>Topological order exists only for DAGs.</li>
          <li>DSU supports efficient union and find.</li>
          <li>Kruskal uses sorted edges and DSU.</li>
          <li>Prim grows an MST using a priority queue.</li>
          <li>Bridges and articulation points use low-link values.</li>
        </ul>
        <p>
          <strong>Interview strategy:</strong> First identify
          whether the graph is directed, undirected, weighted,
          disconnected, or cyclic. Then select the algorithm
          based on the exact question: reachability, shortest
          path, dependency order, connectivity, or MST.
        </p>
      </Section>

      <Section title="Lesson Complete">
        <p>
          You have covered graph representation, BFS, DFS,
          connected components, cycle detection, topological
          sorting, shortest paths, DSU, MST, and low-link
          concepts.
        </p>
        <button
          onClick={onBack}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--accent-color, #4f46e5)',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          Back to DSA Topics
        </button>
      </Section>
    </main>
  );
};

export default GraphsLesson;
