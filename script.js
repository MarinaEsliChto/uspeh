document.addEventListener("DOMContentLoaded", () => {
    const message = document.querySelector(".message");
    const buttons = document.querySelector(".buttons");
    const noButton = document.querySelector(".no");
    const yesButton = document.querySelector(".yes");
    const modal = document.querySelector(".modal");
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworks = [];

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.particles = [];

            for (let i = 0; i < 50; i++) {
                this.particles.push(new Particle(this.x, this.y));
            }
        }

        update() {
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.life <= 0) this.particles.splice(index, 1);
            });
        }

        draw() {
            this.particles.forEach(particle => particle.draw());
        }
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.speed = Math.random() * 5 + 2;
            this.angle = Math.random() * 2 * Math.PI;
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
            this.gravity = 0.05;
            this.alpha = 1;
            this.life = 100;
            this.color = hsl(${Math.random() * 360}, 100%, 60%);
        }

        update() {
            this.vx *= 0.98;
            this.vy *= 0.98;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= 0.01;
            this.life--;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((firework, index) => {
            firework.update();
            firework.draw();
            if (firework.particles.length === 0) fireworks.splice(index, 1);
        });
        requestAnimationFrame(animate);
    }

    animate();

    noButton.addEventListener("click", function () {
        this.remove(); // Удаляем кнопку из DOM
    });

    yesButton.addEventListener("click", function () {
        message.textContent = "Молодец, так держать, друг! 👏👏👏";
        buttons.style.display = "none";

        for (let i = 0; i < 5; i++) {
            fireworks.push(new Firework(
                Math.random() * canvas.width,
                Math.random() * canvas.height / 2
            ));
        }
    });

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});