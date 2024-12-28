const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage() {
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);

async function fetchProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId'); // Extract productId from URL

    if (!productId) {
        alert('Product ID not found!');
        return;
    }

    try {
        const response = await fetch(`https:/backend-jewelix.up.railway.app/api/v1/product/${productId}`);
        const productData = await response.json();

        if (productData) {
            updateProductPage(productData);
        } else {
            alert("Product not found");
        }
    } catch (err) {
        console.error('Error fetching product data:', err);
        document.getElementById('product-details').innerHTML = 'Error fetching data.';
    }
}

function updateProductPage(product) {

    document.getElementById('name-of-product').innerHTML = product.productName;
    console.log(document.getElementById('name-of-product'));
    
    document.getElementById('price').innerHTML = `₹${product.price}`;
    document.getElementById('description').innerHTML = product.description;
    document.getElementById("category").innerHTML = product.category;

    document.getElementById("big-img").setAttribute("src", product.productImage[0]);
    if (product.quantity === 0) {
        document.getøElementById("stock").innerHTML = "<strike>Out Of Stock</strike>";
        document.getElementById("stock").style.color = "red";
    }

    for (let i = 0; i < 3; i++) {
        document.getElementById("img-" + i).setAttribute("src", product.productImage[i]);
        document.getElementById("img-t-" + i).setAttribute("src", product.productImage[i]);
    }
}

// Call the fetch function when the page loads
window.onload = fetchProductDetails;