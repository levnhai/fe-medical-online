import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

function MobileNav({ open, setOpen, menu, t }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 lg:hidden transition-transform">
      <div className="flex justify-between items-center p-4 border-b">
        <span className="text-lg font-bold">Menu</span>
        <button onClick={() => setOpen(false)}>
          <IoMdClose className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {menu.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setOpen(false)}
            className="block text-gray-700 hover:text-indigo-600"
          >
            {t(`menu.${item.labelKey}`)}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MobileNav;
