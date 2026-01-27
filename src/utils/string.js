// Remove accents (diacritics) from a string
// Example: "Tiếng Việt" -> "Tieng Viet"
export function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// create slug name
// Example: "Bệnh viện đa khoa đồng nai -> benh-vien-da-khoa-dong-nai"
export function createSlugName(name) {
  if (!name || typeof name !== 'string') {
    return '';
  }

  return name
    .toLowerCase() // Convert string to lowercase
    .normalize('NFD') // Normalize Unicode string to NFD (separates characters and diacritics)
    .replace(/[\u0300-\u036f]/g, '') // Remove Vietnamese accents/diacritics
    .replace(/đ/g, 'd') // Replace Vietnamese "đ" with "d"
    .replace(/Đ/g, 'd') // Replace Vietnamese "Đ" with "d"
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters, keep letters, numbers, spaces, and hyphens
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, '-') // Replace one or more spaces with a single hyphen
    .replace(/-+/g, '-'); // Remove duplicate hyphens
}
