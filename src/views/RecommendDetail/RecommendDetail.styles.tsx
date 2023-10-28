import theme, { styled } from "assets/styles/theme";
import { keyframes } from "styled-components";

export const DotLine = styled.div`
  margin: 5px 17px;
  border-top: 8px dashed rgba(0, 0, 0, 0.1);

  ${theme.media.mobile(`
    padding-top: 12px;
  `)}
  ${theme.media.tablet(`
    padding-top: 20px;
  `)}
`;
// animation
const dotShowOn = keyframes`
  from{
    margin-top: -20px;
    opacity: 0.1;
}
to{
      margin-top: 5px;
    opacity: 1;
  }
`;
const contentHidden = keyframes`
    from{opacity:0;}
    to{opacity:0;}
`;
const contentShowOn = keyframes`
  from{
    clip-path:inset(0 0 100% 0);
    opacity: 0.1;
  }
  to{
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
`;
export const DotAnimation = styled.div`
  animation-name: ${dotShowOn};
  animation-direction: normal;
  animation-duration: 1.3s;
  animation-fill-mode: forwards;
`;
export const ContentAnimation = styled.div<{ isTalkComnt?: true }>`
  animation-name: ${contentHidden}, ${contentShowOn};
  animation-direction: normal;
  animation-fill-mode: forwards;

  animation-duration: ${({ isTalkComnt }) => (isTalkComnt ? `0.15s, 1.3s ` : `0.5s, 1.3s`)};
  animation-delay: ${({ isTalkComnt }) => (isTalkComnt ? `0s, 0.15s ` : `0s, 0.5s`)};
`;
