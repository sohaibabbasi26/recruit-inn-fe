import { LinkedinIcon, LinkedinShareButton } from "next-share";
import React, { useState, useEffect } from "react";
import { shortenUrl } from "@/util/shortenUrl";
import ClientSignUpOverlay from "./ClientSignupOverlay";

function SocialShare({ url }) {
  const [shortUrl, setShortUrl] = useState("");

  const urlclickHandler = () => {
    console.log("short url is", shortUrl);
  };

  useEffect(() => {
    const getShortUrl = async () => {
      const newShortUrl = await shortenUrl(url);
      setShortUrl(newShortUrl);
    };

    getShortUrl();
  }, [url]);

  // useEffect(() => {
  //   console.log("short url is ", shortUrl);
  // }, [shortUrl]);

  return (
    <>
      <LinkedinShareButton url={shortUrl} onClick={urlclickHandler}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </>
  );
}

export default SocialShare;
