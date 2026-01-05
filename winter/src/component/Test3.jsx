import { useState } from "react";

const Lists = [
  "qwfqwf", "qwfpojqwfwpoj"
]

const Test3 = () => {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value)
  }
  return (
    <>
      <input type="text" placeholder="내용 입력" value={text} onChange={onChange} style={{ border: "1px solid black" }} />
      <button>추가</button>
      {
        Lists.map((List, index) => {
          return(
            
          )
        })
      }
    </>
  )
}

export default Test3;