import { Routes, Route } from "react-router";
import TopNavi from "./components/TopNavi";
import UseRefExam1 from "./pages/UseRefExam1.tsx";
import UseRefExam2 from "./pages/UseRefExam2.tsx";
import UseRef3 from "./pages/UseRef3.tsx";
import UseMemoExam from "./pages/UseMemoExam.tsx";
import UseMemoPractice from "./pages/UseMemoPractice.tsx";
import UseIdExam from "./pages/UseIdExam.tsx";
import Test from "./pages/Test.tsx";
function App() {
  return (
    <>
      <TopNavi />
      <Routes>
        <Route path="/" element={<UseRefExam1 />} />
        <Route path="/use-ref1" element={<UseRefExam1 />} />
        <Route path="/use-ref2" element={<UseRefExam2 />} />
        <Route path="/use-ref3" element={<UseRef3 />} />
        <Route path="/use-memo" element={<UseMemoExam />} />
        <Route path="/use-memo2" element={<UseMemoPractice />} />
        <Route path="/use-id" element={<UseIdExam />}/>
        <Route path="/test" element={<Test />}/>
      </Routes>
    </>
  );
}
export default App;
