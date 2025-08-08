// Quiz functionality
let currentQuestion = 1;
let correctAnswers = 0;
const totalQuestions = 7;

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Add subtle parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Quiz Logic
document.addEventListener('DOMContentLoaded', function () {
    initializeQuiz();
});

function initializeQuiz() {
    // Add click event listeners to all answer options
    document.querySelectorAll('.answer-option').forEach(option => {
        option.addEventListener('click', function () {
            selectAnswer(this);
        });
    });
}

function selectAnswer(selectedOption) {
    const question = selectedOption.closest('.quiz-question');
    const allOptions = question.querySelectorAll('.answer-option');
    const feedback = question.querySelector('.feedback');
    const isCorrect = selectedOption.hasAttribute('data-correct');

    // Disable all options in this question
    allOptions.forEach(option => {
        option.style.pointerEvents = 'none';

        if (option.hasAttribute('data-correct')) {
            option.classList.add('correct');
        } else if (option === selectedOption && !isCorrect) {
            option.classList.add('incorrect');
        }
    });

    // Show feedback
    
    if (isCorrect) {
        correctAnswers++;
        //feedback.innerHTML = '✓ Helyes válasz! Nagyszerű, megértetted a lényeget.';
       // feedback.className = 'feedback correct';
    } else {
        const correctOption = question.querySelector('[data-correct="true"]');
        const correctLetter = correctOption.getAttribute('data-answer');
        //feedback.innerHTML = `✗ Helytelen válasz. A helyes válasz: ${correctLetter}`;
        //feedback.className = 'feedback incorrect';
    }

    //feedback.classList.remove('hidden');

    // Update progress
    updateProgress();

    // Move to next question after delay
    setTimeout(() => {
        if (currentQuestion < totalQuestions) {
            showNextQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showNextQuestion() {
    // Hide current question
    const current = document.querySelector(`[data-question="${currentQuestion}"]`);
    current.classList.add('hidden');

    // Show next question
    currentQuestion++;
    const next = document.querySelector(`[data-question="${currentQuestion}"]`);
    next.classList.remove('hidden');

    // Update progress display
    document.getElementById('current-question').textContent = currentQuestion;
    updateProgress();
}

function updateProgress() {
    const progressPercent = (currentQuestion / totalQuestions) * 100;
    document.getElementById('quiz-progress').style.width = `${progressPercent}%`;
}

function showResults() {
    // Hide current question
    const current = document.querySelector(`[data-question="${currentQuestion}"]`);
    current.classList.add('hidden');

    // Hide progress bar
    document.querySelector('.quiz-progress').style.display = 'none';

    // Show results
    const results = document.getElementById('quiz-results');
    results.classList.remove('hidden');

    // Calculate and display score
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    document.getElementById('final-score').textContent = `${correctAnswers}/${totalQuestions}`;
    document.getElementById('score-percentage').textContent = `${percentage}%`;

    // Show personalized message based on score
    let message = '';
    if (percentage >= 85) {
        message = 'Kiváló! Teljesen megértetted a belső térképek működését. Készen állsz arra, hogy tudatosabban építsd a kapcsolataidat.';
    } else if (percentage >= 70) {
        message = 'Nagyon jó! Jól megértetted a főbb pontokat. Egy kis további elmélyedéssel teljesen tisztában leszel a témával.';
    } else if (percentage >= 50) {
        message = 'Jó kezdet! Megértetted az alapokat, de érdemes újraolvasni a cikket a részletek jobb megértése érdekében.';
    } else {
        message = 'Ne izgulj! Ez egy összetett téma. Olvasd át újra a cikket, és próbálkozz újra a kvízzel.';
    }

    document.getElementById('result-message').innerHTML = message;
}

function restartQuiz() {
    // Reset variables
    currentQuestion = 1;
    correctAnswers = 0;

    // Reset UI
    document.getElementById('current-question').textContent = '1';
    document.getElementById('quiz-progress').style.width = '14.28%';
    document.querySelector('.quiz-progress').style.display = 'block';

    // Hide results
    document.getElementById('quiz-results').classList.add('hidden');

    // Reset all questions
    document.querySelectorAll('.quiz-question').forEach((question, index) => {
        if (index === 0) {
            question.classList.remove('hidden');
        } else {
            question.classList.add('hidden');
        }

        // Reset options
        question.querySelectorAll('.answer-option').forEach(option => {
            option.style.pointerEvents = 'auto';
            option.className = 'answer-option';
        });

        // Hide feedback
        const feedback = question.querySelector('.feedback');
        feedback.classList.add('hidden');
    });
}
