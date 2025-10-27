import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// icon
import { BookingProvider } from '~/context/bookingContext';
import AppointmentDoctor from '../components/appointmentDoctor';
import AppointmentDate from '../components/appointmentDate';
import ChooseRecord from '../components/record';
import Confirm from '../components/confirm';
import PaymentMethod from '../components/payment';
import { setRedirectPath } from '~/redux/user/authSlice';

function AppointmentBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const baseUrl = `${window.location.origin}/`;

  const currentStep = queryParams.get('stepName') || 'doctor';

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const renderStep = () => {
    switch (currentStep) {
      case 'doctor':
        return <AppointmentDoctor />;
      case 'date':
        return <AppointmentDate />;
      case 'record':
        if (!isLoggedIn) {
          dispatch(setRedirectPath(`chon-lich-kham?feature=booking.doctor&stepName=record`));
          navigate('/check-phone');
          return null;
        }
        return <ChooseRecord />;
      case 'confirm':
        return <Confirm />;

      case 'payment':
        return <PaymentMethod />;

      default:
        return null;
    }
  };

  return (
    <BookingProvider>
      <div>{renderStep()}</div>
    </BookingProvider>
  );
}

export default AppointmentBooking;
