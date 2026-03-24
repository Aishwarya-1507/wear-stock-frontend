async function register(event) {
    event.preventDefault();

    let user = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    let msg = document.getElementById("message");

    if (!user || !email || !pass) {
        msg.style.color = "red";
        msg.innerText = "Please fill all fields";
        return;
    }

    try {
        let res = await fetch("https://wear-stock-backend.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user,
                email: email,
                password: pass
            })
        });

        let data = await res.json();

        // SUCCESS
        if (data.message) {
            msg.style.color = "green";
            msg.innerText = data.message;

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);
        }

        // ERROR
        if (data.error) {
            msg.style.color = "red";
            msg.innerText = data.error;
        }

    } catch (err) {
        console.error(err);
        msg.style.color = "red";
        msg.innerText = "Server error";
    }
}