import { FaCalendarAlt } from 'react-icons/fa';
import { formatDateToString as formatDate } from '~/utils/time';

import classNames from 'classnames/bind';
import styles from '../news.module.scss';
const cx = classNames.bind(styles);

function ArticleMeta({ date, author }) {
  return (
    <p className={cx('article_meta', 'inline-flex')}>
      <FaCalendarAlt />
      {formatDate(date)}
      {author && ` - ${author}`}
    </p>
  );
}

export default ArticleMeta;
