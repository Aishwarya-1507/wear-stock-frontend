const apiUrl = "https://YOUR_BACKEND_URL"; // replace with your backend URL

const tableBody = document.getElementById("tableBody");
const addBtn = document.getElementById("addBtn");
const inputs = document.querySelectorAll("input");

// Load items from DB and display
async function loadItems() {
    let res = await fetch(`${apiUrl}/items`);
    let items = await res.json();

    tableBody.innerHTML = `
        <tr>
            <td>101</td>
            <td>T-shirts</td>
            <td>Men</td>
            <td>M</td>
            <td>30</td>
            <td class="in-stock">In Stock</td>
        </tr>
        <tr>
            <td>102</td>
            <td>Jeans</td>
            <td>Women</td>
            <td>L</td> 
            <td>15</td>
            <td class="low-stock">Low Stock</td>
        </tr>
        <tr>
            <td>103</td>
            <td>Jackets</td>
            <td>Kids</td>
            <td>S</td> 
            <td>0</td>
            <td class="out-of-stock">Out of Stock</td>
        </tr>
    `;

    // Append DB items
    items.forEach((item, index) => {
        const status =
            item.qty > 10 ? "in-stock" :
            item.qty > 0 ? "low-stock" :
            "out-of-stock";

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 104}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.size}</td>
            <td>${item.qty}</td>
            <td class="${status}">${status.replace("-", " ")}</td>
            <td>
                <button onclick="editItem('${item._id}', this)">Edit</button>
                <button onclick="deleteItem('${item._id}', this)">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

loadItems();

// ADD ITEM
addBtn.addEventListener("click", async () => {
    const name = inputs[0].value;
    const category = inputs[1].value;
    const size = inputs[2].value;
    const qty = inputs[3].value;

    if (!name || !category || !size || !qty) return alert("Please fill all fields");

    let res = await fetch(`${apiUrl}/add-item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, size, qty })
    });

    let data = await res.json();
    console.log(data);

    // Reload table
    loadItems();

    inputs.forEach(i => i.value = "");
});

// DELETE ITEM
async function deleteItem(id, btn) {
    await fetch(`${apiUrl}/delete-item/${id}`, { method: "DELETE" });
    btn.parentElement.parentElement.remove();
}

// EDIT ITEM
async function editItem(id, btn) {
    const row = btn.parentElement.parentElement;
    const cells = row.getElementsByTagName("td");

    const name = prompt("Edit Name", cells[1].innerText);
    const category = prompt("Edit Category", cells[2].innerText);
    const size = prompt("Edit Size", cells[3].innerText);
    const qty = prompt("Edit Quantity", cells[4].innerText);

    if (name && category && size && qty) {
        await fetch(`${apiUrl}/update-item/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, category, size, qty })
        });

        loadItems(); // reload after update
    }
}

// LOGOUT
function logout() {
    window.location.href = "login.html";
}