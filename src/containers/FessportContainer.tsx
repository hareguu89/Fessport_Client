import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import Collector from '../components/Collector';
import Badge from '../components/Badge';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getUserInfoAsync } from '../modules/userInfo';

const FessportContainer = (): JSX.Element => {
  const { patchSucess, data, loading, error } = useSelector(
    (state: RootState) => state.userInfo,
  );
  const dispatch = useDispatch();

  const userInfoRef: React.RefObject<HTMLDivElement> = React.createRef();
  const collectorRef: React.RefObject<HTMLDivElement> = React.createRef();
  const badgeRef: React.RefObject<HTMLDivElement> = React.createRef();

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
      block: 'nearest',
    });
  };

  useEffect(() => {
    if (!data) {
      console.log('🐶🐶🐶🐶 UserInfo useEffect 🐶🐶🐶🐶');
      dispatch(getUserInfoAsync.request());
    } else if (patchSucess) {
      dispatch(getUserInfoAsync.request());
      console.log(
        '🐶🐶🐶🐶 정보가 업데이트 되었습니다. UserInfo Update useEffect. 🐶🐶🐶🐶',
      );
    }
  }, [data, patchSucess]);

  return (
    <>
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && (
        <p style={{ textAlign: 'center' }}>
          Error!!! 다시 시도해주세요. 뒤로가기.
        </p>
      )}
      {data && (
        <FessportPresenter>
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
        </FessportPresenter>
      )}
    </>
  );
};

const FessportPresenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export default withRouter(FessportContainer);
