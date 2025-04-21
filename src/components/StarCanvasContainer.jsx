import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import StarCanvas from './StarCanvas';
import './StarCanvasContainer.css'; // Import your CSS file for styles
import AnimatedStarBackground from './AnimatedStarBackground';
import Body from './Body';

const StarCanvasContainer = () => {
    const canvasRef = useRef(null);
    const [height, setHeight] = useState(200); // Initial height of the canvas
    const [isVisible, setIsVisible] = useState(false); // State to control visibility of the body

    const [star, setStar] = useState({
        headerText: "Welcome to My Portfolio!",
        subtitleText: "Explore with the map above, or read below!",
        titleText: "Hey there!",
        bodyText: "Todo!",
    }); // State to hold the star object

    const toggleHeight = () => {
        setHeight((prevHeight) => (prevHeight === 200 ? 400 : 200)); // Toggle between 200px and 400px
    };

    const changeStar = (newStar) => {
        setStar(newStar); // Update the star state with the new star object
        setIsVisible(false);
    }


    return (
        <div>
            <div className="relative overflow-hidden">
                <AnimatedStarBackground/>
                <div style={{
                        width: '100%',
                        height: `${height}px`,
                        transition: 'height 0.5s ease', // Smooth height transition
                        border: '1px solid black',
                    }}>
                                
                    <StarCanvas callback={setStar.bind(this)}/>
                </div>

            </div>
            <div className="absolute z-50 inset-x-0 flex justify-center">
                <div className="w-full h-px bg-gray-300"></div>
                <button
                    onClick={toggleHeight}
                    className="absolute -top-4 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md"
                >
                    <FontAwesomeIcon icon={faArrowsUpDown} />
                </button>
            </div>
            <Body isVisible={isVisible} headerText={star.headerText} subtitleText={star.subtitleText} titleText={star.titleText} bodyText={star.bodyText} />
        </div>
        
    );
};

export default StarCanvasContainer;