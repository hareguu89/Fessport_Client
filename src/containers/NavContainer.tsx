import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Dropdown, MyDropdown } from '../components/Nav';
import { SignModal } from '../components/ModalSign';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';

const NavContainer = (): JSX.Element => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [myDropdown, setMyDropdwon] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { login } = useSelector((state: RootState) => state.login.userInfo);
  // const { data } = useSelector((state: RootState) => state.userInfo.userInfo);

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
  const toggleModal = (): void => setModalState(!isModalOpen);

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
          <li className="nav-item">
            <Link to="/Artist" className="nav-links" onClick={closeMobileMenu}>
              Artist
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Festival"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Festival
            </Link>
          </li>
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
          <span className="wall"></span>
          {!login ? (
            <li
              className="nav-item"
              onMouseEnter={onMyMouseEnter}
              onMouseLeave={onMyMouseLeave}
            >
              <div className="nav-links-image" onClick={closeMobileMenu}>
                <img
                  className="nav-image"
                  src={
                    // data?.image
                    //   ? data?.image
                    //   :
                    `https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png`
                  }
                  alt=""
                ></img>
              </div>
              {myDropdown && <MyDropdown />}
            </li>
          ) : (
            <li className="nav-item">
              <li className="nav-item">
                <a className="nav-links" onClick={toggleModal}>
                  SignIn
                </a>
              </li>
              <SignModal
                title={'FESSPORT SIGN!'}
                isOpen={isModalOpen}
                onClose={toggleModal}
              ></SignModal>
            </li>
          )}
          <span className="wall"></span>
        </ul>
      </Container>
    </>
  );
};

const Container = styled.div`
  background: linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  .wall {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }

  .nav-image {
    display: flex;
    max-width: 35px;
    max-height: 35px;
    border-radius: 50%;
  }

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

  .nav-links-image {
    width: 150px;
    display: flex;
    padding: 0.5rem 1rem;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }

  .nav-links {
    color: #ccc;
    text-decoration: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  .nav-links:hover {
    color: white;
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

export default NavContainer;
