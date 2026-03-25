const backendURL = "https://wear-stock-backend.onrender.com";

// Load items as soon as the page opens
loadItems();

async function loadItems() {
    try {
        const res = await fetch(`${backendURL}/items`);
        const items = await res.json();

        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        items.forEach(item => {
            const row = `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.size}</td>
                    <td>${item.qty}</td>
                    <td>
                        <button onclick="deleteItem(${item.id})" style="background:red; color:white; border:none; padding:5px; cursor:pointer;">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading items:", error);
    }
}

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
        const res = await fetch(`${backendURL}/add-item`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, category, size, qty: Number(qty) })
        });

        const data = await res.json();
        if (data.message) {
            alert("Item Added! ✅");
            // Clear inputs
            document.getElementById("name").value = "";
            document.getElementById("category").value = "";
            document.getElementById("size").value = "";
            document.getElementById("qty").value = "";
            loadItems();
        }
    } catch (error) {
        alert("Server error ❌");
    }
});

async function deleteItem(id) {
    if (!confirm("Delete this item?")) return;
    await fetch(`${backendURL}/delete-item/${id}`, { method: "DELETE" });
    loadItems();
}

function logout() {
    window.location.href = "login.html";
}