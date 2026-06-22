import type { ReactElement } from "react";

import { Closure } from "./JSConcept/components/Closure/Closure";
import { TemporalDeadZone } from "./JSConcept/components/TemporalDeadZone/TemporalDeadZone";
import { Accessible } from "./ProblemsAndConcepts/components/Accessibility/Accessible";
import accessibleSource from "./ProblemsAndConcepts/components/Accessibility/Accessible.tsx?raw";
import accessibilityFormSource from "./ProblemsAndConcepts/components/Accessibility/Form.tsx?raw";
import accessibilityModalSource from "./ProblemsAndConcepts/components/Accessibility/Modal.tsx?raw";
import ListLoader from "./ProblemsAndConcepts/components/InfiniteScrolling/ListLoader";
import infiniteScrollNote from "./ProblemsAndConcepts/components/InfiniteScrolling/Readme.md?raw";
import infiniteScrollSource from "./ProblemsAndConcepts/components/InfiniteScrolling/ListLoader.tsx?raw";
import infiniteHooksSource from "./ProblemsAndConcepts/components/InfiniteScrolling/hooks.ts?raw";
import { ProgressBar } from "./ProblemsAndConcepts/components/ProgressBar/ProgressBar";
import progressBarSource from "./ProblemsAndConcepts/components/ProgressBar/ProgressBar.tsx?raw";
import { TodoList } from "./ProblemsAndConcepts/components/TodoList/TodoList";
import todoListSource from "./ProblemsAndConcepts/components/TodoList/TodoList.tsx?raw";
import { VirtualizedContainer } from "./ProblemsAndConcepts/components/VirtualizedList/VirtualizedContainer";
import virtualizedContainerSource from "./ProblemsAndConcepts/components/VirtualizedList/VirtualizedContainer.tsx?raw";
import virtualizedListSource from "./ProblemsAndConcepts/components/VirtualizedList/VirtualizedList.tsx?raw";
import WebSocket from "./ProblemsAndConcepts/components/WebSocket/WebSocket";
import webSocketNote from "./ProblemsAndConcepts/components/WebSocket/ReadMe.md?raw";
import webSocketSource from "./ProblemsAndConcepts/components/WebSocket/WebSocket.tsx?raw";
import webSocketBasicSource from "./ProblemsAndConcepts/components/WebSocket/WebSocketBasic.tsx?raw";
import webSocketStatesSource from "./ProblemsAndConcepts/components/WebSocket/WebSocketStates.tsx?raw";
import webSocketTutorialSource from "./ProblemsAndConcepts/components/WebSocket/WebSocketTutorial.tsx?raw";
import webSocketTutorialCssSource from "./ProblemsAndConcepts/components/WebSocket/WebSocketTutorial.css?raw";
import closureSource from "./JSConcept/components/Closure/Closure.tsx?raw";
import temporalDeadZoneSource from "./JSConcept/components/TemporalDeadZone/TemporalDeadZone.tsx?raw";

export type LabSection = {
  id: string;
  title: string;
};

export type LabCodeFile = {
  label: string;
  language: string;
  content: string;
};

export type LabItem = {
  id: string;
  sectionId: string;
  title: string;
  kind: "note" | "concept" | "practice";
  summary: string;
  focus: string[];
  note?: string;
  instructions?: string[];
  codeFiles: LabCodeFile[];
  preview?: ReactElement;
};

export const labSections: LabSection[] = [
  {
    id: "notes",
    title: "Personal Notes",
  },
  {
    id: "concepts",
    title: "Concepts",
  },
  {
    id: "practice",
    title: "Practice",
  },
];

export const labItems: LabItem[] = [
  {
    id: "websocket-note",
    sectionId: "notes",
    title: "WebSocket chat flow",
    kind: "note",
    summary:
      "A detailed walkthrough of how a realtime chat system behaves from connection to message delivery.",
    focus: ["websocket", "realtime", "architecture"],
    note: webSocketNote,
    codeFiles: [
      { label: "WebSocket.tsx", language: "tsx", content: webSocketSource },
      { label: "WebSocketBasic.tsx", language: "tsx", content: webSocketBasicSource },
      { label: "WebSocketStates.tsx", language: "tsx", content: webSocketStatesSource },
      { label: "WebSocketTutorial.tsx", language: "tsx", content: webSocketTutorialSource },
      { label: "WebSocketTutorial.css", language: "css", content: webSocketTutorialCssSource },
    ],
    preview: <WebSocket />,
  },
  {
    id: "infinite-scroll-note",
    sectionId: "notes",
    title: "Infinite scrolling math",
    kind: "note",
    summary:
      "A personal explanation of viewport, content height, buffer logic, and why prefetch distance matters.",
    focus: ["performance", "scroll", "ux"],
    note: infiniteScrollNote,
    codeFiles: [
      { label: "ListLoader.tsx", language: "tsx", content: infiniteScrollSource },
      { label: "hooks.ts", language: "ts", content: infiniteHooksSource },
    ],
    preview: <ListLoader />,
  },
  {
    id: "temporal-dead-zone",
    sectionId: "concepts",
    title: "Temporal Dead Zone",
    kind: "concept",
    summary:
      "A compact demonstration of hoisting behavior and the difference between let, const, and var.",
    focus: ["javascript", "hoisting", "fundamentals"],
    note:
      "This concept demo stays intentionally small. It is the kind of focused practice that helps turn interview topics into concrete behavior you can explain clearly.",
    codeFiles: [{ label: "TemporalDeadZone.tsx", language: "tsx", content: temporalDeadZoneSource }],
    preview: <TemporalDeadZone />,
  },
  {
    id: "closure",
    sectionId: "concepts",
    title: "Closure basics",
    kind: "concept",
    summary:
      "A small reminder of lexical scope and why closures keep access to variables beyond the original call stack.",
    focus: ["javascript", "closure", "scope"],
    note:
      "This is a simple refresher note, useful for explaining interviews and real component logic where values stay available through nested functions.",
    codeFiles: [{ label: "Closure.tsx", language: "tsx", content: closureSource }],
    preview: <Closure />,
  },
  {
    id: "accessibility",
    sectionId: "practice",
    title: "Accessibility practice",
    kind: "practice",
    summary:
      "Accessible forms and modal work packaged as a simple practice lab instead of a disconnected component.",
    focus: ["accessibility", "forms", "ui"],
    note:
      "This practice area is valuable because it covers keyboard behavior, modal focus management, and the kind of details that separate okay UI from reliable UI.",
    instructions: [
      "Start with the form and try moving only with the Tab key.",
      "Type an invalid email and confirm the inline feedback appears.",
      "Open the modal and test focus order with Tab and Shift+Tab.",
      "Press Escape to close the modal and confirm focus returns to the trigger button.",
    ],
    codeFiles: [
      { label: "Accessible.tsx", language: "tsx", content: accessibleSource },
      { label: "Form.tsx", language: "tsx", content: accessibilityFormSource },
      { label: "Modal.tsx", language: "tsx", content: accessibilityModalSource },
    ],
    preview: <Accessible />,
  },
  {
    id: "progress-bar",
    sectionId: "practice",
    title: "Progress bar",
    kind: "practice",
    summary:
      "A lightweight UI building block shown here as a reusable implementation exercise.",
    focus: ["ui", "component", "visual-feedback"],
    note:
      "Small components like this are useful because they show how a visual requirement turns into a clean, reusable piece of UI.",
    codeFiles: [{ label: "ProgressBar.tsx", language: "tsx", content: progressBarSource }],
    preview: <ProgressBar mainColor="#cbd5e1" progressBarColor="#0f172a" />,
  },
  {
    id: "todo-list",
    sectionId: "practice",
    title: "Todo list logic",
    kind: "practice",
    summary:
      "A common interview-style UI exercise that still helps demonstrate state updates and interaction design.",
    focus: ["state", "crud", "react"],
    note:
      "This kind of practice remains useful because simple interfaces reveal how state is modeled, updated, and rendered over time.",
    codeFiles: [{ label: "TodoList.tsx", language: "tsx", content: todoListSource }],
    preview: <TodoList />,
  },
  {
    id: "virtualized-list",
    sectionId: "practice",
    title: "Virtualized list",
    kind: "practice",
    summary:
      "A rendering exercise focused on scaling list UIs more safely when item counts get large.",
    focus: ["performance", "rendering", "lists"],
    note:
      "This lab fits well in a frontend practice area because it connects UI rendering with performance trade-offs and user experience.",
    codeFiles: [
      { label: "VirtualizedContainer.tsx", language: "tsx", content: virtualizedContainerSource },
      { label: "VirtualizedList.tsx", language: "tsx", content: virtualizedListSource },
    ],
    preview: <VirtualizedContainer />,
  },
];
