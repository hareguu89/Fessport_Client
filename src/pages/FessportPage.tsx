import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import FessportContainer from '../containers/FessportContainer';

const FessportPage = (): JSX.Element => {
  return <FessportContainer />;
};

export default withRouter(FessportPage);
