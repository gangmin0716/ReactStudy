import { useState } from 'react';
import './App.css';

function App() {
    let [name, changeName] = useState(['남자코트 추천', '오이', '감자']);
    let [good, c] = useState([0, 0, 0]);
    let [modal, setmodal] = useState('false');

    const handleClick = () => {
        c(good + 1);
    };
    const changeClick = () => {
        let copy = [...name];
        copy[0] = '여자코트 추천';
        changeName(copy);
    };

    const ganadaClick = () => {
        let copyGanada = [...name];
        copyGanada.sort();
        changeName(copyGanada);
    };
    return (
        <div>
            <div className="black-nav">
                <h4>어쩔티비</h4>
            </div>
            {/* 
            <button onClick={ganadaClick}>가나다순정렬</button>
            <button onClick={changeClick}>글수정</button>

            <div className="list">
                <h4>
                    {name[0]} <span onClick={handleClick}>👍</span>
                    {good}{' '}
                </h4>
                <p>9월 8일 어쩔티비</p>
            </div>
            <div className="list">
                <h4>{name[1]}</h4>
                <p>영어듣기 어쩔티비</p>
            </div>
            <div className="list">
                <h4
                    onClick={() => {
                        setmodal(!modal);
                    }}
                >
                    {name[2]}
                </h4>
                <p>9월 10일 어쩔티비</p>
            </div>*/}

            {name.map(function (a, i) {
                return (
                    <div className="list">
                        <h4
                            onClick={() => {
                                setmodal(!modal);
                            }}
                        >
                            {name[i]}{' '}
                            <span
                                onClick={() => {
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
                    </div>
                );
            })}

            {modal == true ? (
                <Modal changeClick={changeClick} name={name} />
            ) : null}
        </div>
    );
}

const Modal = (props) => {
    return (
        <div className="modal">
            <h4>{props.name}</h4>
            <p>날짜</p>
            <p>상세내용</p>
            <button onClick={props.changeClick}>글수정</button>
        </div>
    );
};

export default App;
