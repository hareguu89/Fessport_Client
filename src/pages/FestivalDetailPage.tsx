import React from 'react';
import { withRouter } from 'react-router-dom';
import FestivalDetailContainer from '../containers/FestivalDetailContainer';

const FestivalDetailPage = (): JSX.Element => {
  return <FestivalDetailContainer />;
};

export default withRouter(FestivalDetailPage);
