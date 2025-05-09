import React from 'react';
import {globalState} from './StarCanvas'; // Import the global state
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StarLink = ({text, value}) => {
    const handleClick = () => {
        for (let i = 0; i < globalState.objects.length; i++) {
            if (globalState.objects[i].name === value) {
                for (let j = 0; j < globalState.objects.length; j++) {
                    if (globalState.objects[j].name === globalState.focused) {
                        globalState.objects[j].targetting = false;
                    }
                }
                globalState.objects[i].select();
                break;
            }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
            <a href="#" onClick={(e) => { e.preventDefault(); handleClick(); }}
           className="bg-gray-800 text-white hover:bg-gray-400 rounded-md px-2 py-1">
                {text} <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
            </a>
        
    );
};

export default StarLink;