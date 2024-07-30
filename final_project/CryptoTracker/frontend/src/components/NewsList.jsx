import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function NewsList() {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('crypto');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNews(searchKeyword, page);
    }, [searchKeyword, page]);

    const fetchNews = async (keyword, page) => {
        setLoading(true);
        const response = await fetch(`http://localhost:3333/api/news?keyword=${encodeURIComponent(keyword)}&page=${page}`);
        const data = await response.json();
        if (data.articles) {
            const sortedArticles = data.articles
                .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
            setArticles(prev => [...prev, ...sortedArticles]);
        }
        setLoading(false);
    };

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            setPage(prev => prev + 1);
        }
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setArticles([]);
        setPage(1);
        fetchNews(searchKeyword, 1);
    };

    return (
        <div onScroll={handleScroll} style={{ height: '80vh', overflow: 'auto' }}>
            <h2>News List</h2>
            <form onSubmit={handleSearchSubmit}>
                <input type="text" value={searchKeyword} onChange={handleSearchChange} placeholder="Search news..." />
                <button type="submit">Search</button>
            </form>
            {articles.map((article, index) => (
                <Link key={index} to={{
                    pathname: "/news-detail"}}
                    state= { article }
                 style={{ display: 'flex', width: '100%', textDecoration: 'none', color: 'inherit' , margin: '10px 0'}}>
                    <img src={article.urlToImage} alt={article.title} style={{ width: '30%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, padding: '10px' }}>
                        <h4>{article.title}</h4>
                        <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
                        <p>{article.content ? article.content.substring(0, 100) + '...' : 'No content available'}</p>
                    </div>
                </Link>
            ))}
            {loading && <p>Loading more articles...</p>}
        </div>
    );
}

export default NewsList;
