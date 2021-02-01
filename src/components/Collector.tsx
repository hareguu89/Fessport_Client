import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IVisits } from '../api/userInfo';
import styled from 'styled-components';

interface IPosition {
  y: number;
  x: number;
}

const Collector = ({
  visits,
  collectorRef,
  handleScrollDown,
}: {
  visits: IVisits[] | null;
  collectorRef: React.RefObject<HTMLDivElement>;
  handleScrollDown: (
    target: string,
  ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}): JSX.Element => {
  const [position, setPosition] = useState<IPosition[]>([]);

  const handlePosition = (visits: IVisits[]): void => {
    const dposition: IPosition[] = [];
    visits.forEach((item, index) => {
      let dy: number = Math.floor(Math.random() * (400 - 10 + 1)) + 10;
      let dx: number = Math.floor(Math.random() * (900 - 10 + 1)) + 10;
      dposition.push({ y: dy, x: dx });
      for (let n = 0; n < index; n++) {
        if (index === 0) {
          break;
        }
        if (
          Math.abs(dposition[n].y - dy) < 100 &&
          Math.abs(dposition[n].x - dx) < 100
        ) {
          dy = Math.floor(Math.random() * (400 - 10 + 1)) + 10;
          dx = Math.floor(Math.random() * (900 - 10 + 1)) + 10;
          n = -1;
        } else {
          dposition[index] = { y: dy, x: dx };
        }
      }
    });
    setPosition(dposition);
  };

  useEffect(() => {
    if (visits) {
      handlePosition(visits);
      console.log('🐼🐼🐼🐼 Collector useEffect 🐼🐼🐼🐼');
    }
  }, []);

  return (
    <CollectorPresenter ref={collectorRef}>
      <BackgroundImage src={'/images/visa.jpg'} />
      <TitleText> Festival Stamp (visited festival) </TitleText>
      {visits &&
        position.length === visits.length &&
        visits.map((item, index) => (
          <Link key={item._id} to={`/festival/detail/${item._id}`}>
            <FestivalStamp
              src={item.stamp}
              y={position[index].y}
              x={position[index].x}
            />
          </Link>
        ))}
      <DownButton
        src="/images/arrow.png"
        onClick={handleScrollDown('badgeRef')}
      />
    </CollectorPresenter>
  );
};

const CollectorPresenter = styled.div`
  position: relative;
  margin-top: 50px;
`;

const TitleText = styled.div`
  position: absolute;
  top: 20px;
  left: 30px;
  color: rgba(0, 0, 0);
  /* background: rgba(0, 0, 0, 0.1); */
  font-size: 1.5em;
  font-weight: 600;
  padding: 10px;
  border-radius: 5px;
  z-index: 99;
`;

const BackgroundImage = styled.img`
  width: 1100px;
  height: 550px;
  border-radius: 30px;
  -webkit-filter: grayscale(100%);
`;

const FestivalStamp = styled.img<{ y: number; x: number }>`
  object-fit: contain;
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  width: 150px;
  height: 150px;
`;

const DownButton = styled.img`
  object-fit: cover;
  position: absolute;
  top: 90%;
  left: 45%;
  width: 100px;
  height: 100px;
  opacity: 0.8;
  z-index: 99;
`;

export default Collector;
