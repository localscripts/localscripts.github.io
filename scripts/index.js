const typeList = {
    "windows": "Windows",
    "macos": "MacOS",
    "android": "Android",
    "key": "Has a Key System",
    "ios": "iOS",
    "server": "Serversided"
};

const wrapper = document.getElementById('cards-align');

// Utility function to replace words with hyperlinks and style the whole line
function hyperlinkContent(content, type) {
    // Define the words to replace and their associated URLs
    const replacements = [
        { word: 'UNC', url: 'https://github.com/unified-naming-convention/NamingStandard?tab=readme-ov-file#unified-naming-convention' },
        { word: 'sUNC', url: 'https://discord.gg/MAymEszyaK' },
        { word: 'Level', url: 'https://roblox.fandom.com/wiki/Security_context' },
        { word: 'decompiler', url: 'https://www.reddit.com/r/explainlikeimfive/comments/xe2fvf/comment/ioeez4k/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button' }
    ];

    // Define colors based on type
    const typeColors = {
        pros: '#ffffff ', // Green for pros
        neutral: '#ffffff', // Yellow for neutral
        cons: '#ffffff' // Red for cons
    };

    // Get the color based on type
    const color = typeColors[type] || '#e8e8e8'; // Default to gray if type is not specified

    // Wrap the whole line containing the word in a styled hyperlink
    replacements.forEach(({ word, url }) => {
        const regex = new RegExp(`^(.*?\\b${word}\\b.*)$`, 'gm'); // Match the entire line containing the word
        content = content.replace(regex, `<a href="${url}" target="_blank" style="color: ${color}; text-decoration: none; display: block;">$1</a>`);
    });

    return content;
}



document.addEventListener("DOMContentLoaded", () => {
    const mi = document.getElementById("menu-icon");
    const ml = document.getElementById("menu-list");

    let mb = ml.cloneNode(true);
    mb.removeAttribute('id');
    mb.classList = "";
    mb.classList.add("menu-blur");
    ml.parentNode.parentNode.after(mb);

    mi.addEventListener("click", function () {
        mi.classList.toggle("opened"), mb.classList.toggle("show");
    });

    fetch("scripts/index.json")
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(cards => {
            wrapper.innerHTML = ''; // Clear any existing cards

            cards.forEach(card => {
                // If card has "hide" set to true, skip rendering it
                if (card.hide) {
                    return; // Skip this card
                }

                const cardElement = document.createElement('div');
                cardElement.classList.add('card');

                // Check if the card is expired
                const now = new Date();
                const expires = card.expires ? new Date(card.expires) : null;
                const isExpired = expires && now > expires;

                // Apply glow effect if "glow" is specified and the card is not expired
                if (card.glow && !isExpired) {
                    cardElement.style.boxShadow = `0 0 10px ${card.glow}, 0 0 15px ${card.glow}, 0 0 0px ${card.glow}`;
                    cardElement.style.borderColor = card.glow; // Optional: change border color to match
                }

                // Map types and generate icons
                const types = card.types.map(type => ` 
                    <div class="type-holder">
                        <img class="unselectable card-type" src="./assets/${type}.png" alt="">
                        <div class="unselectable tooltip">${typeList[type]}</div>
                    </div>
                `).join('');

                // Generate HTML for pros, cons, and neutral sections
                const pros = card.pros.map(pro => `<li>${hyperlinkContent(pro, 'pros')}</li>`).join('');
                const neutral = card.neutral.map(item => `<li>${hyperlinkContent(item, 'neutral')}</li>`).join('');
                const cons = card.cons.map(con => `<li>${hyperlinkContent(con, 'cons')}</li>`).join('');

                // Define button text based on expiration
                const buttonText = isExpired ? (card.buytext || 'View') : (card.buttonText || 'View');

                // Handle additional Buy Now button if `buylink` and `buytext` are present and not expired
                const buyLink = card.buylink && !isExpired ? ` 
                    <a href="${card.buylink}" class="card-button right" target="_blank" rel="noopener noreferrer">${card.buytext || 'Buy Now'}</a>
                ` : '';

                // Last edited by section
                const lastEditedBy = card.lastEditedBy ? ` 
                    <div class="last-edited">
                        <p>Last edited by <span class="editor-name">${card.lastEditedBy}</span></p>
                        <img src="${card.lastEditedByImage}" alt="Editor avatar" width="20" height="20">
                    </div>
                ` : '';

                const html = `
                    <div class="card-info">
                        <div class="card-types">${types}</div>
                        <h3 class="card-title">${hyperlinkContent(card.name)}</h3>
                    </div>
                    <div class="card-content">
                        ${pros ? `<div class="section pros">
                            <h4 class="section-title">Pros</h4>
                            <ul>${pros}</ul>
                        </div>` : ''}
                        ${neutral ? `<div class="section neutral">
                            <h4 class="section-title">Neutral</h4>
                            <ul>${neutral}</ul>
                        </div>` : ''}
                        ${cons ? `<div class="section cons">
                            <h4 class="section-title">Cons</h4>
                            <ul>${cons}</ul>
                        </div>` : ''}
                    </div>
                    <div class="card-footer">
                        <div class="button-wrapper">
                            <a href="${card.link}" class="card-button left" target="_blank" rel="noopener noreferrer">${buttonText}</a>
                            ${buyLink} <!-- Add the buy button if the buy link exists -->
                        </div>
                        ${lastEditedBy}
                    </div>
                `;

                cardElement.innerHTML = html;
                wrapper.appendChild(cardElement);

                // Add warning popup for button if "warning" is true
                if (card.warning) {
                    const viewButton = cardElement.querySelector('.card-button.left');
                    viewButton.addEventListener('click', (e) => {
                        e.preventDefault(); // Prevent default redirection

                        if (confirm("⚠️ **DANGER**: THIS EXPLOIT IS **UNVERIFIED** BY voxlis.NET. INSTALLING SOFTWARE FROM THIS SOURCE IS HIGHLY **RISKY** AND MAY INFECT YOUR DEVICE WITH **MALWARE OR VIRUSES**. PROCEED AT YOUR OWN RISK. ⚠️")) {
                            window.open(card.link, '_blank'); // Open link if confirmed
                        }
                    });
                }
            });
        })
        .catch(err => {
            // Display error message and fail GIF on the page
            wrapper.innerHTML = `
                <div class="error">
                    An error occurred while loading the cards: ${err.message}
                </div>
                <img src="assets/fail.gif" alt="Error" class="error-gif">
            `;
            console.error("Error loading JSON:", err);
        });
});
