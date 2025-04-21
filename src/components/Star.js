import { globalState } from "./StarCanvas";

class Star {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.targetting = false;

        this.angle = 10;
    }

    render(context) {

        let displayX = this.x - globalState.camera_x + globalState.canvas_width / 2;
        let displayY = this.y - globalState.camera_y + globalState.canvas_height / 2;
        
        let r1 = 4.0
        let r2 = 9.0

        let rads = this.angle * Math.PI / 180

        //context.beginPath();
        //context.arc(displayX, displayY, 10, 0, Math.PI * 2, false); // Draw a circle to represent the star
        context.fillStyle = this.color || 'white'; // Default color is white

        context.beginPath();
        context.moveTo(displayX + r2 * Math.cos(rads), displayY + r2 * Math.sin(rads));

        let points = 12;

        for (let i = 0; i < points; i++) {
            context.lineTo(displayX + r1 * Math.cos(rads + ((i + .5) * 2 * Math.PI / points)), displayY + r1 * Math.sin(rads + ((i + .5) * 2 * Math.PI / points)));
            if(i < points - 1) context.lineTo(displayX + r2 * Math.cos(rads + ((i + 1) * 2 * Math.PI / points)), displayY + r2 * Math.sin(rads + ((i + 1) * 2 * Math.PI / points)));
        }
        
        context.fillStyle = 'rgba(255, 255, 255, 0.5)'; // Set the fill color to white with 50% transparency
        context.fill();

        //context.fill();
        context.closePath();


        r1 = 4
        r2 = 12
        points = 4;

        context.beginPath();
        context.moveTo(displayX + r2 * Math.cos(rads), displayY + r2 * Math.sin(rads));


        for (let i = 0; i < points; i++) {
            context.lineTo(displayX + r1 * Math.cos(rads + ((i + .5) * 2 * Math.PI / points)), displayY + r1 * Math.sin(rads + ((i + .5) * 2 * Math.PI / points)));
            if(i < points - 1) context.lineTo(displayX + r2 * Math.cos(rads + ((i + 1) * 2 * Math.PI / points)), displayY + r2 * Math.sin(rads + ((i + 1) * 2 * Math.PI / points)));
        }
        
        context.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Set the fill color to white with 50% transparency
        context.fill();

        //context.fill();
        context.closePath();
    }

    update() {
        let displayX = this.x - globalState.camera_x + globalState.canvas_width / 2;
        let displayY = this.y - globalState.camera_y + globalState.canvas_height / 2;
        if(globalState.mouse_x > displayX - this.radius &&
            globalState.mouse_x < displayX + this.radius &&
            globalState.mouse_y > displayY - this.radius &&
            globalState.mouse_y < displayY + this.radius) {
            // If the mouse is over the star, change its color to yellow
            globalState.clickable = true
            if(globalState.mouse_release) {
                this.targetting = true
            }
        }

        // Move camera towards star
        if(this.targetting){
            if(globalState.mouse_down){
                this.targetting = false
            }
            else{
                globalState.camera_x += (this.x - globalState.camera_x) * 0.1;
                globalState.camera_y += (this.y - globalState.camera_y) * 0.1;
            }
        }
        
        this.angle += .3
    }
}

export default Star;