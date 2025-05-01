import React, { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import DomainCard from "./components/DomainCard";
import axios from 'axios';

const TOKENS = [
    "ETH", "USDT", "USDC", "DAI", "SHIB", "LINK", "UNI", "AAVE",
    "SUSHI", "MKR", "WBTC", "COMP", "YFI", "BAT", "TUSD"
];

const accessToken = process.env.BIT_QUERY_API_TOKEN;

const getQuery = (symbol) => {
    return `
    query {
      ethereum: EVM(network: eth) {
        Transfers(
          limit: { count: 100 },
          orderBy: { descending: Block_Time },
          where: {
            Transfer: {
              Currency: {
                Symbol: { in: ["${symbol}"] }
              }
            }
          }
        ) {
          Block {
            Time
          }
          Transfer {
            Amount
            Currency {
              Symbol
            }
            Sender
            Receiver
          }
          Transaction {
            Hash
          }
        }
      }
    }
  `;
};

const FALLBACK_DATA = [
    {
        symbol: 'ETH',
        amount: 10.5,
        from: { owner: '0x123abc...' },
        to: { owner: '0x987xyz...' },
        hash: '0xabcdef1234567890...',
    },
    {
        symbol: 'USDT',
        amount: 5000,
        from: { owner: '0xabcdef123...' },
        to: { owner: '0xghijklmno...' },
        hash: '0x12345abcdef67890...',
    },
    {
        symbol: 'BTC',
        amount: 0.5,
        from: { owner: '0xdeadbeef123...' },
        to: { owner: '0xa1b2c3d4e5...' },
        hash: '0x1234567890abcdef...',
    }
];

const getTransactionData = async (token) => {
    try {
        const query = getQuery(token); // Получаем запрос в зависимости от выбранного токена
        const response = await axios.post(
            'https://streaming.bitquery.io/graphql',
            { query },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
            }
        );

        const data = response.data.data.ethereum.Transfers.map((tx) => ({
            symbol: tx.Transfer.Currency.Symbol,
            amount: parseFloat(tx.Transfer.Amount),
            from: { owner: tx.Transfer.Sender },
            to: { owner: tx.Transfer.Receiver },
            hash: tx.Transaction.Hash,
            time: new Date(tx.Block.Time).toLocaleString(),
        }));

        // Сортируем по сумме (от большего к меньшему)
        data.sort((a, b) => b.amount - a.amount);

        return data;
    } catch (error) {
        console.error('Error fetching transaction data', error);
        return [];
    }
};

const App = () => {
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedToken, setSelectedToken] = useState("ETH"); // Начальный выбор токена

    useEffect(() => {
        const fetchData = async () => {
            try {
                const realData = await getTransactionData(selectedToken);

                if (realData.length > 0) {
                    setData(realData);
                } else {
                    setData(FALLBACK_DATA);
                }
            } catch (err) {
                setData(FALLBACK_DATA);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const id = setInterval(fetchData, 3600000);
        return () => clearInterval(id);
    }, [selectedToken]); // Запрос будет обновляться при изменении выбранного токена

    const shown = filter
        ? data.filter(tx =>
            tx.symbol.toLowerCase().includes(filter.toLowerCase()) ||
            tx.from.owner.toLowerCase().includes(filter.toLowerCase()) ||
            tx.to.owner.toLowerCase().includes(filter.toLowerCase())
        )
        : data;

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <header className="relative w-full h-[400px] md:h-[500px] overflow-hidden flex">
                <img
                    src="/whale-watch.jpeg"
                    alt="Whale"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-semibold text-white">WhaleWatch.live</h1>
                    <p className="text-lg md:text-xl text-gray-200 mt-4">
                        Real-time crypto whale tracking
                    </p>
                    <div className="w-full max-w-md mt-6">
                        <Input
                            placeholder="Filter by sender or receiver address"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {TOKENS.map((token) => (
                            <button
                                key={token}
                                onClick={() => setSelectedToken(token)}
                                className={`w-full px-4 py-2 rounded-md text-sm ${
                                    selectedToken === token
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-300 text-gray-800'
                                } hover:bg-blue-500 transition-all`}>
                                {token}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-6">
                    <DomainCard />
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4">
                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : (
                    <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
                        <table className="min-w-full text-left border-collapse table-auto">
                            <thead className="bg-gray-100 text-sm uppercase text-gray-500">
                            <tr>
                                <th className="py-3 px-6 text-left">Token</th>
                                <th className="py-3 px-6 text-left">Amount</th>
                                <th className="py-3 px-6 text-left">From</th>
                                <th className="py-3 px-6 text-left">To</th>
                                <th className="py-3 px-6 text-left">Hash</th>
                            </tr>
                            </thead>
                            <tbody>
                            {shown.length > 0 ? (
                                shown.map((tx, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition">
                                        <td className="py-3 px-6 font-medium">{tx.symbol}</td>
                                        <td className="py-3 px-6">{tx.amount}</td>
                                        <td className="py-3 px-6 text-sm text-gray-700">
                                            <div className="truncate" style={{ width: '150px' }}>
                                                {tx.from.owner}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-sm text-gray-700">
                                            <div className="truncate" style={{ width: '150px' }}>
                                                {tx.to.owner}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-blue-500">
                                            <a
                                                href={`https://etherscan.io/tx/${tx.hash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline"
                                            >
                                                View
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            <footer className="text-center bg-gray-800 text-white text-sm mt-20 px-4 py-6">
                <p className="italic mb-4">Data refreshes every 60 minutes.</p>
                <a
                    href="https://x.com/whalewatchlive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 underline"
                >
                    Follow @whalewatchlive
                </a>
            </footer>
        </div>
    );
};

export default App;
