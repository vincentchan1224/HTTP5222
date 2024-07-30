import React from 'react';

function MarketsOverviewTable({ data, title }) {
    return (
        <div style={{ width: '30%', overflowX: 'auto' }}>
             <h3 style={{ textAlign: 'left' }}>{title}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((coin) => (
                        <tr key={coin.id}>
                            <td><img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`} alt={coin.name} style={{ width: '20px', height: '20px' }} />  {coin.symbol}</td>
                            <td>{coin.name}</td>
                            <td>${coin.quote.USD.price.toFixed(2)}</td>
                            <td>{coin.quote.USD.percent_change_24h.toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MarketsOverviewTable;
