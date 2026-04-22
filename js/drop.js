// ===============================
// ADD PRODUCT (DROP PAGE ONLY)
// ===============================
function addProduct() {
  const title = document.getElementById("itemName").value.trim();
  const price = document.getElementById("price").value.trim();
  const category = document.getElementById("category").value;
  const condition = document.getElementById("condition").value;
  const age = document.getElementById("age").value;

  // get user from login
  const user = localStorage.getItem("user") || "SAU Student";

  if (!title || !price || !category) {
    alert("Fill required fields");
    return;
  }

  // get existing products
  let products = JSON.parse(localStorage.getItem("products")) || [];

  const newItem = {
    title,
    price,
    category,
    location: user,
    condition,
    age
  };

  products.push(newItem);

  // save to localStorage
  localStorage.setItem("products", JSON.stringify(products));

  alert("Item added successfully!");

  // redirect to grab page
  window.location.href = "grab.html";
}