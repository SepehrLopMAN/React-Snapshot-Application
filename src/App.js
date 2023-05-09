import { useEffect } from "react";
import { useReducer, useRef, useState } from "react";
import "./App.css";
import BrInfoComponent from "./components/BrInfoComponent";
import CostumizerComponent from "./components/CustomizerComponent";
import ImagePicker from "./components/ImagePicker";
import { GlobalStyles } from "./components/styled/Global";
import {
  ModifiableShape,
  PageTitle,
  ShaperWrapper,
  SliderSpan,
} from "./components/styled/UtileComponents";
import {
  brReducerHandler,
  gcd_calc,
  pointerDownHandler,
} from "./services/handlers";

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
  const [userImageSrc, setUserImageSrc] = useState(null);
  const [userImageAR, setUserImageAR] = useState(null);

  useEffect(() => {
    let userImg = new Image();
    userImg.onload = () => {
      const { width, height } = userImg;
      const gcd = gcd_calc(width, height);
      setUserImageAR(
        width !== 0 && height !== 0 ? `${width / gcd} / ${height / gcd}` : null
      );
    };
    userImg.src = userImageSrc;
    return () => {
      userImg = null;
    };
  }, [userImageSrc]);
  return (
    <>
      <GlobalStyles />
      <PageTitle>Snapshot</PageTitle>
      <ImagePicker {...{ userImageSrc, setUserImageSrc }} />
      <ShaperWrapper
        $width={customizable ? widthValue : null}
        $height={customizable ? heightValue : null}
        $aspectRatio={userImageAR}
        ref={wrapperRef}
      >
        <ModifiableShape $borderRadius={BRState} $background={userImageSrc} />
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
      <footer className="footer-container">
        <div className="footer-content">
          <span className="footer-content--copyright-symbol">&copy;</span>
          Created by
          <h6 className="footer-content__author-heading"> Sepehr Katebi</h6>
        </div>
      </footer>
    </>
  );
};

export default App;
