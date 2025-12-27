import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/page/home/HomePage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  }
])