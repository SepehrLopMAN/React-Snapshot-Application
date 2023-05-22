function CostumizerComponent({
  stateObject: { customizable, widthValue, heightValue },
  settersObject: { setCustomizable, setWidthValue, setHeightValue },
}) {
  return (
    <div className="input-group">
      <div className="input-group__switch-container">
        <label>
          Custom size:
          <input
            className="switch-input"
            type="checkbox"
            checked={customizable}
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
              value={widthValue}
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
              value={heightValue}
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
