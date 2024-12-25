const typeList = {
    "windows": "Windows",
    "macos": "MacOS",
    "android": "Android",
    "key": "Has a Key System",
    "ios": "iOS",
    "server": "Serversided",
    "unc": "UNC and sUNC tested by voxlis.NET" // UNC comes before sUNC because sUNC is a subset of UNC
};

// Ensure the wrapper is defined
const wrapper = document.getElementById('cards-align');

if (!wrapper) {
    console.error("Error: Element with ID 'cards-align' not found.");
}

function hyperlinkContent(content, type) {
    const replacements = [
        { word: 'UNC', url: 'https://www.reddit.com/r/robloxhackers/comments/1he474r/what_are_the_difference_between_sunc_and_unc/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button' },
        { word: 'sUNC', url: 'https://www.reddit.com/r/robloxhackers/comments/1he474r/what_are_the_difference_between_sunc_and_unc/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button' },
        { word: 'Level', url: 'https://roblox.fandom.com/wiki/Security_context' },
        { word: 'decompiler', url: 'https://www.reddit.com/r/explainlikeimfive/comments/xe2fvf/comment/ioeez4k/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button' }
    ];

    const typeColors = {
        pros: '#ffffff',
        neutral: '#ffffff',
        cons: '#ffffff'
    };

    const color = typeColors[type] || '#e8e8e8';

    replacements.forEach(({ word, url }) => {
        const regex = new RegExp(`^(.*?\\b${word}\\b.*)$`, 'gm');
        content = content.replace(regex, `<a href="${url}" target="_blank" style="color: ${color}; text-decoration: none; display: block;">$1</a>`);
    });

    // Add styling for text inside square brackets
    content = content.replace(/\[(.*?)\]/g, '<span class="small-text">[$1]</span>');

    return content;
}

document.addEventListener("DOMContentLoaded", () => {
    const mi = document.getElementById("menu-icon");
    const ml = document.getElementById("menu-list");

    if (mi && ml) {
        let mb = ml.cloneNode(true);
        mb.removeAttribute('id');
        mb.classList = "";
        mb.classList.add("menu-blur");
        ml.parentNode.parentNode.after(mb);

        mi.addEventListener("click", function () {
            mi.classList.toggle("opened");
            mb.classList.toggle("show");
        });
    } else {
        console.warn("Menu icon or menu list not found.");
    }

    fetch("scripts/index.json")
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(cards => {
            if (wrapper) {
                wrapper.innerHTML = ''; // Clear any existing cards

                cards.forEach(card => {
                    if (card.hide) return;

                    const cardElement = document.createElement('div');
                    cardElement.classList.add('card');

                    const now = new Date();
                    const expires = card.expires ? new Date(card.expires) : null;
                    const isExpired = expires && now > expires;

                    // Apply glow to the card
                    if (card.glow && !isExpired) {
                        cardElement.style.boxShadow = `0 0 10px ${card.glow}, 0 0 15px ${card.glow}, 0 0 0px ${card.glow}`;
                        cardElement.style.borderColor = card.glow;
                    }

                    const types = card.types.map(type => `
                        <div class="type-holder">
                            <img class="unselectable card-type" src="./assets/${type}.png" alt="">
                            <div class="unselectable tooltip">${typeList[type]}</div>
                        </div>
                    `).join('');

                    const pros = card.pros.map(pro => `<li>${hyperlinkContent(pro, 'pros')}</li>`).join('');
                    const neutral = card.neutral.map(item => `<li>${hyperlinkContent(item, 'neutral')}</li>`).join('');
                    const cons = card.cons.map(con => `<li>${hyperlinkContent(con, 'cons')}</li>`).join('');

                    const buttonText = isExpired ? (card.buytext || 'View') : (card.buttonText || 'View');

                    const buyLink = card.buylink && !isExpired ? `
                        <a href="${card.buylink}" class="card-button right buylink" target="_blank" rel="noopener noreferrer">${card.buytext || 'Buy Now'}</a>
                    ` : '';

                    const uncLink = card.unc ? `<a href="${card.unc}" class="unc-btn" target="_blank" rel="noopener noreferrer"><img class="unselectable unc-img" src="./assets/unc.png" alt=""></a>
                    ` : '';

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
                            ${pros ? `<div class="section pros"><h4 class="section-title">Pros</h4><ul>${pros}</ul></div>` : ''}
                            ${neutral ? `<div class="section neutral"><h4 class="section-title">Neutral</h4><ul>${neutral}</ul></div>` : ''}
                            ${cons ? `<div class="section cons"><h4 class="section-title">Cons</h4><ul>${cons}</ul></div>` : ''}
                        </div>
                        <div class="card-footer">
                            <div class="button-wrapper">
                                <a href="${card.link}" class="card-button left ${buyLink === '' ? 'rounded-btn' : ''}" target="_blank" rel="noopener noreferrer">${buttonText}</a>
                                ${buyLink}
                                ${uncLink}
                            </div>
                            ${lastEditedBy}
                        </div>
                    `;

                    cardElement.innerHTML = html;
                    wrapper.appendChild(cardElement);

                    // Apply glow and text color to the "Buy Now" button
                    const buyButton = cardElement.querySelector('.card-button.right.buylink');
                    if (buyButton && card.glow && !isExpired) {
                        // Set the initial glow effect on the Buy Now button
                        buyButton.style.boxShadow = `0 0 10px ${card.glow}, 0 0 15px ${card.glow}, 0 0 5px ${card.glow}`;
                        buyButton.style.borderColor = card.glow;
                        buyButton.style.color = card.glow; // Set text color to the glow color
                    
                        // Ensure hover changes the background color to the glow color and makes the text readable
                        buyButton.addEventListener('mouseover', () => {
                            buyButton.style.boxShadow = `0 0 10px ${card.glow}, 0 0 15px ${card.glow}, 0 0 5px ${card.glow}`;
                            buyButton.style.color = '#ffffff'; // Set text color to white on hover for contrast
                            buyButton.style.backgroundColor = card.glow; // Set background color on hover
                        });
                    
                        buyButton.addEventListener('mouseout', () => {
                            buyButton.style.boxShadow = `0 0 10px ${card.glow}, 0 0 15px ${card.glow}, 0 0 5px ${card.glow}`;
                            buyButton.style.color = card.glow; // Reset text color to glow color
                            buyButton.style.backgroundColor = ''; // Reset background color after hover
                        });
                    }
                    
                    

                    if (card.warning) {
                        const viewButton = cardElement.querySelector('.card-button.left');
                        viewButton.addEventListener('click', (e) => {
                            e.preventDefault();

                            if (confirm("⚠️ **DANGER**: THIS EXPLOIT IS **UNVERIFIED** BY voxlis.NET. INSTALLING SOFTWARE FROM THIS SOURCE IS HIGHLY **RISKY** AND MAY INFECT YOUR DEVICE WITH **MALWARE OR VIRUSES**. PROCEED AT YOUR OWN RISK. ⚠️")) {
                                window.open(card.link, '_blank');
                            }
                        });
                    }
                });
            }
        })
        .catch(err => {
            if (wrapper) {
                wrapper.innerHTML = `
                    <div class="error">
                        An error occurred while loading the cards: ${err.message}
                    </div>
                    <img src="assets/fail.gif" alt="Error" class="error-gif">
                `;
            }
            console.error("Error loading JSON:", err);
        });
});
