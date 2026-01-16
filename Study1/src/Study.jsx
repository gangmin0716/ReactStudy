// 1. 여기서 useState를 불러와야 합니다.
import { useState } from 'react';

export default function Study() {
  let [name, changeName] = useState(['남자코트 추천', '오이', '감자']);
  let [good, c] = useState([0, 0, 0]);
  
  // 2. 'false' (문자열) 대신 false (불리언)을 사용하세요.
  let [modal, setmodal] = useState(false); 
  
  let [title, settile] = useState(0);
  let [Input, setInput] = useState('');

  const changeClick = () => {
    let copy = [...name];
    copy[0] = '여자코트 추천';
    changeName(copy);
  };

  return (
    <div>
      <div className="black-nav">
        <h4>어쩔티비</h4>
      </div>

      {name.map(function (a, i) {
        return (
          <div className="list" key={i}> {/* map 반복문에는 key를 넣어주는 게 좋습니다 */}
            <h4
              onClick={() => {
                // !modal은 true/false를 반대로 뒤집어줍니다.
                setmodal(!modal);
                settile(i);
              }}
            >
              {name[i]}{' '}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...good];
                  copy[i] += 1;
                  c(copy);
                }}
              >
                👍
              </span>
              {good[i]}
            </h4>
            <p>영어듣기 어쩔티비</p>
            <button
              onClick={() => {
                let copy = [...name];
                copy.splice(i, 1);
                changeName(copy);
                
                // 글이 지워질 때 따봉 숫자도 같이 지워지게 맞추려면 아래 코드도 추가하면 좋습니다.
                let copyGood = [...good];
                copyGood.splice(i, 1);
                c(copyGood);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}

      <input
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          // 빈 입력값 방지 (선택사항)
          if (Input === '') return; 

          let copy = [...name];
          copy.push(Input);
          changeName(copy);
          
          let goodcopy = [...good];
          goodcopy.push(0);
          c(goodcopy);
        }}
      >
        추가
      </button>

      {/* modal이 true일 때만 보여줌 */}
      {modal == true ? (
        <Modal title={title} changeClick={changeClick} name={name} />
      ) : null}
    </div>
  );
}

const Modal = (props) => {
  return (
    <div className="modal">
      <h4>{props.name[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={props.changeClick}>글수정</button>
    </div>
  );
};