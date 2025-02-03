// lấy giờ phút
export function extractTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getUTCHours();
  const minutes = date.getMinutes();
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  return formattedTime;
}

// format date
export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
