import { FaCalendarAlt } from 'react-icons/fa';
import { formatDateToString as formatDate } from '~/utils/time';

function ArticleMeta({ date, author }) {
  return (
    <p className="text-sm text-gray-400 inline-flex items-center gap-1">
      <FaCalendarAlt />
      {formatDate(date)}
      {author && ` - ${author}`}
    </p>
  );
}

export default ArticleMeta;
