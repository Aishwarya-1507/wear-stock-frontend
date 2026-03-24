async function loadItems() {
    let res = await fetch("http://localhost:5000/items");
    let items = await res.json();

    let table = document.getElementById("tableBody");
    table.innerHTML = "";

    items.forEach(item => {
        let status = item.qty > 10 ? "In Stock" :
                     item.qty > 0 ? "Low Stock" : "Out";

        table.innerHTML += `
        <tr>
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
        </tr>`;
    });
}

// ADD
document.getElementById("addBtn").onclick = async () => {
    let i = document.querySelectorAll("input");

    await fetch("http://localhost:5000/add-item", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            name: i[0].value,
            category: i[1].value,
            size: i[2].value,
            qty: parseInt(i[3].value)
        })
    });

    loadItems();
};

// EDIT
async function editItem(id) {
    let name = prompt("Name");
    let category = prompt("Category");
    let size = prompt("Size");
    let qty = prompt("Qty");

    await fetch(`http://localhost:5000/update-item/${id}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ name, category, size, qty: parseInt(qty) })
    });

    loadItems();
}

// DELETE
async function deleteItem(id) {
    await fetch(`http://localhost:5000/delete-item/${id}`, {
        method: "DELETE"
    });

    loadItems();
}

loadItems();