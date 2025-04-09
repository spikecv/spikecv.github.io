document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const dotsContainer = document.querySelector('.carousel-dots');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');
  let index = 0;
  let intervalId;

  // 初始化圆点
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  // 切换到指定 slide
  function goToSlide(i) {
  const offset = -i * 100;
  track.style.transform = `translateX(${offset}%)`;
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === i);
  });
  index = i;
  }


  // 自动轮播控制
  function startAutoPlay() {
    intervalId = setInterval(() => {
      goToSlide((index + 1) % slides.length);
    }, 8000);
  }

  function stopAutoPlay() {
    clearInterval(intervalId);
  }

  // 左右箭头监听
  leftArrow.addEventListener('click', () => {
    stopAutoPlay();
    goToSlide((index - 1 + slides.length) % slides.length);
    startAutoPlay();
  });

  rightArrow.addEventListener('click', () => {
    stopAutoPlay();
    goToSlide((index + 1) % slides.length);
    startAutoPlay();
  });

  // 圆点点击
  dotsContainer.addEventListener('click', e => {
    if (e.target.tagName === 'SPAN') {
      stopAutoPlay();
      goToSlide(parseInt(e.target.dataset.index));
      startAutoPlay();
    }
  });

  // 鼠标悬停暂停
  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);

  // 初始化激活第一张
  goToSlide(0);
  startAutoPlay();
});
