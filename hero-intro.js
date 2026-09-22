(() => {
  'use strict';
  const key = 'thws-hero-intro-seen', root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let seen = false;
  try { seen = sessionStorage.getItem(key) === '1'; } catch {}
  if (seen || reduced.matches || location.hash || performance.getEntriesByType('navigation')[0]?.type === 'back_forward') return;
  let done = false, overlay, context, size;
  root.classList.add('intro-pending');
  const timeout = setTimeout(finish, 5500);
  const inputs = ['keydown', 'wheel', 'pointerdown', 'touchstart', 'pagehide'];
  inputs.forEach(type => addEventListener(type, finish, { capture:true, passive:true }));
  reduced.addEventListener('change', finish);
  function resize() { if (size && (size[0] !== innerWidth || size[1] !== innerHeight)) finish(); }
  function finish() {
    if (done) return;
    done = true;
    clearTimeout(timeout);
    context?.revert();
    overlay?.remove();
    root.classList.remove('intro-pending');
    inputs.forEach(type => removeEventListener(type, finish, true));
    removeEventListener('resize', resize);
    reduced.removeEventListener('change', finish);
    document.removeEventListener('chapterchange', finish);
  }
  document.addEventListener('DOMContentLoaded', () => {
    if (done) return;
    const hero = document.querySelector('.hero--editorial');
    if (!hero || hero.closest('[hidden]') || !window.gsap) { finish(); return; }
    try { sessionStorage.setItem(key, '1'); } catch {}
    size = [innerWidth, innerHeight];
    addEventListener('resize', resize, { passive:true });
    document.addEventListener('chapterchange', finish);
    overlay = document.createElement('div');
    overlay.className = 'hero-intro';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<div class="intro-type"><span>THWS</span><span>BETRIEBSWIRTSCHAFT</span></div>';
    document.body.append(overlay);
    const compact = innerWidth <= 600, reveal = compact ? 1.75 : 2.3;
    context = gsap.context(() => {
      const words = hero.querySelectorAll('.hero-word');
      const topics = hero.querySelectorAll('.hero-topics li');
      gsap.set(words, { opacity:0, y:12 });
      gsap.set(topics, { opacity:0, y:6 });
      root.classList.remove('intro-pending');
      gsap.timeline({ onComplete:finish, id:'hero-intro' })
        .from(overlay.querySelectorAll('span'), { opacity:0, y:8, duration:.65, stagger:.12 }, 0)
        .to(overlay.querySelector('.intro-type'), { opacity:0, y:-10, duration:.5 }, reveal - .45)
        .to(overlay, { opacity:0, duration:.45 }, reveal)
        .to(words, { opacity:1, y:0, duration:.8, stagger:compact ? .13 : .22, ease:'power3.out' }, reveal)
        .to(topics, { opacity:1, y:0, duration:.45, stagger:.07 }, reveal + (compact ? 1.25 : 1.5));
    });
  }, { once:true });
})();
