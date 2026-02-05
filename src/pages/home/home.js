import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

// icon
import { FaCalendarAlt } from 'react-icons/fa';
import {
  VisitsIcon,
  HospitalIcon,
  DoctorServiceIcon,
  DocterIcon,
  HealthIcon,
  EyeIcon,
  ArowIcon,
} from '~/components/Icon';

import HospitalServices from './Section/HospitalServices';
import HealthServices from './Section/HealthServices';
import BannerServices from './Section/BannerServices';
import Button from '~/components/Button';
import Support from '~/layouts/components/support';
import OutStandingDoctor from './Section/OutStandingDoctor';
import { ImageMedia } from './Section/ImageMediaData';
import NewsLoadingSkeleton from './loading/newsLoading';
import { useGetNewsQuery } from '~/services/new.api';
import { serviceConfig } from './Section/serviceConfig';

import style from './home.module.scss';
const cx = classNames.bind(style);

function Home() {
  const { t } = useTranslation(['button', 'home', 'translation']);

  const { data, isLoading } = useGetNewsQuery({});
  const newData = data?.data;
  const items = t('home:serviceInfo.items', { returnObjects: true });
  console.log('🚀 ~ Home ~ items:', items);
  return (
    <div className={cx('home', 'mx-auto w-full overflow-x-hidden')}>
      <div className={cx('home_header', 'mb-8')}>
        <div className={cx('home_header_banner', 'bg-gray-100 rounded-lg p-6 md:p-10')}>
          <div className={cx('banner_wrapper', 'sm:flex sm:flex-col -mt-20')}>
            <div className={cx('banner_content', 'sm:w-full')}>
              <div className={cx('content_tag')}>{t('home:information.tech_platform')}</div>
              <div className={cx('content_title', 'text-2xl sm:text-6xl')}>
                <div>{t('home:information.connect_people')}</div>
                <div>{t('home:information.healthcare_facilities')}</div>
              </div>
              <div className={cx('content_des', 'w-full sm:w-auto')}>{t('home:information.services_description')}</div>
              <div>
                <Button to="/co-so-y-te/benh-vien-cong" className={cx('content_btn')} rounded>
                  {t('button:booking_now')}
                </Button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className={cx('healthServices')}>
          <HealthServices />
        </div>
      </div>
      <div className={cx('home_container')}>
        <div className={cx('home_info')}>
          <div className={cx('info_header', 'flex', 'flex-col', 'md:flex-row', 'md:items-center')}>
            <div className={cx('info_header_title', 'md:w-1/2')}>
              <div className={cx('info_header_text')}>MEDICAL</div>
              <div className={cx('info_header_tag')}>{t('button:booking_now')}</div>
            </div>
            <div className={cx('info_header_des', 'mt-4', 'md:mt-0', 'md:w-1/2')}>
              <b>Medical </b>
              {t('home:information.medical_description')}
            </div>
          </div>

          <div className={cx('home_card', 'grid', 'grid-cols-1', 'sm:grid-cols-1', 'md:grid-cols-1')}>
            <BannerServices />
          </div>
        </div>
        <div className={cx('home_statistic')}>
          <h1 className={cx('statistic_title')}>{t('home:statistics.title')}</h1>
          <ul
            className={cx(
              'statistic_list',
              'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center sm:justify-items-start',
            )}
          >
            <li className={cx('statistic_item', 'w-full max-w-[150px] sm:max-w-none')}>
              <div className={cx('statistic_image')}>
                <VisitsIcon />
              </div>
              <div className={cx('statistic_content')}>
                <div className={cx('statistic_number')}>2.2M+</div>
                <div className={cx('statistic_tag')}>{t('home:statistics.visits')}</div>
              </div>
            </li>
            <li className={cx('statistic_item', 'w-full max-w-[150px] sm:max-w-none')}>
              <div className={cx('statistic_image')}>
                <HospitalIcon />
              </div>
              <div className={cx('statistic_content')}>
                <div className={cx('statistic_number')}>30+</div>
                <div className={cx('statistic_tag')}>{t('home:statistics.hospitals')}</div>
              </div>
            </li>
            <li className={cx('statistic_item', 'w-full max-w-[150px] sm:max-w-none')}>
              <div className={cx('statistic_image')}>
                <HealthIcon />
              </div>
              <div className={cx('statistic_content')}>
                <div className={cx('statistic_number')}>50+</div>
                <div className={cx('statistic_tag')}>{t('home:statistics.healthcareFacilities')}</div>
              </div>
            </li>
            <li className={cx('statistic_item', 'w-full max-w-[150px] sm:max-w-none')}>
              <div className={cx('statistic_image')}>
                <DocterIcon />
              </div>
              <div className={cx('statistic_content')}>
                <div className={cx('statistic_number')}>200+</div>
                <div className={cx('statistic_tag')}>{t('home:statistics.doctors')}</div>
              </div>
            </li>
            <li className={cx('statistic_item', 'w-full max-w-[150px] sm:max-w-none')}>
              <div className={cx('statistic_image')}>
                <ArowIcon />
              </div>
              <div className={cx('statistic_content')}>
                <div className={cx('statistic_number')}>25.4k+</div>
                <div className={cx('statistic_tag')}>{t('home:statistics.monthlyVisits')}</div>
              </div>
            </li>
            <li className={cx('statistic_item', 'w-full max-w-[150px] sm:max-w-none')}>
              <div className={cx('statistic_image')}>
                <EyeIcon />
              </div>
              <div className={cx('statistic_content')}>
                <div className={cx('statistic_number')}>823</div>
                <div className={cx('statistic_tag')}>{t('home:statistics.dailyVisits')}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx('home_hospitalDeloy')}>
        <div className={cx('home_hospotalContent')}>
          <h1 className={cx('hospotalContent_title')}>{t('translation:hospitalDeployment.title')}</h1>
          <span className={cx('hospotalContent_des')}>{t('translation:hospitalDeployment.description')}</span>
        </div>
        <HospitalServices />
      </div>
      <div className={cx('home_bookingInfo', 'flex flex-col sm:flex-row')}>
        <div className={cx('bookingInfo_image', 'w-full sm:w-1/2 mb-4 sm:mb-0')}></div>
        <div className={cx('bookingInfo_content', 'w-full sm:w-1/2')}>
          <div className={cx('bookingInfo_title')}>{t('home:bookingInfo.title')}</div>
          <div className={cx('bookingInfo_des')}>{t('home:bookingInfo.description')}</div>
          <Button className={cx('bookingInfo_btn', 'w-full sm:w-auto')} rounded>
            {t('button:booking_now')}
          </Button>
        </div>
      </div>
      <div id="downloadBtn" className={cx('home_download')}>
        <div className={cx('download_header')}>
          <h1 className={cx('download_title')}>
            {t('translation:downloadApp.title')} <span>MEDICAL</span>
          </h1>
          <div className={cx('download_groupBtn')}>
            <div>
              <a href="https://apps.apple.com/us/app/id1481561748" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.appsessment.com/img/apple_app_store.png"
                  alt="download-btnIOs"
                  className={cx('download_btn')}
                />
              </a>
            </div>
            <div>
              <a
                href="https://play.google.com/store/apps/details?id=vn.com.medpro"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.appsessment.com/img/google_play_store.png"
                  alt="download-btnGooglePlay"
                  className={cx('download_btn')}
                />
              </a>
            </div>
          </div>
        </div>
        <div className={cx('download_service')}>
          <div className={cx('download_serviceInfo', 'flex justify-end')}>
            <ul className={cx('serviceInfo_list')}>
              <li className={cx('service_item')}>
                <div className={cx('service_content')}>
                  <h3 className={cx('service_title')}>{t('translation:serviceInfo.title.0')}</h3>
                  <div className={cx('service_des')}>
                    <p>{t('translation:serviceInfo.description.0')}</p>
                    <p>{t('translation:serviceInfo.description.1')}</p>
                    <p>{t('translation:serviceInfo.description.2')}</p>
                  </div>
                </div>
                <div className={cx('service_image')}>
                  <DoctorServiceIcon />
                </div>
              </li>
              <li className={cx('service_item')}>
                <div className={cx('service_content')}>
                  <h3 className={cx('service_title')}>{t('translation:serviceInfo.title.1')}</h3>
                  <div className={cx('service_des')}>
                    <p>{t('translation:serviceInfo.description.3')}</p>
                    <p>{t('translation:serviceInfo.description.4')}</p>
                  </div>
                </div>
                <div className={cx('service_image')}>
                  <img
                    alt=""
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F9762607b-d91a-4c94-a673-bbc516680154-2.svg&w=1920&q=75"
                    style={{ width: '60px', height: '60px' }}
                  />
                </div>
              </li>
              <li className={cx('service_item')}>
                <div className={cx('service_content')}>
                  <h3 className={cx('service_title')}>{t('translation:serviceInfo.title.2')}</h3>
                  <div className={cx('service_des')}>
                    <p>{t('translation:serviceInfo.description.5')}</p>
                  </div>
                </div>
                <div className={cx('service_image')}>
                  <img
                    alt=""
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F770cc02d-88f4-4e82-b26a-493b35810a28-3.svg&w=1920&q=75"
                    style={{ width: '60px', height: '60px' }}
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className={cx('serviceInfo_backgroundCenter')}>
            <div className={cx('backgroundCenter_circle')}></div>
            <div className={cx('backgroundCenter_phone')}></div>
          </div>
          <div className={cx('download_serviceInfo', 'flex justify-start')}>
            <ul className={cx('serviceInfo_list')}>
              <li className={cx('service_item', 'service_itemRight')}>
                <div className={cx('service_image')}>
                  <img
                    alt="Thanh toán viện phí"
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F000a18f1-7158-4631-bd03-db97a76fc203-4.svg&w=1920&q=75"
                    style={{ width: '60px', height: '60px' }}
                  />
                </div>
                <div className={cx('service_content')}>
                  <h3 className={cx('service_title')}>{t('translation:serviceInfo.title.3')}</h3>
                  <div className={cx('service_des')}>
                    <p>{t('translation:serviceInfo.description.6')}</p>
                    <p>{t('translation:serviceInfo.description.7')}</p>
                  </div>
                </div>
              </li>
              <li className={cx('service_item', 'service_itemRight')}>
                <div className={cx('service_image')}>
                  <img
                    alt="Y tế tại nhà"
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F4fff6c05-f49b-4f4a-a532-f2de15060877-5.svg&w=1920&q=75"
                    style={{ width: '60px', height: '60px' }}
                  />
                </div>
                <div className={cx('service_content')}>
                  <h3 className={cx('service_title')}>{t('translation:serviceInfo.title.4')}</h3>
                  <div className={cx('service_des')}>
                    <p>{t('translation:serviceInfo.description.8')}</p>
                  </div>
                </div>
              </li>
              <li className={cx('service_item', 'service_itemRight')}>
                <div className={cx('service_image')}>
                  <img
                    alt="Y tế tại nhà"
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F02a98830-d4c2-41ec-a16a-5403e43f4e13-6.svg&w=1920&q=75"
                    style={{ width: '60px', height: '60px' }}
                  />
                </div>
                <div className={cx('service_content')}>
                  <h3 className={cx('service_title')}>{t('translation:serviceInfo.title.5')}</h3>
                  <div className={cx('service_des')}>
                    <p>{t('translation:serviceInfo.description.9')}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className={cx('download_service')}>
          <div className={cx('serviceWrapper')}>
            <ul className={cx('serviceList')}>
              {items.map((item, index) => {
                const config = serviceConfig[index];

                return (
                  <li key={index} className={cx('serviceItem')} data-side={config.side}>
                    <div className={cx('serviceContent')}>
                      <h3 className={cx('serviceTitle')}>{item.title}</h3>

                      <div className={cx('serviceDesc')}>
                        {item.descriptions.map((desc, i) => (
                          <p key={i}>{desc}</p>
                        ))}
                      </div>
                    </div>

                    <div className={cx('serviceIcon')}>{config.icon}</div>
                  </li>
                );
              })}
            </ul>

            <div className={cx('centerPhone')} />
          </div>
        </div>
      </div> */}
      </div>
      <div className={cx('home_media')}>
        <div className={cx('media_header')}>
          <h2>{t('home:information.media_recognition')}</h2>
          <span>{t('home:information.media_recognition_decrip')}</span>
        </div>
        <div className={cx('media_listLogo')}>
          {ImageMedia &&
            ImageMedia.map((item, index) => {
              return (
                <div key={index}>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <img key={index} src={item.imageUrl} alt="item.alt" className={cx('media_logo')} />
                  </a>
                </div>
              );
            })}
        </div>
        <div>
          <iframe
            width="760"
            height="415"
            src="https://www.youtube.com/embed/zfmhCJgWx8Y?si=QLz1NFw-RFvjrFqO"
            title="YouTube video player"
            // frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={cx('media_video')}
          ></iframe>
        </div>
      </div>
      <div className={cx('outstanding-doctor', 'mb-20')}>
        <OutStandingDoctor />
      </div>
      {isLoading ? (
        <NewsLoadingSkeleton />
      ) : (
        <div className={cx('home_news')}>
          <h2 className={cx('new_title')}>{t('home:information.new_title')}</h2>
          <div className={cx('new_card')}>
            <div className={cx('new_cardLeft')}>
              <div className={cx('cardLeft_title')}>
                {newData && newData?.news?.length > 0 && (
                  <Link to={`/tin-tuc/${newData?.news[0]._id}`} className={cx('news_link')} key={newData?.news[0].id}>
                    <>
                      <img
                        src={newData?.news[0].imageUrl}
                        alt={newData?.news[0].title}
                        className="w-full h-58 object-cover"
                      />
                      <div className="p-4 mb-20">
                        <h2 className={cx('article_title_main')}>{newData?.news[0].title}</h2>
                        <p className={cx('article_excerpt_main')}>
                          {newData?.news[0].subtitle.replace(/<\/?[^>]+(>|$)/g, '')}
                        </p>
                        <p className={cx('cardLeft_tag', 'inline-flex')}>
                          <FaCalendarAlt />
                          &nbsp;{new Date(newData?.news[0].createdAt).toLocaleDateString()} -{' '}
                          {newData?.news[0]?.author?.fullName}
                        </p>
                        <p className={cx('article_excerpt_main')}>{newData?.news[0].excerpt}</p>
                      </div>
                    </>
                  </Link>
                )}
              </div>
            </div>
            <div className={cx('new_cardRight')}>
              <div className="grid grid-cols-2 gap-4">
                {newData?.news?.slice(1, 5).map((article) => (
                  <Link to={`/tin-tuc/${article._id}`} className={cx('news_link')} key={article.id}>
                    <div key={article.id} className={cx('cardRight_item')}>
                      <img src={article.imageUrl} alt={article.title} className={cx('cardRight_image')} />
                      <div className="flex flex-col">
                        <span className={cx('article_meta')}>{article.category?.name}</span>
                        <h3 className={cx('cardRight_title')}>{article.title}</h3>
                        <p className={cx('article_excerpt')}>
                          {article.subtitle
                            ?.replace(/<\/?[^>]+(>|$)/g, '')
                            .split(' ')
                            .slice(0, 20)
                            .join(' ')
                            .concat(article.subtitle.split(' ').length > 20 ? '...' : '')}
                        </p>
                        <p className={cx('cardRight_tag', 'inline-flex')}>
                          <FaCalendarAlt />
                          &nbsp;{new Date(article.createdAt).toLocaleDateString()} -{' '}
                          {newData?.news[0]?.author?.fullName}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className={cx('view-all')}>
            <Link to="/tin-tuc">
              <a href="/#" className={cx('view-all-button')}>
                Xem tất cả »
              </a>
            </Link>
          </div>
        </div>
      )}
      <div className={cx('home-support')}>
        <Support />
      </div>
    </div>
  );
}

export default Home;
