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
} from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { BsJournalRichtext } from "react-icons/bs";
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineChevronLeft,
  HiPlus,
  HiOutlineHome,
} from "react-icons/hi";
import { RiRunLine } from "react-icons/ri";
import { MdOutlineShare } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
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
  background-color: ${({ bgColor }) => bgColor || "white"};
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
  BigRight: FaChevronRight,
  BigDown: FaChevronDown,
  BigUp: FaChevronUp,
  Heart: FaRegHeart,
  Comment: FaRegComment,
  SmallRight: BiChevronRight,
  SmallLeft: BiChevronLeft,
  BigLeft: HiOutlineChevronLeft,
  SmallDown: styled(BiChevronDown)`
    ${iconStyleHover()};
  `,
  SmallUp: styled(BiChevronUp)`
    ${iconStyleHover()};
  `,
  Close: GrClose,
  Text: BsJournalRichtext,
  Hand: styled(FaRegHandPointer)`
    ${iconStyleHover()};
  `,
  Plus: HiPlus,
  Reader: styled(BiBookReader)`
    ${iconStyle()};
  `,
  Runner: styled(RiRunLine)`
    ${iconStyle()};
  `,
  Share: styled(MdOutlineShare)`
    ${iconStyleHover()};
  `,
  Home: styled(HiOutlineHome)`
    ${iconStyleHover()};
  `,
  NavHeart: styled(HiOutlineHeart)`
    ${iconStyleHover()};
  `,
  NavFillHeart: styled(HiHeart)`
    ${iconStyleHover()};
  `,
  Search: styled(IoIosSearch)`
    ${iconStyleHover()};
  `,
};
export default Icon;
