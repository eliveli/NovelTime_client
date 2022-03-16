import baseStyled, { ThemedStyledInterface } from "styled-components";

const color = {
  textGray: "#606060c2",
  lightGray100_1: "rgba(100,100,100,0.1)",
  lightGray100_2: "rgba(100,100,100,0.2)",
  lightGray0_1: "rgba(0,0,0,0.1)",
};
const tablet = (styling: string) => `@media (min-width: 768px){${styling}}`;
const desktop = (styling: string) => `@media (min-width: 1024px){${styling}}`;
const hover = (configHover: string) => `@media (hover: hover) {
  &:hover {
    ${configHover}
  }
}
`;

const media = {
  tablet,
  desktop,
  hover,
};
const theme = {
  color,
  media,
};

export default theme;
export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
