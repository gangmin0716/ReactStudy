import { useState } from "react";

const Test4 = () => {
  const [text, setText] = useState({name:"", age:""});
  
  const onChange1 = (e) => {
    setText({name: e.target.value, age: text.age})
  }

  const onChange2 = (e) => {
    setText({name: text.name, age: e.target.value})
  }
  return(
    <>
      <p>이름</p>
      <input placeholder="이름 입력" type="text" onChange={onChange1} style={{ border: "1px solid black" }}></input>

      <p>나이</p>
      <input placeholder="나이 입력" type="number" onChange={onChange2} style={{ border: "1px solid black" }}></input>
      <p>이름: {text.name}</p>
      <p>나이: {text.age}</p>
    </>
  )
};

export default Test4;