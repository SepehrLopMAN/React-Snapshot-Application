function CostumizerComponent({
  stateObject: { customizable, widthValue, heightValue },
  settersObject: { setCustomizable, setWidthValue, setHeightValue },
  elemWrapperRef,
}) {
  return (
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
                parseInt(elemWrapperRef.current.getBoundingClientRect().width)
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
                parseInt(elemWrapperRef.current.getBoundingClientRect().height)
              }
              onChange={({ target: { value } }) => {
                setHeightValue(value);
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default CostumizerComponent;
