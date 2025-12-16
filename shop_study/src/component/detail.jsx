import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Detail = (props) => {
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
    if (isNaN(input) == true) {
      alert('이건좀아니지라')
    }
  }, [input])

  const [tap, setTap] = useState(0);
  const [fade1, setFade1] = useState('')
  const Tap = ({ tap }, shoes = {shoes}) => {

  const [fade, setFade] = useState('')

    useEffect(() => {
      setTimeout(() => {
        setFade('end')
      }, 1000)
      return () => {
        setFade('')
      }
    }, [tap])

    useEffect(() => {
      setFade1('end')
      return () => {
        setFade1('')
      }
    }, [])

    return (<div className={`start ${fade}`}>
      {[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][tap]}
    </div>)

  }
  return (
    <div className={'container start ' + fade1}>
      {
        Alert == true
          ? <div className="alert alert-warning">
            2초이내 구매시 할인
          </div>
          : null
      }
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
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={() => { setTap(0) }}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => { setTap(1) }}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => { setTap(2) }}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tap tap={tap} />
    </div>
  );
};

export default Detail;
