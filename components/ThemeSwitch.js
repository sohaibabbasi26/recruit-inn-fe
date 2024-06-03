import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import styles from "./ThemeSwitch.module.css";
import Image from "next/image";

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
      <div
        className={`${styles.themeSwitch} ${
          theme === "light" ? styles.toRight : ""
        }`}
      >
        <Image
          src="/moon.svg"
          width={33}
          height={33}
          onClick={() => setTheme("dark")}
        />
        <Image
          src="/sun.svg"
          width={33}
          height={33}
          onClick={() => setTheme("light")}
        />
        <div className={`${styles.ball}`}></div>
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
