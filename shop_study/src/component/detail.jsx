import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = (props) => {

  let [count, setCount] = useState(0)
  let [Alert, setAlert] = useState(true)
  let [input, setInput] = useState('')
  let { id } = useParams();
  let product = props.shoes.find((x) => {
    return x.id == id
  });

  useEffect(() => {
    let time = setTimeout(() => { setAlert(false) }, 2000)
    console.log(2)
    return () => {
      console.log(1)
      clearTimeout(time)
    }
  })

  useEffect(() => {
    if (isNaN(input) == true){
      alert('이건좀아니지라')
    }
  }, [input])

  return (
    <div className="container">
      {
        Alert == true
          ? <div className="alert alert-warning">
            2초이내 구매시 할인
          </div>
          : null
      }

      {count}
      <button onClick={() => { setCount(count + 1) }}>버튼</button>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <input onChange={(e) => { setInput(e.target.value) }}></input>
          <h4 className="pt-5">{product.title}</h4>
          <p>{product.content}</p>
          <p>{product.price} 원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
