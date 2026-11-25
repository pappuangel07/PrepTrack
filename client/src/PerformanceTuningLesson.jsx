

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
    title: "1. What Is Performance Tuning?",
    content: (
      <>
        <p>
          Performance tuning means improving an application's speed,
          responsiveness, resource usage, or ability to handle load.
        </p>
        <p>Common goals:</p>
        <ul>
          <li>Reduce execution time.</li>
          <li>Reduce memory consumption.</li>
          <li>Improve throughput.</li>
          <li>Reduce latency.</li>
          <li>Reduce unnecessary CPU and I/O usage.</li>
        </ul>
        <p>
          Don't optimize randomly. Measure first, identify the bottleneck,
          make a change, and measure again.
        </p>
      </>
    ),
    code: `Performance tuning process:

1. Define the performance goal
2. Measure the current behavior
3. Find the bottleneck
4. Make one meaningful change
5. Measure again
6. Keep the change only if it helps`,
  },
  {
    title: "2. Latency vs Throughput",
    content: (
      <>
        <p>
          <strong>Latency</strong> is the time taken for one operation or
          request to complete.
        </p>
        <p>
          <strong>Throughput</strong> is the amount of work completed per
          unit of time.
        </p>
        <p>
          An application can have high throughput but still have poor
          latency for some users.
        </p>
      </>
    ),
    code: `Latency:
Request -> Response
Time taken = 200 ms

Throughput:
1000 requests completed
per second

// Measure both when evaluating
// a server or application.`,
  },
  {
    title: "3. Big-O and Performance",
    content: (
      <>
        <p>
          Big-O describes how an algorithm's resource usage grows as input
          size increases.
        </p>
        <p>
          It does not directly predict real execution time because hardware,
          memory layout, JVM optimizations, and input characteristics also
          matter.
        </p>
      </>
    ),
    code: `O(1)       Constant
O(log n)   Logarithmic
O(n)       Linear
O(n log n) Linearithmic
O(n^2)     Quadratic
O(2^n)     Exponential

// Choose an efficient algorithm first.
// Then measure its implementation.`,
  },
  {
    title: "4. Find the Bottleneck",
    content: (
      <>
        <p>
          A bottleneck is the component limiting overall performance.
        </p>
        <p>Common bottlenecks:</p>
        <ul>
          <li>CPU-intensive calculations.</li>
          <li>Excessive object allocation.</li>
          <li>Garbage collection pressure.</li>
          <li>Slow database queries.</li>
          <li>Network latency.</li>
          <li>Lock contention.</li>
        </ul>
        <p>
          Optimizing a component that is not the bottleneck may produce
          little or no improvement.
        </p>
      </>
    ),
    code: `Example:

Application response time = 2 seconds

Database query = 1.7 seconds
Java processing = 0.2 seconds
Other overhead = 0.1 seconds

// Optimizing Java processing by 50%
// saves only about 0.1 seconds.
// Investigate the database first.`,
  },
  {
    title: "5. System.nanoTime()",
    content: (
      <>
        <p>
          Use <code>System.nanoTime()</code> to measure elapsed time.
        </p>
        <p>
          It is designed for elapsed-time measurement and is not a
          wall-clock timestamp.
        </p>
        <p>
          For serious benchmarking, use a benchmark framework rather than
          relying on a single timing measurement.
        </p>
      </>
    ),
    code: `long start = System.nanoTime();

long sum = 0;

for (int i = 0; i < 1_000_000; i++) {
    sum += i;
}

long end = System.nanoTime();

long elapsed = end - start;

System.out.println(
    "Elapsed ns: " + elapsed
);`,
  },
  {
    title: "6. Why Simple Benchmarks Can Mislead",
    content: (
      <>
        <p>
          Java performance changes during execution because of JIT
          compilation, garbage collection, and runtime optimization.
        </p>
        <p>Common benchmarking mistakes:</p>
        <ul>
          <li>Measuring only one execution.</li>
          <li>Ignoring JVM warm-up.</li>
          <li>Ignoring dead-code elimination.</li>
          <li>Running benchmarks while the system is heavily loaded.</li>
          <li>Comparing different JVM settings.</li>
        </ul>
      </>
    ),
    code: `// Avoid trusting a single result:
long start = System.nanoTime();
doWork();
long end = System.nanoTime();

// Better benchmark practice:
// - Warm up
// - Repeat measurements
// - Use JMH
// - Compare distributions`,
  },
  {
    title: "7. JMH Benchmarking",
    content: (
      <>
        <p>
          JMH stands for Java Microbenchmark Harness.
        </p>
        <p>
          It is a tool designed for benchmarking small pieces of Java code
          while accounting for JVM-specific measurement challenges.
        </p>
        <p>
          JMH supports warm-up iterations, measurement iterations,
          forks, and benchmark modes.
        </p>
      </>
    ),
    code: `import org.openjdk.jmh.annotations.*;

@State(Scope.Thread)
public class MyBenchmark {

    @Benchmark
    public int calculate() {
        return 100 * 200;
    }
}

// Use JMH's generated benchmark runner.
// Do not treat a plain main() loop
// as an equivalent microbenchmark.`,
  },
  {
    title: "8. CPU Profiling",
    content: (
      <>
        <p>
          A CPU profiler shows where the application spends CPU time.
        </p>
        <p>
          It helps identify hot methods, expensive loops, repeated
          calculations, and unexpected CPU consumption.
        </p>
        <p>
          Sampling profilers periodically record what the application is
          executing. They usually have lower overhead than instrumenting
          every method call.
        </p>
      </>
    ),
    code: `Useful tools:

- Java Flight Recorder (JFR)
- Java Mission Control (JMC)
- async-profiler
- VisualVM

// Look for:
// - Hot methods
// - CPU-heavy loops
// - Unexpected method calls
// - Excessive allocation`,
  },
  {
    title: "9. Java Flight Recorder",
    content: (
      <>
        <p>
          Java Flight Recorder (JFR) collects runtime diagnostic and
          performance data.
        </p>
        <p>
          Depending on configuration, it can record CPU samples,
          allocation events, garbage collection, thread activity, and
          other JVM events.
        </p>
        <p>
          JFR is useful for investigating production-like workloads with
          relatively low overhead when configured appropriately.
        </p>
      </>
    ),
    code: `// Start a recording
jcmd <pid> JFR.start

// Stop and save
jcmd <pid> JFR.dump filename=recording.jfr

// Open the recording in Java Mission Control`,
  },
  {
    title: "10. Memory Profiling",
    content: (
      <>
        <p>
          A memory profiler helps identify object allocation patterns and
          memory retention.
        </p>
        <p>Investigate:</p>
        <ul>
          <li>Objects allocated frequently.</li>
          <li>Large collections.</li>
          <li>Unexpected object retention.</li>
          <li>Memory leaks.</li>
          <li>Excessive temporary objects.</li>
        </ul>
        <p>
          High allocation rate and memory leak are different problems.
        </p>
      </>
    ),
    code: `Allocation rate:
Objects are created quickly
and may be collected later.

Memory leak:
Objects remain reachable
even though the application
no longer needs them.`,
  },
  {
    title: "11. Heap Dump",
    content: (
      <>
        <p>
          A heap dump is a snapshot of objects in the Java heap.
        </p>
        <p>
          It can help investigate memory leaks, retained objects, and
          unexpectedly large data structures.
        </p>
        <p>
          Heap dumps may contain sensitive application data. Store and
          share them carefully.
        </p>
      </>
    ),
    code: `// Create a heap dump
jcmd <pid> GC.heap_dump heap.hprof

// Analyze using tools such as:
// - Eclipse MAT
// - VisualVM
// - Java Mission Control`,
  },
  {
    title: "12. Garbage Collection Tuning",
    content: (
      <>
        <p>
          Garbage collection tuning aims to balance throughput, latency,
          and memory usage.
        </p>
        <p>
          First investigate allocation rate, heap occupancy, collection
          frequency, and pause duration.
        </p>
        <p>
          Changing the collector or heap size without understanding the
          workload can make performance worse.
        </p>
      </>
    ),
    code: `// Example: select G1 explicitly
java -XX:+UseG1GC Main

// Example heap limits
java -Xms512m -Xmx2g Main

// Always measure under a representative
// workload before changing production settings.`,
  },
  {
    title: "13. G1 Garbage Collector",
    content: (
      <>
        <p>
          G1 (Garbage-First) is a generational, region-based garbage
          collector designed to balance throughput and pause-time goals.
        </p>
        <p>
          It divides the heap into regions and prioritizes regions with
          substantial reclaimable space.
        </p>
        <p>
          G1 is the default collector in many modern HotSpot configurations,
          but defaults can depend on JVM version and environment.
        </p>
      </>
    ),
    code: `// G1 options
-XX:+UseG1GC

// Pause-time goal
-XX:MaxGCPauseMillis=200

// This is a goal, not a guarantee.
// Actual pauses depend on workload
// and available resources.`,
  },
  {
    title: "14. Other Garbage Collectors",
    content: (
      <>
        <p>Other HotSpot collectors include:</p>
        <ul>
          <li><strong>Serial GC:</strong> Simple collector using a single GC thread.</li>
          <li><strong>Parallel GC:</strong> Focuses on throughput using parallel collection.</li>
          <li><strong>ZGC:</strong> Designed for very low pause times.</li>
          <li><strong>Shenandoah:</strong> Designed for low-pause garbage collection.</li>
        </ul>
        <p>
          No collector is universally best. Selection depends on latency,
          throughput, heap size, and workload.
        </p>
      </>
    ),
    code: `// Examples; availability depends on JVM
-XX:+UseSerialGC
-XX:+UseParallelGC
-XX:+UseZGC
-XX:+UseShenandoahGC`,
  },
  {
    title: "15. Reduce Object Allocation",
    content: (
      <>
        <p>
          Creating unnecessary temporary objects can increase allocation
          rate and garbage collection work.
        </p>
        <p>Possible improvements:</p>
        <ul>
          <li>Avoid repeated object creation inside hot loops when reuse is safe.</li>
          <li>Use appropriate data structures.</li>
          <li>Avoid unnecessary boxing and unboxing.</li>
          <li>Do not create intermediate collections without need.</li>
        </ul>
        <p>
          Do not sacrifice readability or correctness for tiny allocation
          reductions without measurement.
        </p>
      </>
    ),
    code: `// Potentially creates many objects
for (int i = 0; i < 1000; i++) {
    String result = "Value: " + i;
}

// StringBuilder can be useful for
// repeated string construction:
StringBuilder sb = new StringBuilder();

for (int i = 0; i < 1000; i++) {
    sb.append("Value: ").append(i);
}`,
  },
  {
    title: "16. String Performance",
    content: (
      <>
        <p>
          Strings are immutable. Repeated concatenation in a loop can
          create many intermediate objects.
        </p>
        <p>
          The compiler may optimize some concatenations, but using a
          StringBuilder explicitly is a clear choice for repeated
          accumulation.
        </p>
      </>
    ),
    code: `StringBuilder builder = new StringBuilder();

for (int i = 0; i < 1000; i++) {
    builder.append(i).append(",");
}

String result = builder.toString();`,
  },
  {
    title: "17. Collections Performance",
    content: (
      <>
        <p>
          Choosing the correct collection can have a large effect on
          performance.
        </p>
        <ul>
          <li><code>ArrayList</code>: fast indexed access, amortized constant-time append.</li>
          <li><code>LinkedList</code>: node-based; indexed access is linear.</li>
          <li><code>HashMap</code>: average constant-time lookup with good hashing.</li>
          <li><code>TreeMap</code>: logarithmic operations with sorted keys.</li>
          <li><code>ArrayDeque</code>: efficient stack and queue operations at both ends.</li>
        </ul>
      </>
    ),
    code: `// Prefer ArrayDeque for stack-like use
ArrayDeque<Integer> stack = new ArrayDeque<>();

stack.push(10);
stack.push(20);

int top = stack.pop();

// Choose by operation pattern,
// not by habit.`,
  },
  {
    title: "18. HashMap Performance",
    content: (
      <>
        <p>
          HashMap performance depends on hash distribution, load factor,
          resizing, and key equality behavior.
        </p>
        <p>
          Poor hash functions can cause collisions and degrade performance.
          In modern implementations, heavily collided bins may be
          treeified under certain conditions.
        </p>
        <p>
          Keys should implement equals() and hashCode() consistently.
        </p>
      </>
    ),
    code: `Map<String, Integer> map =
    new HashMap<>(1000);

// If the approximate size is known,
// initial capacity can reduce resizing.

// Do not mutate key fields used by
// equals() or hashCode() while the key
// is stored in the map.`,
  },
  {
    title: "19. Database Performance",
    content: (
      <>
        <p>
          Java applications often spend significant time waiting for
          databases rather than executing Java code.
        </p>
        <p>Common improvements:</p>
        <ul>
          <li>Use indexes for appropriate queries.</li>
          <li>Avoid N+1 query patterns.</li>
          <li>Use connection pooling.</li>
          <li>Batch repeated database operations.</li>
          <li>Retrieve only required columns.</li>
          <li>Measure query execution plans.</li>
        </ul>
      </>
    ),
    code: `// JDBC batching concept
PreparedStatement ps =
    connection.prepareStatement(
        "INSERT INTO students(name) VALUES (?)"
    );

for (String name : names) {
    ps.setString(1, name);
    ps.addBatch();
}

ps.executeBatch();`,
  },
  {
    title: "20. Connection Pooling",
    content: (
      <>
        <p>
          Creating a new database connection for every request can be
          expensive.
        </p>
        <p>
          A connection pool maintains reusable connections and manages
          access to them.
        </p>
        <p>
          Pool size should be chosen based on database capacity,
          application concurrency, and workload—not simply the number of
          application threads.
        </p>
      </>
    ),
    code: `// Common Java connection pool:
// HikariCP

// Configure:
// - Maximum pool size
// - Connection timeout
// - Idle timeout
// - Maximum lifetime

// Always close borrowed connections
// using try-with-resources.`,
  },
  {
    title: "21. Caching",
    content: (
      <>
        <p>
          Caching stores results so repeated requests can avoid expensive
          computation or I/O.
        </p>
        <p>Common cache concerns:</p>
        <ul>
          <li>Cache invalidation.</li>
          <li>Memory limits.</li>
          <li>Expiration.</li>
          <li>Concurrent updates.</li>
          <li>Stale data.</li>
          <li>Cache stampede.</li>
        </ul>
        <p>
          A cache improves performance only when the hit rate and saved
          work justify its overhead.
        </p>
      </>
    ),
    code: `Map<String, String> cache =
    new ConcurrentHashMap<>();

String value = cache.computeIfAbsent(
    "key",
    key -> expensiveOperation(key)
);`,
  },
  {
    title: "22. Lock Contention",
    content: (
      <>
        <p>
          Lock contention occurs when multiple threads compete for the
          same lock.
        </p>
        <p>
          Contention can reduce throughput because threads spend time
          waiting instead of performing useful work.
        </p>
        <p>Possible improvements:</p>
        <ul>
          <li>Reduce lock scope.</li>
          <li>Use finer-grained locking when justified.</li>
          <li>Use concurrent data structures.</li>
          <li>Reduce shared mutable state.</li>
        </ul>
      </>
    ),
    code: `// Instead of one large synchronized
// operation, protect only the shared
// state that requires coordination.

// Do not split locks blindly:
// multiple locks can introduce
// deadlocks and complexity.`,
  },
  {
    title: "23. Thread Pool Sizing",
    content: (
      <>
        <p>
          Thread pool size depends on whether tasks are CPU-bound or
          I/O-bound.
        </p>
        <p>
          CPU-bound tasks often benefit from a pool near the available
          processor count.
        </p>
        <p>
          I/O-bound tasks may benefit from more concurrent threads because
          many tasks spend time waiting, but excessive concurrency can
          overload downstream systems.
        </p>
      </>
    ),
    code: `int processors =
    Runtime.getRuntime()
        .availableProcessors();

System.out.println(
    "Available processors: " + processors
);

// Treat this as a starting point,
// not a universal pool-size formula.`,
  },
  {
    title: "24. JVM Memory Options",
    content: (
      <>
        <p>Useful memory-related JVM options:</p>
        <ul>
          <li><code>-Xms</code>: initial heap size.</li>
          <li><code>-Xmx</code>: maximum heap size.</li>
          <li><code>-XX:MaxMetaspaceSize</code>: maximum Metaspace size.</li>
          <li><code>-Xss</code>: thread stack size.</li>
        </ul>
        <p>
          Increasing the heap may reduce some collections, but it does
          not fix memory leaks or inefficient allocation by itself.
        </p>
      </>
    ),
    code: `java -Xms512m -Xmx2g -Xss1m Main

// Example values only.
// Choose limits based on the environment
// and available memory.`,
  },
  {
    title: "25. Class Data Sharing",
    content: (
      <>
        <p>
          Class Data Sharing (CDS) can share certain class metadata
          between JVM processes and may improve startup time and memory
          usage.
        </p>
        <p>
          AppCDS can extend sharing to application classes in supported
          configurations.
        </p>
        <p>
          Benefits depend on the application, JVM version, and setup.
        </p>
      </>
    ),
    code: `// Check CDS-related options
java -Xshare:dump

// Run with sharing enabled
java -Xshare:on Main`,
  },
  {
    title: "26. Startup Performance",
    content: (
      <>
        <p>
          Startup performance matters for command-line tools,
          serverless workloads, and short-lived applications.
        </p>
        <p>Possible strategies:</p>
        <ul>
          <li>Reduce unnecessary initialization.</li>
          <li>Reduce classpath scanning.</li>
          <li>Use CDS where appropriate.</li>
          <li>Review framework startup work.</li>
          <li>Consider native image technology when the use case justifies it.</li>
        </ul>
      </>
    ),
    code: `// Measure startup separately from
// steady-state throughput.

// A program that starts quickly may
// still perform poorly after startup,
// and vice versa.`,
  },
  {
    title: "27. Native Image",
    content: (
      <>
        <p>
          GraalVM Native Image can compile Java applications ahead of
          time into native executables.
        </p>
        <p>Potential benefits:</p>
        <ul>
          <li>Faster startup.</li>
          <li>Lower memory use for some workloads.</li>
          <li>Useful for short-lived applications.</li>
        </ul>
        <p>
          Trade-offs include build complexity, compatibility constraints,
          and different runtime optimization behavior.
        </p>
      </>
    ),
    code: `// Example with GraalVM Native Image
native-image -jar app.jar

// The exact command and configuration
// depend on the application.`,
  },
  {
    title: "28. Performance Monitoring",
    content: (
      <>
        <p>
          Monitoring helps detect performance regressions and resource
          problems over time.
        </p>
        <p>Track metrics such as:</p>
        <ul>
          <li>Request latency percentiles.</li>
          <li>Throughput.</li>
          <li>CPU usage.</li>
          <li>Heap usage.</li>
          <li>GC pause duration.</li>
          <li>Thread count.</li>
          <li>Database connection pool usage.</li>
        </ul>
        <p>
          Percentiles such as p95 and p99 reveal slow requests that
          averages can hide.
        </p>
      </>
    ),
    code: `// Example metrics:
request_latency_p50
request_latency_p95
request_latency_p99
requests_per_second
heap_used_bytes
gc_pause_seconds
active_threads`,
  },
  {
    title: "29. Performance Optimization Example",
    content: (
      <>
        <p>
          Suppose a method repeatedly searches a list for the same
          values.
        </p>
        <p>
          Replacing repeated linear searches with a HashSet may reduce
          average lookup work from O(n) to O(1), assuming suitable
          hashing behavior.
        </p>
        <p>
          The best improvement comes from reducing repeated work, not
          merely changing syntax.
        </p>
      </>
    ),
    code: `// Repeated list lookup
for (String target : targets) {
    if (list.contains(target)) {
        process(target);
    }
}

// Better for repeated membership checks
Set<String> lookup = new HashSet<>(list);

for (String target : targets) {
    if (lookup.contains(target)) {
        process(target);
    }
}`,
  },
  {
    title: "30. Interview Questions",
    content: (
      <>
        <ol>
          <li>What is performance tuning?</li>
          <li>Latency vs throughput?</li>
          <li>How do you identify a bottleneck?</li>
          <li>Why is System.nanoTime used?</li>
          <li>Why is JMH preferred for microbenchmarking?</li>
          <li>What is CPU profiling?</li>
          <li>What is Java Flight Recorder?</li>
          <li>What is a heap dump?</li>
          <li>Allocation rate vs memory leak?</li>
          <li>How does G1 work at a high level?</li>
          <li>Compare garbage collectors.</li>
          <li>How can you reduce object allocation?</li>
          <li>How does HashMap performance depend on hashCode?</li>
          <li>How does connection pooling help?</li>
          <li>What is lock contention?</li>
          <li>How do you size a thread pool?</li>
          <li>What are p95 and p99 latency?</li>
          <li>What is Class Data Sharing?</li>
          <li>What is GraalVM Native Image?</li>
        </ol>
      </>
    ),
    code: `// Practice tasks:
// 1. Benchmark ArrayList vs LinkedList
//    for the operations you actually use.
// 2. Profile a CPU-heavy Java method.
// 3. Create and inspect a heap dump.
// 4. Compare allocation-heavy and
//    allocation-light implementations.
// 5. Measure HashMap vs repeated List search.
// 6. Record JFR data for a sample app.
// 7. Explain a p99 latency spike.`,
  },
];

export default function PerformanceTuningLesson({ onBack }) {
  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: "20px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid var(--border, #d1d5db)",
          background: "var(--card, #ffffff)",
          color: "var(--text, #111827)",
          cursor: "pointer",
        }}
      >
        ← Back to Java
      </button>

      <h1 style={{ fontSize: "30px", fontWeight: "800", marginBottom: "10px" }}>
        Java Performance Tuning & Profiling
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn how to measure Java performance, find bottlenecks, profile
        CPU and memory, tune garbage collection, optimize collections,
        and monitor real applications.
      </p>

      {lessons.map((lesson, index) => (
        <section key={index} style={sectionStyle}>
          <h2 style={headingStyle}>{lesson.title}</h2>
          <div style={{ lineHeight: "1.7", marginBottom: "14px" }}>
            {lesson.content}
          </div>
          <pre style={codeStyle}>
            <code>{lesson.code}</code>
          </pre>
        </section>
      ))}

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Final Checklist</h2>
        <ul>
          <li>Understand latency, throughput, and Big-O.</li>
          <li>Measure before optimizing.</li>
          <li>Use JMH for microbenchmarks.</li>
          <li>Use JFR and profilers to identify bottlenecks.</li>
          <li>Understand heap dumps and memory leaks.</li>
          <li>Know garbage collection trade-offs.</li>
          <li>Optimize collections and reduce unnecessary work.</li>
          <li>Understand database, caching, and thread pool performance.</li>
          <li>Monitor p95/p99 latency and resource metrics.</li>
        </ul>
      </section>
    </div>
  );
}
