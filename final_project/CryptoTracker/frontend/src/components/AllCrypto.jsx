import React, { useState, useEffect } from 'react';

function AllCrypto() {
    const [cryptoData, setCryptoData] = useState([]);

    // Function to fetch data
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:3333/api/crypto`; // Ensure this URL is correct for your backend API
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data && data.data) {
                    // Sort data by market cap and store it
                    const sortedData = data.data.sort((a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap);
                    setCryptoData(sortedData);
                } else {
                    throw new Error("Failed to fetch or process data");
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ marginTop: '20px', width: '100%' }}>
            <h3>All Cryptocurrencies</h3>
            <table style={{ width: '100%', textAlign: 'center', color: 'white' }}>
                <thead>
                    <tr>
                        <th>Icon</th>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Change</th>
                        <th>Change%</th>
                        <th>Volume</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoData.map((coin) => (
                        <tr key={coin.id}>
                            <td><img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`} alt={coin.name} style={{ width: '20px', height: '20px' }} /></td>
                            <td>{coin.symbol}</td>
                            <td>{coin.name}</td>
                            <td>${coin.quote.USD.price.toFixed(2)}</td>
                            <td>${(coin.quote.USD.percent_change_24h * coin.quote.USD.price * 0.01).toFixed(2)}</td>
                            <td>{coin.quote.USD.percent_change_24h.toFixed(2)}%</td>
                            <td>${coin.quote.USD.volume_24h.toLocaleString()}</td>
                            <td>${coin.quote.USD.market_cap.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllCrypto;
