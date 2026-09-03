type BackCompProps = {
  propData2: string[];
  baTitle: string;
};
const BackComp = ({ propData2, baTitle }: BackCompProps) => {
  const liRows = [];
  let keyCnt = 0;
  for (const row of propData2) {
    liRows.push(<li key={keyCnt++}>{row}</li>);
  }
  return (
    <>
      <li>{baTitle}</li>
      <ul>{liRows}</ul>
    </>
  );
};
export default BackComp;
