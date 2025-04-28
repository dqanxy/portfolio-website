import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import StarCanvas, { globalState } from './StarCanvas';
import './StarCanvasContainer.css'; // Import your CSS file for styles
import AnimatedStarBackground from './AnimatedStarBackground';
import Body from './Body';
import StarLink from './StarLink';

const StarCanvasContainer = () => {
    const canvasRef = useRef(null);
    const [height, setHeight] = useState(200); // Initial height of the canvas
    const [isVisible, setIsVisible] = useState(false); // State to control visibility of the body

    const [star, setStar] = useState({
        headerText: "Welcome to My Portfolio!",
        subtitleText: "Explore with the map above, or read below!",
        titleText: "Hey there!",
        bodyText: "Todo!",
        tooltip: "Welcome!",
        parent: null,
        parentToolTip: null,
        children: []
    }); // State to hold the star object

    const toggleHeight = () => {
        setHeight((prevHeight) => (prevHeight === 200 ? 400 : 200)); // Toggle between 200px and 400px
    };

    const changeStar = (newStar) => {
        let parentTooltip= null
        if (newStar.parent){
            for (let i = 0; i < globalState.objects.length; i++) {
                if (globalState.objects[i].name === newStar.parent) {
                    parentTooltip = globalState.objects[i].tooltip
                }
            }
        }

        let connecteds = []
        for (let i = 0; i < globalState.objects.length; i++) {
            if (globalState.objects[i].parent === newStar.name) {
                connecteds.push({
                    name: globalState.objects[i].name,
                    tooltip: globalState.objects[i].tooltip,
                })
            }
        }
        setStar({
            bodyText: newStar.bodyText,
            headerText: newStar.headerText,
            subtitleText: newStar.subtitleText,
            titleText: newStar.titleText,
            tooltip: newStar.tooltip,
            children: connecteds,
            parent: newStar.parent,
            parentToolTip: parentTooltip,
        }); // Update the star state with the new star object
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
                                
                    <StarCanvas callback={changeStar}/>
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
            <Body isVisible={isVisible} headerText={star.headerText} subtitleText={star.subtitleText} titleText={star.titleText} bodyText={star.bodyText}>
                <h3 className="text-2xl font-semibold text-gray-800 py-2">You are at: {star.tooltip}</h3>
                {star.parent && <h3 className="text-xl font-semibold text-gray-800">Go back to: {<StarLink value={star.parent} text={star.parentToolTip}></StarLink>}</h3>}
                {star.children.length > 0 && 
                <div className="flex flex-col space-y-2 mt-4">
                    <h3 className="text-xl font-semibold text-gray-800">Connected to:</h3>
                    {star.children.map((child, index) => (
                        <p key={index}><StarLink value={child.name} text={child.tooltip}></StarLink></p>
                    ))}
                </div>}
            </Body>
        </div>
        
    );
};

export default StarCanvasContainer;