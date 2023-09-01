import { Provider } from 'react-redux';
import { store } from '@features/app/store';
import "@styles/globals.css"
import { BaseLayout } from "@components/ui/common"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </Provider>
  ) 
}

export default MyApp
