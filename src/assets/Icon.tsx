import styled from "styled-components";

import { FaChevronRight, FaRegHeart, FaRegComment } from "react-icons/fa";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";

// Recommend List 에서 글 제목 오른쪽에 쓰일 때
const BigRight = styled(FaChevronRight)`
  color: rgba(100, 100, 100, 0.5);
`;
const Heart = styled(FaRegHeart)``;
const Comment = styled(FaRegComment)``;
const SmallRight = styled(BiChevronRight)`
  color: rgba(100, 100, 100, 0.4);
`;
const SmallLeft = styled(BiChevronLeft)`
  color: rgba(100, 100, 100, 0.4);
`;

const Icon = {
  BigRight,
  Heart,
  Comment,
  SmallRight,
  SmallLeft,
};
export default Icon;
