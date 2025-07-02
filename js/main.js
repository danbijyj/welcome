let $count = getAll('.main .con2 .dona1 ul li strong');

const countStart = () => {
    $count.forEach((num) => {
        const end = Number(num.dataset.num);
        if (isNaN(end)) return;
        let current = 0;
        const speed = 200;
        const step = Math.max(1, Math.floor(end / speed));
        const countup = () => {
            if (current + step >= end) {
                current = end;
                num.textContent = new Intl.NumberFormat().format(current);
            } else {
                current += step;
                num.textContent = new Intl.NumberFormat().format(current);
                setTimeout(countup, 10);
            }
        };
        countup();
    });
};
let isCount = false;

window.addEventListener('scroll', (e) => {
    const ty = window.scrollY;
    // console.log(window.scrollY);
    if (ty > 1000 && !isCount) {
        countStart();
        isCount = true;
    }
});

const mainBanner = () => {
    const $bannerli = getAll('#mainVisual .mainBanner li');
    const $prev = get('#mainVisual .btn-wrap .prev');
    const $next = get('#mainVisual .btn-wrap .next');
    let current = 0,
        old = 0,
        size = 100,
        totalImage = $bannerli.length,
        timer = null,
        interval = 5000;

    $next.addEventListener('click', (e) => {
        moveNext();
    });
    $prev.addEventListener('click', (e) => {
        movePrev();
    });

    const moveNext = () => {
        current++;
        if (current > totalImage - 1) current = 0;
        banner('next');
    };
    const movePrev = () => {
        current--;
        if (current < 0) current = totalImage - 1;
        banner('prev');
    };

    const $page = get('#mainVisual .page');
    $bannerli.forEach((_, idx) => {
        const btn = document.createElement('button');
        if (idx === 0) btn.classList.add('on');
        btn.addEventListener('click', () => moveTo(idx));
        $page.appendChild(btn);
    });
    const $pageBtns = getAll('#mainVisual .page button');

    const banner = (direction) => {
        const num = direction === 'next' ? size : -size;
        $bannerli[current].style.transition = '0s';
        $bannerli[current].style.left = `${num}%`;
        setTimeout(() => {
            $bannerli[current].style.transition = '0.4s';
            $bannerli[current].style.left = `0px`;
            $bannerli[current].style.zIndex = 10;
            $bannerli[current].classList.add('on');
            $bannerli[old].style.left = `${-num}%`;
            $bannerli[old].classList.remove('on');
            $bannerli[old].style.zIndex = 1;
            old = current;
        }, 20);
        $pageBtns.forEach((item, idx) => {
            if (idx === current) {
                item.classList.add('on');
            } else {
                item.classList.remove('on');
            }
        });
    };
    const moveTo = (index) => {
        if (index === current) return;
        old = current;
        current = index;
        banner('next');
    };

    const lastBanner = (index) => {
        setTimeout(() => {
            $bannerli[index].style.left = `${size}%`;
        }, 400);
    };

    const autoBanner = () => {
        timer = setInterval(() => {
            moveNext();
        }, interval);
    };
    autoBanner();

    const $mainVisual = get('#mainVisual');
    $mainVisual.addEventListener('mouseenter', () => clearInterval(timer));
    $mainVisual.addEventListener('mouseleave', autoBanner);
};

const mainInit = () => {
    mainBanner();
};

(() => {
    mainInit();
})();
