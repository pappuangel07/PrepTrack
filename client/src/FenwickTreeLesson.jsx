
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

export default function FenwickTreeLesson({ onBack }) {
  return (
    <div style={pageStyle}>
      <button onClick={onBack} style={{ marginBottom: '16px' }}>
        ← Back to DSA
      </button>

      <h1>Fenwick Tree (Binary Indexed Tree)</h1>
      <p>Beginner to Advanced • Java • Interview Preparation</p>

      <Section title="1. What is a Fenwick Tree?">
        <p>
          A Fenwick Tree is a data structure used to calculate prefix
          sums efficiently while allowing array values to be updated.
        </p>
        <p>
          It is also called a <strong>Binary Indexed Tree (BIT)</strong>.
        </p>
        <p>It commonly supports:</p>
        <ul>
          <li>Point update: add a value to one array position.</li>
          <li>Prefix sum: calculate the sum from index 1 to index i.</li>
          <li>Range sum: calculate the sum between two indices.</li>
        </ul>
      </Section>

      <Section title="2. Why Do We Need It?">
        <p>
          Suppose an array contains n elements.
        </p>
        <p>
          If we repeatedly calculate prefix sums using a loop, each
          query can take O(n) time.
        </p>
        <Code lines={[
          'int sum = 0;',
          '',
          'for (int i = 0; i <= index; i++) {',
          '    sum += arr[i];',
          '}',
        ]} />
        <p>
          If we use a Fenwick Tree, both point updates and prefix sum
          queries take O(log n) time.
        </p>
      </Section>

      <Section title="3. Main Idea">
        <p>
          A Fenwick Tree does not store every prefix sum separately.
          Instead, each tree position stores the sum of a specific
          interval of the array.
        </p>
        <p>
          The interval size is determined by the binary representation
          of the index.
        </p>
        <p>
          The key operation is called <strong>lowbit</strong>.
        </p>
      </Section>

      <Section title="4. The lowbit Operation">
        <p>
          lowbit(x) returns the value of the lowest set bit in the
          binary representation of x.
        </p>
        <Code lines={[
          'lowbit(x) = x & -x',
        ]} />
        <p>Examples:</p>
        <Code lines={[
          'x = 12',
          'Binary: 1100',
          'lowbit(12) = 4',
          '',
          'x = 10',
          'Binary: 1010',
          'lowbit(10) = 2',
          '',
          'x = 8',
          'Binary: 1000',
          'lowbit(8) = 8',
        ]} />
        <p>
          The bitwise AND of x and -x isolates the lowest set bit.
        </p>
      </Section>

      <Section title="5. Why Does x & -x Work?">
        <p>
          Negative numbers are represented using two's complement.
          Negating x flips the bits and adds 1.
        </p>
        <p>
          The lowest set bit remains isolated when x and -x are ANDed.
        </p>
        <Code lines={[
          'x       =  12 = 1100',
          '-x      = -12 = 0100  (lower bits shown)',
          '',
          'x & -x  = 0100 = 4',
        ]} />
        <p>
          You do not need to manually calculate the binary form in
          programming problems. Use:
        </p>
        <Code lines={[
          'int lowbit(int x) {',
          '    return x & -x;',
          '}',
        ]} />
      </Section>

      <Section title="6. Fenwick Tree Uses 1-Based Indexing">
        <p>
          The internal Fenwick Tree is usually indexed from 1 to n.
        </p>
        <p>
          If the original array uses 0-based indexing, convert the
          array index i to i + 1 before accessing the tree.
        </p>
        <Code lines={[
          'Original array index: 0 1 2 3 4',
          'Fenwick Tree index:   1 2 3 4 5',
        ]} />
        <p>
          This is important because lowbit(0) is 0. If an update loop
          starts at index 0, it will never move forward.
        </p>
      </Section>

      <Section title="7. What Does Each BIT Position Store?">
        <p>
          Each position i stores the sum of the range:
        </p>
        <Code lines={[
          '[i - lowbit(i) + 1, i]',
        ]} />
        <p>Example:</p>
        <Code lines={[
          'i = 4',
          'lowbit(4) = 4',
          'BIT[4] stores array indices 1 to 4',
          '',
          'i = 6',
          'lowbit(6) = 2',
          'BIT[6] stores array indices 5 to 6',
        ]} />
        <p>
          The stored intervals are carefully chosen so that a prefix
          can be assembled from a small number of BIT positions.
        </p>
      </Section>

      <Section title="8. Prefix Sum Query">
        <p>
          To calculate the prefix sum from index 1 to i:
        </p>
        <ol>
          <li>Add BIT[i] to the answer.</li>
          <li>Move to i - lowbit(i).</li>
          <li>Repeat until i becomes 0.</li>
        </ol>
        <Code lines={[
          'int prefixSum(int i) {',
          '    int sum = 0;',
          '',
          '    while (i > 0) {',
          '        sum += bit[i];',
          '        i -= i & -i;',
          '    }',
          '',
          '    return sum;',
          '}',
        ]} />
        <p>
          Each step removes the lowest set bit from the current index.
        </p>
      </Section>

      <Section title="9. Prefix Sum Dry Run">
        <p>Suppose the original array is:</p>
        <Code lines={[
          'arr = [2, 4, 6, 8, 10]',
        ]} />
        <p>
          Internally, use 1-based indices. Query prefixSum(5).
        </p>
        <Code lines={[
          'i = 5',
          'lowbit(5) = 1',
          'add BIT[5]',
          'i = 5 - 1 = 4',
          '',
          'i = 4',
          'lowbit(4) = 4',
          'add BIT[4]',
          'i = 4 - 4 = 0',
          '',
          'Stop',
        ]} />
        <p>
          BIT[5] stores arr[5], which is 10.
        </p>
        <p>
          BIT[4] stores arr[1] + arr[2] + arr[3] + arr[4],
          which is 2 + 4 + 6 + 8 = 20.
        </p>
        <p>
          Therefore prefixSum(5) = 10 + 20 = 30.
        </p>
      </Section>

      <Section title="10. Point Update">
        <p>
          A Fenwick Tree update usually means adding a delta to an
          existing array position.
        </p>
        <p>
          To update position i:
        </p>
        <ol>
          <li>Add delta to BIT[i].</li>
          <li>Move to i + lowbit(i).</li>
          <li>Repeat while i is within the tree.</li>
        </ol>
        <Code lines={[
          'void add(int i, int delta) {',
          '    while (i <= n) {',
          '        bit[i] += delta;',
          '        i += i & -i;',
          '    }',
          '}',
        ]} />
        <p>
          Unlike prefixSum, update moves forward by adding lowbit(i).
        </p>
      </Section>

      <Section title="11. Why Does Update Visit Those Positions?">
        <p>
          When an array value changes, every BIT interval containing
          that index must also change.
        </p>
        <p>
          The update operation moves through exactly the BIT positions
          that cover the updated array index.
        </p>
        <Code lines={[
          'Example: update internal index 3',
          '',
          'i = 3',
          'lowbit(3) = 1',
          'next = 3 + 1 = 4',
          '',
          'i = 4',
          'lowbit(4) = 4',
          'next = 4 + 4 = 8',
          '',
          'Stop if 8 > n',
        ]} />
      </Section>

      <Section title="12. Complete Java Implementation">
        <p>
          This implementation uses 0-based input array indices and
          converts them internally to 1-based BIT indices.
        </p>
        <Code lines={[
          'class FenwickTree {',
          '    int n;',
          '    int[] bit;',
          '',
          '    FenwickTree(int n) {',
          '        this.n = n;',
          '        bit = new int[n + 1];',
          '    }',
          '',
          '    void add(int index, int delta) {',
          '        index++;',
          '',
          '        while (index <= n) {',
          '            bit[index] += delta;',
          '            index += index & -index;',
          '        }',
          '    }',
          '',
          '    int prefixSum(int index) {',
          '        index++;',
          '        int sum = 0;',
          '',
          '        while (index > 0) {',
          '            sum += bit[index];',
          '            index -= index & -index;',
          '        }',
          '',
          '        return sum;',
          '    }',
          '',
          '    int rangeSum(int left, int right) {',
          '        if (left > right) {',
          '            return 0;',
          '        }',
          '',
          '        int rightSum = prefixSum(right);',
          '        int leftSum = left == 0',
          '                ? 0 : prefixSum(left - 1);',
          '',
          '        return rightSum - leftSum;',
          '    }',
          '}',
        ]} />
      </Section>

      <Section title="13. Using the Fenwick Tree">
        <Code lines={[
          'int[] arr = {2, 4, 6, 8, 10};',
          'FenwickTree ft = new FenwickTree(arr.length);',
          '',
          'for (int i = 0; i < arr.length; i++) {',
          '    ft.add(i, arr[i]);',
          '}',
          '',
          'System.out.println(ft.prefixSum(4));',
          '// 30',
          '',
          'System.out.println(ft.rangeSum(1, 3));',
          '// 18',
          '',
          'ft.add(2, 4);',
          '// Add 4 to arr[2]',
          '',
          'System.out.println(ft.rangeSum(1, 3));',
          '// 22',
        ]} />
        <p>
          The update adds 4 to the value at index 2. The range sum
          from index 1 to 3 increases from 18 to 22.
        </p>
      </Section>

      <Section title="14. Range Sum Formula">
        <p>
          A range sum can be calculated using two prefix sums.
        </p>
        <Code lines={[
          'sum(left, right) =',
          'prefixSum(right) - prefixSum(left - 1)',
        ]} />
        <p>
          This works because prefixSum(right) includes all elements
          from the beginning through right. Subtracting the prefix
          before left removes the unwanted elements.
        </p>
      </Section>

      <Section title="15. Building a Fenwick Tree">
        <p>
          The simplest construction inserts every array element
          separately using add().
        </p>
        <Code lines={[
          'for (int i = 0; i < n; i++) {',
          '    add(i, arr[i]);',
          '}',
        ]} />
        <p>
          Each add operation takes O(log n), so this build takes
          O(n log n).
        </p>
        <p>
          A linear-time build is also possible by first copying each
          array value into the BIT and then propagating each position
          to its parent.
        </p>
        <Code lines={[
          'for (int i = 1; i <= n; i++) {',
          '    bit[i] += arr[i - 1];',
          '',
          '    int parent = i + (i & -i);',
          '',
          '    if (parent <= n) {',
          '        bit[parent] += bit[i];',
          '    }',
          '}',
        ]} />
        <p>
          This construction takes O(n) time.
        </p>
      </Section>

      <Section title="16. Time and Space Complexity">
        <ul>
          <li>
            <strong>Point update:</strong> O(log n)
          </li>
          <li>
            <strong>Prefix sum:</strong> O(log n)
          </li>
          <li>
            <strong>Range sum:</strong> O(log n)
          </li>
          <li>
            <strong>Build by repeated updates:</strong> O(n log n)
          </li>
          <li>
            <strong>Linear build:</strong> O(n)
          </li>
          <li>
            <strong>Space:</strong> O(n)
          </li>
        </ul>
      </Section>

      <Section title="17. Fenwick Tree for Frequencies">
        <p>
          A BIT can store frequencies instead of ordinary array values.
        </p>
        <p>
          Suppose we have values from 1 to n and want to count how
          many times each value appears.
        </p>
        <Code lines={[
          'add(value, 1);',
          '',
          'Frequency of value x:',
          'rangeSum(x, x);',
          '',
          'Number of values <= x:',
          'prefixSum(x);',
        ]} />
        <p>
          This is useful for counting smaller or greater elements,
          coordinate-compressed values, and order-statistic problems.
        </p>
      </Section>

      <Section title="18. Coordinate Compression">
        <p>
          Fenwick Trees work with array indices. But input values may
          be very large, such as 10^9.
        </p>
        <p>
          Coordinate compression maps the distinct values to smaller
          ranks while preserving their sorted order.
        </p>
        <Code lines={[
          'Values: 100, 5000, 900000',
          '',
          'Compressed ranks:',
          '100 -> 1',
          '5000 -> 2',
          '900000 -> 3',
        ]} />
        <p>
          Then use the compressed rank as the BIT index.
        </p>
        <p>
          Compression is especially useful when the BIT tracks counts
          or frequencies of large values.
        </p>
      </Section>

      <Section title="19. Fenwick Tree vs Segment Tree">
        <ul>
          <li>
            <strong>Fenwick Tree:</strong> Compact and simpler for
            prefix sums and point updates.
          </li>
          <li>
            <strong>Segment Tree:</strong> More flexible for minimum,
            maximum, custom merge operations, and many range updates.
          </li>
          <li>
            Both can support range sum queries and point updates in
            O(log n).
          </li>
        </ul>
        <p>
          For ordinary prefix or range sums with point additions,
          consider Fenwick Tree first.
        </p>
      </Section>

      <Section title="20. Limitations">
        <ul>
          <li>
            Standard BIT is most natural for sums and frequency counts.
          </li>
          <li>
            It does not support arbitrary range minimum queries as
            simply as a Segment Tree.
          </li>
          <li>
            Standard point-add BIT does not directly support every
            kind of range update.
          </li>
          <li>
            It relies on an invertible operation for the usual range
            query subtraction formula.
          </li>
        </ul>
        <p>
          For example, range sum works because addition has subtraction
          as its inverse.
        </p>
      </Section>

      <Section title="21. Common Mistakes">
        <ul>
          <li>Forgetting the internal 1-based indexing.</li>
          <li>Starting update at index 0.</li>
          <li>Using i -= lowbit(i) in the update loop.</li>
          <li>Using i += lowbit(i) in the prefix query loop.</li>
          <li>Forgetting to convert an input index to i + 1.</li>
          <li>Using prefixSum(left) instead of prefixSum(left - 1) in a range sum.</li>
          <li>Confusing assignment with addition in the update operation.</li>
          <li>Assuming BIT supports every Segment Tree operation.</li>
        </ul>
      </Section>

      <Section title="22. Interview Questions">
        <ol>
          <li>What is a Fenwick Tree?</li>
          <li>Why is it also called a Binary Indexed Tree?</li>
          <li>Explain lowbit(x) = x & -x.</li>
          <li>Why does BIT use 1-based indexing?</li>
          <li>How does prefixSum work?</li>
          <li>Why does update move forward using lowbit?</li>
          <li>How do you calculate a range sum?</li>
          <li>What is the difference between BIT and Segment Tree?</li>
          <li>How can BIT be used for inversion counting?</li>
          <li>What is coordinate compression and why is it useful?</li>
        </ol>
      </Section>

      <Section title="23. Practice Problems">
        <ol>
          <li>Implement a Fenwick Tree from scratch.</li>
          <li>Range Sum Query - Mutable.</li>
          <li>Count of Smaller Numbers After Self.</li>
          <li>Count Inversions in an Array.</li>
          <li>Reverse Pairs.</li>
          <li>Coordinate Compression + BIT.</li>
          <li>Find the K-th smallest number using frequencies.</li>
          <li>Dynamic prefix sum queries.</li>
        </ol>
      </Section>

      <Section title="24. Quick Revision">
        <Code lines={[
          'Fenwick Tree = Binary Indexed Tree',
          '',
          'lowbit(x) = x & -x',
          '',
          'Internal indexing: 1-based',
          '',
          'Update:',
          'i += lowbit(i)',
          '',
          'Prefix query:',
          'i -= lowbit(i)',
          '',
          'Range sum:',
          'prefixSum(right) - prefixSum(left - 1)',
          '',
          'Point update: O(log n)',
          'Prefix sum: O(log n)',
          'Space: O(n)',
        ]} />
      </Section>
    </div>
  );
}
