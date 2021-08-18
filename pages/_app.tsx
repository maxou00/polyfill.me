import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { useEffect } from 'react';
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import { useStore } from '../state/store';
import '../styles/globals.scss';
import "react-toastify/scss/main.scss";
import { theme } from '../ui/theme';

function MyApp({ Component, pageProps }) {
  const store = useStore((pageProps as any).initialReduxState);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if(jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return <>
    <Provider store={store} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={true}
        limit={3}
        closeOnClick
        hideProgressBar/>
    </Provider>
  </>
}

export default MyApp
