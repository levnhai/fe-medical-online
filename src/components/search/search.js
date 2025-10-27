import { useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
//icon
import { CiSearch } from 'react-icons/ci';
import { GrLocation } from 'react-icons/gr';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { MdOutlineCancel } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

import { Wrapper as PopperWrapper } from '~/components/popper';

// import { adminServices } from '~/services';
// import { SearchIcon } from '~/components/Icons';
// import AccountItem from '~/components/AccountItem';
// import * as searchServices from '~/services/searchService';

import classNames from 'classnames/bind';
import style from './search.module.scss';

const cx = classNames.bind(style);

function Search() {
  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);
  const [searchValueBasic, setsearchValueBasic] = useState('');
  const [searchValueProvince, setSearchValueProvince] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading] = useState(false);
  const [provinceData, setProvinceData] = useState([]);

  const inputRef = useRef();

  // useEffect(() => {
  //   if (!debouncedValue.trim()) {
  //     setSearchResult([]);
  //     return;
  //   }
  //   const fetchApi = async () => {
  //     // setLoading(true);
  //     // const result = await searchServices.search(debouncedValue);
  //     // setSearchResult(result);
  //     // setLoading(false);
  //   };
  //   fetchApi();
  // }, [debouncedValue]);

  const handleClear = () => {
    setsearchValueBasic('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValueBasic = e.target.value;
    if (!searchValueBasic.startsWith(' ')) {
      setsearchValueBasic(searchValueBasic);
    }
  };

  const handleSearchProvince = async (e) => {
    // let res = await adminServices.getAllProvince();
    // setProvinceData(res.provinces.data);
  };

  return (
    <div>
      <div className={cx('search')}>
        <div className={cx('search-form')}>
          <div className={cx('form-content')}>
            <HeadlessTippy
              interactive={true}
              visible={false}
              render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                    <h4 className={cx('search-title')}>Accounts 12345t</h4>
                    {/* {provinceData &&
                provinceData.map(
                  (result, index) => <div key={index} data={result}></div>,
                )} */}
                  </PopperWrapper>
                </div>
              )}
              onClickOutside={handleHideResult}
            >
              <div className={cx('search-item')}>
                <span className={cx('item-icon')}>
                  <CiSearch />
                </span>
                <input
                  type="text"
                  className={cx('input-item')}
                  onChange={handleChange}
                  ref={inputRef}
                  spellCheck={false}
                  value={searchValueBasic}
                  placeholder={t('appointments.facility.search')}
                  onFocus={() => {
                    setShowResult(true);
                  }}
                />
                {!!searchValueBasic && !loading && (
                  <button className={cx('clear')}>
                    <MdOutlineCancel onClick={handleClear} />
                  </button>
                )}

                {loading && <LiaSpinnerSolid className={cx('loading')} />}
              </div>
            </HeadlessTippy>
            <HeadlessTippy
              placement="bottom"
              interactive={true}
              visible={showResult && provinceData.length > 0}
              render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                    <ul className={cx('search-result-list')}>
                      {provinceData &&
                        provinceData.map((result, index) => (
                          <li className={cx('search-result-item')} key={index}>
                            {result.name}
                          </li>
                        ))}
                    </ul>
                  </PopperWrapper>
                </div>
              )}
              onClickOutside={handleHideResult}
            >
              <div className={cx('search-item')}>
                <span className={cx('item-icon')} style={{ color: '#333', fontSize: 20 }}>
                  <GrLocation />
                </span>
                <input
                  className={cx('input-item')}
                  type="text"
                  onChange={(e) => setSearchValueProvince(e.target.value)}
                  ref={inputRef}
                  spellCheck={false}
                  value={searchValueProvince}
                  onFocus={() => {
                    setShowResult(true);
                  }}
                  placeholder={t('appointments.facility.location')}
                  onClick={handleSearchProvince}
                />

                {!!searchValueProvince ? (
                  <button
                    onClick={(e) => setSearchValueProvince('')}
                    onFocus={(e) => e.current.focus()}
                    className={cx('clear')}
                  >
                    <MdOutlineCancel onClick={handleClear} />
                  </button>
                ) : (
                  <span className={cx('clear')}>
                    <RiArrowDropDownLine />
                  </span>
                )}
              </div>
            </HeadlessTippy>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
