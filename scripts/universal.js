const canvas = document.getElementById('particle-container');

// Define months: Winter (November, December, January), Valentine (February)
const month = new Date().getMonth();
const winterMonths = [10, 11, 0]; // November, December, January
const valentineMonth = 1; // February

let imageSrc = '';
let fallSpeedMultiplier = 1; // Default speed

if (winterMonths.includes(month)) {
    imageSrc = '/assets/snowflake.svg';
} else if (month === valentineMonth) {
    imageSrc = '/assets/heart.svg';
    fallSpeedMultiplier = 0.5; // Slower fall for Valentine's
}

if (imageSrc) {
    const ctx = canvas.getContext('2d');

    // Resize the canvas to fit the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight > 500 ? window.innerHeight : 500;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const numImages = 16; // Number of particles
    const images = [];
    let loadedImages = 0;

    // Create and initialize particles
    for (let i = 0; i < numImages; i++) {
        const img = new Image();
        img.src = imageSrc;

        img.onload = function () {
            loadedImages++;
            if (loadedImages === numImages) {
                animate(); // Start animation only when all images are loaded
            }
        };

        img.onerror = function () {
            console.error(`Failed to load image: ${imageSrc}`);
        };

        images.push({
            img: img,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height + 30,
            dx: 0.25, // Horizontal movement
            dy: (-(0.5 + Math.random() / 2) / (30 / 100)) * fallSpeedMultiplier, // Adjusted vertical movement
            size: 10 + Math.random() * 20, // Random size for each particle
        });
    }

    // Function to animate the particles
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        images.forEach(image => {
            if (!image.img.complete) return; // Ensure the image is loaded

            image.x -= image.dx; // Move particle horizontally
            image.y -= image.dy; // Move particle vertically

            // If particle goes off the left or right, reset its position
            if (image.x < 0 - image.size || image.x > canvas.width + image.size) {
                image.y = canvas.height + 30;
                image.x = Math.random() * canvas.width;
                image.dy = (-(0.5 + Math.random() / 2) / (30 / 100)) * fallSpeedMultiplier;
            }

            // If particle goes off the bottom, reset its position
            if (image.y > canvas.height) {
                image.y = 0;
                image.x = Math.random() * canvas.width;
                image.dy = (-(0.5 + Math.random() / 2) / (30 / 100)) * fallSpeedMultiplier;
            }

            // Draw the particle
            ctx.drawImage(image.img, image.x, image.y, image.size, image.size);
        });
        requestAnimationFrame(animate); // Repeat animation
    }
} else {
    // Remove the canvas if it's not a valid month
    canvas.remove();
}
