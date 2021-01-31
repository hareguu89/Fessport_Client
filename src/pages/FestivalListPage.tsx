import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import FestivalListContainer from '../containers/FestivalListContainer';

const FestivalListPage = (): JSX.Element => {
  return <FestivalListContainer />;
};

export default withRouter(FestivalListPage);
