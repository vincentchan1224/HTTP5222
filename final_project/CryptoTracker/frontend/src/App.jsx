import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AllNews from './components/AllNews';
import NewsDetail from './components/NewsDetail'; // Ensure this component exists
import Header from "./components/Header";
import MarketsOverview from './components/MarketsOverview';
import NewsList from './components/NewsList';
import AllCrypto from './components/AllCrypto';

function App() {
  return (
    <Router>
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={<><MarketsOverview /><AllNews /></>} />
          <Route path="/news-detail" element={<NewsDetail />} />
          <Route path="/news-list" element={<NewsList />} />
          <Route path="/market" element={<AllCrypto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
