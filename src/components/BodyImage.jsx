import React from 'react';
import PropTypes from 'prop-types';

const BodyImage = ({ src, caption = null, alt = 'Image' }) => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img 
                    src={src} 
                    alt={alt} 
                    style={{ 
                        maxWidth: '50%', 
                        maxHeight: '300px',
                        margin: caption ? '5px 0' : '20px 0',
                        boxShadow: '6px 10px 10px rgba(0, 0, 0, 0.3)' 
                    }} 
                />
            </div>
            {caption && <p style={{ textAlign: 'center', marginBottom: '10px' }}>{caption}</p>}
        </div>
        
    );
};

BodyImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
};

export default BodyImage;