import { globalState } from "./StarCanvas";

class Star {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.targetting = false;
    }

    render(context) {

        let displayX = this.x - globalState.camera_x + globalState.canvas_width / 2;
        let displayY = this.y - globalState.camera_y + globalState.canvas_height / 2;

        context.beginPath();
        context.arc(displayX, displayY, 10, 0, Math.PI * 2, false); // Draw a circle to represent the star
        context.fillStyle = this.color || 'white'; // Default color is white
        context.fill();
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
    }
}

export default Star;