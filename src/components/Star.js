import { globalState } from "./StarCanvas";

class Star {
    
    constructor(x, y, scale, bodyText, headerText, subtitleText, titleText) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.radius = 20 * scale;
        this.targetting = false;

        this.angle = 10;

        this.hover_timer = 0;
        this.rotation_direction = Math.random() < 0.5 ? 1 : -1;
        this.rotation_speed = 1;

        this.tooltip = "Welcome!";
        this.tooltip_alpha = 0;

        this.bodyText = bodyText || "Todo!";
        this.headerText = headerText || "Welcome to My Portfolio!";
        this.subtitleText = subtitleText || "Explore with the map above, or read below!";
        this.titleText = titleText || "Hey there!";
    }

    render(context) {

        let displayX = this.x - globalState.camera_x + globalState.canvas_width / 2;
        let displayY = this.y - globalState.camera_y + globalState.canvas_height / 2;

        if(displayX < 0 - 50 || displayX > globalState.canvas_width + 50 || displayY < -50 || displayY > globalState.canvas_height + 50) return
        
        let r1 = 4.0 * this.scale
        let r2 = 9.0 * this.scale

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


        r1 = 4 * this.scale
        r2 = 12 * this.scale
        points = 4;

        context.beginPath();
        context.moveTo(displayX + r2 * Math.cos(rads), displayY + r2 * Math.sin(rads));


        for (let i = 0; i < points; i++) {
            context.lineTo(displayX + r1 * Math.cos(rads + ((i + .5) * 2 * Math.PI / points)), displayY + r1 * Math.sin(rads + ((i + .5) * 2 * Math.PI / points)));
            if(i < points - 1) context.lineTo(displayX + r2 * Math.cos(rads + ((i + 1) * 2 * Math.PI / points)), displayY + r2 * Math.sin(rads + ((i + 1) * 2 * Math.PI / points)));
        }
        
        context.fillStyle = 'rgba(255, 255, 255, 0.9)'; // Set the fill color to white with 50% transparency
        context.fill();
        //context.fill();
        context.closePath();

        if(this.tooltip_alpha > 0){

            context.fillStyle = `rgba(10,17,38, ${this.tooltip_alpha})`; // Set the stroke color to white with dynamic transparency
            context.fillRect(displayX + 18, displayY + 18, 200, 45);

            context.beginPath();
            context.moveTo(displayX + 2, displayY + 2);
            context.lineTo(displayX + 14, displayY + 14);
            context.strokeStyle = `rgba(255, 255, 255, ${this.tooltip_alpha * .8})`; // Set the stroke color to white with dynamic transparency
            context.stroke();
            context.closePath();
            
            context.beginPath();
            context.moveTo(displayX + 15, displayY + 15);
            context.lineTo(displayX + 15, displayY + 45);
            context.strokeStyle = `rgba(255, 255, 255, ${this.tooltip_alpha})`; // Set the stroke color to white with 50% transparency
            context.stroke();
            context.closePath();
            
            context.beginPath();
            context.moveTo(displayX + 15, displayY + 15);
            context.lineTo(displayX + 115, displayY + 15);
            context.strokeStyle = `rgba(255, 255, 255, ${this.tooltip_alpha})`; // Set the stroke color to white with 50% transparency
            context.stroke();
            context.closePath();

            context.fillStyle = `rgba(255, 255, 255, ${this.tooltip_alpha})`; 
            context.fillText(this.tooltip, displayX + 25, displayY + 35);
        }

    }

    update() {
        let displayX = this.x - globalState.camera_x + globalState.canvas_width / 2;
        let displayY = this.y - globalState.camera_y + globalState.canvas_height / 2;
        if(globalState.mouse_x > displayX - this.radius &&
            globalState.mouse_x < displayX + this.radius &&
            globalState.mouse_y > displayY - this.radius &&
            globalState.mouse_y < displayY + this.radius) {
            
            // On hover start
            if(this.hover_timer == 0){
                this.rotation_speed = 20;
            }

            this.hover_timer += 1
            globalState.clickable = true

            this.rotation_speed = Math.max(this.rotation_speed * .97, 1)
            this.tooltip_alpha = Math.min(this.tooltip_alpha + 0.05, 1)

            if(globalState.mouse_release) {
                this.targetting = true
                globalState.callback(this);
            }


        }
        else{
            this.hover_timer = 0
            this.rotation_speed = Math.max(this.rotation_speed * .985, 1)
            this.tooltip_alpha = Math.max(this.tooltip_alpha - 0.05, 0)
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
        
        this.angle += .3 * this.rotation_speed * this.rotation_direction
    }
}

export default Star;