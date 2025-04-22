import React from 'react';
import { globalState } from './StarCanvas';

const Topbar = () => {
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    
    const handleClick = () => {
        for (let i = 0; i < globalState.objects.length; i++) {
            if(globalState.objects[i].name === "main") {
                for (let j = 0; j < globalState.objects.length; j++) {
                    if(globalState.objects[j].name === globalState.focused) {
                        globalState.objects[j].targetting = false;
                    }
                }
                globalState.objects[i].select();
                break;
            }
        }
    };

    return (
        <div className="bg-gray-800 text-white">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className="text-2xl font-bold">
                    <h1>Daniel Tian</h1>
                </div>
                <div className="space-x-6">
                    <a href="#" className="hover:text-gray-400" onClick={(e) => { e.preventDefault(); handleClick(); }}>Portfolio</a>
                    <a href="#about" className="hover:text-gray-400">About Me</a>
                    <button onClick={scrollToBottom} className="hover:text-gray-400">Contact</button>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
