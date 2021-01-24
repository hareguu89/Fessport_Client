import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IVisit } from '../api/userInfo';
import styled from 'styled-components';

interface IPosition {
  y: number;
  x: number;
}

const Collector = ({
  visit,
  collectorRef,
  handleScrollDown,
}: {
  visit: IVisit[] | null;
  collectorRef: React.RefObject<HTMLDivElement>;
  handleScrollDown: (
    target: string,
  ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}): JSX.Element => {
  const [position, setPosition] = useState<IPosition[]>([]);

  const handlePosition = (visit: IVisit[]): void => {
    const dposition: IPosition[] = [];
    visit.forEach((item, index) => {
      let dy: number = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
      let dx: number = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
      dposition.push({ y: dy, x: dx });
      for (let n = 0; n < index; n++) {
        if (index === 0) {
          break;
        }
        if (
          Math.abs(dposition[n].y - dy) < 150 &&
          Math.abs(dposition[n].x - dx) < 150
        ) {
          dy = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
          dx = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
          n = -1;
        } else {
          dposition[index] = { y: dy, x: dx };
        }
      }
    });
    setPosition(dposition);
  };

  useEffect(() => {
    if (visit) {
      handlePosition(visit);
      console.log('🐼🐼🐼🐼 Collector useEffect 🐼🐼🐼🐼');
    }
  }, []);

  return (
    <CollectorPresenter ref={collectorRef}>
      <BackgroundImage src={'/images/visa.jpg'} />
      {visit &&
        position.length === visit.length &&
        visit.map((item, index) => (
          <Link key={item._id} to={`/festival/detail/${item._id}`}>
            <FestivalStamp
              src={item.image}
              y={position[index].y}
              x={position[index].x}
            />
          </Link>
        ))}
      <DownButton onClick={handleScrollDown('badgeRef')}></DownButton>
    </CollectorPresenter>
  );
};

const CollectorPresenter = styled.div`
  position: relative;
  margin-top: 50px;
`;

const BackgroundImage = styled.img`
  position: relative;
  width: 1200px;
  height: 700px;
  border-radius: 30px;
  opacity: 0.9;
  z-index: -1;
`;

const FestivalStamp = styled.img<{ y: number; x: number }>`
  object-fit: contain;
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  width: 200px;
  height: 200px;
`;

const DownButton = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;
  border-radius: 50px;
`;

export default Collector;
