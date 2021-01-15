import React from 'react';
import HomePresenter from './HomePresenter';

interface IProps {
  id:string,
  counter: () => void;
}

const HomeContainer: React.FunctionComponent<IProps> = (): JSX.Element => {
  return (
    <HomePresenter />
  );
}

export default HomeContainer;