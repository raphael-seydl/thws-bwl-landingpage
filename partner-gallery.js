(() => {
  'use strict';
  const section = document.querySelector('.international-postcards');
  if (!section) return;
  const sequence = section.querySelector('.postcard-sequence');
  const viewport = section.querySelector('.postcard-window');
  const track = section.querySelector('.postcard-track');
  const slots = [...track.children];
  const cards = slots.map(slot => slot.querySelector('.postcard'));
  const images = cards.map(card => card.querySelector('img'));
  const fill = section.querySelector('.postcard-progress > span');
  const counter = section.querySelector('.postcard-count');
  const help = section.querySelector('#postcard-help');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const chapters = document.documentElement.classList.contains('chapter-mode');
  let previousButton, nextButton, chapterScroll, chapterDistance = 0;
  // Deliberate order: Taiwan, Thailand, USA, then six European/Central Asian views.
  // Width is relative to the canvas; offsets are relative to its free vertical space.
  const art = [
    { width:.50, y:-.09, rotate:-5, scale:.98 },
    { width:.29, y:.07, rotate:5, scale:.97 },
    { width:.55, y:-.13, rotate:3, scale:1 },
    { width:.53, y:.08, rotate:-5, scale:1 },
    { width:.50, y:-.02, rotate:1.5, scale:1 },
    { width:.48, y:.08, rotate:-4, scale:.97 },
    { width:.30, y:-.12, rotate:4, scale:.98 },
    { width:.52, y:.08, rotate:-3, scale:1 },
    { width:.51, y:-.06, rotate:2, scale:1 }
  ];
  let cinematic = false, trigger, metrics = [], distance = 0, travel = 0, current = -1;
  const topOf = element => {
    let top = 0;
    for (let node = element; node; node = node.offsetParent) top += node.offsetTop;
    return top;
  };
  function load(index) {
    const img = images[index];
    if (img && img.loading !== 'eager') img.loading = 'eager';
  }
  function orient(index, progress) {
    if (index !== current) {
      current = index;
      counter.textContent = `${String(index + 1).padStart(2,'0')} / 09`;
      if (previousButton) previousButton.disabled = index === 0;
      if (nextButton) nextButton.disabled = index === 8;
    }
    fill.style.transform = `scaleX(${progress})`;
  }
  function nativeProgress() {
    if (cinematic || chapterScroll?.enabled) return;
    const middle = viewport.scrollLeft + viewport.clientWidth / 2;
    let closest = 0, nearest = Infinity;
    slots.forEach((slot,i) => {
      const delta = Math.abs(slot.offsetLeft + slot.offsetWidth / 2 - middle);
      if (delta < nearest) { nearest = delta; closest = i; }
    });
    orient(closest, viewport.scrollLeft / Math.max(1,viewport.scrollWidth - viewport.clientWidth));
  }
  viewport.addEventListener('scroll', nativeProgress, { passive:true });
  viewport.addEventListener('keydown', event => {
    if (event.target !== viewport) return;
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 8 : Math.max(0, Math.min(8,current + (event.key === 'ArrowRight' ? 1 : -1)));
    if (chapterScroll?.enabled) {
      chapterGo(next);
    } else if (cinematic && trigger) {
      const x = Math.max(0,Math.min(distance,metrics[next].center - viewport.clientWidth * .46));
      window.scrollTo({ top:trigger.start + (x / Math.max(1,distance)) * travel, behavior:'instant' });
    } else viewport.scrollTo({ left:slots[next].offsetLeft + slots[next].offsetWidth / 2 - viewport.clientWidth / 2, behavior:reduced.matches ? 'instant' : 'smooth' });
  });
  // Warm only the first two views near the section; remaining photos load ahead
  // of their arrival, not together with the hero at initial page load.
  const warm = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) { load(0); load(1); warm.disconnect(); }
  }, { rootMargin:'700px' });
  warm.observe(sequence);
  orient(0,0);
  function chapterGo(index) {
    load(index);
    const left = slots[index].offsetLeft + slots[index].offsetWidth / 2 - viewport.clientWidth / 2;
    if (chapterScroll?.enabled) chapterScroll.move(left / Math.max(1, chapterDistance));
    else viewport.scrollTo({ left, behavior:reduced.matches ? 'instant' : 'smooth' });
  }
  if (chapters) {
    help.textContent = 'Neun Orte. Neue Perspektiven.';
    const controls = document.createElement('div');
    controls.className = 'postcard-controls';
    previousButton = document.createElement('button');
    nextButton = document.createElement('button');
    [[previousButton, '←', 'Vorheriger Ort', -1], [nextButton, '→', 'Nächster Ort', 1]].forEach(([button, arrow, label, direction]) => {
      button.type = 'button'; button.textContent = arrow;
      button.setAttribute('aria-label', label);
      button.addEventListener('click', () => {
        const index = Math.max(0, Math.min(8, current + direction));
        chapterGo(index);
      });
      controls.append(button);
    });
    counter.setAttribute('aria-live', 'polite');
    counter.removeAttribute('aria-hidden');
    section.querySelector('.postcard-footer').append(controls);
    previousButton.disabled = true;
    const sync = () => {
      if (!viewport.clientWidth) return;
      if (innerWidth >= 1000) {
        const page = section.closest('.chapter-page');
        const canvasTop = viewport.getBoundingClientRect().top - section.getBoundingClientRect().top;
        const height = Math.max(180, page.clientHeight - canvasTop - 202);
        slots.forEach((slot, i) => {
          const ratio = images[i].width / images[i].height;
          slot.style.width = `${Math.round(Math.min(560, (height - 125) * ratio + 24))}px`;
          slot.style.minWidth = '0';
        });
      } else slots.forEach(slot => { slot.style.removeProperty('width'); slot.style.removeProperty('min-width'); });
      // The first and last destinations can both reach the focal position.
      track.style.paddingLeft = `${Math.max(24, (viewport.clientWidth - slots[0].offsetWidth) / 2)}px`;
      track.style.paddingRight = `${Math.max(24, (viewport.clientWidth - slots[8].offsetWidth) / 2)}px`;
      nativeProgress();
    };
    new ResizeObserver(sync).observe(viewport);
    document.addEventListener('chapterchange', sync);
    sync();
    chapterScroll = window.createChapterScroll?.({
      section, id:'chapter-international',
      distance:() => {
        track.style.removeProperty('transform');
        viewport.scrollLeft = 0;
        sync();
        chapterDistance = Math.max(1, track.scrollWidth - viewport.clientWidth);
        return chapterDistance;
      },
      render:progress => {
        const x = progress * chapterDistance;
        gsap.set(track, { x:-x, force3D:false });
        let nearest = Infinity, index = 0;
        slots.forEach((slot,i) => {
          const delta = Math.abs(slot.offsetLeft + slot.offsetWidth / 2 - x - viewport.clientWidth / 2);
          if (delta < nearest) { nearest = delta; index = i; }
        });
        load(index); load(index + 1);
        orient(index, progress);
      },
      fallback:progress => {
        track.style.removeProperty('transform');
        viewport.scrollLeft = progress * Math.max(0, track.scrollWidth - viewport.clientWidth);
        nativeProgress();
      }
    });
    return;
  }
  if (!window.gsap || !window.ScrollTrigger) { nativeProgress(); return; }
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add({
    desktop:'(min-width:1000px) and (min-height:700px) and (pointer:fine)',
    other:'(max-width:999px), (max-height:699px), (pointer:coarse)',
    reduce:'(prefers-reduced-motion: reduce)'
  }, ({conditions}) => {
    cinematic = conditions.desktop && !conditions.reduce;
    section.classList.toggle('postcards-cinematic', cinematic);
    if (!cinematic) {
      help.textContent = 'Wischen oder mit den Pfeiltasten entdecken';
      const observer = new ResizeObserver(nativeProgress);
      observer.observe(viewport);
      nativeProgress();
      return () => observer.disconnect();
    }
    viewport.scrollLeft = 0;
    help.textContent = 'Scrollen und neue Perspektiven entdecken';
    const moveTrack = gsap.quickSetter(track,'x','px');
    const setters = cards.map(card => ({
      scale:gsap.quickSetter(card,'scale'), rotation:gsap.quickSetter(card,'rotation','deg'),
      y:gsap.quickSetter(card,'y','px'), opacity:gsap.quickSetter(card,'opacity')
    }));
    let width = 0, canvasHeight = 0;
    function measure() {
      width = viewport.clientWidth;
      canvasHeight = viewport.clientHeight;
      slots.forEach((slot,i) => {
        const ratio = images[i].width / images[i].height;
        // All images keep their native aspect ratio, including the two portraits.
        const maxImageHeight = canvasHeight * (slot.classList.contains('postcard-portrait') ? .70 : .66) - 108;
        const cardWidth = Math.round(Math.min(820,width * art[i].width,maxImageHeight * ratio + 24));
        slot.style.setProperty('--postcard-width',`${cardWidth}px`);
      });
      let x = width * .46 - slots[0].offsetWidth / 2;
      metrics = slots.map((slot,i) => {
        const w = slot.offsetWidth, h = cards[i].offsetHeight;
        const y = (canvasHeight - h) / 2 + art[i].y * canvasHeight;
        const item = { x:Math.round(x), y:Math.round(y), center:x + w / 2, width:w };
        gsap.set(slot,{ x:item.x, y:item.y });
        x += w + Math.min(110,width * .065);
        return item;
      });
      distance = Math.max(1,metrics.at(-1).center - width * .46);
      travel = Math.round(distance * .9);
      sequence.style.height = `${travel + innerHeight + Math.round(innerHeight * .16)}px`;
    }
    function render(progress) {
      // Last 16vh is a readable end hold. No snapping or automatic advancing.
      const x = Math.min(distance,progress * (travel + innerHeight * .16) / travel * distance);
      moveTrack(-x);
      let index = 0, nearest = Infinity;
      metrics.forEach((item,i) => {
        const offset = (item.center - x - width * .46) / (width * .65);
        const proximity = Math.max(0,1 - Math.abs(offset));
        const focus = proximity * proximity * (3 - 2 * proximity);
        setters[i].scale(art[i].scale * (.95 + .05 * focus));
        setters[i].opacity(.80 + .20 * focus);
        setters[i].rotation(art[i].rotate + Math.max(-1,Math.min(1,offset)) * .65);
        setters[i].y(Math.max(-1,Math.min(1,offset)) * 8);
        if (Math.abs(offset) < nearest) { nearest = Math.abs(offset); index = i; }
        // Prefetch a viewport ahead, including fast direct navigation.
        if (item.x - x < width * 2 && item.x + item.width - x > -width) load(i);
      });
      orient(index,x / distance);
    }
    measure();
    trigger = ScrollTrigger.create({
      id:'international-postcards', trigger:sequence,
      start:() => topOf(sequence), end:() => topOf(sequence) + sequence.offsetHeight - innerHeight,
      onRefreshInit:measure, onRefresh:self => render(self.progress), onUpdate:self => render(self.progress)
    });
    // Refresh promptly on a canvas resize, even while the user keeps scrolling.
    // ScrollTrigger's normal resize debounce otherwise retains stale card sizes.
    let resizeFrame;
    const resizeObserver = new ResizeObserver(() => {
      if (viewport.clientWidth === width && viewport.clientHeight === canvasHeight) return;
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    resizeObserver.observe(viewport);
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(resizeFrame);
      trigger = undefined;
      cinematic = false;
      section.classList.remove('postcards-cinematic');
      sequence.style.removeProperty('height');
      track.style.removeProperty('transform');
      slots.forEach(slot => { slot.style.removeProperty('transform'); slot.style.removeProperty('--postcard-width'); });
      cards.forEach(card => { card.style.removeProperty('transform'); card.style.removeProperty('opacity'); });
    };
  });
})();
