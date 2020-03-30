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
let current_time = 0;

let max_infection_time = 30000;
let max_incubation_period = 14000;
let death_percentage = 0.5;

let restart_button;
let people_count_slider;
let people_count_span;
let people_size_slider;
let people_size_span;
let speed_slider;
let speed_span;
let death_rate_slider;
let death_rate_span;
let infection_period_slider;
let infection_period_span;
let incubation_period_slider;
let incubation_period_span;
let confirmed_cases_count_label;
let susceptible_count_label;
let death_cases_count_label;
let recovered_count_label;
let active_count_label;
let incubation_count_label;

let temp_ui_confirmed_count = -1;
let temp_ui_death_count = -1;
let temp_ui_recovered_count = -1;
let temp_ui_incubation_count = -1;
let temp_ui_susceptible_count = -1;
let temp_ui_active_count = -1;

let debug_interval_started = 0;
let debug_interval_cleared = 0;
let debug_collision_check = true;

document.addEventListener("DOMContentLoaded", init);

function resizeCanvas() {
    size = { width: window.innerWidth * 3 / 4 + 1, height: window.innerHeight };
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

    people.push({ x: x, y: y, direction: direction, speed: speed, state: "susceptible" });
  }

  let random_index = Math.floor(Math.random() * people_count);
  people[random_index].state = "infected";
  people[random_index].infection_time = new Date().getTime();
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

  death_rate_span = document.getElementById("death_rate_span");
  death_rate_slider = document.getElementById("death_rate_slider");

  death_rate_span.innerHTML = death_rate_slider.value;
  death_rate_slider.oninput = function() {
    death_rate_span.innerHTML = this.value;
    death_percentage = parseFloat(this.value);
  };

  incubation_period_span = document.getElementById("incubation_period_span");
  incubation_period_slider = document.getElementById("incubation_period_slider");

  incubation_period_span.innerHTML = incubation_period_slider.value;
  incubation_period_slider.oninput = function() {
    incubation_period_span.innerHTML = this.value;
    max_incubation_period = parseInt(this.value) * 1000;
  };

  infection_period_span = document.getElementById("infection_period_span");
  infection_period_slider = document.getElementById("infection_period_slider");

  infection_period_span.innerHTML = infection_period_slider.value;
  infection_period_slider.oninput = function() {
    infection_period_span.innerHTML = this.value;
    max_infection_timer = parseInt(this.value) * 1000;
  };

  restart_button = document.getElementById("restart");
  restart_button.onclick = restartSimulating;

  confirmed_cases_count_label = document.getElementById("confirmed_cases_count_label");
  susceptible_count_label = document.getElementById("susceptible_count_label");
  active_count_label = document.getElementById("active_count_label");
  death_cases_count_label = document.getElementById("deaths_count_label");
  recovered_count_label = document.getElementById("recovered_count_label");
  incubation_count_label = document.getElementById("incubation_count_label");
}

function startSimulating() {
  current_time = 0;
  generatePeople();
  setInterval(update, update_time);
  debug_interval_started++;
}

function restartSimulating() {
  clearInterval(update);
  debug_interval_cleared++;
  console.log(debug_interval_started);
  console.log(debug_interval_cleared);

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

function getColorByState(state) {
  if (state == "recovered")
    return "yellow";
  if (state == "dead")
    return "gray";
  if (state == "susceptible")
    return "green";
  if (state == "incubation_period")
    return "blue";
   if (state == "infected")
    return "red";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#121212';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  people.forEach((human) => {
    ctx.beginPath();
    ctx.fillStyle = getColorByState(human.state);
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
  if (current_time == 0)
    current_time = new Date().getTime();
  else
    current_time += time_delta * simulation_speed;
  last_time_updated = new Date().getTime();

  let width_chunks = Math.min(50, size.width / people_draw_radius);
  let width_chunk_size = size.width / width_chunks;
  let height_chunks = Math.min(50, size.height / people_draw_radius);
  let height_chunk_size = size.height / height_chunks;

  let chunks = new Array(height_chunks * width_chunks).fill(new Array());
  
  for (let i = 0;i < people.length;i++) {
    if (people[i].state == "dead")
      continue;
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

    let width_chunk_index = Math.floor(people[i].x / width_chunk_size);
    let height_chunk_index = Math.floor(people[i].y / height_chunk_size);
    let chunk_index = width_chunks * height_chunk_index + width_chunk_index;

    chunks[chunk_index].push(i);
  }

  let infected_count = 0;
  let recovered_count = 0;
  let active_count = 0;
  let deaths_count = 0;
  let incubation_count = 0;

  if (debug_collision_check) {
    for (let i = 0;i < people.length;i++) {
      if (people[i].state == "infected" || people[i].state == "incubation_period") {
        if (people[i].state == "incubation_period") {
          let incubation_time = current_time - people[i].infection_time; 
          if (incubation_time > max_incubation_period) {
            people[i].state = "infected";
          }
        }

        let infection_time = current_time - people[i].infection_time;
        if (infection_time > max_infection_time) {
          let random = Math.random();
          if (random < death_percentage) {
            people[i].state = "dead";
          } else {
            people[i].state = "recovered";
          }
          continue;
        }
        

        let width_chunk_index = Math.floor(people[i].x / width_chunk_size);
        let height_chunk_index = Math.floor(people[i].y / height_chunk_size);
        
        let getChunkIndex = function(x, y) {
          return width_chunks * y + x;
        };
        
        
        for (let k1 = 0;k1 < 3;k1++) {
          for (let k2 = 0;k2 < 3;k2++) {
            chunk_index = getChunkIndex(width_chunk_index - 1 + k1, height_chunk_index - 1 + k2);
            if (chunk_index >= 0 && chunk_index < chunks.length) {
              chunks[chunk_index].forEach((j) => {
                if (i != j && colliding(people[i].x, people[i].y, people[j].x, people[j].y, people_draw_radius)) {
                  if (people[j].state == "susceptible") {
                    people[j].infection_time = current_time;
                    people[j].state = "incubation_period";
                  }
                }
              });
            }
          }
        }
      }
    }
  }

  for (let i = 0;i < people.length;i++) {
    if (people[i].state == "incubation_period") {
      incubation_count++;
    } else if (people[i].state == "dead") {
      deaths_count++;
    } else if (people[i].state == "recovered") {
      recovered_count++;
    } else if (people[i].state == "infected") {
      infected_count++;
    }
  }
  
  let new_confirmed = infected_count + recovered_count + deaths_count;
  if (temp_ui_confirmed_count != new_confirmed) {
    confirmed_cases_count_label.innerHTML = new_confirmed;
    temp_ui_confirmed_count = new_confirmed;
  }

  let new_susceptible = people.length - new_confirmed;
  if (temp_ui_susceptible_count != new_susceptible) {
    susceptible_count_label.innerHTML = new_susceptible;
    temp_ui_susceptible_count = new_susceptible;
  }

  let new_active = infected_count;
  if (temp_ui_active_count != new_active) {
    active_count_label.innerHTML = new_active;
    temp_ui_active_count = new_active;
  }

  let new_death = deaths_count;
  if (temp_ui_death_count != new_death) {
    death_cases_count_label.innerHTML = new_death;
    temp_ui_death_count = new_death;
  }

  let new_recovered = recovered_count;
  if (temp_ui_recovered_count != new_recovered) {
    recovered_count_label.innerHTML = new_recovered;
    temp_ui_recovered_count = new_recovered;
  }

  let new_incubation = incubation_count;
  if (temp_ui_incubation_count != new_incubation) {
    incubation_count_label.innerHTML = new_incubation;
    temp_ui_incubation_count = new_incubation;
  }
}
