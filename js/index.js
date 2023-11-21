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
    var chercher = document.getElementById('search-input').value;
    var items = document.getElementsByClassName('element');
    for (var i = 0; i < items.length; i++){
        var item = items[i];
        var itemCategory = item.getAttribute('data-category');

        if (chercher === itemCategory || chercher === '') {
            item.style.display = 'block';
        }else {
            item.style.display = 'none';
        }
    }
}