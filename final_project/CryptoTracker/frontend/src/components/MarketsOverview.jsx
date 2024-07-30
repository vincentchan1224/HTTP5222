import React, { useState, useEffect } from 'react';
import MarketsOverviewTable from "./MarketsOverviewTable";
import AllCrypto from "./AllCrypto";
import TopTenCrypto from './TopTenCrypto';

function MarketsOverview() {
    const [cryptoData, setCryptoData] = useState([]);
    const [hot, setHot] = useState([]);
    const [newListings, setNewListings] = useState([]);
    const [topGainers, setTopGainers] = useState([]);

    const fetchData = async () => {
        const url = `http://localhost:3333/api/crypto`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.data && Array.isArray(data.data)) {
                setCryptoData(data.data);
                sortData(data.data);
            } else {
                throw new Error("Received data is not an array");
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const sortData = (data) => {
        setHot([...data].sort((a, b) => b.quote.USD.volume_24h - a.quote.USD.volume_24h).slice(0, 5));
        setNewListings([...data].sort((a, b) => new Date(b.date_added) - new Date(a.date_added)).slice(0, 5));
        setTopGainers([...data].sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h).slice(0, 5));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="App">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <MarketsOverviewTable data={hot} title="Hot Cryptos (Volume 24h)" />
                <MarketsOverviewTable data={newListings} title="New Listings" />
                <MarketsOverviewTable data={topGainers} title="Top Gainers" />
            </div>
            <TopTenCrypto data={cryptoData} />
        </div>
    );
}

export default MarketsOverview;
