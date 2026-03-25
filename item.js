const backendURL = "https://wear-stock-backend.onrender.com"; 

// LOAD items from backend
async function loadItems() {
    try {
        let res = await fetch(`${backendURL}/items`);
        let data = await res.json();

        const tbody = document.getElementById("tableBody");
        tbody.innerHTML = "";

        data.forEach((item, index) => {
            let status = item.qty > 10 ? "In Stock" : (item.qty > 0 ? "Low Stock" : "Out of Stock");

            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.size}</td>
                <td>${item.qty}</td>
                <td class="${status.toLowerCase().replace(" ", "-")}">${status}</td>
                <td>
                    <button onclick="editItem('${item._id}')">Edit</button>
                    <button onclick="deleteItem('${item._id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

// ADD ITEM
document.getElementById("addBtn").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const size = document.getElementById("size").value;
    const qty = document.getElementById("qty").value;

    if (!name || !category || !size || !qty) {
        alert("Please fill all fields");
        return;
    }

    try {
        await fetch(`${backendURL}/add-item`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, category, size, qty: Number(qty) })
        });
        // Clear fields
        document.getElementById("name").value = "";
        document.getElementById("category").value = "";
        document.getElementById("size").value = "";
        document.getElementById("qty").value = "";

        loadItems(); // reload table
    } catch (err) {
        console.error(err);
    }
});

// DELETE ITEM
async function deleteItem(id) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
        await fetch(`${backendURL}/delete-item/${id}`, { method: "DELETE" });
        loadItems();
    } catch (err) {
        console.error(err);
    }
}

// EDIT ITEM
async function editItem(id) {
    let name = prompt("New Name");
    let category = prompt("New Category");
    let size = prompt("New Size");
    let qty = prompt("New Quantity");

    if (!name || !category || !size || !qty) return;

    try {
        await fetch(`${backendURL}/update-item/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, category, size, qty: Number(qty) })
        });
        loadItems();
    } catch (err) {
        console.error(err);
    }
}

// On load
loadItems();

// LOGOUT
function logout() {
    window.location.href = "login.html";
}