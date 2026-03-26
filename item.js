const backendURL = "https://wear-stock-backend.onrender.com";

// 1. LOAD ITEMS
async function loadItems() {
    try {
        const res = await fetch(`${backendURL}/items`);
        const items = await res.json();

        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        items.forEach(item => {
            // Determine Status and Color
            let status = "In Stock";
            let statusColor = "#2ecc71"; // Green

            if (item.qty === 0) {
                status = "Out of Stock";
                statusColor = "#e74c3c"; // Red
            } else if (item.qty <= 5) {
                status = "Low Stock";
                statusColor = "#e67e22"; // Orange
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

// 2. EDIT ITEM FUNCTION
async function editItem(id) {
    const name = prompt("Enter new name:");
    const category = prompt("Enter new category:");
    const size = prompt("Enter new size:");
    const qty = prompt("Enter new quantity:");

    // If user cancels any prompt, stop the update
    if (!name || !category || !size || !qty) return;

    try {
        const res = await fetch(`${backendURL}/update-item/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                category,
                size,
                qty: Number(qty)
            })
        });
        
        if (res.ok) {
            alert("Item Updated ✅");
            loadItems();
        }
    } catch (error) {
        console.error("Update error:", error);
    }
}

// 3. DELETE ITEM FUNCTION
async function deleteItem(id) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
        await fetch(`${backendURL}/delete-item/${id}`, { method: "DELETE" });
        loadItems();
    } catch (error) {
        console.error("Delete error:", error);
    }
}

// Initial load
loadItems();