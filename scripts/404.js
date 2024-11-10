// Canvas particle effect for December (snowflake effect)
const canvas = document.getElementById('particle-container');
if (new Date().getMonth() === 11) { // 11 = December
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight > 500 ? window.innerHeight : 500;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const numImages = 16;
    const images = [];
    const imageSrc = './assets/snowflake.svg';
    
    // Load image only once
    const snowflakeImage = new Image();
    snowflakeImage.src = imageSrc;

    snowflakeImage.onload = function() {
        // Once image is loaded, start creating the particles
        for (let i = 0; i < numImages; i++) {
            images.push({
                img: snowflakeImage,
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height + 30,
                dx: 0.25,
                dy: -(0.5 + Math.random() / 2) / (30 / 100),
                size: 10 + Math.random() * 20,
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            images.forEach(image => {
                image.x -= image.dx;
                image.y -= image.dy;

                // Reset position if off screen
                if (image.x < 0 - image.size || image.x > canvas.width + image.size) {
                    image.y = canvas.height + 30;
                    image.x = Math.random() * canvas.width;
                    image.dy = -(0.5 + Math.random() / 2) / (30 / 100);
                }
                if (image.y > canvas.height) {
                    image.y = 0;
                    image.x = Math.random() * canvas.width;
                    image.dy = -(0.5 + Math.random() / 2) / (30 / 100);
                }

                ctx.drawImage(image.img, image.x, image.y, image.size, image.size);
            });

            requestAnimationFrame(animate);
        }

        animate();
    };

} else {
    // Hide the canvas for non-December months
    canvas.style.display = 'none';
}
