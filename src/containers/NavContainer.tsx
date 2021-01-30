import React, { useState, useEffect } from 'react';
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
  const [topNav, setTopNav] = useState(true);
  const [topButton, setTopButton] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { login } = useSelector((state: RootState) => state.login.userInfo);
  const { data } = useSelector((state: RootState) => state.userInfo);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const offsetTop = window.pageYOffset;
    offsetTop > 10 ? setTopNav(false) : setTopNav(true);
    offsetTop > 100 ? setTopButton(true) : setTopButton(false);
  };

  // function debounce(callback: any, milliseconds: number) {
  //   let debounceCheck: any;
  //   return function () {
  //     clearTimeout(debounceCheck);
  //     debounceCheck = setTimeout(() => {
  //       callback();
  //     }, milliseconds);
  //   };
  // }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

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
      <Container topNav={topNav}>
        <Link to="/" className="nav-logo">
          FESSPORT <i className="fas fa-passport"></i>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
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
            <Link
              to="/artist/list"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Artist
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

          <li className="nav-item"> | </li>

          <li
            className="nav-item"
            onMouseEnter={onMyMouseEnter}
            onMouseLeave={onMyMouseLeave}
          >
            <Link
              to="/fessport"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Fessport <i className="fas fa-caret-down" />
            </Link>
            {myDropdown && <MyDropdown />}
          </li>

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
        </ul>
      </Container>
      {topButton && (
        <TopButton
          src="/images/up.png"
          topButton={topButton}
          onClick={handleScrollUp}
        />
      )}
    </>
  );
};

const Container = styled.div<{ topNav: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  height: 80px;
  background: transparent;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  background-color: ${(props) =>
    props.topNav ? 'transparant' : 'rgb(21,21,31)'};
  transition: all 0.3s;

  .wall {
    margin-left: 2rem;
  }

  .nav-logo {
    color: #fff;
    justify-self: start;
    /* margin-left: 20px; */
    cursor: pointer;
    /* width: 100%; */
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
    width: 80vw;
    /* margin-left: 10%;
    margin-right: 10%; */
    justify-content: end;
    /* margin-right: 2rem; */
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

  @media only screen and (max-width: 960px) {
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

const TopButton = styled.img<{ topButton: boolean }>`
  position: fixed;
  top: 80%;
  left: 90%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  opacity: 0.9;
  z-index: 100;
`;

export default NavContainer;
