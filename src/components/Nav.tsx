import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Dropdown(): JSX.Element {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const MenuItems = [
    {
      title: 'Companions',
      path: '/companion',
      cName: 'dropdown-link',
    },
    {
      title: 'Buy & Sell',
      path: '/resell/list',
      cName: 'dropdown-link',
    },
  ];

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
              <div className="modal__break" />
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

  const MyMenuItems = [
    {
      title: 'MY FESSPORT',
      path: '/fessport',
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
              <div className="modal__break" />
            </Li>
          );
        })}
      </Ul>
    </>
  );
}

const Li = styled.li`
  background: rgb(28, 27, 27);
  cursor: pointer;

  :hover {
    // background-color: white;
  }
`;

const Ul = styled.ul`
  width: 160px;
  position: absolute;
  top: 80px;
  list-style: none;
  text-align: center;

  .modal__break {
    justify-content: center;
    align-items: center;
    max-width: 100%;
    height: 1px;
    opacity: 0.5;
    position: relative;
    background: linear-gradient(to right, white 0%, #999 100%);
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #ccc;
  padding: 10px;
  :hover {
    color: white;
  }
`;
