

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
    title: "1. What is an array?",
    content: (
      <>
        <p>
          An array is a fixed-size data structure that stores multiple values
          of the same type.
        </p>
        <p>
          Instead of creating separate variables for many values, you can
          store them under one array name and access them using indexes.
        </p>
        <ul>
          <li>Arrays have a fixed length after creation.</li>
          <li>Array elements are accessed using indexes.</li>
          <li>Indexes start from 0.</li>
          <li>Arrays can store primitive values or object references.</li>
        </ul>
      </>
    ),
    code: `int[] marks = {85, 90, 78, 92};

System.out.println(marks[0]); // 85
System.out.println(marks[1]); // 90`,
  },
  {
    title: "2. Declaring and creating arrays",
    content: (
      <>
        <p>
          You can declare an array variable and create the array separately,
          or initialize it directly with values.
        </p>
        <p>
          The array length is fixed when the array object is created.
        </p>
      </>
    ),
    code: `// Declaration
int[] numbers;

// Creation: array of 5 integers
numbers = new int[5];

// Declaration + creation
int[] values = new int[3];

// Initialization with values
int[] marks = {80, 90, 75};`,
  },
  {
    title: "3. Default values in arrays",
    content: (
      <>
        <p>
          When an array is created using new, Java automatically initializes
          its elements with default values.
        </p>
        <ul>
          <li>int: 0</li>
          <li>double: 0.0</li>
          <li>boolean: false</li>
          <li>char: the null character</li>
          <li>Reference types: null</li>
        </ul>
        <p>
          This is different from local variables, which must be initialized
          before being read.
        </p>
      </>
    ),
    code: `int[] numbers = new int[3];
boolean[] flags = new boolean[2];
String[] names = new String[2];

System.out.println(numbers[0]); // 0
System.out.println(flags[0]);   // false
System.out.println(names[0]);   // null`,
  },
  {
    title: "4. Array indexes and length",
    content: (
      <>
        <p>
          The first element is at index 0. The last element is at index
          <code> length - 1</code>.
        </p>
        <p>
          Java arrays use the property <code>length</code>, not the method
          <code> length()</code>.
        </p>
        <p>
          Accessing an invalid index causes
          <code> ArrayIndexOutOfBoundsException</code>.
        </p>
      </>
    ),
    code: `int[] numbers = {10, 20, 30};

System.out.println(numbers.length); // 3
System.out.println(numbers[0]);    // 10
System.out.println(numbers[2]);    // 30

// Invalid:
// numbers[3]`,
  },
  {
    title: "5. Updating array elements",
    content: (
      <>
        <p>
          Array elements can be changed by assigning a new value to an
          existing index.
        </p>
        <p>
          The array size remains the same. You are changing an element,
          not adding a new position.
        </p>
      </>
    ),
    code: `int[] numbers = {10, 20, 30};

numbers[1] = 99;

System.out.println(numbers[1]);

Output:
99`,
  },
  {
    title: "6. Traversing an array",
    content: (
      <>
        <p>
          Traversal means visiting each element of an array.
        </p>
        <p>
          A traditional for loop is useful when you need the index.
          An enhanced for loop is useful when you only need each value.
        </p>
      </>
    ),
    code: `int[] numbers = {10, 20, 30};

// Traditional for
for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}

// Enhanced for
for (int value : numbers) {
    System.out.println(value);
}`,
  },
  {
    title: "7. Sum and average of array elements",
    content: (
      <>
        <p>
          A common array problem is calculating the sum of all elements.
          Keep a running total while traversing the array.
        </p>
        <p>
          To calculate the average, divide the sum by the number of elements.
          Use a decimal divisor if you need a decimal result.
        </p>
      </>
    ),
    code: `int[] numbers = {10, 20, 30, 40};

int sum = 0;

for (int value : numbers) {
    sum += value;
}

double average = (double) sum / numbers.length;

System.out.println(sum);     // 100
System.out.println(average); // 25.0`,
  },
  {
    title: "8. Finding the maximum and minimum",
    content: (
      <>
        <p>
          Initialize the maximum and minimum using the first element,
          then compare the remaining elements.
        </p>
        <p>
          This is safer than initializing maximum to 0, because an array
          may contain only negative numbers.
        </p>
        <p>
          The array must contain at least one element for this approach.
        </p>
      </>
    ),
    code: `int[] numbers = {-8, -3, -15, -2};

int max = numbers[0];
int min = numbers[0];

for (int i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
        max = numbers[i];
    }

    if (numbers[i] < min) {
        min = numbers[i];
    }
}

System.out.println("Max: " + max); // -2
System.out.println("Min: " + min); // -15`,
  },
  {
    title: "9. Linear search",
    content: (
      <>
        <p>
          Linear search checks elements one by one until the target is found
          or the array ends.
        </p>
        <p>
          It works on sorted and unsorted arrays.
        </p>
        <ul>
          <li>Best case: O(1), target is first.</li>
          <li>Worst case: O(n), target is last or absent.</li>
          <li>Extra space: O(1).</li>
        </ul>
      </>
    ),
    code: `int[] numbers = {12, 7, 25, 9};
int target = 25;

int index = -1;

for (int i = 0; i < numbers.length; i++) {
    if (numbers[i] == target) {
        index = i;
        break;
    }
}

System.out.println(index); // 2`,
  },
  {
    title: "10. Reversing an array",
    content: (
      <>
        <p>
          To reverse an array in place, use two pointers:
          one at the beginning and one at the end.
        </p>
        <p>
          Swap the elements and move both pointers toward the middle.
        </p>
        <p>
          Time complexity: O(n). Extra space: O(1).
        </p>
      </>
    ),
    code: `int[] arr = {1, 2, 3, 4, 5};

int left = 0;
int right = arr.length - 1;

while (left < right) {
    int temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    left++;
    right--;
}

// Result:
// {5, 4, 3, 2, 1}`,
  },
  {
    title: "11. Copying arrays",
    content: (
      <>
        <p>
          Assigning one array variable to another does not copy the array.
          It copies the reference.
        </p>
        <p>
          Both variables then refer to the same array object.
        </p>
        <p>
          Use a loop, <code>Arrays.copyOf()</code>, or
          <code> System.arraycopy()</code> to copy elements.
        </p>
      </>
    ),
    code: `int[] original = {1, 2, 3};

// Reference copy
int[] reference = original;

// Actual copy
int[] copy = java.util.Arrays.copyOf(
    original,
    original.length
);

copy[0] = 99;

System.out.println(original[0]); // 1
System.out.println(reference[0]); // 1`,
  },
  {
    title: "12. Sorting arrays",
    content: (
      <>
        <p>
          Java provides <code>Arrays.sort()</code> to sort primitive arrays
          and arrays of objects according to their supported ordering.
        </p>
        <p>
          For an int array, it sorts values in ascending order.
        </p>
        <p>
          Sorting is useful before applying algorithms such as binary search.
        </p>
      </>
    ),
    code: `import java.util.Arrays;

int[] numbers = {5, 2, 8, 1, 3};

Arrays.sort(numbers);

System.out.println(Arrays.toString(numbers));

// [1, 2, 3, 5, 8]`,
  },
  {
    title: "13. Binary search",
    content: (
      <>
        <p>
          Binary search repeatedly divides a sorted search range in half.
        </p>
        <p>
          It requires the array to be sorted according to the order used
          by the search.
        </p>
        <ul>
          <li>Time complexity: O(log n).</li>
          <li>Iterative extra space: O(1).</li>
          <li>It is not generally valid on an unsorted array.</li>
        </ul>
      </>
    ),
    code: `int[] arr = {2, 4, 6, 8, 10, 12};
int target = 10;

int left = 0;
int right = arr.length - 1;
int answer = -1;

while (left <= right) {
    int mid = left + (right - left) / 2;

    if (arr[mid] == target) {
        answer = mid;
        break;
    } else if (arr[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

System.out.println(answer); // 4`,
  },
  {
    title: "14. Two-dimensional arrays",
    content: (
      <>
        <p>
          A two-dimensional array is an array whose elements are themselves
          arrays.
        </p>
        <p>
          It is commonly used to represent tables, grids, and matrices.
        </p>
        <p>
          Access an element using two indexes: row and column.
        </p>
      </>
    ),
    code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

System.out.println(matrix[0][0]); // 1
System.out.println(matrix[1][2]); // 6
System.out.println(matrix[2][1]); // 8`,
  },
  {
    title: "15. Traversing a matrix",
    content: (
      <>
        <p>
          Use nested loops to visit each row and each column.
        </p>
        <p>
          The outer loop usually controls rows. The inner loop controls
          columns in the current row.
        </p>
      </>
    ),
    code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};

for (int row = 0; row < matrix.length; row++) {
    for (
        int col = 0;
        col < matrix[row].length;
        col++
    ) {
        System.out.print(matrix[row][col] + " ");
    }

    System.out.println();
}

// Output:
// 1 2 3
// 4 5 6`,
  },
  {
    title: "16. Jagged arrays",
    content: (
      <>
        <p>
          Java's multidimensional arrays can have rows of different lengths.
          These are often called jagged arrays.
        </p>
        <p>
          Use <code>matrix[row].length</code> to get the length of a
          particular row.
        </p>
        <p>
          Do not assume every row has the same number of columns.
        </p>
      </>
    ),
    code: `int[][] arr = new int[3][];

arr[0] = new int[2];
arr[1] = new int[4];
arr[2] = new int[1];

System.out.println(arr[0].length); // 2
System.out.println(arr[1].length); // 4
System.out.println(arr[2].length); // 1`,
  },
  {
    title: "17. What is a String?",
    content: (
      <>
        <p>
          A String is an object that represents a sequence of characters.
        </p>
        <p>
          Strings are immutable. Once a String object is created, its
          character contents cannot be changed.
        </p>
        <p>
          Operations that appear to modify a String create or return
          another String instead.
        </p>
      </>
    ),
    code: `String name = "Java";

name.concat(" Programming");

System.out.println(name);

// Output:
// Java

// The returned String was not assigned.`,
  },
  {
    title: "18. String immutability",
    content: (
      <>
        <p>
          Immutability means the object cannot be modified after creation.
        </p>
        <p>
          This helps make Strings predictable and safe to share.
          It also allows Java to use the String pool for certain String
          literals.
        </p>
        <p>
          Remember: assigning a new String to a variable changes the
          variable's reference, not the original String object.
        </p>
      </>
    ),
    code: `String text = "Hello";

text = text + " Java";

System.out.println(text);

// Output:
// Hello Java

// A new String value is assigned to text.`,
  },
  {
    title: "19. Common String methods",
    content: (
      <>
        <table>
          <thead>
            <tr><th>Method</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td>length()</td><td>Number of characters</td></tr>
            <tr><td>charAt(i)</td><td>Character at index i</td></tr>
            <tr><td>substring()</td><td>Extract part of String</td></tr>
            <tr><td>equals()</td><td>Compare content</td></tr>
            <tr><td>equalsIgnoreCase()</td><td>Compare ignoring case</td></tr>
            <tr><td>toLowerCase()</td><td>Convert to lowercase</td></tr>
            <tr><td>toUpperCase()</td><td>Convert to uppercase</td></tr>
            <tr><td>contains()</td><td>Check whether text occurs</td></tr>
            <tr><td>indexOf()</td><td>Find first matching index</td></tr>
            <tr><td>trim()</td><td>Remove leading/trailing basic spaces</td></tr>
          </tbody>
        </table>
      </>
    ),
    code: `String text = "Java Programming";

System.out.println(text.length());
System.out.println(text.charAt(0));
System.out.println(text.substring(0, 4));
System.out.println(text.toUpperCase());
System.out.println(text.contains("Program"));

// Remember:
// substring(start, end)
// includes start, excludes end.`,
  },
  {
    title: "20. String comparison: == vs equals()",
    content: (
      <>
        <p>
          <code>==</code> compares whether two reference variables refer
          to the same object.
        </p>
        <p>
          <code>equals()</code> compares String contents.
        </p>
        <p>
          For checking whether two Strings contain the same text, use
          <code> equals()</code>.
        </p>
      </>
    ),
    code: `String a = new String("Java");
String b = new String("Java");

System.out.println(a == b);      // false
System.out.println(a.equals(b)); // true`,
  },
  {
    title: "21. String pool",
    content: (
      <>
        <p>
          Java maintains a pool of String literals to reuse certain String
          objects.
        </p>
        <p>
          Identical string literals can refer to the same pooled object.
          But Strings created with <code>new String()</code> create a
          separate object.
        </p>
        <p>
          Do not rely on <code>==</code> for comparing String content,
          even when a particular example appears to work.
        </p>
      </>
    ),
    code: `String a = "Java";
String b = "Java";

System.out.println(a == b); // often true for literals

String c = new String("Java");

System.out.println(a == c);      // false
System.out.println(a.equals(c)); // true`,
  },
  {
    title: "22. StringBuilder",
    content: (
      <>
        <p>
          <code>StringBuilder</code> is a mutable sequence of characters.
          You can change its contents without creating a new String for
          every append operation.
        </p>
        <p>
          It is useful when building a String repeatedly, such as inside
          a loop.
        </p>
        <p>
          StringBuilder is not synchronized, so it is not designed for
          thread-safe shared mutation.
        </p>
      </>
    ),
    code: `StringBuilder sb = new StringBuilder();

sb.append("Java");
sb.append(" ");
sb.append("Programming");

System.out.println(sb.toString());

// Output:
// Java Programming`,
  },
  {
    title: "23. StringBuilder vs String",
    content: (
      <>
        <table>
          <thead>
            <tr><th>String</th><th>StringBuilder</th></tr>
          </thead>
          <tbody>
            <tr><td>Immutable</td><td>Mutable</td></tr>
            <tr><td>Modification creates a new String</td><td>Can modify existing builder</td></tr>
            <tr><td>Good for fixed text</td><td>Good for repeated building</td></tr>
            <tr><td>Content comparison with equals()</td><td>equals() is inherited from Object</td></tr>
          </tbody>
        </table>
        <p>
          If you need to compare StringBuilder contents, convert to String
          or compare character sequences explicitly.
        </p>
      </>
    ),
    code: `StringBuilder sb = new StringBuilder("Java");

sb.append(" DSA");

String result = sb.toString();

System.out.println(result);`,
  },
  {
    title: "24. Reversing a String",
    content: (
      <>
        <p>
          StringBuilder provides a convenient <code>reverse()</code> method.
        </p>
        <p>
          This is useful for beginner problems such as checking whether
          a String is a palindrome.
        </p>
      </>
    ),
    code: `String text = "level";

String reversed =
    new StringBuilder(text)
        .reverse()
        .toString();

System.out.println(reversed); // level

System.out.println(text.equals(reversed));
// true`,
  },
  {
    title: "25. Palindrome check",
    content: (
      <>
        <p>
          A palindrome reads the same forward and backward.
        </p>
        <p>
          Examples: <code>level</code>, <code>madam</code>, and
          <code> 121</code>.
        </p>
        <p>
          Decide whether the problem is case-sensitive and whether spaces
          or punctuation should be ignored.
        </p>
      </>
    ),
    code: `String text = "madam";

String reversed =
    new StringBuilder(text)
        .reverse()
        .toString();

if (text.equals(reversed)) {
    System.out.println("Palindrome");
} else {
    System.out.println("Not palindrome");
}`,
  },
  {
    title: "26. Common array and String mistakes",
    content: (
      <>
        <ul>
          <li>Using an index equal to array length.</li>
          <li>Assuming arrays grow automatically.</li>
          <li>Using array.length() instead of array.length.</li>
          <li>Using String.length instead of String.length().</li>
          <li>Comparing String content with ==.</li>
          <li>Ignoring the returned value of String methods.</li>
          <li>Assuming every row of a 2D array has equal length.</li>
          <li>Using repeated String concatenation in a large loop.</li>
          <li>Assuming an empty array has a first element.</li>
        </ul>
      </>
    ),
    code: `// Array length
arr.length

// String length
text.length()

// Compare String content
text.equals(other)

// Check array before accessing
if (arr.length > 0) {
    System.out.println(arr[0]);
}`,
  },
  {
    title: "27. Time complexity summary",
    content: (
      <>
        <table>
          <thead>
            <tr><th>Operation</th><th>Typical complexity</th></tr>
          </thead>
          <tbody>
            <tr><td>Access array element by index</td><td>O(1)</td></tr>
            <tr><td>Traverse array</td><td>O(n)</td></tr>
            <tr><td>Linear search</td><td>O(n)</td></tr>
            <tr><td>Binary search on sorted array</td><td>O(log n)</td></tr>
            <tr><td>Reverse array</td><td>O(n)</td></tr>
            <tr><td>Compare two Strings of length n</td><td>O(n) worst case</td></tr>
            <tr><td>Append to StringBuilder</td><td>Amortized O(1)</td></tr>
          </tbody>
        </table>
        <p>
          These are typical complexity estimates. Exact behavior can depend
          on the operation and implementation.
        </p>
      </>
    ),
    code: `// O(1)
int value = arr[3];

// O(n)
for (int x : arr) {
    System.out.println(x);
}

// O(log n) on sorted array
int index = Arrays.binarySearch(arr, target);`,
  },
  {
    title: "28. Practice problems",
    content: (
      <>
        <ol>
          <li>Print all elements of an array.</li>
          <li>Find the sum and average of an array.</li>
          <li>Find the maximum and minimum elements.</li>
          <li>Search for a target using linear search.</li>
          <li>Reverse an array in place.</li>
          <li>Count even and odd elements.</li>
          <li>Find the second largest distinct element.</li>
          <li>Sort an array using Arrays.sort().</li>
          <li>Search a sorted array using binary search.</li>
          <li>Find the sum of each row in a matrix.</li>
          <li>Count vowels in a String.</li>
          <li>Reverse a String without using reverse().</li>
          <li>Check whether a String is a palindrome.</li>
          <li>Count occurrences of a character.</li>
          <li>Remove spaces from a String.</li>
        </ol>
      </>
    ),
    code: `// Practice: count even numbers

int[] arr = {2, 5, 8, 11, 14};
int count = 0;

for (int value : arr) {
    if (value % 2 == 0) {
        count++;
    }
}

System.out.println(count);

// Output:
// 3`,
  },
  {
    title: "29. Interview questions",
    content: (
      <>
        <ol>
          <li>What is an array?</li>
          <li>Why do array indexes start at 0?</li>
          <li>What is the difference between array length and String length()?</li>
          <li>What are the default values of array elements?</li>
          <li>What is ArrayIndexOutOfBoundsException?</li>
          <li>What is the difference between array reference copy and array copy?</li>
          <li>What is linear search?</li>
          <li>What condition is required for binary search?</li>
          <li>What is a jagged array?</li>
          <li>What is String immutability?</li>
          <li>What is the difference between == and equals() for Strings?</li>
          <li>What is the String pool?</li>
          <li>Why use StringBuilder?</li>
          <li>What is the difference between String and StringBuilder?</li>
          <li>How do you reverse an array in O(1) extra space?</li>
          <li>How do you check a palindrome?</li>
        </ol>
      </>
    ),
    code: `// Remember:
// Array       -> fixed-size, same element type
// Index       -> starts at 0
// arr.length  -> array length property
// String      -> immutable
// equals()    -> compare String content
// StringBuilder -> mutable text builder`,
  },
];

export default function ArraysStringsLesson({ onBack }) {
  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <button
        onClick={onBack}
        style={{
          padding: "8px 14px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid var(--border, #d1d5db)",
          background: "transparent",
          cursor: "pointer",
          color: "inherit",
        }}
      >
        ← Back to Java
      </button>

      <h1 style={{ fontSize: "30px", fontWeight: "800", marginBottom: "8px" }}>
        Java Arrays and Strings
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn arrays, traversal, searching, sorting, matrices, String
        operations, immutability, and StringBuilder.
      </p>

      {lessons.map((lesson, index) => (
        <section key={index} style={sectionStyle}>
          <h2 style={headingStyle}>{lesson.title}</h2>

          <div style={{ lineHeight: "1.75", marginBottom: "14px" }}>
            {lesson.content}
          </div>

          <pre style={codeStyle}>
            <code>{lesson.code}</code>
          </pre>
        </section>
      ))}

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Final checklist</h2>
        <ul>
          <li>I can declare, create, and traverse arrays.</li>
          <li>I can calculate sum, average, maximum, and minimum.</li>
          <li>I understand linear search and binary search.</li>
          <li>I can reverse arrays and work with matrices.</li>
          <li>I understand String immutability and comparison.</li>
          <li>I can use common String methods and StringBuilder.</li>
          <li>I can solve the practice problems independently.</li>
        </ul>
      </section>
    </div>
  );
}
