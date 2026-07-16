// Cyan snowflakes falling from the top of the screen, on a loop.

const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

let width, height;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// How many snowflakes to keep on screen at once. Turn this up/down for more/less snow.
const FLAKE_COUNT = 80;

function randomFlake() {
  return {
    x: Math.random() * width,
    y: Math.random() * -height,       // start above the screen so they drift in
    radius: Math.random() * 3 + 1.5,  // size
    speed: Math.random() * 1 + 0.5,   // fall speed
    drift: Math.random() * 1 - 0.5,   // slight left/right sway
    swayOffset: Math.random() * Math.PI * 2
  };
}

const flakes = Array.from({ length: FLAKE_COUNT }, randomFlake);

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#00e5ff'; // cyan

  for (const flake of flakes) {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.globalAlpha = 0.8;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function update() {
  for (const flake of flakes) {
    flake.y += flake.speed;
    flake.x += Math.sin(flake.y * 0.01 + flake.swayOffset) * flake.drift * 0.3;

    // reset once it falls off the bottom
    if (flake.y > height) {
      flake.y = Math.random() * -50;
      flake.x = Math.random() * width;
    }
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
