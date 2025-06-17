const errorDiv = document.getElementById("error");
const container = document.getElementById("products");

window.onload = () => {
  fetchAllProducts();
};

async function fetchAllProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    displayProducts(data.products);
  } catch (err) {
    errorDiv.textContent = "Failed to load products.";
  }
}

async function searchProduct() {
  const input = document.getElementById("searchInput").value.trim();

  errorDiv.textContent = "";
  container.innerHTML = "";

  if (input === "") {
    errorDiv.textContent = "please enter a product name";
    return;
  }

  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${input}`);
    const data = await res.json();

    if (data.products.length > 0) {
      displayProducts(data.products);
    } else {
      container.innerHTML = "<p>No matching products found.</p>";
    }
  } catch (err) {
    errorDiv.textContent = "Search failed.";
  }
}

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
