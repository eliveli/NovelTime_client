// /* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import {
  CreateDate,
  FirstLineContainer,
  UserImg,
  UserName,
  TalkBG,
  Talk,
  UserNameBox,
  IconsBox,
  IconBox,
  TalkTitle,
  NovelTitle,
  TalkImg,
  IconNO,
  TalkPreview,
  BesideImgContainer,
} from "./FreeTalkList.styles";

type MyComponentProps = React.PropsWithChildren<{}>;

export function FreeTalks({ children, ...props }: MyComponentProps) {
  return <TalkBG>{children}</TalkBG>;
}

FreeTalks.Talk = function () {
  return (
    <Talk>
      <UserImg
        src="https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png"
        alt="name"
      />
      <BesideImgContainer>
        <FirstLineContainer>
          <UserNameBox>
            <UserName>Nana</UserName>
            <CreateDate>22.01.01</CreateDate>
          </UserNameBox>
          <IconsBox>
            <IconBox>
              <FaRegHeart />
              <IconNO>7</IconNO>
            </IconBox>
            <IconBox>
              <FaRegComment />
              <IconNO>5</IconNO>
            </IconBox>
          </IconsBox>
        </FirstLineContainer>

        <TalkPreview>
          <TalkTitle>꾸준히 인기 많은 해포 패러디 계의 탑 작품</TalkTitle>
          <TalkImg
            src="https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png"
            alt="name"
          />
          <NovelTitle>[해리포터]지독한 후플푸프 - 곽정언</NovelTitle>
        </TalkPreview>
      </BesideImgContainer>
    </Talk>
  );
};
