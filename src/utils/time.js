// lấy giờ phút
export function extractTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getUTCHours();
  const minutes = date.getMinutes();
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  return formattedTime;
}
