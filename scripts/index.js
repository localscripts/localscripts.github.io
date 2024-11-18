const typeList = {
    "windows": "Windows",
    "macos": "MacOS",
    "android": "Android",
    "key": "Has a Key System",
    "ios": "iOS",
    "server": "Serversided"
};

const wrapper = document.getElementById('cards-align');

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

    // Fetch JSON and generate cards
    fetch("scripts/index.json")
        .then(res => res.json())
        .then(cards => {
            wrapper.innerHTML = ''; // Clear any existing cards

            cards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');

                // Apply glow effect if "glow" is specified
                if (card.glow) {
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
                const pros = card.pros.map(pro => `<li>${pro}</li>`).join('');
                const neutral = card.neutral.map(item => `<li>${item}</li>`).join('');
                const cons = card.cons.map(con => `<li>${con}</li>`).join('');

                // Define button text or default
                const buttonText = card.buttonText || 'View';

                // Handle additional Buy Now button if `buylink` and `buytext` are present
                const buyLink = card.buylink ? ` 
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
                        <h3 class="card-title">${card.name}</h3>
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

                // Add glow outline and text color to Buy Now button if "glow" exists
                if (card.glow && card.buylink) {
                    const buyButton = cardElement.querySelector('.card-button.right');
                    buyButton.style.border = `2px solid ${card.glow}`;
                    buyButton.style.boxShadow = `0 0 5px ${card.glow}, 0 0 10px ${card.glow}`;
                    buyButton.style.color = card.glow; // Change text color to glow color
                }

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
        });
});
