document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuWrapper = document.querySelector('.menu-wrapper');

  if (menuToggle && menuWrapper) {
    menuToggle.addEventListener('click', () => {
      menuWrapper.classList.toggle('open');
      menuToggle.textContent = menuWrapper.classList.contains('open') ? '↑ メニュー' : '↓ メニュー';
    });
  }

  // スムーススクロール（修正済み）
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      const offset = menuWrapper.offsetHeight || 100;

      if (targetElement) {
        const y = targetElement.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });

        // メニュー自動で閉じる（モバイルのみ）
        if (window.innerWidth < 768) {
          menuWrapper.classList.remove('open');
          menuToggle.textContent = '↓ メニュー';
        }
      }
    });
  });

  // スクロール固定用
  const introSection = document.getElementById('intro');
  window.addEventListener('scroll', () => {
    if (!menuWrapper || !introSection) return;
    const introTop = introSection.getBoundingClientRect().top;
    if (introTop <= 0) {
      menuWrapper.classList.add('fixed');
    } else {
      menuWrapper.classList.remove('fixed');
    }
  });
});
