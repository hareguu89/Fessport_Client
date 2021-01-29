import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import FestivalListContainer from '../containers/FestivalListContainer';

const FestivalListPage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <FestivalListContainer />;
};

export default withRouter(FestivalListPage);
