import { ThemeProvider } from "styled-components";
import themeStyle from "assets/styles/theme";
import { useNavigate, useParams } from "react-router-dom";
import {
  freeTalk,
  freeTalkActive,
  recommend,
  recommendActive,
  addWriting,
  addWritingActive,
  novel,
  novelActive,
  message,
  messageActive,
  catWalking,
  logoMobile,
  logoPC,
} from "assets/images";
import Icon from "assets/Icon";

import {
  ADD_WRITING,
  EDIT_WRITING,
  MESSAGE_LIST,
  NOVEL_LIST,
  RECOMMEND_LIST,
  TALK_LIST,
} from "utils/pathname";
import { setSearchList } from "store/clientSlices/filterSlice";
import { openModal } from "../../store/clientSlices/modalSlice";
import { handleWritingToSubmitOnMobile } from "../../store/clientSlices/writingSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import {
  BackIcon,
  ForwardIcon,
  HeartIcon,
  ShareIcon,
  LeftIconBox,
  HeartIconBox,
  ShareIconBox,
  NavContentBoxPC,
  NavContentBoxMobile,
  NavContentPC,
  MyPageTablet,
  NavContent,
  HomeIcon,
  HomeIconBox,
  IconsBox,
  FillHeartIcon,
  NavImg,
  NavText,
  CatWalking,
  CatWalkingContainer,
  LogoContainer,
  Logo,
  PageTitle,
  SubmitBtn,
  RightSideContnr,
  SearchIconBox,
  LoginIconBox,
  LoginText,
  UserImg,
  UserName,
  MyPageMobile,
} from "./Nav.styles";

interface Props {
  pathname: string;
}

export function NavPC({ pathname }: Props) {
  const theme = {};

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);

  return (
    <ThemeProvider theme={theme}>
      <NavContentBoxPC>
        <LogoContainer>
          <Logo src={logoPC} onClick={() => navigate(`/`)} />
        </LogoContainer>
        <NavContentPC>
          {/* [category name, route path] */}
          {[
            [
              "FreeTalk",
              `${TALK_LIST}?genre=All&searchType=no&searchWord=&sortType=작성일New&pageNo=1`,
            ],
            [
              "Recommend",
              `${RECOMMEND_LIST}?genre=All&searchType=no&searchWord=&sortType=작성일New&pageNo=1`,
            ],
            ["Novel", NOVEL_LIST],
            ["Message", MESSAGE_LIST],
          ].map((_, idx) => {
            // when path is from novel detail to anywhere, mark Novel in the NavBar
            // but for other path, path is the same name in the Nav
            let isPath;
            if (idx === 2) {
              isPath = ["novel-detail", _[1]].filter((__) => pathname.includes(__)).length === 1;
            } else {
              isPath = pathname.includes(_[1]);
            }
            return (
              <NavContent
                key={_[0]}
                onClick={() => {
                  navigate(_[1]);
                }}
                isCurrentPath={isPath}
              >
                {_[0]}
              </NavContent>
            );
          })}
        </NavContentPC>

        <RightSideContnr>
          <SearchIconBox
            onClick={() => {
              dispatch(setSearchList({ listType: "searchAll", list: "reset" })); // 검색 필터 초기화
              navigate(`/search`);
            }}
          >
            <Icon.Search />
          </SearchIconBox>

          {loginUserInfo.userName && (
            <MyPageTablet
              onClick={() => {
                navigate(`/user-page/${loginUserInfo.userName}`);
              }}
            >
              보관함
            </MyPageTablet>
          )}
          {!loginUserInfo.userName && (
            <LoginText
              onClick={() => {
                dispatch(openModal("login"));
              }}
            >
              로그인
            </LoginText>
          )}
        </RightSideContnr>
      </NavContentBoxPC>
    </ThemeProvider>
  );
}

// all followings are only for Mobile, Tablet, not for PC //
export function NavMobileMainTop() {
  const theme = {};
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);

  return (
    <ThemeProvider theme={theme}>
      {/* top place */}
      <NavContentBoxMobile>
        <CatWalkingContainer>
          <CatWalking src={catWalking} alt="catWalking" />
        </CatWalkingContainer>
        <LogoContainer>
          <Logo src={logoMobile} onClick={() => navigate(`/`)} />
        </LogoContainer>

        <RightSideContnr>
          <SearchIconBox
            onClick={() => {
              dispatch(setSearchList({ listType: "searchAll", list: "reset" })); // 검색 필터 초기화
              navigate(`/search`);
            }}
          >
            <Icon.Search />
          </SearchIconBox>
          {loginUserInfo.userName && (
            <MyPageTablet
              onClick={() => {
                navigate(`/user-page/${loginUserInfo.userName}`);
              }}
            >
              보관함
            </MyPageTablet>
          )}
          {/* for mobile size */}
          {loginUserInfo.userName && (
            <MyPageMobile
              userImg={loginUserInfo.userImg}
              onClick={() => {
                navigate(`/user-page/${loginUserInfo.userName}`);
              }}
            />
          )}
          {!loginUserInfo.userName && (
            <LoginText
              onClick={() => {
                dispatch(openModal("login"));
              }}
            >
              로그인
            </LoginText>
          )}
          {/* for mobile size */}
          {!loginUserInfo.userName && (
            <LoginIconBox
              onClick={() => {
                dispatch(openModal("login"));
              }}
            >
              <Icon.Login />
            </LoginIconBox>
          )}
        </RightSideContnr>
      </NavContentBoxMobile>
    </ThemeProvider>
  );
}
export function NavMobileMainBottom({ pathname }: Props) {
  const theme = {};

  const isLoginUser = !!useAppSelector((state) => state.user.loginUserInfo.userId);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <ThemeProvider theme={theme}>
      {/* bottom place */}
      <NavContentBoxMobile isMainBottom>
        {/* [category name, route path] */}
        {[
          ["FreeTalk", TALK_LIST, freeTalk, freeTalkActive],
          ["Recommend", RECOMMEND_LIST, recommend, recommendActive],
          ["AddWriting", ADD_WRITING, addWriting, addWritingActive], // 추후 라우팅 필요
          ["Novel", NOVEL_LIST, novel, novelActive],
          ["Message", MESSAGE_LIST, message, messageActive],
        ].map((_, idx) => (
          <NavContent
            key={_[0]}
            onClick={() => {
              // 리스트 필터 초기화
              if ([0, 1].includes(idx)) {
                const initialFilters = {
                  genre: "All",
                  searchType: "Title",
                  searchWord: "",
                  sortType: "작성일New",
                  pageNo: 1,
                };

                const listType = idx === 0 ? "talk" : "recommend";

                dispatch(setSearchList({ listType, filters: initialFilters, list: "reset" }));
              }

              if ([2, 4].includes(idx) && !isLoginUser) {
                alert("로그인이 필요합니다");
                return;
              }

              if (idx === 2) {
                dispatch(
                  setSearchList({
                    listType: "novel",
                    list: "reset",
                  }),
                );
              }

              navigate(_[1]);
            }}
          >
            {/* not clicked or clicked element */}
            {pathname.includes(_[1]) === false && <NavImg src={_[2]} alt={_[0]} />}
            {pathname.includes(_[1]) && <NavImg src={_[3]} alt={_[0]} />}

            <NavText isActive={pathname.includes(_[1])}>{_[0]}</NavText>
          </NavContent>
        ))}
      </NavContentBoxMobile>
    </ThemeProvider>
  );
}

// below two Nav can be one Nav? maybe yes...
// novel list to novel list by category too? except for heart icon, share icon, page title

// from MainList to Detail : FreeTalkDetail, RecommendDetail
// via useParams: boardTitle is in the center of NavBar
// share icon, heart icon are in all
interface DetailProps {
  pathname: string;
  //   novelId: string;
  parameter?: {
    novelId?: string;
    talkId?: string;
    recommendId?: string;
  };
  handleMsgList?: {
    isListOpen: boolean;
    handleMsgOpen: () => void;
  };
}

interface InterfaceUserImg {
  src: string;
  position: string;
}

export function NavMobileDetail({ parameter, pathname, handleMsgList }: DetailProps) {
  // one nav component: top

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const novelTitle = useAppSelector((state) => state.modal.novelTitle);
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);
  const userInfoInUserPage = useAppSelector((state) => state.user.userInfoInUserPage);
  const { novelId } = useParams(); // when entering add-writing page from novel detail page

  //   const dispatch = useAppDispatch();
  //   const { novelLike } = useAppSelector((state) => state.modal);

  //   novelLike.
  //   novelLike.novelId === parameter.novelId

  // server request in two component when clicking heart
  // in this, Nav :  get user's isHeart
  // in NovelDetail : user's isHeart, heart number

  //   const [isLike, handleLike] = useState(isLikeNovel);

  // this useState is not required for server request.
  // just click heart, request sever state, use it.
  const theme = {};
  return (
    <ThemeProvider theme={theme}>
      {/* top place */}
      <NavContentBoxMobile isDetail isMsgList={handleMsgList ? true : undefined}>
        <IconsBox isLeft>
          {/* nav icon for normal case  */}
          {!(pathname.includes("add-writing") && !novelId) && !handleMsgList && (
            <LeftIconBox onClick={() => navigate(-1)}>
              <BackIcon />
            </LeftIconBox>
          )}
          {/* at add-writing page without novelId from useParams */}
          {pathname.includes("add-writing") && !novelId && (
            <LeftIconBox onClick={() => navigate("/")}>
              <Icon.CloseWriting />
            </LeftIconBox>
          )}
          {/* at message list page with message room for tablet */}
          {handleMsgList && (
            <LeftIconBox onClick={handleMsgList.handleMsgOpen}>
              {handleMsgList.isListOpen && <BackIcon />}
              {!handleMsgList.isListOpen && <ForwardIcon />}
            </LeftIconBox>
          )}
          {/* (from novelDetail to ...) or (from an user's page) : show Home Icon */}
          {(parameter?.novelId || pathname.includes("user-page")) && (
            <HomeIconBox
              onClick={() => {
                navigate("/");
                dispatch(setSearchList({ listType: "searchAll", list: "reset" })); // 검색 필터 초기화
              }}
            >
              <HomeIcon />
            </HomeIconBox>
          )}
        </IconsBox>
        {/* what page title is */}
        {[
          ["talk-detail", "여기는 프리톡!"],
          ["recommend-detail", "여기는 리코멘드!"],
          ["add-writing", "add writing"],
          ["message", loginUserInfo.userImg, loginUserInfo.userName],
          ["user-page", userInfoInUserPage.userImg, userInfoInUserPage.userName],
        ].map((_, idx) => {
          if (idx === 2 && !pathname.includes(_[0] as string) && parameter?.novelId) {
            return <PageTitle>{novelTitle}</PageTitle>;
          }
          if (idx === 2 && pathname.includes(_[0] as string)) {
            return <PageTitle>{_[1]}</PageTitle>;
          }
          if (idx === 3 && pathname.includes(_[0] as string)) {
            return (
              <PageTitle>
                <UserImg userImg={_[1] as InterfaceUserImg} />
                <UserName>{_[2]}</UserName>
              </PageTitle>
            );
          }
          if (idx === 4 && pathname.includes(_[0] as string)) {
            return (
              <PageTitle onClick={() => navigate(`/user-page/${_[2] as string}`)}>
                <UserImg userImg={_[1] as InterfaceUserImg} />
                <UserName>{_[2]}</UserName>
                <Icon.IconBox color={themeStyle.color.mainLight} styles="transform: scaleX(-1);">
                  <Icon.Runner />
                </Icon.IconBox>
              </PageTitle>
            );
          }
          if (pathname.includes(_[0] as string)) return <PageTitle>{_[1]}</PageTitle>;
        })}

        <IconsBox isRight>
          {(pathname === `/novel-detail/${parameter?.novelId as string}` ||
            parameter?.recommendId ||
            parameter?.talkId) && (
            <HeartIconBox
              onClick={() => {
                // handleLike(!isLikeNovel);
                // dispatch(setLikeNovel(!isLikeNovel));
              }}
            >
              <HeartIcon />
              {/* {isLikeNovel && <FillHeartIcon />} */}
              {/* {!isLikeNovel && <HeartIcon />} */}
            </HeartIconBox>
          )}
          {(parameter?.recommendId || parameter?.talkId) && (
            <ShareIconBox>
              <ShareIcon />
            </ShareIconBox>
          )}

          {/* submit writing */}
          {pathname?.includes("add-writing") && (
            <SubmitBtn onClick={() => dispatch(handleWritingToSubmitOnMobile(true))}>
              작성
            </SubmitBtn>
          )}
          {pathname === EDIT_WRITING && (
            <SubmitBtn onClick={() => dispatch(handleWritingToSubmitOnMobile(true))}>
              수정
            </SubmitBtn>
          )}

          {/* user page : my page button for tablet size */}
          {pathname.includes("user-page") && loginUserInfo.userName && (
            <MyPageTablet
              onClick={() => {
                navigate(`/user-page/${loginUserInfo.userName}`);
              }}
            >
              보관함
            </MyPageTablet>
          )}
          {/* user page : my page button for mobile size */}
          {pathname.includes("user-page") && loginUserInfo.userName && (
            <MyPageMobile
              userImg={loginUserInfo.userImg}
              onClick={() => {
                navigate(`/user-page/${loginUserInfo.userName}`);
              }}
            />
          )}
          {/* user page : login button for tablet size */}
          {pathname.includes("user-page") && !loginUserInfo.userName && (
            <LoginText
              onClick={() => {
                dispatch(openModal("login"));
              }}
            >
              로그인
            </LoginText>
          )}
          {/* user page : login button for mobile size */}
          {pathname.includes("user-page") && !loginUserInfo.userName && (
            <LoginIconBox
              onClick={() => {
                dispatch(openModal("login"));
              }}
            >
              <Icon.Login />
            </LoginIconBox>
          )}
        </IconsBox>
      </NavContentBoxMobile>
    </ThemeProvider>
  );
}
