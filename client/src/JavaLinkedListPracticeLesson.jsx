

const sectionStyle = {
  background: "var(--card, #ffffff)",
  border: "1px solid var(--border, #e5e7eb)",
  borderRadius: "12px",
  padding: "18px",
  marginBottom: "18px",
};

const headingStyle = {
  fontSize: "21px",
  fontWeight: "700",
  marginBottom: "12px",
};

const codeStyle = {
  background: "var(--code-bg, #f3f4f6)",
  color: "var(--text, #111827)",
  padding: "14px",
  borderRadius: "8px",
  overflowX: "auto",
  whiteSpace: "pre",
  fontSize: "13px",
  lineHeight: "1.6",
};

const lessons = [
  {
    title: "1. Create and Traverse a Linked List",
    level: "Beginner",
    question:
      "Create a singly linked list containing 10, 20, and 30. Print all its values.",
    hint:
      "Each node stores data and a reference to the next node. Start traversal from head.",
    solution: `class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
    }
}

static void printList(ListNode head) {
    ListNode current = head;

    while (current != null) {
        System.out.print(current.val + " ");
        current = current.next;
    }
}

public static void main(String[] args) {
    ListNode head = new ListNode(10);
    head.next = new ListNode(20);
    head.next.next = new ListNode(30);

    printList(head); // 10 20 30
}`,
    explanation:
      "head points to the first node. Each next reference points to the following node. The final node points to null. Traversal stops when current becomes null.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "2. Insert a Node at the Beginning",
    level: "Beginner",
    question:
      "Insert a new value at the beginning of a linked list and return the updated head.",
    hint:
      "The new node must point to the old head before it becomes the new head.",
    solution: `static ListNode insertAtBeginning(
    ListNode head,
    int value
) {
    ListNode newNode = new ListNode(value);

    newNode.next = head;

    return newNode;
}

// Example:
// List: 20 -> 30 -> null
// insertAtBeginning(head, 10)
// Result: 10 -> 20 -> 30 -> null`,
    explanation:
      "The new node becomes the first node. Returning the new head is important because the original head reference is no longer the beginning of the list.",
    complexity: "Time: O(1) | Extra space: O(1)",
  },
  {
    title: "3. Reverse a Linked List",
    level: "Beginner",
    question:
      "Reverse a singly linked list iteratively.",
    hint:
      "Use three references: previous, current, and nextNode. Save the next node before changing the link.",
    solution: `static ListNode reverseList(ListNode head) {
    ListNode previous = null;
    ListNode current = head;

    while (current != null) {
        ListNode nextNode = current.next;

        current.next = previous;

        previous = current;
        current = nextNode;
    }

    return previous;
}

// Before:
// 1 -> 2 -> 3 -> null
//
// After:
// 3 -> 2 -> 1 -> null`,
    explanation:
      "At every step, current.next is redirected backward. nextNode preserves the remaining list so it is not lost. When the loop ends, previous is the new head.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "4. Find the Middle Node",
    level: "Intermediate",
    question:
      "Return the middle node of a linked list. If the list has an even number of nodes, return the second middle node.",
    hint:
      "Move slow by one node and fast by two nodes.",
    solution: `static ListNode middleNode(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;

    while (
        fast != null &&
        fast.next != null
    ) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

// 1 -> 2 -> 3 -> 4 -> 5
// Middle: 3
//
// 1 -> 2 -> 3 -> 4 -> 5 -> 6
// Middle: 4`,
    explanation:
      "Fast moves twice as quickly as slow. When fast reaches the end, slow has travelled approximately half the list.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "5. Detect a Cycle",
    level: "Intermediate",
    question:
      "Determine whether a linked list contains a cycle.",
    hint:
      "Use Floyd's slow and fast pointer algorithm.",
    solution: `static boolean hasCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;

    while (
        fast != null &&
        fast.next != null
    ) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow == fast) {
            return true;
        }
    }

    return false;
}`,
    explanation:
      "If there is no cycle, fast eventually reaches null. If a cycle exists, fast eventually catches slow inside the cycle. Compare node references, not node values.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "6. Merge Two Sorted Linked Lists",
    level: "Intermediate",
    question:
      "Merge two sorted linked lists into one sorted list.",
    hint:
      "Use a dummy node and a tail pointer. Attach the smaller current node each time.",
    solution: `static ListNode mergeTwoLists(
    ListNode list1,
    ListNode list2
) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;

    while (
        list1 != null &&
        list2 != null
    ) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }

        tail = tail.next;
    }

    if (list1 != null) {
        tail.next = list1;
    } else {
        tail.next = list2;
    }

    return dummy.next;
}`,
    explanation:
      "The dummy node avoids special handling for the first inserted node. The tail always points to the last node in the merged list. Existing nodes are reused.",
    complexity: "Time: O(n + m) | Extra space: O(1)",
  },
  {
    title: "7. Remove the Nth Node from the End",
    level: "Interview",
    question:
      "Remove the nth node from the end of a linked list and return the head.",
    hint:
      "Use a dummy node. Move fast n steps ahead, then move fast and slow together.",
    solution: `static ListNode removeNthFromEnd(
    ListNode head,
    int n
) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;

    ListNode slow = dummy;
    ListNode fast = dummy;

    for (int i = 0; i < n; i++) {
        fast = fast.next;
    }

    while (fast.next != null) {
        slow = slow.next;
        fast = fast.next;
    }

    slow.next = slow.next.next;

    return dummy.next;
}`,
    explanation:
      "The gap between fast and slow remains n nodes. When fast reaches the final node, slow is just before the node to remove. The dummy node also handles removing the head. Assume 1 <= n <= list length.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "8. Check Whether a Linked List Is a Palindrome",
    level: "Interview",
    question:
      "Determine whether the values in a linked list read the same forward and backward.",
    hint:
      "Find the middle, reverse the second half, then compare both halves.",
    solution: `static boolean isPalindrome(ListNode head) {
    if (
        head == null ||
        head.next == null
    ) {
        return true;
    }

    ListNode slow = head;
    ListNode fast = head;

    while (
        fast.next != null &&
        fast.next.next != null
    ) {
        slow = slow.next;
        fast = fast.next.next;
    }

    ListNode secondHalf =
        reverseList(slow.next);

    ListNode firstHalf = head;
    ListNode second = secondHalf;

    while (second != null) {
        if (firstHalf.val != second.val) {
            return false;
        }

        firstHalf = firstHalf.next;
        second = second.next;
    }

    return true;
}

// Uses the reverseList method from Problem 3.`,
    explanation:
      "The first half and reversed second half should contain matching values. This method modifies the second half during checking. If the list must be preserved, reverse the second half again before returning.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "9. Find the Intersection of Two Linked Lists",
    level: "Interview",
    question:
      "Return the node where two singly linked lists intersect. They intersect by node reference, not merely by equal values.",
    hint:
      "When a pointer reaches the end of one list, redirect it to the head of the other list.",
    solution: `static ListNode getIntersectionNode(
    ListNode headA,
    ListNode headB
) {
    ListNode a = headA;
    ListNode b = headB;

    while (a != b) {
        a = (a == null) ? headB : a.next;
        b = (b == null) ? headA : b.next;
    }

    return a;
}`,
    explanation:
      "Pointer a travels list A then list B. Pointer b travels list B then list A. Both travel the same total distance, so they meet at the intersection or at null if no intersection exists.",
    complexity: "Time: O(n + m) | Extra space: O(1)",
  },
  {
    title: "10. Reorder List",
    level: "Interview",
    question:
      "Reorder a list from L0 → L1 → ... → Ln into L0 → Ln → L1 → Ln-1 → ... . Modify it in-place.",
    hint:
      "Find the middle, reverse the second half, then merge the two halves alternately.",
    solution: `static void reorderList(ListNode head) {
    if (
        head == null ||
        head.next == null
    ) {
        return;
    }

    ListNode slow = head;
    ListNode fast = head;

    while (
        fast.next != null &&
        fast.next.next != null
    ) {
        slow = slow.next;
        fast = fast.next.next;
    }

    ListNode second =
        reverseList(slow.next);

    slow.next = null;

    ListNode first = head;

    while (second != null) {
        ListNode firstNext = first.next;
        ListNode secondNext = second.next;

        first.next = second;
        second.next = firstNext;

        first = firstNext;
        second = secondNext;
    }
}

// Uses reverseList from Problem 3.`,
    explanation:
      "The middle separates the list into two parts. Reversing the second part puts the last node first. Alternating nodes from both halves produces the required order. Setting slow.next to null prevents an accidental cycle.",
    complexity: "Time: O(n) | Extra space: O(1)",
  },
  {
    title: "11. Add Two Numbers",
    level: "Interview",
    question:
      "Two linked lists represent non-negative integers in reverse digit order. Add them and return the result in the same format.",
    hint:
      "Add corresponding digits along with carry. Continue while either list or carry remains.",
    solution: `static ListNode addTwoNumbers(
    ListNode l1,
    ListNode l2
) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;

    int carry = 0;

    while (
        l1 != null ||
        l2 != null ||
        carry != 0
    ) {
        int sum = carry;

        if (l1 != null) {
            sum += l1.val;
            l1 = l1.next;
        }

        if (l2 != null) {
            sum += l2.val;
            l2 = l2.next;
        }

        carry = sum / 10;

        tail.next = new ListNode(sum % 10);
        tail = tail.next;
    }

    return dummy.next;
}

// 342 + 465
// 2 -> 4 -> 3
// 5 -> 6 -> 4
// Result: 7 -> 0 -> 8 (807)`,
    explanation:
      "Each node stores one digit. sum % 10 gives the current digit, while sum / 10 gives the carry for the next position.",
    complexity: "Time: O(max(n, m)) | Extra space: O(max(n, m)) for the result",
  },
  {
    title: "12. Linked List Interview Checklist",
    level: "All levels",
    question:
      "Before coding a linked-list problem, identify the pointer pattern and the edge cases.",
    hint:
      "Draw the nodes and arrows. Pointer problems become much easier when you track references visually.",
    solution: `Common patterns:

1. Traversal
   current = current.next

2. Dummy node
   Simplifies head insertion and deletion.

3. Previous / Current / Next
   Used for reversing links.

4. Slow / Fast pointers
   Middle node and cycle detection.

5. Two pointers with a gap
   Nth node from the end.

6. Reverse second half
   Palindrome and reorder problems.

7. Pointer switching
   Intersection of two lists.

Always test:
- Empty list
- One node
- Two nodes
- Duplicate values
- Removing the head
- Even and odd lengths
- Cycle or no cycle`,
    explanation:
      "Interviewers often change one condition: return the first middle instead of the second, preserve the original list, or handle invalid n. Understand the pointer invariant rather than memorizing code.",
    complexity:
      "Goal: explain each pointer's role and why the algorithm terminates.",
  },
];

export default function JavaLinkedListPracticeLesson({ onBack }) {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <button
        onClick={onBack}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid var(--border, #e5e7eb)",
          background: "var(--card, #ffffff)",
          color: "var(--text, #111827)",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back to Java
      </button>

      <h1
        style={{
          fontSize: "30px",
          fontWeight: "800",
          marginBottom: "10px",
        }}
      >
        Java Coding Practice — Linked Lists
      </h1>

      <p
        style={{
          color: "var(--muted, #6b7280)",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        Learn linked-list pointer patterns from
        beginner to interview level. Try each
        problem before opening the solution.
      </p>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Node Structure</h2>
        <p style={{ lineHeight: "1.7" }}>
          A singly linked list node contains a value
          and a reference to the next node. The
          following class is used by the solutions
          below.
        </p>

        <pre style={codeStyle}>
          <code>{`class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
    }
}`}</code>
        </pre>
      </section>

      {lessons.map((lesson, index) => (
        <section key={index} style={sectionStyle}>
          <h2 style={headingStyle}>{lesson.title}</h2>

          <p
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "var(--muted, #6b7280)",
              marginBottom: "12px",
            }}
          >
            Level: {lesson.level}
          </p>

          <p style={{ lineHeight: "1.7" }}>
            <strong>Problem:</strong> {lesson.question}
          </p>

          <div
            style={{
              background: "var(--code-bg, #f3f4f6)",
              padding: "12px",
              borderRadius: "8px",
              margin: "12px 0",
              lineHeight: "1.7",
            }}
          >
            <strong>Hint:</strong> {lesson.hint}
          </div>

          <h3
            style={{
              fontSize: "16px",
              fontWeight: "700",
              margin: "14px 0 10px",
            }}
          >
            Solution
          </h3>

          <pre style={codeStyle}>
            <code>{lesson.solution}</code>
          </pre>

          <h3
            style={{
              fontSize: "16px",
              fontWeight: "700",
              margin: "14px 0 10px",
            }}
          >
            Explanation
          </h3>

          <p style={{ lineHeight: "1.7" }}>
            {lesson.explanation}
          </p>

          <p
            style={{
              fontWeight: "700",
              marginTop: "12px",
            }}
          >
            {lesson.complexity}
          </p>
        </section>
      ))}

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Final Practice Checklist</h2>

        <ul style={{ lineHeight: "1.8" }}>
          <li>Understand head, next, and null.</li>
          <li>Insert and delete nodes safely.</li>
          <li>Reverse a list without losing nodes.</li>
          <li>Use slow and fast pointers.</li>
          <li>Detect cycles using node references.</li>
          <li>Merge sorted lists using a dummy node.</li>
          <li>Handle head deletion correctly.</li>
          <li>Explain time and space complexity.</li>
        </ul>
      </section>
    </div>
  );
}
