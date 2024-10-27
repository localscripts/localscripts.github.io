document.addEventListener('DOMContentLoaded', () => {
    // Load CSS
    const loadCSS = (href) => {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Could not load CSS: ${href}`));
            document.head.appendChild(link);
        });
    };

    // Load HTML
    const loadHTML = (url, targetElementId) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(targetElementId).innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading HTML:', error);
            });
    };

    // Load Blog Posts from JSON
    const loadBlogPosts = () => {
        return fetch('components/scripts/JSON/guide.json') // Adjust the path if necessary
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

    // Array of CSS files to load
    const cssFiles = [
        'components/scripts/CSS/navbar.css',
        'components/scripts/CSS/styles.css',
        'components/scripts/CSS/footer.css',
        'components/scripts/CSS/guide.css',
    ];

    // Array of HTML files to load
    const htmlFiles = [
        { url: 'components/scripts/HTML/navbar.html', targetId: 'navbar' },
        { url: 'components/scripts/HTML/footer.html', targetId: 'footer' }, // Ensure you have an element with id="footer" in your HTML
    ];

    // Load all CSS files
    Promise.all(cssFiles.map(loadCSS))
        .then(() => {
            console.log('All CSS files loaded successfully.');
            // Load all HTML files after CSS is loaded
            return Promise.all(htmlFiles.map(file => loadHTML(file.url, file.targetId)));
        })
        .then(() => {
            console.log('All HTML files loaded successfully.');
            // Load blog posts after HTML is loaded
            return loadBlogPosts();
        })
        .catch(error => {
            console.error('Error loading CSS or HTML:', error);
        });
});
