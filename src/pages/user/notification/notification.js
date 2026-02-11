import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

// icon
import { FaHospitalAlt } from 'react-icons/fa';
import { MdCalendarMonth, MdOutlineAccessTimeFilled } from 'react-icons/md';
import { RiServiceLine } from 'react-icons/ri';

import Button from '~/components/Button';
import { formatDate, extractTime } from '~/utils/time';
import { fetchGetAppointment } from '~/redux/payment/paymentSlice';

import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

function Notification() {
  return (
    <div className="mx-6">
      <h1 className="font-bold text-3xl mb-6">Danh sách thông báo</h1>
      <div className="flex flex-wrap gap-2 md:gap-4">
        <Button>Phiếu khám</Button>
        <Button>Tin tức</Button>
        <Button>Thông báo</Button>
      </div>
    </div>
  );
}

export default Notification;
