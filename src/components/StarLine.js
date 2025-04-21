import { globalState } from './StarCanvas';

class StarLine {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    render(context) {
        let displayX1 = this.x1 - globalState.camera_x + globalState.canvas_width / 2;
        let displayY1 = this.y1 - globalState.camera_y + globalState.canvas_height / 2;
        let displayX2 = this.x2 - globalState.camera_x + globalState.canvas_width / 2;
        let displayY2 = this.y2 - globalState.camera_y + globalState.canvas_height / 2;

        //if both points are outside the canvas, return
        if((displayX1 < 0 - 50 || displayX1 > globalState.canvas_width + 50 || displayY1 < -50 || displayY1 > globalState.canvas_height + 50)
            && (displayX2 < 0 - 50 || displayX2 > globalState.canvas_width + 50 || displayY2 < -50 || displayY2 > globalState.canvas_height + 50)
        ) return;


        let distance = Math.sqrt((displayX2 - displayX1) ** 2 + (displayY2 - displayY1) ** 2);
        let alpha = Math.min(1, Math.max(.1, (300 - distance) / 300)); // Calculate alpha based on distance

        context.beginPath();
        context.moveTo(displayX1, displayY1);
        context.lineTo(displayX2, displayY2);
        context.strokeStyle = `rgba(255, 255, 255, ${alpha})`; // Set the stroke color to white with dynamic transparency
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
        context.lineWidth = 1;
        
    }
    update(){

    }
}

export default StarLine;