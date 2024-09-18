document.addEventListener('DOMContentLoaded', () => {
  // Toggle mobile menu
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenuItems = document.querySelector('.mobile-menu-items');
  menuToggle.addEventListener('click', () => {
    mobileMenuItems.classList.toggle('open');
  });

  // Populate cards from JSON data
  const cardsData = JSON.parse(document.getElementById('cards-data').textContent);
  const cardsWrapper = document.getElementById('cards-wrapper');

  cardsData.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card-container');
    
    cardElement.innerHTML = `
      <h3 class="card-header">${card.name}</h3>
      <div class="card-content">
        <div class="section">
          <h4 class="section-title">Pros</h4>
          <ul>${card.pros.map(pro => `<li>${pro}</li>`).join('')}</ul>
        </div>
        <div class="section">
          <h4 class="section-title">Cons</h4>
          <ul>${card.cons.map(con => `<li>${con}</li>`).join('')}</ul>
        </div>
        <div class="section">
          <h4 class="section-title">Neutral</h4>
          <ul>${card.neutral.map(neutral => `<li>${neutral}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="card-footer">
        <a href="${card.link}" class="card-button" target="_blank" rel="noopener noreferrer">Get it Now</a>
      </div>
    `;
    
    cardsWrapper.appendChild(cardElement);
  });
});
