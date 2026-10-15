import { Routes, Route } from "react-router";
import TopNavi from "./components/TopNavi";
import UseRefExam1 from "./pages/UseRefExam1.tsx";
function App() {
  return (
    <>
      <TopNavi />
      <Routes>
        <Route path="/" element={<UseRefExam1 />} />
        <Route path="/use-ref1" element={<UseRefExam1 />} />
      </Routes>
    </>
  );
}
export default App;
