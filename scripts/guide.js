document.addEventListener('DOMContentLoaded', () => {
    // Load Blog Posts from JSON
    const loadBlogPosts = () => {
        return fetch('scripts/guide.json') // Adjust the path if necessary
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text(); // Get the response as text first
            })
            .then(text => {
                if (text.trim() === '') {
                    throw new Error('Received empty response from JSON.');
                }
                return JSON.parse(text); // Parse the text as JSON
            })
            .then(posts => {
                const blogPostsWrapper = document.getElementById('blog-posts-wrapper');
                blogPostsWrapper.innerHTML = ''; // Clear existing posts

                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('blog-post');

                    postElement.innerHTML = `
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-meta">By ${post.author} on ${post.date}</p>
                        <div class="post-content">${post.content}</div>
                    `;
                    
                    blogPostsWrapper.appendChild(postElement);
                });
            })
            .catch(error => {
                console.error('Error loading blog posts:', error);
            });
    };

    // Load blog posts after the page content is loaded
    loadBlogPosts();

    // Navbar functionality (Hamburger menu toggle)
    const mi = document.getElementById("menu-icon");
    const ml = document.getElementById("menu-list");

    if (mi && ml) {
        // Clone the menu list and add a blurred version for mobile view
        let mb = ml.cloneNode(true);
        mb.removeAttribute('id');
        mb.classList = "";
        mb.classList.add("menu-blur");
        ml.parentNode.parentNode.after(mb);

        // Toggle the menu on hamburger click
        mi.addEventListener("click", function () {
            mi.classList.toggle("opened");
            mb.classList.toggle("show");
        });
    }

    // Canvas particle effect for December (snowflake effect)
    const canvas = document.getElementById('particle-container');
    if (new Date().getMonth() === 10) { // 11 = December
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

        for (let i = 0; i < numImages; i++) {
            const img = new Image();
            img.src = imageSrc;
            images.push({
                img: img,
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
    } else {
        canvas.remove();
    }
});
