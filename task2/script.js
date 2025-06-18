const errorDiv = document.getElementById("error");
const container = document.getElementById("products");
const sortSelect = document.getElementById("sortSelect");

let allProducts = [];

window.onload = () => {
  fetchAllProducts();
};

async function fetchAllProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    allProducts = data.products;
    displayProducts(allProducts);
  } catch (err) {
    errorDiv.textContent = "failed to load products.";
  }
}

async function searchProduct() {
  const input = document.getElementById("searchInput").value.trim();
  errorDiv.textContent = "";
  container.innerHTML = "";

  if (input === "") {
    errorDiv.textContent = "Please enter a product name";
    fetchAllProducts();
    return;
  }

  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${input}`);
    const data = await res.json();
    allProducts = data.products;
    displayProducts(allProducts);
  } catch (err) {
    errorDiv.textContent = "Search failed.";
  }
}

sortSelect.addEventListener("change", () => {
  let sortedProducts = [...allProducts];

  if (sortSelect.value === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(sortedProducts);
});

function displayProducts(products) {
  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="product-title">${product.title}</div>
      <div class="product-price">$${product.price}</div>
    `;

    container.appendChild(card);
  });
}
