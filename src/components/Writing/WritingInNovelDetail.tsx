import { goToUserPage } from "utils";
import { WritingWithoutGenre } from "store/serverAPIs/types";
import { useNavigate } from "react-router-dom";
import { RECOMMEND_DETAIL, TALK_DETAIL } from "utils/pathname";
import Icon from "../../assets/Icon";
import {
  CreateDate,
  FirstLineContainer,
  UserImg,
  UserName,
  WritingBG,
  Writing,
  UserNameBox,
  IconsBox,
  IconBox,
  WritingTitle,
  WritingImg,
  IconNO,
  WritingPreview,
  BesideImgContainer,
  WritingImgBox,
} from "./WritingInNovelDetail.styles";

export default function WritingInNovelDetail({ writing }: { writing: WritingWithoutGenre }) {
  const {
    writingId,
    writingTitle,
    writingImg,
    userName,
    userImg,
    createDate,
    likeNO,
    commentNO, // undefined in recommend
    talkOrRecommend,
  } = writing;

  const navigate = useNavigate();

  const goToWritingPage = () => {
    if (talkOrRecommend === "T") {
      navigate(`${TALK_DETAIL}/${writingId}?is-from-novel-detail=true`);
    } else {
      navigate(`${RECOMMEND_DETAIL}/${writingId}?is-from-novel-detail=true`);
    }
  };

  return (
    <WritingBG onClick={goToWritingPage}>
      <Writing>
        <UserImg userImg={userImg} onClick={(e) => goToUserPage(navigate, e, userName)} />

        <BesideImgContainer>
          <FirstLineContainer>
            <UserNameBox>
              <UserName onClick={(e) => goToUserPage(navigate, e, userName)}>{userName}</UserName>
              <CreateDate>{createDate}</CreateDate>
            </UserNameBox>
            <IconsBox>
              <IconBox>
                <Icon.IconBox noPointer size={20}>
                  <Icon.SmallHeart />
                </Icon.IconBox>
                <IconNO>{likeNO}</IconNO>
              </IconBox>
              {talkOrRecommend === "T" && (
                <IconBox>
                  <Icon.IconBox noPointer size={20}>
                    <Icon.Comment />
                  </Icon.IconBox>
                  <IconNO>{commentNO}</IconNO>
                </IconBox>
              )}
            </IconsBox>
          </FirstLineContainer>

          <WritingPreview>
            <WritingTitle>{writingTitle}</WritingTitle>

            {writingImg && (
              <WritingImgBox>
                <WritingImg img={writingImg} />
              </WritingImgBox>
            )}
          </WritingPreview>
        </BesideImgContainer>
      </Writing>
    </WritingBG>
  );
}
