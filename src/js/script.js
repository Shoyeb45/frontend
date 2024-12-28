async function checkLoginStatus() {
    try {
        const response = await fetch('http://localhost:4000/api/auth/isLoggedIn', {
            method: 'GET',
            credentials: 'include' // Include cookies for cross-origin requests
        });

        const data = await response.json();
        if (data.isLoggedIn) {
            // User is logged in: Hide the login button
            document.getElementById("user").style.display = "none";
        } else {
            // User is not logged in: Show the login button
            document.getElementById("user").style.display = "block";
        }
    } catch (error) {
        console.error("Error checking login status:", error);
    }
}

window.onload = checkLoginStatus;

let slideIndexes = {
    "material-slideshow": 1,
    "categories-slideshow": 1
};

window.addEventListener("DOMContentLoaded", function() {
    autoSlide("material-slideshow");
    autoSlide("categories-slideshow");
});

function plusSlides(n, slideshowId) {
    showSlides(slideIndexes[slideshowId] += n, slideshowId);
}

function currentSlide(n, slideshowId) {
    showSlides(slideIndexes[slideshowId] = n, slideshowId);
}

function showSlides(n, slideshowId) {
    let slideshowElement = document.getElementById(slideshowId);
    if (!slideshowElement) {
        console.error('Slideshow with ID "' + slideshowId + '" not found');
        return;
    }

    let slides = slideshowElement.getElementsByClassName("mySlides");
    let dots = slideshowElement.getElementsByClassName("dot");

    if (n > slides.length) { slideIndexes[slideshowId] = 1 }
    if (n < 1) { slideIndexes[slideshowId] = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndexes[slideshowId] - 1].style.display = "block";
    if (dots.length > 0) {
        dots[slideIndexes[slideshowId] - 1].className += " active";
    }
}

function autoSlide(slideshowId) {
    setInterval(function() {
        plusSlides(1, slideshowId); 
    }, 3000);
}

let currentIndex = 1;
showSlide(currentIndex);

function moveSlide(step) {
    showSlide(currentIndex += step);
}

function jumpToSlide(index) {
    showSlide(currentIndex = index);
}

function showSlide(index) {
    let i;
    let frames = document.getElementsByClassName("slideshow-frame");
    let dots = document.getElementsByClassName("slideshow-dot");

    if (index > frames.length) { currentIndex = 1 }
    if (index < 1) { currentIndex = frames.length }

    for (i = 0; i < frames.length; i++) {
        frames[i].style.display = "none";
        frames[i].style.transform = "translateX(100%)"; 
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" current", "");
    }

    frames[currentIndex - 1].style.display = "block";
    frames[currentIndex - 1].style.transform = "translateX(0)";
    dots[currentIndex - 1].className += " current";
}
