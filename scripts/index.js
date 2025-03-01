const currentDate = new Date();
const currentDay = currentDate.getDay();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let protectedLinks = true;

const protectedDays = [0, 1, 2, 3, 4, 5, 6];

const tableData = days.map((day, index) => ({
    Day: day,
    "Day Number": index,
    "Protected Links": protectedDays.includes(index) ? "✅ Enabled" : "❌ Disabled"
}));

console.table(tableData);

if (protectedDays.includes(currentDay)) {
    protectedLinks = true;
    console.log(`🔒 Protected links enabled because today is ${days[currentDay]}.`);
    console.log('🔰 Current state: ' + protectedLinks)
} else {
    protectedLinks = false;
    console.log(`🔓 Protected links disabled because today is ${days[currentDay]}.`);
    console.log('🔰 Current state: ' + protectedLinks)
}

const typeList = {
    "windows": "Windows",
    "macos": "MacOS",
    "android": "Android",
    "key": "Has a Key System",
    "ios": "iOS",
    "server": "Serversided",
    "unc": "UNC and sUNC tested by voxlis.NET"
};

const wrapper = document.getElementById('cards-align');

if (!wrapper) {
    console.error("Error: Element with ID 'cards-align' not found.");
}

function hyperlinkContent(content, type) {
    const replacements = [
        { word: 'UNC', url: 'https://www.reddit.com/r/robloxhackers/comments/1he474r/what_are_the_difference_between_sunc_and_unc/' },
        { word: 'sUNC', url: 'https://www.reddit.com/r/robloxhackers/comments/1he474r/what_are_the_difference_between_sunc_and_unc/' },
        { word: 'Level', url: 'https://roblox.fandom.com/wiki/Security_context' },
        { word: 'decompiler', url: 'https://www.reddit.com/r/explainlikeimfive/comments/xe2fvf/comment/ioeez4k/' }
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
                wrapper.innerHTML = ''; 

                cards.forEach((card, index) => {
                    if (card.hide) return;

                    const cardElement = document.createElement('div');
                    cardElement.classList.add('card');
                    cardElement.style.animationDelay = `${0.1 * (index % 10)}s`;

                    const now = new Date();
                    const expires = card.expires ? new Date(card.expires) : null;
                    const isExpired = expires && now > expires;

                    if (!isExpired) {
                        if (card.outline) {
                            cardElement.style.borderColor = card.outline;
                        }
                    
                        if (card.glow) {
                            cardElement.style.boxShadow = `0 0 10px ${card.glow}, 0 0 15px ${card.glow}, 0 0 0px ${card.glow}`;
                            cardElement.style.borderColor = card.glow;
                        }
                    }
                    
                    const cardLink = protectedLinks && card.linkprotected ? card.linkprotected : card.link;

                    const types = card.types.map(type => `
                        <div class="type-holder">
                            <img class="unselectable card-type" src="./assets/${type}.png" alt="${typeList[type]}">
                            <div class="tooltip">${typeList[type]}</div>
                        </div>
                    `).join('');

                    const pros = card.pros.map(pro => `<li>${hyperlinkContent(pro, 'pros')}</li>`).join('');
                    const neutral = card.neutral.map(item => `<li>${hyperlinkContent(item, 'neutral')}</li>`).join('');
                    const cons = card.cons.map(con => `<li>${hyperlinkContent(con, 'cons')}</li>`).join('');

                    const buttonText = isExpired ? (card.buytext || 'View') : (card.buttonText || 'View');

                    const buyLink = card.buylink && !isExpired ? `
                        <a href="${card.buylink}" class="card-button right buylink" target="_blank" rel="noopener noreferrer">${card.buytext || 'Buy Now'}</a>
                    ` : '';

                    const uncLink = card.unc ? `
                        <a href="${card.unc}" class="unc-btn" target="_blank" rel="noopener noreferrer">
                            <img class="unselectable unc-img" src="./assets/glow-unc.png" alt="UNC Test Results">
                        </a>
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
                                <a href="${cardLink}" class="card-button left ${buyLink === '' ? 'rounded-btn' : ''}" target="_blank" rel="noopener noreferrer">${buttonText}</a>
                                ${buyLink}
                                ${uncLink}
                            </div>
                            ${lastEditedBy}
                        </div>
                    `;

                    cardElement.innerHTML = html;
                    wrapper.appendChild(cardElement);

                    const buttons = cardElement.querySelectorAll('.card-button');
                    buttons.forEach(button => {
                        button.innerHTML = button.innerHTML.replace(/\b(weekly|monthly|lifetime)\b/gi, (match) => {
                            let colorClass = '';
                    
                            if (button.classList.contains('pros')) {
                                colorClass = 'pros-small-text-card';
                            } else if (button.classList.contains('cons')) {
                                colorClass = 'cons-small-text-card';
                            } else if (button.classList.contains('neutral')) {
                                colorClass = 'neutral-small-text-card';
                            }
                    
                            return `<span class="small-text-card ${colorClass}">${match}</span>`;
                        });
                    });
                    
                    const buyButton = cardElement.querySelector('.card-button.right.buylink');
                    if (buyButton && !isExpired) {
                        if (card.outline) {
                            buyButton.style.borderColor = card.outline;
                        }
                        if (buyButton && card.outline && !isExpired) {
                            const color = card.outline;
                        
                            buyButton.style.borderColor = color;
                            buyButton.style.color = color;
                            buyButton.style.backgroundColor = 'transparent';
                        
                            buyButton.addEventListener('mouseover', () => {
                                buyButton.style.backgroundColor = color;
                                buyButton.style.color = 'var(--text-color)';
                            });
                        
                            buyButton.addEventListener('mouseout', () => {
                                buyButton.style.backgroundColor = 'transparent';
                                buyButton.style.color = color;
                            });
                        }
                        
                        if (card.glow) {
                            buyButton.style.boxShadow = `0 0 10px ${card.glow}, 0 0 15px ${card.glow}, 0 0 5px ${card.glow}`;
                            buyButton.style.borderColor = card.glow;
                            buyButton.style.color = card.glow;
                    
                            buyButton.addEventListener('mouseover', () => {
                                buyButton.style.boxShadow = `0 0 15px ${card.glow}, 0 0 20px ${card.glow}, 0 0 10px ${card.glow}`;
                                buyButton.style.color = card.glowTextHoverColor || 'var(--text-color)';
                                buyButton.style.backgroundColor = card.glow;
                            });
                    
                            buyButton.addEventListener('mouseout', () => {
                                buyButton.style.boxShadow = `0 0 10px ${card.glow}, 0 0 15px ${card.glow}, 0 0 5px ${card.glow}`;
                                buyButton.style.color = card.glow;
                                buyButton.style.backgroundColor = '';
                            });
                        }
                    }

                    if (card.warning) {
                        const warningText = card.warningText || "⚠️ **DANGER**: THIS EXPLOIT IS **UNVERIFIED** BY voxlis.NET. INSTALLING SOFTWARE FROM THIS SOURCE IS HIGHLY **RISKY** AND MAY INFECT YOUR DEVICE WITH **MALWARE OR VIRUSES**. PROCEED AT YOUR OWN RISK. ⚠️"
                        const buttons = cardElement.querySelectorAll('.card-button');

                        buttons.forEach(button => {
                            button.addEventListener('click', (e) => {
                                e.preventDefault();
                                if (confirm(warningText)) {
                                    const url = button.getAttribute('href');
                                    if (url) {
                                        window.open(url, '_blank');
                                    }
                                }
                            });
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
        
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            observer.observe(card);
        });
    }, 100);
});

(function() {
    const originalLog = console.log;

    console.log = function(...args) {
        const style = 'color: #fff; background-color: #007bff; font-weight: bold; padding: 2px 5px; border-radius: 4px;';

        if (args.includes('printLinks')) {
            fetch("scripts/index.json")
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(cards => {
                    cards.forEach(card => {
                        if (card.link) {
                            originalLog(`%cName: ${card.name}`, style);
                            originalLog(`%cLink: ${card.link}`, style);
                        }
                    });
                })
                .catch(err => {
                    originalLog("Error loading JSON:", err);
                });
        } else {
            originalLog(...args);
        }
    };

    window.unpack = function() {
        const style = 'color: #fff; background-color:rgb(0, 0, 0); font-weight: bold; padding: 2px 5px; border-radius: 4px;';
        fetch("scripts/index.json")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(cards => {
                const keys = Object.keys(cards[0]);
                originalLog("%cAvailable keys for selection:", style);
                keys.forEach((key, index) => {
                    originalLog(`%c${index + 1}: ${key}`, style);
                });

                const selectedIndex = prompt(`Enter the number of the key you want to view (1 to ${keys.length}):`);
                const selectedKey = keys[parseInt(selectedIndex) - 1];

                if (selectedKey) {
                    originalLog(`%cShowing values for key: ${selectedKey}`, style);
                    cards.forEach(card => {
                        if (card[selectedKey] !== undefined) {
                            originalLog(`%cName: ${card.name}`, style);
                            originalLog(`%c${selectedKey}: ${card[selectedKey]}`, style);
                        }
                    });
                } else {
                    originalLog("Invalid selection.");
                }
            })
            .catch(err => {
                originalLog("Error loading JSON:", err);
            });
    };

    console.log('%c✅ unpack() function is active', 'color: green; font-weight: bold;');
})();