import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import styles from "./ThemeSwitch.module.css";

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  // We cannot know the theme on the server, so it will always be undefined until mounted on the client.  delay rendering any theme toggling UI until mounted on the client.
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="mr-0 ml-4 bg-white-purple-shade dark:bg-[#141414] border border-light-grey dark:border-transparent text-steel rounded-[3rem] px-3 py-[0.45rem]  cursor-pointer grid grid-cols-2 grid-rows-1 max-w-[82px] max-lg:max-w-[77px] relative -top-0 max-lg:-top-2 max-lg:mr-4 max-lg:ml-auto max-lg:mt-3 max-lg:py-[2px] max-lg:px-2">
        <Image
          src="/moon.svg"
          width={33}
          height={33}
          onClick={() => setTheme("dark")}
          className="relative -left-1"
        />
        <Image
          // src="/sun.svg"
          src="/sun-white.svg"
          width={33}
          height={33}
          onClick={() => setTheme("light")}
          className="relative -right-1"
        />
        <div
          className={`${styles.ball} ${
            theme === "light" ? styles.toRight : ""
          } bg-gradient-to-r from-[#6137DB] to-[#220772] bg-steel w-[2.25rem] h-[2.25rem] rounded-full transition-transform`}
        ></div>
      </div>

      {/* <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select> */}
      {/* <option value="system">System</option> */}
    </>
  );
}

export default ThemeSwitch;
