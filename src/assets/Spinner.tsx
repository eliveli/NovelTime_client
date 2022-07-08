import { keyframes } from "styled-components";
import { StaticSpinner } from "./images";
import { styled } from "./styles/theme";

const spinnerShowOn = keyframes`
      from{
        clip-path:inset(0 0 100% 0);
        opacity: 0.1;
      }
      to{
        clip-path: inset(0 0 0 0);
        opacity: 1;
      }
    `;

// center the spinner
const fixedStyles = `
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: ${-94 / 2}px;
  margin-left: ${-87 / 2}px;
`;

const SpinnerContnr = styled.div<{ styles?: string }>`
  z-index: 2;

  position: absolute;
  margin-left: auto;
  margin-right: auto;

  ${({ styles }) => styles === "fixed" && fixedStyles}
  animation-name: ${spinnerShowOn};
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 1.5s;
`;

export default function Spinner({ styles }: { styles?: string }) {
  return (
    <SpinnerContnr styles={styles}>
      <StaticSpinner />
    </SpinnerContnr>
  );
}
