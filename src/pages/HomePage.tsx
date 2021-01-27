import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';

const HomePage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <HomeContainer />;
};

export default withRouter(HomePage);
