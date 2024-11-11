// Cursor Effect
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1
    });
    
    gsap.to(cursorFollower, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.3
    });
});

// Magnetic Buttons
document.querySelectorAll('.magnetic-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(button, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.3
        });
    });
});

// Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Text Animation
gsap.from('.animate-text', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: 'power3.out'
});

// Section Animations
document.querySelectorAll('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        duration: 1
    });
});

// Parallax Background
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    gsap.to('.hero-background', {
        x: moveX,
        y: moveY,
        duration: 1
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        gsap.to(window, {
            duration: 1,
            scrollTo: target,
            ease: 'power3.inOut'
        });
    });
});
