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
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />
        <meta name="author" content="Manish Suthar" />
        <meta name="copyright" content="All rights reserved,2022. Manish Suthar" />
        <meta httpEquiv="content-language" content="en" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Manish Suthar | Software Developer" />
        <meta
          property="og:description"
          content="Manish Suthar is a Software Developer from Sirohi, Rajasthan. Manish is pursuing his Btech(undergraduate) from Skit College, Jaipur."
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Manish Suthar | Software Developer" />
        <meta
          property="twitter:description"
          content="Manish Suthar is a Software Developer from Sirohi, Rajasthan. Manish is pursuing his Btech(undergraduate) from Skit College, Jaipur."
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/mylogo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/mylogo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        {/* <script>
          dangerouslySetInnerHTML=
          {{
            __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2472275,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
          }}
        </script> */}

        {/* <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:2472275,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
          }}
        /> */}
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
