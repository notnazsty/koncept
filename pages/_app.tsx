import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import AuthProvider from "../components/AuthProvider";
import Spotlight from "../components/Spotlight/Spotlight";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <Spotlight>
          <Component {...pageProps} />
        </Spotlight>
      </AuthProvider>
    </MantineProvider>
  );
}

export default MyApp;
