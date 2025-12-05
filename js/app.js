// Main JavaScript file for GSAP animations and interactions

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Hero section entrance animations
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroLogo = document.getElementById('hero-logo');

    // Animate hero title
    if (heroTitle) {
        gsap.from(heroTitle, {
            duration: 1.5,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.8
        });
    }

    // Animate logo
    if (heroLogo) {
        heroLogo.onerror = function() {
            // Hide logo container if image fails to load
            this.style.display = 'none';
        };
        
        gsap.from(heroLogo, {
            duration: 1.5,
            scale: 0.8,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.2
        });
    }

    // Animate subtitle
    gsap.from(heroSubtitle, {
        duration: 1.5,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 1.5
    });

    gsap.from(scrollIndicator, {
        duration: 1,
        opacity: 0,
        y: -20,
        ease: 'power2.out',
        delay: 2.5
    });

    // Parallax effect on mouse move (subtle for subtitle only)
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 10;
        const yPos = (clientY / innerHeight - 0.5) * 10;

        gsap.to(heroSubtitle, {
            duration: 1,
            x: xPos * 0.5,
            y: yPos * 0.5,
            ease: 'power2.out'
        });

        if (heroLogo) {
            gsap.to(heroLogo, {
                duration: 1,
                x: xPos * 0.3,
                y: yPos * 0.3,
                ease: 'power2.out'
            });
        }
    });
}

// About section animations
function initAboutAnimations() {
    const aboutContent = document.querySelector('.about-content');
    const aboutText = document.querySelector('.about-text');

    gsap.from(aboutContent, {
        scrollTrigger: {
            trigger: aboutContent,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from(aboutText, {
        scrollTrigger: {
            trigger: aboutText,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.2
    });
}

// Gallery section animations and 3D effects
function initGalleryAnimations() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    const sectionTitle = document.querySelector('#gallery .section-title');

    // Animate section title
    gsap.from(sectionTitle, {
        scrollTrigger: {
            trigger: sectionTitle,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    });

    // Animate gallery cards
    galleryCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            rotationY: -20,
            ease: 'power3.out',
            delay: index * 0.1
        });

        // 3D hover effect with GSAP
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.6,
                rotationY: 15,
                rotationX: 5,
                scale: 1.05,
                z: 50,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.6,
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                z: 0,
                ease: 'power2.out'
            });
        });

        // Click to open lightbox
        card.addEventListener('click', () => {
            openLightbox(card);
        });
    });
}

// Social media section animations
function initSocialAnimations() {
    const socialSection = document.querySelector('.social');
    const socialCards = document.querySelectorAll('.social-card');
    const sectionTitle = document.querySelector('#social .section-title');

    // Animate section title
    gsap.from(sectionTitle, {
        scrollTrigger: {
            trigger: sectionTitle,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    });

    // Animate social cards
    socialCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            scale: 0.8,
            rotationY: -30,
            ease: 'back.out(1.7)',
            delay: index * 0.15
        });

        // Enhanced 3D hover effect
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.5,
                scale: 1.05,
                rotationY: 5,
                z: 30,
                boxShadow: '0 20px 60px rgba(212, 175, 55, 0.4)',
                ease: 'power2.out'
            });

            // Animate icon
            const icon = card.querySelector('.social-icon');
            gsap.to(icon, {
                duration: 0.5,
                scale: 1.2,
                rotationY: 10,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                scale: 1,
                rotationY: 0,
                z: 0,
                ease: 'power2.out'
            });

            const icon = card.querySelector('.social-icon');
            gsap.to(icon, {
                duration: 0.5,
                scale: 1,
                rotationY: 0,
                ease: 'power2.out'
            });
        });
    });
}

// Contact section animations
function initContactAnimations() {
    const contactForm = document.querySelector('.contact-form');
    const sectionTitle = document.querySelector('#contact .section-title');
    const formGroups = document.querySelectorAll('.form-group');

    // Animate section title
    gsap.from(sectionTitle, {
        scrollTrigger: {
            trigger: sectionTitle,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    });

    // Animate form
    gsap.from(contactForm, {
        scrollTrigger: {
            trigger: contactForm,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Animate form groups
    formGroups.forEach((group, index) => {
        gsap.from(group, {
            scrollTrigger: {
                trigger: contactForm,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            x: -30,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.2 + index * 0.1
        });
    });

    // Submit button animation
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('mouseenter', () => {
        gsap.to(submitBtn, {
            duration: 0.3,
            scale: 1.05,
            ease: 'power2.out'
        });
    });

    submitBtn.addEventListener('mouseleave', () => {
        gsap.to(submitBtn, {
            duration: 0.3,
            scale: 1,
            ease: 'power2.out'
        });
    });
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

function openLightbox(card) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Get image from card or use data attribute
    const cardImg = card.querySelector('.gallery-image');
    const imageNum = card.getAttribute('data-image');
    
    if (cardImg && cardImg.src) {
        lightboxImg.src = cardImg.src;
        lightboxImg.alt = cardImg.alt || `عمل فني ${imageNum}`;
    } else {
        lightboxImg.src = `assets/images/artwork-${imageNum}.jpg`;
        lightboxImg.alt = `عمل فني ${imageNum}`;
    }

    // Show lightbox with animation
    lightbox.classList.add('active');
    gsap.from(lightbox, {
        duration: 0.3,
        opacity: 0
    });
    gsap.from(lightboxImg, {
        duration: 0.5,
        scale: 0.8,
        opacity: 0,
        ease: 'power2.out'
    });
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    gsap.to(lightbox, {
        duration: 0.3,
        opacity: 0,
        onComplete: () => {
            lightbox.classList.remove('active');
        }
    });
}

// Smooth scroll for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Use native smooth scroll as fallback
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form submission handling
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Animate button
        gsap.to(submitBtn, {
            duration: 0.3,
            scale: 0.95,
            onComplete: () => {
                submitBtn.textContent = 'جاري الإرسال...';
                submitBtn.disabled = true;
                
                // Submit form
                form.submit();
                
                // Reset after delay (in case of error)
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    gsap.to(submitBtn, {
                        duration: 0.3,
                        scale: 1
                    });
                }, 3000);
            }
        });
    });
}

// Lazy loading for gallery images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        const tempImg = new Image();
                        tempImg.onload = () => {
                            img.src = src;
                            img.classList.add('loaded');
                            img.removeAttribute('data-src');
                        };
                        tempImg.src = src;
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.classList.add('loaded');
            }
        });
    }
}

// Initialize all animations when DOM is ready
function init() {
    initHeroAnimations();
    initAboutAnimations();
    initGalleryAnimations();
    initSocialAnimations();
    initContactAnimations();
    initLightbox();
    initSmoothScroll();
    initFormHandling();
    initLazyLoading();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

