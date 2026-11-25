

function DSAIntroductionLesson({ onBack }) {
  return (
    <div className="dsa-lesson">
      <button
        type="button"
        className="secondary-button"
        onClick={onBack}
      >
        ← Back to DSA
      </button>

      <h1>DSA Introduction</h1>
      <p>
        Data Structures and Algorithms help us store data
        efficiently and solve problems step by step.
      </p>

      <section>
        <h2>1. What is Data?</h2>
        <p>
          Data means information. Examples include student
          names, marks, ages, and phone numbers.
        </p>
      </section>

      <section>
        <h2>2. What is a Data Structure?</h2>
        <p>
          A data structure is a way of organizing and storing
          data so that we can use it efficiently.
        </p>

        <ul>
          <li>Array - stores elements in indexed positions.</li>
          <li>Linked List - stores elements using links.</li>
          <li>Stack - follows Last In, First Out (LIFO).</li>
          <li>Queue - follows First In, First Out (FIFO).</li>
          <li>Tree - stores data in hierarchical form.</li>
          <li>Graph - represents connections between objects.</li>
          <li>Hash Table - stores key-value pairs.</li>
        </ul>
      </section>

      <section>
        <h2>3. What is an Algorithm?</h2>
        <p>
          An algorithm is a finite sequence of clear steps
          used to solve a problem.
        </p>

        <h3>Example: Find the largest number</h3>

        <pre className="dsa-code">
{`1. Assume the first number is largest.
2. Check every remaining number.
3. If a number is larger, update largest.
4. Return largest.`}
        </pre>
      </section>

      <section>
        <h2>4. Java Example</h2>

        <pre className="dsa-code">
{`public class Main {
    public static int findLargest(int[] arr) {
        int largest = arr[0];

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > largest) {
                largest = arr[i];
            }
        }

        return largest;
    }

    public static void main(String[] args) {
        int[] numbers = {10, 25, 7, 40, 15};

        System.out.println(findLargest(numbers));
    }
}`}
        </pre>

        <p><strong>Output:</strong> 40</p>
      </section>

      <section>
        <h2>5. Types of Data Structures</h2>

        <h3>Linear Data Structures</h3>
        <p>
          Elements are arranged sequentially.
        </p>
        <p>Examples: Array, Linked List, Stack, Queue.</p>

        <h3>Non-linear Data Structures</h3>
        <p>
          Elements are arranged in hierarchical or
          interconnected relationships.
        </p>
        <p>Examples: Tree, Graph.</p>
      </section>

      <section>
        <h2>6. Characteristics of a Good Algorithm</h2>
        <ul>
          <li>Correctness - produces the expected result.</li>
          <li>Finiteness - terminates after finite steps.</li>
          <li>Clarity - every step is unambiguous.</li>
          <li>Efficiency - uses reasonable time and memory.</li>
          <li>Generality - works for valid inputs in the problem.</li>
        </ul>
      </section>

      <section>
        <h2>7. Problem-Solving Workflow</h2>
        <ol>
          <li>Understand the problem.</li>
          <li>Identify input and expected output.</li>
          <li>Check constraints and edge cases.</li>
          <li>Think of a simple solution first.</li>
          <li>Choose suitable data structures.</li>
          <li>Write the algorithm.</li>
          <li>Analyze time and space complexity.</li>
          <li>Implement and test the solution.</li>
          <li>Optimize if necessary.</li>
        </ol>
      </section>

      <section>
        <h2>8. Important Interview Questions</h2>
        <ol>
          <li>What is a data structure?</li>
          <li>What is an algorithm?</li>
          <li>Difference between linear and non-linear data structures?</li>
          <li>Why do we analyze algorithms?</li>
          <li>What is the difference between time and space complexity?</li>
          <li>Why is choosing the right data structure important?</li>
        </ol>
      </section>
    </div>
  );
}

export default DSAIntroductionLesson;
