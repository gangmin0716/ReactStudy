import { useState, type SubmitEvent } from "react";
import "./App.css";
interface WriteFormProps {
  onSubmitForm: (gubun: string, title: string) => void;
}
function WriteForm(props: WriteFormProps) {
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const gubun = formData.get("gubun") as string;
    const title = formData.get("title") as string;
    props.onSubmitForm(gubun, title);
  }
  return (
    <form className="write-form" onSubmit={handleSubmit}>
      <select name="gubun">
        <option value="front">프론트엔드</option>
        <option value="back">백엔드</option>
      </select>
      <input type="text" name="title" placeholder="학습 내용을 입력하세요" />
      <input type="submit" value="추가" />
    </form>
  );
}
function App() {
  const [message, setMessage] = useState<string>("폼값 검증 진행 중");
  function handleSubmitForm(gubun: string, title: string) {
    console.log("Form값", gubun, title);
    if (gubun === "" || title.trim() === "") {
      alert("빈 값 있음");
      return;
    }
    setMessage(`검증 완료 폼값 : ${gubun}, ${title}`);
  }
  return (
    <div className="container">
      <h2>React-Form</h2>
      <WriteForm onSubmitForm={handleSubmitForm} />
      <pre>{message}</pre>
    </div>
  );
}
export default App;
