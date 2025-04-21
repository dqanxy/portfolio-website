import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {
    const [state, setState] = useState({
        animationClass: 'animated-background'
    });
    // Life savers! 
    // https://kilianvalkhof.com/2017/design/sloped-edges-with-consistent-angle-in-css/
    // https://codepen.io/JanickFischr/pen/BYvVqP
    return (
        <footer className="bg-gray-800 text-white relative fix-height overflow-hidden">
            
            <div className={'background-container -left-4'}>
                <div className={state.animationClass}>
                    <div className="reshape-foreground">
                        <div className="container mx-auto py-8 px-4 text-center">
                            <h2 className="text-xl font-bold">Daniel Tian</h2>
                            <p className="mt-2">
                                Email: <a href="mailto:danieltian@example.com" className="text-blue-400 hover:underline">danieltian@example.com</a>
                            </p>
                            <p className="mt-1">
                                Phone: <a href="tel:+1234567890" className="text-blue-400 hover:underline">+1 (234) 567-890</a>
                            </p>
                            <p className="mt-1">
                                LinkedIn: <a href="https://linkedin.com/in/danieltian" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/danieltian</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;