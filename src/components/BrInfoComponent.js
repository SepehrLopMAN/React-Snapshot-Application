import Clipboard from "@react-native-clipboard/clipboard";
import { useRef } from "react";
import {
  BookmarkSVG,
  ClipboardDocumentSVG,
  EmailShareSVG,
  FacebookShareSVG,
  SMSShareSVG,
  TelegramShareSVG,
  WhatsappShareSVG,
} from "../assets/SVGs/svgCodes";
import { SocialMediaShareAnchor } from "./styled/UtileComponents";

function BrInfoComponent({ children, urlQueryParams }) {
  const linkHolderInpRef = useRef(null);
  const generatedLink = `${document.location.origin}${urlQueryParams ?? ""}`;
  return (
    <div className="br-copier-wrapper">
      <span>Border Radius</span>
      <div className="br-copier-wrapper__copier">
        {children}
        <div className="br-copier__buttons">
          <button
            className="br-copy-btn"
            onClick={({ target }) => {
              const data = children.props.children;
              try {
                Clipboard.setString(data);
                target.innerText = "Copied!✅";
                setTimeout(() => {
                  target.innerText = "Copy";
                }, 2000);
              } catch (err) {
                target.innerText = "Error!❌";
              }
            }}
          >
            Copy
          </button>
          <div className="bookmark-btn">
            <BookmarkSVG />
            <div className="bookmark-btn__share-link-wrapper">
              <label>
                Link:
                <div className="share-link-wrapper__link-container">
                  <input
                    type="text"
                    className="link-container--link-holder-input"
                    value={generatedLink}
                    ref={linkHolderInpRef}
                    readOnly
                  />
                  <button
                    className="link-container--cpy-btn"
                    title="Copy Link"
                    onClick={({ currentTarget }) => {
                      const data = linkHolderInpRef.current.value;
                      try {
                        Clipboard.setString(data);
                        if (currentTarget.innerText !== "✅") {
                          currentTarget.firstChild.style.display = "none";
                          currentTarget.append("✅");
                          setTimeout(() => {
                            currentTarget.removeChild(currentTarget.lastChild);
                            currentTarget.firstChild.style.display = "initial";
                          }, 2500);
                        }
                      } catch (err) {
                        if (currentTarget.innerText !== "❌")
                          currentTarget.innerHTML = "❌";
                      }
                    }}
                  >
                    <ClipboardDocumentSVG />
                  </button>
                </div>
                <div className="share-link-wrapper__socials-share-list">
                  <SocialMediaShareAnchor
                    bgClr="#0088cc"
                    href={`https://t.me/share/url?url=${generatedLink.replaceAll(
                      "&",
                      "%26"
                    )}&text=${""}`}
                    title="Share via Telegram"
                  >
                    <TelegramShareSVG />
                  </SocialMediaShareAnchor>

                  <SocialMediaShareAnchor
                    bgClr="#4dc247"
                    href={`whatsapp://send?text=${generatedLink}`}
                    target="_blank"
                    title="Share via Whatsapp"
                  >
                    <WhatsappShareSVG />
                  </SocialMediaShareAnchor>
                  <SocialMediaShareAnchor
                    bgClr="#3b5998"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${generatedLink}`}
                    target="_blank"
                    title="Share via Facebook"
                  >
                    <FacebookShareSVG />
                  </SocialMediaShareAnchor>
                  <SocialMediaShareAnchor
                    bgClr="#008000"
                    href={`sms:?&body=${generatedLink}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Share via SMS"
                  >
                    <SMSShareSVG />
                  </SocialMediaShareAnchor>
                  <SocialMediaShareAnchor
                    bgClr="#808080"
                    href={`mailto:?body=${generatedLink}`}
                    title="Share via Email"
                  >
                    <EmailShareSVG />
                  </SocialMediaShareAnchor>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrInfoComponent;
