import React, {useRef, useEffect} from 'react';
import { globalState } from './StarCanvas'; // Import the global state
import PropTypes from 'prop-types';

const ClickableHandler = ({ style, children, onClick }) => {

    
    const canvasRef = useRef(null);

    const [clickable, setClickable] = React.useState(false);

    useEffect(() => {
    
        const canvas = canvasRef.current
        
        
        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            globalState.mouse_x = event.clientX - rect.left;
            globalState.mouse_y = event.clientY - rect.top;

            setClickable(globalState.clickable);
        };

        const handleMouseEnter = () => {
            canvas.addEventListener('mousemove', handleMouseMove);
        };

        const handleMouseLeave = () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            globalState.mouse_x = 0;
            globalState.mouse_y = 0;
        };

        canvas.addEventListener('mouseenter', handleMouseEnter);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
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