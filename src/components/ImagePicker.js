import { FileLabel } from "./styled/UtileComponents";

function ImagePicker({ userImageSrc, setUserImageSrc }) {
  return (
    <FileLabel imgIsUsed={userImageSrc !== null}>
      <h2>Choose Your Image</h2>
      <input
        hidden
        type="file"
        onChange={({ target: { files } }) => {
          if (files.length === 0) return;
          if (!files[0]?.type.startsWith("image")) {
            alert("File format is not valid!\n(You can use only images!)");
            return;
          }
          setUserImageSrc(URL.createObjectURL(files[0]));
        }}
      />
    </FileLabel>
  );
}

export default ImagePicker;
