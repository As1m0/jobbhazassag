const questions = [
    {
        text: "Mit szoktál mondani, amikor a párod rámutat egy hibádra?",
        options: [
            { text: "Ez most nehéz nekem, kérlek, beszéljünk róla később.", score: 2 },
            { text: "Te beszélsz? Te meg egy lusta, önző ember vagy.", score: 1 },
            { text: "Nem én kezdtem, ne próbáld rámkenni!", score: 3 }
        ]
    },
    {
        text: "Hogyan reagálsz, ha nem kapsz elég figyelmet?",
        options: [
            { text: "Megpróbálom nyugodtan jelezni.", score: 3 },
            { text: "Elkezdlek ignorálni.", score: 2 },
            { text: "Dühös leszek és veszekedést kezdeményezek.", score: 1 }
        ]
    },
    {
        text: "Mit csinálsz, ha párod elfelejt valamit fontosat?",
        options: [
            { text: "Emlékeztetem és megbeszéljük.", score: 1 },
            { text: "Megjegyzem, de nem mondok semmit.", score: 2 },
            { text: "Rátámadok, hogy mindig ezt csinálja.", score: 3 }
        ]
    },
    {
        text: "Hogyan kezeled a vitákat?",
        options: [
            { text: "Időt kérek, hogy lenyugodjunk.", score: 1 },
            { text: "Hagylak beszélni, de nem hallgatok.", score: 3 },
            { text: "Megpróbállak legyőzni érvekkel vagy erővel.", score: 2 }
        ]
    },
    {
        text: "Mit teszel, ha a párod rossz napot zár?",
        options: [
            { text: "Támogatom és meghallgatom.", score: 2 },
            { text: "Azt mondom: 'Nekem is vannak rossz napjaim!'", score: 3 },
            { text: "Figyelmen kívül hagyom, nincs türelmem.", score: 1 }
        ]
    },
    {
        text: "Hogyan viszonyulsz a kompromisszumokhoz?",
        options: [
            { text: "Nyitott vagyok rájuk.", score: 3 },
            { text: "Csak ha nagyon muszáj.", score: 2 },
            { text: "Nem szeretek engedni.", score: 1 }
        ]
    },
    {
        text: "Mit teszel, ha hibázol egy vitában?",
        options: [
            { text: "Beismerem, és bocsánatot kérek.", score: 1 },
            { text: "Kifogásokat keresek.", score: 2 },
            { text: "Elterelem a témát.", score: 3 }
        ]
    }
];

results = [
    {
        text: "A kapcsolatodban sok a feszültség és a konfliktus. Próbáljatok meg többet kommunikálni és megérteni egymást.",
        img: './img/carousel/test/rozsa.png'
    },
    {
        text: "A kapcsolatodban vannak problémák, de van lehetőség a fejlődésre. Fontos, hogy mindketten nyitottak legyetek a változásra és a kompromisszumokra.",
        img: './img/carousel/test/rozsa.png'
    },
    {
        text: "A kapcsolatod erős alapokon áll, de mindig van hová fejlődni. Továbbra is figyeljetek egymásra és támogassátok egymást.",
        img: './img/carousel/test/rozsa.png'
    },
    {
        text: "A kapcsolatod nagyon erős és egészsé   ges. Kiválóan kommunikáltok és támogatjátok egymást. Folytassátok így!",
        img: './img/carousel/test/rozsa.png'
    }
]






//progress bar

let currentProgress = 0;
const totalSegments = questions.length + 2; // Total number of questions


function initializeProgressBar() {
    const progressBar = document.getElementById('progressBarTest');
    progressBar.innerHTML = '';

    // Create progress segments
    for (let i = 0; i < totalSegments; i++) {
        const segment = document.createElement('div');
        segment.className = 'progress-segment';
        progressBar.appendChild(segment);
    }

    // Add arrow
    const arrow = document.createElement('img');
    arrow.className = 'progress-arrow';
    arrow.src = './img/carousel/test/arrow_empty.png';
    arrow.style.width = '43px';
    arrow.style.marginLeft = '-2px';
    progressBar.appendChild(arrow);

    updateProgressDisplay();
}

function updateProgressDisplay() {
    const segments = document.querySelectorAll('.progress-segment');

    segments.forEach((segment, index) => {
        if (index < currentProgress) {
            segment.className = 'progress-segment filled';
        } else {
            segment.className = 'progress-segment empty';
        }
    });
}
// Initialize the progress bar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeProgressBar();
});



//carousel

document.getElementById('startTestBtn').addEventListener('click', () => {
    currentProgress++;
    updateProgressDisplay();
});

function nextslide() {
    currentProgress++;
    updateProgressDisplay();
    document.getElementsByClassName('progress-arrow')[0].src = './img/carousel/test/arrow_filled.png';
    document.querySelector('#imageCarousel4').style.display = 'none';
    document.getElementById('imageCarousel5').classList.add('fade-in');
    document.getElementById('imageCarousel5').style.display = 'block';

}

document.getElementById('finalBtn').addEventListener('click', () => {
    scrollToSection("how-it-works");
});

function startTest() {
    const testWrapper = document.querySelector('.test-wrapper');
    if (testWrapper) {
        testWrapper.style.display = 'block';
        testWrapper.classList.add('fade-in');
    }
    document.getElementsByClassName('start-test-cover')[0].style.display = 'none';
}

const slider = document.getElementById('test-slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;
let answers = new Array(questions.length).fill(null);


function getResultText(score) {
    if (score <= 10) {
        return results[0].text;
    } else if (score <= 20) {
        return results[1].text;
    } else if (score <= 30) {
        return results[2].text;
    } else {
        return results[3].text;
    }
}

function getResultImage(score) {
    if (score <= 10) {
        return results[0].img;
    } else if (score <= 20) {
        return results[1].img;
    } else if (score <= 30) {
        return results[2].img;
    } else {
        return results[3].img;
    }
}

function renderSlides() {
    slider.innerHTML = '';
    questions.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'test-card';

        const h2 = document.createElement('h2');
        h2.textContent = `${idx + 1}. ${q.text}`;
        h2.classList.add('display-3');
        card.appendChild(h2);

        // Add options wrapper
        const optionsWrapper = document.createElement('div');
        optionsWrapper.className = 'options-wrapper';

        q.options.forEach((opt, i) => {
            const btn = document.createElement('div');
            btn.className = 'option';
            btn.textContent = `„${opt.text}”`;

            if (answers[idx] === opt.score) btn.classList.add('selected');

            btn.onclick = () => {
                answers[idx] = opt.score; // Store the score, not the index
                updateSelections();
                console.log('Scores: ' + answers);

                // If all questions answered, jump to result
                if (answers.every(a => a !== null)) {
                    currentProgress = questions.length;
                    currentSlide = questions.length;
                    currentProgress++;
                    updateProgressDisplay();
                    //document.getElementsByClassName('progress-arrow')[0].src = './img/carousel/test/arrow_filled.png';
                    updateSlide();
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                    showResult();
                } else if (currentSlide < questions.length - 1) {
                    currentSlide++;
                    setTimeout(updateSlide, 300);
                }
            };

            optionsWrapper.appendChild(btn);
        });

        card.appendChild(optionsWrapper);

        const footer = document.createElement('div');
        footer.className = 'slider-footer';
        footer.textContent = `Kérdés ${idx + 1} / ${questions.length}`;
        card.appendChild(footer);

        slider.appendChild(card);
    });

    // Result slide (last, hidden until all questions answered)
    const resultCard = document.createElement('div');
    resultCard.className = 'test-card';
    resultCard.innerHTML = `<div class="result" id="result"></div>`;
    const resultText = document.createElement('div');
    resultText.id = 'resultText';
    const resultImg = document.createElement('img');
    resultImg.id = 'resultImg';
    const nextButton = document.createElement('button');
    nextButton.className = 'btn btn-light btn-lg mb-5'; //TODO
    nextButton.textContent = 'Tovább';
    nextButton.onclick = () => {
        //scrollToSection("how-it-works");
        //hideAllCarousel();
        document.querySelector('.test-wrapper').style.display = 'none';
        document.querySelector('#imageCarousel4').style.display = 'block';
        document.querySelector('#imageCarousel4').classList.add('fade-in');
        currentProgress++;
        updateProgressDisplay();
    };
    resultCard.appendChild(resultText);
    resultCard.appendChild(resultImg);
    resultCard.appendChild(nextButton);
    slider.appendChild(resultCard);
}

function updateSelections() {
    const allCards = document.querySelectorAll('.test-card');
    allCards.forEach((card, idx) => {
        if (idx >= questions.length) return;
        const options = card.querySelectorAll('.option');
        options.forEach((optElem, i) => {
            // Compare to the score value, not the index
            optElem.classList.toggle('selected', answers[idx] === questions[idx].options[i].score);
        });
    });
    updateSlide();
    setTimeout(() => { currentProgress++; }, 200);
}

function updateSlide() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    // no next btn at last cartd
    if (currentSlide === questions.length - 1) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
    }
    updateProgressDisplay();
}

function showResult() {
    const totalScore = answers.reduce((sum, val) => sum + (val || 0), 0);
    const result = document.getElementById("result");
    result.innerHTML = `
      <h2>Teszt vége!</h2>
      <h1> Eredményed <strong>${totalScore}</strong> pont</h1>
    `;
    document.getElementById('resultText').innerHTML = getResultText(totalScore);
    document.getElementById('resultImg').src = getResultImage(totalScore);
}

prevBtn.onclick = () => {
    if (currentSlide > 0) {
        currentSlide--;
        currentProgress--;
        updateSlide();
    }
};

nextBtn.onclick = () => {
    if (currentSlide < questions.length) {
        currentSlide++;
        currentProgress++;
        updateSlide();
    } else if (answers.every(a => a !== null)) {
        currentSlide = questions.length;
        updateSlide();
        showResult();
    }
};

// Swipe gesture
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50 && currentSlide < questions.length) {
        currentSlide++;
        updateSlide();
    }
    if (touchEndX > touchStartX + 50 && currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
});

// INIT
renderSlides();
updateSlide();