import { useLocalStore } from "mobx-react-lite";

export default function useObservableState<T>(init: T | (() => T)): T {
  return useLocalStore(() => {
    if (typeof init === "function") {
      return (init as () => T)();
    } else {
      return init;
    }
  });
}
