import { Routes, Route } from "react-router";
import TopNavi from "./components/TopNavi";

import "./App.css";
import UseOptimisticExam from "./pages/UseOptimisticExam.tsx";
import UseActionStateExam from "./pages/UseActionStateExam.tsx";
import UseFormStatusExam from "./pages/UseFormStatusExam.tsx";
import LikeOptimistic from "./components/LIkeOptimistic.tsx";
import NicknameActionState from "./components/NicknameActionState.tsx";
import ScreActionState from "./components/ScreActionState.tsx";
import ActionTest from "./components/ActionTest.tsx";
import InquiryForm from "./pages/SubmitInquiry.tsx";

function App() {
  return (
    <>
      <TopNavi></TopNavi>
      <Routes>
        <Route path="/" element={<UseOptimisticExam />} />
        <Route path="/use-optimistic" element={<UseOptimisticExam />} />
        <Route path="/use-action-state" element={<UseActionStateExam />} />
        <Route path="/use-form-status" element={<UseFormStatusExam />} />
        <Route path="/like" element={<LikeOptimistic />} />
        <Route path="/nickname" element={<NicknameActionState />} />
        <Route path="/score" element={<ScreActionState />} />
        <Route path="/test" element={<ActionTest />} />
        <Route path="/form" element={<InquiryForm />} />
      </Routes>
    </>
  );
}

export default App;
