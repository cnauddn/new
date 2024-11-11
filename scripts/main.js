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
// 커서 시스템
class CursorSystem {
    constructor() {
        this.cursor = document.querySelector('.cursor-main');
        this.trail = document.querySelector('.cursor-trail');
        this.dot = document.querySelector('.cursor-dot');
        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.speed = 0.1;
        
        this.init();
    }
    
    init() {
        // 마우스 이동 추적
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // 애니메이션 루프
        this.animate();
        
        // 인터랙티브 요소 이벤트
        this.handleInteractions();
    }
    
    animate() {
        // 부드러운 커서 이동
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
        
        // 커서 요소 위치 업데이트
        this.cursor.style.transform = `translate(${this.pos.x - 15}px, ${this.pos.y - 15}px)`;
        this.trail.style.transform = `translate(${this.mouse.x - 5}px, ${this.mouse.y - 5}px)`;
        this.dot.style.transform = `translate(${this.mouse.x - 2}px, ${this.mouse.y - 2}px)`;
        
        requestAnimationFrame(() => this.animate());
    }
    
    handleInteractions() {
        // 마그네틱 요소
        document.querySelectorAll('.magnetic-element').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                this.cursor.style.transform = `translate(${this.pos.x - 15}px, ${this.pos.y - 15}px) scale(1.5)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
                this.cursor.style.transform = `translate(${this.pos.x - 15}px, ${this.pos.y - 15}px) scale(1)`;
            });
        });
    }
}

// 파티클 시스템
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for(let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                speed: 2,
                size: Math.random() * 3
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            // 파티클 움직임 로직
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if(dist < 100) {
                p.x += (dx / dist) * p.speed;
                p.y += (dy / dist) * p.speed;
            }
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255,255,255,0.5)';
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    const cursorSystem = new CursorSystem();
    const particleSystem = new ParticleSystem();
    
    // 성능 최적화
    let rafId = null;
    const optimizedScroll = () => {
        if(rafId) return;
        rafId = requestAnimationFrame(() => {
            // 스크롤 기반 효과
            rafId = null;
        });
    };
    
    window.addEventListener('scroll', optimizedScroll);
});

// 모바일 체크 함수
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// 모바일일 경우 커서 시스템 비활성화
if(isMobile()) {
    document.querySelector('.cursor-system').style.display = 'none';
} else {
    // 데스크톱에서만 커서 시스템 초기화
    const cursorSystem = new CursorSystem();
}

// 스무스 스크롤 구현
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 페이드인 애니메이션
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);

// 프로젝트 카드 호버 효과
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

