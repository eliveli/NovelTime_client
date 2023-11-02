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
import { getCurrentRoomId, isCurrentPath, useWhetherItIsTablet } from "utils";
import { UnreadMessageNo } from "views/ChatRoomList";
import { handleAlert, openFirstModal } from "../../store/clientSlices/modalSlice";
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

  const resetList = (category: string) => {
    if (!["FreeTalk", "Recommend", "Novel"].includes(category)) return;

    let listType: "talk" | "recommend" | "novel";

    if (category === "FreeTalk") {
      listType = "talk";
    } else if (category === "Recommend") {
      listType = "recommend";
    } else {
      listType = "novel";
    }

    dispatch(setSearchList({ listType, list: "reset" }));
  };

  const handleNonLogin = (category: string) => {
    if (category === "Message" && !loginUser.userId) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "로그인이 필요합니다" }));
    }
  };

  const handleClick = (category: string, path: string) => {
    handleNonLogin(category);

    resetList(category);
    // for the case where the user have visited list page
    //  with mobile or tablet screen size where infinite scroll is used

    navigate(path);
  };

  const checkPath = (partialPath: string) => {
    if (partialPath === NOVEL_LIST && isCurrentPath(partialPath)) {
      // Don't highlight category if the current partial path "novel-list" is in the user page
      if (isCurrentPath(USER_PAGE)) return false;
      return true;
    }

    return isCurrentPath(partialPath);
  };

  // Darken user content while editing userBG
  const isEditingBG = !!useAppSelector((state) => state.userProfile.temporaryUserBG.src);

  return (
    <NavContentBoxPC>
      <LogoContainer>
        {!isEditingBG && <Logo src={logoPC} onClick={() => navigate(`/`)} />}
      </LogoContainer>

      <NavContentPC>
        {navCategory.map((_) => (
          <NavContent
            key={_.category}
            isMessageCategory={_.category === "Message"}
            isCurrentPath={checkPath(_.partialPath)}
            onClick={() => handleClick(_.category, _.path)}
          >
            {_.category}

            {_.category === "Message" && !!allUnreadMsgNo && (
              <UnreadMessageNo isForDesktopNav unreadMessageNo={allUnreadMsgNo} />
            )}
          </NavContent>
        ))}
      </NavContentPC>

      <RightSideContnr>
        <SearchIconBox
          onClick={() =>
            navigate(`${SEARCH_ALL}?searchCategory=Novel&searchType=Title&searchWord=&pageNo=1`)
          }
        >
          <Icon.Search />
        </SearchIconBox>

        {loginUser.userName ? (
          <MyPageTablet
            isEditingBG={isEditingBG}
            onClick={() => navigate(`${USER_PAGE}/${loginUser.userName}`)}
          >
            프로필
          </MyPageTablet>
        ) : (
          <LoginText onClick={() => dispatch(openFirstModal("login"))}>로그인</LoginText>
        )}
      </RightSideContnr>
    </NavContentBoxPC>
  );
}

// all belows are for Mobile, Tablet, not for PC //
export function NavMobileMainTop() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isTablet = useWhetherItIsTablet();
  const { userName, userImg } = useAppSelector((state) => state.loginUser.user);
  const isLoginUser = !!userName;

  return (
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
            프로필
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
              dispatch(openFirstModal("login"));
            }}
          >
            로그인
          </LoginText>
        )}
        {!isLoginUser && !isTablet && (
          <LoginIconBox
            onClick={() => {
              dispatch(openFirstModal("login"));
            }}
          >
            <Icon.Login />
          </LoginIconBox>
        )}
      </RightSideContnr>
    </NavContentBoxMobile>
  );
}

export function NavMobileMainBottom() {
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

  const resetList = (category: string) => {
    if (!["FreeTalk", "Recommend", "Novel"].includes(category)) return;

    let listType: "talk" | "recommend" | "novel";

    if (category === "FreeTalk") {
      listType = "talk";
    } else if (category === "Recommend") {
      listType = "recommend";
    } else {
      listType = "novel";
    }

    dispatch(setSearchList({ listType, list: "reset" }));
  };

  const handleNonLogin = (category: string) => {
    if (["AddPost", "Message"].includes(category) && !isLoginUser) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "로그인이 필요합니다" }));
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleClick = (category: string, path: string) => {
    handleNonLogin(category);

    // Don't navigate to the list page if current path is that
    //  to avoid displaying incorrect or no data with infinite scroll
    if ([TALK_LIST, RECOMMEND_LIST].includes(path) && isCurrentPath(path)) return;

    resetList(category);

    handleNavigate(path);
  };

  return (
    <NavContentBoxMobile isMainBottom>
      {navCategory.map((_) => (
        <NavContent
          key={_.category}
          isMessageCategory={_.category === "Message"}
          isPostPage={
            // Don't set hover when current path is post list page
            //  navigation also won't work here
            (_.category === "FreeTalk" && isCurrentPath(_.path)) ||
            (_.category === "Recommend" && isCurrentPath(_.path))
          }
          onClick={() => handleClick(_.category, _.path)}
        >
          {_.category === "Message" && !!allUnreadMsgNo && (
            <UnreadMessageNo isForMobileNav unreadMessageNo={allUnreadMsgNo} />
          )}

          <NavImg src={isCurrentPath(_.path) ? _.imgActive : _.img} alt={_.category} />

          <NavText isActive={isCurrentPath(_.path)}>{_.category}</NavText>
        </NavContent>
      ))}
    </NavContentBoxMobile>
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

  // Darken user content while editing userBG
  const isEditingBG = !!useAppSelector((state) => state.userProfile.temporaryUserBG.src);

  //
  if (isCurrentPath("iframe")) return <></>;

  return (
    <NavContentBoxMobile isDetail>
      <IconsBox isLeft>
        <LeftIconBox>
          {isCurrentPath(ADD_WRITING) || isCurrentPath(EDIT_WRITING) ? (
            <Icon.CloseWriting
              onClick={() => {
                if (window.location.search.includes("isToSearchInNovelPlatform")) {
                  navigate(-1); // back to search-novel/search-all page
                  return;
                }
                navigate("/", { replace: true });
              }}
            />
          ) : (
            <BackIcon onClick={() => navigate(-1)} />
          )}
        </LeftIconBox>

        {!isCurrentPath(ADD_WRITING) && !isCurrentPath(EDIT_WRITING) && (
          <HomeIconBox
            onClick={() => {
              navigate("/");
            }}
          >
            <HomeIcon />
          </HomeIconBox>
        )}
      </IconsBox>

      {isCurrentPath(USER_PAGE) && (
        <PageTitle onClick={() => navigate(`${USER_PAGE}/${profileUserName}`)} isHover>
          <UserImg userImg={profileUserImg} isEditingBG={isEditingBG} />
          <UserName>{profileUserName}</UserName>

          {!isEditingBG && (
            <Icon.IconBox
              color={themeStyle.color.mainLight}
              hover="none"
              styles="transform: scaleX(-1);"
            >
              <Icon.Runner />
            </Icon.IconBox>
          )}
        </PageTitle>
      )}
      {isCurrentPath(TALK_DETAIL) && <PageTitle>Free Talk</PageTitle>}
      {isCurrentPath(RECOMMEND_DETAIL) && <PageTitle>Recommend</PageTitle>}

      <IconsBox isRight>
        {isCurrentPath(ADD_WRITING) && (
          <SubmitBtn onClick={() => dispatch(handleWritingToSubmitOnMobile(true))}>작성</SubmitBtn>
        )}
        {isCurrentPath(EDIT_WRITING) && (
          <SubmitBtn onClick={() => dispatch(handleWritingToSubmitOnMobile(true))}>수정</SubmitBtn>
        )}

        {isCurrentPath(USER_PAGE) && isLoginUser && isTablet && (
          <MyPageTablet
            isEditingBG={isEditingBG}
            onClick={() => {
              navigate(`${USER_PAGE}/${loginUser.userName}`);
            }}
          >
            프로필
          </MyPageTablet>
        )}
        {isCurrentPath(USER_PAGE) && isLoginUser && !isTablet && (
          <MyPageMobile
            isEditingBG={isEditingBG}
            userImg={loginUser.userImg}
            onClick={() => {
              navigate(`${USER_PAGE}/${loginUser.userName}`);
            }}
          />
        )}
        {isCurrentPath(USER_PAGE) && !isLoginUser && isTablet && (
          <LoginText
            onClick={() => {
              dispatch(openFirstModal("login"));
            }}
          >
            로그인
          </LoginText>
        )}
        {isCurrentPath(USER_PAGE) && !isLoginUser && !isTablet && (
          <LoginIconBox
            onClick={() => {
              dispatch(openFirstModal("login"));
            }}
          >
            <Icon.Login />
          </LoginIconBox>
        )}
      </IconsBox>
    </NavContentBoxMobile>
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
  const loginUser = useAppSelector((state) => state.loginUser.user);

  const currentRoomId = getCurrentRoomId();

  const rooms = useAppSelector((state) => state.chat.rooms);
  const room = rooms[currentRoomId];

  const partnerUserName = room ? room.partnerUserName : "";
  const partnerUserImg = room
    ? room.partnerUserImg
    : {
        src: "",
        position: "",
      };

  return (
    <ChatRoomNavContainer>
      <IconsBox isLeft>
        {isCurrentPath(CHAT_ROOM_LIST) ? (
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

      <PageTitle isHover onClick={() => navigate(`${USER_PAGE}/${partnerUserName}`)}>
        <UserImg userImg={partnerUserImg} />
        <UserName>{partnerUserName}</UserName>
      </PageTitle>

      <IconsBox isRight>
        {!isCurrentPath(CHAT_ROOM_LIST) && (
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
