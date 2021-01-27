import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Dropdown, MyDropdown } from '../containers/NavContainer';
import { SignModal } from '../containers/ModalSign';

const Nav = (): JSX.Element => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [myDropdown, setMyDropdwon] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  const onMyMouseEnter = () => {
    if (window.innerWidth < 960) {
      setMyDropdwon(false);
    } else {
      setMyDropdwon(true);
    }
  };
  const onMyMouseLeave = () => {
    if (window.innerWidth < 960) {
      setMyDropdwon(false);
    } else {
      setMyDropdwon(false);
    }
  };

  const [isModalOpen, setModalState] = React.useState(false);
  const toggleModal = () => setModalState(!isModalOpen);

  return (
    <>
      <Container className="nav">
        <Link to="/" className="nav-logo">
          FESSPORT <i className="fas fa-passport"></i>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to="/Community"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Community <i className="fas fa-caret-down" />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className="nav-item">
            <Link
              to="/artist/list"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Artist
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/festival/list"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Festival
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-links" onClick={toggleModal}>
              SignIn
            </a>
          </li>
          <li className="nav-item">
            <SignModal
              title={'FESSPORT SIGN!'}
              isOpen={isModalOpen}
              onClose={toggleModal}
            ></SignModal>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMyMouseEnter}
            onMouseLeave={onMyMouseLeave}
          >
            <div className="nav-links" onClick={closeMobileMenu}>
              MY FESSPORT <i className="fas fa-caret-down" />
            </div>
            {myDropdown && <MyDropdown />}
          </li>
        </ul>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  background: linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;

  .nav-logo {
    color: #fff;
    justify-self: start;
    margin-left: 20px;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
  }

  .fa-firstdraft {
    margin-left: 0.5rem;
    font-size: 1.6rem;
  }

  .nav-menu {
    display: grid;
    grid-template-columns: repeat(6, auto);
    grid-gap: 10px;
    list-style: none;
    text-align: center;
    width: 70vw;
    justify-content: end;
    margin-right: 2rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    height: 80px;
  }

  .nav-links {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  .nav-links:hover {
    background-color: #1888ff;
    border-radius: 4px;
    transition: all 0.2s ease-out;
  }

  .fa-bars {
    color: #fff;
  }

  .nav-links-mobile {
    display: none;
  }

  .menu-icon {
    display: none;
  }

  @media screen (max-width: 960px) {
    .NavbarItems {
      position: relative;
    }

    .nav-menu {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 90vh;
      position: absolute;
      top: 80px;
      left: -100%;
      opacity: 1;
      transition: all 0.5s ease;
    }

    .nav-menu.active {
      background: #242222;
      left: 0;
      opacity: 1;
      transition: all 0.5s ease;
      z-index: 1;
    }

    .nav-links {
      text-align: center;
      padding: 2rem;
      width: 100%;
      display: table;
    }

    .nav-links:hover {
      background-color: #1888ff;
      border-radius: 0;
    }

    .navbar-logo {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(25%, 50%);
    }

    .menu-icon {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 60%);
      font-size: 1.8rem;
      cursor: pointer;
    }

    .fa-times {
      color: #fff;
      font-size: 2rem;
    }

    .nav-links-mobile {
      display: block;
      text-align: center;
      padding: 1.5rem;
      margin: 2rem auto;
      border-radius: 4px;
      width: 80%;
      background: #1888ff;
      text-decoration: none;
      color: #fff;
      font-size: 1.5rem;
    }

    .nav-links-mobile:hover {
      background: #fff;
      color: #1888ff;
      transition: 250ms;
    }

    button {
      display: none;
    }
  }
`;

export default Nav;
