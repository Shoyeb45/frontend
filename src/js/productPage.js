async function fetchProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);

    let param1 = "", param2 = "";
    if (!urlParams.get("material")) {
        param1 = "categories";
        param2 = "category";
    }
    else {
        param1 = "materials";
        param2 = "material";
    }

    try {
        const response = await fetch(`http://localhost:4000/api/v1/product/${param1}?${param2}=${urlParams.get(param2)}`);
        const productData = await response.json();
        console.log(productData);

        if (productData) {
            updateProductPage(productData, toProperCase(urlParams.get(param2)));
        } else {
            alert("Product not found");
        }
    } catch (err) {
        console.error('Error fetching product data:', err);
        document.getElementById('product-details-container').innerHTML = 'Error fetching data.';
    }
}
fetchProductDetails();


function updateProductPage(products, productType) {
    
    document.getElementsByTagName("title").innerHTML = `${productType}: Buy ${productType} Jewellery`
    document.getElementById("current").innerHTML = `${productType}`
    document.getElementById("product-title").innerHTML = `${productType}`
    document.getElementById("quantity").innerHTML = `(${products.length} results)`

    const productContainer =  document.getElementById("product-container");
    productContainer.innerHTML = '';
    
    products.forEach(product => {

        const productDiv = document.createElement('div');

        productDiv.classList.add('product');


        productDiv.innerHTML = `

            <div class="card">
                <div class="card-header">    
                    <img src='${product.productImage[0]}' class="product-img">
                </div>
                <div class="card-body">    
                    <p class="price">₹${product.price} <strike>₹${product.price + 1000}</strike></p>
                    <p>${product.description}</p>    
                </div>
                
                <div class="card-footer">
                    <button>Add to cart</button>
                </dib>
                    
                <h2><a href="../static/product-details.html?productId=${product._id}" target="_blank">${product.productName}</a></h2>
            </div>
        `;
        productContainer.appendChild(productDiv);
    });
}

function toProperCase(str) {
    if (!str) return ""; // Handle empty strings
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}