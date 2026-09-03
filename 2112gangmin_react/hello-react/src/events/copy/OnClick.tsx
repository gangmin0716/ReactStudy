const rootDiv = document.getElementById("root");
if (rootDiv) {
  rootDiv.onclick = (e: Event) => {
    // onclick 모두 소문자.
    const { isTrusted, target, bubbles } = e;
    console.log("mouse click occurs on root div", isTrusted, target, bubbles);
  };
  rootDiv.onclick = (e: Event) => {
    const { isTrusted, target, bubbles } = e;
    console.log("mouse click also occurs on root div", isTrusted, target, bubbles);
  };
}
export default function OnClick() {
  return <div>OnClick</div>;
}
