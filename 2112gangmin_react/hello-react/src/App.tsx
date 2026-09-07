import { useState, type ChangeEvent } from "react";
export default function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState<string>("");
  const onClickAdd = () => {
    if (todo.length > 0) {
      setTodos([...todos, todo]);
    }
    setTodo("");
  };
  const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  const onClickReset = () => {
    setTodos([]);
  };
  return (
    <>
      <input value={todo} onChange={onChangeTodo} />
      <button onClick={onClickAdd}>Add</button>
      <ul>
        {todos.map(it => (
          <li key={it}>{it}</li>
        ))}
      </ul>
      <button onClick={onClickReset}>Resemara</button>
    </>
  );
}
