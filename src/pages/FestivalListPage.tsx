import React from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import FestivalListContainer from '../containers/FestivalListContainer';

const FestivalListPage = (): JSX.Element => {
  return <FestivalListContainer />;
};

export default withRouter(FestivalListPage);
