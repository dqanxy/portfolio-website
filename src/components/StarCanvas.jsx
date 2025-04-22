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

    loading: true,

    objects: []
};

const StarCanvas = ({callback}) => {
    const canvasRef = useRef(null);
    globalState.callback = callback

    const queryParams = new URLSearchParams(window.location.search);
    const selectedParam = queryParams.get('selected'); // Replace 'selected' with your desired query parameter key
    console.log('Selected Query Parameter:', selectedParam);

    if(globalState.objects.length === 0) {

        globalState.objects = [new Star(0,0,2, "main", 
            `<em>Hello World!</em> <img src='https://dqanxy-umich-us2.s3.us-east-2.amazonaws.com/portfolio/me.jpg' caption='This is me!'/> Check out this: <StarLink value='test1' text='Test 1'/>
WIP as of 4/22/2025`,
            "Daniel Tian's Portfolio",
        )];

        if(selectedParam == null) {
            globalState.objects[0].select();
        }


        fetch('https://dqanxy-umich-us2.s3.us-east-2.amazonaws.com/graph.json')
            .then(response => response.json())
            .then(data => {
            let map = {}
            let lines = []
            map["main"] = [0, 0]
            data.stars.forEach(star => {
                if(!star.x || !star.y) {
                console.error("Star x or y is undefined:", star);
                return;
                }
                map[star.name] = [star.x, star.y]
                if(!star.scale || star.scale < 0 || star.name == null || star.name == "" 
                || star.bodyText == null || star.bodyText == "" || star.headerText == null || star.headerText == "" 
                || star.subtitleText == null || star.subtitleText == "" || star.titleText == null || star.titleText == "" 
                || star.tooltip == null || star.tooltip == "") {
                console.error("Star properties are invalid:", star);
                return;
                }
                globalState.objects.push(new Star(star.x, star.y, star.scale, star.name, star.bodyText, star.headerText, star.subtitleText, star.titleText, star.tooltip));
            });
            data.edges.forEach(edge => {
                if(!map[edge.source] || !map[edge.target]) {
                console.error("Edge source or target not found in map:", edge.source, edge.target);
                return;
                }
                lines.push(new StarLine(map[edge.source][0], map[edge.source][1], map[edge.target][0], map[edge.target][1]));
                console.log(edge.source, edge.target, map[edge.source][0], map[edge.source][1], map[edge.target][0], map[edge.target][1])
            });
            globalState.objects = [...lines, ...globalState.objects]
            globalState.loading = false;

            
            for (let i = 0; i < globalState.objects.length; i++) {
                if(globalState.objects[i].name == selectedParam) {
                    globalState.objects[i].select();
                    break;
                }
            }
        })
            .catch(error => console.error('Error loading graph.json:', error));



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

        if (globalState.loading) ctx.fillText('Loading' + (globalState.frameCount % 60 < 20 ? '.' : (globalState.frameCount % 60 < 40 ? '..' : '...')), 10, 20);
        // ctx.fillText('Mouse X: ' + (globalState.mouse_x).toString(), 10, 40);
        // ctx.fillText('Mouse Y: ' + (globalState.mouse_y).toString(), 10, 60);
        // ctx.fillText('Canvas X: ' + (globalState.canvas_width).toString(), 10, 80);
        // ctx.fillText('Canvas Y: ' + (globalState.canvas_height).toString(), 10, 100);
        // ctx.fillText('Camera X: ' + (globalState.camera_x).toString(), 10, 120);
        // ctx.fillText('Camera Y: ' + (globalState.camera_y).toString(), 10, 140);
        // ctx.fillText('Mouse Clicked: ' + (globalState.mouse_clicked).toString(), 10, 160);
        // ctx.fillText('Mouse Down: ' + (globalState.mouse_down).toString(), 10, 180);



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