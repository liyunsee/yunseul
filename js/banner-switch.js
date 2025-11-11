// banner 영역 전환 버튼만을 위한 최소 JS (기존 banner js 영향 X)
document.addEventListener('DOMContentLoaded', function() {
  const btns = document.querySelectorAll('.banner-section-switch-btn');
  const areas = document.querySelectorAll('.banner-section-switch-area');
  if (!btns.length || !areas.length) return;
  btns.forEach((btn, idx) => {
    btn.addEventListener('click', function() {
      btns.forEach(b => b.classList.remove('active'));
      areas.forEach(a => a.style.display = 'none');
      btn.classList.add('active');
      areas[idx].style.display = '';
    });
  });
});
