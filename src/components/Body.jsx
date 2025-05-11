import React, { useEffect, useState } from "react";
import StarLink from "./StarLink";
import BodyImage from "./BodyImage";
import SideImage from "./SideImage";
import { globalState } from "./StarCanvas"; // Import the global state

const renderCustomHtmlText = (textContent) => {
    // First replace HTML entities


    textContent = textContent.replace(/<br>/g, '\n')
    textContent = textContent.replace(/<p>/g, '\n')
    textContent = textContent.replace(/<p\/>/g, '')
  
    // Parse with a regex for all relevant tags
    const regex = /<em>(.*?)<\/em>|<strong>(.*?)<\/strong>|<a .* href='([^']+)'[^>]*>(.*?)<\/a>|<StarLink value='([^']+)' text='([^']+)'\/>|<img src='([^']+)' caption='([^']*)'\/>|<SideImage src='([^']+)' useLeft='([^']*)'>(.*?)<\/SideImage>|<([^>]+)>|([^<]+)/gs;

    const elements = [];
    let match;
    while ((match = regex.exec(textContent)) !== null) {
        const [fullMatch, emText, strongText, url, linkText, starLinkValue, starLinkText, imgSrc, imgCaption, sideImageSrc, sideImageLeft, sideImageChildren, otherTag, normalText] = match;
        if (emText) {
            elements.push(<em key={elements.length}>{renderCustomHtmlText(emText)}</em>);
        } else if (strongText) {
            elements.push(<strong key={elements.length} style={{"display":"inline"}}>{renderCustomHtmlText(strongText)}</strong>);
        } else if (url && linkText) {
            elements.push(<a key={elements.length} href={url}>{linkText}</a>);
        } else if (starLinkValue && starLinkText) {
            elements.push(<StarLink key={elements.length} value={starLinkValue} text={starLinkText} />);
        } else if (imgSrc) {
            elements.push(<BodyImage key={elements.length} caption={imgCaption !== '' ? imgCaption : null} src={imgSrc} alt="Image" />);
        } else if (sideImageSrc && sideImageChildren) {
            elements.push(<SideImage key={elements.length} useLeft={sideImageLeft === 'true'} src={sideImageSrc}>{renderCustomHtmlText(sideImageChildren)}</SideImage>);
        } else if (normalText) {
            elements.push(<span key={elements.length}>{normalText}</span>);
        }
        // Other tags will effectively be ignored
    }


    return <span>{elements}</span>;
};


const Body = ({isVisible, headerText, subtitleText, titleText, bodyText, children }) => {
    const [headerVisible, setHeaderVisible] = useState(isVisible);
    const [starNavVisible, setStarNavVisible] = useState(isVisible);
    const [bodyVisible, setBodyVisible] = useState(isVisible);

    useEffect(() => {
        setHeaderVisible(isVisible);
        setStarNavVisible(isVisible);
        setBodyVisible(isVisible);
    }, [bodyText]);

    useEffect(() => {
        const handleScroll = () => {
            const headerElement = document.getElementById("header");
            const starNavElement = document.getElementById("starNav");
            const bodyElement = document.getElementById("body");

            if (headerElement) {
                const headerPosition = headerElement.getBoundingClientRect().top;
                if (headerPosition < window.innerHeight) {
                    setHeaderVisible(true);
                }
            }

            if (starNavElement) {
                const starNavPosition = starNavElement.getBoundingClientRect().top;
                if (starNavPosition < window.innerHeight) {
                    setStarNavVisible(true);
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
            <div id="starNav"
                className={`${
                    starNavVisible
                        ? "transition-all duration-700 ease-in opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                } text-center py-0`}
            >
                {children}
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
                    <p className="text-gray-600" style={{"whiteSpace":"pre-wrap"}}>
                        {renderCustomHtmlText(bodyText)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Body;