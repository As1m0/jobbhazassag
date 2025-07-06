//progress bar

let currentProgress2 = 1;
updateProgressDisplay2();

function updateProgressDisplay2() {
    const segments = document.querySelectorAll('.progress-segment-answer');

    segments.forEach((segment, index) => {
        if (index < currentProgress2) {
            segment.className = 'progress-segment-answer filled';
        } else {
            segment.className = 'progress-segment-answer empty';
        }
    });
}

//sider

const answerSlider = document.getElementById('answer-slider');
const prevBtn2 = document.getElementById('prevBtn2');
const nextBtn2 = document.getElementById('nextBtn2');
let currentSlide2 = 0;
const totalSlides2 = document.querySelectorAll('.answer-card').length;
const endButton = document.getElementById('endBtn');

function updateSlide2() {
    if (currentSlide2 >= totalSlides2 - 1) {
        nextBtn2.style.display = 'none';
        endButton.style.display = 'block';
        endButton.onclick = () => {
            scrollToSection("how-it-works");
            hideAllCarousel();
        }
        document.getElementById('answer-arrow').src = './img/carousel/test/arrow_filled.png';
    } else {
        nextBtn2.style.display = 'block';
        endButton.style.display = 'none';
        document.getElementById('answer-arrow').src = './img/carousel/test/arrow_empty.png';
    }
    if (currentSlide2 <= 0) {
        prevBtn2.style.opacity = '0';
    } else {
        prevBtn2.style.opacity = '1';
    }
    answerSlider.style.transform = `translateX(-${currentSlide2 * 100}%)`;
    updateProgressDisplay2();
}

prevBtn2.onclick = () => {
    if (currentSlide2 > 0) {
        currentSlide2--;
        currentProgress2--;
        updateSlide2();
    }
};

nextBtn2.onclick = () => {
    currentSlide2++;
    currentProgress2++;
    updateSlide2();
};

updateSlide2();