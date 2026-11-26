
import JavaIntroductionLesson from "./JavaIntroductionLesson";
import InputOutputLesson from "./InputOutputLesson";
import ConditionalStatementsLesson from "./ConditionalStatementsLesson";
import VariablesDataTypesLesson from "./VariablesDataTypesLesson";
import OperatorsControlLesson from "./OperatorsControlLesson";
import LoopsLesson from "./LoopsLesson";
import MethodsLesson from "./MethodsLesson";
import ArraysStringsLesson from "./ArraysStringsLesson";
import OOPLesson from "./OOPLesson";
import ExceptionHandlingLesson from "./ExceptionHandlingLesson";
import CollectionsLesson from "./CollectionsLesson";
import GenericsLesson from "./GenericsLesson";
import FileHandlingLesson from "./FileHandlingLesson";
import MultithreadingLesson from "./MultithreadingLesson";
import LambdaStreamsLesson from "./LambdaStreamsLesson";
import RecursionLesson from "./RecursionLesson";
import TimeComplexityLesson from "./TimeComplexityLesson";
import JavaAdvancedCodingPracticeLesson from "./JavaAdvancedCodingPracticeLesson";
import JavaInterviewLesson from "./JavaInterviewLesson";
import JavaWrapperClassesLesson from "./JavaWrapperClassesLesson";
import JavaArchitectureLesson from "./JavaArchitectureLesson";
import JavaBuildToolsLesson from "./JavaBuildToolsLesson";
import JavaJVMInternalsLesson from "./JavaJVMInternalsLesson";
import JVMLesson from "./JVMLesson";
import JavaSerializationLesson from "./JavaSerializationLesson";
import JavaRestApiLesson from "./JavaRestApiLesson";
import JavaSecurityLesson from "./JavaSecurityLesson";
import JavaInterviewPreparationLesson from "./JavaInterviewPreparationLesson";
import JavaCodingPatternsLesson from "./JavaCodingPatternsLesson";
import JavaArraysStringsPracticeLesson from "./JavaArraysStringsPracticeLesson";
import JavaLinkedListPracticeLesson from "./JavaLinkedListPracticeLesson";
import JDBCLesson from "./JDBCLESSON.jsx";
import JUnitLesson from "./JUnitLesson";
import LoggingLesson from "./LoggingLesson";
import MemoryManagementLesson from "./MemoryManagementLesson";
import ModulesLesson from "./ModulesLesson";
import NetworkingLesson from "./NetworkingLesson";
import PerformanceTuningLesson from "./PerformanceTuningLesson";
import ReflectionAnnotationsLesson from "./ReflectionAnnotationsLesson";

const lessonMap = {
  "java introduction": JavaIntroductionLesson,
  "input and output": InputOutputLesson,
  "conditional statements": ConditionalStatementsLesson,
  "variables and data types": VariablesDataTypesLesson,
  "operators and control statements": OperatorsControlLesson,
  "loops": LoopsLesson,
  "methods": MethodsLesson,
  "arrays and strings": ArraysStringsLesson,
  "oop": OOPLesson,
  "exception handling": ExceptionHandlingLesson,
  "collections framework": CollectionsLesson,
  "generics": GenericsLesson,
  "file handling": FileHandlingLesson,
  "multithreading": MultithreadingLesson,
  "lambda expressions": LambdaStreamsLesson,
  "stream api": LambdaStreamsLesson,
  "recursion": RecursionLesson,
  "time and space complexity": TimeComplexityLesson,
  "java coding practice": JavaAdvancedCodingPracticeLesson,
  "java interview questions": JavaInterviewLesson,
  "wrapper classes and autoboxing": JavaWrapperClassesLesson,
    "java architecture": JavaArchitectureLesson,
  "java build tools": JavaBuildToolsLesson,
  "jvm internals": JavaJVMInternalsLesson,
  "jvm": JVMLesson,
  "java serialization": JavaSerializationLesson,
  "java rest api": JavaRestApiLesson,
  "java security": JavaSecurityLesson,
  "java interview preparation": JavaInterviewPreparationLesson,
  "java coding patterns": JavaCodingPatternsLesson,
  "java arrays and strings practice": JavaArraysStringsPracticeLesson,
  "java linked list practice": JavaLinkedListPracticeLesson,
  "jdbc": JDBCLesson,
  "junit": JUnitLesson,
  "logging": LoggingLesson,
  "memory management": MemoryManagementLesson,
  "java modules": ModulesLesson,
  "java networking": NetworkingLesson,
  "performance tuning": PerformanceTuningLesson,
  "reflection and annotations": ReflectionAnnotationsLesson,
};

const aliases = {
  "java fundamentals": "java introduction",
  "java basics": "java introduction",
  "introduction to java": "java introduction",
  "variables": "variables and data types",
  "data types": "variables and data types",
  "operators": "operators and control statements",
  "control statements": "operators and control statements",
  "functions": "methods",
  "methods and functions": "methods",
  "arrays": "arrays and strings",
  "strings": "arrays and strings",
  "classes and objects": "oop",
  "encapsulation": "oop",
  "inheritance": "oop",
  "polymorphism": "oop",
  "abstraction and interfaces": "oop",
  "collections": "collections framework",
  "java collections": "collections framework",
  "threads": "multithreading",
  "multithreading basics": "multithreading",
};

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export default function JavaLesson({ topic, onBack }) {
  const normalized = normalize(topic);
  const resolved = aliases[normalized] || normalized;
  const LessonComponent = lessonMap[resolved];

  if (!LessonComponent) {
    console.error(
      "[JavaLesson] Topic not mapped:",
      topic,
      "| normalized:",
      normalized
    );

    return (
      <div className="java-lesson-page">
        <button
          type="button"
          className="java-lesson-back"
          onClick={onBack}
        >
          ← Back to Java Topics
        </button>

        <h2>Lesson Not Available</h2>
        <p>
          No lesson is currently mapped for:
          <strong> {topic}</strong>
        </p>
      </div>
    );
  }

  return <LessonComponent onBack={onBack} />;
}
