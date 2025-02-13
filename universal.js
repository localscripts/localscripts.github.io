const canvas = document.getElementById('particle-container');

const month = new Date().getMonth();
const winterMonths = [10, 11, 0]; 
const valentineMonth = 1; 

let imageSrc = '';
let fallSpeedMultiplier = 1; 

if (winterMonths.includes(month)) {
    imageSrc = '/assets/snowflake.svg';
} else if (month === valentineMonth) {
    imageSrc = '/assets/heart.svg';
    fallSpeedMultiplier = 0.5; 
}

if (imageSrc) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight > 500 ? window.innerHeight : 500;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const numImages = 16; 
    const images = [];
    let loadedImages = 0;

    for (let i = 0; i < numImages; i++) {
        const img = new Image();
        img.src = imageSrc;

        img.onload = function () {
            loadedImages++;
            if (loadedImages === numImages) {
                animate();
            }
        };

        img.onerror = function () {
            console.error(`Failed to load image: ${imageSrc}`);
        };

        images.push({
            img: img,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height + 30,
            dx: 0.25, 
            dy: (-(0.5 + Math.random() / 2) / (30 / 100)) * fallSpeedMultiplier, 
            size: 10 + Math.random() * 20, 
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        images.forEach(image => {
            if (!image.img.complete) return; 

            image.x -= image.dx; 
            image.y -= image.dy; 

            if (image.x < 0 - image.size || image.x > canvas.width + image.size) {
                image.y = canvas.height + 30;
                image.x = Math.random() * canvas.width;
                image.dy = (-(0.5 + Math.random() / 2) / (30 / 100)) * fallSpeedMultiplier;
            }

            if (image.y > canvas.height) {
                image.y = 0;
                image.x = Math.random() * canvas.width;
                image.dy = (-(0.5 + Math.random() / 2) / (30 / 100)) * fallSpeedMultiplier;
            }

            ctx.drawImage(image.img, image.x, image.y, image.size, image.size);
        });
        requestAnimationFrame(animate); 
    }
} else {
    canvas.remove();
}
