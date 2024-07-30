import React from 'react';

function TopTenCrypto({ data }) {
    // Sort the data by market cap and then slice the array to get only the first ten
    const sortedData = [...data].sort((a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap).slice(0, 10);

    return (
        <div style={{ marginTop: '20px', width: '100%' }}>
            <h3>Top 10 Cryptocurrencies</h3>
            <table style={{ width: '100%', textAlign: 'center' }}>
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
                    {sortedData.map((coin) => (
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

export default TopTenCrypto;
