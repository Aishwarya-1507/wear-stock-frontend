const apiUrl = "https://wear-stock-backend.onrender.com"; // replace with your backend URL
const searchInput = document.querySelector(".search-box input");
const tableBody = document.querySelector(".table-container tbody");
const logoutBtn = document.querySelector("a[href='login.html']");

// ---------------- LOGOUT ----------------
logoutBtn.addEventListener("click", () => {
    alert("Logged out successfully!");
});

// ---------------- FETCH DASHBOARD DATA ----------------
async function loadDashboard() {
    try {
        // Fetch items
        let res = await fetch(`${apiUrl}/items`);
        let items = await res.json();

        // ---------------- CARD COUNTS ----------------
        let totalItems = items.length;
        let lowStock = items.filter(i => i.qty > 0 && i.qty <= 5).length;
        let outStock = items.filter(i => i.qty === 0).length;
        let categories = new Set(items.map(i => i.category)).size;

        // Update cards
        const cards = document.querySelectorAll(".cards .card p");
        cards[0].innerText = 120; // Total Items
        cards[1].innerText = 5;   // Low Stock
        cards[2].innerText = 2;   // Out of Stock
        cards[3].innerText = 8; // Categories

        // ---------------- TABLE ----------------
        tableBody.innerHTML = `
            <tr>
                <td>101</td>
                <td>T-shirts</td>
                <td>Men</td>
                <td>M</td>
                <td>30</td>
                <td class="in-stock">In Stock</td>
            </tr>
            <tr>
                <td>102</td>
                <td>Jeans</td>
                <td>Women</td>
                <td>L</td> 
                <td>15</td>
                <td class="low-stock">Low Stock</td>
            </tr>
            <tr>
                <td>103</td>
                <td>Jackets</td>
                <td>Kids</td>
                <td>S</td> 
                <td>0</td>
                <td class="out-of-stock">Out of Stock</td>
            </tr>
        `;

        items.forEach((item, index) => {
            let status = item.qty > 10 ? "in-stock" : item.qty > 0 ? "low-stock" : "out-of-stock";
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 104}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.size}</td>
                <td>${item.qty}</td>
                <td class="${status}">${status.replace("-", " ")}</td>
            `;
            tableBody.appendChild(row);
        });

        // ---------------- SEARCH FILTER ----------------
        searchInput.addEventListener("keyup", function () {
            let filter = searchInput.value.toLowerCase();
            tableBody.querySelectorAll("tr").forEach(row => {
                let text = row.innerText.toLowerCase();
                row.style.display = text.includes(filter) ? "" : "none";
            });
        });

    } catch (err) {
        console.error("Dashboard fetch error:", err);
    }
}

// Run on page load
loadDashboard();