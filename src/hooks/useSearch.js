import { useState, useMemo } from 'react';

export function useSearch(initialArticles) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    if (!searchQuery) return initialArticles;

    const lowerQuery = searchQuery.toLowerCase();

    return initialArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.content.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, initialArticles]);

  return {
    searchQuery,
    setSearchQuery,
    filteredArticles,
  };
}