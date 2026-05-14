import { useState } from "react";

const Body = () => {
  const [text, setText] = useState("");
  const handleOnChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div>
      <input value={text} onChange={handleOnChange} />
      <div>입력한 글자: {text}</div>
    </div>
  );
};

export default Body;
