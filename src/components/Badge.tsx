import React from 'react';
import { IBadge } from '../api/userInfo';
import styled from 'styled-components';

const Badge = ({
  badge,
  badgeRef,
}: {
  badge: IBadge[] | null;
  badgeRef: React.RefObject<HTMLDivElement>;
}): JSX.Element => {
  return (
    <BadgePresenter>
      {/* <BackgroundImage src={'/images/visa.jpg'} /> */}
      <TitleText> Festival Challenge (badge) </TitleText>
      <Temp>
        <TitleName>
          {' '}
          페스티벌 정복 (총 1 / 3 / 6 / 9 / 12개 페스티벌 방문){' '}
        </TitleName>
        <TitleBox ref={badgeRef}>
          {badge &&
            badge
              .filter((item, index) => index < 5)
              .map((item) => (
                <BadgeBox key={item._id}>
                  <BadgeImage key={item._id} src={item.image} get={item.get} />
                  <BadegName key={item._id}>{item.name}</BadegName>
                </BadgeBox>
              ))}
        </TitleBox>
      </Temp>
      <Temp>
        <TitleName> 세계 정복 (총 1 / 3 / 6 / 9 / 12개국 방문) </TitleName>
        <TitleBox>
          {badge &&
            badge
              .filter((item, index) => index >= 5 && index < 10)
              .map((item) => (
                <BadgeBox key={item._id}>
                  <BadgeImage key={item._id} src={item.image} get={item.get} />
                  <BadegName key={item._id}>{item.name}</BadegName>
                </BadgeBox>
              ))}
        </TitleBox>
      </Temp>
      <Temp>
        <TitleName> 장르 정복 (각 장르별 3번 이상 방문)</TitleName>
        <TitleBox>
          {badge &&
            badge
              .filter((item, index) => index >= 10 && index < 15)
              .map((item) => (
                <BadgeBox key={item._id}>
                  <BadgeImage key={item._id} src={item.image} get={item.get} />
                  <BadegName key={item._id}>{item.name}</BadegName>
                </BadgeBox>
              ))}
        </TitleBox>
      </Temp>
    </BadgePresenter>
  );
};

const BadgePresenter = styled.div`
  position: relative;
  margin-top: 50px;
  margin-bottom: 50px;
  padding-left: 50px;
  width: 1100px;
  height: 800px;
  background-color: rgba(0, 0, 0);
  border-radius: 30px;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 1100px;
  height: 800px;
  border-radius: 30px;
  /* opacity: 0.8; */
  z-index: -1;
`;

const TitleText = styled.div`
  margin-top: 20px;
  width: 300px;
  color: white;
  font-size: 1.5em;
  font-weight: 600;
  padding: 10px;
  border-radius: 5px;
  z-index: 99;
`;

const TitleName = styled.div`
  margin-left: 30px;
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
  padding-left: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
`;

const Temp = styled.div`
  width: 750px;
  padding: 20px;
  margin-top: 30px;
  border-radius: 50px;
  background-color: rgba(170, 170, 170, 0.15);
`;

const TitleBox = styled.div`
  display: flex;
`;

const BadgeBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  margin-top: 10px;
`;

const BadgeImage = styled.img<{ get: boolean }>`
  object-fit: contain;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  opacity: ${(props) => (props.get ? 1 : 0.8)};
  mix-blend-mode: ${(props) => (props.get ? 'normal' : 'luminosity')};
  align-self: center;
`;

const BadegName = styled.div`
  color: white;
  margin-top: 15px;
  font-size: 1rem;
  font-weight: 500;
  align-self: center;
`;

export default Badge;
