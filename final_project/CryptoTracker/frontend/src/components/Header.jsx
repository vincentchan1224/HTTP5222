import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; 

function Header() {
    return (
        <header className="header">
            <h1>Cryptocurrency</h1>
            <nav>
                <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
                <Link to="/market" style={{ textDecoration: 'none' }}>Market</Link>
                <Link to="/news-list" style={{ textDecoration: 'none' }}>News</Link>
            </nav>
        </header>
    );
}

export default Header;