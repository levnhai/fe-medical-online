import React, { useState } from 'react';
// import 'react-tabs/style/react-tabs.css';
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
        { subtitle: 'Đăng kí khám bệnh online có mất phí không?', 
          description:(
          <div>
              <p className={cx('collapse__content--title')}>
              Bạn chỉ cần thanh toán phí khi việc đặt lịch khám của bạn được xác nhận. Các tính năng khác của ứng dụng, bao gồm việc sử dụng ứng dụng và truy cập vào các thông tin khác, thì hoàn toàn miễn phí.
              </p>
              </div>
          )
        },
        {
          subtitle: 'Làm sao để sử dụng được ứng dụng đăng kí khám bệnh trực tuyến',
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
                Đặt lịch khám bệnh theo hẹn, mọi lúc mọi nơi, mà không cần đến bệnh viện:
              </p>
              <ul className={cx('collapse__content--title')}>
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
        {
          subtitle: 'Sau khi đã đăng ký khám thành công qua ứng dụng, có thể hủy phiếu khám không?',
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
                Có, bạn có thể chủ động hủy phiếu khám đã đăng ký thành công, nếu kế hoạch khám chữa bệnh có sự thay đổi. Phí khám sẽ được hoàn trả theo đúng thời gian quy định.
              </p>
              <p className={cx('collapse__content--title')}>
                Hoặc trong một số trường hợp, bệnh viện có quyền từ chối phiếu khám, chẳng hạn như: sai lệch thông tin bệnh nhân, sai thông tin phiếu khám, hay vấn đề phát sinh bất khả kháng từ phía bệnh viện.              </p>
              <p className={cx('collapse__content--title')}>
                Khi đó, bạn sẽ được hoàn tiền sau khi xác thực tình trạng sử dụng của phiếu khám, đảm bảo tuân thủ theo quy định của ứng dụng và bệnh viện.              </p>
            </div>
          ),
        },
        {
          subtitle: 'Tôi đến bệnh viện trễ hơn so với giờ khám đã đăng ký, vậy tôi có được khám hay không?',
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
              Có. Trường hợp bạn đến trễ hơn so với giờ hẹn trên phiếu khám bệnh, bạn vẫn có thể được vào thăm khám tại bệnh viện. Tuy nhiên, mọi sự tiếp nhận và thời gian khám bệnh sẽ nghe theo sự sắp xếp của bệnh viện, phụ thuộc vào tình hình thực tế của bệnh viện ở thời điểm đó.
              </p>
            </div>
          ),
        },
        {
          subtitle: 'Tôi có thể dùng ứng dụng để đăng ký và lấy số thứ tự khám cho bệnh nhân khác không?',
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
              Ứng dụng Medpro khuyến cáo người dùng tự đăng ký khám bệnh cho bản thân để tự quản lý thông tin cá nhân, hồ sơ bệnh, lịch sử khám chữa bệnh, và kết quả khám chữa bệnh. Điều này nhằm đảm bảo an toàn và bảo mật thông tin cá nhân.              
              </p>
              <p className={cx('collapse__content--title')}>
              Trong trường hợp người bệnh thực sự không có khả năng tiếp cận hoặc sử dụng ứng dụng, việc nhờ người khác đăng ký khám bệnh qua ứng dụng hoặc đăng ký giúp người khác (như thân nhân, họ hàng, bạn bè, đồng nghiệp, v.v.) vẫn có thể được thực hiện.              </p>
              <p className={cx('collapse__content--title')}>
              Tuy nhiên, cần lưu ý rằng việc này là trái với quy định của ứng dụng và có thể ảnh hưởng đến an toàn bảo mật thông tin trong ngành y. Nếu có bất kỳ vấn đề phát sinh nào liên quan đến việc này, người đặt khám giúp người khác và người nhờ người khác đặt khám có thể phải tự chịu trách nhiệm trước pháp luật.
              </p>
              <p className={cx('collapse__content--title')}>
              Do đó, trước khi thực hiện hành động này, hãy cân nhắc kỹ lưỡng và đảm bảo rằng người được đăng ký khám bệnh đồng ý và hiểu rõ về việc chia sẻ thông tin của họ. Nếu có thể, hãy hỗ trợ họ để tự họ có thể đăng ký khám bệnh trực tiếp qua ứng dụng.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      title: 'Vấn đề tài khoản',
      contents: [
        { subtitle: 'Tôi quên số bệnh nhân thì làm phải làm sao?', 
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
              Để tìm lại mã số bệnh nhân, bạn có thể xem qua gợi ý về cách tìm lại mã số bệnh nhân, và tìm lại trong các loại giấy tờ khám chữa bệnh của mình.
              </p>
              <p className={cx('collapse__content--title')}>
              Hoặc mở tính năng "Tôi quên mã số bệnh nhân" &gt; nhập chính xác các thông tin yêu cầu &gt; bấm "Xác nhận" &gt; và chọn hồ sơ của mình trong danh sách kết quả.              </p>
            </div>
          ),
        },
        {
          subtitle: 'Làm sao tôi biết bên mình đã có mã bệnh nhân hay chưa?',
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
              Nếu bạn đã từng thực hiện việc khám chữa bệnh tại bệnh viện, đồng nghĩa với việc bạn đã có “mã số bệnh nhân” trên hệ thống của bệnh viện.              </p>
              <p className={cx('collapse__content--title')}>
              Khi đó, hãy tìm lại mã số bệnh nhân của bạn trong các loại giấy tờ khám chữa bệnh, hoặc bạn có thể sử dụng tính năng “Tôi quên mã số bệnh nhân” để tìm lại mã số bệnh nhân của mình ngay trên phần mềm.
              </p>
            </div>
          ),
        },
        {
          subtitle: 'Tôi có thể chọn tùy ý một hồ sơ bệnh nhân của người khác để đăng ký khám bệnh cho mình không?',
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
              Trong trường hợp bạn cố tình hay nhầm lẫn dùng hồ sơ bệnh nhân của người khác hoặc khai báo sai thông tin để đăng ký khám bệnh, bạn đã vi phạm điều khoản sử dụng của phần mềm và quy định tại bệnh viện.               
              </p>
              <p className={cx('collapse__content--title')}>
              Bệnh viện sẽ từ chối khám chữa bệnh, bạn sẽ chịu hoàn toàn những thiệt hại và tùy mức độ có thể chịu trách nhiệm trước pháp luật.
              </p>
              <p className={cx('collapse__content--title')}>
              Vì vậy, khi đăng ký khám bệnh bạn vui lòng chọn/nhập và kiểm tra chính xác hồ sơ bệnh nhân của mình!
              </p>
            </div>
          ),
        },
        {
          subtitle: 'Mã số bệnh nhân là gì ? Làm sao tôi có thể biết được mã số bệnh nhân của mình?',
          description: (
            <ul className={cx('collapse__content--title')}>
             <li>Mã số bệnh nhân là số hồ sơ mà bệnh viện dùng để quản lý thông tin của bạn trên hệ thống dữ liệu của bệnh viện.</li>
             <li>Mã số bệnh nhân là số hồ sơ mà bệnh viện dùng để quản lý thông tin của bạn trên hệ thống dữ liệu của bệnh viện.</li>
            </ul>
          ),
        },
      ],
    },
    {
      title: 'Vấn đề về quy trình đặt khám',
      contents: [
        {
          subtitle: 'Có thể đăng ký khám bệnh trong ngày bằng phần mềm không?',
          description: 
          <div>
              <p className={cx('collapse__content--title')}>
              Hiện tại bệnh viện hỗ trợ cả đặt khám đăng ký trong ngày, cho phép đặt khám trước 30 phút. Nhưng bạn không được huỷ phiếu khám trong ngày.,
              </p>
            </div>
        },
        { subtitle: 'Khi khám bệnh tôi cần chuẩn bị gì?', 
        description: 
        <div>
          <p className={cx('collapse__content--title-b')}>
            Đối với Người bệnh có thẻ Bảo hiểm y tế:
          </p>
          <p className={cx('collapse__content--title')}>Vui lòng mang thẻ BHYT và giấy tờ tuỳ thân, và đến cửa tiếp nhận số 1trước hẹn 15 phút để được hướng dẫn vào phòng khám.</p>
          <p className={cx('collapse__content--title-b')}>
            Đối với Người bệnh KHÔNG có thẻ Bảo hiểm y tế:
          </p>
          <p className={cx('collapse__content--title')}>Bệnh nhân vui lòng đến trước giờ hẹn 15 phút, xuất trình phiếu khám bệnh điện tử và giấy tờ tùy thân để được hướng dẫn vào phòng khám bệnh.</p>
        </div> },
        {
          subtitle: 'Nếu bác sĩ thay đổi lịch khám, tôi phải làm sao?',
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
              Khi bác sĩ thay đổi lịch khám, phần mềm sẽ gửi thông báo cho bạn qua tin nhắn sms, email và trên ứng dụng.Khi nhận được thông báo về sự thay đổi. Bạn có thể:
              </p>
              <ul className={cx('collapse__content--title')}>
                <li>Hủy Phiếu Khám Bệnh để nhận lại tiền khám theo quy định hoàn tiền.</li>
                <li>Vẫn giữ nguyên thông tin trên Phiếu Khám Bệnh, và điều này đồng nghĩa với việc bạn chấp nhận khám với bác sĩ thay thế mà bệnh viện đã sắp xếp.</li>
                Thay đổi thông tin khám trên phiếu khám bệnh, bằng cách: Đăng nhập phần mềm &gt; Thông Tin Tài Khoản &gt; Quản lý phiếu khám bệnh &gt; chọn vào phiếu khám bệnh bị thay đổi lịch khám &gt; bấm "Chỉnh sửa".
              </ul>
            </div>
          ),
        },
        {
          subtitle: 'Tôi sẽ được khám bệnh vào đúng thời gian đã chọn, sau khi đăng ký khám qua phần mềm đúng không?',
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
              Trả lời: Có thể.
              </p>
              <p className={cx('collapse__content--title')}>
              Thời gian bạn chọn khi đăng ký khám, được xem là thời gian khám bệnh dự kiến. Do đặc thù của công tác khám chữa bệnh, sẽ không thể chính xác thời gian khám 100%.
              </p>
            </div>
          ),
        },
        {
          subtitle: 'Tôi đã đăng ký thành công vậy khi đi khám tôi có phải xếp hàng gì không?',
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
              Không, bạn không còn phải xếp hàng chờ đợi để lấy số khám bệnh, làm thủ tục đóng tiền, bạn chỉ cần đến cửa tiếp nhận số 1 để được hướng dẫn vào phòng khám.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      title: 'Vấn đề thanh toán',
      contents: [
        { subtitle: 'Phí tiện ích là gì?', 
          description: (
          <div>
            <p className={cx('collapse__content--title')}>
            Khi sử dụng các dịch vụ hỗ trợ do Medpro cung cấp, người dùng sẽ thanh toán phí sử dụng dịch vụ tiện ích của Medpro sau đây gọi là "Phí tiện ích Medpro", bên cạnh phí dịch vụ y tế được công bố bởi Bệnh viện/Cơ sở y tế và phí xử lý giao dịch thanh toán trực tuyến "Phí dịch vụ thanh toán" (nếu có). "Phí tiện ích" là loại phí phát sinh khi người dùng sử dụng dịch vụ hỗ trợ của Medpro để đem lại các lợi ích thiết thực cho người dùng so với việc không sử dụng.
            </p>
          </div>
        ),
      },
        { subtitle: 'Điều kiện để được hoàn tiền là gì?',  
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
              Bạn chỉ được hoàn tiền khi thực hiện thành công yêu cầu Hủy Phiếu Khám Bệnh trên phần mềm theo theo quy định.              
              </p>
            </div>
          ),
        },
        { subtitle: 'Cách tính phí tiện ích',  
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
              <span className={cx('collapse__content--title-b')}>Phí tiện ích</span> = Phí tiện ích Medpro (10,000 vnđ + VAT) + Phí dịch vụ thanh toán (tùy vào hình thức thanh toán trực tuyến mà người dùng chọn)           
              </p>
              <ul className={cx('collapse__content--title')}>
                <li>Lưu ý: Phí dịch vụ thanh toán có thể thay đổi tùy thuộc vào tổ chức cung cấp dịch vụ thanh toán và phương thức thanh toán mà người dùng chọn.</li>
              </ul>
            </div>
          ),
        },
        { subtitle: 'Tôi muốn đăng ký khám online nhưng đến trực tiếp bệnh viện để thanh toán được không?',  
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
              Trả lời : không Hiện tại khi đặt khám trên phần mềm bạn vui lòng hoàn tất quy trình thanh toán ngay trên phần mềm để được nhận phiếu khám bệnh.
              </p>
              
            </div>
          ),
        },
        { subtitle: 'Tôi nhập tài khoản thẻ nhưng bấm xác thực hoài không được?',  
          description: (
            <div>
              <p className={cx('collapse__content--title')}>
              Vui lòng kiểm tra chính xác thông tin thẻ đã nhập. Trường hợp vẫn bị lỗi, hãy chụp ảnh màn hình báo lỗi và gửi qua các kênh hỗ trợ, chúng tôi sẽ hỗ trợ bạn.
              </p>
              
            </div>
          ),
        },
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
