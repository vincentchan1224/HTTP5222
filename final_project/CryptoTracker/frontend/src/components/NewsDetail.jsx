import React from 'react';
import { useLocation } from 'react-router-dom';

function NewsDetail() {
    const location = useLocation();
    const article = location.state ? location.state : null;
    console.log(article)
    if (!article) {
        return <div>No article found. Please navigate from the articles list to view details.</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <img src={article.urlToImage || 'default-placeholder.png'} alt={article.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <p>sources: {article.url}</p>
        </div>
    );
}

export default NewsDetail;
