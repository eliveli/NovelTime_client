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
  align-items: flex-end;
  /* margin-top: 20px; */

  border-top: 1px dotted rgba(0, 0, 0, 0.1);
  padding: 8px 20px 0;
  margin-top: 18px;
  ${theme.media.mobile(`
      padding: 8px 12px 0;
  `)}
`;
const IconBox = styled(Icon.IconBox)``;
const HeartIcon = styled(Icon.BigEmptyHeart)``;
const FillHeartIcon = styled(Icon.BigFillHeart)``;
const ShareIcon = styled(Icon.Share)``;
const LikeNumber = styled.span`
  /* margin-right: 10px; */
  margin-right: 20px;
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
      <IconBox size={23}>
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
