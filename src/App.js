import Clipboard from "@react-native-clipboard/clipboard";
import { useReducer, useRef, useState } from "react";
import styled, { css } from "styled-components";
import "./App.css";

const PageTitle = styled.h1`
  text-align: center;
  font-family: "M PLUS Rounded 1c", sans-serif;
  border-bottom: 1px solid grey;
  display: inline-block;4465rem;
  margin: 2rem auto;
`;

const ShaperWrapper = styled.div.attrs(({ $width, $height }) => ({
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

const BorderRadiusCopier = ({ children }) => {
  return (
    <div className="br-copier-wrapper">
      <span>border-radius : </span>
      <div className="br-copier-wrapper__copier">
        {children}
        <button
          onClick={({ target }) => {
            const data = target.previousSibling.innerText;
            try {
              Clipboard.setString(data);
              target.innerText = "Copied! 👍";
              setTimeout(() => {
                target.innerText = "Copy";
              }, 2000);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

const App = () => {
  let wrapperRef = useRef();
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

  const pointerDownHandler =
    (targetedSide, relativeTargetedSide) =>
    ({ target }) => {
      const pointerMoveHandler = (e) => {
        dispatchHandler(targetedSide, relativeTargetedSide)(target);
        const wrapperBounds = wrapperRef.current.getBoundingClientRect();
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
        dispatchHandler(targetedSide, relativeTargetedSide)(target);
      });
    };
  const [customizable, setCustomizable] = useState(false);
  const [widthValue, setWidthValue] = useState(null);
  const [heightValue, setHeightValue] = useState(null);
  return (
    <>
      <PageTitle>Fancy-border-radius</PageTitle>
      <ShaperWrapper
        $width={customizable ? widthValue : null}
        $height={customizable ? heightValue : null}
        ref={wrapperRef}
      >
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
      <BorderRadiusCopier>
        <div className="br-value-container">
          {(({ left, right, top, bottom }) =>
            `${top}% ${100 - top}% ${
              100 - bottom
            }% ${bottom}% / ${left}% ${right}% ${100 - right}% ${
              100 - left
            }% `)(BRState)}
        </div>
      </BorderRadiusCopier>
      <div className="input-group">
        <div className="input-group__switch-container">
          <label>
            Custom size:
            <input
              className="switch-input"
              type="checkbox"
              value={customizable}
              onChange={() => setCustomizable((val) => !val)}
              hidden
            />
            <div className="input-group__switch"></div>
          </label>
        </div>
        {customizable && (
          <div className="input-group__size-customization-wrapper">
            <label>
              Width:
              <input
                type="number"
                min={225}
                max={1000}
                value={
                  widthValue ??
                  parseInt(wrapperRef.current.getBoundingClientRect().width)
                }
                onChange={({ target: { value } }) => {
                  setWidthValue(value);
                }}
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                min={225}
                max={1000}
                value={
                  heightValue ??
                  parseInt(wrapperRef.current.getBoundingClientRect().height)
                }
                onChange={({ target: { value } }) => {
                  setHeightValue(value);
                }}
              />
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
