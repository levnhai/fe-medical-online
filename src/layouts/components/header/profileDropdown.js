import { useRef, useEffect, useState } from 'react';

function ProfileDropdown({ shortName, logout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
        {shortName || 'Account'}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40">
          <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
