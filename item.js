// Auto generate ID
let idCounter = 4;

// ➕ Add Item
document.querySelector("button").addEventListener("click", function () {
    let inputs = document.querySelectorAll("input");

    let name = inputs[0].value;
    let category = inputs[1].value;
    let size = inputs[2].value;
    let qty = inputs[3].value;

    if (!name || !category || !size || !qty) {
        alert("Please fill all fields");
        return;
    }

    // Determine stock status
    let status = "";
    if (qty > 10) status = "In Stock";
    else if (qty > 0) status = "Low Stock";
    else status = "Out of Stock";

    // Create row
    let table = document.querySelector("table");
    let row = table.insertRow(-1);

    row.innerHTML = `
        <td>${idCounter++}</td>
        <td>${name}</td>
        <td>${category}</td>
        <td>${size}</td>
        <td>${qty}</td>
        <td>${status}</td>
        <td>
            <button onclick="editItem(this)">Edit</button>
            <button onclick="deleteItem(this)">Delete</button>
        </td>
    `;

    // Clear inputs
    inputs.forEach(input => input.value = "");
});


// ❌ Delete Item
function deleteItem(btn) {
    let row = btn.parentElement.parentElement;
    row.remove();
}


// ✏️ Edit Item
function editItem(btn) {
    let row = btn.parentElement.parentElement;
    let cells = row.getElementsByTagName("td");

    let name = prompt("Edit Name", cells[1].innerText);
    let category = prompt("Edit Category", cells[2].innerText);
    let size = prompt("Edit Size", cells[3].innerText);
    let qty = prompt("Edit Quantity", cells[4].innerText);

    if (name && category && size && qty) {
        cells[1].innerText = name;
        cells[2].innerText = category;
        cells[3].innerText = size;
        cells[4].innerText = qty;

        // Update status
        if (qty > 10) cells[5].innerText = "In Stock";
        else if (qty > 0) cells[5].innerText = "Low Stock";
        else cells[5].innerText = "Out of Stock";
    }
}


// 🔐 Logout
function logout() {
    alert("Logged out successfully!");
    window.location.href = "login.html";
}