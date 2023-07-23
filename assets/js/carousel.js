class Carousel {
  constructor(p) {
    const settings = {
      ...{
        containerID: '#carousel',
        slideID: '.slide',
        interval: 1000,
        isPlaying: true,
      },
      ...p,
    };
    this.containers = document.querySelector('.container');
    this.container = document.querySelector(settings.containerID);
    this.slide = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;
  }

  _initProps() {
    this.CODE_SPACE = 'Space';
    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_ARROW_RIGHT = 'ArrowRight';
    this.i = 0;
  }

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE =
      '<button id="but" class="control control-pause">Pause</button>';
    const LEFT = '<button id="prev" class="control control-prev"><---</button>';
    const RIGHT =
      '<button id="next" class="control control-next">---></button>';

    controls.setAttribute('id', 'controls-container');
    controls.setAttribute('class', 'button');
    controls.innerHTML = LEFT + PAUSE + RIGHT;

    this.containers.append(controls);

    this.but = document.querySelector('#but');
    this.prev = document.querySelector('#prev');
    this.next = document.querySelector('#next');
  }

  _initIndicators() {
    const indicators = document.createElement('div');
    this.container.append(indicators);

    indicators.setAttribute('id', 'indicators-container');
    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.slide.length; i++) {
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
    this.indicatorsContainer = this.container.querySelector(
      '#indicators-container'
    );
    this.indicatorItem = this.container.querySelectorAll('.indicator');
  }

  _initListeners() {
    this.but.addEventListener('click', this.pausePlay.bind(this));
    this.prev.addEventListener('click', this.prevHandler.bind(this));
    this.next.addEventListener('click', this.nextHandler.bind(this));
    this.indicatorsContainer.addEventListener(
      'click',
      this._indicate.bind(this)
    );
    this.container.addEventListener('mouseenter', this.pause.bind(this));
    this.container.addEventListener('mouseleave', this.play.bind(this));

    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  _tick() {
    this.timer = setInterval(() => this._nextSlide(), this.interval);
  }

  _gotoSlide(n) {
    this.slide[this.i].classList.toggle('active');
    this.indicatorItem[this.i].classList.toggle('active');
    this.i = (n + this.slide.length) % this.slide.length;
    this.slide[this.i].classList.toggle('active');
    this.indicatorItem[this.i].classList.toggle('active');
  }

  _nextSlide() {
    this._gotoSlide(this.i + 1);
  }

  _prevSlide() {
    this._gotoSlide(this.i - 1);
  }

  pause() {
    if (this.but.innerHTML == 'Pause') {
      this.but.innerHTML = 'Play';
      this.isPlay = false;
      clearInterval(this.timer);
    }
  }

  play() {
    if (this.but.innerHTML == 'Play') {
      this.but.innerHTML = 'Pause';
      this.isPlay = true;
      this._tick();
    }
  }

  pausePlay() {
    if (this.but.innerHTML == 'Pause') this.pause();
    else {
      this.play();
    }
  }

  nextHandler() {
    this.pause();
    this._nextSlide();
  }

  prevHandler() {
    this._prevSlide();
    this.pause();
  }

  _indicate(e) {
    const { target } = e;
    if (target && target.classList.contains('indicator')) {
      console.log(target.getAttribute('data-slide-to'));
      this.pause();
      this._gotoSlide(+target.dataset.slideTo);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_SPACE) {
      this.pausePlay();
    }
    if (e.code === this.CODE_ARROW_LEFT) {
      this._prevSlide();
      this.pause();
    } else if (e.code === this.CODE_ARROW_RIGHT) {
      this._nextSlide();
      this.pause();
    }
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick();
  }
}

export default Carousel;
