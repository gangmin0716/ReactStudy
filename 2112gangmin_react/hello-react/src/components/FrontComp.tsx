type FrontCompProps = {
  propData1: string[];
  frTitle: string;
};
export default function FrontComp(props: FrontCompProps) {
  const liRows = [];
  for (let i = 0; i < props.propData1.length; i++) {
    liRows.push(<li key={i}>{props.propData1[i]}</li>);
  }
  return (
    <>
      <li>{props.frTitle}</li>
      <ul>{liRows}</ul>
    </>
  );
}
