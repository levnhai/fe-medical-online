import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// icon
import { LogoIcon, SupportIcon } from '~/components/Icon';
import { FaTiktok, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { IoPersonSharp } from 'react-icons/io5';
import { IoMdArrowDropdown,  IoIosArrowUp, IoIosArrowDown, IoMdMenu, IoIosSearch, IoIosNotificationsOutline } from 'react-icons/io';
import { GoPerson } from 'react-icons/go';
import { CiCalendar } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';

//language
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

import { menu } from './menu';

import style from './header.module.scss';
import Button from '~/components/Button';
// import { logoutUser } from '~/redux/user/authSlide';

import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function Header() {
  const modalRef = useRef(null);
  const btnLoginRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [shortName, setShortName] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const toggleSubmenu = (menuItemHref) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menuItemHref]: !prev[menuItemHref]
    }));
  };
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
    setLanguageMenuOpen(false);
  };
  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };
  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: require('~/assets/images/flag/Vn.png') },
    { code: 'en', name: 'English', flag: require('~/assets/images/flag/Us.png') },
  ];
  // rút gọn name
  // const handleshortName = () => {
  //   let fullName = isLoggedIn && user && `${user.userData.fullName}`;
  //   if (isLoggedIn && fullName) {
  //     let nameParts = fullName.split(' ');
  //     let shortName = '';
  //     if (nameParts.length > 1) {
  //       shortName = nameParts[nameParts.length - 2] + ' ' + nameParts[nameParts.length - 1];
  //     } else {
  //       shortName = nameParts[0];
  //     }
  //     setShortName(shortName);
  //   }
  // };

  // bắt sự kiện click ra ngoài modal profile
  const handleClickOusideModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !btnLoginRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => {
    // handleshortName();

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
                  {/* {isLoggedIn && user.userData && `${user.userData.fullName}` ? shortName : t('header.account')}/ */}
                   {t('header.account')}
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
                    <span>{t('header.greeting')}</span>
                      {/* <h5> {`${user.userData.fullName}`}</h5> */}
                      <h5> Bùi dức đạt</h5>
                    </div>
                  </div>
                  <ul className={cx('information-list')}>
                    <li className={cx('information-item')}>
                      <div>
                        <span className={cx('icon')}>
                          <IoPersonSharp style={{ width: '1.7rem', height: '1.7rem' }} />
                        </span>
                        <span className={cx('title')}>{t('header.patient_profile')}</span>
                      </div>
                    </li>
                    <li className={cx('information-item')}>
                      <div>
                        <span className={cx('icon')}>
                          <i className="fa-regular fa-note-sticky"></i>
                        </span>
                        <span className={cx('title')}>{t('header.medical_record')}</span>
                      </div>
                    </li>
                    <li className={cx('information-item')}>
                      <div>
                        <span className={cx('icon')}>
                          <i className="fa-regular fa-bell"></i>
                        </span>
                        <span className={cx('title')}>{t('header.notifications')}</span>
                      </div>
                    </li>
                    <li className={cx('information-item')}>
                      <div
                        onClick={() => {
                          // dispatch(logoutUser());
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
          {/* cx('header_menu' */}

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
  <div className={cx('logo')}>
    <a href="/">
      <LogoIcon className={cx('icon')} />
    </a>
  </div>
  
  <div className={cx('buttonbar-mobile', 'flex items-center space-x-4')}>
    <div className={cx('language', 'relative')}>
      <button onClick={toggleLanguageMenu} className={cx('language-button', 'flex items-center space-x-2')}>
        <img
          src={currentLanguages === 'vi' ? languages[0].flag : languages[1].flag}
          alt={`Current language: ${currentLanguages}`}
          className={cx('flag-image', 'w-6 h-6 rounded-full')}
        />
        <IoMdArrowDropdown className="w-6 h-6" />
      </button>
      {languageMenuOpen && (
        <ul className={cx('menu', 'absolute bg-white border rounded-md shadow-lg mt-2 w-48 p-2')}> {/* Thêm w-48 và p-2 */}
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={cx('item', 'flex items-center p-2 hover:bg-gray-100 cursor-pointer')}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <img
                src={lang.flag}
                alt={`${lang.name} flag`}
                className={cx('flag-image', 'w-5 h-5 mr-2')}
              />
              {lang.name}
            </li>
          ))}
        </ul>
      )}

    </div>
    <div>
      <Button className={cx('btn-menu', 'btn_headermobile')} onClick={toggleMobileMenu}>
        <IoMdMenu className="w-6 h-6" />
      </Button>
    </div>
  </div>
</div>

{mobileMenuOpen && (
  <div className="fixed inset-0 z-50 bg-white shadow-lg overflow-y-auto">
    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center">
        <a href="/" className="text-lg font-bold">
          <LogoIcon className={cx('icon')} />
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-600 hover:text-indigo-600">
          <IoIosSearch className="h-6 w-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-indigo-600" onClick={toggleMobileMenu}>
          <IoMdClose className="h-6 w-6" />
        </button>
      </div>
    </div>
    <div className="p-4 overflow-y-auto h-screen">
      <div className="mb-4">
        {/* <button className="w-full text-left px-4 py-2 bg-indigo-500 text-white rounded-lg flex items-center">
          <GoPerson className="mr-2" />
          {isLoggedIn ? shortName : t('header.account')}
        </button> */}
        <div ref={btnLoginRef}>
                <Button
                  to={isLoggedIn ? '#' : '/check-phone'}
                  rounded
                  leftIcon={<IoPersonSharp style={{ width: '1.7rem', height: '1.7rem' }} />}
                  className={cx('accountBtn', 'w-full text-left px-4 py-2 bg-indigo-500 text-white rounded-lg flex items-center')}
                  onClick={handleShowModalProfile}
                >
                  {/* {isLoggedIn && user.userData && `${user.userData.fullName}` ? shortName : t('header.account')}/ */}
                   {t('header.account')}
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
                  {menuItem.children && (
                    openSubmenus[menuItem.href] ? 
                      <IoIosArrowUp className="ml-2" /> : 
                      <IoIosArrowDown className="ml-2" />
                  )}
                </button>
              </div>
              {menuItem.children && openSubmenus[menuItem.href] && (
                <ul className="pl-6 mt-2 space-y-2">
                  {menuItem.children.map((childItem) => (
                    <li key={childItem.href}>
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
    </div>
  </div>
)}

    </div>
  );
}

export default React.memo(Header);
