// ================= LOAD ITEMS =================
async function loadItems() {

    let res = await fetch("https://wear-stock-backend.onrender.com/items");
    let items = await res.json();

    let table = document.getElementById("tableBody");
    table.innerHTML = "";

    items.forEach(item => {

        let status = "";
        if (item.qty > 10) status = "In Stock";
        else if (item.qty > 0) status = "Low Stock";
        else status = "Out of Stock";

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item._id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.size}</td>
            <td>${item.qty}</td>
            <td>${status}</td>
            <td>
                <button onclick="editItem('${item._id}')">Edit</button>
                <button onclick="deleteItem('${item._id}')">Delete</button>
            </td>
        `;

        table.appendChild(row);
    });
}


// ================= ADD ITEM =================
document.getElementById("addBtn").addEventListener("click", async function () {

    let inputs = document.querySelectorAll("input");

    let name = inputs[0].value;
    let category = inputs[1].value;
    let size = inputs[2].value;
    let qty = parseInt(inputs[3].value);

    if (!name || !category || !size || !qty) {
        alert("Please fill all fields");
        return;
    }

    await fetch("https://wear-stock-backend.onrender.com/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, category, size, qty })
    });

    // Reload table
    loadItems();

    // Clear inputs
    inputs.forEach(input => input.value = "");
});


// ================= DELETE =================
async function deleteItem(id) {

    await fetch(`https://wear-stock-backend.onrender.com/items/${id}`, {
        method: "DELETE"
    });

    loadItems();
}


// ================= EDIT =================
async function editItem(id) {

    let name = prompt("Enter new name");
    let category = prompt("Enter category");
    let size = prompt("Enter size");
    let qty = prompt("Enter quantity");

    if (!name || !category || !size || !qty) {
        alert("All fields required");
        return;
    }

    await fetch(`https://wear-stock-backend.onrender.com/items/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            category,
            size,
            qty: parseInt(qty)
        })
    });

    loadItems();
}


// ================= LOGOUT =================
function logout() {
    window.location.href = "login.html";
}


// ================= LOAD ON START =================
loadItems();