import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
import LanguageSwitcher from '~/layouts/components/header/languageSwitcher';
import ProfileDropdown from '~/layouts/components/header/profileDropdown';

//icon
import { IoIosNotificationsOutline, IoMdArrowDropdown } from 'react-icons/io';
import { FaTiktok, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { IoPersonSharp } from 'react-icons/io5';
import { SupportIcon } from '~/components/Icon';

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

function DesktopNav({ menu, t, login, shortName, user, logout }) {
  const btnLoginRef = useRef(null);
  const [showModalProfile, setShowModalProfile] = useState(false);

  const handleShowModalProfile = () => {
    if (login) {
      setShowModalProfile(!showModalProfile);
    }
  };
  return (
    <div className="w-full h-full">
      {/* top */}
      <div className="grid grid-cols-12 border-b-2">
        <div className="flex justify-between items-center col-span-10 py-6">
          {/* social */}
          <div className="flex gap-[10px]">
            {socialData?.map((s) => {
              return (
                <a
                  className="flex justify-center items-center gap-[4px]"
                  key={s.title}
                  target="_blank"
                  rel="noreferrer"
                  href={s.href}
                >
                  <s.icon style={{ width: '1.6rem', height: '1.6rem' }} />
                  {s?.title}
                </a>
              );
            })}
          </div>
          {/* groupBtn */}
          <div className="flex items-center gap-6">
            {login && (
              <div>
                <IoIosNotificationsOutline style={{ width: '2.4rem', height: '2.4rem' }} />
              </div>
            )}

            <div>
              <Button
                href="/#downloadBtn"
                rounded
                leftIcon={<MdOutlinePhoneAndroid style={{ width: '1.7rem', height: '1.7rem' }} />}
                className="border-none outline-none"
              >
                {t('button:download_app')}
              </Button>
            </div>
            <div ref={btnLoginRef}>
              <Button
                to={login ? '#' : '/check-phone'}
                rounded
                leftIcon={<IoPersonSharp style={{ width: '1.7rem', height: '1.7rem' }} />}
                onClick={handleShowModalProfile}
                className="
                  px-[20px] py-[9px]
                  text-[var(--blue-color)]
                  border border-current
                  bg-[var(--white-color)]
                  capitalize
                  hover:text-white
                  hover:bg-[linear-gradient(83.63deg,var(--blue-color)_33.34%,#00e0ff_113.91%)]
                  active:shadow-[0_0_0_0.25rem_rgba(49,132,253,0.5)]
                  transition-all duration-200
                "
              >
                {login && shortName ? shortName : t('button:account')}
              </Button>
            </div>
            {/* language */}
            <LanguageSwitcher />
          </div>
        </div>
        <div className="col-span-2"></div>
        {showModalProfile && login && (
          <ProfileDropdown
            user={user}
            logout={logout}
            setShowModalProfile={setShowModalProfile}
            btnLoginRef={btnLoginRef}
          />
        )}
      </div>

      {/* bottom */}
      <div className="grid grid-cols-12">
        <div className="flex justify-between items-center col-span-10 py-2">
          {/* support */}
          <a className="min-w-[180px]" href="tel:0915948664">
            <div className="flex items-center gap-4">
              <div className="">
                <SupportIcon />
              </div>
              <div className="">
                {t('common:suport.support_title')}
                <div>1900 1211</div>
              </div>
            </div>
          </a>
          {/* menu */}
          <div className="flex relative justify-end w-full items-center">
            <ul className="flex relative">
              {menu.map((menuItem) => (
                <li
                  className="flex group items-center py-[21px] px-[12px] text-xl font-bold border-b-2 border-solid border-transparent"
                  key={menuItem.href}
                >
                  <Link className="text-2xl hover:text-[var(--blue-color)]" to={menuItem.href}>
                    {t(`menu:${menuItem.labelKey}`)}
                  </Link>
                  {menuItem.children && (
                    <>
                      <span>
                        <IoMdArrowDropdown style={{ width: '1.5rem', height: '1.5rem' }} />
                      </span>
                      <div className="absolute top-[60px] w-[196px] hidden group-hover:block group-hover:visible rounded-[10px] bg-white z-10">
                        <ul>
                          {menuItem.children.map((childItem) => (
                            <li
                              className="py-[16px] pl-[12px] hover:bg-[#e6f2ff] hover:text-[var(--blue-color)] cursor-pointer"
                              key={childItem.href}
                            >
                              <Link to={childItem.href}>{t(`menu:${childItem.labelKey}`)}</Link>
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
        <div className="col-span-2"></div>
      </div>
    </div>
  );
}

export default DesktopNav;
