let productsArray = [];

        document.addEventListener('DOMContentLoaded', loadProducts);

        const loadProducts = async () => {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            productsArray = data.products;
            console.log(productsArray);
            displayProducts(productsArray);
        };
        
        const displayProducts = (products) => {
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
        };
        
        const deleteProduct = async (productId) => {
            productsArray = productsArray.filter(product => product.id !== productId);
            console.log("Updated array after deletion is :", productsArray);
            displayProducts(productsArray);
        };
        
        const filterProducts = () => {
            const discount = document.getElementById('discount-filter').value;
            const filteredProducts = productsArray.filter(product => product.discountPercentage >= discount);
            displayProducts(filteredProducts);
        };
        
        const addProduct = async () => {
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const discount = document.getElementById('discount').value;
            const image = document.getElementById('image').value;
        
            const lastID = productsArray.pop().id;
            const newID = lastID + 1;
        
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
        };

        
        
