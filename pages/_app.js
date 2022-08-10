import '../styles/globals.css'
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '../shared/components/loader';
import CookieAlert from '../shared/components/cookie-alert';

function MyApp({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  },[]);
  const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 100,
    when: 'afterChildren'
  };
  const disableConsole = () => {
    console.log(
      '%c Hello World, :)',
      'background: #212121; color: #f69510; padding: 6px; '
    );

    console.log(
      "%c Let's talk, head to contact page and message me!",
      'background: #212121; color: #f69510; padding: 6px;'
    );

    console.log = () => {};
    console.error = () => {};
  };
  return (
    // <Component {...pageProps} />
    <div>
      <Head>
        <title>Manish Suthar | Software Developer</title>
        <meta name="title" content="Manish Suthar | Software Developer" />
        <meta
          name="description"
          content="Manish Suthar is a Software Developer from Sirohi, Rajasthan. Manish is pursuing his Btech(undergraduate) from Skit College, Jaipur."
        />
        <meta
          name="keywords"
          content="Manish Suthar, Software Developer , Web Development Freelancer, Skit College, Web Developer"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Manish Suthar" />
        <meta name="copyright" content="All rights reserved,2022. Manish Suthar" />
        <meta httpEquiv="content-language" content="en" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Manish Suthar | Software Developer" />
        <meta
          property="og:description"
          content="Manish Suthar is a Software Developer from Sirohi, Rajasthan. Manish is pursuing his Btech(undergraduate) from Skit College, Jaipur."
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/mylogo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/mylogo.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence>
          <div className="page-transition-wrapper overflow-x-hidden min-h-screen">
            <motion.div
              transition={spring}
              key={router.pathname}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              id="page-transition-container">
              {/* <CustomCursor /> */}
              <Component {...pageProps} key={router.pathname} />
            </motion.div>
          </div>
          <CookieAlert />
        </AnimatePresence>
      )}
      {disableConsole()}
    </div>
  )
}

export default MyApp
