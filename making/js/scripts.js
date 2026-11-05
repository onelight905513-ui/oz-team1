/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav && window.bootstrap) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// REVIEWS START
window.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('#about.reviews-section');
  if (!section) return;
  const viewport = section.querySelector('.reviews-window');
  const track = section.querySelector('.reviews-track');
  const group = section.querySelector('.reviews-group');
  const dialog = section.querySelector('.review-dialog');
  const content = dialog.querySelector('.review-dialog-content');
  const close = dialog.querySelector('.review-dialog-close');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const SPEED = 22; 
  let hovering = false, touching = false, last = 0, position = 0;
  let opener = null;

  // 별점 숫자
  function updateRating(el) {
    const raw = Number(el.dataset.rating);
    const rating = Number.isFinite(raw) ? Math.max(0, Math.min(5, raw)) : 0;
    el.style.setProperty('--rating-fill', `${rating / 5 * 100}%`);
    el.querySelector('.review-score').textContent = rating.toFixed(1);
    el.setAttribute('aria-label', `5점 만점에 ${rating.toFixed(1)}점`);
  }
  group.querySelectorAll('[data-rating]').forEach(updateRating);
  const copy = group.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  copy.querySelectorAll('button').forEach(button => button.tabIndex = -1);
  track.append(copy);
  function syncMotion() { copy.style.display = motion.matches ? 'none' : ''; }
  syncMotion(); motion.addEventListener('change', syncMotion);

  // 원본과 반복용 카드 모두 같은 팝업 열기.
  track.addEventListener('click', event => {
    const card = event.target.closest('[data-review]');
    if (!card) return;
    const template = section.querySelector(`#review-detail-${card.dataset.review}`);
    if (!template) return;
    opener = card;
    content.replaceChildren(template.content.cloneNode(true));
    const rating = card.querySelector('[data-rating]').cloneNode(true);
    updateRating(rating);
    content.querySelector('.review-dialog-rating').append(rating);
    document.body.classList.add('review-popup-open');
    dialog.showModal();
    dialog.scrollTop = 0;
    close.focus({preventScroll:true});
  });
  close.addEventListener('click', () => dialog.close());
  let backdropDown = false;
  function outside(event) {
    const r = dialog.getBoundingClientRect();
    return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
  }
  dialog.addEventListener('pointerdown', event => { backdropDown = event.target === dialog && outside(event); });
  dialog.addEventListener('click', event => {
    if (backdropDown && event.target === dialog && outside(event)) dialog.close();
    backdropDown = false;
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('review-popup-open');
    // 스크린리더에서 원래 카드로 포커스 돌아가기
    const original = opener && group.querySelector(`[data-review="${opener.dataset.review}"]`);
    if (original) { original.focus({preventScroll:true}); }
    hovering = viewport.matches(':hover');
  });
  viewport.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch') hovering = true; });
  viewport.addEventListener('pointerleave', () => hovering = false);
  viewport.addEventListener('pointerdown', () => touching = true);
  window.addEventListener('pointerup', () => touching = false);
  window.addEventListener('pointercancel', () => touching = false);
  viewport.addEventListener('scroll', () => {
    if (Math.abs(viewport.scrollLeft - position) > 2) position = viewport.scrollLeft;
  }, {passive:true});
  function tick(now) {
    const elapsed = last ? Math.min(now - last, 50) / 1000 : 0;
    last = now;
    if (!hovering && !touching && !motion.matches && !dialog.open && !section.contains(document.activeElement) && !document.hidden) {
      const width = group.getBoundingClientRect().width;
      if (width) { position = (position + SPEED * elapsed) % width; viewport.scrollLeft = position; }
    } else position = viewport.scrollLeft;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
});
// REVIEWS END