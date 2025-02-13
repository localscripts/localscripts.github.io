// put themes here and add them to the themes array
const themes = [
    {
        name: "Default",
        author: "Voxlis.net"
    },
    {
        name: "Purple",
        author: "sk337"
    }
]

const themeNames= themes.map(t => t.name);

let theme = localStorage.getItem('theme') || themes[0].name;

if (!themeNames.includes(theme)) {
    console.error(`Theme ${theme} not found.`);
    theme = themes[0].name;
}

function updateTheme(theme) {
    if (!themeNames.includes(theme)) {
        console.error(`Theme ${theme} not found.`);
        return;
    }
    themeNames.forEach(t => document.body.classList.remove(t));
    document.body.className = theme.toLowerCase();
    localStorage.setItem('theme', theme);
}

updateTheme(theme);

document.addEventListener("DOMContentLoaded", () => {
    // existing elements
    const menuList = document.getElementById('menu-list');

    
    // create theme selector
    const themeSelector = document.createElement('select');
    themeSelector.id = 'theme-selector';
    themeSelector.className = 'theme-selector';
    themes.map(theme => {
        const option = document.createElement('option');
        option.value = theme.name;
        option.text = `${theme.name} by ${theme.author}`;
        themeSelector.appendChild(option);
    })

    themeSelector.value = theme;

    // add event listener to theme selector
    themeSelector.addEventListener('change', () => {
        theme = themeSelector.value;
        updateTheme(theme);
    })

    const container = document.createElement('div');
    container.className = 'theme-selector-container';
    const text = document.createElement('span');
    text.className = 'theme-selector-text';
    text.textContent = 'Theme: ';
    container.appendChild(text);
    container.appendChild(themeSelector);

    menuList.appendChild(container);
})
