import { useTranslation } from 'react-i18next';
import useHeader from './useHeader';
import DesktopNav from '~/layouts/components/header/desktopNav';
import MobileNav from '~/layouts/components/header/mobileNav';
import { menu } from '../menu';
import logo from '~/assets/images/logo.png';

export default function Header() {
  const { t } = useTranslation([['common', 'button', 'menu', 'notification', 'patient', 'visit']]);
  const { isLoggedIn, shortName, mobileOpen, setMobileOpen, logout, user } = useHeader();

  return (
    <div className="sticky transition duration-300 ease-in-out top-0 w-full bg-white shadow z-50">
      <div>
        {/* Logo */}
        <div className="grid grid-cols-12">
          <div className="col-span-3 flex items-center justify-around cursor-pointer ">
            <a href="/">
              <img src={logo} alt="logo" className="w-[224px]" />
            </a>
          </div>

          <div className="col-span-9">
            {/* Desktop */}
            <div className="hidden lg:flex lg:flex-1 items-center gap-6">
              <DesktopNav menu={menu} t={t} login={isLoggedIn} shortName={shortName} user={user} logout={logout} />
            </div>
          </div>
          {/* Mobile button */}
          {/* <button onClick={() => setMobileOpen(true)} className="lg:hidden" aria-label="Open menu">
              <IoMdMenu className="w-6 h-6" />
            </button> */}
        </div>
      </div>
      <MobileNav open={mobileOpen} setOpen={setMobileOpen} menu={menu} t={t} />
    </div>
  );
}

// export { default } from './header';
