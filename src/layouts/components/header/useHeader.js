import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getShortName } from '~/utils/string';
import { logoutUser } from '~/redux/user/authSlice';

function useHeader() {
  const dispatch = useDispatch();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => {
    return state.auth.user?.payload;
  });

  const shortName = useMemo(() => {
    if (!isLoggedIn || !user?.userData?.fullName) return '';
    return getShortName(user.userData.fullName);
  }, [isLoggedIn, user]);

  const logout = () => {
    dispatch(logoutUser());
    setMobileMenuOpen(false);
  };
  return {
    isLoggedIn,
    user,
    shortName,
    mobileMenuOpen,
    setMobileMenuOpen,
    logout,
  };
}

export default useHeader;
