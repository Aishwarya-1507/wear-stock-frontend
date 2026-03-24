const apiUrl = "https://wear-stock-backend.onrender.com"; // replace with your backend URL

async function loadReports() {
    try {
        // Fetch items from backend
        let res = await fetch(`${apiUrl}/items`);
        let items = await res.json();

        // ---------------- CATEGORY COUNTS ----------------
        let counts = { Men: 0, Women: 0, Kids: 0 };
        let inStock = 0, lowStock = 0, outStock = 0;

        items.forEach(item => {
            if (item.category === "Men") counts.Men++;
            else if (item.category === "Women") counts.Women++;
            else if (item.category === "Kids") counts.Kids++;

            if (item.qty > 10) inStock++;
            else if (item.qty > 0) lowStock++;
            else outStock++;
        });

        // Include default example values
        counts.Men += 1; // T-shirts
        counts.Women += 1; // Jeans
        counts.Kids += 1; // Jackets
        inStock += 1; // T-shirts
        lowStock += 1;  // Jeans
        outStock += 1;  // Jackets

        // ---------------- UPDATE CATEGORY TABLE ----------------
        document.getElementById("categoryTable").innerHTML = `
            <tr><td>Men</td><td>${counts.Men}</td></tr>
            <tr><td>Women</td><td>${counts.Women}</td></tr>
            <tr><td>Kids</td><td>${counts.Kids}</td></tr>
        `;

        // ---------------- BAR CHART ----------------
        const barCtx = document.getElementById('barChart');
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Men', 'Women', 'Kids'],
                datasets: [{
                    label: 'Total Items',
                    data: [counts.Men, counts.Women, counts.Kids],
                    backgroundColor: ['#4b6cb7', '#6a11cb', '#00c6ff']
                }]
            },
            options: {
                plugins: { legend: { labels: { color: 'white' } } },
                scales: { x: { ticks: { color: 'white' } }, y: { ticks: { color: 'white' } } }
            }
        });

        // ---------------- PIE CHART ----------------
        const pieCtx = document.getElementById('pieChart');
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['In Stock', 'Low Stock', 'Out of Stock'],
                datasets: [{
                    data: [inStock, lowStock, outStock],
                    backgroundColor: ['#00ff99', '#ffcc00', '#ff4d4d']
                }]
            },
            options: { plugins: { legend: { labels: { color: 'white' } } } }
        });

    } catch (err) {
        console.error("Reports fetch error:", err);
    }
}

// Run on page load
loadReports();