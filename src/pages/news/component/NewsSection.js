import ArticleCard from '~/pages/news/component/articleCard';

function NewsSection({ title, articles }) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold border-l-4 border-blue-600 pl-4 mb-6">{title}</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default NewsSection;
