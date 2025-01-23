import { useTheme } from "next-themes";
import Image from "next/image";
import { useRef, useState } from "react";

const LandingVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const { theme } = useTheme();
  return (
    <>
      <div className="w-100p flex justify-center">
        <div className="w-90p h-[100%] flex justify-center mb-8">
          <div className="w-100% relative border-solid border-[#F0F3FF]">
            {/* {theme === "dark" ? (
              <Image
                src="/playbtn.svg"
                className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 max-md:top-[25%]"
                width={60}
                height={60}
              />
            ) : null} */}
            {/* <Image
              src={theme === "dark" ? "/videoimage.png" : "/videoimagedark.png"}
              width={1400}
              height={1400}
            /> */}
            <div
              style={{
                position: "relative",
                display: "inline-block",
                width: "100%",
                marginTop: "2rem",
                border: "solid 2px",
                borderColor: "#cbcbcb",
                borderRadius: "12px",
              }}
            >
              {/* Video Element */}
              <video
                // ref={videoRef}
                // onClick={togglePlay}
                src="/video/recruitinn_final2.mp4"
                poster="/thumbnail.jpg"
                  controlsList="nodownload"
                controls
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "600px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  cursor: "pointer",
                  // opacity: !isPlaying ? 0.5 : 1,
                }}
              />
              {/* {!isPlaying && (
                <button
                  onClick={togglePlay}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  ▶
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingVideo;
