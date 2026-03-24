function register(event)
 {
    event.preventDefault();

    let user = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
console.log(user, email, pass);  
    if (user && email && pass)
     {
        document.getElementById("message").style.color = "olive green";
        document.getElementById("message").innerText = "Registration Successful!";
        } 
    else 
        {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText = "Please fill all fields";
        }
}
console.log("Function running");