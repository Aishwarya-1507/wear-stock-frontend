const backendURL = "https://wear-stock-backend.onrender.com";

async function loadReports() {
    try {
        const res = await fetch(`${backendURL}/items`);
        const items = await res.json();

        // 1. Update Cards
        const total = items.length;
        const low = items.filter(i => i.qty > 0 && i.qty <= 5).length;
        const out = items.filter(i => i.qty === 0).length;
        
        const catMap = {}; // To count items per category
        items.forEach(i => catMap[i.category] = (catMap[i.category] || 0) + 1);
        const catCount = Object.keys(catMap).length;

        document.getElementById("totalItems").innerText = total;
        document.getElementById("lowStock").innerText = low;
        document.getElementById("outStock").innerText = out;
        document.getElementById("categories").innerText = catCount;

        // 2. Category Summary Table
        const catTable = document.getElementById("categoryTable");
        catTable.innerHTML = "";
        for (let cat in catMap) {
            catTable.innerHTML += `<tr><td>${cat}</td><td>${catMap[cat]}</td></tr>`;
        }

        // 3. Charts
        renderCharts(catMap, { inStock: total - low - out, low, out });

    } catch (error) {
        console.error("Report error:", error);
    }
}

function renderCharts(catData, stockData) {
    // Bar Chart: Category Distribution
    new Chart(document.getElementById("barChart"), {
        type: 'bar',
        data: {
            labels: Object.keys(catData),
            datasets: [{ label: 'Items', data: Object.values(catData), backgroundColor: '#3498db', fontColor: '#ffffff' }]
        }
    });

    // Pie Chart: Stock Status
    new Chart(document.getElementById("pieChart"), {
        type: 'pie',
        data: {
            labels: ['In Stock', 'Low Stock', 'Out of Stock'],
            datasets: [{
                data: [stockData.inStock, stockData.low, stockData.out],
                backgroundColor: ['#2ecc71', '#f1c40f', '#e74c3c']
            }]
        }
    });
}

loadReports();