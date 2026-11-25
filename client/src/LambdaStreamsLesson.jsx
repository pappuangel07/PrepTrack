

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
    title: "1. What is functional programming?",
    content: (
      <>
        <p>
          Functional programming focuses on using functions to transform
          data and describe computations.
        </p>
        <p>
          Java supports functional programming features through lambda
          expressions, functional interfaces, and the Stream API.
        </p>
        <ul>
          <li>Lambda: a concise way to provide behavior.</li>
          <li>Functional interface: an interface with one abstract method.</li>
          <li>Stream: a sequence of elements processed through operations.</li>
        </ul>
      </>
    ),
    code: `// Traditional approach:
for (int n : numbers) {
    if (n % 2 == 0) {
        System.out.println(n);
    }
}

// Stream approach:
numbers.stream()
    .filter(n -> n % 2 == 0)
    .forEach(System.out::println);`,
  },
  {
    title: "2. What is a lambda expression?",
    content: (
      <>
        <p>
          A lambda expression provides an implementation of a
          functional interface.
        </p>
        <p>
          It can make code shorter by avoiding anonymous class
          boilerplate.
        </p>
      </>
    ),
    code: `// Lambda syntax:
(parameters) -> expression

// Example:
Runnable task = () -> System.out.println("Hello");

task.run();

// Lambda with one parameter:
n -> n * n`,
  },
  {
    title: "3. Lambda syntax variations",
    content: (
      <>
        <p>
          Lambda expressions can contain one expression or a block
          of statements.
        </p>
        <ul>
          <li>No parameters: use empty parentheses.</li>
          <li>One parameter: parentheses may be omitted.</li>
          <li>Multiple parameters: use parentheses.</li>
          <li>Block body: use braces and return when needed.</li>
        </ul>
      </>
    ),
    code: `// No parameters
() -> System.out.println("Hi");

// One parameter
x -> x * 2;

// Multiple parameters
(a, b) -> a + b;

// Block body
(a, b) -> {
    int result = a + b;
    return result;
}`,
  },
  {
    title: "4. Functional interface",
    content: (
      <>
        <p>
          A functional interface has exactly one abstract method.
          It may still contain default, static, and private methods.
        </p>
        <p>
          The @FunctionalInterface annotation is optional, but
          it helps the compiler verify the interface.
        </p>
      </>
    ),
    code: `@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

Calculator add = (a, b) -> a + b;

System.out.println(add.calculate(10, 20));`,
  },
  {
    title: "5. Built-in functional interfaces",
    content: (
      <>
        <p>
          Java provides commonly used functional interfaces in
          java.util.function.
        </p>
        <ul>
          <li>Predicate: accepts a value and returns boolean.</li>
          <li>Function: accepts a value and returns a result.</li>
          <li>Consumer: accepts a value and returns nothing.</li>
          <li>Supplier: provides a value without an input.</li>
          <li>BiFunction: accepts two values and returns a result.</li>
        </ul>
      </>
    ),
    code: `import java.util.function.*;

Predicate<Integer> isEven =
    n -> n % 2 == 0;

Function<Integer, Integer> square =
    n -> n * n;

Consumer<String> print =
    text -> System.out.println(text);

Supplier<Double> random =
    () -> Math.random();

BiFunction<Integer, Integer, Integer> add =
    (a, b) -> a + b;`,
  },
  {
    title: "6. Predicate",
    content: (
      <>
        <p>
          Predicate represents a condition that returns true or false.
        </p>
        <p>
          It is commonly used for filtering data.
        </p>
        <p>
          Predicate supports combining conditions using and(), or(),
          and negate().
        </p>
      </>
    ),
    code: `import java.util.function.Predicate;

Predicate<Integer> positive =
    n -> n > 0;

Predicate<Integer> even =
    n -> n % 2 == 0;

Predicate<Integer> positiveEven =
    positive.and(even);

System.out.println(positiveEven.test(8));
System.out.println(positiveEven.test(-4));`,
  },
  {
    title: "7. Function",
    content: (
      <>
        <p>
          Function represents a transformation from one type
          to another.
        </p>
        <p>
          apply() executes the transformation.
          andThen() and compose() combine functions.
        </p>
      </>
    ),
    code: `import java.util.function.Function;

Function<String, Integer> length =
    text -> text.length();

Function<Integer, Integer> doubleValue =
    n -> n * 2;

Function<String, Integer> result =
    length.andThen(doubleValue);

System.out.println(result.apply("Java"));`,
  },
  {
    title: "8. Consumer and Supplier",
    content: (
      <>
        <p>
          Consumer accepts a value and performs an action.
          Supplier provides a value without accepting an input.
        </p>
        <p>
          Consumer is useful for printing or processing values.
          Supplier is useful for generating or retrieving values.
        </p>
      </>
    ),
    code: `import java.util.function.*;

Consumer<String> display =
    text -> System.out.println(text);

display.accept("Hello Java");

Supplier<String> message =
    () -> "Welcome";

System.out.println(message.get());`,
  },
  {
    title: "9. Method references",
    content: (
      <>
        <p>
          A method reference is a shorter way to refer to an
          existing method when its signature matches the target
          functional interface.
        </p>
        <p>
          The :: operator is used for method references.
        </p>
      </>
    ),
    code: `// Lambda:
Consumer<String> c1 =
    text -> System.out.println(text);

// Method reference:
Consumer<String> c2 =
    System.out::println;

// Static method reference:
Function<String, Integer> f =
    Integer::parseInt;`,
  },
  {
    title: "10. Types of method references",
    content: (
      <>
        <ul>
          <li>Static method reference.</li>
          <li>Instance method of a particular object.</li>
          <li>Instance method of an arbitrary object of a type.</li>
          <li>Constructor reference.</li>
        </ul>
      </>
    ),
    code: `// Static method
Function<String, Integer> f1 =
    Integer::parseInt;

// Particular object
Consumer<String> f2 =
    System.out::println;

// Arbitrary object of a type
Function<String, String> f3 =
    String::toUpperCase;

// Constructor
Supplier<ArrayList<String>> f4 =
    ArrayList::new;`,
  },
  {
    title: "11. What is the Stream API?",
    content: (
      <>
        <p>
          A Stream represents a sequence of elements that can be
          processed through operations.
        </p>
        <p>
          A stream does not store data itself. It processes data
          from a source such as a collection, array, or generated values.
        </p>
        <p>
          Streams are not the same as InputStream or OutputStream
          used in file and network I/O.
        </p>
      </>
    ),
    code: `import java.util.Arrays;
import java.util.List;

List<Integer> numbers =
    Arrays.asList(1, 2, 3, 4, 5);

numbers.stream()
    .forEach(System.out::println);`,
  },
  {
    title: "12. Stream pipeline",
    content: (
      <>
        <p>
          A stream pipeline usually contains:
        </p>
        <ul>
          <li>Source: where elements come from.</li>
          <li>Intermediate operations: transform the stream.</li>
          <li>Terminal operation: produces a result or side effect.</li>
        </ul>
        <p>
          Intermediate operations are lazy. They run when a terminal
          operation starts processing the pipeline.
        </p>
      </>
    ),
    code: `List<Integer> numbers =
    List.of(1, 2, 3, 4, 5);

long count = numbers.stream()
    .filter(n -> n % 2 == 0)
    .count();

// filter runs as part of count()
// No terminal operation means
// the pipeline is not executed.`,
  },
  {
    title: "13. filter()",
    content: (
      <>
        <p>
          filter() keeps elements that satisfy a condition.
        </p>
        <p>
          The condition is represented by a Predicate.
        </p>
      </>
    ),
    code: `List<Integer> numbers =
    List.of(10, 15, 20, 25, 30);

List<Integer> result = numbers.stream()
    .filter(n -> n >= 20)
    .toList();

System.out.println(result);

// Output:
// [20, 25, 30]`,
  },
  {
    title: "14. map()",
    content: (
      <>
        <p>
          map() transforms each element into another value.
        </p>
        <p>
          The number of output elements is generally the same
          as the number of input elements.
        </p>
      </>
    ),
    code: `List<String> names =
    List.of("java", "python", "c++");

List<String> upper = names.stream()
    .map(String::toUpperCase)
    .toList();

System.out.println(upper);`,
  },
  {
    title: "15. flatMap()",
    content: (
      <>
        <p>
          flatMap() transforms each element into a stream and
          combines the resulting streams into one stream.
        </p>
        <p>
          It is useful when each input element contains multiple
          values, such as a list of lists.
        </p>
      </>
    ),
    code: `List<List<Integer>> nested =
    List.of(
        List.of(1, 2),
        List.of(3, 4),
        List.of(5, 6)
    );

List<Integer> flat = nested.stream()
    .flatMap(List::stream)
    .toList();

System.out.println(flat);

// [1, 2, 3, 4, 5, 6]`,
  },
  {
    title: "16. distinct() and sorted()",
    content: (
      <>
        <p>
          distinct() removes duplicate elements according to
          equals() and hashCode().
        </p>
        <p>
          sorted() sorts elements using natural order or a
          supplied Comparator.
        </p>
      </>
    ),
    code: `List<Integer> numbers =
    List.of(5, 2, 5, 1, 3, 2);

List<Integer> result = numbers.stream()
    .distinct()
    .sorted()
    .toList();

System.out.println(result);

// [1, 2, 3, 5]`,
  },
  {
    title: "17. limit() and skip()",
    content: (
      <>
        <p>
          limit(n) keeps at most the first n elements.
        </p>
        <p>
          skip(n) discards the first n elements.
        </p>
        <p>
          These operations are useful for simple pagination
          and selecting portions of a stream.
        </p>
      </>
    ),
    code: `List<Integer> numbers =
    List.of(10, 20, 30, 40, 50);

List<Integer> result = numbers.stream()
    .skip(2)
    .limit(2)
    .toList();

System.out.println(result);

// [30, 40]`,
  },
  {
    title: "18. forEach()",
    content: (
      <>
        <p>
          forEach() is a terminal operation that performs an
          action for each element.
        </p>
        <p>
          Avoid relying on side effects inside stream pipelines
          when a direct transformation or collection operation
          would be clearer.
        </p>
        <p>
          Parallel stream forEach() does not guarantee encounter
          order. Use forEachOrdered() when order matters.
        </p>
      </>
    ),
    code: `List<String> names =
    List.of("A", "B", "C");

names.stream()
    .forEach(System.out::println);

// Ordered stream:
names.parallelStream()
    .forEachOrdered(System.out::println);`,
  },
  {
    title: "19. reduce()",
    content: (
      <>
        <p>
          reduce() combines stream elements into a single result.
        </p>
        <p>
          It is commonly used for sum, product, maximum,
          or other associative operations.
        </p>
        <p>
          For numeric sums, mapToInt().sum() is often clearer.
        </p>
      </>
    ),
    code: `List<Integer> numbers =
    List.of(1, 2, 3, 4, 5);

int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b);

System.out.println(sum);

// 15

// Better for simple integer sum:
int total = numbers.stream()
    .mapToInt(Integer::intValue)
    .sum();`,
  },
  {
    title: "20. min(), max(), and count()",
    content: (
      <>
        <p>
          These are terminal operations that return a summary
          of the stream.
        </p>
        <ul>
          <li>count(): number of elements.</li>
          <li>min(): smallest element.</li>
          <li>max(): largest element.</li>
        </ul>
        <p>
          min() and max() return Optional because the stream
          might be empty.
        </p>
      </>
    ),
    code: `List<Integer> numbers =
    List.of(8, 2, 10, 4);

long count = numbers.stream().count();

int min = numbers.stream()
    .min(Integer::compareTo)
    .orElse(0);

int max = numbers.stream()
    .max(Integer::compareTo)
    .orElse(0);`,
  },
  {
    title: "21. collect() and Collectors",
    content: (
      <>
        <p>
          collect() is a terminal operation used to accumulate
          stream elements into a result.
        </p>
        <p>
          Collectors provides common collectors for lists,
          sets, maps, grouping, and summarizing.
        </p>
      </>
    ),
    code: `import java.util.stream.Collectors;

List<String> names =
    List.of("Ravi", "Priya", "Arun");

List<String> result = names.stream()
    .filter(name -> name.length() > 3)
    .collect(Collectors.toList());

System.out.println(result);`,
  },
  {
    title: "22. toList() vs Collectors.toList()",
    content: (
      <>
        <p>
          Stream.toList() was added in Java 16.
          It returns an unmodifiable list.
        </p>
        <p>
          Collectors.toList() does not guarantee a specific
          list implementation or mutability.
        </p>
        <p>
          If you need a mutable ArrayList, collect explicitly
          into one.
        </p>
      </>
    ),
    code: `// Java 16+
List<Integer> a =
    numbers.stream().toList();

// Mutable ArrayList:
List<Integer> b =
    numbers.stream()
        .collect(Collectors.toCollection(
            ArrayList::new
        ));`,
  },
  {
    title: "23. groupingBy()",
    content: (
      <>
        <p>
          groupingBy() groups elements according to a classifier.
        </p>
        <p>
          The result is commonly a Map where each key represents
          a group and each value contains the group's elements.
        </p>
      </>
    ),
    code: `import java.util.stream.Collectors;

List<String> names =
    List.of("Arun", "Anu", "Bala", "Abi");

Map<Integer, List<String>> grouped =
    names.stream()
        .collect(Collectors.groupingBy(
            String::length
        ));

System.out.println(grouped);`,
  },
  {
    title: "24. partitioningBy()",
    content: (
      <>
        <p>
          partitioningBy() divides elements into two groups
          based on a Predicate.
        </p>
        <p>
          The result is a Map with Boolean keys: true and false.
        </p>
      </>
    ),
    code: `List<Integer> numbers =
    List.of(1, 2, 3, 4, 5, 6);

Map<Boolean, List<Integer>> partition =
    numbers.stream()
        .collect(Collectors.partitioningBy(
            n -> n % 2 == 0
        ));

System.out.println(partition.get(true));
System.out.println(partition.get(false));`,
  },
  {
    title: "25. joining()",
    content: (
      <>
        <p>
          Collectors.joining() combines strings into one string.
        </p>
        <p>
          You can provide a delimiter, prefix, and suffix.
        </p>
      </>
    ),
    code: `List<String> names =
    List.of("Java", "Python", "C++");

String result = names.stream()
    .collect(Collectors.joining(", "));

System.out.println(result);

// Java, Python, C++`,
  },
  {
    title: "26. Optional",
    content: (
      <>
        <p>
          Optional represents a value that may or may not be present.
        </p>
        <p>
          It is commonly returned by operations such as findFirst(),
          findAny(), min(), and max().
        </p>
        <ul>
          <li>isPresent(): checks whether a value exists.</li>
          <li>orElse(): provides a fallback value.</li>
          <li>orElseGet(): provides a fallback using a Supplier.</li>
          <li>orElseThrow(): throws if no value exists.</li>
        </ul>
      </>
    ),
    code: `Optional<String> result =
    names.stream()
        .filter(name -> name.startsWith("J"))
        .findFirst();

String value =
    result.orElse("Not found");

System.out.println(value);`,
  },
  {
    title: "27. Primitive streams",
    content: (
      <>
        <p>
          IntStream, LongStream, and DoubleStream are specialized
          streams for primitive numeric values.
        </p>
        <p>
          They avoid much of the boxing and unboxing overhead
          associated with {"Stream<Integer>"} and similar types.
        </p>
        <p>
          They provide methods such as sum(), average(),
          min(), and max().
        </p>
      </>
    ),
    code: `import java.util.stream.IntStream;

int sum = IntStream.range(1, 6)
    .sum();

// 15

IntStream.rangeClosed(1, 5)
    .forEach(System.out::println);

// range(1, 6) -> 1 to 5
// rangeClosed(1, 5) -> 1 to 5`,
  },
  {
    title: "28. Stream from arrays and collections",
    content: (
      <>
        <p>
          Streams can be created from collections, arrays,
          individual values, or generated sequences.
        </p>
      </>
    ),
    code: `import java.util.*;
import java.util.stream.*;

List<Integer> list =
    List.of(1, 2, 3);

Stream<Integer> s1 = list.stream();

int[] array = {1, 2, 3};

IntStream s2 = Arrays.stream(array);

Stream<String> s3 =
    Stream.of("A", "B", "C");

Stream<Integer> s4 =
    Stream.iterate(1, n -> n + 1)
        .limit(5);`,
  },
  {
    title: "29. Infinite streams",
    content: (
      <>
        <p>
          Stream.generate() and Stream.iterate() can create
          potentially infinite streams.
        </p>
        <p>
          Use a limiting operation or another terminating
          condition before collecting an infinite stream.
        </p>
      </>
    ),
    code: `Stream<Double> randomValues =
    Stream.generate(Math::random)
        .limit(5);

randomValues.forEach(System.out::println);

Stream<Integer> numbers =
    Stream.iterate(1, n -> n + 1)
        .limit(10);`,
  },
  {
    title: "30. Stream is single-use",
    content: (
      <>
        <p>
          A stream should be consumed only once.
        </p>
        <p>
          After a terminal operation, the stream is no longer
          available for another operation.
        </p>
        <p>
          Create a new stream from the original source when
          you need another pipeline.
        </p>
      </>
    ),
    code: `Stream<Integer> stream =
    numbers.stream();

long count = stream.count();

// Invalid:
// stream.forEach(System.out::println);

// Create another stream:
numbers.stream()
    .forEach(System.out::println);`,
  },
  {
    title: "31. Parallel streams",
    content: (
      <>
        <p>
          parallelStream() allows stream processing to use
          multiple threads, commonly through the ForkJoinPool
          common pool.
        </p>
        <p>
          Parallel streams may help with large, CPU-intensive,
          independent tasks.
        </p>
        <p>
          They may be slower for small tasks, blocking I/O,
          or operations with heavy shared-state contention.
        </p>
      </>
    ),
    code: `List<Integer> numbers =
    IntStream.rangeClosed(1, 1000000)
        .boxed()
        .toList();

long sum = numbers.parallelStream()
    .mapToLong(Integer::longValue)
    .sum();

System.out.println(sum);`,
  },
  {
    title: "32. Stream performance and best practices",
    content: (
      <>
        <ul>
          <li>Use streams when they improve clarity.</li>
          <li>Use loops when they are simpler or more efficient.</li>
          <li>Avoid modifying shared state inside stream operations.</li>
          <li>Prefer primitive streams for numeric processing.</li>
          <li>Do not create unnecessary intermediate collections.</li>
          <li>Remember intermediate operations are lazy.</li>
          <li>Do not reuse a consumed stream.</li>
          <li>Benchmark before assuming parallel streams are faster.</li>
        </ul>
      </>
    ),
    code: `// Clear stream pipeline:
int sum = numbers.stream()
    .filter(n -> n % 2 == 0)
    .mapToInt(Integer::intValue)
    .sum();

// Prefer this over manually
// updating a shared counter
// inside a parallel stream.`,
  },
  {
    title: "33. Practice problems",
    content: (
      <>
        <ol>
          <li>Filter all even numbers from a list.</li>
          <li>Square every number using map().</li>
          <li>Find the sum using reduce().</li>
          <li>Find the maximum and minimum values.</li>
          <li>Remove duplicates and sort a list.</li>
          <li>Convert a list of names to uppercase.</li>
          <li>Flatten a list of lists using flatMap().</li>
          <li>Group strings by their length.</li>
          <li>Partition numbers into even and odd groups.</li>
          <li>Count words that start with a given letter.</li>
          <li>Find the first matching element using Optional.</li>
          <li>Calculate average using IntStream.</li>
        </ol>
      </>
    ),
    code: `// Practice: sum of squares

int result = numbers.stream()
    .mapToInt(n -> n * n)
    .sum();

// Practice: count even numbers

long count = numbers.stream()
    .filter(n -> n % 2 == 0)
    .count();`,
  },
  {
    title: "34. Interview questions",
    content: (
      <>
        <ol>
          <li>What is a lambda expression?</li>
          <li>What is a functional interface?</li>
          <li>What is the purpose of @FunctionalInterface?</li>
          <li>Predicate vs Function?</li>
          <li>Consumer vs Supplier?</li>
          <li>What is a method reference?</li>
          <li>What is the Stream API?</li>
          <li>What are intermediate and terminal operations?</li>
          <li>Why are intermediate operations lazy?</li>
          <li>filter() vs map()?</li>
          <li>map() vs flatMap()?</li>
          <li>reduce() vs collect()?</li>
          <li>What is Optional?</li>
          <li>What is groupingBy()?</li>
          <li>What is partitioningBy()?</li>
          <li>Stream.toList() vs Collectors.toList()?</li>
          <li>What are primitive streams?</li>
          <li>What is a parallel stream?</li>
          <li>Can a stream be reused?</li>
          <li>When should parallel streams be avoided?</li>
        </ol>
      </>
    ),
    code: `// Quick revision:
Lambda -> concise behavior
Functional interface -> one abstract method
Predicate -> condition
Function -> transformation
Consumer -> action
Supplier -> value provider
Stream -> data processing pipeline
filter -> select elements
map -> transform elements
flatMap -> flatten nested streams
reduce -> combine into one result
collect -> accumulate into a container`,
  },
];

export default function LambdaStreamsLesson({ onBack }) {
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
        Java Lambda Expressions & Streams
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn functional interfaces, lambda expressions, method references,
        stream operations, collectors, Optional, and parallel processing.
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
          <li>I understand lambda expressions and functional interfaces.</li>
          <li>I can use Predicate, Function, Consumer, and Supplier.</li>
          <li>I understand method references.</li>
          <li>I can create and process stream pipelines.</li>
          <li>I can use filter, map, flatMap, and reduce.</li>
          <li>I can collect, group, and partition stream results.</li>
          <li>I understand Optional and primitive streams.</li>
          <li>I know streams are lazy and single-use.</li>
          <li>I understand when parallel streams are appropriate.</li>
          <li>I can solve the practice problems independently.</li>
        </ul>
      </section>
    </div>
  );
}
