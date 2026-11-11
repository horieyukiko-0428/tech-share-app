import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';

export default function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('この記事を削除しますか？')) return;

    await fetch(`http://localhost:3000/articles/${id}`, {
      method: 'DELETE',
    });

    navigate('/');
  };

  if (!article) {
    return (
      <div className="text-center py-10">
        読み込み中...
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold mb-4">
        {article.title}
      </h1>

      <div className="flex justify-between items-center mb-8 pb-4 border-b">
        <div className="text-gray-500">
          <span>{article.author}</span>
          <span className="mx-2">・</span>
          <span>{article.createdAt}</span>
        </div>

        {user && user.name === article.author && (
          <div className="flex gap-2">
            <Link
              to={`/edit/${id}`}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
            >
              編集
            </Link>

            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
            >
              削除
            </button>
          </div>
        )}
      </div>

      <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
        <ReactMarkdown>
          {article.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}