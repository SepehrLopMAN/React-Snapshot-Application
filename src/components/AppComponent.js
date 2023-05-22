// __________+ React Tools/Hooks +__________
import { useContext, useEffect, useReducer, useRef, useState } from "react";

// __________+ React Components +__________
import BrInfoComponent from "./BrInfoComponent";
import CostumizerComponent from "./CustomizerComponent";
import ImagePicker from "./ImagePicker";
import { GlobalStyles } from "./styled/Global";
import {
  ModifiableShape,
  PageTitle,
  ShaperWrapper,
  SliderSpan,
} from "./styled/UtileComponents";

// __________+ Handlers/Tools/Utilities +__________
import { brReducerHandler, pointerDownHandler } from "../services/handlers";
import "../App.css";
import gcd_calc from "../utils/gcdCalc";

// __________+ APIs/DataTools +__________
import UrlQueryParamsContext from "../context/UrlQueryParams";
import FooterComponent from "./FooterComponent";

const AppComponent = () => {
  const queryParams = useContext(UrlQueryParamsContext);
  let wrapperRef = useRef(null);
  const [topBr, rightBr, bottomBr, leftBr] = queryParams.br || [];
  const [initialWidth, initialHeight] = [queryParams.w, queryParams.h].map(
    (elem) => (isNaN(Number(elem)) ? null : Number(elem))
  );
  const [BRState, brDispatch] = useReducer(brReducerHandler, {
    top: topBr ?? 10,
    left: leftBr ?? 20,
    bottom: bottomBr ?? 30,
    right: rightBr ?? 40,
  });
  const [customizable, setCustomizable] = useState(
    !!(initialWidth || initialHeight)
  );
  const [widthValue, setWidthValue] = useState(
    initialWidth < 225 ? 225 : initialWidth
  );
  const [heightValue, setHeightValue] = useState(
    initialHeight < 225 ? 225 : initialHeight
  );
  const [userImageSrc, setUserImageSrc] = useState(null); // userImageSrc => user image Source
  const [userImageAR, setUserImageAR] = useState(null); // userImageAR => user image aspect-ratio

  // __________+ Image Picker Effect Hook +__________
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
  console.log(
    `${document.location.origin}?br=${BRState.top}-${BRState.right}-${
      BRState.bottom
    }-${BRState.left}${customizable ? `&w=${widthValue}&h=${heightValue}` : ""}`
  );

  // __________+ Component UI +__________
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
      <BrInfoComponent
        urlQueryParams={`?br=${BRState.top}-${BRState.right}-${
          BRState.bottom
        }-${BRState.left}${
          (customizable && `&w=${widthValue}&h=${heightValue}`) || ""
        }`}
      >
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
      />
      {/* <p style={{ width: "100%" }}>
        <input
          style={{ width: "100%", fontSize: "1.5rem" }}
          type="text"
          value={`${document.location.origin}?br=${BRState.top}-${
            BRState.right
          }-${BRState.bottom}-${BRState.left}${
            customizable ? `&w=${widthValue}&h=${heightValue}` : ""
          }`}
        />
      </p> */}
      <FooterComponent />
    </>
  );
};

export default AppComponent;
