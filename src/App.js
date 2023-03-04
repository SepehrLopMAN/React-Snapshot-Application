import { useReducer, useRef } from "react";
import styled, { css } from "styled-components";
import "./App.css";

const PageTitle = styled.h1`
  text-align: center;
  font-family: "M PLUS Rounded 1c", sans-serif;
  border-bottom: 1px solid grey;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.125rem;
  padding: 0.875rem 1.5rem;
  margin: 2rem auto;
`;

const ShaperWrapper = styled.div`
  position: relative;
  border: 2px dashed grey;
  width: ${({ $width }) =>
    $width ?? "calc(100vmin - 1rem - 1.5rem /* hover/active state size */)"};
  height: ${({ $height }) =>
    $height ?? "calc(100vmin - 1rem - 1.5rem /* hover/active state size */)"};
  margin: 4rem auto;
`;

const ModifiableShape = styled.div.attrs(
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

const SliderSpan = styled.span`
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
    //
    touch-action: none;
    //
  }
  &:hover,
  &:active {
    background-color: aqua;
    box-shadow: 0 0 0 0.375rem white;
  }
`;

const App = () => {
  const [BRState, dispatch] = useReducer(
    (state, modifierObject) => {
      if (state[`${modifierObject.side}`] === undefined) {
        throw Error("Unknown Action: " + modifierObject);
      }
      return {
        ...state,
        [`${modifierObject.side}`]: modifierObject.newValue,
      };
    },
    { top: 10, left: 20, bottom: 30, right: 40 }
  );

  function dispatchHandler(targetedSide, relativeTargetedSide) {
    return ({ style }) => {
      dispatch({
        side: targetedSide,
        newValue: parseInt(style[`${relativeTargetedSide}`].split("%")[0]),
      });
    };
  }
  let wrapperRef = useRef();
  const pointerDownHandler =
    (targetedSide, relativeTargetedSide) =>
    ({ target }) => {
      const pointerMoveHandler = (e) => {
        // console.log(target.style["left"]);
        dispatchHandler(targetedSide, relativeTargetedSide)(target);
        const wrapperBounds = wrapperRef.current.getBoundingClientRect(); // add to params ??
        const percentage = Math.floor(
          (relativeTargetedSide === "top" &&
            ((e.clientY - wrapperBounds.y) * 100) / wrapperBounds.height) ||
            (relativeTargetedSide === "left" &&
              ((e.clientX - wrapperBounds.x) * 100) / wrapperBounds.width) ||
            0
        );
        const calculatedPercentage =
          percentage < 0 ? 0 : percentage > 100 ? 100 : percentage;
        target.style[`${relativeTargetedSide}`] = `${calculatedPercentage}%`;
      };

      window.addEventListener("pointermove", pointerMoveHandler);
      window.addEventListener("pointerup", () => {
        window.removeEventListener("pointermove", pointerMoveHandler);
      });
    };
  return (
    <>
      <PageTitle>Fancy-border-radius</PageTitle>
      <ShaperWrapper ref={wrapperRef}>
        <ModifiableShape $borderRadius={BRState} />
        <SliderSpan
          onPointerDown={pointerDownHandler("top", "left")}
          style={{
            top: "calc(-0.5rem)",
            marginLeft: "calc(-0.5rem)",
            left: `${BRState.top}%`,
          }}
        />
        <SliderSpan
          onPointerDown={pointerDownHandler("left", "top")}
          style={{
            left: "calc(-0.5rem)",
            marginTop: "calc(-0.5rem)",
            top: `${BRState.left}%`,
          }}
        />
        <SliderSpan
          onPointerDown={pointerDownHandler("bottom", "left")}
          style={{
            bottom: "calc(-0.5rem)",
            marginLeft: "calc(-0.5rem)",
            left: `${BRState.bottom}%`,
          }}
        />
        <SliderSpan
          onPointerDown={pointerDownHandler("right", "top")}
          style={{
            right: "calc(-0.5rem)",
            marginTop: "calc(-0.5rem)",
            top: `${BRState.right}%`,
          }}
        />
      </ShaperWrapper>

      <section>
        <div>
          <span>border-radius : </span>
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "1rem",
              textAlign: "center",
              fontSize: "1.125rem",
              fontFamily: "'M PLUS Rounded 1c',sans-serif",
              display: "inline-block",
            }}
          >
            {(({ left, right, top, bottom }) =>
              `${top}% ${100 - top}% ${
                100 - bottom
              }% ${bottom}% / ${left}% ${right}% ${100 - right}% ${
                100 - left
              }% `)(BRState)}
          </div>
          <button
            onClick={({
              target: {
                previousSibling: { innerText },
              },
            }) => {
              console.log(innerText);
              navigator.clipboard
                .writeText(innerText)
                .then()
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            Copy
          </button>
        </div>
        <div>
          <label>
            Custom size: <input type="" />
          </label>
        </div>
      </section>
    </>
  );
};

export default App;
