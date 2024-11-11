// 작업물 목록 정의
const portfolioItems = [
    {
        title: "작업물1",
        link: "project1.html"
    },
    {
        title: "작업물2",
        link: "project2.html"
    }
    // 추가 작업물들...
];

let currentIndex = 0;

// 키보드 방향키 제어
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        updateDisplay();
    } else if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        updateDisplay();
    } else if (event.code === 'Space') {
        event.preventDefault();
        navigateToProject();
    }
});

// 화면 업데이트 함수
function updateDisplay() {
    const display = document.getElementById('itemDisplay');
    display.innerText = portfolioItems[currentIndex].title;
}

// 프로젝트 페이지로 이동
function navigateToProject() {
    window.location.href = portfolioItems[currentIndex].link;
}

// 초기 화면 설정
updateDisplay();
