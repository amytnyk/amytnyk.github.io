import UI from "./ui.js"

document.addEventListener("DOMContentLoaded", init);

function addController(name, default_value, min, max, step, variable) {
  UI.addController(name, default_value, min, max, step, value => {
    variable = value;
  });

  update();
}

let people_count;
let speed;

function update() {

}

function initInfoPanel() {
  addController("People count", 100, 10, 1000, 10, people_count);
  addController("Speed", 1, 0, 5, 0.1, speed);
}

function init() {
  initInfoPanel();
}