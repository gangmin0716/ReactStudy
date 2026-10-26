import { memo } from "react";
// import React from 'react'

type ChildProps = {
  id: number;
  title: string;
  onClick: () => void;
};

function Child({ id, title, onClick }: ChildProps) {
  return (
    <div onClick={onClick}>
      {id} - {title}
    </div>
  );
}

export default memo(Child);
//export default React.memo(Child)
