// ==================== CONFIG ====================
const backendURL = "https://wear-stock-backend.onrender.com"; // replace with your backend URL
const tableBody = document.getElementById("tableBody");

// ==================== LOAD ITEMS ====================
async function loadItems() {
    try {
        let res = await fetch(`${backendURL}/items`);
        let items = await res.json();

        tableBody.innerHTML = ""; // clear table

        // If there are no items in DB, show initial items
        if (items.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td>101</td>
                    <td>T-shirts</td>
                    <td>Men</td>
                    <td>M</td>
                    <td>30</td>
                    <td class="in-stock">In Stock</td>
                    <td>
                        <button onclick="editItem(this)">Edit</button>
                        <button onclick="deleteItem(this)">Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>102</td>
                    <td>Jeans</td>
                    <td>Women</td>
                    <td>L</td>
                    <td>15</td>
                    <td class="low-stock">Low Stock</td>
                    <td>
                        <button onclick="editItem(this)">Edit</button>
                        <button onclick="deleteItem(this)">Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>103</td>
                    <td>Jackets</td>
                    <td>Kids</td>
                    <td>S</td>
                    <td>0</td>
                    <td class="out-of-stock">Out of Stock</td>
                    <td>
                        <button onclick="editItem(this)">Edit</button>
                        <button onclick="deleteItem(this)">Delete</button>
                    </td>
                </tr>
            `;
            return;
        }

        items.forEach(item => {
            let status = "";
            if (item.qty > 10) status = "In Stock";
            else if (item.qty > 0) status = "Low Stock";
            else status = "Out of Stock";

            let row = document.createElement("tr");
            row.dataset.id = item._id; // store MongoDB _id
            row.innerHTML = `
                <td>${item._id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.size}</td>
                <td>${item.qty}</td>
                <td class="${status.toLowerCase().replace(" ", "-")}">${status}</td>
                <td>
                    <button onclick="editItem(this)">Edit</button>
                    <button onclick="deleteItem(this)">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

    } catch (err) {
        console.error("Failed to load items:", err);
    }
}

// ==================== ADD ITEM ====================
document.getElementById("addBtn").addEventListener("click", async () => {
    let inputs = document.querySelectorAll("input");
    let name = inputs[0].value;
    let category = inputs[1].value;
    let size = inputs[2].value;
    let qty = inputs[3].value;

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

        inputs.forEach(input => input.value = "");
        loadItems(); // refresh table
    } catch (err) {
        console.error("Add item failed:", err);
    }
});

// ==================== DELETE ITEM ====================
async function deleteItem(btn) {
    let row = btn.parentElement.parentElement;
    let id = row.dataset.id;

    try {
        await fetch(`${backendURL}/delete-item/${id}`, { method: "DELETE" });
        loadItems();
    } catch (err) {
        console.error("Delete failed:", err);
    }
}

// ==================== EDIT ITEM ====================
async function editItem(btn) {
    let row = btn.parentElement.parentElement;
    let id = row.dataset.id;
    let cells = row.getElementsByTagName("td");

    let name = prompt("Edit Name", cells[1].innerText);
    let category = prompt("Edit Category", cells[2].innerText);
    let size = prompt("Edit Size", cells[3].innerText);
    let qty = prompt("Edit Quantity", cells[4].innerText);

    if (!name || !category || !size || !qty) return;

    try {
        await fetch(`${backendURL}/update-item/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, category, size, qty: Number(qty) })
        });

        loadItems();
    } catch (err) {
        console.error("Update failed:", err);
    }
}

// ==================== INITIAL LOAD ====================
loadItems();