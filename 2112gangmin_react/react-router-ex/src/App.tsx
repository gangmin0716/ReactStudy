import { Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import CommonLayout from "./pages/CommonLayout.tsx";
import Notice from "./pages/Notice.tsx";
import FaqPage from "./pages/Faq.tsx";
import NotFound from "./pages/NotFound.tsx";
import NoticeDetail from "./pages/NoticeDetail.tsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<Home />} />
          <Route path="notice">
            <Route index element={<Notice />} />
            <Route path=":id" element={<NoticeDetail />} />
          </Route>
        </Route>
        <Route path="faq" element={<FaqPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
