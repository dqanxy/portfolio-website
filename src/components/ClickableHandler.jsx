import React, {useRef, useEffect} from 'react';
import { globalState } from './StarCanvas'; // Import the global state
import PropTypes from 'prop-types';

const ClickableHandler = ({ style, children, onClick }) => {

    
    const canvasRef = useRef(null);

    const [clickable, setClickable] = React.useState(false);

    useEffect(() => {
    
        const canvas = canvasRef.current
        
        
        const handleMouseMove = (event) => {
            event.preventDefault();
            const rect = canvas.getBoundingClientRect();
            globalState.mouse_x = event.clientX - rect.left;
            globalState.mouse_y = event.clientY - rect.top;

            if(globalState.mouse_clicked) {
                globalState.camera_x = globalState.previous_camera_x + (globalState.mouse_down_x - globalState.mouse_x);
                globalState.camera_y = globalState.previous_camera_y + (globalState.mouse_down_y - globalState.mouse_y);
            }

            setClickable(globalState.clickable);
        };

        const handleMouseEnter = (event) => {
            
            event.preventDefault();
        };

        const handleMouseLeave = () => {
            globalState.mouse_x = 0;
            globalState.mouse_y = 0;
        };

        const handleMouseDown = (event) => {
            
            event.preventDefault();
            globalState.mouse_clicked = true;
            globalState.mouse_down = true;

            globalState.mouse_down_x = globalState.mouse_x;
            globalState.mouse_down_y = globalState.mouse_y;

            globalState.previous_camera_x = globalState.camera_x;
            globalState.previous_camera_y = globalState.camera_y;
        };

        

        canvas.addEventListener('mousemove', handleMouseMove);

        canvas.addEventListener('mouseenter', handleMouseEnter);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        
        canvas.addEventListener('mousedown', handleMouseDown);
        
        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseenter', handleMouseEnter);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('mousemove', handleMouseMove);
        }
    }, [])
    

    return <div ref={canvasRef} style={{ ...style, cursor: clickable ? 'pointer' : 'default' }} onClick={onClick}>{children}</div>;
};

ClickableHandler.propTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
    onClick: PropTypes.func,
};

export default ClickableHandler;