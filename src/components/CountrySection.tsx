import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MapModalPoster from './MapModalPoster';
import { IMap } from '../api/map';
import styled from 'styled-components';

const CountrySection = ({
  _id,
  name,
  y,
  x,
  flagImage,
  festival,
}: IMap): JSX.Element => {
  const history = useHistory();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [dy, setDy] = useState<number>(300);
  const [dx, setDx] = useState<number>(150);
  const [my, setMy] = useState<number>(-10);
  const [mx, setMx] = useState<number>(20);

  const handleCountryLink = () => {
    history.push(`/festival/list?countryId=${_id}`);
  };

  useEffect(() => {
    console.log('🏁🏁🏁🏁 CountrySection(x, y setting) useEffect 🏁🏁🏁🏁');
    setDy(y);
    setDx(x);
    if (y >= 300 && x <= 400) {
      setMy(-280);
      setMx(20);
    } else if (y >= 300 && x >= 400) {
      setMy(-280);
      setMx(-580);
    } else if (y <= 300 && x >= 640) {
      setMy(-10);
      setMx(-580);
    }
  }, [y, x]);

  return (
    <CountryPresenter y={dy} x={dx}>
      <Circle1 hover={isHover} />
      <Circle2 hover={isHover} />
      <Circle3 hover={isHover} />
      <CircleImage src={'/images/ultra.png'} hover={isHover} />
      <Pin1 src={'/images/ultra-pin.png'} hover={isHover} />
      <Pin2 hover={isHover} />
      <div
        onMouseEnter={() => {
          setIsHover(!isHover);
        }}
        onMouseLeave={() => {
          setIsHover(!isHover);
        }}
      >
        <ModalFrame isHover={isHover} my={my} mx={mx}>
          <CountryLink to={`/festival/list?countryId=${_id}`}>
            <FlagImage src={flagImage} />
            {name}
          </CountryLink>
          <PosterPresenter>
            {festival.map((item) => (
              <MapModalPoster
                key={item._id}
                _id={item._id}
                name={item.name}
                thumbnail={item.thumbnail}
              />
            ))}
          </PosterPresenter>
        </ModalFrame>
        <CountryImage
          key={_id}
          src={flagImage}
          alt={name}
          hover={isHover}
          onClick={handleCountryLink}
        />
      </div>
    </CountryPresenter>
  );
};

const CountryPresenter = styled.div<{ y: number; x: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transition: all 1.5s ease-in-out;
`;

const Circle1 = styled.div<{ hover: boolean }>`
  position: absolute;
  width: ${(props) => (props.hover ? 100 : 44)}px;
  height: ${(props) => (props.hover ? 100 : 44)}px;
  border: 1px solid rgba(120, 192, 204, ${(props) => (props.hover ? 0.6 : 0.4)});
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
  animation: changeColor 1s linear infinite;
  @keyframes changeColor {
    0% {
      border: 1px solid
        rgba(120, 192, 204, ${(props) => (props.hover ? 0.6 : 0.4)});
    }
    50% {
      border: 1px solid
        rgba(120, 192, 204, ${(props) => (props.hover ? 0.6 : 0)});
    }
    100% {
      border: 1px solid
        rgba(120, 192, 204, ${(props) => (props.hover ? 0.6 : 0.4)});
    }
  }
`;

const Circle2 = styled.div<{ hover: boolean }>`
  position: absolute;
  width: ${(props) => (props.hover ? 90 : 40)}px;
  height: ${(props) => (props.hover ? 90 : 40)}px;
  border: 1px solid rgba(120, 192, 204, ${(props) => (props.hover ? 0.6 : 0.4)});
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
`;

const Circle3 = styled.div<{ hover: boolean }>`
  position: absolute;
  width: ${(props) => (props.hover ? 55 : 24)}px;
  height: ${(props) => (props.hover ? 55 : 24)}px;
  border: 2px solid rgba(120, 192, 204, ${(props) => (props.hover ? 0.6 : 0.4)});
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
`;

const CircleImage = styled.img<{ hover: boolean }>`
  position: absolute;
  width: 150px;
  height: 150px;
  opacity: ${(props) => (props.hover ? 0.8 : 0)};
  transition: all 0.5s ease-in-out;
`;

const Pin1 = styled.img<{ hover: boolean }>`
  position: absolute;
  top: ${(props) => (props.hover ? -50 : 0)}px;
  width: 20px;
  height: 20px;
  opacity: ${(props) => (props.hover ? 1 : 0)};
  transition: all 0.5s ease-in-out;
`;

const Pin2 = styled.div<{ hover: boolean }>`
  position: absolute;
  width: 45px;
  height: 45px;
  &:before {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }
  animation: rotateClockwise 1.5s linear infinite;
  @keyframes rotateClockwise {
    100% {
      transform: rotate(360deg);
    }
  }
  &:before {
    background: white;
    opacity: ${(props) => (props.hover ? 0.8 : 0)};
    transition: all 0.5s ease-in-out;
  }
`;

const ModalFrame = styled.div<{ isHover: boolean; my: number; mx: number }>`
  visibility: ${(props) => (props.isHover ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${(props) => props.my}px;
  left: ${(props) => props.mx}px;
  width: 600px;
  height: 300px;
  border: 20px solid transparent;
  border-radius: 30px;
  background-clip: padding-box;
  background-color: black;
  opacity: ${(props) => (props.isHover ? 1 : 0)};
  transition: all 0.4s ease-in-out;
  z-index: 100;
`;

const CountryLink = styled(Link)`
  display: flex;
  align-items: center;
  margin: 20px 0px 10px 30px;
  color: #fff;
  font-size: 1.5em;
`;

const FlagImage = styled.img`
  object-fit: contain;
  margin-right: 10px;
  width: 25px;
  height: 25px;
`;

const PosterPresenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
`;

const CountryImage = styled.img<{ hover: boolean }>`
  object-fit: contain;
  position: relative;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(148, 242, 255, ${(props) => (props.hover ? 0.8 : 0.4)});
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  z-index: 99;
`;

export default CountrySection;
