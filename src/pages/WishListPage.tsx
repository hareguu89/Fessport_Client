import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import WishListContainer from '../containers/WishListContainer';

const WishListPage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <WishListContainer />;
};

export default withRouter(WishListPage);
