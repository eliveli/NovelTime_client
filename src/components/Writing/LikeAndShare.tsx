import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

type Props = React.PropsWithChildren<{
  isLike: boolean;
  likeNO: number;
}>;
// when with NovelInfo
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IconContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;
const IconBox = styled(Icon.IconBox)``;
const HeartIcon = styled(Icon.NavHeart)``;
const FillHeartIcon = styled(Icon.NavFillHeart)``;
const ShareIcon = styled(Icon.Share)``;
const LikeNumber = styled.span`
  margin-right: 10px;
  margin-left: 5px;
`;
export default function LikeAndShare({ isLike, likeNO }: Props) {
  return (
    <IconContainer>
      <IconBox>
        {isLike && <FillHeartIcon />}
        {!isLike && <HeartIcon />}
      </IconBox>
      <LikeNumber>{likeNO}</LikeNumber>
      <IconBox>
        <ShareIcon />
      </IconBox>
    </IconContainer>
  );
}
// export default function LikeAndShare({ children, isLike, likeNO }: Props) {
//   return (
//     <Container>
//       <IconContainer>
//         <IconBox>
//           {isLike && <FillHeartIcon />}
//           {!isLike && <HeartIcon />}
//         </IconBox>
//         <LikeNumber>{likeNO}</LikeNumber>
//         <IconBox>
//           <ShareIcon />
//         </IconBox>
//       </IconContainer>
//       {children}
//     </Container>
//   );
// }
