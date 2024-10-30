// Canvas setup for bouncing balls
const canvas = document.createElement("canvas");
canvas.id = "backgroundCanvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Ball physics setup
const balls = [];
const gravity = 0.2;
const friction = 0.99; // Friction to slow down after bounce

for (let i = 0; i < 10; i++) {
    balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 15 + Math.random() * 20,
        colorHue: Math.random() * 360,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1,
        isDragging: false,
        offsetX: 0,
        offsetY: 0
    });
}

// Track mouse position and state
let mouse = { x: 0, y: 0, isDown: false, ballIndex: -1 };

// Update mouse coordinates
canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

// Handle mouse down event for dragging balls
canvas.addEventListener("mousedown", (event) => {
    mouse.isDown = true;
    balls.forEach((ball, index) => {
        const dist = Math.hypot(ball.x - mouse.x, ball.y - mouse.y);
        if (dist <= ball.radius) {
            ball.isDragging = true;
            mouse.ballIndex = index;
            ball.offsetX = ball.x - mouse.x;
            ball.offsetY = ball.y - mouse.y;
        }
    });
});

// Handle mouse up event for releasing balls
canvas.addEventListener("mouseup", () => {
    mouse.isDown = false;
    if (mouse.ballIndex !== -1) {
        const ball = balls[mouse.ballIndex];
        ball.isDragging = false;
        // Calculate velocity based on drag speed
        ball.dx = (mouse.x - ball.x) * 0.1;
        ball.dy = (mouse.y - ball.y) * 0.1;
    }
    mouse.ballIndex = -1;
});

function animateBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        // Draw ball
        const color = `hsl(${ball.colorHue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

        // Check if the ball is being dragged
        if (ball.isDragging && mouse.isDown) {
            ball.x = mouse.x + ball.offsetX;
            ball.y = mouse.y + ball.offsetY;
        } else {
            // Apply gravity
            ball.dy += gravity;

            // Bounce off edges with friction
            if (ball.y + ball.radius > canvas.height) {
                ball.y = canvas.height - ball.radius;
                ball.dy = -ball.dy * friction;
            } else if (ball.y - ball.radius < 0) {
                ball.y = ball.radius;
                ball.dy = -ball.dy * friction;
            }
            if (ball.x + ball.radius > canvas.width) {
                ball.x = canvas.width - ball.radius;
                ball.dx = -ball.dx * friction;
            } else if (ball.x - ball.radius < 0) {
                ball.x = ball.radius;
                ball.dx = -ball.dx * friction;
            }

            // Update position with velocity
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Apply friction to slow down gradually
            ball.dx *= friction;
            ball.dy *= friction;
        }
    });
    requestAnimationFrame(animateBalls);
}

animateBalls();

// Portfolio projects data
const projects = [
    { name: "QR Code Keychain", description: "Personalized keychain with QR code leading to a photo gallery.", link: "https://suspectax.github.io/qtgalleryyy/" },
    { name: "Interactive Questions", description: "Playful questionnaire with a surprise for your loved one!", link: "https://suspectax.github.io/Doyouloveme/" },
    { name: "QR code video", description: "Personalized keychain with QR code leading to a video saved online.", link: "https://suspectax.github.io/qtvidgallery/" }
];

// Populate projects dynamically
const projectsContainer = document.getElementById('projects-container');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');

    const projectTitle = document.createElement('h2');
    projectTitle.textContent = project.name;

    const projectDescription = document.createElement('p');
    projectDescription.textContent = project.description;

    const projectLink = document.createElement('a');
    projectLink.href = project.link;
    projectLink.target = "_blank";
    projectLink.textContent = "View Project";
    projectLink.classList.add('project-link');

    projectCard.appendChild(projectTitle);
    projectCard.appendChild(projectDescription);
    projectCard.appendChild(projectLink);
    projectsContainer.appendChild(projectCard);
});
