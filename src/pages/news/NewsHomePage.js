import NewsSliderSection from '~/pages/news/component/newsSliderSection';
export default function NewsHomePage() {
  return (
    <>
      <NewsSliderSection title="Tin dịch vụ" category="tin-dich-vu" />

      <NewsSliderSection title="Tin y tế" category="tin-y-te" />

      <NewsSliderSection title="Y học thường thức" category="y-hoc-thuong-thuc" />
    </>
  );
}
