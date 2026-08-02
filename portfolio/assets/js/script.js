// ====== PRELOADER ======
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 1500);
});

// ====== CUSTOM CURSOR ======
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .btn, .project-card, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
    });
}

// ====== NAVBAR ======
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ====== NAVBAR SCROLL EFFECT ======
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ====== TYPING EFFECT ======
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 80);
    }
});

// ====== SKILLS ANIMATION ======
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    skillBars.forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = width;
    });
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ====== STATISTICS ANIMATION ======
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    
    stats.forEach(stat => {
        const target = parseFloat(stat.dataset.target);
        const isFloat = target % 1 !== 0;
        const duration = 2500;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = target * easeOutQuart;
            
            stat.textContent = isFloat ? current.toFixed(1) : Math.round(current);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = isFloat ? target.toFixed(1) : Math.round(target);
            }
        }
        requestAnimationFrame(updateCounter);
    });
    statsAnimated = true;
}

const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
}

// ====== COUNT-UP FOR ABOUT SECTION ======
const countUps = document.querySelectorAll('.count-up');
let countUpAnimated = false;

function animateCountUps() {
    if (countUpAnimated) return;
    
    countUps.forEach(el => {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(target * easeOutQuart);
            
            el.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(updateCounter);
    });
    countUpAnimated = true;
}

const aboutSection = document.querySelector('.about-preview');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCountUps();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(aboutSection);
}

// ====== FAQ ACCORDION ======
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ====== BACK TO TOP ======
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ====== BUTTON RIPPLE EFFECT ======
document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ====== AOS INITIALIZATION ======
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// ====== PARTICLES.JS ======
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#6c63ff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6c63ff',
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.3
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

console.log('🚀 Portfolio loaded successfully!');
console.log('👨‍💻 Built with ❤️ by Harsh Patil');