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
        container.innerHTML = `
            <p><strong>ID:</strong> ${product.id}</p>
            <p><strong>Name:</strong> ${product.name}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Description:</strong> ${product.description || 'N/A'}</p>
        `;
    })
    .catch(error => {
        document.getElementById('productDetails').textContent = 'Product not found.';
        console.error(error);
    });