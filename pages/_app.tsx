import { AppProps } from "next/app";
import Head from "next/head";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Flex,
  MantineProvider,
} from "@mantine/core";
import "../styles/globals.css";
import { useState } from "react";
import { VerticalNavbar } from "../components/Common/Navbar";
import { ModalsProvider } from "@mantine/modals";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Converse</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: colorScheme,
          }}
        >
          <ModalsProvider>
            {router.route === "/login" ? (
              <AppShell>
                <Component {...pageProps} />
              </AppShell>
            ) : (
              <SessionProvider session={session}>
                <AppShell navbar={<VerticalNavbar />}>
                  <Component {...pageProps} />
                </AppShell>
              </SessionProvider>
            )}
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
