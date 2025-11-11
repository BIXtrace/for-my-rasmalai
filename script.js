const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const hearts = [];

class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 12 + 8;
        this.speed = Math.random() * 1 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.5;
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
        ctx.fillStyle = `rgba(0, 150, 255, ${this.alpha})`;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y / 20) * 0.5;
    }
}

function createHeart() {
    if (hearts.length < 100) {
        hearts.push(new Heart());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createHeart();
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].update();
        hearts[i].draw();
        if (hearts[i].y < -20) hearts.splice(i, 1);
    }
    requestAnimationFrame(animate);
}

animate();
