document.getElementById("form-data").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        userName: formData.get('userName'),
        email: formData.get('email'),
        password: formData.get('password'),
        fullName: formData.get('fullName'),
        contactNumber: formData.get('contactNumber'),
    };

    try {
        const response = await fetch("https://backend-jewelix.up.railway.app/api/v1/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (response.ok) {
            alert(result.message);  // Successfully registered
        }
        else {
            alert(result.message);
        }

    } catch (err) {
        console.error("Failed to sign up:", err);
        alert(`Failed to send the data: ${err.message}`);
    }
});
