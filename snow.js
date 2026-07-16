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
flakes.forEach(f => (f.rotation = Math.random() * Math.PI * 2));
flakes.forEach(f => (f.rotSpeed = (Math.random() - 0.5) * 0.02));

// Draws a classic 6-armed snowflake crystal, scaled by `size`
function drawSnowflake(x, y, size, rotation) {
  const armLength = size * 4; // overall arm length
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  ctx.strokeStyle = '#00e5ff';
  ctx.lineWidth = Math.max(size * 0.35, 1);
  ctx.lineCap = 'round';

  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 3) * i);

    // main arm
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, armLength);
    ctx.stroke();

    // two small side branches near the tip
    const branchY = armLength * 0.55;
    const branchLen = armLength * 0.35;
    ctx.beginPath();
    ctx.moveTo(0, branchY);
    ctx.lineTo(branchLen * 0.7, branchY + branchLen * 0.7);
    ctx.moveTo(0, branchY);
    ctx.lineTo(-branchLen * 0.7, branchY + branchLen * 0.7);
    ctx.stroke();

    const branchY2 = armLength * 0.8;
    const branchLen2 = armLength * 0.25;
    ctx.beginPath();
    ctx.moveTo(0, branchY2);
    ctx.lineTo(branchLen2 * 0.7, branchY2 + branchLen2 * 0.7);
    ctx.moveTo(0, branchY2);
    ctx.lineTo(-branchLen2 * 0.7, branchY2 + branchLen2 * 0.7);
    ctx.stroke();

    ctx.restore();
  }

  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.globalAlpha = 0.85;

  for (const flake of flakes) {
    drawSnowflake(flake.x, flake.y, flake.radius, flake.rotation);
  }
  ctx.globalAlpha = 1;
}

function update() {
  for (const flake of flakes) {
    flake.y += flake.speed;
    flake.x += Math.sin(flake.y * 0.01 + flake.swayOffset) * flake.drift * 0.3;
    flake.rotation += flake.rotSpeed;

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
