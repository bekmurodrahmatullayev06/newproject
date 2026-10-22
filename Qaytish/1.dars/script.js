const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const scoreElement = document.querySelector("#score");
const bestElement = document.querySelector("#best");
const livesElement = document.querySelector("#lives");
const levelElement = document.querySelector("#level");
const comboElement = document.querySelector("#combo");
const overlay = document.querySelector("#overlay");
const overlayTitle = document.querySelector("#overlay-title");
const overlayText = document.querySelector("#overlay-text");
const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const soundButton = document.querySelector("#sound-button");

const keys = new Set();
const player = { x: 0, y: 0, radius: 15, speed: 340, invulnerable: 0, shield: 0 };
const stars = Array.from({ length: 75 }, () => ({
  x: Math.random(),
  y: Math.random(),
  size: Math.random() * 1.8 + 0.4,
  speed: Math.random() * 0.08 + 0.025,
}));
let objects = [];
let particles = [];
let width = 0;
let height = 0;
let score = 0;
let best = Number(localStorage.getItem("qaytish-best")) || 0;
let lives = 3;
let level = 1;
let combo = 0;
let spawnTimer = 0;
let elapsed = 0;
let lastTime = 0;
let state = "ready";
let soundEnabled = true;
let audioContext;

bestElement.textContent = best;

function resize() {
  const bounds = canvas.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = bounds.width;
  height = bounds.height;
  canvas.width = Math.round(width * pixelRatio);
  canvas.height = Math.round(height * pixelRatio);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  if (state === "ready") {
    player.x = width / 2;
    player.y = height * 0.78;
  } else {
    player.x = Math.min(Math.max(player.x, player.radius), width - player.radius);
    player.y = Math.min(Math.max(player.y, player.radius), height - player.radius);
  }
}

function updateStats() {
  scoreElement.textContent = score;
  bestElement.textContent = best;
  livesElement.textContent = "♥".repeat(lives) + "♡".repeat(3 - lives);
  levelElement.textContent = level;
  comboElement.textContent = combo > 1 ? `×${combo}` : "—";
}

function playTone(frequency, duration = 0.1, type = "sine") {
  if (!soundEnabled) return;
  audioContext ??= new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.07, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function startGame() {
  score = 0;
  lives = 3;
  level = 1;
  combo = 0;
  elapsed = 0;
  spawnTimer = 0;
  objects = [];
  particles = [];
  player.x = width / 2;
  player.y = height * 0.78;
  player.invulnerable = 0;
  player.shield = 0;
  state = "playing";
  overlay.classList.add("hidden");
  pauseButton.disabled = false;
  pauseButton.textContent = "Ⅱ  Pauza";
  updateStats();
  lastTime = performance.now();
}

function finishGame() {
  state = "over";
  pauseButton.disabled = true;
  overlayTitle.textContent = "O‘yin tugadi!";
  overlayText.innerHTML = `Siz <strong>${score}</strong> ochko to‘pladingiz.<br>Yana bir bor urinib ko‘ring!`;
  startButton.textContent = "↻  Qayta o‘ynash";
  overlay.classList.remove("hidden");
  playTone(150, 0.35, "triangle");
}

function togglePause() {
  if (state === "playing") {
    state = "paused";
    overlayTitle.textContent = "Bir oz dam oling";
    overlayText.textContent = "Davom etishga tayyor bo‘lsangiz, tugmani bosing.";
    startButton.textContent = "▶  Davom etish";
    overlay.classList.remove("hidden");
    pauseButton.textContent = "▶  Davom";
  } else if (state === "paused") {
    state = "playing";
    overlay.classList.add("hidden");
    pauseButton.textContent = "Ⅱ  Pauza";
    lastTime = performance.now();
  }
}

function spawnObject() {
  const isCrystal = Math.random() < 0.2;
  const radius = isCrystal ? 11 : Math.random() * 13 + 12;
  objects.push({
    x: Math.random() * (width - radius * 2) + radius,
    y: -radius,
    radius,
    speed: (isCrystal ? 145 : 125 + Math.random() * 85) + level * 17,
    kind: isCrystal ? "crystal" : "meteor",
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 3,
  });
}

function burst(x, y, color, amount = 12) {
  for (let i = 0; i < amount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 140 + 30;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: Math.random() * 0.45 + 0.3,
      maxLife: 0.75,
      size: Math.random() * 3 + 1,
      color,
    });
  }
}

function collectCrystal(crystal) {
  score += 25 + combo * 2;
  combo += 1;
  player.shield = 5;
  burst(crystal.x, crystal.y, "#66f3ff", 18);
  playTone(740 + Math.min(combo, 12) * 35, 0.16);
}

function hitMeteor(meteor) {
  objects.splice(objects.indexOf(meteor), 1);
  if (player.shield > 0) {
    player.shield = 0;
    burst(meteor.x, meteor.y, "#66f3ff", 18);
    playTone(420, 0.12);
    return;
  }
  lives -= 1;
  combo = 0;
  player.invulnerable = 1.3;
  burst(player.x, player.y, "#ff6384", 20);
  playTone(190, 0.2, "triangle");
  updateStats();
  if (lives <= 0) finishGame();
}

function update(dt) {
  elapsed += dt;
  level = Math.floor(score / 100) + 1;
  const horizontal = Number(keys.has("ArrowRight") || keys.has("d")) -
    Number(keys.has("ArrowLeft") || keys.has("a"));
  const vertical = Number(keys.has("ArrowDown") || keys.has("s")) -
    Number(keys.has("ArrowUp") || keys.has("w"));
  const magnitude = Math.hypot(horizontal, vertical) || 1;
  player.x += (horizontal / magnitude) * player.speed * dt;
  player.y += (vertical / magnitude) * player.speed * dt;
  player.x = Math.max(player.radius, Math.min(width - player.radius, player.x));
  player.y = Math.max(player.radius, Math.min(height - player.radius, player.y));
  player.invulnerable = Math.max(0, player.invulnerable - dt);
  player.shield = Math.max(0, player.shield - dt);

  spawnTimer -= dt;
  if (spawnTimer <= 0) {
    spawnObject();
    spawnTimer = Math.max(0.28, 0.9 - level * 0.055) * (0.7 + Math.random() * 0.6);
  }

  for (let i = objects.length - 1; i >= 0; i--) {
    const object = objects[i];
    object.y += object.speed * dt;
    object.rotation += object.spin * dt;
    const distance = Math.hypot(object.x - player.x, object.y - player.y);
    if (distance < object.radius + player.radius * 0.72) {
      if (object.kind === "crystal") {
        objects.splice(i, 1);
        collectCrystal(object);
      } else if (player.invulnerable === 0) {
        hitMeteor(object);
      }
      continue;
    }
    if (object.y - object.radius > height) {
      objects.splice(i, 1);
      if (object.kind === "meteor") {
        score += 2;
        combo = 0;
      }
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.life -= dt;
    if (particle.life <= 0) particles.splice(i, 1);
  }

  if (score > best) {
    best = score;
    localStorage.setItem("qaytish-best", best);
  }
  updateStats();
}

function drawBackground(dt) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#0c1028");
  gradient.addColorStop(1, "#17112f");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  for (const star of stars) {
    star.y += star.speed * dt * (state === "playing" ? 1 : 0.2);
    if (star.y > 1) star.y = 0;
    ctx.globalAlpha = 0.35 + Math.sin(elapsed * 2 + star.x * 30) * 0.25;
    ctx.fillStyle = "#c7dcff";
    ctx.beginPath();
    ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawShip() {
  if (player.invulnerable > 0 && Math.floor(player.invulnerable * 12) % 2 === 0) return;
  ctx.save();
  ctx.translate(player.x, player.y);
  if (player.shield > 0) {
    ctx.strokeStyle = `rgba(102, 243, 255, ${0.5 + Math.sin(elapsed * 9) * 0.25})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.shadowColor = "#9b7bff";
  ctx.shadowBlur = 18;
  ctx.fillStyle = "#c7b8ff";
  ctx.beginPath();
  ctx.moveTo(0, -19);
  ctx.lineTo(14, 14);
  ctx.lineTo(0, 8);
  ctx.lineTo(-14, 14);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#66f3ff";
  ctx.beginPath();
  ctx.moveTo(-5, 13);
  ctx.lineTo(0, 22 + Math.random() * 7);
  ctx.lineTo(5, 13);
  ctx.fill();
  ctx.restore();
}

function drawObject(object) {
  ctx.save();
  ctx.translate(object.x, object.y);
  ctx.rotate(object.rotation);
  if (object.kind === "crystal") {
    ctx.shadowColor = "#66f3ff";
    ctx.shadowBlur = 20;
    ctx.fillStyle = "#73f4ff";
    ctx.beginPath();
    ctx.moveTo(0, -object.radius);
    ctx.lineTo(object.radius * 0.8, 0);
    ctx.lineTo(0, object.radius);
    ctx.lineTo(-object.radius * 0.8, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillRect(-2, -2, 4, 4);
  } else {
    ctx.fillStyle = "#bc7181";
    ctx.strokeStyle = "#ffad8d";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2;
      const unevenRadius = object.radius * (i % 2 ? 0.82 : 1);
      const x = Math.cos(angle) * unevenRadius;
      const y = Math.sin(angle) * unevenRadius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function render(timestamp) {
  const dt = Math.min((timestamp - lastTime) / 1000 || 0, 0.035);
  lastTime = timestamp;
  drawBackground(dt);
  if (state === "playing") update(dt);
  for (const object of objects) drawObject(object);
  for (const particle of particles) {
    ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  drawShip();
  requestAnimationFrame(render);
}

window.addEventListener("resize", resize);
window.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
    event.preventDefault();
  }
  if (event.key === "Escape" || event.key.toLowerCase() === "p") {
    togglePause();
    return;
  }
  keys.add(event.key.length === 1 ? event.key.toLowerCase() : event.key);
  if (event.key === "Enter" && (state === "ready" || state === "over")) startGame();
});
window.addEventListener("keyup", (event) => {
  keys.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key);
});
window.addEventListener("blur", () => keys.clear());
startButton.addEventListener("click", () => {
  if (state === "paused") togglePause();
  else startGame();
});
pauseButton.addEventListener("click", togglePause);
soundButton.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundButton.textContent = soundEnabled ? "♫  Ovoz" : "♫̸  Ovoz";
  soundButton.setAttribute("aria-pressed", String(soundEnabled));
});
document.querySelectorAll("[data-key]").forEach((button) => {
  const key = button.dataset.key;
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    keys.add(key);
    button.setPointerCapture(event.pointerId);
  });
  const release = () => keys.delete(key);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("lostpointercapture", release);
});

resize();
requestAnimationFrame((timestamp) => {
  lastTime = timestamp;
  render(timestamp);
});
