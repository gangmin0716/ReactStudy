import { useOptimistic, useRef, useState } from "react";

interface Message {
  text: string;
  sending: boolean;
}

interface ThreadProps {
  messages: Message[];
  sendMessage: (formData: FormData) => Promise<void>;
}

async function deliverMessage(message: string): Promise<string> {
  await new Promise<void>(resolve => setTimeout(resolve, 1000));
  return message;
}

function Thread({ messages, sendMessage }: ThreadProps) {
  // 2
  const formRef = useRef<HTMLFormElement>(null); // 3 // 7
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], string>(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  async function formAction(formData: FormData): Promise<void> {
    // 4
    const message = formData.get("message");
    // FormData의 값은 문자열, 파일 또는 null일 수 있으므로 확인
    if (typeof message !== "string" || message.trim() === "") {
      return;
    }
    addOptimisticMessage(message); // 5
    formRef.current?.reset();
    await sendMessage(formData); // 6
  }

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="메시지를 입력해주세요" required />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

function UseOptimisticExam() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "기본 메시지입니다", sending: false },
  ]);

  async function sendMessage(formData: FormData): Promise<void> {
    // 11
    const message = formData.get("message");
    if (typeof message !== "string" || message.trim() === "") {
      return;
    }
    const sentMessage = await deliverMessage(message);
    setMessages(previousMessages => [
      ...previousMessages,
      {
        text: sentMessage,
        sending: false,
      },
    ]);
  }
  return (
    <div>
      <h2>useOptimistic 사용하기</h2>
      <Thread messages={messages} sendMessage={sendMessage} />
    </div>
  );
}
export default UseOptimisticExam;
