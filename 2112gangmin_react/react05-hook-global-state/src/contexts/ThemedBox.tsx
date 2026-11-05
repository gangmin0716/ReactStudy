import { useContext, type CSSProperties } from "react";
import { ThemeContext } from "./ThemeContext";
const ThemedBox = () => {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error("ThemedBox는 ThemeProvider 안에서 사용해야 합니다.");
  }
  const { isDark } = theme;
  const boxStyle: CSSProperties = {
    padding: "20px",
    marginTop: "10px",
    backgroundColor: isDark ? "#333" : "#eee",
    color: isDark ? "#fff" : "#000",
    textAlign: "center",
  };
  return <div style={boxStyle}>현재 테마: {isDark ? "다크모드" : "라이트모드"}</div>;
};
export default ThemedBox;
