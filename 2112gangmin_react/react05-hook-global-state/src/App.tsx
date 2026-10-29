import {Route, Routes} from "react-router"
import TopNavi from "./components/TopNavi..tsx";
import UseReducerExam from "./pages/UseReducerExam.tsx";
import UseContextExam from "./pages/UseContextExam.tsx";


function App() {

  return (
    <>
      <TopNavi />
      <Routes>
        <Route path="/" element={<UseReducerExam />} />
        <Route path="/use-reducer" element={<UseContextExam />} />
        <Route path="/use-context" element={<UseContextExam />} />
      </Routes>
    </>
  )
}

export default App
