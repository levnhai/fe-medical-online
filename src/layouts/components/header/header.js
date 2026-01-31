import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// icon
import { SupportIcon } from '~/components/Icon';
import { FaTiktok, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { IoPersonSharp } from 'react-icons/io5';
import {
  IoMdArrowDropdown,
  IoIosArrowUp,
  IoIosArrowDown,
  IoMdMenu,
  IoIosSearch,
  IoIosNotificationsOutline,
  IoMdClose,
} from 'react-icons/io';
import { CiCalendar } from 'react-icons/ci';
import logo from '~/assets/images/logo.png';

//language
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

import Button from '~/components/Button';
import { menu } from '../menu';
import { logoutUser } from '~/redux/user/authSlice';

import style from './header.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

const languages = [
  { code: 'vi', name: 'Tiếng Việt', flag: require('~/assets/images/flag/Vn.png'), alt: 'flag vietnam' },
  { code: 'en', name: 'English', flag: require('~/assets/images/flag/Us.png'), alt: 'flag english' },
];

const socialData = [
  {
    title: 'Tiktok',
    href: 'https://www.tiktok.com/@medprovn/',
    icon: FaTiktok,
  },
  {
    title: 'Youtube',
    href: 'https://www.youtube.com/@medpro-atlichkhambenh1543',
    icon: FaYoutube,
  },
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/www.medpro.vn',
    icon: FaFacebookF,
  },
];

const getShortName = (fullName = '') => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[parts.length - 2]} ${parts[parts.length - 1]}`;
  return parts[0] || '';
};

function Header() {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const btnLoginRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);

  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const user = useSelector((state) => state.auth.user?.payload);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSubmenu = (menuItemHref) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menuItemHref]: !prev[menuItemHref],
    }));
  };

  const handleShowModalProfile = () => {
    if (isLoggedIn) {
      setShowModal(!showModal);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowModal(false);
    setMobileMenuOpen(false);
    toast.success(t('header.logout_success'));
  };
  // handle onchange language
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguages(language);
    setLanguageMenuOpen(false);
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const shortName = useMemo(() => {
    if (!isLoggedIn || !user?.userData?.fullName) return '';
    return getShortName(user.userData.fullName);
  }, [isLoggedIn, user]);

  const handleClickOusideModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !btnLoginRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOusideModal);
    return () => {
      document.removeEventListener('click', handleClickOusideModal);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const THRESHOLD = 150;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        // default
        if (currentY < THRESHOLD) {
          setIsCompact(false);
        }
        // Scroll down
        else if (delta > 10) {
          setIsCompact(true);
        }
        // Scroll up
        else if (delta < -10) {
          setIsCompact(false);
        }

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cx('header', { compact: isCompact })}>
      <div className={cx('header-wapper')}>
        <div className={cx('logo')}>
          <a href="/">
            <img src={logo} alt="" width="5rem" height="5rem" />
          </a>
        </div>
        <div className={cx('body')}>
          <div className={cx('topNavbar', { compact: isCompact })}>
            <div className={cx('social')}>
              {socialData?.map((s) => {
                return (
                  <a key={s.title} target="_blank" rel="noreferrer" href={s.href} className={cx('item')}>
                    <s.icon style={{ width: '1.6rem', height: '1.6rem' }} />
                    {s?.title}
                  </a>
                );
              })}
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
                  {isLoggedIn && `${user?.userData?.fullName}` ? shortName : t('header.account')}
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
                    alt="flag"
                    className={cx('flag-image')}
                  />
                </span>
                <span>
                  <IoMdArrowDropdown style={{ width: '1.5rem', height: '1.5rem' }} />
                </span>
                <ul className={cx('menu')}>
                  {languages &&
                    languages.map((item, index) => {
                      return (
                        <li className={cx('item')} onClick={() => handleLanguageChange(item.code)} key={index}>
                          <span>
                            <img src={item.flag} alt={item.alt} className={cx('flag-image')} />
                          </span>
                          {item.name}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            {showModal && (
              <div ref={modalRef} className={cx('modal')}>
                <div className={cx('modal-profile')}>
                  <div className={cx('profile-header')}>
                    <div className={cx('profile-avata')}></div>
                    <div className={cx('profile-info')}>
                      <span>{t('header.greeting')}</span>
                      <h5> {`${user?.userData?.fullName}`}</h5>
                    </div>
                  </div>
                  <ul className={cx('information-list')}>
                    <li
                      className={cx('information-item')}
                      onClick={() => {
                        navigate('/user?key=records');
                      }}
                    >
                      <div>
                        <span className={cx('icon')}>
                          <IoPersonSharp style={{ width: '1.7rem', height: '1.7rem' }} />
                        </span>
                        <span className={cx('title')}>{t('header.patient_profile')}</span>
                      </div>
                    </li>
                    <li
                      className={cx('information-item')}
                      onClick={() => {
                        navigate('/user?key=bills');
                      }}
                    >
                      <div>
                        <span className={cx('icon')}>
                          <CiCalendar />
                        </span>
                        <span className={cx('title')}>{t('header.medical_record')}</span>
                      </div>
                    </li>
                    <li
                      className={cx('information-item')}
                      onClick={() => {
                        navigate('/user?key=notifications');
                      }}
                    >
                      <div>
                        <span className={cx('icon')}>
                          <IoIosNotificationsOutline />
                        </span>
                        <span className={cx('title')}>{t('header.notifications')}</span>
                      </div>
                    </li>
                    <li className={cx('information-item')}>
                      <div
                        onClick={() => {
                          dispatch(logoutUser());
                          setShowModal(false);
                          toast.success(t('header.logout_success'));
                        }}
                      >
                        <span className={cx('icon')}>
                          <i className="fa-solid fa-right-from-bracket"></i>
                        </span>
                        <span className={cx('title')}>{t('header.logout')}</span>
                      </div>
                    </li>
                    <li className={cx('information-item')} disabled>
                      <div>
                        <span>{t('header.last_update', { date: '29/12/2023' })}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className={cx('header_menu')}>
            <a href="tel:0915948664">
              <div className={cx('support')}>
                <div className={cx('suportIcon')}>
                  <SupportIcon />
                </div>
                <div className={cx('suportTitle')}>
                  {t('header.support_title')}
                  <div>1900 1211</div>
                </div>
              </div>
            </a>
            <div className={cx('navbar')}>
              <ul className={cx('navbarList')}>
                {menu.map((menuItem) => (
                  <li key={menuItem.href} className={cx('navbarItem')}>
                    <Link className={cx('navbarLink')} to={menuItem.href}>
                      {t(`menu.${menuItem.labelKey}`)}
                    </Link>
                    {menuItem.children && (
                      <>
                        <span>
                          <IoMdArrowDropdown style={{ width: '1.5rem', height: '1.5rem' }} />
                        </span>
                        <div className={cx('menu')}>
                          <ul>
                            {menuItem.children.map((childItem) => (
                              <li key={childItem.href} className={cx('menuItem')}>
                                <Link className={cx('menuLink')} to={childItem.href}>
                                  {t(`menu.${childItem.labelKey}`)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('header-mobile', 'flex items-center justify-between p-4 bg-white shadow-md lg:hidden')}>
        <div className={cx('logo', 'w-5 h-5')}>
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>

        <div className={cx('buttonbar-mobile', 'flex items-center space-x-0')}>
          <div className={cx('language', 'relative')}>
            <button onClick={toggleLanguageMenu} className={cx('language-button', 'flex items-center space-x-0')}>
              <img
                src={currentLanguages === 'vi' ? languages[0].flag : languages[1].flag}
                alt={`Current language: ${currentLanguages}`}
                className={cx('flag-image', 'w-6 h-6 rounded-full')}
              />
              <IoMdArrowDropdown className="w-6 h-6" />
            </button>
            {languageMenuOpen && (
              <ul className={cx('menu', 'absolute bg-white border rounded-md shadow-lg mt-2 w-48 p-2')}>
                {' '}
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    className={cx('item', 'flex items-center p-2 hover:bg-gray-100 cursor-pointer')}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <img src={lang.flag} alt={`${lang.name} flag`} className={cx('flag-image', 'w-5 h-5 mr-2')} />
                    {lang.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div style={{ marginRight: '-22px', marginLeft: '-22px' }}>
            <Button className={cx('btn-menu', 'btn_headermobile')} onClick={toggleMobileMenu}>
              <IoMdMenu className="w-12 h-12" />
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white shadow-lg overflow-y-auto">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className={cx('logo', 'w-5 h-5')}>
              <a href="/" className="text-lg font-bold">
                <img alt="" src={logo} />
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-indigo-600">
                <IoIosSearch className="h-10 w-10" />
              </button>
              <button className="p-2 text-gray-600 hover:text-indigo-600" onClick={toggleMobileMenu}>
                <IoMdClose className="h-12 w-12" />
              </button>
            </div>
          </div>
          <div className="p-4 overflow-y-auto h-screen">
            <div className="mb-4">
              <div ref={btnLoginRef}>
                <Button
                  to={isLoggedIn ? '/user?key=records' : '/check-phone'}
                  rounded
                  leftIcon={<IoPersonSharp style={{ width: '1.7rem', height: '1.7rem' }} />}
                  className={cx(
                    'accountBtn',
                    'w-full text-left px-4 py-2 bg-indigo-500 text-white rounded-lg flex items-center',
                  )}
                  onClick={() => {
                    if (isLoggedIn) {
                      navigate('/user?key=records');
                      setMobileMenuOpen(false); // Close the mobile menu
                    } else {
                      handleShowModalProfile();
                    }
                  }}
                >
                  {isLoggedIn ? user?.userData?.fullName : t('header.account')}
                </Button>
              </div>
            </div>
            <ul className="space-y-4">
              {menu.map((menuItem) => (
                <li key={menuItem.href}>
                  <div className="flex items-center justify-between">
                    <button
                      className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-between"
                      onClick={() => menuItem.children && toggleSubmenu(menuItem.href)}
                    >
                      <span className="flex items-center">
                        {menuItem.icon && <menuItem.icon className="mr-2" />}
                        <span>{t(`menu.${menuItem.labelKey}`)}</span>
                      </span>
                      {menuItem.children &&
                        (openSubmenus[menuItem.href] ? (
                          <IoIosArrowUp className="ml-2" />
                        ) : (
                          <IoIosArrowDown className="ml-2" />
                        ))}
                    </button>
                  </div>
                  {menuItem.children && openSubmenus[menuItem.href] && (
                    <ul className="pl-6 mt-2 space-y-2">
                      {menuItem.children.map((childItem) => (
                        <li key={childItem.href} onClick={toggleMobileMenu}>
                          <Link
                            to={childItem.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white rounded-lg"
                          >
                            {t(`menu.${childItem.labelKey}`)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            {isLoggedIn && (
              <div className="mt-4">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg flex items-center"
                >
                  <i className="fa-solid fa-right-from-bracket mr-2"></i>
                  {t('header.logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
