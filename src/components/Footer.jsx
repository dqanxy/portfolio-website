import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {
    // Life savers! 
    // https://kilianvalkhof.com/2017/design/sloped-edges-with-consistent-angle-in-css/
    // https://codepen.io/JanickFischr/pen/BYvVqP
    return (
        <footer className="bg-gray-100 text-white relative fix-height overflow-hidden">
            
            <div className={'background-container -left-4'}>
                <div className={'animated-background'}>
                    <div className="reshape-foreground">
                        <div className="container mx-auto py-8 px-4 text-center">
                            <h2 className="text-xl font-bold">Daniel Tian</h2>
                            <p className="mt-2">
                                Email: <a href="mailto:dqanxy6706@gmail.com" className="text-blue-400 hover:underline">dqanxy6706@gmail.com</a>
                            </p>
                            <p className="mt-1">
                                Github: <a href="https://github.com/dqanxy" className="text-blue-400 hover:underline">github.com/dqanxy</a>
                            </p>
                            <p className="mt-1">
                                LinkedIn: <a href="https://www.linkedin.com/in/tian-daniel/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/tian-daniel/</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;