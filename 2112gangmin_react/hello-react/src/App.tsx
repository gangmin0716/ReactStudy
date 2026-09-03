// import EventListener from "./events/EventListener";
// import OnClick from "./events/OnClick";
// import ReactOnClick from "./events/ReactOnClick";
// import DispatchEvent from "./events/DispatchEvent";
import EventBubbling from "./events/copy/EventBubbling";
import StopPropagation from "./events/copy/StopPropagation";
// import VariousInputs from "./events/VariousInputs";
// import OnChange from "./events/OnChange";
// import FileInput from "./events/FileInput";
import DragDrop from "./events/copy/DragDrop";
import FileDrop from "./events/copy/FileDrop";
import FrontComp from "./components/FrontComp.tsx";
import BackComp from "./components/BackComp";

function App04Event() {
  return (
    <main>
      <h1>React Event Practice</h1>
      <p>수업 순서에 맞춰 아래 import와 컴포넌트를 하나씩 바꿔 실행합니다.</p>
      {/*<EventListener />*/}
      <FileDrop />
      <DragDrop />
      {/*<FileInput />*/}
      {/*<OnChange />*/}
      {/*<VariousInputs />*/}
      <StopPropagation />
      <EventBubbling />
      {/*<DispatchEvent />*/}
      {/*<ReactOnClick />*/}
      {/*<OnClick />*/}

      <FrontComp
        onMyEvent1={() => {
          alert("프론트엔드 클릭됨(부모전달)");
        }}
      />

      <BackComp
        onMyEvent2={msg => {
          alert(msg);
        }}
      />
    </main>
  );
}
export default App04Event;
