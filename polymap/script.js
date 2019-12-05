let canvas;
let ctx;
let map = [];
let height = 18;
let width = 18;
let field_size = 0;
let isMouseDown = false;
let current_brush;

const Field = {
    UNKNOWN: 0,
    GROUND: 1,
    SEA: 2,
    OCEAN: 3
}

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    current_brush = Field.GROUND;
    document.getElementById("canvas").addEventListener("mousedown", (e) => {
        isMouseDown = true;
        clickedOnField(e);
    });
    document.getElementById("canvas").addEventListener("mouseup", () => {
        isMouseDown = false;
    });
    document.getElementById("canvas").addEventListener("mousemove", (e) => {
        if (isMouseDown)
            clickedOnField(e);
    });
    initMap();
    update();
});

function initMap() {
    map = Array.from({length: height}, e => Array(width).fill(Field.UNKNOWN));
}

function calculateSize() {
    let width_per_field = Math.ceil(window.innerWidth / 10 * 6) / width;
    let height_per_field = 600 / height;
    field_size = Math.min(width_per_field, height_per_field);
}

function drawGrid() {
    ctx.beginPath();
    for (var y = 0;y <= height;y++) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.moveTo(0, field_size * y);
        ctx.lineTo(field_size * width, field_size * y);
    }
    for (var x = 0;x <= width;x++) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.moveTo(field_size * x, 0);
        ctx.lineTo(field_size * x, field_size * height);
    }
    ctx.stroke();
}

function drawPart(x, y) {
    let field = map[y][x];
    let color = "";

    if (field == Field.GROUND) {
        color = "#6db327";
    } else if (field == Field.SEA) {
        color = "#2748b3";
    } else if (field == Field.OCEAN) {
        color = "#22346c";
    } else if (field == Field.UNKNOWN) {
        color = "#121212";
    } else {
        color = "#ffffff";
    }
    
    ctx.fillStyle = color;
    ctx.fillRect(field_size * x, field_size * y, field_size, field_size);
}

function drawAll() {
    for (var y = 0;y < height;y++) {
        for (var x = 0;x < width;x++) {
            drawPart(x, y);
        }
    }

    drawGrid();
}



function update() {
    calculateSize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAll();
}

function clickedOnField(e) {
    let rect = document.getElementById("canvas").getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    let fieldX = Math.ceil(mouseX / field_size) - 1;
    let fieldY = Math.ceil(mouseY / field_size) - 1;

    map[fieldY][fieldX] = current_brush;
    drawPart(fieldX, fieldY);
    drawGrid();
}