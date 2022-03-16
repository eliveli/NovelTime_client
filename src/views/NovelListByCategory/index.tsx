import { useParams } from "react-router-dom";
import Novels from "views/NovelList/NovelList.components";
import { ColumnDetailList } from "../../components/NovelListFrame";
import { NovelColumnDetail } from "../../components/Novel";

// api 호출, 서버 스테이트 받아오기
// 네비게이션 바 - 상단 - 뒤로가기 버튼(모바일용) + ...

export default function NovelListByCategory() {
  const { category } = useParams();
  const info = {
    novelId: "20220225082010201",
    novelImg:
      "//dn-img-page.kakao.com/download/resource?kid=bpp9n3/hzp2hVb5sA/z46Nq6YOG1GGdQwKvhYMj1",
    userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  };
  const arrayInfo2 = [info, info, info, info, info, info, info, info, info, info];

  return (
    <Novels>
      <ColumnDetailList isShowAll category={category as string}>
        {arrayInfo2.map((novel) => (
          <NovelColumnDetail novel={novel} />
        ))}
      </ColumnDetailList>
    </Novels>
  );
}
