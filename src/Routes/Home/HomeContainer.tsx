import React from 'react';
import HomePresenter from './HomePresenter';

interface IProps {
  id: number;
  idd: number;
  counter: () => void;
}

const HomeContainer: React.FunctionComponent<IProps> = (): JSX.Element => {
  return <HomePresenter />;
};

export default HomeContainer;
