export type SquareValue = null | "O" | "X";
type SquareProps = {
  value: null | "O" | "X";
  handleClick: () => void;
};
export default function Square({ value, handleClick }: SquareProps) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
