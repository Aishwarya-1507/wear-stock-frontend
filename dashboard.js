const backendURL = "https://wear-stock-backend.onrender.com";

async function loadDashboard() {
    try {
        let res = await fetch(`${backendURL}/summary`);
        let data = await res.json();

        const cards = document.querySelectorAll(".cards .card p");
        cards[0].innerText = data.total;      // Total Items
        cards[1].innerText = data.low;        // Low Stock
        cards[2].innerText = data.out;        // Out of Stock
        cards[3].innerText = data.categories; // Categories
    } catch (err) {
        console.error(err);
    }
}

loadDashboard();