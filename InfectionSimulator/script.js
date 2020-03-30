let canvas;
let ctx;

let people_count = 100;
let people = [];

let size = { width: window.innerWidth, height: window.innerHeight };
let speed_low = 5;
let speed_high = 10;
let simulation_speed = 1;

let people_draw_radius = 5;
let update_time = 30;
let last_time_updated = new Date().getTime();

let restart_button;
let people_count_slider;
let people_count_span;
let people_size_slider;
let people_size_span;
let speed_slider;
let speed_span;

document.addEventListener("DOMContentLoaded", init);

function resizeCanvas() {
    size = { width: window.innerWidth * 3 / 4, height: window.innerHeight };
    canvas.width = size.width;
    canvas.height = size.height;
}

function generatePeople() {
  people = [];
  for (let i = 0; i < people_count; i++) {
    let x = Math.random() * (size.width - 10) + 5;
    let y = Math.random() * (size.height - 10) + 5;
    let direction = Math.random() * Math.PI * 2;
    let speed = speed_low + (speed_high - speed_low) * Math.random();

    people.push({ x: x, y: y, direction: direction, speed: speed, infected: false });
  }

  let random_index = Math.floor(Math.random() * people_count);
  people[random_index].infected = true;
}

function bindInput() {
  people_count_span = document.getElementById("people_count_span");
  people_count_slider = document.getElementById("people_count_slider");

  people_count_span.innerHTML = people_count_slider.value;
  people_count_slider.oninput = function() {
    people_count_span.innerHTML = this.value;
    people_count = parseInt(this.value);
  };

  people_size_span = document.getElementById("people_size_span");
  people_size_slider = document.getElementById("people_size_slider");

  people_size_span.innerHTML = people_size_slider.value;
  people_size_slider.oninput = function() {
    people_size_span.innerHTML = this.value;
    people_draw_radius = parseFloat(this.value);
  };

  speed_span = document.getElementById("speed_span");
  speed_slider = document.getElementById("speed_slider");

  speed_span.innerHTML = speed_slider.value;
  speed_slider.oninput = function() {
    speed_span.innerHTML = this.value;
    simulation_speed = parseFloat(this.value);
  };

  restart_button = document.getElementById("restart");
  restart_button.onclick = restartSimulating;
}

function startSimulating() {
  generatePeople();
  setInterval(update, update_time);
}

function restartSimulating() {
  clearInterval(update);

  startSimulating();
}

function init() {
  canvas = document.getElementById("environment");
  ctx = canvas.getContext("2d");

  bindInput();
  // window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();

  startSimulating();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#121212';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  people.forEach((human) => {
    ctx.beginPath();
    ctx.fillStyle = (human.infected ? "red" : "green");
    ctx.arc(Math.floor(human.x), Math.floor(human.y), people_draw_radius, 0, 2 * Math.PI, false);
    ctx.fill();
  });
}

function update() {
  moveAndCollide();
  draw();
}

function colliding(x1, y1, x2, y2, radius) {
  let distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  return distance <= radius * 2;
}

function moveAndCollide() {
  let time_delta = new Date().getTime() - last_time_updated;
  last_time_updated = new Date().getTime();

  for (let i = 0;i < people.length;i++) {
    let last_x = people[i].x;
    let last_y = people[i].y;

    people[i].x += people[i].speed * Math.cos(people[i].direction) * time_delta * simulation_speed / 100;
    people[i].y += people[i].speed * Math.sin(people[i].direction) * time_delta * simulation_speed / 100;

    if (people[i].x + people_draw_radius > size.width || people[i].x - people_draw_radius < 0) {
      people[i].direction = Math.PI - people[i].direction;
      people[i].x = last_x;
      people[i].y = last_y;
    }

    if (people[i].y + people_draw_radius > size.height || people[i].y - people_draw_radius < 0) {
      people[i].direction = -people[i].direction;
      people[i].x = last_x;
      people[i].y = last_y;
    }
  }

  for (let i = 0;i < people.length;i++) {
    if (people[i].infected) {
      for (let j = 0;j < people.length;j++) {
        if (i != j && colliding(people[i].x, people[i].y, people[j].x, people[j].y, people_draw_radius)) {
          people[j].infected = true;
        }
      }
    }
  }
}
