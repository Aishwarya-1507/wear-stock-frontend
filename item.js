// Change this to your actual Render backend URL
const backendURL = "https://wear-stock-backend.onrender.com";

// 1. Function to Load and Display Items
async function loadItems() {
    try {
        const res = await fetch(`${backendURL}/items`);
        const items = await res.json();

        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = ""; // Clear table before adding new rows

        items.forEach(item => {
            // Logic for Stock Status and Color
            let status = "In Stock";
            let statusColor = "#2ecc71"; // Green

            if (item.qty === 0) {
                status = "Out of Stock";
                statusColor = "#e74c3c"; // Red
            } else if (item.qty <= 5) {
                status = "Low Stock";
                statusColor = "#f1c40f"; // Yellow/Orange
            }

            const row = `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.size}</td>
                    <td>${item.qty}</td>
                    <td style="color: ${statusColor}; font-weight: bold;">${status}</td>
                    <td>
                        <button class="edit-btn" onclick="editItem(${item.id})">Edit</button>
                        <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading items:", error);
    }
}

// 2. Add Item Logic
// We use 'async' to wait for the server to finish adding before we reload the table
document.getElementById("addBtn").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const size = document.getElementById("size").value;
    const qty = document.getElementById("qty").value;

    if (!name || !category || !size || !qty) {
        alert("Please fill all fields!");
        return;
    }

    const newItem = {
        name: name,
        category: category,
        size: size,
        qty: Number(qty)
    };

    try {
        const res = await fetch(`${backendURL}/add-item`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem)
        });

        const data = await res.json();

        if (res.ok) {
            alert("Item Added Successfully! ✅");
            
            // Clear the input boxes
            document.getElementById("name").value = "";
            document.getElementById("category").value = "";
            document.getElementById("size").value = "";
            document.getElementById("qty").value = "";

            // REFRESH THE TABLE IMMEDIATELY
            loadItems(); 
        } else {
            alert("Error: " + data.error);
        }
    } catch (err) {
        console.error("Fetch error:", err);
        alert("Server connection failed. Check your backend URL.");
    }
});

// 3. Delete Item Logic
async function deleteItem(id) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
        const res = await fetch(`${backendURL}/delete-item/${id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            loadItems(); // Refresh table after delete
        }
    } catch (err) {
        console.error("Delete error:", err);
    }
}

// 4. Edit Item Logic (Using prompt for simplicity)
async function editItem(id) {
    const newName = prompt("Enter new Name:");
    const newQty = prompt("Enter new Quantity:");

    if (!newName || !newQty) return;

    try {
        await fetch(`${backendURL}/update-item/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName, qty: Number(newQty) })
        });
        loadItems(); // Refresh table after update
    } catch (err) {
        console.error("Update error:", err);
    }
}

// 5. Run this when the page first opens
loadItems();