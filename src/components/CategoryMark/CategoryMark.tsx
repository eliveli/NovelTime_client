import { useNavigate } from "react-router-dom";
import { goToUserPage, useWhetherItIsMobile } from "utils";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { handleAlert, openFirstModal } from "store/clientSlices/modalSlice";
import { Img } from "store/serverAPIs/types";
import {
  CategoryContainer,
  CategoryDesc,
  LinkCategory,
  ShowAllText,
  ShowAllIcon,
  CategoryDescContnr,
  CategoryDescUserImg,
  CategoryDescUserName,
  CategoryDescUserContnr,
  GoToAllContentBtn,
} from "./CategoryMark.styles";

type Props = React.PropsWithChildren<{
  categoryText: string;
  novelListInSlide?: {
    user: {
      userImg: Img;
      userName: string;
    };
    path: string;
    listId: string;
  };
  userContent?: {
    userName: string;
    path: string;
    isNoContent: boolean;
    isNovelList?: true;
  };
  path?: string;
  novelNo?: number;
}>;

export default function CategoryMark({
  categoryText,
  userContent,
  novelListInSlide,
  path,
  novelNo, // not used now
  children,
}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fontSize = categoryText === "Let's talk about the novel" ? 20 : undefined;
  const isNotMobile = !useWhetherItIsMobile();

  // Darken user content while editing userBG
  const isEditingBG = !!useAppSelector((state) => state.userProfile.temporaryUserBG.src);

  if (novelListInSlide) {
    return (
      <CategoryContainer>
        <CategoryDescContnr>
          <CategoryDescUserContnr>
            <CategoryDescUserImg
              userImg={novelListInSlide.user.userImg}
              onClick={(e) => goToUserPage(navigate, e, novelListInSlide.user.userName)}
            />
            <CategoryDescUserName>
              {`${novelListInSlide.user.userName}의 선호 리스트`}
            </CategoryDescUserName>
          </CategoryDescUserContnr>
          <CategoryDesc isUserNovelList>{`: ${categoryText}`}</CategoryDesc>
        </CategoryDescContnr>

        <LinkCategory
          // novelNo={novelNo}
          isUserMark
          to={`/user-page/${novelListInSlide.user.userName}/${novelListInSlide.path}/${novelListInSlide.listId}`}
        >
          {isNotMobile && <ShowAllText isUserNovelList>이 리스트 모두 보기</ShowAllText>}
          <ShowAllIcon />
        </LinkCategory>
      </CategoryContainer>
    );
  }

  if (userContent) {
    const userPagePath = `/user-page/${userContent.userName}/${userContent.path}`;

    return (
      <CategoryContainer>
        <CategoryDesc isEditingBG={isEditingBG}>{categoryText}</CategoryDesc>
        <GoToAllContentBtn
          isEditingBG={isEditingBG}
          onClick={() => {
            if (userContent.isNoContent) {
              dispatch(openFirstModal("alert"));
              dispatch(handleAlert({ text: "게시글이 존재하지 않아요." }));
              return;
            }
            navigate(userPagePath);
          }}
        >
          모두 보기
        </GoToAllContentBtn>
      </CategoryContainer>
    );
  }

  return (
    <CategoryContainer>
      <CategoryDesc isEditingBG={isEditingBG} fontSize={fontSize}>
        {categoryText}
      </CategoryDesc>

      {!!path && (
        <LinkCategory to={path}>
          <ShowAllText>전체보기</ShowAllText>
          <ShowAllIcon />
        </LinkCategory>
      )}
      {children}
    </CategoryContainer>
  );
}
