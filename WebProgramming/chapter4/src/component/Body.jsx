import { useState } from "react"

function Body(){
  const [state, setState] = useState({
    userName: "",
    gender: "",
    birth: "",
    bio: ""
  }) // 객체 자료형으로 state 관리

  const handleOnChange = (e) => {
    const { name, value } = e.target

    console.log("현재 수정 대상: ", name)
    console.log("수정 값: ", value)

    setState({
      ...state,
      [name]: value
    })
  }

  return( // 인풋 박스 등등... 화면에 렌더링될 것들
    <div>
      <div>
        <input
          name="userName"
          value={state.userName}
          onChange={handleOnChange}
          placeholder="이름"
        />
      </div>
      <div>
        <select name="gender" value={state.gender} onChange={handleOnChange}>
          <option value=""></option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
      </div>
      <div>
        <input
          name="birth"
          type="date"
          value={state.birth}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <textarea name="bio" value={state.bio} onChange={handleOnChange} />
      </div>
    </div>
  )
}

export default Body