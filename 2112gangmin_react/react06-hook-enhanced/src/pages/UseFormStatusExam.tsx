import { useState } from "react";
import { useFormStatus } from "react-dom";
async function submitForm(formData: FormData): Promise<string> {
  await new Promise<void>(resolve => {
    setTimeout(resolve, 1000);
  });
  return `"${formData.get("name")}" 님의 요청이 완료되었습니다.`;
}
const SubmitButton = () => {
  const { pending, data, method, action } = useFormStatus();
  console.log("pending", pending);
  console.log("data", data);
  console.log("method", method);
  console.log("action", action);
  return (
    <button type="submit" disabled={pending}>
      {pending ? "제출 중..." : "제출"}
    </button>
  );
};
const UseFormStatusExam = () => {
  const [message, setMessage] = useState("");
  const handleSubmit = async (formData: FormData): Promise<void> => {
    const result = await submitForm(formData);
    setMessage(result);
  };
  return (
    <>
      <h2>useFormStatus 사용하기</h2>
      <form action={handleSubmit}>
        <label>
          이름:{" "}
          <input
            type="text"

            name="name"
            required
          />
        </label>
        <SubmitButton />
      </form>
      {message && <p>{message}</p>}
    </>
  );
};
export default UseFormStatusExam;
