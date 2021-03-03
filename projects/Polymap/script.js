let canvas;
let ctx;
let map = [];
let height = 20;
let width = 20;
let field_size = 0;
let isMouseDown = false;
let current_brush;

const Field = {
    UNKNOWN: 0,
    GROUND: 1,
    SEA: 2,
    OCEAN: 3
}

function downloadObjectAsJson(exportObj, exportName){
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}


function downloadMapAsImage(exportName){
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     canvas.toDataURL('image/png'));
    downloadAnchorNode.setAttribute("download", exportName + ".png");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}


function resize() {
    if (window.innerWidth > 800) {
        document.getElementById("canvas").setAttribute("width", window.innerWidth / 2);
        document.getElementById("canvas").setAttribute("height", window.innerWidth / 2);
    } else {
        document.getElementById("canvas").setAttribute("width", window.innerWidth);
        document.getElementById("canvas").setAttribute("height", window.innerWidth);
    }
}

window.onresize = function(event) {
    resize();
    update();
};

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
    document.querySelector(".load_from_file").onclick = () => {
        document.querySelector("#file").click();
    };
    document.querySelector("#file").onchange = function() {
        if (document.getElementById("file").files[0] == undefined) {
            alert("Select file");
            return;
        }
        let f = new FileReader();
        f.onload = function() {
            map = JSON.parse(this.result);
            update();
        };
        f.readAsText(document.getElementById("file").files[0]);
        document.querySelector("#file").value = "";
    };
    document.querySelector(".save_to_file").onclick = () => {
        downloadObjectAsJson(map, "map");
    };
    document.querySelector(".save_as_image").onclick = () => {
        downloadMapAsImage("map");
    };
    document.querySelector(".clear_map").onclick = () => {
        initMap();
        update();
    };
    document.querySelector(".select_ground").onclick = () => {
        current_brush = Field.GROUND;
        document.querySelector(".select_ground").setAttribute("checked", "checked");
        document.querySelector(".select_water").removeAttribute("checked");
        document.querySelector(".select_unknown").removeAttribute("checked");
    };
    document.querySelector(".select_water").onclick = () => {
        current_brush = Field.SEA;
        document.querySelector(".select_water").setAttribute("checked", "checked");
        document.querySelector(".select_ground").removeAttribute("checked");
        document.querySelector(".select_unknown").removeAttribute("checked");
    };
    document.querySelector(".select_unknown").onclick = () => {
        current_brush = Field.UNKNOWN;
        document.querySelector(".select_unknown").setAttribute("checked", "checked");
        document.querySelector(".select_water").removeAttribute("checked");
        document.querySelector(".select_ground").removeAttribute("checked");
    };

    resize();
    initMap();
    update();
});

function initMap() {
    map = Array.from({length: height}, e => Array(width).fill(Field.UNKNOWN));
}

function calculateSize() {
    let width_per_field = document.getElementById("canvas").offsetWidth / width;
    let height_per_field = document.getElementById("canvas").offsetHeight / height;
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
    
    if (fieldY >= 0 && fieldY < height && fieldX >= 0 && fieldX < width) {
        map[fieldY][fieldX] = current_brush;
        drawAll();
    }
}
