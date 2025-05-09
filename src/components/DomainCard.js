import React, { useState } from "react";

const DomainCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCardClosed, setIsCardClosed] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeCard = () => setIsCardClosed(true);

    const domain = "whalewatch.live";
    const description = "Track cryptocurrency whale movements in real-time. Perfect for an active platform that updates users regularly.";
    const price = 999;

    if (isCardClosed) return null;

    return (
        <div className="fixed top-8 right-8 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 bg-gray-800 bg-opacity-80 text-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">
                This web app is for sale: <span className="text-blue-400 font-mono">{domain}</span>
            </h3>
            <p className="italic text-sm mb-4">
                Includes production-ready startup app and premium domain. <a href="https://x.com/WhaleWatchLive" target="_blank" rel="noopener noreferrer">@TrustChainX profile included.</a>
            </p>

            <p className="mb-4">{description}</p>
            <p className="mb-4 text-lg font-bold">${price}</p>
            <button
                onClick={openModal}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                Buy Now
            </button>

            <button
                onClick={closeCard}
                className="absolute top-2 right-2 text-white text-xl font-bold"
            >
                &times;
            </button>

            <img
                src="/shark.png"
                alt="Shark Icon"
                className="absolute bottom-12 right-8 transform -translate-x-1/2 w-20 h-20 rounded-lg shark-icon"
            />

            {/* Добавление ссылки на Stacklead.pro */}
            <div className="mt-4 text-center text-white">
                <p>By <a href="https://stacklead.pro" className="text-blue-500 underline" target="_blank" rel="noreferrer" >Stacklead.pro</a></p>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="modal-content bg-gray-900 p-6 rounded-xl">
                        <h3 className="text-xl text-center text-white mb-4">
                            Contact to buy {domain}
                        </h3>
                        <p className="text-white mb-4">Select a contact option:</p>
                        <div className="flex flex-col gap-4">
                            <a
                                href="https://t.me/Kaiserkrab"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-blue-600 text-white text-center px-4 py-2 rounded-lg"
                            >
                                Telegram
                            </a>
                            <a
                                href="https://wa.me/40765263983"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-green-500 text-white text-center px-4 py-2 rounded-lg"
                            >
                                WhatsApp
                            </a>
                            <a
                                href="https://www.namecheap.com/domains/registration/results/?domain=whalewatch.live"
                                className="bg-yellow-500 text-white text-center px-4 py-2 rounded-lg"
                            >
                                Buy on Namecheap
                            </a>
                            <button
                                className="text-white bg-red-600 px-4 py-2 rounded-lg"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @media (max-width: 640px) {
                    .fixed {
                        left: 0;
                        right: 0;
                        max-width: none;
                        width: 100%;
                        margin: 0 !important;
                        padding: 16px;
                        border-radius: 0;
                    }

                    .text-2xl {
                        font-size: 20px;
                    }

                    .text-sm {
                        font-size: 12px;
                    }

                    .text-lg {
                        font-size: 16px;
                    }

                    .bg-blue-500 {
                        font-size: 14px;
                    }

                    .shark-icon {
                        display: none;
                    }

                    .top-2 {
                        top: 12px;
                    }

                    .right-2 {
                        right: 12px;
                    }
                }
            `}</style>
        </div>
    );
};

export default DomainCard;
