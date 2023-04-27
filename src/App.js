import { useReducer, useRef, useState } from "react";
import "./App.css";
import BrInfoComponent from "./components/BrInfoComponent";
import CostumizerComponent from "./components/CustomizerComponent";
import { GlobalStyles } from "./components/styled/Global";
import {
  FileLabel,
  ModifiableShape,
  PageTitle,
  ShaperWrapper,
  SliderSpan,
} from "./components/styled/UtileComponents";
import { brReducerHandler, pointerDownHandler } from "./services/handlers";

const App = () => {
  let wrapperRef = useRef(null);
  const [BRState, brDispatch] = useReducer(brReducerHandler, {
    top: 10,
    left: 20,
    bottom: 30,
    right: 40,
  });
  const [customizable, setCustomizable] = useState(false);
  const [widthValue, setWidthValue] = useState(null);
  const [heightValue, setHeightValue] = useState(null);
  const [userImage, setUserImage] = useState(null);
  return (
    <>
      <GlobalStyles />
      <PageTitle>Snapshot</PageTitle>

      <FileLabel imgIsUsed={userImage !== null}>
        <h2>Choose Your Image</h2>
        <input
          hidden
          type="file"
          onChange={({ target: { files } }) => {
            setUserImage(
              files.length > 0 ? URL.createObjectURL(files[0]) : null
            );
          }}
        />
      </FileLabel>
      <ShaperWrapper
        $width={customizable ? widthValue : null}
        $height={customizable ? heightValue : null}
        ref={wrapperRef}
      >
        <ModifiableShape $borderRadius={BRState} $background={userImage} />
        <SliderSpan
          onPointerDown={pointerDownHandler("top", "left", {
            wrapperRef,
            brDispatch,
          })}
          style={{
            top: "calc(-0.5rem)",
            marginLeft: "calc(-0.5rem)",
            left: `${BRState.top}%`,
          }}
        />
        <SliderSpan
          onPointerDown={pointerDownHandler("left", "top", {
            wrapperRef,
            brDispatch,
          })}
          style={{
            left: "calc(-0.5rem)",
            marginTop: "calc(-0.5rem)",
            top: `${BRState.left}%`,
          }}
        />
        <SliderSpan
          onPointerDown={pointerDownHandler("bottom", "left", {
            wrapperRef,
            brDispatch,
          })}
          style={{
            bottom: "calc(-0.5rem)",
            marginLeft: "calc(-0.5rem)",
            left: `${BRState.bottom}%`,
          }}
        />
        <SliderSpan
          onPointerDown={pointerDownHandler("right", "top", {
            wrapperRef,
            brDispatch,
          })}
          style={{
            right: "calc(-0.5rem)",
            marginTop: "calc(-0.5rem)",
            top: `${BRState.right}%`,
          }}
        />
      </ShaperWrapper>
      <BrInfoComponent>
        <div className="br-value-container">
          {(({ left, right, top, bottom }) =>
            `${top}% ${100 - top}% ${
              100 - bottom
            }% ${bottom}% / ${left}% ${right}% ${100 - right}% ${
              100 - left
            }% `)(BRState)}
        </div>
      </BrInfoComponent>
      <CostumizerComponent
        stateObject={{ customizable, widthValue, heightValue }}
        settersObject={{ setCustomizable, setHeightValue, setWidthValue }}
        elemWrapperRef={wrapperRef}
      />
    </>
  );
};

export default App;
