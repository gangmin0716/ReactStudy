import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet, Navigate } from "react-router-dom";
import Detail from "./component/detail.jsx"
import data from "./data";
import axios from "axios";

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
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  console.log(result.data)
                  let copy = [...shoes, ...result.data]
                  setshoes(copy)
                }).catch(() => {
                  console.log('실패함님아')
                })
            }}>상품 더보기 버튼</button>
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
      </Routes>
    </div>
  );
}
export default App;
