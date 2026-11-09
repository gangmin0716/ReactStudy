import CheerDisplay from "./CheerDisplay.tsx";
import CheerButtons from "./CheerButtons.tsx";
import CheerMessage from "./CheerMessage.tsx";

function CheerApp() {
  return (
    <main>
      <h1>우리 반 응원 보드</h1>

      <CheerDisplay />
      <CheerMessage />
      <CheerButtons />
    </main>
  );
}

export default CheerApp;
