import { useReducer } from "react";
import styled, { css } from "styled-components";
import "./App.css";

const Container = styled.div`
  position: relative;
  border: 2px dashed grey;
  width: 480px;
  height: 480px;
  margin: 2rem auto;
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
  // ???????????????????????????????
`;

const RangeInput = styled.input.attrs({
  type: "range",
})`
  & {
    width: calc(100% + 1rem + 4px);
    position: absolute;
    ${({ $right, $left }) =>
      ($right || $left) &&
      css`
        transform-origin: left;
        transform: rotate(90deg);
      `}
  }
  &:foucos {
    outline: none;
  }

  &:-webkit-thumb-slider {
    appearance: none;
    border: 2px solid red;
  }
`;

const App = () => {
  const [BRState, dispatch] = useReducer(
    (state, modifierObject) => {
      console.log(modifierObject, state, state[`${modifierObject.side}`]);
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

  function onChangeHandler(target) {
    return ({ target: { value } }) => {
      dispatch({ side: target, newValue: value });
    };
  }
  return (
    <Container>
      <ModifiableShape $borderRadius={BRState} />
      <RangeInput
        value={BRState.top}
        onChange={onChangeHandler("top")}
        style={{ top: "calc(-0.5rem - 4px)", left: "calc(-0.5rem - 4px)" }}
      />
      <RangeInput
        $left={true}
        value={BRState.left}
        onChange={onChangeHandler("left")}
        style={{ top: "calc(-0.5rem - 0.5rem - 4px)", left: "calc(-4px)" }}
      />
      <RangeInput
        $right={true}
        value={BRState.right}
        onChange={onChangeHandler("right")}
        style={{ top: "calc(-0.5rem - 0.5rem - 4px)", left: "calc(100%)" }}
      />
      <RangeInput
        value={BRState.bottom}
        onChange={onChangeHandler("bottom")}
        style={{
          bottom: "calc(-0.5rem - 4px)",
          left: "calc(-0.5rem - 4px)",
        }}
      />
    </Container>
  );
};

export default App;
