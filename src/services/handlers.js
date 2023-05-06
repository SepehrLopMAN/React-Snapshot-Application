export function brReducerHandler(state, modifierObject) {
  if (state[`${modifierObject.side}`] === undefined) {
    throw Error("Unknown Action: " + modifierObject);
  }
  return {
    ...state,
    [`${modifierObject.side}`]: modifierObject.newValue,
  };
}

export function pointerDownHandler(
  targetedSide,
  relativeTargetedSide,
  { wrapperRef, brDispatch }
) {
  return ({ target }) => {
    const pointerMoveHandler = (e) => {
      brDispatchHandler(targetedSide, relativeTargetedSide, brDispatch)(target);
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
      brDispatchHandler(targetedSide, relativeTargetedSide, brDispatch)(target);
    });
  };
}

export function gcd_calc(x, y) {
  if (typeof x !== "number" || typeof y !== "number") return false;
  while (y) {
    [y, x] = [x % y, y];
  }
  return x;
}

function brDispatchHandler(targetedSide, relativeTargetedSide, dispatch) {
  return ({ style }) => {
    dispatch({
      side: targetedSide,
      newValue: parseInt(style[`${relativeTargetedSide}`].split("%")[0]),
    });
  };
}
