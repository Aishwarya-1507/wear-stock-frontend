function login(event)
 {
    event.preventDefault();

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") 
        {
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerText = "Login Successful!";
        window.location.href = "dashboard.html";
        }
     else
      {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText = "Invalid Username or Password";
      }
}
