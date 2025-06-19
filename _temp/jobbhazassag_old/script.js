 // Progress bar
 function updateProgressBar() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateProgressBar);

// Floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 12) + 's';
    heart.style.opacity = Math.random() * 0.3 + 0.1;
    document.getElementById('floatingHearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 15000);
}

// Create hearts periodically
//setInterval(createHeart, 3000);

// Smooth scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}








// Program start function
function startProgram(type) {
    // Animation effect
    const button = event.target;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Indítás...';
    button.disabled = true;

    //TODO
    
    setTimeout(() => {
        // Here you would integrate with your payment/registration system
        alert(`Köszönjük az érdeklődést! ${type === 'couple' ? 'Páros' : type === 'single' ? 'Egyéni' : ''} program indítása...`);
        button.innerHTML = '<i class="fas fa-heart me-2"></i>Elkezdem most!';
        button.disabled = false;
    }, 2000);
}







// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
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
        card.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Counter animation for pricing
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('hu-HU');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString('hu-HU');
            }
        }, 20);
    }

    // Add testimonial rotation
    const testimonials = [
        {
            name: "Zsófi és Bence",
            text: "Az első heti gyakorlat után először mondta Bence: 'Köszönöm, hogy most nem vágtál közbe.' Aznap sírtunk. Aztán elkezdtünk hallani egymást."
        },
        {
            name: "Kata",
            text: "Évek óta azt éreztem, hogy senki nem lát engem igazán. Megtanultam nem csak adni, hanem kapcsolódni."
        },
        {
            name: "Péter",
            text: "A feladatok segítettek megérteni: az érintés nem követel, hanem ad."
        }
    ];

    // Add trust indicators
    const trustSection = document.createElement('div');
    trustSection.className = 'py-3 text-center';
    trustSection.style.background = 'white';
    trustSection.innerHTML = `
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-3 mb-2">
                    <i class="fas fa-shield-alt text-success me-2"></i>
                    <small class="text-muted">Pénzvisszafizetési garancia</small>
                </div>
                <div class="col-md-3 mb-2">
                    <i class="fas fa-user-md text-primary me-2"></i>
                    <small class="text-muted">Pszichológus által fejlesztve</small>
                </div>
                <div class="col-md-3 mb-2">
                    <i class="fas fa-calendar-days text-info me-2"></i><small>28 nap</small></small>
                </div>
                <div class="col-md-3 mb-2">
                    <i class="fas fa-clock text-warning me-2"></i>
                    <small class="text-muted">Napi 10–15 perc</small>
                </div>
            </div>
        </div>
    `;
    
    // Insert trust indicators after pricing
    const pricingSection = document.getElementById('pricing').parentNode;
    pricingSection.appendChild(trustSection);

    // Add mobile-specific improvements
    if (window.innerWidth < 768) {
        // Adjust sticky CTA for mobile
        const stickyCTA = document.querySelector('.sticky-cta');
        if (stickyCTA) {
            stickyCTA.classList.remove('d-none', 'd-lg-block');
            stickyCTA.style.bottom = '10px';
            stickyCTA.style.right = '10px';
        }
        
        // Make hero text more readable on mobile
        const heroTitle = document.querySelector('.hero-section h1');
        if (heroTitle) {
            heroTitle.classList.remove('display-4');
            heroTitle.classList.add('h2');
        }
    }

    // Add engagement tracking
    let engagementScore = 0;
    const trackEngagement = (action) => {
        engagementScore++;
        //console.log(`Engagement: ${action}, Score: ${engagementScore}`);
        
        // Show special offer after high engagement
        if (engagementScore > 5) {
            setTimeout(() => {
                if (!localStorage.getItem('special_offer_shown')) {
                    //showSpecialOffer();
                }
            }, 3000);
        }
    };

    // Track various interactions
    document.addEventListener('scroll', () => trackEngagement('scroll'));
    document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('mouseenter', () => trackEngagement('module_hover'));
    });
    document.querySelectorAll('.story-card').forEach(card => {
        card.addEventListener('click', () => trackEngagement('story_click'));
    });

    function showSpecialOffer() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" style="border: 3px solid var(--accent-orange);">
                    <div class="modal-header" style="background: linear-gradient(135deg, var(--primary-teal), var(--light-teal)); color: white;">
                        <h5 class="modal-title"><i class="fas fa-gift me-2"></i>Különleges ajánlat!</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <h4 class="text-primary-teal mb-3">🎉 Látom, hogy komolyan gondolod!</h4>
                        <p>Mivel időt töltöttél a program megismerésével, <strong>15% kedvezményt</strong> adunk!</p>
                        <div class="alert alert-warning">
                            <strong>Páros csomag most csak: 11.900 Ft</strong><br>
                            <small>(eredeti ár: 14.000 Ft)</small>
                        </div>
                        <p class="small text-muted">Ez az ajánlat csak ma érvényes!</p>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-primary-custom" onclick="startProgram('special')">
                            Élem a lehetőséggel!
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
        
        // Remember that we showed the offer
        // Note: Using a simple flag instead of localStorage due to artifact restrictions
        window.specialOfferShown = true;
    }
});