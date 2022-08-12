import {
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaRegHeart,
  FaRegComment,
  FaRegHandPointer,
  FaTwitterSquare,
} from "react-icons/fa";
import {
  BiBookReader,
  BiChevronRight,
  BiChevronLeft,
  BiChevronDown,
  BiChevronUp,
  BiUser,
} from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import {
  BsJournalRichtext,
  BsEmojiSunglasses,
  BsPencilSquare,
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsFillRecordFill,
  BsLink45Deg,
} from "react-icons/bs";
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiPlus,
  HiOutlineHome,
} from "react-icons/hi";
import { RiRunLine, RiShareForward2Fill, RiKakaoTalkFill } from "react-icons/ri";
import { MdOutlineShare, MdOutlineMoreHoriz } from "react-icons/md";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { AiOutlineUser, AiOutlineMessage, AiOutlineLogout, AiFillFacebook } from "react-icons/ai";
import { ImBooks } from "react-icons/im";
import { SiNaver } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

import { openModal } from "store/clientSlices/modalSlice";
import { useAppDispatch } from "store/hooks";
import theme, { styled } from "./styles/theme";

const IconBox = styled.div<{
  zIndex?: number;
  bgColor?: string;
  size?: number;
  color?: string;
  noPointer?: boolean;
  hover?: string;
  styles?: string;
}>`
  z-index: ${({ zIndex }) => zIndex || 1};
  background-color: ${({ bgColor }) => bgColor || "transparent"};
  color: ${({ color }) => color || "rgba(0, 0, 0, 0.3)"};

  min-width: ${({ size }) => size || 25}px;
  max-width: ${({ size }) => size || 25}px;
  min-height: ${({ size }) => size || 25}px;
  max-height: ${({ size }) => size || 25}px;

  ${({ noPointer }) => noPointer && "pointer-events: none;"};

  @media (hover: hover) {
    &:hover {
      ${({ hover }) =>
        hover ||
        `cursor: pointer;
         opacity: 0.8;
      `}
    }
  }

  ${({ styles }) => styles}
`;
const iconStyle = () => `
    width: 100%;
    height: 100%;
`;
const iconStyleHover = () => `
    width: 100%;
    height: 100%;
    ${theme.media.hover(`
      color: rgba(0, 0, 0, 0.2);
  `)}`;

const TogglingBigHeartIcon = styled(HiHeart)<{ isLike: boolean }>`
  width: 100%;
  height: 100%;
  color: ${({ isLike }) => (isLike ? `${theme.color.main}` : `rgba(150, 150, 150, 0.4)`)};

  @media (hover: hover) {
    &:hover {
      ${({ isLike }) =>
        isLike
          ? `color: rgba(0, 0, 0, 0.2);`
          : `color: ${theme.color.mainLight};
        `}
    }
  }
`;

const Icon = {
  IconBox,
  Write: styled(BsPencilSquare)`
    ${iconStyle()};
  `,
  NovelList: styled(ImBooks)`
    ${iconStyle()};
  `,
  ListRight: styled(FaChevronRight)``,
  BigDown: FaChevronDown,
  BigUp: FaChevronUp,
  BigRight: styled(HiOutlineChevronRight)`
    ${iconStyle()};
  `,
  BigLeft: styled(HiOutlineChevronLeft)`
    ${iconStyle()};
  `,
  Naver: styled(SiNaver)`
    ${iconStyleHover()};
  `,
  Kakao: styled(RiKakaoTalkFill)`
    ${iconStyleHover()};
  `,
  Google: styled(FcGoogle)`
    ${iconStyleHover()};
  `,
  FaceBook: styled(AiFillFacebook)`
    ${iconStyleHover()};
  `,
  Twitter: styled(FaTwitterSquare)`
    ${iconStyleHover()};
  `,
  Link: styled(BsLink45Deg)`
    ${iconStyleHover()};
  `,
  Emoji: styled(BsEmojiSunglasses)`
    ${iconStyleHover()};
  `,
  Close: styled(GrClose)`
    ${iconStyle()};
  `,
  CloseWriting: styled(IoMdClose)`
    ${iconStyleHover()};
  `,
  Login: styled(AiOutlineUser)`
    ${iconStyle()};
  `,
  Logout: styled(AiOutlineLogout)`
    ${iconStyle()};
  `,
  Text: styled(BsJournalRichtext)`
    ${iconStyle()};
  `,
  Plus: styled(HiPlus)`
    ${iconStyle()};
  `,
  SmallHeart: styled(FaRegHeart)`
    ${iconStyle()};
  `,
  Comment: styled(FaRegComment)`
    ${iconStyle()};
  `,
  CommentLabel: styled(AiOutlineMessage)`
    ${iconStyle()};
  `,
  SmallRight: styled(BiChevronRight)`
    ${iconStyle()};
  `,
  SmallLeft: styled(BiChevronLeft)`
    ${iconStyle()};
  `,
  SmallDown: styled(BiChevronDown)`
    ${iconStyleHover()};
  `,
  SmallUp: styled(BiChevronUp)`
    ${iconStyleHover()};
  `,
  Hand: styled(FaRegHandPointer)`
    ${iconStyleHover()};
  `,
  Reader: styled(BiBookReader)`
    ${iconStyle()};
  `,
  Runner: styled(RiRunLine)`
    ${iconStyle()};
  `,
  Share: styled(MdOutlineShare)`
    ${iconStyleHover()};
  `,
  ShareWithArrow: () => {
    const dispatch = useAppDispatch();

    const SharingIcon = styled(RiShareForward2Fill)`
      ${iconStyleHover()};
    `;
    return (
      <SharingIcon
        onClick={() => {
          dispatch(openModal("share"));
        }}
      />
    );
  },

  Home: styled(HiOutlineHome)`
    ${iconStyleHover()};
  `,
  BigEmptyHeart: styled(HiOutlineHeart)`
    ${iconStyleHover()};
  `,
  BigFillHeart: styled(HiHeart)`
    ${iconStyleHover()};
  `,
  TogglingBigHeartIcon,
  Search: styled(IoIosSearch)`
    ${iconStyleHover()};
  `,
  More: styled(MdOutlineMoreHoriz)`
    ${iconStyleHover()};
  `,
  PositionLeft: styled(BsFillCaretLeftFill)`
    ${iconStyleHover()};
  `,
  PositionRight: styled(BsFillCaretRightFill)`
    ${iconStyleHover()};
  `,
  PositionTop: styled(BsFillCaretUpFill)`
    ${iconStyleHover()};
  `,
  PositionBottom: styled(BsFillCaretDownFill)`
    ${iconStyleHover()};
  `,
  PositionCenter: styled(BsFillRecordFill)`
    ${iconStyleHover()};
  `,
};
export default Icon;
