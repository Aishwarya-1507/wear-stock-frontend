const backendURL = "https://wear-stock-backend.onrender.com";

async function initDashboard() {
    try {
        // Get Summary Data for Cards
        const sumRes = await fetch(`${backendURL}/summary`);
        const summary = await sumRes.json();
        
        document.getElementById("totalItems").innerText = summary.total;
        document.getElementById("lowStock").innerText = summary.low;
        document.getElementById("outStock").innerText = summary.out;
        document.getElementById("categories").innerText = summary.categories;

        // Get All Items for Table
        const itemRes = await fetch(`${backendURL}/items`);
        const items = await itemRes.json();
        renderTable(items);

        // Search Logic
        document.getElementById("searchInput").addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = items.filter(i => 
                i.name.toLowerCase().includes(term) || 
                i.category.toLowerCase().includes(term) ||
                i.size.toLowerCase().includes(term)
            );
            renderTable(filtered);
        });

    } catch (error) {
        console.error("Dashboard error:", error);
    }
}

function renderTable(data) {
    const table = document.getElementById("dashboardTable");
    table.innerHTML = "";
    data.forEach(item => {
        let status = "In Stock";
        let color = "green";
        if (item.qty === 0) { status = "Out of Stock"; color = "red"; }
        else if (item.qty <= 5) { status = "Low Stock"; color = "orange"; }

        table.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.size}</td>
                <td>${item.qty}</td>
                <td style="color:${color}; font-weight:bold;">${status}</td>
            </tr>
        `;
    });
}

function logout() { window.location.href = "login.html"; }
initDashboard();