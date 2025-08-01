/// <reference types="vite/client" />

declare module '*.css' {
  const content: string;
  export default content;
}

// Extender Window interface para requestIdleCallback
interface Window {
  requestIdleCallback?: (
    callback: (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void,
    opts?: { timeout: number }
  ) => number;
} 