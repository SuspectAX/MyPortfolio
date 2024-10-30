// Canvas setup for bouncing balls
const canvas = document.createElement("canvas");
canvas.id = "backgroundCanvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Ball physics setup with continuous bounce and pastel colors
const balls = [];
const gravity = 0.2;
const colorChangeSpeed = 0.02; // Speed of color transition

// Define a range of hues for nude colors
const nudeHues = [0, 20, 40, 60, 180, 220, 300]; // Soft reds, yellows, browns, turquoise, etc.

for (let i = 0; i < 10; i++) {
    balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 15 + Math.random() * 20,
        colorHue: nudeHues[Math.floor(Math.random() * nudeHues.length)], // Pick a random nude hue
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1
    });
}

function animateBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        // Gradual color transition within pastel hues
        ball.colorHue = (ball.colorHue + colorChangeSpeed) % 360;
        const color = `hsl(${ball.colorHue}, 40%, 70%)`; // Use soft pastel saturation and lightness

        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

        // Continuous bounce without friction
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
    });
    requestAnimationFrame(animateBalls);
}

animateBalls();
