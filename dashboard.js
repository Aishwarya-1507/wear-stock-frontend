// ================= LOGOUT =================
function logout() {
    alert("Logged out successfully!");
    window.location.href = "login.html";
}


// ================= LOAD DASHBOARD DATA =================
async function loadDashboard() {
    try {
        let res = await fetch("https://wear-stock-backend.onrender.com/summary");
        let data = await res.json();

        // Get all card values (p tags inside .card)
        const cardValues = document.querySelectorAll(".card p");

        // Order matters (based on your HTML)
        cardValues[0].innerText = data.total;
        cardValues[1].innerText = data.low;
        cardValues[2].innerText = data.out;
        cardValues[3].innerText = data.categories;

    } catch (err) {
        console.error("Error loading dashboard:", err);
    }
}


// ================= SEARCH FILTER =================
document.addEventListener("DOMContentLoaded", function () {

    loadDashboard();

    const searchInput = document.querySelector(".search-box input");

    searchInput.addEventListener("keyup", function () {

        let filter = searchInput.value.toLowerCase();

        // Select rows dynamically every time
        const tableRows = document.querySelectorAll("tbody tr");

        tableRows.forEach(row => {
            let text = row.innerText.toLowerCase();

            if (text.includes(filter)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});