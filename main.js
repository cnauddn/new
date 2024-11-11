// 전역 상태 관리
const state = {
    isLoading: true,
    currentSection: 0,
    totalSections: 0,
    projects: []
};

// 프로젝트 데이터 초기화
const initializeProjects = () => {
    state.projects = [
        {
            id: 1,
            title: "Project 1",
            description: "Description 1",
            image: "path/to/image1.jpg",
            link: "project1.html"
        },
        {
            id: 2,
            title: "Project 2",
            description: "Description 2",
            image: "path/to/image2.jpg",
            link: "project2.html"
        }
        // 추가 프로젝트...
    ];
    state.totalSections = state.projects.length;
};

// DOM 요소 생성 및 초기화
const initializeDOM = () => {
    const mainContainer = document.createElement('div');
    mainContainer.id = 'main-container';
    
    state.projects.forEach((project, index) => {
        const section = createProjectSection(project, index);
        mainContainer.appendChild(section);
    });
    
    document.body.appendChild(mainContainer);
};

// 프로젝트 섹션 생성
const createProjectSection = (project, index) => {
    const section = document.createElement('div');
    section.className = 'project-section';
    section.id = `project-${project.id}`;
    
    section.innerHTML = `
        <div class="project-content">
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
        </div>
    `;
    
    return section;
};

// 로딩 화면 관리
const handleLoading = () => {
    const loader = document.createElement('div');
    loader.id = 'loader';
    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        state.isLoading = false;
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    });
};

// 스크롤 애니메이션
const handleScroll = () => {
    const sections = document.querySelectorAll('.project-section');
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            state.currentSection = index;
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
};

// 이벤트 리스너 설정
const setupEventListeners = () => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
        // 리사이즈 처리 로직
    });
};

// 초기화 함수
const initialize = () => {
    handleLoading();
    initializeProjects();
    initializeDOM();
    setupEventListeners();
};

// 앱 시작
document.addEventListener('DOMContentLoaded', initialize);

// 외부에서 접근 가능한 메서드들
export const mainController = {
    getCurrentSection: () => state.currentSection,
    getTotalSections: () => state.totalSections,
    navigateToSection: (index) => {
        const section = document.querySelector(`#project-${state.projects[index].id}`);
        section.scrollIntoView({ behavior: 'smooth' });
    }
};
