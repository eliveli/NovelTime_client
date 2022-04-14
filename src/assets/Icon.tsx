import {
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaRegHeart,
  FaRegComment,
  FaRegHandPointer,
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
import { BsJournalRichtext, BsEmojiSunglasses } from "react-icons/bs";
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
import { AiOutlineUser } from "react-icons/ai";
import { SiNaver, SiKakaotalk } from "react-icons/si";

import theme, { styled } from "./styles/theme";

const IconBox = styled.div<{
  zIndex?: number;
  bgColor?: string;
  size?: number;
  color?: string;
  noPointer?: boolean;
  hover?: string;
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

const Icon = {
  IconBox,
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
  SharePC: styled(RiShareForward2Fill)`
    ${iconStyleHover()};
  `,
  Home: styled(HiOutlineHome)`
    ${iconStyleHover()};
  `,
  BigEmptyHeart: styled(HiOutlineHeart)`
    ${iconStyleHover()};
  `,
  BigFillHeart: styled(HiHeart)`
    ${iconStyleHover()};
  `,
  Search: styled(IoIosSearch)`
    ${iconStyleHover()};
  `,
  More: styled(MdOutlineMoreHoriz)`
    ${iconStyleHover()};
  `,
};
export default Icon;
