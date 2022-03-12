import styled from "styled-components";

import { FaChevronRight, FaRegHeart, FaRegComment } from "react-icons/fa";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";

// Recommend List 에서 글 제목 오른쪽에 쓰일 때
const Right = styled(FaChevronRight)`
  color: rgba(100, 100, 100, 0.5);
  margin: auto;
  margin-left: 6px;
  /* 태블릿, PC */
  @media screen and (min-width: 768px) {
    margin-left: 8px;
  }
`;
const Heart = styled(FaRegHeart)``;
const Comment = styled(FaRegComment)``;
const SlideRight = styled(BiChevronRight)`
  color: rgba(100, 100, 100, 0.4);
`;
const SlideLeft = styled(BiChevronLeft)`
  color: rgba(100, 100, 100, 0.4);
`;

const Icon = {
  Right,
  Heart,
  Comment,
  SlideRight,
  SlideLeft,
};
export default Icon;
