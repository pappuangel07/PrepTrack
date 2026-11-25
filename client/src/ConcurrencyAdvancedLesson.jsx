

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
    title: "1. Concurrency vs Parallelism",
    content: (
      <>
        <p>
          <strong>Concurrency</strong> means multiple tasks can make progress
          during overlapping periods.
        </p>
        <p>
          <strong>Parallelism</strong> means multiple tasks are actually
          executing at the same time, usually on different CPU cores.
        </p>
        <p>
          A single CPU core can support concurrency by switching between
          tasks. Multiple cores can execute tasks in parallel.
        </p>
      </>
    ),
    code: `// Concurrency:
Task A -> Task B -> Task A -> Task B

// Parallelism:
Core 1 -> Task A
Core 2 -> Task B`,
  },
  {
    title: "2. Process vs Thread",
    content: (
      <>
        <p>
          A process is an executing program with its own process-level
          resources and address space.
        </p>
        <p>
          A thread is an execution path within a process. Threads in the
          same process share heap memory, but each thread has its own
          execution stack and program counter.
        </p>
        <p>
          Threads are generally cheaper to create and communicate between
          than separate processes, but shared memory introduces
          synchronization problems.
        </p>
      </>
    ),
    code: `Process
  |
  +-- Thread 1
  |     +-- Stack
  |
  +-- Thread 2
  |     +-- Stack
  |
  +-- Shared Heap`,
  },
  {
    title: "3. Thread States",
    content: (
      <>
        <p>Java defines these thread states:</p>
        <ul>
          <li><strong>NEW:</strong> Created but not started.</li>
          <li><strong>RUNNABLE:</strong> Executing or ready to execute.</li>
          <li><strong>BLOCKED:</strong> Waiting to acquire an intrinsic monitor lock.</li>
          <li><strong>WAITING:</strong> Waiting indefinitely for another action.</li>
          <li><strong>TIMED_WAITING:</strong> Waiting for a specified time.</li>
          <li><strong>TERMINATED:</strong> Execution has finished.</li>
        </ul>
        <p>
          Java's RUNNABLE state includes both ready-to-run and running
          situations. It does not have a separate RUNNING state in
          Thread.State.
        </p>
      </>
    ),
    code: `Thread thread = new Thread(() -> {
    System.out.println("Running");
});

System.out.println(thread.getState()); // NEW

thread.start();

// The state changes as the thread progresses.`,
  },
  {
    title: "4. Race Condition",
    content: (
      <>
        <p>
          A race condition occurs when the result depends on the timing or
          interleaving of concurrent operations.
        </p>
        <p>
          The operation <code>count++</code> is not atomic. It involves
          reading the value, incrementing it, and writing it back.
        </p>
        <p>
          Two threads can read the same value and overwrite each other's
          updates.
        </p>
      </>
    ),
    code: `class Counter {
    int count = 0;

    void increment() {
        count++;
    }
}

// Two threads calling increment()
// concurrently can lose updates.`,
  },
  {
    title: "5. Critical Section",
    content: (
      <>
        <p>
          A critical section is a section of code that accesses shared
          mutable state and must be protected from conflicting concurrent
          operations.
        </p>
        <p>
          The goal is to ensure that only the allowed number of threads
          enter the protected section at a time.
        </p>
        <p>
          Synchronization should protect the shared state consistently,
          not just one convenient method.
        </p>
      </>
    ),
    code: `class Counter {
    private int count = 0;

    synchronized void increment() {
        count++;
    }

    synchronized int getCount() {
        return count;
    }
}`,
  },
  {
    title: "6. synchronized Keyword",
    content: (
      <>
        <p>
          The <code>synchronized</code> keyword provides mutual exclusion
          and memory visibility through an intrinsic monitor.
        </p>
        <p>
          Only one thread at a time can hold a particular monitor lock.
        </p>
        <p>
          When a thread exits a synchronized block, its changes become
          visible to a thread that subsequently acquires the same monitor.
        </p>
      </>
    ),
    code: `class Counter {
    private int count;

    void increment() {
        synchronized (this) {
            count++;
        }
    }
}`,
  },
  {
    title: "7. Instance Lock vs Class Lock",
    content: (
      <>
        <p>
          A synchronized instance method locks the current object, meaning
          <code> this</code>.
        </p>
        <p>
          A synchronized static method locks the Class object associated
          with that class.
        </p>
        <p>
          These are different locks. Synchronizing an instance method does
          not automatically block a synchronized static method.
        </p>
      </>
    ),
    code: `class Example {
    synchronized void instanceMethod() {
        // Locks this object
    }

    static synchronized void staticMethod() {
        // Locks Example.class
    }
}`,
  },
  {
    title: "8. volatile Keyword",
    content: (
      <>
        <p>
          <code>volatile</code> provides visibility and ordering guarantees
          for reads and writes of a variable.
        </p>
        <p>
          It does not make compound operations such as incrementing a
          variable atomic.
        </p>
        <p>
          Use volatile for simple state flags when the required
          synchronization pattern is appropriate.
        </p>
      </>
    ),
    code: `class Worker {
    private volatile boolean running = true;

    void stop() {
        running = false;
    }

    void work() {
        while (running) {
            // Do work
        }
    }
}`,
  },
  {
    title: "9. Atomic Classes",
    content: (
      <>
        <p>
          Atomic classes provide thread-safe operations on individual
          values without requiring you to write synchronized blocks.
        </p>
        <p>
          Common classes include:
        </p>
        <ul>
          <li><code>AtomicInteger</code></li>
          <li><code>AtomicLong</code></li>
          <li><code>AtomicBoolean</code></li>
          <li><code>AtomicReference</code></li>
        </ul>
        <p>
          They commonly use compare-and-set operations and hardware
          support where available.
        </p>
      </>
    ),
    code: `import java.util.concurrent.atomic.AtomicInteger;

class Counter {
    private final AtomicInteger count =
        new AtomicInteger(0);

    void increment() {
        count.incrementAndGet();
    }

    int getCount() {
        return count.get();
    }
}`,
  },
  {
    title: "10. Compare-And-Set (CAS)",
    content: (
      <>
        <p>
          CAS stands for Compare-And-Set or Compare-And-Swap.
        </p>
        <p>
          It checks whether a value still equals an expected value. If it
          does, it atomically replaces it with a new value.
        </p>
        <p>
          If another thread changed the value first, the operation fails
          and the caller may retry.
        </p>
      </>
    ),
    code: `AtomicInteger value = new AtomicInteger(10);

boolean updated =
    value.compareAndSet(10, 20);

// true if value was 10 and changed to 20
// false if the expected value did not match`,
  },
  {
    title: "11. ReentrantLock",
    content: (
      <>
        <p>
          <code>ReentrantLock</code> is an explicit lock from
          <code> java.util.concurrent.locks</code>.
        </p>
        <p>Compared with synchronized, it offers features such as:</p>
        <ul>
          <li>Interruptible lock acquisition.</li>
          <li>Timed lock attempts.</li>
          <li>Optional fairness policy.</li>
          <li>Multiple Condition objects.</li>
        </ul>
        <p>
          Always release a lock in a finally block.
        </p>
      </>
    ),
    code: `import java.util.concurrent.locks.ReentrantLock;

class Counter {
    private final ReentrantLock lock =
        new ReentrantLock();

    private int count;

    void increment() {
        lock.lock();

        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
}`,
  },
  {
    title: "12. tryLock()",
    content: (
      <>
        <p>
          <code>tryLock()</code> attempts to acquire a lock without waiting
          indefinitely.
        </p>
        <p>
          It returns true if the lock was acquired and false otherwise.
        </p>
        <p>
          A timed tryLock can wait for a limited duration. This can help
          avoid indefinite waiting, but it does not automatically solve
          every deadlock.
        </p>
      </>
    ),
    code: `if (lock.tryLock()) {
    try {
        // Protected work
    } finally {
        lock.unlock();
    }
} else {
    // Lock unavailable
}`,
  },
  {
    title: "13. Condition",
    content: (
      <>
        <p>
          A <code>Condition</code> allows threads to wait for a particular
          condition while using an explicit lock.
        </p>
        <p>
          Use <code>await()</code> to wait and <code>signal()</code> or
          <code> signalAll()</code> to wake waiting threads.
        </p>
        <p>
          Always check the condition in a while loop because a thread may
          wake up even when the condition is not satisfied.
        </p>
      </>
    ),
    code: `lock.lock();

try {
    while (!ready) {
        condition.await();
    }

    // Condition is satisfied
} finally {
    lock.unlock();
}`,
  },
  {
    title: "14. Deadlock",
    content: (
      <>
        <p>
          A deadlock occurs when threads wait forever for resources held
          by each other.
        </p>
        <p>Four classic conditions are:</p>
        <ul>
          <li>Mutual exclusion.</li>
          <li>Hold and wait.</li>
          <li>No preemption.</li>
          <li>Circular wait.</li>
        </ul>
        <p>
          Breaking at least one of these conditions can prevent the
          corresponding deadlock scenario.
        </p>
      </>
    ),
    code: `Thread 1:
    holds Lock A
    waits for Lock B

Thread 2:
    holds Lock B
    waits for Lock A

// Neither thread can continue.`,
  },
  {
    title: "15. Deadlock Prevention",
    content: (
      <>
        <p>Practical techniques include:</p>
        <ul>
          <li>Acquire locks in a consistent global order.</li>
          <li>Avoid holding locks longer than necessary.</li>
          <li>Use timed lock acquisition where appropriate.</li>
          <li>Avoid calling unknown external code while holding locks.</li>
          <li>Reduce the number of shared locks.</li>
        </ul>
        <p>
          Consistent lock ordering is one of the most effective ways to
          prevent circular-wait deadlocks.
        </p>
      </>
    ),
    code: `// Always acquire in this order:
synchronized (lockA) {
    synchronized (lockB) {
        // Work
    }
}

// Other code must follow the same
// lock acquisition order.`,
  },
  {
    title: "16. ExecutorService",
    content: (
      <>
        <p>
          <code>ExecutorService</code> manages task execution using an
          executor.
        </p>
        <p>
          It separates submitting tasks from deciding which threads execute
          them.
        </p>
        <p>
          It is generally preferable to creating a new platform thread for
          every small task.
        </p>
      </>
    ),
    code: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

ExecutorService executor =
    Executors.newFixedThreadPool(3);

executor.submit(() -> {
    System.out.println("Task running");
});

executor.shutdown();`,
  },
  {
    title: "17. Thread Pool",
    content: (
      <>
        <p>
          A thread pool reuses threads to execute submitted tasks.
        </p>
        <p>Benefits include:</p>
        <ul>
          <li>Reduced thread creation overhead.</li>
          <li>Control over concurrent task execution.</li>
          <li>Centralized task management.</li>
        </ul>
        <p>
          An unbounded task queue or poorly sized pool can still cause
          memory pressure, latency, or resource exhaustion.
        </p>
      </>
    ),
    code: `ExecutorService pool =
    Executors.newFixedThreadPool(4);

for (int i = 0; i < 10; i++) {
    int taskId = i;

    pool.submit(() -> {
        System.out.println(taskId);
    });
}

pool.shutdown();`,
  },
  {
    title: "18. Callable and Future",
    content: (
      <>
        <p>
          <code>Runnable</code> does not return a result from its run
          method.
        </p>
        <p>
          <code>Callable</code> can return a result and throw checked
          exceptions.
        </p>
        <p>
          <code>Future</code> represents the result of an asynchronous
          computation. Calling <code>get()</code> may block until the
          result is available.
        </p>
      </>
    ),
    code: `import java.util.concurrent.*;

ExecutorService pool =
    Executors.newSingleThreadExecutor();

Future<Integer> future =
    pool.submit(() -> 10 + 20);

int result = future.get();

System.out.println(result);

pool.shutdown();`,
  },
  {
    title: "19. CompletableFuture",
    content: (
      <>
        <p>
          <code>CompletableFuture</code> supports asynchronous
          computations and chaining operations.
        </p>
        <p>Useful methods include:</p>
        <ul>
          <li><code>supplyAsync()</code></li>
          <li><code>runAsync()</code></li>
          <li><code>thenApply()</code></li>
          <li><code>thenCompose()</code></li>
          <li><code>thenCombine()</code></li>
          <li><code>exceptionally()</code></li>
        </ul>
        <p>
          It helps compose asynchronous work without manually managing
          every callback.
        </p>
      </>
    ),
    code: `import java.util.concurrent.CompletableFuture;

CompletableFuture<Integer> result =
    CompletableFuture
        .supplyAsync(() -> 10)
        .thenApply(value -> value * 2)
        .thenApply(value -> value + 5);

System.out.println(result.join()); // 25`,
  },
  {
    title: "20. thenApply vs thenCompose",
    content: (
      <>
        <p>
          <code>thenApply</code> transforms a result into another value.
        </p>
        <p>
          <code>thenCompose</code> transforms a result into another
          CompletableFuture and flattens the nested future.
        </p>
        <p>
          Use thenCompose when the next asynchronous operation itself
          returns a CompletableFuture.
        </p>
      </>
    ),
    code: `CompletableFuture<String> first =
    CompletableFuture.supplyAsync(() -> "Java");

CompletableFuture<Integer> length =
    first.thenApply(String::length);

// thenCompose avoids nested futures:
CompletableFuture<String> next =
    first.thenCompose(value ->
        CompletableFuture.supplyAsync(
            () -> value + " Concurrency"
        )
    );`,
  },
  {
    title: "21. Exception Handling in CompletableFuture",
    content: (
      <>
        <p>
          Asynchronous computations can fail. Handle exceptions explicitly
          when composing tasks.
        </p>
        <ul>
          <li><code>exceptionally()</code> can provide a fallback result.</li>
          <li><code>handle()</code> processes success or failure.</li>
          <li><code>whenComplete()</code> observes completion without transforming the result.</li>
        </ul>
        <p>
          Do not silently convert every failure into a default value unless
          that behavior is genuinely correct for your application.
        </p>
      </>
    ),
    code: `CompletableFuture<Integer> future =
    CompletableFuture
        .supplyAsync(() -> {
            throw new RuntimeException("Failed");
        })
        .exceptionally(error -> {
            System.out.println(error.getMessage());
            return -1;
        });`,
  },
  {
    title: "22. ForkJoinPool",
    content: (
      <>
        <p>
          <code>ForkJoinPool</code> is designed for tasks that can be
          divided into smaller subtasks.
        </p>
        <p>
          It uses work-stealing: idle workers can take tasks from other
          workers' queues.
        </p>
        <p>
          It is useful for divide-and-conquer workloads, but blocking
          operations can reduce its effectiveness.
        </p>
      </>
    ),
    code: `import java.util.concurrent.*;

ForkJoinPool pool = new ForkJoinPool();

pool.submit(() -> {
    System.out.println("ForkJoin task");
}).join();

pool.shutdown();`,
  },
  {
    title: "23. Concurrent Collections",
    content: (
      <>
        <p>
          Java provides collections designed for concurrent access.
        </p>
        <ul>
          <li><code>ConcurrentHashMap</code></li>
          <li><code>CopyOnWriteArrayList</code></li>
          <li><code>BlockingQueue</code></li>
          <li><code>ConcurrentLinkedQueue</code></li>
        </ul>
        <p>
          Choose based on the access pattern. A CopyOnWriteArrayList is
          useful when reads are frequent and writes are rare, not when
          updates happen constantly.
        </p>
      </>
    ),
    code: `import java.util.concurrent.ConcurrentHashMap;

ConcurrentHashMap<String, Integer> map =
    new ConcurrentHashMap<>();

map.put("Java", 1);
map.put("DSA", 2);

System.out.println(map.get("Java"));`,
  },
  {
    title: "24. BlockingQueue",
    content: (
      <>
        <p>
          A <code>BlockingQueue</code> supports producer-consumer
          coordination.
        </p>
        <p>
          A producer inserts tasks, and a consumer removes them. When the
          queue is full or empty, blocking operations can wait until
          progress is possible.
        </p>
        <p>
          This reduces the need to manually coordinate shared queues with
          synchronized blocks.
        </p>
      </>
    ),
    code: `import java.util.concurrent.*;

BlockingQueue<Integer> queue =
    new ArrayBlockingQueue<>(5);

// Producer
queue.put(100);

// Consumer
int value = queue.take();`,
  },
  {
    title: "25. Producer-Consumer Pattern",
    content: (
      <>
        <p>
          The producer-consumer pattern separates task creation from task
          processing.
        </p>
        <p>
          A bounded queue provides backpressure: when consumers cannot keep
          up, producers eventually slow down instead of adding unlimited
          tasks to memory.
        </p>
      </>
    ),
    code: `BlockingQueue<String> queue =
    new ArrayBlockingQueue<>(10);

Thread producer = new Thread(() -> {
    try {
        queue.put("Task");
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

Thread consumer = new Thread(() -> {
    try {
        String task = queue.take();
        System.out.println(task);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

producer.start();
consumer.start();`,
  },
  {
    title: "26. Virtual Threads",
    content: (
      <>
        <p>
          Virtual threads were finalized in Java 21.
        </p>
        <p>
          They are lightweight threads managed by the Java runtime and are
          especially useful for applications that create many concurrent
          tasks that spend much of their time waiting for I/O.
        </p>
        <p>
          Virtual threads do not make CPU-bound work execute faster by
          themselves. They also do not eliminate the need for thread-safe
          code.
        </p>
      </>
    ),
    code: `// Java 21+
Thread.startVirtualThread(() -> {
    System.out.println("Virtual thread");
});

// Or use an executor:
try (var executor =
        Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> {
        System.out.println("Task");
    });
}`,
  },
  {
    title: "27. Platform Threads vs Virtual Threads",
    content: (
      <>
        <p>
          Platform threads are typically backed by operating-system
          threads.
        </p>
        <p>
          Virtual threads are scheduled by the Java runtime and can support
          very large numbers of concurrent blocking tasks with lower
          per-thread overhead.
        </p>
        <p>
          Virtual threads are not a replacement for CPU parallelism or
          synchronization. Use them primarily to simplify high-concurrency
          blocking workloads.
        </p>
      </>
    ),
    code: `// Platform thread
Thread platform = new Thread(task);

// Virtual thread
Thread virtual =
    Thread.startVirtualThread(task);`,
  },
  {
    title: "28. Java Memory Model (JMM)",
    content: (
      <>
        <p>
          The Java Memory Model defines how threads interact through
          memory and what visibility and ordering guarantees are provided.
        </p>
        <p>
          It explains why unsynchronized reads and writes can behave
          unexpectedly when threads share mutable state.
        </p>
        <p>
          Correct synchronization establishes relationships that make
          certain writes visible to other threads.
        </p>
      </>
    ),
    code: `// Shared mutable state without
// synchronization can be unsafe.

class Shared {
    int value = 0;
}

// Use synchronized, volatile,
// atomic classes, or other suitable
// concurrency mechanisms.`,
  },
  {
    title: "29. Happens-Before Relationship",
    content: (
      <>
        <p>
          Happens-before is a rule that guarantees visibility and ordering
          between actions in different threads.
        </p>
        <p>Examples include:</p>
        <ul>
          <li>A monitor unlock happens-before a later lock of the same monitor.</li>
          <li>A volatile write happens-before a subsequent read of that variable.</li>
          <li>Calling start() happens-before actions in the started thread.</li>
          <li>Actions in a thread happen-before another thread successfully returns from join() on it.</li>
        </ul>
      </>
    ),
    code: `class Shared {
    private volatile boolean ready;
    private int data;

    void writer() {
        data = 42;
        ready = true;
    }

    void reader() {
        if (ready) {
            System.out.println(data);
        }
    }
}

// The volatile write/read establishes
// visibility for the preceding data write.`,
  },
  {
    title: "30. Thread Safety",
    content: (
      <>
        <p>
          A class is thread-safe when it behaves correctly under concurrent
          use according to its documented contract.
        </p>
        <p>Common strategies:</p>
        <ul>
          <li>Immutability.</li>
          <li>Thread confinement.</li>
          <li>Synchronization.</li>
          <li>Atomic variables.</li>
          <li>Concurrent collections.</li>
        </ul>
        <p>
          Thread safety is about the whole operation and its invariants,
          not just whether individual methods use a lock.
        </p>
      </>
    ),
    code: `// Immutable object
final class Point {
    private final int x;
    private final int y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    int getX() {
        return x;
    }

    int getY() {
        return y;
    }
}`,
  },
  {
    title: "31. Interruption",
    content: (
      <>
        <p>
          Interruption is a cooperative mechanism for requesting that a
          thread stop or cancel its work.
        </p>
        <p>
          Methods such as sleep(), wait(), and join() can throw
          InterruptedException.
        </p>
        <p>
          If you cannot propagate the exception, commonly restore the
          interrupt status with <code>Thread.currentThread().interrupt()</code>.
        </p>
      </>
    ),
    code: `try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
    return;
}

// Do not swallow interruption
// without a deliberate reason.`,
  },
  {
    title: "32. Executor Shutdown",
    content: (
      <>
        <p>
          An ExecutorService should be shut down when it is no longer
          needed.
        </p>
        <ul>
          <li><code>shutdown()</code> stops accepting new tasks and allows submitted tasks to finish.</li>
          <li><code>shutdownNow()</code> attempts to interrupt active tasks and returns tasks that never started.</li>
          <li><code>awaitTermination()</code> waits for termination for a specified duration.</li>
        </ul>
        <p>
          Interruption is a request; tasks must cooperate for timely
          cancellation.
        </p>
      </>
    ),
    code: `executor.shutdown();

try {
    if (!executor.awaitTermination(
            5, TimeUnit.SECONDS)) {
        executor.shutdownNow();
    }
} catch (InterruptedException e) {
    executor.shutdownNow();
    Thread.currentThread().interrupt();
}`,
  },
  {
    title: "33. Common Concurrency Mistakes",
    content: (
      <>
        <ul>
          <li>Assuming count++ is atomic.</li>
          <li>Using volatile as a replacement for every lock.</li>
          <li>Forgetting to unlock a ReentrantLock.</li>
          <li>Calling Future.get() too early and blocking unnecessarily.</li>
          <li>Creating unlimited threads.</li>
          <li>Ignoring InterruptedException.</li>
          <li>Using a shared non-thread-safe collection concurrently.</li>
          <li>Holding locks while performing slow I/O.</li>
          <li>Assuming virtual threads eliminate race conditions.</li>
        </ul>
      </>
    ),
    code: `// Bad: lock may never be released
lock.lock();
doWork();
lock.unlock();

// Better:
lock.lock();
try {
    doWork();
} finally {
    lock.unlock();
}`,
  },
  {
    title: "34. Interview Questions",
    content: (
      <>
        <ol>
          <li>Concurrency vs parallelism?</li>
          <li>What is a race condition?</li>
          <li>What is a critical section?</li>
          <li>How does synchronized work?</li>
          <li>What is the difference between volatile and synchronized?</li>
          <li>What is CAS?</li>
          <li>What is ReentrantLock?</li>
          <li>What is deadlock and how do you prevent it?</li>
          <li>Why use ExecutorService?</li>
          <li>Runnable vs Callable?</li>
          <li>Future vs CompletableFuture?</li>
          <li>thenApply vs thenCompose?</li>
          <li>What is work-stealing?</li>
          <li>What is BlockingQueue?</li>
          <li>Platform threads vs virtual threads?</li>
          <li>What is the Java Memory Model?</li>
          <li>What is happens-before?</li>
          <li>How do you make a class thread-safe?</li>
          <li>How should interruption be handled?</li>
        </ol>
      </>
    ),
    code: `// Practice tasks:
// 1. Implement a thread-safe counter.
// 2. Demonstrate a race condition.
// 3. Fix it using synchronized.
// 4. Fix it using AtomicInteger.
// 5. Create a producer-consumer program.
// 6. Submit Callable tasks to a pool.
// 7. Chain CompletableFuture operations.
// 8. Create a deadlock and then prevent it.
// 9. Compare platform and virtual threads.`,
  },
];

export default function ConcurrencyAdvancedLesson({ onBack }) {
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
        Java Concurrency & Multithreading — Advanced
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn how to safely coordinate multiple threads, protect shared
        state, execute asynchronous tasks, prevent deadlocks, and use
        modern Java concurrency tools.
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
          <li>Understand concurrency, parallelism, and thread states.</li>
          <li>Recognize race conditions and critical sections.</li>
          <li>Use synchronized, volatile, and atomic classes correctly.</li>
          <li>Know explicit locks, conditions, and deadlock prevention.</li>
          <li>Use ExecutorService, Future, and CompletableFuture.</li>
          <li>Understand concurrent collections and BlockingQueue.</li>
          <li>Know the Java Memory Model and happens-before.</li>
          <li>Understand platform threads and virtual threads.</li>
          <li>Handle interruption and executor shutdown properly.</li>
        </ul>
      </section>
    </div>
  );
}
