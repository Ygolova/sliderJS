const slide = document.querySelectorAll('.slide');
const active = document.querySelectorAll('.active');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

let i = 0;
let timer = setInterval(nextSlide, 1000);
const but = document.querySelector('#but');
let isPlay = true;

function gotoSlide(n) {
  slide[i].classList.toggle('active');
  i = (n + 5) % slide.length;
  slide[i].classList.toggle('active');
}

function nextSlide() {
  gotoSlide(i + 1)
}

function prevSlide() {
  gotoSlide(i - 1)
}


function pause() {
  but.innerHTML = 'Play';
  isPlay = false;
  clearInterval(timer);
}

function play() {
  but.innerHTML = 'Pause';
  isPlay = true;
  timer = setInterval(nextSlide, 1000);
}

function pausePlay() {
  if (isPlay) pause();
  else {
    play();
  }
}

function nextHandler() {
  pause()
  nextSlide()
}

function prevHandler() {
  prevSlide()
  pause()
}

document.addEventListener('keydown', function(key) {
  if (key.code=== 'ArrowLeft') {
    prevSlide();
    pause();
  } else if (key.code === 'ArrowRight') {
    nextSlide();
    pause();
  }
});


but.addEventListener('click', pausePlay);
prev.addEventListener('click', prevHandler);
next.addEventListener('click', nextHandler);
