
const apiUrl = 'https://dummyjson.com/products';

document.addEventListener('DOMContentLoaded', function () {
    loadProducts();
});


function loadProducts() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
            return response.json();
        })
        .then(products => {
            console.log('Réponse de l\'API:', products); // Ajout de cette ligne pour afficher la réponse
            displayProducts(products);
        })
        .catch(error => {
            console.error('Erreur de requête:', error);
            alert('Une erreur s\'est produite lors du chargement des produits. Veuillez vérifier la console pour plus de détails.');
        });
}

function displayProducts(response) {
    var container = document.getElementById('elements');
    var products = response.products || [];

    // Limiter à 20 éléments
    var limitedProducts = products.slice(0, 20);

    container.innerHTML = limitedProducts.map(generateDynamicContent).join('');
}



function generateDynamicContent(product) {
    // Supposons que product.images est un tableau d'URL d'images
    var firstImageUrl = product.images.length > 0 ? product.images[0] : ''; // Obtenez la première image s'il y en a une

    return `
        <div class="element col-sm-6 col-md-4 col-lg-3" data-category="${product.category}">
            <div class="box">
                <h6 class="texter">${product.title}</h6>
                <a href="details-produit.html?id=${product.id}">
                    <div class="img-box">
                        <img src="${firstImageUrl}" alt="${product.name}">
                        <div class="overlay">
                            <button class="view-details">Voir les détails</button>
                        </div>
                    </div>
                </a>
                <div class="detail-box">
                    <h6>Price <span>$${product.price.toFixed(2)} <button class="addToCart" onclick="addToCart(${product.id})"><i class="fa fa-shopping-bag" aria-hidden="true"></i></button></span></h6>
                </div>
                ${product.isNew ? '<div class="new"><span>New</span></div>' : ''}
            </div>
        </div>
    `;
}


    function addToCart(productId) {
    // Utilisez fetch pour récupérer les détails du produit depuis l'API
    fetch(`https://dummyjson.com/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
            return response.json();
        })
        .then(product => {
            // Récupérez la première image du tableau des images du produit
            var firstImage = product.images[0];

            // Créez l'élément du panier avec la première image et les détails du produit de l'API
            var cartList = document.getElementById('cart-list');
            var listItem = document.createElement('li');
            listItem.className = "list-group-item cart-item";
            listItem.innerHTML = `
                <div class="votre-classe-de-carte">
                    <div class="cart-item">
                        <img src="${firstImage}" alt="${product.title}">
                        <span class="product-details">
                            ${product.title} - <span id="prix">${product.price}</span> $
                        </span>
                        <button class="btn btn-danger btn-sm remove-btn" onclick="removeFromCart(this)">
                            <i class="bi bi-x-circle"></i>
                        </button>
                    </div>
                </div>
            `;
            cartList.appendChild(listItem);

            // Mettez à jour le total
            updateTotal();
        })
        .catch(error => {
            console.error('Erreur de requête API:', error);
        });
}
function removeFromCart(button) {
    var listItem = button.parentNode;
    var cartList = document.getElementById('cart-list');

    // Supprimer l'élément du panier
    listItem.remove();

    // Mettez à jour le total après la suppression
    updateTotal();
}

function updateTotal() {
    var cartList = document.getElementById('cart-list');
    var totalElement = document.querySelector('.total-price');
    var total = 0;

    // Parcourir chaque élément du panier et ajouter le prix
    for (var i = 0; i < cartList.children.length; i++) {
        var priceElement = cartList.children[i].querySelector('.product-details #prix');

        // Vérifier si l'élément prix existe avant d'extraire la valeur
        if (priceElement) {
            // Extraire la valeur du prix
            var price = parseFloat(priceElement.textContent);
            total += price;
        }
    }
    // Mettre à jour l'élément total avec innerHTML
    totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
}






function loadCategories() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // La structure de la réponse peut être différente, veuillez ajuster en conséquence
            const products = data.products || [];
            const categories = [...new Set(products.map(product => product.category))];

            // Appeler une fonction pour mettre à jour la liste déroulante des catégories
            updateCategoryDropdown(categories);
        })
        .catch(error => {
            console.error('Erreur de requête:', error);
        });
}

function updateCategoryDropdown(categories) {
    const categorySelect = document.getElementById('category');

    // Ajouter une option pour toutes les catégories
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'Tout les categories';
    categorySelect.appendChild(allOption);

    // Ajouter une option pour chaque catégorie unique
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Appeler la fonction pour charger les catégories au chargement de la page
document.addEventListener('DOMContentLoaded', loadCategories);




function filtrer() {
    var category = document.getElementById('category').value;
    var items = document.getElementsByClassName('element');

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemCategory = item.getAttribute('data-category');

        if (category === 'all' || category === itemCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
}

function chercher() {
    var chercher = document.getElementById('search-input').value.toLowerCase(); // Convertir la recherche en minuscules
    var items = document.getElementsByClassName('element');

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemName = item.querySelector('.texter').textContent.toLowerCase(); // Obtenez le nom du produit

        if (itemName.includes(chercher) || chercher === '') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
}


