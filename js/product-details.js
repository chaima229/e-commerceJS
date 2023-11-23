document.addEventListener('DOMContentLoaded', function () {
    // Récupérer l'ID du produit depuis l'URL
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');

    // Appeler une fonction pour charger les détails du produit en fonction de l'ID
    loadProductDetails(productId);
});

function loadProductDetails(productId) {
    // Utiliser l'ID du produit pour récupérer les détails du produit depuis l'API
    var apiUrl = 'https://dummyjson.com/products/' + productId;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
            return response.json();
        })
        .then(product => {
            // Mettre à jour les éléments HTML avec les détails du produit
            document.getElementById('product-name').textContent = product.title;
            document.getElementById('product-image').src = product.images[0]; // Utiliser la première image
            document.getElementById('product-description').textContent = product.description;
            document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        })
        .catch(error => {
            console.error('Erreur de requête:', error);
        });
}
