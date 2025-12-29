import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout"
import HomePage from "@/page/home/HomePage"

export const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children: [
      {path: "/", element: <HomePage />},
    ]
  }
])