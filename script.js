// JavaScript for bouncing balls with physics

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ball settings
const balls = [];
const gravity = 0.2;
const friction = 0.98;

// Create balls with random properties
for (let i = 0; i < 10; i++) {
    balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 15 + Math.random() * 20,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1
    });
}

// Draw and animate balls
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();

        // Apply gravity and friction
        if (ball.y + ball.radius + ball.dy > canvas.height) {
            ball.dy = -ball.dy * friction;
        } else {
            ball.dy += gravity;
        }

        if (ball.x + ball.radius + ball.dx > canvas.width || ball.x - ball.radius <= 0) {
            ball.dx = -ball.dx * friction;
        }

        // Update ball position
        ball.x += ball.dx;
        ball.y += ball.dy;
    });

    requestAnimationFrame(animate);
}

animate();
