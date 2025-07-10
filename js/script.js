
// Add smooth animations and enhanced interactivity
document.addEventListener('DOMContentLoaded', function () {
    const moduleHeaders = document.querySelectorAll('.module-header');

    moduleHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // Add a subtle pulse effect when clicked
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Add fade-in animation to content when it's shown
    const collapseElements = document.querySelectorAll('.collapse');
    collapseElements.forEach(collapse => {
        collapse.addEventListener('shown.bs.collapse', function () {
            const content = this.querySelector('.module-body');
            content.classList.add('fade-in');
        });

        collapse.addEventListener('hidden.bs.collapse', function () {
            const content = this.querySelector('.module-body');
            content.classList.remove('fade-in');
        });
    });
});

/*
// Progress bar
function updateProgressBar() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateProgressBar);
*/

// Smooth scrolling
function scrollToSection(sectionId) {
    setTimeout(() => {
        document.getElementById(sectionId).scrollIntoView({
            behavior: 'smooth'
        });
    }, 70);
}


// Add some interactive elements
document.addEventListener('DOMContentLoaded', function () {
    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.section-card, .module-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add click effects to story cards
    document.querySelectorAll('.story-card').forEach(card => {
        card.addEventListener('click', function () {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });


    // Add mobile-specific improvements
    if (window.innerWidth < 768) {

        // Make hero text more readable on mobile
        const heroTitle = document.querySelector('.hero-section h1');
        if (heroTitle) {
            heroTitle.classList.remove('display-4');
            heroTitle.classList.add('h2');
        }
    }
});