(function () {
  const container = document.querySelector('#carousel');
  const slide = container.querySelectorAll('.slide');
  const active = container.querySelectorAll('.active');
  const indicatorsContainer = container.querySelector('#indicators-container');
  const indicatorItem = container.querySelectorAll('.indicator');
  const but = document.querySelector('#but');
  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next');

  const CODE_SPACE = 'Space';
  const CODE_ARROW_LEFT = 'ArrowLeft';
  const CODE_ARROW_RIGHT = 'ArrowRight';

  let i = 0;
  let isPlay = true;
  let startPosX = null;
  let endPosX = null;

  function tick() {
    timer = setInterval(nextSlide, 1000);
  }

  function gotoSlide(n) {
    slide[i].classList.toggle('active');
    indicatorItem[i].classList.toggle('active');
    i = (n + 5) % slide.length;
    slide[i].classList.toggle('active');
    indicatorItem[i].classList.toggle('active');
  }

  function nextSlide() {
    gotoSlide(i + 1);
  }

  function prevSlide() {
    gotoSlide(i - 1);
  }

  function pause() {
    but.innerHTML = 'Play';
    isPlay = false;
    clearInterval(timer);
  }

  function play() {
    but.innerHTML = 'Pause';
    isPlay = true;
    tick();
  }

  function pausePlay() {
    if (isPlay == true) pause();
    else {
      play();
    }
  }

  function nextHandler() {
    pause();
    nextSlide();
  }

  function prevHandler() {
    prevSlide();
    pause();
  }

  function indicate(e) {
    const { target } = e;
    if (target && target.classList.contains('indicator')) {
      console.log(target.getAttribute('data-slide-to'));
      pause();
      gotoSlide(+target.dataset.slideTo);
    }
  }

  function pressKey(e) {
    if (e.code === CODE_SPACE) {
      pausePlay();
    }
    if (e.code === CODE_ARROW_LEFT) {
      prevSlide();
      pause();
    } else if (e.code === CODE_ARROW_RIGHT) {
      nextSlide();
      pause();
    }
  }

  function swipeStart(e) {
    startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
  }

  function swipeEnd(e) {
    endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
    if (endPosX - startPosX > 100) {
      prevHandler();
    }
    if (endPosX - startPosX < -100) {
      nextHandler();
    }
  }

  function initListeners() {
    but.addEventListener('click', pausePlay);
    prev.addEventListener('click', prevHandler);
    next.addEventListener('click', nextHandler);
    indicatorsContainer.addEventListener('click', indicate);
    document.addEventListener('keydown', pressKey);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    container.addEventListener('mousedown', swipeStart);
    container.addEventListener('mouseup', swipeEnd);
  }

  const initApp = () => {
    initListeners();
    tick();
  };

  initApp();
})();

let x = 2