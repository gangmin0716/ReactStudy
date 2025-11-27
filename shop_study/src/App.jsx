import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet, Navigate } from "react-router-dom";
import Detail from "./component/detail.jsx"
import data from "./data";

let Shoes = (props) => {
  return (
    <Col md={"4"}>
      <img src={"/shoes" + (props.i + 1) + ".png"} width="80%"></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </Col>
  );
};
function App() {
  let [shoes, setshoes] = useState(data);
  let navigate = useNavigate();
  return (
    <div className="body">


      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">어쩔티비</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <Row>
              {shoes.map((a, i) => {
                return <Shoes shoes={shoes[i]} i={i} />;
              })}
            </Row>
          </>
        } />
        <Route path="/detail" element={<Detail />} />

        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<About />} />
        </Route>

        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element= {<div>생일기념 쿠폰받기</div>}/>
        </Route>

        <Route path="*" element={<div>없는페이지입니다</div>} />
      </Routes>
    </div>
  );
}

const About = () => {
  return (
    <div>
      <h4>
        회사정보
      </h4>
      <Outlet></Outlet>
    </div>
  )
}

const Event = () => {
  return (
    <div>
      <h4>
        오늘의 이벤트
      </h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App;
