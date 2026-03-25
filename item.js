const backendURL = "https://wear-stock-backend.onrender.com";

// 1. Load items when page opens
loadItems();

async function loadItems() {
    try {
        const res = await fetch(`${backendURL}/items`);
        const items = await res.json();

        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        items.forEach(item => {
            // Logic to match your CSS classes
            let status = "In Stock";
            let statusClass = "in-stock";

            if (item.qty === 0) {
                status = "Out of Stock";
                statusClass = "out-of-stock";
            } else if (item.qty <= 5) {
                status = "Low Stock";
                statusClass = "low-stock";
            }

            const row = `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.size}</td>
                    <td>${item.qty}</td>
                    <td class="${statusClass}">${status}</td>
                    <td>
                        <button onclick="deleteItem(${item.id})" style="background: rgba(255,0,0,0.6); padding: 5px 10px;">Delete</button>
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
document.getElementById("addBtn").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const size = document.getElementById("size").value;
    const qty = document.getElementById("qty").value;

    if (!name || !category || !size || !qty) {
        alert("Please fill all fields!");
        return;
    }

    try {
        const res = await fetch(`${backendURL}/add-item`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, category, size, qty: Number(qty) })
        });

        const data = await res.json();
        if (data.message) {
            alert("Item Added ✅");
            // Clear inputs
            document.querySelectorAll("input").forEach(input => input.value = "");
            loadItems();
        }
    } catch (error) {
        console.error("Add error:", error);
    }
});

// 3. Delete Logic
async function deleteItem(id) {
    if (!confirm("Are you sure?")) return;
    try {
        await fetch(`${backendURL}/delete-item/${id}`, { method: "DELETE" });
        loadItems();
    } catch (error) {
        console.error("Delete error:", error);
    }
}

function logout() {
    window.location.href = "login.html";
}