import NProgress from 'nprogress';
import { useEffect, useMemo } from 'react';

export default () => {
  NProgress.configure({});

  useMemo(() => {
    NProgress.set(1);
  }, []);

  useEffect(() => {
    NProgress.done();
  }, []);

  return null;
};
