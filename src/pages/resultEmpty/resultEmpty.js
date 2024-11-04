import classNames from 'classnames/bind';
import style from './resultEmpty.module.scss';

const cx = classNames.bind(style);

function ResultEmpty() {
  return (
    <div className={cx('empty')}>
      <h1 className={cx('title')}>Danh sách sẽ cập nhật trong thời gian tới </h1>
      <div className={cx('image')}></div>
    </div>
  );
}

export default ResultEmpty;
