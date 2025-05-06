// extract product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

fetch('/api/products/' + productId)
    .then(response => {
        if (!response.ok) throw new Error('Product not found');
        return response.json();
    })
    .then(product => {
        const container = document.getElementById('productDetails');

        const imageBasePath = '../assets/products/singles/';

        container.innerHTML = `
            <p><strong>ID:</strong> ${product.id}</p>
            <p><strong>Name:</strong> ${product.name}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <img src="${imageBasePath}${product.filename}" alt="Image of ${product.name}">
        `;
    })
    .catch(error => {
        document.getElementById('productDetails').textContent = 'Product not found.';
        console.error(error);
    });