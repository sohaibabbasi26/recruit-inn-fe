import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

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
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {/* <option value="system">System</option> */}
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </>
  );
}

export default ThemeSwitch;
