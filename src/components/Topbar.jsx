import React from 'react';

const Topbar = () => {
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    return (
        <div className="bg-gray-800 text-white">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className="text-2xl font-bold">
                    <h1>My Portfolio</h1>
                </div>
                <div className="space-x-6">
                    <a href="#portfolio" className="hover:text-gray-400">Portfolio</a>
                    <a href="#about" className="hover:text-gray-400">About Me</a>
                    <button onClick={scrollToBottom} className="hover:text-gray-400">Contact</button>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
