// BAR CHART (Category)
const barCtx = document.getElementById('barChart');

new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['Men', 'Women', 'Kids'],
        datasets: [{
            label: 'Total Items',
            data: [40, 50, 30],
            backgroundColor: [
                '#4b6cb7',
                '#6a11cb',
                '#00c6ff'
            ]
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            x: {
                ticks: { color: 'white' }
            },
            y: {
                ticks: { color: 'white' }
            }
        }
    }
});


// PIE CHART (Stock Status)
const pieCtx = document.getElementById('pieChart');

new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: ['In Stock', 'Low Stock', 'Out of Stock'],
        datasets: [{
            data: [100, 15, 5],
            backgroundColor: [
                '#00ff99',
                '#ffcc00',
                '#ff4d4d'
            ]
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        }
    }
});
// Example data (later replace with DB data)
let items = [
    { category: "Men" },
    { category: "Men" },
    { category: "Women" },
    { category: "Women" },
    { category: "Women" },
    { category: "Kids" }
];

// Count categories
function updateCategoryTable() {
    let counts = {
        Men: 0,
        Women: 0,
        Kids: 0
    };

    items.forEach(item => {
        counts[item.category]++;
    });

    let table = document.getElementById("categoryTable");

    table.innerHTML = `
        <tr><td>Men</td><td>${counts.Men}</td></tr>
        <tr><td>Women</td><td>${counts.Women}</td></tr>
        <tr><td>Kids</td><td>${counts.Kids}</td></tr>
    `;
}

// Run on load
updateCategoryTable();