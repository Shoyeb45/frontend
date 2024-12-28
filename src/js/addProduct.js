document.getElementById("addProductForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = document.getElementById("addProductForm");
    const formData = new FormData(form);

    try {
        const response = await fetch("http://backend-jewelix.up.railway.app/api/v1/product/addProduct", {
            method: "POST",
            body: formData,
        });

        console.log("Raw Response:", response);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(`Error: ${errorData.message || "Unknown error"}`);
        }

        const result = await response.json();
        console.log("Parsed Response:", result);
        alert(result.message || "Product uploaded successfully!");

        form.reset();
    } catch (err) {
        console.error("Upload Error:", err);
        alert(`Failed to upload product: ${err.message}`);
    }
});
