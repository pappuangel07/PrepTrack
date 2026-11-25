

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
    title: "1. What is multithreading?",
    content: (
      <>
        <p>
          A thread is a small unit of execution inside a process.
          Multithreading allows multiple threads to execute within
          the same process.
        </p>
        <p>
          Threads share process resources such as heap memory, but
          each thread has its own stack and execution state.
        </p>
        <ul>
          <li>Process: a running program.</li>
          <li>Thread: an execution path inside a process.</li>
          <li>Concurrency: multiple tasks make progress during overlapping time.</li>
          <li>Parallelism: multiple tasks execute at the same instant on different cores.</li>
        </ul>
      </>
    ),
    code: `// Example tasks:
// Thread 1 -> download a file
// Thread 2 -> update the UI
// Thread 3 -> process data

// Threads can overlap their execution.
// Actual parallel execution depends on
// available CPU cores and scheduling.`,
  },
  {
    title: "2. Why use multithreading?",
    content: (
      <>
        <p>Multithreading can help with:</p>
        <ul>
          <li>Keeping applications responsive.</li>
          <li>Handling multiple client requests.</li>
          <li>Running background tasks.</li>
          <li>Overlapping I/O operations.</li>
          <li>Using multiple CPU cores for suitable work.</li>
        </ul>
        <p>
          More threads do not automatically mean faster execution.
          Too many threads can increase context switching and memory use.
        </p>
      </>
    ),
    code: `// Single-threaded idea:
downloadFile();
processFile();
saveFile();

// Multithreaded idea:
// Start download task
// Start another independent task
// Coordinate when results are needed`,
  },
  {
    title: "3. Creating a thread by extending Thread",
    content: (
      <>
        <p>
          One way to create a thread is to extend the Thread class
          and override its run() method.
        </p>
        <p>
          Call start() to ask the JVM to start a new thread.
          The new thread then executes run().
        </p>
      </>
    ),
    code: `class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread is running");
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread t = new MyThread();
        t.start();
    }
}`,
  },
  {
    title: "4. start() vs run()",
    content: (
      <>
        <p>
          This is one of the most important multithreading interview
          questions.
        </p>
        <ul>
          <li>start(): starts a new thread of execution.</li>
          <li>run(): contains the task's code.</li>
        </ul>
        <p>
          Calling run() directly is just a normal method call.
          It does not create a new thread.
        </p>
        <p>
          A Thread object can be started only once. Starting it again
          throws IllegalThreadStateException.
        </p>
      </>
    ),
    code: `Thread t = new Thread(() -> {
    System.out.println(
        Thread.currentThread().getName()
    );
});

t.run();   // Runs in the current thread
t.start(); // Starts a new thread`,
  },
  {
    title: "5. Creating a thread using Runnable",
    content: (
      <>
        <p>
          Runnable represents a task that can be executed by a thread.
        </p>
        <p>
          Implementing Runnable is usually more flexible than extending
          Thread because your class can still extend another class.
        </p>
      </>
    ),
    code: `class MyTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Task running");
    }
}

public class Main {
    public static void main(String[] args) {
        MyTask task = new MyTask();

        Thread t = new Thread(task);
        t.start();
    }
}`,
  },
  {
    title: "6. Runnable using lambda",
    content: (
      <>
        <p>
          Runnable is a functional interface because it has one
          abstract method: run().
        </p>
        <p>
          Therefore, it can be implemented using a lambda expression.
        </p>
      </>
    ),
    code: `Thread t = new Thread(() -> {
    System.out.println("Hello from thread");
});

t.start();

// Equivalent task form:
Runnable task = () -> {
    System.out.println("Task executed");
};

new Thread(task).start();`,
  },
  {
    title: "7. Thread names and current thread",
    content: (
      <>
        <p>
          Thread.currentThread() returns the currently executing thread.
        </p>
        <p>
          Thread names are useful when debugging concurrent programs.
        </p>
      </>
    ),
    code: `Thread t = new Thread(() -> {
    Thread current = Thread.currentThread();

    System.out.println(current.getName());
    System.out.println(current.getId());
});

t.setName("Worker-1");
t.start();

System.out.println(
    Thread.currentThread().getName()
);`,
  },
  {
    title: "8. Thread.sleep()",
    content: (
      <>
        <p>
          sleep() pauses the current thread for a specified time.
        </p>
        <p>
          It is a static method of Thread.
        </p>
        <p>
          sleep() does not release any monitor lock currently held
          by the thread.
        </p>
        <p>
          It can throw InterruptedException.
        </p>
      </>
    ),
    code: `try {
    Thread.sleep(1000);
    System.out.println("After 1 second");
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}

// sleep() pauses the current thread.
// It does not guarantee exact timing.`,
  },
  {
    title: "9. join()",
    content: (
      <>
        <p>
          join() makes the current thread wait for another thread
          to finish.
        </p>
        <p>
          It is useful when one task depends on the result of another.
        </p>
      </>
    ),
    code: `Thread t = new Thread(() -> {
    System.out.println("Worker started");
});

t.start();

try {
    t.join();
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}

System.out.println("Worker finished");`,
  },
  {
    title: "10. Thread lifecycle",
    content: (
      <>
        <p>Java defines these Thread.State values:</p>
        <ul>
          <li>NEW: thread object created, not started.</li>
          <li>RUNNABLE: eligible to run or currently running.</li>
          <li>BLOCKED: waiting to acquire a monitor lock.</li>
          <li>WAITING: waiting indefinitely for another action.</li>
          <li>TIMED_WAITING: waiting for a limited time.</li>
          <li>TERMINATED: execution has finished.</li>
        </ul>
        <p>
          Java's RUNNABLE state includes both ready-to-run and
          actually-running situations.
        </p>
      </>
    ),
    code: `Thread t = new Thread(() -> {
    System.out.println("Working");
});

System.out.println(t.getState()); // NEW

t.start();

System.out.println(t.getState());

// After run() completes:
// TERMINATED`,
  },
  {
    title: "11. Thread priority",
    content: (
      <>
        <p>
          Java thread priorities range from 1 to 10.
        </p>
        <ul>
          <li>MIN_PRIORITY = 1</li>
          <li>NORM_PRIORITY = 5</li>
          <li>MAX_PRIORITY = 10</li>
        </ul>
        <p>
          Priority is only a scheduling hint. Do not depend on it
          for correctness or guaranteed execution order.
        </p>
      </>
    ),
    code: `Thread t = new Thread(() -> {
    System.out.println("Running");
});

t.setPriority(Thread.MAX_PRIORITY);
t.start();`,
  },
  {
    title: "12. Race condition",
    content: (
      <>
        <p>
          A race condition happens when the result depends on the
          unpredictable timing of multiple threads accessing shared data.
        </p>
        <p>
          The statement count++ is not one indivisible operation.
          It involves reading, incrementing, and writing.
        </p>
      </>
    ),
    code: `class Counter {
    int count = 0;

    void increment() {
        count++;
    }
}

// If two threads call increment()
// concurrently, updates can be lost.

// Expected after 2,000 increments:
// 2000

// Possible unsynchronized result:
// less than 2000`,
  },
  {
    title: "13. synchronized method",
    content: (
      <>
        <p>
          synchronized allows only one thread at a time to execute
          a synchronized instance method on the same object monitor.
        </p>
        <p>
          The lock is released when the synchronized method exits,
          including when it exits due to an exception.
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
    title: "14. synchronized block",
    content: (
      <>
        <p>
          A synchronized block protects only the code inside the block.
        </p>
        <p>
          Use a dedicated lock object when possible. This makes the
          locking intention clearer.
        </p>
      </>
    ),
    code: `class Counter {
    private int count = 0;
    private final Object lock = new Object();

    void increment() {
        synchronized (lock) {
            count++;
        }
    }

    int getCount() {
        synchronized (lock) {
            return count;
        }
    }
}`,
  },
  {
    title: "15. Static synchronized",
    content: (
      <>
        <p>
          A static synchronized method locks the Class object
          associated with the class.
        </p>
        <p>
          An instance synchronized method locks the current object.
          These are different monitors.
        </p>
      </>
    ),
    code: `class Example {
    static synchronized void staticTask() {
        // Locks Example.class
    }

    synchronized void instanceTask() {
        // Locks this object
    }
}`,
  },
  {
    title: "16. AtomicInteger",
    content: (
      <>
        <p>
          AtomicInteger provides atomic operations on an integer
          value without using synchronized for each operation.
        </p>
        <p>
          It is useful for simple shared counters.
        </p>
        <p>
          Atomic operations do not automatically make a group of
          multiple operations atomic.
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
    title: "17. volatile",
    content: (
      <>
        <p>
          volatile provides visibility and ordering guarantees for
          reads and writes of a variable across threads.
        </p>
        <p>
          It does not make compound operations such as count++
          atomic.
        </p>
        <p>
          Use volatile for suitable shared state, not as a replacement
          for every synchronization mechanism.
        </p>
      </>
    ),
    code: `class Worker {
    private volatile boolean running = true;

    void stopWorker() {
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
    title: "18. wait() and notify()",
    content: (
      <>
        <p>
          wait(), notify(), and notifyAll() are methods of Object.
        </p>
        <ul>
          <li>wait(): releases the monitor and waits.</li>
          <li>notify(): wakes one waiting thread.</li>
          <li>notifyAll(): wakes all threads waiting on that monitor.</li>
        </ul>
        <p>
          These methods must be called while owning the same object's
          monitor. Otherwise, IllegalMonitorStateException occurs.
        </p>
        <p>
          Always check the condition in a loop because a thread may
          wake up without the condition being true.
        </p>
      </>
    ),
    code: `class Shared {
    private boolean ready = false;

    synchronized void waitForReady()
            throws InterruptedException {
        while (!ready) {
            wait();
        }
    }

    synchronized void makeReady() {
        ready = true;
        notifyAll();
    }
}`,
  },
  {
    title: "19. Deadlock",
    content: (
      <>
        <p>
          Deadlock occurs when threads wait forever for locks held
          by one another.
        </p>
        <p>
          A common example is two threads acquiring two locks
          in opposite orders.
        </p>
        <p>
          Prevention strategies:
        </p>
        <ul>
          <li>Acquire locks in a consistent global order.</li>
          <li>Avoid unnecessary nested locks.</li>
          <li>Use timed lock attempts where appropriate.</li>
          <li>Keep synchronized sections small.</li>
        </ul>
      </>
    ),
    code: `// Thread 1:
// synchronized (lockA) {
//     synchronized (lockB) { }
// }

// Thread 2:
// synchronized (lockB) {
//     synchronized (lockA) { }
// }

// Opposite lock order can cause deadlock.`,
  },
  {
    title: "20. Thread interruption",
    content: (
      <>
        <p>
          Interruption is a cooperative way to request that a thread
          stop or cancel its work.
        </p>
        <p>
          Calling interrupt() does not forcibly kill the thread.
        </p>
        <p>
          If a thread is blocked in sleep(), wait(), or join(),
          interruption typically causes InterruptedException.
        </p>
      </>
    ),
    code: `Thread worker = new Thread(() -> {
    try {
        while (!Thread.currentThread().isInterrupted()) {
            // Do work
        }
    } finally {
        System.out.println("Cleanup");
    }
});

worker.start();
worker.interrupt();`,
  },
  {
    title: "21. ExecutorService",
    content: (
      <>
        <p>
          Creating a new Thread for every task is not always efficient.
          ExecutorService manages task execution using a thread pool.
        </p>
        <p>
          A thread pool reuses worker threads for multiple tasks.
        </p>
        <p>
          Shut down the executor when it is no longer needed.
        </p>
      </>
    ),
    code: `import java.util.concurrent.*;

ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.submit(() -> {
    System.out.println("Task 1");
});

executor.submit(() -> {
    System.out.println("Task 2");
});

executor.shutdown();`,
  },
  {
    title: "22. Callable and Future",
    content: (
      <>
        <p>
          Runnable tasks do not return a result.
        </p>
        <p>
          Callable can return a value and throw checked exceptions.
          Future represents the result of an asynchronous computation.
        </p>
        <p>
          Future.get() waits for the result if it is not ready yet.
        </p>
      </>
    ),
    code: `import java.util.concurrent.*;

ExecutorService executor =
    Executors.newSingleThreadExecutor();

Callable<Integer> task = () -> 10 + 20;

Future<Integer> future = executor.submit(task);

try {
    System.out.println(future.get());
} catch (Exception e) {
    System.out.println("Task failed");
} finally {
    executor.shutdown();
}`,
  },
  {
    title: "23. CompletableFuture basics",
    content: (
      <>
        <p>
          CompletableFuture supports asynchronous computation
          and chaining operations.
        </p>
        <p>
          It is useful when one task's result is transformed or
          combined with another task's result.
        </p>
      </>
    ),
    code: `import java.util.concurrent.CompletableFuture;

CompletableFuture<Integer> future =
    CompletableFuture.supplyAsync(() -> 10)
        .thenApply(value -> value * 2);

future.thenAccept(System.out::println);

// Output: 20`,
  },
  {
    title: "24. Thread safety",
    content: (
      <>
        <p>
          A class is thread-safe when it behaves correctly under
          concurrent access according to its contract.
        </p>
        <p>
          Common approaches:
        </p>
        <ul>
          <li>Immutability.</li>
          <li>Synchronization.</li>
          <li>Atomic variables.</li>
          <li>Thread confinement.</li>
          <li>Concurrent collections.</li>
        </ul>
        <p>
          A class is not automatically thread-safe just because
          its methods are individually synchronized.
        </p>
      </>
    ),
    code: `// Immutable objects are often easier
// to share safely.

final class Point {
    private final int x;
    private final int y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}`,
  },
  {
    title: "25. Concurrent collections",
    content: (
      <>
        <p>
          Java provides concurrent collections for safe concurrent
          access in common use cases.
        </p>
        <ul>
          <li>ConcurrentHashMap</li>
          <li>CopyOnWriteArrayList</li>
          <li>BlockingQueue</li>
        </ul>
        <p>
          Choose a collection based on the access pattern. A
          thread-safe collection does not make every multi-step
          operation automatically atomic.
        </p>
      </>
    ),
    code: `import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

ConcurrentMap<String, Integer> map =
    new ConcurrentHashMap<>();

map.put("Java", 1);
map.putIfAbsent("DSA", 2);

System.out.println(map.get("Java"));`,
  },
  {
    title: "26. Producer-consumer pattern",
    content: (
      <>
        <p>
          Producer-consumer is a common concurrency pattern.
        Producers create tasks or data. Consumers process them.
        </p>
        <p>
          BlockingQueue provides thread-safe communication and
          can block producers or consumers when appropriate.
        </p>
      </>
    ),
    code: `import java.util.concurrent.*;

BlockingQueue<String> queue =
    new ArrayBlockingQueue<>(5);

// Producer:
queue.put("Task");

// Consumer:
String task = queue.take();

// put() waits if full.
// take() waits if empty.`,
  },
  {
    title: "27. Common mistakes",
    content: (
      <>
        <ul>
          <li>Calling run() instead of start().</li>
          <li>Starting the same Thread object twice.</li>
          <li>Assuming thread execution order is fixed.</li>
          <li>Sharing mutable data without synchronization.</li>
          <li>Assuming volatile makes count++ atomic.</li>
          <li>Calling wait() without owning the monitor.</li>
          <li>Using sleep() as a synchronization strategy.</li>
          <li>Ignoring InterruptedException.</li>
          <li>Forgetting to shut down an ExecutorService.</li>
          <li>Creating too many threads unnecessarily.</li>
        </ul>
      </>
    ),
    code: `// Bad assumption:
t1.start();
t2.start();
// Does not guarantee t1 finishes first.

// If ordering matters, use coordination:
// join(), locks, futures, or queues.`,
  },
  {
    title: "28. Practice problems",
    content: (
      <>
        <ol>
          <li>Create two threads that print different messages.</li>
          <li>Print numbers using a thread.</li>
          <li>Use join() to wait for a worker.</li>
          <li>Create a shared counter and fix its race condition.</li>
          <li>Compare synchronized and AtomicInteger.</li>
          <li>Use interruption to stop a worker cooperatively.</li>
          <li>Execute tasks using a fixed thread pool.</li>
          <li>Use Callable to calculate and return a result.</li>
          <li>Build a producer-consumer program with BlockingQueue.</li>
          <li>Identify and prevent a deadlock scenario.</li>
        </ol>
      </>
    ),
    code: `// Practice: safe counter

import java.util.concurrent.atomic.AtomicInteger;

AtomicInteger counter = new AtomicInteger();

Runnable task = () -> {
    for (int i = 0; i < 1000; i++) {
        counter.incrementAndGet();
    }
};

// Start two threads using task.
// Wait for both to finish.
// Expected result: 2000`,
  },
  {
    title: "29. Interview questions",
    content: (
      <>
        <ol>
          <li>What is a thread?</li>
          <li>Process vs thread?</li>
          <li>Concurrency vs parallelism?</li>
          <li>start() vs run()?</li>
          <li>Thread vs Runnable?</li>
          <li>What are the thread states?</li>
          <li>What is a race condition?</li>
          <li>What does synchronized do?</li>
          <li>What is a monitor lock?</li>
          <li>What is the difference between wait() and sleep()?</li>
          <li>What does volatile guarantee?</li>
          <li>What is deadlock?</li>
          <li>What is thread interruption?</li>
          <li>What is ExecutorService?</li>
          <li>Runnable vs Callable?</li>
          <li>What is Future?</li>
          <li>What is a thread pool?</li>
          <li>What is thread safety?</li>
          <li>What is producer-consumer?</li>
          <li>Why use concurrent collections?</li>
        </ol>
      </>
    ),
    code: `// Quick revision:
Thread -> execution
Runnable -> task
start() -> new thread execution
synchronized -> mutual exclusion + visibility
volatile -> visibility + ordering
AtomicInteger -> atomic integer operations
ExecutorService -> task management
Callable -> task with result
Future -> represents async result`,
  },
];

export default function MultithreadingLesson({ onBack }) {
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
        Java Multithreading
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn how Java runs multiple tasks, manages thread execution,
        protects shared data, and supports asynchronous programming.
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
          <li>I understand threads, processes, concurrency, and parallelism.</li>
          <li>I can create threads using Thread and Runnable.</li>
          <li>I know start() vs run() and thread lifecycle states.</li>
          <li>I understand race conditions and synchronization.</li>
          <li>I can explain volatile, atomic variables, and locks.</li>
          <li>I understand wait(), notify(), and deadlocks.</li>
          <li>I can use ExecutorService, Callable, and Future.</li>
          <li>I understand thread safety and concurrent collections.</li>
          <li>I can solve the practice problems independently.</li>
        </ul>
      </section>
    </div>
  );
}
