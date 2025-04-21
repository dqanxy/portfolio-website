import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import ClickableHandler from './ClickableHandler';

let frameCount = 0; // Global variable to keep track of frame count

export const globalState = {
    frameCount: 0,
    camera_x: 0,
    camera_y: 0,
    mouse_x: 0,
    mouse_y: 0,
    canvas_width: 100,
    canvas_height: 100,

    clickable: false
};

const StarCanvas = () => {
    const canvasRef = useRef(null);

    const draw = (ctx, globalState) => {
        // Make it visually fill the positioned parent
        ctx.canvas.style.width ='100%';
        ctx.canvas.style.height='100%';
        // ...then set the internal size to match
        ctx.canvas.width  = ctx.canvas.offsetWidth;
        ctx.canvas.height = ctx.canvas.offsetHeight;
        globalState.canvas_width = ctx.canvas.width;
        globalState.canvas_height = ctx.canvas.height;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';

        ctx.fillText('Loading' + (globalState.frameCount % 60 < 20 ? '.' : (globalState.frameCount % 60 < 40 ? '..' : '...')), 10, 20);
        ctx.fillText('Mouse X: ' + (globalState.mouse_x).toString(), 10, 40);
        ctx.fillText('Mouse Y: ' + (globalState.mouse_y).toString(), 10, 60);
        ctx.fillText('Canvas X: ' + (globalState.canvas_width).toString(), 10, 80);
        ctx.fillText('Canvas Y: ' + (globalState.canvas_height).toString(), 10, 100);
        ctx.fillText('Camera X: ' + (globalState.camera_x).toString(), 10, 120);
        ctx.fillText('Camera Y: ' + (globalState.camera_y).toString(), 10, 140);
      }
      
      useEffect(() => {
        
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let animationFrameId
        
        //Our draw came here
        const render = () => {
          globalState.frameCount++
          globalState.clickable = false

          draw(context, globalState)
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
                style={{
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0
                }}
            >
            </canvas>
            <ClickableHandler style={{position: 'absolute', width: '100%', height: '100%'}}/>
            
        </div>
        
    );
};

export default StarCanvas;