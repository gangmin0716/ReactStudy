import { useContext } from "react";
import { ThemeProvider, ThemeContext } from "../contexts/ThemeContext";
import ThemedBox from "../contexts/ThemedBox";
const ThemeToggleButton = () => {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error("ThemeToggleButton은 ThemeProvider 안에서 사용해야 합니다.");
  }
  const { toggleTheme } = theme;
  return <button onClick={toggleTheme}>테마 전환</button>;
};
const UseContextExam = () => {
  return (
    <>
      <h2>useContext 사용하기</h2>
      <ThemeProvider>
        <ThemeToggleButton />
        <ThemedBox />
      </ThemeProvider>
    </>
  );
};
export default UseContextExam;
