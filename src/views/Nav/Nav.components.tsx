import { ThemeProvider } from "styled-components";
import themeStyle from "assets/styles/theme";
import { useNavigate, useParams } from "react-router-dom";
import {
  freeTalk,
  freeTalkActive,
  recommend,
  recommendActive,
  addWriting,
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
  CHAT_ROOM_LIST,
  NOVEL_LIST,
  RECOMMEND_DETAIL,
  RECOMMEND_LIST,
  SEARCH_ALL,
  TALK_DETAIL,
  TALK_LIST,
  USER_PAGE,
} from "utils/pathname";
import { setSearchList } from "store/clientSlices/filterSlice";
import { isThePath, useWhetherItIsTablet } from "utils";
import { Img } from "store/serverAPIs/types";
import { UnreadMessageNo } from "views/ChatRoomList";
import { openModal } from "../../store/clientSlices/modalSlice";
import { handleWritingToSubmitOnMobile } from "../../store/clientSlices/writingSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import {
  BackIcon,
  ForwardIcon,
  LeftIconBox,
  NavContentBoxPC,
  NavContentBoxMobile,
  NavContentPC,
  MyPageTablet,
  NavContent,
  HomeIcon,
  HomeIconBox,
  IconsBox,
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
  ChatRoomNavContainer,
} from "./Nav.styles";

export function NavPC() {
  const theme = {};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginUser = useAppSelector((state) => state.loginUser.user);
  const allUnreadMsgNo = useAppSelector((state) => state.chat.allUnreadMsgNo);

  const navCategory = [
    {
      category: "FreeTalk",
      path: `${TALK_LIST}?genre=All&searchType=no&searchWord=&sortType=작성일New&pageNo=1`,
      partialPath: TALK_LIST,
    },
    {
      category: "Recommend",
      path: `${RECOMMEND_LIST}?genre=All&searchType=no&searchWord=&sortType=작성일New&pageNo=1`,
      partialPath: RECOMMEND_LIST,
    },
    { category: "Novel", path: NOVEL_LIST, partialPath: NOVEL_LIST },
    { category: "Message", path: CHAT_ROOM_LIST, partialPath: CHAT_ROOM_LIST },
  ];

  return (
    <ThemeProvider theme={theme}>
      <NavContentBoxPC>
        <LogoContainer>
          <Logo src={logoPC} onClick={() => navigate(`/`)} />
        </LogoContainer>

        <NavContentPC>
          {navCategory.map((_) => (
            <NavContent
              key={_.category}
              isUnreadMessageNo={!!allUnreadMsgNo}
              onClick={() => {
                if (_.category === "Message" && !loginUser.userId) {
                  alert("로그인이 필요합니다");
                  return;
                }

                navigate(_.path);
              }}
              isCurrentPath={isThePath(_.partialPath)}
            >
              {_.category}

              {_.category === "Message" && (
                <UnreadMessageNo isForDesktopNav unreadMessageNo={allUnreadMsgNo} />
              )}
            </NavContent>
          ))}
        </NavContentPC>

        <RightSideContnr>
          <SearchIconBox
            onClick={() => {
              navigate(`${SEARCH_ALL}?searchCategory=Novel&searchType=Title&searchWord=&pageNo=1`);
            }}
          >
            <Icon.Search />
          </SearchIconBox>

          {loginUser.userName ? (
            <MyPageTablet
              onClick={() => {
                navigate(`${USER_PAGE}/${loginUser.userName}`);
              }}
            >
              보관함
            </MyPageTablet>
          ) : (
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

// all below are for Mobile, Tablet, not for PC //
export function NavMobileMainTop() {
  const theme = {};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isTablet = useWhetherItIsTablet();
  const { userName, userImg } = useAppSelector((state) => state.loginUser.user);
  const isLoginUser = !!userName;

  return (
    <ThemeProvider theme={theme}>
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
              dispatch(setSearchList({ listType: "searchAll", list: "reset" }));
              navigate(SEARCH_ALL);
            }}
          >
            <Icon.Search />
          </SearchIconBox>

          {isLoginUser && isTablet && (
            <MyPageTablet
              onClick={() => {
                navigate(`/user-page/${userName}`);
              }}
            >
              보관함
            </MyPageTablet>
          )}
          {isLoginUser && !isTablet && (
            <MyPageMobile
              userImg={userImg}
              onClick={() => {
                navigate(`/user-page/${userName}`);
              }}
            />
          )}
          {!isLoginUser && isTablet && (
            <LoginText
              onClick={() => {
                dispatch(openModal("login"));
              }}
            >
              로그인
            </LoginText>
          )}
          {!isLoginUser && !isTablet && (
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

export function NavMobileMainBottom() {
  const theme = {};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoginUser = !!useAppSelector((state) => state.loginUser.user.userId);
  const allUnreadMsgNo = useAppSelector((state) => state.chat.allUnreadMsgNo);

  const navCategory = [
    {
      category: "FreeTalk",
      path: TALK_LIST,
      img: freeTalk,
      imgActive: freeTalkActive,
    },
    {
      category: "Recommend",
      path: RECOMMEND_LIST,
      img: recommend,
      imgActive: recommendActive,
    },
    {
      category: "AddPost",
      path: ADD_WRITING,
      img: addWriting,
    },
    {
      category: "Novel",
      path: NOVEL_LIST,
      img: novel,
      imgActive: novelActive,
    },
    {
      category: "Message",
      path: CHAT_ROOM_LIST,
      img: message,
      imgActive: messageActive,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <NavContentBoxMobile isMainBottom>
        {navCategory.map((_) => (
          <NavContent
            key={_.category}
            isUnreadMessageNo={!!allUnreadMsgNo}
            onClick={() => {
              if (["FreeTalk", "Recommend", "Novel"].includes(_.category)) {
                let listType: "talk" | "recommend" | "novel";

                if (_.category === "FreeTalk") {
                  listType = "talk";
                } else if (_.category === "Recommend") {
                  listType = "recommend";
                } else {
                  listType = "novel";
                }

                dispatch(setSearchList({ listType, list: "reset" }));
              }

              if (["AddPost", "Message"].includes(_.category) && !isLoginUser) {
                alert("로그인이 필요합니다");
                return;
              }

              navigate(_.path);
            }}
          >
            {_.category === "Message" && (
              <UnreadMessageNo isForMobileNav unreadMessageNo={allUnreadMsgNo} />
            )}

            <NavImg src={isThePath(_.path) ? _.imgActive : _.img} alt={_.category} />

            <NavText isActive={isThePath(_.path)}>{_.category}</NavText>
          </NavContent>
        ))}
      </NavContentBoxMobile>
    </ThemeProvider>
  );
}

export function NavMobileDetail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginUser = useAppSelector((state) => state.loginUser.user);
  const isLoginUser = !!loginUser.userName;
  const isTablet = useWhetherItIsTablet();

  // not to display a previous user even for a second just before getting new user with query
  const { userName: userNameFromURL } = useParams();
  const { userName: userNameFromSlice, userImg: userImgFromSlice } = useAppSelector(
    (state) => state.userProfile.user,
  );
  const profileUserName = userNameFromSlice === userNameFromURL ? userNameFromSlice : "";
  const profileUserImg =
    userNameFromSlice === userNameFromURL ? userImgFromSlice : { src: "", position: "" };

  const theme = {};
  return (
    <ThemeProvider theme={theme}>
      <NavContentBoxMobile isDetail>
        <IconsBox isLeft>
          <LeftIconBox onClick={() => navigate(-1)}>
            {isThePath(ADD_WRITING) || isThePath(EDIT_WRITING) ? (
              <Icon.CloseWriting />
            ) : (
              <BackIcon />
            )}
          </LeftIconBox>

          {!isThePath("iframe") && !isThePath(ADD_WRITING) && !isThePath(EDIT_WRITING) && (
            <HomeIconBox
              onClick={() => {
                navigate("/");
              }}
            >
              <HomeIcon />
            </HomeIconBox>
          )}
        </IconsBox>

        {isThePath(USER_PAGE) && (
          <PageTitle onClick={() => navigate(`${USER_PAGE}/${profileUserName}`)}>
            <UserImg userImg={profileUserImg} />
            <UserName>{profileUserName}</UserName>
            <Icon.IconBox color={themeStyle.color.mainLight} styles="transform: scaleX(-1);">
              <Icon.Runner />
            </Icon.IconBox>
          </PageTitle>
        )}
        {isThePath(TALK_DETAIL) && <PageTitle>Free Talk</PageTitle>}
        {isThePath(RECOMMEND_DETAIL) && <PageTitle>Recommend</PageTitle>}

        <IconsBox isRight>
          {isThePath(ADD_WRITING) && (
            <SubmitBtn onClick={() => dispatch(handleWritingToSubmitOnMobile(true))}>
              작성
            </SubmitBtn>
          )}
          {isThePath(EDIT_WRITING) && (
            <SubmitBtn onClick={() => dispatch(handleWritingToSubmitOnMobile(true))}>
              수정
            </SubmitBtn>
          )}

          {isThePath(USER_PAGE) && isLoginUser && isTablet && (
            <MyPageTablet
              onClick={() => {
                navigate(`${USER_PAGE}/${loginUser.userName}`);
              }}
            >
              보관함
            </MyPageTablet>
          )}
          {isThePath(USER_PAGE) && isLoginUser && !isTablet && (
            <MyPageMobile
              userImg={loginUser.userImg}
              onClick={() => {
                navigate(`${USER_PAGE}/${loginUser.userName}`);
              }}
            />
          )}
          {isThePath(USER_PAGE) && !isLoginUser && isTablet && (
            <LoginText
              onClick={() => {
                dispatch(openModal("login"));
              }}
            >
              로그인
            </LoginText>
          )}
          {isThePath(USER_PAGE) && !isLoginUser && !isTablet && (
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

// used where both chat room list page and chat room page
export function ChatRoomNav({
  roomSpread,
}: {
  roomSpread?: {
    // used for chat room list page only
    isRoomSpread: boolean;
    spreadRoomOrNot: () => void;
  };
}) {
  const navigate = useNavigate();
  const partnerUser = useAppSelector((state) => state.chat.partnerUser);
  const loginUser = useAppSelector((state) => state.loginUser.user);

  return (
    <ChatRoomNavContainer>
      <IconsBox isLeft>
        {isThePath(CHAT_ROOM_LIST) ? (
          // on tablet or desktop
          // used for chat room list page
          // placed above a chat room component next to chat room list component
          <LeftIconBox onClick={roomSpread?.spreadRoomOrNot}>
            {roomSpread?.isRoomSpread ? <ForwardIcon /> : <BackIcon />}
          </LeftIconBox>
        ) : (
          // on mobile
          // used for single chat room page
          // placed on top navigation space (as part of <ChatRoomNavMobile> component)
          <>
            <LeftIconBox onClick={() => navigate(-1)}>
              <BackIcon />
            </LeftIconBox>

            <HomeIconBox
              onClick={() => {
                navigate("/");
              }}
            >
              <HomeIcon />
            </HomeIconBox>
          </>
        )}
      </IconsBox>

      <PageTitle onClick={() => navigate(`${USER_PAGE}/${partnerUser.userName}`)}>
        <UserImg userImg={partnerUser.userImg as Img} />
        <UserName>{partnerUser.userName}</UserName>
      </PageTitle>

      <IconsBox isRight>
        {!isThePath(CHAT_ROOM_LIST) && (
          <MyPageMobile
            userImg={loginUser.userImg}
            onClick={() => {
              navigate(`${USER_PAGE}/${loginUser.userName}`);
            }}
          />
        )}
      </IconsBox>
    </ChatRoomNavContainer>
  );
}
