
let allProducts = [];

async function init() {
    const itemGrid = document.getElementById('itemGrid');
    const searchInput = document.getElementById('searchInput');

    try {
        // Fetch data from your local JSON file
        const response = await fetch('products.json');
        allProducts = await response.json();
        
        // Initial render
        renderItems(allProducts);

        // Search event listener
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = allProducts.filter(item => 
                item.title.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.location.toLowerCase().includes(query)
            );
            renderItems(filtered);
        });

    } catch (error) {
        itemGrid.innerHTML = `<p style="color:red">Error loading marketplace items.</p>`;
        console.error("Fetch error:", error);
    }
}

function renderItems(items) {
    const itemGrid = document.getElementById('itemGrid');
    itemGrid.innerHTML = '';

    if (items.length === 0) {
        itemGrid.innerHTML = '<p>No items found.</p>';
        return;
    }

    items.forEach(item => {
        const card = `
            <div class="card">
                <span class="badge">${item.category}</span>
                <h3>${item.title}</h3>
                <p class="price">₹${item.price}</p>
                <div class="details">
                    <span>📍 ${item.location}</span>
                    <span>✨ ${item.condition}</span>
                </div>
            </div>
        `;
        itemGrid.innerHTML += card;
    });
}

init();