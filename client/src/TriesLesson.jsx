
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

export default function TriesLesson({ onBack }) {
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

      <h1>Tries (Prefix Trees)</h1>
      <p>
        A Trie stores strings by their characters. Words with the same
        prefix share the same path in the tree.
      </p>

      <Section title="1. What is a Trie?">
        <p>
          A Trie is a tree-based data structure commonly used to store and
          search strings efficiently.
        </p>
        <p>
          Each edge represents a character. A path from the root represents
          a prefix, and a node can mark the end of a complete word.
        </p>
        <p>Example words: cat, car, care, dog.</p>
        <Code lines={[
          "root",
          "├── c",
          "│   └── a",
          "│       ├── t*",
          "│       └── r*",
          "│           └── e*",
          "└── d",
          "    └── o",
          "        └── g*",
          "",
          "* means a complete word ends here"
        ]} />
        <p>
          The words cat, car, and care share the prefix ca, so their
          characters are stored along a shared path.
        </p>
      </Section>

      <Section title="2. Trie Terminology">
        <ul>
          <li><strong>Root:</strong> starting node; usually represents an empty prefix.</li>
          <li><strong>Child:</strong> a node reached by following one character.</li>
          <li><strong>Prefix:</strong> beginning part of a word.</li>
          <li><strong>Terminal node:</strong> node where a complete word ends.</li>
          <li><strong>Path:</strong> sequence of nodes representing characters.</li>
        </ul>
        <p>
          A terminal marker is essential. For example, if both app and apple
          are stored, the node for app must mark a word ending even though
          it has children.
        </p>
      </Section>

      <Section title="3. Trie vs HashSet">
        <ul>
          <li>HashSet: efficient exact-word lookup on average, but does not naturally support prefix traversal.</li>
          <li>Trie: supports exact search and prefix search by following character paths.</li>
          <li>Trie can support autocomplete and prefix counting.</li>
          <li>Trie may use more memory because it stores many nodes and child references.</li>
        </ul>
        <p>
          Use a Trie when prefix operations matter. For only exact lookup
          in a small dictionary, a HashSet may be simpler.
        </p>
      </Section>

      <Section title="4. Trie Node in Java">
        <p>
          For lowercase English letters, each node can store an array of
          26 children.
        </p>
        <Code lines={[
          "class TrieNode {",
          "    TrieNode[] children = new TrieNode[26];",
          "    boolean isWord = false;",
          "}"
        ]} />
        <p>
          Character index is calculated using:
        </p>
        <p><strong>index = character - 'a'</strong></p>
        <p>
          This fixed array is fast, but it assumes characters are only
          lowercase a through z.
        </p>
      </Section>

      <Section title="5. Implement Trie: Insert, Search, Prefix">
        <p>
          Insert creates missing nodes. Search follows the path and checks
          the terminal marker. Prefix search only checks whether the path
          exists.
        </p>
        <Code lines={[
          "class Trie {",
          "    private TrieNode root = new TrieNode();",
          "",
          "    public void insert(String word) {",
          "        TrieNode current = root;",
          "",
          "        for (char ch : word.toCharArray()) {",
          "            int index = ch - 'a';",
          "",
          "            if (current.children[index] == null) {",
          "                current.children[index] = new TrieNode();",
          "            }",
          "",
          "            current = current.children[index];",
          "        }",
          "",
          "        current.isWord = true;",
          "    }",
          "",
          "    public boolean search(String word) {",
          "        TrieNode node = findNode(word);",
          "        return node != null && node.isWord;",
          "    }",
          "",
          "    public boolean startsWith(String prefix) {",
          "        return findNode(prefix) != null;",
          "    }",
          "",
          "    private TrieNode findNode(String text) {",
          "        TrieNode current = root;",
          "",
          "        for (char ch : text.toCharArray()) {",
          "            int index = ch - 'a';",
          "            if (current.children[index] == null) {",
          "                return null;",
          "            }",
          "            current = current.children[index];",
          "        }",
          "",
          "        return current;",
          "    }",
          "}"
        ]} />
        <p><strong>Insert:</strong> O(L).</p>
        <p><strong>Search:</strong> O(L).</p>
        <p><strong>Prefix search:</strong> O(P).</p>
        <p>
          L is the word length and P is the prefix length. These bounds
          assume child access is O(1).
        </p>
      </Section>

      <Section title="6. Dry Run: Insert 'cat'">
        <ol>
          <li>Start at root.</li>
          <li>Read c: create or follow child c.</li>
          <li>Read a: create or follow child a.</li>
          <li>Read t: create or follow child t.</li>
          <li>Mark the t node as a complete word.</li>
        </ol>
        <p>
          Search cat returns true. Search ca returns false because ca is
          a prefix, but not a complete inserted word. startsWith(ca)
          returns true.
        </p>
      </Section>

      <Section title="7. Count Words With a Prefix">
        <p>
          To count words with a given prefix, one simple method is to find
          the prefix node and DFS through its subtree, counting terminal
          nodes.
        </p>
        <p>
          If the subtree contains S nodes, this method takes O(S) time.
        </p>
        <p>
          For frequent prefix-count queries, store a prefix count in each
          node and update it during insertion and deletion.
        </p>
        <p>
          With a prefixCount field, the number of words passing through
          a prefix node can be returned in O(P) time after traversing
          the prefix.
        </p>
      </Section>

      <Section title="8. Trie With Prefix Counts">
        <p>
          Each node can store how many inserted words pass through it.
          This is useful for counting words with a prefix and counting
          occurrences of a word.
        </p>
        <Code lines={[
          "class CountNode {",
          "    CountNode[] children = new CountNode[26];",
          "    int prefixCount = 0;",
          "    int wordCount = 0;",
          "}",
          "",
          "// During insertion, after moving to each child:",
          "current.prefixCount++;",
          "",
          "// After processing the complete word:",
          "current.wordCount++;"
        ]} />
        <p>
          If duplicate words are allowed, wordCount records how many times
          the word was inserted. If duplicates are not allowed, use a
          boolean terminal marker or check before incrementing.
        </p>
      </Section>

      <Section title="9. Delete a Word">
        <p>
          Deletion must not remove nodes that are still needed by other
          words.
        </p>
        <p>Example: delete car when care is also stored.</p>
        <ul>
          <li>Unmark the terminal node for car.</li>
          <li>Keep the shared c-a-r path because care uses it.</li>
          <li>Remove nodes only when they have no children and are not terminal.</li>
        </ul>
        <p>
          A recursive delete can return whether a node is now safe to
          remove. For prefix counts, decrement counts along the path.
        </p>
      </Section>

      <Section title="10. Autocomplete">
        <p>
          Autocomplete returns words that begin with a given prefix.
        </p>
        <ol>
          <li>Traverse the Trie to the prefix node.</li>
          <li>If the node does not exist, return no results.</li>
          <li>Run DFS from that node.</li>
          <li>Whenever a terminal node is reached, output the word.</li>
        </ol>
        <p>
          If the prefix length is P and the visited subtree contains S
          nodes, traversal takes O(P + S), excluding the cost of building
          output strings.
        </p>
        <p>
          To return only the first K suggestions, stop after collecting
          K words. For ranked autocomplete, nodes may store popularity
          or frequency information.
        </p>
      </Section>

      <Section title="11. Wildcard Search">
        <p>
          Some dictionary problems allow a dot to represent any one
          character.
        </p>
        <p>
          For a normal character, follow one child. For a wildcard,
          recursively try every existing child.
        </p>
        <p>
          Worst-case time can be exponential in the search pattern length
          when many wildcard positions branch across the Trie.
        </p>
        <p>
          Use DFS/backtracking and return true as soon as one path matches
          a complete word.
        </p>
      </Section>

      <Section title="12. Word Search With a Trie">
        <p>
          In grid word-search problems, a Trie can avoid searching for
          every dictionary word separately.
        </p>
        <ol>
          <li>Insert all dictionary words into a Trie.</li>
          <li>Start DFS from each grid cell.</li>
          <li>Follow the Trie child matching the current cell.</li>
          <li>If no child exists, stop that search path immediately.</li>
          <li>When a terminal node is reached, record the word.</li>
          <li>Continue exploring adjacent cells while avoiding cell reuse.</li>
        </ol>
        <p>
          Trie prefix pruning is the key optimization: if the current
          character path is not a dictionary prefix, no longer word can
          match from that path.
        </p>
      </Section>

      <Section title="13. Binary Trie">
        <p>
          A Binary Trie stores bits instead of letters. Each node has
          two children: 0 and 1.
        </p>
        <p>
          It is often used for XOR problems, such as finding the maximum
          XOR of two numbers in an array.
        </p>
        <p>
          For each bit from most significant to least significant, to
          maximize XOR, try to follow the opposite bit if it exists.
        </p>
        <p>
          For 32-bit integers, insertion and query take O(32), which is
          O(1) for fixed-width integers.
        </p>
      </Section>

      <Section title="14. Complexity and Memory">
        <ul>
          <li>Insert a word of length L: O(L).</li>
          <li>Exact search: O(L).</li>
          <li>Prefix search: O(P).</li>
          <li>Autocomplete: O(P + visited subtree).</li>
          <li>Space: O(total characters stored) in the worst case, multiplied by per-node child storage overhead.</li>
        </ul>
        <p>
          A 26-child array allocates 26 references for every node, even
          when most children are unused. A HashMap-based node can reduce
          unused child storage but adds hashing and object overhead.
        </p>
      </Section>

      <Section title="15. Array Children vs HashMap Children">
        <p><strong>Array[26]</strong></p>
        <ul>
          <li>Fast constant-time child access.</li>
          <li>Simple implementation.</li>
          <li>Works well for lowercase English letters.</li>
          <li>Can waste memory for sparse nodes.</li>
        </ul>
        <p><strong>HashMap&lt;Character, Node&gt;</strong></p>
        <ul>
          <li>Supports a more flexible character set.</li>
          <li>Stores only existing child edges.</li>
          <li>Usually has more per-entry overhead and average-case hash lookup.</li>
        </ul>
        <p>
          Choose based on the input alphabet and memory constraints.
        </p>
      </Section>

      <Section title="16. Common Mistakes">
        <ul>
          <li>Forgetting to mark the end of a complete word.</li>
          <li>Confusing a prefix with a stored word.</li>
          <li>Deleting shared prefix nodes incorrectly.</li>
          <li>Using character - 'a' without validating the character range.</li>
          <li>Assuming Trie always uses less memory than a HashSet.</li>
          <li>Not handling duplicate words when counts are required.</li>
          <li>Building autocomplete without limiting output or visited nodes.</li>
          <li>Forgetting to prevent reusing a grid cell in Word Search.</li>
        </ul>
      </Section>

      <Section title="17. Practice Problems">
        <h3>Beginner</h3>
        <ul>
          <li>Implement Trie (Insert, Search, Prefix)</li>
          <li>Longest Common Prefix</li>
          <li>Count words with a given prefix</li>
        </ul>
        <h3>Intermediate</h3>
        <ul>
          <li>Design Add and Search Words Data Structure</li>
          <li>Replace Words</li>
          <li>Search Suggestions System</li>
          <li>Longest Word in Dictionary</li>
        </ul>
        <h3>Advanced</h3>
        <ul>
          <li>Word Search II</li>
          <li>Maximum XOR of Two Numbers in an Array</li>
          <li>Maximum XOR With an Element From Array</li>
          <li>Distinct Substrings using Trie or suffix structures</li>
        </ul>
      </Section>

      <Section title="18. Quick Revision">
        <ul>
          <li>Trie stores strings character by character.</li>
          <li>Common prefixes share nodes.</li>
          <li>Terminal marker distinguishes a word from a prefix.</li>
          <li>Insert/search/prefix traversal take O(length).</li>
          <li>Autocomplete uses DFS from the prefix node.</li>
          <li>Deletion must preserve nodes shared by other words.</li>
          <li>Binary Trie is useful for bitwise XOR problems.</li>
          <li>Tries trade memory for fast prefix operations.</li>
        </ul>
      </Section>
    </div>
  );
}
