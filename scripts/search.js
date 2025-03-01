document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.querySelector('.search-container');
    
    if (searchToggle) {
        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            searchContainer.classList.toggle('show');
            if (searchContainer.classList.contains('show')) {
                searchInput.focus();
            }
        });
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        let hasResults = false;
        
        cards.forEach(card => {
            const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const content = card.querySelector('.card-content')?.textContent.toLowerCase() || '';
            const types = Array.from(card.querySelectorAll('.tooltip')).map(t => t.textContent.toLowerCase()).join(' ');
            
            const isVisible = title.includes(searchTerm) || 
                            content.includes(searchTerm) || 
                            types.includes(searchTerm);
            
            if (isVisible) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease';
                hasResults = true;
            } else {
                card.style.display = 'none';
                card.style.animation = '';
            }
        });

        const cardsWrapper = document.getElementById('cards-wrapper');
        if (!hasResults && searchTerm !== '') {
            if (!document.getElementById('no-results')) {
                const noResults = document.createElement('div');
                noResults.id = 'no-results';
                noResults.style.textAlign = 'center';
                noResults.style.padding = '30px';
                noResults.style.width = '100%';
                noResults.style.animation = 'fadeIn 0.5s ease';
                noResults.innerHTML = `
                    <h3>No results found for "${searchTerm}"</h3>
                    <p>Try a different search term or browse all items.</p>
                `;
                cardsWrapper.appendChild(noResults);
            }
        } else {
            const noResults = document.getElementById('no-results');
            if (noResults) {
                noResults.remove();
            }
        }
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                performSearch();
            }
        });
    });

    const cardsContainer = document.getElementById('cards-align');
    if (cardsContainer) {
        observer.observe(cardsContainer, { childList: true, subtree: true });
    }

    searchInput.addEventListener('input', performSearch);

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            performSearch();
            if (searchContainer.classList.contains('show')) {
                searchContainer.classList.remove('show');
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchToggle) {
            return;
        }
        if (!searchContainer.contains(e.target) && !searchToggle.contains(e.target)) {
            searchContainer.classList.remove('show');
        }
    });
    
    const clearButton = document.createElement('button');
    clearButton.id = 'clear-search';
    clearButton.innerHTML = '&times;';
    clearButton.style.position = 'absolute';
    clearButton.style.right = '10px';
    clearButton.style.top = '50%';
    clearButton.style.transform = 'translateY(-50%)';
    clearButton.style.background = 'transparent';
    clearButton.style.border = 'none';
    clearButton.style.color = '#999';
    clearButton.style.fontSize = '18px';
    clearButton.style.cursor = 'pointer';
    clearButton.style.display = 'none';
    clearButton.style.transition = 'color 0.3s ease';
    
    clearButton.addEventListener('mouseover', () => {
        clearButton.style.color = '#fff';
    });
    
    clearButton.addEventListener('mouseout', () => {
        clearButton.style.color = '#999';
    });
    
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        performSearch();
        searchInput.focus();
        clearButton.style.display = 'none';
    });
    
    if (searchContainer) {
        searchContainer.appendChild(clearButton);
        
        searchInput.addEventListener('input', () => {
            clearButton.style.display = searchInput.value ? 'block' : 'none';
        });
    }
});