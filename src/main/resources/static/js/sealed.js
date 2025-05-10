// Your code is wrapped inside DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', () => {
  // Global variables
  let selectedFilters = {};
  let currentSortOption = 'price-desc';

  function fetchAndDisplayProducts(filterCriteria = {}, sortOption = currentSortOption) {
    fetch('/api/sealed')  // Make sure your API supports this
      .then(response => response.json())
      .then(data => {
        const productLinks = document.getElementById('productLinks');
        productLinks.innerHTML = '';

        if (data && data.length > 0) {
          const imageBasePath = '../assets/products/sealed/';

          const { cardset = null } = filterCriteria;

          let filteredProducts = data.filter(product => {
            const cardSetMatches = (cardset === null || product.card_set === cardset);
            return cardSetMatches;
          });

          // Sorting logic
          if (sortOption === 'alphabetical-asc') {
            filteredProducts.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
          } else if (sortOption === 'alphabetical-desc') {
            filteredProducts.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1);
          } else if (sortOption === 'id-asc') {
            filteredProducts.sort((a, b) => a.id - b.id);
          } else if (sortOption === 'id-desc') {
            filteredProducts.sort((a, b) => b.id - a.id);
          } else if (sortOption === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
          } else if (sortOption === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
          }

          // Additional filters
          if (filterCriteria.minPrice != null) {
            filteredProducts = filteredProducts.filter(p => p.price >= filterCriteria.minPrice);
          }
          if (filterCriteria.maxPrice != null) {
            filteredProducts = filteredProducts.filter(p => p.price <= filterCriteria.maxPrice);
          }

          if (filteredProducts.length === 0) {
            productLinks.textContent = 'No Products Available for the selected filters.';
            return;
          }

          // Render products
          for (const product of filteredProducts) {
            const li = document.createElement('li');
            const a = document.createElement('a');

            a.href = '/product/sealed-entry.html?id=' + product.id;
            a.innerHTML = `
              <div class="frosted-glass product-list-view">
                <div class="header-container">
                  <h3 class="name">${product.name}</h3>
                </div>
                <img src="${imageBasePath}${product.filename}" alt="Image of ${product.name}" class="product-image" />
                <h4>$${product.price.toFixed(2)}</h4>
              </div>
            `;
            li.appendChild(a);
            productLinks.appendChild(li);
          }
        } else {
          productLinks.textContent = 'No Products Available';
        }
      })
      .catch(error => {
        console.error('Error fetching sealed products:', error);
        const productLinks = document.getElementById('productLinks');
        productLinks.innerHTML = '';
        productLinks.textContent = 'Error loading products.';
      });
  }

  function displaySelectedFilters() {
    const container = document.getElementById('filterDisplay');
    container.innerHTML = '';

    for (const [filter, value] of Object.entries(selectedFilters)) {
      if (value) {
        const filterDiv = document.createElement('div');
        filterDiv.className = 'filter-item';

        const valueSpan = document.createElement('span');

        if (filter === 'minPrice') {
          valueSpan.textContent = `Minimum Price: $${value}`;
        } else if (filter === 'maxPrice') {
          valueSpan.textContent = `Maximum Price: $${value}`;
        } else if (value === 'IR') {
          valueSpan.textContent = 'Illustration Rares';
        } else {
          valueSpan.textContent = value;
        }

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-btn';

        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-xmark';
        removeButton.appendChild(icon);

        removeButton.addEventListener('click', () => {
          delete selectedFilters[filter];
          displaySelectedFilters();
          fetchAndDisplayProducts(selectedFilters, currentSortOption);
        });

        filterDiv.appendChild(valueSpan);
        filterDiv.appendChild(removeButton);
        container.appendChild(filterDiv);
      }
    }
    console.log(selectedFilters);
  }

  // Setup everything after DOM is ready
  // Elements
  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  const searchButton = document.querySelector('.price-inputs-container button');

  // Price Range Search
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      const minVal = minPriceInput.value;
      const maxVal = maxPriceInput.value;
      const minPrice = minVal ? parseFloat(minVal) : null;
      const maxPrice = maxVal ? parseFloat(maxVal) : null;

      if (minPrice != null) {
        selectedFilters['minPrice'] = minPrice;
      } else {
        delete selectedFilters['minPrice'];
      }
      if (maxPrice != null) {
        selectedFilters['maxPrice'] = maxPrice;
      } else {
        delete selectedFilters['maxPrice'];
      }
      displaySelectedFilters();
      fetchAndDisplayProducts(selectedFilters, currentSortOption);
    });
  }

  // Sorting options
  const sortOptions = document.querySelectorAll('#sortOptions li');
  sortOptions.forEach(item => {
    item.addEventListener('click', () => {
      const sortType = item.getAttribute('data-sort');
      const labelText = item.getAttribute('data-label');
      currentSortOption = sortType;
      const sortMethodLabel = document.getElementById('sortMethodLabel');
      if (sortMethodLabel) {
        sortMethodLabel.textContent = labelText;
      }
      fetchAndDisplayProducts(selectedFilters, currentSortOption);
    });
  });

  // Initialize sort label
  const sortMethodLabel = document.getElementById('sortMethodLabel');
  const defaultOption = Array.from(document.querySelectorAll('#sortOptions li'))
    .find(li => li.getAttribute('data-sort') === currentSortOption);
  if (defaultOption && sortMethodLabel) {
    sortMethodLabel.textContent = defaultOption.getAttribute('data-label');
  }

  // Setup filter dropdowns
  const filterItems = document.querySelectorAll('.dropdown li');
  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      const filterType = item.getAttribute('data-filter');
      const value = item.getAttribute('data-value');
      selectedFilters[filterType] = value;
      displaySelectedFilters();
      fetchAndDisplayProducts(selectedFilters, currentSortOption);
    });
  });

  // Fetch initial products
  fetchAndDisplayProducts(selectedFilters, currentSortOption);
});