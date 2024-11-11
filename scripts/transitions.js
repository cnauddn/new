class PageTransitionManager {
    constructor() {
        this.overlay = document.querySelector('.transition-overlay');
        this.slide = document.querySelector('.transition-slide');
        this.loader = document.querySelector('.transition-loader');
        this.wrapper = document.querySelector('#page-wrapper');
        this.content = document.querySelector('#content');
        
        this.cache = new Map();
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        // 링크 클릭 이벤트 처리
        document.addEventListener('click', e => {
            const link = e.target.closest('a');
            if (link && link.href.startsWith(window.location.origin)) {
                e.preventDefault();
                this.navigate(link.href);
            }
        });
        
        // 브라우저 히스토리 처리
        window.addEventListener('popstate', e => {
            this.navigate(window.location.href, true);
        });
    }
    
    async navigate(url, isPopState = false) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        // 트랜지션 시작
        await this.startTransition();
        
        try {
            // 페이지 콘텐츠 로드
            const content = await this.loadPage(url);
            
            // 히스토리 업데이트
            if (!isPopState) {
                history.pushState({}, '', url);
            }
            
            // 콘텐츠 업데이트
            await this.updateContent(content);
            
        } catch (error) {
            console.error('Navigation error:', error);
        }
        
        // 트랜지션 종료
        await this.endTransition();
        this.isTransitioning = false;
    }
    
    async startTransition() {
        return new Promise(resolve => {
            this.overlay.style.visibility = 'visible';
            
            gsap.timeline()
                .to(this.slide, {
                    y: '0%',
                    duration: 0.5,
                    ease: 'power2.inOut'
                })
                .to(this.loader, {
                    opacity: 1,
                    duration: 0.3,
                    onComplete: resolve
                });
        });
    }
    
    async loadPage(url) {
        // 캐시 확인
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }
        
        // 새 페이지 로드
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.querySelector('#content').innerHTML;
        
        // 캐시 저장
        this.cache.set(url, content);
        
        return content;
    }
    
    async updateContent(content) {
        return new Promise(resolve => {
            // 3D 회전 효과
            gsap.to(this.wrapper, {
                rotationY: 90,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    // 콘텐츠 업데이트
                    this.content.innerHTML = content;
                    
                    // 회전 복구
                    gsap.to(this.wrapper, {
                        rotationY: 0,
                        duration: 0.5,
                        ease: 'power2.inOut',
                        onComplete: resolve
                    });
                }
            });
        });
    }
    
    async endTransition() {
        return new Promise(resolve => {
            gsap.timeline()
                .to(this.loader, {
                    opacity: 0,
                    duration: 0.3
                })
                .to(this.slide, {
                    y: '-100%',
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        this.overlay.style.visibility = 'hidden';
                        this.slide.style.transform = 'translateY(100%)';
                        resolve();
                    }
                });
        });
    }
    
    // 모바일 최적화
    isMobile() {
        return window.innerWidth <= 768;
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    const transitionManager = new PageTransitionManager();
});
