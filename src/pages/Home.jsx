import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const {searchQuery, setSearchQuery, filteredArticles } = useSearch(articles);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/articles`)
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="記事を検索..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            to={`/articles/${article.id}`}
            className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {article.title}
            </h2>

            <p className="text-gray-500 text-sm mb-4">
              {article.author} ・ {article.createdAt}
            </p>

            <p className="text-gray-600 line-clamp-3">
              {article.content}
            </p>
          </Link>
        ))}

        {filteredArticles.length === 0 && (
          <p className="text-gray-500">記事が見つかりません</p>
        )}
      </div>
    </div>
  );
}