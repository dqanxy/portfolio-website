import React from 'react';
import PropTypes from 'prop-types';

const SideImage = ({ src, useLeft = true, alt = 'Image', children }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', textAlign: useLeft ? 'left' : 'right' }}>
            {useLeft && (
                <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                    <img 
                        src={src} 
                        alt={alt} 
                        style={{ 
                            maxWidth: '150px', 
                            maxHeight: '150px',
                            boxShadow: '6px 10px 10px rgba(0, 0, 0, 0.3)', 
                            marginLeft: '60px',
                        }} 
                    />
                </div>
            )}
            <div style={{ flex: '3', marginLeft: useLeft ? '20px' : '200px', marginRight: useLeft ? '0' : '50px' }}>
                {children}
            </div>
            {!useLeft && (
                <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                    <img 
                        src={src} 
                        alt={alt} 
                        style={{ 
                            maxWidth: '150px', 
                            maxHeight: '150px',
                            boxShadow: '6px 10px 10px rgba(0, 0, 0, 0.3)',
                            marginRight: '60px'
                        }} 
                    />
                </div>
            )}
        </div>
    );
};

SideImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
};

export default SideImage;