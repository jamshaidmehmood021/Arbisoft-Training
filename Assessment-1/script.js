let productsArray = [];

        document.addEventListener('DOMContentLoaded', loadProducts);

        async function loadProducts() {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            productsArray = data.products;
            console.log(productsArray);
            displayProducts(productsArray);
        }

        function displayProducts(products) {
            const container = document.getElementById('products-container');
            container.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <h2>${product.title}</h2>
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <p>Price: $${product.price}</p>
                    <p>Discount: ${product.discountPercentage}%</p>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                `;
                container.appendChild(productCard);
            });
        }

        async function deleteProduct(productId) {
            // deleting products from global array
            productsArray = productsArray.filter(product => product.id !== productId);
            console.log("Updated array after deletion is :",productsArray);
            displayProducts(productsArray);
        }

        function filterProducts() {
            const discount = document.getElementById('discount-filter').value;
            const filteredProducts = productsArray.filter(product => product.discountPercentage >= discount);
            displayProducts(filteredProducts);
        }

        async function addProduct() {
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const discount = document.getElementById('discount').value;
            const image = document.getElementById('image').value;

            // getting the last element id
            const lastID = productsArray.pop().id
            //console.log(lastID)
            const newID= lastID+1

            const newProduct = {
                id: newID,
                title: title,
                description: description,
                price: parseFloat(price),
                discountPercentage: parseFloat(discount),
                thumbnail: image,
                images: [image]
            };

            productsArray.push(newProduct);
            displayProducts(productsArray);
        }