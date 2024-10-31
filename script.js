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

// Ball physics setup with continuous bounce
const balls = [];
const gravity = 0.2;
const colorChangeSpeed = 0.01; // Speed of color transition

for (let i = 0; i < 10; i++) {
    balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 15 + Math.random() * 30,
        colorHue: Math.random() * 360,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1
    });
}

function animateBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        // Gradual color transition
        ball.colorHue = (ball.colorHue + colorChangeSpeed) % 360;
        const color = `hsl(${ball.colorHue}, 100%, 50%)`;

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

// Portfolio projects data
const projects = [
    { name: "QR Code Keychain", description: "Personalized keychain with QR code leading to a downloadable photo gallery.", link: "https://suspectax.github.io/Collage/" },
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
