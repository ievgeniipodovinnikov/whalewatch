import React, { useEffect, useState } from "react";
import { Input } from "./components/ui/input";

const FALLBACK_DATA = [
    { symbol: "ETH", amount: 12.5, from: { owner: "0xAbC123..." }, to: { owner: "0xDeF456..." }, hash: "0xabcdef1234567890" },
    { symbol: "USDT", amount: 2500000, from: { owner: "0x123AbC..." }, to: { owner: "0x456DeF..." }, hash: "0x123456abcdef7890" },
    { symbol: "BTC", amount: 1.2, from: { owner: "1A1zP1..." }, to: { owner: "1B2zQ2..." }, hash: "0xbeefcafe12345678" }
];

const App = () => {
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // сюда реальный fetch/GraphQL запрос
                const res = await fetch("/api/whales"); // прокси или ваш endpoint
                if (!res.ok) throw new Error(`Status ${res.status}`);
                const json = await res.json();
                const mapped = json.transactions.map(tx => ({
                    symbol: tx.symbol,
                    amount: tx.amount,
                    from: { owner: tx.from },
                    to:   { owner: tx.to },
                    hash: tx.hash
                }));
                setData(mapped);
            } catch (err) {
                console.warn("Fetch failed, using fallback data:", err);
                setData(FALLBACK_DATA);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const id = setInterval(fetchData, 30000);
        return () => clearInterval(id);
    }, []);

    const shown = filter
        ? data.filter(tx =>
            tx.symbol.toLowerCase().includes(filter.toLowerCase()) ||
            tx.from.owner.toLowerCase().includes(filter.toLowerCase()) ||
            tx.to.owner.toLowerCase().includes(filter.toLowerCase())
        )
        : data;

    return (
        <div className="app-container">
            {/* HEADER */}
            <header className="text-center py-16 px-4">
                <h1 className="text-5xl font-bold text-white mb-4">WhaleWatch.live</h1>
                <p className="text-xl text-gray-300 mb-8">Real-time crypto whale tracking</p>
                <div className="max-w-md mx-auto mb-8">
                    <Input
                        placeholder="Filter by token, from or to"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </header>

            {/* LIST AS LINES */}
            <section className="px-4 max-w-3xl mx-auto space-y-3">
                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : (
                    shown.map((tx, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-gray-700 pb-2 text-white">
                            <div>
                                <span className="font-semibold">{tx.symbol}</span> — {tx.amount} from {tx.from.owner} to {tx.to.owner}
                            </div>
                            <a
                                href={`https://etherscan.io/tx/${tx.hash}`}
                                className="text-blue-400 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >View</a>
                        </div>
                    ))
                )}
            </section>

            {/* FOOTER */}
            <footer className="text-center text-gray-400 text-sm mt-16 mb-8">
                <p className="italic mb-4">
                    Data refreshes every 30 seconds. Reach out on Twitter for feedback or inquiries.
                </p>
                <a
                    href="https://x.com/stackleadpro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white hover:text-blue-400"
                >
                    Follow us on Twitter
                </a>
            </footer>
        </div>
    );
};

export default App;
