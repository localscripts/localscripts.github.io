const canvas = document.getElementById('particle-container');

// Define winter months: November (10), December (11), January (0)
const winterMonths = [10, 11, 0]; // November, December, January

if (winterMonths.includes(new Date().getMonth())) {
    const ctx = canvas.getContext('2d');

    // Resize the canvas to fit the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight > 500 ? window.innerHeight : 500;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const numImages = 16; // Number of snowflakes
    const images = [];
    const imageSrc = '/assets/snowflake.svg'; // Path to the snowflake image

    // Create and initialize snowflakes
    for (let i = 0; i < numImages; i++) {
        const img = new Image();
        img.src = imageSrc;
        images.push({
            img: img,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height + 30,
            dx: 0.25,
            dy: -(0.5 + Math.random() / 2) / (30 / 100),
            size: 10 + Math.random() * 20, // Random size for each snowflake
        });
    }

    // Function to animate the snowflakes
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        images.forEach(image => {
            image.x -= image.dx; // Move snowflake horizontally
            image.y -= image.dy; // Move snowflake vertically

            // If snowflake goes off the left or right, reset its position
            if (image.x < 0 - image.size || image.x > canvas.width + image.size) {
                image.y = canvas.height + 30;
                image.x = Math.random() * canvas.width;
                image.dy = -(0.5 + Math.random() / 2) / (30 / 100);
            }

            // If snowflake goes off the bottom, reset its position
            if (image.y > canvas.height) {
                image.y = 0;
                image.x = Math.random() * canvas.width;
                image.dy = -(0.5 + Math.random() / 2) / (30 / 100);
            }

            // Draw the snowflake
            ctx.drawImage(image.img, image.x, image.y, image.size, image.size);
        });
        requestAnimationFrame(animate); // Repeat animation
    }

    animate();
} else {
    // Remove the canvas if it's not winter months
    canvas.remove();
}
