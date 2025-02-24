import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

// icon
import { MdKeyboardArrowRight, MdOutlinePhoneInTalk } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';
import { IoMdTime } from 'react-icons/io';

import { convertImage } from '~/utils/convertImage';

import styles from './facilitie.module.scss';
const cx = classNames.bind(styles);
function FacilitieDetail() {
  const location = useLocation();
  const hospitalData = location.state?.hospital; // Lấy dữ liệu từ state
  let address =
    `${hospitalData?.address[0].street}, ${hospitalData?.address[0].wardName}, ${hospitalData?.address[0].districtName}, ${hospitalData?.address[0].provinceName}` ||
    'không tìm thấy';

  console.log('check hospital', hospitalData);
  return (
    <div className="max-w-screen-lg m-auto pb-20">
      <div className={cx('', 'py-4')}>
        <ul className={cx('flex')}>
          <li className={cx('flex items-center')}>
            <a href="#/" className="font-semibold">
              Trang chủ
            </a>
            <MdKeyboardArrowRight />
          </li>
          <li className={cx('flex items-center')}>
            <a href="#/" className=" text-sky-500 font-semibold">
              {hospitalData?.fullName}
            </a>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-1 rounded-2xl min-h-100 bg-white px-10 py-6">
          <div className="flex flex-col justify-center items-center">
            <div
              className={cx('content-image')}
              style={{
                backgroundImage:
                  hospitalData.image.data.length > 0
                    ? `url(${convertImage(hospitalData.image)})`
                    : "url('https://img.freepik.com/premium-vector/drawing-building-with-bird-it_1065891-1524.jpg?semt=ais_hybrid')",

                width: '120px',
                height: '120px',
                marginTop: '20px',
              }}
            ></div>
            <h3 className="text-2xl font-bold py-4 capitalize">{hospitalData?.fullName}</h3>
          </div>
          <div>
            <div className={cx('flex items-center gap-2')}>
              <CiLocationOn className="text-yellow-900" />
              <span>{address}</span>
            </div>
            <div className={cx('flex items-center gap-2')}>
              <IoMdTime />
              <span>Thứ 2 - thứ 6</span>
            </div>
            <div className={cx('flex items-center gap-2')}>
              <MdOutlinePhoneInTalk />
              <span>Hổ trợ đặt khám: 1900 1514 </span>
            </div>
          </div>
        </div>
        <div className="col-span-2 rounded-2xl min-h-96 bg-red-50"></div>
      </div>
      <div className="grid grid-cols-3 gap-10 mt-10">
        <div className="col-span-1 rounded-2xl">
          <img alt="Gói khám" src={require('~/assets/images/errImg.png')} />
          <div className="col-span-1 bg-white rounded-2xl p-12 mt-10">
            <h2 className="font-bold text-3xl">Mô tả</h2>
            <span className="text-xl">{hospitalData?.description}</span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default FacilitieDetail;
