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

showHome();