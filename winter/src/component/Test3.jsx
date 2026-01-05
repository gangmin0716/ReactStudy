import { useState } from "react";

const Test3 = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const onChange = (e) => {
    setText(e.target.value)
  };

  const onClick = (e) => {
    setList([...list, e])
    setText("")
  }
  return (
    <>
      <input type="text" placeholder="내용 입력" value={text} onChange={onChange} style={{ border: "1px solid black" }} />
      <button onClick={() => onClick(text)}>추가</button>
      {
        list.map((a, i) => (
            <li key={i}>{a}</li>
          )
        )
      }
    </>
  )
}

export default Test3;