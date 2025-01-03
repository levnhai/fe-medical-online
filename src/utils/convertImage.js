import { Buffer } from 'buffer';

// lấy giờ phút
export function convertImage(image) {
  if (image) {
    return Buffer.from(image.data, 'base64').toString('binary');
  }
  return null;
}
