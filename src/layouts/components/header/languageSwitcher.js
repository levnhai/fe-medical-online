import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { t, i18n } = useTranslation([['common', 'button', 'menu', 'notification', 'patient', 'visit']]);
  const [open, setOpen] = useState(false);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="px-3 py-2">
        {i18n.language.toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md">
          <button onClick={() => changeLang('vi')} className="block px-4 py-2 hover:bg-gray-100">
            VI
          </button>
          <button onClick={() => changeLang('en')} className="block px-4 py-2 hover:bg-gray-100">
            EN
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
