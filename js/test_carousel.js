const questions = [
    {
        text: "Ha a párod valamiért szól neked, mit mondasz a leggyakrabban?",
        options: [
            { text: "Te is mindig ezt csinálod!", score: 2 },
            { text: "Sajnálom, igazad van, figyelni fogok rá.", score: 3 },
            { text: "Ezzel csak megint engem idegesítesz, nem hiszem el, hogy ilyen vagy.", score: 1 }
        ]
    },
    {
        text: "Hogyan szoktál elindítani egy konfliktust?",
        options: [
            { text: "Nem indítom el.", score: 1 },
            { text: "Most tényleg megint én vagyok a rossz?", score: 2 },
            { text: "Zavar, hogy nem értünk egyet, de inkább megpróbálok megoldást keresni.", score: 3 }
        ]
    },
    {
        text: "Mi történik benned a veszekedés közben?",
        options: [
            { text: "Folyamatosan magyarázkodom vagy visszatámadok, hogy védjem magam.", score: 2 },
            { text: "Totálisan lekapcsolok. Testben ott vagyok, de lélekben kiléptem.", score: 1 },
            { text: "Próbálok figyelni rá, még ha nehéz is.", score: 3 }
        ]
    },
    {
        text: "Mit szoktál mondani, amikor a párod rámutat egy hibádra?",
        options: [
            { text: "Erre most nem szeretnék indulatból reagálni, kérlek, térjünk rá vissza később ha én is átgondoltam.", score: 3 },
            { text: "Te beszélsz? Állandóan csak kipécézel, ahelyett, hogy a magad dolgával foglalkoznál.", score: 1 },
            { text: "Ne hibáztass légyszíves, egy csapat vagyunk, együtt kell a dolgokat megoldanunk..", score: 2 }
        ]
    },
    {
        text: "Vita után mi a jellemző rád?",
        options: [
            { text: "Napokig nem vagyok hajlandó beszélni a párommal.", score: 1 },
            { text: "Legközelebb újra felhozom ezt a témát vagy egy másikat, hogy visszavágjak.", score: 2 },
            { text: "Próbálom beleélni magam az ő szemszögébe is, és visszajelzek neki, hogy hogyan esett nekem ez a vita.", score: 3 }
        ]
    },
    {
        text: "Mit gondolsz, amikor a párod panaszkodik?",
        options: [
            { text: "Én sem vagyok jó passzban.", score: 2 },
            { text: "Neked mindig valami bajod van.", score: 1 },
            { text: "Nehéz ezt kimondani, de lehet, hogy igaza van.", score: 3 }
        ]
    },
    {
        text: "Mi az, amit a leggyakrabban teszel viták alatt?",
        options: [
            { text: "Inkább nem szólok semmit, kibekkelem, amíg vége lesz.", score: 1 },
            { text: "Kérdezek, igyekszem megérteni az ő oldalát is.", score: 3 },
            { text: "Elmondom, hogy nekem miért rosszabb.", score: 2 }
        ]
    }
];

results = [
    {
        headline: "Kapcsolódó kommunikátor",
        text: "A konfliktus számodra nem háború, hanem lehetőség, hogy jobbá, őszintébbé váljon a kapcsolatotok. Képes vagy szabályozni az érzéseidet, és megőrizni a kapcsolat biztonságát akkor is, ha nehéz. Ez nem azt jelenti, hogy a kapcsolatotok tökéletes, de azt igen, hogy megpróbálsz nyíltan, empatikusan kommunikálni róla. Csak így tovább!",
        img: './img/carousel/test/kapcsolodo.png'
    },
    {
        headline: "Veszélyes minták jelen vannak",
        text: "Valószínűleg időnként kritikusan, védekezően, vagy elzárkózva reagálsz a feszültségekre -  és talán már észrevetted, hogy ezek a minták nem előrevisznek, hanem eltávolítanak. A jó hír? Az, hogy már észrevetted ezt, azt jelzi: van benned önreflexió. És ez az első lépés a változáshoz.",
        img: './img/carousel/test/rozsa.png'
    },
    {
        headline: "A felismerés az első lépés",
        text: "A konfliktus nálad gyakran megszólalás helyett hallgatást, meghallgatás helyett támadást hoz. Lehet, hogy nem tanultál mást. Lehet, hogy fáradt vagy. De ez a felismerés nem a vég,  hanem egy új működés kezdete lehet. Fontos, hogy használd a kommunikációs önismereti és TeddMegMa gyakorlatokat, akár többször is ugyanazt. Ezek segítenek abban, hogy a kommunikáció ne egy olyan terület legyen, ami önmagában gyilkolja a kapcsolatotokat.",
        img: './img/carousel/test/utelagazas.png'
    }
];

function getResult(score) {
    if (score <= 12) {
        return results[2];
    } else if (13 <= score && score <= 17) {
        return results[1];
    } else {
        return results[0];
    }
}

//progress bar
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



//carousel
const slider = document.getElementById('testSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
let answers = new Array(questions.length).fill(null);


function resetTestCarousel() {
    currentSlide = 0;
    answers = new Array(questions.length).fill(null); // Reset answers array
    currentProgress = 0;
    updateProgressDisplay();
    slider.style.transform = `translateX(0)`;
    document.getElementsByClassName('progress-arrow')[0].src = './img/carousel/test/arrow_empty.png';
    document.getElementById('prevBtn').style.display = "block";

    // Remove selected classes from options
    const allCards = document.querySelectorAll('.test-card');
    allCards.forEach((card, idx) => {
        if (idx >= questions.length) return;
        const options = card.querySelectorAll('.option');
        options.forEach(optElem => optElem.classList.remove('selected'));
    });

    // Hide result slide if visible
    const resultCard = document.getElementById('result');
    if (resultCard) {
        resultCard.innerHTML = '';
    }

    // Show first question card, hide others
    renderSlides();
    updateSlide();
}


document.getElementById('startTestBtn').addEventListener('click', () => {
    currentProgress++;
    updateProgressDisplay();
    startTest();
});

document.getElementById('nextslide1').addEventListener('click', () => {
    currentProgress++;
    updateProgressDisplay();
    //document.getElementsByClassName('progress-arrow')[0].src = './img/carousel/test/arrow_filled.png';
    document.querySelector('#imageCarousel4').style.display = 'none';
    document.getElementById('imageCarousel5').classList.add('slide-in');
    document.getElementById('imageCarousel5').style.display = 'block';
});

document.getElementById('nextslide2').addEventListener('click', () => {
    currentProgress++;
    updateProgressDisplay();
    document.getElementsByClassName('progress-arrow')[0].src = './img/carousel/test/arrow_filled.png';
    document.querySelector('#imageCarousel5').style.display = 'none';
    document.getElementById('imageCarousel6').classList.add('slide-in');
    document.getElementById('imageCarousel6').style.display = 'block';
});

document.getElementById('finalBtn').addEventListener('click', () => {
    resetTestCarousel();
    scrollToSection("how-it-works");
    hideAllCarousel();
    document.querySelector('#imageCarousel6').style.display = 'none';
    document.getElementById('imageCarousel6').classList.remove('slide-in');
    document.getElementById('testOpenSlide').style.display = 'block';
    //document.getElementById('testOpenSlide').classList.add('slide-in');
});




function startTest() {
    const testWrapper = document.querySelector('#testWrapper');
    if (testWrapper) {
        testWrapper.style.display = 'block';
        testWrapper.classList.add('slide-in');
    }
    document.getElementById('testOpenSlide').style.display = 'none';
}

function renderSlides() {
    slider.innerHTML = '';
    questions.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'test-card';

        const h2 = document.createElement('h2');
        h2.textContent = `${idx + 1}. ${q.text}`;
        h2.classList.add('test-card-hl');
        h2.classList.add('mt-5');
        card.appendChild(h2);

        // Add options wrapper
        const optionsWrapper = document.createElement('div');
        optionsWrapper.className = 'options-wrapper mt-3';

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
        footer.className = 'card-footer';
        footer.textContent = `Kérdés ${idx + 1} / ${questions.length}`;
        card.appendChild(footer);

        slider.appendChild(card);
    });

    // Result slide (last, hidden until all questions answered)
    const resultCard = document.createElement('div');
    resultCard.className = 'test-card';
    resultCard.innerHTML = `<div class="result" id="result"></div>`;
    const resultTextHL = document.createElement('div');
    resultTextHL.id = 'resultTextHL';
    const resultText = document.createElement('div');
    resultText.id = 'resultText';
    const resultImg = document.createElement('img');
    resultImg.id = 'resultImg';
    resultImg.className = 'test-img-bottom';
    const nextButton = document.createElement('button');
    nextButton.className = 'btn btn-bottom';
    nextButton.textContent = 'Tovább';
    nextButton.onclick = () => {
        document.querySelector('#testWrapper').style.display = 'none';
        document.querySelector('#imageCarousel5').style.display = 'block';
        document.querySelector('#imageCarousel5').classList.add('slide-in');
        currentProgress++;
        updateProgressDisplay();
    };
    resultCard.appendChild(resultTextHL);
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
      <h1> Eredményed <strong>${totalScore}</strong> pont</h1>
    `;
    document.getElementById('resultTextHL').innerHTML = getResult(totalScore).headline;
    document.getElementById('resultText').innerHTML = getResult(totalScore).text;
    document.getElementById('resultImg').src = getResult(totalScore).img;
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