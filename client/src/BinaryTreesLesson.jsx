
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

const BinaryTreesLesson = ({ onBack }) => {
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
        <h1 style={headingStyle}>Binary Trees</h1>
        <p>
          Learn binary trees from the basics to interview-level problems:
          structure, traversals, recursion, common patterns, and Java
          implementations.
        </p>
        <p>
          <strong>Prerequisites:</strong> Java classes, references,
          recursion, arrays, and queues.
        </p>
      </header>

      <Section title="1. What is a Tree?">
        <p>
          A tree is a non-linear data structure that stores elements in
          a parent-child relationship.
        </p>
        <ul>
          <li><strong>Node:</strong> Stores data and links to other nodes.</li>
          <li><strong>Edge:</strong> Connection between two nodes.</li>
          <li><strong>Root:</strong> The topmost node.</li>
          <li><strong>Parent:</strong> A node directly above another node.</li>
          <li><strong>Child:</strong> A node directly below another node.</li>
          <li><strong>Leaf:</strong> A node with no children.</li>
          <li><strong>Subtree:</strong> A node and all its descendants.</li>
          <li><strong>Ancestor:</strong> Any node above a given node.</li>
          <li><strong>Descendant:</strong> Any node below a given node.</li>
        </ul>
        <Code
          lines={[
            'Tree structure:',
            '',
            'Root: 1',
            'Left child of 1: 2',
            'Right child of 1: 3',
            'Children of 2: 4 and 5',
          ]}
        />
        <p>
          A tree with <code>n</code> nodes has exactly <code>n - 1</code>
          edges, assuming it is a connected tree.
        </p>
      </Section>

      <Section title="2. What is a Binary Tree?">
        <p>
          A binary tree is a tree in which each node can have at most
          two children:
        </p>
        <ul>
          <li>Left child</li>
          <li>Right child</li>
        </ul>
        <p>
          A node may have zero, one, or two children. Left and right
          positions are distinct.
        </p>
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
          Each node stores its value and references to its left and
          right child. A reference is <code>null</code> when that
          child does not exist.
        </p>
      </Section>

      <Section title="3. Important Tree Terminology">
        <ul>
          <li><strong>Depth:</strong> Number of edges from root to node.</li>
          <li><strong>Height of node:</strong> Longest downward path from that node to a leaf.</li>
          <li><strong>Height of tree:</strong> Height of the root.</li>
          <li><strong>Level:</strong> Often depth + 1, with root at level 1.</li>
          <li><strong>Degree:</strong> Number of children of a node.</li>
          <li><strong>Diameter:</strong> Longest path between any two nodes.</li>
        </ul>
        <p>
          In this lesson, height is measured in <strong>edges</strong>.
          Therefore, a leaf has height 0 and an empty tree has height -1.
          Some platforms count nodes instead, so always check the
          problem's convention.
        </p>
      </Section>

      <Section title="4. Types of Binary Trees">
        <h3>Full Binary Tree</h3>
        <p>Every node has either 0 or 2 children.</p>

        <h3>Complete Binary Tree</h3>
        <p>
          Every level is full except possibly the last, and the last
          level is filled from left to right.
        </p>

        <h3>Perfect Binary Tree</h3>
        <p>
          Every internal node has 2 children and all leaves are at
          the same level.
        </p>

        <h3>Skewed Binary Tree</h3>
        <p>
          Every node has only one child, making the tree resemble
          a linked list.
        </p>

        <h3>Balanced Binary Tree</h3>
        <p>
          A commonly used height-balanced condition is that the
          left and right subtree heights differ by at most 1 at
          every node.
        </p>
      </Section>

      <Section title="5. Binary Tree Properties">
        <ul>
          <li>Maximum nodes at depth <code>d</code>: <code>2^d</code>.</li>
          <li>Maximum nodes in a tree of height <code>h</code>: <code>2^(h+1) - 1</code>.</li>
          <li>Minimum nodes in a binary tree of height <code>h</code>: <code>h + 1</code>.</li>
          <li>A perfect tree of height <code>h</code> has <code>2^(h+1) - 1</code> nodes.</li>
        </ul>
        <p>
          A complete binary tree with <code>n</code> nodes has height
          approximately <code>log2(n)</code>.
        </p>
        <p>
          A skewed tree can have height <code>n - 1</code>.
        </p>
      </Section>

      <Section title="6. Tree Traversals">
        <p>
          Traversal means visiting every node in a specific order.
          The three depth-first traversals are:
        </p>

        <h3>Preorder: Root → Left → Right</h3>
        <Code
          lines={[
            'void preorder(TreeNode root) {',
            '    if (root == null) return;',
            '',
            '    System.out.println(root.val);',
            '    preorder(root.left);',
            '    preorder(root.right);',
            '}',
          ]}
        />

        <h3>Inorder: Left → Root → Right</h3>
        <Code
          lines={[
            'void inorder(TreeNode root) {',
            '    if (root == null) return;',
            '',
            '    inorder(root.left);',
            '    System.out.println(root.val);',
            '    inorder(root.right);',
            '}',
          ]}
        />

        <h3>Postorder: Left → Right → Root</h3>
        <Code
          lines={[
            'void postorder(TreeNode root) {',
            '    if (root == null) return;',
            '',
            '    postorder(root.left);',
            '    postorder(root.right);',
            '    System.out.println(root.val);',
            '}',
          ]}
        />

        <p>
          All three traversals visit each node once: time complexity
          <code> O(n)</code>. Recursive auxiliary space is
          <code> O(h)</code>, where <code>h</code> is tree height.
        </p>
      </Section>

      <Section title="7. Level Order Traversal (BFS)">
        <p>
          Breadth-first search visits nodes level by level. Use a
          queue because the first node inserted should be processed
          first.
        </p>
        <Code
          lines={[
            'void levelOrder(TreeNode root) {',
            '    if (root == null) return;',
            '',
            '    Queue<TreeNode> queue = new LinkedList<>();',
            '    queue.offer(root);',
            '',
            '    while (!queue.isEmpty()) {',
            '        TreeNode node = queue.poll();',
            '        System.out.println(node.val);',
            '',
            '        if (node.left != null) {',
            '            queue.offer(node.left);',
            '        }',
            '        if (node.right != null) {',
            '            queue.offer(node.right);',
            '        }',
            '    }',
            '}',
          ]}
        />
        <p>
          Time: <code>O(n)</code>. Queue space: up to
          <code> O(w)</code>, where <code>w</code> is maximum width
          of the tree.
        </p>
      </Section>

      <Section title="8. Iterative Preorder Traversal">
        <p>
          Use a stack to simulate recursion. Push the right child
          before the left child because the stack is LIFO.
        </p>
        <Code
          lines={[
            'List<Integer> preorderIterative(TreeNode root) {',
            '    List<Integer> result = new ArrayList<>();',
            '    if (root == null) return result;',
            '',
            '    Deque<TreeNode> stack = new ArrayDeque<>();',
            '    stack.push(root);',
            '',
            '    while (!stack.isEmpty()) {',
            '        TreeNode node = stack.pop();',
            '        result.add(node.val);',
            '',
            '        if (node.right != null) {',
            '            stack.push(node.right);',
            '        }',
            '        if (node.left != null) {',
            '            stack.push(node.left);',
            '        }',
            '    }',
            '    return result;',
            '}',
          ]}
        />
        <p>
          Time: <code>O(n)</code>. Stack space: <code>O(h)</code>
          in the general traversal analysis.
        </p>
      </Section>

      <Section title="9. Maximum Depth / Height">
        <p>
          The height of a node is 1 + the maximum height of its
          children when counting nodes. Here is the edge-based
          version used in this lesson:
        </p>
        <Code
          lines={[
            'int height(TreeNode root) {',
            '    if (root == null) return -1;',
            '',
            '    int leftHeight = height(root.left);',
            '    int rightHeight = height(root.right);',
            '',
            '    return 1 + Math.max(leftHeight, rightHeight);',
            '}',
          ]}
        />
        <p>
          Time: <code>O(n)</code>. Recursion space: <code>O(h)</code>.
        </p>
      </Section>

      <Section title="10. Count Nodes">
        <Code
          lines={[
            'int countNodes(TreeNode root) {',
            '    if (root == null) return 0;',
            '',
            '    return 1',
            '        + countNodes(root.left)',
            '        + countNodes(root.right);',
            '}',
          ]}
        />
        <p>
          Each node contributes 1. Time: <code>O(n)</code>;
          recursion space: <code>O(h)</code>.
        </p>
      </Section>

      <Section title="11. Check Whether Two Trees Are Identical">
        <p>
          Two trees are identical when their structure and node
          values match at every corresponding position.
        </p>
        <Code
          lines={[
            'boolean isSameTree(TreeNode p, TreeNode q) {',
            '    if (p == null && q == null) return true;',
            '    if (p == null || q == null) return false;',
            '',
            '    if (p.val != q.val) return false;',
            '',
            '    return isSameTree(p.left, q.left)',
            '        && isSameTree(p.right, q.right);',
            '}',
          ]}
        />
        <p>
          Time: <code>O(n)</code> for equal-sized trees;
          recursion space: <code>O(h)</code>.
        </p>
      </Section>

      <Section title="12. Invert a Binary Tree">
        <p>
          Inverting a tree swaps the left and right children of
          every node.
        </p>
        <Code
          lines={[
            'TreeNode invertTree(TreeNode root) {',
            '    if (root == null) return null;',
            '',
            '    TreeNode temp = root.left;',
            '    root.left = root.right;',
            '    root.right = temp;',
            '',
            '    invertTree(root.left);',
            '    invertTree(root.right);',
            '',
            '    return root;',
            '}',
          ]}
        />
        <p>
          Time: <code>O(n)</code>. Recursion space: <code>O(h)</code>.
          This modifies the original tree.
        </p>
      </Section>

      <Section title="13. Diameter of a Binary Tree">
        <p>
          Diameter is the longest path between any two nodes.
          The path does not have to pass through the root.
        </p>
        <p>
          At each node, a path passing through it has length:
          left height + right height, when height is measured in
          edges.
        </p>
        <Code
          lines={[
            'int diameter = 0;',
            '',
            'int heightForDiameter(TreeNode root) {',
            '    if (root == null) return 0;',
            '',
            '    int left = heightForDiameter(root.left);',
            '    int right = heightForDiameter(root.right);',
            '',
            '    diameter = Math.max(diameter, left + right);',
            '',
            '    return 1 + Math.max(left, right);',
            '}',
          ]}
        />
        <p>
          Initialize <code>diameter</code> before calling the helper.
          The helper uses node-based heights, but <code>left + right</code>
          gives the path length in edges.
        </p>
        <p>
          Time: <code>O(n)</code>. Recursion space: <code>O(h)</code>.
        </p>
      </Section>

      <Section title="14. Check Whether a Tree Is Balanced">
        <p>
          A naive solution computes height repeatedly and can take
          <code> O(n²)</code> on a skewed tree.
        </p>
        <p>
          Better approach: return the height if balanced, otherwise
          return a special value such as -2.
        </p>
        <Code
          lines={[
            'int checkHeight(TreeNode root) {',
            '    if (root == null) return -1;',
            '',
            '    int left = checkHeight(root.left);',
            '    if (left == -2) return -2;',
            '',
            '    int right = checkHeight(root.right);',
            '    if (right == -2) return -2;',
            '',
            '    if (Math.abs(left - right) > 1) {',
            '        return -2;',
            '    }',
            '',
            '    return 1 + Math.max(left, right);',
            '}',
            '',
            'boolean isBalanced(TreeNode root) {',
            '    return checkHeight(root) != -2;',
            '}',
          ]}
        />
        <p>
          Time: <code>O(n)</code>. Recursion space: <code>O(h)</code>.
        </p>
      </Section>

      <Section title="15. Lowest Common Ancestor (LCA)">
        <p>
          For a general binary tree, the LCA is the lowest node
          that has both target nodes as descendants. A node can
          be a descendant of itself.
        </p>
        <Code
          lines={[
            'TreeNode lowestCommonAncestor(',
            '        TreeNode root, TreeNode p, TreeNode q) {',
            '    if (root == null) return null;',
            '',
            '    if (root == p || root == q) return root;',
            '',
            '    TreeNode left = lowestCommonAncestor(',
            '        root.left, p, q);',
            '    TreeNode right = lowestCommonAncestor(',
            '        root.right, p, q);',
            '',
            '    if (left != null && right != null) {',
            '        return root;',
            '    }',
            '',
            '    return left != null ? left : right;',
            '}',
          ]}
        />
        <p>
          Time: <code>O(n)</code>. Recursion space: <code>O(h)</code>.
          This standard version assumes both target nodes exist in
          the tree.
        </p>
      </Section>

      <Section title="16. Root-to-Leaf Path Sum">
        <p>
          Check whether any root-to-leaf path adds up to the
          target value.
        </p>
        <Code
          lines={[
            'boolean hasPathSum(TreeNode root, int target) {',
            '    if (root == null) return false;',
            '',
            '    if (root.left == null && root.right == null) {',
            '        return root.val == target;',
            '    }',
            '',
            '    int remaining = target - root.val;',
            '',
            '    return hasPathSum(root.left, remaining)',
            '        || hasPathSum(root.right, remaining);',
            '}',
          ]}
        />
        <p>
          Only check the sum at a leaf. A path that ends at an
          internal node does not count as root-to-leaf.
        </p>
      </Section>

      <Section title="17. Left View and Right View">
        <p>
          The left view contains the first node visible at each
          level from the left. The right view contains the last
          node visible from the right.
        </p>
        <p>
          Use level-order traversal. For each level, record the
          first node for left view or the last node for right view.
        </p>
        <Code
          lines={[
            'while (!queue.isEmpty()) {',
            '    int size = queue.size();',
            '',
            '    for (int i = 0; i < size; i++) {',
            '        TreeNode node = queue.poll();',
            '',
            '        if (i == 0) {',
            '            leftView.add(node.val);',
            '        }',
            '',
            '        if (i == size - 1) {',
            '            rightView.add(node.val);',
            '        }',
            '',
            '        if (node.left != null) {',
            '            queue.offer(node.left);',
            '        }',
            '        if (node.right != null) {',
            '            queue.offer(node.right);',
            '        }',
            '    }',
            '}',
          ]}
        />
        <p>
          Time: <code>O(n)</code>. Queue space: <code>O(w)</code>.
        </p>
      </Section>

      <Section title="18. Build a Tree from Traversals">
        <p>
          A binary tree can be uniquely reconstructed from preorder
          and inorder traversals if all values are distinct.
        </p>
        <ul>
          <li>Preorder's first value is the root.</li>
          <li>Find the root in inorder.</li>
          <li>Values left of root belong to the left subtree.</li>
          <li>Values right of root belong to the right subtree.</li>
          <li>Recursively construct both subtrees.</li>
        </ul>
        <p>
          For efficient construction, store each inorder value's
          index in a HashMap. This avoids repeatedly scanning
          the inorder array.
        </p>
        <p>
          With the index map, time complexity is <code>O(n)</code>.
          Without it, repeated searching may lead to
          <code> O(n²)</code>.
        </p>
        <p>
          Duplicate values require additional rules because the
          traversal values alone may not identify a unique tree.
        </p>
      </Section>

      <Section title="19. Binary Tree vs Binary Search Tree">
        <p>
          A Binary Search Tree (BST) is a special binary tree
          that follows an ordering rule.
        </p>
        <ul>
          <li>Binary tree: no value ordering is required.</li>
          <li>BST: values in the left subtree are smaller than the node.</li>
          <li>BST: values in the right subtree are greater than the node.</li>
        </ul>
        <p>
          Duplicate handling depends on the implementation. Some
          BSTs reject duplicates; others store counts or define
          a consistent side for equal values.
        </p>
        <p>
          Inorder traversal of a BST produces sorted values
          when the BST ordering and duplicate rules are followed.
        </p>
      </Section>

      <Section title="20. Complexity Summary">
        <ul>
          <li>Traversal: <code>O(n)</code></li>
          <li>Height: <code>O(n)</code></li>
          <li>Count nodes: <code>O(n)</code></li>
          <li>Invert tree: <code>O(n)</code></li>
          <li>Same tree: <code>O(n)</code></li>
          <li>Diameter: <code>O(n)</code> with one DFS</li>
          <li>Balanced check: <code>O(n)</code> with one DFS</li>
          <li>LCA in general binary tree: <code>O(n)</code></li>
          <li>Level order: <code>O(n)</code></li>
        </ul>
        <p>
          Recursive auxiliary space is generally <code>O(h)</code>.
          In a balanced tree, <code>h = O(log n)</code>; in a
          skewed tree, <code>h = O(n)</code>.
        </p>
      </Section>

      <Section title="21. Common Mistakes">
        <ul>
          <li>Forgetting the null base case.</li>
          <li>Confusing height measured in edges with height measured in nodes.</li>
          <li>Using preorder when inorder is required.</li>
          <li>Forgetting to push right before left in iterative preorder.</li>
          <li>Checking path sum before reaching a leaf.</li>
          <li>Assuming diameter must pass through the root.</li>
          <li>Recalculating subtree height repeatedly.</li>
          <li>Using a queue incorrectly for level-by-level processing.</li>
          <li>Assuming every binary tree is a BST.</li>
          <li>Ignoring recursion stack overflow risk for very deep trees.</li>
        </ul>
      </Section>

      <Section title="22. Practice Problems">
        <h3>Beginner</h3>
        <ul>
          <li>Preorder, inorder, and postorder traversal</li>
          <li>Level order traversal</li>
          <li>Maximum depth of binary tree</li>
          <li>Count nodes</li>
          <li>Invert binary tree</li>
        </ul>

        <h3>Intermediate</h3>
        <ul>
          <li>Same tree</li>
          <li>Symmetric tree</li>
          <li>Diameter of binary tree</li>
          <li>Balanced binary tree</li>
          <li>Path sum</li>
          <li>Right side view</li>
          <li>Lowest common ancestor</li>
        </ul>

        <h3>Advanced</h3>
        <ul>
          <li>Construct tree from preorder and inorder</li>
          <li>Maximum path sum</li>
          <li>Serialize and deserialize binary tree</li>
          <li>Vertical order traversal</li>
          <li>Boundary traversal</li>
          <li>Burning tree / minimum time to burn</li>
        </ul>
      </Section>

      <Section title="23. Interview Quick Revision">
        <ul>
          <li>Preorder: Root, Left, Right.</li>
          <li>Inorder: Left, Root, Right.</li>
          <li>Postorder: Left, Right, Root.</li>
          <li>BFS uses a Queue.</li>
          <li>DFS can use recursion or a Stack.</li>
          <li>Most basic tree operations visit nodes in <code>O(n)</code>.</li>
          <li>Recursion stack depends on tree height.</li>
          <li>Diameter can be calculated during height DFS.</li>
          <li>Balanced check should avoid repeated height calculation.</li>
          <li>Inorder of a BST is sorted.</li>
        </ul>
        <p>
          <strong>Interview approach:</strong> Identify whether the
          problem needs DFS, BFS, subtree information, path tracking,
          or tree construction. Then define the meaning of your
          recursive function before writing code.
        </p>
      </Section>

      <Section title="Lesson Complete">
        <p>
          You have covered binary tree fundamentals, traversals,
          recursion, BFS, common tree problems, complexity analysis,
          and interview patterns.
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

export default BinaryTreesLesson;

