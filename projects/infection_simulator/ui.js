let UI = {};

UI.addController = function(name, default_value, min, max, step, onChanged) {
  let temp = document.querySelector("template[id=controller]");
  let copy = temp.content.cloneNode(true);

  copy.querySelector(".label").innerHTML = `${name}: `;
  
  let value = copy.querySelector(".value");
  value.innerHTML = default_value;

  let slider = copy.querySelector(".slider");
  slider.setAttribute("min", min);
  slider.setAttribute("max", max);
  slider.setAttribute("step", step);
  slider.setAttribute("value", default_value);
  slider.oninput = function () {
    value.innerHTML = this.value;
    onChanged(this.value);
  };
  document.querySelector("#controllers").appendChild(copy);
}

export { UI as default };