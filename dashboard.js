const backendURL = "https://wear-stock-backend.onrender.com";

// LOAD DASHBOARD
async function loadDashboard() {
    try {
        // 1️⃣ Fetch all items
        const res = await fetch(`${backendURL}/items`);
        const items = await res.json();

        console.log("Dashboard Items:", items);

        // 2️⃣ Calculate values
        let total = items.length;
        let low = 0;
        let out = 0;
        let categoriesSet = new Set();

        items.forEach(item => {
            categoriesSet.add(item.category);

            if (item.qty === 0) out++;
            else if (item.qty <= 5) low++;
        });

        // 3️⃣ Update cards
        document.getElementById("totalItems").innerText = total;
        document.getElementById("lowStock").innerText = low;
        document.getElementById("outStock").innerText = out;
        document.getElementById("categories").innerText = categoriesSet.size;

        // 4️⃣ Update table
        const table = document.getElementById("dashboardTable");
        table.innerHTML = "";

        items.forEach(item => {
            let status = "In Stock";
            let statusclass = "in-stock";
            if (item.qty === 0){ status = "Out of Stock";
            statusclass = "out-of-stock";
            }
            else if (item.qty <= 5) {status = "Low Stock";
            statusclass = "low-stock";
            }


            table.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.size}</td>
                    <td>${item.qty}</td>
                    <td class="${statusclass}">${status}</td>
                </tr>
            `;
        });

    } catch (err) {
        console.error("Dashboard error:", err);
        alert("Failed to load dashboard ❌");
    }
}

// SEARCH FUNCTION
document.getElementById("searchInput").addEventListener("keyup", function () {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll("#dashboardTable tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
});

// LOGOUT
function logout() {
    window.location.href = "login.html";
}

// LOAD DATA
window.onload = loadDashboard;