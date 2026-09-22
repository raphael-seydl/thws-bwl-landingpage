(() => {
  'use strict';
  const key = 'thws-hero-intro-seen';
  const root = document.documentElement;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let seen = false;
  try { seen = sessionStorage.getItem(key) === '1'; } catch { /* Private storage may be unavailable. */ }
  const navigation = performance.getEntriesByType('navigation')[0];
  if (seen || motion.matches || location.hash || navigation?.type === 'back_forward') return;

  let finished = false, overlay, context;
  root.classList.add('intro-pending');
  // Never leave a cover behind if the CDN, image, or animation cannot load.
  const deadline = window.setTimeout(finish, 5500);
  const cancelEvents = ['keydown', 'wheel', 'touchstart', 'pointerdown', 'pagehide'];
  cancelEvents.forEach(event => window.addEventListener(event, finish, { passive:true, capture:true }));
  motion.addEventListener('change', finish);

  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(deadline);
    context?.revert();
    overlay?.remove();
    root.classList.remove('intro-pending');
    cancelEvents.forEach(event => window.removeEventListener(event, finish, true));
    window.removeEventListener('resize', finish);
    motion.removeEventListener('change', finish);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    if (finished) return;
    const hero = document.querySelector('.hero');
    const art = hero?.querySelector('.hero-art');
    const image = art?.querySelector('img');
    if (!image || !window.gsap || window.scrollY > 4) { finish(); return; }
    try { await image.decode(); } catch { finish(); return; }
    if (finished) return;
    try { sessionStorage.setItem(key, '1'); } catch { /* Animation works without storage. */ }
    window.addEventListener('resize', finish, { passive:true });

    const gsap = window.gsap;
    const width = root.clientWidth, height = window.innerHeight;
    const target = image.getBoundingClientRect();
    const cover = Math.max(width / target.width, height / target.height);
    const radius = getComputedStyle(image).borderRadius;
    const svgNS = 'http://www.w3.org/2000/svg';
    const svgElement = (name, attributes) => {
      const node = document.createElementNS(svgNS, name);
      Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
      return node;
    };
    overlay = document.createElement('div');
    overlay.className = 'hero-intro';
    overlay.setAttribute('aria-hidden', 'true');
    const veil = document.createElement('div');
    veil.className = 'intro-veil';
    const photo = document.createElement('div');
    photo.className = 'intro-photo';
    photo.style.width = `${target.width}px`;
    photo.style.height = `${target.height}px`;
    const photoImage = document.createElement('img');
    photoImage.src = image.currentSrc || image.src;
    photoImage.alt = '';
    photoImage.style.objectPosition = getComputedStyle(image).objectPosition;
    photo.append(photoImage);

    // An inverse SVG mask cuts two live text lines out of a neutral cover.
    // A growing aperture joins those windows before the photograph lands in its card.
    const svg = svgElement('svg', { viewBox:`0 0 ${width} ${height}`, class:'intro-stencil' });
    const defs = svgElement('defs', {});
    const mask = svgElement('mask', { id:'hero-intro-mask', maskUnits:'userSpaceOnUse', x:0, y:0, width, height, 'mask-type':'luminance' });
    mask.append(svgElement('rect', { width, height, fill:'white' }));
    const typography = svgElement('g', { class:'intro-type', fill:'black' });
    const first = svgElement('text', { x:width * .055, y:0, 'font-size':100 });
    const second = svgElement('text', { x:width * .055, y:0, 'font-size':100 });
    first.textContent = 'THWS';
    second.textContent = 'BETRIEBSWIRTSCHAFT';
    typography.append(first, second);
    const aperture = svgElement('circle', { cx:width * .48, cy:height * .5, r:0, fill:'black' });
    mask.append(typography, aperture);
    defs.append(mask);
    svg.append(defs, svgElement('rect', { width, height, fill:'#f3f3f1', mask:'url(#hero-intro-mask)' }));
    overlay.append(veil, photo, svg);
    const accents = ['line', 'dot', 'bar'].map((shape, i) => {
      const mark = document.createElement('span');
      mark.className = `intro-accent intro-accent--${shape}`;
      mark.style.left = `${Math.min(width - 48, target.left + target.width * [.08, .92, .7][i])}px`;
      mark.style.top = `${Math.min(height - 50, target.top + target.height * [.14, .25, .78][i])}px`;
      overlay.append(mark);
      return mark;
    });
    document.body.append(overlay);

    // Measure once at setup; no layout reads during the animation. Both words
    // have independent font sizes and never wrap, including on narrow phones.
    const available = width * .89;
    const firstSize = Math.min(available * .66 / first.getComputedTextLength() * 100, height * .34);
    const secondSize = Math.min(available / second.getComputedTextLength() * 100, height * .14);
    const baseline = height * .48;
    first.setAttribute('font-size', firstSize);
    first.setAttribute('y', baseline);
    second.setAttribute('font-size', secondSize);
    second.setAttribute('y', baseline + secondSize * 1.25);

    context = gsap.context(() => {
      const content = [hero.querySelector('.nav'), hero.querySelector('.hero-grid > div:first-child'), hero.querySelector('.facts')];
      gsap.set(content, { opacity:0, y:14 });
      gsap.set(art, { opacity:0 });
      gsap.set(photo, { x:(width - target.width * cover) / 2, y:(height - target.height * cover) / 2, scale:cover });
      root.classList.remove('intro-pending');
      // Let the typographic image window register as an opening statement before
      // it expands into the regular hero. The reveal begins at three seconds.
      gsap.timeline({ id:'hero-intro', onComplete:finish })
        .from(typography, { y:18, scale:.985, rotation:-.4, svgOrigin:`${width * .055} ${baseline}`, duration:.55, ease:'power2.out' }, 0)
        .to(aperture, { attr:{ r:Math.hypot(width, height) }, duration:.85, ease:'power3.inOut' }, 2.45)
        .to(veil, { opacity:0, duration:.6, ease:'power2.inOut' }, 3)
        .to(photo, { x:target.left, y:target.top, scale:1, borderRadius:radius, duration:1.15, ease:'power3.inOut' }, 3)
        .to(content, { opacity:1, y:0, duration:.5, stagger:.08, ease:'power2.out' }, 3.55)
        .fromTo(accents, { y:12, rotation:-8, scale:.8 }, { opacity:1, y:0, rotation:0, scale:1, duration:.25, stagger:.06 }, 3.4)
        .to(accents, { opacity:0, y:-10, duration:.3, stagger:.04 }, 3.85)
        .set(art, { opacity:1 }, 4.15)
        .to(overlay, { opacity:0, duration:.2 }, 4.21);
    });
  }, { once:true });
})();
