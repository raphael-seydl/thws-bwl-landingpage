/* The two supplied images and authored copy are shared by all four states. */
(() => {
  'use strict';
  const section = document.querySelector('.campus-life');
  if (!section || !window.createChapterScroll || !window.gsap) return;
  const page = section.closest('.chapter-page');
  const states = [...section.querySelectorAll('.campus-state')];
  const controls = section.querySelector('.campus-controls');
  const buttons = [...controls.querySelectorAll('button')];
  const counter = controls.querySelector('.campus-counter');
  const rail = controls.querySelector('.campus-rail > span');
  const campus = section.querySelector('.campus-photo-campus');
  const city = section.querySelector('.campus-photo-city');
  const campusImage = campus.querySelector('img');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width:1000px) and (min-height:700px) and (pointer:fine)');
  let active = -1, enhanced = false, motion, scroll;
  function mode() {
    const next = desktop.matches && !reduced.matches && !!window.ScrollTrigger;
    if (next === enhanced) return;
    enhanced = next;
    motion?.kill();
    gsap.killTweensOf([campus, city, campusImage]);
    section.classList.toggle('campus-enhanced', enhanced);
    controls.hidden = !enhanced;
    active = -1;
    states.forEach(state => {
      state.inert = false;
      state.removeAttribute('aria-hidden');
      gsap.set(state, { clearProps:'opacity,visibility,transform' });
    });
    [campus, city, campusImage].forEach(el => gsap.set(el, { clearProps:'opacity,visibility,transform,filter' }));
    campus.removeAttribute('aria-hidden');
    city.removeAttribute('aria-hidden');
  }
  function render(progress) {
    if (!enhanced) return;
    const index = Math.min(3, Math.floor(progress * 4));
    gsap.set(rail, { scaleX:progress });
    if (index === active) return;
    const previous = active;
    active = index;
    motion?.kill();
    const animate = previous !== -1 && !reduced.matches;
    // Text and image tweens start together; fast reverse scrolling cancels cleanly.
    states.forEach((state,i) => {
      state.inert = i !== index;
      state.setAttribute('aria-hidden', String(i !== index));
      if (i !== index && i !== previous) gsap.set(state, { autoAlpha:0, y:0 });
    });
    buttons.forEach((button,i) => {
      if (i === index) button.setAttribute('aria-current','step');
      else button.removeAttribute('aria-current');
    });
    counter.textContent = `${String(index + 1).padStart(2,'0')} / 04`;
    campus.setAttribute('aria-hidden', String(index === 3));
    city.setAttribute('aria-hidden', String(index !== 3));
    const campusProps = { autoAlpha:index === 3 ? 0 : index === 2 ? .24 : 1 };
    const imageProps = { scale:index === 1 ? 1.03 : 1, xPercent:index === 1 ? -.7 : 0, filter:index === 2 ? 'saturate(.45)' : 'saturate(1)' };
    const cityProps = { autoAlpha:index === 3 ? 1 : 0 };
    if (!animate) {
      states.forEach((state,i) => gsap.set(state, { autoAlpha:i === index ? 1 : 0, y:0 }));
      gsap.set(campus,campusProps); gsap.set(campusImage,imageProps); gsap.set(city,cityProps);
      return;
    }
    motion = gsap.timeline({ defaults:{ ease:'power2.out' } });
    motion.to(states[previous], { autoAlpha:0, y:-12, duration:.2 }, 0)
      .fromTo(states[index], { autoAlpha:0, y:24 }, { autoAlpha:1, y:0, duration:.55 }, .15)
      .to(campus, { ...campusProps, duration:.7 }, 0)
      .to(campusImage, { ...imageProps, duration:.9 }, 0)
      .to(city, { ...cityProps, duration:.7 }, 0);
  }
  document.addEventListener('chapterchange', () => { if (!page.hidden) mode(); });
  window.addEventListener('resize', mode, { passive:true });
  reduced.addEventListener('change', mode);
  desktop.addEventListener('change', mode);
  mode();
  scroll = window.createChapterScroll({
    section, id:'chapter-campus-life',
    distance:() => { mode(); return page.clientHeight * 1.6; },
    render, fallback:mode
  });
  buttons.forEach((button,i) => button.addEventListener('click', () => scroll.move(i === 0 ? 0 : i === 3 ? 1 : (i + .5) / 4)));
})();
