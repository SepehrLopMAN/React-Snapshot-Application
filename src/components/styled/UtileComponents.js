import styled, { css } from "styled-components";

export const PageTitle = styled.h1`
  text-align: center;
  font-family: "M PLUS Rounded 1c", sans-serif;
  border-bottom: 1px solid grey;
  display: inline-block;4465rem;
  margin: 2rem auto;
`;

export const ShaperWrapper = styled.div.attrs(({ $width, $height }) => ({
  style: {
    width: $width
      ? `${$width}px`
      : "calc(55vmin - 1rem - 1.5rem /* hover/active state size */)",
    height: $height
      ? `${$height}px`
      : "calc(55vmin - 1rem - 1.5rem /* hover/active state size */)",
  },
}))`
  position: relative;
  border: 2px dashed grey;
  margin: 4rem auto;
  min-width: 225px;
  min-height: 225px;
`;

export const ModifiableShape = styled.div.attrs(
  ({ $borderRadius: { top, bottom, left, right } }) => {
    return {
      style: {
        borderRadius: `${top}% ${100 - top}% ${
          100 - bottom
        }% ${bottom}% / ${left}% ${right}% ${100 - right}% ${100 - left}%`,
      },
    };
  }
)`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(45deg, darkblue, deeppink);
  box-shadow: -100px 100px 0px 0px #ffffff12;
`;

export const SliderSpan = styled.span`
  & {
    position: absolute;
    ${({ $right, $left }) =>
      ($right || $left) &&
      css`
        transform-origin: left;
        transform: rotate(90deg);
      `}
    background: transparent;
    border: 2px solid black;
    height: 1rem;
    width: 1rem;
    background: white;
    cursor: pointer;
    transition: background-color 300ms, box-shadow 300ms;
    user-select: none;
    box-sizing: border-box;
    touch-action: none;
  }
  &:hover,
  &:active {
    background-color: aqua;
    box-shadow: 0 0 0 0.375rem white;
  }
`;
