(() => {
  const root = document.querySelector('.partner-gallery');
  if (!root) return;
  const slides = [...root.querySelectorAll('.partner-slide')];
  const play = root.querySelector('[data-play]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, ticket = 0, timer, paused = reduced.matches, visible = false;
  root.querySelector('.partner-controls').hidden = false;
  const load = async index => {
    const img = slides[index].querySelector('img');
    img.loading = 'eager';
    if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
    await img.decode();
  };
  function schedule() {
    clearTimeout(timer);
    root.classList.toggle('is-paused', paused || !visible || document.hidden);
    play.textContent = paused ? 'Abspielen' : 'Pause';
    play.setAttribute('aria-label', paused ? 'Automatischen Bildwechsel starten' : 'Automatischen Bildwechsel pausieren');
    if (!paused && visible && !document.hidden) timer = setTimeout(() => show(current + 1), 4000);
  }
  async function show(index, manual = false) {
    const id = ++ticket;
    clearTimeout(timer);
    if (manual) paused = true;
    let next = (index + slides.length) % slides.length;
    for (let attempt = 0; attempt < slides.length; attempt++) {
      try { await load(next); break; }
      catch { next = (next + 1) % slides.length; if (attempt === slides.length - 1) { schedule(); return; } }
    }
    if (id !== ticket) return;
    slides[current].classList.remove('is-active');
    slides[current].setAttribute('aria-hidden', 'true');
    slides[next].classList.add('is-active');
    slides[next].setAttribute('aria-hidden', 'false');
    current = next;
    root.querySelector('[data-count]').textContent = String(next + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    if (manual) root.querySelector('[role="status"]').textContent = slides[next].querySelector('figcaption').textContent;
    load((next + 1) % slides.length).catch(() => {});
    schedule();
  }
  root.querySelector('[data-prev]').addEventListener('click', () => show(current - 1, true));
  root.querySelector('[data-next]').addEventListener('click', () => show(current + 1, true));
  play.addEventListener('click', () => { paused = !paused; schedule(); });
  root.addEventListener('focusin', () => { paused = true; schedule(); });
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => { if (reduced.matches) paused = true; schedule(); });
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) load((current + 1) % slides.length).catch(() => {});
    schedule();
  }, { threshold: .25 }).observe(root);
  schedule();
})();
