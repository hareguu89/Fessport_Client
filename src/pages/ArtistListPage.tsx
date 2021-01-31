import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ArtistListContainer from '../containers/ArtistListContainer';

const ArtistListPage = (): JSX.Element => {
  return <ArtistListContainer />;
};

export default withRouter(ArtistListPage);
