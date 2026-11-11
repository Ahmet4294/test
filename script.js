const timer = document.querySelector(".timer");
const start_btn = document.querySelector(".start");
const reset_btn = document.querySelector(".reset");
const modes = document.querySelectorAll(".mode button");

const selectedMode = () => {
  const selected = document.querySelector("[selected");
  return Number(selected.dataset.time);
}

let hours = 60;
let time = selectedMode() * hours;
let interval = undefined;
let open = false;

const Update = () => {
  const minutes = Math.floor(time / hours);
  const seconds = time % hours;
  timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const Pause = () => {
  clearInterval(interval);
  interval = undefined;
  open = false;
  start_btn.textContent = "devam et";
}

function Start() {
  if (open) {
    Pause();
    return;
  }

  open = true;
  const html = document.documentElement;
  start_btn.textContent = "durdur";
  reset_btn.disabled = false;

  interval = setInterval(() => {
    if (time > 0) {
      time--;
      Update();
      html.style.setProperty("--progress", time * 360  / (selectedMode() * hours) + "deg");
    }
    else {
      Reset();
    }
  }, 1000);
}

function Reset() {
  Pause();
  time = selectedMode() * hours;
  Update();
  document.documentElement.style.setProperty("--progress", "360deg");
  start_btn.textContent = "başlat";
  reset_btn.disabled = true;
}

for(const mode of modes) {
  mode.addEventListener("click", () => Modes(mode));
}

const Modes = (mode) => {
  for(const m of modes) {
    m.removeAttribute("selected");
  }
  mode.setAttribute("selected", "");
  Reset();
}

Update();
