import React, { useRef, useState, useEffect } from 'react';
import ClickableHandler from './ClickableHandler';
import Star from './Star';
import StarLine from './StarLine';

let frameCount = 0; // Global variable to keep track of frame count

//Global state shared by all components
export const globalState = {
    frameCount: 0,
    camera_x: 0,
    camera_y: 0,
    mouse_x: 0,
    mouse_y: 0,
    canvas_width: 100,
    canvas_height: 100,

    clickable: false,

    mouse_clicked: false,
    mouse_down: false,
    mouse_release: false,

    mouse_down_x: 0,
    mouse_down_y: 0,

    focused: "",

    objects: []
};

const StarCanvas = ({callback}) => {
    const canvasRef = useRef(null);
    globalState.callback = callback

    const queryParams = new URLSearchParams(window.location.search);
    const selectedParam = queryParams.get('selected'); // Replace 'selected' with your desired query parameter key
    console.log('Selected Query Parameter:', selectedParam);

    if(globalState.objects.length === 0) {

        globalState.objects = [new Star(0,0,2, "main", "Hello World!"), new Star(-100,60,1, "test1", "Other Star!"), new Star(90,-15,1, "test2", "Another Star!")];
        for (let i = 0; i < globalState.objects.length; i++) {
            if(globalState.objects[i].name == selectedParam) {
                globalState.objects[i].select();
                break;
            }
        }
        globalState.objects = [new StarLine(0, 0, -100, 60), new StarLine(0, 0, 90, -15),
            ...globalState.objects
        ]


    }

    useEffect(() => {
        const handleMouseUp = () => {
            globalState.mouse_clicked = false;
            globalState.mouse_release = true;
        };
        
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
          document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    
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
        ctx.fillText('Mouse Clicked: ' + (globalState.mouse_clicked).toString(), 10, 160);
        ctx.fillText('Mouse Down: ' + (globalState.mouse_down).toString(), 10, 180);



        for (let i = 0; i < globalState.objects.length; i++) {
            globalState.objects[i].render(ctx)
        }
      }
      
      useEffect(() => {
        
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let animationFrameId
        
        //Our draw came here
        const render = () => {
          globalState.frameCount++
          globalState.clickable = false

          for (let i = 0; i < globalState.objects.length; i++) {
            globalState.objects[i].update()
          }

          draw(context, globalState)
          globalState.mouse_down = false
          globalState.mouse_release = false
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