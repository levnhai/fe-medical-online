import React, { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import '~/assets/css/react-tabs.css';

import Header from '../component/header';
import style from './question.module.scss';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { RiArrowDropRightFill } from 'react-icons/ri';
import Support from '~/layouts/components/support';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Question() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeContent, setActiveContent] = useState(null);

  const tabs = [
    {
      title: 'Vấn đề chung',
      contents: [
        { subtitle: 'Đăng kí khám bệnh online có mất phí không?', description: 'Mô tả của Nội dung 1 - Tab 1' },
        {
          subtitle: 'Làm sao để sử dụng được ứng dụng đăng kí khám bệnh trực tuyến',
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
                Đặt lịch khám bệnh theo hẹn, mọi lúc mọi nơi, mà không cần đến bệnh viện:
              </p>
              <ul>
                <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                <li>Giảm thời gian chờ khám tại bệnh viện.</li>
                <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
              </ul>
            </div>
          ),
        },
      ],
    },
    {
      title: 'Vấn đề tài khoản',
      contents: [
        { subtitle: 'Tôi quên số bệnh nhân thì làm phải làm sao?', description: 'Mô tả của Nội dung 1 - Tab 2' },
        {
          subtitle: 'Làm sao tôi biết bên mình đã có mã bệnh nhân hay chưa?',
          description: 'Tao là hải ',
        },
      ],
    },
    {
      title: 'Vấn đề về quy trình đặt khám',
      contents: [
        {
          subtitle: 'Có thể đăng ký khám bệnh trong ngày bằng phần mềm không?',
          description: 'dell',
        },
        { subtitle: 'Khi khám bệnh tôi cần chuẩn bị gì?', description: 'Nịt' },
        { subtitle: 'Nếu bác sĩ thay đổi lịch khám, tôi phải làm sao?', description: '2 - Tab 3' },
      ],
    },
    {
      title: 'Vấn đề thanh toán',
      contents: [
        { subtitle: 'Phí tiện ích là gì?', description: '1 - Tab 3' },
        { subtitle: 'Điều kiện để được hoàn tiền là gì?', description: '2 - Tab 3' },
      ],
    },
  ];

  const handleContentClick = (index) => {
    setActiveContent(activeContent === index ? null : index);
  };

  return (
    <div className={cx('question')}>
      <Header
        title={'Chúng tôi có thể giúp gì cho bạn?'}
        des={'Giải đáp câu hỏi nhanh giúp quý khách hiểu rõ hơn về sản phẩm, dịch vụ chúng tôi.'}
      />
      <div className={cx('container')}>
        <div className={cx('list_question', 'my-10')}>
          <div className={cx('tab_nav')}>
            <h4 className={cx('tab__nav--title')}>Danh sách câu hỏi</h4>
            {tabs?.map((tab, index) => {
              return (
                <div
                  className={activeTab === index ? cx('tab__nav--item', 'active') : cx('tab__nav--item')}
                  key={index}
                  onClick={() => {
                    setActiveTab(index);
                    setActiveContent(null);
                  }}
                >
                  <span className={'text-4xl'}>
                    <RiArrowDropRightFill />
                  </span>
                  {tab.title}
                </div>
              );
            })}
          </div>
          <div className={cx('tab__panel--collapse')}>
            {tabs[activeTab].contents.map((item, index) => (
              <div className={cx('collapse__item')}>
                <div className={cx('collapse__header')}>
                  <div className={cx('collapse__header--title')} key={index} onClick={() => handleContentClick(index)}>
                    {item.subtitle}
                    {activeContent === index ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
                  </div>
                </div>
                {activeContent === index && (
                  <div className={cx('collapse__content')}>
                    <div className={cx('collapse__content--box')}>{item.description}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Support />
    </div>
  );
}

export default Question;
