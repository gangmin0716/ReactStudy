import { memo, useCallback, useState } from "react";

type ChildData = {
  id: number;
  selected: boolean;
};

type ChildProps = ChildData & {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const Child = memo(function Child({ id, selected, onClick }: ChildProps) {
  console.log("child" + id);
  return (
    <div data-id={id} onClick={onClick}>
      {id} - {selected ? "true" : "false"}
    </div>
  );
});

function Parent() {
  const [children, setChildren] = useState<ChildData[]>([
    { id: 1, selected: false },
    { id: 2, selected: false },
  ]);

  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const id = Number(e.currentTarget.dataset.id);
    setChildren((prev) =>
      prev.map((it) => (it.id === id ? { ...it, selected: !it.selected } : it))
    );
  }, []);

  return (
    <>
      {children.map((it) => (
        <Child key={it.id} {...it} onClick={onClick} />
      ))}
    </>
  );
}

export default Parent;
