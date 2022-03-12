import styled from "styled-components";

import { FaChevronRight, FaRegHeart, FaRegComment } from "react-icons/fa";

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

const Icon = {
  Right,
  Heart,
  Comment,
};
export default Icon;
