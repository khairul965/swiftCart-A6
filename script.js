const showHome = () => {
    document.getElementById("home-section").classList.remove("hidden");
    document.getElementById("products-section").classList.add("hidden");
}

const showProducts = () => {
    document.getElementById("home-section").classList.add("hidden");
    document.getElementById("products-section").classList.remove("hidden");
    loadProducts();
}

const loadTrending = () => {
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        const trending = data.slice(0,3);
        const container = document.getElementById("trending-products");
        container.innerHTML = "";

        trending.forEach(product => {
            container.innerHTML += 
            `<div class="bg-white p-4 shadow rounded">
                <img src="${product.image}" class="h-40 mx-auto object-contain">
                <h4 class="font-semibold mt-2">${product.title.slice(0,30)}...</h4>
                <p class="text-indigo-600 font-bold">$${product.price}</p>
                <button onclick="showProducts()"
                class="bg-indigo-600 text-white px-3 py-1 mt-2 rounded">
                View More
                </button>
            </div>`;
        });
    });
}

const loadProducts = () => {
    document.getElementById("spinner").classList.remove("hidden");

    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        displayProducts(data);
        document.getElementById("spinner").classList.add("hidden");
    });
}


const loadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("category-buttons");
        container.innerHTML = "";

        data.forEach(cat => {
            container.innerHTML += `
            <button onclick="loadCategory('${cat}')"
            class="px-4 py-2 bg-gray-200 rounded hover:bg-indigo-600 hover:text-white">
            ${cat}
            </button>
            `;
        });
    });
}

const loadCategory = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res => res.json())
    .then(data => displayProducts(data));
}


const displayProducts = (products) => {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
         <div class="bg-white p-4 shadow rounded">
            <img src="${product.image}" class="h-40 mx-auto object-contain">
            <p class="text-sm text-indigo-600">${product.category}</p>
            <h4 class="font-semibold">${product.title.slice(0,40)}...</h4>
            <p>⭐ ${product.rating.rate}</p>
            <p class="font-bold">$${product.price}</p>
            <div class="flex justify-between mt-2">
                <button class="text-sm border px-2 py-1 rounded">Details</button>
                <button class="bg-indigo-600 text-white px-3 py-1 rounded">
                Add
                </button>
            </div>
        </div>
        `;
    });
}


// initial load

loadTrending();
loadCategories();
showHome();