let products = [];

// LOAD FROM JSON
fetch("../data/products.json")
  .then(res => res.json())
  .then(data => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    
    // Merge JSON data with any user-added items in LocalStorage
    products = [...data, ...stored];
    console.log("Successfully loaded 12+ items:", products.length); 

    renderItems(products);
  })
  .catch(err => {
    console.error("JSON load failed:", err);
    products = JSON.parse(localStorage.getItem("products")) || [];
    renderItems(products);
  });


// RENDER FUNCTION
function renderItems(list) {
  const grid = document.getElementById("itemGrid");

  if (!grid) {
    console.error("Grid element #itemGrid not found!");
    return;
  }

  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p style='color:white; text-align:center; grid-column: 1/-1;'>No items matching your search...</p>";
    return;
  }

  list.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // FIXED: Mapping names to match our products.json (sellerName and phone)
    card.innerHTML = `
      <<img src="${item.image}" crossorigin="anonymous" alt="${item.title}" class="card-img">
      
      <div class="card-content" style="padding: 15px;">
        <h3 style="margin: 10px 0;">${item.title}</h3>
        <p class="price" style="color: #fce892; font-weight: bold; font-size: 1.2rem;">₹${item.price}</p>
        
        <p style="color:#ccc; font-size: 0.85rem; margin: 8px 0;">
            ${item.condition} | ${item.location}
        </p>

        <hr style="border: 0.1px solid rgba(255,255,255,0.1); margin: 10px 0;">

        <p style="color:#aaa; font-size: 0.9rem;">👤 ${item.sellerName || "Student Seller"}</p>
        <p style="color:#fce892; font-size: 0.9rem; font-weight: 500;">📞 ${item.phone || "Contact for Info"}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

// SEARCH FUNCTION
function searchItems() {
  const value = document.getElementById("searchInput").value.toLowerCase();

  const filtered = products.filter(item =>
    item.title.toLowerCase().includes(value) || 
    item.category.toLowerCase().includes(value) // Added category search too!
  );

  renderItems(filtered);
}