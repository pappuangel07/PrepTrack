
function BitManipulationLesson({ onBack }) {
  return (
    <div className="dsa-lesson">
      <button
        type="button"
        className="secondary-button"
        onClick={onBack}
      >
        ← Back to DSA
      </button>

      <h1>Bit Manipulation</h1>

      <p>
        Bit manipulation means working directly with the binary
        bits of numbers. It is useful for masks, flags, subsets,
        optimization, and many coding interview problems.
      </p>

      <section>
        <h2>1. Binary Number System</h2>

        <p>
          Computers represent integer values using bits.
          A bit can be either 0 or 1.
        </p>

        <p>
          Decimal 13 = Binary 1101
        </p>

        <pre className="dsa-code">
{`Binary:  1  1  0  1
Weight:  8  4  2  1

8 + 4 + 0 + 1 = 13`}
        </pre>

        <p>
          Bit positions are counted from the right, starting
          at position 0.
        </p>
      </section>

      <section>
        <h2>2. Bitwise Operators in Java</h2>

        <h3>AND (&amp;)</h3>

        <pre className="dsa-code">
{`5 & 3

  0101
& 0011
------
  0001

Result: 1`}
        </pre>

        <p>
          AND gives 1 only when both bits are 1.
        </p>

        <h3>OR (|)</h3>

        <pre className="dsa-code">
{`5 | 3

  0101
| 0011
------
  0111

Result: 7`}
        </pre>

        <p>
          OR gives 1 when at least one bit is 1.
        </p>

        <h3>XOR (^)</h3>

        <pre className="dsa-code">
{`5 ^ 3

  0101
^ 0011
------
  0110

Result: 6`}
        </pre>

        <p>
          XOR gives 1 when the two bits are different.
        </p>

        <h3>NOT (~)</h3>

        <p>
          NOT flips every bit. Java int uses 32 bits and
          signed two's-complement representation.
        </p>

        <pre className="dsa-code">
{`~5 = -6`}
        </pre>

        <p>
          Formula: ~x = -x - 1
        </p>
      </section>

      <section>
        <h2>3. Shift Operators</h2>

        <h3>Left Shift (&lt;&lt;)</h3>

        <pre className="dsa-code">
{`5 << 1

0101 becomes 1010

Result: 10`}
        </pre>

        <p>
          For ordinary positive values without overflow,
          shifting left by 1 is equivalent to multiplying by 2.
        </p>

        <h3>Signed Right Shift (&gt;&gt;)</h3>

        <p>
          Shifts bits right and preserves the sign bit.
        </p>

        <pre className="dsa-code">
{`8 >> 1 = 4
-8 >> 1 = -4`}
        </pre>

        <h3>Unsigned Right Shift (&gt;&gt;&gt;)</h3>

        <p>
          Shifts right and fills the left side with zeros.
        </p>

        <pre className="dsa-code">
{`-8 >>> 1`}
        </pre>

        <p>
          The result is a large positive int because the
          sign bit is filled with zero.
        </p>
      </section>

      <section>
        <h2>4. Check the ith Bit</h2>

        <p>
          To check whether bit i is set:
        </p>

        <pre className="dsa-code">
{`(n & (1 << i)) != 0`}
        </pre>

        <h3>Java Example</h3>

        <pre className="dsa-code">
{`boolean isBitSet(int n, int i) {
    return (n & (1 << i)) != 0;
}`}
        </pre>

        <p>
          Example: n = 10, binary 1010
        </p>

        <ul>
          <li>Bit 0 = 0</li>
          <li>Bit 1 = 1</li>
          <li>Bit 2 = 0</li>
          <li>Bit 3 = 1</li>
        </ul>
      </section>

      <section>
        <h2>5. Set the ith Bit</h2>

        <p>
          Set means make the bit 1.
        </p>

        <pre className="dsa-code">
{`n = n | (1 << i);`}
        </pre>

        <h3>Java Example</h3>

        <pre className="dsa-code">
{`int setBit(int n, int i) {
    return n | (1 << i);
}`}
        </pre>
      </section>

      <section>
        <h2>6. Clear the ith Bit</h2>

        <p>
          Clear means make the bit 0.
        </p>

        <pre className="dsa-code">
{`n = n & ~(1 << i);`}
        </pre>

        <h3>Java Example</h3>

        <pre className="dsa-code">
{`int clearBit(int n, int i) {
    return n & ~(1 << i);
}`}
        </pre>
      </section>

      <section>
        <h2>7. Toggle the ith Bit</h2>

        <p>
          Toggle changes 0 to 1 and 1 to 0.
        </p>

        <pre className="dsa-code">
{`n = n ^ (1 << i);`}
        </pre>

        <h3>Java Example</h3>

        <pre className="dsa-code">
{`int toggleBit(int n, int i) {
    return n ^ (1 << i);
}`}
        </pre>
      </section>

      <section>
        <h2>8. Remove the Rightmost Set Bit</h2>

        <p>
          n &amp; (n - 1) removes the rightmost 1 bit.
        </p>

        <pre className="dsa-code">
{`n = 12

Binary: 1100

n - 1 = 1011

  1100
& 1011
------
  1000

Result: 8`}
        </pre>

        <h3>Java Example</h3>

        <pre className="dsa-code">
{`int removeRightmostSetBit(int n) {
    return n & (n - 1);
}`}
        </pre>
      </section>

      <section>
        <h2>9. Is the Number a Power of Two?</h2>

        <p>
          A positive power of two contains exactly one set bit.
        </p>

        <pre className="dsa-code">
{`boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}`}
        </pre>

        <p>
          Examples:
        </p>

        <ul>
          <li>1 = 0001 - true</li>
          <li>2 = 0010 - true</li>
          <li>8 = 1000 - true</li>
          <li>10 = 1010 - false</li>
          <li>0 - false</li>
        </ul>
      </section>

      <section>
        <h2>10. Count Set Bits</h2>

        <p>
          A set bit is a bit whose value is 1.
        </p>

        <h3>Method 1: Check Every Bit</h3>

        <pre className="dsa-code">
{`int countBits(int n) {
    int count = 0;

    for (int i = 0; i < 32; i++) {
        if ((n & (1 << i)) != 0) {
            count++;
        }
    }

    return count;
}`}
        </pre>

        <p>
          Time: O(1) for a fixed 32-bit int.
        </p>

        <h3>Method 2: Brian Kernighan's Algorithm</h3>

        <pre className="dsa-code">
{`int countBits(int n) {
    int count = 0;

    while (n != 0) {
        n = n & (n - 1);
        count++;
    }

    return count;
}`}
        </pre>

        <p>
          Each iteration removes one set bit.
        If there are k set bits, time is O(k).
        </p>

        <p>
          Java also provides:
        </p>

        <pre className="dsa-code">
{`Integer.bitCount(n)`}
        </pre>
      </section>

      <section>
        <h2>11. Find the Unique Number Using XOR</h2>

        <p>
          In an array where every number appears twice except
          one number, XOR finds the unique number.
        </p>

        <h3>XOR Properties</h3>

        <ul>
          <li>a ^ a = 0</li>
          <li>a ^ 0 = a</li>
          <li>XOR is commutative</li>
          <li>XOR is associative</li>
        </ul>

        <pre className="dsa-code">
{`int singleNumber(int[] arr) {
    int result = 0;

    for (int value : arr) {
        result ^= value;
    }

    return result;
}`}
        </pre>

        <p>
          Example: [4, 1, 2, 1, 2]
        </p>

        <p>
          4 ^ 1 ^ 2 ^ 1 ^ 2 = 4
        </p>

        <p><strong>Time:</strong> O(n)</p>
        <p><strong>Auxiliary space:</strong> O(1)</p>
      </section>

      <section>
        <h2>12. Get the Rightmost Set Bit</h2>

        <p>
          n &amp; -n isolates the rightmost set bit for
          two's-complement integers.
        </p>

        <pre className="dsa-code">
{`int rightmostSetBit(int n) {
    return n & -n;
}`}
        </pre>

        <p>
          Example: n = 12 (1100)
        </p>

        <p>
          Result = 4 (0100)
        </p>

        <p>
          For n = 0, the result is 0.
        </p>
      </section>

      <section>
        <h2>13. Java Bit Manipulation Example</h2>

        <pre className="dsa-code">
{`public class Main {
    public static void main(String[] args) {
        int n = 10;

        System.out.println(n & 1);
        System.out.println(n | 1);
        System.out.println(n ^ 1);
        System.out.println(n << 1);
        System.out.println(n >> 1);
        System.out.println(Integer.bitCount(n));
    }
}`}
        </pre>

        <h3>Output</h3>

        <pre className="dsa-code">
{`0
11
11
20
5
2`}
        </pre>
      </section>

      <section>
        <h2>14. Important Java Pitfalls</h2>

        <ul>
          <li>
            Java int has 32 bits; long has 64 bits.
          </li>
          <li>
            Bit positions for int are 0 to 31.
          </li>
          <li>
            Use 1L when creating masks for long values.
          </li>
          <li>
            Java masks shift distances: int uses the
            lowest 5 bits; long uses the lowest 6 bits.
          </li>
          <li>
            Left shift can overflow and discard high bits.
          </li>
          <li>
            Negative numbers use two's-complement representation.
          </li>
          <li>
            Validate bit positions when they come from user input.
          </li>
        </ul>

        <h3>For long</h3>

        <pre className="dsa-code">
{`long mask = 1L << i;`}
        </pre>
      </section>

      <section>
        <h2>15. Common Interview Patterns</h2>

        <ul>
          <li>Check/set/clear/toggle a bit</li>
          <li>Count set bits</li>
          <li>Check power of two</li>
          <li>Find a unique element using XOR</li>
          <li>Find two unique elements using XOR</li>
          <li>Generate all subsets using bit masks</li>
          <li>Use bit masks for state compression</li>
          <li>Use bit operations for flags and permissions</li>
        </ul>
      </section>

      <section>
        <h2>16. Interview Questions</h2>

        <ol>
          <li>What is a bitwise operator?</li>
          <li>Difference between AND and logical AND?</li>
          <li>Why does n &amp; (n - 1) remove the rightmost set bit?</li>
          <li>How can XOR find a unique number?</li>
          <li>How do you check whether a number is a power of two?</li>
          <li>Difference between &gt;&gt; and &gt;&gt;&gt; in Java?</li>
          <li>What is two's-complement representation?</li>
          <li>How do you count set bits efficiently?</li>
          <li>How can bit masks represent subsets?</li>
          <li>What happens when a Java int is shifted by 32?</li>
        </ol>
      </section>
    </div>
  );
}

export default BitManipulationLesson;
