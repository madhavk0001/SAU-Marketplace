let products = [];

fetch("../data/products.json")
  .then(res => res.json())
  .then(data => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];

    products = [...data, ...stored];

    renderItems(products);
  })
  .catch(() => {
    products = JSON.parse(localStorage.getItem("products")) || [];
    renderItems(products);
  });


function renderItems(list) {
  const grid = document.getElementById("itemGrid");

  if (!grid) return;

  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p style='color:white;'>No items found</p>";
    return;
  }

  list.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // use first image if multiple exist
    const imgSrc = item.images ? item.images[0] : item.image;

    card.innerHTML = `
      <img src="${imgSrc}" style="width:100%; height:150px; object-fit:cover; border-radius:12px;">

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

function searchItems() {
  const value = document.getElementById("searchInput").value.toLowerCase();

  const filtered = products.filter(item =>
    item.title.toLowerCase().includes(value)
  );

  renderItems(filtered);
}

function getAgeValue(age) {
  if (!age) return 999;

  if (age.includes("Less than")) return 1;
  if (age.includes("1-3")) return 2;
  if (age.includes("3-6")) return 3;
  if (age.includes("6-12")) return 4;
  if (age.includes("1+")) return 5;

  return 999;
}

function sortItems() {
  const value = document.getElementById("sortSelect").value;

  let sorted = [...products];

  if (value === "priceLow") {
    sorted.sort((a, b) => Number(a.price) - Number(b.price));
  }

  else if (value === "priceHigh") {
    sorted.sort((a, b) => Number(b.price) - Number(a.price));
  }

  else if (value === "ageNew") {
    sorted.sort((a, b) => getAgeValue(a.age) - getAgeValue(b.age));
  }

  else if (value === "ageOld") {
    sorted.sort((a, b) => getAgeValue(b.age) - getAgeValue(a.age));
  }

  products = sorted;
  renderItems(products);
}
