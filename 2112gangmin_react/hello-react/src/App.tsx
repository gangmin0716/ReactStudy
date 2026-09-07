import "./App.css";
import { useState } from "react";

type OperationType = "add" | "reset";
type ButtonsProps = {
  updateCount: (type: OperationType) => void;
};

const Buttons = ({ updateCount }: ButtonsProps) => {
  return (
    <>
      <button onClick={() => updateCount("add")}>+</button>
      <button onClick={() => updateCount("reset")}>RESET</button>
    </>
  );
};

type CountProps = {
  count: number;
};

const Count = ({ count }: CountProps) => {
  return <h1>{count}</h1>;
};

const App = () => {
  const [count, setCount] = useState(0);
  const updateCount = (type: OperationType) => {
    if (type === "add") setCount(count + 1);
    else if (type === "reset") setCount(0);
  };

  return (
    <>
      <Count count={count} />
      <Buttons updateCount={updateCount} />
    </>
  );
};

export default App;
