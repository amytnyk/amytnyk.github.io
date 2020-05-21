let canvas;
let ctx;

let colorUI;
let mousedown = false;
let current_color_index = 0;
const colors = ["red", "blue", "darkgreen", "black", "violet", "brown", "white", "yellow", "green", "orange"];

let dots = [];
let inversionCenter;
let inversionRadius;
let dot_radius = 2;
let dot_inversion_radius = 2;
const null_last_point = { x: -5, y: -5 };
let last_point = null_last_point;
let size;

document.addEventListener("DOMContentLoaded", init);

function inverse(point) {
    let vector = { x: point.x - inversionCenter.x, y: point.y - inversionCenter.y };
    let vectorMod = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    let radius_squared = inversionRadius * inversionRadius;
    let newVectorMod = radius_squared / vectorMod;
    let coef = newVectorMod / vectorMod;
    return { x: vector.x * coef + inversionCenter.x, y: vector.y * coef + inversionCenter.y };
}

function addPoint(point) {
    if (Math.sqrt((point.x - last_point.x) * (point.x - last_point.x) + (point.y - last_point.y) * (point.y - last_point.y)) > 6) {
        dots.push({ ...point, color: colors[current_color_index], radius: dot_radius });
        dots.push({ ...inverse(point), color: colors[colors.length - current_color_index - 1], radius: dot_inversion_radius });
        draw();
        last_point = point;
    }
}

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    size = { width: window.innerWidth, height: window.innerHeight  - 100};
    canvas.width = size.width;
    canvas.height = size.height;

    inversionRadius = size.height / 6;
    inversionCenter = { x: size.width / 2, y: size.height / 2 };

    canvas.addEventListener("mousedown", (e) => { 
        mousedown = true;
        addPoint({ x: e.offsetX, y: e.offsetY });
    });
    canvas.addEventListener("mousemove", (e) => {
        if (mousedown) {
            addPoint({ x: e.offsetX, y: e.offsetY });
        }
    });
    canvas.addEventListener("mouseup", () => mousedown = false);
    window.addEventListener("keypress", (e) => {
        if (e.key == 'z' && dots.length >= 2) {
            dots.length -= 2;
            last_point = null_last_point;
            draw();
        }
    });

    colorUI = document.getElementById("color");
    colorUI.addEventListener("click", () => {
        current_color_index = (current_color_index + 1) % colors.length;
        colorUI.style.backgroundColor = colors[current_color_index];
    });
    colorUI.style.color = colors[current_color_index];

    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#6db327";
    ctx.beginPath();
    ctx.arc(inversionCenter.x, inversionCenter.y, inversionRadius, 0, 2 * Math.PI, false);
    ctx.stroke();

    dots.forEach((dot) => {
        ctx.beginPath();
        ctx.fillStyle = dot.color;
        ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
        ctx.fill();
    });
}