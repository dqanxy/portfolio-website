import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';

let frameCount = 0; // Global variable to keep track of frame count

const StarCanvas = () => {
    const canvasRef = useRef(null);

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
      }
      
      useEffect(() => {
        
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let animationFrameId
        
        //Our draw came here
        const render = () => {
          frameCount++
          draw(context, frameCount)
          animationFrameId = window.requestAnimationFrame(render)
        }
        render()
        
        return () => {
          window.cancelAnimationFrame(animationFrameId)
        }
      }, [draw])

    return (
        <div>
            <canvas
                ref={canvasRef}
                className='absolute'
            >

            </canvas>
            
        </div>
        
    );
};

export default StarCanvas;