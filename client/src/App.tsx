/* eslint-disable no-console */
import 'regenerator-runtime/runtime';

import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Routes from './routers';
import ProgressBar from './components/ui/ProgressBar';
import { getToken, parseJwt } from './utils/token';
import useAuth from './hooks/useAuth';

const App = () => {
  const { setCurrentUser } = useAuth();
  const [loading, setLoading] = React.useState(true);

  console.log(
    `App is running in ${import.meta.env.VITE_ENV} mode run by ${import.meta.env.VITE_RUN_BY} v: ${
      import.meta.env.VITE_V
    } version new 4`,
  );

  useEffect(() => {
    // refreshToken().then(async ({ data }) => {
    //   localStorage.setItem('accessToken', data.accessToken);
    //   setCurrentUser(data);
    //   console.log('Page has been refreshed', data.user.email);
    // });

    const accessToken = getToken();
    if (accessToken) {
      const { userId, isAdmin } = parseJwt(accessToken);
      setCurrentUser({ userId, isAdmin, accessToken });
      setLoading(false);
    } else {
      console.log('no access token');
      setLoading(false);
    }
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <BrowserRouter>
      <ProgressBar />
      <Routes />
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;
