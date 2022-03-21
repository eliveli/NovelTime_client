import styled from "styled-components";

import {
  FaChevronRight,
  FaChevronLeft,
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
import { GrClose, GrShareOption } from "react-icons/gr";
import { BsJournalRichtext, BsChevronLeft } from "react-icons/bs";
import {
  HiOutlineShare,
  HiHeart,
  HiOutlineHeart,
  HiOutlineChevronLeft,
  HiPlus,
  HiOutlineHome,
} from "react-icons/hi";
import { RiRunLine } from "react-icons/ri";
import { MdOutlineShare } from "react-icons/md";

// Recommend List 에서 글 제목 오른쪽에 쓰일 때
const BigRight = styled(FaChevronRight)`
  color: rgba(100, 100, 100, 0.5);
`;
const BigDown = styled(FaChevronDown)`
  color: rgba(100, 100, 100, 0.5);
`;
const BigUp = styled(FaChevronUp)`
  color: rgba(100, 100, 100, 0.5);
`;
const SmallDown = styled(BiChevronDown)`
  color: rgba(100, 100, 100, 0.5);
`;
const SmallUp = styled(BiChevronUp)`
  color: rgba(100, 100, 100, 0.5);
`;
const Heart = styled(FaRegHeart)``;
const NavFillHeart = styled(HiHeart)``;
const NavHeart = styled(HiOutlineHeart)``;
const Comment = styled(FaRegComment)``;
const SmallRight = styled(BiChevronRight)`
  color: rgba(100, 100, 100, 0.4);
`;
const SmallLeft = styled(BiChevronLeft)`
  color: rgba(100, 100, 100, 0.4);
`;
const BigLeft = styled(HiOutlineChevronLeft)`
  color: rgba(100, 100, 100, 0.4);
`;
const Close = styled(GrClose)``;
const Text = styled(BsJournalRichtext)``;
const Hand = styled(FaRegHandPointer)``;
const Plus = styled(HiPlus)``;
const Reader = styled(BiBookReader)``;
const Runner = styled(RiRunLine)``;
const Share = styled(MdOutlineShare)``;
const Home = styled(HiOutlineHome)``;

const Icon = {
  BigRight,
  BigDown,
  BigUp,
  Heart,
  Comment,
  SmallRight,
  SmallLeft,
  BigLeft,
  SmallDown,
  SmallUp,
  Close,
  Text,
  Hand,
  Plus,
  Reader,
  Runner,
  Share,
  Home,
  NavHeart,
  NavFillHeart,
};
export default Icon;
