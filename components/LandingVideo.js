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
          <div className="w-90% relative">
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
            <div style={{ position: "relative", display: "inline-block" }}>
              {/* Video Element */}
              <video
                ref={videoRef}
                onClick={togglePlay}
                src="/video/recruitinn_final.mp4"
                style={{ width: "100%", objectFit: "cover" }}
                //controls
              />
              {/* Custom Play Button */}
              {!isPlaying && (
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
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                >
                  ▶
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingVideo;
