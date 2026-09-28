import './App.css'
import {Routes, Route} from 'react-router'
import Home from "./page/Home.tsx";
import Intro from "./page/Intro.tsx";
import NotFound from "./page/NotFound.tsx";
import TopNav from "./components/TopNav";
import IntroDetail from "./page/IntroDetail.tsx";

function App() {

  return (
    <>
      <TopNav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="intro" element={<Intro />} />
        <Route path="/intro/{id}" element={<IntroDetail />}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <footer>qpwofjpoqwfjpoqjfw[</footer>
    </>
  )
}

export default App
