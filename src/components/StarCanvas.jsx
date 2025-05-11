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
            `My name is Daniel Tian, a software engineer with interests in data and full stack, and how they intersect with AI. I have experience in big data, distributed systems, model serving, cloud computing, and I am broadly interested in <strong>making the technologies to support large-scale AI.</strong> 
            <img src='https://dqanxy-umich-us2.s3.us-east-2.amazonaws.com/portfolio/me.jpg' caption=''/>
I wanted to make a personal website that can act as both a showcase/portfolio for my projects, as well as a blog where I can talk about my experiences. And so, I've combined them! Each star in the map above is an experience, and you can navigate between experiences either by clicking on different stars, or checking out the links below. I've listed all of my projects and main points of interest in this \“main\” star you are currently looking at. 

<em>If you are interested in any particular project, click the associated link below. Otherwise, feel free to explore the starmap above!</em>

<strong>Work Experience</strong>
<SideImage src='https://dqanxy-umich-us2.s3.us-east-2.amazonaws.com/portfolio/tiktok.png' useLeft='true'><strong>TikTok SWE Internship</strong>
Recommendation Infrastructure, Data Lake and Distributed Computing

<StarLink value='tiktok' text='TikTok Internship'/></SideImage>

<SideImage src='https://dqanxy-umich-us2.s3.us-east-2.amazonaws.com/portfolio/kubica_corp_logo.jpg' useLeft='false'><strong>Kubica SWE Internship</strong>
.NET Full Stack Development for PLCs

<StarLink value='kubica' text='Kubica Internship'/></SideImage>

<strong>Projects:</strong>
<SideImage src='https://dqanxy-umich-us2.s3.us-east-2.amazonaws.com/portfolio/joinlu.png' useLeft='true'><strong>JoinLu Platform</strong>
Full Stack Development, Next.js + PostgreSQL

<StarLink value='joinlu' text='JoinLu, ThinkWorkTogether'/></SideImage>

<SideImage src='https://dqanxy-umich-us2.s3.us-east-2.amazonaws.com/portfolio/timber.png' useLeft='false'><strong>Timber Engine</strong>
Web-Based 3D Game Engine, Cloud Development + Embedded Lua + Godot

<StarLink value='timber' text='Timber, the next MIT Scratch'/></SideImage>

<SideImage src='https://dqanxy-umich-us2.s3.us-east-2.amazonaws.com/portfolio/walbridge.png' useLeft='true'><strong>Walbridge Computer Vision</strong>
Identifying Hazards with Computer Vision, Yolo + PyTorch + OpenCV

<StarLink value='walbridge' text='Proximity Warning Alert System'/></SideImage>

<SideImage src='https://dqanxy-umich-us2.s3.us-east-2.amazonaws.com/portfolio/umich.jpg' useLeft='false'><strong>NLP Research Assistant</strong>
Probing Spatial Understanding and Reasoning in LLMs

<StarLink value='nlpresearch' text='NLP Research'/></SideImage>

<strong>Other projects:</strong>
Distributed Multiplayer Server
DS projects
Improving AACs with Gemini
AIDJ - Your AI DJ
Shared Controller
Indie Game Dev projects
This portfolio website!
More to come!
`,
            "Daniel Tian's Portfolio",
        )];

        if(selectedParam == null) {
            globalState.objects[0].select();
        }
        fetch('https://dqanxy-umich-us2.s3.us-east-2.amazonaws.com/graph.json', { cache: 'no-store' })
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
                globalState.objects.push(new Star(star.x, star.y, star.scale, star.name, star.bodyText, star.headerText, star.subtitleText, star.titleText, star.tooltip, star.parent));
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
        document.addEventListener('touchend', handleMouseUp);
        return () => {
          document.removeEventListener('mouseup', handleMouseUp);
          document.removeEventListener('touchend', handleMouseUp);
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