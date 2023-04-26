import Clipboard from "@react-native-clipboard/clipboard";

function BrInfoComponent({ children }) {
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
}

export default BrInfoComponent;
