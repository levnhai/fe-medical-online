const menuItems = [
  { title: 'TIN TỨC Y KHOA', path: '/tin-tuc' },
  { title: 'Tin dịch vụ', path: '/tin-tuc/dich-vu' },
  { title: 'Tin y tế', path: '/tin-tuc/y-te' },
  { title: 'Y học thường thức', path: '/tin-tuc/y-hoc-thuong-thuc' },
];

export default function NewsHeader({ title }) {
  return (
    <div className="news-header">
      <h1>{title}</h1>
      <div className="news-line" />
    </div>
  );
}
