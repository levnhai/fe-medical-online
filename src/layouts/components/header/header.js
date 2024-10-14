import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// icon
import { LogoIcon, SupportIcon } from '~/components/Icon';
import { FaTiktok, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { IoPersonSharp } from 'react-icons/io5';
import { IoMdArrowDropdown, IoMdMenu, IoIosSearch, IoIosNotificationsOutline } from 'react-icons/io';
import { GoPerson } from 'react-icons/go';
import { CiCalendar } from 'react-icons/ci';

//language
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

import { menu } from './menu';

import style from './header.module.scss';
import Button from '~/components/Button';
import { logoutUser } from '~/redux/user/authSlice';

import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function Header() {
  const modalRef = useRef(null);
  const btnLoginRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [shortName, setShortName] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user?.payload);

  // bắt sự kiện click show modal
  const handleShowModalProfile = () => {
    if (isLoggedIn) {
      setShowModal(!showModal);
    }
  };

  // handle onchange language
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguages(language);
  };

  // rút gọn name
  const handleshortName = () => {
    let fullName = isLoggedIn && user && `${user.user.fullName}`;
    if (isLoggedIn && fullName) {
      let nameParts = fullName.split(' ');
      let shortName = '';
      if (nameParts.length > 1) {
        shortName = nameParts[nameParts.length - 2] + ' ' + nameParts[nameParts.length - 1];
      } else {
        shortName = nameParts[0];
      }
      setShortName(shortName);
    }
  };

  // bắt sự kiện click ra ngoài modal profile
  const handleClickOusideModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !btnLoginRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => {
    handleshortName();

    document.addEventListener('click', handleClickOusideModal);
    return () => {
      document.removeEventListener('click', handleClickOusideModal);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.matchMedia('(min-width: 992px)').matches) {
        const currentScrollPos = window.scrollY;
        if (currentScrollPos > prevScrollPos) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener khi component bị unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    // className={cx('header')}
    // className={!isScrolled ? cx('header', 'fixed-on-scroll') : cx('header')}
    // className={cx('header')}
    <div className={cx('header')}>
      <div className={cx('header-wapper')}>
        <div className={cx('logo')}>
          <a href="/">
            {/* <LogoIcon className={cx('icon')} /> */}
            {/* <img src={require()} alt="" width="5rem" height="5rem" /> */}
          </a>
        </div>
        <div className={cx('body')}>
          <div className={cx('topNavbar')}>
            {/* <div className={isScrolled ? cx('topNavbar', 'fixed-on-scroll') : cx('topNavbar')}> */}
            <div className={cx('social')}>
              <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@medprovn/" className={cx('item')}>
                <FaTiktok style={{ width: '1.6rem', height: '1.6rem' }} />
                Tiktok
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/@medpro-atlichkhambenh1543"
                className={cx('item')}
              >
                <FaYoutube style={{ width: '1.6rem', height: '1.6rem' }} />
                Youtube
              </a>
              <a target="_blank" rel="noreferrer" href="https://www.facebook.com/www.medpro.vn" className={cx('item')}>
                <FaFacebookF style={{ width: '1.6rem', height: '1.6rem' }} />
                Facebook
              </a>
            </div>
            <div className={cx('groupBtn')}>
              <div>
                <Button
                  href="/#downloadBtn"
                  rounded
                  leftIcon={<MdOutlinePhoneAndroid style={{ width: '1.7rem', height: '1.7rem' }} />}
                  className={cx('donwloadBtn')}
                >
                  {t('header.download_app')}
                </Button>
              </div>
              <div ref={btnLoginRef}>
                <Button
                  to={isLoggedIn ? '#' : '/check-phone'}
                  rounded
                  leftIcon={<IoPersonSharp style={{ width: '1.7rem', height: '1.7rem' }} />}
                  className={cx('accountBtn')}
                  onClick={handleShowModalProfile}
                >
                  {isLoggedIn && `${user.user.fullName}` ? shortName : t('header.account')}
                </Button>
              </div>
              <div className={cx('language')}>
                <span>
                  <img
                    src={
                      currentLanguages === 'vi'
                        ? require('~/assets/images/flag/Vn.png')
                        : require('~/assets/images/flag/Us.png')
                    }
                    alt="flag image vn"
                    className={cx('flag-image')}
                  />
                </span>
                <span>
                  <IoMdArrowDropdown style={{ width: '1.5rem', height: '1.5rem' }} />
                </span>
                <ul className={cx('menu')}>
                  <li className={cx('item')} onClick={() => handleLanguageChange('vi')}>
                    <span>
                      <img
                        src={require('~/assets/images/flag/Vn.png')}
                        alt="flag image vn"
                        className={cx('flag-image')}
                      />
                    </span>
                    Tiếng việt
                  </li>
                  <li className={cx('item')} onClick={() => handleLanguageChange('en')}>
                    <span>
                      <img
                        src={require('~/assets/images/flag/Us.png')}
                        alt="flag image vn"
                        className={cx('flag-image')}
                      />
                    </span>
                    Tiếng anh
                  </li>
                </ul>
              </div>
            </div>
            {showModal && (
              <div ref={modalRef} className={cx('modal')}>
                <div className={cx('modal-profile')}>
                  <div className={cx('profile-header')}>
                    <div className={cx('profile-avata')}></div>
                    <div className={cx('profile-info')}>
                      <span> Xin chào </span>
                      <h5> {`${user.user.fullName}`}</h5>
                    </div>
                  </div>
                  <ul className={cx('information-list')}>
                    <li className={cx('information-item')}>
                      <div>
                        <span className={cx('icon')}>
                          <IoPersonSharp style={{ width: '1.7rem', height: '1.7rem' }} />
                        </span>
                        <span className={cx('title')}>Hồ sơ bệnh nhân</span>
                      </div>
                    </li>
                    <li className={cx('information-item')}>
                      <div>
                        <span className={cx('icon')}>
                          <i className="fa-regular fa-note-sticky"></i>
                        </span>
                        <span className={cx('title')}>Phiếu khám bệnh</span>
                      </div>
                    </li>
                    <li className={cx('information-item')}>
                      <div>
                        <span className={cx('icon')}>
                          <i className="fa-regular fa-bell"></i>
                        </span>
                        <span className={cx('title')}>Thông báo</span>
                      </div>
                    </li>
                    <li className={cx('information-item')}>
                      <div
                        onClick={() => {
                          dispatch(logoutUser());
                          setShowModal(false);
                          toast.success('Đăng xuất thành công');
                        }}
                      >
                        <span className={cx('icon')}>
                          <i className="fa-solid fa-right-from-bracket"></i>
                        </span>
                        <span className={cx('title')}>Đăng xuất</span>
                      </div>
                    </li>
                    <li className={cx('information-item')} disabled>
                      <div>
                        <span>Câp nhật mới nhất: 29/12/2023</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          {/* cx('header_menu' */}

          <div className={cx('header_menu')}>
            <a href="tel:0915948664">
              <div className={cx('support')}>
                <div className={cx('suportIcon')}>
                  <SupportIcon />
                </div>
                <div className={cx('suportTitle')}>
                  Hổ trợ đặt khám
                  <div>1900 1211</div>
                </div>
              </div>
            </a>
            <div className={cx('navbar')}>
              <ul className={cx('navbarList')}>
                {menu?.map((menuItem) => (
                  <li className={cx('navbarItem')}>
                    <Link className={cx('navbarLink')} to={menuItem.href}>
                      {menuItem.label}
                    </Link>
                    <span>
                      <IoMdArrowDropdown style={{ width: '1.5 rem', height: '1.5rem' }} />
                    </span>
                    <div className={cx('menu')}>
                      <ul>
                        {menuItem?.children?.map((childrenItem) => (
                          <li className={cx('menuItem')}>
                            <Link className={cx('menuLink')} to={childrenItem.href}>
                              {childrenItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('header-mobile')}>
        <div className={cx('logo')}>
          <a href="/">
            <LogoIcon className={cx('icon')} />
          </a>
        </div>
        <div className={cx('buttonbar-mobile')}>
          <Button className={cx('btn_search', 'btn_headermobile')}>
            <IoIosSearch />
          </Button>
          <Button className={cx('btn-menu', 'btn_headermobile')}>
            <IoMdMenu />
          </Button>
        </div>
      </div>
      <div className={cx('nav_mobile')}>
        <div className={cx('nav_wrapper')}>
          <div className={cx('nav_header')}>
            <div className={cx('logo')}>
              <a href="/">
                <LogoIcon className={cx('icon')} />
              </a>
            </div>
            <div className={cx('buttonbar-mobile')}>
              <Button className={cx('btn_search', 'btn_headermobile')}>
                <IoIosSearch />
              </Button>
              <Button className={cx('btn-menu', 'btn_headermobile')}>
                <IoMdMenu />
              </Button>
            </div>
          </div>
          <div className={cx('nav_body')}>
            <div className={cx('topMenu')}>
              <Button leftIcon={<GoPerson />}>Lê Văn Hải</Button>
            </div>
            <div className={cx('menu_mobile')}>
              <ul className={cx('list_menu')}>
                <li className={cx('item_menu')}>
                  <div className={cx('item')}>
                    <Button className={cx('btn_item')} leftIcon={<GoPerson />}>
                      <span>Hồ sơ bệnh nhân</span>
                    </Button>
                  </div>
                </li>
                <li className={cx('item_menu')}>
                  <div className={cx('item')}>
                    <Button className={cx('btn_item')} leftIcon={<CiCalendar />}>
                      <span>Phiếu khám bệnh</span>
                    </Button>
                  </div>
                </li>
                <li className={cx('item_menu')}>
                  <div className={cx('item')}>
                    <Button className={cx('btn_item')} leftIcon={<IoIosNotificationsOutline />}>
                      <span>Thông báo</span>
                    </Button>
                  </div>
                </li>
              </ul>
            </div>
            <div className={cx('menu_mobile')}>
              <ul className={cx('list_menu')}>
                <li className={cx('item_menu')}>
                  <div className={cx('item')}>
                    <Button className={cx('btn_item')} leftIcon={<GoPerson />}>
                      <span>Hồ sơ bệnh nhân</span>
                    </Button>
                  </div>
                </li>
                <li className={cx('item_menu')}>
                  <div className={cx('item')}>
                    <Button className={cx('btn_item')} leftIcon={<CiCalendar />}>
                      <span>Phiếu khám bệnh</span>
                    </Button>
                  </div>
                </li>
                <li className={cx('item_menu')}>
                  <div className={cx('item')}>
                    <Button className={cx('btn_item')} leftIcon={<IoIosNotificationsOutline />}>
                      <span>Thông báo</span>
                    </Button>
                  </div>
                </li>
              </ul>
            </div>
            <div className={cx('menu_mobile')}>
              <ul className={cx('list_menu')}>
                <li className={cx('item_menu')}>
                  <div className={cx('item')}>
                    <Button className={cx('btn_item')} leftIcon={<GoPerson />}>
                      <span>Hồ sơ bệnh nhân</span>
                    </Button>
                  </div>
                </li>
                <li className={cx('item_menu')}>
                  <div className={cx('item')}>
                    <Button className={cx('btn_item')} leftIcon={<CiCalendar />}>
                      <span>Phiếu khám bệnh</span>
                    </Button>
                  </div>
                </li>
                <li className={cx('item_menu')}>
                  <div className={cx('item')}>
                    <Button className={cx('btn_item')} leftIcon={<IoIosNotificationsOutline />}>
                      <span>Thông báo</span>
                    </Button>
                  </div>
                </li>
              </ul>
            </div>
            <div className={cx('menu_mobile')}>
              <ul className={cx('list_menu')}>
                <li className={cx('item_menu')}>
                  <div className={cx('item')}>
                    <Button className={cx('btn_item')} leftIcon={<GoPerson />}>
                      <span>Hồ sơ bệnh nhân</span>
                    </Button>
                  </div>
                </li>
                <li className={cx('item_menu')}>
                  <div className={cx('item')}>
                    <Button className={cx('btn_item')} leftIcon={<CiCalendar />}>
                      <span>Phiếu khám bệnh</span>
                    </Button>
                  </div>
                </li>
                <li className={cx('item_menu')}>
                  <div className={cx('item')}>
                    <Button className={cx('btn_item')} leftIcon={<IoIosNotificationsOutline />}>
                      <span>Thông báo</span>
                    </Button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Header);
