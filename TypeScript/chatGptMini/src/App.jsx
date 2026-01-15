import { RouterProvider } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle.js";
import { router } from "./routes/router"

export default function App() {
  return (
    <>
      <GlobalStyle/>
      <RouterProvider router={router} />
    </>
  );
}
