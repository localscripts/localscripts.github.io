document.addEventListener('DOMContentLoaded', () => {
    // Load head
    fetch('components/scripts/HTML/head.html') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.head.innerHTML += data; // Append the fetched content to the head
        })
        .catch(error => {
            console.error('Error loading head:', error);
        });
  
    // Load navbar
    fetch('components/scripts/HTML/navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
  
            // Add toggle functionality for the mobile menu
            const menuToggle = document.querySelector('.menu-toggle');
            const mobileMenuItems = document.querySelector('.mobile-menu-items');
            if (menuToggle && mobileMenuItems) {
                menuToggle.addEventListener('click', () => {
                    mobileMenuItems.classList.toggle('open');
                });
            }
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
  
    // Fetch card data from roblox.json file
    fetch('components/scripts/JSON/roblox.json') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cardsData => {
            const cardsWrapper = document.getElementById('cards-wrapper');
            // Clear any existing cards
            cardsWrapper.innerHTML = '';
  
            // Loop through each card and generate the HTML structure
            cardsData.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card-container');
  
                // Generate images HTML with a wrapper
                const imagesHtml = card.images.map(img => `<img src="${img}" alt="${card.name} Image" class="card-image">`).join('');
  
                // Generate sections HTML for pros, cons, and neutral
                const prosHtml = card.pros.map(pro => `<li>${pro}</li>`).join('');
                const consHtml = card.cons.map(con => `<li>${con}</li>`).join('');
                const neutralHtml = card.neutral.length > 0
                    ? `<div class="section neutral">
                          <h4 class="section-title">Neutral</h4>
                          <ul>${card.neutral.map(neutral => `<li>${neutral}</li>`).join('')}</ul>
                      </div>`
                    : '';
  
                // Set custom button text or default to "Get it Now"
                const buttonText = card.buttonText || 'Get it Now';
  
                // Build the card HTML with conditional sections and buttons
                const cardHtml = `
                    <div class="card-images">
                        ${imagesHtml}
                    </div>
                    <h3 class="card-header">${card.name}</h3>
                    <div class="card-content">
                        ${prosHtml ? `<div class="section pros">
                            <h4 class="section-title">Pros</h4>
                            <ul>${prosHtml}</ul>
                        </div>` : ''}
                        ${neutralHtml}
                        ${consHtml ? `<div class="section cons">
                            <h4 class="section-title">Cons</h4>
                            <ul>${consHtml}</ul>
                        </div>` : ''}
                    </div>
                    <div class="card-footer">
                        <div class="card-footer-buttons">
                            <a href="${card.link}" class="card-button red-button" target="_blank" rel="noopener noreferrer">${buttonText}</a>
                            ${card.bloxproducts ? `<a href="https://bloxproducts.com/#f${card.bloxproducts}" class="card-button bloxproducts-button" target="_blank" rel="noopener noreferrer">${card.bloxButtonText || 'View on BloxProducts'}</a>` : ''}
                        </div>
                    </div>
                `;
  
                cardElement.innerHTML = cardHtml;
                cardsWrapper.appendChild(cardElement);
            });
        })
        .catch(error => {
            console.error('Error fetching card data:', error);
        });
  
    // Load footer
    fetch('components/scripts/HTML/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
  });
  
