import JavaLessonLayout from "./JavaLessonLayout";

export default function JavaInterviewLesson({ onBack }) {
  return (
    <JavaLessonLayout
      title={"Java Interview Questions"}
      overview={"Revise core Java by explaining each concept with an example, trade-off, and follow-up—not by memorizing one-line definitions."}
      sections={[
        { heading: "Core concepts", notes: ["JDK develops, JVM executes bytecode; Java is pass-by-value; String is immutable; overloading differs from overriding; List/Set/Map have different contracts"] },
        { heading: "OOP", notes: ["Encapsulation controls state; abstraction hides implementation; inheritance models is-a; polymorphism allows one contract to represent multiple implementations. Prefer composition for has-a"] },
        { heading: "Coding approach", notes: ["Clarify constraints, state brute force, optimize, explain time and auxiliary space, code clearly, dry-run, and test empty/single/duplicate/negative/overflow cases"] },
        { heading: "Interview patterns", notes: ["Know arrays, strings, HashMap/HashSet, sorting, binary search, recursion, stack, queue, trees and basic graph traversal"] }
      ]}
      practice={["Explain JDK, JVM and bytecode in 60 seconds.", "Implement frequency counting with HashMap and analyze complexity.", "Implement palindrome without reverse().", "Demonstrate overriding and runtime polymorphism.", "Solve Two Sum, binary search, valid parentheses, and merge two sorted arrays; explain edge cases.", "Record a 15-minute mock interview and list unclear answers."]}
      questions={[{ question: "Why is Java not fully object-oriented?", answer: "It has primitive types that are not objects.", followUp: "Wrapper classes provide object representations." }, { question: "final vs finally vs finalize?", answer: "final is a modifier; finally is an exception-handling block; finalize was deprecated and should not be relied on.", followUp: "Prefer try-with-resources." }, { question: "What is garbage collection?", answer: "JVM reclaims memory for objects that are no longer reachable; cleanup is not immediate or deterministic.", followUp: "GC does not guarantee external resource closure." }, { question: "What is a functional interface?", answer: "An interface with one abstract method, suitable for lambda expressions.", followUp: "It may still have default/static methods." }, { question: "How do you approach an unfamiliar problem?", answer: "Clarify inputs and constraints, give brute force, optimize, analyze complexity, code, dry-run and test edge cases.", followUp: "Communicate while solving." }]}
      onBack={onBack}
    />
  );
}
