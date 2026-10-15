import { useState, useEffect } from "react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
}
const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    fetch("/json/todos.json")
      .then((result) => {
        return result.json();
      })
      .then((json: Todo[]) => {
        setTodos(json);
      })
  }, []);
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key = {todo.id}>
            {todo.title} - {todo.completed ? '완료' : '미완료'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList