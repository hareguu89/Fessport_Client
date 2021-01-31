import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import { getUserInfoAsync } from '../modules/userInfo';
import Collector from '../components/Collector';
import Badge from '../components/Badge';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
const FessportContainer = (): JSX.Element => {
  const collectorRef: React.RefObject<HTMLDivElement> = React.createRef();
  const { patchSucess, data, loading, error } = useSelector(
    (state: RootState) => state.userInfo,
  );
  const dispatch = useDispatch();

  const userInfoRef: React.RefObject<HTMLDivElement> = React.createRef();
  const badgeRef: React.RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    if (!data) {
      console.log(111);
      dispatch(getUserInfoAsync.request());
    } else if (patchSucess) {
      dispatch(getUserInfoAsync.request());
      console.log(111);
    }
  }, [data, patchSucess]);

  const handleScrollDown = (target: string) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    let targetLocation: HTMLDivElement;
    switch (target) {
      case 'collectorRef':
        targetLocation = collectorRef.current as HTMLDivElement;
        break;
      case 'badgeRef':
        targetLocation = badgeRef.current as HTMLDivElement;
        break;
      default:
        targetLocation = userInfoRef.current as HTMLDivElement;
    }
    targetLocation.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <>
      {data && (
        <Temp>
          <UserInfo
            email={data.email}
            nickName={data.nickName}
            image={data.image}
            handleScrollDown={handleScrollDown}
          />
          <Collector
            visit={data.visit}
            collectorRef={collectorRef}
            handleScrollDown={handleScrollDown}
          />
          <Badge badge={data.badge} badgeRef={badgeRef} />
          <Ei />
        </Temp>
      )}
    </>
  );
};

const Temp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
`;

const Ei = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 0.3;
  background: radial-gradient(black 35%, transparent 1%),
    url('/images/wall2.jpg');
  background-size: 3px 3px, contain;
`;
export default withRouter(FessportContainer);
