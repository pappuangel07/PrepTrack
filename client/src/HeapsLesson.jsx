
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

const HeapsLesson = ({ onBack }) => {
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
        <h1 style={headingStyle}>Heaps and Priority Queues</h1>
        <p>
          Learn how heaps keep the highest-priority or lowest-priority
          element accessible efficiently. This topic is important for
          scheduling, top-K problems, graph algorithms, and streaming data.
        </p>
        <p>
          <strong>Prerequisites:</strong> Arrays, trees, sorting,
          Java collections, and time complexity.
        </p>
      </header>

      <Section title="1. What is a Heap?">
        <p>
          A heap is a complete binary tree that follows a heap-order
          property.
        </p>
        <ul>
          <li><strong>Complete:</strong> All levels are full except possibly the last.</li>
          <li><strong>Last level:</strong> Nodes are filled from left to right.</li>
          <li><strong>Heap order:</strong> Parent has priority over its children.</li>
        </ul>
        <p>
          A heap is commonly stored in an array rather than using
          separate tree nodes.
        </p>
        <h3>Min Heap</h3>
        <p>
          Every parent is smaller than or equal to its children.
          The minimum element is at the root.
        </p>
        <Code
          lines={[
            'Min Heap:',
            '',
            '        2',
            '       / \\',
            '      5   4',
            '     / \\',
            '    9   7',
          ]}
        />
        <h3>Max Heap</h3>
        <p>
          Every parent is greater than or equal to its children.
          The maximum element is at the root.
        </p>
        <Code
          lines={[
            'Max Heap:',
            '',
            '        9',
            '       / \\',
            '      7   8',
            '     / \\',
            '    2   5',
          ]}
        />
        <p>
          A heap is not fully sorted. It only guarantees the
          parent-child priority relationship.
        </p>
      </Section>

      <Section title="2. Heap Array Representation">
        <p>
          A complete binary tree can be represented compactly
          using an array.
        </p>
        <p>
          For a node at index <code>i</code> in a zero-based array:
        </p>
        <ul>
          <li>Left child: <code>2 * i + 1</code></li>
          <li>Right child: <code>2 * i + 2</code></li>
          <li>Parent: <code>(i - 1) / 2</code> using integer division, when <code>i &gt; 0</code></li>
        </ul>
        <Code
          lines={[
            'Array: [2, 5, 4, 9, 7]',
            '',
            'Index:  0  1  2  3  4',
            '',
            'Index 0 -> value 2',
            'Left child index  = 2 * 0 + 1 = 1',
            'Right child index = 2 * 0 + 2 = 2',
            '',
            'Index 1 -> value 5',
            'Left child index  = 2 * 1 + 1 = 3',
            'Right child index = 2 * 1 + 2 = 4',
          ]}
        />
        <p>
          No explicit left or right references are needed.
          The array indices describe the tree structure.
        </p>
      </Section>

      <Section title="3. Heap vs Binary Search Tree">
        <ul>
          <li>
            <strong>Heap:</strong> Parent-child priority order;
            root is minimum or maximum.
          </li>
          <li>
            <strong>BST:</strong> Left subtree values are smaller
            and right subtree values are greater, according to
            its duplicate policy.
          </li>
          <li>
            Heap does not provide efficient arbitrary search.
          </li>
          <li>
            BST can search for a specific value in
            <code> O(h)</code>.
          </li>
          <li>
            Heap is useful when repeatedly retrieving the
            minimum or maximum.
          </li>
        </ul>
      </Section>

      <Section title="4. Heap Operations and Complexity">
        <ul>
          <li>Peek root: <code>O(1)</code></li>
          <li>Insert: <code>O(log n)</code></li>
          <li>Remove root: <code>O(log n)</code></li>
          <li>Build heap from array: <code>O(n)</code></li>
          <li>Search arbitrary value: <code>O(n)</code></li>
          <li>Heap Sort: <code>O(n log n)</code></li>
        </ul>
        <p>
          The height of a complete binary tree with n nodes is
          <code> O(log n)</code>. Insert and remove operations
          move along the height of the tree.
        </p>
      </Section>

      <Section title="5. Insert into a Heap">
        <p>
          Insert at the end of the array to preserve completeness.
          Then compare the new node with its parent and move it
          upward while the heap property is violated.
        </p>
        <p>
          This process is called <strong>sift up</strong>,
          <strong> bubble up</strong>, or <strong>percolate up</strong>.
        </p>
        <Code
          lines={[
            'void siftUp(int[] heap, int index) {',
            '    while (index > 0) {',
            '        int parent = (index - 1) / 2;',
            '',
            '        if (heap[parent] <= heap[index]) {',
            '            break;',
            '        }',
            '',
            '        int temp = heap[parent];',
            '        heap[parent] = heap[index];',
            '        heap[index] = temp;',
            '',
            '        index = parent;',
            '    }',
            '}',
          ]}
        />
        <p>
          This is a min-heap sift-up operation. For a max heap,
          reverse the comparison.
        </p>
        <p>
          Time: <code>O(log n)</code>. Extra space:
          <code> O(1)</code>.
        </p>
      </Section>

      <Section title="6. Remove the Root">
        <p>
          To remove the root:
        </p>
        <ol>
          <li>Save the root value.</li>
          <li>Move the last array element to the root.</li>
          <li>Reduce heap size by one.</li>
          <li>Sift down to restore heap order.</li>
        </ol>
        <p>
          In a min heap, compare the node with its smaller child.
          If the child is smaller, swap and continue downward.
        </p>
        <Code
          lines={[
            'void siftDown(int[] heap, int size, int index) {',
            '    while (true) {',
            '        int smallest = index;',
            '        int left = 2 * index + 1;',
            '        int right = 2 * index + 2;',
            '',
            '        if (left < size',
            '                && heap[left] < heap[smallest]) {',
            '            smallest = left;',
            '        }',
            '',
            '        if (right < size',
            '                && heap[right] < heap[smallest]) {',
            '            smallest = right;',
            '        }',
            '',
            '        if (smallest == index) break;',
            '',
            '        int temp = heap[index];',
            '        heap[index] = heap[smallest];',
            '        heap[smallest] = temp;',
            '',
            '        index = smallest;',
            '    }',
            '}',
          ]}
        />
        <p>
          Time: <code>O(log n)</code>. Extra space:
          <code> O(1)</code>.
        </p>
      </Section>

      <Section title="7. Build Heap (Heapify)">
        <p>
          Building a heap means converting an arbitrary array
          into a valid heap.
        </p>
        <p>
          Start from the last non-leaf node and sift down each
          node moving toward the root.
        </p>
        <Code
          lines={[
            'void buildMinHeap(int[] arr) {',
            '    int n = arr.length;',
            '',
            '    for (int i = n / 2 - 1; i >= 0; i--) {',
            '        siftDown(arr, n, i);',
            '    }',
            '}',
          ]}
        />
        <p>
          Leaves already satisfy the heap property because they
          have no children.
        </p>
        <p>
          <strong>Why is build heap O(n), not O(n log n)?</strong>
        </p>
        <p>
          Most nodes are near the bottom and move only a small
          distance. Only a few nodes near the root can move
          through many levels. The total work across all nodes
          is linear.
        </p>
      </Section>

      <Section title="8. Java PriorityQueue">
        <p>
          Java provides a ready-made priority queue through
          <code> java.util.PriorityQueue</code>.
        </p>
        <p>
          By default, it behaves as a min-priority queue:
          the smallest element is removed first.
        </p>
        <Code
          lines={[
            'import java.util.PriorityQueue;',
            '',
            'PriorityQueue<Integer> minHeap = new PriorityQueue<>();',
            '',
            'minHeap.offer(5);',
            'minHeap.offer(2);',
            'minHeap.offer(8);',
            '',
            'System.out.println(minHeap.peek()); // 2',
            'System.out.println(minHeap.poll()); // 2',
            'System.out.println(minHeap.peek()); // 5',
          ]}
        />
        <p>
          Common methods:
        </p>
        <ul>
          <li><code>offer(value)</code>: insert</li>
          <li><code>add(value)</code>: insert; may throw if insertion fails</li>
          <li><code>peek()</code>: view root, or null if empty</li>
          <li><code>poll()</code>: remove and return root, or null if empty</li>
          <li><code>size()</code>: number of elements</li>
          <li><code>isEmpty()</code>: check whether empty</li>
        </ul>
        <p>
          <code>offer</code> and <code>poll</code> are
          <code> O(log n)</code>; <code>peek</code> is
          <code> O(1)</code>.
        </p>
      </Section>

      <Section title="9. Max Heap in Java">
        <p>
          Use a comparator to reverse the natural ordering.
          Avoid subtracting values inside the comparator because
          subtraction can overflow.
        </p>
        <Code
          lines={[
            'PriorityQueue<Integer> maxHeap =',
            '    new PriorityQueue<>(',
            '        (a, b) -> Integer.compare(b, a));',
            '',
            'maxHeap.offer(5);',
            'maxHeap.offer(2);',
            'maxHeap.offer(8);',
            '',
            'System.out.println(maxHeap.peek()); // 8',
            'System.out.println(maxHeap.poll()); // 8',
          ]}
        />
        <p>
          Another option for integers is
          <code> Collections.reverseOrder()</code>, but the
          comparator approach makes the ordering explicit.
        </p>
      </Section>

      <Section title="10. Heap with Custom Objects">
        <p>
          Priority queues can store objects and order them
          according to a field.
        </p>
        <Code
          lines={[
            'class Task {',
            '    int priority;',
            '    String name;',
            '',
            '    Task(int priority, String name) {',
            '        this.priority = priority;',
            '        this.name = name;',
            '    }',
            '}',
            '',
            'PriorityQueue<Task> tasks =',
            '    new PriorityQueue<>(',
            '        (a, b) -> Integer.compare(',
            '            a.priority, b.priority));',
          ]}
        />
        <p>
          Here, smaller priority numbers are removed first.
          If larger numbers should have higher priority, reverse
          the comparator.
        </p>
        <p>
          For multiple sorting rules, compare the primary field
          first and then use a secondary field to break ties.
        </p>
      </Section>

      <Section title="11. Kth Largest Element">
        <p>
          To find the kth largest value, maintain a min heap
          containing only k elements.
        </p>
        <ul>
          <li>Insert each number.</li>
          <li>If heap size becomes greater than k, remove the smallest.</li>
          <li>At the end, the heap root is the kth largest.</li>
        </ul>
        <Code
          lines={[
            'int findKthLargest(int[] nums, int k) {',
            '    PriorityQueue<Integer> heap =',
            '        new PriorityQueue<>();',
            '',
            '    for (int num : nums) {',
            '        heap.offer(num);',
            '',
            '        if (heap.size() > k) {',
            '            heap.poll();',
            '        }',
            '    }',
            '',
            '    return heap.peek();',
            '}',
          ]}
        />
        <p>
          Time: <code>O(n log k)</code>. Extra space:
          <code> O(k)</code>.
        </p>
        <p>
          This version treats duplicate values as separate
          elements, which is the usual interpretation.
        </p>
      </Section>

      <Section title="12. Kth Smallest Element">
        <p>
          Use a max heap of size k. Keep the k smallest values
          seen so far; the largest among them is the kth smallest.
        </p>
        <Code
          lines={[
            'int findKthSmallest(int[] nums, int k) {',
            '    PriorityQueue<Integer> heap =',
            '        new PriorityQueue<>(',
            '            (a, b) -> Integer.compare(b, a));',
            '',
            '    for (int num : nums) {',
            '        heap.offer(num);',
            '',
            '        if (heap.size() > k) {',
            '            heap.poll();',
            '        }',
            '    }',
            '',
            '    return heap.peek();',
            '}',
          ]}
        />
        <p>
          Time: <code>O(n log k)</code>. Extra space:
          <code> O(k)</code>.
        </p>
      </Section>

      <Section title="13. Top K Frequent Elements">
        <p>
          First count frequencies using a HashMap. Then keep
          the k most frequent values in a min heap ordered by
          frequency.
        </p>
        <Code
          lines={[
            'Map<Integer, Integer> frequency = new HashMap<>();',
            '',
            'for (int num : nums) {',
            '    frequency.put(num,',
            '        frequency.getOrDefault(num, 0) + 1);',
            '}',
            '',
            'PriorityQueue<Integer> heap =',
            '    new PriorityQueue<>(',
            '        (a, b) -> Integer.compare(',
            '            frequency.get(a), frequency.get(b)));',
            '',
            'for (int num : frequency.keySet()) {',
            '    heap.offer(num);',
            '',
            '    if (heap.size() > k) {',
            '        heap.poll();',
            '    }',
            '}',
            '',
            'List<Integer> answer = new ArrayList<>();',
            'while (!heap.isEmpty()) {',
            '    answer.add(heap.poll());',
            '}',
          ]}
        />
        <p>
          The answer is collected from lowest frequency to
          highest frequency. Reverse it if descending order
          is required.
        </p>
        <p>
          If there are m distinct values, time is
          <code> O(n + m log k)</code>; extra space is
          <code> O(m + k)</code>.
        </p>
        <p>
          If frequency ties must follow a specific rule,
          include that tie-breaker in the comparator.
        </p>
      </Section>

      <Section title="14. Merge K Sorted Arrays">
        <p>
          Keep the first unprocessed element of each array
          in a min heap. Repeatedly remove the smallest
          element and insert the next element from that
          same array.
        </p>
        <p>
          Each heap entry should store:
        </p>
        <ul>
          <li>Value</li>
          <li>Array index</li>
          <li>Index inside that array</li>
        </ul>
        <p>
          If there are N total elements and k arrays,
          the time complexity is <code>O(N log k)</code>.
          The heap uses <code>O(k)</code> space, excluding
          the output.
        </p>
        <p>
          This pattern is also used to merge k sorted linked
          lists.
        </p>
      </Section>

      <Section title="15. Find Median from a Data Stream">
        <p>
          Use two heaps:
        </p>
        <ul>
          <li>Max heap stores the smaller half.</li>
          <li>Min heap stores the larger half.</li>
          <li>Keep their sizes equal, or let the smaller-half heap have one extra element.</li>
        </ul>
        <p>
          The median is:
        </p>
        <ul>
          <li>Root of the max heap if the total count is odd.</li>
          <li>Average of both roots if the total count is even.</li>
        </ul>
        <p>
          Insertion takes <code>O(log n)</code>. Median retrieval
          takes <code>O(1)</code>.
        </p>
        <p>
          Use a safe numeric type or cast before adding the two
          middle values to avoid integer overflow.
        </p>
      </Section>

      <Section title="16. Heap Sort">
        <p>
          Heap Sort sorts an array using a max heap:
        </p>
        <ol>
          <li>Build a max heap from the array.</li>
          <li>Swap the root with the last element in the heap.</li>
          <li>Reduce the heap size.</li>
          <li>Sift down the new root.</li>
          <li>Repeat until the heap size is 1.</li>
        </ol>
        <Code
          lines={[
            'void heapSort(int[] arr) {',
            '    int n = arr.length;',
            '',
            '    buildMaxHeap(arr, n);',
            '',
            '    for (int end = n - 1; end > 0; end--) {',
            '        int temp = arr[0];',
            '        arr[0] = arr[end];',
            '        arr[end] = temp;',
            '',
            '        siftDownMax(arr, end, 0);',
            '    }',
            '}',
          ]}
        />
        <p>
          Time: <code>O(n log n)</code>. Extra space:
          <code> O(1)</code> for an in-place implementation.
        </p>
        <p>
          Heap Sort is not stable in its usual implementation.
        </p>
      </Section>

      <Section title="17. Common Heap Patterns">
        <ul>
          <li>
            <strong>Kth largest:</strong> Min heap of size k.
          </li>
          <li>
            <strong>Kth smallest:</strong> Max heap of size k.
          </li>
          <li>
            <strong>Top K frequent:</strong> Frequency map + heap.
          </li>
          <li>
            <strong>Merge K sorted lists:</strong> Min heap of current heads.
          </li>
          <li>
            <strong>Streaming median:</strong> Two heaps.
          </li>
          <li>
            <strong>Scheduling:</strong> Priority queue of next available tasks.
          </li>
          <li>
            <strong>Dijkstra:</strong> Min priority queue of distance candidates.
          </li>
        </ul>
      </Section>

      <Section title="18. Common Mistakes">
        <ul>
          <li>Assuming a heap array is fully sorted.</li>
          <li>Using the wrong heap type for kth largest or kth smallest.</li>
          <li>Forgetting to remove elements when heap size exceeds k.</li>
          <li>Using subtraction in a comparator and causing overflow.</li>
          <li>Confusing heapify O(n) with inserting n values O(n log n).</li>
          <li>Forgetting that Java PriorityQueue is a min heap by default.</li>
          <li>Trying to search arbitrary values in O(log n).</li>
          <li>Ignoring comparator tie-breaking requirements.</li>
          <li>Using a heap when sorting the entire input would be simpler.</li>
        </ul>
      </Section>

      <Section title="19. Practice Problems">
        <h3>Beginner</h3>
        <ul>
          <li>Implement a min heap</li>
          <li>Implement a max heap</li>
          <li>Find kth largest element</li>
          <li>Find kth smallest element</li>
        </ul>

        <h3>Intermediate</h3>
        <ul>
          <li>Top K frequent elements</li>
          <li>Last stone weight</li>
          <li>Merge K sorted lists</li>
          <li>Sort a nearly sorted array</li>
          <li>Find K closest points</li>
        </ul>

        <h3>Advanced</h3>
        <ul>
          <li>Find median from data stream</li>
          <li>Smallest range covering K lists</li>
          <li>Reorganize string</li>
          <li>Task scheduler</li>
          <li>IPO / maximize capital</li>
        </ul>
      </Section>

      <Section title="20. Interview Quick Revision">
        <ul>
          <li>Heap is a complete binary tree.</li>
          <li>Min heap root is the minimum.</li>
          <li>Max heap root is the maximum.</li>
          <li>Heap is not fully sorted.</li>
          <li>Array child indices: 2i+1 and 2i+2.</li>
          <li>Insert uses sift up.</li>
          <li>Remove root uses sift down.</li>
          <li>Bottom-up heapify takes O(n).</li>
          <li>Java PriorityQueue is a min heap by default.</li>
          <li>Kth largest commonly uses a min heap of size k.</li>
          <li>Kth smallest commonly uses a max heap of size k.</li>
          <li>Two heaps can maintain a running median.</li>
        </ul>
        <p>
          <strong>Interview strategy:</strong> If the problem repeatedly
          asks for the smallest or largest available element, consider
          a heap. If it asks for the kth value, try keeping only k
          candidates instead of sorting the entire input.
        </p>
      </Section>

      <Section title="Lesson Complete">
        <p>
          You have covered heap structure, array representation,
          insert/delete, heapify, Java PriorityQueue, Heap Sort,
          top-K patterns, merging, and streaming median.
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

export default HeapsLesson;
