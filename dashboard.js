async function loadDashboard() {
    let res = await fetch("http://localhost:5000/summary");
    let data = await res.json();

    document.getElementById("total").innerText = data.total;
    document.getElementById("low").innerText = data.low;
    document.getElementById("out").innerText = data.out;
    document.getElementById("cat").innerText = data.categories;
}

loadDashboard();