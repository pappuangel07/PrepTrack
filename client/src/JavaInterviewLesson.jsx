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


practice={[
  {
    question: "Explain JDK, JVM and bytecode in 60 seconds.",
    answer:
      "JDK (Java Development Kit) contains the tools required to develop Java applications, including the Java compiler. JVM (Java Virtual Machine) executes Java bytecode. Bytecode is the platform-independent intermediate code generated when Java source code is compiled.",
    explanation:
      "Java source code (.java) is compiled by javac into bytecode (.class). The JVM loads, verifies and executes this bytecode. This is why Java bytecode can run on different operating systems that have a compatible JVM."
  },
  {
    question: "Implement frequency counting using HashMap and analyze its complexity.",
    answer:
      "Use a HashMap to store each number as a key and its frequency as the value.",
    code: `import java.util.HashMap;

class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 2, 3, 1, 2};

        HashMap<Integer, Integer> frequency = new HashMap<>();

        for (int num : arr) {
            frequency.put(
                num,
                frequency.getOrDefault(num, 0) + 1
            );
        }

        System.out.println(frequency);
    }
}`,
    explanation:
      "getOrDefault(num, 0) returns the existing count or 0 if the number is not present. Average time complexity is O(n), and space complexity is O(k), where k is the number of distinct elements."
  },
  {
    question: "Implement palindrome checking without using reverse().",
    answer:
      "Use two pointers: one at the beginning and one at the end. Compare the characters and move the pointers inward.",
    code: `class Main {
    public static boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("madam"));
        System.out.println(isPalindrome("hello"));
    }
}`,
    explanation:
      "If any pair of characters differs, the string is not a palindrome. Time complexity is O(n) and extra space complexity is O(1). This version is case-sensitive and does not ignore spaces or punctuation."
  },
  {
    question: "Demonstrate method overriding and runtime polymorphism.",
    answer:
      "Method overriding happens when a child class provides its own implementation of a method inherited from the parent class. Runtime polymorphism means the overridden method is selected based on the actual object.",
    code: `class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();
        animal.sound();
    }
}`,
    explanation:
      "Although the reference type is Animal, the actual object is Dog. Therefore, Dog's sound() method executes at runtime."
  },
  {
    question: "Solve Two Sum, binary search, valid parentheses and merge two sorted arrays. Explain edge cases.",
    answer:
      "Two Sum: use a HashMap to find the complement in average O(n) time. Binary Search: repeatedly halve the search range in O(log n) time on a sorted array. Valid Parentheses: use a stack to match opening and closing brackets in O(n) time. Merge Sorted Arrays: use two pointers to merge in O(m+n) time.",
    explanation:
      "Test empty inputs, one element, duplicate values, missing targets, target at the first or last position, mismatched brackets, different array lengths and arrays containing negative numbers. For binary search, the input must be sorted."
  },
  {
    question: "Conduct a 15-minute mock interview and identify unclear answers.",
    answer:
      "This is a practice activity, not a question with one fixed answer. Complete a mock interview and evaluate your performance.",
    explanation:
      "Check whether you clarified the problem, explained your approach, discussed brute force and optimization, stated time and space complexity, wrote correct code, tested edge cases and communicated clearly."
  }
]}


      onBack={onBack}
    />
  );
}
