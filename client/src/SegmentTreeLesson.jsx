
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

export default function SegmentTreeLesson({ onBack }) {
  return (
    <div style={pageStyle}>
      <button onClick={onBack} style={{ marginBottom: '16px' }}>
        ← Back to DSA
      </button>

      <h1>Segment Tree</h1>
      <p>Beginner to Advanced • Java • Interview Preparation</p>

      <Section title="1. What is a Segment Tree?">
        <p>
          A Segment Tree is a tree-based data structure used to answer
          queries about intervals or ranges of an array efficiently.
        </p>
        <p>
          It is especially useful when the array changes frequently and
          we need to answer many range queries.
        </p>
        <p>Examples of range queries:</p>
        <ul>
          <li>Find the sum from index L to R.</li>
          <li>Find the minimum value from index L to R.</li>
          <li>Find the maximum value from index L to R.</li>
          <li>Find the greatest common divisor in a range.</li>
        </ul>
      </Section>

      <Section title="2. Why Not Use a Normal Array?">
        <p>
          Suppose we have an array of n elements and need to repeatedly
          calculate the sum of elements between L and R.
        </p>
        <p>
          A normal loop visits every element in the requested range.
        </p>
        <Code lines={[
          'int sum = 0;',
          '',
          'for (int i = left; i <= right; i++) {',
          '    sum += arr[i];',
          '}',
        ]} />
        <p>
          Worst-case query time is O(n).
        </p>
        <p>
          A Segment Tree can answer range sum queries in O(log n) time
          after O(n) construction.
        </p>
      </Section>

      <Section title="3. Main Idea">
        <p>
          Each tree node represents a segment of the original array.
        </p>
        <ul>
          <li>The root represents the entire array.</li>
          <li>The left child represents the left half.</li>
          <li>The right child represents the right half.</li>
          <li>Each child divides its segment again.</li>
          <li>Leaves represent individual array elements.</li>
        </ul>
        <p>
          For a sum Segment Tree, each node stores the sum of its
          represented segment.
        </p>
      </Section>

      <Section title="4. Example Tree">
        <p>Array:</p>
        <Code lines={[
          'arr = [2, 4, 6, 8]',
        ]} />
        <p>Conceptual Segment Tree:</p>
        <Code lines={[
          '                 [0,3] = 20',
          '                /       \\',
          '        [0,1] = 6       [2,3] = 14',
          '          /   \\           /   \\',
          '      [0,0]=2 [1,1]=4 [2,2]=6 [3,3]=8',
        ]} />
        <p>
          The root stores 20 because the sum of the entire array is 20.
        </p>
        <p>
          The node representing indices 0 to 1 stores 2 + 4 = 6.
        </p>
      </Section>

      <Section title="5. How the Array is Divided">
        <p>
          For a segment from left to right, calculate its midpoint:
        </p>
        <Code lines={[
          'mid = left + (right - left) / 2',
          '',
          'Left child:  [left, mid]',
          'Right child: [mid + 1, right]',
        ]} />
        <p>
          This creates two smaller segments until left == right.
        </p>
        <p>
          A segment where left == right is a leaf node.
        </p>
      </Section>

      <Section title="6. Why Do We Use 4 * n Array Size?">
        <p>
          A Segment Tree is commonly stored in an ordinary array instead
          of creating separate Node objects.
        </p>
        <p>
          For an array of n elements, we commonly allocate:
        </p>
        <Code lines={[
          'int[] tree = new int[4 * n];',
        ]} />
        <p>
          This is a safe, convenient allocation for a recursive Segment
          Tree using the usual indexing convention.
        </p>
        <p>
          For a node at index i:
        </p>
        <ul>
          <li>Left child: 2 * i</li>
          <li>Right child: 2 * i + 1</li>
        </ul>
        <p>
          We usually start the root at index 1. Index 0 remains unused.
        </p>
      </Section>

      <Section title="7. Building the Segment Tree">
        <p>
          Build recursively. If the segment contains one element, store
          that array value. Otherwise, build both children and combine
          their results.
        </p>
        <Code lines={[
          'void build(int node, int left, int right) {',
          '    if (left == right) {',
          '        tree[node] = arr[left];',
          '        return;',
          '    }',
          '',
          '    int mid = left + (right - left) / 2;',
          '',
          '    build(node * 2, left, mid);',
          '    build(node * 2 + 1, mid + 1, right);',
          '',
          '    tree[node] = tree[node * 2]',
          '               + tree[node * 2 + 1];',
          '}',
        ]} />
        <p>
          The parent value is calculated after its children are built.
        </p>
      </Section>

      <Section title="8. Range Sum Query">
        <p>
          Suppose we want the sum from queryLeft to queryRight.
        </p>
        <p>There are three cases:</p>
        <ol>
          <li>
            <strong>No overlap:</strong> The node's segment is completely
            outside the query. Return 0.
          </li>
          <li>
            <strong>Complete overlap:</strong> The node's segment is
            completely inside the query. Return its stored sum.
          </li>
          <li>
            <strong>Partial overlap:</strong> Search both children and
            add their results.
          </li>
        </ol>
        <Code lines={[
          'int query(int node, int left, int right,',
          '          int queryLeft, int queryRight) {',
          '',
          '    if (right < queryLeft || left > queryRight) {',
          '        return 0;',
          '    }',
          '',
          '    if (queryLeft <= left && right <= queryRight) {',
          '        return tree[node];',
          '    }',
          '',
          '    int mid = left + (right - left) / 2;',
          '',
          '    int leftSum = query(node * 2, left, mid,',
          '                       queryLeft, queryRight);',
          '',
          '    int rightSum = query(node * 2 + 1, mid + 1, right,',
          '                        queryLeft, queryRight);',
          '',
          '    return leftSum + rightSum;',
          '}',
        ]} />
        <p>
          We return 0 for no overlap because 0 is the identity value
          for addition: x + 0 = x.
        </p>
      </Section>

      <Section title="9. Query Dry Run">
        <p>Array:</p>
        <Code lines={[
          'arr = [2, 4, 6, 8]',
          '',
          'Query: sum from index 1 to 2',
          'Expected result: 4 + 6 = 10',
        ]} />
        <p>
          The query asks for segment [1,2].
        </p>
        <ul>
          <li>Segment [0,0] does not overlap. Return 0.</li>
          <li>Segment [1,1] is fully covered. Return 4.</li>
          <li>Segment [2,2] is fully covered. Return 6.</li>
          <li>Segment [3,3] does not overlap. Return 0.</li>
        </ul>
        <p>
          The result is 0 + 4 + 6 + 0 = 10.
        </p>
      </Section>

      <Section title="10. Point Update">
        <p>
          A point update changes one array element.
        </p>
        <p>
          Example: change arr[2] from 6 to 10.
        </p>
        <Code lines={[
          'void update(int node, int left, int right,',
          '           int index, int value) {',
          '',
          '    if (left == right) {',
          '        arr[index] = value;',
          '        tree[node] = value;',
          '        return;',
          '    }',
          '',
          '    int mid = left + (right - left) / 2;',
          '',
          '    if (index <= mid) {',
          '        update(node * 2, left, mid, index, value);',
          '    } else {',
          '        update(node * 2 + 1, mid + 1, right,',
          '               index, value);',
          '    }',
          '',
          '    tree[node] = tree[node * 2]',
          '               + tree[node * 2 + 1];',
          '}',
        ]} />
        <p>
          After updating the leaf, we recalculate the values of its
          ancestors while returning from recursion.
        </p>
      </Section>

      <Section title="11. Update Dry Run">
        <p>Original array:</p>
        <Code lines={[
          'arr = [2, 4, 6, 8]',
          'tree root = 20',
        ]} />
        <p>Update index 2 to 10:</p>
        <Code lines={[
          'arr = [2, 4, 10, 8]',
          '',
          'Segment [2,3] = 10 + 8 = 18',
          'Segment [0,3] = 6 + 18 = 24',
        ]} />
        <p>
          Only the nodes along the path from the root to index 2 need
          to be updated.
        </p>
      </Section>

      <Section title="12. Complete Java Implementation">
        <p>
          This implementation supports range sum queries and point updates.
          It uses 0-based array indices.
        </p>
        <Code lines={[
          'class SegmentTree {',
          '    int[] arr;',
          '    int[] tree;',
          '    int n;',
          '',
          '    SegmentTree(int[] input) {',
          '        arr = input.clone();',
          '        n = arr.length;',
          '        tree = new int[4 * n];',
          '',
          '        if (n > 0) {',
          '            build(1, 0, n - 1);',
          '        }',
          '    }',
          '',
          '    void build(int node, int left, int right) {',
          '        if (left == right) {',
          '            tree[node] = arr[left];',
          '            return;',
          '        }',
          '',
          '        int mid = left + (right - left) / 2;',
          '        build(node * 2, left, mid);',
          '        build(node * 2 + 1, mid + 1, right);',
          '',
          '        tree[node] = tree[node * 2]',
          '                   + tree[node * 2 + 1];',
          '    }',
          '',
          '    int query(int node, int left, int right,',
          '              int qLeft, int qRight) {',
          '        if (right < qLeft || left > qRight) {',
          '            return 0;',
          '        }',
          '',
          '        if (qLeft <= left && right <= qRight) {',
          '            return tree[node];',
          '        }',
          '',
          '        int mid = left + (right - left) / 2;',
          '',
          '        int a = query(node * 2, left, mid,',
          '                      qLeft, qRight);',
          '        int b = query(node * 2 + 1, mid + 1, right,',
          '                      qLeft, qRight);',
          '',
          '        return a + b;',
          '    }',
          '',
          '    int rangeSum(int left, int right) {',
          '        if (n == 0 || left > right) {',
          '            return 0;',
          '        }',
          '        return query(1, 0, n - 1, left, right);',
          '    }',
          '',
          '    void update(int node, int left, int right,',
          '               int index, int value) {',
          '        if (left == right) {',
          '            arr[index] = value;',
          '            tree[node] = value;',
          '            return;',
          '        }',
          '',
          '        int mid = left + (right - left) / 2;',
          '',
          '        if (index <= mid) {',
          '            update(node * 2, left, mid, index, value);',
          '        } else {',
          '            update(node * 2 + 1, mid + 1, right,',
          '                   index, value);',
          '        }',
          '',
          '        tree[node] = tree[node * 2]',
          '                   + tree[node * 2 + 1];',
          '    }',
          '',
          '    void pointUpdate(int index, int value) {',
          '        if (index < 0 || index >= n) {',
          '            throw new IndexOutOfBoundsException();',
          '        }',
          '        update(1, 0, n - 1, index, value);',
          '    }',
          '}',
        ]} />
      </Section>

      <Section title="13. Using the Segment Tree">
        <Code lines={[
          'int[] values = {2, 4, 6, 8};',
          'SegmentTree st = new SegmentTree(values);',
          '',
          'System.out.println(st.rangeSum(1, 2));',
          '// 10',
          '',
          'st.pointUpdate(2, 10);',
          '',
          'System.out.println(st.rangeSum(1, 2));',
          '// 14',
        ]} />
        <p>
          After the update, the range [1,2] contains 4 and 10.
        </p>
      </Section>

      <Section title="14. Time and Space Complexity">
        <ul>
          <li>
            <strong>Build:</strong> O(n)
          </li>
          <li>
            <strong>Range query:</strong> O(log n) for a standard Segment
            Tree query
          </li>
          <li>
            <strong>Point update:</strong> O(log n)
          </li>
          <li>
            <strong>Space:</strong> O(n)
          </li>
        </ul>
        <p>
          Each level divides the segment into smaller parts. The tree
          height is O(log n), and a range query visits only a limited
          number of relevant nodes at each level.
        </p>
      </Section>

      <Section title="15. Segment Tree for Minimum">
        <p>
          A Segment Tree can store minimum values instead of sums.
        </p>
        <p>
          Change the combine operation from addition to Math.min.
        </p>
        <Code lines={[
          'tree[node] = Math.min(',
          '    tree[node * 2],',
          '    tree[node * 2 + 1]',
          ');',
          '',
          'No-overlap return value:',
          'Integer.MAX_VALUE',
        ]} />
        <p>
          Integer.MAX_VALUE is used because it is the identity value for
          minimum: min(x, MAX_VALUE) = x.
        </p>
        <p>
          For maximum queries, use Math.max and return
          Integer.MIN_VALUE for no overlap.
        </p>
      </Section>

      <Section title="16. Lazy Propagation">
        <p>
          Lazy propagation is an optimization for range updates.
        </p>
        <p>
          Without lazy propagation, changing every element in a range
          could take O(n) time.
        </p>
        <p>
          With lazy propagation, we postpone updates to children until
          they are needed.
        </p>
        <p>Example operation:</p>
        <Code lines={[
          'Add 5 to every element in range [2, 7]',
        ]} />
        <p>
          If a tree node completely represents the requested range,
          update its stored value and record the pending change in a
          lazy array.
        </p>
        <p>
          For a range sum tree with segment length len:
        </p>
        <Code lines={[
          'tree[node] += value * len;',
          'lazy[node] += value;',
        ]} />
        <p>
          Before visiting children, push the pending update down to them.
        </p>
      </Section>

      <Section title="17. Lazy Propagation: Push Operation">
        <p>
          For range addition and range sum, the pending value is added
          to both children.
        </p>
        <Code lines={[
          'void push(int node, int left, int right) {',
          '    if (lazy[node] == 0 || left == right) {',
          '        return;',
          '    }',
          '',
          '    int mid = left + (right - left) / 2;',
          '    int value = lazy[node];',
          '',
          '    tree[node * 2] += value * (mid - left + 1);',
          '    tree[node * 2 + 1] += value * (right - mid);',
          '',
          '    lazy[node * 2] += value;',
          '    lazy[node * 2 + 1] += value;',
          '',
          '    lazy[node] = 0;',
          '}',
        ]} />
        <p>
          The left child length is mid - left + 1.
        </p>
        <p>
          The right child length is right - mid.
        </p>
        <p>
          After pushing, the parent already represents the correct sum.
          Its pending update has simply been passed to its children.
        </p>
      </Section>

      <Section title="18. Lazy Propagation: Range Update">
        <p>
          This is the recursive structure for adding value to every
          element in a range.
        </p>
        <Code lines={[
          'void rangeAdd(int node, int left, int right,',
          '              int qLeft, int qRight, int value) {',
          '',
          '    if (right < qLeft || left > qRight) {',
          '        return;',
          '    }',
          '',
          '    if (qLeft <= left && right <= qRight) {',
          '        tree[node] += value * (right - left + 1);',
          '        lazy[node] += value;',
          '        return;',
          '    }',
          '',
          '    push(node, left, right);',
          '',
          '    int mid = left + (right - left) / 2;',
          '',
          '    rangeAdd(node * 2, left, mid,',
          '             qLeft, qRight, value);',
          '',
          '    rangeAdd(node * 2 + 1, mid + 1, right,',
          '             qLeft, qRight, value);',
          '',
          '    tree[node] = tree[node * 2]',
          '                 + tree[node * 2 + 1];',
          '}',
        ]} />
        <p>
          Lazy propagation makes range addition and range sum queries
          O(log n) each for this standard implementation.
        </p>
      </Section>

      <Section title="19. Common Segment Tree Variants">
        <ul>
          <li>Range sum + point update</li>
          <li>Range minimum + point update</li>
          <li>Range maximum + point update</li>
          <li>Range sum + range addition with lazy propagation</li>
          <li>Range minimum + range update</li>
          <li>Segment Tree with coordinate compression</li>
          <li>Persistent Segment Tree</li>
          <li>Dynamic Segment Tree</li>
        </ul>
        <p>
          Different variants may require different stored information
          and different merge operations.
        </p>
      </Section>

      <Section title="20. Segment Tree vs Fenwick Tree">
        <ul>
          <li>
            <strong>Fenwick Tree (BIT):</strong> Usually simpler and
            smaller for prefix sums and point updates.
          </li>
          <li>
            <strong>Segment Tree:</strong> More flexible for minimum,
            maximum, custom range operations, and many range-update
            variants.
          </li>
          <li>
            Both can support certain range sum and update tasks in
            O(log n).
          </li>
        </ul>
        <p>
          Do not automatically choose Segment Tree for every range sum
          problem. A Fenwick Tree may be the simpler tool.
        </p>
      </Section>

      <Section title="21. Common Mistakes">
        <ul>
          <li>Using the wrong no-overlap identity value.</li>
          <li>Forgetting to recalculate parent values after updates.</li>
          <li>Mixing inclusive and exclusive range boundaries.</li>
          <li>Using incorrect child indices.</li>
          <li>Allocating too little space for the tree array.</li>
          <li>Forgetting to push lazy values before partial recursion.</li>
          <li>Applying a sum update without multiplying by segment length.</li>
          <li>Using an incorrect left or right child segment length.</li>
          <li>Assuming every Segment Tree operation is O(log n) without checking the variant.</li>
        </ul>
      </Section>

      <Section title="22. Interview Questions">
        <ol>
          <li>What is a Segment Tree?</li>
          <li>Why is build O(n)?</li>
          <li>Explain no overlap, complete overlap, and partial overlap.</li>
          <li>How does a point update work?</li>
          <li>Why do we commonly allocate 4 * n space?</li>
          <li>How can a Segment Tree answer minimum queries?</li>
          <li>What is lazy propagation?</li>
          <li>Why do we multiply by segment length for range sum updates?</li>
          <li>Compare Segment Tree and Fenwick Tree.</li>
          <li>What is a Persistent Segment Tree?</li>
        </ol>
      </Section>

      <Section title="23. Practice Problems">
        <ol>
          <li>Range Sum Query - Mutable</li>
          <li>Range Minimum Query</li>
          <li>Count of Smaller Numbers After Self</li>
          <li>Range Sum Query 2D - Immutable</li>
          <li>My Calendar III</li>
          <li>Falling Squares</li>
          <li>Count of Range Sum</li>
          <li>Handling range addition and range sum queries</li>
        </ol>
      </Section>

      <Section title="24. Quick Revision">
        <Code lines={[
          'Segment Tree:',
          'Tree of array intervals',
          '',
          'Build: O(n)',
          'Range query: O(log n)',
          'Point update: O(log n)',
          'Space: O(n)',
          '',
          'Query cases:',
          '1. No overlap -> identity value',
          '2. Complete overlap -> return stored value',
          '3. Partial overlap -> query both children',
          '',
          'Lazy propagation:',
          'Delay updates to children',
          'Range sum update = value * segment length',
          '',
          'Common uses:',
          'Sum, min, max, GCD, range updates',
        ]} />
      </Section>
    </div>
  );
}
