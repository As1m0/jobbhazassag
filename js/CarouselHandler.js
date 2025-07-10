// Fixed CarouselHandler class
class CarouselHandler {
    constructor(carouselId, options = {}) {
        this.carouselId = carouselId;
        this.currentSlide = 0;
        this.currentProgress = 1; // Start at 1 since first slide is shown
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.carousel = document.getElementById(carouselId);
        if (!this.carousel) {
            console.error(`Carousel with ID ${carouselId} not found`);
            return;
        }

        this.slider = this.carousel.querySelector('.slider');
        this.prevBtn = this.carousel.querySelector('.prev-btn');
        this.nextBtn = this.carousel.querySelector('.next-btn');
        this.endBtn = this.carousel.querySelector('.end-btn');
        this.progressArrow = this.carousel.querySelector('.progress-arrow');

        this.slides = this.carousel.querySelectorAll('.carousel-card');
        this.totalSlides = this.slides.length;

        this.options = {
            onComplete: options.onComplete || (() => { }),
            arrowEmptyImg: options.arrowEmptyImg || './img/carousel/test/arrow_empty.png',
            arrowFilledImg: options.arrowFilledImg || './img/carousel/test/arrow_filled.png',
            ...options
        };

        this.init();
    }

    init() {
        this.generateProgressBar();
        this.bindEvents();
        this.updateSlide();
    }

    generateProgressBar() {
        const progressContainer = this.carousel.querySelector('.progress-bar-test');
        if (!progressContainer) return;

        // Save the arrow element before clearing
        const arrow = progressContainer.querySelector('.progress-arrow');

        // Clear existing segments but keep the arrow
        const existingSegments = progressContainer.querySelectorAll('.progress-segment-answer');
        existingSegments.forEach(segment => segment.remove());

        // Create progress segments
        for (let i = 0; i < this.totalSlides - 1; i++) {
            const segment = document.createElement('div');
            segment.className = 'progress-segment-answer empty';

            // Insert before the arrow if it exists
            if (arrow) {
                progressContainer.insertBefore(segment, arrow);
            } else {
                progressContainer.appendChild(segment);
            }
        }

        // If arrow doesn't exist, create it
        if (!arrow) {
            const newArrow = document.createElement('img');
            newArrow.className = 'progress-arrow';
            newArrow.src = this.options.arrowEmptyImg;
            progressContainer.appendChild(newArrow);
            this.progressArrow = newArrow;
        }
    }

    updateProgressDisplay() {
        const segments = this.carousel.querySelectorAll('.progress-segment-answer');

        segments.forEach((segment, index) => {
            if (index < this.currentProgress) {
                segment.className = 'progress-segment-answer filled';
            } else {
                segment.className = 'progress-segment-answer empty';
            }
        });
    }

    updateSlide() {
        // Update navigation buttons
        if (this.currentSlide >= this.totalSlides - 1) {
            if (this.nextBtn) this.nextBtn.style.display = 'none';
            //if (this.endBtn) this.endBtn.style.display = 'block';
            if (this.progressArrow) this.progressArrow.src = this.options.arrowFilledImg;
        } else {
            if (this.nextBtn) this.nextBtn.style.display = 'block';
            //if (this.endBtn) this.endBtn.style.display = 'none';
            if (this.progressArrow) this.progressArrow.src = this.options.arrowEmptyImg;
        }

        // Update previous button opacity
        if (this.prevBtn) {
            this.prevBtn.style.opacity = this.currentSlide <= 0 ? '0.3' : '1';
            this.prevBtn.style.pointerEvents = this.currentSlide <= 0 ? 'none' : 'auto';
        }

        // Update slider position
        if (this.slider) {
            this.slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        }

        // Update progress display
        this.updateProgressDisplay();
    }

    bindEvents() {
        if (this.prevBtn) this.prevBtn.onclick = () => this.goToPrevious();
        if (this.nextBtn) this.nextBtn.onclick = () => this.goToNext();
        if (this.endBtn) this.endBtn.onclick = () => this.handleComplete();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.carousel && this.carousel.classList.contains('show')) {
                if (e.key === 'ArrowLeft') this.goToPrevious();
                else if (e.key === 'ArrowRight') this.goToNext();
            }
        });

        // Swipe support
        this.slider.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        this.slider.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipeGesture();
        });
    }


    handleSwipeGesture() {
        const swipeDistance = this.touchStartX - this.touchEndX;
        console.log("swipe distance:" + swipeDistance);
        if (swipeDistance > 50) this.goToNext();
        else if (swipeDistance < -50) this.goToPrevious();
    }

    goToPrevious() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.currentProgress = Math.max(1, this.currentProgress - 1);
            this.updateSlide();
        }
    }

    goToNext() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
            this.currentProgress = Math.min(this.totalSlides, this.currentProgress + 1);
            this.updateSlide();
        }
    }

    handleComplete() {
        this.options.onComplete();
    }

    // Method to go to specific slide
    goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < this.totalSlides) {
            this.currentSlide = slideIndex;
            this.currentProgress = slideIndex + 1;
            this.updateSlide();
        }
    }

    // Method to reset carousel
    reset() {
        this.currentSlide = 0;
        this.currentProgress = 1;
        this.updateSlide();
    }
}








// Initialize carousel1

const carousels = {};

document.addEventListener('DOMContentLoaded', function () {

    carousels.carousel5 = new CarouselHandler('carouselSection2', {
        onComplete: () => {
            console.log('Önismereti gyakorlat completed!');
            hideAndScroll();
            carousels.carousel5.reset();
        }
    });




    // Initialize other carousels...

});