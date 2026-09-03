import EventListener from "./events/EventListener";
import OnClick from "./events/OnClick";
import ReactOnClick from "./events/ReactOnClick";
import DispatchEvent from "./events/DispatchEvent";
import EventBubbling from "./events/EventBubbling";
import StopPropagation from "./events/StopPropagation";
import VariousInputs from "./events/VariousInputs";
import OnChange from "./events/OnChange";
import FileInput from "./events/FileInput";
import DragDrop from "./events/DragDrop";
import FileDrop from "./events/FileDrop";
function App04Event() {
  return (
    <main>
      <h1>React Event Practice</h1>
      <p>수업 순서에 맞춰 아래 import와 컴포넌트를 하나씩 바꿔 실행합니다.</p>
      <EventListener />
      <FileDrop />
      <DragDrop />
      <FileInput />
      <OnChange />
      <VariousInputs />
      <StopPropagation />
      <EventBubbling />
      <DispatchEvent />
      <ReactOnClick />
      <OnClick />
    </main>
  );
}
export default App04Event;
