import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//icon
import { IoPersonSharp } from 'react-icons/io5';
import { CiCalendar } from 'react-icons/ci';
import { IoIosNotificationsOutline } from 'react-icons/io';

//language
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';
import { SlideInFromBottom } from '~/components/animation';

const headerProfileMenuItems = [
  {
    key: 'records',
    icon: <IoPersonSharp style={{ width: '1.7rem', height: '1.7rem' }} />,
    titleKey: 'patient:profile.patient_profile',
    path: '/user?key=records',
  },
  {
    key: 'bills',
    icon: <CiCalendar />,
    titleKey: 'visit:medical_record',
    path: '/user?key=bills',
  },
  {
    key: 'notifications',
    icon: <IoIosNotificationsOutline />,
    titleKey: 'notification:notification',
    path: '/user?key=notifications',
  },
];

function ProfileDropdown({ user, logout, setShowModalProfile, btnLoginRef }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const { t } = useTranslation([['common', 'button', 'menu', 'notification', 'patient', 'visit']]);

  const handleClickOusideModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !btnLoginRef.current.contains(e.target)) {
      setShowModalProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOusideModal);
    return () => {
      document.removeEventListener('click', handleClickOusideModal);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className="absolute z-10 min-w-[134px] top-[90px] right-[250px] bg-white rounded-[12px] shadow-[0_0_1px_0_rgba(0,0,0,0.04),0_2px_6px_0_rgba(0,0,0,0.04),0_10px_20px_0_rgba(0,0,0,0.04)]"
    >
      <div className="relative w-[350px] rounded-[12px] overflow-hidden">
        <div className="flex px-16 pb-[12px] pt-[16px] ">
          <div className="w-[50px] h-[50px] bg-cover bg-no-repeat rounded-[9999px]"></div>
          <div className="pl-20px">
            <span className="">{t('common:greeting.hello')}</span>
            <h5
              className="mb-0
                capitalize
                text-[20px]
                font-bold
                leading-normal
                bg-[linear-gradient(40deg,var(--blue-color),#00e0ff)]
                bg-clip-text
                text-transparent"
            >
              {`${user?.userData?.fullName}`}
            </h5>
          </div>
        </div>
        <ul className="pl-0">
          {headerProfileMenuItems.map((item) => (
            <li className="group" key={item.key} onClick={() => navigate(item.path)}>
              <SlideInFromBottom>
                <div className="flex gap-2 p-[16px] border-l-2 animate-[moveUp_0.5s_ease-out] border-transparent cursor-pointer text-2xl text-[#003553] hover:border-[#11a2f3]">
                  <span className="group-hover:text-[#11a2f3] group-hover:animate-[shake_1s]">{item.icon}</span>
                  <span className="group-hover:text-[#11a2f3]">{t(item.titleKey)}</span>
                </div>
              </SlideInFromBottom>
            </li>
          ))}
          <li className=" border-y text-red-400 p-[12px] cursor-pointer">
            <div
              onClick={() => {
                logout();
                setShowModalProfile(false);
                toast.success(t('notification:logout_success'));
              }}
            >
              <span>
                <i className="fa-solid fa-right-from-bracket"></i>
              </span>
              <span>{t('button:logout')}</span>
            </div>
          </li>
          <li className="p-[16px] text-xl " disabled>
            <div>
              <span>{t('common:meta.last_update', { date: '29/12/2025' })}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileDropdown;
