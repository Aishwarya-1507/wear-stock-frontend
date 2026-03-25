async function login(event) {
    event.preventDefault();

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let msg = document.getElementById("message");

    if (!user || !pass) {
        msg.style.color = "red";
        msg.innerText = "Please fill all fields";
        return;
    }

    try {
        let res = await fetch("https://wear-stock-backend.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user,
                password: pass
            })
        });

        let data = await res.json();

        // SUCCESS
        if (data.success) {
            msg.style.color = "dark green";
            msg.innerText = "Login Successful!";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } 
        // INVALID
        else {
            msg.style.color = "red";
            msg.innerText = "Invalid Username or Password";
        }

    } catch (err) {
        console.error(err);
        msg.style.color = "red";
        msg.innerText = "Server error";
    }
}