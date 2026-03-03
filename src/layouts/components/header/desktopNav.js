import { Link } from 'react-router-dom';
import { FaTiktok, FaFacebookF, FaYoutube } from 'react-icons/fa';

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

function DesktopNav({ menu, t }) {
  return (
    <div className="">
      <div>
        {/* social */}
        <div>
          {socialData?.map((s) => {
            return (
              <a key={s.title} target="_blank" rel="noreferrer" href={s.href}>
                <s.icon style={{ width: '1.6rem', height: '1.6rem' }} />
                {s?.title}
              </a>
            );
          })}
        </div>
        {/* groupBtn */}
        <div></div>
      </div>
      <div></div>
      {/* {menu.map((item) => (
        <div key={item.href} className="relative group">
          <Link to={item.href} className="text-gray-700 hover:text-indigo-600 font-medium">
            {t(`menu.${item.labelKey}`)}
          </Link>

          {item.children && (
            <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-md w-48">
              {item.children.map((child) => (
                <Link key={child.href} to={child.href} className="block px-4 py-2 hover:bg-indigo-500 hover:text-white">
                  {t(`menu.${child.labelKey}`)}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))} */}
    </div>
  );
}

export default DesktopNav;
