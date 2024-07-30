import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllNews() {
    const [articles, setArticles] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('crypto');

    useEffect(() => {
        const fetchNews = async () => {
            const encodedKeyword = encodeURIComponent(searchKeyword.trim() || 'crypto');
            const response = await fetch(`http://localhost:3333/api/news?keyword=${encodedKeyword}`);
            const data = await response.json();
            setArticles(data.articles.slice(0, 3));  // Limit to 3 articles
        };
        fetchNews();
    }, [searchKeyword]);

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchNews();
    };

    return (
        <div style={{ margin: '20px' }}>
            <h2>News</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                <form onSubmit={handleSearchSubmit}>
                    <label>Search:</label>
                    <input type="text" value={searchKeyword} onChange={handleSearchChange} placeholder="Search news..." />
        
                </form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                {articles.map((article, index) => (
                    
                    <Link key={index} to={{
                        pathname: "/news-detail"}}
                        state={ article }
                     style={{ textDecoration: 'none', color: 'inherit', width: '30%' }}>
                        <div style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)', margin: '10px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                            <img src={article.urlToImage} alt={article.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <div>
                                <h4>{article.title}</h4>
                                <p>{article.content ? article.content.substring(0, 200) + '...' : 'No content available'}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AllNews;
