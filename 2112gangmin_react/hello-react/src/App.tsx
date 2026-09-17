import type { SubmitEvent } from "react";
interface FormErrors {
  email?: string;
  password?: string;
}
function validate(email: string, password: string): FormErrors {
  const errors: FormErrors = {};
  if (!email.includes("@")) {
    errors.email = "이메일을 확인하세요.";
  }
  if (password.length < 8) {
    errors.password = "비밀번호를 8자 이상 입력하세요.";
  }
  return errors;
}
function App() {
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const errors = validate(email, password);
    console.log(errors);
    if (errors.email || errors.password) {
      alert(`${errors.email ?? ""}\n${errors.password ?? ""}`);

      return;
    }
    alert("검증 완료");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="이메일" />
      <input
        name="password"
        type="password"

        placeholder="비밀번호"
      />

      <button type="submit">확인</button>
    </form>
  );
}
export default App;
