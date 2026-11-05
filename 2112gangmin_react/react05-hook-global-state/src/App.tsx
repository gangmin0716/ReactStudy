import { Route, Routes } from "react-router";
import TopNavi from "./components/TopNavi..tsx";
import UseReducerExam from "./pages/UseReducerExam.tsx";
import UseContextExam from "./pages/UseContextExam.tsx";
import { UserProvider } from "./contexts/UserProvider.tsx";
import { Dashboard } from "./components/Dashboard.tsx";

function App() {
  return (
    <>
      <TopNavi />
      <UserProvider>
        <Routes>
          <Route path="/" element={<UseReducerExam />} />
          <Route path="/use-reducer" element={<UseContextExam />} />
          <Route path="/use-context" element={<UseContextExam />} />
        </Routes>
        <Dashboard />
      </UserProvider>
    </>
  );
}

export default App;
