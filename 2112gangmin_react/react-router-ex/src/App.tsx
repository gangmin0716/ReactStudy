import {Routes, Route, NavLink } from 'react-router'
import Home from './pages/Home'
import Html from "./pages/Html.tsx";
import ReactStudy from "./pages/ReactStudy.tsx";

function App() {
  return (
    <>
      <nav className="top-navi">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/html">HTML</NavLink>
        <NavLink to="/react">React</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/html" element={<Html />} />
        <Route path="/react" element={<ReactStudy />} />
      </Routes>
    </>
  );
}

export default App
