import { LinkedinIcon, LinkedinShareButton } from "next-share";
import React from "react";

function SocialShare({ url }) {

  
  return (
    <>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </>
  );
}

export default SocialShare;
