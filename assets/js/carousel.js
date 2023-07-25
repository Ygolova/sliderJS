function Carousel() {
  let but,
    prev,
    next,
    timer,
    indicatorsContainer,
    indicatorItem,
    isPlay,
    containers,
    container,
    slide,
    interval,
    isPlaying,
    startPosX,
    endPosX;
  function constructor(p) {
    const settings = {
      ...{
        containerID: '#carousel',
        slideID: '.slide',
        interval: 1000,
        isPlaying: true,
      },
      ...p,
    };
    containers = document.querySelector('.container');
    container = document.querySelector(settings.containerID);
    slide = container.querySelectorAll(settings.slideID);
    interval = settings.interval;
    isPlaying = settings.isPlaying;
  }
  constructor();

  const CODE_SPACE = 'Space';
  const CODE_ARROW_LEFT = 'ArrowLeft';
  const CODE_ARROW_RIGHT = 'ArrowRight';
  let i = 0;

  function _initControls() {
    const controls = document.createElement('div');
    const PAUSE =
      '<button id="but" class="control control-pause">Pause</button>';
    const LEFT = '<button id="prev" class="control control-prev"><---</button>';
    const RIGHT =
      '<button id="next" class="control control-next">---></button>';

    controls.setAttribute('id', 'controls-container');
    controls.setAttribute('class', 'button');
    controls.innerHTML = LEFT + PAUSE + RIGHT;

    containers.append(controls);

    but = document.querySelector('#but');
    prev = document.querySelector('#prev');
    next = document.querySelector('#next');
  }

  function _initIndicators() {
    const indicators = document.createElement('div');
    container.append(indicators);

    indicators.setAttribute('id', 'indicators-container');
    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < slide.length; i++) {
      const indicator = document.createElement('div');
      indicator.setAttribute('class', !i ? 'indicator active' : 'indicator');
      indicator.dataset.slideTo = `${i}`;

      indicators.append(indicator);
    }

    // <div id="indicators-container" class="indicators">
    //   <div class="indicator active" data-slide-to="0"></div>
    //   <div class="indicator" data-slide-to="1"></div>
    //   <div class="indicator" data-slide-to="2"></div>
    //   <div class="indicator" data-slide-to="3"></div>
    //   <div class="indicator" data-slide-to="4"></div>
    // </div>
    indicatorItem = container.querySelectorAll('.indicator');
    indicatorsContainer = container.querySelector('#indicators-container');
  }

  function _initListeners() {
    but.addEventListener('click', pausePlay.bind());
    prev.addEventListener('click', prevHandler.bind());
    next.addEventListener('click', nextHandler.bind());
    indicatorsContainer.addEventListener('click', _indicate.bind());
    container.addEventListener('mouseenter', pause.bind());
    container.addEventListener('mouseleave', play.bind());
    document.addEventListener('keydown', _pressKey.bind());
    containers.addEventListener('touchstart', _swipeStart.bind(this));
    containers.addEventListener('touchend', _swipeEnd.bind(this));
    containers.addEventListener('mousedown', _swipeStart.bind(this));
    containers.addEventListener('mouseup', _swipeEnd.bind(this));
  }

  function _tick() {
    timer = setInterval(() => _nextSlide(), interval);
  }

  function _gotoSlide(n) {
    slide[i].classList.toggle('active');
    indicatorItem[i].classList.toggle('active');
    i = (n + slide.length) % slide.length;
    slide[i].classList.toggle('active');
    indicatorItem[i].classList.toggle('active');
  }

  function _nextSlide() {
    _gotoSlide(i + 1);
  }

  function _prevSlide() {
    _gotoSlide(i - 1);
  }

  function pause() {
    if (but.innerHTML == 'Pause') {
      but.innerHTML = 'Play';
      isPlay = false;
      clearInterval(timer);
    }
  }

  function play() {
    if (but.innerHTML == 'Play') {
      but.innerHTML = 'Pause';
      isPlay = true;
      _tick();
    }
  }

  function pausePlay() {
    if (but.innerHTML == 'Pause') pause();
    else {
      play();
    }
  }

  function nextHandler() {
    pause();
    _nextSlide();
  }

  function prevHandler() {
    _prevSlide();
    pause();
  }

  function _indicate(e) {
    const { target } = e;
    if (target && target.classList.contains('indicator')) {
      console.log(target.getAttribute('data-slide-to'));
      pause();
      _gotoSlide(+target.dataset.slideTo);
    }
  }

  function _pressKey(e) {
    if (e.code === CODE_SPACE) {
      pausePlay();
    }
    if (e.code === CODE_ARROW_LEFT) {
      _prevSlide();
      pause();
    } else if (e.code === CODE_ARROW_RIGHT) {
      _nextSlide();
      pause();
    }
  }

  function _swipeStart(e) {
    startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
  }

  function _swipeEnd(e) {
    endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
    if (endPosX - startPosX > 100) {
      prevHandler();
    }
    if (endPosX - startPosX < -100) {
      nextHandler();
    }

    console.log(`x  ${endPosX}`);
    console.log(`x  ${startPosX}`);
    console.log('-------');
    console.log(endPosX - startPosX);
  }

  function init() {
    _initControls();
    _initIndicators();
    _initListeners();
    _tick();
  }

  init();
}

Carousel();
