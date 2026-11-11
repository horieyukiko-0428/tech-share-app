import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    if (isEditMode) {
      fetch(`http://localhost:3000/articles/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
        });
    }
  }, [id, isEditMode, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      return alert('タイトルと本文を入力してください');
    }

    const articleData = {
      title,
      content,
      author: user.name,
      createdAt: isEditMode ? undefined : new Date().toISOString().split('T')[0],
    };

    const url = isEditMode ? `http://localhost:3000/articles/${id}` : 'http://localhost:3000/articles';
    const method = isEditMode ? 'PATCH' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articleData),
    });

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-[80vh]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isEditMode ? '記事の編集' : '新規記事作成'}
        </h1>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-bold"
        >
          {isEditMode ? '更新する' : '投稿する'}
        </button>
      </div>

      <input
        type="text"
        placeholder="記事のタイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-3 text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex-1 grid grid-cols-2 gap-4">
        <textarea
          placeholder="マークダウンで本文を記述..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
        />

        <div className="flex-1 p-4 border rounded-lg bg-white overflow-y-auto prose max-w-none">
          {content ? (
            <ReactMarkdown>{content}</ReactMarkdown>
          ) : (
            <p className="text-gray-400">プレビュー領域</p>
          )}
        </div>
      </div>
    </form>
  );
}