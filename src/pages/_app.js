import "@/styles/globals.css";
// import '../../components-landing/styles.css'; // Uncomment if needed
import { useEffect } from "react";
import { ActiveItemProvider } from "@/contexts/ActiveItemContext";
import { TestProvider } from "@/contexts/QuestionsContent";
import { ExpertiseItemProvider } from "@/contexts/ExpertiseContext";
import NameProvider from "@/contexts/NameProvider";
import { ActiveFlowProvider } from "@/contexts/ActiveFlowContext";
import { TestStateProvider } from "@/contexts/TestRequirementContext";
// import { ThemeProvider } from "next-themes";
function MyApp({ Component, pageProps }) {
  return (
    <TestStateProvider>
      <ActiveFlowProvider>
        <ActiveItemProvider>
          {/* <ThemeProvider attribute="class"> */}
          <Component {...pageProps} />
          {/* </ThemeProvider> */}
        </ActiveItemProvider>
      </ActiveFlowProvider>
    </TestStateProvider>
  );
}
export default MyApp;
