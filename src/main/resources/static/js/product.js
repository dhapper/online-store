fetch('/api/products')
    .then(response => response.json())
    .then(data => {
        const productLinks = document.getElementById('productLinks');
        productLinks.innerHTML = '';

        if (data && data.length > 0) {
            const imageBasePath = '../assets/products/singles/';

            for (let i = 0; i < data.length; i++) {
                const product = data[i];

                const li = document.createElement('li');
                const a = document.createElement('a');

                a.href = '/product/product-entry.html?id=' + product.id;
                a.innerHTML = `
                    <div class="frosted-glass product-list-view">
                        <h3>${product.name}</h3>
                        <img src="${imageBasePath}${product.filename}" alt="Image of ${product.name}" class="product-image">
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
        console.error('Error fetching products:', error);
        const productLinks = document.getElementById('productLinks');
        productLinks.innerHTML = ''; // Clear content on error
        productLinks.textContent = 'Error loading products.';
    });