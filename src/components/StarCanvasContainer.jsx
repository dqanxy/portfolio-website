import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import StarCanvas from './StarCanvas';
import './StarCanvasContainer.css'; // Import your CSS file for styles
import AnimatedStarBackground from './AnimatedStarBackground';

const StarCanvasContainer = () => {
    const canvasRef = useRef(null);
    const [height, setHeight] = useState(200); // Initial height of the canvas

    const toggleHeight = () => {
        setHeight((prevHeight) => (prevHeight === 200 ? 400 : 200)); // Toggle between 200px and 400px
    };


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
                                
                    <StarCanvas/>
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
        </div>
        
    );
};

export default StarCanvasContainer;