
let selectedImages = [null, null, null];

function handleImage(input, index) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    selectedImages[index] = e.target.result;

    
    const box = input.parentElement;
    box.innerHTML = `<img src="${e.target.result}">`;
  };

  reader.readAsDataURL(file);
}



function addProduct() {
  const title = document.getElementById("itemName").value.trim();
  const price = document.getElementById("price").value.trim();
  const category = document.getElementById("category").value;
  const condition = document.getElementById("condition").value;
  const age = document.getElementById("age").value;
  const about = document.getElementById("description").value.trim();

  if (!title || !price || !category) {
    alert("Fill required fields");
    return;
  }

  // collect images
  const images = selectedImages.filter(img => img !== null);

  let products = JSON.parse(localStorage.getItem("products")) || [];

  const newItem = {
    title,
    price,
    category,
    condition,
    age,
    about,
    images
  };

  products.push(newItem);

  localStorage.setItem("products", JSON.stringify(products));

  alert("Item added successfully!");

  window.location.href = "grab.html";
}
