document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        userName: formData.get('userName'),
        password: formData.get('password'),
    };


    try {
        const response = await fetch('https://backend-jewelix.up.railway.app/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Redirect to home page
            alert("Successfully login");
        } else {
            const errorData = await response.json();
            document.getElementById('errorMessage').textContent = errorData.message || 'Login failed. Please try again.';
        }
    } catch (error) {
        console.error('Error during login:', error);
        document.getElementById('errorMessage').textContent = 'An error occurred. Please try again later.';
    }
});