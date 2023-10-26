import Icon from "assets/Icon";
import Spinner from "assets/Spinner";
import { CategoryMark } from "components/CategoryMark";
import MainBG from "components/MainBG";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { logoImg, setMetaTags } from "store/clientSlices/modalSlice";

import MetaTag from "utils/MetaTag";
import { useGetListSummaryQuery } from "store/serverAPIs/novelTime";
import { ShareIconBox, WritingSection } from "./UserPage.styles";
import UserNovelList from "./UserNovelListSummary.components";
import { NoContent } from "./UserWriting.components";

export default function UserNovelListSummary({ isCreated }: { isCreated: boolean }) {
  const dispatch = useAppDispatch();

  const { userName } = useParams();
  const loginUser = useAppSelector((state) => state.loginUser.user);

  const listSummaryResult = useGetListSummaryQuery({
    userName: userName as string,
    isCreated, // isCreated or isLiked
  });
  const setCategoryText = () => {
    if (!userName) return "";

    // this is login user's page
    if (loginUser.userName === userName) {
      if (isCreated) return "My List";
      return "Other's List I Like";
    }
    // this is other user's page
    if (isCreated) return `${userName}'s List`;
    return `Other's List ${userName} Like`;
  };

  // Set meta tags //
  const userImg = useAppSelector((state) => state.userProfile.user.userImg);

  const listTitles = listSummaryResult.data?.map((_) => _.listTitle).toString() || "";

  const metaTags = () => {
    const text = isCreated ? "만든" : "좋아하는";
    const title = userName ? `${userName}님이 ${text} 리스트` : "";

    return {
      title,
      description: listTitles,
      image: userImg.src || logoImg,
      url: window.location.href,
    };
  };

  useEffect(() => {
    if (!listSummaryResult.data) return;

    dispatch(setMetaTags(metaTags()));
  }, [listSummaryResult.data]);

  return (
    <MainBG>
      {listSummaryResult.data && <MetaTag tags={metaTags()} />}
      {listSummaryResult.isFetching && <Spinner styles="fixed" />}

      <CategoryMark categoryText={setCategoryText()}>
        <ShareIconBox>
          <Icon.ShareWithArrow />
        </ShareIconBox>
      </CategoryMark>

      {listSummaryResult.data?.length ? (
        <WritingSection isNoContent={false} isForListAll>
          {listSummaryResult.data.map((_) => (
            <UserNovelList key={_.listId} novelList={_} isCreated={isCreated} />
          ))}
        </WritingSection>
      ) : (
        <NoContent contentType="L" isCreatedBy={isCreated} />
      )}
    </MainBG>
  );
}
