function logout() {
    alert("Logged out successfully!");
    window.location.href = "login.html";
}
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-box input");
    const tableRows = document.querySelectorAll("tbody tr");

    searchInput.addEventListener("keyup", function () 
    {
        let filter = searchInput.value.toLowerCase();
         tableRows.forEach(row => {
            let text = row.innerText.toLowerCase();
            if (text.includes(filter)) 
                {
                row.style.display = "";
            } 
            else
                 {
                row.style.display = "none";
                 }
        });
    });
});