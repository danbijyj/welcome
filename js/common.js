const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

const navi = () => {
  const $gnbli = getAll('#header .nav .gnb > li');
  const $nav = get('#header .nav');
  const $navBar = get('#header .nav-bg');

  $gnbli.forEach((itemLi) => {
    itemLi.addEventListener('mouseenter', (e) => {
      $nav.classList.add('on');
      $navBar.classList.add('on');
    });
  });
  $nav.addEventListener('mouseleave', (e) => {
    $nav.classList.remove('on');
    $navBar.classList.remove('on');
  });
};

const fixed = () => {
  const $header = get('#header');
  let ty = 0;
  window.addEventListener('scroll', (e) => {
    ty = window.scrollY;
    if (ty > 100) {
      $header.classList.add('on');
    } else {
      $header.classList.remove('on');
    }
  });
};

const goup = () => {
  const $top = get('.top');
  const $header = get('#header');
  const $visual = get('#mainVisual');
  let ty = 0;
  $top.addEventListener('click', (e) => {
    ty = $visual.offsetTop;
    window.scrollTo({ top: ty, behavior: 'smooth' });
  });
  window.addEventListener('scroll', (e) => {
    ty = window.scrollY;
    if (ty > 100) {
      $top.classList.add('on');
    } else {
      $top.classList.remove('on');
    }
    if (ty > 100) {
      $header.classList.add('on');
    } else {
      $header.classList.remove('on');
    }
  });
};

const common = () => {
  navi();
  fixed();
  goup();
};
(() => {
  common();
})();
