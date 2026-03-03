import { IoMdMenu } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import useHeader from './useHeader';
import DesktopNav from '~/layouts/components/header/desktopNav';
import MobileNav from '~/layouts/components/header/mobileNav';
import ProfileDropdown from '~/layouts/components/header/profileDropdown';
import LanguageSwitcher from '~/layouts/components/header/languageSwitcher';
import { menu } from '../menu';
import logo from '~/assets/images/logo.png';

export default function Header() {
  const { t } = useTranslation([['common', 'button', 'menu', 'notification', 'patient', 'visit']]);
  const { isLoggedIn, shortName, mobileOpen, setMobileOpen, logout } = useHeader();

  return (
    <div className="sticky transition duration-300 ease-in-out top-0 w-full bg-white shadow z-50">
      <div className="max-w-[1344px] mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <a href="/">
              <img src={logo} alt="logo" className="h-10 w-auto" />
            </a>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <DesktopNav menu={menu} t={t} />
            {isLoggedIn && <ProfileDropdown shortName={shortName} logout={logout} />}
            <LanguageSwitcher />
          </div>

          {/* Mobile button */}
          <button onClick={() => setMobileOpen(true)} className="lg:hidden" aria-label="Open menu">
            <IoMdMenu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} setOpen={setMobileOpen} menu={menu} t={t} />
    </div>
  );
}
