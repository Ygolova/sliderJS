import Carousel from './carousel.js';

class SwipeCarousel extends Carousel {
  constructor(...args) {
    super(...args);
    this.slidesContainer = this.slide[0].parentElement
    console.log(this.slidesContainer)
  }

  _initListeners() {
    super._initListeners()
    this.slidesContainer.addEventListener('touchstart', this._swipeStart.bind(this));
    this.slidesContainer.addEventListener('touchend', this._swipeEnd.bind(this));
    this.slidesContainer.addEventListener('mousedown', this._swipeStart.bind(this));
    this.slidesContainer.addEventListener('mouseup', this._swipeEnd.bind(this));
  }

  _swipeStart(e) {
    this.startPosX =
      e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
  }

  _swipeEnd(e) {
    this.endPosX =
      e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
    if (this.endPosX - this.startPosX > 100) {
      this.prevHandler();
    }
    if (this.endPosX - this.startPosX < -100) {
      this.nextHandler();
    }

    console.log(`x  ${this.endPosX}`);
    console.log(`x  ${this.startPosX}`);
    console.log('-------');
    console.log(this.endPosX - this.startPosX);
  }
}

export default SwipeCarousel;
