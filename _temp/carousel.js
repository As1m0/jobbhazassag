
document.addEventListener('DOMContentLoaded', () => {
    ['imageCarousel1', 'imageCarousel2', 'imageCarousel3'].forEach(id => {
        const carouselElement = document.getElementById(id);
        if (carouselElement) {
            const carouselInstance = bootstrap.Carousel.getOrCreateInstance(carouselElement);
            // Force a refresh to ensure touch/swipe is bound
            carouselInstance.to(0);
        }
    });
});

//buttons
const carouselButton1 = document.getElementById("carousel-btn1");
const carouselButton2 = document.getElementById("carousel-btn2");
const carouselButton3 = document.getElementById("carousel-btn3");
const carouselButton4 = document.getElementById("carousel-btn4");

carouselButton1.addEventListener("click", () => {
    toggleCarousel("carouselSection1");
});
carouselButton2.addEventListener("click", () => {
    toggleCarousel("carouselSection5");
});
carouselButton3.addEventListener("click", () => {
    toggleCarousel("carouselSection3");
});
carouselButton4.addEventListener("click", () => {
    toggleCarousel("carouselSection4");
});


function hideAllCarousel() {
    const carouselSections = document.getElementsByClassName("carousel-section");
    for (let i = 0; i < carouselSections.length; i++) {
        carouselSections[i].style.display = 'none';
        carouselSections[i].classList.remove('show');
        //carouselSections[i].classList.remove('fade-in2');
    }
}

// Initialize carousel as hidden
hideAllCarousel();

function toggleCarousel(carouselSectNum) {

    hideAllCarousel();

    if (carouselSectNum) {
        const carouselSection = document.getElementById(carouselSectNum);

        carouselSection.style.display = 'block';
        setTimeout(() => {
            carouselSection.classList.add('show');
            //carouselSection.classList.add('fade-in2');
        }, 250);
    }
}

//scroll back on close
const closeButtons = document.getElementsByClassName("close-btn");
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", () => {
        scrollToSection("how-it-works");
    })
}


//Text animation
function enhanceCarouselAnimations(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    // Animate the first caption on page load
    const firstActive = carousel.querySelector('.carousel-item.active .carousel-caption');
    if (firstActive) {
        requestAnimationFrame(() => {
            firstActive.style.opacity = '0.85';
            firstActive.style.transform = 'translateY(0)';
        });
    }

    carousel.addEventListener('slide.bs.carousel', () => {
        const currentCaptions = carousel.querySelectorAll('.carousel-item.active .carousel-caption');
        currentCaptions.forEach(caption => {
            caption.style.opacity = '0';
            caption.style.transform = 'translateY(10px)';
        });
    });

    carousel.addEventListener('slid.bs.carousel', (e) => {
        if (!e.relatedTarget) return;

        const newCaptions = e.relatedTarget.querySelectorAll('.carousel-caption');
        newCaptions.forEach(caption => {
            requestAnimationFrame(() => {
                caption.style.opacity = '0.85';
                caption.style.transform = 'translateY(0)';
            });
        });
    });
}

// Apply to all carousels
//['imageCarousel1', 'imageCarousel2', 'imageCarousel3'].forEach(enhanceCarouselAnimations);