import { useState } from "react";

// use useState like synchronous
export default function useAsyncStateNumber(initialValue: number) {
  const [value, setValue] = useState(initialValue);
  const setter = (x: number) =>
    new Promise((resolve) => {
      setValue(x);
      resolve(x);
    });
  return { value, setter };
  // cannot return [value, setter] because each return type of two can't match the type of itself
}

// for example //
// const [count, setCount] = useAsyncState(0);
// function increment() {
//     const newCount = count + 1;
//     setCount(newCount);
// }
