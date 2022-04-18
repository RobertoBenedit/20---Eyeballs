// @ts-nocheck
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const width = window.innerWidth;
const height = window.innerHeight;
let eyes = [];
let theta;

const mouse = {
    x: undefined,
    y: undefined,
};

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Eye {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw() {
        // draw eye
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        // get angle
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        theta = Math.atan2(dy, dx);

        // draw iris
        let iris_x = this.x + (this.radius / 10) * Math.cos(theta);
        let iris_y = this.y + (this.radius / 10) * Math.sin(theta);
        let irisRadius = this.radius / 1.2;
        ctx.beginPath();
        ctx.arc(iris_x, iris_y, irisRadius, 0, Math.PI * 2, true);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();

        // draw pupil
        let pupil_x = this.x + (this.radius / 1.9) * Math.cos(theta);
        let pupil_y = this.y + (this.radius / 1.9) * Math.sin(theta);
        let pupilRadius = this.radius / 2.5;
        ctx.beginPath();
        ctx.arc(pupil_x, pupil_y, pupilRadius, 0, Math.PI * 2, true);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        // draw pupil reflection
        ctx.beginPath();
        ctx.arc(
            pupil_x - pupilRadius / 3,
            pupil_y - pupilRadius / 3,
            pupilRadius/2,
            0,
            Math.PI * 2,
            true
        );
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.fill();
        ctx.closePath();

        // draw mouse
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2, true);
        ctx.fillStyle = "gold";
        ctx.fill();
        ctx.closePath();
    }
}
function init() {
    eyes = [];
    let overlapping = false;
    let numberOfEyes = 50;
    let protection = 1000;
    let counter = 0;

    while (eyes.length < numberOfEyes && counter < protection) {
        let eye = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.floor(Math.random() * 100) + 5,
        };
        overlapping = false;
        for (let i = 0; i < eyes.length; i++) {
            let prevoiusEye = eyes[i];
            let dx = eye.x - prevoiusEye.x;
            let dy = eye.y - prevoiusEye.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < eye.radius + prevoiusEye.radius) {
                overlapping = true;
                break;
            }
        }
        if (!overlapping) {
            eyes.push(new Eye(eye.x, eye.y, eye.radius));
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < eyes.length; i++) {
        eyes[i].draw();
    }
}
init();
animate();

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
