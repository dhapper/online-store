fetch('/api/products')
    .then(response => response.json())
    .then(data => {
        const productLinks = document.getElementById('productLinks');
        if (data && data.length > 0) {
            for(let i = 0; i < data.length; i++){
                const product = data[i];
                const li = document.createElement('li');
                const a = document.createElement('a');

                a.href = '/product/product-entry.html?id=' + product.id;
                a.textContent = product.name + ' - $' + product.price;

                li.appendChild(a);
                productLinks.appendChild(li);
            }
        } else {
            productLinks.textContent = 'No Products Available';
            while (productLinks.firstChild) {
                productLinks.removeChild(productLinks.firstChild);
            }
        }
    })
    .catch(error => {
        console.error('Error fetching products:', error);
        const productLinks = document.getElementById('productLinks');
        productLinks.textContent = 'Error loading products.';
    });