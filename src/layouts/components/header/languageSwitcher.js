import { useState } from 'react';
import { useTranslation } from 'react-i18next';

//icon
import { IoMdArrowDropdown } from 'react-icons/io';

const languages = [
  {
    code: 'vi',
    nameVN: 'Tiếng Việt',
    nameEN: 'Vietnamese',
    flag: require('~/assets/images/flag/Vn.png'),
    alt: 'flag vietnam',
  },
  {
    code: 'en',
    nameVN: 'Tiếng anh',
    nameEN: 'English',
    flag: require('~/assets/images/flag/Us.png'),
    alt: 'flag english',
  },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLanguages(lang);
  };

  return (
    <div className="relative group">
      <div className="flex gap-2 items-center h-full cursor-pointer">
        <span>
          <img
            src={
              currentLanguages === 'vi'
                ? require('~/assets/images/flag/Vn.png')
                : require('~/assets/images/flag/Us.png')
            }
            alt="flag"
            className="w-[32px] h-[21px]"
          />
        </span>
        <span>
          <IoMdArrowDropdown style={{ width: '1.5rem', height: '1.5rem' }} />
        </span>
      </div>
      <ul
        className="
        absolute after:content-['']
        after:absolute
        after:-top-[19px]
        after:right-0
        after:w-[74%]
        after:h-[30px]
        hidden
        group-hover:block
        opacity-0
        invisible
        group-hover:opacity-100
        group-hover:visible
        right-0
        top-[calc(100%+6px)]
        w-[160px]
        rounded-[3px]
        list-none
        bg-white
        z-10
        shadow-xl
        "
      >
        {languages &&
          languages.map((item, index) => {
            return (
              <li
                className="flex items-center gap-2 px-[12px] py-[8px] cursor-pointer text-[#11a2f3] hover:text-black"
                onClick={() => handleLanguageChange(item.code)}
                key={index}
              >
                <span>
                  <img className="w-[32px] h-[21px]" src={item.flag} alt={item.alt} />
                </span>
                {currentLanguages === 'vi' ? item.nameVN : item.nameEN}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default LanguageSwitcher;
