import '@fontsource/lexend';

import 'nprogress/nprogress.css';
import '../styles/global.css';

import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import NProgress from 'nprogress';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ModalsProvider } from '@mantine/modals';
import Main from '../components/Main/Main';
import { Global } from '../components/Global';
import { SocketProvider } from '../lib/contexts/socket';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

const variants = {
  hidden: { opacity: 0, x: 0, y: -20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 },
};

export default function App({
  router,
  ...props
}: AppProps & { colorScheme: ColorScheme; session: any }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Global />
      <SocketProvider>
        <ApolloProvider client={client}>
          <SessionProvider session={props.session} baseUrl="http://localhost:5555">
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
              <MantineProvider
                theme={{
                  colorScheme,
                  fontFamily: 'Lexend, Greycliff CF, system, serif',
                  headings: { fontFamily: 'Greycliff CF' },
                }}
                withGlobalStyles
                withNormalizeCSS
              >
                <ModalsProvider>
                  <NotificationsProvider>
                    <Main>
                      <AnimateSharedLayout>
                        <AnimatePresence
                          exitBeforeEnter
                          initial={false}
                          onExitComplete={() => window.scrollTo(0, 0)}
                        >
                          <motion.main
                            key={router.route}
                            initial="hidden"
                            animate="enter"
                            exit="exit"
                            variants={variants}
                            transition={{ duration: 0.2, type: 'easeInOut' }}
                            onAnimationComplete={() => window.scrollTo(0, 0)}
                          >
                            <Component {...pageProps} />
                          </motion.main>
                        </AnimatePresence>
                      </AnimateSharedLayout>
                    </Main>
                  </NotificationsProvider>
                </ModalsProvider>
              </MantineProvider>
            </ColorSchemeProvider>
          </SessionProvider>
        </ApolloProvider>
      </SocketProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
