import { useState } from "react";
import { useFormStatus } from "react-dom"; // TODO: useFormStatus를 올바른 패키지에서 가져오세요.

// 문의 접수에 약 1초가 걸리는 상황을 흉내 냅니다.
async function submitInquiry(formData: FormData): Promise<string> {
  console.log("문의 내용:", formData.get("inquiry"));
  await new Promise<void>(resolve => {
    setTimeout(resolve, 1000);
  });
  return "문의가 접수되었습니다.";
}

const SubmitButton = () => {
  // TODO:임시값을 useFormStatus에서 읽은 pending으로 바꾸세요.
  const { pending } = useFormStatus();
  return (
    // TODO: 제출 중에는 비활성화하고 버튼 문구를 변경하세요.
    <button type="submit" disabled={pending}>
      문의접수
    </button>
  );
};
const SubmissionStatus = () => {
  // TODO:임시값을 useFormStatus에서 읽은 pending으로 바꾸세요.
  const { pending } = useFormStatus();
  // TODO: 제출 중일 때만 안내 문구가 나타나도록 수정하세요.
  return <p>{pending ? "문의 접수 중..." : ""}</p>;
};

const InquiryForm = () => {
  const [message, setMessage] = useState("");
  const handleSubmit = async (formData: FormData): Promise<void> => {
    // TODO: submitInquiry의 완료를 기다리고,
    // 반환된 메시지를 message 상태에 저장하세요.
    const result = await submitInquiry(formData);
    setMessage(result);
  };
  return (
    <>
      <h2>문의 접수하기</h2>
      {/* TODO:폼의 action에 handleSubmit연결 */}
      <form action={handleSubmit}>
        <label>
          문의 내용:
          <textarea name="inquiry" placeholder="문의 내용을 입력하세요" required />
        </label>
        <SubmitButton />
        {/*TODO:진행안내 컴포넌트를 이 위치에 배치 */}
        <SubmissionStatus />
      </form>
      {message && <p>{message}</p>}
    </>
  );
};
export default InquiryForm;
