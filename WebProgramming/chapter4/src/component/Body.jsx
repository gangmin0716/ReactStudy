import { useState } from "react"

function Body(){
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [bio, setBio] = useState("");

  const OnChangeName = (e) => {
    setName(e.target.value)
  }
  const OnChangeGender = (e) => {
    setGender(e.target.value)
  }
  const OnChangeBirth = (e) => {
    setBirth(e.target.value)
  }
  const OnChangeBio = (e) => {
    setBio(e.target.value)
  }

  return(
    <div>
      <div>
        <input value={name} onChange={OnChangeName} placeholder="이름" />
      </div>
      <div>
        <select value={gender} onChange={OnChangeGender}>
          <option key={""} ></option> {/*초기화는 빈칸으로*/}
          <option key={"남성"}>남성</option>
          <option key={"여성"}>여성</option>
        </select>
      </div>
      <div>
        <input type="date" value={birth} onChange={OnChangeBirth} />
      </div>
      <div>
        <textarea value={bio} onChange={OnChangeBio} />
      </div>
    </div>
  )
}

export default Body;