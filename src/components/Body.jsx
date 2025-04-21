import React, { useEffect, useState } from "react";

const Body = ({isVisible, headerText, subtitleText, titleText, bodyText }) => {
    const [headerVisible, setHeaderVisible] = useState(isVisible);
    const [bodyVisible, setBodyVisible] = useState(isVisible);

    useEffect(() => {
        setHeaderVisible(isVisible);
        setBodyVisible(isVisible);
    }, [bodyText]);

    useEffect(() => {
        const handleScroll = () => {
            const headerElement = document.getElementById("header");
            const bodyElement = document.getElementById("body");

            if (headerElement) {
                const headerPosition = headerElement.getBoundingClientRect().top;
                if (headerPosition < window.innerHeight) {
                    setHeaderVisible(true);
                }
            }

            if (bodyElement) {
                const bodyPosition = bodyElement.getBoundingClientRect().top;
                if (bodyPosition < window.innerHeight) {
                    setBodyVisible(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div
                id="header"
                className={`${
                    headerVisible
                        ? "transition-all duration-700 ease-in opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                } text-center py-10`}
            >
                <h1 className="text-4xl font-bold text-gray-800">{headerText}</h1>
                <p className="text-lg text-gray-600 mt-2">{subtitleText}</p>
            </div>
            <div
                id="body"
                className={`${
                    bodyVisible
                        ? "transition-all duration-700 ease-in opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                } mt-10 px-6`}
            >
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{titleText}</h2>
                    <p className="text-gray-600">{bodyText}</p>
                </div>
            </div>
        </div>
    );
};

export default Body;