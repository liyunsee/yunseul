// 마우스 별 효과
document.addEventListener("DOMContentLoaded", function () {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // 커스텀 마우스 커서 생성
  const customCursor = document.createElement("div");
  customCursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.79) 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.84), 0 0 30px rgba(255, 255, 255, 1);
    border: none;
    outline: none;
  `;
  document.body.appendChild(customCursor);

  // 기본 커서 숨기기
  document.body.style.cursor = "none";

  // 성능 최적화를 위한 throttle 변수
  let lastStarTime = 0;
  const starThrottle = 100; // 100ms마다 별 생성 가능

  // 마우스 위치 추적
  let rafId;
  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // requestAnimationFrame으로 최적화
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;

      // 현재 마우스가 있는 요소 확인
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isInSection2 =
        elementUnderMouse && elementUnderMouse.closest(".section2");
      const isInBannerSection =
        elementUnderMouse && elementUnderMouse.closest(".banner-section");
      const isInYunseulPicture =
        elementUnderMouse && elementUnderMouse.closest(".yunseul-picture");
      const isInContectSection =
        elementUnderMouse && elementUnderMouse.closest(".contect-section");

      // 커스텀 커서 색상 변경
      if (
        isInSection2 ||
        isInYunseulPicture ||
        isInBannerSection ||
        isInContectSection
      ) {
        // section2, banner-section, yunseul-picture, contect-section에서는 기본 밝은 색상
        customCursor.style.background =
          "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)";
        customCursor.style.boxShadow =
          "0 0 15px rgba(255, 255, 255, 0.88), 0 0 30px rgba(251, 253, 255, 0.83)";
      } else {
        // 다른 영역에서는 검은색
        customCursor.style.background =
          "radial-gradient(circle, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.9) 50%, transparent 100%)";
        customCursor.style.boxShadow =
          "0 0 15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.9)";
      }

      // 커스텀 커서 위치 업데이트
      customCursor.style.left = mouseX + "px";
      customCursor.style.top = mouseY + "px";

      // 별 생성 throttle
      const now = Date.now();
      if (now - lastStarTime >= starThrottle && Math.random() < 0.3) {
        createStar(mouseX, mouseY);
        lastStarTime = now;
      }
    });
  });

  // 마우스가 가만히 있을 때도 마우스 위치에서 별 생성
  function autoSparkleAtMouse() {
    // 25% 확률로 마우스 위치에서 별 생성 (감소)
    if (Math.random() < 0.25) {
      createStar(mouseX, mouseY);
    }
  }

  // 800ms마다 마우스 위치에서 자동 빛나기 실행 (간격 증가)
  setInterval(autoSparkleAtMouse, 800);

  function createStar(x, y) {
    const sparkle = document.createElement("div");
    sparkle.className = "star";

    // 빛 위치를 마우스 주변에 랜덤하게 배치 (더 넓은 범위)
    const offsetX = (Math.random() - 0.5) * 80;
    const offsetY = (Math.random() - 0.5) * 80;

    sparkle.style.left = x + offsetX + "px";
    sparkle.style.top = y + offsetY + "px";

    // 다양한 크기 (더 큰 범위)
    const size = Math.random() * 8 + 3;
    sparkle.style.width = size + "px";
    sparkle.style.height = size + "px";

    // 현재 마우스가 있는 섹션 확인
    const elementUnderMouse = document.elementFromPoint(x, y);
    const isInSection2 =
      elementUnderMouse && elementUnderMouse.closest(".section2");
    const isInBannerSection =
      elementUnderMouse && elementUnderMouse.closest(".banner-section");
    const isInYunseulPicture =
      elementUnderMouse && elementUnderMouse.closest(".yunseul-picture");
    const isInContectSection =
      elementUnderMouse && elementUnderMouse.closest(".contect-section");

    let colors;
    if (
      isInSection2 ||
      isInYunseulPicture ||
      isInBannerSection ||
      isInContectSection
    ) {
      // section2, banner-section, yunseul-picture, contect-section에서는 밝은 색상
      colors = ["#e7f8ff", "#ffffff", "#ffffffff"];
    } else {
      // 다른 섹션에서는 검은색
      colors = ["#000000", "#1a1a1a", "#0d0d0d"];
    }

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // 그라데이션과 그림자로 더 화려하게
    sparkle.style.background = `radial-gradient(circle, ${randomColor} 0%, transparent 70%)`;
    sparkle.style.boxShadow = `
      0 0 ${size * 2}px ${randomColor}88,
      0 0 ${size * 4}px ${randomColor}44,
      0 0 ${size * 6}px ${randomColor}22
    `;
    sparkle.style.opacity = Math.random() * 0.9 + 0.3;
    sparkle.style.border = "none";
    sparkle.style.outline = "none";

    // 회전 애니메이션 추가
    const rotation = Math.random() * 360;
    sparkle.style.transform = `rotate(${rotation}deg) translateZ(0)`;

    document.body.appendChild(sparkle);

    // 페이드 아웃 애니메이션 - 더 빠르게
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.style.transition =
          "opacity 0.4s ease-out, transform 0.4s ease-out";
        sparkle.style.opacity = "0";
        sparkle.style.transform += " scale(1.3)";

        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        }, 400);
      }
    }, 600);
  }
});
