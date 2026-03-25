const backendURL = "https://wear-stock-backend.onrender.com";

let barChartInstance;
let pieChartInstance;

async function loadReports() {
    try {
        // 1️⃣ FETCH DATA FROM BACKEND
        const res = await fetch(`${backendURL}/items`);
        const items = await res.json();

        console.log("Items from DB:", items); // debug

        // 2️⃣ CALCULATE VALUES
        let counts = { Men: 0, Women: 0, Kids: 0 };

        let inStock = 0;
        let lowStock = 0;
        let outStock = 0;

        items.forEach(item => {

            // CATEGORY COUNT
            if (item.category === "Men") counts.Men++;
            else if (item.category === "Women") counts.Women++;
            else if (item.category === "Kids") counts.Kids++;

            // STOCK STATUS
            if (item.qty === 0) outStock++;
            else if (item.qty <= 5) lowStock++;
            else inStock++;
        });

        // 3️⃣ UPDATE CATEGORY TABLE
        document.getElementById("categoryTable").innerHTML = `
            <tr><td>Men</td><td>${counts.Men}</td></tr>
            <tr><td>Women</td><td>${counts.Women}</td></tr>
            <tr><td>Kids</td><td>${counts.Kids}</td></tr>
        `;

        // 4️⃣ DESTROY OLD CHARTS (IMPORTANT FIX)
        if (barChartInstance) barChartInstance.destroy();
        if (pieChartInstance) pieChartInstance.destroy();

        // 5️⃣ BAR CHART
        const barCtx = document.getElementById("barChart").getContext("2d");

        barChartInstance = new Chart(barCtx, {
            type: "bar",
            data: {
                labels: ["Men", "Women", "Kids"],
                datasets: [{
                    label: "Total Items",
                    data: [counts.Men, counts.Women, counts.Kids],
                    backgroundColor: ["#4b6cb7", "#6a11cb", "#00c6ff"]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: "white" }
                    }
                },
                scales: {
                    x: { ticks: { color: "white" } },
                    y: { ticks: { color: "white" } }
                }
            }
        });

        // 6️⃣ PIE CHART
        const pieCtx = document.getElementById("pieChart").getContext("2d");

        pieChartInstance = new Chart(pieCtx, {
            type: "pie",
            data: {
                labels: ["In Stock", "Low Stock", "Out of Stock"],
                datasets: [{
                    data: [inStock, lowStock, outStock],
                    backgroundColor: ["#00ff99", "#ffcc00", "#ff4d4d"]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: "white" }
                    }
                }
            }
        });

    } catch (error) {
        console.error("Report Error:", error);
        alert("Failed to load reports ❌");
    }
}

// LOAD ON PAGE OPEN
window.onload = loadReports;