const canvas = document.getElementById('particle-container');

const month = new Date().getMonth();
const winterMonths = [10, 11, 0]; 
const valentineMonth = 2; 

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
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
            opacity: 0.7 + Math.random() * 0.3
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        images.forEach(image => {
            if (!image.img.complete) return;

            image.x -= image.dx;
            image.y -= image.dy;
            image.rotation += image.rotationSpeed;

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

            ctx.save();
            ctx.globalAlpha = image.opacity;
            ctx.translate(image.x + image.size/2, image.y + image.size/2);
            ctx.rotate(image.rotation * Math.PI / 180);
            ctx.drawImage(image.img, -image.size/2, -image.size/2, image.size, image.size);
            ctx.restore();
        });
        requestAnimationFrame(animate);
    }
} else {
    canvas.remove();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    const fadeElements = document.querySelectorAll('.card, #notification, .blog-post');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    const typeHolders = document.querySelectorAll('.type-holder');
    typeHolders.forEach(holder => {
        const tooltip = holder.querySelector('.tooltip');
        if (tooltip) {
            holder.addEventListener('mouseenter', () => {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
            });
            
            holder.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(10px)';
                setTimeout(() => {
                    if (tooltip.style.opacity === '0') {
                        tooltip.style.visibility = 'hidden';
                    }
                }, 300);
            });
        }
    });
    
    const notification = document.getElementById('notification');
    if (notification) {
        let pulseTimeout;
        
        const startPulse = () => {
            notification.style.transform = 'translateY(-5px)';
            notification.style.boxShadow = '0 8px 30px rgba(179, 38, 36, 0.15)';
            
            pulseTimeout = setTimeout(() => {
                notification.style.transform = 'translateY(0)';
                notification.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                
                setTimeout(startPulse, 5000);
            }, 1000);
        };
        
        setTimeout(startPulse, 3000);
        
        notification.addEventListener('mouseenter', () => {
            clearTimeout(pulseTimeout);
            notification.style.transform = 'translateY(-5px)';
            notification.style.boxShadow = '0 8px 30px rgba(179, 38, 36, 0.15)';
        });
        
        notification.addEventListener('mouseleave', () => {
            notification.style.transform = 'translateY(0)';
            notification.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            setTimeout(startPulse, 5000);
        });
    }
});