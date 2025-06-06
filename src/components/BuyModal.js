import React from "react";

const BuyModal = ({ domain, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
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
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Telegram
                    </a>
                    <a
                        href="https://wa.me/40765263983"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                        WhatsApp
                    </a>
                    <a
                        href="#"
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                    >
                        Buy on Namecheap
                    </a>
                    <button
                        className="text-white bg-red-600 px-4 py-2 rounded-lg"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                {/* Добавление ссылки на Stacklead.pro */}
                <div className="mt-4 text-center text-white">
                    <p>By <a href="https://stacklead.pro" className="text-blue-500 underline" target="_blank" rel="noreferrer" >Stacklead.pro</a></p>
                </div>
            </div>
        </div>
    );
};

export default BuyModal;
