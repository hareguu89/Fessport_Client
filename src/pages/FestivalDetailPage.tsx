import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import FestivalDetailContainer from '../containers/FestivalDetailContainer';

const FestivalDetailPage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <FestivalDetailContainer />;
};

export default withRouter(FestivalDetailPage);
