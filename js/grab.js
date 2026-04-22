let products = [];

// LOAD FROM JSON
fetch("../data/products.json")
  .then(res => res.json())
  .then(data => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];

    products = [...data, ...stored];

    console.log("Loaded products:", products); // DEBUG

    renderItems(products);
  })
  .catch(err => {
    console.error("JSON load failed:", err);

    // fallback to localStorage
    products = JSON.parse(localStorage.getItem("products")) || [];

    renderItems(products);
  });


// RENDER
function renderItems(list) {
  const grid = document.getElementById("itemGrid");

  if (!grid) {
    console.error("Grid not found!");
    return;
  }

  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p style='color:white;'>No items found</p>";
    return;
  }

  list.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${item.image}" style="width:100%; height:150px; object-fit:cover; border-radius:12px;">

      <h3>${item.title}</h3>
      <p class="price">₹${item.price}</p>

      <p style="color:#ccc;">${item.about || ""}</p>

      <div>
        <span>${item.condition}</span> |
        <span>${item.age || "N/A"}</span>
      </div>

      <p style="color:#aaa;">👤 ${item.seller}</p>
      <p style="color:#d4af37;">📞 ${item.mobile}</p>
    `;

    grid.appendChild(card);
  });
}


// SEARCH
function searchItems() {
  const value = document.getElementById("searchInput").value.toLowerCase();

  const filtered = products.filter(item =>
    item.title.toLowerCase().includes(value)
  );

  renderItems(filtered);
}