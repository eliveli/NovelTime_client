import MainBG from "components/MainBG";
import { useState } from "react";
import { Outlet } from "react-router-dom";

// outlet component에 context 넘겨줄 때 - setState 함수일 경우 자꾸 에러남.
// 아래는 일단 사용 안 할 예정.
export default function NovelDetailMark() {
  interface TitleType {
    title: string;
  }

  const [title, getTitle] = useState<string>("");

  const { pathname } = window.location;

  console.log(title, "in parent detail");
  return (
    <MainBG>
      <p>
        여기는 소설 공간 - 우리들의 플레이 그라운드.
        {title}
      </p>
      <Outlet />
      <Outlet context={{ getTitle }} />
    </MainBG>
  );
}
