const backendURL = "https://wear-stock-backend.onrender.com";

// LOAD ITEMS
async function loadItems() {
    try {
        const res = await fetch(`${backendURL}/items`);
        const items = await res.json();

        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        items.forEach(item => {

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
                        <button onclick="editItem(${item.id})">Edit</button>
                        <button onclick="deleteItem(${item.id})">Delete</button>
                    </td>
                </tr>
            `;

            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.log("Error loading items:", error);
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
       let res = await fetch(`${backendURL}/add-item`, {   // ✅ FIXED HERE
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                category,
                size,
                qty
            })
        });
        let data = await res.json();
        console.log(data);
        if (data.message){

// clear inputs
        document.getElementById("name").value = "";
        document.getElementById("category").value = "";
        document.getElementById("size").value = "";
        document.getElementById("qty").value = "";

        loadItems();
        }else{
            alert("Item not added");
        }
    } catch (error) {
        console.log("Add error:", error);
        alert("Server error");
    }
});

// DELETE ITEM
async function deleteItem(id) {
    try {
        await fetch(`${backendURL}/delete-item/${id}`, {
            method: "DELETE"
        });

        loadItems();
    } catch (error) {
        console.log("Delete error:", error);
    }
}

// EDIT ITEM
async function editItem(id) {
    const name = prompt("Enter new name");
    const category = prompt("Enter new category");
    const size = prompt("Enter new size");
    const qty = prompt("Enter new quantity");

    if (!name || !category || !size || !qty) return;

    try {
        await fetch(`${backendURL}/update-item/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                category,
                size,
                qty
            })
        });

        loadItems();
    } catch (error) {
        console.log("Update error:", error);
    }
}

// LOGOUT
function logout() {
    window.location.href = "login.html";
}

// Load items
loadItems();