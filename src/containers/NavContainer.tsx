import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Dropdown(): JSX.Element {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <Ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItems.map((item, index) => {
          return (
            <Li key={index}>
              <StyledLink
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {/* {item.icon} */}
                {item.title}
              </StyledLink>
            </Li>
          );
        })}
      </Ul>
    </>
  );
}

export function MyDropdown(): JSX.Element {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <Ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MyMenuItems.map((item, index) => {
          return (
            <Li key={index}>
              <StyledLink
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {/* {item.icon} */}
                {item.title}
              </StyledLink>
            </Li>
          );
        })}
      </Ul>
    </>
  );
}

const MyMenuItems = [
  {
    title: 'MY FESSPORT',
    path: '/myfessport',
    cName: 'dropdown-link',
  },
  {
    title: 'WISH LIST',
    path: '/wishlist',
    cName: 'dropdown-link',
  },
  {
    title: 'MY POST',
    path: '/mypost',
    cName: 'dropdown-link',
  },
];

const MenuItems = [
  {
    title: 'Companions',
    path: '/Companions',
    cName: 'dropdown-link',
    // icon: <i className="far fa-handshake"></i>,
  },
  {
    title: 'Sell&Buy',
    path: '/Sell&Buy',
    cName: 'dropdown-link',
    // icon: null,
  },
  {
    title: 'Review',
    path: '/Review',
    cName: 'dropdown-link',
    // icon: null,
  },
];

const Li = styled.li`
  background: rgb(28, 27, 27);
  cursor: pointer;

  :hover {
    background-color: #5cabff;
  }
`;

const Ul = styled.ul`
  width: 200px;
  position: absolute;
  top: 80px;
  list-style: none;
  text-align: center;
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #fff;
  padding: 16px;
`;
