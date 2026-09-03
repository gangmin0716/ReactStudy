import type { DragEvent } from "react";
export default function FileDrop() {
  const onDragOver = (e: DragEvent) => e.preventDefault();
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        console.log(`file[${i}]`, file);
      }
    }
  };
  return (
    <div>
      <p>File Drop</p>
      <div onDrop={onDrop} onDragOver={onDragOver}>
        <h1>Drag image files over me</h1>
      </div>
    </div>
  );
}
