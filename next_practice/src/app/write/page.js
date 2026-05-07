"use client";
import { useState } from "react";

const Write = () => {
  const [input, setInput] = useState("");
  return (
    <div>
      <h4>글작성</h4>
      <form action="/api/write" method="POST">
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          name="title"
        />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
};

export default Write;
