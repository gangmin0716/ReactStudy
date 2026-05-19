import { useState, useRef } from "react";

function Body() {
  const [text, setText] = useState("");
  const textRef = useRef();

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleOnClick = () => {
    if (text.length < 5) {
      textRef.current.focus()
    } else {
      alert(text)
      setText("");
    }
  };

  return (
    <>
      <input ref={textRef} value={text} onChange={handleOnChange} />
      <button onClick={handleOnClick}>작성 완료</button>
    </>
  );
}

export default Body;
