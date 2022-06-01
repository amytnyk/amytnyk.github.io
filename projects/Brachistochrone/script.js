let point_x = 900; 
let point_y = 615;
let canvas;
let context;
let dragging = false;
const g = 10;

function normalize_point() {
    point_x = Math.max(10, Math.min(point_x, canvas.width - 10));
    point_y = Math.max(10, Math.min(point_y, canvas.height - 10));
}

function update() {
    normalize_point();
    draw();
}

function resize() {
    canvas.width = window.innerWidth - 1;
    canvas.height = window.innerHeight - 1;
    
    update();
}

function calculate_radius() {
    let phi = 0.001;
    while (phi < point_x / point_y * (1 - Math.cos(phi)) + Math.sin(phi))
        phi += 0.001;
    
    return point_y / (1 - Math.cos(phi));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let r = calculate_radius();

    let time = 0;
    while (r * (Math.sqrt(g / r) * time - Math.sin(Math.sqrt(g / r) * time)) < point_x) {
        let phi = Math.sqrt(g / r) * time;
        let x = r * (phi - Math.sin(phi));
        let y = r * (1 - Math.cos(phi));

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();

        time += 0.1;
    }

    ctx.beginPath();
    ctx.arc(point_x, point_y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function on_mouse_up(event) {
    dragging = false;
}

function on_mouse_move(event) {
    if (dragging) {
        point_x = event.clientX;
        point_y = event.clientY;
        update();
    }
}

function on_mouse_down(event) {
    dragging = (event.clientX - point_x) * (event.clientX - point_x) + (event.clientY - point_y) * (event.clientY - point_y) < 100;
}

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    window.addEventListener('resize', resize);
    document.addEventListener('mousedown', on_mouse_down);
    document.addEventListener('mousemove', on_mouse_move);
    document.addEventListener('mouseup', on_mouse_up);

    resize();
    update();
});