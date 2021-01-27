import React from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';

const HomePage = (): JSX.Element => {
  return <HomeContainer />;
};

export default withRouter(HomePage);
