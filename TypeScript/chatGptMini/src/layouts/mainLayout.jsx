import { Outlet } from "react-router-dom";
import Sidebar from "@/components/sidebar/sidebar"
import * as S from "./style/mainLayout"

export default function MainLayout() {
  return (
    <S.Container>
      <Sidebar />
      <Outlet />
    </S.Container>
  )
}