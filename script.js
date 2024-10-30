// Ball settings for bouncing effect
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

// Ball physics
const balls = [];
const gravity = 0.2;
const friction = 0.98;

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

function animateBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();

        if (ball.y + ball.radius + ball.dy > canvas.height) {
            ball.dy = -ball.dy * friction;
        } else {
            ball.dy += gravity;
        }

        if (ball.x + ball.radius + ball.dx > canvas.width || ball.x - ball.radius <= 0) {
            ball.dx = -ball.dx * friction;
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
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
