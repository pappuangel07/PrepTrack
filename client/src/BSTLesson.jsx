
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

const BSTLesson = ({ onBack }) => {
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
        <h1 style={headingStyle}>Binary Search Trees (BST)</h1>
        <p>
          A Binary Search Tree is a binary tree that stores values
          according to an ordering rule. This rule makes searching,
          insertion, deletion, and many interview problems efficient
          when the tree is reasonably balanced.
        </p>
        <p>
          <strong>Prerequisites:</strong> Binary Trees, recursion,
          Java classes, references, and basic sorting/searching.
        </p>
      </header>

      <Section title="1. What is a Binary Search Tree?">
        <p>
          A BST is a binary tree where, for every node:
        </p>
        <ul>
          <li>All values in its left subtree are smaller than the node.</li>
          <li>All values in its right subtree are greater than the node.</li>
          <li>Both left and right subtrees must also follow the BST rule.</li>
        </ul>
        <Code
          lines={[
            'Example BST:',
            '',
            '        8',
            '       / \\',
            '      3   10',
            '     / \\    \\',
            '    1   6    14',
            '       / \\   /',
            '      4   7 13',
          ]}
        />
        <p>
          For node 8, every value in the left subtree is less than
          8, and every value in the right subtree is greater than 8.
        </p>
        <p>
          Important: the rule applies to the <strong>entire subtree</strong>,
          not only the immediate children.
        </p>
      </Section>

      <Section title="2. BST Node Structure">
        <Code
          lines={[
            'class TreeNode {',
            '    int val;',
            '    TreeNode left;',
            '    TreeNode right;',
            '',
            '    TreeNode(int val) {',
            '        this.val = val;',
            '    }',
            '}',
          ]}
        />
        <p>
          Each node contains a value and references to its left and
          right children. A missing child is represented by
          <code> null</code>.
        </p>
      </Section>

      <Section title="3. Why BST is Useful">
        <ul>
          <li>Searching can avoid visiting many nodes.</li>
          <li>Insertion follows the ordering rule.</li>
          <li>Deletion can preserve the BST property.</li>
          <li>Inorder traversal gives sorted values.</li>
          <li>Minimum and maximum values can be found by moving left or right.</li>
          <li>Range queries can skip irrelevant subtrees.</li>
        </ul>
        <p>
          A BST is not automatically fast. If it becomes skewed,
          operations can degrade to <code>O(n)</code>.
        </p>
      </Section>

      <Section title="4. Search in a BST">
        <p>
          Compare the target with the current node:
        </p>
        <ul>
          <li>If target equals current value, found.</li>
          <li>If target is smaller, move left.</li>
          <li>If target is larger, move right.</li>
          <li>If the current node becomes null, target is absent.</li>
        </ul>
        <Code
          lines={[
            'TreeNode searchBST(TreeNode root, int target) {',
            '    while (root != null) {',
            '        if (target == root.val) {',
            '            return root;',
            '        }',
            '',
            '        if (target < root.val) {',
            '            root = root.left;',
            '        } else {',
            '            root = root.right;',
            '        }',
            '    }',
            '',
            '    return null;',
            '}',
          ]}
        />
        <p>
          <strong>Time:</strong> <code>O(h)</code>, where h is tree
          height. Balanced: <code>O(log n)</code>. Skewed:
          <code> O(n)</code>.
        </p>
        <p>
          <strong>Space:</strong> <code>O(1)</code> for this iterative
          version.
        </p>
      </Section>

      <Section title="5. Insert into a BST">
        <p>
          Start at the root and follow the search path. Insert the
          new value at the first null position.
        </p>
        <Code
          lines={[
            'TreeNode insertIntoBST(TreeNode root, int val) {',
            '    if (root == null) {',
            '        return new TreeNode(val);',
            '    }',
            '',
            '    if (val < root.val) {',
            '        root.left = insertIntoBST(root.left, val);',
            '    } else if (val > root.val) {',
            '        root.right = insertIntoBST(root.right, val);',
            '    }',
            '',
            '    return root;',
            '}',
          ]}
        />
        <p>
          This implementation ignores duplicate values. That is
          one valid policy, but a problem may require a different
          duplicate-handling rule.
        </p>
        <p>
          <strong>Time:</strong> <code>O(h)</code>.
          <strong> Recursive space:</strong> <code>O(h)</code>.
        </p>
        <p>
          Remember to assign the returned subtree back to
          <code> root.left</code> or <code>root.right</code>.
        </p>
      </Section>

      <Section title="6. Delete a Node from a BST">
        <p>
          Deletion has three cases. Search for the node first,
          then handle the matching case.
        </p>

        <h3>Case 1: Node is a leaf</h3>
        <p>
          Remove it by returning <code>null</code> to its parent.
        </p>

        <h3>Case 2: Node has one child</h3>
        <p>
          Replace the node with its only child.
        </p>

        <h3>Case 3: Node has two children</h3>
        <p>
          Replace its value with its inorder successor (smallest
          value in the right subtree), then delete that successor
          from the right subtree.
        </p>
        <Code
          lines={[
            'TreeNode deleteNode(TreeNode root, int key) {',
            '    if (root == null) return null;',
            '',
            '    if (key < root.val) {',
            '        root.left = deleteNode(root.left, key);',
            '    } else if (key > root.val) {',
            '        root.right = deleteNode(root.right, key);',
            '    } else {',
            '        if (root.left == null) {',
            '            return root.right;',
            '        }',
            '        if (root.right == null) {',
            '            return root.left;',
            '        }',
            '',
            '        TreeNode successor = root.right;',
            '        while (successor.left != null) {',
            '            successor = successor.left;',
            '        }',
            '',
            '        root.val = successor.val;',
            '        root.right = deleteNode(',
            '            root.right, successor.val);',
            '    }',
            '',
            '    return root;',
            '}',
          ]}
        />
        <p>
          <strong>Time:</strong> <code>O(h)</code>.
          <strong> Recursive space:</strong> <code>O(h)</code>.
        </p>
        <p>
          The successor is the leftmost node in the right subtree.
          It has no left child, so deleting it is simpler.
        </p>
      </Section>

      <Section title="7. Find Minimum and Maximum">
        <p>
          In a BST, the minimum value is the leftmost node.
          The maximum value is the rightmost node.
        </p>
        <Code
          lines={[
            'TreeNode findMin(TreeNode root) {',
            '    if (root == null) return null;',
            '',
            '    while (root.left != null) {',
            '        root = root.left;',
            '    }',
            '',
            '    return root;',
            '}',
            '',
            'TreeNode findMax(TreeNode root) {',
            '    if (root == null) return null;',
            '',
            '    while (root.right != null) {',
            '        root = root.right;',
            '    }',
            '',
            '    return root;',
            '}',
          ]}
        />
        <p>
          Time: <code>O(h)</code>. Auxiliary space: <code>O(1)</code>.
        </p>
      </Section>

      <Section title="8. Validate a Binary Search Tree">
        <p>
          Checking only whether left child is smaller and right
          child is greater is not enough. Every node must obey
          the bounds inherited from its ancestors.
        </p>
        <Code
          lines={[
            'boolean isValidBST(TreeNode root) {',
            '    return validate(root, Long.MIN_VALUE,',
            '                   Long.MAX_VALUE);',
            '}',
            '',
            'boolean validate(TreeNode node, long low, long high) {',
            '    if (node == null) return true;',
            '',
            '    if (node.val <= low || node.val >= high) {',
            '        return false;',
            '    }',
            '',
            '    return validate(node.left, low, node.val)',
            '        && validate(node.right, node.val, high);',
            '}',
          ]}
        />
        <p>
          The bounds are exclusive in this implementation, so
          duplicate values are not allowed.
        </p>
        <p>
          Use <code>long</code> bounds instead of <code>int</code>
          bounds to safely handle values equal to
          <code> Integer.MIN_VALUE</code> and
          <code> Integer.MAX_VALUE</code>.
        </p>
        <p>
          Time: <code>O(n)</code>. Recursion space: <code>O(h)</code>.
        </p>
      </Section>

      <Section title="9. Kth Smallest Element">
        <p>
          Inorder traversal of a BST visits values in ascending
          order. Therefore, the kth visited node is the kth
          smallest value.
        </p>
        <Code
          lines={[
            'int kthSmallest(TreeNode root, int k) {',
            '    Deque<TreeNode> stack = new ArrayDeque<>();',
            '',
            '    while (root != null || !stack.isEmpty()) {',
            '        while (root != null) {',
            '            stack.push(root);',
            '            root = root.left;',
            '        }',
            '',
            '        root = stack.pop();',
            '        k--;',
            '',
            '        if (k == 0) return root.val;',
            '',
            '        root = root.right;',
            '    }',
            '',
            '    throw new IllegalArgumentException(',
            '        "k is out of range");',
            '}',
          ]}
        />
        <p>
          Time: <code>O(h + k)</code> in the usual traversal
          analysis. Stack space: <code>O(h)</code>.
        </p>
        <p>
          Validate that <code>k</code> is in the range
          <code> 1..n</code> if your method must handle invalid input
          without throwing.
        </p>
      </Section>

      <Section title="10. Inorder Predecessor and Successor">
        <p>
          <strong>Inorder predecessor:</strong> The largest value
          smaller than the target.
        </p>
        <p>
          <strong>Inorder successor:</strong> The smallest value
          larger than the target.
        </p>
        <ul>
          <li>If a node has a left subtree, predecessor is the maximum in it.</li>
          <li>If a node has a right subtree, successor is the minimum in it.</li>
          <li>Otherwise, use the ancestor path to find the nearest suitable node.</li>
        </ul>
        <p>
          These can be found in <code>O(h)</code> time without
          traversing the entire tree.
        </p>
      </Section>

      <Section title="11. Lowest Common Ancestor in a BST">
        <p>
          BST ordering makes LCA easier than in a general binary
          tree.
        </p>
        <ul>
          <li>If both targets are smaller than current, go left.</li>
          <li>If both targets are greater than current, go right.</li>
          <li>Otherwise, current node is the split point and LCA.</li>
        </ul>
        <Code
          lines={[
            'TreeNode lowestCommonAncestorBST(',
            '        TreeNode root, TreeNode p, TreeNode q) {',
            '    while (root != null) {',
            '        if (p.val < root.val && q.val < root.val) {',
            '            root = root.left;',
            '        } else if (p.val > root.val',
            '                && q.val > root.val) {',
            '            root = root.right;',
            '        } else {',
            '            return root;',
            '        }',
            '    }',
            '',
            '    return null;',
            '}',
          ]}
        />
        <p>
          Time: <code>O(h)</code>. Auxiliary space: <code>O(1)</code>.
        </p>
      </Section>

      <Section title="12. Range Sum in a BST">
        <p>
          Find the sum of all node values within the inclusive
          range <code>[low, high]</code>.
        </p>
        <p>
          Use BST ordering to prune branches:
        </p>
        <ul>
          <li>If current value is smaller than low, skip left subtree.</li>
          <li>If current value is greater than high, skip right subtree.</li>
          <li>Otherwise, include current value and explore both sides.</li>
        </ul>
        <Code
          lines={[
            'int rangeSumBST(TreeNode root, int low, int high) {',
            '    if (root == null) return 0;',
            '',
            '    if (root.val < low) {',
            '        return rangeSumBST(root.right, low, high);',
            '    }',
            '',
            '    if (root.val > high) {',
            '        return rangeSumBST(root.left, low, high);',
            '    }',
            '',
            '    return root.val',
            '        + rangeSumBST(root.left, low, high)',
            '        + rangeSumBST(root.right, low, high);',
            '}',
          ]}
        />
        <p>
          Worst-case time: <code>O(n)</code>. Balanced trees often
          prune many nodes, but worst-case complexity remains linear.
        </p>
      </Section>

      <Section title="13. Convert Sorted Array to Balanced BST">
        <p>
          Pick the middle element as root. Recursively construct
          the left half and right half.
        </p>
        <Code
          lines={[
            'TreeNode sortedArrayToBST(int[] nums) {',
            '    return build(nums, 0, nums.length - 1);',
            '}',
            '',
            'TreeNode build(int[] nums, int left, int right) {',
            '    if (left > right) return null;',
            '',
            '    int mid = left + (right - left) / 2;',
            '    TreeNode root = new TreeNode(nums[mid]);',
            '',
            '    root.left = build(nums, left, mid - 1);',
            '    root.right = build(nums, mid + 1, right);',
            '',
            '    return root;',
            '}',
          ]}
        />
        <p>
          Time: <code>O(n)</code>. Recursion space:
          <code> O(log n)</code> for a balanced result.
        </p>
        <p>
          This assumes the input array is sorted. Choosing the
          middle element keeps the resulting tree height small.
        </p>
      </Section>

      <Section title="14. Balanced BSTs">
        <p>
          A normal BST can become skewed depending on insertion
          order. For example, inserting already sorted values
          into a basic BST can create a chain.
        </p>
        <p>
          Self-balancing BSTs maintain height near
          <code> O(log n)</code> through rotations or other
          balancing rules.
        </p>
        <ul>
          <li><strong>AVL Tree:</strong> Strict height balance; uses rotations.</li>
          <li><strong>Red-Black Tree:</strong> Uses color rules to maintain logarithmic height.</li>
        </ul>
        <p>
          These structures are more complex than a basic BST,
          but they provide predictable performance.
        </p>
      </Section>

      <Section title="15. BST Complexity">
        <ul>
          <li>Search: <code>O(h)</code></li>
          <li>Insert: <code>O(h)</code></li>
          <li>Delete: <code>O(h)</code></li>
          <li>Find minimum / maximum: <code>O(h)</code></li>
          <li>Predecessor / successor: <code>O(h)</code></li>
          <li>BST LCA: <code>O(h)</code></li>
          <li>Inorder traversal: <code>O(n)</code></li>
          <li>Validation: <code>O(n)</code></li>
        </ul>
        <p>
          Balanced BST: <code>h = O(log n)</code>.
        </p>
        <p>
          Skewed BST: <code>h = O(n)</code>.
        </p>
        <p>
          A plain BST does not guarantee logarithmic height.
        </p>
      </Section>

      <Section title="16. Common Interview Mistakes">
        <ul>
          <li>Checking only immediate children during BST validation.</li>
          <li>Forgetting that the BST property applies to whole subtrees.</li>
          <li>Not returning the updated root after insertion or deletion.</li>
          <li>Handling deletion with two children incorrectly.</li>
          <li>Confusing kth smallest with kth largest.</li>
          <li>Assuming sorted insertion keeps a BST balanced.</li>
          <li>Ignoring duplicate-value policy.</li>
          <li>Using int bounds that fail at integer extremes.</li>
          <li>Claiming every BST operation is always O(log n).</li>
        </ul>
      </Section>

      <Section title="17. Practice Problems">
        <h3>Beginner</h3>
        <ul>
          <li>Search in a BST</li>
          <li>Insert into a BST</li>
          <li>Find minimum and maximum</li>
          <li>Inorder traversal of BST</li>
        </ul>

        <h3>Intermediate</h3>
        <ul>
          <li>Validate BST</li>
          <li>Delete node in BST</li>
          <li>Kth smallest element</li>
          <li>Lowest common ancestor of BST</li>
          <li>Range sum of BST</li>
          <li>Convert sorted array to BST</li>
        </ul>

        <h3>Advanced</h3>
        <ul>
          <li>Recover BST</li>
          <li>Inorder successor in BST</li>
          <li>Construct BST from preorder</li>
          <li>Two sum in BST</li>
          <li>Merge two BSTs</li>
          <li>Balance a BST</li>
        </ul>
      </Section>

      <Section title="18. Interview Quick Revision">
        <ul>
          <li>Left subtree values are smaller; right subtree values are greater.</li>
          <li>Inorder traversal produces sorted order.</li>
          <li>Search follows one root-to-leaf path.</li>
          <li>Insertion places the value at a null position.</li>
          <li>Deletion has leaf, one-child, and two-child cases.</li>
          <li>Two-child deletion commonly uses inorder successor.</li>
          <li>Validate using inherited min/max bounds.</li>
          <li>Kth smallest uses inorder traversal.</li>
          <li>BST LCA uses value comparisons.</li>
          <li>Balanced BST operations are logarithmic.</li>
          <li>Skewed BST operations can be linear.</li>
        </ul>
        <p>
          <strong>Interview strategy:</strong> First identify the
          BST property you can exploit. Then decide whether you need
          one search path, inorder ordering, subtree bounds, or
          successor/predecessor logic.
        </p>
      </Section>

      <Section title="Lesson Complete">
        <p>
          You have covered BST search, insertion, deletion,
          validation, inorder ordering, kth smallest, LCA,
          range queries, balancing, and complexity analysis.
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

export default BSTLesson;
