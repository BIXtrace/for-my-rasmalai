// Background animation: hearts + particles
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 10 + 6;
    this.speed = Math.random() * 1 + 0.5;
    this.alpha = Math.random() * 0.6 + 0.4;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size / 10, this.size / 10);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -3, -5, -3, -5, 0);
    ctx.bezierCurveTo(-5, 3, 0, 6, 0, 10);
    ctx.bezierCurveTo(0, 6, 5, 3, 5, 0);
    ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);
    ctx.fillStyle = `rgba(0, 200, 255, ${this.alpha})`;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.y / 25) * 1;
  }
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fill();
  }
}

const hearts = [];
const particles = [];
for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.3 && hearts.length < 100) hearts.push(new Heart());

  for (let i = 0; i < hearts.length; i++) {
    hearts[i].update();
    hearts[i].draw();
    if (hearts[i].y < -20) hearts.splice(i, 1);
  }

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();

// 🎵 Music Control
const playBtn = document.getElementById('playBtn');
const bgMusic = document.getElementById('bgMusic');

let isPlaying = false;
playBtn.addEventListener('click', () => {
  if (!isPlaying) {
    bgMusic.play();
    playBtn.textContent = '⏸ Pause Music';
  } else {
    bgMusic.pause();
    playBtn.textContent = '🎵 Play Music';
  }
  isPlaying = !isPlaying;
});
